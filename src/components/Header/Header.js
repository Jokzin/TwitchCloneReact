import React from 'react';
import logo from './IconeTwitch.svg';
import search from './Search.svg';
import menuIco from './MenuIco.svg';

function Header(){

    return (
        <div>
            <nav className="headerTop">
                <ul className="listMenu">
                    <li className="liensNav">
                        <img src={logo} alt="logo twitch" className="logo"/>
                    </li>
                    <li className="liensNav">
                        Top Games
                    </li>
                    <li className="liensNav">
                        Top Streams
                    </li>
                    <li className="liensNav">
                        <form className="formSubmit">
                            <input type="text" className="inputRecherche"/>
                            <button type="submit">
                                <img src={search} alt="icone loupe" className="logoLoupe"/>
                            </button>
                        </form>
                    </li>
                </ul>
            </nav>
            <div className="menuResBtn">
                <img src={menuIco} alt="icone menu responsive" className="menuIco"/>
            </div>
        </div>
    )
}

export default Header