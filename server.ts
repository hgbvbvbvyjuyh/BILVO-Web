import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import nodemailer from 'nodemailer';

const PORT = 3000;
const app = express();

// Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Load Firebase configuration
let firebaseConfig: any = null;
try {
  const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
} catch (err) {
  console.warn('Could not read firebase-applet-config.json:', err);
}

// Initialize Firebase
let db: any = null;
if (firebaseConfig && firebaseConfig.apiKey) {
  try {
    const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = firebaseConfig.firestoreDatabaseId
      ? getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId)
      : getFirestore(firebaseApp);
    console.log('Firebase Firestore initialized successfully with database:', firebaseConfig.firestoreDatabaseId || '(default)');
  } catch (err) {
    console.error('Failed to initialize Firebase Firestore:', err);
  }
}

// In-memory rate limiting map (IP -> Array of request timestamps)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 6;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

// Helper: send notification email via available server methods
async function sendNotificationEmail(lead: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  companyWebsite?: string;
  role: string;
  companySize: string;
  annualRevenue: string;
  projectBudget: string;
  howCanWeHelp: string;
  aiGoals: string[];
  additionalNotes?: string;
  submittedAt: string;
}) {
  const recipientEmail = process.env.NOTIFICATION_EMAIL || 'knmili2000@gmail.com';
  const emailSubject = 'New AI Strategy Session Request — Bilvo Ai';

  const plainTextBody = `
NEW AI STRATEGY SESSION REQUEST — BILVO AI
=====================================================
A new strategy session request was submitted through the Bilvo Ai website.

LEAD DETAILS:
- Full Name: ${lead.firstName} ${lead.lastName}
- Email: ${lead.email}
- Company: ${lead.companyName}
- Company Website: ${lead.companyWebsite || 'Not provided'}
- Role: ${lead.role}
- Company Size: ${lead.companySize}
- Annual Revenue: ${lead.annualRevenue}
- Project Budget: ${lead.projectBudget}
- AI Goals / Focus: ${lead.aiGoals.length > 0 ? lead.aiGoals.join(', ') : 'None specified'}

REQUEST / MESSAGE:
${lead.howCanWeHelp}

ADDITIONAL NOTES:
${lead.additionalNotes || 'None'}

SUBMISSION DETAILS:
- Submission Date & Time: ${lead.submittedAt}
- Document ID: ${lead.id}
- Source: Bilvo Ai Website (Lead Capture System)
=====================================================
`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #0F172A; background-color: #F8FAFC; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0F172A; color: #FFFFFF; padding: 24px 32px; border-bottom: 3px solid #2563EB; }
    .header h2 { margin: 0; font-size: 20px; font-weight: 700; }
    .badge { display: inline-block; background: #2563EB; color: #FFFFFF; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; margin-top: 8px; }
    .content { padding: 32px; }
    .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #2563EB; margin-bottom: 12px; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    td { padding: 8px 0; font-size: 14px; vertical-align: top; }
    td.label { color: #64748B; width: 38%; font-weight: 500; }
    td.value { color: #0F172A; font-weight: 600; }
    .message-box { background: #F1F5F9; border-left: 4px solid #2563EB; padding: 14px 18px; border-radius: 6px; font-size: 14px; color: #334155; margin-bottom: 24px; white-space: pre-wrap; }
    .footer { background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 16px 32px; font-size: 12px; color: #64748B; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>New AI Strategy Session Request</h2>
      <span class="badge">Bilvo Ai Lead Capture</span>
    </div>
    <div class="content">
      <div class="section-title">Prospect Details</div>
      <table>
        <tr><td class="label">Full Name:</td><td class="value">${lead.firstName} ${lead.lastName}</td></tr>
        <tr><td class="label">Email Address:</td><td class="value"><a href="mailto:${lead.email}" style="color: #2563EB; text-decoration: none;">${lead.email}</a></td></tr>
        <tr><td class="label">Company Name:</td><td class="value">${lead.companyName}</td></tr>
        <tr><td class="label">Company Website:</td><td class="value">${lead.companyWebsite ? `<a href="${lead.companyWebsite.startsWith('http') ? lead.companyWebsite : 'https://' + lead.companyWebsite}" style="color: #2563EB;">${lead.companyWebsite}</a>` : 'Not provided'}</td></tr>
        <tr><td class="label">Role:</td><td class="value">${lead.role}</td></tr>
        <tr><td class="label">Company Size:</td><td class="value">${lead.companySize}</td></tr>
        <tr><td class="label">Annual Revenue:</td><td class="value">${lead.annualRevenue}</td></tr>
        <tr><td class="label">Project Budget:</td><td class="value">${lead.projectBudget}</td></tr>
        <tr><td class="label">AI Improvement Goals:</td><td class="value">${lead.aiGoals.length > 0 ? lead.aiGoals.join(', ') : 'None specified'}</td></tr>
      </table>

      <div class="section-title">How Can We Help?</div>
      <div class="message-box">${lead.howCanWeHelp}</div>

      ${lead.additionalNotes ? `
        <div class="section-title">Additional Context</div>
        <div class="message-box">${lead.additionalNotes}</div>
      ` : ''}

      <div class="section-title">Submission Metadata</div>
      <table>
        <tr><td class="label">Submitted At:</td><td class="value">${lead.submittedAt}</td></tr>
        <tr><td class="label">Database Record ID:</td><td class="value" style="font-family: monospace; font-size: 12px;">${lead.id}</td></tr>
        <tr><td class="label">Lead Origin:</td><td class="value">Bilvo Ai Website</td></tr>
      </table>
    </div>
    <div class="footer">
      This notification was automatically generated by Bilvo Ai lead routing system.
    </div>
  </div>
</body>
</html>
`;

  let delivered = false;

  // Option 1: Resend API (recommended, modern HTTPS API)
  if (process.env.RESEND_API_KEY) {
    try {
      const fromAddress = process.env.RESEND_FROM_EMAIL || 'Bilvo Ai <onboarding@resend.dev>';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY.trim()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [recipientEmail],
          reply_to: lead.email,
          subject: emailSubject,
          text: plainTextBody,
          html: htmlBody
        })
      });
      if (res.ok) {
        console.log('Email delivered successfully via Resend to', recipientEmail);
        delivered = true;
      } else {
        const errorData = await res.text();
        console.warn('Resend dispatch error response, will attempt fallback:', errorData);
      }
    } catch (e) {
      console.warn('Resend dispatch error:', e);
    }
  }

  // Option 2: Custom SMTP via Nodemailer (if configured)
  if (!delivered && process.env.SMTP_HOST && process.env.SMTP_USER) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Bilvo Ai" <${process.env.SMTP_USER}>`,
        to: recipientEmail,
        replyTo: lead.email,
        subject: emailSubject,
        text: plainTextBody,
        html: htmlBody,
      });

      console.log('Email delivered successfully via SMTP to', recipientEmail);
      delivered = true;
    } catch (e) {
      console.warn('SMTP dispatch error:', e);
    }
  }

  // Option 3: Server-side FormSubmit Transactional Relay
  // Dispatched exclusively by our server (no API keys exposed to browser)
  if (!delivered) {
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Bilvo-Ai-Backend/1.0'
        },
        body: JSON.stringify({
          _subject: emailSubject,
          _template: 'table',
          "Full Name": `${lead.firstName} ${lead.lastName}`,
          "Email": lead.email,
          "Company": lead.companyName,
          "Company Website": lead.companyWebsite || 'Not provided',
          "Role": lead.role,
          "Company Size": lead.companySize,
          "Annual Revenue": lead.annualRevenue,
          "Project Budget": lead.projectBudget,
          "Improvement Goals": lead.aiGoals.length > 0 ? lead.aiGoals.join(', ') : 'None specified',
          "How Can We Help": lead.howCanWeHelp,
          "Additional Notes": lead.additionalNotes || 'None',
          "Submission Date": lead.submittedAt,
          "Document ID": lead.id,
          "Lead Source": "Bilvo Ai Website"
        })
      });

      if (res.ok) {
        console.log('Email delivered successfully via FormSubmit server relay to', recipientEmail);
        delivered = true;
      } else {
        const text = await res.text();
        console.warn('FormSubmit server relay response:', text);
      }
    } catch (e) {
      console.error('Server-side email relay failed:', e);
    }
  }

  return delivered;
}

