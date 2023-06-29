import { formatDate } from '@/app/utils/formatDate';
import { Article } from '../../../../typing';
import axios from 'axios';

interface ArticleCardProps {
  article: Article;
  onDelete: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onDelete }) => {
  const { _id, title, description, location, price, createdAt, updatedAt } =
    article;

  let createdUpdatedText: string;

  if (updatedAt > createdAt) {
    createdUpdatedText = 'Updated: ' + formatDate(updatedAt);
  } else {
    createdUpdatedText = 'Created: ' + formatDate(createdAt);
  }

  return (
    <div className="shadow bg-white p-2 rounded-lg space-y-3">
      <div>
        <p className=" underline">Title</p>
        <p>{title}</p>
      </div>
      <div>
        <p className=" underline">Description:</p>
        <div>{description}</div>
      </div>

      <p className=" underline">Location: {location}</p>
      <p className="font-semibold text-green-400 tracking-wider "> {price}$</p>
      <div className="font-light">{createdUpdatedText}</div>

      <button
        onClick={() => onDelete(_id)}
        className=" custom-button bg-red-500 "
      >
        Delete
      </button>
    </div>
  );
};

export default ArticleCard;
