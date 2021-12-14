export const getTheme = (): "light" | "dark" => {
  return JSON.parse(localStorage.getItem("theme") as "light" | "dark");
};
