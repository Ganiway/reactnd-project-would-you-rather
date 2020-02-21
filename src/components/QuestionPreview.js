import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import UnansweredQuestion from './UnansweredQuestion';
import AnsweredQuestion from './AnsweredQuestion';

class QuestionPage extends Component {
    render() {
        const { authUserAnswer, match } = this.props;
        const id = match.params.id;
        const answered = authUserAnswer.hasOwnProperty(id);

        return (
            <Fragment>
                {answered ? <AnsweredQuestion id={id} answered={answered}/> : <UnansweredQuestion id={id} answered={answered}/>}
            </Fragment>
        );
    }
}

function mapStateToProps({ authedUser, users }) {
    const authUserAnswer = users[authedUser].answers;

    return {
        authUserAnswer
    };
}

export default connect(mapStateToProps)(QuestionPage);
