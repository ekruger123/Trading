import { useState, useEffect, useContext } from "react";
import { WatchListContext } from "../watchListContext";
import finnHub from "../APIs/finnHub";
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs';
import { useNavigate } from "react-router-dom";

// "https://finnhub.io/api/v1/quote?symbol=AAPL&token=cm88sspr01qi5ocuq620cm88sspr01qi5ocuq62g"

const StockList = () => {

    const [stock, setStock] = useState([])
    const { watchList } = useContext(WatchListContext) 
    const navigate = useNavigate()    

    const changeColour = (change) => {
        return change > 0 ? "success": "danger"
    }

    const renderIcon = (change) => {
        return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
    }

    useEffect(() => {
        let isMounted = true;
        const fectchData = async() => {
            try {
                const responses = await Promise.all(watchList.map((stock) => {
                    return finnHub.get('/quote', {
                        params: {
                            symbol: stock
                        }
                    })
                }))

                
                const data = responses.map((response)=> {
                    return {data: response.data,
                    symbol: response.config.params.symbol}
                })
                console.log(data)
                if(isMounted) {
                    setStock(data)
                }
                
            } 
            catch (err) {

            }
        }
        fectchData()
        return () => (isMounted = false)
    }, [watchList])

        const handleStockSelect = (symbol) => {
            navigate(`detail/${symbol}`)
        }

    return (
        <table className='table hover mt-5'>
            <thead style={{color:'rgb(79,89,182'}}>
                <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Last</th>
                    <th scope='col'>Chg</th>
                    <th scope='col'>Chg%</th>
                    <th scope='col'>High</th>
                    <th scope='col'>Low</th>
                    <th scope='col'>Open</th>
                    <th scope='col'>Pclose</th>
                </tr>
            </thead>
            <tbody>
                {stock.map((stockData) => {
                return (
                    <tr style={{cursor: "pointer"}}onClick={handleStockSelect(stockData.symbol)} className='table-row' key={stockData.symbol}>
                        <th scope='row'>{stockData.symbol}</th>
                        <td>{stockData.data.c}</td>
                        <td className={`text-${changeColour(stockData.data.d)}`}>{stockData.data.d}{renderIcon(stockData.data.d)}</td>
                        <td className={`text-${changeColour(stockData.data.dp)}`}>{stockData.data.dp}{renderIcon(stockData.data.dp)}</td>
                        <td>{stockData.data.h}</td>
                        <td>{stockData.data.l}</td>
                        <td>{stockData.data.o}</td>
                        <td>{stockData.data.pc}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default StockList;