"use client"
import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainForm from './components/MainForm';
import { fetchConfig } from './assets/petitions/fetchConfig';
import { fetchForms } from './assets/petitions/fetchForms';
export default function Home() {
  const [configurations , setConfigurations]= useState({
    lenguage: "es",
    SearchBy:"state",
    sendMany: false,
    hasQuestions: false,
    region: "mx"
  })
  const [formInputs,setFormInputs] = useState([])
  const [dataUser, setDataUser] = useState({})
  const [backendURLBase] = useState(`${process.env.NEXT_PUBLIC_URL}`)
  const [backendURLBaseServices] = useState(`${process.env.NEXT_PUBLIC_URL_SERVICES}`)
  const [clientId] = useState(`${process.env.NEXT_PUBLIC_CLIENT_ID}`)
  const [endpoints] = useState({
    toGetConfs:'/confs/',
    toGetFormInputs:'/forms/'
  })
  const [leads, setLeads] = useState()
  const [loading, setLoading] = useState(true)
  const [allDataIn, setAllDataIn] = useState([])
    useEffect(() => {

      async function fetchData() {
        await Promise.all([
          fetchConfig('GET', backendURLBase, endpoints.toGetConfs, clientId, setConfigurations),
          //fetchAllLeads('GET', backendURLBase, endpoints.toGetAllLeads, clientId, setLeads),
          fetchForms('GET', backendURLBase, endpoints.toGetFormInputs, clientId, setFormInputs,setDataUser),
          //fetchEmailData('GET', backendURLBase, endpoints.toGetQuestions, clientId, "", setDataUser),
          //fetchStatesData('GET', backendURLBase, endpoints.toGetAllRepresentatives, clientId, '', setStates),
          //fetchTweet('GET', backendURLBase, endpoints.toGetTweets, clientId, '', setTweet),
          //fetchQuestions('GET', backendURLBase, endpoints.toGetQuestions, clientId, '', setDataQuestions),
          //fetchTYM('GET', backendURLBase, endpoints.toGetThankYouMessage, clientId, '', setTypData)
        ]).then(() => {
          setLoading(false) // cambia el estado a "false" cuando todas las consultas se hayan completado
        }).catch((error) => console.error(error))
      }
      fetchData()
  },[])
  return (
    <MainForm 
    formInputs= {formInputs}
    dataUser={dataUser} 
    setDataUser={setDataUser}  />
  )
}
