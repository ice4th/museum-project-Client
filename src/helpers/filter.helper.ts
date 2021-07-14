export const addCommas = (num: number): string => {
  return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
}
