// Project files
import iDetailsSeries from "interfaces/iDetailsSeries";
import Placeholder from "assets/images/placeholders/card-basic.png";

interface iProps {
  item: iDetailsSeries;
  actions: Function[];
}

export default function ItemAdminEpisode({ item, actions }: iProps) {
  const { id, title, thumbnailUrl } = item;
  const [onUpdate, onDelete] = actions;

  return (
    <article className="item-admin">
      <span className="number">{id}</span>
      <img
        src={thumbnailUrl}
        onError={(event) => (event.currentTarget.src = Placeholder)}
      />
      <h3>{title}</h3>
      <div className="buttons">
        <button className="button-gray" onClick={() => onUpdate(item)}>
          Update
        </button>
        <button className="button-gray" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
