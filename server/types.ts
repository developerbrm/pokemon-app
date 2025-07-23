export interface PokemonListResponseItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListResponseItem[]
  otherCardInfo: PokemonOtherCardInfoData[]
}

interface Ability {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

interface Cry {
  latest: string
  legacy: string
}

interface Form {
  name: string
  url: string
}

interface GameIndex {
  game_index: number
  version: {
    name: string
    url: string
  }
}

interface HeldItemVersionDetail {
  rarity: number
  version: {
    name: string
    url: string
  }
}

interface HeldItem {
  item: {
    name: string
    url: string
  }
  version_details: HeldItemVersionDetail[]
}

interface MoveVersionGroupDetail {
  level_learned_at: number
  move_learn_method: {
    name: string
    url: string
  }
  order: number | null
  version_group: {
    name: string
    url: string
  }
}

interface Move {
  move: {
    name: string
    url: string
  }
  version_group_details: MoveVersionGroupDetail[]
}
interface Sprites {
  back_default: string
  back_female: null
  back_shiny: string
  back_shiny_female: null
  front_default: string
  front_female: null
  front_shiny: string
  front_shiny_female: null
  other: {
    dream_world: {
      front_default: string
      front_female: null
    }
    home: {
      front_default: string
      front_female: null
      front_shiny: string
      front_shiny_female: null
    }
    'official-artwork': {
      front_default: string
      front_shiny: string
    }
    showdown: {
      back_default: string
      back_female: null
      back_shiny: string
      back_shiny_female: null
      front_default: string
      front_female: null
      front_shiny: string
      front_shiny_female: null
    }
  }
  versions: unknown
}

interface Stat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

interface Type {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonData {
  abilities: Ability[]
  base_experience: number
  cries: Cry
  forms: Form[]
  game_indices: GameIndex[]
  height: number
  held_items: HeldItem[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Move[]
  name: string
  order: number
  past_abilities: unknown[]
  past_types: unknown[]
  species: {
    name: string
    url: string
  }
  sprites: Sprites
  stats: Stat[]
  types: Type[]
  weight: number
}

type PokemonOtherCardInfoData = Pick<
  PokemonData,
  'height' | 'name' | 'weight' | 'sprites' | 'species'
>
