import React from 'react';
import CollapsibleItem from './CollapsibleItem';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.renderCollapsibleItems = this.renderCollapsibleItems.bind(this);
    }

    renderCollapsibleItems() {
        if(this.props.items.length > 0) {
            return (
                this.props.items.map((item) => {
                    return <CollapsibleItem 
                                item={ item } 
                                key={ item.name } 
                                handleDelete={ this.props.handleDelete }
                                handleEdit={ this.props.handleEdit }                              
                            />
                })
            );
        }
        else {
            return '';
        }
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