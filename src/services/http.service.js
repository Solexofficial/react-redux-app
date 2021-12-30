import axios from 'axios';

axios.defaults.baseURL = 'https://ojsonplaceholder.typicode.com/';

const httpService = {
  get: axios.get,
};

export default httpService;
