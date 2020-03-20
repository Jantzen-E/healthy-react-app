import React from 'react';
import './Search.css';
// import './Responsive.css';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.render = this.render.bind(this);
    }

    render() {
        return (
            <form className="searchForm">
                <h4 className="searchTitle">Type the name of an item to see if it exists in the list</h4>
                    <input 
                    type="text" 
                    placeholder="Search for an existing item..." 
                    onChange={ (e) => this.props.handleChange(e.target.value) }
                    className="searchInput"
                />
            </form>
        );
    }
}

export default Search;