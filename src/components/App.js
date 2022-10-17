import '../App.css';
import Header from './Header';
import Search from './Search';
import Movie from './Movie';
import { useMovieSearch } from '../hooks/Movie';

function App() {
  const { state, search } = useMovieSearch();
  const { loading, errorMessage, movies } = state;
  return (
    <div className='App'>
      <Header text='MOVIE SEARCH' />
      <Search search={search} />
      <p className='App-intro'>Sharing a few of our favorite movies</p>
      <div className='movies'>
        {errorMessage ? (
          <div className='errorMessage'>{errorMessage}</div>
        ) : loading ? (
          <span>loading...</span>
        ) : (
          (movies || []).map((movie, index) => {
            return <Movie key={index} movie={movie} />;
          })
        )}
      </div>
    </div>
  );
}

export default App;
