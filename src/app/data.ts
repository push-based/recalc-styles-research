export const getItems = (amount = 50) => {
  return new Array(amount).fill(null).map((v, i) => i);
}
