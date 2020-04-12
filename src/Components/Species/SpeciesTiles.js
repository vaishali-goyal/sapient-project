import React from 'react';
import SpeciesDetails from './SpeciesDetails';

import './species-style.css';

const SpeciesTiles = props => {
    //console.log(props.result.image);
    return(
        <div className="row">
            {
                props.result.map((result, index) => (
                    <div key={index} className="col-6 col-md-4 col-lg-3">
                        <div className="species-tiles">
                            <div className="species-image-wrapper">
                                <img src={props.result[index].image} alt={props.result[index].name} />
                                <div className="species-details">
                                    <h3>{props.result[index].name}</h3>
                                    <span>{props.result[index].created}</span>
                                </div>
                            </div>
                            <SpeciesDetails result={props.result[index]} />
                        </div>
                    </div> 
                ))
            }
        </div>     
    );
}

export default SpeciesTiles;