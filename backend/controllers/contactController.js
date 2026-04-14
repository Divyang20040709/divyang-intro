const { body, validationResult } = require("express-validator");
const { Resend } = require("resend");

// Initialize Resend with API Key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

exports.validateContact = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("message")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Message must be at least 10 characters"),
];

exports.submitContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message } = req.body;

  // Debug log for incoming contact requests
  console.log("📩 Incoming contact:", { name, email });

  try {
    // Send email using Resend API
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "divyangsolanki2004@gmail.com",
      reply_to: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;padding:20px;line-height:1.6;color:#333;">
          <h2 style="color:#00e5ff;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;">${message}</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (err) {
    // Log the full error for debugging
    console.error("❌ Resend API Error:", err);

    return res.status(500).json({
      success: false,
      error: "Failed to send message",
    });
  }
};