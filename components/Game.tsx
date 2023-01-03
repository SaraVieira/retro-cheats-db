import Link from "next/link";

import { Highlight } from "react-instantsearch-hooks-web";
import { Hit } from "../utils/meili";
import { Badge } from "../components/Badge";
import { SystemBadge } from "./SystemBadge";

export const Game = ({ hit }: { hit: Hit }) => {
  const newHit = {
    objectID: hit.id,
    ...hit,
  };
  return (
    <div
      key={newHit.id}
      onClick={() => console.log(newHit)}
      className="relative flex space-x-3 rounded-lg border border-gray-800 shadow shadow-cyan-500/20 bg-[#1a1c1c] px-6 py-5 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 hover:border-gray-600 h-full grow"
    >
      <div className="min-w-0 flex-1">
        <Link href={newHit.id} className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <SystemBadge game={newHit} />
          <p className="text-sm font-medium text-gray-50">
            <Highlight attribute="game" hit={newHit} />
          </p>
          <p className="truncate text-sm text-gray-500">
            <Highlight attribute="console" hit={newHit} />
          </p>
          <Badge game={newHit} />
        </Link>
      </div>
    </div>
  );
};
