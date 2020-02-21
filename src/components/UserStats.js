import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col } from 'react-bootstrap';
import Avatar from './Avatar';

class UserStats extends Component {
    render() {
        const { user } = this.props;
        const { name, avatarURL, answers, questions } = user;

        return (
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={8}>
                    <Card bg="light" className="m-3">
                        <Card.Header>
                            <Avatar avatarURL={avatarURL} className="mr-2" />
                            {name}
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={12} md={5} lg={5}>
                                    <Card>
                                        <Card.Header>Score</Card.Header>
                                        <Card.Body className="text-center"><span className="scores">{Object.keys(answers).length + questions.length}</span></Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} md={7} lg={7}>
                                    <ul>
                                        <li><span className="scores">{Object.keys(answers).length}</span>&nbsp;Answered Questions</li>
                                        <li><span className="scores">{questions.length}</span>&nbsp;Created Questions</li>
                                    </ul>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps({ users }, { id }) {
    return {
        user: users[id]
    };
}

export default connect(mapStateToProps)(UserStats);
