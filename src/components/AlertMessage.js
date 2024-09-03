
import React from 'react';
import PropTypes from 'prop-types';

const AlertMessage = ({ type, message }) => {
    return (
        <div className={`alert alert-${type}`} role="alert">
            {message}
        </div>
    );
};

AlertMessage.propTypes = {
    type: PropTypes.string.isRequired,   // Type of alert (e.g., success, danger)
    message: PropTypes.string.isRequired // Message to display in the alert
};

export default AlertMessage;
