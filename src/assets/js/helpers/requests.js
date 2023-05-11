import axios from "axios";
import {mainRef} from "./refs";

const baseUrl = 'https://gateway.scan-interfax.ru';
let auth = async (params) => {
    return await request(params).then(e => {
        localStorage.setItem('accessToken', e.accessToken);
        localStorage.setItem('expire', e.expire)
        mainRef.current.checkAuth();
    })
}

let getUserInfo = async () => {
    let params = {
        url: '/api/v1/account/info',
        method: 'get'
    }
    return await request(params).then(e => {
        return e;
    })
}

let getObjects = async (obj) => {
    let params = {
        data: obj,
        url: '/api/v1/objectsearch',
        method: 'post'
    }
    return await request(params).then(e => {
        return e;
    })
}

let getDocuments = async (arr) => {
    let params = {
        data: arr,
        url: '/api/v1/documents',
        method: 'post'
    }
    return await request(params).then(e => {
        return e;
    })
}

let getHistograms = async (obj) => {
    let params = {
        data: obj,
        url: '/api/v1/objectsearch/histograms',
        method: 'post'
    }
    return await request(params).then(e => {
        return e;
    })
}
let request = async (params) => {
    let config = {
        headers: {},
    };
    let token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    if (params.method === 'post') {
        return await axios.post(baseUrl + params.url, params.data, config)
            .then(res => {
                return res.data;
            })
    } else {
        return await axios.get(baseUrl + params.url, config).then(res => {
            return res.data;
        })
    }
}

export {getUserInfo, auth, getObjects,getHistograms,getDocuments}