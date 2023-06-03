import React, { useEffect, useState } from "react";
import { Modal, InputGroup, Form, Button } from "react-bootstrap";

const initialState = {
  name: '',
  description: "",
  imageUrl: "",
  state: "",
  category: "",
  pocenage:"0",
  price: "",

};

const ModalAddOffer = ({
  show,
  productToEdit,
  setShowModal,
  setProductToEdit,
  updateProduct
}) => {
  const [product, setProduct] = useState(initialState);
  const [name, setName] = useState({value: '', valid: true})
  const [description, setDescription] = useState({value: '', valid: true})
  const [price, setPrice]= useState({value:'', valid: true})
  const [porcentage, setPorcentage]= useState({value:'', valid: true})
  const [imageUrl, setImageUrl]= useState({value:'', valid: true})

  useEffect(() => {
    if(productToEdit && Object.keys(productToEdit).length !== 0){
        setProduct(productToEdit) 
        setName({value: productToEdit.name, valid: true})
        setDescription({value: productToEdit.description, valid: true})
        setPrice({value: productToEdit.price, valid:true})
        setPorcentage({value: productToEdit.porcentage, valid:true})
        setImageUrl({value: productToEdit.imageUrl, valid:true})
      }else{
        setProduct(initialState)
      }
  }, [show]);

  const handleOnChange = (e) => { 
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const rules =  /^[a-zA-Z\s]+$/;

  const handleOnChangeValidation = (value, min, max, callback ) => {
    if( value.length < min || value.length > max || !rules.test(value) ){
       callback({value: value, valid: false})
      }else{
        callback({value: value, valid: true})
    }
  }
  const handleOnChangeValidationNumber = (value, min, max, callback) => {
    if (value === null || value === undefined || !/^[0-9]+$/.test(value) || value < 1 || value > 100 || value.length < min || value.length > max) {
   
      callback({ value: value, valid: false });
      
    } else {

      callback({ value: value, valid: true });
    }
  }
  

  const handleCancel = () => {
    setShowModal(false);
    };

  const handleUpdateProduct = () => {
    if(name.valid && description.valid && price.valid && porcentage.valid&& imageUrl.valid){
      updateProduct(product, name.value, description.value, price.value,porcentage.value, imageUrl.value);
      setShowModal(false);
    }
  };
  
  function handleKeyDown(event) {
    const regex = /^[a-zA-Z\s]+$/;
    const key = event.key;
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  }
  return (
    <Form noValidate >
    <Modal show={show} centered>
      <Modal.Header>Ingrese Porcentaje de Oferta%</Modal.Header>
      <Modal.Body>
        
        
        

        

        <InputGroup className="mb-3">
          <InputGroup.Text >Porcentaje de Descuento</InputGroup.Text>
          <Form.Control
            style={{ border: porcentage.valid ? '1px solid green': '1px solid red'}}
            placeholder="porcentaje de descuento"
            onChange={( e ) => handleOnChangeValidationNumber(e.target.value, 1, 5, setPorcentage)}
            name="value"
            value={porcentage.value}
          />
        </InputGroup>

        {!porcentage.valid && (
            <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>
              Dato incorrecto
            </div>
          )}

        

        
      
        

      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button onClick={handleUpdateProduct}>Aceptar</Button>
      </Modal.Footer>
    </Modal>
    </Form>
  );
};
 
export default ModalAddOffer;

