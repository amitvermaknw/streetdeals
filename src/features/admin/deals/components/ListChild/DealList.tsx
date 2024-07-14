import { LayoutProps } from "../../../../../utils/Types";


const DealList = ({ children }: LayoutProps) => {
    return (
        <ul className="divide-y divide-slate-100" key={`${Math.random() * new Date().getMilliseconds()}`}>
            {children}
        </ul>
    )
}

export default DealList;