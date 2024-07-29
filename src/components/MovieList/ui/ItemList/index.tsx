import { Checkbox, List } from "antd";
import movieStore from "../../../../stores/MovieStore";
import { observer } from "mobx-react-lite";
import { MovieInterface } from "../../../../types/movieTypes";

interface MovieProps {
  item: MovieInterface;
  index: number;
}

export const ItemList: React.FC<MovieProps> = observer(({ item, index }) => {
  const handleToggleWatched = (index: number) => {
    movieStore.toggleWatched(index);
  };

  return (
    <List.Item key={index} style={{ display: "flex", alignItems: "center" }}>
      {item.title}
      <Checkbox
        checked={item.watched}
        onChange={() => handleToggleWatched(index)}
        style={{ marginLeft: "10px" }}
      />
    </List.Item>
  );
});
