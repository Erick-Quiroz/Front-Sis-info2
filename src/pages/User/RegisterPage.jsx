import { enqueueSnackbar } from 'notistack'
import { Layout, theme } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

// import { AdminLayout } from '../../components/layouts/AdminLayout.jsx'
import { ShopLayout } from '../../components/layouts/ShopLayout.jsx'
import { shopAPI } from '../../services/index.js'
import { useForm } from '../../hooks/index.js'
import axios from 'axios'

const initialState = {
    email: '',
    name: '',
    description: '',
    state: '',
    lastname: '',
    phone: '',
    password: '',
    passwordconfirm: ''

}

export const RegisterPage = () => {
    const navigate = useNavigate()
    const { token: { colorBgContainer } } = theme.useToken()
    const [formValues, handlerInputChange] = useForm(initialState)
    const { email, name, description, state, lastname, phone, password, passwordconfirm } = formValues
    const { Content } = Layout

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await shopAPI.post('/user/register-user', { email, name, lastname, phone, password })
            if (data.success) {
                navigate('/')
                enqueueSnackbar('Usuario Registrado', {
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
        <ShopLayout>
            <Content style={{ margin: '0 8px' }}>
                <div
                    style={{
                        padding: 14,
                        minHeight: '84vh',
                        background: colorBgContainer
                    }}
                >
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <form className="p-4 rounded bg-white" onSubmit={handleSubmit}>
                                    <h4 className="text-center mb-4">Registro de Usuario</h4>

                                    {/*
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            <strong>Correo electrónico</strong>
                                        </label>
                                        <input
                                            autoFocus
                                            className="form-control"
                                            id="email"
                                            maxLength={20}
                                            minLength={3}
                                            name="email"
                                            onChange={handlerInputChange}
                                            required
                                            type="text"
                                            value={email}
                                            pattern="[A-Za-zá-ú ]{3,20}"
                                        />
                                        <div className="invalid-feedback">
                                            Por favor, introduce un correo válido (3-20 caracteres).
                                        </div>
                                    </div>
*/}

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            <strong>Correo electrónico</strong>
                                        </label>
                                        <input
                                            autoFocus
                                            className="form-control"
                                            id="email"
                                            maxLength={320} // Establece el límite máximo de caracteres para un correo electrónico
                                            minLength={3} // Establece el límite mínimo de caracteres para un correo electrónico
                                            name="email"
                                            onChange={handlerInputChange}
                                            required
                                            type="email" // Cambiado a "email" para validar el formato de correo electrónico automáticamente
                                            value={email}
                                        />
                                        <div className="invalid-feedback">
                                            Por favor, introduce un correo válido (8-100 caracteres).
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            <strong>Nombre</strong>
                                        </label>
                                        <input
                                            autoFocus
                                            className="form-control"
                                            id="name"
                                            maxLength={20}
                                            minLength={3}
                                            name="name"
                                            onChange={handlerInputChange}
                                            required
                                            type="text"
                                            value={name}
                                            pattern="[A-Za-zá-ú ]{3,20}"
                                        />
                                        <div className="invalid-feedback">
                                            Por favor, introduce un nombre válido (3-20 caracteres).
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastname" className="form-label">
                                            <strong>Apellido</strong>
                                        </label>
                                        <input
                                            autoFocus
                                            className="form-control"
                                            id="lastname"
                                            maxLength={20}
                                            minLength={3}
                                            name="lastname"
                                            onChange={handlerInputChange}
                                            required
                                            type="text"
                                            value={lastname}
                                            pattern="[A-Za-zá-ú ]{3,20}"
                                        />
                                        <div className="invalid-feedback">
                                            Por favor, introduce un nombre válido (3-20 caracteres).
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">
                                            <strong>Celular</strong>
                                        </label>
                                        <input
                                            autoFocus
                                            className="form-control"
                                            id="phone"
                                            maxLength={8} // Establece el límite máximo de caracteres para el número de teléfono
                                            minLength={7} // Establece el límite mínimo de caracteres para el número de teléfono
                                            name="phone"
                                            onChange={handlerInputChange}
                                            required
                                            type="tel" // Cambiado a "tel" para indicar que es un campo de entrada de número de teléfono
                                            pattern="[0-9]{7,8}" // Utiliza una expresión regular para permitir solo dígitos y una longitud de 7 a 8 dígitos
                                            value={phone}
                                        />
                                        <div className="invalid-feedback">
                                            Por favor, introduce un número de teléfono válido (7-8 dígitos).
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            <strong>Contraseña</strong>
                                        </label>
                                        <input
                                            className="form-control"
                                            id="password"
                                            maxLength={50}
                                            minLength={8}
                                            name="password"
                                            onChange={handlerInputChange}
                                            required
                                            type="password"
                                            value={password}
                                        />
                                        <div className="invalid-feedback">
                                            Por favor, introduce una contraseña válida (8-50 caracteres).
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="passwordconfirm" className="form-label">
                                            <strong>Confirmar Contraseña</strong>
                                        </label>
                                        <input
                                            className="form-control"
                                            id="passwordconfirm"
                                            maxLength={50}
                                            minLength={8}
                                            name="passwordconfirm"
                                            onChange={handlerInputChange}
                                            required
                                            type="password"
                                            value={passwordconfirm}
                                        />
                                        {password !== passwordconfirm && (
                                            <div className="alert alert-danger" role="alert">
                                                Las contraseñas no coinciden.
                                            </div>
                                        )}
                                        <div className="invalid-feedback">
                                            Por favor, introduce una contraseña válida (8-50 caracteres).
                                        </div>
                                    </div>

                                    <div className="row justify-content-end">
                                        <div className="col-auto">
                                            <Link to="/">
                                                <button
                                                    className="btn btn-danger"
                                                    type="button"
                                                    style={{ width: '100px' }}
                                                >
                                                    CANCELAR
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="col-auto">
                                            <button
                                                className="btn btn-success"
                                                type="submit"
                                                style={{ width: '100px' }}
                                            >
                                                REGISTRAR
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </ShopLayout>
    )
}
