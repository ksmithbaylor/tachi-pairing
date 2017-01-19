////////////////////////////////////////////////////////////////////////////////
// State

const initialDevs = [
  { name: 'Chuck', color: '#B2EBF2' },
  { name: 'Dave', color: '#F8BBD0' },
  { name: 'Eric', color: '#D1C4E9' },
  { name: 'Evan', color: '#C8E6C9' },
  { name: 'Garey', color: '#FFCDD2' },
  { name: 'John', color: '#D7CCC8' },
  { name: 'Julie', color: '#B2DFDB' },
  { name: 'Kevin', color: '#BBDEFB' },
  { name: 'Kiana', color: '#FFE0B2' }
];
const initialPairs = Array.from(Array(initialDevs.length)).map(_ => []);

let devs = initialDevs;
let pairs = initialPairs;

let observer = null;

function emitChange() {
  pairs = filledFirst(pairs);
  observer({ pairs, devs });
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
  pairs = initialPairs;
  devs = initialDevs;
  emitChange();
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
