import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './css/index.css'
import RoutesProvider from './Routes/RoutesProvider'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RoutesProvider />
    </QueryClientProvider>
  )
}

export default App
