import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const CartContext = createContext(null)

export const ShoppingCartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    // Cargar datos del carrito desde el caché al iniciar la aplicación
    useEffect(() => {
        const cachedCart = localStorage.getItem('cart')
        if (cachedCart) {
            setCart(JSON.parse(cachedCart))
        }
    }, [])

    // Guardar datos del carrito en el caché cuando el carrito cambia
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

ShoppingCartProvider.propTypes = {
    children: PropTypes.node
}
