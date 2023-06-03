import React, { useContext } from 'react'
import { CartContext } from '../contexts/ShoppingCartContext'
import { FaFileVideo } from 'react-icons/fa'
import Swal from 'sweetalert2'

export const Item = ({ name, price, _id, existence, imageUrl }) => {
    const [cart, setCart] = useContext(CartContext)

    const addToCart = () => {
        if (existence > 0) {
            setCart((currItems) => {
                const isItemFound = currItems.find((item) => item._id === _id)
                console.log(isItemFound)
                if (isItemFound) {
                    return currItems
                        .map((item) => {
                            if (item._id === _id) {
                                const newQuantity = item.quantity + 1
                                if (newQuantity <= existence) {
                                    return { ...item, quantity: newQuantity }
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Limite de Stock',
                                        toast: true,
                                        padding: 50,
                                        position: 'top-end',
                                        showConfirmButton: false,
                                        timer: 3000,
                                        timerProgressBar: true,
                                        didOpen: (toast) => {
                                            toast.addEventListener(
                                                'mouseenter',
                                                Swal.stopTimer
                                            )
                                            toast.addEventListener(
                                                'mouseleave',
                                                Swal.resumeTimer
                                            )
                                        }
                                    })
                                    return item
                                }
                            } else {
                                return item
                            }
                        })
                        .sort((a, b) => a.name.localeCompare(b.name)) // Ordenar por nombre
                } else {
                    return [
                        ...currItems,
                        { _id, quantity: 1, price, name, existence, imageUrl }
                    ].sort((a, b) => a.name.localeCompare(b.name)) // Ordenar por nombre
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Sin Stock',
                toast: true,
                padding: 50,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            console.log('No se puede agregar más cantidad debido al stock disponible')
        }
    }

    const removeItem = (_id) => {
        setCart((currItems) => {
            if (
                currItems.find((item) => item._id === _id)?.quantity === 1
            ) {
                return currItems.filter((item) => item._id !== _id)
            } else {
                return currItems.map((item) => {
                    if (item._id === _id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const getQuantityById = (_id) => {
        return cart.find((item) => item._id === _id)?.quantity || 0
    }

    const quantityPerItem = getQuantityById(_id)

    return (
        <div className="item-box">
            {quantityPerItem > 0 && (
                <div className="item-quantity">{quantityPerItem}</div>
            )}

            <div>{name.toUpperCase()}</div>
            <img src={imageUrl} width="100" height="100" />
            <div className="item-price">{price} Bs.</div>
            <div className="item-price" style={{ color: 'purple', fontWeight: 'bold' }}>Stock {existence || 0}</div>

            {quantityPerItem === 0
                ? (
                    <div>
                        <button className="item-add-button" onClick={() => addToCart()}>
                            + Añadir a carrito
                        </button>
                    </div>
                )
                : (
                    <div>
                        <button className="item-plus-button" onClick={() => addToCart()}>
                            + Añadir mas
                        </button>
                    </div>
                )}

            {quantityPerItem > 0 && (
                <div>
                    <button className="item-minus-button" onClick={() => removeItem(_id)}>
                        Quitar de carrito
                    </button>
                </div>
            )}
        </div>
    )
}
