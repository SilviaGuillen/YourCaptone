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
                    <h3 className="freetime-category">Freetime ID: <span
                        className="larger-text">{freetime.id}</span></h3>
                    <p className="freetime-name larger-text">{freetime.freetimeName}</p>
                    <p className="freetime-category larger-text">Category: <br/> <span
                        className="smaller-text">{freetime.category}</span></p>
                    <p className="freetime-modus larger-text">Modus: <br/> <span
                        className="smaller-text">{freetime.modus}</span></p>
                    <button onClick={handleDelete} className="larger-text">Delete</button>
                    <button onClick={handleEdit} className="larger-text">Edit <Link to={"edit/" + freetime.modus}>Here</Link> </button>

                </div>
            </div>
        </li>
    );
}
