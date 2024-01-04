import StockList from '../components/StockList';
import AutoComplete from '../components/AutoComplete';

const StockOverviewPage = () => {
    return (
        <div>
            <h2>Overview Page</h2>
            <AutoComplete />
            <StockList />
        </div>
    )
}

export default StockOverviewPage;