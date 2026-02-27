import express from "express";
import fs from "fs";
import { marked } from "marked";
import path from "path";
import { fileURLToPath } from "url";

// Reconstitution de __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Création de l'application Express
const app = express();

// Port d'écoute
const PORT = process.env.PORT || 3000;

// Chemin vers le dossier des notes
const NOTES_DIR = path.join(__dirname, "notes");

// Route racine
app.get("/", (req, res) => {
  res.send("API des notes de cours");
});

// Route liste des notes
app.get("/notes", (req, res) => {
  if (!fs.existsSync(NOTES_DIR)) {
    return res.status(500).send("Dossier notes introuvable");
  }

  const files = fs.readdirSync(NOTES_DIR);

  const notes = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(".md", ""));

  res.json(notes);
});

// Route dynamique
app.get("/notes/:slug", (req, res) => {
  const slug = req.params.slug;
  const filePath = path.join(NOTES_DIR, slug + ".md");

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Note non trouvée");
  }

  const markdownContent = fs.readFileSync(filePath, "utf-8");
  const htmlContent = marked(markdownContent);

  res.send(htmlContent);
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});