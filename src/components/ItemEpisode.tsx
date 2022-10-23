// Project files
import Placeholder from "assets/images/placeholders/card-basic.png";
import iDetailsSeries from "interfaces/iDetailsSeries";

interface iProps {
  item: iDetailsSeries;
  onClick: Function;
}

export default function ItemEpisode({ item, onClick }: iProps) {
  const { episodeNumber, title, summary, thumbnailUrl, videoCode } = item;

  return (
    <article className="item-episode" onClick={() => onClick(videoCode)}>
      <span className="number">{episodeNumber}</span>
      <img
        src={thumbnailUrl}
        onError={(event) => (event.currentTarget.src = Placeholder)}
      />
      <div className="content">
        <h3>{title}</h3>
        <p>{summary}</p>
      </div>
    </article>
  );
}
