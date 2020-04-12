import React from 'react';

const Input = ( props ) => {
    let inputElement = null;

    switch ( props.element ) {
        case ('input'):
            inputElement = <input className={props.inputClass} type={props.elementType} id={props.id} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={props.inputClass} type={props.elementType} id={props.id} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className="custom-select"
                    value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input className="form-control" {...props.elementConfig} value={props.value} />;
    }

    return (
        <div className="form-group">
            <label className={props.labelClass} htmlFor={props.id}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;