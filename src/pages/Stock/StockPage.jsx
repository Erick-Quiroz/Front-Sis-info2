import BACKENDURL from '../../utils/backendUrl.js'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Layout, theme, Modal } from 'antd'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AdminLayout } from '../../components/layouts/AdminLayout.jsx'
import { useSnackbar } from 'notistack'
import ModalUpdateStock from './ModalUpdateStock.jsx'
import { EditOutlined } from '@ant-design/icons'

export const StockPage = () => {
    const { Content } = Layout
    const { token: { colorBgContainer } } = theme.useToken()
    const [categories, setCategories] = useState([])
    const [visible, setVisible] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [productToEdit, setProductToEdit] = useState({})
    const { enqueueSnackbar } = useSnackbar()
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${BACKENDURL}/api/productLG/get-productLG`)

            console.log(data)
            if (data.success) {
                setCategories(data.product)
            }
        } catch (error) {
            console.log(error)
            enqueueSnackbar('Something wwent wrong in getting catgeory')
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `${BACKENDURL}/api/productLG/productLG/${pId}`
            )
            if (data.success) {
                toast.success('category is deleted')
                getAllCategory()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Somtihing went wrong')
        }
        toast.success('category is deleted')
        enqueueSnackbar('Producto Eliminado', {
            variant: 'error',
            autoHideDuration: 1500,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        })
    }

    const handleGetProduct = async (pid) => {
        try {
            const { data } = await axios.get(`${BACKENDURL}/api/productLG/get-productLG/${pid}`)
            console.log(data)
            if (data.success) {
                setProductToEdit(data.product)
            }
        } catch (error) {
            toast.error('Something wwent wrong in getting catgeory')
        }
        setShowModal(true)
    }

    const updateProduct = async (product, name, cost, expiration, received, existence, supplier) => {
        try {
            const productUpdated = {
                name,
                supplier,
                received,
                expiration,
                cost,
                existence: Number(received) + Number(existence)

            }// modificar desde la 73 y api
            const { data } = await axios.put(`${BACKENDURL}/api/stock/update-stock/${product._id}`,
                productUpdated
            )
            if (data.success) {
                getAllCategory(
                    enqueueSnackbar('Datos guardados correctamente', {
                        variant: 'success',
                        autoHideDuration: 1500,
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        }
                    })
                )
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Somtihing went wrong')
        }
    }

    return (
        <AdminLayout >
            <Content >
                <div
                    style={{
                        padding: 14,
                        minHeight: '86vh',
                        background: colorBgContainer
                    }}
                >
                    <div className="row">
                        <div className="text-center"><h1>Inventario</h1></div>
                        <div className="col-10"></div>
                        <div className="col-2" >

                        </div>

                    </div><br></br>
                    <div className="container">
                        <div className="table-responsive">
                            <table border="1" className="table table-hover">
                                <thead className="thead-dark">
                                    <tr className="text-center" style={{ backgroundColor: '#94B0BA' }}>
                                        <th scope="col" >N°</th>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Proveedor</th>
                                        <th scope="col">Precio de compra(Bs)</th>
                                        <th scope="col">Precio de venta(Bs)</th>
                                        <th scope="col">Utilidad(Bs)</th>
                                        <th scope="col">Fecha de entrega</th>

                                        <th scope="col">Cantidad recibida(ud)</th>

                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((v, index) =>
                                        <>
                                            <tr className="text-center" style={{ backgroundColor: index % 2 === 0 ? '' : '#F0F8FF' }}>
                                                <td>{index + 1}</td>
                                                <td>{v.name}</td>
                                                <td>{v.supplier}</td>
                                                <td>{v.cost}</td>
                                                <td>{v.price}</td>
                                                <td>{((v.price * 100) - (v.cost * 100)) / 100}</td>
                                                <td>{v.expiration}</td>
                                                <td>{v.received}</td>

                                                <td>
                                                    <button

                                                        className="btn btn-primary"
                                                        onClick={() => {
                                                            handleGetProduct(v._id)
                                                        }} style={{
                                                            padding: 2,

                                                            width: 30,
                                                            margin: 2
                                                        }}
                                                        title='Editar'
                                                    >
                                                        <EditOutlined />
                                                    </button>

                                                </td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>
                            <Modal
                                onCancel={() => setVisible(false)}
                                footer={null}
                                open={visible}
                            >

                            </Modal>
                        </div>
                    </div>
                </div>
                <ModalUpdateStock
                    show={showModal}
                    productToEdit={productToEdit}
                    setShowModal={setShowModal}
                    setProductToEdit={setProductToEdit}
                    updateProduct={updateProduct}
                />

            </Content>
        </AdminLayout>
    )
}
