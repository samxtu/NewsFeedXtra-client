import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default ({tip, btnClassName, tipClassName, onClick, children, btnName}) => {
    return (
        <Tooltip title={tip} placement='top' className={tipClassName}>
            <IconButton name={btnName} onClick={onClick} className={btnClassName}>
                {children}
            </IconButton>
        </Tooltip>
    )
}

