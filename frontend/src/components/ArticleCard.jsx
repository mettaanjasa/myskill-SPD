import { Link } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";

function ArticleCard({ article, isLiked, onLike }) {
  return (
    <article className="article-card">
      <div className="article-card-top">
        <div className="article-card-tags">
          {article.tags.map((tag, index) => (
            <span key={index}>#{tag}</span>
          ))}
        </div>

        <button
          type="button"
          className="like-button"
          onClick={() => onLike(article._id)}
        >
          {isLiked ? <IoMdHeart /> : <IoMdHeartEmpty />}
        </button>
      </div>

      <h2>{article.title}</h2>

      <p>{article.description}</p>

      <Link
        to={`/article/${article._id}`}
        className="read-more-button"
      >
        Read More
      </Link>
    </article>
  );
}

export default ArticleCard;