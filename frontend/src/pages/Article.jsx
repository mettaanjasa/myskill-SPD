import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ArticleCard from "../components/ArticleCard";
import { IoMdHeartEmpty } from "react-icons/io";
import "../App.css";

function Article() {
    const { id } = useParams();

    const [article, setArticle] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const currentIndex = articles.findIndex((article) => article._id === id);
    const previousArticle = articles[(currentIndex - 1 + articles.length) % articles.length];
    const nextArticle = articles[(currentIndex + 1) % articles.length];

    useEffect(() => {
      window.scrollTo(0, 0);
    const fetchArticles = async () => {
        try {
            const [articleResponse, articlesResponse] = await Promise.all([
                fetch(`http://localhost:5001/api/articles/${id}`),
                fetch("http://localhost:5001/api/articles"),
            ]);

            const articleData = await articleResponse.json();
            const articlesData = await articlesResponse.json();

            if (!articleResponse.ok) {
                console.error(articleData.message);
                setArticle(null);
                return;
            }

            if (!articlesResponse.ok) {
                console.error(articlesData.message);
                return;
            }

            setArticle(articleData);
            setArticles(articlesData);
        } catch (error) {
            console.error("Failed to fetch articles:", error);
            setArticle(null);
        } finally {
            setLoading(false);
        }
    };

    fetchArticles();
}, [id]);

    if (loading) {
        return <p>Loading article...</p>;
    }

    if (!article) {
        return <p>Article not found.</p>;
    }
    
    return (
    <>
    <Header />
    <main className="home-page">
        <div className="article-header">
            <div className="article-meta">
                <span>{article.date}</span>
                <span>|</span>
                <div className="article-tags">
                    {article.tags.map((tag, index) => (
                        <span key={index}>#{tag}</span> 
                        ))}
                </div>
            </div>
        
        <div className="article-title">
            <h1 className="page-title">{article.title}</h1>
            
            <button className="like-button">
                <IoMdHeartEmpty />
            </button>

        </div>
        </div>
        
        <div className="article-content">
          <h1 className="article-desc">{article.description}</h1>
          <div dangerouslySetInnerHTML={{ __html: article.content }}/>
        </div>
    </main>
    
    <div className="home-page">
        <h1 className="page-title">Reccomended Articles</h1>
        <div className="article-grid">
            <ArticleCard
                article={previousArticle}
                isLiked={false}
                onLike={() => {}}
            />
            <ArticleCard
            article={nextArticle}
            isLiked={false}
            onLike={() => {}}
            />
        </div>
    </div>
    </>
  );
}

export default Article;