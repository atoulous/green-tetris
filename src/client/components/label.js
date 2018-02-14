import React from 'react';


const Label = (props) => {
    let { children, additionalClasses } = props;
    if (!additionalClasses) additionalClasses = [];
    const classNames = `customLabel ${additionalClasses.join(' ')}`
    return <label className={classNames}>{children}</label>
}

export default Label;