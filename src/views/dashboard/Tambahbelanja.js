import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import { fireAuth } from "../../fireApi";
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

import {anggaran,judul,subjudul,detil,fieldtabeltambah,fieldtabeltambahsubjudul,fieldbingungapa, fieldtabelkonfirmasi} from './Sourcedanaku.js'


var databaru =[]

const Tambahbelanja = (props) => {

  const [modal, setModal] = useState(false)
  const [details, setDetails] = useState([])
  const [subdetails, setSubdetails] = useState([])  
  const [value, setValue] = useState({valuesubdit:null, jmlbelanja: null, nm_belanja:null, value:null})
  const [data, setData] = useState([])
  const [hehe,setHehe] = useState([])
  const [duplicate,setDuplicate] = useState(false)
  const [konfirmasi, setKonfirmasi] = useState(false)
  const [] = useState({})
//   const handleReactSelect = (selectedOption, { name }) => {
//     setValue(prevState => ({...prevState, no: no, idhost: props.idhost, [name] : selectedOption.value, uraian_btki : selectedOption.label  }));
//   }

useEffect(() => {
  const kopianhehe = hehe.map(value => value.value)
  const kopiandaftarbelanja = props.daftarbelanja.map(value => value.value)
  var i 
  for (i = 0; i < kopianhehe.length; i++){
    if(kopiandaftarbelanja.includes(kopianhehe[i])){
            setDuplicate(true)
            break
          } else {
            setDuplicate(false)
          }
        }
console.log("duplicate?", hehe)
});

const handleKirimdepan = () => {
  if(duplicate === false){
        props.calleback(hehe)
        setModal(false)
        setValue({valuesubdit:null, jmlbelanja: "", nm_belanja:null, value:null})
        setHehe([])
        setData([])
        databaru =[]
        console.log("darimodaldepan", hehe)
        setKonfirmasi(false)
    } else {
      alert('Jenis Detil yang Sama Sudah Ada')
      setKonfirmasi(false)
      setModal(true)
      setHehe([])
      setData([])
      databaru =[]
      setValue({valuesubdit:null, jmlbelanja: "", nm_belanja:null, value:null})      
    }
}
  const handleClick = () => {    
    databaru = Object.entries(data)
    databaru.unshift(["value","jumlah"])
    var keys = databaru.shift()
    var i = 0
    var k = 0
    var obj = null
    for (i = 0; i < databaru.length; i++){
      obj = {}
      for (k = 0; k < keys.length; k++){
        obj.["pengirim"] = fireAuth.currentUser.displayName; 
        obj.["nm_belanja"] = value.nm_belanja;        
        obj[keys[k]] = databaru[i][k]; 
      }
        hehe.push(obj)
    }
    setHehe(hehe)
    setKonfirmasi(true)
    setModal(false)   
  }   
  const handleCancel = () => {
    setValue({valuesubdit:null, jmlbelanja: "", nm_belanja:null, value:null})
    setModal(false)
  }

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const togglesubdetails = (index) => {
    const position = subdetails.indexOf(index)
    let newDetails = subdetails.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...subdetails, index]
    }
    setSubdetails(newDetails)
  }  

  const judulfiltered = judul.filter((item) => {
    var satuan = item.value
    return satuan.substring(0,22) === (value.value)
  })

  const tanpajudul = judulfiltered.filter((item) => {
    var satuan = item.value
    return satuan.substring(22,24) === "00"
  })  

  const judulfilteredgabung = judul.filter((item) => {
    var satuan = item.value
    return satuan.substring(0,22) === (value.value) && satuan.substring(22,24) !== "00" 
  })

  const detilfilteredgabung = detil.filter((item) => {
    var satuan = item.value
    if(tanpajudul[0]){
      return satuan.substring(0,24) === tanpajudul[0].value
    } else{
      return satuan.substring(0,24) === "hehe"
    }
  })  

