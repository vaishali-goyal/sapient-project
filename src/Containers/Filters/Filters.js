import React from 'react';

import './filters-style.css';

const Filters = (props) => {

        console.log('Filters' + props.category);
        //const uniqueSpecies = [...new Set( props.results.map(result => result.species)) ];
        //const uniqueGender = [...new Set( props.results.map(result => result.gender)) ];
        //const uniqueOrigin = [...new Set( props.results.map(result => result.origin.name)) ];

        /* const [Checked, setChecked] = useState([]);

        const handleToggle = (value) => {
            const currentIndex = Checked.indexOf(value);
            const newChecked = [...Checked];

            if(currentIndex === -1) {
                newChecked.push(value);
            }else {
                newChecked.splice(currentIndex, 1)
            }

            setChecked(newChecked);
            props.handleFilters(newChecked);
        } */

        return (

                <div className="filter-cat">
                    <h4>{props.category}</h4>
                    {
                        props.items.map((result, index) => (
                            
                            <div key={index} className="form-group">
                                <div className="form-check">                
                                    <input type="checkbox" value={props.category} className="form-check-input" id={result} onChange={props.updateFilter} checked={props.filters[result]} />
                                    <label className="form-check-label" htmlFor={result}>{result}</label>
                                </div>
                            </div>
                            
                        ))
                    }
                </div>
        );

}

export default Filters;