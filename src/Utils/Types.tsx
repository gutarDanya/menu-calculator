export type Tposition = {
    name: string;
    price: number;
    id: number | string;
    weight: number | string;
    description: string;
    type: string;
}

export type TsendedOrder = {
    dishes: Array<string | number>;
    name: string,
    date: string | number;
}