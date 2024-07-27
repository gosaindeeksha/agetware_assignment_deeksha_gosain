import { useState, useEffect } from "react";
import api from "../api";
import Paymentcard from "./paymentcard";


export default function Paymentlist() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    api.get("/api/payments/")
      .then((res) => res.data)
      .then((data) => setPayments(data))
      .catch((error) => alert(error));
  }, []);

  return (
    <div className="container mt-5">
      {!payments.length ? (
        <h1>No Payments Yet</h1>
      ) : (
        <div className="row row-cols-1 row-cols-md-3">
          {payments.map(payment => (
            <Paymentcard key={payment.payment_id} payment={payment} />
          ))}
        </div>
      )}
    </div>
  );
}