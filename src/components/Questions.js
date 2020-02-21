import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Avatar from './Avatar';

class Questions extends Component {

    render() {
        const { question, author, answered } = this.props;
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
                        <Card.Body className="text-center">
                            <Card.Text>{optionOne.text}?</Card.Text>
                            <Card.Text>{optionTwo.text}?</Card.Text>
                            {answered ? <Link to={`/questions/${id}`}><Button variant="outline-dark">View Results</Button></Link> : <Link to={`/questions/${id}`}><Button variant="outline-dark">Answer Question</Button></Link>}
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

export default connect(mapStateToProps)(Questions);
