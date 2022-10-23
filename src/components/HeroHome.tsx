// Project files
import IconInfo from "assets/images/icons/icon-info-white.svg";
import Placeholder from "assets/images/placeholders/banner.png";
import ModalDetails from "components/ModalDetails";
import iContent from "interfaces/iContent";
import { useModal } from "state/ModalContext";

interface iProps {
  item: iContent;
}

export default function BannerHome({ item }: iProps) {
  const { bannerUrl, logoUrl, title, summary } = item;

  // Global state
  const { setModal } = useModal();

  // Components
  const Heading = <h3>{title}</h3>;
  const Logo = <img src={logoUrl} className="logo" />;
  const Modal = <ModalDetails item={item} />;

  return (
    <header className="hero hero-home">
      <img
        className="background-image"
        src={bannerUrl}
        onError={(event) => (event.currentTarget.src = Placeholder)}
      />
      <div className="content">
        {logoUrl === "" ? Heading : Logo}
        <p>{summary}</p>
        <button onClick={() => setModal(Modal)} className="button-gray">
          <img className="icon" src={IconInfo} />
          More info
        </button>
      </div>
    </header>
  );
}
