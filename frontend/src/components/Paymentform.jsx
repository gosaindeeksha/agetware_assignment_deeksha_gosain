import Navbar from "./navbar";
import { useParams } from 'react-router-dom';
import api from "../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Paymentform() {
    const navigate = useNavigate();
    const [pay_amount, setpay_amount] = useState("");
    
    const [pay_type, setpay_type] = useState("EMI");
    const { loanId } = useParams();
    const [loading, setLoading] = useState(false);
  const [calc_det,setcalc_det]=useState([]);
  useEffect(()=>{
    api.get(`/api/dues_and_calculations/loan/${loanId}/`).then((res)=>res.data).then((data)=>setcalc_det(data)).catch((error)=>alert(error));
},[loanId])
   

    const emipay = Number(calc_det.amount_left)>Number(calc_det.initial_emi_amount)?calc_det.initial_emi_amount:calc_det.amount_left;
    const handleSubmit =async (e)=>{
        setLoading(true);
        e.preventDefault();

        try {
         
            const res = await api.post('/api/payments/',{loan:loanId,payment_amount:pay_type == "Lumpsum"?parseFloat(pay_amount) : parseFloat(emipay),payment_type:pay_type});
            console.log(res.data);
            navigate(`/loan/${loanId}`);
           
        } catch (error) {
            alert(error);
            console.log(error)
        }finally{
            setLoading(false)
        }

    }

  
  return (
    <>
      <Navbar/>
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Make Payment</h1>
        <p style={{color:"red"}}>*If EMI option is selected $ {emipay} will be payed</p>
        <select
        value={pay_type}
        onChange={(e) => setpay_type(e.target.value)}
        className="form-input"
      >
        <option value="EMI">EMI</option>
        <option value="Lumpsum">Lumpsum</option>
      </select>
      {pay_type === 'Lumpsum' && ( // Conditional rendering for payment amount
        <input
          type="text"
          className="form-input"
          value={pay_amount} // Assuming you have pay_amount state
          onChange={(e) => setpay_amount(e.target.value)}
          placeholder="Payment Amount"
        />
      )}
        <button className="form-button" type="submit">
        Pay
        </button>
    </form>
    
    <div>{JSON.stringify(calc_det)}</div>

    </>
  )
}
