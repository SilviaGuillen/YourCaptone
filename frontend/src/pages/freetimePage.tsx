import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Freetime} from "../types/Freetime.tsx";
import FreetimeCard from "../components/FreetimeCard.tsx";
import axios from "axios";




export default function FreetimePage() {

    const [freetime, setFreetime] = useState<Freetime>({} as Freetime)

    const params = useParams()

    useEffect(() => {
        axios.get("/api/freetime/" + params.id).then(response => {
            setFreetime(response.data)
        })
    }, [params.id])

    return <><FreetimeCard freetime={freetime}  /></>
}