import { Carousel as Carousels } from 'antd'
import { CardComponent } from './CardComponent'
import { useEffect, useState } from 'react'
import { shopAPI } from '../../../services'

export const CarouselProducts = () => {
    const [products, setProducts] = useState([])

    const getAll = async () => {
        const { data: { product } } = await shopAPI.get('/productLG/get-productLG')
        setProducts(product)
    }

    useEffect(() => {
        getAll()
    }, [])

    return (
        <>
            <Carousels Carousels autoplay draggable slidesToShow={3}>
                {
                    products?.map(product => (
                        <CardComponent key={product._id} {...product} />
                    ))
                }
            </Carousels >
        </>
    )
}
