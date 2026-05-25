import express from "express"
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js"
import { createOrder, getAllOrderAdmin, getAllUserOrder, getMyOrder, getSalesData, verifyPayment,deleteOrder } from "../controllers/orderController.js"

const router = express.Router()

router.post("/create-order",isAuthenticated,createOrder)
router.post("/verify-payment",isAuthenticated,verifyPayment)
router.get("/myorder",isAuthenticated,getMyOrder)
router.get("/all",isAuthenticated,isAdmin,getAllOrderAdmin)
router.get("/user-order/:userId",isAuthenticated,isAdmin,getAllUserOrder)
router.get("/sales",isAuthenticated,isAdmin,getSalesData)
router.delete("/delete/:id",isAuthenticated,isAdmin,deleteOrder);

export default router