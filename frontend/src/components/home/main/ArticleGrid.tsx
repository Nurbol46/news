import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

const ArticleGrid: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [interests, setInterests] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    api.getProfile().then(data => setInterests(data.interests || []));
  }, []);

  useEffect(() => {
    api.getNews(activeCategory || undefined).then(data => setNews(data || []));
  }, [activeCategory]);

  return (
    <section className="articles-section">
      <div className="filter-bar">
        <button 
          className={activeCategory === null ? "filter-btn active" : "filter-btn"}
          onClick={() => setActiveCategory(null)}
        >
          ВСЕ
        </button>
        {interests.map((i) => (
          <button 
            key={i.interest_id}
            className={activeCategory === i.interest_id ? "filter-btn active" : "filter-btn"}
            onClick={() => setActiveCategory(i.interest_id)}
          >
            {i.interest_name?.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid-container">
        {news.map((item) => (
          <Link to={`/news/${item.id}`} key={item.id} className="article-card-link">
            <article className="article-card">
              <div className="card-header">
                <span className="category-label">{item.category_name?.toUpperCase()}</span>
                <span className="recommended-badge">✦ РЕКОМЕНДОВАНО</span>
              </div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">
                {item.content?.substring(0, 150)}...
              </p>
              <div className="card-footer">
                <div className="author-info">
                   <div className="author-avatar-mini"></div>
                   <span className="author-name">{item.author || "РЕДАКЦИЯ"}</span>
                </div>
                <span className="read-arrow">→</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ArticleGrid;