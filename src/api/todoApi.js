import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/users';


axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
       config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

const throwError = (err, callback) => {
    const {response: {data: {message = ''} = {}} = {}} = err || {};
    callback && callback(false, message);
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
        throwError(err, callback);
    }
};

const createUser = async (payload, callback) => {
    const {email, password} = payload;
    try {
        const res = await axios.post('/create', {
            email,
            password
        });
        callback(true);
    } catch (err) {
        throwError(err, callback);
    }
};

const createTodo = async (newTodo, errCallback) => {
    try {
        const res = await axios.put('/add', {
            ...newTodo
        });
        return true;
    } catch (err) {
        throwError(err, errCallback);
    }
}

const deleteTodo = async (id, errCallback) => {
    try {
        const res = await axios.delete(`/delete/${id}`);
        return true;
    } catch (err) {
        throwError(errCallback)
    }
}

const updateTodo = async (payload, errCallback) => {
    try {
        const res = await axios.put('/update', {
            ...payload
        })
        return true;
    } catch(err) { 
        throwError(err, errCallback);
    }
}

export {
    login,
    createUser,
    createTodo,
    deleteTodo,
    updateTodo
};