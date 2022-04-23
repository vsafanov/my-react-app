
import DealsList from "./DealsList"
import Deal from './Deal';
import axios from "axios";
import React, { useEffect, useState } from "react"
import { Alert, AlertTitle, Backdrop, CircularProgress, Button, Typography } from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import Icon from '@mui/material/Icon';


const useDataApi = () => {

  const [list, setItems] = useState({});
  // const [url, setUrl] = useState('http://localhost:5000/deal_list' );
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  // console.log("started");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/deal_list');
        setItems(response.data);
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

  return [{ list, loading, error, isError }];
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

function Home() {

  const [{ list, loading, error, isError }] = useDataApi();

  const [msg, setMsg] = useState('')

  const changeState = () => {
    setMsg('New Text that updates external component ');
  };

  return (
    <>

      <Typography variant="h5">Hello: '{msg}'</Typography>

      {isError && (<ErrorAlert id='al1' ShowAlert='true' Message={!msg ? error.message : msg} />)}

      {loading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
          <CircularProgress color="inherit" />
        </Backdrop>)
      }

      {!loading && !isError && (
        <div>
          <DealsList items={list} resourceName="deal" itemComponent={Deal} />
        </div>)
      }

      <div><Button variant='contained' onClick={changeState} startIcon={<AlarmIcon />}>Update Alert</Button></div>

    </>

  );
}

export default Home;
