import List from "./List"
import deals from '../../../../data/deals.json'

const Dashboard = () => {
    return (<>
        <List deals={deals} />
    </>)
}

export default Dashboard