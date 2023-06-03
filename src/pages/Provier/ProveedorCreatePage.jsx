import { useState } from 'react'
import { Layout, theme } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import BACKENDURL from '../../utils/backendUrl.js'
import { AdminLayout } from '../../components/layouts/AdminLayout.jsx'
import { enqueueSnackbar } from 'notistack'
import { shopAPI } from '../../services'
import { useForm } from '../../hooks'

const initialState = {
    name: '',
    address: '',
    phonenumber1: '',
    phonenumber2: '',
    email2: ''

}
// import "../../styles/AuthStyles.css";
export const ProveedorCreatePage = () => {
    const { Content } = Layout
    const { token: { colorBgContainer } } = theme.useToken()
    const [formValues, handlerInputChange] = useForm(initialState)
    const { name, address, phonenumber1, phonenumber2, email1, email2 } = formValues

    const navigate = useNavigate()

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        const phoneRegex = /^[0-9]{7,8}$/
        const regex = /^[a-zA-Z ]*$/
        const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        const direc = /^[0-9a-zA-Z\s.#\/]+$/

        if (!direc.test(address)) {
            enqueueSnackbar('Direccion no valida', {

                variant: 'error',
                autoHideDuration: 5000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
            return
        }

        if (!mail.test(email1) || !mail.test(email2)) {
            enqueueSnackbar('El Email1 o Email2 no valido', {

                variant: 'error',
                autoHideDuration: 5000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
            return
        }

        if (!regex.test(name)) {
            enqueueSnackbar('El nombre no es válido', {
                variant: 'error',
                autoHideDuration: 5000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
            return
        }

        if (!phoneRegex.test(phonenumber1) || !phoneRegex.test(phonenumber2)) {
            enqueueSnackbar('Los números de teléfono deben ser enteros y tener de 7 a 8 caracteres', {
                variant: 'error',
                autoHideDuration: 5000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
            return
        }
        try {
            const { data } = await shopAPI.post(`${BACKENDURL}/api/supplierLG/create-supplierLG`, {
                name, address, phonenumber1, phonenumber2, email1, email2
            })
            if (data.success) {
                navigate('/admin/proveedors')
                enqueueSnackbar('Proveedor agregado', {
                    variant: 'success',
                    autoHideDuration: 3500,
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

    return (
        <AdminLayout>
            <Content style={{ margin: '0 8px' }}>
                <div
                    style={{
                        padding: 14,
                        minHeight: '86vh',
                        background: colorBgContainer
                    }}
                >

                    <div className="form-container container-fluid " >
                        <form className='row g-3 needs-validation was-validated'
                            noValidate=""
                            onSubmit={handleSubmit}
                        >

                            <h4 className="title" >Registrar Proveedor</h4>
                            <div className="row  mb-3">
                                <div className="col-md-6">
                                    <label
                                        htmlFor="validationCustom01"
                                        className="form-label">
                                        Nombre
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
                                        Nombre es requerido.
                                    </div>

                                </div>

                                <div className="col">
                                    <label
                                        htmlFor="disabledTextInput"
                                        className="form-label">
                                        Direccion
                                    </label>
                                    <input
                                        className="form-control"
                                        id="address"
                                        maxLength={20}

                                        minLength={7}

                                        name='address'
                                        onChange={handlerInputChange}
                                        required
                                        type="text"
                                        value={address}
                                    />
                                    <div className="invalid-feedback">
                                    Direccion es requerido.
                                    </div>
                                </div>
                            </div>

                            <div className="row  mb-3">
                                <div className="col">
                                    <label
                                        htmlFor="validationCustom05"
                                        className="form-label">

                                        Telefono 1

                                    </label>
                                    <input
                                        className="form-control"
                                        id="phonenumber1"
                                        maxLength={8}
                                        minLength={7}
                                        name='phonenumber1'
                                        onChange={handlerInputChange}

                                        pattern="^[0-9]+$"
                                        required
                                        type="tel"

                                        value={phonenumber1}
                                    />
                                    <div className="invalid-feedback">
                                    telefono 1 es requerido
                                    </div>
                                </div>

                                <div className="col">
                                    <label
                                        htmlFor="validationCustom05"
                                        className="form-label">

                                        Telefono 2

                                    </label>
                                    <input
                                        className="form-control"
                                        id="name"
                                        maxLength={8}
                                        minLength={7}
                                        name='phonenumber2'
                                        onChange={handlerInputChange}

                                        pattern="^[0-9]+$"
                                        required
                                        type="tel"

                                        value={phonenumber2}
                                    />
                                    <div className="invalid-feedback">
                                    telefono 2 es requerido
                                    </div>
                                </div>
                            </div>
                            <div className="row  mb-3">
                                <div className="col">
                                    <label htmlFor="disabledTextInput" className="form-label">Email 1</label>
                                    <input
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        maxLength={20}
                                        minLength={7}
                                        name='email1'
                                        onChange={handlerInputChange}
                                        required
                                        type="text"
                                        value={email1}

                                    />
                                    <div className="invalid-feedback">
                                        Email es requerido.
                                    </div>
                                </div>

                                <div className="col">
                                    <label htmlFor="disabledTextInput" className="form-label">Email 2</label>
                                    <input
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        maxLength={20}
                                        minLength={3}
                                        name='email2'
                                        onChange={handlerInputChange}
                                        required
                                        type="text"
                                        value={email2}
                                    />
                                    <div className="invalid-feedback">
                                        Email es requerido.
                                    </div>
                                </div>
                            </div>

                            <div className="container text-end">
                                <div className="">
                                    <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)} tyle={{
                                        padding: 8,
                                        width: 100,
                                        height: 35
                                    }}>CANCELAR</button>

                                    <button type="submit" className="btn btn-primary" tyle={{
                                        padding: 8,
                                        width: 100,
                                        height: 35
                                    }}>
                                GUARDAR
                                    </button>
                                </div>
                            </div>

                        </form>
                        <div>
                            <h1></h1>
                        </div>

                    </div>
                </div>
            </Content>
        </AdminLayout>
    )
}
