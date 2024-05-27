import express from "express";
import {
  addAdmin,
  removeAdminFromDb,
  removeAsAdmin,
  updateAdminDetails,
  getAllAdmins,
  makeAdmin,
} from "../controller/adminController.js";
import isUser from "../middleware/validateTokenHandler.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/all", isUser, isAdmin, getAllAdmins);

router.post("/add", isUser, isAdmin, addAdmin); //takes in username, email, password

router.delete("/remove-from-db/:email", isUser, isAdmin, removeAdminFromDb); //takes in email of admin to be removed from db in the url and current user's email and password in the body

router.put("/remove-as-admin/:email", isUser, isAdmin, removeAsAdmin); //takes in email of admin to be removed as admin in the url and current user's email and password in the body

router.put("/update/:email", isUser, isAdmin, updateAdminDetails); //takes in email of admin to be updated in the url and current user's email and password in the body and newUsername, newEmail and newPassword in the body

router.put("/make-admin/:username", isUser, isAdmin, makeAdmin); //takes in username of user to be made admin in the url and current user's email and password in the body

export default router;
