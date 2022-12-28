import { Hit } from "meilisearch";
import { ChangeEvent, useState } from "react";

export const useRomName = ({ game }: { game: Hit }) => {

    const [romName, setRomName] = useState(game.game);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setRomName(e.target.value);

    return {
        romName,
        onChange
    }
}