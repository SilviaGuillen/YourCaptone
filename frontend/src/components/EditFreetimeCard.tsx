import {Freetime, FreetimeCategory, FreetimeModus} from "../types/Freetime.tsx";
import axios from "axios";
import React, {useEffect, useState} from "react";
import "./EditFreetimeCard.css";
import {useParams} from "react-router-dom";

const EditFreetimeCard: React.FC = () => {

    const [editData, setEditData] = useState<Freetime>({
        id:"",
        freetimeName: '',
        freetimeDate: '',
        freetimeHours:'',
        category:FreetimeCategory.None,
        modus:FreetimeModus.None,
    });

    const [successMessage, setSuccessMessage] = useState<string>('');

    const params = useParams()

    useEffect(() => {
        axios.get("/api/freetime/get/" + params.id).then(response => {
            setEditData(response.data)
        })
    }, [params.id])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put('/api/freetime/edit/' + editData.id, editData,
                {headers:{
                        'Content-Type': 'application/json'
                    }});



            console.log('FreetimeCard edited:', response.data);



            setEditData({
                id:"",
                freetimeName: '',
                freetimeDate: '',
                freetimeHours:'',
                category:FreetimeCategory.None,
                modus:FreetimeModus.None,
            });
            setSuccessMessage('FreetimeCard edit success!');
        } catch (error) {
            console.error('Error! FreetimeCard not edited:', error);
        } finally {
            setSuccessMessage('');
        }

    };

    return (
        <form onSubmit={handleSubmit} className="edit-FreetimeCard">

            <label className="form-label">
                Id:
                <input type="text" name="id" value={editData.id} onChange={handleChange}
                       className="form-input" required/>
            </label>
            <label className="fomr-label">
                FreeTimeName:
                <input type="text" name="freetimeName" value={editData.freetimeName} onChange={handleChange}
                       className="form-input" required/>
            </label>
            <label className="fomr-label">
                FreeTimeDate:
                <input type="text" name="freetimeDate" value={editData.freetimeDate} onChange={handleChange}
                       className="form-input" required/>
            </label>
            <label className="fomr-label">
                FreeTimeHours:
                <input type="text" name="freetimeHours" value={editData.freetimeHours} onChange={handleChange}
                       className="form-input" required/>
            </label>

            <label className="form-label">
                Category:
                <select name="category" value={editData.category} onChange={handleChange} className="form-select"
                        required>
                    {Object.keys(FreetimeCategory)
                        .filter((key) => isNaN(Number(FreetimeCategory[key as keyof typeof FreetimeCategory])))
                        .map((key) => (
                            <option key={key} value={FreetimeCategory[key as keyof typeof FreetimeCategory]}>
                                {FreetimeCategory[key as keyof typeof FreetimeCategory]}
                            </option>
                        ))}
                </select>
            </label>
            <label className="form-label">
                Modus:
                <select name="modus" value={editData.modus} onChange={handleChange} className="form-select"
                        required>
                    {Object.keys(FreetimeModus)
                        .filter((key) => isNaN(Number(FreetimeModus[key as keyof typeof FreetimeModus])))
                        .map((key) => (
                            <option key={key} value={FreetimeModus[key as keyof typeof FreetimeModus]}>
                                {FreetimeModus[key as keyof typeof FreetimeModus]}
                            </option>
                        ))}
                </select>
            </label>
            <button type="submit" className="form-button">Save FreetimeCard
            </button>
            {successMessage && <div className="success-message">{successMessage}</div>}

        </form>
    );
};

export default EditFreetimeCard;

