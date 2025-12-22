import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER || 'user',
        pass: process.env.SMTP_PASS || 'pass',
    },
});

export const sendConfirmationEmail = async (to: string, name: string, bib: string) => {
    const mailOptions = {
        from: process.env.SMTP_FROM || 'no-reply@example.com',
        to,
        subject: 'Registration Confirmed - Euro Rotary Event 2025',
        html: `
      <div style="background-color: #1a1a1a; color: #ffffff; padding: 40px; font-family: sans-serif;">
        <h1 style="color: #D4AF37;">Welcome to the Elite</h1>
        <p>Dear ${name},</p>
        <p>Your registration for the Euro Rotary Event 2025 has been confirmed.</p>
        <div style="background-color: #333; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #aaa; font-size: 12px; text-transform: uppercase;">Your Bib Number</p>
            <p style="margin: 10px 0 0 0; font-size: 32px; font-weight: bold; color: #D4AF37;">${bib}</p>
        </div>
        <p>We await your presence in Monaco.</p>
        <p style="margin-top: 40px; color: #666; font-size: 12px;">Euro Rotary Team</p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.warn("Email failed to send (likely due to missing credentials):", error);
    }
};
