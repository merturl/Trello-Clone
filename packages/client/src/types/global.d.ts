export interface CardInfo {
  id: string;
  name: string;
}

export interface ListInfo {
  id: string;
  name: string;
  cards: CardInfo[];
}
