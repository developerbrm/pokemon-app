import { InitialUIState } from './models'

export const createInitialState = (): InitialUIState => ({
  data: [],
  loading: false,
  loaded: false,
  error: null,
})

export const appendSlash = (str: string) =>
  str.endsWith('/') ? str : `${str}/`

export const removeStartSlash = (str: string) =>
  str.startsWith('/') ? str.slice(1) : str
