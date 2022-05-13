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
import textStyle, { fontColor, link } from 'suneditor/src/plugins';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { Box } from "@mui/system";
import mergeTag from "../plugins/merge_tag_plugin";


export const DealForm = ({ dealid, ...props }) => {

    const [value, setDate] = useState(null);
    const [data, setData] = useState("");
    // const [deal, SetDeal] = useState({})
    // const [category, setCategory] = useState([])

    const companies = JSON.parse(sessionStorage.getItem("Companies"))
    const categories = JSON.parse(sessionStorage.getItem("Categories"))
    const statuses = JSON.parse(sessionStorage.getItem("Statuses"))

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

        if (result) {

            result.ExpirationDate = convertDate(result?.ExpirationDate)
            result.PostedDate = convertDate(result?.PostedDate)

            // setDate(convertDate(result.PostedDate))
            // console.log('Categories', result.Categories, 'Array IDs', result.Categories?.split(',').map(Number))

            // setCategory(result.Categories?.split(',').map(Number)) //convert to num array

            setValue('CategoryID', result.Categories?.split(',').map(Number))
            console.log('GetV', getValues('CategoryID'))
        }

        reset(result);
    }, [reset, result])


    // const title = watch("Title", '');
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

        // console.log('M',document.querySelectorAll('[data-command="merge_tag"]').width = '60px')

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

    return (
        <>
            {<b>Title: {getValues("Title")}</b>}
            <br /><br />
            {!loading && !isError && (

                <form id={props?.id} onSubmit={handleSubmit(onSubmit, onError)}>
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
                                <InputCalculator size='small' />
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
                                <FormControl fullWidth={true} sx={{ m: 2, marginLeft: 0, maxHeight: '160px' }} >
                                    <InputLabel htmlFor="id" >
                                        Category
                                    </InputLabel>
                                    <Select

                                        style={{ overflow: 'clip', maxHeight: '160px' }}
                                        size='small'
                                        multiple

                                        // native
                                        // defaultValue={result.Categories?.split(',').map(Number)} // must convert to numerric array
                                        //  value = {category}
                                        value={getValues('CategoryID') || result.Categories?.split(',').map(Number)}
                                        // setValue={getValues('CategoryID')|| result.Categories?.split(',').map(Number)}  
                                        onChange={(e) => {
                                            // setCategory(e.target.value); 
                                            setValue('CategoryID', e.target.value)
                                        }}
                                        label="Category"
                                        renderValue={(selected) =>
                                        (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {
                                                    selected.map((id) => (
                                                        // console.log(selected, 'Value=', value, 'Tostring', value?.toString())
                                                        <Chip size="small" key={id} label={categories.find(x => x.CategoryID === parseInt(id))?.Category}
                                                            onMouseDown={(event) => { event.stopPropagation(); }}
                                                            onDelete={() => {
                                                                // setCategory(selected.filter(entry => entry !== id)); 
                                                                setValue('CategoryID', selected.filter(entry => entry !== id))
                                                            }}
                                                        />
                                                    ))
                                                }
                                            </Box>
                                        )}
                                    // {...register("CategoryID")} //!!! Somehow brealing form
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
                                    // {...register("Title")}
                                    name='Title'
                                    height="120"
                                    defaultValue={result.Title}
                                    className='sun-editor-editable-custom'
                                    // setContents = {result.Title}                                    
                                    onChange={(data) => setValue('Title', data)}
                                    setOptions={{
                                        className: 'sun-editor-custom',
                                        defaultTag: 'div',
                                        plugins: [
                                            mergeTag
                                        ],
                                        buttonList: [
                                            ['codeView'], ["undo", "redo"], ["removeFormat"], ["bold"],
                                            [
                                                {
                                                    name: 'merge_tag',
                                                    dataCommand: 'merge_tag',
                                                    buttonClass: 'phrases',
                                                    title: 'Phrases',
                                                    dataDisplay: 'submenu',
                                                    innerHTML: "Phrases"
                                                }
                                            ]
                                        ]
                                    }}
                                />
                            </div>
                        </div>

                        <div className="row ">
                            <div className="col-12">

                                <SunEditor
                                    // {...register("Details")}
                                    height='200'
                                    name='Details'
                                    defaultValue={result.Details}
                                    // setContents = {result.Title}                                    
                                    onChange={(data) => setValue('Details', data)}
                                    setOptions={{
                                        className: 'sun-editor-custom',
                                        defaultTag: 'div',
                                        plugins: [
                                            mergeTag,
                                            fontColor,
                                            link
                                        ],
                                        buttonList: [
                                            ['codeView'], ['preview'], ["undo", "redo"], ['bold','italic'], 
                                            [
                                                {
                                                    name: 'merge_tag',
                                                    dataCommand: 'merge_tag',
                                                    buttonClass: 'phrases',
                                                    title: 'Phrases',
                                                    dataDisplay: 'submenu',
                                                    innerHTML: "Phrases"

                                                }
                                            ],['list'],['link'],["fontColor"],["removeFormat"],
                                        ]
                                    }}
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
