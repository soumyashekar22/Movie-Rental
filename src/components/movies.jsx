import React from "react";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import SearchBox from "./searchBox";

import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";
class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    movieLength: getMovies.length,
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleDelete = (movie) => {
    const mov = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: mov });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    console.log(movies);
    const index = movies.indexOf(movie);
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      sortColumn,
      searchQuery,
      movies: allMovies,
      selectedGenre,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, sortColumn, searchQuery } = this.state;
    if (count === 0) return <p>There are no movies</p>;
    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              textProperty="name"
              valueProperty="_id"
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
            />
          </div>

          <div className="col">
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
            <h3>There are {totalCount} movies</h3>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
