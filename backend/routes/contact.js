const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

// POST /api/contact
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
    body("message")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Message must be at least 10 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    try {
      // Configure transporter — swap with your SMTP credentials in .env
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
        replyTo: email,
        subject: `New message from ${name}`,
        html: `
          <div style="font-family:monospace;padding:24px;background:#0d0f17;color:#c8d0e0;border-radius:8px;">
            <h2 style="color:#00e5ff;margin:0 0 16px">New Contact Message</h2>
            <p><strong style="color:#00e5ff">From:</strong> ${name} &lt;${email}&gt;</p>
            <hr style="border-color:#1a2030;margin:16px 0"/>
            <p style="line-height:1.8">${message.replace(/\n/g, "<br/>")}</p>
          </div>`,
      });

      res.json({ success: true, message: "Message sent successfully!" });
    } catch (err) {
      console.error("Mail error:", err.message);
      // Still return success in dev so UI works without SMTP configured
      if (process.env.NODE_ENV !== "production") {
        console.log("📧 [DEV] Would have sent:", { name, email, message });
        return res.json({ success: true, message: "Message logged (dev mode)" });
      }
      res.status(500).json({ error: "Failed to send message. Try again later." });
    }
  }
);

module.exports = router;
