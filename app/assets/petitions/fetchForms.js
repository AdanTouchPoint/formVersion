import { fetchData } from "./fetchData";

const fetchForms = async (petitionMethod, backendURLBase, endpoint, clientId, setFormInputs,setDataUser) =>{
    const datos = await fetchData(petitionMethod, backendURLBase, endpoint, clientId)
    console.log(datos.data.docs[0].formFields)
    const formFields = datos.data.docs[0].formFields
 if(formFields.length > 0) {
    setFormInputs(formFields)
    const labelfields = formFields.map((el)=>{
    return el.label
    })
  setDataUser(
    Object.fromEntries(labelfields.map(clave => [clave, ""]))
  )  
 }
}
export {
    fetchForms
}