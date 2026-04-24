import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ArticleDetail.css";

const ArticleDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/news/${id}/`)
      .then(res => res.json())
      .then(data => setArticle(data))
      .catch(() => navigate("/"));
  }, [id, navigate]);

  if (!article) return <div className="loading-screen">Загрузка контента...</div>;

  return (
    <div className="article-page">
      <nav className="article-nav">
        <button className="back-link" onClick={() => navigate(-1)}>
          ← НАЗАД К ЛЕНТЕ
        </button>
      </nav>

      <article className="article-container">
        <header className="article-header">
          <div className="category-badge">{article.category_name}</div>
          <h1 className="article-main-title">{article.title}</h1>
          
          <div className="article-author-card">
            <div className="author-avatar"></div>
            <div className="author-meta">
              <span className="author-name-text">{article.author || "Редакция"}</span>
              <span className="publish-date">
                {new Date(article.created_at).toLocaleDateString('ru-RU', { 
                  day: 'numeric', month: 'long', year: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </header>

        {article.image && (
          <figure className="article-figure">
            <img src={article.image} alt={article.title} className="article-hero-img" />
            <figcaption>Иллюстрация к материалу из архива редакции</figcaption>
          </figure>
        )}

        <div className="article-body">
          <p className="article-lead">
            {article.content?.split('\n')[0]}
          </p>
          
          <div className="article-text">
            {article.content?.split('\n').slice(1).map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          
          <div className="article-end-mark">✦ ✦ ✦</div>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;