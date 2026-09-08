export type BlogPost = {
  slug:string;
  category:string;
  title:string;
  date:string;
  excerpt:string;
  video?:string;
  thumbnail?:string;
};

export const posts: BlogPost[] = [
  {
    slug:'usa-visa-interview-decision',
    category:'Interview',
    title:'Is USA Visa Interview Decision Done Before ? True or False',
    date:'14 Sep',
    excerpt:'Is USA visa interview decided before? Watch Life Consultants discuss the interview process.',
    video:'https://youtu.be/m3rNz5WhQHw',
    thumbnail:'/images/blog/usa-visa-interview-decision.svg',
  },
  {
    slug:'pre-action-protocol-uk',
    category:'UK Visa',
    title:'Who May go for Pre-Action Protocol ?? | UK',
    date:'14 Sep',
    excerpt:'A Life Consultants video update discussing who may go for Pre-Action Protocol in the UK context.',
    video:'https://youtu.be/KrOOokqoMJg',
    thumbnail:'/images/blog/pre-action-protocol-uk.svg',
  },
  {
    slug:'usa-visa-interview-questions-tips',
    category:'Business',
    title:'USA Visa interview Questions and Tips',
    date:'27 Jan',
    excerpt:'USA visa interview questions and tips.',
    video:'https://youtu.be/x_GEZDTaZ9M',
    thumbnail:'/images/blog/usa-visa-interview-questions-tips.svg',
  },
  {
    slug:'canada-study-permit-rules-2026',
    category:'Consulting',
    title:'Latest Update on new Canada Study Permit Rules 2026 | Life Consultants | Canada | Latest News',
    date:'14 Sep',
    excerpt:'Life Consultants video update on Canada study permit rules.',
    video:'https://youtu.be/c9EPy3o5xrQ',
    thumbnail:'/images/blog/canada-study-permit-rules-2026.svg',
  },
];
