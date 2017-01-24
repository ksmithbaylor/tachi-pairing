import API from './api';

////////////////////////////////////////////////////////////////////////////////
// Stateful variables

const initialDevs = [
  { "color": "#B2EBF2", "name": "Chuck" },
  { "color": "#F8BBD0", "name": "Dave" },
  { "color": "#D1C4E9", "name": "Eric" },
  { "color": "#C8E6C9", "name": "Evan" },
  { "color": "#FFCDD2", "name": "Garey" },
  { "color": "#D7CCC8", "name": "John" },
  { "color": "#B2DFDB", "name": "Julie" },
  { "color": "#BBDEFB", "name": "Kevin" },
  { "color": "#FFE0B2", "name": "Kiana" }
];
const initialPairs = emptyPairs(initialDevs);
const initialState = {
  devs: initialDevs,
  pairs: initialPairs
};
const emptyState = {
  devs: [],
  pairs: []
};
let state = emptyState;

let loading = true;

let observer = null;

let api = new API();

////////////////////////////////////////////////////////////////////////////////
// Public API

export async function init() {
  api.set('initialState', initialState);
  state = await api.get('state')
  loading = false;
  emitChange(true);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented');
  }

  observer = o;
}

export function addPair(dev, index) {
  if (!state.pairs[index].some(is(dev))) {
    state = {
      devs: state.devs.filter(not(dev)),
      pairs: remove(state.pairs, dev)
    };
    state.pairs[index].push(dev);
  }
  emitChange();
}

export function unpair(dev) {
  if (!state.devs.some(is(dev))) {
    state = {
      pairs: remove(state.pairs, dev),
      devs: state.devs.concat(dev)
    };
    emitChange();
  }
}

export function reset() {
  state = initialState;
  emitChange();
}

////////////////////////////////////////////////////////////////////////////////
// Helpers

function emitChange(skipAPI) {
  state.pairs = layout(
    onlyNecessaryPairs(state.pairs, initialState.devs),
    3
  );
  if (!loading && !skipAPI) {
    api.set('state', state);
  }
  observer({ ...state, loading });
}

function emptyPairs(devs) {
  return Array.from(Array(devs.length)).map(_ => []);
}

function rows(pairs) {
  return pairs
    .map(pair => pair.length)
    .map(length => Math.max(1, Math.ceil(length / 2)))
}

function onlyNecessaryPairs(pairs, initialDevs) {
  const unnecessary = rows(pairs)
    .map(row => row - 1)
    .reduce(sum, 0);
  const necessary = initialDevs.length - unnecessary;
  let numToRemove = pairs.length - necessary;
  if (numToRemove > 0) {
    while (numToRemove) {
      const firstEmpty = pairs.findIndex(pair => pair.length === 0);
      pairs.splice(firstEmpty, 1);
      numToRemove--;
    }
  } else if (numToRemove < 0) {
    while(numToRemove) {
      pairs.push([]);
      numToRemove++;
    }
  }
  return pairs;
}

function sum(a, b) {
  return a + b;
}

function concat(a, b) {
  return a.concat(b);
}

function layout(pairs, columnHeight) {
  const columns = [];
  let currentColumn = 0;
  while (pairs.length) {
    if (!columns[currentColumn]) {
      columns[currentColumn] = [];
    }

    const col = columns[currentColumn];
    const heightSoFar = rows(col).reduce(sum, 0);
    if (heightSoFar < columnHeight) {
      const firstThatFitsIndex = rows(pairs)
        .findIndex(row => heightSoFar + row <= columnHeight);
      const firstThatFits = pairs.splice(firstThatFitsIndex, 1)[0];
      if (firstThatFits !== -1) {
        col.push(firstThatFits);
      } else {
        currentColumn++;
      }
    } else {
      currentColumn++;
    }
  }
  return columns.reduce(concat, []);
}

function remove(pairs, dev) {
  return pairs.map(pair => pair.filter(not(dev)));
}

function not({ name }) {
  return dev => dev.name !== name;
}

function is({ name }) {
  return dev => dev.name === name;
}
