import { post } from "../request";
const BASE_URL = process.env.REACT_APP_API_BASE_URL +"/api/course";
export const content = (content, data) =>  post(`${BASE_URL}/${content}`,data, 'application/json');