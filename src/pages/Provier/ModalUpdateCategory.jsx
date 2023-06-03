import React, { useEffect, useState } from "react";
import { Modal, InputGroup, Form, Button } from "react-bootstrap";

const initialState = {
  name: "",
  address: "",
  phonenumber1:"",
  phonenumber2:"",
  email1:"",
  email2:"",
};

const ModalUpdateCategory = ({
  show,
  supplierToEdit,
  setShowModal,
  setSupplierToEdit,
  updateSupplier
}) => {
  const [supplier, setSupplier] = useState(initialState);
  const [name, setName] = useState({value: '', valid: true})
  const [description, setDescription] = useState({value: '', valid: true})
  //cambios
  const [address, setAddress] = useState({value: '', valid: true})
  const [phonenumber1, setPhonenumber1] = useState({value: '', valid: true})
  const [phonenumber2, setPhonenumber2] = useState({value: '', valid: true})
  const [email1, setEmail1] = useState({value: '', valid: true})
  const [email2, setEmail2] = useState({value: '', valid: true})


  useEffect(() => {
    if(supplierToEdit && Object.keys(supplierToEdit).length !== 0){
      setSupplier(supplierToEdit) 
        setName({value: supplierToEdit.name, valid: true})
        setDescription({value: supplierToEdit.description, valid: true})
        setAddress({value: supplierToEdit.address, valid: true})
        setPhonenumber1({value: supplierToEdit.phonenumber1, valid: true})
        setPhonenumber2({value: supplierToEdit.phonenumber2, valid: true})
        setEmail1({value: supplierToEdit.email1, valid: true})
        setEmail2({value: supplierToEdit.email2, valid: true})

        
      }else{
        setSupplier(initialState)
      }
  }, [show]);

  const handleOnChange = (e) => { 
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const rules =  /^[a-zA-Z\s]+$/;

  const handleOnChangeValidation = (value, min, max, callback ) => {
    if( value.length < min || value.length > max || !rules.test(value) ){
       callback({value: value, valid: false})
      }else{
        callback({value: value, valid: true})
    }
  }
  const handleOnChangeValidationNoRestrict = (value, min, max, callback ) => {
    if( value.length < min || value.length > max ){
       callback({value: value, valid: false})
      }else{
        callback({value: value, valid: true})
    }
  }
  const handleOnChangeValidationNumber = (value, min, max, callback ) => {
    if( value.length < min || value.length > max || !/^\d+$/.test(value) ){
       callback({value: value, valid: false})
      }else{
        callback({value: value, valid: true})
    }
  }
  const handleOnChangeValidationEmail = (value, min, max, callback ) => {
    const emailRegex = /^[a-zA-Z0-9_.\-"]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/ 
    if( value.length < min || value.length > max || !emailRegex.test(value) ){
      callback({value: value, valid: false})
    }else{
      callback({value: value, valid: true})
    }
  }
  const handleCancel = () => {
    setShowModal(false);
    }

    
  const handleUpdateSupplier = () => {
    if(name.valid && address.valid && phonenumber1.valid && phonenumber2.valid && email1.valid && email2.valid){
      console.log(supplier._id, name.value, address.value, supplier, phonenumber1.value, phonenumber2.value, email1.value, email2.value); // Agregar el console.log aquí
      updateSupplier(supplier,name.value,address.value,phonenumber1.value, phonenumber2.value, email1.value, email2.value);

      setShowModal(false);
    }
  }
  return (
    <Form noValidate >
    <Modal show={show} centered>
      <Modal.Header>Editar Proveedor</Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text >Nombre Proveedor</InputGroup.Text>
          <Form.Control
            style={{ border: name.valid ? '1px solid green': '1px solid red'}}
            placeholder="Nombre de proveedor"
            onChange={( e ) => handleOnChangeValidation(e.target.value, 3, 40, setName)}
            name="value"
            value={name.value}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text >Dirección</InputGroup.Text>
          <Form.Control
            style={{ border: address.valid ? '1px solid green': '1px solid red'}}
            placeholder="Direccion de proveedor"
            onChange={( e ) => handleOnChangeValidationNoRestrict(e.target.value, 5, 50, setAddress)}
            name="value"
            value={address.value}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text >Teléfono 1</InputGroup.Text>
          <Form.Control
            style={{ border: phonenumber1.valid ? '1px solid green': '1px solid red'}}
            placeholder="Teléfono 1"
            onChange={( e ) => handleOnChangeValidationNumber(e.target.value, 7, 8, setPhonenumber1)}
            name="value"
            value={phonenumber1.value}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text >Teléfono 2</InputGroup.Text>
          <Form.Control
            style={{ border: phonenumber2.valid ? '1px solid green': '1px solid red'}}
            placeholder="Teléfono 2"
            onChange={( e ) => handleOnChangeValidationNumber(e.target.value, 7, 8, setPhonenumber2)}
            name="value"
            value={phonenumber2.value}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text >Email 1</InputGroup.Text>
          <Form.Control
            style={{ border: email1.valid ? '1px solid green': '1px solid red'}}
            placeholder="Email"
            onChange={( e ) => handleOnChangeValidationEmail(e.target.value, 3, 50, setEmail1)}
            name="value"
            value={email1.value}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text >Email 2</InputGroup.Text>
          <Form.Control
            style={{ border: email2.valid ? '1px solid green': '1px solid red'}}
            placeholder="Email"
            onChange={( e ) => handleOnChangeValidationEmail(e.target.value, 3, 50, setEmail2)}
            name="value"
            value={email2.value}
          />
        </InputGroup>
               
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => handleCancel()}>
          Cancelar
        </Button>
        <Button onClick={handleUpdateSupplier}>Aceptar</Button>
      </Modal.Footer>
    </Modal>
    </Form>
  );
};
 
export default ModalUpdateCategory;

