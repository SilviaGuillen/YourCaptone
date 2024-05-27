import "./App.css"
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import FreetimePage from "./pages/freetimePage.tsx";
import WelcomePage from "./pages/welcomePage.tsx";


import {Navi} from "./components/Navi.tsx";
import {filterStartValues, FilterValues} from "./components/Filter.tsx";
import { useState} from "react";
import axios from "axios";
import AddNewFreetimeActivity from "./components/AddNewFreeTimeActivity.tsx";
import EditFreetimeCard from "./components/EditFreetimeCard.tsx";
import CalendarDemo from "./components/CalendarDemo.tsx";
import RegistrationPage from "./pages/registrationPage.tsx";
import LoginPage from "./pages/loginPage.tsx";

import {User} from "./model/User.ts";
import {Group} from "./model/Group.ts";
import websiteLogo from "./assets/logo_mw_small.png";
import loginLogo from "./assets/userLogo.png";


function App() {

    const [appFilterValues, setAppFilterValues] = useState<FilterValues>(filterStartValues);

    const navigate = useNavigate();

    const [loggedInUser, setLoggedInUser] = useState<User>({
        id: "",
        firstName: "",
        lastName: "",
        mail: "",
        userName: "",
        password: "",
        role: ""
    })
    const [loggedInGroup, setLoggedInGroup] = useState<Group>({
        id: "",
        name: "",
        street: "",
        postalCode: "",
        city: "",
        mail: "",
        userName: "",
        password: "",
        role: ""
    })

    function toProfile() {
        if (loggedInUser.userName === "" && loggedInGroup.userName === "") {
            navigate("/login")
        }
    }

    function filterValueCallback(filterValues: FilterValues): void {
        setAppFilterValues(filterValues);
        console.log("filterValueCallback: " + filterValues.text + " / " + filterValues.category);
    }





    function logout(){
        axios.post("/api/user/logout")
            .then(() => setLoggedInUser({
                id: "",
                firstName: "",
                lastName: "",
                mail: "",
                userName: "",
                password: "",
                role: ""
            }))
            .then(() => setLoggedInGroup({
                id: "",
                name: "",
                street: "",
                postalCode: "",
                city: "",
                mail: "",
                userName: "",
                password: "",
                role: ""
            }))
            .then(() => navigate("/login"))
    }





    return (
        <>
            <header>
                <div className={"logo_login_container"}>
                    <div className={"logo_container"} onClick={() => navigate("/")}>
                        <img id="website_logo" src={websiteLogo}/>
                        <p id={"headline"}>MyFreeTime</p>
                    </div>

                    <div className={"login_container"}>

                        <div>
                            {loggedInUser.userName === "" && loggedInGroup.userName === "" ?
                                <Link id={"registration_link"} to={"/registration"}>Registrieren</Link>
                                :
                                <div>{loggedInUser.userName}{loggedInGroup.userName}</div>
                            }
                        </div>

                        <div className={"dropdown"}>
                            <button id={"login_div"} className={"dropbtn"} onClick={toProfile}>
                                <img id={"login_logo"} src={loginLogo}/>
                            </button>
                            {(loggedInUser.userName !== "" || loggedInGroup.userName !== "") &&
                                <div className={"dropdown-content"}>
                                    <a>Profil</a>
                                    <a>Nachrichten</a>
                                    <a onClick={logout}>Logout</a>
                                </div>
                            }
                        </div>

                    </div>
                </div>

            </header>


            <Navi filterCallback={filterValueCallback}/>
            <Routes>
                <Route path={"/"} element={<WelcomePage filterValues={appFilterValues}/>}/>
                <Route path={"freetime/:id"} element={<FreetimePage/>}/>
                <Route path={"/add"} element={<AddNewFreetimeActivity/>}/>
                <Route path={"/edit/:id"} element={<EditFreetimeCard/>}/>
                <Route path={"/registration"} element={<RegistrationPage/>}/>
                <Route path={"/login"} element={<LoginPage setUser={setLoggedInUser} setGroup={setLoggedInGroup}/>}/>

            </Routes>
            <CalendarDemo/>
        </>
    )
}

export default App
