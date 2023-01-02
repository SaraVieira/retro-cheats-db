import FileSaver from "file-saver";
import { json2toml } from "../utils/json2toml";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useRomName } from "../utils/useRomName";
import { Cheat, Hit } from "../utils/meili";
import { fileSaverOpts } from "../pages/[id]";

export const SingleCheatDownloadModal = ({
  cheat,
  game,
  id,
}: {
  game: Hit;
  cheat: Cheat;
  id: string;
}) => {
  const [client, setClient] = useState(false);
  const { romName, onChange } = useRomName({ game });

  useEffect(() => {
    setClient(true);
  }, []);

  const downloadAsCht = () => {
    var blob = new Blob([json2toml({ code: cheat })], {
      type: "text/cht;charset=us-ascii",
    });
    FileSaver.saveAs(blob, `${romName}.cht`);
  };

  const downloadAsTxt = () => {
    var blob = new Blob(
      [
        `
  ${cheat.code} ${cheat.desc}
      `,
      ],
      fileSaverOpts
    );
    FileSaver.saveAs(blob, `${romName}.txt`);
  };

  return client
    ? createPortal(
        <>
          <input type="checkbox" id={id} className="modal-toggle" />
          <label htmlFor={id} className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h3 className="text-lg font-bold">Rom Name:</h3>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={romName}
                onChange={onChange}
              />
              <div className={`mt-6 ${cheat.code && "btn-group"}`}>
                <button className="btn" onClick={downloadAsCht}>
                  Download as CHT
                </button>
                {cheat.code && (
                  <button className="btn" onClick={downloadAsTxt}>
                    Download as TXT
                  </button>
                )}
              </div>
            </label>
          </label>
        </>,
        document.getElementsByTagName("body")[0]
      )
    : null;
};
