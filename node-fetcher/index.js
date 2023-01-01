require("dotenv").config({ path: "../.env" });

const { MeiliSearch } = require("meilisearch");
const TOML = require("@iarna/toml");
const path = require("path");
const fs = require("fs");
const { v5: uuidv5 } = require("uuid");

const client = new MeiliSearch({
  host: "https://meili.iamsaravieira.com",
  apiKey: process.env.ADMIN_KEY,
});

async function fromDir(startPath, filter) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter); //recurse
    } else if (filename.endsWith(".cht")) {
      const cheat = files[i];
      const consol = filename.split("/")[1];
      const a = fs
        .readFileSync(filename, "utf8")
        .split("\n")
        .filter((a) => a !== "/n")
        .filter((a) => a)
        .join("\n");

      if (!a) return;

      const json = TOML.parse(a);
      const formatted = Array.from(Array(parseInt(json.cheats)).keys()).reduce(
        (acc, curr) => {
          const a = Object.keys(json)
            .filter((a) => a.startsWith(`cheat${curr}_`))
            .map((b) => ({
              [b]: json[b],
            }));

          acc = [
            ...acc,
            a.reduce((acc1, curr1) => {
              let key = Object.keys(curr1)[0].split(`cheat${curr}_`)[1];

              acc1[key] = Object.values(curr1)[0];
              return acc1;
            }, {}),
          ];

          return acc;
        },
        []
      );
      const id = uuidv5(filename, uuidv5.URL);
      try {
        await client.index("cheats").getDocument(id);
      } catch {
        await client.index("cheats").addDocuments([
          {
            id,
            console: consol,
            game: cheat.split(".cht")[0],
            cheats: formatted,
            original: fs.readFileSync(filename, "utf8"),
          },
        ]);
        console.log(`added ${cheat}`);
      }
    }
  }
}
// client.deleteIndex("cheats");
// client.createIndex("cheats");
// client.index("cheats").updateFilterableAttributes(["console", "game"]);

fromDir("./cht");
// client.index("cheats").search("kirby");
// client
//   .getTasks({
//     indexUids: ["cheats"],
//     statuses: ["enqueued"],
//     limit: 200,
//   })
