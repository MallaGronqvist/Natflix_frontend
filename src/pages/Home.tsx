// Node modules
import { useEffect, useState } from "react";

// Project files
import BannerHome from "components/HeroHome";
import ContainerCards from "components/ListCards";
import NavigationBar from "components/NavigationBar";
import StatusEmpty from "components/StatusEmpty";
import StatusError from "components/StatusError";
import StatusLoading from "components/StatusLoading";
import eStatus from "interfaces/eStatus";
import iContent from "interfaces/iContent";

export default function Home() {
  // Local state
  const [status, setStatus] = useState(eStatus.LOADING);
  const [data, setData] = useState(new Array<iContent>());

  // Properties
 // const endPoint = "content/";
  const endPoint = "http://localhost:8000/content/"
 
  const series = data.filter((item) => item.typeId === 1);
  const movies = data.filter((item) => item.typeId === 2);
  const documentaries = data.filter((item) => item.typeId === 3);

  // Methods
  useEffect(() => {
    setStatus(eStatus.LOADING);
    fetch(endPoint)
    .then((response) => response.json())
    .then((json) => onSuccess(json))
    .catch((error) => onFailure(error));
   }, []);

  function onSuccess(data: iContent[]) {
    setData(data);
    setStatus(eStatus.READY);
  }

  function onFailure(error: string) {
    console.error(error);
    setStatus(eStatus.ERROR);
  }

  // Safeguards
  if (status === eStatus.LOADING) return <StatusLoading />;
  if (status === eStatus.ERROR) return <StatusError />;
  if (data.length === 0) return <StatusEmpty />;

  return (
    <div id="home">
      <NavigationBar />
      <BannerHome item={data[0]} />
      <ContainerCards title="Series" data={series} />
      <ContainerCards title="Movies" data={movies} />
      <ContainerCards title="Documentaries" data={documentaries} />
    </div>
  );
}
