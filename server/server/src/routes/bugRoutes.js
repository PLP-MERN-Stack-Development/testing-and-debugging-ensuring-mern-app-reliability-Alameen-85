const express = require("express");
const {
    createBug,
    getBugs,
    updateBug,
    deleteBug,
} = require("../controllers/bugController");

const router = express.Router();

router.post("/", createBug);
router.get("/", getBugs);
router.put("/:id", updateBug);
router.delete("/:id", deleteBug);

module.exports = router;
