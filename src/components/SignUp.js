import React from 'react'

//DEPENDENCIAS
import UserService from '../services/UserService';
import {Container, Col, Row, Form, Button, Card} from 'react-bootstrap'

class SignUp extends React.Component {
  // const {submitSignUp, newUser, changeHandlerSignUp} = props
  state={
    newUser: { name: '', lastName: '', email:'', password: '' },
    errorMessageSignUp: ''
  }

  service = new UserService();
  

  //SIGNUP CONFIG
	submitSignUp = (event) => {
		event.preventDefault();
    	this.service.signup(this.state.newUser.name, this.state.newUser.lastName, this.state.newUser.email, this.state.newUser.password)
		.then((result) => {
      this.setState({errorMessageSignUp: result.message})
			this.props.checkIfLoggedIn();
		})
		.catch((err) => {
			console.log(err);
		});
	};

	changeHandlerSignUp = (_eventTarget) => {
		this.setState({ newUser: { ...this.state.newUser, [_eventTarget.name]: _eventTarget.value } });
  };

  render(){
     return(

      <div className="sign-up">
        <Container>
          <Row>
            <Col lg="6" className="mx-auto">
              <Card className="p-4 mt-4">
                <Row>
                  <Col>
                  <h2>SIGN UP</h2>
                  </Col>
                </Row>

                <Form onSubmit={this.submitSignUp}>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label htmlFor="name"></Form.Label>
                        <Form.Control
                          required
                          type="text" 
                          name="name" 
                          value={this.state.newUser.name} 
                          onChange={(event)=>this.changeHandlerSignUp(event.target)}
                          placeholder="Name">
                        </Form.Control>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label htmlFor="lastName"></Form.Label>
                        <Form.Control
                          required
                          type="text" 
                          name="lastName" 
                          value={this.state.newUser.lastName} 
                          onChange={(event)=>this.changeHandlerSignUp(event.target)}
                          placeholder="Last Name">
                        </Form.Control>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label htmlFor="email"></Form.Label>
                          <Form.Control
                            required
                            type="email" 
                            name="email" 
                            value={this.state.newUser.email} 
                            onChange={(event)=>this.changeHandlerSignUp(event.target)}
                            placeholder="Email">
                          </Form.Control>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label htmlFor="password"></Form.Label>
                        <Form.Control
                          required
                          type="password" 
                          name="password" 
                          value={this.state.newUser.password} 
                          onChange={(event)=>this.changeHandlerSignUp(event.target)}
                          placeholder="Password">
                        </Form.Control>
                      </Form.Group>



                    </Col>



                  </Row>

                  <Card.Text className="text-danger">{this.state.errorMessageSignUp}</Card.Text>
                  <Button variant="dark" className="mt-3" type="submit">SIGN UP</Button>

                </Form>

              </Card>



            </Col>


          </Row>

        </Container>



      </div>
  )
  }
 
}

export default SignUp