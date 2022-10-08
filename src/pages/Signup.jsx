import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const { register, handleSubmit, reset } = useForm() 
  const [ message , setMessage ] = useState()
  const navigate = useNavigate()

  const submit = (data) => {
    axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/users`, data)
      .then(res =>{
          console.log(res.data.status)
          setMessage(res.data.status)
          navigate('/')          
        })
      .catch(error =>{        
         console.error(error.response?.data.message)
         setMessage(error.response?.data.message)         
        })

    reset({
      firstName:"",
      lastName: "",
      email: "",
      password: "",
      phone:""
    })
  }

  return (
    <div className='signup-cont'>

      <h1>Sign up</h1>
      <p className='error-message'>{message}</p>
      
      <Form onSubmit={handleSubmit(submit)}>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="first name" {...register("firstName")}/>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="last name" {...register("lastName")}/>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" {...register("email")}/>
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" {...register("password")}/>
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" placeholder='Phone 10 digits' maxLength={10} {...register("phone")}/>
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Sign up
        </Button>
      </Form>
    </div>
  );
};

export default Signup;