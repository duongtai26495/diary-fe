import { 
  ACCESS_TOKEN, 
  HOST_URL, 
  LOCAL_LOGIN_STATE, 
  USER_LOCAL, 
  SORT_CREATED_ASC, 
  SORT_CREATED_DESC, 
  SORT_LAST_EDITED_ASC, 
  SORT_LAST_EDITED_DESC
 } from "./constants"
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

const getAllDiaryByAuthor = async (data) => {
  let token = data.token
  let url = HOST_URL + "user/all-diary"
  var config = {
    method: 'get',
    url,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };

  return await axios(config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

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

const getDiaryByAuthor = async (data) => {
  let url = HOST_URL + "diary/author=" + data.username

  var config = {
    method: 'get',
    url,
    headers: {
      'Authorization': 'Bearer ' + data.token
    }
  };

  return await axios(config)
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });

}

const uploadImageAPI = async (data) => {

  let url = HOST_URL + "user/upload_image"

  if (data.username) {
    url = HOST_URL + "user/upload_image/" + data.username
  }

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + data.token);

  var formdata = new FormData();
  formdata.append("image", data.image);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => { return result.data })
    .catch(error => console.log('error', error));

}
const getDiary = async (id) => {
  let url = HOST_URL + "diary/public/" + id
  const data = await runAPI(url);
  return data
}

const loadDiaryToUpdate = async (id) => {
  let url = HOST_URL + "user/diary/load-to-update/" + id
  let token = localStorage.getItem(ACCESS_TOKEN)


  var config = {
    method: 'get',
    url,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };

  return await axios(config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

const newPostAPI = async (image_url, post) => {

  var post = {
    ...post,
    image_url
  }

  let url = HOST_URL + "diary/save"
  var data = JSON.stringify(post);

  var config = {
    method: 'post',
    url,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
      'Content-Type': 'application/json'
    },
    data,
  };

  
  return await axios(config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error.data
    });


}

const updateDiary = async (image_url, post) => {
  let url = HOST_URL + "diary/update/"+post.id
  let token = localStorage.getItem(ACCESS_TOKEN)
  var data = JSON.stringify({
    ...post,
    image_url
  });
  
  var config = {
    method: 'PUT',
    url,
    headers: { 
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json'
    },
    data,
  };
  
  return await axios(config)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
  
}

const sortDiaries = (data) =>{
  let sort = data.sort;
  let list = data.list;
  var newList = []
  switch (sort) {

    case SORT_LAST_EDITED_DESC:
      newList = list.sort((a, b) => { return a.last_edited.localeCompare(b.last_edited) }).reverse()
      break
    case SORT_LAST_EDITED_ASC:
      newList = list.sort((a, b) => { return a.last_edited.localeCompare(b.last_edited) })
      break
    case SORT_CREATED_ASC:
      newList = list.sort((a, b) => { return a.created_at.localeCompare(b.created_at) })
      break
    case SORT_CREATED_DESC:
      newList = list.sort((a, b) => {return a.created_at.localeCompare(b.created_at)}).reverse()
      break
    default:
      newList = list.sort((a, b) => { return a.last_edited.localeCompare(b.last_edited) }).reverse()
      break
  }

  return newList
}

const logoutUser = () => {
  localStorage.removeItem(USER_LOCAL)
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(LOCAL_LOGIN_STATE)
}


export {
  getAllDiary,
  loginWithUsernamePassword,
  getDataUserLogin,
  logoutUser,
  getDiaryByAuthor,
  uploadImageAPI,
  newPostAPI,
  getDiary,
  getAllDiaryByAuthor,
  loadDiaryToUpdate,
  updateDiary,
  sortDiaries
}