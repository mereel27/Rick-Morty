export const sortByName = arr =>
  arr.sort((current, prev) =>
    current.name.toLowerCase() < prev.name.toLowerCase()
      ? -1
      : current.name.toLowerCase() > prev.name.toLowerCase()
      ? 1
      : 0
);

export const saveScroll = () => {
  localStorage.setItem('homeScrollPos', window.scrollY)
};

export const getNameQuery = (params) => {
  return [...params].find((el) => el[0] === 'name')?.[1];
};