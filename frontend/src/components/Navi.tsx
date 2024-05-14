import {Link, NavLink} from "react-router-dom";
import './Navi.css';
import {Filter, FilterFunction} from "./Filter.tsx";

type NaviProps = {
    filterCallback: FilterFunction
}


export function Navi(props: NaviProps): JSX.Element {

    return <nav className="navbar">
        <div>
            <Link to={"/"} className="navbar-title">Warehouse System</Link>
        </div>

        <div>
            <ul className={"navbar-items"}>
                <li className="nav-item">
                    <NavLink to={"/"}>Freetimeliste</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/add"}>Freetime hinzufügen</NavLink>
                </li>
                <li className="nav-item filter-item">
                    <Filter filterFunction={props.filterCallback} />
                </li>
            </ul>


        </div>


    </nav>
}