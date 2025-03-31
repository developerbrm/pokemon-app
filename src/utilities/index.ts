import { InitialUIState } from './models'

export const createInitialState = (): InitialUIState => ({
  data: [],
  loading: false,
  loaded: false,
  error: null,
})
