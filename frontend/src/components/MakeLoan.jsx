import Navbar from "./navbar"
import "../styles/form.css"
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
export default function MakeLoan() {
    const [loan_amount, setloan_amount] = useState("");
    const [loanperiod, setloan_period] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit =async (e)=>{
        setLoading(true);
        e.preventDefault();

        try {
            const loanp = Number(loanperiod) *12;
            const res = await api.post('/api/loans/',{loan_amount:loan_amount,loan_period: (loanp)});
            navigate("/");
           
        } catch (error) {
            alert(error)
        }finally{
            setLoading(false)
        }

    }

  return (
    <>
    <Navbar/>
    <form onSubmit={handleSubmit} className="form-container">
        <h1>Lend Money</h1>
        <input type="text" className="form-input" value={loan_amount} onChange={(e)=>setloan_amount(e.target.value)} placeholder="Loan Amount "/>
        <input type="text" className="form-input" value={loanperiod} onChange={(e)=>setloan_period(e.target.value)} placeholder="Loan Period(in years)"/>
        <button className="form-button" type="submit">
        Lend Money
        </button>
    </form>
    </>
  )
}
