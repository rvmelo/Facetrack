import axios from 'axios';
import { base_url } from '../constants/backend';

const api = axios.create({
  baseURL: base_url,
});

export default api;
