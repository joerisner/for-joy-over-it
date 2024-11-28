export const toKebabCase = (str: string) =>
  str
    .toLowerCase()
    .replaceAll(/[^a-zA-Z ]/g, '')
    .replaceAll(' ', '-');

export const truncate = (str: string, length: number) => {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export const isEmpty = (str: string) => str.trim().length === 0;

export const toTitleCase = (str: string) => {
  return str
    .replace(/[_-]/g, ' ')
    .replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase());
};
