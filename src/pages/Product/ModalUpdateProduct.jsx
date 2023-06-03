import React, { useEffect, useState } from 'react'
import { Modal, InputGroup, Form, Button } from 'react-bootstrap'
import validUrl from 'valid-url'

const initialState = {
    name: '',
    description: '',
    imageUrl: '',
    state: '',
    category: '',
    price: ''
}

const ModalUpdateProduct = ({
    show,
    productToEdit,
    setShowModal,
    setProductToEdit,
    updateProduct
}) => {
    const [product, setProduct] = useState(initialState)
    const [name, setName] = useState({ value: '', valid: true })
    const [description, setDescription] = useState({ value: '', valid: true })
    const [price, setPrice] = useState({ value: '', valid: true })
    const [imageUrl, setImageUrl] = useState({ value: '', valid: true })

    useEffect(() => {
        if (productToEdit && Object.keys(productToEdit).length !== 0) {
            setProduct(productToEdit)
            setName({ value: productToEdit.name, valid: true })
            setDescription({ value: productToEdit.description, valid: true })
            setPrice({ value: productToEdit.price, valid: true })
            setImageUrl({ value: productToEdit.imageUrl, valid: true })
        } else {
            setProduct(initialState)
        }
    }, [show])

    const handleOnChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const rules = /^[a-zA-Z\s]+$/

    const handleOnChangeValidation = (value, min, max, callback) => {
        if (value.length < min || value.length > max || !rules.test(value)) {
            callback({ value, valid: false })
        } else {
            callback({ value, valid: true })
        }
    }
    const handleOnChangeValidationNumber = (value, min, max, callback) => {
        if (value === null || value === undefined || !/^\d*\.?\d+$/.test(value) || value < 0 || value.length < min || value.length > max) {
            callback({ value, valid: false })
        } else {
            callback({ value, valid: true })
        }
    }
    const handleOnChangeValidationLink = (value, min, max, callback) => {
        const length = value.trim().length
        const validFormat = /\.(jpg|jpeg|png|gif)\b/i
        const valid = validUrl.isWebUri(value) && validFormat.test(value) && length >= min && length <= max
        callback({ value, valid })
    }

    const handleCancel = () => {
        setShowModal(false)
    }

    const handleUpdateProduct = () => {
        if (name.valid && description.valid && price.valid && imageUrl.valid) {
            updateProduct(product, name.value, description.value, price.value, imageUrl.value)
            setShowModal(false)
        }
    }
    const stateOptions = [
        { value: 'Activo', label: 'Activo' },
        { value: 'Inactivo', label: 'Inactivo' }
    ]
    const categoryOptions = [
        { value: 'Lacteos', label: 'Lacteos' },
        { value: 'Gaseosa', label: 'Gaseosa' },
        { value: 'Dulces', label: 'Dulces' },
        { value: 'Abarrotes', label: 'Abarrotes' }
    ]
    function handleKeyDown (event) {
        const regex = /^[a-zA-Z\s]+$/
        const key = event.key
        if (!regex.test(key)) {
            event.preventDefault()
            return false
        }
    }

    return (
        <Form noValidate >
            <Modal show={show} centered>
                <Modal.Header>Editar Producto</Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text >Nombre Producto</InputGroup.Text>
                        <Form.Control
                            style={{ border: name.valid ? '1px solid green' : '1px solid red' }}
                            placeholder="Nombre de Producto"
                            onChange={(e) => handleOnChangeValidation(e.target.value, 3, 20, setName)}
                            name="value"
                            value={name.value}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Descripcion</InputGroup.Text>
                        <Form.Control
                            style={{ border: description.valid ? '1px solid green' : '1px solid red' }}
                            placeholder="Descripcion del producto"
                            name="value"
                            value={description.value}
                            onChange={(e) => handleOnChangeValidation(e.target.value, 3, 20, setDescription)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text >Url de imagen</InputGroup.Text>
                        <Form.Control
                            style={{ border: imageUrl.valid ? '1px solid green' : '1px solid red' }}
                            placeholder="Imagen de Producto"
                            onChange={(e) => handleOnChangeValidationLink(e.target.value, 1, 1000, setImageUrl)}
                            name="value"
                            value={imageUrl.value}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text >Precio</InputGroup.Text>
                        <Form.Control
                            style={{ border: price.valid ? '1px solid green' : '1px solid red' }}
                            placeholder="Precio de Producto"
                            onChange={(e) => handleOnChangeValidationNumber(e.target.value, 1, 5, setPrice)}
                            name="value"
                            value={price.value}
                        />
                    </InputGroup>

                    <Form.Select
                        value={
                            product.state === 'Activo' || product.state === 'Inactivo'
                                ? product.state
                                : 'Estado anterior'
                        }
                        name="state"
                        aria-label="Default select example"
                        onChange={handleOnChange}
                    >
                        <option key="default" disabled>

          Seleccione una estado
                        </option>
                        {stateOptions.map((option) => {
                            if (option.value === product.state) {
                                return (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                )
                            }
                            if (option.value !== product.state) {
                                return (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                )
                            }
                        })}
                    </Form.Select>

                    <Form.Select
                        value={
                            product.category
                                ? product.category
                                : 'Seleccione una categoria'
                        }
                        name="category"
                        aria-label="Default select example"
                        onChange={handleOnChange}
                    >
                        <option key="default" disabled>
          Seleccione una categoria
                        </option>
                        {categoryOptions.map((option) => {
                            if (option.value === product.category) {
                                return (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                )
                            }
                            if (option.value !== product.category) {
                                return (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                )
                            }
                        })}
                    </Form.Select>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleCancel()}>
          Cancel
                    </Button>
                    <Button onClick={handleUpdateProduct}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        </Form>
    )
}

export default ModalUpdateProduct
