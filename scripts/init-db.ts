import { initScyllaDB } from "../lib/db/init-scylla";

async function main() {
  console.log("Starting DB initialization...");
  try {
    await initScyllaDB();
    console.log("DB initialization completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("DB initialization failed:", error);
    process.exit(1);
  }
}

main();
