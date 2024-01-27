import { default as axios } from './axiosInstance';

export const getAllVacancies = () => {
  return axios.get('/vacancy');
};

export const getAllCitizens = () => {
  return axios.get('/citizen');
};

export const createCitizen = (payload) => {
  return axios.post('/citizen', payload);
};

export const updateCitizen = (payload) => {
  return axios.put('/citizen', payload);
};

export const deleteCitizen = (id) => {
  return axios.delete(`/citizen/${id}`);
};

export const assignVacancyToCitizen = ({id, vacancyID}) =>{
  return axios.patch('/citizen',{user_id:id, vacancy_id:vacancyID})
}

export const getAllDocumentTypes = () =>{
  return axios.get('/document-types');
}
