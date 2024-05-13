import "./App.css"
import {Route, Routes, useNavigate} from "react-router-dom";
import FreetimePage from "./pages/freetimePage.tsx";
import WelcomePage from "./pages/welcomePage.tsx";
import {UserBar} from "./components/UserBar.tsx";
import {Navi} from "./components/Navi.tsx";
import {filterStartValues, FilterValues} from "./components/Filter.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import AddNewFreetimeActivity from "./components/AddNewFreeTimeActivity.tsx";
import EditFreetimeCard from "./components/EditFreetimeCard.tsx";


function App() {

    const [appFilterValues, setAppFilterValues] = useState<FilterValues>(filterStartValues);

    const navigate = useNavigate();

    function filterValueCallback(filterValues: FilterValues): void {
        setAppFilterValues(filterValues);
        console.log("filterValueCallback: " + filterValues.text + " / " + filterValues.category);
    }

    const[user, setUser] = useState<string>("")

    useEffect(() =>
            getMe()
        , [user])

    function login(){
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin;
        console.log("login: host is " + host);
        window.open(host + '/oauth2/authorization/github', '_self')
    }

    function logout(){
        axios.get("/api/user/logout")
            .then(() => {
                setUser("");
                getMe()
                navigate("/")
            })
    }

    function getMe(){
        axios.get("/api/user/me")
            .then(response => {
                setUser(response.data)
            })
    }

    return (
        <>
            <UserBar user={user} loginFunction={login} logoutFunction={logout} />
            <Navi filterCallback={filterValueCallback}/>
            <Routes>
                <Route path={"/"} element={<WelcomePage filterValues={appFilterValues}/>} />
                <Route path={"freetime/:id"} element={<FreetimePage />} />
                <Route path={"/add"} element={<AddNewFreetimeActivity/>} />
                <Route path={"/edit"} element={<EditFreetimeCard/>}/>

            </Routes>
        </>
    )
}

export default App
