import axios from "axios";
import { API_URL } from "../components/shared/constants/general";
import { getUser } from '../../domain/services/clientService';


export async function get(url, params) {
  try {
    const urlFinal = API_URL + url;
    const response = await axios({
      method: "GET",
      url: urlFinal,
      params: params
    });
    return { data: response.data, err: null };
  } catch (err) {
    return { err: err.response };
  }
}

export async function post(url, form) {
  try {
    const urlFinal = API_URL + url;
    const response = await axios({
      method: "post",
      url: urlFinal,
      data: form,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    return { data: response.data, err: null };
  } catch (err) {
    return { err: err.response };
  }
}
export async function QueryGet(url) {
  let user =  getUser(); 
  if(!user) user='';
  try {
    const urlFinal = API_URL + url;
    const response = await axios({
      method: "GET",
      url: urlFinal,
      headers: {
        Authorization: "Bearer " +user.token,
      }

    });
    return { data: response.data, err: null };
  } catch (err) {
    return { err: err.response };
  }
}
export async function QueryPost(url, form) {
  let user =  getUser(); 
  try {
    const urlFinal = API_URL + url;
    const response = await axios({
      method: "post",
      url: urlFinal,
      headers: {
        Authorization: "Bearer " + user.token,
      },
      data: form,
    });
    return { data: response.data, err: null };
  } catch (err) {
    console.log(err);
    return { err: err.response };
  }
}

export async function put(url, form) {
  try {
    const urlFinal = API_URL + url;
    const response = await axios({
      method: "put",
      url: urlFinal,
      data: form,
    });
    return { data: response.data, err: null };
  } catch (err) {
    return { err: err };
  }
}

export async function QueryPut(url, form) {
  let user =  getUser(); 
  try {
    const urlFinal = API_URL + url;
    const response = await axios({
      method: "put",
      url: urlFinal,
      headers: {
        Authorization: "Bearer " + user.token,
      },
      data: form,
    });
    return { data: response.data, err: null };
  } catch (err) {
    console.log(err);
    return { err: err.response };
  }
}