// -------------------------------------------------------------
// API Routes
// -------------------------------------------------------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    databaseReady: !!db,
    version: '1.0.0'
  });
});

const handleStrategySession = async (req: express.Request, res: express.Response) => {
  try {
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip || 'unknown';

    // 1. Anti-abuse / rate limiting
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please wait a few minutes before submitting again.'
      });
    }

    // 2. Honeypot check (anti-bot)
    if (req.body._gotcha || req.body.website_hp) {
      // Silently accept bot submission without processing
      return res.status(200).json({
        success: true,
        message: "Thank you! Your request has been submitted successfully. We'll be in touch soon."
      });
    }

    // 3. Extract and sanitize fields
    const firstName = typeof req.body.firstName === 'string' ? req.body.firstName.trim() : '';
    const lastName = typeof req.body.lastName === 'string' ? req.body.lastName.trim() : '';
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const companyName = typeof req.body.companyName === 'string' ? req.body.companyName.trim() : '';
    const companyWebsite = typeof req.body.companyWebsite === 'string' ? req.body.companyWebsite.trim() : '';
    const role = typeof req.body.role === 'string' ? req.body.role.trim() : '';
    const companySize = typeof req.body.companySize === 'string' ? req.body.companySize.trim() : '';
    const annualRevenue = typeof req.body.annualRevenue === 'string' ? req.body.annualRevenue.trim() : '';
    const projectBudget = typeof req.body.projectBudget === 'string' ? req.body.projectBudget.trim() : '';
    const howCanWeHelp = typeof req.body.howCanWeHelp === 'string' ? req.body.howCanWeHelp.trim() : '';
    const additionalNotes = typeof req.body.additionalNotes === 'string' ? req.body.additionalNotes.trim() : '';
    const aiGoals = Array.isArray(req.body.aiGoals)
      ? req.body.aiGoals.filter((g: any) => typeof g === 'string').map((g: string) => g.trim())
      : [];

    // 4. Server-side validation of required fields
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!firstName || firstName.length > 80) {
      return res.status(400).json({ success: false, error: 'Valid first name is required.' });
    }
    if (!lastName || lastName.length > 80) {
      return res.status(400).json({ success: false, error: 'Valid last name is required.' });
    }
    if (!email || !emailRegex.test(email) || email.length > 120) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }
    if (!companyName || companyName.length > 120) {
      return res.status(400).json({ success: false, error: 'Company name is required.' });
    }
    if (!role) {
      return res.status(400).json({ success: false, error: 'Please select your role.' });
    }
    if (!companySize) {
      return res.status(400).json({ success: false, error: 'Please select your company size.' });
    }
    if (!annualRevenue) {
      return res.status(400).json({ success: false, error: 'Please select annual revenue.' });
    }
    if (!projectBudget) {
      return res.status(400).json({ success: false, error: 'Please select project budget.' });
    }
    if (!howCanWeHelp || howCanWeHelp.length < 5 || howCanWeHelp.length > 5000) {
      return res.status(400).json({ success: false, error: 'Please describe how we can help (minimum 5 characters).' });
    }

    const submittedAt = new Date().toISOString();
    let documentId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // 5. Save to Firestore collection "strategy_session_requests"
    if (db) {
      try {
        const docRef = await addDoc(collection(db, 'strategy_session_requests'), {
          firstName,
          lastName,
          email,
          companyName,
          companyWebsite: companyWebsite || '',
          role,
          companySize,
          annualRevenue,
          projectBudget,
          howCanWeHelp,
          aiGoals,
          additionalNotes: additionalNotes || '',
          status: 'new',
          createdAt: submittedAt,
          source: 'Bilvo Ai Website'
        });
        documentId = docRef.id;
        console.log(`Saved strategy session request to Firestore with document ID: ${documentId}`);
      } catch (dbErr) {
        console.error('Firestore save failed:', dbErr);
        // Even if Firestore has transient connection issues, we still log and dispatch email
      }
    } else {
      console.warn('Firestore database is not configured. Proceeding with email notification.');
    }

    // 6. Send email notification asynchronously
    const leadData = {
      id: documentId,
      firstName,
      lastName,
      email,
      companyName,
      companyWebsite,
      role,
      companySize,
      annualRevenue,
      projectBudget,
      howCanWeHelp,
      aiGoals,
      additionalNotes,
      submittedAt
    };

    // Execute notification email dispatch
    sendNotificationEmail(leadData).catch(err => {
      console.error('Error in sendNotificationEmail background task:', err);
    });

    return res.status(200).json({
      success: true,
      message: "Thank you! Your request has been submitted successfully. We'll be in touch soon.",
      id: documentId
    });
  } catch (err: any) {
    console.error('Strategy session submission error:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your request. Please try again.'
    });
  }
};

// Consultation / Strategy Session Submission Endpoints
app.post('/api/strategy-session', handleStrategySession);
app.post('/api/consultation', handleStrategySession);

// -------------------------------------------------------------
// Vite Middleware / Static Asset Serving
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bilvo Ai Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
