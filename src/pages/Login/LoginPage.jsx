import React, { useState } from 'react'
import { Layout, theme } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { ShopLayout } from '../../components/layouts/ShopLayout.jsx'
import { shopAPI } from '../../services/index.js'
import { useForm } from '../../hooks/index.js'
import axios from 'axios'

const initialState = {
  email: '',
  password: ''
}

export const LoginPage = () => {
  const navigate = useNavigate()
  const { token: { colorBgContainer } } = theme.useToken()
  const [formValues, handlerInputChange] = useForm(initialState)
  const { email, password } = formValues
  const { Content } = Layout
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Estado para controlar si el usuario ha iniciado sesión

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await shopAPI.post('/user/login-user', { email, password })
      if (data.success) {
        const { role } = data
        // Check user role and redirect accordingly
        if (role === 1) {
          navigate('/admin')
        } else if (role === 0) {
          localStorage.setItem('email', email)
          setIsLoggedIn(true) // Actualizar el estado a true después de un inicio de sesión exitoso
          navigate('/')
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response.status === 401) {
          setError('Contraseña incorrecta, intenta nuevamente.')
        } else if (error.response.status === 404) {
          setError('El correo electrónico no está registrado')
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
                  <h4 className="text-center mb-4">Inicio de Sesión</h4>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <strong>Correo electrónico</strong>
                    </label>
                    <input
                      autoFocus
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={handlerInputChange}
                      required
                      type="email"
                      value={email}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      <strong>Contraseña</strong>
                    </label>
                    <input
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={handlerInputChange}
                      required
                      type="password"
                      value={password}
                    />
                  </div>
                  {error && <div className="text-danger mb-3">{error}</div>}
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
                        iniciar
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
