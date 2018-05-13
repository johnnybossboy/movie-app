import React, { Component } from 'react';
import language from './Language';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        this.props.switchTaal((this.props.languageIndex === 1 ? 0 : 1));
    }
    
    render(){
        return(
            <div className="container-fluid color-primary-bg navbar navbar--fixed">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="menu--rectangle" style={{}}>
                            <i className="menu--rectangle_icon fas fa-bars color-white"></i>
                        </div>

                        <div className="menu--flag">
                            <div className="menu--flag_holland">
                                <img className={(this.props.languageIndex===0?"img--flag":"img--flag inactive")} src={require('./../img/flag-nl.png')} alt="Flag" onClick={() => {this.props.switchTaal(0)}} />
                            </div>
                            <div className="menu--flag_england">
                                <img className={(this.props.languageIndex===1?"img--flag":"img--flag inactive")} src={require('./../img/flag-gb.png')} alt="Flag" onClick={() => {this.props.switchTaal(1)}}/>
                            </div>
                        </div>
                        
                        <div className="navbar--menu">

                            <ul className="navbar--menu__list">
                                <li>
                                    <a href="/">{language[this.props.languageIndex].searchPage}</a>
                                </li>
                                <li>
                                    <a href="/featured">{language[this.props.languageIndex].featuredPage}</a>
                                </li>
                            </ul>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;
