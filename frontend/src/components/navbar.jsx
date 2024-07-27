import { useNavigate } from 'react-router-dom';



export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
   
    navigate("/logout/")
  
  };
  return (
    <nav className="navbar p-2" style={{backgroundColor:"#D7BDE6"}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
    <i className="fa-solid fa-building-columns fa-2x"></i>
    <span className=" pt-2" style={{fontFamily:"'Times New Roman', Times, serif", fontWeight:700,fontSize:"larger",paddingLeft:"2%"}}>THE SPARK BANK</span>
    </a>
    <span className="inline-text"> <button onClick={handleLogout}>Logout</button></span>
  </div>
 
</nav>
  )
}
