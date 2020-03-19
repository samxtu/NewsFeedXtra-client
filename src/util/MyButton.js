import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default ({tip, btnClassName, tipClassName, onClick, children, btnName, aria, size}) => {
    return (
        <Tooltip title={tip} placement='top' className={tipClassName}>
            <IconButton name={btnName} onClick={onClick} className={btnClassName} aria-label={aria} size={size}>
                {children}
            </IconButton>
        </Tooltip>
    )
}

