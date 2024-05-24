import { useState } from "react";
import FormContainer from "../../../components/ui/FormContainer";
import SearchWidgetModel from "../../../model/SearchWidget";
import useSearchWidget from "../hooks/useSearchWidget";
import SearchModel from "./SearchModal";

//const searchClient = algoliasearch("0SE4PU6V6E", "9dc4ccd018b87b07c594ea249d4dc8b2");

const SearchWidget = () => {
    const [state, onChange] = useSearchWidget(SearchWidgetModel);
    const [isSearchModal, setSearchModal] = useState(false);


    return (<>
        <div className="grid gap-4 grid-cols-2" onClick={() => setSearchModal(true)}>
            <FormContainer state={state} onChange={onChange} />
        </div>
        {isSearchModal ? <SearchModel onCancel={() => setSearchModal(false)} /> : ''}
    </>
    )

}

export default SearchWidget;
