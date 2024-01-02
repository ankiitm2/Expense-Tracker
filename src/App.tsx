import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { Auth } from './pages/auth/index';
import { ExpenseTracker } from './pages/expense-tracker/index';


function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' exact={true} element={<Auth />} />
          <Route path='/expenseTracker' exact={true} element={<ExpenseTracker />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
