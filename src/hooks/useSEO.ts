import { useEffect } from 'react';

function ensureMeta(selector: string, attrs: Record<string,string>) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    Object.entries(attrs).forEach(([k,v]) => el!.setAttribute(k,v));
    document.head.appendChild(el);
  }
  return el;
}

export function useSEO(title:string, description:string){
  useEffect(()=>{
    document.title = title;
    const desc = ensureMeta('meta[name="description"]',{name:'description'});
    desc.content = description;

    const ogTitle = ensureMeta('meta[property="og:title"]',{property:'og:title'});
    ogTitle.content = title;
    const ogDesc = ensureMeta('meta[property="og:description"]',{property:'og:description'});
    ogDesc.content = description;
    const twitterTitle = ensureMeta('meta[name="twitter:title"]',{name:'twitter:title'});
    twitterTitle.content = title;
    const twitterDesc = ensureMeta('meta[name="twitter:description"]',{name:'twitter:description'});
    twitterDesc.content = description;

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}${window.location.pathname}`;
  },[title,description]);
}
