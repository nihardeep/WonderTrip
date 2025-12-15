// Utility function for combining class names
export const cn = (...classes) => {
  return classes
    .flat()
    .filter(Boolean)
    .join(' ')
    .trim();
};
