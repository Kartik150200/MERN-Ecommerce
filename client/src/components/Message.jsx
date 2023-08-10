import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, duration, children,dismissable }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(true);
    }, []);
    
    useEffect(() => {
        if(duration) {
            setTimeout(() => setVisible(false), duration * 1000);
        }
    }, [duration]);
  return (
    <Alert
        onClose={() => setVisible(false)}
        dismissible={dismissable}
        className='alert-custom'
        style={visible ? { display: 'block' } : { display: 'none' }}
        variant={variant}
    >
        {children}
    </Alert>
  );
};

Message.defaultProps = {
    variant: 'info',
    dismissable: false,
};

export default Message;