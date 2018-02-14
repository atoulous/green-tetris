import React from 'react';
import Row from './row';

const Spectrum = ({ spectrum }) => {
    return (
        <div className={'spectrum'}>
            {spectrum.map((e, i) => (<Row key={i} row={e} />))}
        </div>
    )
}

export default Spectrum;

