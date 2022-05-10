import axios from "axios";
import { useEffect, useState } from "react";

export const method = {
    get: "get",
    post: "post",
    delete: 'delete'
}

const ClientApi = (url, method, dataToPost) => {

    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
        const fetchData = async () => {
            setLoading(true);
            try {

                // alert(url)
                let response = {};
                switch (method) {
                    case 'get':
                        response = await axios.get(url);
                        break;
                    case 'post':
                        response = await axios.post(url, dataToPost);
                        break;
                    case 'delete':
                        response = await axios.delete(url, dataToPost.id);
                        break;
                    default:
                        break;
                }
                // console.log("Result:",response.data);
                setResult(response.data);
            } catch (error) {
                console.log("Error:", error);
                setError(error);
                setIsError(true);
            }
            setLoading(false);
        }

        fetchData().catch(
            console.error
        );

    }, []);

    return [{ result, loading, error, isError }];
}

export const LoadLookup = ((tableNames) => {

    let isAllDone = false;
    tableNames.map((tableName) => {

        let [{ result, loading }] = ClientApi(`http://localhost:5000/${tableName}`, method.get)

        sessionStorage.setItem(tableName, JSON.stringify(result))

        return isAllDone && loading

    })
})


// const [{ result, loading, error, isError }] = ClientApi('http://localhost:5000/Companies', method.get);

// const [{ result, loading, error, isError }] = ClientApi('http://localhost:5000/Statuses', method.get);


export default ClientApi