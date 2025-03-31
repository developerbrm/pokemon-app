import { Provider } from 'react-redux'
import './css/index.css'
import RoutesProvider from './Routes/RoutesProvider'
import { store } from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <RoutesProvider />
    </Provider>
  )
}

export default App
