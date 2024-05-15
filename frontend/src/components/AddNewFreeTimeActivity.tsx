import React, {useState} from 'react';
import axios from 'axios';
import "./AddNewFreetimeActivity.css";
import {Freetime, FreetimeCategory, FreetimeModus} from "../types/Freetime.tsx";


const AddNewFreetimeActivity: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment

    const [formData, setFormData] = useState<Freetime>({
        id: '',
        freetimeName: '',
        freetimeDate: '',
        freetimeHours:'',
        category: FreetimeCategory.None,
        modus:FreetimeModus.None
    });

    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/freetime/add' , formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('FreeTimeActivity successfully added:', response.data);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment

            setFormData({
                id: '',
                freetimeName: '',
                freetimeDate: '',
                freetimeHours: '',
                category: FreetimeCategory.None,
                modus: FreetimeModus.None,
            });
            setSuccessMessage('FreeTimeActivity wurde erfolgreich hinzugefügt!');
        } catch (error) {
            console.error('Error adding FreeTimeActivity:', error);
        } finally {
            setSuccessMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-freetime-form">
            <label className="form-label">
                ID:
                <input type="text" name="id" value={formData.id} onChange={handleChange} className="form-input"
                       required/>
            </label>
            <label className="form-label">
                FreeTimeName:
                <input type="text" name="freetimeName" value={formData.freetimeName} onChange={handleChange}
                       className="form-input" required/>
            </label>
            <label className="form-label">
                FreeTimeDate:
                <input type="text" name="freetimeDate" value={formData.freetimeDate} onChange={handleChange}
                       className="form-input" required/>
            </label>
            <label className="form-label">
                FreeTimeHours:
                <input type="text" name="freetimeHours" value={formData.freetimeHours} onChange={handleChange}
                       className="form-input" required/>
            </label>
            <label className="form-label">
                Category:
                <select name="category" value={formData.category} onChange={handleChange} className="form-select"
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
                <select name="modus" value={formData.modus} onChange={handleChange} className="form-select"
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
            <button type="submit" className="form-button">Add FreetimeActivity</button>
            {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
    );
};

export default AddNewFreetimeActivity;