import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CartContext } from '../Cart/contexts/ShoppingCartContext'
import shopAPI from '../../services/axios.service'
import '../Product/ProductPage.css'

export const ProductoPage = () => {
    const [data, setData] = useState({})
    const { productID } = useParams()
    const { name, description, imageUrl, price, category, supplier } = data
    const _id = productID
    const getProduct = async () => {
        const { data: { product } } = await shopAPI.get(`/productLG/get-productLG/${productID}`)
        setData(product)
        console.log(product)
    }
    const [cart, setCart] = useContext(CartContext)

    const addToCart = () => {
        setCart((currItems) => {
            const isItemsFound = currItems.find((item) => item._id === _id)

            if (isItemsFound) {
                return currItems.map((item) => {
                    if (item._id === _id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            } else {
                return [...currItems, { _id, quantity: 1, price, name, imageUrl }]
            }
        })
    }
    useEffect(() => {
        getProduct()
    }, [])

    return (
        <>
            <div className="modal">
                <div className="modal__container">

                    <div className="modal__featured">
                        <div className="modal__circle">
                            <img alt="image" className="modal__product" src={imageUrl} />
                        </div>
                    </div>

                    <div className="modal__content">
                        <div className='product__content'>

                            <ul className="form-list">
                                <li className="form-list__row">
                                    <h2>Producto: </h2>
                                    <h2>{name}</h2>
                                </li>
                                <li className="form-list__row">
                                    <br />
                                    <label>Descripcion</label>
                                    <p>{description}</p>
                                </li>

                                <li className="form-list__row">
                                    <label>Precio</label>
                                    <p>{price} Bs.</p>
                                </li>

                                <li className="form-list__row">
                                    <label>Proveedor</label>
                                    <p>{supplier}</p>
                                </li>

                                <li className="form-list__row">
                                    <label>category</label>
                                    <p>{category}</p>
                                </li>

                                <li>

                                    <Link to="/" onClick={addToCart} className="btn btn-success">Agregar</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
