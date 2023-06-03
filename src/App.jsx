import { SnackbarProvider } from 'notistack'
import './App.css'
import { AppRouter } from './routes/AppRouter'

import { ShoppingCartProvider } from '../src/pages/Cart/contexts/ShoppingCartContext'

function App() {
    return (
        <>
            <ShoppingCartProvider>
                <SnackbarProvider maxSnack={3}>

                    <AppRouter />
                </SnackbarProvider>
            </ShoppingCartProvider>
        </>
    )
}

export default App
