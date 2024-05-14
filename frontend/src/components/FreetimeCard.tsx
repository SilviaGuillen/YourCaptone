import "./FreetimeCard.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {Freetime} from "../types/Freetime.tsx";



export type FreetimeProps = {
    freetime: Freetime;
};

export default function FreetimeCard({ freetime }: FreetimeProps) {

    const handleDelete = () => {
        axios.delete("api/freetime/delete/" + freetime.id)
            .then(() => {
                console.log("Test");
            });
    };

    const handleEdit = () => {


    };



    return (
        <li className="freetime-card">
            <div className="freetime-card">
                <div className="freetime-content">
                    <h3 className="freetime-id">Freetime ID: <span
                        className="smaller-text">{freetime.id}</span></h3>
                    <p className="freetime-name larger-text">{freetime.freetimeName}</p>
                    <p className="freetime-date larger-text">{freetime.freetimeDate}</p>
                    <p className="freetime-hours larger-text">{freetime.freetimeHours}</p>
                    <p className="freetime-category larger-text">Category: <br/> <span
                        className="smaller-text">{freetime.category}</span></p>
                    <p className="freetime-modus larger-text">Modus: <br/> <span
                        className="smaller-text">{freetime.modus}</span></p>
                    <button onClick={handleDelete} className="boton">Delete</button>
                    <button onClick={handleEdit} className="boton2">Edit <Link
                        to={"edit/" +freetime.id }>Here</Link></button>

                </div>
            </div>
        </li>
    );
}
