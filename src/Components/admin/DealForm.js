import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import moment from 'moment';
import { TextField, Alert, Icon, Grid, MenuItem, Select, FormControl, InputLabel, Menu, Chip, OutlinedInput } from "@mui/material";
import ReactDatePicker from "react-datepicker";
import { DatePicker, DateTimePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Error } from "@mui/icons-material"
import ExecuteApi from "../../ClientApi";
import InputCalculator from "../calculator/InputCalculator";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { Box } from "@mui/system";
import { optionsDetails, optionsTitle } from "../../config";
import configData from "../../config.json";



export const DealForm = ({ dealid, ...props }) => {

    const [value, setDate] = useState(null);
    const [data, setData] = useState("");
    // const [deal, SetDeal] = useState({})
    const [category, setCategory] = useState([])


    const companies = JSON.parse(sessionStorage.getItem("Company"))
    const categories = JSON.parse(sessionStorage.getItem("Category"))
    const statuses = JSON.parse(sessionStorage.getItem("Status"))

    const myform = useRef()

    const [{ result, loading, error, isError }] = ExecuteApi(`${configData.SERVER_URL}/deal/${dealid}`)

    console.log(result)

    const { register, watch, formState: { errors }, handleSubmit, control, reset, getValues, setValue } = useForm({

        defaultValues: { result },
        mode: "onChange",
        reValidateMode: 'onChange'

    });

    //NEED THIS ONE TO UPDATE defaultValues when request is done
    //GOOD PLACE TO FORMAT ORIGINAL DATA
    useEffect(() => {
        console.log('reset')

        if (result) {

            result.expirationDate = convertDate(result?.expirationDate)
            result.postedDate = convertDate(result?.postedDate) || convertDate(new Date())

            // setDate(convertDate(result.PostedDate))
            // console.log('Categories', result.Categories, 'Array IDs', result.Categories?.split(',').map(Number))

             setCategory(result.categories?.map((c)=>c.categoryId) || []) //convert to num array

            // setValue('CategoryID', result?.Categories?.split(',').map(Number) || [])
            // result?.Categories && setValue('CategoryID', result?.Categories === "" ? [] : result?.Categories.split(',').map(Number))
            console.log('GetV', category)

            reset(result);

        }

    }, [result])


    // const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
    const watchFields = watch(["categoryId"]); // you can also target specific fields by their names

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
        setValue('categoryId', e.target.value, true) //update for validation
        console.log('C', e.target.value)
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
                                    {...register("postedDate")}
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
                                    defaultValue={result.statusId || 1}
                                    {...register("statusId")}
                                // helperText="Please select your currency"
                                >
                                    {statuses?.map((item) =>
                                        <MenuItem key={item.statusId} value={item.statusId} dense>
                                            {item.status1}
                                        </MenuItem>
                                    )}
                                </TextField>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3" >
                                <TextField
                                    fullWidth={true}
                                    margin="normal"
                                    size='small'
                                    select
                                    label="Company"
                                    InputProps={{ style: { fontSize: 14 } }}
                                    defaultValue={result.companyId || 755}
                                    {...register("d")}
                                // helperText="Please select your currency"
                                >
                                    {companies.map((item) =>
                                        <MenuItem key={item.companyId} value={item.companyId} dense>
                                            {item.companyName}
                                        </MenuItem>
                                    )}
                                </TextField>
                            </div>
                            <div className="col-3" >
                                <FormControl fullWidth={true} sx={{ m: 2, marginLeft: 0, maxHeight: '160px' }} >
                                    <InputLabel error={errors.categoryId?.type === 'required'} style={{ fontSize: 14 }}>  Category </InputLabel>
                                    <Select
                                        style={{ overflow: 'clip', maxHeight: '160px' }}
                                        size='small'
                                        error={errors.categoryId?.type === 'required'}
                                        multiple
                                        value={category} //{getValues('CategoryID')||result?.Categories?.split(',').map(Number)} //
                                        dense
                                        label="Category"
                                        renderValue={(selected) =>
                                        (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {
                                                    selected?.map((id) => (
                                                        <Chip size="small" key={id} label={categories.find(x => x.categoryId === parseInt(id))?.category1}
                                                            onMouseDown={(event) => { event.stopPropagation(); }}
                                                            onDelete={() => {
                                                                var result = selected.filter(entry => entry !== id)
                                                                setCategory(result || [])
                                                                setValue('categoryId', result, true)//update for validation
                                                                console.log(getValues('categoryId'))
                                                            }}
                                                        />
                                                    ))
                                                }
                                            </Box>
                                        )}
                                        // ref={null}
                                        {...register("categoryId", {
                                            onChange: (e) => handleChange(e),
                                            required: true
                                        })}
                                    //  onChange={(e)=>setValue('CategoryID',e.target.value)} //MUST BE AFTER register
                                    >
                                        {categories.map((item) => (
                                            <MenuItem key={item.categoryId} value={item.categoryId} dense>
                                                {item.category1}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {/* {errors.CategoryID?.type === 'required' && "Category is required"} */}
                                </FormControl>

                            </div>
                            <div className="col-6" >
                                <InputLabel style={{ fontSize: '12px' }} error={errors.Title?.type === 'required'}>  Title </InputLabel>
                                <SunEditor
                                    {...register("title", { required: true })}
                                    style={{ margin: '16px' }}
                                    name='Title'
                                    height="120"
                                    defaultValue={result.title}
                                    className='sun-editor-custom'
                                    // setContents = {result.Title}                                    
                                    onChange={(data) => { setValue('Title', data, true) }}
                                    setOptions={optionsTitle}
                                // ref={null}
                                />
                                {/* {errors.CategoryID?.type === 'required' && "Title is required"} */}
                            </div>
                        </div>

                        <div className="row ">
                            <div className="col-12">
                                <InputLabel style={{ fontSize: '12px' }} error={errors.details?.type === 'required'}>  Details </InputLabel>
                                <SunEditor
                                    {...register("details", { required: true })}
                                    height='200'
                                    name='Details'
                                    defaultValue={result.details}
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
