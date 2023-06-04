import Autosuggest from 'react-autosuggest'
import { useState, useEffect } from 'react'
import { shopAPI } from '../../services'
import { useNavigate } from 'react-router-dom'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import './SearchComponent.css'

export const Search = () => {
    const [data, setData] = useState([])
    const [value, setValue] = useState('')
    const [productos, setProductos] = useState([])
    const [productoSeleccionado, setProductoSeleccionado] = useState({})
    const [mostrarBuscador, setMostrarBuscador] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getAll()
    }, [])

    const getAll = async () => {
        try {
            const response = await shopAPI.get('/productLG/get-productLG')
            const { product } = response.data
            setData(product)
        } catch (error) {
            console.log(error)
        }
    }

    const filtrarProductos = (inputValue) => {
        const normalizedInput = normalizeString(inputValue)
        const filtered = data.filter((product) => {
            const text = `${product.name} - ${product.description}`
            const normalizedText = normalizeString(text)
            return normalizedText.includes(normalizedInput)
        })
        return filtered
    }

    const normalizeString = (str) => {
        return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }

    const onSuggestionsFetchRequested = ({ value }) => {
        setProductos(filtrarProductos(value))
    }

    const onSuggestionsClearRequested = () => {
        setProductos([])
    }

    const getSuggestionValue = (suggestion) => {
        return `${suggestion.name} - ${suggestion.description}`
    }

    const renderSuggestion = (suggestion) => (
        <div className="sugerencia" onClick={() => seleccionarProducto(suggestion)}>
            <div className="sugerencia__contenido">
                <img className="sugerencia__imagen" src={suggestion.imageUrl} alt="Producto" />
                <div className="sugerencia__texto">
                    <p className="sugerencia__nombre">{suggestion.name}</p>
                </div>
            </div>
        </div>
    )

    const seleccionarProducto = (producto) => {
        setProductoSeleccionado(producto)
        handleRedirect(producto)
    }

    const onChange = (event, { newValue }) => {
        setValue(newValue)
    }

    const inputProps = {
        placeholder: 'Nombre del producto',
        value,
        onChange
    }

    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            const [name, description] = event.target.value.split('-').map((str) => str.trim())
            const selectedProduct = { name, description }
            seleccionarProducto(selectedProduct)
        }
    }

    const handleRedirect = (selectedProduct) => {
        if (selectedProduct._id) {
            navigate(`/productos/${selectedProduct._id}`)
        } else {
            navigate('/')
        }
    }

    const toggleBuscador = () => {
        setMostrarBuscador(!mostrarBuscador)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {mostrarBuscador
                ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Autosuggest
                            suggestions={productos}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                            onSuggestionSelected={handleEnterKeyPress}
                        />
                        <CloseOutlined onClick={toggleBuscador} style={{ marginLeft: '0.5rem', cursor: 'pointer', color: '#8000e5', padding: '5px', border: '1px solid #8000e5', margin: '2px' }} />
                    </div>
                )
                : (
                    <SearchOutlined onClick={toggleBuscador} style={{ marginRight: '0.5rem', cursor: 'pointer', color: '#8000e5', padding: '5px', border: '1px solid #8000e5', margin: '2px' }} />

                )}
        </div>
    )
}
