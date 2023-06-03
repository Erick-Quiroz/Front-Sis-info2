import React, { useEffect, useState } from "react";
import { Modal, InputGroup, Form, Button } from "react-bootstrap";

const initialState = {
  name: "",
  lastname: "",
  phone:""
};

const ModalPass = ({
  show,
  userToEdit,
  setShowModal,
  setUserToEdit,
  updateUser
}) => {
    const [user, setUser] = useState(initialState);
  const [password, setpassword] = useState({value: '', valid: true})
  const [lastname, setlastname] = useState({value: '', valid: true})
  const [phone, setphone] = useState({value: '', valid: true})
  


  useEffect(() => {
    if(userToEdit && Object.keys(userToEdit).length !== 0){
        setUser(userToEdit) 
        setpassword({value: userToEdit.password, valid: true})
        setlastname({value: userToEdit.lastname, valid: true})
       
        setphone({value: userToEdit.phone, valid: true})
        
        
      }else{
        setUser(initialState)
      }
  }, [show]);

  const handleOnChange = (e) => { 
    setUser({ ...user, [e.target.password]: e.target.value });
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
    if(password.valid && lastname.valid && phone.valid ){
      
        updateUser(user,password.value,lastname.value,phone.value);

      setShowModal(false);
    }
  }
  return (
    <Form noValidate >
    <Modal show={show} centered>
      <Modal.Header>Nueva Cotraseña</Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text >Contraseña </InputGroup.Text>
          <Form.Control
            style={{ border: password.valid ? '1px solid green': '1px solid red'}}
            placeholder="Contraseña "
            onChange={( e ) => handleOnChangeValidationNoRestrict(e.target.value, 3, 40, setpassword)}
            name="value"
            value={password.value}
          />
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
 
export default ModalPass;

