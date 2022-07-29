import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import configData from "./config.json"

export const METHOD_TYPE = {
    get: "get",
    post: "post",
    delete: 'delete'
}

export const BODY_TYPE = {
    text: "text",
    json: "json"
}

export const ApiParams = {
    url: '',
    requestMethod: METHOD_TYPE.get,
    bodyType: BODY_TYPE.json,
    body: {},
    isSecure: false,
    data: {}
}

export const setCookieToken = (token) => {

    try {

        let exp = JSON.parse(atob(token.split(".")[1]))?.exp * 1000

        var date = new Date(exp);
        document.cookie = `token=${token} ;expires=${date}; SameSite=None; Secure; path=/`
        console.log(document.cookie)
        return true
    }
    catch (e) {
        console.error('setCookieToken: ', e)
        return false;
    }
}

export const getCookie = (name) => {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if (cookiePair[0].trim() === name) {
            // return cookie value
            return cookiePair[1];
        }
    }

    // Return null if not found
    return null;
}

export const logout = () => {
    deleteCookie('token')
}

export const deleteCookie = (name) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export const isLoggedIn = () => {
    return (getCookie('token') == null) ? false : true
}

export const ExecuteApi = (url, requestMethod = METHOD_TYPE.get, bodyType = BODY_TYPE.json, body = null, isSecure = true, data = {}) => {
    let [result, setResult] = useState({});
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);
    let [response, setResponse] = useState({});
    let [isError, setIsError] = useState(false);
    let navigate = useNavigate()

    useEffect(() => {

        async function fetchMyAPI() {

            const[{ result, loading, error, isError, response }] = await ClientApi(url, requestMethod, bodyType, body, isSecure, data);

            if (response.status === 401) {
                // return navigate('/login')
            }

            setResult(result)
            setLoading(loading)
            setError(error)
            setIsError(isError)
            setResponse(response)
        }
        fetchMyAPI()

    }, [loading])

    return [{ result, loading, error, isError,response }]
}

export const ClientApi = async (url, requestMethod = METHOD_TYPE.get, bodyType = BODY_TYPE.json, body = null, isSecure = true, data = {}) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")

    if (isSecure) {
        let bearer = 'Bearer ' + getCookie('token')
        myHeaders.append("Authorization", bearer)

        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Access-Control-Allow-Credentials", "true");
        myHeaders.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        myHeaders.append("Access-Control-Allow-Headers", " X-CSRF-TOKEN, Origin,Accept, X-Requested-With, Content-Type");
    }

    var requestOptions = {
        method: requestMethod,
        body: body,
        // credentials: 'include',
        // withCredentials: true,
        headers: myHeaders,
        redirect: 'follow'
    };

    let error = null
    let result = null
    let loading = true
    let response = null

    try {
        response = await fetch(url, requestOptions)
    }
    catch (err) {
        error = err
        loading = false
        return [{ result, error, loading, response }]
    }

    if (response.status === 401) {
        return [{ result, error, loading, response }]
    }

    if (response.ok) {
        try {
            switch (bodyType) {
                case BODY_TYPE.text:
                    result = await response.text()
                    break;

                default:
                    result = await response.json()
                    break;
            }

        } catch (err) {
            error = err
        }
    }
    else {
        error = await response.statusText
    }
    loading = false
    return [{ result, error, loading, response }]

}

export const ApiHelper = async (url, requestMethod = METHOD_TYPE.get, bodyType = BODY_TYPE.json, body = null, isSecure = false, data = {}) => {

    // const [result, setResult] = useState({});
    // const [loading, setLoading] = useState(true);
    // const [isError, setIsError] = useState(false);
    // const [error, setError] = useState(null);

    var myHeaders = new Headers();
    // myHeaders.append("Content-Type", contentType)
    myHeaders.append("Content-Type", "application/json")
    let bearer = 'Bearer ' + document.cookie['token']

    if (isSecure) {
        myHeaders.append("Authorization", bearer)

        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Access-Control-Allow-Credentials", "true");
        myHeaders.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        myHeaders.append("Access-Control-Allow-Headers", " X-CSRF-TOKEN, Origin,Accept, X-Requested-With, Content-Type");
        // myHeaders.append('Content-Type' ,'application/x-www-form-urlencoded; charset=UTF-8')
    }

    var requestOptions = {
        method: requestMethod,
        body: body,
        // credentials: 'include',
        // withCredentials: true,
        headers: myHeaders,
        redirect: 'follow'
    };


    let error = null
    let isError = false
    let result = {}
    let loading = true
    let response = null

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const fetchData = async () => {

    try {

        // alert(url)
        let response = {};
        console.log('M', requestMethod)
        switch (requestMethod) {
            case METHOD_TYPE.get:
                response = await axios.get(url, requestOptions);
                break;
            case METHOD_TYPE.post:
                response = await axios.post(url, body, { headers: { "Content-Type": "application/json" } });
                break;
            case METHOD_TYPE.delete:
                response = await axios.delete(url, data.id, requestOptions);
                break;
            default:
                break;
        }
        // console.log("Result:",response.data);
        result = response.data;
    } catch (err) {
        console.log("Error:", error);
        error = err;
        isError = true;
    }
    loading = false;
    // }

    // fetchData()

    // useEffect(() => {

    //     fetchData().catch(
    //         console.error()
    //     );

    // }, []);

    return [{ result, loading, error, isError, response }];
}

export const LoadLookup = (tableNames) => {

    let isAllDone = false;
    tableNames.map(async (tableName) => {

        let url = `${configData.SERVER_URL}/${tableName}`
        let [{ result, loading }] = await ClientApi(url)

        sessionStorage.setItem(tableName, JSON.stringify(result))
        isAllDone = true
        return isAllDone && loading

    })
}

export default ExecuteApi