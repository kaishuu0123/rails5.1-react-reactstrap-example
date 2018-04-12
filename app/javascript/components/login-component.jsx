import React from 'react';
import {
  Container,
  Card, CardBody, CardTitle,
  Form, FormGroup, Label, Input,
  Button
} from 'reactstrap';

import Header from './header';
import styles from './hr';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit(event, email, password) {
    let request = new Request('/api/v1/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    fetch(request).then(function (response) {
      return response.json();
    }).then((json) => {
      localStorage.setItem('access_token', json.data.access_token);
      localStorage.setItem('refresh_token', json.data.refresh_token);

      this.props.history.push('/');
    }).catch(function (error) {
      console.error(error);
    })

    event.preventDefault();
  }

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <Header title='Rails 5.1 + webpacker + React + Reactstrap Example' />
        <Container className="mt-sm-4">
          <Card body>
            <CardTitle>Login</CardTitle>
            <Form onSubmit={(event) => this.handleSubmit(event, email, password)}>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  onChange={(event) => {
                    this.setState({
                      email: event.target.value
                    })
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={(event) => {
                    this.setState({
                      password: event.target.value
                    })
                  }}
                />
              </FormGroup>
              <Button className="col-md-12">Login</Button>
              <hr className={styles.hrText} data-content="OR" />
              <Button href='/oauth/twitter' className="col-md-12"> Sign in with Twitter</Button>
            </Form>
          </Card>
        </Container>
      </div>
    )
  }
}

export default LoginComponent