import { Loader } from 'lucide-react';
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from "./Pages/HomePage";
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import SignUpPage from './Pages/SignUp';
import { useAuthStore } from './store/userAuthStore';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  const isThemedRoute = ['/login', '/signup', '/profile'].includes(location.pathname);

  return (
    <div>
      <Navbar />
      {isThemedRoute ? (
        <div data-theme="autumn" style={{ height: '100vh', marginTop: "4rem" }}>
          <Routes>
            <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
            <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
            <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path='/' element={authUser ? <Navigate to="/" /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        </Routes>
      )}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

export default App;
