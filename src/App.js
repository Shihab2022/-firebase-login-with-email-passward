import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import "./App.css";
import { getAuth } from "firebase/auth";
import app from "./firebase.init";
import { useState } from "react";



const auth = getAuth(app);

function App() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }

  const handlePasswordBlur = event => {
    setPassword(event.target.value);
  }
  const handleFromSubmit=event => {
    console.log('from submited')
    event.preventDefault(); //page jano reload na mary tar jonno 
  }
  return (
    <div>
      <div className="w-50 mx-auto my-5">
        <h1 className="text-primary">Please Register !!!</h1> 
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
  
    </div>
  );
}

export default App;
