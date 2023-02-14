const router = require("express").Router();
const store = require("../db/store");

router.get("/notes", async (req, res) => {
  try {
    const notes = await store.getNotes();

    return res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/notes", async (req, res) => {
  try {
    const newNote = await store.setNotes(req.body);

    return res.json(newNote);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/notes/:id", async (req, res) => {
  try {
    await store.deleteNote(req.params.id);
  } catch (err) {
    return res.status(500).json(err);
  }

  res.json({ ok: true });
});

module.exports = router;
