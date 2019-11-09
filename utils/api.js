import axios from 'axios';

export default {
  getAllMarkers() {
    console.log('electric');
    return axios.get('http://10.8.70.64:8000/api/markers');
    // return axios.get('https://jsonplaceholder.typicode.com/posts');
  },

  makeMarker(marker) {
    return axios.post('http://10.8.70.64:8000/api/markers/', marker);
  },
};
