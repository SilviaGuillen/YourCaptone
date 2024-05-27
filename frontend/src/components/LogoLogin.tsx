import websiteLogo from "../assets/logo_mw_small.png";
import './LogoLogin.css'
import loginLogo from "../assets/userLogo.png";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

type LogoLoginProps = {
    user:string;
}

export function LogoLogin(props: LogoLoginProps) {


    const navigate = useNavigate()

    function toProfile() {
        if (props.user === "anonymousUser") {
            navigate("/login")
        }
    }

    function logout() {
        axios.post("/api/user/logout")
            .then(() => props.user = "anonymousUser")
            .then(() => navigate("/login"))
    }

    return <div className={"logo_login_container"}>

        <div className={"logo_container"} onClick={() => navigate("/")}>
            <img id="website_logo" src={websiteLogo}/>
            <p id={"headline"}>MyFreeTime</p>
        </div>

        <div className={"login_container"}>

            <div>
                {props.user === "anonymousUser" ?
                    <Link id={"registration_link"} to={"/registration"}>Registrieren</Link>
                    :
                    <div>{props.user}</div>
                }
            </div>

            <div className={"dropdown"}>
                <button id={"login_div"} className={"dropbtn"} onClick={toProfile}>
                    <img id={"login_logo"} src={loginLogo}/>
                </button>
                {props.user !== "anonymousUser" &&
                    <div className={"dropdown-content"}>

                        <a onClick={logout}>Logout</a>
                    </div>
                }
            </div>

        </div>
    </div>
}