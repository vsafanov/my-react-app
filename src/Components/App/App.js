// import './App.css';
import Home from "../deals/Home"

import { LoadLookup } from "../../ClientApi";


function App() {

  const loading = LoadLookup(['Companies', 'Statuses', 'Categories'])
  // alert(loading)
  // <LoadLookup tableName="Companies" />

  return (
    <>
      {!loading &&
        <Home />
      }
    </>
  );
}

export default App;
