import axios from 'axios';

export default {
  getAllMarkers() {
    console.log('electric');
    return axios.get('http://192.168.0.4:8000/api/markers');
    // return axios.get('https://jsonplaceholder.typicode.com/posts');
  },

  makeMarker(marker) {
    return axios.post('http:// 192.168.0.4:8000/api/markers/', marker);
  },
};
