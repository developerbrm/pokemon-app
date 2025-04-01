export const BASE_URL = `/pokemon-app`

export const ROUTES = {
  HOME: BASE_URL,
  DETAILS: `${BASE_URL}/details/:name`,
}

export const getDetailsPageRoute = (name: string) =>
  `${BASE_URL}/details/${name}`
