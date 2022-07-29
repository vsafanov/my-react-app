import './App.css';
import Home from "../deals/Home"
import { BrowserRouter, Route, Routes, useRoutes } from "react-router-dom";
import HomeLayout from "../deals/HomeLayout";
import Layout from "../admin/Layout";
import { adminRoutes } from "../../routes";
import { useEffect, useState } from "react";
import axios from 'axios';
import Login from '../../Auth/Login';

function App() {


  const [searchText, setSearchText] = useState('')

  //NOT USED, BUT AN OPTION TO REGISTER EVENTS, like click
  const childEvent = {
    click: (value) => {
      console.log('childEvent', value)
    }
  }

  const Search = (value) => {
    console.log('Search 1', value)
    setSearchText(value)
    // childEvent.click(value)
  }

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic QWxpc2thOkFsaXNrYQ==");

  var requestOptions = {
    method: 'GET',
    credentials: 'include',
    headers: myHeaders,
    redirect: 'follow'

  };
  const [loading, setLoading] = useState(false);
 
  // useEffect(() => {

  //   const fetchData = () => {
  //     setLoading(true);
  //     try {

  //       // alert(url)
  //       // let response = {};
  //       // response = await axios.get('http://localhost:5057/auth/login', requestOptions);

  //       fetch('http://localhost:5057/auth/login', {
  //         method: 'GET',
  //         credentials: 'include',
  //         // redirect: 'follow',
          
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //           'Authorization': 'Basic QWxpc2thOkFsaXNrYQ=='
  //         }
  //       })
  //         .then(
  //           function (response) {
  //             if (response.status !== 200) {
  //               console.log('Looks like there was a problem. Status Code: ' +
  //                 response.status);
  //               return;
  //             }
  //           }
  //         )
  //         .catch(function (err) {
  //           console.log('Fetch Error :-S', err);
  //         });

  //     } catch (error) {
  //       console.log("Error:", error);
  //       // setError(error);
  //       // setIsError(true);
  //     }
  //     setLoading(false);


  //   }

  //   fetchData()
    
  //   // .catch(
  //   //   error => console.log('error2', error)
  //   // );

  // }, [])

  return (
    <>
      {/* {loading && <h1>Loading...</h1>} */}
      { (

        <BrowserRouter>
          <Routes>
            <Route element={<HomeLayout onSearch={Search} />} >
              {/* <Route exact path={["/", "/deal"]} element={<Home searchText={searchText} />}  /> */}
              <Route path='/' element={<Home searchText={searchText} />} />
              <Route path='/deal' element={<Home searchText={searchText} events={childEvent} />} /> NOT USED, BUT AN OPTION TO REGISTER EVENTS, like click
            </Route>

            <Route path='admin' element={<Layout />} >
              {
                adminRoutes.map(route => {
                  return <Route key={route.path} path={route.path} element={route.element} />
                })
              }
            </Route>
            <Route  path='login' element={<Login />} />
            <Route path="*" element={<main style={{ padding: "1rem" }}> <p>There's nothing here!</p> </main>} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
