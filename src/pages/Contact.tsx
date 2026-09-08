import { FormEvent, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import PageHero from '../components/PageHero';
import SpotlightCard from '../components/SpotlightCard/SpotlightCard';
import SpecularButton from '../components/SpecularButton/SpecularButton';
import { company } from '../data/company';
import { useSEO } from '../hooks/useSEO';

export default function Contact() {
  useSEO('Contact | Life Consultants', 'Contact Life Consultants in Lahore, Pakistan or Mitcham, United Kingdom.');
  const [msg, setMsg] = useState('');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const api = import.meta.env.VITE_CONTACT_API_URL;
    if (!api) {
      setMsg('Form is ready. Add VITE_CONTACT_API_URL to connect your backend endpoint.');
      return;
    }
    const form = new FormData(e.currentTarget);
    const res = await fetch(api, {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(form)),
      headers: { 'Content-Type': 'application/json' },
    });
    setMsg(res.ok ? 'Thank you. Your message has been sent.' : 'Unable to send right now. Please contact us by phone or email.');
  }

  const offices = [
    ['Head Office (Pakistan)', company.pakistanOffice, company.phone, company.pakistanHours],
    ['UK Office', company.ukOffice, company.ukPhone, company.ukHours],
  ];

  return (
    <>
      <PageHero eyebrow="Get In Touch" title="Start your study abroad conversation" body="Contact our Pakistan head office or UK office for personalized guidance." />
      <section className="section-pad">
        <div className="container-site grid lg:grid-cols-2 gap-12">
          <div className="grid gap-5 content-start">
            {offices.map((office) => (
              <SpotlightCard key={office[0]} className="premium-card-shell" spotlightColor="rgba(55, 128, 255, .14)">
                <div className="contact-office-card border border-slate-200 p-7">
                  <h2 className="font-display font-bold text-2xl">{office[0]}</h2>
                  <div className="mt-5 grid gap-3 text-sm text-slate-600">
                    <div className="flex gap-3"><MapPin size={18} />{office[1]}</div>
                    <div className="flex gap-3"><Phone size={18} />{office[2]}</div>
                    <div className="flex gap-3"><Mail size={18} />{company.email}</div>
                    <div>{office[3]}</div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>

          <form id="consultation" onSubmit={submit} className="consultation-form bg-[#f5f9ff] p-7 md:p-9 scroll-mt-28">
            <h2 className="font-display font-bold text-2xl">Book a consultation</h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <input required name="fullName" placeholder="Full Name" className="p-3.5 border border-slate-200 bg-white focus-ring" />
              <input required type="email" name="email" placeholder="Email" className="p-3.5 border border-slate-200 bg-white focus-ring" />
              <input required name="phone" placeholder="Phone / WhatsApp" className="p-3.5 border border-slate-200 bg-white focus-ring" />
              <input name="qualification" placeholder="Current Qualification" className="p-3.5 border border-slate-200 bg-white focus-ring" />
              <input name="country" placeholder="Interested Country" className="p-3.5 border border-slate-200 bg-white focus-ring" />
              <select name="studyLevel" required className="p-3.5 border border-slate-200 bg-white focus-ring">
                <option value="">Preferred Study Level</option>
                <option>Foundation</option><option>Bachelor's</option><option>Master's</option><option>PhD</option><option>Other</option>
              </select>
              <textarea name="message" rows={5} placeholder="Message" className="sm:col-span-2 p-3.5 border border-slate-200 bg-white focus-ring" />
              <label className="sm:col-span-2 flex gap-3 items-start text-sm text-slate-600"><input required type="checkbox" className="mt-1" />I consent to being contacted about my enquiry.</label>
            </div>
            <SpecularButton className="mt-6" type="submit">Send Message</SpecularButton>
            {msg && <p className="mt-4 text-sm text-slate-600" role="status">{msg}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
