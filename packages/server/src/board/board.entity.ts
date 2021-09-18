export interface Card {
  id: string;
  name: string;
}

export interface List {
  id: string;
  name: string;
  cards: Card[];
}

export interface NewCard {
  listId: string;
  name: string;
}

export interface NewList {
  listId: string;
  name: string;
}

export interface NewLists {
  lists: List[];
}

export interface MessageDTO {
  action: BoardAction;
  type: BoardActionTarget;
  target: NewCard | NewList | NewLists;
}

export type BoardAction = "add" | "update";
export type BoardActionTarget = "list" | "card";
