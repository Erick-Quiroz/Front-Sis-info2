import { Card, Col, Row } from 'antd'
import styles from './styles.module.css'
import PropTypes from 'prop-types'
import { useParams, Link } from 'react-router-dom'
import React, { useEffect, useState, useContext } from 'react'
import { CartContext } from '../../../pages/Cart/contexts/ShoppingCartContext'
const { Meta } = Card

export const CardComponent = (props) => {
    const { name, description, imageUrl, price } = props
    const [cart, setCart] = useContext(CartContext)

    const addToCart = (productData) => {
        setCart((currItems) => {
            const isItemsFound = currItems.find((item) => item._id === productData._id)

            if (isItemsFound) {
                return currItems.map((item) => {
                    if (item._id === productData._id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            } else {
                return [...currItems, { ...productData, quantity: 1 }]
            }
        })
    }

    const handleAddToCart = () => {
        const productData = { _id: props._id, name, imageUrl, price }
        addToCart(productData)
    }

    return (
        <><Row
            align={'top'}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{
                padding: 14,
                height: '100%',
                lineHeight: '100vh',
                textAlign: 'center'
            }}
        >
            <Col span={8} className="gutter-row" style={{
                maxHeight: '60vh'
            }}>
                <Card
                    className={styles.card}
                    style={{
                        display: 'flow-root',
                        marginBottom: 50,
                        marginLeft: 0,
                        marginTop: 50,
                        width: 200,
                        height: 320
                    }}
                    cover={<img draggable={false} alt={name} src={imageUrl} style={{
                        height: '100%',
                        width: '100%'
                    }}
                    onClick={handleAddToCart}
                    />}
                >
                    <div>precio: {price} Bs</div>
                    <Meta
                        style={{ color: 'yellowgreen' }}
                        title={name}
                        description={description} />

                    <div>
                        <br></br>
                    </div>
                </Card>
            </Col>
        </Row ></>
    )
}

CardComponent.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number
}
