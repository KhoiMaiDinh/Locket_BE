const { Router } = require("express");

// initial root routes
const router = Router();

// root routes
router.get("/", (req, res) => {
  res.json({
    message: "Locket 2.0 APIs welcome ^^",
  });
});

module.exports = router;
