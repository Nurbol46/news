import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await api.login(loginData);
      if (result.token) {
        localStorage.setItem('token', result.token);
        navigate('/profile');
        window.location.reload();
      }
    } catch (err) {
      alert("Неверный логин или пароль" + err);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Вход</h2>
        <input type="text" placeholder="Username" onChange={e => setLoginData({...loginData, username: e.target.value})} required />
        <input type="password" placeholder="Пароль" onChange={e => setLoginData({...loginData, password: e.target.value})} required />
        <button type="submit" className="auth-btn">ВОЙТИ</button>
      </form>
    </div>
  );
};

export default Login;