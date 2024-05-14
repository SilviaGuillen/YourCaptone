import './UserBar.css';

type UserBarProps = {
    user: string | undefined,
    loginFunction: () => void,
    logoutFunction: () => void
}

export function UserBar(props: UserBarProps): JSX.Element {

    function onLogin() {
        console.log('onLogin: Login Button pressed');
        if (props.loginFunction) {
            props.loginFunction();
        }
    }

    function onLogout() {
        console.log('onLogout: Logout Button pressed');
        if (props.logoutFunction) {
            props.logoutFunction();
        }
    }

    function userInfo(): string {
        if (props.user === undefined || props.user === null || props.user === "" || props.user === "anonymousUser") {
            return "not logged in";
        }
        return "Hello " + props.user;
    }

    return (<>
        <div className="user-bar">
            <div>
                {userInfo()}
            </div>
            <div className="login-logout-button-container" >
                <button className="button-login-logout button-login" onClick={onLogin}>login</button>
                <button className="button-login-logout button-logout" onClick={onLogout}>logout</button>
            </div>
        </div>
    </>)
}