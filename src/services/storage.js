const STORAGE_KEY = 'gridwatch_data';

export function saveToStorage(key, data) {
  try {
    localStorage.setItem(`${STORAGE_KEY}_${key}`, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export function loadFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(`${STORAGE_KEY}_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return defaultValue;
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(`${STORAGE_KEY}_${key}`);
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
  }
}

export function clearStorage() {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(STORAGE_KEY))
      .forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}
