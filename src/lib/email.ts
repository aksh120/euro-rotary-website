import nodemailer from "nodemailer";

const getTransporter = () => {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587");
  const secure = process.env.SMTP_SECURE === "true";

  console.log(
    `[Email] Creating transporter: ${host}:${port} (Secure: ${secure})`,
  );

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },

    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
};

export const sendNewsletter = async (
  to: string[],
  subject: string,
  content: string,
) => {
  console.log("[Email] Sending to:", to.length, "recipients");

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP credentials not configured (SMTP_USER/SMTP_PASS)");
  }

  const summary = content.replace(/<[^>]*>/g, "").substring(0, 100).trim();
  const preheaderText = `${subject} - ${summary} | Euro Rotary Club`;
  const padding = "&zwnj;&nbsp;".repeat(150);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Arial', sans-serif; background-color: #050505; color: #ffffff; padding: 0; margin: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #111; border: 1px solid #333; }
            .header { background-color: #000; padding: 20px; text-align: center; border-bottom: 2px solid #D4AF37; }
            .logo { color: #fff; font-size: 24px; font-weight: bold; letter-spacing: 2px; text-decoration: none; }
            .logo span { color: #D4AF37; }
            .content { padding: 40px 20px; line-height: 1.6; color: #ccc; }
            .footer { background-color: #000; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #222; }
        </style>
    </head>
    <body>
        <div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
            ${preheaderText}
            ${padding}
        </div>
        <div class="container">
            <div class="header" style="text-align: center; padding: 30px; background-color: #000;">
                <a href="https://rotary.akimbolabs.site" style="text-decoration: none; display: inline-block;">
                    <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                        <tr>
                            <td style="vertical-align: middle;">
                                <span style="font-family: 'Arial Black', sans-serif; font-size: 28px; font-weight: 900; letter-spacing: 2px; color: #D4AF37;">EURO</span>
                                <span style="font-family: 'Arial', sans-serif; font-size: 28px; font-weight: 300; letter-spacing: 2px; color: #FFFFFF;">ROTARY</span>
                            </td>
                        </tr>
                    </table>
                </a>
            </div>
            <div class="content">
                <h2 style="color: #fff; margin-top: 0;">${subject}</h2>
                ${content.replace(/\n/g, "<br/>")}
                
                <p style="margin-top: 30px;">
                    See you on the road,<br/>
                    The Euro Rotary Team
                </p>
            </div>
            <div class="footer">
                <p>&copy; 2026 Euro Rotary. All rights reserved.</p>
                <a href="#" style="color: #666; text-decoration: underline;">Unsubscribe</a>
            </div>
        </div>
    </body>
    </html>
    `;

  try {
    const transporter = getTransporter();

    try {
      await transporter.verify();
      console.log("[Email] Server connection verified");
    } catch (verifyError: any) {
      console.error(
        "[Email] Connection Verification Failed:",
        verifyError.message,
      );
    }

    const info = await transporter.sendMail({
      from: `"Euro Rotary" <${process.env.SMTP_USER}>`,
      bcc: to,
      subject: subject,
      html: html,
    });

    console.log("[Email] ✓ Sent! ID:", info.messageId);
    return info;
  } catch (error: any) {
    console.error("[Email] ✗ Fatal Error:", error.message);
    throw error;
  }
};
