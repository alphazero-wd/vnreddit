export const formatNumber = (value: number) => {
  return new Intl.NumberFormat(undefined, { notation: "compact" }).format(
    value
  );
};
