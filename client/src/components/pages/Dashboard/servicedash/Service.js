import axios from 'axios';



const myService = {
    baseUrl: 'http://localhost:5000',
    baseurlGift: 'api/gift/',
    baseurldelivery: 'api/DeliveryMen/',

    postData: ( data) => {
      return axios.post(`${myService.baseUrl}/${myService.baseurlGift}`, data);
    },
    update: (id, data) => {
      return axios.put(`${myService.baseUrl}/${myService.baseurlGift}/${id}`, data);
    },
    getGifts: () => {
      return axios.get(`${myService.baseUrl}/${myService.baseurlGift}`);
      
    },
    getGiftbyID:(id)=>{
      return axios.get(`${myService.baseUrl}/${myService.baseurlGift}/${id}`)
    },
    deleteGiftbyID:(id)=>{
      return axios.delete(`${myService.baseUrl}/${myService.baseurlGift}/${id}`)
    },
 ///////////////////////Delivery////////////////////
 GetDeliverer:()=>{
  return axios.get(`${myService.baseUrl}/${myService.baseurldelivery}/DeliveryMen`)
},
GetDelivererId:(id)=>{
  return axios.get(`${myService.baseUrl}/${myService.baseurldelivery}/${id}`)
},
UpdateDeliverer:(id,data)=>{
  return axios.put(`${myService.baseUrl}/${myService.baseurldelivery}/${id}`, data)
},
DeleteDelivere:(id)=>{
  return axios.delete(`${myService.baseUrl}/${myService.baseurldelivery}/${id}`)
},
Add:(data)=>{
  return axios.post(`${myService.baseUrl}/${myService.baseurldelivery}/DeliveryMen`, data)
},
///////////////////////all user////////////////////
getalluser:(token)=>{
  
  return axios.get(`${myService.baseUrl}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
  };
  
  export default myService;