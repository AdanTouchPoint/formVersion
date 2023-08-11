import { fetchData } from "./fetchData";
const fetchLeads = (
  successResponse,
  backendURLBase,
  endpoints,
  clientId,
  dataUser,
  emailData,questions
) => {
  fetchData(
    "POST",
    backendURLBase,
    endpoints.toSaveLeads,
    clientId,
    `&firstName=${dataUser?.name }&postalcode=${
      dataUser.postalcode ? dataUser.postalcode : dataUser?.state
    }&emailData=${dataUser?.email}&representative=
    'todefine'
    &emailMessage=${dataUser?.message}&sended=${successResponse}&subject=${dataUser?.subject}&city=${dataUser?.city}&party=${dataUser?.party}`
  );
};


export {
    fetchLeads
 }