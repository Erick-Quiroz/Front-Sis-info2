
import Autosuggest from 'react-autosuggest'
import { useState, useEffect } from 'react'
import { shopAPI } from '../../services'
import { useNavigate } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import './SearchComponent.css'

export const Search = () => {
    const [data, setData] = useState([])
    const [value, setValue] = useState('')
    const [productos, setProductos] = useState(data)
    const [productoSeleccionado, setProductoseleccionado] = useState({})
    const navigate = useNavigate()

    const getAll = async () => {
        const { data: { product } } = await shopAPI.get('/productLG/get-productLG')
        setData(product)
    }
    useEffect(() => {
        getAll()
    }, [])

    const onSuggestionsFetchRequested = ({ value }) => {
        setProductos(filtrarproductos(value))
    }

    const filtrarproductos = (value) => {
        const inputValue = value.trim().toLowerCase()
        const inputLength = inputValue.length

        const filtrado = data.filter((name) => {
            const textoCompleto = name.name + ' - ' + name.description

            if (textoCompleto.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(inputValue)) {
                return name
            }
            return false
        })
        return inputLength === 0 ? [] : filtrado
    }

    const onSuggestionsClearRequested = () => {
        setProductos([])
    }

    const getSuggestionValue = (suggestion) => {
        return `${suggestion.name} - ${suggestion.description}`
    }

    const renderSuggestion = (suggestion) => (
        <div
            className='sugerencia'
            onClick={() => seleccionarname(suggestion)}
        // style={{ cursor: 'pointer', position: 'relative', padding: '5px', margin: '0px', borderRadius: '5px' }}
        >
            {`${suggestion.name} - ${suggestion.description}`}
        </div>
    )

    const seleccionarname = (name) => {
        setProductoseleccionado(name)
    }

    const onChange = (e, { newValue }) => {
        setValue(newValue)
    }

    const inputProps = {
        placeholder: 'Nombre - Descripcion',
        value,
        onChange
    }

    const eventEnter = (e) => {
        if (e.key === 'Enter') {
            const split = e.target.value.split('-')
            const name = {
                name: split[0].trim(),
                description: split[1].trim()
            }
            seleccionarname(name)
        }
    }
    const handleRedirect = (elproducto) => {
        if (elproducto._id !== undefined &&
            elproducto._id !== null &&
            elproducto._id !== '' &&
            elproducto._id !== 0 &&
            elproducto._id !== '0' &&
            elproducto._id !== 'undefined' &&
            elproducto._id !== 'null' &&
            elproducto._id !== 'NaN') {
            navigate(`/productos/${elproducto._id}`)
        } else {
            navigate('/')
        }
    }

    return (
        <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Autosuggest
                style={{ border: '2px solid red' }}
                suggestions={productos}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={eventEnter}
            />
            <button
                className="btn btn-outline-success "
                onClick={() => { handleRedirect(productoSeleccionado) }}
                style={{
                    width: 30
                }}
            >
                <SearchOutlined
                // style={{ display: 'inline-block' }}
                />
            </button>
        </div>
    )
}
