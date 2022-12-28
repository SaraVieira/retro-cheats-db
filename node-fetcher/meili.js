const { MeiliSearch } = require("meilisearch");

const client = new MeiliSearch({
  host: "https://meili.iamsaravieira.com",
  apiKey:
    "fa906412bb8dcd11b44f8a8121ff4eeb282ec95f62d65957a392f0d5ba80fd1c20ab19f6f4d8102bf6bc2be8d32aa865d7ed2cc48b338ae6e00ac3c9385b2c2d",
});

const init = async () => {
  await client.deleteIndex("_finishedGames");
  await client.deleteIndex("Session");
  await client.deleteIndex("VerificationToken");
};

init();
