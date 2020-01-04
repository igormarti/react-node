import React from 'react';

const Alert = ({message,type='success'}) => (
    <div className={`alert alert-${type} col-lg-6 col-md-12 col-sm-12 offset-lg-3 justify-content-center align-items-center`}  >
        {message}
    </div>
)

export default Alert;