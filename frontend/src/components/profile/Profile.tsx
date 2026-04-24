import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "./Profile.css";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const loadData = () => {
    api
      .getProfile()
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/auth");
      });
    api.getCategories().then((data) => setAllCategories(data));
  };

  useEffect(() => {
    if (!token) {
      navigate("/register");
      return;
    }
    loadData();
  }, [token]);

  const availableCategories = allCategories.filter(
    (cat) =>
      !user?.interests?.some(
        (interest: any) => interest.interest_id === cat.id,
      ),
  );

  const removeInterest = async (id: number) => {
    try {
      await api.deleteInterest(id);
      loadData();
    } catch {
      alert("Ошибка при удалении");
    }
  };

  const addInterest = async (id: number) => {
    try {
      await api.addInterest(id);
      setIsModalOpen(false);
      setSelectedCategoryId(null);
      loadData();
    } catch {
      alert("Ошибка при добавлении");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  if (!user) return <div className="loading-screen">Загрузка архива...</div>;

  return (
    <div className="profile-container">
      <div className="top-actions">
        <button onClick={handleLogout} className="logout-trigger">
          ВЫЙТИ ИЗ СИСТЕМЫ
        </button>
      </div>

      <header className="profile-header">
        <div className="header-text">
          <span className="label-accent">ЛИЧНЫЙ АРХИВ</span>
          <h1 className="display-name">{user.full_name || user.username}</h1>
        </div>
        <div className="avatar-wrapper">
          {user.image ? (
            <img src={user.image} alt="avatar" className="main-avatar" />
          ) : (
            <div className="default-avatar">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21C20 19.6045 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8955 15.5 14.5 15.5H9.5C8.10448 15.5 7.40675 15.5 6.83893 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6045 4 21"
                  stroke="#ccc"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7Z"
                  stroke="#ccc"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          )}
        </div>
      </header>

      <div className="profile-content-grid">
        <section className="content-box interests-box">
          <div className="section-header">
            <h2 className="section-title">Выбранные интересы</h2>
            <button className="text-link" onClick={() => setIsModalOpen(true)}>
              ИЗМЕНИТЬ ВСЕ
            </button>
          </div>
          <div className="tags-container">
            {user.interests?.map((item: any, idx: number) => {
              const interestId = item.interest_id;
              const interestName = item.interest_name;
              return (
                <div key={idx} className="tag-item">
                  {interestName?.toUpperCase()}
                  <span
                    className="tag-close"
                    onClick={() => interestId && removeInterest(interestId)}
                  >
                    ×
                  </span>
                </div>
              );
            })}
            <button
              className="btn-add-tag"
              onClick={() => setIsModalOpen(true)}
            >
              + ДОБАВИТЬ ИНТЕРЕС
            </button>
          </div>
        </section>

        <section className="content-box settings-box">
          <h2 className="section-title">Настройки аккаунта</h2>
          <div className="settings-row">
            <div className="input-minimal">
              <label>EMAIL</label>
              <input
                type="text"
                readOnly
                value={user.email || "vavilov@kgtu.kg"}
              />
            </div>
            <div className="input-minimal">
              <label>ЯЗЫК</label>
              <input type="text" readOnly value="Русский (RU)" />
            </div>
          </div>
        </section>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-display-title">Добавить интерес</h3>
            </div>
            <div className="modal-grid">
              {availableCategories.length > 0 ? (
                availableCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`modal-cat-btn ${selectedCategoryId === cat.id ? "is-selected" : ""}`}
                    onClick={() => setSelectedCategoryId(cat.id)}
                  >
                    {cat.name.toUpperCase()}
                  </button>
                ))
              ) : (
                <p className="modal-empty">
                  Все доступные интересы уже добавлены
                </p>
              )}
            </div>
            <div className="modal-actions">
              <button
                className="modal-btn-cancel"
                onClick={() => setIsModalOpen(false)}
              >
                ОТМЕНА
              </button>
              <button
                className="modal-btn-submit"
                disabled={!selectedCategoryId}
                onClick={() =>
                  selectedCategoryId && addInterest(selectedCategoryId)
                }
              >
                ДОБАВИТЬ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
