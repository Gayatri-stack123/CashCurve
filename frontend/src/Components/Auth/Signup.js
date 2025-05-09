import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Name Validation
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      setError('Name should contain only letters and spaces.');
      return;
    }

    // Password Validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and include letters, numbers, and special characters.');
      return;
    }

    if (name && email && password && avatar) {
      try {
        // Upload avatar image
        const formData = new FormData();
        formData.append('image', avatar);

        const uploadResponse = await fetch('http://localhost:5000/upload-image', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          setError(uploadData.message || 'Image upload failed');
          return;
        }

        const profileImageUrl = uploadData.imageUrl;

        // Register user
        const registerResponse = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: name,
            email,
            password,
            profileImageUrl,
          }),
        });

        const registerData = await registerResponse.json();

        if (registerResponse.ok) {
          navigate('/login');
        } else {
          setError(registerData.message || 'Registration failed');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    } else {
      setError('Please fill all fields and upload an avatar.');
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  return (
    <AuthStyled>
      <h1 className="expense-tracker-title">Expense Tracker</h1>
      <form onSubmit={handleSignup}>
        <div className="form-header">
          <h2>Create an Account</h2>
          <h5>
            <p>Join us today by entering your details below.</p>
          </h5>
        </div>

        {error && <p className="error-message">{error}</p>}

        <AvatarUpload>
          <label htmlFor="avatarInput">
            <div className="avatar">
              {avatar ? (
                <img src={URL.createObjectURL(avatar)} alt="avatar" />
              ) : (
                <div className="placeholder">
                  <FaCamera size={24} color="#6C63FF" />
                </div>
              )}
              <div className="add-icon">
                <FaCamera size={14} />
              </div>
            </div>
          </label>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
        </AvatarUpload>
        
        <label><h4><b>
          Enter Your Name
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </b></h4>
        </label>
        <label><h4><b>
          Enter Your Email
          <input
            type="email"
            placeholder="Example@gmail.com"
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
            placeholder="Min 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </b></h4>
        </label>
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
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

const AvatarUpload = styled.div`
  .avatar {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: #e0d9fc;
      border-radius: 50%;
    }

    .add-icon {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #6C63FF;
      border-radius: 50%;
      padding: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
  }
`;

export default Signup;
