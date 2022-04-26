import React from 'react';
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
import { adminRoutes } from './routes';

const theme = createTheme({
  palette: {
    primary: blue,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route path="deal" element={<Home />} />
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
