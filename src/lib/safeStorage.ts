/**
 * Safe localStorage wrapper that handles SecurityError and other localStorage exceptions
 * This prevents the app from crashing when localStorage is blocked (private browsing, iframes, etc.)
 */

// Check if localStorage is available
function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__localStorage_test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

// In-memory fallback storage
const memoryStorage: Record<string, string> = {};

/**
 * Safe localStorage getter
 * Returns null if localStorage is not available or throws an error
 */
export function safeGetItem(key: string): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    console.warn('[SafeStorage] localStorage.getItem failed, using memory fallback:', e);
    return memoryStorage[key] || null;
  }
}

/**
 * Safe localStorage setter
 * Falls back to memory storage if localStorage is not available
 */
export function safeSetItem(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    console.warn('[SafeStorage] localStorage.setItem failed, using memory fallback:', e);
    memoryStorage[key] = value;
  }
}

/**
 * Safe localStorage remover
 */
export function safeRemoveItem(key: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    console.warn('[SafeStorage] localStorage.removeItem failed, using memory fallback:', e);
    delete memoryStorage[key];
  }
}

/**
 * Safe localStorage clear
 */
export function safeClear(): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.clear();
  } catch (e) {
    console.warn('[SafeStorage] localStorage.clear failed, clearing memory fallback:', e);
    Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]);
  }
}

/**
 * Create a safe storage object that can be used as a drop-in replacement for localStorage
 */
export const safeStorage = {
  getItem: safeGetItem,
  setItem: safeSetItem,
  removeItem: safeRemoveItem,
  clear: safeClear,
  get length() {
    try {
      return window.localStorage.length;
    } catch {
      return Object.keys(memoryStorage).length;
    }
  },
  key(index: number): string | null {
    try {
      return window.localStorage.key(index);
    } catch {
      return Object.keys(memoryStorage)[index] || null;
    }
  }
};

export const isStorageAvailable = isLocalStorageAvailable();
