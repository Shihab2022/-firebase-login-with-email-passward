import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import "./App.css";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "./firebase.init";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false); ///kou kono valid vlie dile bairy jay error daki tar jonnno
  const [error, setError] = useState(""); //kou error khaily taky dakanor jonno ay state
  const [registered,setRegistered]=useState(false);

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };
const handleRegisterChange= (event) => {
  setRegistered(event.target.checked)
}
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };
  const handleFromSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    setValidated(true);
    if (!/(?=.*[!#$%&? "])/.test(password)) {
      setError("Password should contain at least one space character");
      return;
    }
    setError("");



    if(registered){
signInWithEmailAndPassword(auth,email,password)
.then(result => {
  const user = result.user
  console.log(user);
})
.catch(error=>{
  console.log(error);
  setError(error.message)
})

    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });

    }
 

    event.preventDefault(); //page jano reload na mary tar jonno
  };
  return (
    <div>
      <div className="w-50 mx-auto my-5">
        <h1 className="text-primary">Please { registered? 'Login' : 'Register'} !!!</h1>
        <Form noValidate validated={validated} onSubmit={handleFromSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your email !!!
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePasswordBlur}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your password !!!
            </Form.Control.Feedback>
          </Form.Group>
          <p className="text-danger">{error}</p>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisterChange} type="checkbox" label="Already Registered" />
          </Form.Group>
          <Button variant="primary" type="submit">
         {registered ? 'Login' :'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
