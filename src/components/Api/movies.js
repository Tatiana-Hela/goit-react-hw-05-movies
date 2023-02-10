import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'f5d8e9cc77446047f2f2a001959ba2fe',
  },
});

export const getMoviesTrending = async () => {
  const { data } = await instance.get('/trending/movie/day?page=1');
  return data.results;
};

export const getSearchMovies = async query => {
  const { data } = await instance.get(
    `search/movie?language=en-US&query=${query}&page=1&include_adult=false`
  );
  return data.results;
};

export const getMoviesDetails = async id => {
  const { data } = await instance.get(`/movie/${id}&language=en-US`);
  const {
    title,
    poster_path: posterPath,
    release_date: releaseDate,
    genres,
    overview,
    vote_average: voteAverage,
  } = data;
  return { title, posterPath, releaseDate, genres, overview, voteAverage };
};