const fixfinal = judulfilteredgabung.concat(detilfilteredgabung)
  // console.log("tanpajudul", judulfiltered[0].value.substring(22,24))
 
  // const angka = this.state.daftarbelanja.findIndex(x => x.kd_belanja === index.kd_belanja)
  // const hapusData = () => {
  //     const daftarbelanjasementara = this.state.daftarbelanja
  //     daftarbelanjasementara.splice(angka,1)
  //     this.setState({daftarbelanja:daftarbelanjasementara})
  // }

    const anggaranfiltered = anggaran.filter((item) => {
        var satuan = item.value
        return satuan.substring(0,14) === (props.statusanggaran)
    })


    const handleReactSelect = (selectedOption) => {
        setValue(prevState => ({...prevState, valuesubdit:selectedOption, nm_belanja:selectedOption.label, value:selectedOption.value }));  
    }  
    const handleChange = (e) => {
        const nama = e.target.name
        const value = e.target.value
        setData(prevState => ({...prevState, [nama]:value}))
      }
  return (
    <>
      <CButton 
        onClick={() => {
            if (props.statusanggaran !== "00"){
            setModal(!modal)
            } else {
            alert("Pilih Subkomponen Terlebih Dahulu")
            } 
        }}
        className="mr-1"
        color="info"
        size="sm"
      >
        <a>Tambah Belanja</a>
      </CButton>
      <CModal 
        show={modal} 
        onClose={setModal}
        size="lg"
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton>
          <CModalTitle>Tambah Belanja</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol sm="12">
                <CFormGroup>
                <CLabel htmlFor="nm_belanja">Nama Belanja</CLabel>
                <Select value={value.valuesubdit} onChange={handleReactSelect.bind(this)} name ="nm_belanja" options={anggaranfiltered} />
                </CFormGroup> 
                <CDataTable
                  fields={fieldtabeltambah} 
                  items={fixfinal}
                  scopedSlots = {{
                    'action':
                      (index)=>{
                          if (index.value.length === 29){
                            return <td><CInput onChange={handleChange.bind(this)} name={index.value} type="number"/></td>
                          } else {
                            return(
                              <td>
                              <CButton
                              color="primary"
                              size="sm"
                              onClick={()=>{toggleDetails(index)}}
                            >
                              {details.includes(index) ? 'Tutup' : 'Detail'}
                            </CButton>
                              </td>
                            )
                          }
                        },
                    'nm_judul':
                    (index)=>{
                      return(
                        <td>
                          {index.label}
                        </td>
                      )
                      },
                    'details':
                    (index)=>{
                      const subjudulfiltered = subjudul.filter((item) => {
                        var satuan = item.value
                        return satuan.substring(0,24) === (index.value)
                      })
                      const tanpasubjudul = subjudulfiltered.filter((item) => {
                        var satuan = item.value
                        return satuan.substring(24,26) === "00"
                      })
                      const subjudulfilteredgabung = subjudul.filter((item) => {
                        var satuan = item.value
                        return satuan.substring(0,24) === (index.value) && satuan.substring(24,26) !== "00" 
                      })                      
                      const detilsubjudulfilteredgabung = detil.filter((item) => {
                        var satuan = item.value
                        if(tanpasubjudul[0]){
                          return satuan.substring(0,26) === tanpasubjudul[0].value
                        } else{
                          return satuan.substring(0,26) === "hehe"
                        }
                      }) 
                      const finalfix = subjudulfilteredgabung.concat(detilsubjudulfilteredgabung)
                      return (
                      <CCollapse show={details.includes(index)}>
                        <CCardBody>
                        <CDataTable
                          fields={fieldtabeltambahsubjudul} 
                          items={finalfix}
                          scopedSlots = {{
                            'nm_subjudul':
                            (index)=>{
                              return(
                                <td>
                                  {index.label}
                                </td>
                              )
                              },
                              'action':
                              (index)=>{
                                if(index.value.length === 29) {
                                  return <td><CInput onChange={handleChange.bind(this)} name={index.value} type="number"/></td>
                                } else {
                                  return (
                                    <td>
                                      <CButton
                                        color="info"
                                        size="sm"
                                        onClick={()=>{togglesubdetails(index)}}
                                      >
                                        {subdetails.includes(index) ? 'Tutup' : 'Detail'}
                                      </CButton>
                                    </td>
                                  )
                                }    
                              },
                              'details':
                              (index)=>{
                                const bingungapa = detil.filter((item) => {
                                  var satuan = item.value
                                  return satuan.substring(0,26) === (index.value)
                                })
                                return (
                                  <CCollapse show={subdetails.includes(index)}>
                                      <CDataTable
                                      fields={fieldbingungapa} 
                                      items={bingungapa}
                                      scopedSlots = {{
                                        'bingungapa':
                                        (index)=>{
                                          return(
                                            <td>
                                              {index.label}
                                            </td>
                                          )
                                          },
                                          'action':
                                          (index)=>{
                                            return(
                                              <td>
                                                <CInput onChange={handleChange.bind(this)} name={index.value} type="number" />
                                              </td>
                                            )
                                            },                                          
                                      }}                                      
                                      />
                                  </CCollapse>
                                )}                                                                                          
                          }}

                        />
                        </CCardBody>
                      </CCollapse>
                    )
                  }                                                                                         
                  }}               
                />              
            </CCol>
          </CRow>                                                                       
        </CModalBody>
        <CModalFooter>
          <CButton onClick={handleClick.bind(this)} color="primary">Tambah</CButton>{' '}
          <CButton 
            color="secondary" 
            onClick={handleCancel.bind(this)}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal 
        show={konfirmasi} 
        onClose={() => setModal(false)}
        size="lg"
        closeOnBackdrop={true}
      >
        <CModalHeader><h3>Apakah Anda Yakin ?</h3></CModalHeader>
        <CModalBody> 
          <CDataTable
          fields = {fieldtabelkonfirmasi}
          items ={hehe}
          scopedSlots = {{
            'nm_detil':
              (index)=>{
                const angka = detil.findIndex(x => x.value == index.value)
                const ini = detil[angka]
              return(
                <td>
                  {ini.label}
                </td>
              )
              },
              'jmldetil':
              (index)=>{
              return(
                <td>
                  <NumberFormat value={index.jumlah} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
                </td>
              )
              }
          }}            
          />
        </CModalBody>
        <CModalFooter><CButton onClick={handleKirimdepan.bind(this)} color="primary">Tambah</CButton></CModalFooter>
      </CModal>
    </>
  )
}    

export default Tambahbelanja