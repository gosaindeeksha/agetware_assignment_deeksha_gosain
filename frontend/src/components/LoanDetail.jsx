
import Navbar from './navbar'
import { useParams } from 'react-router-dom';
import api from '../api';
import { useEffect, useState } from 'react';

export default function LoanDetail() {
  const [init_lo,setinit_lo]=useState([]);
  const [calc_det,setcalc_det]=useState([]);
  const { loanId } = useParams();
  useEffect(()=>{
    api.get(`/api/loans/${loanId}/`).then((res)=>res.data).then((data)=>setinit_lo(data)).catch((error)=>alert(error));
    api.get(`/api/dues_and_calculations/loan/${loanId}/`).then((res)=>res.data).then((data)=>setcalc_det(data)).catch((error)=>alert(error));
   
},[loanId])
  

  return (
    <div>
      <Navbar/>
      
      <div className="container mt-4">
  <div className="card">
    <div className="card-header">
      <h1 className="card-title">Loan Details for Loan ID: {init_lo.loan_id}</h1>
    </div>
    <div className="card-body">
      <h2 className="card-text">Loan Amount: {init_lo.loan_amount}</h2>
      <h2 className="card-text">Total Amount: {calc_det.total_amount}</h2>
      <h2 className="card-text">EMI Amount: {calc_det.initial_emi_amount}</h2>
      <h2 className="card-text">Amount Paid: {calc_det.amount_paid}</h2>
      <h2 className="card-text">Rate of Interest: {init_lo.rate_of_interest}</h2>
      <h2 className="card-text">Number of EMI Left: {calc_det.emi_left}</h2>
    </div>

  </div>
</div>
<div className='text-center mt-5'>
  <a href={`/loan/${loanId}/payment`}><button className='.loanbutton'>Payment</button></a>
</div>
    </div>
    
  )
}
