import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Cheat, Hit } from "../utils/meili";
import { Copy } from "./Copy";

export const SingleViewModal = ({
  cheat,
  game,
  id,
}: {
  game: Hit;
  cheat: Cheat;
  id: string;
}) => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  const text = Object.keys(cheat).map(
    (k) => `${k}: ${cheat[k as keyof Cheat].toString()}`
  );

  return client
    ? createPortal(
        <>
          <input type="checkbox" id={id} className="modal-toggle" />
          <label htmlFor={id} className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <div className="mockup-code">
                <div className="absolute top-2 right-2 z-10 opacity-30 hover:opacity-100 transition">
                  <Copy text={text.join("\n")} />
                </div>
                {text.map((t) => (
                  <pre
                    className={
                      t.includes("code:")
                        ? "bg-warning text-warning-content"
                        : ""
                    }
                  >
                    <code>{t}</code>
                  </pre>
                ))}
              </div>
            </label>
          </label>
        </>,
        document.getElementsByTagName("body")[0]
      )
    : null;
};
