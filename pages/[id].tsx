import { GetServerSidePropsContext } from "next";
import { Cheat, client } from "../utils/meili";
import type { Hit } from "../utils/meili";
import FileSaver from "file-saver";
import { SingleCheatDownloadModal } from "../components/SingleCheatDownloadModal";
import { Badge } from "../components/Badge";

export const fileSaverOpts = {
  type: "text/plain;charset=utf-8",
};

const Game = ({ game }: { game: Hit }) => {
  const downloadAllAsCHT = () => {
    var blob = new Blob([game.original], fileSaverOpts);
    FileSaver.saveAs(blob, `${game.game}.cht`);
  };
  const downloadAllAsTxt = () => {
    var blob = new Blob(
      [
        `
${game.cheats
  .map(
    (cheat) =>
      `${cheat.code} ${cheat.desc}

`
  )
  .join("")}
    `,
      ],
      fileSaverOpts
    );
    FileSaver.saveAs(blob, `${game.game}.txt`);
  };
  const hasCodes = game.cheats.some((c) => c.code);
  return (
    <>
      <div className="flex justify-between items-top mb-8">
        <div>
          <h1 className="text-6xl mb-0">{game.game}</h1>
          <h2 className="text-gray-300 text-lg">{game.console}</h2>
          <Badge game={game} />
        </div>
        <div className={`${hasCodes && "btn-group"}`}>
          {hasCodes && (
            <button className="btn" onClick={downloadAllAsTxt}>
              Download all as TXT
            </button>
          )}
          <button className="btn" onClick={downloadAllAsCHT}>
            Download all as CHT
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-start">
        {game.cheats.map((cheat, i) => (
          <div
            tabIndex={0}
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div className="collapse-title text-xl font-medium">
              {cheat.desc}
            </div>
            <div className="collapse-content">
              <div className="mockup-code relative">
                <label
                  htmlFor={`${game.id}-${i}`}
                  className="btn absolute top-2 right-2 z-10"
                >
                  Download
                </label>

                <SingleCheatDownloadModal
                  cheat={cheat}
                  id={`${game.id}-${i}`}
                  game={game}
                />

                {Object.keys(cheat).map((k) => (
                  <pre>
                    <code>
                      {k}: {cheat[k as keyof Cheat].toString()}
                    </code>
                  </pre>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Game;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.id as string;
  const game = await client.getDocument(id);
  return {
    props: { game },
  };
}
