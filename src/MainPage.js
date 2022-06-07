import './styles/MainPage.css';

import {Link} from "react-router-dom";
// pages
import {RoomCreator} from "./RoomCreator";
import {PresetsCreator} from "./PresetsCreator";


export const MainPage = () => {
    return(
        <div className='container'>
            <div className='innerContainer'>
                <RoomCreator/>
                <PresetsCreator/>
            </div>
            <div className='exit'>
                <Link className='exitText' to='/'>
                    [Выйти из аккаунта]
                </Link>
            </div>

        </div>
    );
}