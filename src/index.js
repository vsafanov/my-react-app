import React, { useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './Components/deals/Home';
import App from './Components/App/App';
import Layout from './Components/admin/Layout';
import HomeLayout from './Components/deals/HomeLayout';
import { adminRoutes } from './routes';

const theme = createTheme({
  palette: {
    primary: blue,
  },
});

const childEvent = {
  click: (value) => {
    console.log('childEvent', value)
  }
}

const Search = (value) => {
  console.log('Search', value)
  childEvent.click(value)
}


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout Search={Search} />} >
            <Route path="deal" element={<Home events={childEvent} />} />
          </Route>
          <Route path='admin' element={<Layout />}>
            {
              adminRoutes.map(route => {
                return <Route key={route.path} path={route.path} element={route.component} />

              })
            }
            {/* <Route path='index' element={<Index />} /> 
            <Route path='DealsList' element={<DealsList />} />  */}

          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
