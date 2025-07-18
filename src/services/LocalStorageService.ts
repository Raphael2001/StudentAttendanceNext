const LocalStorageService = (function () {
  function setItem(
    key: string,
    value: string,
    callback?: (success: boolean) => void,
  ) {
    try {
      localStorage.setItem(key, value);
      callback?.(true);
    } catch (error) {
      console.error(`Error setting item [${key}]:`, error);
      callback?.(false);
    }
  }

  function getItem(key: string, callback?: (value: string | null) => void) {
    try {
      const value = localStorage.getItem(key);
      callback?.(value);
      return value;
    } catch (error) {
      console.error(`Error getting item [${key}]:`, error);
      callback?.(null);
      return null;
    }
  }

  function removeItem(key: string, callback?: () => void) {
    try {
      localStorage.removeItem(key);
      callback?.();
    } catch (error) {
      console.error(`Error removing item [${key}]:`, error);
    }
  }

  function clear(callback?: () => void) {
    try {
      localStorage.clear();
      callback?.();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }

  return {
    setItem,
    getItem,
    removeItem,
    clear,
  };
})();

export default LocalStorageService;
