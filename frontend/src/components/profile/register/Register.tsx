import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    is_agreed_to_terms: false,
  });
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.register(formData);
      alert("Регистрация успешна! Теперь войдите.");
      navigate("/login");
    } catch (err) {
      alert("Ошибка регистрации: " + err);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="register-container">
        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-header">
            <h2>Создать аккаунт</h2>
            <p>Присоединяйтесь к архиву Modern Curator</p>
          </div>

          <div className="input-group">
            <div className="input-field">
              <label>ЛОГИН</label>
              <input
                type="text"
                placeholder="vavilov_dev"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>

            <div className="input-field">
              <label>ПОЛНОЕ ИМЯ</label>
              <input
                type="text"
                placeholder="Илья Вавилов"
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                required
              />
            </div>

            <div className="input-field">
              <label>EMAIL</label>
              <input
                type="email"
                placeholder="example@kgtu.kg"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="input-field">
              <label>ПАРОЛЬ</label>
              <input
                type="password"
                placeholder="••••••••"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="checkbox-section">
            <input
              type="checkbox"
              id="terms"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  is_agreed_to_terms: e.target.checked,
                })
              }
              required
            />
            <label htmlFor="terms">Я принимаю условия использования</label>
          </div>

          <button type="submit" className="auth-btn-submit">
            ЗАРЕГИСТРИРОВАТЬСЯ
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
