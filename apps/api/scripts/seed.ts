import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { customSeed } from "./customSeed";

if (require.main === module) {
  dotenv.config();

  seed().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

async function seed() {
  console.info("Seeding database...");

  const client = new PrismaClient();
  const data = {
    username: "admin",
    password: "b85b254079adffd7590a",
    roles: ["user"],
  };
  await client.user.upsert({
    where: {
      username: data.username,
    },
    update: {},
    create: data,
  });
  void client.$disconnect();

  console.info("Seeding database with custom seed...");
  customSeed();

  console.info("Seeded database successfully");
}
