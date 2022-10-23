
// Node modules
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Project files
import EpisodeChooser from "components/EpisodeChooser";
import HeroDetails from "components/HeroDetails";
import StatusEmpty from "components/StatusEmpty";
import StatusError from "components/StatusError";
import StatusLoading from "components/StatusLoading";
import eStatus from "interfaces/eStatus";
import iContent from "interfaces/iContent";
import eContentType from "interfaces/eContentType";
import iDetailsOther from "interfaces/iDetailsOther";
import iDetailsSeries from "interfaces/iDetailsSeries";
import { useModal } from "state/ModalContext";

interface iProps {
  item: iContent;
}

export default function ModalDetails({ item }: iProps) {
  const { id, typeId, title, summary } = item;

  // Global state
  const navigate = useNavigate();
  const { setModal } = useModal();

  // Local state
  const [status, setStatus] = useState(eStatus.LOADING);
  const [dataOther, setDataOther] = useState({} as iDetailsOther);
  const [dataSerie, setDataSerie] = useState(Array<iDetailsSeries>);

  // Properties
  const isASeries: boolean = typeId === eContentType.SERIES;
  const emptyOther: boolean = Object(dataOther).length === 0;
  const emptySeries: boolean = dataSerie.length === 0;
  const identifier: string = id.toString();
  const endPoint = isASeries ? "http://localhost:8000/details-series/".concat(identifier) : "http://localhost:8000/details-films/".concat(identifier);
  const videoCode = isASeries ? dataSerie[0]?.videoCode : dataOther.videoCode;

  // Methods
  useEffect(() => {
    setStatus(eStatus.LOADING);
    fetch(endPoint)
    .then((response) => response.json())
    .then((json) => onSuccess(json))
    .catch((error) => onFailure(error));
  }, []);

  function onSuccess(data: any) {
    isASeries ? setDataSerie(data) : setDataOther(data);
    setStatus(eStatus.READY);
  }

  function onFailure(error: string) {
    console.error(error);
    setStatus(eStatus.ERROR);
  }

  function onClick(videoCode: string): void {
    navigate(`video/${videoCode}`);
    setModal(null);
  }

  // Safeguards
  if (status === eStatus.LOADING) return <StatusLoading />;
  if (status === eStatus.ERROR) return <StatusError />;
  if (emptyOther && emptySeries) return <StatusEmpty />;

  return (
    <div className="modal-details">
      <HeroDetails item={item} videoCode={videoCode} onClick={onClick} />
      <section className="description">
        <h2>{title}</h2>
        <p>{summary}</p>
      </section>
      {isASeries && <EpisodeChooser episodes={dataSerie} onClick={onClick} />}
    </div>
  );
}
