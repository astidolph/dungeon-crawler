import { CardType } from "../models/Card";

const monster_cards = {
    cards: [
        {
            id: 0,
            name: "Dip",
            description: "They will be so hungry and thirsty that they will eat their own dung and drink their own urine - Isaiah 36:12",
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
            description: "The end of all flesh is come before me; for the Earth is filled with violence through them - Gen 6:13",
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
            description: "Who are these that fly like a cloud, and like doves to their windows? - Isaiah 60:8",
            effects: [],
            type: CardType.Monster,
            health: 3,
            damage: 1,
            roll: 5,
            reward: {
                "payload": 1,
                "type": "player/gainTreasure"
            }
        },
        {
            id: 3,
            name: "Fly",
            description: "Woe to the land of buzzing insect wings beyond the rivers of cush - Isaiah 18:1",
            effects: [],
            type: CardType.Monster,
            health: 1,
            damage: 1,
            roll: 2,
            reward: {
                "payload": 1,
                "type": "player/gainCoins"
            }
        },
        {
            id: 4,
            name: "Cod Worm",
            description: "Their worm will never die, their fire will never be quenched - Mark 9:48",
            effects: [],
            type: CardType.Monster,
            health: 2,
            damage: 1,
            roll: 5,
            reward: {
                "payload": 3,
                "type": "player/gainCoins"
            }
        },
        {
            id: 5,
            name: "Cod Worm",
            description: "Their worm will never die, their fire will never be quenched - Mark 9:48",
            effects: [],
            type: CardType.Monster,
            health: 2,
            damage: 1,
            roll: 5,
            reward: {
                "payload": 3,
                "type": "player/gainCoins"
            }
        },
        {
            id: 6,
            name: "Envy",
            description: "UNIMPLEMENTED SKILL",
            effects: [],
            type: CardType.Monster,
            health: 2,
            damage: 1,
            roll: 5,
            reward: {
                "payload": 1,
                "type": "player/gainCoins"
            },
            soul: 1
        },
        {
            id: 7,
            name: "Daddy Long Legs",
            description: "UNIMPLEMENTED SKILL",
            effects: [],
            type: CardType.Monster,
            health: 4,
            damage: 1,
            roll: 4,
            reward: {
                "payload": 7,
                "type": "player/gainCoins"
            },
            soul: 1
        },
        {
            id: 8,
            name: "Greed",
            description: "UNIMPLEMENTED SKILL",
            effects: [],
            type: CardType.Monster,
            health: 3,
            damage: 1,
            roll: 4,
            reward: {
                "payload": 9,
                "type": "player/gainCoins"
            },
            soul: 1
        },
        {
            id: 9,
            name: "Gemini",
            description: "UNIMPLEMENTED SKILL",
            effects: [],
            type: CardType.Monster,
            health: 3,
            damage: 1,
            roll: 4,
            reward: {
                "payload": 5,
                "type": "player/gainCoins"
            },
            soul: 1
        },
        {
            id: 10,
            name: "Boom Fly",
            description: "UNIMPLEMENTED SKILL",
            effects: [],
            type: CardType.Monster,
            health: 1,
            damage: 1,
            roll: 4,
            reward: {
                "payload": 4,
                "type": "player/gainCoins"
            }
        },
        {
            id: 11,
            name: "Greedling",
            description: "UNIMPLEMENTED SKILL",
            effects: [],
            type: CardType.Monster,
            health: 2,
            damage: 1,
            roll: 5,
            reward: {
                "payload": 7,
                "type": "player/gainCoins"
            }
        },
        {
            id: 12,
            name: "Horf",
            description: "UNIMPLEMENTED SKILL",
            effects: [],
            type: CardType.Monster,
            health: 1,
            damage: 1,
            roll: 4,
            reward: {
                "payload": 3,
                "type": "player/gainCoins"
            }
        },
        {
            id: 13,
            name: "Leaper",
            description: "UNIMPLEMENTED SKILL",
            effects: [],
            type: CardType.Monster,
            health: 2,
            damage: 1,
            roll: 4,
            reward: {
                "payload": 5,
                "type": "player/gainCoins"
            }
        },
        {
            id: 14,
            name: "Mom's Dead Hand",
            description: "UNIMPLEMENTED SKILL",
            effects: [],
            type: CardType.Monster,
            health: 2,
            damage: 1,
            roll: 5,
            reward: {
                "payload": 4,
                "type": "player/gainCoins"
            }
        },
        {
            id: 15,
            name: "Mom's Hand",
            description: "UNIMPLEMENTED SKILL",
            effects: [],
            type: CardType.Monster,
            health: 2,
            damage: 1,
            roll: 4,
            reward: {
                "payload": 4,
                "type": "player/gainCoins"
            }
        },
        {
            id: 16,
            name: "Mulligan",
            description: "UNIMPLEMENTED SKILL",
            effects: [],
            type: CardType.Monster,
            health: 1,
            damage: 1,
            roll: 3,
            reward: {
                "payload": 3,
                "type": "player/gainCoins"
            }
        },
        {
            id: 17,
            name: "Pale Fatty",
            description: "His face turned pale, and his thoughts so terrified him that his hip joints shook and his knees knocked together - Dan 5:6",
            effects: [],
            type: CardType.Monster,
            health: 4,
            damage: 1,
            roll: 3,
            reward: {
                "payload": 6,
                "type": "player/gainCoins"
            }
        },
    ]  
}    

export default monster_cards;