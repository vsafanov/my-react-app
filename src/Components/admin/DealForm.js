import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";


export const DealForm = (props) => {
    const { register, watch, formState: { errors }, handleSubmit } = useForm();
    const title = watch("Title", '');

    const [data, setData] = useState("");

    const onSubmit = (data, e) => {

        e.preventDefault()
        setData(JSON.stringify(data))
        alert(JSON.stringify(data))
    }

    const myform = useRef()


    useEffect(() => {


        if(props?.childFunc){
            props.childFunc.current = Alert}

      }, [])

    const Alert = (e) => {
       
        // myform.current.submit()
        alert("DealForm")
    }


    return (
        <form id={props?.id} ref={myform} onSubmit={handleSubmit(onSubmit)}>

            <input type="date" value={props?.PostedDate} {...register("PostedDate")} placeholder="Posted Date" />
            <input type="date" value={props?.ExpirationDate} {...register("ExpirationDate")} placeholder="Expiration Date" />
            <input value={props?.Title} {...register("Title")} placeholder="Title" />
            <input value={props?.Details} {...register("Details")} placeholder="Details" />
            {/* <input value={props.PostedDate} {...register("PostedDate")} placeholder="Posted Date" /> */}
            {/* <select {...register("category")}>
        <option value="">Select...</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
      </select> */}
            {/* <textarea {...register("aboutYou")} placeholder="About you" /> */}
            <p>{data}</p>
            <br />Watch for:  Title: {title} <br />
            {/* <input type="submit" /> */}
        </form>
    );
}
