import { GetServerSidePropsContext } from "next";
import { client } from "../utils/meili";
import type { Hit } from "../utils/meili";
import FileSaver from "file-saver";
import { SingleCheatDownloadModal } from "../components/SingleCheatDownloadModal";
import { Badge } from "../components/Badge";
import Head from "next/head";
import { Copy } from "../components/Copy";
import { SingleViewModal } from "../components/SingleCheatViewModal";
import { SystemBadge } from "../components/SystemBadge";

export const fileSaverOpts = {
  type: "text/plain;charset=us-ascii",
};

const Game = ({ game }: { game: Hit }) => {
  const downloadAllAsCHT = () => {
    var blob = new Blob([game.original], {
      type: "text/cht;charset=us-ascii",
    });
    console.log(URL.createObjectURL(blob));
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
      <Head>
        <title>RetroCheats DB - {game.game}</title>
      </Head>
      <div className="sm:flex justify-between items-top mb-8 gap-6">
        <div>
          <h1 className="text-5xl sm:text-6xl mb-0">{game.game}</h1>
          <h2 className="text-gray-300 text-lg">{game.console}</h2>
          <div className="mr-4 inline-block">
            <Badge game={game} />{" "}
          </div>
          <SystemBadge game={game} />
        </div>
        <div className={`mt-6 sm:mt-0 ${hasCodes && "btn-group"}`}>
          {hasCodes && (
            <button className="btn min-w-[160px]" onClick={downloadAllAsTxt}>
              Download all as TXT
            </button>
          )}
          <button className="btn min-w-[160px]" onClick={downloadAllAsCHT}>
            Download all as CHT
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Description</th>
              <th>Code</th>
              <th className="hidden sm:table-cell"></th>
              <th></th>
              {game.cheats.some((c) => c.code) && <th></th>}
            </tr>
          </thead>
          <tbody>
            {game.cheats.map((cheat, i) => (
              <tr key={i}>
                <td className="max-w-[200px] overflow-auto">{cheat.desc}</td>
                <td className="hidden sm:table-cell max-w-[200px] overflow-auto relative">
                  {cheat.code ? cheat.code : "-"}
                </td>
                {game.cheats.some((c) => c.code) && (
                  <td>
                    <Copy text={cheat.code} />
                  </td>
                )}
                <td>
                  <label
                    className="cursor-pointer"
                    htmlFor={`${game.id}-${i}-view`}
                  >
                    View Cheat
                  </label>

                  <SingleViewModal
                    cheat={cheat}
                    id={`${game.id}-${i}-view`}
                    game={game}
                  />
                </td>
                <td>
                  <label
                    className="cursor-pointer"
                    htmlFor={`${game.id}-${i}-download`}
                  >
                    Download
                  </label>

                  <SingleCheatDownloadModal
                    cheat={cheat}
                    id={`${game.id}-${i}-download`}
                    game={game}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
