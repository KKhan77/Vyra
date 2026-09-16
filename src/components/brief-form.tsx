'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent, type DragEvent } from 'react';
import { services, industries } from '@/lib/site-data';
import { ArrowUpRight, Check, Close, Upload } from './icons';

type FormKind = 'project' | 'consultation' | 'agency' | 'contact';
export function BriefForm({ kind = 'project', subject = '' }: { kind?: FormKind; subject?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fileError, setFileError] = useState('');
  const [fileName, setFileName] = useState('');
  const [dragging, setDragging] = useState(false);
  const [reference, setReference] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const isContact = kind === 'contact';
  const isProject = kind === 'project';
  const topics: Record<string, string> = { careers: 'Careers', privacy: 'Privacy & personal data', rights: 'Intellectual property', agency: 'Agency partnerships', business: 'Business development' };
  const defaultTopic = isContact ? topics[subject] || 'General enquiry' : kind === 'agency' ? 'Agency partnership' : kind === 'consultation' ? 'Creative consultation' : '';
  useEffect(() => { if (reference) { successRef.current?.focus(); successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, [reference]);
  function validateFile(file?: File) {
    setFileError('');
    if (!file) { setFileName(''); return true; }
    if (file.size > 5 * 1024 * 1024 || !/\.(pdf|doc|docx|txt)$/i.test(file.name)) {
      setFileError(file.size > 5 * 1024 * 1024 ? 'Please choose a file smaller than 5 MB.' : 'Please choose a PDF, DOC, DOCX, or TXT file.');
      setFileName('');
      if (fileRef.current) fileRef.current.value = '';
      return false;
    }
    setFileName(file.name);
    return true;
  }
  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault(); setDragging(false);
    const file = event.dataTransfer.files[0];
    if (validateFile(file) && file && fileRef.current) { const transfer = new DataTransfer(); transfer.items.add(file); fileRef.current.files = transfer.files; }
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    if (fileError) { setError('Please remove or replace the attachment before submitting.'); return; }
    setError(''); setSubmitting(true);
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/briefs', { method: 'POST', body: data });
      const result = await response.json();
      if (!response.ok || !result.reference) throw new Error(result.error || 'Something went wrong. Please try again.');
      setReference(result.reference);
    } catch (err) { setError(err instanceof Error ? err.message : 'We couldn’t send your brief. Please check your connection and try again.'); }
    finally { setSubmitting(false); }
  }
  if (reference) return <div className="form-success"><span className="success-check"><Check size={34} /></span><span className="eyebrow">POSSIBILITY STARTS HERE</span><h2 tabIndex={-1} ref={successRef}>{isContact ? 'Your message is in.' : kind === 'agency' ? 'A good partnership starts here.' : kind === 'consultation' ? 'Let’s start a conversation.' : 'Your big idea is in.'}</h2><p>{kind === 'consultation' ? 'Your consultation request has been saved. A meeting is not booked yet; your details give the studio the context to coordinate the next step.' : 'Your details have been securely saved for the studio to review. Keep your reference handy for any follow-up conversation.'}</p><div className="submission-reference"><span>YOUR REFERENCE</span><strong>{reference}</strong></div><p className="small-note">This is your on-screen confirmation. No automated email has been sent.</p><div className="success-actions"><Link href="/work" className="button button-dark">Explore the work <ArrowUpRight size={18} /></Link><button className="text-link" onClick={() => { setReference(''); setFileName(''); setFileError(''); setError(''); }}>Send another enquiry <ArrowUpRight size={16} /></button></div></div>;
  return <form className="brief-form" onSubmit={handleSubmit} encType="multipart/form-data">
    <input type="hidden" name="kind" value={kind} />
    <div className="honeypot" aria-hidden="true"><label>Leave this field blank<input name="fax" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-section"><div className="form-section-title"><span>01</span><h2>{isContact ? 'A little about you' : 'You & your team'}</h2><small>* Required</small></div><div className="form-grid">
      <label className="form-field">Your name <span>*</span><input name="name" autoComplete="name" placeholder="Alex Morgan" required minLength={2} maxLength={160} /></label>
      <label className="form-field">Company {!isContact && <span>*</span>}<input name="company" autoComplete="organization" placeholder="Your company or agency" required={!isContact} maxLength={200} /></label>
      <label className="form-field">Email address <span>*</span><input type="email" name="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} /></label>
      <label className="form-field">Phone <small>Optional</small><input type="tel" name="phone" autoComplete="tel" placeholder="+971 50 000 0000" maxLength={60} /></label>
      {!isContact && <><label className="form-field">Website <small>Optional</small><input name="website" autoComplete="url" placeholder="yourcompany.com" maxLength={500} /></label><label className="form-field">Industry<select name="industry" defaultValue=""><option value="" disabled>Select your industry</option>{industries.map(i => <option key={i.slug}>{i.title}</option>)}<option>Agency / Creative studio</option><option>Other</option></select></label></>}
    </div></div>
    <div className="form-section"><div className="form-section-title"><span>02</span><h2>{isContact ? 'What’s on your mind?' : 'The big idea'}</h2></div><div className="form-grid">
      <label className="form-field full-width">{isContact ? 'Enquiry type' : 'Project type'} <span>*</span><select name="projectType" required defaultValue={defaultTopic}><option value="" disabled>What would you like to create?</option>{isContact ? ['General enquiry', 'New projects', 'Agency partnerships', 'Careers', 'Business development', 'Privacy & personal data', 'Intellectual property'].map(topic => <option key={topic}>{topic}</option>) : <>{services.map(service => <option key={service.slug}>{service.title}</option>)}<option>Creative consultation</option><option>Agency partnership</option><option>A little of everything</option><option>Help me figure it out</option></>}</select></label>
      {!isContact && <label className="form-field full-width">Campaign objective<textarea name="objective" placeholder="What do you want your audience to think, feel, or do? Tell us the ambition behind the project." rows={4} maxLength={5000} /></label>}
      {isContact && <label className="form-field full-width">Your message <span>*</span><textarea name="message" required minLength={10} maxLength={10000} placeholder="Tell us how we can help. For career enquiries, include a portfolio link and your area of expertise." rows={6} /></label>}
    </div>
    {!isContact && <fieldset className="checkbox-fieldset"><legend>What do you need? <small>Select all that apply</small></legend><div className="checkbox-grid">{['Hero film', 'Short-form cutdowns', 'Social content', 'Product assets', 'Localized versions', 'Not sure yet'].map(item => <label className="checkbox-option" key={item}><input type="checkbox" name="deliverables" value={item} /><span>{item}</span></label>)}</div></fieldset>}
    </div>
    {!isContact && <><div className="form-section"><div className="form-section-title"><span>03</span><h2>A few practical details</h2></div><div className="form-grid"><label className="form-field full-width">Markets<input name="markets" placeholder="e.g. UAE, Saudi Arabia, UK, or global" maxLength={500} /></label></div><fieldset className="checkbox-fieldset"><legend>Languages <small>Select all that apply</small></legend><div className="language-options">{['English', 'Arabic', 'Urdu', 'Spanish', 'Other'].map(language => <label key={language} className="checkbox-option"><input type="checkbox" name="languages" value={language} /><span>{language}</span></label>)}</div></fieldset><div className="form-grid"><label className="form-field">Budget range {isProject && <span>*</span>}<select name="budget" required={isProject} defaultValue=""><option value="" disabled>An indicative range is perfect</option>{['Under $5,000', '$5,000 – $15,000', '$15,000 – $30,000', '$30,000 – $60,000', '$60,000+', 'Let’s discuss'].map(option => <option key={option}>{option}</option>)}</select></label><label className="form-field">Timeline {isProject && <span>*</span>}<select name="timeline" required={isProject} defaultValue=""><option value="" disabled>When do you need it?</option>{['As soon as possible', 'Within 2–4 weeks', '1–2 months', '3+ months', 'Flexible'].map(option => <option key={option}>{option}</option>)}</select></label></div></div>
    <div className="form-section"><div className="form-section-title"><span>04</span><h2>Anything else?</h2></div><label className="form-field full-width">Additional information<textarea name="message" placeholder="References you love, a wild idea, or anything we should know." rows={4} maxLength={10000} /></label><div className="upload-field"><span className="upload-title">Have a brief? <small>Optional</small></span><label className={`upload-zone ${dragging ? 'dragging' : ''} ${fileName ? 'has-file' : ''}`} onDragOver={event => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}><Upload size={27} /><strong>{fileName || 'Drop your brief here, or browse files'}</strong><span>PDF, DOC, DOCX, or TXT · Up to 5 MB</span><input ref={fileRef} type="file" name="attachment" accept=".pdf,.doc,.docx,.txt" aria-label="Upload your project brief" aria-describedby={fileError ? 'file-error' : undefined} onChange={e => validateFile(e.target.files?.[0])} /></label>{fileName && <button type="button" className="remove-file" onClick={() => { if (fileRef.current) fileRef.current.value = ''; setFileName(''); setFileError(''); }}><Close size={14} /> Remove attachment</button>}{fileError && <p id="file-error" className="field-error" role="alert">{fileError}</p>}</div></div></>}
    <label className="consent-label"><input type="checkbox" name="consent" required /><span>I agree to the <Link href="/legal/privacy" target="_blank">privacy policy</Link> and consent to VYRA using my details to respond to this enquiry. <span>*</span></span></label>
    {error && <div className="form-error" role="alert">{error}</div>}
    <button type="submit" className="button button-dark submit-brief" disabled={submitting}>{submitting ? <><span className="loading-spinner" /> Sending your {isContact ? 'message' : 'brief'}…</> : <>{isContact ? 'Send your message' : kind === 'agency' ? 'Become a production partner' : kind === 'consultation' ? 'Request a creative consultation' : 'Submit your brief'}<ArrowUpRight size={20} /></>}</button>
    <p className="form-reassurance">No obligation. No pressure. Just the start of something good.</p>
  </form>;
}
