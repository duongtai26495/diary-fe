import { ACCESS_TOKEN, HOST_URL, LOCAL_LOGIN_STATE, USERNAME_LOCAL, USER_LOCAL } from "./constants"
import axios from "axios";

const getAllDiary = async () => {
  let url = HOST_URL
  var config = {
    method: 'GET',
    url,
    headers: {}
  };

  return await axios(config)
    .then(function (response) {
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
    url: HOST_URL + 'auth/login',
    data
  };

  return await axios(config)
    .then(function (response) {
      let token = response.data.access_token
     getDataUserLogin(token, User.username)
      return response
    })
    .then((result)=>{
      return result
    })
    .catch(function (error) {
      return error.response
    });

}

const getDataUserLogin = async (token, username) => {

  let url = HOST_URL + "user/profile/" + username;


  var config = {
    method: 'GET',
    url,
    headers: {
      'Authorization': 'Bearer '+token
    }
  };

 return await axios(config)
    .then(function (response) {
      var user = response.data.data
      user = {
        ...user,
        token
      }
      localStorage.setItem(USER_LOCAL, JSON.stringify(user))
    })
    .catch(function (error) {
      console.log(error);
    });


}

const logoutUser = () => {
  localStorage.removeItem(USER_LOCAL)
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(LOCAL_LOGIN_STATE)
}


export { getAllDiary, loginWithUsernamePassword, getDataUserLogin, logoutUser }