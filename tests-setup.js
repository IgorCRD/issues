import 'whatwg-fetch';

const localStorageMock = (function localStorageMock() {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
}());

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});
