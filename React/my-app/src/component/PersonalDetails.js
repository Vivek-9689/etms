// src/components/PersonalDetails.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

  
const PersonalDetails = () => {
  
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
  const teamMembers = useSelector(state => state.myobj.teamobj);
  const obj = useSelector(state => state.myobj.obj);

 
 
  
  const currentUser = obj;

  
  const emp  = currentUser;

  // State to manage edit mode and form values
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    id: obj.id,
    loginId: obj.loginId,
    firstName:obj.firstName,
    lastName:obj.lastName ,
    desigId: obj.desigId,
    emailId: emp.emailId,
    contactNo: emp.contactNo,
    address: emp.address
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch an action or make an API call to update the user details
    // For example:
    // dispatch(updateUserDetails(formValues));
    fetch("http://localhost:8080/updateEmployee",{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
    .then(response => response.text())
    .then(data => {
      console.log(data)
    });
    
    console.log(formValues)
    setIsEditing(false); // Exit edit mode after submission
  };

  return (
    <div className="bg-dark text-white min-vh-100 p-4">
      <Container fluid>
        <div style={{ paddingTop: '90px' }}>
          <h1 className="text-center mb-4">Personal Details</h1>
          <Row className="justify-content-center">
            <Col md={8}>
              {isEditing ? (
                <Form onSubmit={handleSubmit}>
                
                  <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      name="emailId"
                      value={formValues.emailId}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Mobile Number:</Form.Label>
                    <Form.Control
                      type="Number"
                      name="contactNo"
                      value={formValues.contactNo}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formValues.address}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">Submit</Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)} className="ms-2">Cancel</Button>
                </Form>
              ) : (
                <Table striped bordered hover variant="dark">
                  <tbody>
                    <tr>
                      <td><strong>Designation:</strong></td>
                      <td>{emp.desig ? emp.desig.name : 'N/A'}</td>
                    </tr>
                    <tr>
                      <td><strong>First Name:</strong></td>
                      <td>{emp.firstName}</td>
                    </tr>
                    <tr>
                      <td><strong>Last Name:</strong></td>
                      <td>{emp.lastName}</td>
                    </tr>
                    <tr>
                      <td><strong>UserName:</strong></td>
                      <td>{obj.login.username}</td>
                    </tr>
                    <tr>
                      <td><strong>Email:</strong></td>
                      <td>{emp.emailId}</td>
                    </tr>
                    <tr>
                      <td><strong>Mobile Number:</strong></td>
                      <td>{emp.contactNo}</td>
                    </tr>
                    <tr>
                      <td><strong>Address:</strong></td>
                      <td>{emp.address}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
              {!isEditing && (
                <Button
                  variant="primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default PersonalDetails;
