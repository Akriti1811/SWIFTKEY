import axios from "axios";

export const getSession = async () =>
  await axios.get(`${process.env.REACT_APP_API}/session/get`, {}, { headers: {
    'authorization': 'Bearer '+token
  }});

export const createSession = async (session) =>
  await axios.post(`${process.env.REACT_APP_API}/session/create`, session, { headers: {
    'authorization': 'Bearer '+token
  }});