export type Tposition = {
    name: string;
    price: number;
    id: number | string;
    weight: number | string;
    description: string;
    type: string;
    count?: number;
}

export type TsendedOrder = {
    dishes: Array<string | number>;
    name: string,
    date: string | number;
    id?: string; 
}

export type Torder = {
    date: string;
    dishes: Array<Tposition>;
    id: string;
    name: string,
    description1: string;
    description2: string;
}