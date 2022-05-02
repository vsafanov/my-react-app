import { Alert, AlertTitle, Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import moment from 'moment';
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import CustomModal from "../common/CustomModal";
import { DealForm } from "./DealForm";

function getFormattedDate(params) {
  return moment(params.row.PostedDate).format('MM-DD-YYYY');

}

const useDataApiFromSQL = () => {

  const [rows, setItems] = useState({});

  // const [url, setUrl] = useState('http://localhost:5000/deal_list' );
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/deals_list');
        setItems(response.data.recordset);
      } catch (error) {
        // console.log(error);
        setError(error);
        setIsError(true);
      }
      setLoading(false);
    }

    fetchData().catch(
      console.error
    );

  }, []);

  return [{ rows, loading, error, isError }];
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

  const [{ rows, loading, error, isError }] = useDataApiFromSQL();

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
      field: 'DealID',
      headerName: 'Deal ID',
      // type: 'integer',
      width: 100,
      editable: false,
    },
    {
      field: 'PostedDate',
      headerName: 'Posted Date',
      width: 150,
      type: 'date',
      // valueGetter:getFormattedDate, // THIS WORKS
      valueGetter: ({ value }) => moment(value).format('MM-DD-YYYY'), //AND THIS WORKS


      editable: true,
    },
    {
      field: 'ExpirationDate',
      headerName: 'Expiration Date',
      width: 150,
      type: 'date',
      valueFormatter: (params) => { return params.value ? moment(params.value).format('MM/DD/YYYY') : '' },

      editable: true,
    },
    {
      field: 'Title',
      headerName: 'Title',
      // type: 'string',
      width: 300,
      editable: true,
      flex: 10

    },
    {
      field: 'Details',
      headerName: 'Details',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 600,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: () => [
        <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
      ],
    },
    {
      field: "Action",
      headerName: 'Action',
      // type:'actions',
      width: 100,
      renderCell: (params) => (
        <strong>
          {/* {console.log(params.row)} */}
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => OpenDetails(params.id)}
          >
            Open  {params.id}
          </Button>
        </strong>
      ),


    }
  ];

  return (

    <>

      {/* <DealDetails show={modalShow} id={dealId} onHide={() => setModalShow(false)} onSave={()=>onSave()} /> */}
      <CustomModal
        show={modalShow}
        id={dealId}
        title={`Test My Title ${dealId}`}
        onHide={() => setModalShow(false)}
        // onSave={onSave}
        ShowSaveButton={true}
        form='dealForm'
        type='submit'
        MyButton={<MyButton />}
      >
        <h1>Test!!!</h1>
        <DealForm id="dealForm" dealid={dealId}/> {/* childFunc={childFunc}  onSubmit={onSave}/> */}
      </CustomModal>


      {isError && (<ErrorAlert id='al1' ShowAlert='true' Message={error && error.message} />)}

      {loading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
          <CircularProgress color="inherit" />
        </Backdrop>)
      }

      {!loading && !isError && (

        <div style={{ height: 600, width: '100%' }}>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            density='compact'
            getRowId={(row) => row.DealID}
            // loading='true'
            components={{ Toolbar: GridToolbar }}

          />

        </div>
      )
      }

    </>
  );
}

export default DealsList;
