import { Layout, Col, Row, Typography, Radio, Space, Button, Checkbox } from 'antd'
import { ShopLayout } from '../../components/layouts/ShopLayout'
import { useEffect, useState } from 'react'
import { CardComponent } from '../../components/ui/user/CardComponent'
import { shopAPI } from '../../services'
import { useLocation } from 'react-router-dom'

export const FilterPage = () => {
    const { Content } = Layout
    const { Title } = Typography
    const [products, setProducts] = useState([])// Todos los productos filtrados por categorias
    const [radio, setRadio] = useState('0') // el radio Precio
    const [checked, setChecked] = useState('0')// El checkbox Oferta
    const location = useLocation()
    const categoria = location.state.data

    const getAll = async () => {
        try {
            const { data } = await shopAPI.get(`/productLG/filter-Category-productLG/${categoria}`)
            if (data.success) {
                setProducts(data.product)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const filterProduct = async () => {
        try {
            const { data } = await shopAPI.get(`/productLG/filter-Offer-Category-productLG/${radio}/${checked}/${categoria}`)
            if (data.success) {
                setProducts(data.products)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleRadioPrecioChange = (e) => {
        const value = e.target.value
        if (value === radio) {
            setRadio('0')
        } else {
            setRadio(value)
        }
    }

    const handleRadioOfertaChange = (e) => {
        const value = e.target.value
        if (value === checked) {
            setChecked('0')
        } else {
            setChecked(value)
        }
    }

    useEffect(() => {
        if (checked === '0' || radio === '0') getAll()
        if (checked !== '0' || radio !== '0') filterProduct()
    }, [checked, radio, categoria])

    return (
        <>
            <ShopLayout>
                <Content>
                    <>
                        <Row justify="center">
                            <Title className='Titulo'>Busqueda de Productos</Title>
                        </Row>
                        <Row>
                            <Col span={2} className='Buscador' style={{
                                minWidth: '100px'
                            }}>
                                <div className='Fondo' style={{
                                    backgroundColor: 'white'

                                }}>
                                    <Row justify="center">
                                        <Title level={4}>Precio</Title>
                                    </Row>
                                    <Row>
                                        <Radio.Group defaultValue={'0'} value={radio}>
                                            <Space direction="vertical">
                                                <Radio value="1" onClick={handleRadioPrecioChange}>De menor a mayor</Radio>
                                                <Radio value="2" onClick={handleRadioPrecioChange}>De mayor a menor</Radio>
                                            </Space>
                                        </Radio.Group>
                                    </Row>
                                    <Row justify="center">
                                        <Title level={4}>Ofertas</Title>
                                    </Row>
                                    <Row>
                                        <Title level={5}>Todas las ofertas</Title>
                                    </Row>
                                    <Row>
                                        <Radio.Group value={checked}>
                                            <Space direction="vertical">
                                                <Radio value="1" onClick={handleRadioOfertaChange}>Oferta</Radio>
                                            </Space>
                                        </Radio.Group>
                                    </Row>
                                </div>
                            </Col>
                            <Col span={22} className='Productos' style={{
                                flexWrap: 'nowrap'
                            }}>
                                <Row className='asds' justify="center" align="middle">      
                                    {
                                        products?.map(c => (
                                            <Col key={c._id}>
                                                <CardComponent key={c._id} {...c} />
                                            </Col>                                
                                        ))
                                    }  
                                </Row>
                            </Col>
                        </Row>
                    </>
                </Content >
            </ShopLayout>
        </>
    )
}
