
import DealsList from "./DealsList"
import Deal from './Deal';
import React, { useEffect, useState } from "react"
import { Alert, AlertTitle, Backdrop, CircularProgress, Button, Typography } from '@mui/material';
import ClientApi, { method } from "../../ClientApi";
import configData from "../../config.json";



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

function Home({ searchText, ...rest }) {

  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  // const [search, setSearch] = useState(searchText)
  // const [data, setData] = useState([])


  // const Search = (keyword) => {

  //   setValue(keyword) //!!! MUST HAVE IT FOR DealsList COMPONENT TO RELOAD !!!
  //   console.log('Click:', keyword)
  //   // console.log("d:", data)
  //   const filtered = keyword === ''
  //     ? result
  //     : result.filter(entry => entry?.Details?.toLowerCase()?.includes(keyword?.toLowerCase()))
  //   setData(filtered)
  //   console.log("filtered:", filtered)
  // }

  const getDeals = async () => {
    setLoading(true) //!MUST SET IT HERE
    let url = `${configData.SERVER_URL}//frontdealslist?numberOfDeals=120&searchText=${searchText}`
    // const [{ result, loading, error, isError }] = ClientApi(url, method.get);
    // setLoading(loading)
    // setResult(result);
    // setIsError(isError)
    // setError(error)

    fetch(url)
      .then(data => {
        return data.json();
      })
      .then(data => {
        setResult(data);
        setLoading(false)
        console.log('useEffect:', result)
      })
      .catch(err => {
        setIsError(true)
        setError(err)
        console.error(err)
      })
  }


  useEffect(() => {

    getDeals()

    // if (props.events) {
    //   props.events.click = Search
    // }
  }, [searchText])


  // USE IT FOR REGESTERING EVENTS
  // useEffect(() => {
  //   setData(result)
  //   console.log('useEffect:', data)
  //   if (props.events) {
  //     props.events.click = Search
  //   }
  // }, [result])


  return (
    <>

      {/* <Typography variant="h5">Hello: '{msg}'</Typography> */}

      {isError && (<ErrorAlert id='al1' ShowAlert='true' Message={isError ? error.message : ''} />)}

      {loading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
          <CircularProgress color="inherit" />
        </Backdrop>)
      }

      {!loading && !isError && (
        <div>
          <DealsList
            items={result}
            key={searchText}
            resourceName="deal"
            itemComponent={Deal} />
        </div>)
      }

    </>

  );
}

export default Home;
