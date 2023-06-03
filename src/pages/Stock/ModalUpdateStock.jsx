import React, { useEffect, useState } from 'react'
import { Modal, InputGroup, Form, Button } from 'react-bootstrap'

function sumar(a, b) {
  return a + b
}
const initialState = {
  name: '',
  expiration: '',
  existence: ''
}

const ModalUpdateStock = ({
  show,
  productToEdit,
  setShowModal,
  setCategoryToEdit,
  updateProduct
}) => {
  const [product, setProduct] = useState(initialState)
  const [name, setName] = useState({ value: '', valid: true })
  const [description, setDescription] = useState({ value: '', valid: true })
  const [utility, setUtility] = useState({ value: '', valid: true })
  const [price, setPrice] = useState({ value: '', valid: true })
  const [cost, setCost] = useState({ value: '', valid: true })
  const [expiration, setExpiration] = useState({ value: '', valid: true })
  const [received, setReceived] = useState({ value: '', valid: true })
  const [existence, setExistence] = useState({ value: '', valid: true })

  useEffect(() => {
    if (productToEdit && Object.keys(productToEdit).length !== 0) {
      setProduct(productToEdit)
      setName({ value: productToEdit.name, valid: true })
      setDescription({ value: productToEdit.description, valid: true })
      setCost({ value: productToEdit.cost, valid: true })
      setPrice({ value: productToEdit.price, valid: true })
      setUtility({ value: productToEdit.utility, valid: true })
      setExpiration({ value: productToEdit.expiration, valid: true })
      setReceived({ value: productToEdit.received, valid: true })
      setExistence({ value: productToEdit.existence, valid: true })
    } else {
      setProduct(initialState)
    }
  }, [show])

  const handleOnChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value })
  }

  const rules = /^[a-zA-Z\s]+$/

  const stateOptions = [
    { value: 'Activo', label: 'Activo' },
    { value: 'Inactivo', label: 'Inactivo' }
  ]
  const handleOnChangeValidation = (value, min, max, callback) => {
    if (value.length < min || value.length > max) {
      callback({ value, valid: false })
    } else {
      callback({ value, valid: true })
    }
  }
  const handleCancel = () => {
    setShowModal(false)
  }

  const handleUpdateCategory = () => {
    if (name.valid && cost.valid && price.valid && utility.valid && expiration.valid && received.valid) {
      console.log(product._id, name.value, description.value, product) // Agregar el console.log aquí
      updateProduct(product, name.value, cost.value, expiration.value, received.value, existence.value)

      setShowModal(false)
    }
  }
  const handleOnChangeValidationNumber = (value, min, max, callback) => {
    if (value === null || value === undefined || !/^[0-9]+$/.test(value) || value < 1 || value > 150 || value.length < min || value.length > max) {
      callback({ value, valid: false })
    } else {
      callback({ value, valid: true })
    }
  }

  return (
    <Form noValidate >
      <Modal show={show} centered>
        <Modal.Header>Añadir inventario</Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text >Precio de compra</InputGroup.Text>
            <Form.Control
              style={{ border: cost.valid ? '1px solid green' : '1px solid red' }}
              placeholder="Costo unitario"
              onChange={(e) => handleOnChangeValidationNumber(e.target.value, 1, 3, setCost)}
              name="value"
              value={cost.value}
            />
            {!cost.valid && (
              <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                
                El dato ingresado es incorrecto, por favor verifique.
              </div>
            )}

          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text >Fecha de entrega</InputGroup.Text>
            <Form.Control
              imput type="date" min="2023-05-01" max="2023-12-31"
              style={{ border: expiration.valid ? '1px solid green' : '1px solid red' }}
              placeholder="fecha de entrega"
              onChange={(e) => handleOnChangeValidation(e.target.value, 3, 25, setExpiration)}
              name="value"
              value={expiration.value}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text >Cantidad recibida(Ud)</InputGroup.Text>
            <Form.Control
              style={{ border: received.valid ? '1px solid green' : '1px solid red' }}
              placeholder="Cantidad recibida"
              onChange={(e) => handleOnChangeValidationNumber(e.target.value, 1, 3, setReceived)}
              name="value"
              value={received.value}
            />
            {!received.valid && (
              <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>

                El dato ingresado es incorrecto, por favor verifique.
              </div>
            )}

          </InputGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleCancel()}>
            Cancelar
          </Button>
          <Button onClick={handleUpdateCategory}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
    </Form>

  ); console.log
}

export default ModalUpdateStock
