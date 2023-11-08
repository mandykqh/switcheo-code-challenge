import React from 'react';
import '../styles/styles.css'

const SelectInputValue = ({ value, valueInput, targetState }) => {
    return (
        <div>
            <input name='valueInput' value={value} className='select-input-value' onChange={e => valueInput(e.target.value, targetState)} />
        </div>
    );
};

export default SelectInputValue;