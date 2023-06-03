import React, { useEffect, useState } from "react";
import { Modal, InputGroup, Form, Button } from "react-bootstrap";

const initialState = {
  name: "",
  lastname: "",
  phone:""
};

const ModalEdit = ({
  show,
  userToEdit,
  setShowModal,
  setUserToEdit,
  updateUser
}) => {
    const [user, setUser] = useState(initialState);
  const [name, setName] = useState({value: '', valid: true})
  const [lastname, setlastname] = useState({value: '', valid: true})
  const [phone, setphone] = useState({value: '', valid: true})
  


  useEffect(() => {
    if(userToEdit && Object.keys(userToEdit).length !== 0){
        setUser(userToEdit) 
        setName({value: userToEdit.name, valid: true})
        setlastname({value: userToEdit.lastname, valid: true})
       
        setphone({value: userToEdit.phone, valid: true})
        
        
      }else{
        setUser(initialState)
      }
  }, [show]);

  const handleOnChange = (e) => { 
    setUser({ ...user, [e.target.name]: e.target.value });
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

    
  const handleUpdateUser = () => {
    if(name.valid && lastname.valid && phone.valid ){
      
        updateUser(user,name.value,lastname.value,phone.value);

      setShowModal(false);
    }
  }
  return (
    <Form noValidate >
    <Modal show={show} centered>
      <Modal.Header>Editar Perfil</Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text >Nombre </InputGroup.Text>
          <Form.Control
            style={{ border: name.valid ? '1px solid green': '1px solid red'}}
            placeholder="Nombre "
            onChange={( e ) => handleOnChangeValidation(e.target.value, 3, 20, setName)}
            name="value"
            value={name.value}
          />
          {!name.valid && (
              <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                El Nombre ingresado es incorrecto, por favor verifique.
              </div>
            )}
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text >Apellido</InputGroup.Text>
          <Form.Control
            style={{ border: lastname.valid ? '1px solid green': '1px solid red'}}
            placeholder="Apellido"
            onChange={( e ) => handleOnChangeValidation(e.target.value, 3, 20, setlastname)}
            name="value"
            value={lastname.value}
          />
          {!lastname.valid && (
              <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                El Apellido ingresado es incorrecto, por favor verifique.
              </div>
            )}
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text >Teléfono </InputGroup.Text>
          <Form.Control
            style={{ border: phone.valid ? '1px solid green': '1px solid red'}}
            placeholder="Teléfono "
            onChange={( e ) => handleOnChangeValidationNumber(e.target.value, 7, 8, setphone)}
            name="value"
            value={phone.value}
          />
          {!phone.valid && (
              <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                El Teléfono ingresado es incorrecto, por favor verifique.
              </div>
            )}
        </InputGroup>
        
        
        
               
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => handleCancel()}>
          Cancelar
        </Button>
        <Button onClick={handleUpdateUser}>Aceptar</Button>
      </Modal.Footer>
    </Modal>
    </Form>
  );
};
 
export default ModalEdit;

