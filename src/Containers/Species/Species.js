import React from 'react';


import '../../Components/Species/species-style.css';
import '../Filters/filters-style.css';

const Species = (props) => {

    
    const [Filters, setFilters] = useState({
        results: []
    });

    const showFilteredResults = (filters) => {
        console.log(filters);
        const variables = {
            filters: filters
        }
        //getResults(variables);
    }

    const handleFilters = (filters, category) => {
        //console.log(filters);

        const newFilters = {...Filters};

        newFilters[category] = filters;

        showFilteredResults(newFilters);
        setFilters(newFilters);
    }

  
        return(
            
            <Filters handleFilters={filters => handleFilters(filters, props)} />
            
        );

    
}

export default Species;