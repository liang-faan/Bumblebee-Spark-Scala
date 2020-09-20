import React, { useState } from 'react'
import { Link, Redirect, Route } from 'react-router-dom'
import { handleLogin, isLogin } from '../../../service/auth'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CModal,
  CRow,
  CModalHeader,
  CModalBody, CModalFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

function refreshPage() {
  window.location.replace("/")
  window.location.reload();
}





const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const handleSubmit = (evt) => {

    evt.preventDefault();
    console.log("userName" + username);
    if (username && password) {
      handleLogin(username, password).then(
        resp => {
          console.log(resp)
          if (resp.access_token) {
            refreshPage();
          }
        }
      ).catch(err => {
        console.log(err);
        toggle();
      });

    }


    if (isLogin()) {
      return (<Route path="/" name="Home" render={() => <Redirect to="/" />} />)
    }
    // window.location.reload(); 
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CModal show={modal} onClose={toggle}>
                    <CModalHeader closeButton color="warning">Unauthorized Access (401)</CModalHeader>
                    <CModalBody>
                      Invalid Username or Password.
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={toggle}>OK</CButton>
                    </CModalFooter>
                  </CModal>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" onChange={e => setUsername(e.target.value)} required />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={e => setPassword(e.target.value)} required />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" type="Submit">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
