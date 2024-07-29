import { makeAutoObservable } from "mobx";

class MovieStore {
  movies: {title: string, watched: boolean}[] = []

  constructor() {
    makeAutoObservable(this);
  }

  // метод добавляющий фильма в список
  addMovie(title: string) {
    this.movies.push({title, watched: false});
  }
  // метод отмечающий фильм как просмотренный/не просмотренный
  toggleWatched(index: number) {
    this.movies[index].watched = !this.movies[index].watched
  }
  deleteMovie(index: number) {
    this.movies = this.movies.filter((_, i) => i !== index);
  }

}

const movieStore = new MovieStore();
export default movieStore;