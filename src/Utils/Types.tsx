export type Tposition = {
    name: string;
    price: number;
    id: string;
    weight: number | string;
    description: string;
    type: string;
    count: number;
    menu: string
}

export type TLocalDishes = {id: string | number, count: number, menu: string, type: string}

export type TsendedOrder = {
    dishes: Array<any>;
    name: string,
    date: string;
    id: string;
    description1: string;
    description2: string;
}

export type TSectionMenu = {name: string, id: string, positions: Array<Tposition>}
export type TMenu = {nameMenu: string, routing: string, menu: Array<TSectionMenu>}

export type TLocalMenu = {nameMenu: string, sections: Array<TSectionMenu>}

export type Torder = {
    date: string;
    dishes: Array<TLocalMenu>;
    id: string;
    name: string,
    description1: string;
    description2: string;
}