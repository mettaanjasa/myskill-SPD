import Header from "../components/Header";
import ArticleCard from "../components/ArticleCard";

const likedArticles = [
  {
    id: 1,
    title: "This is the Article Title Lorem Ipsum",
    tags: ["tagsarehere", "anothertag"],
    description:
      "The article's main hook/opening text goes here. This is a short preview of the article content...",
  },
  {
    id: 3,
    title: "Learning Something New",
    tags: ["learning", "skills"],
    description:
      "A quick introduction to this article and what the user can expect to learn from it...",
  },
];

function Liked() {
  return (
    <>
      <Header />

      <main className="home-page">
        <h1 className="page-title">Liked Articles</h1>

        <div className="article-grid">
          {likedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              isLiked={true}
              onLike={() => {}}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default Liked;