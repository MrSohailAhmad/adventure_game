import * as readline from "readline-sync";
import { Player } from "./player";
import { Room } from "./room";
import { Enemy } from "./enemy";

export class Game {
  player: Player;
  rooms: Room[];
  currentRoomIndex: number;

  constructor(player: Player, rooms: Room[]) {
    this.player = player;
    this.rooms = rooms;
    this.currentRoomIndex = 0;
  }

  start() {
    console.log("Welcome to the Text Adventure Game!");
    while (this.player.health > 0) {
      this.describeCurrentRoom();
      const action = readline.question(
        "What do you want to do? (move, take, status, exit): "
      );
      switch (action) {
        case "move":
          this.move();
          break;
        case "take":
          this.takeItem();
          break;
        case "status":
          this.player.showStatus();
          break;
        case "exit":
          console.log("Thanks for playing!");
          return;
        default:
          console.log("Invalid action.");
      }
    }
    console.log("Game Over. You have died.");
  }

  describeCurrentRoom() {
    const room = this.rooms[this.currentRoomIndex];
    console.log(`You are in ${room.description}`);
    if (room.items.length > 0) {
      console.log(`You see: ${room.items.join(", ")}`);
    }
    if (room.enemy) {
      console.log(`An enemy ${room.enemy.name} is here!`);
      this.fight(room.enemy);
    }
  }

  move() {
    const direction = readline.question(
      "Which direction do you want to move? (north, south, east, west): "
    );
    switch (direction) {
      case "north":
      case "south":
      case "east":
      case "west":
        this.currentRoomIndex = (this.currentRoomIndex + 1) % this.rooms.length;
        break;
      default:
        console.log("You can't move in that direction.");
    }
  }

  takeItem() {
    const room = this.rooms[this.currentRoomIndex];
    if (room.items.length > 0) {
      const item = room.items.pop()!;
      this.player.addItem(item);
      console.log(`You have taken: ${item}`);
    } else {
      console.log("There is nothing to take.");
    }
  }

  fight(enemy: Enemy) {
    while (enemy.health > 0 && this.player.health > 0) {
      const action = readline.question("Do you want to (attack, flee): ");
      if (action === "attack") {
        enemy.health -= 20;
        console.log(
          `You attack the ${enemy.name}. It has ${enemy.health} health left.`
        );
        if (enemy.health > 0) {
          this.player.health -= 10;
          console.log(
            `The ${enemy.name} attacks you. You have ${this.player.health} health left.`
          );
        }
      } else if (action === "flee") {
        console.log("You fled the fight.");
        return;
      } else {
        console.log("Invalid action.");
      }
    }
    if (enemy.health <= 0) {
      console.log(`You defeated the ${enemy.name}.`);
    }
  }
}
