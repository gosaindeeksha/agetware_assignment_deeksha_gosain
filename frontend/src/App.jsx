import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/gen.css"
import { BrowserRouter,Route,Routes, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/protectedRoute"
import Login from "./components/login"
import Register from "./components/register"
import Home from "./components/home"
import Notfound from "./components/notfound"
import MakeLoan from './components/MakeLoan';
import LoanDetail from './components/LoanDetail';
import Paymentform from './components/Paymentform';
function Logout(){
  localStorage.clear()
  return <Navigate to="/login/" />
}
function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}
function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/logout" element={<Logout/>} />
      <Route path="/register" element={<RegisterAndLogout/>} />
      <Route path='/makeloan' element={<MakeLoan/>}/>
      <Route path="/loan/:loanId" element={<LoanDetail />} /> 
      <Route path="/loan/:loanId/payment" element={<Paymentform />} /> 


      <Route path="*" element={<Notfound/>} />
     
    </Routes>
    </BrowserRouter>
  )
}

export default App
