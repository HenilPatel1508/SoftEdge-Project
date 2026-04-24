import PDFDocument from "pdfkit";
import { Order } from "../models/orderModel.js";

export const downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("products.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    console.log(order);
    

    const doc = new PDFDocument({ margin: 40 });

    // Headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`
    );

    doc.pipe(res);

    // 🏢 Company Name
    doc
      .fontSize(22)
      .fillColor("#333")
      .text("E-Commerce Pvt Ltd", { align: "center" });

    doc.moveDown(0.5);
    doc
      .fontSize(10)
      .fillColor("gray")
      .text("Email: support@myshop.com", { align: "center" });

    doc.moveDown();

    // 🧾 Invoice Title
    doc
      .fontSize(18)
      .fillColor("#000")
      .text("INVOICE", { align: "center", underline: true });

    doc.moveDown();

    // 📌 Order Info
    doc.fontSize(11).fillColor("#000");
    doc.text(`Order ID: ${order._id}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`);

    doc.moveDown();

    // 👤 Customer Info
    doc.text(
      `Customer: ${order.user.firstname} ${order.user.lastname}`
    );
    doc.text(`Email: ${order.user.email}`);

    doc.moveDown();

    // 📦 Table Header
    doc.moveTo(40, doc.y).lineTo(550, doc.y).stroke();

    doc.fontSize(12).text("Product", 40, doc.y + 5);
    doc.text("Qty", 300, doc.y + 5);
    doc.text("Price", 350, doc.y + 5);
    doc.text("Total", 450, doc.y + 5);

    doc.moveDown();
    doc.moveTo(40, doc.y).lineTo(550, doc.y).stroke();

    // 📦 Product Rows
    let totalAmount = 0;

    order.products.forEach((item) => {
      const name = item.productId.productName;
      const qty = item.quantity;
      const price = item.productId.productPrice;
      const total = qty * price;

      totalAmount += total;

      doc.moveDown(0.5);
      doc.fontSize(10);

      doc.text(name, 40);
      doc.text(qty.toString(), 300);
      doc.text(`₹${price}`, 350);
      doc.text(`₹${total}`, 450);
    });

    doc.moveDown();
    doc.moveTo(40, doc.y).lineTo(550, doc.y).stroke();

    // 💰 Total Section
    doc.moveDown();
    doc.fontSize(14).text(`Grand Total  ₹${order.amount}`, {
    
    });

    doc.moveDown();

    // ✅ Footer
    doc
      .fontSize(10)
      .fillColor("gray")
      .text("Thank you for shopping with us!", { align: "center" });

    doc.end();
  } catch (error) {
    console.log("Invoice Error:", error);
    res.status(500).json({ message: error.message });
  }
};