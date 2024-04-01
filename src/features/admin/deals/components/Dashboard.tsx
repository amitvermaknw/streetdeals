import List from "./List";
import deals from '../../../../data/deals.json';
import banner from '../../../../data/banner.json';


const Dashboard = () => {
    return (<>
        <List deals={deals} banner={banner} />
    </>)
}

export default Dashboard