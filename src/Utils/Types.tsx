export type Tposition = {
    name: string;
    price: number;
    id: number | string;
    weight: number | string;
    description: string;
    type: string;
    count: number;
    menu: string
}

export type TsendedOrder = {
    dishes: | Array<Tposition>;
    name: string,
    date: string | number;
    id?: string; 
}

type Tlocalorder = {
    date: string;
    dishes: Array<Tposition>;
    id: string;
    name: string,
    description1: string;
    description2: string;

}
export type TSectionMenu = {name: string, positions: Array<Tposition>}
export type TMenu = {nameMenu: string, routing: string, menu: Array<TSectionMenu>}

export type Torder = {
    date: string;
    dishes: Array<Tposition>;
    id: string;
    name: string,
    description1: string;
    description2: string;
}