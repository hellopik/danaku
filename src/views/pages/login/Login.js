import React, {useState}  from 'react'
import { Link } from 'react-router-dom'
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
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Login = (props) => {
  const [value, setValue] = useState({email: '', password: '', submitting: false})

  const handleSubmit = e => {
    e.preventDefault();
    setValue(prevState => ({...prevState, submitting : true }));
    props.onSubmit(value.email, value.password);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setValue(prevState => ({...prevState, [name]: value }));
  }; 


  /* setNilai(prevState => ({...prevState, [name] : value, totalkemasan : value })); */
  console.log("username", value.email)
  console.log("password", value.password)
  return (
    <div className="c-app flex-row align-items-center imagu">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Harap Masukkan Username dan Password</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={handleChange.bind(this)} name="email" type="text" placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={handleChange.bind(this)} name="password" type="password" placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={handleSubmit.bind(this)} color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-black bg-secondary py-5 d-md-down-none" style={{ width: '44%', backgroundColor:"#00923f"}} >
                <CCardBody>
                  <div>
                    <h1><b>DANAKU</b></h1>
                    <h5>Sistem Pengajuan dan Pelaporan Persekot</h5>
                    <div className="pt-3">
                    <p>Konten yang ada di aplikasi ini diperuntukkan khusus untuk personel berwenang dan terotorisasi</p>
                    <p>Untuk mendapatkan akses, harap menghubungi Seksi TOP</p>
                    </div>                   
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
