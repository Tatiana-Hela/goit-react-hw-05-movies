import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'f5d8e9cc77446047f2f2a001959ba2fe',
  },
});

export const getMoviesTrending = async () => {
  const { data } = await instance.get('/trending/all/day?page=1');
  return data.results;
};
