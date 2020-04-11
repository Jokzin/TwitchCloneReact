import React from 'react';
import logo from './IconeTwitch.svg'

function Header(){

    return (
        <div>
            <nav className="headerTop">
                <ul className="listMenu">
                    <li className="liensNav">
                        <img src={logo} alt="logo twitch" className="logo"/>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header