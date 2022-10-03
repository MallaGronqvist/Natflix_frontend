/**
 * About:
 * This method is fake replacement for the real fetch method in JavaScript.
 */

// Fake data
import Content from "./fake-data/content.json";
import SingleMovie from "./fake-data/singleMovie.json";
import SingleSerie from "./fake-data/singleSerie.json";
import SingleDocumentary from "./fake-data/singleDocumentary.json";

// Project files
import iContent from "interfaces/iContent";
import iDetailsContent from "interfaces/iDetailsContent";
import iDetailsSeries from "interfaces/iDetailsSeries";

interface iResponse {
  status: string;
  data: Array<any> | any;
}

// prettier-ignore
export default async function fakeFetch(endPoint: string, id: number = NaN): Promise<iResponse> {
  const chanceToSucced = Math.floor(Math.random() * 100);
  const result = { data: {}, status: "" };

  await delay(1000);

  switch (chanceToSucced) {
    case 0:
      result.status = "error";
      break;
    case 1:
      result.data = [];
      result.status = "ok"; // if worked but there is no data
      break;
    default:
      result.data = getData(endPoint, id);
      result.status = "ok";
  }

  return result;
}

function getData(endPoint: string, id: number): any {
  let result: any;

  switch (endPoint) {
    case "content":
      result = content();
      break;
    case "contentDetails":
      result = contentDetails(id);
      break;
    default:
      throw new Error("invalid endpoint");
  }

  return result;
}

function content(): Array<iContent> {
  const result = Content;

  return result;
}

function contentDetails(id: number): iDetailsContent | iDetailsSeries[] {
  const content = Content.filter((item) => item.id === id)[0];
  let result: iDetailsContent | iDetailsSeries[];

  switch (content.type_id) {
    case 1:
      result = SingleSerie;
      break;
    case 2:
      result = SingleMovie;
      break;
    case 3:
      result = SingleDocumentary;
      break;
    default:
      throw new Error("Invalid type id");
  }

  return result;
}

function delay(miliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}
