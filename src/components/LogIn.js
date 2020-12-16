import React from 'react'


//DEPENDENCIAS
import UserService from '../services/UserService';
import {Container, Col, Row, Form, Button, Card} from 'react-bootstrap'

class LogIn extends React.Component {

  state={
    loggingUser: { email: '', password: '' },
    errorMessageLogin: ''
  }
  
  service = new UserService();

  //LOGIN CONFIG
	submitLogIn = (event) => {
		event.preventDefault();
		this.service
			.login(this.state.loggingUser.email, this.state.loggingUser.password)
			.then((result) => {   
        this.setState({errorMessageLogin: result.message})   
        this.props.checkIfLoggedIn()
			})
			.catch((err) => {
				console.log('Sorry something went wrong on submit.', err);
			});
	};

	changeHandlerLogIn = (_eventTarget) => {
		this.setState({ loggingUser: { ...this.state.loggingUser, [_eventTarget.name]: _eventTarget.value } });
	};

  render(){
    return(
      <div className="login">

        <Container>
          <Row>
            <Col lg="6" className="mx-auto mt-4">
              <Card className="p-4">
                <Row>
                  <Col >
                    <h2>LOG IN</h2>
                  </Col>
                </Row>
                <Form onSubmit={this.submitLogIn}>
                  <Row>
                    <Col>

                      <Form.Group>
                        <Form.Label htmlFor="email"></Form.Label>
                        <Form.Control
                          required
                          type="email" 
                          name="email" 
                          value={this.state.loggingUser.email} 
                          onChange={(event)=>this.changeHandlerLogIn(event.target)}
                          placeholder="Introduce your email">
                        </Form.Control>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label htmlFor="password"></Form.Label>
                        <Form.Control
                          required 
                          type="password" 
                          name="password" 
                          value={this.state.loggingUser.password} 
                          onChange={(event)=>this.changeHandlerLogIn(event.target)}
                          placeholder="Introduce your password">
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Card.Text className="text-danger">{this.state.errorMessageLogin}</Card.Text>
                  <Button variant="dark" className="mt-3" type="submit">LOG IN</Button>
                </Form>

              </Card>

            </Col>

          </Row>

        </Container>
        

      </div>

    )

  }

}

export default LogIn