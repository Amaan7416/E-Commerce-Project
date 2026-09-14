import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function SignupScreen() {
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    termsAccepted: false,
  });

  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type == "checkbox" ? checked : value;

    setFormValues({
      ...formValues,
      [name]: newValue,
    });
    validateField(name, newValue);
  };

 const getValidationClass = (name)=>{
  if(formValues[name]==="") return "";
  return formErrors[name]?"is-invalid":"is-valid"
 }
  
  const validateField = (name, value) => {
    let errorMessage = null;

    switch (name) {
      case "firstname":
      case "lastname":
        if (!value) {
          errorMessage = "This field is required...";
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = "Invalid email format..";
        }
        break;

      case "password":
        if (value.length < 6) {
          errorMessage = "Password must be at least 6 characters";
        }
        break;

      case "confirmpassword":
        if (value !== formValues.password) {
          errorMessage = "Password do not match..";
        }
        break;
      case "termsAccepted":
        if (!value) {
          errorMessage = "You must accept the term and conditions..";
        }
        break;

      default:
        break;
    }

    setFormErrors({
      ...formErrors,
      [name]: errorMessage,
    });
  };

  const isFormValid = () => {
    return (
      Object.values(formErrors).every((error) => error === null) &&
      Object.values(formValues).every(
        (value) => value !== "" && value !== false
      )
    );
  };

  return (
    <>
      <Container>
        <Row>
          <Col md="3"></Col>
          <Col md="6">
            <Form>
              <br />
              <h3 className="text-center">Signup Here</h3>

              <Form.Group controlId="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  name="firstname"
                  value={formValues.firstname}
                  onChange={handleChange}
                  isInvalid={!!formErrors.firstname}
                  className={getValidationClass("firstname")}
                />

                <Form.Control.Feedback type="invalid">
                  {formErrors.firstname}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="lastname" className="mt-2">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  name="lastname"
                  value={formValues.lastname}
                  onChange={handleChange}
                  isInvalid={!!formErrors.lastname}
                  className={getValidationClass("lastname")}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formErrors.lastname}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="email" className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  isInvalid={!!formErrors.email}
                  className={getValidationClass("email")}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formErrors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="pass1" className="mt-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  isInvalid={!!formErrors.password}
                  className={getValidationClass("password")}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formErrors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="pass1" className="mt-2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  value={formValues.confirmpassword}
                  onChange={handleChange}
                  isInvalid={!!formErrors.confirmpassword}
                  className={getValidationClass("confirmpassword")}
                ></Form.Control>
                 <Form.Control.Feedback type="invalid">
                  {formErrors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  name="termsAccepted"
                  value={formValues.termsAccepted}
                  checked={formValues.termsAccepted}
                  onChange={handleChange}
                  isInvalid={!!formErrors.termsAccepted}
                  className={getValidationClass("termsAccepted")}
                />
                 <Form.Control.Feedback type="invalid">
                  {formErrors.termsAccepted}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                className="mt-2"
                variant="success"
                disabled={!isFormValid()}
              >
                Register
              </Button>
            </Form>
          </Col>
          <Col md="3"></Col>
        </Row>
      </Container>
    </>
  );
}

export default SignupScreen;
