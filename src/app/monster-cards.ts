import { CardType } from "../models/Card";

const monster_cards = {
    cards: [
        {
            id: 0,
            name: "Dip",
            description: "Some description of Dip",
            effects: [],
            type: CardType.Monster,
            health: 1,
            damage: 1,
            roll: 4,
            reward: {
                "payload": 1,
                "type": "player/gainCoins"
            }
        },
        {
            id: 1,
            name: "Clotty",
            description: "Some description of Clotty",
            effects: [],
            type: CardType.Monster,
            health: 2,
            damage: 1,
            roll: 3,
            reward: {
                "payload": 4,
                "type": "player/gainCoins"
            }
        },        
        {
            id: 2,
            name: "Fat Bat",
            description: "Some description of Fat Bat",
            effects: [],
            type: CardType.Monster,
            health: 3,
            damage: 1,
            roll: 5,
            reward: {
                "payload": 1,
                "type": "player/gainTreasure"
            }
        }
    ]  
}    

export default monster_cards;