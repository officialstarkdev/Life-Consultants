import { MessageCircle } from 'lucide-react';
import { company } from '../data/company';
export default function WhatsAppButton(){return <a aria-label="Contact Life Consultants on WhatsApp" href={company.whatsapp} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-xl hover:-translate-y-1 transition-transform"><MessageCircle size={26}/></a>}
