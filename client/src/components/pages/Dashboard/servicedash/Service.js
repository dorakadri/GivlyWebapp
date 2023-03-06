import axios from 'axios';

const myService = {
    baseUrl: 'http://localhost:5000',
    baseurlGift: 'api/gift/',

    postData: (endpoint, data) => {
      return axios.post(`${myService.baseUrl}/${endpoint}`, data);
    },
    getGifts: () => {
      return axios.get(`${myService.baseUrl}/${myService.baseurlGift}`);
      
    },
    getGiftbyID:(id)=>{
      return axios.get(`${myService.baseUrl}/${myService.baseurlGift}/${id}`)
    }
 
  };
  
  export default myService;