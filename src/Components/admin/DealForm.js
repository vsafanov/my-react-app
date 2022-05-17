import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { optionsDetails, optionsTitle } from "../../config";
import IcecreamTwoTone from '@mui/icons-material/IcecreamTwoTone';


export const DealForm = ({ dealid, ...props }) => {

    const [value, setDate] = useState(null);
    const [data, setData] = useState("");
    // const [deal, SetDeal] = useState({})
    const [category, setCategory] = useState([])


    const companies = JSON.parse(sessionStorage.getItem("Companies"))
    const categories = JSON.parse(sessionStorage.getItem("Categories"))
    const statuses = JSON.parse(sessionStorage.getItem("Statuses"))

    const myform = useRef()

    const [{ result, loading, error, isError }] = ClientApi(`http://localhost:5000/deals_list/${dealid}`, method.get);

    console.log(result)

    const { register, watch, formState: { errors }, handleSubmit, control, reset, getValues, setValue } = useForm({

        defaultValues: { result },
        mode: "onChange",
        reValidateMode: 'onChange',

    });

    //NEED THIS ONE TO UPDATE defaultValues when request is done
    //GOOD PLACE TO FORMAT ORIGINAL DATA
    useEffect(() => {
        console.log('reset')

        if (result) {

            result.ExpirationDate = convertDate(result?.ExpirationDate)
            result.PostedDate = convertDate(result?.PostedDate) || convertDate(new Date())

            // setDate(convertDate(result.PostedDate))
            // console.log('Categories', result.Categories, 'Array IDs', result.Categories?.split(',').map(Number))

            setCategory(result.Categories?.split(',').map(Number) || []) //convert to num array

            // setValue('CategoryID', result?.Categories?.split(',').map(Number) || [])
            // result?.Categories && setValue('CategoryID', result?.Categories === "" ? [] : result?.Categories.split(',').map(Number))
            console.log('GetV', category)
        
        reset(result);

    }

    }, [result])


    // const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
    const watchFields = watch(["CategoryID"]); // you can also target specific fields by their names

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

    //Update SunEditor styles
    useEffect(() => {

        const elements = Array.from(document.getElementsByClassName("se-toolbar sun-editor-common"))
        elements.map((item) => {

            // console.log('Item', item)
            return item.setAttribute('style', 'z-index:auto')

        })
        const btns = Array.from(document.querySelectorAll('[data-command="merge_tag"]'))
        btns.map((item) => {

            //  console.log('B', item)
            return item.setAttribute('style', 'width:50px')

        })
    }, [loading]);

    const handleChange = (e) => {        
        setCategory(e.target.value);
        setValue('CategoryID', e.target.value, true) //update for validation
        console.log('C',e.target.value)
    }

    return (
        <>
            {/* {<b>Title: {getValues("Title")}</b>} */}

            {!loading && !isError && (
                <form id={props?.id} onSubmit={handleSubmit(onSubmit, onError)} >
                    <div>
                        <div className="row">
                            <div className="col-3" >
                                <TextField
                                    label="Posted"
                                    fullWidth={true}
                                    // defaultValue={convertDate(row.ExpirationDate)}
                                    size="small"
                                    type="date"
                                    InputProps={{ style: { fontSize: 14 } }}
                                    focused
                                    {...register("PostedDate")}
                                // onChange={handleChange}
                                />
                            </div>
                            <div className="col-3">
                                <TextField
                                    label="Expires"
                                    fullWidth={true}
                                    // defaultValue={convertDate(row.ExpirationDate)}
                                    size="small"
                                    type="date"
                                    fontSize='large'
                                    focused
                                    {...register("ExpirationDate")}
                                    InputProps={{ style: { fontSize: 14 } }}
                                // InputLabelProps={{ style: { fontSize: 8 } }}

                                // onChange={handleChange}                                
                                />
                            </div>
                            <div className="col-3">
                                <InputCalculator size='small' /> {/*  DefaultValue={10}  Icon={<IcecreamTwoTone />} /> */}
                            </div>
                            <div className="col-3">
                                <TextField
                                    // style={{fontSize:'12px'}}
                                    fullWidth={true}
                                    // margin="normal"
                                    size='small'
                                    select
                                    label="Status"
                                    InputProps={{ style: { fontSize: 14 } }}
                                    // value = {[]}
                                    defaultValue={result.StatusID || 1}
                                    {...register("StatusID")}
                                // helperText="Please select your currency"
                                >
                                    {statuses.map((item) =>
                                        <MenuItem key={item.StatusID} value={item.StatusID} >
                                            {item.Status}
                                        </MenuItem>
                                    )}
                                </TextField>
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
                                    InputProps={{ style: { fontSize: 14 } }}
                                    // value = {[]}
                                    defaultValue={result.CompanyID || 755}
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
                                <FormControl fullWidth={true} sx={{ m: 2, marginLeft: 0, maxHeight: '160px' }} >
                                    <InputLabel error={errors.CategoryID?.type === 'required'}>  Category </InputLabel>
                                    <Select
                                        style={{ overflow: 'clip', maxHeight: '160px' }}
                                        size='small'
                                        error={errors.CategoryID?.type === 'required'}
                                        multiple
                                        value={category} //{getValues('CategoryID')||result?.Categories?.split(',').map(Number)} //

                                        label="Category"
                                        renderValue={(selected) =>
                                        (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {
                                                    selected?.map((id) => (
                                                        <Chip size="small" key={id} label={categories.find(x => x.CategoryID === parseInt(id))?.Category}
                                                            onMouseDown={(event) => { event.stopPropagation(); }}
                                                            onDelete={() => {
                                                                // setValue('CategoryID', selected.filter(entry => entry !== id))

                                                                var result = selected.filter(entry => entry !== id)
                                                                setCategory(result || [])
                                                                setValue('CategoryID', result, true)//update for validation
                                                                console.log(getValues('CategoryID'))
                                                            }}
                                                        />
                                                    ))

                                                }
                                            </Box>
                                        )}
                                        // ref={null}
                                        {...register("CategoryID", {
                                            onChange: (e) => handleChange(e),
                                            //onChange:(e)=>setValue('CategoryID',e.target.value), 
                                            required: true
                                        })}
                                    //  onChange={(e)=>setValue('CategoryID',e.target.value)} //MUST BE AFTER register
                                    >
                                        {categories.map((item) => (
                                            <MenuItem key={item.CategoryID} value={item.CategoryID} >
                                                {item.Category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {/* {errors.CategoryID?.type === 'required' && "Category is required"} */}
                                </FormControl>

                            </div>
                            <div className="col-6" >
                                <InputLabel style={{ fontSize: '12px' }} error={errors.Title?.type === 'required'}>  Title </InputLabel>
                                <SunEditor
                                    {...register("Title", { required: true })}
                                    style={{ margin: '16px' }}
                                    name='Title'
                                    height="120"
                                    defaultValue={result.Title}
                                    className='sun-editor-custom '
                                    // setContents = {result.Title}                                    
                                    onChange={(data) => { setValue('Title', data, true) }}
                                    setOptions={optionsTitle}
                                    ref={null}

                                />
                                {/* {errors.CategoryID?.type === 'required' && "Title is required"} */}
                            </div>
                        </div>

                        <div className="row ">
                            <div className="col-12">
                                <InputLabel style={{ fontSize: '12px' }} error={errors.Details?.type === 'required'}>  Details </InputLabel>
                                <SunEditor
                                    {...register("Details", { required: true })}
                                    height='200'
                                    name='Details'
                                    defaultValue={result.Details}
                                    // setContents = {result.Title}                                    
                                    onChange={(data) => setValue('Details', data, true)}
                                    setOptions={optionsDetails}
                                    ref={null}
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

/* get components from their class name: */
