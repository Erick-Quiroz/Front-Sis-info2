import { enqueueSnackbar } from 'notistack'
import { Layout, theme } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import { AdminLayout } from '../../components/layouts/AdminLayout.jsx'
import { shopAPI } from '../../services'
import { useForm } from '../../hooks'
import axios from 'axios'

const initialState = {
    name: '',
    description: '',
    state: 'Activo'

}

export const CategoryCreatePage = () => {
    const navigate = useNavigate()
    const { token: { colorBgContainer } } = theme.useToken()
    const [formValues, handlerInputChange] = useForm(initialState)
    const { name, description, state } = formValues
    const { Content } = Layout

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await shopAPI.post('/category/create-category', { name, description, state })
            if (data.success) {
                navigate('/admin/categorias')
                enqueueSnackbar('Categoría creada', {
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
                            <h4 className="title" >Registrar Categoría</h4>
                            <div className="row  mb-3">

                                <div className="col col-sm-6">
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
                                        pattern="[A-Za-zá-ú ]{3,20}"
                                    />
                                    <div className="invalid-feedback" style={{
                                        padding: 1

                                    }}>
                                        <p style={{
                                            padding: 1

                                        }}>Completa este campo</p>
                                    </div>
                                </div>

                                <div className="col col-sm-6">
                                    <label
                                        htmlFor="disabledTextInput"
                                        className="form-label">
                                        <strong>Descripción</strong>
                                    </label>
                                    <input
                                        className="form-control"
                                        id="description"
                                        maxLength={100}
                                        minLength={3}
                                        name='description'
                                        onChange={handlerInputChange}
                                        required
                                        type="text"
                                        value={description}
                                        pattern="[A-Za-zá-ú ]{3,100}"
                                    />
                                    <div className="invalid-feedback">
                                        Completa este campo.
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-6 col-sm-6">
                                    <label
                                        htmlFor="disabledSelect1"
                                        className="form-label">
                                        <strong>Estado</strong>
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

                            </div>

                            <div className="container text-end">
                                <div className="">
                                    <Link to={'/admin/categorias'}>
                                        <button className="btn btn-danger" type="primary" style={{
                                            padding: 8,
                                            width: 100,
                                            height: 35
                                        }}>
                                            CANCELAR
                                        </button>
                                    </Link>
                                    <button className="btn btn-success m-2" type="submit" style={{
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
