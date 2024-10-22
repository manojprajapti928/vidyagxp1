import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Signup from './components/Signup';
import Additem from './components/Additem';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import UpdateItem from './components/UpdateItem';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        
          <Route path="/signup" element={<Signup />} />
         <Route path='/additem' element={<Additem/>}/>
         <Route path="/updateItem/:id" element={<UpdateItem />} />

          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
