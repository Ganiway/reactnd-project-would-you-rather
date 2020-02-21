import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { handleAddAnswer } from '../actions/questions';
import Avatar from './Avatar';
import PageNotFound from './PageNotFound';

class UnansweredQuestion extends Component {
    state = {
        selectOnchange: null,
        disabled: true
    };

    handleSubmit = (id, e) => {
        const answer = this.form.answer.value;
        const { dispatch } = this.props;

        e.preventDefault();

        if (answer !== '') {
            dispatch(handleAddAnswer(id, answer));
        } else {
            this.setState({ errorMsg: 'You must make a choice' });
        }
    };

    handleChange = (e) => {
        const value = e.target;

        this.setState({
            selectOnchange: value
        }, () => {
            if (this.state.selectOnchange) {
                this.setState({
                    disabled: false
                })
            }
        })
    };

    render() {
        const { question, author } = this.props;

        if (question === null) {
            return <PageNotFound />;
        }

        const { optionOne, optionTwo, id } = question;
        const { name, avatarURL } = author;

        return (
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <Card bg="light" className="m-3">
                        <Card.Header>
                            <Avatar avatarURL={avatarURL} className="mr-2" />
                            {name} asks: Would you rather...
                        </Card.Header>
                        <Card.Body className="d-flex justify-content-center">
                            <Form onSubmit={(e) => this.handleSubmit(id, e)} ref={(f) => (this.form = f)}>
                                <Form.Check
                                    custom
                                    type="radio"
                                    id="optionOne"
                                    label={optionOne.text}
                                    value="optionOne"
                                    name="answer"
                                    className="mb-3"
                                    onChange={this.handleChange.bind(this)}
                                />
                                <Form.Check
                                    custom
                                    type="radio"
                                    id="optionTwo"
                                    label={optionTwo.text}
                                    value="optionTwo"
                                    name="answer"
                                    className="mb-3"
                                    onChange={this.handleChange}
                                />
                                <Button type="submit" variant="outline-dark" disabled={this.state.disabled}>Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps({ questions, users }, { id }) {
    const question = questions[id];

    return {
        question: question ? question : null,
        author: question ? users[question.author] : null
    };
}

export default connect(mapStateToProps)(UnansweredQuestion);
