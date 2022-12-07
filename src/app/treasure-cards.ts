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
        }
    ]  
}    

export default treasure_cards;