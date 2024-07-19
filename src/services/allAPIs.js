//All API calls


import { baseUrl } from "./baseUrl";
import { commonAPI } from "./commonAPI";

//Register API call
export const registerAPI = async(user) =>{
    return await commonAPI("post",`${baseUrl}/register`,user,"")
}

//Login API call
export const loginAPI = async(user) =>{
    return await commonAPI("post",`${baseUrl}/login`,user,"")
}

//add service api call
export const addServiceAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/service/add`,reqBody,reqHeader)
}

// get user service api call
export const userServiceAPI = async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/service/all-user-services`,"",reqHeader)
}

//get all services api call
export const allServiceAPI = async(searchKey) =>{
    return await commonAPI("get",`${baseUrl}/service/all-service?search=${searchKey}`,"","")
}

//update service api call
export const updateUserServiceAPI = async(serviceId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/service/update-service/${serviceId}`,reqBody,reqHeader)
}

//delete service api call
export const deleteUserServiceAPI = async(serviceId,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/service/delete-service/${serviceId}`,{},reqHeader)
}


//add booking api call
export const addBookingAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/booking/add`,reqBody,reqHeader)
}


// get user booking api call
export const userBookingAPI = async()=>{
    return await commonAPI("get",`${baseUrl}/booking/all-user-bookings`,"","")
}

