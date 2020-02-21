import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';
import Avatar from './Avatar';
import PageNotFound from './PageNotFound';

class AnsweredQuestion extends Component {
    render() {
        const { question, author, authedUser } = this.props;

        if (question === null) {
            return <PageNotFound />;
        }

        const { optionOne, optionTwo } = question;
        const { name, avatarURL } = author;

        const totalVotes = optionOne.votes.length + optionTwo.votes.length;
        const optionOnePercent = Math.round((optionOne.votes.length / totalVotes) * 100);
        const optionTwoPercent = Math.round((optionTwo.votes.length / totalVotes) * 100);

        return (
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <Card bg="light" className="m-3">
                        <Card.Header>
                            <Avatar avatarURL={avatarURL} className="mr-2" />
                            Asked by {name}
                        </Card.Header>
                        <Card.Body>
                            <ul>
                                <li>Would you rather&nbsp;
                                    {optionOne.text}
                                    {optionOne.votes.includes(authedUser) ? (
                                        <span className="selectedVote ml-2">Your choice</span>
                                    ) : null}
                                </li>
                                <ProgressBar
                                    now={optionOnePercent}
                                    label={`${optionOnePercent}%`}
                                    variant="info"
                                />
                                <Card.Text className="text-muted font-12">
                                    chosen by {optionOne.votes.length} out of {totalVotes}{' '} users
                                </Card.Text>
                                <li>Would you rather&nbsp;
                                    {optionTwo.text}
                                    {optionTwo.votes.includes(authedUser) ? (
                                        <span className="selectedVote ml-2">Your choice</span>
                                    ) : null}
                                </li>
                                <ProgressBar
                                    now={optionTwoPercent}
                                    label={`${optionTwoPercent}%`}
                                    variant="info"
                                />
                                <Card.Text className="text-muted font-12">
                                    chosen by {optionTwo.votes.length} out of {totalVotes}{' '} users
                                </Card.Text>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
    const question = questions[id];

    return {
        question: question ? question : null,
        author: question ? users[question.author] : null,
        authedUser
    };
}

export default connect(mapStateToProps)(AnsweredQuestion);
