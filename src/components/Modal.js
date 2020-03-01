import React from "react";
import "./Modal.css";
import PropTypes from "prop-types";
import "./Responsive.css";

class Modal extends React.Component {
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };
    render() {
        if(!this.props.show) {
            return null;
        }
        return (
            <div className="modal" id="modal">
                <h2>How to fix the image you added if it doesn't appear</h2>
                <div className="content">If you added an item to the list and the text shows up but the image doesn't appear, please 
                    follow these instructions.....
                    <br/>
                    If you are using a smart phone/tablet, find the image you wish to add and click on the 
                    image to open it.  Then hold your finger down on the image until a menu pops up. Click the option that says "open in new tab" 
                    and use the URL from the new tab to add your image. If you are using a computer/laptop, ensure that you click on "copy 
                    image address" then use that URL to paste into the form.
                </div>
                <div className="actions"> 
                    <button class="toggle-button" onClick={this.onClose}>
                        close
                    </button>
                </div>
            </div>
        );
    }
    
    propTypes = {
        onClose: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired
    };
}

export default Modal;
