import http from "./axiosHttp";

const getAll = () => {
    return http.get("/post_category");
};

const get = id => {
    return http.get(`/post_category/${id}/posts`);
};

const create = data => {
    return http.post("/post_category", data);
};

const update = (id, data) => {
    return http.put(`/post_category/${id}`, data);
};

const remove = id => {
    return http.delete(`/post_category/${id}`);
};


export default {
    getAll,
    get,
    create,
    update,
    remove,
};