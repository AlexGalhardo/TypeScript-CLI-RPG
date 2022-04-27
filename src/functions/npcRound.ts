import Character from "../classes/Character";
import GameStatistics from "../classes/GameStatistics";
import { HEALTH_POTION_PRICE, MANA_POTION_PRICE } from "../GLOBAL";
import { userInput } from "../main";
import chalk from 'chalk';

export default function npcRound(player: Character) {

    let totalPrice = 0;

    let continueNPC = true;

    while (continueNPC) {

        console.log(chalk.bold("\n\t ---> NPC ROUND <--- "));
        console.log(chalk.bold.yellow(`\t Currently Gold Coins: ${player.currentlyGoldCoins}`));
        console.log(`\t Enter [1] --> Buy Health Potions [${HEALTH_POTION_PRICE} gold coins each]`);
        console.log(`\t Enter [2] --> Buy Mana Potions [${MANA_POTION_PRICE} gold coins each]`);
        console.log("\t Enter [0] --> Bye NPC [Go Next Round]");

        const npcOption = Number(userInput("\t Option: "));

        while (true) {

            if (npcOption === 1) {

                console.log(`\n\t How many Health Potions you want dear ${player.name} ?`);
                console.log("\t Enter [0] --> Go back.");

                const healthPotions = Number(userInput("\t I want to buy: "));

                if (healthPotions === 0) break;

                totalPrice = healthPotions * HEALTH_POTION_PRICE;

                console.log(`\t Confirm: [${healthPotions}] Health Potions for [${totalPrice}] Gold Coins?`);

                console.log("\t Enter [1] --> Yes");
                console.log("\t Enter Other --> No");

                const confirm = Number(userInput("\t Confirm: "));

                if (confirm === 1) {

                    if (totalPrice <= player.currentlyGoldCoins) {
                        GameStatistics.totalHealthPotionsBought += healthPotions;
                        player.usedGoldCoinsInNPC(totalPrice);
                        player.addHealthPotions(healthPotions);

                        console.log(`\n\t Currently Cold Coins: ${player.currentlyGoldCoins}`);
                        console.log(`\t Currently Health Potions: ${player.currentlyHealthPotions}`);
                        break;
                    } else {
                        console.log("\n\t YOU DONT HAVE SUFFICIENT GOLD COINS!");
                        break;
                    }
                }
            }
            else if (npcOption === 2) {

                console.log(`\n\t How many Mana Potions you wanna ${player.name} ?`);
                console.log("\t Enter [0] --> Go back.");
                const manaPotions = Number(userInput("\t I want to buy: "));

                if (manaPotions === 0) break;

                totalPrice = manaPotions * MANA_POTION_PRICE;

                console.log(`\t Confirm: ${manaPotions} for ${totalPrice} gold coins?`);
                console.log("\t Enter [1] --> Yes");
                console.log("\t Enter Other --> No");
                const confirmTransaction = Number(userInput("\t Confirm: "));

                if (confirmTransaction === 1) {

                    if (totalPrice <= player.currentlyGoldCoins) {
                        GameStatistics.totalManaPotionsBought += manaPotions;
                        player.usedGoldCoinsInNPC(totalPrice);
                        player.addManaPotions(manaPotions);

                        console.log(`\t Currently Cold Coins: ${player.currentlyGoldCoins}`);
                        console.log(`\t Currently Mana Potions: ${player.currentlyManaPotions}`);
                        break;
                    } else {
                        console.log("\n\t YOU DONT HAVE SUFFICIENT GOLD COINS!");
                        break;
                    }
                }
            }
            else if (npcOption === 0) {
                continueNPC = false;
                break;
            }
            else {
                console.log("\t Enter a valid option!");
                break;
            }
        }
    }
}