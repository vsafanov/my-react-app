
import DealsList from "./DealsList"
import Deal from './Deal';
import axios from "axios";
import React, { useEffect, useState } from "react"
import { Alert, AlertTitle, Backdrop, CircularProgress, Button, Typography } from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import Icon from '@mui/material/Icon';
import ClientApi, { LoadLookup, method } from "../../ClientApi";



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

function Home(props) {

  const [value, setValue] = useState('')

  LoadLookup(['Companies', 'Statuses', 'Categories'])

  let [{ result, loading, error, isError }] = ClientApi('http://localhost:5000/deals_list', method.get);


  const UpdateSearch = (value) => {
    setValue(value)
    console.log('Click:', value)
  }

  useEffect(() => {
    console.log('useEffect:', value)
    if (props.events) {
      props.events.click = UpdateSearch
    }
  }, [])

  return (
    <>

      {/* <Typography variant="h5">Hello: '{msg}'</Typography> */}
      { }
      {isError && (<ErrorAlert id='al1' ShowAlert='true' Message={isError ? error.message : ''} />)}

      {loading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
          <CircularProgress color="inherit" />
        </Backdrop>)
      }

      {!loading && !isError && (
        <div>
          <DealsList
            items={value === ''
              ? result
              : result.filter(entry => entry?.Details?.toLowerCase()?.indexOf(value?.toLowerCase()) >= 0)
            }

            resourceName="deal"
            itemComponent={Deal} />
        </div>)
      }

    </>

  );
}

export default Home;
