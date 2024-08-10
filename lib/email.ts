import nodemailer from 'nodemailer';

// Create a nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
     tls: {
        rejectUnauthorized: false // Disable certificate verification
    }
});

/**
 * Generate a random verification token.
 * You can customize the length and characters used in the token as per your requirements.
 */
export function generateVerificationToken(): string {
    const tokenLength = 32;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}

/**
 * Send a verification email to the user with a verification link.
 * @param recipientEmail The recipient's email address.
 * @param verificationLink The verification link containing the verification token.
 */
export async function sendVerificationEmail(recipientEmail: any, verificationLink: string): Promise<void> {
    const mailOptions = {
        from: process.env.SMTP_USERNAME, // Sender address
        to: recipientEmail, // Recipient address
        subject: 'Verify Your Email Address',
        html: `Click the following link to verify your email address: <a href="${verificationLink}">${verificationLink}</a>`,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send verification email');
    }
}
