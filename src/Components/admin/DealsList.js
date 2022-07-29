import { Alert, AlertTitle, Backdrop, Button, Checkbox, CircularProgress, FormControlLabel, TextField } from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, useGridApiRef } from '@mui/x-data-grid';
import moment from 'moment';
import { confirm } from "react-confirm-box";
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import CustomModal from "../common/CustomModal";
import { DealForm } from "./DealForm";
import ExecuteApi from "../../ClientApi";
import configData from "../../config.json";

function getFormattedDate(params) {
  return moment(params.row.PostedDate).format('MM-DD-YYYY');
}

function ErrorAlert(props) {
  const [show, setShow] = useState(props.ShowAlert);

  if (show) {
    return (
      <Alert id={props.id} severity='error' onClose={() => setShow(false)} style={{ width: '500px' }}>
        <AlertTitle>Oh snap! You got an error!</AlertTitle>
        Description - <b>{props.Message}</b>
      </Alert>
    );
  }
  return null;
}
const DealsList = () => {

  const [{ result, loading, error, isError }] = ExecuteApi(`${configData.SERVER_URL}/dealslist?numberOfDeals=100`);

  const [modalShow, setModalShow] = useState(false);
  const [dealId, setDealId] = useState('');
  const [selectionModel, setSelectionModel] = useState([]);

  const OpenDetails = (dealId) => {
    //alert(dealId)
    setDealId(dealId)
    setModalShow(true)
  }

  const childFunc = useRef({})

  const onSave = () => {

    //THIS ID CALL FOR CHILD FORM DealForm Alert func
    // childFunc.current()

    alert("DealsList" + dealId);
    console.log(dealId)
  }

  const MyButton = () => {
    return <Button variant="contained" form='dealForm' type="submit" onClick={() => alert('test')}>Custom Save</Button>
  }

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: "Action",
      headerName: 'Action',
      sortable: false,
      // type:'actions',
      width: 120,
      headerAlign: 'center',
      headerClassName: 'grid-header',
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => OpenDetails(params.id)}
          >
            &nbsp;Edit &nbsp; <sup> {params.id}</sup>&nbsp;
          </Button>
        </>
      ),
    }
    ,
    // {
    //   field: 'DealID',
    //   headerName: 'Deal ID',
    //   // type: 'integer',
    //   width: 70,
    //   editable: false,
    //   headerClassName: 'grid-header',
    //   // flex:0.1
    // },
    {
      field: 'postedDate',
      headerName: 'Posted',
      width: 90,
      headerAlign: 'center',
      headerClassName: 'grid-header',
      type: 'date',
      // valueGetter:getFormattedDate, // THIS WORKS
      valueGetter: ({ value }) => moment(value).format('MM-DD-YYYY'), //AND THIS WORKS
      editable: true,
      // flex:0.15
    },
    {
      field: 'expirationDate',
      headerName: 'Expiration',
      headerAlign: 'center',
      headerClassName: 'grid-header',
      width: 90,
      type: 'date',
      valueFormatter: (params) => { return params.value ? moment(params.value).format('MM/DD/YYYY') : '' },

      editable: true,
      // flex:0.15
    },
    {
      field: 'status',
      headerName: 'Status',
      headerAlign: 'center',
      headerClassName: 'grid-header',
      // type: 'string',
      minWidth: 90,
      editable: true,
      // flex: 0.05
      renderCell: (params) => {
        return <div className="rowitem">{params.row.status.status1}</div>;
      },
    },
    {
      field: 'company',
      headerName: 'Company',
      headerAlign: 'center',
      headerClassName: 'grid-header',
      // type: 'string',
      minWidth: 90,
      editable: true,
      // flex: 0.05
      renderCell: (params) => {
        return <div className="rowitem">{params.row.company.companyName}</div>;
      },
    },
    {
      field: 'categories',
      headerName: 'Categories',
      // type: 'integer',
      headerAlign: 'center',
      width: 100,
      editable: false,
      headerClassName: 'grid-header',
      // renderCell: (params) => (<div className="text-wrap" dangerouslySetInnerHTML={{ __html: params.value }} />),
      // flex:0.1
      renderCell: (params) => {
        return <div className="rowitem">{params.row.categories.map((c) => <li key={c.categoryId}>{c.category1}</li>)}</div>;
      },
    },
    {
      field: 'title',
      headerName: 'Title',
      headerAlign: 'center',
      headerClassName: 'grid-header',
      // type: 'string',

      minWidth: 240,
      editable: true,

      renderCell: (params) => (<div className="text-wrap" dangerouslySetInnerHTML={{ __html: params.value }} />),
    },
    {
      field: 'details',
      headerName: 'Details',
      // headerAlign: 'center',
      headerClassName: 'grid-header',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      minWidth: 600,
      // className: 'grid-details',
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      renderCell: (params) => (<div style={{ margin: 'wrap' }} className='grid-details' dangerouslySetInnerHTML={{ __html: params.value }} />),

    },
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   width: 100,

    //   getActions: () => [
    //     <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
    //     <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
    //   ],
    // },
  ];


  const handleDelete = async () => {

    // const ids = Array.from(selectionModel).map((item)=> item.DealID + ',')

    const result = await confirm(`You are about to delete next records: ${selectionModel} Are you sure?`);
    if (result) {

      console.log("You click yes!");
      return;
    }
    console.log("You click No!");
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button variant="outlined" style={{ margin: '0 5px 0 5px' }} size="small" onClick={() => OpenDetails(0)}>Add New Deal</Button>
        <Button variant="outlined" color="warning" size="small" onClick={handleDelete}>Delete</Button>
      </GridToolbarContainer>
    );
  }

  return (
    <>
      {/* <DealDetails show={modalShow} id={dealId} onHide={() => setModalShow(false)} onSave={()=>onSave()} /> */}
      <CustomModal
        size="lg"

        show={modalShow}
        id={dealId}
        label={dealId === 0 ? `Create New Deal` : `Edit deal # ${dealId}`}

        onHide={() => setModalShow(false)}
        // onSave={onSave}
        ShowSaveButton={true}
        form='dealForm'
        type='submit'
        AddButton={<MyButton />}
      >
        <DealForm id="dealForm" dealid={dealId} /> {/* childFunc={childFunc}  onSubmit={onSave}/> */}
      </CustomModal>

      {isError && (<ErrorAlert id='al1' ShowAlert='true' Message={error && error.message} />)}

      {loading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
          <CircularProgress color="inherit" />
        </Backdrop>)
      }

      {!loading && !isError && (

        <div style={{ height: 800, width: '100%' }}>

          <DataGrid
            sx={{ 'fontSize': '12px' }}
            headerHeight={30}
            autoHeight={true}
            rowHeight={140}
            headerAlign='center'
            rows={result}
            columns={columns}
            pageSize={10}
            //rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableSelectionOnClick
            density='comfortable'
            getRowId={(row) => row.dealId}
            key={(row) => row.dealId}
            // loading='true'
            components={{ Toolbar: CustomToolbar }}

            onSelectionModelChange={(ids) => {

              //Keep this comment for feature use
              // const selectedIDs = new Set(ids);
              // const selectedRowData = result.filter((row) =>
              //   selectedIDs.has(row.DealID)
              // );
              // setSelectionModel(selectedRowData)
              // console.log(selectedRowData);

              setSelectionModel(ids)
              console.log(ids);
            }}
          />
          {/* <div>X: {Array.from(selectionModel).map((item)=>(<b>{item.DealID}<br></br></b>))}</div> */}
        </div>

      )
      }

    </>
  );
}

export default DealsList;
