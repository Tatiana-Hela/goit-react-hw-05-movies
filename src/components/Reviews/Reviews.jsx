import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { getMoviesReviews } from 'Api/movies';
import Error from 'components/Error/Error';
import css from '../Reviews/Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMoviesDetails = async () => {
      try {
        setLoading(true);
        const result = await getMoviesReviews(Number(movieId));
        console.log(result);
        setReviews(result);
      } catch (error) {
        setError(error.massage);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesDetails();
  }, [movieId]);
  return (
    <>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#FF0000"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ marginLeft: '45%' }}
        visible={loading && true}
      />
      {error && <Error />}
      {reviews.length > 0 && (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={css.item}>
              <h3>Author: {author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews.length === 0 && !error && (
        <p className={css.comment}>We don't have any reviews for this movie</p>
      )}
    </>
  );
};
export default Reviews;
