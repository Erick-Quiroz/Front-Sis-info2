import { Layout, Typography, Button } from 'antd';
import { useEffect, useState } from 'react';
import { ShopLayout } from '../../components/layouts/ShopLayout.jsx';
import { shopAPI } from '../../services/index.js';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import ModalEdit from './ModalEdit.jsx'
//import ModalPass from './ModalPass.jsx'
const { Content } = Layout;
const { Title, Text } = Typography;

export const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const emailAlmacenado = localStorage.getItem('email');
  const [dataEdit, setdataEdit] = useState({})
  const [showModalEdit, setShowModalEdit] = useState(false);
  //const [showModalPass, setShowModalPass] = useState(false);

  const getUserEdit = async (userId) => {
    try {
      const response = await shopAPI.get(`/user/get-user-id/${userId}`);
      const { data } = response;
      if (data.success) {
        setdataEdit(data.user);
      }
    } catch (error) {
      console.log(error);
    }
    setShowModalEdit(true);
  //  setShowModalPass(false);
  };

  const updateUser = async (user, name, lastname, phone, email, password) => {
    try {
        const userUpdated = {
            name,
            lastname,
            phone,
            password,
            email

        }
        const { data } = await shopAPI.put(`/user/update-user/${user._id}`,
        userUpdated
        )
        console.log(data)
        if (data.success) {
          getUser();
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error('Something went wrong');
    }
  };

  const getUser = async () => {
    try {
      const response = await shopAPI.get(`/user/get-user/${emailAlmacenado}`);
      const { data } = response;
      if (data.success) {
        setUserData(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ShopLayout>
      <Content style={{ margin: '0 8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ padding: 14, minHeight: '84vh', width: '400px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
          <Title level={3} style={{ textAlign: 'center' }}>Perfil</Title>
          {userData ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', marginBottom: '8px' }}>
                <Text strong style={{ fontSize: '16px', marginRight: '8px' }}>Email:</Text>
                <Text style={{ fontSize: '14px' }}>{userData.email}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', marginBottom: '8px' }}>
                <Text strong style={{ fontSize: '16px', marginRight: '8px' }}>Nombre:</Text>
                <Text style={{ fontSize: '14px' }}>{userData.name}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', marginBottom: '8px' }}>
                <Text strong style={{ fontSize: '16px', marginRight: '8px' }}>Apellido:</Text>
                <Text style={{ fontSize: '14px' }}>{userData.lastname}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline' }}>
                <Text strong style={{ fontSize: '16px', marginRight: '8px' }}>Teléfono:</Text>
                <Text style={{ fontSize: '14px' }}>{userData.phone}</Text>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px' }}>
                <div className="text-center" style={{ marginTop: '16px' }}>
                  <div className="col-auto">
                    <Link to="/">
                      <button
                        className="btn btn-danger"
                        type="button"
                        style={{ width: '150px' }}
                      >
                        VOLVER
                      </button>
                    </Link>
                  </div>
                  <br />
                  <div className="col-auto">
                    <button
                      className="btn btn-success"
                      type="submit"
                      onClick={() => {
                        getUserEdit(userData._id);
                      }}
                      style={{ width: '150px' }}
                    >
                      Editar Perfil
                    </button>
                  </div>
                  <br />
                  {/* 
                  <div className="col-auto">
                    <button
                      className="btn btn-success"
                      type="submit"
                      onClick={() => {
                        //setShowModalPass(true);
                        setShowModalEdit(false);
                      }}
                      style={{ width: '150px' }}
                    >
                      Cambiar Contraseña
                    </button>
                  </div>
                  */}
                </div>
              </div>
            </div>
          ) : (
            <div>Loading user data...</div>
          )}
        </div>
        <ModalEdit
          show={showModalEdit}
          userToEdit={dataEdit}
          setShowModal={setShowModalEdit}
          setUserToEdit={setdataEdit}
          updateUser={updateUser}
        />
        {/*
        <ModalPass
          show={showModalPass}
          userToEdit={dataEdit}
          setShowModal={setShowModalPass}
          setUserToEdit={setdataEdit}
          updateUser={updateUser}
        />
        */}
      </Content>
    </ShopLayout>
  );
};
