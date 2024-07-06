import { Enemy } from "./enemy";

export class Room {
  description: string;
  items: string[];
  enemy: Enemy | null;

  constructor(
    description: string,
    items: string[],
    enemy: Enemy | null = null
  ) {
    this.description = description;
    this.items = items;
    this.enemy = enemy;
  }
}
