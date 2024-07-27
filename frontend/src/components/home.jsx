import { useState, useEffect } from "react"
import api from "../api"
import Navbar from "./navbar";
import Loanlist from "./Loanlist";
import Paymentlist from "./Paymentlist";
export default function Home() {
    const [user,setUser] = useState("");

    useEffect(()=>{
        api.get("/api/user/").then((res)=> res.data.username).then((username)=>setUser(username)).catch((error)=>alert(error));
    },[])
  return (
    <div className="home">
      <Navbar/>
     <h1 className="text-center mt-5"> Hello {user} ! Welcome to The Spark Bank</h1>
    <div className="text-center"> <a href="/makeloan" ><button className="loanbutton">Lend Money</button></a></div>
     <h2 className="mt-5 ">Your Current Loans</h2>
     <hr />
    <p style={{color:"red"}} className="text-center">*for more details and payment options click on the Loan</p>
     <Loanlist/>
     <h2 className="mt-5 ">Payment History</h2>
     <hr />
     <Paymentlist/>

    </div>
  )
}
