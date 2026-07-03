const FORMS_SCRIPT_URL = process.env.NEXT_PUBLIC_FORMS_SCRIPT_URL;

export type FormSubmission =
  | { type: "contact"; name: string; phone: string; email?: string; subject: string; message: string }
  | { type: "faq"; name?: string; contact?: string; question: string }
  | { type: "feedback"; name: string; contact?: string; rating: number; comments: string };

/**
 * Sends a submission to the Google Sheet backend (see google-apps-script/Code.gs).
 * Uses mode: "no-cors" because Apps Script Web Apps don't return CORS headers —
 * the write still happens server-side, we just can't read a response back.
 */
export async function submitForm(data: FormSubmission): Promise<boolean> {
  if (!FORMS_SCRIPT_URL) return false;
  try {
    await fetch(FORMS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    });
    return true;
  } catch {
    return false;
  }
}
