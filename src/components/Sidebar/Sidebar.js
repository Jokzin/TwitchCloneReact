import React, {useEffect, useState} from 'react';
import api from '../../api';

function Sidebar(){

    const apiURL = process.env.REACT_APP_API_URL;
    const [topStreams, setTopStreams] = useState([]);

    useEffect(() => {
        const fecthData = async() => {
            const result = await api.get(apiURL + '/streams');

            let dataArray = result.data.data;
            let gameIDs = dataArray.map(stream => {
                return stream.game_id;
            })
            let userIDs = dataArray.map(stream => {
                return stream.user_id;
            })

            //création url personnalisés
            let baseUrlGames = apiURL + '/games?';
            let baseUrlUsers = apiURL + '/users?';

            let queryParamsGames = '';
            let queryParamsUsers = '';

            gameIDs.map(id => {
                return (queryParamsGames = queryParamsGames + `id=${id}&`);
            })

            userIDs.map(id => {
                return (queryParamsUsers = queryParamsUsers + `id=${id}&`);
            })

            // url finale
            let urlFinalGames = baseUrlGames + queryParamsGames;
            let urlFinalUsers = baseUrlUsers + queryParamsUsers;

            // appel
            let gamesNames = await api.get(urlFinalGames);
            let getUsers = await api.get(urlFinalUsers);

            let gamesNamesArray = gamesNames.data.data;
            let arrayUsers = getUsers.data.data;


        }

        fecthData();
    }, [])

    return (
        <div className="sidebar">
            <h2 className="titreSidebar">Chaînes recommandées</h2>
            <ul className="listeStream">

            </ul>
        </div>
    )
}

export default Sidebar;