import formHandler from './forms.js';

export default async function handler(req: any, res: any) {
  // If no explicit formType is provided, default to 'contact'
  if (req.body && !req.body.formType) {
    req.body = {
      formType: 'contact',
      data: req.body,
    };
  }
  return formHandler(req, res);
}
