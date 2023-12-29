const express = require("express");

const router = express.Router();


///Get /todos
router.get("/todos", (req, res) => {
    res.status(200).json({ msg: "Get request to /api/todos" });
})

///Post /todos
router.post("/todos", (req, res) => {
    res.status(201).json({ msg: "Post request to /api/todos" });
})

///Delete /todos/:id
router.delete("/todos/:id", (req, res) => {
    res.status(201).json({ msg: "Delete request to /api/todos/:id" });
})

///Update /todos/:id
router.put("/todos/:id", (req, res) => {
    res.status(201).json({ msg: "Update request to /api/todos/:id" });
})



module.exports = router;