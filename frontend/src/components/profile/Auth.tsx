import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './Auth.css';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    is_agreed_to_terms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const result = await api.login({ 
          username: formData.username, 
          password: formData.password 
        });
        if (result.token) {
          localStorage.setItem('token', result.token);
          navigate('/profile');
          window.location.reload();
        }
      } else {
        await api.register(formData);
        alert("Аккаунт создан! Теперь войдите.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Ошибка: " + err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-tabs">
          <button 
            className={isLogin ? "active" : ""} 
            onClick={() => setIsLogin(true)}
          >
            ВХОД
          </button>
          <button 
            className={!isLogin ? "active" : ""} 
            onClick={() => setIsLogin(false)}
          >
            РЕГИСТРАЦИЯ
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>{isLogin ? "С возвращением" : "Создать аккаунт"}</h2>
          
          <div className="input-field">
            <label>USERNAME</label>
            <input 
              type="text" 
              value={formData.username}
              onChange={e => setFormData({...formData, username: e.target.value})} 
              required 
            />
          </div>

          {!isLogin && (
            <>
              <div className="input-field">
                <label>ПОЛНОЕ ИМЯ</label>
                <input 
                  type="text" 
                  value={formData.full_name}
                  onChange={e => setFormData({...formData, full_name: e.target.value})} 
                  required 
                />
              </div>
              <div className="input-field">
                <label>EMAIL</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  required 
                />
              </div>
            </>
          )}

          <div className="input-field">
            <label>ПАРОЛЬ</label>
            <input 
              type="password" 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>

          {!isLogin && (
            <div className="checkbox-field">
              <input 
                type="checkbox" 
                checked={formData.is_agreed_to_terms}
                onChange={e => setFormData({...formData, is_agreed_to_terms: e.target.checked})}
                required 
              />
              <span>Я согласен с условиями</span>
            </div>
          )}

          <button type="submit" className="auth-btn">
            {isLogin ? "ВОЙТИ" : "СОЗДАТЬ АККАУНТ"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;