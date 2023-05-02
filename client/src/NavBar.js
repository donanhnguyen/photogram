import './App.css';
import {useState, useContext, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import GlobalContext from './GlobalContext';
import Notifications from './Notifications';
import Search from './Search';

function NavBar () {

    const {
        currentUserState,
        setCurrentUserState
    } = useContext(GlobalContext);

    const [showNotifications, toggleShowNotifications] = useState(false);
    const [allNotificationsState, setAllNotificationsState] = useState();

    const [showSearch, toggleShowSearch] = useState(false);

    const navigate = useNavigate();

    // get notifications
    useEffect(() => {
        if (currentUserState) {
            Axios.get(`http://localhost:8800/api/notifications/${currentUserState.username}/`)
                .then((response) => {
                    setAllNotificationsState(response.data);
                })    
        }
    }, [currentUserState])

    function logOut () {
        setCurrentUserState(null);
        navigate('/login')
    }

    if (currentUserState) {
         return (
            <div className="nav-bar-container">
                
                <h1 style={{fontSize: '30px'}} className='nguyenstagram'>Nguyenstagram</h1>

                <h1>Welcome, {currentUserState.username}</h1>

                <Link to='/'>
                    Home
               </Link>
               <br></br>
               <Link to='/myProfile'>
                   <img className="profile-pic" src={`${currentUserState.profilePic}`}></img>
                   Profile
               </Link>

               <Search 
                    showSearch={showSearch}
                    toggleShowSearch={toggleShowSearch}
               />

               <Notifications 
                    showNotifications={showNotifications}
                    toggleShowNotifications={toggleShowNotifications}
                    allNotificationsState={allNotificationsState}
                    setAllNotificationsState={setAllNotificationsState}
               />

                <button onClick={logOut}>Log Out</button>
            </div>
        )   
    }

}

export default NavBar;