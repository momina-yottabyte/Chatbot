// import { OpenAIEmbeddings } from "@langchain/openai";
// import { Chroma } from "@langchain/community/vectorstores/chroma";
// import * as fs from "fs";
// import * as path from "path";

// async function loadDataset() {

//   const folderPath = path.join(__dirname, "../../dataset");

//   const files = fs.readdirSync(folderPath);

//   const docs = files.map(file => ({
//     pageContent: fs.readFileSync(path.join(folderPath, file), "utf8"),
//     metadata: { source: file }
//   }));

//   const embeddings = new OpenAIEmbeddings({
//     openAIApiKey: process.env.OPENAI_API_KEY,
//   });

//   await Chroma.fromDocuments(docs, embeddings, {
//     collectionName: "hrms_docs",
//   });

//   console.log("✅ Dataset loaded into vector DB");
// }

// loadDataset();
import * as dotenv from "dotenv";
dotenv.config();

import { OpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import * as fs from "fs";
import * as path from "path";

async function loadDataset() {
  try {
    // ✅ Debug check
    console.log("API KEY:", process.env.OPENAI_API_KEY ? "Loaded ✅" : "Missing ❌");

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is missing in .env");
    }

    const folderPath = path.join(__dirname, "../../dataset");

    if (!fs.existsSync(folderPath)) {
      throw new Error("Dataset folder not found");
    }

    const files = fs.readdirSync(folderPath);

    if (files.length === 0) {
      throw new Error("Dataset folder is empty");
    }

    const docs = files.map((file) => ({
      pageContent: fs.readFileSync(path.join(folderPath, file), "utf8"),
      metadata: { source: file },
    }));

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    await Chroma.fromDocuments(docs, embeddings, {
      collectionName: "hrms_docs",
    });

    console.log("✅ Dataset loaded into vector DB");
  } catch (error) {
    console.error("❌ Error loading dataset:", error.message);
  }
}

loadDataset();