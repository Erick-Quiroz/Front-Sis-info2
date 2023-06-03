import { Layout, theme } from 'antd'
import { AdminLayout } from '../components/layouts/AdminLayout'
import './AdminPage.css'
import BACKENDURL from '../utils/backendUrl.js'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { useSnackbar } from 'notistack'
import { RightCircleOutlined } from '@ant-design/icons'

export const AdminPage = () => {
    const { Content } = Layout
    const { token: { colorBgContainer } } = theme.useToken()
    const [product, setProduct] = useState([])
    const { enqueueSnackbar } = useSnackbar()
    const [chartData, setChartData] = useState([])

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${BACKENDURL}/api/productLG/get-productLG`)
            if (data.success) {
                setProduct(data.product)

                // Calcular el stock mínimo para cada producto y crear los datos del gráfico
                const chartData = data.product.map((p) => ({
                    name: p.name,
                    stock: p.stock,
                    minStock: 10 // Stock mínimo deseado (puedes ajustarlo según tus necesidades)
                }))

                setChartData(chartData)
            }
        } catch (error) {
            console.log(error)
            enqueueSnackbar('Something went wrong in getting category')
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <AdminLayout>
            <Content>
                <div className="wrapper">
                    <div className="content-wrappera">
                        <section className="contenat">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-3 col-6">
                                        <div className="small-box bg-info">
                                            <div className="inner">
                                                <h3>{product.length}</h3>
                                                <p>Productos</p>
                                            </div>
                                            <div className="icon">
                                                <i className="ion ion-bag"></i>
                                            </div>

                                            <a href="/admin/productos" className="small-box-footer">
                                                Mas información <RightCircleOutlined style={{ fontSize: '24px' }} />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-6">
                                        <div className="small-box bg-success">
                                            <div className="inner">
                                                <h3>0</h3>
                                                <p>Ordenes</p>
                                            </div>
                                            <div className="icon">
                                                <i className="ion ion-bag"></i>
                                            </div>
                                            <a href="#" className="small-box-footer">
                                                Mas información <RightCircleOutlined style={{ fontSize: '24px' }} />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-6">
                                        <div className="small-box bg-warning">
                                            <div className="inner">
                                                <h3>150</h3>
                                                <p>Usuarios</p>
                                            </div>
                                            <div className="icon">
                                                <i className="ion ion-bag"></i>
                                            </div>
                                            <a href="#" className="small-box-footer">
                                                Mas información <RightCircleOutlined style={{ fontSize: '24px' }} />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-6">
                                        <div className="small-box bg-danger">
                                            <div className="inner">
                                                <h3>65</h3>
                                                <p>Visitantes</p>
                                            </div>
                                            <div className="icon">
                                                <i className="ion ion-pie-graph"></i>
                                            </div>
                                            <a href="#" className="small-box-footer">
                                                Mas información <RightCircleOutlined style={{ fontSize: '24px' }} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="card">
                                        <div className="card-header border-0">
                                            <h3 className="card-title">Productos con cantidad minima en stock</h3>
                                            <div className="card-tools">
                                                <a href="#" className="btn btn-tool btn-sm">
                                                    <i className="fas fa-download"></i>
                                                </a>
                                                <a href="#" className="btn btn-tool btn-sm">
                                                    <i className="fas fa-bars"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="card-body table-responsive p-0">
                                            <table className="table table-striped table-valign-middle">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Producto</th>
                                                        <th>Stock</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {product
                                                        .filter((p) => {
                                                            console.log('Filtering product:', p.existence)
                                                            return p.existence <= 50
                                                        })
                                                        .map((p, index) => (
                                                            <tr key={p.id} style={{ backgroundColor: p.existence < 15 ? '#F62716' : p.existence <= 50 ? '#E5E931' : '' }}>
                                                                <td>{index + 1}</td>
                                                                <td>
                                                                    <img src={p.imageUrl} style={{ width: 40, height: 40 }} alt={p.name} />
                                                                    {p.name}
                                                                </td>
                                                                <td>{p.existence}</td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </Content >
        </AdminLayout >
    )
}
