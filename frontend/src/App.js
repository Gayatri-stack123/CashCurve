// src/App.js
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './Components/Home/HomePage';
import Signup from './Components/Auth/Signup';
import Login from './Components/Auth/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';

// Layout for authenticated pages (with sidebar)
const AuthenticatedLayout = ({ children, active, setActive }) => (
  <MainLayout>
    <Navigation active={active} setActive={setActive} />
    <main>{children}</main>
  </MainLayout>
);

function App() {
  const [active, setActive] = useState('dashboard'); // default active tab

  return (
    <AppStyled bg={bg} className="App">
      <Orb />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Protected Routes with sidebar */}
        <Route
          path="/dashboard"
          element={
            <AuthenticatedLayout active={active} setActive={setActive}>
              <Dashboard />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/income"
          element={
            <AuthenticatedLayout active={active} setActive={setActive}>
              <Income />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/expenses"
          element={
            <AuthenticatedLayout active={active} setActive={setActive}>
              <Expenses />
            </AuthenticatedLayout>
          }
        />
      </Routes>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
