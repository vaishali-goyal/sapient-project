import React, { Component } from 'react';

import './filters-style.css';

class TopFilters extends Component {
    render() {
        return (
            <div className="top-filters-wrapper">
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Selected Filters</h3>
                        <div className="selected-filters"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 sorting-filter">                      
                        <form className="form-inline">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn" type="submit">Search</button>
                        </form>
                        <select className="form-select">
                            <option value="idsort">Sort by ID</option>
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

export default TopFilters;