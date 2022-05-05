import React, {Component} from "react";
import './../../css/shared.css'
class Footer extends Component {
    render(){
        return (
            <div className="container-fluid footer" >
                <div className="row h-100 align-items-center"> 
                    <div className="text-footer text-end">Política de privacidad</div>
                    <div className="text-footer-stick">|</div>
                    <div className="text-footer text-start">Términos de uso</div>
                </div>
            </div>
        )
    }
}

export default Footer;