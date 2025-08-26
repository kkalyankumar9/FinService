import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsHistory } from '../../Redux/User/InvestStocks/action';

const AllTransactions = () => {
    const transactionsData = useSelector((store) => store.UserStocksReducer.transactionsData);
    const isLoading = useSelector((store) => store.UserStocksReducer.isLoading);
    const isError = useSelector((store) => store.UserStocksReducer.isError);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTransactionsHistory());
    }, [dispatch]);

    if (isLoading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center py-4 text-red-500">Error loading transactions.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">All Transactions</h1>
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full overflow-hidden">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="sticky top-0 bg-gray-200">
                            <tr className="text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">S.No</th>
                                <th className="py-3 px-6 text-left">User</th>
                                <th className="py-3 px-6 text-left">Order ID</th>
                                <th className="py-3 px-6 text-left">Payment ID</th>

                                <th className="py-3 px-6 text-left">Amount</th>
                                <th className="py-3 px-6 text-left">Currency</th>
                                <th className="py-3 px-6 text-left">No. of Stocks</th>
                                <th className="py-3 px-6 text-left">Stocks Price</th>
                                <th className="py-3 px-6 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {transactionsData?.map((transaction, index) => (
                                <tr key={transaction._id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{index + 1}</td>
                                    <td className="py-3 px-6 text-left">{transaction.username}</td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{transaction.orderId}</td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{transaction.paymentId}</td>
                                    
                                    <td className="py-3 px-6 text-left">{transaction.amount}</td>
                                    <td className="py-3 px-6 text-left">{transaction.currency}</td>
                                    <td className="py-3 px-6 text-left">{transaction.no_of_stocks}</td>
                                    <td className="py-3 px-6 text-left">{transaction.stocks_price}</td>
                                    <td className="py-3 px-6 text-left">{new Date(transaction.date).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllTransactions;
