import React, { lazy, useState, useEffect } from 'react'
import moment from 'moment'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CLink,
  CCardBody,
  CImg,
  CCardGroup,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CWidgetProgressIcon,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { fireAuth } from "../../fireApi";

import MainChartExample from '../charts/MainChartExample.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const updatename = () => fireAuth.currentUser.updateProfile({
  displayName: "Alfina W. Artamevia",
}).then(function() {
  console.log("SUKSES")
}).catch(function(error) {
  // An error happened.
});

const Dashboard = () => {
  const [time, setTime] = useState();
  useEffect(() => {
    const clock = moment().format('MMMM Do YYYY, h:mm:ss a')
    setTime(clock)
  });

  return (
    <>
    <CRow>
    <CCardGroup className="col-12 pb-3">      
      <CCard>
        <CCardBody style={{backgroundColor:"#d3dedd"}}>
          <CRow>
            <CCol sm="2">
            <CImg
              src="https://firebasestorage.googleapis.com/v0/b/login-laporan-rapat.appspot.com/o/AAAABZ16zFYJlGXqK28UFTG6l7i1hfNBvvuNbxtAaHqMwX6sSXItBBVbk8foH5S4qEsAMsMyzaw6dYhyYEo98QNEE1qhq9Ru.png?alt=media&token=a7ff500d-3917-4520-8d7f-de55213d499e"
              fluid
              width="100%"
              className="image"
            />
            {/* <CButton onClick={updatename.bind(this)}>GANTI</CButton>                         */}
            </CCol>
            <CCol sm="10" className="d-flex align-items-start flex-column">
                <div className="p-2">
                  <h1>Selamat Datang, {fireAuth.currentUser.displayName}</h1>
                </div>
                <div className="p-2">
                  <h5>Semoga harimu menyenangkan dan jangan pernah lelah mencintai negeri ini, ya !  <CIcon name="cif-id" height="25"/></h5>
                </div>   
                <div className="p-2">
                  <h5><b>Server Time :</b> {time} </h5>
                </div>                                            
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCardGroup>
    </CRow>
    <CRow>
    <CCardGroup className="col-3">      
    <CWidgetProgressIcon
          header="Form"
          text="Pelaporan Realisasi"
          style={{backgroundColor:"#28166f"}}
          inverse
        >
          <CIcon name="cil-notes" height="36"/>
      </CWidgetProgressIcon>
    </CCardGroup> 
    <CCardGroup className="col-3">      
    <CWidgetProgressIcon
          header="Form"
          text="Pengajuan Persekot"
          style={{backgroundColor:"#00923f"}}
          inverse
        >
          <CIcon name="cil-dollar" height="36"/>
          <CLink to='/danaku'class="stretched-link"></CLink>
      </CWidgetProgressIcon>
    </CCardGroup> 
    <CCardGroup className="col-3">      
    <CWidgetProgressIcon
          header="Form"
          text="Upload Bukti"
          style={{backgroundColor:"#28166f"}}
          inverse
        >
          <CIcon name="cil-envelope-letter" height="36"/>
      </CWidgetProgressIcon>
    </CCardGroup>              
    </CRow>
    </>
  )
}

export default Dashboard
