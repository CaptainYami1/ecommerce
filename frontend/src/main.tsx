import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ShopProvider } from './context/shopContext.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'

createRoot(document.getElementById('root')!).render(
 <Provider store={store}>
 <ShopProvider>
    <App />
  </ShopProvider>
  </Provider>,
)
