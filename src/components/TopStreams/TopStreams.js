import React, { useEffect, useState } from 'react'
import api from '../../api'

function TopStreams() {
    const apiURL = process.env.REACT_APP_API_URL
    const [channels, setChannels] = useState([])

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

                let newThumbUrl = stream.thumbnail_url
                    .replace('{width}', '320')
                    .replace('{height}', '180')
                stream.thumbnail_url = newThumbUrl

                return stream
            })
            setChannels(finalArray)
        }

        fecthData()
    })

    return (
        <div>
            <h1 className="titreGames">Streams les plus populaires</h1>
            <div className="flexAccueil">
                {channels.map((channel, index) => (
                    <div key={index} className="carteStream">
                        <img
                            src={channel.thumbnail_url}
                            alt="game pic"
                            className="imgCarte"
                        />
                        <div className="cardBodyStream">
                            <h5 className="titreCartesStream">
                                {channel.user_name}
                            </h5>
                            <p className="txtStream">Jeu: {channel.gameName}</p>
                            <p className="txtStream viewers">
                                Viewers: {channel.viewer_count}
                            </p>
                            <div className="btnCarte">
                                Regarder {channel.user_name}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopStreams
