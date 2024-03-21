import { LayoutProps } from "../../../../../utils/Types";


const DealList = ({ children }: LayoutProps) => {
    return (
        <ul className="divide-y divide-slate-100">
            {children}
        </ul>
    )
}

export default DealList;