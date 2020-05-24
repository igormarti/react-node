import React from 'react';

const Alert = ({message,type='success',lg='6',offset_lg=3,md='6',sm='12'}) => (
    <div className={`alert alert-${type} col-lg-${lg} col-md-${md} col-sm-${sm} offset-lg-${offset_lg} justify-content-center align-items-center mt-1`}  >
        {message}
    </div>
)

export default Alert;