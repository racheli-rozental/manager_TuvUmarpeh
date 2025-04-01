import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5095';
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios error response:', error.response);
    return Promise.reject(error); 
  }
);
const api ={
  getUsers: async () => {
    const result = await axios.get(`/users`)    
    return result.data;
  },

//   add: async (name) => {
//     console.log('addTask', name);
//     try {
//         const response = await axios.post(`/items`, { name });
//         return response.data; 
//     } catch (error) {
//         console.error('Error adding task:', error);
//         throw error;
//     }
// },


putUser: async (id, user) => {
  console.log('setCompleted', { id, user });
  try {
    const response = await axios.put(`/users/${id}`, { user});
    return response.data; 
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error; 
  }
},


deleteUser: async (id) => {
  console.log('deleteUser', { id });
  try {
    await axios.delete(`/users/${id}`);
    return { success: true }; 
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error; 
  }
}

};
export default api
