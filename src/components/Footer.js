import React from 'react';
import './Footer.css';
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";


class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="footer">
                <h5 className="footer">Jantzen Egan</h5>
                <a href="https://github.com/Jantzen-E">Github
                    <IoLogoGithub 
                        size={32}
                    />
                </a>
                <a href="https://www.linkedin.com/in/j-egan-/">Linkedin
                    <IoLogoLinkedin 
                        size={32}
                    />
                </a>
            </div>
        );   
    }
}

export default Footer;