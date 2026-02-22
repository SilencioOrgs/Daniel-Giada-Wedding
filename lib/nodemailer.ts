import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    const mailOptions = {
        from: `"Wedding RSVP" <${process.env.GMAIL_USER}>`,
        to,
        subject,
        html,
    };

    return transporter.sendMail(mailOptions);
}
