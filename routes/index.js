const { Router } = require("express");
const errorHandler = require("../middleware/errorHandler");

const rootRoute = require("./rootRoute");
const userRoute = require("./userRoute");
const conversationRoute = require("./conversationRoute");

const router = Router();

router.use(rootRoute);
router.use("/user", userRoute);
router.use("/conversation", conversationRoute);

// error handler all routes
router.use(errorHandler);

module.exports = router;
