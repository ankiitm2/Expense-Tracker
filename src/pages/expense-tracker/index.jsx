import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useAddTransactions } from '../../hooks/useAddTransactions';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useGetUserInfo } from '../../hooks/useGetUserInfo'
import { auth } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


export const ExpenseTracker = () => {
    const { addTransactions } = useAddTransactions();
    const { transactions, transactionTotals } = useGetTransactions();
    const { name, profilePhoto } = useGetUserInfo();

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState();
    const [transactionType, setTransactionType] = useState("expense");

    const navigate = useNavigate();
    const { balance, income, expense } = transactionTotals;

    const onSubmit = (e) => {
        e.preventDefault();
        addTransactions({ description, transactionAmount, transactionType, });

        setDescription("");
        setTransactionAmount("")
    };

    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg shadow bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand">Expense Tracker</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {balance >= 0 ? (
                                    <h2>₹{balance.toLocaleString()}</h2>
                                ) : (
                                    <h2>-₹{(-balance).toLocaleString()}</h2>
                                )}
                            </li>
                        </ul>
                        <form className="d-flex align-items-center" role="search">
                            {profilePhoto && (<div className='profilePhoto'>
                                <img src={profilePhoto} alt="" />
                            </div>)}


                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {name}
                                </button>
                                <ul className="dropdown-menu">
                                    <li> <button className='btn' onClick={signUserOut}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAToP52uJ4-6Ftfp4cDs22DWmhtyAyzyLL0g&usqp=CAU" alt="" className='mw-100' /> Log Out</button></li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>

            <div className="container shadow-lg m-4 p-3">
                <div className="balance gap-2 d-flex">
                    <div className="money shadow flex-fill">
                        <h3>Total Balance</h3>
                        {balance >= 0 ? (
                            <h2>₹{balance.toLocaleString()}</h2>
                        ) : (
                            <h2>-₹{(-balance).toLocaleString()}</h2>
                        )}
                        <div className="summary">
                            <div className="income">
                                <h4>Total Income</h4>
                                <p>₹{income}
                                </p>
                            </div>
                            <div className="expense">
                                <h4>Total Expense</h4>
                                <p>₹{expense}</p>
                            </div>
                        </div>

                    </div>
                    <form className="add-transaction shadow d-flex flex-fill" onSubmit={onSubmit}>
                        <div className="input">
                            <input type="text" placeholder="Description" value={description} required onChange={(e) => setDescription(e.target.value)} />
                            <input type="number" placeholder="Amount" value={transactionAmount} required onChange={(e) => setTransactionAmount(e.target.value)} />
                        </div> <div className="radio-btn">
                            {/* <div className="radio">
                                <input type="radio" id="expense" value="expense" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} />
                                <label htmlFor="expense">Expense</label>
                            </div>
                            <div className="radio">
                                <input type="radio" id="income" value="income" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} />
                                <label htmlFor="income">Income</label>
                            </div> */}
                            {/* radio */}
                            <div className="toggle-radio">
                                <input type="radio" name="rdo" id="expense" value="expense" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} />
                                <input type="radio" name="rdo" id="income" value="income" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} />
                                <div className="switch">
                                    <label htmlFor="expense">Expense</label>
                                    <label htmlFor="income">Income</label>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className='btn btn-secondary btn-rounded'>Add Transaction</button>
                    </form>
                </div>

                {/* transaction */}
                <div className="transaction mt-2 shadow">
                    <h2>Transaction</h2>
                    <ul>
                        {transactions.map((transaction) => {
                            const { transactionId, description, transactionAmount, transactionType } = transaction;
                            return (
                                <li key={transactionId}> <span>
                                    <div className="list">
                                        <h4>{description}</h4>
                                        <p>₹{transactionAmount} • <label style={{ color: transactionType === "expense" ? "red" : "green" }}>{transactionType}</label></p>
                                    </div></span>
                                </li>)
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}