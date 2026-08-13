import { useEffect, useState } from "react";
import Header from "../components/Header";
import ArticleCard from "../components/ArticleCard";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
        const data = await response.json();
        
        if (!response.ok) {
          console.error(data.message);
          return;
        }

        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };
    
    fetchArticles();
  }, []);

    return (
    <>
    <Header />
    <main className="home-page">
        <h1 className="page-title">Articles</h1>
        <div className="article-grid">
            {articles.map((article) => (
                <ArticleCard
                    key={article.id}
                    article={article}
                    isLiked={false}
                    onLike={() => {}}
                />))}
        </div>
      </main>
    </>
    );
}

export default Home;