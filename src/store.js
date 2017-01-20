import API from './api';

////////////////////////////////////////////////////////////////////////////////
// Stateful variables

let initialState = {},
    pairs = [],
    devs = [],
    loading = true;

let observer = null;

let api = new API();

////////////////////////////////////////////////////////////////////////////////
// Public API

export async function init() {
  initialState = await api.get('initialState');
  pairs = await api.get('pairs');
  devs = await api.get('devs');
  if (!devs) {
    devs = pairs ? [] : initialState.devs;
  }
  pairs = pairs ? addEmptyPairsTo(pairs) : emptyPairs(devs);
  loading = false;
  emitChange();
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented');
  }

  observer = o;
  emitChange();
}

export function addPair(dev, index) {
  if (!pairs[index].some(is(dev))) {
    devs = devs.filter(not(dev));
    pairs = remove(pairs, dev);
    pairs[index].push(dev);
  }
  emitChange();
}

export function unpair(dev) {
  if (!devs.some(is(dev))) {
    pairs = remove(pairs, dev);
    devs.push(dev);
    emitChange();
  }
}

export function reset() {
  devs = initialState.devs;
  pairs = emptyPairs(devs);
  emitChange();
}

////////////////////////////////////////////////////////////////////////////////
// Helpers

function emitChange() {
  pairs = filledFirst(pairs);
  if (!loading) {
    api.setAll({ devs, pairs });
  }
  observer({ devs, pairs, loading });
}

function emptyPairs(devs) {
  return Array.from(Array(devs.length)).map(_ => []);
}

function addEmptyPairsTo(pairs) {
  if (!pairs) return pairs;

  for (let i = 0; i < initialState.devs.length; i++) {
    console.log(`pairs[${i}]:`, pairs[i]);
    if (!pairs[i]) {
      pairs[i] = [];
    }
  }

  return pairs;
}

function dedupe(devs, pairs) {
  return devs.filter(dev =>
    pairs.some(pair => pair.some(is(dev)))
  );
}

function filledFirst(pairs) {
  return pairs.sort((a, b) =>
    a.length === 0 ? 1 : b.length === 0 ? -1 : 0
  );
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
