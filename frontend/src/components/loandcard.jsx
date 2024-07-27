import { useNavigate } from "react-router-dom";

export default function Loancard( {loan} ) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/loan/${loan.loan_id}`);
      };
  return (
        <div className="col mb-4 ">
          <div className="card h-100 loan" onClick={handleClick}>
            <div className="card-body">
              <h5 className="card-title">Loan ID: {loan.loan_id}</h5>
              <p className="card-text">
                <strong>Loan Amount:</strong> ${loan.loan_amount}<br />
                <strong>Loan Period:</strong> {loan.loan_period/12} years<br />
                <strong>Rate of Interest:</strong> {loan.rate_of_interest}% per annum
              </p>
            </div>
          </div>
        </div>
      );
  
}
