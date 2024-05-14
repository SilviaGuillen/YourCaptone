import {ChangeEvent, useState} from "react";

export type FilterValues = {
    text: string,
    category: string
}

export type FilterFunction = (filterValues: FilterValues) => void;

type FilterProps = {
    //callback: (filterValues: FilterValues) => void
    filterFunction: FilterFunction
}

export const filterStartValues: FilterValues = {
    text:"",
    category:"name"
}

export function Filter(props: FilterProps) {
    const [filterText, setFilterText] = useState<string>(filterStartValues.text)
    const [filterCategory, setFilterCategory] = useState<string>(filterStartValues.category)

    function handleOnChangeInput(event: ChangeEvent<HTMLInputElement>) {
        setFilterText(event.target.value)
        console.log("Input changed: " + filterText + " -> " + event.target.value);
        const newFilterValues:FilterValues = {
            text: event.target.value,
            category: filterCategory
        }
        props.filterFunction(newFilterValues);
    }

    function handleOnSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        setFilterCategory(event.target.value)
        console.log("Select changed: " + filterCategory + " -> " + event.target.value);
        const newFilterValues:FilterValues = {
            text: filterText,
            category: event.target.value
        }
        props.filterFunction(newFilterValues);
    }

    return (<>
        <div className="filter-items">
            <input className="filter-input" type="search" placeholder="Search" onChange={handleOnChangeInput} value={filterText}/>
            <select className="filter-category-select" onChange={handleOnSelectChange} value={filterCategory}>
                <option value="freetimeId">ProductId</option>
                <option value="name">Name</option>
                <option value="category">Kategorie</option>
                <option value="modus">Modus</option>
            </select>
        </div>
    </>)
}