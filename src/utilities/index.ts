export const appendSlash = (str: string) =>
  str.endsWith('/') ? str : `${str}/`

export const removeStartSlash = (str: string) =>
  str.startsWith('/') ? str.slice(1) : str

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)
