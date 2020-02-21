import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Col, Row, Form, Card }  from 'react-bootstrap';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false
    };

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (e) => {
        const { optionOne, optionTwo } = this.state;
        const { dispatch } = this.props;

        e.preventDefault();

        this.setState(
            {
                optionOne: '',
                optionTwo: '',
                toHome: true
            },
            () => dispatch(handleAddQuestion(optionOne, optionTwo))
        );
    };

    render() {
        const { optionOne, optionTwo, toHome } = this.state;

        if (toHome === true) return <Redirect to="/" />;

        return (
            <Fragment>
                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <Card bg="light" className="m-3">
                            <Card.Header>Create New Question</Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="optionOne">
                                        <h5 className="h2-mb-1">Would you rather...</h5>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter First Option"
                                            name="optionOne"
                                            value={optionOne}
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    <h5 className="h2-mb-1">OR</h5>
                                    <Form.Group controlId="optionTwo">
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Second Option"
                                            name="optionTwo"
                                            value={optionTwo}
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    <Button type="submit" variant="outline-dark" disabled={optionOne === '' || optionTwo === ''}>Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default connect()(NewQuestion);
