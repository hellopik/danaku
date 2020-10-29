import React, { Component } from 'react'
import Select from 'react-select';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { GoogleSpreadsheet } from "google-spreadsheet";
import NumberFormat from 'react-number-format';
import {
  CCard,
  CCardBody,
  CFormGroup,
  CDataTable,
  CCardFooter,
  CButton,
  CLabel,
  CCardHeader
} from '@coreui/react'
import {subdit,komponen,subkomponen,anggaran, fieldtabelbelanja, detil} from './Sourcedanaku.js'
import Tambahbelanja from './Tambahbelanja.js'
import CIcon from '@coreui/icons-react'

const SPREADSHEET_ID = '15XAj7IQL6e6t_eRgRcIM8h184gxPXl-dlw0piwuqaPw';
const SHEET_ID = '252981371';
const CLIENT_EMAIL = 'danaku@aktualisasiadik.iam.gserviceaccount.com';
const PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDmNEOXBbEC1AkB\nzSRcWzWbOgoEOMGBBlGs//+iJZ1H+IIeKaVTmENiF3dfsxf5Y6WZJzQ98t0p8w+L\norWbUACiRnT883EU0Mj2sSNuMer/S3zdKO1VJ6/I39B1PNr8Q6/JOv/brY8MVNZ4\nYJJns8nN6QrZuiPqaAInPtIwbErNx68UKVBHPtGx60XPwfgYZcxKa5FhloQEEsnl\n1Q06ADX5wZH4P010g/wKrxFP7hxOpa+uvpE1D6m3PAKn06z3ovtSGYtJZLcmBlYz\nI1QpbtjXPAVulP7K24k24SuzMKUtUY6NXoAZeHKlomB3tO5RQ1e4kc9SNBWhPcls\nDDN37uxdAgMBAAECggEADbWpHNJi81crXicYdkOcUq1HMW8r3wJAVPw9/isdTc73\n+NHkHbFgufPJ0TI6SEjt8MwL6XCQSVJHZ7p99Ez0bLWje/kHkATLIx3zjTl91Exr\nmEQ6tiqR5nWl1YWVSRbC3kocOLoCXeqjhzHBJlnnt9KcKdFTGD+veSTdobKhVdXk\npWpNMyMbAptEiuUW3G9GCZ9gevR/xFER7qZyXkK7x26F8MEMidKypwoJJaJf1nB8\nYfejw9kfPGRtQq1Ip5lM+hQaL07vCFphbCzPp0g0rVYsdZ4THIXWrZyTLo+HLq9w\np8ql6l0Z+XUkY4QEf5Na/7DcaOfpiwl2RhI11VjvBQKBgQD2FawQPjVIlYfiGe9q\n3ueBEYHvIDGSDZqiBSmbantzKohKlvDb7ng0dYzHrQSRgBGwRWMEsiGlry0lpE9q\n3PzyKL7czyyitGg+6f8byGIFds2Hn01eby1Us3g1w6CM8VK5kgKNK0fC3rn8NK/O\nySrYV0k6/Ineo9pBQ9ujeYcC7wKBgQDvesltETdO4qZ6lzc/yxh3Xx/voWuWiqYv\nHGXaDaBOcOJ6ZDFu6IwsvY7kttFO71ookpzUPEvOBEajWlKmZlfQZpxSCIr2xy+m\nsiL8OfekgmrU7XtlJ/+XADZWm36qGALPhc0L2qSg6rZr9VWJSlGnpktDFUynN/X5\nqMfzp6UVcwKBgQC1YVn2ivOZMWX7mGQooG2Aa5ga2d7PqSlNvIJjZEPjqfjVCZY0\ndPuypuYCExvn5r6i7zHBt04noguj0A0dVg82qiOr+yQKNPEVVkHLh5IANwXcreVH\n8qg14yZ6clu3JvRzhRROWxVEpAfvxiHDR/FFjmiSiqtQJ/Np4YtVXfDOjwKBgF/Z\n3ns4E9IQJ6ATnDp9WKqWuVqZWk2j6wYaMK4JHCupRQzFw39ntotFx8bFYZtdc9Gf\ndQQBqjmoPnmtcj1F40n3eAPhhXVmnizzSct4jCUdShM1hlkjnEpc/GLH0/fSqnVT\nUZG4DoKVzzQAux67T1lx1tff05FudZZatsVQSWP/AoGBALOoTh7dt1bgaP8yev0A\nzoRd/10t55QG5LkZrb+OhVC1kWBvaP7eU7yTMKIjWo5fzHgvCN6dD00dd7qfCNPS\nhyqLXsWuSsaXhaGETdHhlRT7AKInhZ/dWbMl2qybmNZrTy9euNcpgekUXIhvrzxz\nJhvbqZv8YnjxNdKKNcNWM6J3\n-----END PRIVATE KEY-----\n';

const doc = new GoogleSpreadsheet(SPREADSHEET_ID); 

const newRow = { subdit: "Ini Subdit", komponen: "Ini Komponen", subkomponen: "Ini Subkomponen", nm_belanja: "Ini Nama Belanja" };

