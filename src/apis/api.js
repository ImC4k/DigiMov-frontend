import axios from 'axios';
const {REACT_APP_BACKEND_API} = process.env;
console.log(REACT_APP_BACKEND_API);
export default axios.create({
    baseURL: REACT_APP_BACKEND_API
});