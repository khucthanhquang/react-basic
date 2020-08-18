import http from "./axiosHttp";

const getAll = () => {
    return http.get("/category");
};

const get = id => {
    return http.get(`/category/${id}/photo`);
};

const create = data => {
    return http.post("/category", data);
};

const update = (id, data) => {
    return http.put(`/category/${id}`, data);
};

const remove = id => {
    return http.delete(`/category/${id}`);
};


export default {
    getAll,
    get,
    create,
    update,
    remove,
};