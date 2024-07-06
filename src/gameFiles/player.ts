export class Player {
  name: string;
  health: number;
  inventory: string[];

  constructor(name: string) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
  }

  addItem(item: string) {
    this.inventory.push(item);
  }

  showStatus() {
    console.log(`Player Name: ${this.name}`);
    console.log(`Health: ${this.health}`);
    console.log(`Inventory: ${this.inventory.join(", ")}`);
  }
}
