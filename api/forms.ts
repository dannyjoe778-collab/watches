import { processFormSubmission, FormSubmissionPayload } from './_mailer.js';

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.',
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // keep as is
      }
    }

    if (!body || !body.formType) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: formType',
      });
    }

    const payload: FormSubmissionPayload = {
      formType: body.formType,
      data: body.data || body,
    };

    const result = await processFormSubmission(payload);
    return res.status(200).json({
      success: true,
      message: 'Form inquiry transmitted successfully via Zoho Mail.',
      ...result,
    });
  } catch (error: any) {
    console.error('[API /api/forms] Error processing form with Zoho Mail:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to dispatch email via SMTP server.',
    });
  }
}
