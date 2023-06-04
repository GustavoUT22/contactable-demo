import apiFetch from "./api-fetch.js";
import { tokenKey } from "../config.js";

async function login(credentials = {email , password}){

    const {token, ... user} = await apiFetch("login", { body : credentials});
    sessionStorage.setItem(tokenKey, token)
    sessionStorage.setItem("user",JSON.stringify(user))
    return user
    
    //logica
    // const response = await fetch(`${BASE_URI}/login`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(credentials),
    // });

    // if(!response.ok){
    //     const data = await response.json()
    //     throw new Error(data.errors)
    // }

    // const data = await response.json()
    // sessionStorage.setItem(tokenKey , data.token)
    // return data

}

async function logout(){

    const data = await apiFetch("logout", { method: "DELETE" })
    sessionStorage.removeItem(tokenKey)
    return data
    // const token = sessionStorage.getItem(tokenKey)

    // const response = await fetch(`${BASE_URI}/logout`, {
    //     method: "DELETE",
    //     headers:{
    //         Authorization: `Token token=${token}`
    //     }
    // })

    // let data;
    
    // try {
    //     data = await response.json()
    // } catch (error) {
    //     data = response.statusText
    // }
    
    // if(!response.ok){
    //     throw new Error(data.errors)
    // }
    
 
    // sessionStorage.removeItem(tokenKey)
    // return data
}


export { login , logout}

// NOTAS:
// sessionStorage.getItem(tokenKey) se utiliza para leer el valor del token almacenado en la sesión actual del navegador

// sessionStorage.setItem(tokenKey, data.token) se utiliza para escribir o actualizar el valor del token almacenado en la sesión actual del navegador.
