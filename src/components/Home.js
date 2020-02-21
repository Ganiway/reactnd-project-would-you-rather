import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import QuestionsList from './QuestionsList';

class Home extends Component {
    render() {
        const { answeredQuestion, unansweredQuestion } = this.props;

        return (
            <Fragment>
                <Tabs>
                    <Tab eventKey="unanswered" title="Unanswered Questions">
                        <QuestionsList
                            listID={unansweredQuestion}
                            answered={false}
                            emptyListNote="No more questions left."
                        />
                    </Tab>
                    <Tab eventKey="answered" title="Answered Questions">
                        <QuestionsList
                            listID={answeredQuestion}
                            answered={true}
                            emptyListNote="No questions answered yet."
                        />
                    </Tab>
                </Tabs>
            </Fragment>
        );
    }
}

function mapStateToProps({ authedUser, users, questions}) {
    const answeredQuestion = Object.keys(questions)
        .filter((id) => users[authedUser].answers.hasOwnProperty(id))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    const unansweredQuestion = Object.keys(questions)
        .filter((id) => !users[authedUser].answers.hasOwnProperty(id))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    return {
        answeredQuestion,
        unansweredQuestion
    };
}

export default connect(mapStateToProps)(Home);
