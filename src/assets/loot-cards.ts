import { CardType } from "../models/Card";

const loot_cards = {
    "cards": [
        {
            "id": 0,
            "name": "Coins!",
            "description": "Gain 1 coin",
            "effects": [
                {
                    "payload": 1,
                    "type": "player/gainCoins"
                }
            ],
            type: CardType.Loot,
            frontImage: './1_cent.png'
        },        
        {
            "id": 1,
            "name": "Coins!",
            "description": "Gain 2 coins",
            "effects": [
                {
                    "payload": 2,
                    "type": "player/gainCoins"
                }
            ],
            type: CardType.Loot
        },
        {
            "id": 2,
            "name": "Coins!",
            "description": "Gain 1 coin",
            "effects": [
                {
                    "payload": 1,
                    "type": "player/gainCoins"
                }
            ],
            type: CardType.Loot
        },
        {
            "id": 3,
            "name": "Coins!",
            "description": "Gain 2 coins",
            "effects": [
                {
                    "payload": 2,
                    "type": "player/gainCoins"
                }
            ],
            type: CardType.Loot
        },
        {
            "id": 4,
            "name": "Coins!",
            "description": "Gain 3 coins",
            "effects": [
                {
                    "payload": 3,
                    "type": "player/gainCoins"
                }
            ],
            type: CardType.Loot
        },
        {
            "id": 5,
            "name": "Coins!",
            "description": "Gain 5 coins",
            "effects": [
                {
                    "payload": 5,
                    "type": "player/gainCoins"
                }
            ],
            type: CardType.Loot
        },
        {
            "id": 6,
            "name": "Coins!",
            "description": "Gain 3 coins",
            "effects": [
                {
                    "payload": 3,
                    "type": "player/gainCoins"
                }
            ],
            type: CardType.Loot
        },
        {
            "id": 7,
            "name": "Coins!",
            "description": "Gain 10 coins",
            "effects": [
                {
                    "payload": 10,
                    "type": "player/gainCoins"
                }
            ],
            type: CardType.Loot
        },
        {
            "id": 8,
            "name": "Coins!",
            "description": "Gain 1 coin",
            "effects": [
                {
                    "payload": 1,
                    "type": "player/gainCoins"
                }
            ],
            type: CardType.Loot
        },
    ]  
}    

export default loot_cards;