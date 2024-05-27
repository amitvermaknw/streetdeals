import Modal from "../../../components/ui/Modal";
import "instantsearch.css/themes/satellite.css";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";
import { SearchWidgetResult } from "./SearchWidgetResult";
import type { SearchBoxProps } from 'react-instantsearch';
import { searchClient } from "../../../../firebaseConfig";

const queryHook: SearchBoxProps['queryHook'] = (query, search) => {
    if (query.length > 3) {
        search(query);
    }

    if (query.length === 0)
        search(query);
};

type Props = {
    onCancel: () => void
}

const SearchModel = ({ onCancel }: Props) => {
    return (
        <Modal title="Search deals" onClick={onCancel}>
            <InstantSearch
                searchClient={searchClient}
                indexName="productdetails"
            >
                <Configure hitsPerPage={5} />
                <div className="py-2">
                    <SearchBox
                        placeholder="Search products......"
                        autoFocus
                        classNames={{
                            root: "px-4 py-4",
                            input: "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }}
                        queryHook={queryHook}
                        submitIconComponent={({ classNames }) => (
                            <div className={classNames.submitIcon}>submit</div>
                        )}
                        resetIconComponent={({ classNames }) => (
                            <div className={classNames.resetIcon}>X</div>
                        )}
                    />
                    <Hits hitComponent={SearchWidgetResult} />
                </div>
            </InstantSearch>
        </Modal>
    )
}

export default SearchModel;