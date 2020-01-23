import React from 'react';
import './CollapsibleItem.css';
import { IoMdArrowDropdown, IoMdArrowDropup, IoIosTrash, IoMdCreate } from "react-icons/io";

class CollapsibleItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.handleOpenToggle = this.handleOpenToggle.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleOpenToggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleDelete() {
        this.props.handleDelete(this.props.item._id);
    }
    
    handleEdit() {
        this.props.handleEdit(this.props.item);
    }

    render() {
        return (
            <div className="item">
                {
                    this.props.item ? (
                        <div>
                            <div className="formatCards">
                                <img 
                                    src={ this.props.item.imgUrl } 
                                    alt={ this.props.item.name }
                                    className="productImage"
                                    height="300" 
                                    width="430"
                                />
                                <span 
                                    className="fixText"
                                >
                                    
                                        { this.props.item.name }
                                </span>
                                {
                                    this.state.isOpen ? 
                                        <IoMdArrowDropup 
                                            onClick={ this.handleOpenToggle } 
                                            size={60}
                                            className="pointer"
                                        /> 
                                        : <IoMdArrowDropdown 
                                            onClick={ this.handleOpenToggle } 
                                            size={60}
                                            className="pointer"
                                        />
                                }
                            </div>
                            <div className="formatOpenCards">
                                {
                                    this.state.isOpen ? 
                                    (
                                        <div className="expandedItemProperties">
                                            <div>
                                                <p>
                                                    Benefits: { this.props.item.benefits }
                                                </p>                                                
                                                <p>Uses: { this.props.item.uses }
                                                </p>                                                
                                                <p>Side effects: { this.props.item.sideEffects } 
                                                </p>
                                            </div>
                                            <div className="tooltip">
                                                <IoMdCreate 
                                                    size={35} 
                                                    onClick={ this.handleEdit }
                                                />
                                                <span 
                                                    className="tooltiptext">Edit
                                                </span>
                                            </div>
                                            <br></br>
                                            <div className="tooltip">
                                                <IoIosTrash 
                                                    size={40} 
                                                    onClick={ this.handleDelete }
                                                />
                                                <span 
                                                    className="tooltiptext">Delete
                                                </span>
                                            </div>
                                        </div>
                                    ) : ''
                                }
                            </div>
                        </div>

                    ) : ''
                }
            </div>
        );
    }
}

export default CollapsibleItem;