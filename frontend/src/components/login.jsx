import Form from "./form"
import Bankbg from "./bankbg"
export default function Login() {
 
  return  <>
   <Bankbg/>
   <Form route="/api/token/" method="login"/>

  </>

}
