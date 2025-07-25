import axios from '../api/axios';

const getTasks = (userId) => axios.get(`/tasks?userId=${userId}`);
const createTask = (task) => axios.post('/tasks', task);
const updateTask = (id, task) => axios.put(`/tasks/${id}`, task);
const deleteTask = (id) => axios.delete(`/tasks/${id}`);

export default { getTasks, createTask, updateTask, deleteTask };
