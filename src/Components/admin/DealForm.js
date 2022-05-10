import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import moment from 'moment';
import { TextField, Alert, Icon, Grid, MenuItem, Select, FormControl, InputLabel, Menu, Chip } from "@mui/material";
import ReactDatePicker from "react-datepicker";
import { DatePicker, DateTimePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Error } from "@mui/icons-material"
import ClientApi, { method } from "../../ClientApi";
import InputCalculator from "../calculator/InputCalculator";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { Box } from "@mui/system";

export const DealForm = ({ dealid, ...props }) => {

    const [value, setDate] = useState(null);
    const [data, setData] = useState("");
    const [deal, SetDeal] = useState({})
    const [category,setCategory] = useState([])

    const companies = JSON.parse(sessionStorage.getItem("Companies"))
    const categories = JSON.parse(sessionStorage.getItem("Categories"))


    const editorTitleConfig = {
        toolbar: ['bold', 'italic', 'sourceEditing']
    };


    const myform = useRef()


    const [{ result, loading, error, isError }] = ClientApi(`http://localhost:5000/deals_list/${dealid}`, method.get);

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
            console.log('Category', result.Categories, result.Categories?.split(',').map(Number))

            setCategory(result.Categories?.split(',').map(Number)) //convert to num array
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
                                    fontSize={10}
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
                                    fontSize='large'
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
                                    // style={{fontSize:'12px'}}
                                    fullWidth={true}
                                    margin="normal"
                                    size='small'
                                    select
                                    label="Company"

                                    // value = {[]}
                                    defaultValue={result.CompanyID}
                                    {...register("CompanyID")}
                                // helperText="Please select your currency"
                                >
                                    {companies.map((item) =>
                                        <MenuItem key={item.CompanyID} value={item.CompanyID} >
                                            {item.CompanyName}
                                        </MenuItem>
                                    )}
                                </TextField>
                            </div>
                            <div className="col-3" >
                                <FormControl fullWidth={true} sx={{ m: 2, marginLeft: 0, maxHeight: '160px'}} >
                                    <InputLabel  htmlFor="id" >
                                        Category
                                    </InputLabel>
                                    <Select
                                        {...register("CategoryID")}
                                        style={{ overflow:'clip',maxHeight: '160px'}}
                                        size = 'small'
                                        multiple
                                        
                                        // native
                                        // defaultValue={result.Categories?.split(',').map(Number)} // must convert to numerric array
                                         value = {category}
                                        
                                        onChange={(e) => {setCategory(e.target.value)}} 
                                        label="Category"
                                        renderValue={(selected) =>
                                        (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {
                                                    selected.map((id) => (
                                                        // console.log(selected, 'Value=', value, 'Tostring', value?.toString())
                                                        <Chip size="small" key={id} label={categories.find(x => x.CategoryID === parseInt(id))?.Category} 
                                                        onMouseDown={(event) => { event.stopPropagation();}}
                                                        onDelete={()=> {setCategory(selected.filter(entry => entry !== id)) }}/>
                                                    ))
                                                }
                                            </Box>
                                        )}
                                    >
                                        {categories.map((item) => (

                                            <MenuItem key={item.CategoryID} value={item.CategoryID} >
                                                {item.Category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </div>
                            <div className="col-6" >
                                <SunEditor
                                    {...register("Title")}
                                    name='Title'
                                    defaultValue={result.Title}
                                    // setContents = 'Hello'
                                    onChange={(data) => setValue('Title', data)}
                                />

                            </div>

                        </div>
                        {/* <div className="row">
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
                        </div> */}
                        <div className="row ">
                            <div className="col-12">

                                <SunEditor
                                    {...register("Details")}
                                    height='200'
                                    name='Title'
                                    defaultValue={result.Details}
                                    // setContents = 'Hello'
                                    onChange={(data) => setValue('Details', data)}
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