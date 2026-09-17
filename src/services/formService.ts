export interface FormResponse {
  success: boolean;
  message?: string;
  messageId?: string;
  error?: string;
}

export async function submitForm(formType: 'consultation' | 'contact' | 'order' | 'newsletter', data: any): Promise<FormResponse> {
  try {
    const response = await fetch('/api/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType,
        data,
      }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      console.warn(`[FormService] Server returned status ${response.status}:`, result);
      return {
        success: false,
        error: result?.error || `Server responded with error status ${response.status}`,
      };
    }

    return {
      success: true,
      messageId: result?.messageId,
      message: result?.message || 'Form transmitted successfully via Zoho Mail.',
    };
  } catch (error: any) {
    console.error('[FormService] Network or dispatch failure:', error);
    return {
      success: false,
      error: error?.message || 'Network connection to email server failed.',
    };
  }
}
