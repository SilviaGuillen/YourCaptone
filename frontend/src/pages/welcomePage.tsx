import {useEffect, useState} from "react";
import {Freetime} from "../types/Freetime.tsx";
import axios from "axios";
import FreetimeCard from "../components/FreetimeCard.tsx";
import {FilterValues} from "../components/Filter.tsx";


type WelcomePageProps = {
    filterValues: FilterValues;
}

export default function WelcomePage(props: WelcomePageProps) {

    const [freetimes, setFreetimes] = useState<Freetime[]>([]);

    useEffect(() => {
        // Fetch all freetimes when the component mounts
        getAllFreetimes();
    }, []);

    function getAllFreetimes() {
        axios.get("/api/freetime/getAll").then(response => {
            setFreetimes(response.data);
        }).catch(error => {
            console.error("Error fetching freetimes:", error);
        });
    }

    function doFilter(freetime: Freetime): boolean {
        if (!props.filterValues) {
            return true;
        }
        const searchtext = props.filterValues.text.toLowerCase();

        switch (props.filterValues.category) {
            case "id":
                return (freetime.id.toLowerCase().includes(searchtext));
            case "name":
                return (freetime.freetimeName.toLowerCase().includes(searchtext));
            case "date":
                return (freetime.freetimeDate.toLowerCase().includes(searchtext));
            case "hours":
                return (freetime.freetimeHours.toLowerCase().includes(searchtext));
            case "category":
                return (freetime.category.toString().toLowerCase().includes(searchtext));
            case "modus":
                return (freetime.modus.toString().toLowerCase().includes(searchtext));
        }
        return true;
    }

    return (
        <>
            <ul className={"fretime-list"}>
                {freetimes
                    .filter(freetime => doFilter(freetime))
                    .map((freetime: Freetime) => (
                        <FreetimeCard key={freetime.id} freetime={freetime} />
                    ))}
            </ul>
        </>
    )
        ;
}
