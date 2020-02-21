import React, { Fragment } from 'react';
import Questions from './Questions';

const QuestionsList = (props) =>{
    const { listID, emptyListNote, answered } = props;

    return (
        <Fragment>
            {listID.length ? (
                listID.map((id) => <Questions key={id} id={id} answered={answered} />)
            ) : (
                <p className="text-center">{emptyListNote}</p>
            )}
        </Fragment>
    );
}

export default QuestionsList;
