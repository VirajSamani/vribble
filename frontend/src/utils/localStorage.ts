function getLocalStorageItem(key: string) {
  const item = localStorage.getItem(key);
  return item;
}

function setLocalStorageItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

export { getLocalStorageItem, setLocalStorageItem };
