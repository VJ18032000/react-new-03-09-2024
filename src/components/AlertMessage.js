import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const AlertMessage = ({ type, message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000); // Hide after 5 seconds

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [onClose]);

    return (
        <div className={`alert alert-${type}`} role="alert">
            {message}
        </div>
    );
};

AlertMessage.propTypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired // Callback to hide the alert
};

export default AlertMessage;
