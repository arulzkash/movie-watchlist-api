import express from "express";
import {
  addToWatchlist,
  updateWatchlistItem,
  removeFromWatchlist,
} from "../controllers/watchlistController.js";
import { authMiddlleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidators.js";

const router = express.Router();

router.use(authMiddlleware);
router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);

router.put("/:id", updateWatchlistItem);
router.delete("/:id", removeFromWatchlist);

export default router;
