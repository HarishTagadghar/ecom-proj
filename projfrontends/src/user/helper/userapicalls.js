
const { API } = require("../../backend");



export const getUserOrders = (userId , token) => {
    return  fetch(`${API}/orders/user/${userId}`, {
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }) 
     
    .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
    
}
