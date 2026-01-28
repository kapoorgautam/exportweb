import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    const { type, data } = await request.json();

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Missing environment variables: EMAIL_USER or EMAIL_PASS');
        return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // This should be gautamkapoor512@gmail.com
            pass: process.env.EMAIL_PASS,
        },
    });

    const adminEmail = 'gautamkapoor512@gmail.com'; // Admin receives details here
    const senderName = 'Canzzy';
    const senderAddress = `"${senderName}" <${process.env.EMAIL_USER}>`;

    try {
        let adminSubject = '';
        let adminHtml = '';
        let userSubject = '';
        let userHtml = '';
        let userEmail = '';

        // 1. Prepare Admin Email Content
        if (type === 'newsletter') {
            adminSubject = 'New Newsletter Subscription';
            adminHtml = `<p>New subscriber: <strong>${data.email}</strong></p>`;
            userEmail = data.email;
            userSubject = 'Welcome to the Tangy Revolution!';
            userHtml = `
                <div style="font-family: sans-serif; color: #333;">
                    <h1 style="color: #65a30d;">Welcome to the Family!</h1>
                    <p>Hey there,</p>
                    <p>Thanks for subscribing to Canzzy. Get ready for exclusive flavor drops and chatpata updates!</p>
                    <p>Stay Tangy,<br>Team Canzzy</p>
                </div>
            `;
        } else if (type === 'contact') {
            adminSubject = `Contact Inquiry: ${data.name}`;
            adminHtml = `
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Type:</strong> ${data.inquiryType}</p>
                <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
                <p><strong>Quantity:</strong> ${data.quantity || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p>${data.message}</p>
            `;
            userEmail = data.email;
            userSubject = 'We received your message! | Canzzy';
            userHtml = `
                <div style="font-family: sans-serif; color: #333;">
                    <h1 style="color: #65a30d;">Hello ${data.name}!</h1>
                    <p>Thanks for reaching out. We have received your inquiry regarding <strong>${data.inquiryType}</strong> orders.</p>
                    <p>Our team will get back to you within 24 hours.</p>
                    <p>Cheers,<br>Team Canzzy</p>
                </div>
            `;
        } else if (type === 'inquiry') {
            adminSubject = `Product Inquiry: ${data.productName}`;
            adminHtml = `
                <h3>New Product Inquiry</h3>
                <p><strong>Product:</strong> ${data.productName}</p>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Message:</strong></p>
                <p>${data.message}</p>
            `;
            userEmail = data.email;
            userSubject = `Thanks for your interest in ${data.productName} | Canzzy`;
            userHtml = `
                <div style="font-family: sans-serif; color: #333;">
                    <h1 style="color: #65a30d;">Great Choice!</h1>
                    <p>Hi ${data.name},</p>
                    <p>We're thrilled you're interested in <strong>${data.productName}</strong>. It's one of our favorites!</p>
                    <p>We'll send you the pricing and catalogue details shortly.</p>
                    <p>Stay Tangy,<br>Team Canzzy</p>
                </div>
            `;
        }

        // 2. Send Email to Admin (You)
        await transporter.sendMail({
            from: senderAddress,
            to: adminEmail,
            subject: `[Admin] ${adminSubject}`,
            html: adminHtml,
        });

        // 3. Send Auto-Reply to User (if email exists)
        if (userEmail) {
            await transporter.sendMail({
                from: senderAddress,
                to: userEmail,
                subject: userSubject,
                html: userHtml,
            });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Email send failed:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to send email',
            details: error.response || 'No details'
        }, { status: 500 });
    }
}
