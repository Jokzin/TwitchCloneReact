import React from 'react'
import logo from './IconeTwitch.svg'
import search from './Search.svg'
import menuIco from './MenuIco.svg'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div>
            <nav className="headerTop">
                <ul className="listMenu">
                    <li className="liensNav">
                        <Link className="lien" to="/">
                            <img
                                src={logo}
                                alt="logo twitch"
                                className="logo"
                            />
                        </Link>
                    </li>
                    <li className="liensNav">
                        <Link className="lien" to="/">
                            Top Games
                        </Link>
                    </li>
                    <li className="liensNav">
                        <Link className="lien" to="/top-streams">
                            Top Streams
                        </Link>
                    </li>
                    <li className="liensNav">
                        <form className="formSubmit">
                            <input type="text" className="inputRecherche" />
                            <button type="submit">
                                <img
                                    src={search}
                                    alt="icone loupe"
                                    className="logoLoupe"
                                />
                            </button>
                        </form>
                    </li>
                </ul>
            </nav>
            <div className="menuResBtn">
                <img
                    src={menuIco}
                    alt="icone menu responsive"
                    className="menuIco"
                />
            </div>
        </div>
    )
}

export default Header
