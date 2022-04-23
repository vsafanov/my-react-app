import axios from "axios";
import { Buffer } from 'buffer';
import React, { useEffect, useState } from "react"
import Deal from "./Deal"


function DealsList({items}) {

    

    // useEffect(() => {
    //     (async () => {
    //         const response = await axios.get(`http://localhost:5000/deal-list`);

    //         items = response.data;
    //         console.log(response.data);
    //     }
    //     )()
    // }, []);



    // let payload = { "username": "Aliska", "password": "Aliska" };
    // let url = `http://localhost:3863/admin/getemailbody?asins=174402`; //api url

    // // const axios = require(`axios`);
    // axios({
    //     method: 'get',
    //     url: url,
    //     headers: {
    //         "auth": payload
    //     },
    // }).then(function (res) {
    //     console.log(res.data)
    // });

    // console.log("Valid=" + (items));
    // const ar = React.Children.toArray(items);

    return (
        
        // (!items)?
        // <h2>Error</h2>
        // :
        <div className="row justify-content-md-center" style={{ '--bs-gutter-x': '0px' }} >
            {
                items.map((item, id) => (
                    <Deal key={id} deal={item} />
                    // <ItemComponent key={id} {...{ [resourceName]: item }} />
                ))}
        </div>
    )
}




export default DealsList