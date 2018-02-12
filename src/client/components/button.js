import React from 'react';

const ButtonTetris = (props) => {

    console.log(props)
    const { handleClick, label } = props;
    return (
    <button onClick={handleClick}>
    {label}
    </button>
    )
}

export default ButtonTetris;