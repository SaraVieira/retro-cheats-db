import { Hit, systemColors } from "../utils/meili";

export const SystemBadge = ({ game }: { game: Hit }) => {
  if (!game.system) return null;

  return (
    <span
      className={`badge text-base-200 rounded badge-accent mb-4 ${
        game.system === "GameShark" && "text-gray-50"
      }`}
      style={{
        background: systemColors[game.system],
        borderColor: systemColors[game.system],
      }}
    >
      {game.system}
    </span>
  );
};
