export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone) as unknown as T;
  return Object.keys(obj).reduce((acc, key) => {
    (acc as any)[key] = deepClone((obj as any)[key]);
    return acc;
  }, {} as T);
};
