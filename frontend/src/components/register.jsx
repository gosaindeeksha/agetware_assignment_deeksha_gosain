import Form from "./form"
import Bankbg from "./bankbg"
export default function Register() {
  
  return <>
  <Bankbg/>
  <Form route="/api/user/register/" method="register"/>
  </>
}
