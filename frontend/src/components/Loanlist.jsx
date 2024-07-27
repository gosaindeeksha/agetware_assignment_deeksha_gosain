import Loancard from "./loandcard";
import { useState, useEffect } from "react";
import api from "../api";



export default function Loanlist() {
    const [loans, setLoans]=useState([]);
    useEffect(()=>{
        api.get("/api/loans/").then((res)=>res.data).then((data)=>setLoans(data)).catch((error)=>alert(error));
    },[])
  
  
  return (
<div className="container mt-5">
  {!loans.length ? (
    <h1>No Loans Yet</h1>
  ) : (
    <div className="row row-cols-1 row-cols-md-3">
      {loans.map(loan => (
        <Loancard key={loan.loan_id} loan={loan} />
      ))}
    </div>
  )}
</div>
  )
}
