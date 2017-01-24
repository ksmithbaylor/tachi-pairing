const EMPTY_ARRAY = '__EMPTY_ARRAY__';
const EMPTY_OBJECT = '__EMPTY_OBJECT__';

export function toFirebase(value) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return EMPTY_ARRAY;
    } else {
      return value.map(toFirebase);
    }
  }

  if (typeof value === 'object' && value !== null) {
    const keys = Object.keys(value);
    if (keys.length === 0) {
      return EMPTY_OBJECT;
    } else {
      const ret = Object.create(null);
      keys.forEach(key => ret[key] = toFirebase(value[key]));
      return ret;
    }
  }

  return value;
}

export function fromFirebase(value) {
  if (Array.isArray(value)) {
    return value.map(fromFirebase);
  }

  if (typeof value === 'object' && value !== null) {
    const keys = Object.keys(value);
    const ret = Object.create(null);
    keys.forEach(key => ret[key] = fromFirebase(value[key]));
    return ret;
  }

  if (value === EMPTY_OBJECT) return {};
  if (value === EMPTY_ARRAY) return [];

  return value;
}
