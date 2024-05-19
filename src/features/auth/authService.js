import { post } from "../request";
const BASE_URL = process.env.REACT_APP_API_BASE_URL +"/api/auth";
export const login = (data) =>  post(`${BASE_URL}/login`,data, 'application/json');
export const register = (data) =>  post(`${BASE_URL}/register`,data, 'application/json');