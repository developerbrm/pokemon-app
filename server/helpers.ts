export const getServerPort = () => {
  let port

  try {
    port = process.env.PORT
  } catch (error) {
    console.log(error)
  }

  return port ?? import.meta.env.VITE_SERVER_PORT ?? 3000
}

export const commonResponseOptions = {
  headers: {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
}

export const GETResponseOptions = {
  ...commonResponseOptions,
  'Access-Control-Allow-Methods': 'GET',
  'Content-Type': 'application/json',
}
