require("dotenv").config();

const { MeiliSearch } = require("meilisearch");

const client = new MeiliSearch({
  host: "https://meili.iamsaravieira.com",
  apiKey: process.env.ADMIN_KEY,
});

const init = async () => {
  await client.deleteIndex("_finishedGames");
  await client.deleteIndex("Session");
  await client.deleteIndex("VerificationToken");
};

init();
