import { Provider } from 'react-redux'
import './css/index.css'
import RoutesProvider from './Routes/RoutesProvider'
import { store } from './redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RoutesProvider />
      </QueryClientProvider>
    </Provider>
  )
}

export default App
