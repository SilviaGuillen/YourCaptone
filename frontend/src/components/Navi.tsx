import {Link, NavLink} from "react-router-dom";
import './Navi.css';
import {Filter, FilterFunction} from "./Filter.tsx";

type NaviProps = {
    filterCallback: FilterFunction
}


export function Navi(props: NaviProps): JSX.Element {

    return <nav className="navbar">
        <div>
            <Link to={"/"} className="navbar-title">Free Time Match</Link>
        </div>

        <div>
            <ul className={"navbar-items"}>
                <li className="nav-item">
                    <NavLink to={"/"}>Freetime List</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/add"}>Add New Freetime </NavLink>
                </li>
                <li className="nav-item filter-item">
                    <Filter filterFunction={props.filterCallback} />
                </li>
            </ul>


        </div>


    </nav>
}