import './App.css'
import AppLayout from "./AppLayout.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./auth/LoginPage.jsx";
import {Toaster} from "react-hot-toast";
import RegisterPage from "./auth/RegisterPage.jsx";
import TransactionForm from "./dailyreport/TransactionForm.jsx";
import TransactionHistory from "@/dailyreport/TransactionHistory.jsx";

const PrivateRoute = ({children}) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login"/>;
    }
    return children;
};

function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-right"/>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <AppLayout>
                                <TransactionHistory/>
                            </AppLayout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/new-transaction"
                    element={
                        <PrivateRoute>
                            <AppLayout>
                                <TransactionForm/>
                            </AppLayout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/transaction-history"
                    element={
                        <PrivateRoute>
                            <AppLayout>
                                <TransactionHistory/>
                            </AppLayout>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App
