// Project files
import IconPlay from "assets/images/icons/icon-play-black.svg";
import Placeholder from "assets/images/placeholders/banner.png";
import iContent from "interfaces/iContent";

interface iProps {
  item: iContent;
  videoCode: string;
  onClick: Function;
}

export default function HeroDetails({ item, videoCode, onClick }: iProps) {
  const { bannerUrl, logoUrl } = item;

  // Components
  const Logo = <img src={logoUrl} className="logo" />;

  return (
    <header className="hero hero-details">
      <img
        className="background-image"
        src={bannerUrl}
        onError={(event) => (event.currentTarget.src = Placeholder)}
      />
      <div className="content">
        {logoUrl && Logo}
        <button onClick={() => onClick(videoCode)} className="button-white">
          <img className="icon" src={IconPlay} />
          Play
        </button>
      </div>
    </header>
  );
}
