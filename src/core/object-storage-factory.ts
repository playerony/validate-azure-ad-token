export function objectStorageFactory(): Storage {
  let memoryStorage: Record<string, string> = {};

  function clear(): void {
    memoryStorage = {};
  }

  function getItem(key: string): string | null {
    return memoryStorage.hasOwnProperty(key) ? memoryStorage[key] : null;
  }

  function key(index: number): string | null {
    return Object.keys(memoryStorage)[index] || null;
  }

  function removeItem(key: string): void {
    delete memoryStorage[key];
  }

  function setItem(key: string, value: string): void {
    memoryStorage[key] = value;
  }

  function length(): number {
    return Object.keys(memoryStorage).length;
  }

  return {
    key,
    clear,
    getItem,
    setItem,
    removeItem,
    get length() {
      return length();
    },
  };
}
