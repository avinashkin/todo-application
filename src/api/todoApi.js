import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/users';
const token = localStorage.getItem('k');
if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const login = async (payload = {}, callback) => {
    const {username, password} = payload;
    try {
        const res = await axios.post('/login', {
            email: username,
            password
        });
        const {data: {success, userDetails = {}, access_token} = {}} = res || {};
        const {todos = []} = userDetails;
        if (success) {
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(userDetails));
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        callback(true);
    } catch (err) {
        const {response: {data: {message = ''} = {}} = {}} = err || {};
        callback(false, message);
    }
};

export {
    login
};