import { CardType } from "../models/Card";

const treasure_cards = {
    "cards": [
        {
            "id": 0,
            "name": "Dinner",
            "description": "+1 HP",
            "effects": [
                {
                    "payload": 1,
                    "type": "player/gainTotalHP"
                }
            ],
            type: CardType.Treasure
        },
        {
            "id": 1,
            "name": "Brimstone",
            "description": "+1 DMG",
            "effects": [
                {
                    "payload": 1,
                    "type": "player/gainTotalDMG"
                }
            ],
            type: CardType.Treasure
        },        
        {
            "id": 2,
            "name": "Breakfast",
            "description": "+1 HP",
            "effects": [
                {
                    "payload": 1,
                    "type": "player/gainTotalHP"
                }
            ],
            type: CardType.Treasure
        },
        {
            "id": 3,
            "name": "Ipecac",
            "description": "+1 DMG",
            "effects": [
                {
                    "payload": 1,
                    "type": "player/gainTotalDMG"
                }
            ],
            type: CardType.Treasure
        }
    ]  
}    

export default treasure_cards;