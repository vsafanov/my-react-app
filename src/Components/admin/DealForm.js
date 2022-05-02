import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import moment from 'moment';
import { TextField, Alert, Icon } from "@mui/material";
import ReactDatePicker from "react-datepicker";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Error } from "@mui/icons-material"


const useDataApiFromSQL = (id) => {

    const [row, setItem] = useState({})

    // const [url, setUrl] = useState('http://localhost:5000/deal_list' );
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // console.log(`http://localhost:5000/deals_list?id=${id}`)
                const response = await axios.get(`http://localhost:5000/deals_list/${id}`);

                setItem(response.data.recordset[0]);
            } catch (error) {
                //    console.log(error);
                setError(error);
                setIsError(true);
            }
            finally {
                setLoading(false);
            }

        }

        fetchData().catch(
            console.error
        );

    }, []);

    return [{ row, loading, error, isError }];
}

export const DealForm = ({ dealid, ...props }) => {

    const [value, setDate] = useState(null);
    const [data, setData] = useState("");
    const [deal, SetDeal] = useState({})
    const myform = useRef()


    const [{ row, loading, error, isError }] = useDataApiFromSQL(dealid);
    console.log(row)

    const { register, watch, formState: { errors }, handleSubmit, control, reset, getValues } = useForm({

        defaultValues: { row },
        mode: "onChange"

    });


    //NEED THIS ONE TO UPDATE defaultValues when request is done
    //GOOD PLACE TO FORMAT ORIGINAL DATA
    useEffect(() => {
        console.log('reset')

        // eslint-disable-next-line react-hooks/exhaustive-deps
        // defaultValues = {

        row.ExpirationDate = convertDate(row.ExpirationDate)
        row.PostedDate = convertDate(row.PostedDate)
        // CompanyID: row.CompanyID,
        // DealID: row.DealID,
        // Details: row.Details,
        // StatusID: row.StatusID,
        // Title: row.Title,
        // Note: row.Note      }

        setDate(convertDate(row.PostedDate))
        reset(row);
    }, [reset, row])


    const title = watch("Title", '');
    // const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
    const watchFields = watch(["Title", "PostedDate"]); // you can also target specific fields by their names

    const onSubmit = (data, e) => {

        e.preventDefault()
        setData(JSON.stringify(data))
        alert(JSON.stringify(data))
        // reset()
    }

    const onError = (errors, e) => console.log(errors, e);

    useEffect(() => {

        if (props?.childFunc) {
            props.childFunc.current = MyAlert
        }

    }, [props.childFunc])

    const MyAlert = (e) => {

        // myform.current.submit()
        alert("DealForm")
    }

    const convertDate = (date) => {
        return date ? moment(date).format("YYYY-MM-DD") : null;
    };

    return (
        <>
            {<b>Title: {getValues("Title")}</b>}
            <br /><br />
            {!loading && !isError && (

                <form id={props?.id} onSubmit={handleSubmit(onSubmit, onError)}>

                    {/* <input type="date" defaultValue={convertDate(row.PostedDate)} {...register("PostedDate")} placeholder="Posted Date" /> */}
                    <TextField
                        // id="Posted Date"
                        label="Posted Date"

                        // value={convertDate(row.PostedDate)}
                        size="small"
                        type="date"

                        {...register("PostedDate")}
                    // onChange={handleChange}
                    //onChange={e=> {setUser({...user, name: e.target.value});}}
                    />
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            id="PostedDate"
                            label="Posted Date"
                            {...register("PostedDate")}
                            value={value}

                            // selected={convertDate(row.PostedDate)}
                            onChange={(newValue) => { setDate(newValue); }}
                            renderInput={(params) => <TextField size="small"  {...params} />}

                        />
                    </LocalizationProvider> */}
                    <TextField
                        // id="ExpirationDate"
                        label="Expiration Date"
                        // defaultValue={convertDate(row.ExpirationDate)}
                        size="small"
                        type="date"
                        focused
                        {...register("ExpirationDate")}
                    // onChange={handleChange}
                    //onChange={e=> {setUser({...user, name: e.target.value});}}
                    />
                    <TextField
                        // id="Title"
                        // name="Title"
                        label="Title"
                        // ref={register}
                        // defaultValue={row?.Title}
                        size="small"
                        {...register("Title", { required: true, maxLength: 20 })}

                    // onChange={handleChange}
                    //onChange={e=> {setUser({...user, name: e.target.value});}}
                    />
                    {errors.Title && <span style={{ color: 'red' }}><Error color="error" title="Example" />This field is Required</span>}

                    <TextField
                        // id="Details"
                        label="Details"
                        // defaultValue={row?.Details}
                        size="small"
                        {...register("Details")}
                    // onChange={handleChange}
                    //onChange={e=> {setUser({...user, name: e.target.value});}}
                    />

                    <p>{data}</p>
                    <br />Watch for Title: {title} <br />
                    <br />Watch for All Fields: {watchFields} <br />
                    {/* <input type="submit" /> */}
                </form>
            )}
        </>
    )
}