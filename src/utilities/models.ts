export interface InitialUIState {
  data: unknown
  loading: boolean
  error: unknown
  loaded: boolean
}

export interface PokemonDetailsResponse {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
  }
}

export interface PokemonListResponseItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListResponseItem[]
}
