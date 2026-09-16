import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { db } from '@/db';
import { projectBriefs } from '@/db/schema';

export const runtime = 'nodejs';
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const limits = new Map<string, { count: number; reset: number }>();

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin');
    if (origin && new URL(origin).host !== new URL(request.url).host && new URL(origin).host !== request.headers.get('x-forwarded-host')) {
      return NextResponse.json({ error: 'Please submit your enquiry from the VYRA website.' }, { status: 403 });
    }
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_FILE_SIZE + 150_000) return NextResponse.json({ error: 'Please keep your attachment under 5 MB.' }, { status: 413 });
    if (!request.headers.get('content-type')?.includes('multipart/form-data')) return NextResponse.json({ error: 'Please use the enquiry form to send your brief.' }, { status: 415 });
    const form = await request.formData();
    const value = (key: string, max = 500) => {
      const entry = form.get(key);
      if (typeof entry !== 'string') return '';
      if (entry.length > max) throw new Error(`VALIDATION:${key} is too long. Please shorten it and try again.`);
      return entry.trim();
    };
    if (value('fax', 500)) return NextResponse.json({ error: 'We couldn’t accept this submission. Please try again.' }, { status: 400 });
    const name = value('name', 160);
    const company = value('company', 200);
    const email = value('email', 254).toLowerCase();
    const kind = value('kind', 24) || 'project';
    const projectType = value('projectType', 100);
    const message = value('message', 10_000);
    const objective = value('objective', 5_000);
    const budget = value('budget', 100);
    const timeline = value('timeline', 100);
    const consent = form.get('consent') === 'on';
    if (!['project', 'consultation', 'agency', 'contact'].includes(kind)) return NextResponse.json({ error: 'Please choose a valid enquiry type.' }, { status: 400 });
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !projectType || !consent) return NextResponse.json({ error: 'Please add your name, a valid email, your enquiry type, and accept the privacy policy.' }, { status: 400 });
    if (kind !== 'contact' && !company) return NextResponse.json({ error: 'Please tell us your company or team name.' }, { status: 400 });
    if (kind === 'project' && (!budget || !timeline)) return NextResponse.json({ error: 'Please select a budget range and timeline. “Let’s discuss” and “Flexible” are welcome.' }, { status: 400 });
    if (kind === 'contact' && message.length < 10) return NextResponse.json({ error: 'Please tell us a little more in your message (at least 10 characters).' }, { status: 400 });
    let website = value('website', 500);
    if (website) {
      try { const parsed = new URL(website.includes('://') ? website : `https://${website}`); if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error(); website = parsed.toString(); }
      catch { return NextResponse.json({ error: 'Please enter a valid website address, or leave it blank.' }, { status: 400 }); }
    }
    const getArray = (key: string) => form.getAll(key).filter((v): v is string => typeof v === 'string' && v.length <= 100).slice(0, 12);
    let attachmentName: string | null = null;
    let attachmentType: string | null = null;
    let attachmentData: string | null = null;
    const attachment = form.get('attachment');
    if (attachment instanceof File && attachment.size > 0) {
      if (attachment.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'Your attachment is too large. The limit is 5 MB.' }, { status: 413 });
      const extension = attachment.name.split('.').pop()?.toLowerCase();
      const types: Record<string, string> = { pdf: 'application/pdf', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', txt: 'text/plain' };
      if (!extension || !types[extension]) return NextResponse.json({ error: 'Please upload a PDF, DOC, DOCX, or TXT file.' }, { status: 400 });
      const buffer = Buffer.from(await attachment.arrayBuffer());
      const valid = extension === 'pdf' ? buffer.subarray(0, 5).toString() === '%PDF-' : extension === 'doc' ? buffer.subarray(0, 4).toString('hex') === 'd0cf11e0' : extension === 'docx' ? buffer.subarray(0, 4).toString('hex') === '504b0304' : !buffer.includes(0);
      if (!valid) return NextResponse.json({ error: 'The file content does not match its format. Please export your brief again and retry.' }, { status: 400 });
      attachmentName = attachment.name.replace(/[^a-zA-Z0-9._ ()-]/g, '_').slice(0, 255);
      attachmentType = types[extension];
      attachmentData = buffer.toString('base64');
    }
    const now = Date.now();
    if (limits.size > 2000) for (const [key, entry] of limits) if (entry.reset < now) limits.delete(key);
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
    const rate = limits.get(ip);
    if (rate && rate.reset > now && rate.count >= 20) return NextResponse.json({ error: 'You’ve sent several enquiries recently. Please try again in an hour.' }, { status: 429 });
    limits.set(ip, { count: rate && rate.reset > now ? rate.count + 1 : 1, reset: rate && rate.reset > now ? rate.reset : now + 3_600_000 });
    const reference = `VYR-${randomBytes(5).toString('hex').toUpperCase()}`;
    const [saved] = await db.insert(projectBriefs).values({
      reference, kind, name, company, email, phone: value('phone', 60), website, industry: value('industry', 100), projectType, objective,
      deliverables: getArray('deliverables'), markets: value('markets', 500), languages: getArray('languages'), budget, timeline, message,
      attachmentName, attachmentType, attachmentData, consent,
    }).returning({ reference: projectBriefs.reference });
    return NextResponse.json({ success: true, reference: saved.reference }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('VALIDATION:')) return NextResponse.json({ error: error.message.slice(11) }, { status: 400 });
    console.error('Brief submission failed:', error instanceof Error ? error.name : 'Unknown error');
    return NextResponse.json({ error: 'We couldn’t save your enquiry just now. Your details are still in the form. Please try again shortly.' }, { status: 500 });
  }
}
