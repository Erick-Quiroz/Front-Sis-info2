import React, { useEffect, useState } from "react";
import { Modal, InputGroup, Form, Button } from "react-bootstrap";

const initialState = {
  name: "",
  description: "",
  state:"",
};

const ModalUpdateCategory = ({
  show,
  categoryToEdit,
  setShowModal,
  setCategoryToEdit,
  updateCategory
}) => {
  const [category, setCategory] = useState(initialState);
  const [name, setName] = useState({value: '', valid: true})
  const [description, setDescription] = useState({value: '', valid: true})

  useEffect(() => {
    if(categoryToEdit && Object.keys(categoryToEdit).length !== 0){
      setCategory(categoryToEdit) 
        setName({value: categoryToEdit.name, valid: true})
        setDescription({value: categoryToEdit.description, valid: true})
      }else{
        setCategory(initialState)
      }
  }, [show]);

  const handleOnChange = (e) => { 
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const rules = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;

  const stateOptions = [
    { value: "Activo", label: "Activo" },
    { value: "Inactivo", label: "Inactivo" }
  ];
  const handleOnChangeValidation = (value, min, max, callback ) => {
    if( value.length < min || value.length > max || !rules.test(value) ){
       callback({value: value, valid: false})
      }else{
        callback({value: value, valid: true})
    }
  }
  const handleCancel = () => {
    setShowModal(false);
    }

  const handleUpdateCategory = () => {
    if(name.valid && description.valid &&stateOptions.find(option => option.value === category.state)){
      console.log(category._id, name.value, description.value, category); // Agregar el console.log aquí
      updateCategory(category,name.value,description.value,);

      setShowModal(false);
    }
  }
  return (
    <Form noValidate >
    <Modal show={show} centered>
      <Modal.Header>Editar Categoria</Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text >Nombre Categoria</InputGroup.Text>
          <Form.Control
            style={{ border: name.valid ? '1px solid green': '1px solid red'}}
            placeholder="Nombre de Categoria"
            onChange={( e ) => handleOnChangeValidation(e.target.value, 3, 20, setName)}
            name="value"
            value={name.value}
          />
          {!name.valid && (
            <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>
              El nombre no puede tener caracteres especiales y debe tener entre 3 y 20 caracteres.
            </div>
          )}
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Descripción</InputGroup.Text>
          <Form.Control
            style={{ border: description.valid ? '1px solid green': '1px solid red'}}
            placeholder="Descripción de Categoría"
            onChange={(e) => handleOnChangeValidation(e.target.value, 3, 100, setDescription)}
            name="value"
            value={description.value}
          />
          {!description.valid && (
            <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>
              La descripción no puede tener caracteres especiales y debe tener entre 3 y 100 caracteres.
            </div>
          )}
        </InputGroup>

        <Form.Select
          value={
            category.state === "Activo" || category.state === "Inactivo"
              ? category.state
              : "Estado anterior"
          }
          name="state"
          aria-label="Default select example"
          onChange={handleOnChange}
        >
          <option key="default" disabled>
          Seleccione una estado
          </option>
          {stateOptions.map((option) => {
            if (option.value === category.state) {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            }
            if (option.value !== category.state) {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            }
          })}
        </Form.Select>

               
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => handleCancel()}>
          Cancelar
        </Button>
        <Button onClick={handleUpdateCategory}>Aceptar</Button>
      </Modal.Footer>
    </Modal>
    </Form>
  );
};
 
export default ModalUpdateCategory;

