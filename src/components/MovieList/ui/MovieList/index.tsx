import { Button, Input, List } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { ItemList } from "../ItemList";
import movieStore from "../../../../stores/MovieStore";

export const MovieList = observer(() => {
  const [movieTitle, setMovieTitle] = useState("");

  const handleMovieAdd = () => {
    if (movieTitle.trim()) {
      movieStore.addMovie(movieTitle.trim());
      setMovieTitle("");
    }
  };

  return (
    <div>
      <h1 style={{ color: "gray" }}>MovieList</h1>
      <Input
        placeholder="Enter movie title"
        style={{ marginBottom: "10px" }}
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      <Button
        type="primary"
        style={{ marginBottom: "20px" }}
        onClick={() => handleMovieAdd()}
        disabled={!movieTitle.trim()}
      >
        Add Movie
      </Button>
      <List
        bordered
        dataSource={movieStore.movies}
        renderItem={(item, index) => <ItemList item={item} index={index} />}
      />
    </div>
  );
});
