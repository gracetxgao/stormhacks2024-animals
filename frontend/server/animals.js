// import axios from 'axios'
// const baseUrl = `http://localhost:3001/api/animals`

// axios({
//     method: 'get',
//     url: `${baseUrl}`,
//     headers: { 
//         'Content-Type': 'multipart/form-data'
//       },
//   }).then((response) => {
//     console.log(response.data);
//   }).catch(error => {
//     console.log(error.response.data);
//   });

// const getAll = () => {
//     const request = axios.get(baseUrl);
//     return request.then(response => response.data)
//                  .catch(error => {
//                      console.error('Error fetching data:', error);
//                      throw error;
//                  });
// };

// const create = (name, location, type, description, goal, uri) => {
//     const requestData = {         
//         name: name,
//         location: location,
//         type: type,
//         description: description,
//         goal: goal,
//         uri: uri, }; 
//     console.log(`got this name: ${name}`);
//     const request = axios.post(baseUrl, requestData);
//     return request.then(response => {
//         console.log('fulfilled');
//         return response.data;
//     }).catch(error => {
//         console.error('Error in create request:', error);
//         console.error('Error response:', error.response); 
//         throw error; 
//     });
// }

// export default { getAll, create }