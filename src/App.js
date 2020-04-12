import React, { Component } from 'react';

import axios from 'axios';
import './App.css';


import SpeciesTiles from './Components/Species/SpeciesTiles' ;
import SelectedFilters from './Components/Filters/SelectedFilter' 
import Filters from './Containers/Filters/Filters';
import SearchComponent from './Components/Filters/SearchComponent'

class App extends Component {

  state = {
        error: null,
        results: [],
        search: '',
        sortType: 'asc',
        selected: [],

        species: {
            Human: false,
            Alien: false
          },
          gender: {
            Male: false,
            Female: false,
            Unknown: false
          },
          origin: {
            EarthC137 : false,
            EarthReplacementDimension: false,
            Abadango: false,
            Unknown: false
          }
  };

  componentDidMount() {
      console.log('mount');
      this.updateList();
  }

  updateList = () => {
    let param = {};
    console.log('updatelist');
    this.state.selected.map((item) => 
      param[item.cat] = item.filter.toLowerCase()
    );

    console.log('param 1' + this.state.selected);
    if(this.state.search.length){
      param.name = this.search;
    }
    this.getResults(param);
  }

  getResults = (variable) => {
    axios.get('https://rickandmortyapi.com/api/character/', {
      variables: variable
    })
    .then((response) => {
      let result = this.sort(response.data.results);
      this.setState({results:result});
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  sort = (listArray)=>{
    if(this.sortType === "des"){
      listArray.sort((a,b)=> b.id - a.id)
    }else{
      listArray.sort((a,b)=> a.id - b.id)
    }
    return listArray;
  }

  sortedResults = (e)=> {
    const sortType = e.target.value;
    this.sortType = sortType;
    let copy = this.state.results.slice(0,this.state.results.length);
    copy = this.sort(copy);
    this.setState({results:copy})
  }

  getSearch = (userInput)=> {
    this.search = userInput;
    
    if (this.search !== '') {
      let result = this.state.results.filter((row) => {
        return row.name.includes(this.search) || row.created.includes(this.search) || row.status.includes(this.search) || row.species.includes(this.search) || row.gender.includes(this.search) || row.origin.name.includes(this.search) || row.location.name.includes(this.search)
      });
      this.setState({ results: result });
    } else {
      this.getResults();
    }
  } 

 updateFilter = e => {
    let cat = e.target.value.toLowerCase();
    let filter = e.target.id;
    let result = this.state.results.filter((row) => {
      return row.species.includes(filter) || row.gender.includes(filter) || row.origin.name.includes(filter) 
    });
    this.setState({ results: result });
     console.log('filteer');
    let categoryNew = { ...this.state[cat] };
    console.log('new cat ' + categoryNew)
    if(e.target.checked){
      for (let key in categoryNew) {
        categoryNew[key] = false
      }
    }
    categoryNew[filter] = !categoryNew[filter]; 
    let obj = {};
    obj[cat] = categoryNew;
    console.log('Obj ' + obj);
    this.setState(obj,this.updateList);  
  };

 /* filterDropdown = this.results.filter(function(result) {
    return result.tag === this.sortType;
  }); */

  pickSelected = () => {
    console.log("pickselected" + this);
    this.state.selected.splice(0, this.state.selected.length);
    for (let key in this.state) {
      for (let key2 in this.state[key]) {
        if(this.state[key].__proto__.constructor.name === "Object"){
          if (this.state[key][key2]) {
            this.state.selected.push({ cat: key, filter: key2 });
            console.log(this.state);
          }
        }
      }
    }

  };

  render() {
      console.log('render');
      this.pickSelected();
      const { error } = this.state;

      const uniqueSpecies = [...new Set(this.state.results.map(result => result.species)) ];
        const uniqueGender = [...new Set( this.state.results.map(result => result.gender)) ];
        const uniqueOrigin = [...new Set( this.state.results.map(result => result.origin.name)) ];

     /*  let filteredResults = this.state.results.filter(
          (result) => {
              return result.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
      );

      let updateSearch = (event) => {
          this.setState({search: event.target.value.substr(0,20)});
      } */      

      /* let sortedResults = this.results.sort( (a, b) => {
          let isReversed = (this.sortType === 'asc') ? 1 : -1;
          return isReversed = a.name.localeCompare(b.name);
      }); */

      //console.log(this.state)
      if (error) {
          return <div>Error: {error.message}</div>;
      }  else {
          return(
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-sm-12 col-md-3 col-lg-2">
                      <div className="filters-wrapper">
                            <div>
                                <h3>Filters</h3>
                            </div>
                            <Filters category="Species" items={uniqueSpecies} updateFilter={this.updateFilter} filters={this.state.species} />
                            <Filters category="Gender" items={uniqueGender} updateFilter={this.updateFilter} filters={this.state.gender} />
                            <Filters category="Origin" items={uniqueOrigin} updateFilter={this.updateFilter} filters={this.state.origin} />

                        </div>
                          

                      </div>
                      <div className="col-sm-12 col-md-9 col-lg-10">
                          
                          <div className="top-filters-wrapper">
                              <div className="row">
                                    <div className="col-sm-12">
                                            <h3>Selected Filters</h3>
                                            { <SelectedFilters
                                                list={this.state.selected}
                                                updateFilter={this.state.updateFilter}
                                            ></SelectedFilters> }
                                    </div>
                              </div>
                              <div className="row">
                                  <div className="sorting-filter"> 
                                  <div className="col-12 col-md-6">                     
                                        <SearchComponent search={this.getSearch} ></SearchComponent>
                                    </div>
                                    <div className="col- col-md-6">
                                      <select value={this.sortType} onChange={this.sortedResults} className="form-select">
                                          <option value="asc">Ascending</option>
                                          <option value="des">Descending</option>
                                      </select>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="Species-wrapper bg-dark">
                                <SpeciesTiles key={this.state.results.id} result={this.state.results} />                              
                          </div>
                      </div>
                  </div>
              </div>
          );
      }
  }
}

export default App;
