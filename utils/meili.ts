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

export type Hit = {
    id: string;
    console: string;
    game: string;
    cheats: Cheat[];
    _highlightResult: any;
    __position: number;
    original: string
};

export type Cheat = {
    desc: string,
    code: string,
    enabled: boolean,
    address: string,
}