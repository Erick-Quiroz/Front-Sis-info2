
import BACKENDURL from '../../utils/backendUrl'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/ProductForm.jsx'
import { Layout, theme, Button, Modal } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import ModalUpdateCategory from './ModalUpdateCategory.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AdminLayout } from '../../components/layouts/AdminLayout.jsx'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { color } from 'framer-motion'
export const CategoryPage = () => {
    // const url = 'http://localhost:8080/api/category/get-category'
    const { Content } = Layout

    const { token: { colorBgContainer } } = theme.useToken()
    const [categories, setCategories] = useState([])
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [categoryToEdit, setCategoryToEdit] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [updatedName, setUpdatedName] = useState('')

    // get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${BACKENDURL}/api/category/get-category`)
            if (data.success) {
                setCategories(data.category)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting category')
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    //  delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `${BACKENDURL}/api/category/delete-category/${pId}`

            )
            if (data.success) {
                toast.success('category is deleted')

                getAllCategory()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }
    const handleGetCategory = async (categoryId) => {
        try {
            const { data } = await axios.get(`${BACKENDURL}/api/category/single-category/${categoryId}`)
            // console.log(data); // Agregado
            if (data.success) {
                setCategoryToEdit(data.category)
                console.log(data.category)
            }
        } catch (error) {
            toast.error('Something wwent wrong in getting catgeory')
        }
        setShowModal(true)
    }
    // update category new
    const updateCategory = async (category, name, description, state) => {
        try {
            const categoryUpdated = {
                name,
                description,
                state: category.state

            }
            const { data } = await axios.put(`${BACKENDURL}/api/category/update-category/${category._id}`,
                categoryUpdated
            )
            console.log(data)
            if (data.success) {
                getAllCategory()
                // const updatedCategoryIndex = categories.findIndex(c => c._id === categoryId);
                // const updatedCategories = [...categories];
                // updatedCategories[updatedCategoryIndex] = {...updatedCategories[updatedCategoryIndex], name};
                // setCategories(updatedCategories); // actualizar el estado categories
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const mostrarAlerta = async (pId) => {
        Swal.fire({
            icon: 'warning',
            title: '¿Está seguro de eliminar esta categoría?',
            showDenyButton: true,
            denyButtonText: 'No',
            confirmButtonText: 'Si'

        }).then(response => {
            if (response.isConfirmed) {
                handleDelete(pId)
            } else if (response.isDenied) {
                getAllCategory()
            }
        })
    }

    return (
        <>
            <AdminLayout>
                <Content style={{ margin: '0 8px' }}>
                    <div
                        style={{
                            padding: 14,
                            minHeight: '86vh',
                            background: colorBgContainer
                        }}
                    >

                        <div className="row">

                            <div className="text-center"><h1>Mis Categorías</h1></div>

                            <div className="col-10"></div>
                            <div className="col-2">
                                <Link to={'/admin/registro/categoria'}>
                                    <Button className=" btn btn-success" type="primary" htmlType="submit" style={{
                                        padding: 5,
                                        width: 85,
                                        height: 35
                                    }}>
                                        Registrar
                                    </Button>
                                </Link>
                            </div>
                        </div><br></br>
                        <div className="container">
                            <div className="table-responsive">
                                <table border="1" className="table table-hover">
                                    <thead className="thead-dark">
                                        <tr className="text-center">
                                            <th scope="col" style={{ backgroundColor: '#94B0BA' }}>N°</th>
                                            <th scope="col" style={{ backgroundColor: '#94B0BA' }}>Categoria</th>

                                            <th scope="col" style={{ backgroundColor: '#94B0BA' }}>Descripción</th>
                                            <th scope="col" style={{ backgroundColor: '#94B0BA' }}>Estado</th>

                                            <th scope="col" style={{ backgroundColor: '#94B0BA' }}>Acciones</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories?.map((v, index) =>
                                            <>
                                                <tr className="text-center" style={{ backgroundColor: index % 2 === 0 ? '' : '#F0F8FF' }}>
                                                    <td >{index + 1}</td>
                                                    <td>{v.name}</td>
                                                    <td>{v.description}</td>
                                                    <td>{v.state}</td>

                                                    {/* <td>{v.category}</td>
                                                    <td>{v.state}</td> */}

                                                    <td>

                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => {
                                                                setUpdatedName(v.name)

                                                                setSelected(v)
                                                                handleGetCategory(v._id)
                                                            }} style={{
                                                                padding: 2,
                                                                width: 30,
                                                                margin: 2

                                                            }}
                                                            placeholder='Editar'
                                                            title="Editar"
                                                        >
                                                            <EditOutlined />

                                                        </button>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => {
                                                                mostrarAlerta(v._id)
                                                            }}style={{
                                                                padding: 1,
                                                                width: 30,
                                                                margin: 2
                                                            }}
                                                            placeholder='Eliminar'
                                                            title="Eliminar"
                                                        >

                                                            <DeleteOutlined />
                                                        </button>

                                                    </td >
                                                </tr >
                                            </>
                                        )}
                                    </tbody >
                                </table >
                                <Modal
                                    onCancel={() => setVisible(false)}
                                    footer={null}
                                    open={visible}
                                >

                                </Modal>
                            </div>
                        </div>
                    </div>
                    <ModalUpdateCategory
                        show={showModal}
                        categoryToEdit={categoryToEdit}
                        setShowModal={setShowModal}
                        setCategoryToEdit={setCategoryToEdit}
                        updateCategory={updateCategory}
                    />
                </Content >
            </AdminLayout >
        </>
    )
}
