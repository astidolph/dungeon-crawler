export class Card {
    id!: number;
    name: string = '';
    description?: string;
    effects: Effect[] = [];
}

export class Effect {
    payload!: number;
    type!: string;
}