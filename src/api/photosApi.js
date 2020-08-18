import http from "./axiosHttp";

const getAll = () => {
    return http.get("/photo?_sort=namePhoto&_order=asc");
};

const get = id => {
    return http.get(`/photo/${id}`);
};

const create = data => {
    return http.post("/photo", data);
};

const update = (id, data) => {
    return http.put(`/photo/${id}`, data);
};

const remove = id => {
    return http.delete(`/photo/${id}`);
};

const pagination = (currentPage) => {
    return http.get(`/photo/?_limit=4&_page=${currentPage}`);
};
const paginationForHomePage = (category, currentPage) => {
    return http.get(`/category/${category}/photo/?_limit=6&_page=${currentPage}`);
};

const search = (value) => {
    return http.get(`/photo/?q=${value}`);
};

const filterPriceApi = () => {
    return http.get("/photo?_sort=price&_order=asc");
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    pagination,
    paginationForHomePage,
    search,
    filterPriceApi
};