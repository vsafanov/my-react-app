// import './App.css';
import Home from "../deals/Home"
import { RouteObject } from "react-router-dom"
import { Outlet, Link, useRoutes, useParams } from "react-router-dom"
import Layout from '../admin/Layout';
import Index  from '../admin/Index';
import DealsList from '../admin/DealsList';

import ClientApi, {LoadLookup} from "../../ClientApi";

function App() {

  const loading = LoadLookup("Companies")
  // alert(loading)
  // <LoadLookup tableName="Companies" />

  return (
    <>

    {!loading &&     <Home />}
    </>
  );
}

export default App;
