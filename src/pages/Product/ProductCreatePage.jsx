import { enqueueSnackbar } from 'notistack'
import { Layout, theme, Button, Form, Input, Select, Space, Tooltip, Typography, Upload } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AdminLayout } from '../../components/layouts/AdminLayout.jsx'
import { shopAPI } from '../../services'
import { useForm } from '../../hooks'
import axios from 'axios'

import { PlusOutlined } from '@ant-design/icons'
const { Option } = Select
const initialState = {
    name: '',
    description: '',
    state: 'Activo',
    category: '',
    price: 0,
    imageUrl: '',
    supplier: ''
}

export const ProductCreatePage = () => {
    const navigate = useNavigate()
    const { token: { colorBgContainer } } = theme.useToken()
    const [formValues, handlerInputChange] = useForm(initialState)
    const { name, description, state, category, price, imageUrl, supplier } = formValues
    const { Content } = Layout

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const imageData = await convertImageToBase64(image) // Convert image to base64
            const { data } = await shopAPI.post('/productLG/create-productLG', {
                name,
                description,
                state,
                category,
                price,
                imageUrl: imageData, // Send base64 image data
                supplier
            })
            if (data.success) {
                navigate('/admin/productos')
                enqueueSnackbar('Producto agregado', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
        }
    }

    const [categories, setCategories] = useState([])
    const getAllCategory = async () => {
        try {
            const { data } = await shopAPI.get('/category/get-category')
            if (data.success) {
                setCategories(data.category)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [proveedor, setProveedor] = useState([])
    const getAllSupplier = async () => {
        try {
            const { data } = await shopAPI.get('/supplierLG/get-supplierLG')
            if (data.success) {
                setProveedor(data.supplier)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllCategory()
        getAllSupplier()
    }, [])

    const [image, setImage] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setImage(file)
    }

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject(error)
            reader.readAsDataURL(file)
        })
    }

    return (
        <AdminLayout>
            <Content style={{ margin: '0 8px' }}>
                <div
                    style={{
                        padding: 14,
                        minHeight: '84vh',
                        background: colorBgContainer
                    }}
                >
                    <div className="form-container container-fluid " >
                        <form className='row g-3 needs-validation was-validated'
                            noValidate=""
                            onSubmit={handleSubmit}
                        >
                            <h4 className="title" >Registrar Producto</h4>
                            <div className="row  mb-3">

                                <div className="col-md-6">
                                    <label
                                        htmlFor="validationCustom01"
                                        className="form-label">
                                        <strong>Nombre</strong>
                                    </label>
                                    <input
                                        autoFocus
                                        className="form-control"
                                        id="name"
                                        maxLength={20}
                                        minLength={3}
                                        name='name'
                                        onChange={handlerInputChange}
                                        required
                                        type="text"
                                        value={name}
                                    />
                                    <div className="invalid-feedback">
                                        Completa este campo.
                                    </div>
                                </div>

                                <div className="col">
                                    <label
                                        htmlFor="disabledTextInput"
                                        className="form-label">
                                        <strong>Descripcion</strong>
                                    </label>
                                    <input
                                        className="form-control"
                                        id="description"
                                        maxLength={20}
                                        minLength={3}
                                        name='description'
                                        onChange={handlerInputChange}
                                        required
                                        type="text"
                                        value={description}
                                    />
                                    <div className="invalid-feedback">
                                        Completa este campo.
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col">
                                    <label
                                        htmlFor="disabledSelect1"
                                        className="form-label">
                                        <strong>Estado del producto</strong>
                                    </label>
                                    <select
                                        className="form-select"
                                        id="disabledSelect"
                                        name='state'
                                        onChange={handlerInputChange}
                                        required
                                        value={state}

                                    >
                                        <option>Activo</option>
                                        <option>Inactivo</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Elije una estado.
                                    </div>

                                </div>

                                <div className="col">
                                    <label
                                        htmlFor="disabledSelect"
                                        className="form-label">
                                        <strong>Categoria</strong>
                                    </label>
                                    <select
                                        className="form-select"
                                        id="disabledSelect"
                                        name='category'
                                        onChange={handlerInputChange}
                                        placeholder="Seleccione categoria!!!"
                                        required
                                        value={category}

                                    >
                                        <option value="" disabled>Seleccione una categoria</option>
                                        {categories?.map((v) =>
                                            <>
                                                <option className="">
                                                    {v.name}
                                                </option>
                                            </>
                                        )}
                                    </select>
                                    <div className="invalid-feedback">
                                        Completa este campo.
                                    </div>
                                </div>
                            </div>

                            <div className="row  mb-3">

                                <div className="col-md-3">
                                    <label
                                        htmlFor="validationCustom05"
                                        className="form-label">
                                        <strong>Precio</strong>
                                    </label>
                                    <input
                                        className="form-control"
                                        id="validationCustom05"
                                        min={1}
                                        name='price'
                                        onChange={handlerInputChange}
                                        required
                                        step={'any'}
                                        type="number"
                                        value={price}
                                    />
                                    <div className="invalid-feedback">
                                        Completa este campo.
                                    </div>
                                </div>

                                <div className="col">
                                    <label htmlFor="imageUpload" className="form-label">
                                        <strong>Imagen (Url)</strong>
                                    </label>
                                    <input
                                        className="form-control"
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                        required
                                        onChange={handleImageChange}
                                    />
                                    <div className="invalid-feedback">Completa este campo.</div>
                                </div>
                                <div className="row  mb-3">
                                    <div className="col">
                                        <label
                                            htmlFor="disabledSelect"
                                            className="form-label">
                                            <strong>Proveedor</strong>
                                        </label>
                                        <select
                                            className="form-select"
                                            id="disabledSelect"
                                            name='supplier'
                                            onChange={handlerInputChange}
                                            placeholder="Seleccione proveedor!!!"
                                            required
                                            value={supplier}

                                        >
                                            <option value="" disabled>Seleccione un proveedor</option>
                                            {proveedor?.map((v) =>
                                                <>
                                                    <option className="">
                                                        {v.name}
                                                    </option>
                                                </>
                                            )}
                                        </select>
                                        <div className="invalid-feedback">
                                            Completa este campo.
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="container text-end">
                                <div className="">
                                    <Link to={'/admin/productos'}>
                                        <button className=" btn btn-primary" type="primary" style={{
                                            padding: 8,
                                            width: 100,
                                            height: 35
                                        }}>
                                            CANCELAR
                                        </button>
                                    </Link>
                                    <button className="btn btn-primary m-2" type="submit" style={{
                                        padding: 8,
                                        width: 100,
                                        height: 35
                                    }}>
                                        REGISTRAR
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Content >
        </AdminLayout >
    )
}
