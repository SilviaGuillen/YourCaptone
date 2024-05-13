import {Freetime, FreetimeCategory, FreetimeModus} from "../types/Freetime.tsx";
import axios from "axios";
import React, {useState} from "react";
import "./EditFreetimeCard.css";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put('/api/freetime/edit', editData,
                {headers:{
                        'Content-Type': 'application/json'
                    }});



            console.log('ProductCard edited:', response.data);



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
                Freetime ID:
                <input type="text" name="freetimeId" value={editData.id} onChange={handleChange}
                       className="form-input" required/>
            </label>
            <label className="fomr-label">
                Name:
                <input type="text" name="freetimeName" value={editData.freetimeName} onChange={handleChange}
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
                Quantity:
                <input type="text" name="freetimeModus" value={editData.modus} onChange={handleChange}
                       className="form-input" required/>
            </label>
            <button type="submit" className="form-button">Edit FreetimeCard
            </button>
            {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
    );
};

export default EditFreetimeCard;

