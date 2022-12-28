import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { MeiliSearch } from 'meilisearch'

export const searchClient = instantMeiliSearch(
    "https://meili.iamsaravieira.com/",
    "0133b7d2b9025e587a74ada2578ad2ad5e301537a02fc60e56dfa6a0d8cc364f",
    {
        finitePagination: false,
    }
);

export const client = new MeiliSearch({ host: "https://meili.iamsaravieira.com/", apiKey: "0133b7d2b9025e587a74ada2578ad2ad5e301537a02fc60e56dfa6a0d8cc364f" }).index("cheats")

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