import React from 'react';
import { render } from '@testing-library/react';
import './Footer.css';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="footer">
                <h4>Jantzen Egan</h4>
                <h6>here is the link to my github</h6>
                <h6>here is the link to my linkedin</h6>
            </div>
        );   
    }
}

export default Footer;