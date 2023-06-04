import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Layout, Card, Row, Col } from 'antd'
import { Carousel } from 'react-bootstrap'
import { CartContext } from '../pages/Cart/contexts/ShoppingCartContext'
import { ShopLayout } from '../components/layouts/ShopLayout'
import Swal from 'sweetalert2'
import { image1, image2, image3 } from '../helpers/imageAdds'

import { useNavigate } from 'react-router-dom'

const { Meta } = Card
const { Content } = Layout

export const HomePage = () => {
    const [cart, setCart] = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const navigate = useNavigate()

    const getAllProducts = async () => {
        try {
            const response = await axios.get('https://sistema-back.onrender.com/api/productLG/get-productLG')
            const { data } = response
            if (data.success) {
                setProducts(data.product)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    const addToCart = (product) => {
        if (product.existence > 0) {
            setCart((currItems) => {
                const isItemFound = currItems.find((item) => item._id === product._id)
                console.log(isItemFound)
                if (isItemFound) {
                    return currItems.map((item) => {
                        if (item._id === product._id) {
                            const newQuantity = item.quantity + 1
                            if (newQuantity <= product.existence) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Se agregó',
                                    toast: true,
                                    padding: 10,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 800,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                        toast.addEventListener('mouseenter', Swal.stopTimer)
                                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                                    }
                                })
                                console.log('No se puede agregar más cantidad debido al stock disponible')
                                return { ...item, quantity: newQuantity }
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Límite de Stock',
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
                                return item
                            }
                        } else {
                            return item
                        }
                    }).sort((a, b) => a.name.localeCompare(b.name)) // Ordenar por nombre
                } else {
                    return [
                        ...currItems,
                        { ...product, quantity: 1 }
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
            if (currItems.find((item) => item._id === _id)?.quantity === 1) {
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

    const showProductDetails = (product) => {
        setSelectedProduct(product)
        navigate(`/products/${product._id}`, { state: { product } })
        console.log('llegue')
    }

    const closeProductDetails = () => {
        setSelectedProduct(null)
    }
    const handleRedirect = (elproducto) => {
        if (elproducto._id !== undefined &&
            elproducto._id !== null &&
            elproducto._id !== '' &&
            elproducto._id !== 0 &&
            elproducto._id !== '0' &&
            elproducto._id !== 'undefined' &&
            elproducto._id !== 'null' &&
            elproducto._id !== 'NaN') {
            navigate(`/productos/${elproducto._id}`)
        } else {
            navigate('/')
        }
    }
    return (
        <ShopLayout>
            <Content className="fondo">
                <Carousel interval={5000}>
                    <Carousel.Item>
                        <div className="carousel-image-container">
                            <img
                                className="d-block w-100 image-height-50"
                                src={image3}
                                alt="First slide"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>

                        <Carousel.Caption>
                            <h3>Productos</h3>
                            <p>Calidad y Precios</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="carousel-image-container">
                            <img
                                className="d-block w-100 image-height-50"
                                src={image1}
                                alt="First slide"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>

                        <Carousel.Caption>
                            <h3>Productos</h3>
                            <p>Calidad y Precios</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="carousel-image-container">
                            <img
                                className="d-block w-100"
                                src={image2}
                                alt="Second slide"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <Carousel.Caption>
                            <h3>Productos</h3>
                            <p>Calidad y Precios</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    {/* Agrega más imágenes al carrusel aquí */}
                </Carousel>
                <div className="text-center">
                    <h2 className="text-center">Nuestros Productos</h2>
                </div>

                <div className="product-container-p justify-center">
                    <Row gutter={[16, 16]} className="col-centered">
                        {products.map((product) => (
                            <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    hoverable
                                    cover={<img src={product.imageUrl} alt={product.name} />}
                                    style={{ width: '100%', height: '50%' }}
                                    onClick={() => { handleRedirect(product) }}
                                >
                                    <Meta title={product.name} description={`Precio: ${product.price}`} />

                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>

            </Content>
        </ShopLayout>
    )
}
