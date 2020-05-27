export interface News {
  id: string;
  url: string;
  title: string;
  img: string;
  date: string;
  description: string;
  section: string;
}

interface G_block {
  main: G_main;
  body: Array<G_body_obj>;
}

interface G_main {
  elements: Array<G_elements>;
}

interface G_body_obj {
  id?: string;
  bodyTextSummary: string;
}
interface G_elements {
  assets: Array<asset>;
}
interface asset {
  file: string;
}
export interface GuardianNews {
  id: string;
  type: string;
  sectionId: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  blocks: G_block;
}

export interface NYTimesNews {
  section: string;
  subsection: string;
  title: string;
  url: string;
  published_date: string;
  abstract: string;
  multimedia: Array<multimedia>;
}
interface multimedia {
  url: string;
  width: number;
}
