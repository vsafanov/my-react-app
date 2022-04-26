// import './App.css';
import Home from "../deals/Home"
import { RouteObject } from "react-router-dom"
import { Outlet, Link, useRoutes, useParams } from "react-router-dom"
import Layout from '../admin/Layout';
import Index  from '../admin/Index';
import DealsList from '../admin/DealsList';

function App() {

  

  return (
    <>
  
    {/* <h1>Hello</h1> */}
    <Home />
    </>
  );
}

export default App;
