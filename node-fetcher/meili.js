require("dotenv").config({ path: "../.env" });

const { MeiliSearch } = require("meilisearch");

const client = new MeiliSearch({
  host: "https://meili.iamsaravieira.com",
  apiKey: process.env.ADMIN_KEY,
});

const init = async () => {
  const a = await client
    .index("cheats")
    .updateFilterableAttributes(["console", "game"]);
  console.log(a);
};

init();
