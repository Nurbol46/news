import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

// импорты модулей
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Login from "./components/profile/register/Login";
import Auth from "./components/profile/Auth";
import ArticleDetail from "./components/home/main/ArticleDetail";

const NotFoundPage: React.FC = () => (
  <main className="pt-24 px-8 text-center">
    <h1 className="text-5xl font-extrabold text-red-600">404</h1>
    <p className="mt-4 text-xl text-gray-800">
      Упс! Такую новость мы не нашли.
    </p>
    <NavLink to="/" className="mt-6 inline-block text-blue-700 underline">
      Вернуться на главную
    </NavLink>
  </main>
);

const App: React.FC = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/register" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news/:id" element={<ArticleDetail />} />
        {/* Пока хз будет это дело или нет */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
