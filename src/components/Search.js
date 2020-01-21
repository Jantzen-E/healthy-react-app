import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form>
                <h3>Type the name of an item to see if it exists in the list</h3>
                <input 
                    type="text" 
                    placeholder="Search for an existing item..." 
                    onChange={ (e) => this.props.handleChange(e.target.value) }
                />
            </form>
        );
    }
}

export default Search;