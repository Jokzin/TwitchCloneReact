import React, { useEffect, useState } from 'react'
import api from '../../api'

function Sidebar() {
    const apiURL = process.env.REACT_APP_API_URL
    const [topStreams, setTopStreams] = useState([])

    useEffect(() => {
        const fecthData = async () => {
            const result = await api.get(apiURL + '/streams?language=fr')

            let dataArray = result.data.data
            let gameIDs = dataArray.map((stream) => {
                return stream.game_id
            })
            let userIDs = dataArray.map((stream) => {
                return stream.user_id
            })

            //création url personnalisés
            let baseUrlGames = apiURL + '/games?'
            let baseUrlUsers = apiURL + '/users?'

            let queryParamsGames = ''
            let queryParamsUsers = ''

            gameIDs.map((id) => {
                return (queryParamsGames = queryParamsGames + `id=${id}&`)
            })

            userIDs.map((id) => {
                return (queryParamsUsers = queryParamsUsers + `id=${id}&`)
            })

            // url finale
            let urlFinalGames = baseUrlGames + queryParamsGames
            let urlFinalUsers = baseUrlUsers + queryParamsUsers

            // appel
            let gamesNames = await api.get(urlFinalGames)
            let getUsers = await api.get(urlFinalUsers)

            let gamesNamesArray = gamesNames.data.data
            let arrayUsers = getUsers.data.data

            //Création tableau final
            let finalArray = dataArray.map((stream) => {
                stream.gameName = ''
                stream.truePic = ''
                stream.login = ''

                gamesNamesArray.forEach((name) => {
                    arrayUsers.forEach((user) => {
                        if (
                            stream.user_id === user.id &&
                            stream.game_id === name.id
                        ) {
                            stream.gameName = name.name
                            stream.truePic = user.profile_image_url
                            stream.login = user.login
                        }
                    })
                })

                return stream
            })
            setTopStreams(finalArray.slice(0, 6))
        }

        fecthData()
    }, [apiURL])

    return (
        <div className="sidebar">
            <h2 className="titreSidebar">Chaînes recommandées</h2>
            <ul className="listeStream">
                {topStreams.map((stream, index) => (
                    <li key={index} className="containerFlexSidebar">
                        <img
                            src={stream.truePic}
                            className="profilePicRonde"
                            alt="logo user"
                        />
                        <div className="streamUser">{stream.user_name}</div>
                        <div className="viewerRight">
                            <div className="pointRouge"></div>
                            <div>{stream.viewer_count}</div>
                        </div>
                        <div className="gameNameSidebar">{stream.gameName}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