class Danaku extends Component {
  constructor(props) {
    super(props);
    this.state = {
    subdit: "00",
    komponen : "00",
    subkomponen : "00",
    anggaran : null,
    valuesubdit : null,
    valuekomponen : null,
    valuesubkomponen: null,
    valueanggaran : null,
    daftarbelanja:[],
    bingungapa:[],
    disabled:false 
    };
  }
      handleReactSelect = (selectedOption, { name }) => {
        if(name == "subdit") {
            this.setState({ valuesubdit:selectedOption, subdit : selectedOption.value, valuekomponen: null,valuesubkomponen:null,valueanggaran:null, komponen:"00", subkomponen:"00", daftarbelanja:[] });  
          } else if (name == "komponen") {
            this.setState({ valuekomponen: selectedOption, komponen : selectedOption.value, valuesubkomponen:null,valueanggaran:null, subkomponen:"00", daftarbelanja:[] });
          } else if (name == "subkomponen") {
            this.setState({ valuesubkomponen:selectedOption, subkomponen : selectedOption.value, valueanggaran:null, daftarbelanja:[]});
          } else if (name == "anggaran") {
            this.setState({ valueanggaran:selectedOption, anggaran : selectedOption.value });
          }
        }
      setBelanja = (hehe) => {
        if(hehe){
          const huhu = this.state.daftarbelanja.concat(hehe)
          this.setState({daftarbelanja : huhu})         
        } else {
        }
      }
      kirimSpreadsheet = async (row) => {
        this.setState({disabled:true})
        try {
          await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY,
          });
          // loads document properties and worksheets
          await doc.loadInfo();
      
          const sheet = doc.sheetsById[SHEET_ID];
          const result = await sheet.addRows(this.state.daftarbelanja);
          alert("Sukses Terkirim !")
          this.setState({ disabled:false, valuesubdit:null, valuekomponen: null,valuesubkomponen:null,valueanggaran:null, komponen:"00", subkomponen:"00", daftarbelanja:[] })
        } catch (e) {
          console.error('Iki Error e ', e);
        }
      };      

  render(){ 
    const komponenfiltered = komponen.filter((item) => {
      var satuan = item.value
      return satuan.substring(0,10) == (this.state.subdit)
    })
    const subkomponenfiltered = subkomponen.filter((item) => {
      var satuan = item.value
      return satuan.substring(0,12) == (this.state.komponen)
    })   
    console.log(this.state.daftarbelanja)  
    return(
      <CCard>
        <CCardHeader className="bg-light text-dark" >
          <h5>Form Pengajuan Persekot</h5>
        </CCardHeader>      
        <CCardBody>
            <CFormGroup>
              <CLabel htmlFor="street"><h5>Subdirektorat</h5></CLabel>
              <Select value={this.state.valuesubdit} name="subdit" onChange ={this.handleReactSelect.bind(this)} options={subdit} placeholder="Pilih Subdirektorat"/>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="street"><h5>Komponen</h5></CLabel>
              <Select value={this.state.valuekomponen} name="komponen" onChange ={this.handleReactSelect.bind(this)} options={komponenfiltered} placeholder="Pilih Komponen"/>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="street"><h5>Subkomponen</h5></CLabel>
              <Select value={this.state.valuesubkomponen} name="subkomponen" onChange ={this.handleReactSelect.bind(this)} options={subkomponenfiltered} placeholder="Pilih Subkomponen"/>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="street"><h5>Daftar Belanja</h5></CLabel>
              <div className="pb-2 d-flex justify-content-end">
              <Tambahbelanja daftarbelanja ={this.state.daftarbelanja} statusanggaran={this.state.subkomponen} calleback={this.setBelanja} />
              </div>
              <CDataTable
              fields={fieldtabelbelanja}
              items={this.state.daftarbelanja}
              itemsPerPage={5}
              hover
              size="sm"
              sorter
              pagination
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
                  },                  
                  'action':
                  (index)=>{ 
                    const angka = this.state.daftarbelanja.findIndex(x => x.value == index.value)                                                      
                    const hapusData = () => {
                        const daftarbelanjasementara = this.state.daftarbelanja
                        daftarbelanjasementara.splice(angka,1)
                        this.setState({daftarbelanja:daftarbelanjasementara})
                    }
                    return (
                      <td>
                      <CButton onClick={hapusData} size="sm" color="danger" >Hapus</CButton>
                      </td>
                    )
                  }                  
              }}
              />              
            </CFormGroup> 
            {/* <CFormGroup>
              <CLabel htmlFor="street">Mata Anggaran</CLabel>
              <Select value={this.state.valueanggaran} name="anggaran" onChange ={this.handleReactSelect.bind(this)} options={anggaranfiltered} placeholder="Pilih Mata Anggaran"/>
            </CFormGroup>             */}
        </CCardBody>
        <CCardFooter>
          <div className="d-flex justify-content-end">
          <CButton onClick={() => this.kirimSpreadsheet(newRow)} color="primary" disabled={this.state.disabled}>Kirim</CButton>{' '}
          </div>
        </CCardFooter>        
      </CCard>
      )
  }  
}

export default Danaku
