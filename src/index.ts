import * as readline from "readline-sync";
import { Player } from "./gameFiles/player";
import { Room } from "./gameFiles/room";
import { Enemy } from "./gameFiles/enemy";
import { Game } from "./gameFiles/game";

function main() {
  const playerName = readline.question("Enter your name: ");
  const player = new Player(playerName);

  const rooms = [
    new Room("a dark cave", ["sword", "shield"], new Enemy("goblin", 30)),
    new Room("a forest clearing", ["potion"]),
    new Room("a haunted house", ["magic scroll"], new Enemy("ghost", 50)),
  ];

  const game = new Game(player, rooms);
  game.start();
}

main();
