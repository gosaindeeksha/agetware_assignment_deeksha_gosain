
export default function Paymentcard( {payment} ) {
   

  return (
        <div className="col mb-4 ">
          <div className="card h-100 loan" >
            <div className="card-body">
              <h5 className="card-title">Payment ID: {payment.payment_id}</h5>
              <p className="card-text">
                <strong>Loan ID:</strong> ${payment.loan}<br />
                <strong>Payment Date:</strong> {payment.payment_date} <br />
                <strong>Payment Amount:</strong> {payment.payment_amount} <br />
                <strong>Payment Type</strong> {payment.payment_type}
              </p>
            </div>
          </div>
        </div>
      );
  
}
