import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
    state = {
        selectOnchange: null,
        disabled: true
    };

    handleSubmit = (e) => {
        const userID = this.userID.value;
        const { dispatch } = this.props;

        e.preventDefault();
        dispatch(setAuthedUser(userID));
    };

    handleChange = (e) => {
        const userID = this.userID.value;

        this.setState({
            selectOnchange: userID
        }, () => {
            if (this.state.selectOnchange) {
                this.setState({
                    disabled: false
                })
            }
        })
    }

    renderForm = () => (
        <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formGridState">
                <Form.Label>Username</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} ref={(id) => (this.userID = id)}>
                    <option hidden value="default">Select user</option>
                    {this.props.userNames.map((item) => (
                        <option value={item.value} key={item.value}>
                            {item.label}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Button disabled={this.state.disabled} type="submit">Login</Button>
        </Form>
    )

    render() {
        return (
            <Row className="justify-content-center align-items-center min-vh-60">
                <Col xs={12} md={6} lg={4}>
                    <Card>
                        <Card.Header>Login</Card.Header>
                        <Card.Body className="login">
                            {this.renderForm()}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        userNames: Object.keys(users).map((id) => ({
            value: id,
            label: users[id].name
        }))
    };
}

export default connect(mapStateToProps)(Login);
