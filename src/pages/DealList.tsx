import { DList } from "../features/dlist";
import { SearchWidget } from "../features/search";
import React from "react";


export default function ProductDetails() {
    return (
        <>
            <SearchWidget />
            <DList />
        </>
    )
}