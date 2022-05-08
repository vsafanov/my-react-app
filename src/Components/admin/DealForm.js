import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import moment from 'moment';
import { TextField, Alert, Icon, Grid, MenuItem, Select } from "@mui/material";
import ReactDatePicker from "react-datepicker";
import { DatePicker, DateTimePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Error } from "@mui/icons-material"
import ClientApi, { method } from "../../ClientApi";
import InputCalculator from "../calculator/InputCalculator";




export const DealForm = ({ dealid, ...props }) => {

    const [value, setDate] = useState(null);
    const [data, setData] = useState("");
    const [deal, SetDeal] = useState({})

    const myform = useRef()


    const [{ result, loading, error, isError }] = ClientApi('http://localhost:5000/deals_list/166683', method.get);

    console.log(result)

    const { register, watch, formState: { errors }, handleSubmit, control, reset, getValues, setValue } = useForm({

        defaultValues: { result },
        mode: "onChange"

    });


    //NEED THIS ONE TO UPDATE defaultValues when request is done
    //GOOD PLACE TO FORMAT ORIGINAL DATA
    useEffect(() => {
        console.log('reset')

        // eslint-disable-next-line react-hooks/exhaustive-deps
        // defaultValues = {
        // alert(result)
        if (result) {

            result.ExpirationDate = convertDate(result?.ExpirationDate)
            result.PostedDate = convertDate(result?.PostedDate)

            setDate(convertDate(result.PostedDate))
        }

        reset(result);
    }, [reset, result])


    // const title = watch("Title", '');
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

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <>
            {<b>Title: {getValues("Title")}</b>}
            <br /><br />
            {!loading && !isError && (

                <form id={props?.id} onSubmit={handleSubmit(onSubmit, onError)}>

                    {/* <input type="date" defaultValue={convertDate(row.PostedDate)} {...register("PostedDate")} placeholder="Posted Date" /> */}
                    <div>
                        <div className="row">
                            <div className="col-3" >
                                <TextField
                                    label="Posted"
                                    // defaultValue={convertDate(row.ExpirationDate)}
                                    size="small"
                                    type="date"
                                    focused
                                    {...register("PostedDate")}
                                // onChange={handleChange}
                                //onChange={e=> {setUser({...user, name: e.target.value});}}
                                />
                            </div>
                            <div className="col-3">
                                <TextField
                                    label="Expires"
                                    // defaultValue={convertDate(row.ExpirationDate)}
                                    size="small"
                                    type="date"
                                    fontSize = 'large'
                                    focused
                                    {...register("ExpirationDate")}
                                // onChange={handleChange}
                                //onChange={e=> {setUser({...user, name: e.target.value});}}
                                />
                            </div>
                            <div className="col-6">
                                <InputCalculator size='small' color='secondary' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3" >
                                <TextField
                                    size="small"
                                    select 
                                    label="Company Name"
                                    defaultValue={result.CompanyID}
                                    {...register("CompanyID")}
                                // helperText="Please select your currency"
                                >
                                    {JSON.parse(sessionStorage.getItem("Companies")).map((item) =>
                                        <MenuItem key={item.CompanyID} value={item.CompanyID} >
                                            {item.CompanyName}
                                        </MenuItem>
                                    )}
                                </TextField>
                            </div>
                            <div className="col-3" >
                                <Select
                                    multiple
                                    native
                                    defaultValue={[result.CompanyID]}
                                    // @ts-ignore Typings are not considering `native`
                                    // onChange={handleChangeMultiple}
                                    label="Company Name"
                                    // {...register("CompanyID")}
                                >
                                    {JSON.parse(sessionStorage.getItem("Companies")).map((item) => (
                                        <option key={item.CompanyID} value={[item.CompanyID]}>
                                            {item.CompanyName}
                                        </option>
                                    ))}
                                </Select>

                            </div>
                            <div className="col-6" >
                                <TextField
                                    label="Title *"
                                    fullWidth={true}
                                    multiline
                                    rows={5}
                                    // ref={register}
                                    // defaultValue={row?.Title}
                                    size="small"
                                    error={errors.Title ? true : false}
                                    // helperText = "Required field"
                                    {...register("Title", { required: true })}

                                // onChange={handleChange}
                                //onChange={e=> {setUser({...user, name: e.target.value});}}
                                />
                                {/* {errors.Title && <span style={{ color: 'red' }}><Error color="error" fontSize="small" title="Example" /> This field is Required</span>} */}

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-12">
                                <TextField
                                    label="Details"
                                    fullWidth={true}
                                    multiline
                                    rows={5}
                                    // defaultValue={row?.Details}
                                    size="small"
                                    {...register("Details")}
                                // onChange={handleChange}
                                //onChange={e=> {setUser({...user, name: e.target.value});}}
                                />
                            </div>
                        </div>
                    </div>

                    <p>{data}</p>
                    <br />Watch for All Fields: {watchFields} <br />
                    {/* <input type="submit" /> */}
                </form>
            )}
        </>
    )
}