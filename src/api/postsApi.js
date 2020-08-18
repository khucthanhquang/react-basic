import http from "./axiosHttp";

const getAll = () => {
    return http.get("/posts");
};

const get = id => {
    return http.get(`/posts/${id}`);
};

const create = data => {
    return http.post("/posts", data);
};

const update = (id, data) => {
    return http.put(`/posts/${id}`, data);
};

const remove = id => {
    return http.delete(`/posts/${id}`);
};

const pagination = (currentPage) => {
    return http.get(`/posts/?_limit=4&_page=${currentPage}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    pagination
};