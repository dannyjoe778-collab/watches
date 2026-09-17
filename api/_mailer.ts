import nodemailer, { type SendMailOptions } from 'nodemailer';

export interface FormSubmissionPayload {
  formType: 'consultation' | 'contact' | 'order' | 'newsletter';
  data: any;
}

// Lazy-initialized SMTP transporter for Zoho Mail
export function getZohoTransporter() {
  const host = process.env.EMAIL_SERVER_HOST || 'smtp.zoho.com';
  const port = Number(process.env.EMAIL_SERVER_PORT) || 465;
  const user = process.env.EMAIL_SERVER_USER || 'sales@aureliaandcrown.com';
  const pass = process.env.EMAIL_SERVER_PASSWORD || '';

  if (!pass) {
    console.warn('EMAIL_SERVER_PASSWORD is not defined in environment variables.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for port 465 (SSL), false for 587 (STARTTLS)
    auth: {
      user,
      pass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

export async function processFormSubmission(payload: FormSubmissionPayload) {
  const transporter = getZohoTransporter();
  const salesEmail = process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER || 'sales@aureliaandcrown.com';

  const { formType, data } = payload;
  const timestamp = new Date().toUTCString();

  let subject = '';
  let replyToEmail = '';
  let clientEmail = '';
  let clientName = '';
  let htmlBody = '';
  let textBody = '';

  switch (formType) {
    case 'consultation': {
      clientName = data.fullName || 'Private Client';
      clientEmail = data.email || '';
      replyToEmail = clientEmail;
      const category = data.interestedCategory || 'Horological Consultation';

      subject = `[Aurelia & Crown] New Private Consultation: ${clientName} (${category})`;
      textBody = `
AURELIA & CROWN — PRIVATE CLIENT CONSULTATION DOSSIER
=====================================================
Timestamp: ${timestamp}
Client Name: ${clientName}
Email: ${clientEmail}
Phone: ${data.phone || 'Not provided'}
Country / Jurisdiction: ${data.country || 'Not specified'}
Category / Interest: ${category}
Allocated Budget: ${data.budget || 'Not specified'}
${data.productName ? `Referenced Piece: ${data.productName} (ID: ${data.productId || 'N/A'})` : ''}

CONFIDENTIAL CLIENT INQUIRY / NOTES:
${data.message || 'No additional notes provided.'}
      `.trim();

      htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f6f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #16181A;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f6f2; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e2ddd3; border-top: 4px solid #C5A880; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px; background-color: #111315; text-align: center;">
              <span style="display: block; font-family: 'Times New Roman', Georgia, serif; font-size: 20px; letter-spacing: 0.22em; text-transform: uppercase; color: #FAF8F5;">
                AURELIA & CROWN
              </span>
              <span style="display: block; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #C5A880; margin-top: 6px;">
                European High Horology & Vault Concierge
              </span>
            </td>
          </tr>
          
          <!-- Title Banner -->
          <tr>
            <td style="padding: 24px 32px 10px 32px; border-bottom: 1px solid #f0ede6;">
              <span style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8C6D37; font-weight: 600;">
                Private Client Consultation Dossier
              </span>
              <h1 style="font-family: 'Times New Roman', Georgia, serif; font-size: 22px; font-weight: normal; color: #111315; margin: 8px 0 0 0;">
                ${clientName}
              </h1>
              <p style="font-size: 12px; color: #666; margin: 4px 0 0 0;">Transmitted ${timestamp}</p>
            </td>
          </tr>

          <!-- Content Details -->
          <tr>
            <td style="padding: 24px 32px;">
              <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px; line-height: 1.6;">
                <tr>
                  <td width="35%" style="color: #777; border-bottom: 1px solid #f5f3ef;">Email Address:</td>
                  <td width="65%" style="font-weight: 600; color: #111315; border-bottom: 1px solid #f5f3ef;">
                    <a href="mailto:${clientEmail}" style="color: #8C6D37; text-decoration: none;">${clientEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="color: #777; border-bottom: 1px solid #f5f3ef;">Phone:</td>
                  <td style="color: #111315; border-bottom: 1px solid #f5f3ef;">${data.phone || '—'}</td>
                </tr>
                <tr>
                  <td style="color: #777; border-bottom: 1px solid #f5f3ef;">Jurisdiction / Country:</td>
                  <td style="color: #111315; border-bottom: 1px solid #f5f3ef;">${data.country || '—'}</td>
                </tr>
                <tr>
                  <td style="color: #777; border-bottom: 1px solid #f5f3ef;">Category of Interest:</td>
                  <td style="font-weight: 600; color: #111315; border-bottom: 1px solid #f5f3ef;">${category}</td>
                </tr>
                <tr>
                  <td style="color: #777; border-bottom: 1px solid #f5f3ef;">Allocated Budget:</td>
                  <td style="color: #111315; border-bottom: 1px solid #f5f3ef;">${data.budget || '—'}</td>
                </tr>
                ${data.productName ? `
                <tr>
                  <td style="color: #777; border-bottom: 1px solid #f5f3ef;">Referenced Piece:</td>
                  <td style="color: #8C6D37; font-weight: 600; border-bottom: 1px solid #f5f3ef;">${data.productName} (ID: ${data.productId})</td>
                </tr>` : ''}
              </table>

              <!-- Confidential Message -->
              <div style="margin-top: 24px; padding: 16px; background-color: #faf9f6; border-left: 3px solid #C5A880;">
                <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8C6D37; font-weight: 600; margin-bottom: 6px;">
                  Confidential Inquiry / Specification:
                </span>
                <p style="font-size: 13px; line-height: 1.6; color: #333; margin: 0; white-space: pre-wrap;">
                  ${data.message || 'No additional message.'}
                </p>
              </div>

              <!-- Quick action -->
              <div style="margin-top: 28px; text-align: center;">
                <a href="mailto:${clientEmail}?subject=Re:%20Aurelia%20%26%20Crown%20Private%20Client%20Inquiry" 
                   style="display: inline-block; background-color: #111315; color: #FAF8F5; padding: 12px 28px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; text-decoration: none; font-weight: 600;">
                  Reply Confidentially
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #f7f6f2; border-top: 1px solid #e2ddd3; text-align: center; font-size: 11px; color: #888;">
              Aurelia & Crown Maison Desk • Marktstraat 53, 5401 GG Uden, North Brabant, Netherlands<br>
              Direct contact: sales@aureliaandcrown.com • +31 (0)413 260 000
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim();
      break;
    }

    case 'contact': {
      clientName = data.fullName || 'Concierge Inquirer';
      clientEmail = data.email || '';
      replyToEmail = clientEmail;
      const refCode = data.referenceCode || `AC-${Math.floor(100000 + Math.random() * 900000)}`;

      subject = `[Aurelia & Crown] Concierge & Salon Request: ${clientName} [${refCode}]`;
      textBody = `
AURELIA & CROWN — CONCIERGE & SALON APPOINTMENT REQUEST
======================================================
Reference: ${refCode}
Timestamp: ${timestamp}
Client Name: ${clientName}
Email: ${clientEmail}
Phone: ${data.phone || 'Not provided'}
Country: ${data.country || 'Not specified'}
Salon Location: ${data.salon || 'European Desk'}
Inquiry Type: ${data.inquiryType || 'General Inquiry'}
Preferred Date: ${data.date || 'Flexible'}

MESSAGE / DETAILS:
${data.message || 'No additional details provided.'}
      `.trim();

      htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f6f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #16181A;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f6f2; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e2ddd3; border-top: 4px solid #C5A880;">
          <tr>
            <td style="padding: 28px 32px; background-color: #111315; text-align: center;">
              <span style="display: block; font-family: 'Times New Roman', Georgia, serif; font-size: 20px; letter-spacing: 0.22em; text-transform: uppercase; color: #FAF8F5;">
                AURELIA & CROWN
              </span>
              <span style="display: block; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #C5A880; margin-top: 6px;">
                Concierge & Salon Handover Protocols
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px 10px 32px; border-bottom: 1px solid #f0ede6;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8C6D37; font-weight: 600;">
                  Dossier Ref: ${refCode}
                </span>
              </div>
              <h1 style="font-family: 'Times New Roman', Georgia, serif; font-size: 22px; font-weight: normal; color: #111315; margin: 8px 0 0 0;">
                ${clientName}
              </h1>
              <p style="font-size: 12px; color: #666; margin: 4px 0 0 0;">Transmitted ${timestamp}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px;">
              <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px; line-height: 1.6;">
                <tr>
                  <td width="35%" style="color: #777; border-bottom: 1px solid #f5f3ef;">Email:</td>
                  <td width="65%" style="font-weight: 600; color: #111315; border-bottom: 1px solid #f5f3ef;">
                    <a href="mailto:${clientEmail}" style="color: #8C6D37; text-decoration: none;">${clientEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="color: #777; border-bottom: 1px solid #f5f3ef;">Phone:</td>
                  <td style="color: #111315; border-bottom: 1px solid #f5f3ef;">${data.phone || '—'}</td>
                </tr>
                <tr>
                  <td style="color: #777; border-bottom: 1px solid #f5f3ef;">Preferred Salon:</td>
                  <td style="font-weight: 600; color: #111315; border-bottom: 1px solid #f5f3ef;">${data.salon || 'Direct Desk'}</td>
                </tr>
                <tr>
                  <td style="color: #777; border-bottom: 1px solid #f5f3ef;">Inquiry Type:</td>
                  <td style="color: #111315; border-bottom: 1px solid #f5f3ef;">${data.inquiryType || 'General Inquiry'}</td>
                </tr>
                <tr>
                  <td style="color: #777; border-bottom: 1px solid #f5f3ef;">Preferred Date:</td>
                  <td style="color: #111315; border-bottom: 1px solid #f5f3ef;">${data.date || 'Flexible'}</td>
                </tr>
              </table>

              <div style="margin-top: 24px; padding: 16px; background-color: #faf9f6; border-left: 3px solid #C5A880;">
                <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8C6D37; font-weight: 600; margin-bottom: 6px;">
                  Client Message:
                </span>
                <p style="font-size: 13px; line-height: 1.6; color: #333; margin: 0; white-space: pre-wrap;">
                  ${data.message || 'No additional notes provided.'}
                </p>
              </div>

              <div style="margin-top: 28px; text-align: center;">
                <a href="mailto:${clientEmail}?subject=Re:%20Aurelia%20%26%20Crown%20Concierge%20Appointment%20[${refCode}]" 
                   style="display: inline-block; background-color: #111315; color: #FAF8F5; padding: 12px 28px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; text-decoration: none; font-weight: 600;">
                  Respond to Client
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 32px; background-color: #f7f6f2; border-top: 1px solid #e2ddd3; text-align: center; font-size: 11px; color: #888;">
              Aurelia & Crown Maison Desk • Marktstraat 53, 5401 GG Uden, North Brabant, Netherlands<br>
              sales@aureliaandcrown.com • +31 (0)413 260 000
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim();
      break;
    }

    case 'order': {
      clientName = data.customer?.fullName || 'Collector';
      clientEmail = data.customer?.email || '';
      replyToEmail = clientEmail;
      const orderId = data.id || `AC-${Math.floor(100000 + Math.random() * 900000)}`;
      const totalFormatted = `€${Number(data.totalAmountEUR || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 })}`;

      subject = `[Aurelia & Crown] Order Placement #${orderId}: ${clientName} (${totalFormatted})`;
      
      const itemsListText = (data.items || []).map((item: any) => 
        `- ${item.product?.brand || ''} ${item.product?.name || 'Piece'} (Qty: ${item.quantity}) - €${Number(item.product?.priceEUR || 0).toLocaleString('fr-FR')}`
      ).join('\n');

      textBody = `
AURELIA & CROWN — ACQUISITION RESERVATION REGISTERED
===================================================
Order Reference: #${orderId}
Timestamp: ${timestamp}
Client Name: ${clientName}
Email: ${clientEmail}
Phone: ${data.customer?.phone || 'Not provided'}
Delivery / Salon Address:
${data.customer?.address || ''}
${data.customer?.city || ''} ${data.customer?.postalCode || ''}
${data.customer?.country || ''}

Settlement Protocol: ${data.paymentMethod || 'Wire / Card'}
Total Valuation: ${totalFormatted}

RESERVED PIECES:
${itemsListText}

Special Dispatch Instructions:
${data.notes || 'Standard high-security protocol requested.'}
      `.trim();

      const itemsRows = (data.items || []).map((item: any) => `
        <tr>
          <td style="padding: 10px 8px; border-bottom: 1px solid #eee;">
            <strong>${item.product?.brand || ''}</strong> ${item.product?.name || 'Item'}<br>
            <span style="font-size: 11px; color: #888;">Qty: ${item.quantity}</span>
          </td>
          <td align="right" style="padding: 10px 8px; border-bottom: 1px solid #eee; font-weight: 600; color: #111315;">
            €${(Number(item.product?.priceEUR || 0) * (item.quantity || 1)).toLocaleString('fr-FR')}
          </td>
        </tr>
      `).join('');

      htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f6f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #16181A;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f6f2; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e2ddd3; border-top: 4px solid #C5A880;">
          <tr>
            <td style="padding: 28px 32px; background-color: #111315; text-align: center;">
              <span style="display: block; font-family: 'Times New Roman', Georgia, serif; font-size: 20px; letter-spacing: 0.22em; text-transform: uppercase; color: #FAF8F5;">
                AURELIA & CROWN
              </span>
              <span style="display: block; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #C5A880; margin-top: 6px;">
                Acquisition Order & Settlement Dossier
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px 10px 32px; border-bottom: 1px solid #f0ede6;">
              <span style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8C6D37; font-weight: 600;">
                Order Confirmed: #${orderId}
              </span>
              <h1 style="font-family: 'Times New Roman', Georgia, serif; font-size: 22px; font-weight: normal; color: #111315; margin: 8px 0 0 0;">
                ${totalFormatted}
              </h1>
              <p style="font-size: 12px; color: #666; margin: 4px 0 0 0;">Registered ${timestamp}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px;">
              <!-- Customer & Shipping -->
              <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px; line-height: 1.6; margin-bottom: 20px;">
                <tr>
                  <td width="35%" style="color: #777; border-bottom: 1px solid #f5f3ef;">Client Name:</td>
                  <td width="65%" style="font-weight: 600; color: #111315; border-bottom: 1px solid #f5f3ef;">${clientName}</td>
                </tr>
                <tr>
                  <td style="color: #777; border-bottom: 1px solid #f5f3ef;">Client Email:</td>
                  <td style="color: #111315; border-bottom: 1px solid #f5f3ef;">
                    <a href="mailto:${clientEmail}" style="color: #8C6D37; text-decoration: none;">${clientEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="color: #777; border-bottom: 1px solid #f5f3ef;">Contact Phone:</td>
                  <td style="color: #111315; border-bottom: 1px solid #f5f3ef;">${data.customer?.phone || '—'}</td>
                </tr>
                <tr>
                  <td style="color: #777; border-bottom: 1px solid #f5f3ef;">Delivery Destination:</td>
                  <td style="color: #111315; border-bottom: 1px solid #f5f3ef;">
                    ${data.customer?.address || ''}, ${data.customer?.city || ''} ${data.customer?.postalCode || ''}, ${data.customer?.country || ''}
                  </td>
                </tr>
                <tr>
                  <td style="color: #777; border-bottom: 1px solid #f5f3ef;">Settlement Method:</td>
                  <td style="font-weight: 600; color: #8C6D37; border-bottom: 1px solid #f5f3ef;">${data.paymentMethod || 'Wire Transfer'}</td>
                </tr>
              </table>

              <!-- Pieces breakdown -->
              <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8C6D37; font-weight: 600; margin-bottom: 8px;">
                Allocated Archive Pieces:
              </span>
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; border-collapse: collapse; margin-bottom: 24px;">
                ${itemsRows}
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; color: #111315;">Total Valuation:</td>
                  <td align="right" style="padding: 12px 8px; font-weight: bold; color: #8C6D37; font-size: 16px;">${totalFormatted}</td>
                </tr>
              </table>

              ${data.notes ? `
              <div style="padding: 14px; background-color: #faf9f6; border-left: 3px solid #C5A880; margin-bottom: 20px;">
                <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8C6D37; font-weight: 600; margin-bottom: 4px;">
                  Dispatch Notes:
                </span>
                <p style="font-size: 13px; color: #444; margin: 0;">${data.notes}</p>
              </div>` : ''}

              <div style="text-align: center; margin-top: 24px;">
                <a href="mailto:${clientEmail}?subject=Re:%20Aurelia%20%26%20Crown%20Order%20%23${orderId}%20Verification" 
                   style="display: inline-block; background-color: #111315; color: #FAF8F5; padding: 12px 28px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; text-decoration: none; font-weight: 600;">
                  Initiate Order Processing
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 32px; background-color: #f7f6f2; border-top: 1px solid #e2ddd3; text-align: center; font-size: 11px; color: #888;">
              Aurelia & Crown Private Client Desk • Insured Armoured European Logistics
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim();
      break;
    }

    case 'newsletter': {
      clientEmail = data.email || '';
      replyToEmail = clientEmail;
      subject = `[Aurelia & Crown] New Private Dispatch Subscriber: ${clientEmail}`;

      textBody = `
AURELIA & CROWN — PRIVATE DISPATCH ENROLLMENT
=============================================
Timestamp: ${timestamp}
Subscriber Email: ${clientEmail}
Source: ${data.source || 'Website Footer / Modal'}
      `.trim();

      htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f6f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #16181A;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f6f2; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e2ddd3; border-top: 4px solid #C5A880;">
          <tr>
            <td style="padding: 24px 32px; background-color: #111315; text-align: center;">
              <span style="display: block; font-family: 'Times New Roman', Georgia, serif; font-size: 18px; letter-spacing: 0.22em; text-transform: uppercase; color: #FAF8F5;">
                AURELIA & CROWN
              </span>
              <span style="display: block; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #C5A880; margin-top: 4px;">
                Private Dispatch Newsletter
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 32px; text-align: center;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #8C6D37; font-weight: 600;">
                New Subscriber Enrolled
              </span>
              <h2 style="font-size: 18px; font-weight: 600; color: #111315; margin: 10px 0;">
                <a href="mailto:${clientEmail}" style="color: #111315; text-decoration: none;">${clientEmail}</a>
              </h2>
              <p style="font-size: 12px; color: #777; margin: 0 0 20px 0;">
                Enrolled on ${timestamp} via ${data.source || 'Website'}
              </p>
              <div style="padding: 12px; background-color: #faf9f6; border: 1px solid #efeae1; display: inline-block; font-size: 12px; color: #555;">
                Discreet priority dispatch subscriber list updated.
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim();
      break;
    }
  }

  // 1. Send the primary notification to sales@aureliaandcrown.com
  const mailOptions: SendMailOptions = {
    from: `"Aurelia & Crown" <${salesEmail}>`,
    to: salesEmail,
    subject,
    text: textBody,
    html: htmlBody,
    replyTo: replyToEmail || salesEmail,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[Aurelia & Crown Zoho Mail] Dispatched email for ${formType}: Message ID ${info.messageId}`);

  // 2. Send optional client confirmation receipt if client email is present
  if (clientEmail && clientEmail.includes('@') && clientEmail !== salesEmail) {
    try {
      const clientSubject = formType === 'order'
        ? `Aurelia & Crown — Order #${data.id || ''} Reservation Confirmed`
        : formType === 'consultation'
        ? `Aurelia & Crown — Confidential Consultation Dossier Received`
        : formType === 'contact'
        ? `Aurelia & Crown — Concierge Inquiry Received`
        : `Aurelia & Crown — Welcome to the Private Dispatch`;

      const clientHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #f7f6f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #16181A;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f6f2; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e2ddd3; border-top: 4px solid #C5A880;">
          <tr>
            <td style="padding: 26px 30px; background-color: #111315; text-align: center;">
              <span style="display: block; font-family: 'Times New Roman', Georgia, serif; font-size: 18px; letter-spacing: 0.22em; text-transform: uppercase; color: #FAF8F5;">
                AURELIA & CROWN
              </span>
              <span style="display: block; font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase; color: #C5A880; margin-top: 5px;">
                Haute Horlogerie & Exceptional Joaillerie
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 30px; line-height: 1.6; font-size: 13px; color: #222;">
              <p style="margin-top: 0;">Dear ${clientName || 'Collector'},</p>
              <p>
                Thank you for contacting Aurelia & Crown. Your inquiry has been securely received by our European Private Client Desk.
              </p>
              <p>
                A dedicated senior advisor in our Paris or Geneva atelier will review your dossier and contact you confidentially within 24 hours.
              </p>
              <div style="padding: 14px 18px; background-color: #faf9f6; border-left: 3px solid #C5A880; margin: 20px 0; font-size: 12px; color: #555;">
                <strong>Maison Assurance:</strong> Every timepiece and gemstone in our catalogue is subject to our rigorous 8-point workshop verification and covered by our lifetime authenticity guarantee.
              </div>
              <p style="margin-bottom: 0;">
                Yours sincerely,<br>
                <strong>The Private Client Desk</strong><br>
                <span style="font-size: 11px; color: #777;">Aurelia & Crown Haute Horlogerie</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 18px 30px; background-color: #f7f6f2; border-top: 1px solid #e2ddd3; text-align: center; font-size: 11px; color: #888;">
              Marktstraat 53, 5401 GG Uden, North Brabant, Netherlands<br>
              sales@aureliaandcrown.com • +31 (0)413 260 000
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim();

      await transporter.sendMail({
        from: `"Aurelia & Crown" <${salesEmail}>`,
        to: clientEmail,
        subject: clientSubject,
        html: clientHtml,
        replyTo: salesEmail,
      });
      console.log(`[Aurelia & Crown Zoho Mail] Dispatched client confirmation copy to ${clientEmail}`);
    } catch (clientErr: any) {
      console.warn('[Aurelia & Crown Zoho Mail] Client confirmation copy failed (primary notification succeeded):', clientErr.message);
    }
  }

  return {
    success: true,
    messageId: info.messageId,
  };
}
