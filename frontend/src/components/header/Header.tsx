import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./Header.css";

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length < 3) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (searchQuery.length < 3) return;

    const fetchTimer = setTimeout(() => {
      fetch(
        `http://127.0.0.1:8000/news/?search=${encodeURIComponent(searchQuery)}`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setSearchResults(data.slice(0, 5));
          }
        })
        .catch((err) => console.error("Ошибка поиска:", err));
    }, 300);

    return () => clearTimeout(fetchTimer);
  }, [searchQuery]);

  const handleResultClick = (id: number) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/news/${id}`);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-italic">The</span> Modern Curator
        </div>
        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-nav-link" : ""}`
            }
          >
            Главная
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-nav-link" : ""}`
            }
          >
            Мой профиль
          </NavLink>
        </nav>
      </div>

      <div className="header-right">
        <div className={`search-wrapper ${isSearchOpen ? "open" : ""}`}>
          <div className="search-field-container">
            <input
              type="text"
              placeholder="Что ищем сегодня?"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />

            {searchResults.length > 0 && (
              <div className="search-results-dropdown">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="search-result-item"
                    onClick={() => handleResultClick(result.id)}
                  >
                    <span className="res-category">{result.category_name}</span>
                    <span className="res-title">{result.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            className="search-toggle"
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              setSearchQuery("");
              setSearchResults([]);
            }}
          >
            {isSearchOpen ? <FaTimes /> : <FaSearch />}
          </button>
        </div>

        <div className="auth-section">
          {localStorage.getItem("token") ? (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/register");
              }}
              className="logout-btn"
            >
              ВЫЙТИ
            </button>
          ) : (
            <NavLink to="/register" className="login-btn">
              ВОЙТИ
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
