import React, { useContext, useState } from 'react'
import { CartContext } from '../contexts/ShoppingCartContext'
import { Layout, Button, Drawer } from 'antd'
import { ShopLayout } from '../../../components/layouts/ShopLayout'
import { DeleteOutlined } from '@ant-design/icons'
import './style.css'

import Swal from 'sweetalert2'

export const ShoppingCart = () => {
    const [cart, setCart] = useContext(CartContext)
    const [inputQuantity, setInputQuantity] = useState('')
    const [showDrawer, setShowDrawer] = useState(false) // Estado para controlar la ventana deslizante
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { Content } = Layout

    const handleCheckout = () => {
        console.log(cart)
    }

    const vaciar = () => {
        setCart([])
        console.log('Carrito vaciado')
    }

    const aumentarCantidad = (index) => {
        const updatedCart = [...cart]
        const product = updatedCart[index]
        if (product.quantity < product.existence) {
            product.quantity++
            setCart(updatedCart)
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
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            console.log('No se puede agregar más cantidad debido al stock disponible')
        }
    }

    const disminuirCantidad = (index) => {
        const updatedCart = [...cart]
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity--
            setCart(updatedCart)
        }
    }

    const eliminarItem = (index) => {
        const updatedCart = [...cart]
        updatedCart.splice(index, 1)
        setCart(updatedCart)
    }

    const handleInputChange = (e, index) => {
        const updatedCart = [...cart]
        const product = updatedCart[index]
        const quantity = parseInt(e.target.value, 10)
        if (quantity > 0 && quantity <= product.existence) {
            product.quantity = quantity
            setCart(updatedCart)
        }
    }

    const totalPrice = cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)

    const handleDrawerToggle = () => {
        if (isLoggedIn) {
            setShowDrawer(!showDrawer)
        } else {
            console.log('No logueado')
        }
    }

    return (
        <ShopLayout>
            <Content style={{ margin: '0 8px' }}>
                <div className="container_cart">
                    <h1>Productos en el carrito</h1>

                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Imagen</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Sub total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? '' : 'even-row'}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <img src={item.imageUrl} alt={item.name} className="product-image" style={{ width: 40, height: 40 }} />
                                        </td>
                                        <td>{item.price} Bs.</td>

                                        <td>
                                            <div className="quantity-container">
                                                <button onClick={() => disminuirCantidad(index)} className="btn btn-outline-danger">
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max={item.existence}
                                                    value={item.quantity}
                                                    step="1"
                                                    style={{ width: '40px' }}
                                                    onChange={(e) => handleInputChange(e, index)}
                                                />
                                                <button onClick={() => aumentarCantidad(index)} className="btn btn-outline-success">
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td>{item.price * item.quantity} Bs.</td>
                                        <td>
                                            <button onClick={() => eliminarItem(index)} className="btn btn-outline-danger">
                                                <DeleteOutlined />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="container_to">
                        <div className="total">Total: {totalPrice} Bs.</div>

                        <div className="total">
                            <button className="btn btn-outline-danger" onClick={vaciar}>
                                vaciar carrito
                            </button>
                        </div>
                        {/* <div className="Continuar_compra">

                            <button className="btn btn-outline-danger" onClick={handleDrawerToggle}>
                                Continuar compra
                            </button>
                        </div> */}
                    </div>

                    {/* Ventana deslizante */}
                    {/* <Drawer
                        title="Contenido de la ventana deslizante"
                        placement="right"
                        closable={false}
                        onClose={handleDrawerToggle}
                        visible={showDrawer}
                        width={400}
                    >

                        <p>Contenido de la ventana deslizante</p>
                        <Button onClick={handleDrawerToggle}>Cerrar</Button>
                    </Drawer> */}
                </div>
            </Content>
        </ShopLayout>
    )
}
