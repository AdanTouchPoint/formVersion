"use client";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "./mainForm.css";
const MainForm = ({ formInputs,dataUser,setDataUser }) => {
  let type = ["state","message","name","age","state","email"];
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };
  const fieldValidator = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = (email) => {
      return emailRegex.test(email.trim());
    };

    for (let key in dataUser) {
      console.log(dataUser[key])
      let value = dataUser[key];
      if(value === '') return false
      if (key === 'email') {
        let value = dataUser[key];
       if (isValidEmail(value) === false ) return false
      }
    }
  }
  const click = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
  if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if ( fieldValidator() === false ) {
      setError(true);
      return;
    }
    console.log(dataUser)
    setError(false);
  };

  useEffect( ()=>{
    console.log(dataUser)
  },[dataUser])
  return (
    <div>

    <Form name='fm-find'className="contact-form" onSubmit={click} noValidate validated={validated}>
    {error ? (
            <Alert variant={"danger"}>
              Please fill all fields.  Also, please make sure there are no spaces before of after your email or postcode.
            </Alert>
          ) : null}
      {formInputs.map((el,key)=> (
         el.type === "message" ? (
           <div key={key}>
            <Form.Group controlId="formBasicMessage">
              <Form.Label>{el.label}</Form.Label>
              <Form.Control
              required
                name={el.label}
                onChange={handleChange}
                as="textarea"
                rows={3}
                placeholder="Enter your message"
              />
            </Form.Group>
          </div>
        ) : (
          <div key={key}>
            <Form.Group controlId="formBasicTextField">
              <Form.Label>{el.label}</Form.Label>
              <Form.Control
                type= {
                  el.type === "age" ? "number" : el.type === "email" ? "email" : "text"
                }
                placeholder={"fill this please"}
                name={el.label}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
        )
      ) )}
  <Form.Group>
              <Button
                id="findButton-mainForm"
                type={"submit"}
                variant={"dark"}
                size={"lg"}
                onClick={click}
                className={"u-full-width capitalize-style find-btn-main-form"}
              >
              </Button>
            </Form.Group>
    </Form>
    </div>
  );
};

export default MainForm;
