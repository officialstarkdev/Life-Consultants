export default function SectionTitle({eyebrow,title,body,center=false}:{eyebrow:string;title:string;body?:string;center?:boolean}){
  return <div className={center?'mx-auto max-w-3xl text-center':'max-w-3xl'}><div className="eyebrow">{eyebrow}</div><h2 className="title-lg mt-3">{title}</h2>{body&&<p className="mt-5 text-slate-600 leading-7">{body}</p>}</div>
}
