import { Alert, AlertTitle, Backdrop, Button, Checkbox, CircularProgress, FormControlLabel, TextField } from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import moment from 'moment';
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import CustomModal from "../common/CustomModal";
import { DealForm } from "./DealForm";
import ClientApi, { method } from "../../ClientApi";


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



  const [{ result, loading, error, isError }] = ClientApi('http://localhost:5000/deals_list', method.get);

  const [modalShow, setModalShow] = useState(false);
  const [dealId, setDealId] = useState('');

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
      width: 130,
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
      field: 'PostedDate',
      headerName: 'Posted',
      width: 100,
      headerClassName: 'grid-header',
      type: 'date',
      // valueGetter:getFormattedDate, // THIS WORKS
      valueGetter: ({ value }) => moment(value).format('MM-DD-YYYY'), //AND THIS WORKS
      editable: true,
      // flex:0.15
    },
    {
      field: 'ExpirationDate',
      headerName: 'Expiration',
      headerClassName: 'grid-header',
      width: 100,
      type: 'date',
      valueFormatter: (params) => { return params.value ? moment(params.value).format('MM/DD/YYYY') : '' },

      editable: true,
      // flex:0.15
    },
    {
      field: 'StatusID',
      headerName: 'Status',
      headerAlign: 'center',
      headerClassName: 'grid-header',
      // type: 'string',
      minWidth: 110,
      editable: true,
      // flex: 0.05

    },
    {
      field: 'CompanyName',
      headerName: 'Company',
      headerAlign: 'center',
      headerClassName: 'grid-header',
      // type: 'string',
      minWidth: 100,
      editable: true,
      // flex: 0.05

    },
    {
      field: 'Categories',
      headerName: 'Categories',
      // type: 'integer',
      width: 120,
      editable: false,
      headerClassName: 'grid-header',
      renderCell: (params) => (<div className="text-wrap" dangerouslySetInnerHTML={{ __html: params.value }} />),
      // flex:0.1
    },
    {
      field: 'Title',
      headerName: 'Title',
      headerAlign: 'center',
      headerClassName: 'grid-header',
      // type: 'string',

      minWidth: 200,
      editable: true,

      renderCell: (params) => (<div className="text-wrap" dangerouslySetInnerHTML={{ __html: params.value }} />),
    },
    {
      field: 'Details',
      headerName: 'Details',
      headerAlign: 'center',
      headerClassName: 'grid-header',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 600,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      renderCell: (params) => (<div style={{ margin: 'hidden' }} dangerouslySetInnerHTML={{ __html: params.value }} />),

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


  return (
    <>

      {/* <DealDetails show={modalShow} id={dealId} onHide={() => setModalShow(false)} onSave={()=>onSave()} /> */}
      <CustomModal
        size="lg"

        show={modalShow}
        id={dealId}
        title={`Edit deal # ${dealId}`}
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
          

          {/* <input type="checkbox" title={(row)=>row.dealId}></input> */}
          <DataGrid

            // autoPageSize

            sx={{ 'fontSize': '12px' }}
            headerHeight={30}
            autoHeight={true}
            rowHeight={100}
            rows={result}
            columns={columns}
            pageSize={10}
            //rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableSelectionOnClick
            density='comfortable'
            getRowId={(row) => row.DealID}
            // loading='true'
            components={{ Toolbar: GridToolbar}}

          />

        </div>
      )
      }

    </>
  );
}

export default DealsList;
