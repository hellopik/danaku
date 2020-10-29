import React, { useState } from 'react'
import Select from 'react-select';
import {
  CButton,
  CFormGroup,
  CLabel,
  CInput,
  CCollapse,
  CCardBody,
  CDataTable,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow
} from '@coreui/react'

import { detil,fielddetil } from './Sourcedanaku.js'

const Tambahdetil = (props) => {

  const [modal, setModal] = useState(false)
  const detilfiltered = detil.filter((item) => {
    var satuan = item.value
    var angka = null
    if(props.valueatas.length == 26){
        var angka = 26
    } else {
        var angka = 24
    }
    return satuan.substring(0, angka) == props.valueatas
})
//   const handleReactSelect = (selectedOption, { name }) => {
//     setValue(prevState => ({...prevState, no: no, idhost: props.idhost, [name] : selectedOption.value, uraian_btki : selectedOption.label  }));
//   }

//   const handleClick = () => { 
//     if(daftarbelanjafiltered.length == 0){
//       if( (value.nm_belanja !== null) && (value.jmlbelanja !== null) && (value.value !== null) ){
//         props.calleback(value)
//         setModal(false)
//         setValue({valuesubdit:null, jmlbelanja: "", nm_belanja:null, value:null})
//       } else {
//         alert("Tolong Dilengkapi Formnya")
//       }
//     } else {
//       alert('Jenis Belanja yang Sama Sudah Ada')
//     }    
//   }

//   const toggleDetails = (index) => {
//     const position = details.indexOf(index)
//     let newDetails = details.slice()
//     if (position !== -1) {
//       newDetails.splice(position, 1)
//     } else {
//       newDetails = [...details, index]
//     }
//     setDetails(newDetails)
//   }

//   const judulfiltered = judul.filter((item) => {
//     var satuan = item.value
//     return satuan.substring(0,22) == (value.value)
//   })

//     const anggaranfiltered = anggaran.filter((item) => {
//         var satuan = item.value
//         return satuan.substring(0,14) == (props.statusanggaran)
//     })
//     const daftarbelanjafiltered = props.daftarbelanja.filter((item) => {
//       var satuan = item.kd_belanja
//       return satuan == value.value
//   })  
    // const handleReactSelect = (selectedOption) => {
    //     setValue(prevState => ({...prevState, valuesubdit:selectedOption, nm_belanja:selectedOption.label, value:selectedOption.value }));  
    // }  
    // const handleChange = (e) => {
    //     const nama = e.target.name
    //     const value = e.target.value
    //     setValue(prevState => ({...prevState, [nama]:value}))
    //   }
  return (
    <>
      <CButton 
        onClick={() => {
            setModal(!modal)
            } 
        }
        color="info"
        size="sm"
      >
        <a>Isi Detils</a>
      </CButton>
      <CModal 
        show={modal} 
        onClose={setModal}
        size="lg"
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton>
          <CModalTitle>Isi Detil {props.valueatas.length} </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol sm="12">
                <CDataTable
                  fields={fielddetil} 
                  items={detilfiltered} 
                  scopedSlots = {{
                    'nm_detil':
                    (index)=>{
                      return(
                        <td>
                          {index.label}
                        </td>
                      )
                      },
                      'jumlah':
                      (index)=>{
                        return(
                          <td>
                            <CInput type="number" />
                          </td>
                        )
                        },                      

                  }}             
                />              
            </CCol>
          </CRow>                                                                       
        </CModalBody>
        <CModalFooter>
          <CButton 
        //   onClick={handleClick.bind(this)} 
          color="primary">Tambah</CButton>{' '}
          <CButton 
            color="secondary" 
            onClick={() => setModal(false)}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}    

export default Tambahdetil