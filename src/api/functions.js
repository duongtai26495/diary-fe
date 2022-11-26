import { HOST_URL } from "./constants"
import axios from "axios";

const getAllDiary = async () => {
    let url = HOST_URL
    var config = {
        method: 'GET',
        url,
        headers: { }
      };
      
    return await axios(config)
      .then(function (response) {
        console.log(response)
       return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
      

}

const loginWithUsernamePassword = async (User) => {


    var FormData = require('form-data');
    var data = new FormData();
    data.append('username', User.username);
    data.append('password', User.password);
    
    var config = {
      method: 'POST',
      url: HOST_URL+'auth/login',
      data
    };
    
   return await axios(config)
    .then(function (response) {
      console.log( response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    
}

export {getAllDiary, loginWithUsernamePassword}