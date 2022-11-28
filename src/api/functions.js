import { ACCESS_TOKEN, HOST_URL, LOCAL_LOGIN_STATE, USER_LOCAL } from "./constants"
import axios from "axios";

const runAPI = async (url) => {
  return (await fetch(url)).json();
}

const getAllDiary = async () => {
  let url = HOST_URL
  const data = await runAPI(url);
  return data
}

const loginWithUsernamePassword = async (User) => {
    const data = await getAccessToken(User);
    const result = await getDataUserLogin(data);
    return result
}

const getAccessToken = async (User) => {
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
      let data = { username: User.username, token }
      return data
    })
    .catch(function (error) {
      console.log(error);
    });
}

const getDataUserLogin = async (data) => {

  let url = HOST_URL + "user/profile/" + data.username;


  var config = {
    method: 'GET',
    url,
    headers: {
      'Authorization': 'Bearer ' + data.token
    }
  };

  return await axios(config)
    .then(function (response) {
      var user = response.data.data
      user = {
        ...user,
        token: data.token
      }
      return user
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