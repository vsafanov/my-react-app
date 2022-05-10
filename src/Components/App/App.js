// import './App.css';
import Home from "../deals/Home"
import { RouteObject } from "react-router-dom"
import { Outlet, Link, useRoutes, useParams } from "react-router-dom"
import Layout from '../admin/Layout';
import Index from '../admin/Index';
import DealsList from '../admin/DealsList';

import ClientApi, { LoadLookup } from "../../ClientApi";
import Calculator from "../calculator/Calculator";
import InputCalculator from "../calculator/InputCalculator";

function App() {

  const loading = LoadLookup(['Companies','Statuses','Categories'])
  // alert(loading)
  // <LoadLookup tableName="Companies" />

  return (
    <>

      {!loading && 
      <>
        <br></br>
        <InputCalculator DefaultValue='55' fontSize="medium"  size="small" />
      <p style={{textAlign:'center'}}></p>
        <Home />
      </>}
    </>
  );
}

export default App;
