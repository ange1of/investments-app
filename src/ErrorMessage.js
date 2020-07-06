import React from 'react';

function ErrorMessage(props) {
    return (
        <div className="ErrorMessage">
            <span>{props.data}</span>
        </div>
    );
}

export default ErrorMessage;