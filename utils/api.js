import axios from 'axios';

let fakeUserSignup = {
username: "Noobslay3r",
email: "nhaer123@gmail.com",
password: "password123456",
}

let fakeUserLogin = {
  username: "Noobslay3r",
  password: "password123456",
}

export default {
  getAllMarkers() {
    console.log('electric');
    return axios.get('http://192.168.1.92:8000/api/markers');

    // return axios.get('https://jsonplaceholder.typicode.com/posts');
  },

  makeMarker(marker) {
    return axios.post('http://192.168.1.92:8000/api/markers/', marker);

  },

  userSignup (signupInfo) { 
    console.log(signupInfo)
    return axios.post('http://192.168.1.92:8000/api/users/signup', signupInfo)
  },

  userLogin (loginInfo) {
    return axios.post('http://192.168.1.92:8000/api/users/login', loginInfo)
  }
};