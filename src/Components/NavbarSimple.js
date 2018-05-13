import React, { Component } from 'react';

class NavbarSimple extends Component {
    render(){
        const pages = ['home', 'blog', 'pics', 'bio', 'art', 'shop', 'about', 'contact'];
        const navLinks = pages.map(page => {
            return (
                <a href={'/' + page}>
                {page}
                </a>
            )
        });

        return(
            <nav>
                <ul>
                    {navLinks}
                </ul>
            </nav>
        );
    }
}

export default NavbarSimple;
