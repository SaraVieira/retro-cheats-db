import { Hit } from "../utils/meili";

export const Badge = ({ game }: { game: Hit }) => (
  <span className="badge badge-accent text-base-200 rounded mt-4">
    {" "}
    {game.cheats.length} cheat{game.cheats.length > 1 ? "s" : ""}
  </span>
);
