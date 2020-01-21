import React from 'react';
import CollapsibleItem from './CollapsibleItem';
import './CollapsibleItemList.css';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.renderCollapsibleItems = this.renderCollapsibleItems.bind(this);
    }


    renderCollapsibleItems() {
        return (
            this.props.items.map((item, index) => {
                return <CollapsibleItem 
                            item={ item } 
                            key={ item.name } 
                            handleDelete={ this.props.handleDelete }
                            handleEdit={ this.props.handleEdit }
                        />
            })
        );
    }

    render() {
        return (
            <div>
                {
                    this.renderCollapsibleItems()
                }
            </div>
        );
    }
}

export default List;