import './registrationPage.css'
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Group} from "../model/Group.ts";
import {User} from "../model/User.ts";
import axios from "axios";

export type RegistrationProps = {
    mail: string,
    userName: string,
    password:string
}

export default function RegistrationPage() {

    const [isChecked, setIsChecked] = useState<boolean[]>([true, false])
    const [newRegistration, setNewRegistration] = useState<RegistrationProps>({mail: "", userName:"", password:""})
    const [newUser, setNewUser] = useState<User>({id:"", firstName:"", lastName:"",  mail:"", userName:"",password:"", role:""})
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
    const [newGroup, setNewGroup] = useState<Group>({id: "", name: "", street: "", postalCode:"", city:"", mail: "", userName: "", password:"", role:""})
    const navigate = useNavigate();

    function handleCheckboxChange(checkboxNumber:number) {
        if (checkboxNumber === 0) {
            setIsChecked([true,false])
        } else {
            setIsChecked([false,true])
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const key = event.target.name
        if (key === "confirmation") {
            setPasswordConfirmation(event.target.value)
        } else {
            setNewRegistration({...newRegistration, [key]: event.target.value})
            if (isChecked[0]) {
                setNewUser({...newUser, [key]: event.target.value})
            } else if (isChecked[1]) {
                setNewGroup({...newGroup, [key]: event.target.value})
            }
        }
    }

    function onSubmitRegister(event: FormEvent<HTMLFormElement>) {
        if (passwordConfirmation !== newRegistration.password) {
            alert("Confirmation doesn't match password")
        } else {
            event.preventDefault()
            console.log("Confirmation does match password")
            if (isChecked[0]) {
                axios.post("api/user", newUser)
                    .then(() => navigate("/login"))
            } else if (isChecked[1]) {
                axios.post("api/group", newGroup)
                    .then(() => navigate("/login"))
            }

        }
    }


    return <>
        <div className={"registration_main_container"}>
            <form onSubmit={onSubmitRegister}>
                <ul className={"registration_list"}>
                    <h2>Account erstellen</h2>
                    <li className={"registration_choice_container"}>
                        <input
                            type={"checkbox"}
                            id={"registration_private"}
                            checked={isChecked[0]}
                            onChange={() => handleCheckboxChange(0)}
                        />
                        <label className={"registration_choice_element"} htmlFor={"registration_private"}>Privat</label>

                        <input
                            type={"checkbox"}
                            id={"registration_group"}
                            checked={isChecked[1]}
                            onChange={() => handleCheckboxChange(1)}
                        />
                        <label className={"registration_choice_element"}
                               htmlFor={"registration_group"}>Group</label>
                    </li>
                    {isChecked[0] ?
                        <div className={"registration_variable_container"}>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_firstname"}>Vorname</label>
                                <input id={"registration_firstname"} type={"text"} name={"firstName"} onChange={handleInputChange} value={newUser.firstName}/>
                            </li>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_lastname"}>Nachname</label>
                                <input id={"registration_lastname"} type={"text"} name={"lastName"} onChange={handleInputChange} value={newUser.lastName}/>
                            </li>
                        </div> :
                        <div className={"registration_variable_container"}>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_groupname"}>Name</label>
                                <input id={"registration_groupname"} type={"text"}
                                       placeholder={"Group Name"} name={"name"} onChange={handleInputChange} value={newGroup.name}/>
                            </li>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_street"}>Straße</label>
                                <input id={"registration_street"} type={"text"} name={"street"} onChange={handleInputChange} value={newGroup.street}/>
                            </li>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_postalcode"}>PLZ</label>
                                <input id={"registration_postalcode"} type={"text"}  name={"postalCode"} onChange={handleInputChange} value={newGroup.postalCode}/>
                            </li>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_city"}>Stadt</label>
                                <input id={"registration_city"} type={"text"}  name={"city"} onChange={handleInputChange} value={newGroup.city}/>
                            </li>
                        </div>
                    }

                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_mail"}>Email</label>
                        <input id={"registration_mail"} type={"text"} name={"mail"} onChange={handleInputChange} value={newRegistration.mail}/>
                    </li>
                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_username"}>Benutzername</label>
                        <input id={"registration_username"} type={"text"} placeholder={"mindestens 8 Zeichen"} name={"userName"} onChange={handleInputChange} value={newRegistration.userName}/>
                    </li>
                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_password"}>Password</label>
                        <input id={"registration_password"} type={"password"} placeholder={"mindestens 8 Zeichen"} name={"password"} onChange={handleInputChange} value={newRegistration.password}/>
                    </li>
                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_confirmation"}>Password nochmals eingeben</label>
                        <input id={"registration_confirmation"} type={"password"} name={"confirmation"} onChange={handleInputChange} value={passwordConfirmation}/>
                    </li>
                    <button id={"submit_registration"} type={"submit"}>Erstellen</button>
                </ul>
            </form>
        </div>
    </>
}