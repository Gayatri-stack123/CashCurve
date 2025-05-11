import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (email && password) {
      try {
        const response = await fetch('http://localhost:5000/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Store token in localStorage
          localStorage.setItem('token', data.token);
          // Optionally store user info
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/dashboard');
        } else {
          setError(data.message || 'Login failed');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <AuthStyled>
      <h1 className="expense-tracker-title">Expense Tracker</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Welcome Back</h2>
          <h5>
            <p>Please enter your details to login.</p>
          </h5>
        </div>
        {error && <p className="error-message">{error}</p>}
        <label><h4><b>
          Enter Your Email
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </b></h4>
        </label>
        <label><h4><b>
          Enter Your Password
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </b></h4>
        </label>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </AuthStyled>
  );
}

const AuthStyled = styled.div`
  height: 100vh;
  background: #FCF6F9;
  padding: 10rem;
  display: flex;
  flex-direction: column;

  .expense-tracker-title {
    position: absolute;
    top: 1rem;
    left: 2rem;
    font-size: 1.5rem;
    color: black;
    margin: 0;
  }

  form {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1);
    width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .form-header {
      text-align: center;
      margin-bottom: 1rem;

      h2 {
        font-size: 1.2rem;
        margin: 0.5rem 0;
        color: black;
      }

      p {
        font-size: 0.9rem;
        color: #555;
        margin: 0;
      }
    }

    .error-message {
      color: red;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    input {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ccc;
      border-radius: 10px;
      font-size: 1rem;
    }

    button {
      width: 100%;
      padding: 0.8rem;
      border: none;
      background: #6C63FF;
      color: white;
      border-radius: 20px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        background: #574b90;
      }
    }

    p {
      text-align: center;
      font-size: 0.9rem;
    }

    a {
      color: #6C63FF;
      text-decoration: none;
    }
  }
`;

export default Login;
