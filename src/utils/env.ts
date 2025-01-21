export const getEnv = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];

  if (!value) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not set.`);
  }

  return value;
};

export const API_DOMAIN = getEnv("VITE_API_DOMAIN");
