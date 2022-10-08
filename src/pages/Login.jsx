import axios from 'axios';
import React from 'react';
import { Form , Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const { register, handleSubmit, reset } = useForm() 
  const navigate = useNavigate()
  
  const submit = data => {
    console.log(data)
    axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/users/login`, data)
      .then(res =>{
         navigate('/')
         localStorage.setItem("token", res.data.data.token)
        })
      .catch(error =>{
        if(error.response.status === 404)
        {
          alert('user not found')
        }
         console.error(error.response)
        })

    reset({
      email: "",
      password: ""
    })
  }

  return (
    <div className='login-cont'>
      <h1>Login</h1>
      <p>Welcome! Enter your email and password to continue</p>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" {...register("email")}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" {...register("password")}/>
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Sign in
        </Button>
      </Form>
      <p>
        Or create an account: <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;