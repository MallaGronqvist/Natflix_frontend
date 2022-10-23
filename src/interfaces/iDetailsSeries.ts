/**
 * About:
 * The additional details a series need to its seasons and episodes in the content modal.
 *
 * Note: seasonNumber and episodeNumber seen redundant but is to be clear that is just the number and not the whole data
 */
export default interface iDetailsSeries {
  id: number;
  contentId: number;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  summary: string;
  thumbnailUrl: string;
  videoCode: string;
}
