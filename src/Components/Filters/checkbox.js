import React from 'react';

const CheckboxComp = ( props ) => {
    return (
        <div className="form-group">
            <div className="form-check">                
                <input type="checkbox" className="form-check-input" id={props.id} />
                <label className="form-check-label" htmlFor={props.id}>{props.label}</label>
            </div>
        </div>
    );
}

export default CheckboxComp;