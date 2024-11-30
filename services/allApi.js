import { commonAPI } from "./commonApi";
import { server_url } from "./server";

//Regsiter Api

export const regsiterApi = async (user) => {
    return await commonAPI("POST", `${server_url}/register`, user, "")
}

export const loginApi = async (user) => {
    return await commonAPI("POST", `${server_url}/login`, user, "")
}

export const addprojectApi = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${server_url}/addproject`, reqBody, reqHeader)
}

export const getHomeProject = async () => {
    return await commonAPI("GET", `${server_url}/getHomeProject`, "", "")
}

export const getAllProject = async (searchKey, reqHeader) => { 
    return await commonAPI("GET", `${server_url}/getAllProject?searchKey=${searchKey}`, "", reqHeader);
}


export const getUserProject = async (reqHeader) => {
    return await commonAPI("GET", `${server_url}/getUserProject`, "", reqHeader)
}

//edit project
export const editProjectApi = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${server_url}/project/edit/${id}`, reqBody, reqHeader)
}
//delete project
export const deleteProjectApi = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${server_url}/project/delete/${id}`, {}, reqHeader)
}