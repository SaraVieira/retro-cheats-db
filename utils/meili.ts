import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { MeiliSearch } from 'meilisearch'



export const searchClient = instantMeiliSearch(
    "https://meili.iamsaravieira.com/",
    process.env.NEXT_PUBLIC_VIEW_KEY,
    {
        finitePagination: false,
    }
);

export const client = new MeiliSearch({ host: "https://meili.iamsaravieira.com/", apiKey: process.env.NEXT_PUBLIC_VIEW_KEY }).index("cheats")

export type SystemType =
    "Xploder" |
    "Game Genie" |
    "GameShark" |
    "Action Replay" |
    "Code Breaker" |
    "Game Buster";

export type Hit = {
    id: string;
    console: string;
    game: string;
    cheats: Cheat[];
    _highlightResult: any;
    __position: number;
    original: string
    system?: SystemType
};

export type Cheat = {
    desc: string,
    code: string,
    enabled: boolean,
    address: string,
}

export const systemColors: { [key in SystemType]: string } = {
    Xploder: "#8ECAE6",
    "Game Genie": "#219EBC",
    GameShark: "#023047",
    "Action Replay": "#FFB703",
    "Code Breaker": "#FB8500",
    "Game Buster": "#ef476f",
};
