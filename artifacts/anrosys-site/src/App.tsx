import { type ReactNode, useEffect, useState } from 'react';
import { Link, Route, Switch, useLocation } from 'wouter';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';

const CONTACT = {
  whatsapp: 'https://wa.me/918899808117',
  email: 'mailto:anrosysedu@gmail.com',
  calendar: 'https://calendly.com/anrosysedu/30min',
  careers: 'mailto:xyz@mail?subject=Career%20application%20at%20Anrosys',
};

const descriptions: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Anrosys — Software built around your business',
    description: 'A hands-on software partner for thoughtful digital products. Meet Anrosys EduPortal, our live platform for educational institutions.',
  },
  '/about': {
    title: 'About Anrosys — A practical software partner',
    description: 'Get to know Anrosys: a hands-on team turning varied business needs into dependable digital products.',
  },
  '/careers': {
    title: 'Careers at Anrosys — Start a conversation',
    description: 'Interested in building useful software with Anrosys? Send your resume and a short introduction.',
  },
};

function Metadata() {
  const [location] = useLocation();
  useEffect(() => {
    const page = descriptions[location] ?? descriptions['/'];
    document.title = page.title;
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', page.description);
    setMeta('meta[property="og:title"]', 'content', page.title);
    setMeta('meta[property="og:description"]', 'content', page.description);
    setMeta('meta[property="og:url"]', 'content', `https://anrosys.com${location}`);
    setMeta('meta[name="twitter:title"]', 'content', page.title);
    setMeta('meta[name="twitter:description"]', 'content', page.description);
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = `https://anrosys.com${location}`;
  }, [location]);
  return null;
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Anrosys home" className={`brand inline-flex items-center gap-2.5 ${light ? 'text-[#f7f3e9]' : 'text-[#18383d]'}`}>
      <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-[#24645e] text-[#f7f3e9]">
        <svg viewBox="0 0 32 32" className="h-[21px] w-[21px]" aria-hidden="true">
          <path d="M7 23.5 15.9 7l9.1 16.5h-5.1l-4-7.7-4 7.7H7Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M15.9 21h8.2" stroke="#f0a47a" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </span>
      <span className="font-[var(--app-font-serif)] text-[1.23rem] font-extrabold tracking-[-.06em]">anrosys<span className="text-[#d8835d]">.</span></span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => setOpen(false), [location]);
  const nav = [
    { href: '/about', label: 'About' },
    { href: '/#services', label: 'What we do' },
    { href: '/#eduportal', label: 'EduPortal' },
    { href: '/#work', label: 'Our work' },
    { href: '/careers', label: 'Careers' },
  ];
  return (
    <header className="relative z-30 border-b border-[#18383d]/10 bg-[#f5f2e9]">
      <div className="site-shell flex h-[76px] items-center justify-between">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => item.href.startsWith('/#')
            ? <a key={item.label} href={item.href} className="nav-link text-[13px] font-semibold text-[#45575a] transition-colors hover:text-[#24645e]">{item.label}</a>
            : <Link key={item.label} href={item.href} className="nav-link text-[13px] font-semibold text-[#45575a] transition-colors hover:text-[#24645e]">{item.label}</Link>)}
        </nav>
        <a href={CONTACT.calendar} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full bg-[#18383d] px-5 py-3 text-[12px] font-bold text-[#f7f3e9] transition-transform hover:-translate-y-0.5 md:inline-flex">
          Talk to our team <ArrowUpRight size={15} />
        </a>
        <button type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full border border-[#18383d]/15 text-[#18383d] md:hidden">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && <nav aria-label="Mobile navigation" className="absolute left-0 right-0 top-full border-t border-[#18383d]/10 bg-[#f5f2e9] px-[18px] py-5 shadow-xl md:hidden">
        <div className="mx-auto flex max-w-[1240px] flex-col">
          {nav.map((item) => item.href.startsWith('/#')
            ? <a key={item.label} href={item.href} className="border-b border-[#18383d]/10 py-3.5 text-[15px] font-semibold text-[#18383d]">{item.label}</a>
            : <Link key={item.label} href={item.href} className="border-b border-[#18383d]/10 py-3.5 text-[15px] font-semibold text-[#18383d]">{item.label}</Link>)}
          <a href={CONTACT.calendar} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#18383d] px-5 py-3.5 text-sm font-semibold text-[#f7f3e9]">Talk to our team <ArrowUpRight size={16}/></a>
        </div>
      </nav>}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#18383d] text-[#f3efe5]">
      <div className="site-shell grid gap-12 py-14 md:grid-cols-[1.3fr_.7fr_.8fr] md:py-[72px]">
        <div>
          <Brand light />
          <p className="mt-5 max-w-[350px] text-sm leading-7 text-[#c4d0ca]">A hands-on software partner for the work that matters. Thoughtful products, made dependable.</p>
        </div>
        <div>
          <p className="eyebrow text-[#e8a27d]">Explore</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-[#d5ddd7]">
            <Link href="/about" className="w-fit hover:text-white">About Anrosys</Link>
            <a href="/#services" className="w-fit hover:text-white">Services</a>
            <a href="/#eduportal" className="w-fit hover:text-white">EduPortal</a>
            <Link href="/careers" className="w-fit hover:text-white">Careers</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow text-[#e8a27d]">Start a conversation</p>
          <div className="mt-5 flex flex-col items-start gap-3 text-sm text-[#d5ddd7]">
            <a href={CONTACT.email} className="hover:text-white">anrosysedu@gmail.com</a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="hover:text-white">Message on WhatsApp</a>
            <a href={CONTACT.calendar} target="_blank" rel="noreferrer" className="hover:text-white">Book a conversation</a>
          </div>
        </div>
      </div>
      <div className="site-shell flex flex-col gap-2 border-t border-white/15 py-5 text-[11px] text-[#aebdb7] sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Anrosys. All rights reserved.</span>
        <span>Made for the details that make a difference.</span>
      </div>
    </footer>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow flex items-center gap-2.5 ${light ? 'text-[#edaa83]' : 'text-[#34756e]'}`}><span className={`h-[1px] w-7 ${light ? 'bg-[#edaa83]' : 'bg-[#34756e]'}`} />{children}</p>;
}

function Home() {
  return (
    <main>
      <section className="hero-art grain relative flex min-h-[650px] items-center overflow-hidden bg-[#18383d] text-[#f7f3e9] md:min-h-[700px]">
        <div className="site-shell relative z-10 grid w-full items-center gap-12 py-20 md:grid-cols-[1fr_.52fr] md:py-28">
          <div className="max-w-[760px]">
            <Eyebrow light>Software partner · Product people</Eyebrow>
            <h1 className="display reveal mt-7 max-w-[810px] text-[clamp(3.2rem,8vw,7.3rem)] leading-[.98]">Good software<br/>starts with <span className="text-[#efaa83]">listening.</span></h1>
            <p className="reveal reveal-delay-1 mt-7 max-w-[525px] text-[16px] leading-7 text-[#e1e5dc] md:text-[18px] md:leading-8">We turn the way your business works into digital products people can rely on — with a real team beside you, from first question to what comes next.</p>
            <div className="reveal reveal-delay-2 mt-9 flex flex-wrap items-center gap-3">
              <a href={CONTACT.calendar} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#f0a47a] px-6 py-4 text-[13px] font-bold text-[#18383d] transition-transform hover:-translate-y-1">Tell us what you’re building <ArrowUpRight size={16}/></a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-4 text-[13px] font-semibold text-white transition-colors hover:bg-white/10">Explore our approach <ArrowDown size={15}/></a>
            </div>
          </div>
          <div className="reveal reveal-delay-3 hidden justify-end md:flex">
            <div className="w-[240px] border-l border-white/30 pl-5">
              <p className="display text-[3.8rem] leading-none tracking-[-.06em]">10<span className="text-[#efaa83]">+</span></p>
              <p className="mt-3 text-[13px] leading-6 text-[#e1e5dc]">clients across multiple projects — each with its own shape, pace and needs.</p>
              <div className="mt-8 h-px w-12 bg-[#efaa83]"/>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[.14em] text-[#c5d2ca]">Independent by nature<br/>Collaborative by design</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 right-7 hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[.16em] text-white/65 md:flex"><span className="h-px w-10 bg-white/40"/>Built for what’s next</div>
      </section>

      <section id="services" className="scroll-mt-16 py-20 md:py-28">
        <div className="site-shell">
          <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
            <div><Eyebrow>What we do</Eyebrow><h2 className="display mt-5 max-w-[500px] text-4xl leading-[1.05] text-[#18383d] md:text-[3.6rem]">From a tangled brief to a product that feels clear.</h2></div>
            <p className="max-w-[480px] pb-1 text-[15px] leading-7 text-[#5b6867] md:ml-auto">No two businesses need the same software. We bring product thinking, design and engineering together around the problem in front of you.</p>
          </div>
          <div className="mt-14 grid gap-3 md:grid-cols-3">
            {[
              { n: '01', title: 'Find the right problem', text: 'We get close to your workflows, people and constraints before deciding what to build.' },
              { n: '02', title: 'Shape a useful product', text: 'Clear journeys and considered interfaces make complex work feel natural.' },
              { n: '03', title: 'Build for real life', text: 'We deliver software with care for performance, security and the team using it every day.' },
            ].map((item) => <article key={item.n} className="service-card min-h-[260px] px-6 py-7 md:px-7 md:py-8">
              <span className="font-mono text-[11px] font-semibold text-[#efaa83]">Our approach / {item.n}</span>
              <h3 className="display mt-7 text-[1.55rem] font-bold tracking-[-.04em] text-[#f7f3e9]">{item.title}</h3>
              <p className="mt-3 max-w-[300px] text-[13px] leading-6 text-[#d5ddd7]">{item.text}</p>
            </article>)}
          </div>
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-[11px] font-bold uppercase tracking-[.12em] text-[#53706c]">
            <span>Product strategy</span><span>·</span><span>Web platforms</span><span>·</span><span>Custom software</span><span>·</span><span>Ongoing partnership</span>
          </div>
        </div>
      </section>

      <section id="eduportal" className="scroll-mt-16 bg-[#e7e8dd] py-20 md:py-28">
        <div className="site-shell grid gap-12 md:grid-cols-[1.05fr_.95fr] md:items-center">
          <div className="relative min-h-[365px] overflow-hidden rounded-[4px] bg-[#d1d7c9] p-5 sm:p-8">
            <div className="absolute -right-16 -top-28 h-[330px] w-[330px] rounded-full border border-[#24645e]/20"/>
            <div className="absolute -right-4 -top-16 h-[240px] w-[240px] rounded-full border border-[#24645e]/20"/>
            <div className="relative z-10 ml-auto max-w-[430px] rounded-[5px] border border-[#18383d]/10 bg-[#f7f4eb] p-5 shadow-[0_25px_50px_rgba(24,56,61,.1)] sm:p-7">
              <div className="flex items-center justify-between border-b border-[#18383d]/10 pb-4">
                <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#34756e]">EduPortal / Platform modules</p><p className="mt-1 text-[12px] font-semibold text-[#18383d]">Institution operations</p></div>
                <span className="h-2 w-2 rounded-full bg-[#65a084]"/>
              </div>
              <div className="grid grid-cols-2 gap-3 py-5">
                {['Student records','Batch scheduling','Attendance','Fee collection'].map((label) => <div key={label} className="flex min-h-[72px] items-end rounded-[3px] bg-[#e9eee6] p-3.5"><p className="text-[12px] font-semibold text-[#344f4c]">{label}</p></div>)}
              </div>
              <div className="flex items-center gap-2 border-t border-[#18383d]/10 pt-4 text-[10px] text-[#687976]"><span className="h-1.5 w-1.5 rounded-full bg-[#e19a70]"/> A connected view of your institution</div>
            </div>
            <div className="absolute bottom-5 left-5 text-[10px] font-bold uppercase tracking-[.16em] text-[#59736d] sm:bottom-8 sm:left-8">Anrosys product / 001</div>
          </div>
          <div className="md:pl-8">
            <Eyebrow>Our live product</Eyebrow>
            <h2 className="display mt-5 max-w-[550px] text-4xl leading-[1.05] text-[#18383d] md:text-[3.65rem]">A calmer way to run a learning institution.</h2>
            <p className="mt-6 max-w-[490px] text-[15px] leading-7 text-[#5b6867]">EduPortal brings the moving parts of an educational institution into one connected platform — built to make daily operations simpler for teams, students and families.</p>
            <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 text-[12px] font-semibold text-[#344f4c] sm:grid-cols-3">
              {['Student records','Batch scheduling','Fee collection','Attendance','Analytics','Parent & student portals','Multi-branch operations','Institutional security'].map((feature) => <div key={feature} className="flex gap-2"><span className="text-[#d8835d]">/</span>{feature}</div>)}
            </div>
            <a href="https://anrosysedu.in" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-[#24645e] pb-1.5 text-[13px] font-bold text-[#24645e] transition-colors hover:text-[#18383d]">Explore Anrosys EduPortal <ArrowUpRight size={15}/></a>
          </div>
        </div>
      </section>

      <section id="work" className="scroll-mt-16 py-20 md:py-28">
        <div className="site-shell">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div><Eyebrow>Clients & projects</Eyebrow><h2 className="display mt-5 max-w-[600px] text-4xl leading-[1.05] text-[#18383d] md:text-[3.7rem]">Different challenges.<br/>One thoughtful way of working.</h2></div>
            <p className="max-w-[360px] text-[14px] leading-6 text-[#5b6867]">Anrosys has worked with 10+ clients across multiple projects. We keep the focus on the work, not the name-dropping.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-[1.2fr_.8fr]">
            <article className="relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-[#24645e] p-7 text-[#f7f3e9] md:p-10">
              <span className="eyebrow text-[#edaa83]">Selected capability / 01</span>
              <div className="absolute right-[-28px] top-[-65px] h-[245px] w-[245px] rounded-full border border-white/20"/><div className="absolute right-[45px] top-[9px] h-[145px] w-[145px] rounded-full border border-white/20"/>
              <div className="relative z-10"><p className="display max-w-[500px] text-3xl leading-[1.08] md:text-[2.9rem]">Purpose-built digital platforms for complex day-to-day work.</p><p className="mt-5 max-w-[430px] text-[13px] leading-6 text-white/75">Products that fit the people, processes and decisions behind a business.</p></div>
            </article>
            <article className="flex min-h-[300px] flex-col justify-between border border-[#18383d]/15 bg-[#efece2] p-7 md:p-9">
              <span className="eyebrow text-[#34756e]">A note on our work</span>
              <div><p className="display text-5xl font-bold tracking-[-.06em] text-[#18383d]">10<span className="text-[#d8835d]">+</span></p><p className="mt-3 text-sm font-semibold text-[#18383d]">clients, across multiple projects</p><p className="mt-3 max-w-[310px] text-[13px] leading-6 text-[#687573]">We work across varied business needs. Every engagement starts by understanding the context, not assuming the answer.</p></div>
              <Link href="/about" className="inline-flex w-fit items-center gap-2 border-b border-[#24645e] pb-1 text-[12px] font-bold text-[#24645e]">Meet the team <ArrowRight size={14}/></Link>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" className="dark-contact scroll-mt-12 py-20 text-[#f7f3e9] md:py-[100px]">
        <div className="site-shell">
          <div className="grid gap-10 md:grid-cols-[1fr_.72fr] md:items-end">
            <div><Eyebrow light>Have a project in mind?</Eyebrow><h2 className="display mt-6 max-w-[760px] text-4xl leading-[1.02] md:text-[5rem]">Let’s make the next thing<br className="hidden md:block"/> work better.</h2></div>
            <p className="max-w-[420px] text-[14px] leading-7 text-[#d5ddd7] md:ml-auto">Tell us what’s on your mind. Start with the way that works best for you — we’ll take it from there.</p>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="contact-card group flex min-h-[158px] flex-col justify-between p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#efaa83] sm:p-6">
              <span className="eyebrow text-[#efaa83]">Message</span><span className="flex items-end justify-between gap-4"><span><span className="display block text-[1.55rem] font-bold tracking-[-.04em]">WhatsApp</span><span className="mt-1 block text-[11px] text-white/75">Message our team directly</span></span><ArrowUpRight size={19} className="mb-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></span>
            </a>
            <a href={CONTACT.email} className="contact-card group flex min-h-[158px] flex-col justify-between p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#efaa83] sm:p-6">
              <span className="eyebrow text-[#efaa83]">Write</span><span className="flex items-end justify-between gap-4"><span><span className="display block text-[1.55rem] font-bold tracking-[-.04em]">Email</span><span className="mt-1 block break-all text-[11px] text-white/75">anrosysedu@gmail.com</span></span><ArrowUpRight size={19} className="mb-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></span>
            </a>
            <a href={CONTACT.calendar} target="_blank" rel="noreferrer" className="contact-card group flex min-h-[158px] flex-col justify-between p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#efaa83] sm:p-6">
              <span className="eyebrow text-[#efaa83]">Meet</span><span className="flex items-end justify-between gap-4"><span><span className="display block text-[1.55rem] font-bold tracking-[-.04em]">Calendly</span><span className="mt-1 block text-[11px] text-white/75">Book a conversation</span></span><ArrowUpRight size={19} className="mb-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function About() {
  return (
    <main>
      <section className="bg-[#e7e8dd] py-20 md:py-[112px]">
        <div className="site-shell">
          <Eyebrow>About Anrosys</Eyebrow>
          <h1 className="display reveal mt-7 max-w-[900px] text-[clamp(3.1rem,8vw,7rem)] leading-[.99] text-[#18383d]">Useful software.<br/><span className="text-[#34756e]">Built together.</span></h1>
          <div className="mt-10 grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-end">
            <p className="max-w-[400px] text-[15px] leading-7 text-[#536360]">Anrosys is a hands-on software company for teams with real problems to solve — and a better way of doing things to build.</p>
            <p className="max-w-[540px] text-[14px] leading-7 text-[#536360] md:ml-auto">We bring business context, product design and engineering into the same conversation. That means fewer hand-offs, clearer decisions and software shaped around the people who actually use it.</p>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="site-shell grid gap-14 md:grid-cols-[.7fr_1.3fr]">
          <div><Eyebrow>How we think</Eyebrow><h2 className="display mt-5 text-4xl leading-[1.04] text-[#18383d] md:text-[3.2rem]">A partner for the whole picture.</h2></div>
          <div className="divide-y divide-[#18383d]/15 border-y border-[#18383d]/15">
            {[
              ['Context comes first', 'Every project starts with understanding how work happens today — the friction, the workarounds, and what success would actually feel like.'],
              ['Make complexity feel simple', 'We take complicated systems and create clear, approachable experiences without losing the important detail underneath.'],
              ['Stay close to the outcome', 'Good delivery is more than shipping. We care about reliability, adoption and what the product needs as the business changes.'],
            ].map(([title, text], i) => <div key={title} className="grid gap-3 py-6 sm:grid-cols-[55px_1fr] sm:gap-5 sm:py-8"><span className="font-mono text-[11px] text-[#d8835d]">0{i + 1}</span><div><h3 className="display text-[1.6rem] font-bold tracking-[-.04em] text-[#18383d]">{title}</h3><p className="mt-2 max-w-[530px] text-[13px] leading-6 text-[#64716e]">{text}</p></div></div>)}
          </div>
        </div>
      </section>
      <section className="bg-[#18383d] py-16 text-[#f7f3e9] md:py-20">
        <div className="site-shell grid gap-10 md:grid-cols-[1fr_.72fr] md:items-center">
          <div><Eyebrow light>In practice</Eyebrow><p className="display mt-6 max-w-[700px] text-3xl leading-[1.15] md:text-[2.8rem]">“We don’t arrive with a pre-made answer. We work alongside you to find the one that fits.”</p></div>
          <div className="md:justify-self-end"><p className="display text-6xl tracking-[-.06em]">10<span className="text-[#efaa83]">+</span></p><p className="mt-2 text-sm text-[#c4d0ca]">clients across multiple projects</p><a href={CONTACT.calendar} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 border-b border-[#efaa83] pb-1.5 text-[12px] font-bold text-[#efaa83]">Start a conversation <ArrowUpRight size={15}/></a></div>
        </div>
      </section>
      <section className="py-20 md:py-24">
        <div className="site-shell flex flex-col justify-between gap-7 md:flex-row md:items-center"><div><Eyebrow>Product, meet practice</Eyebrow><h2 className="display mt-5 max-w-[700px] text-4xl leading-tight text-[#18383d] md:text-[3.4rem]">EduPortal is our approach, put to work.</h2><p className="mt-4 max-w-[570px] text-[14px] leading-7 text-[#64716e]">A live SaaS platform that helps educational institutions manage students, schedules, fees and more — all in one place.</p></div><a href="https://anrosysedu.in" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#24645e] px-6 py-4 text-[13px] font-bold text-[#f7f3e9]">Explore EduPortal <ArrowUpRight size={16}/></a></div>
      </section>
      <ContactBand />
    </main>
  );
}

function ContactBand() {
  return <section className="dark-contact py-16 text-[#f7f3e9] md:py-20"><div className="site-shell flex flex-col justify-between gap-7 md:flex-row md:items-center"><div><Eyebrow light>Ready when you are</Eyebrow><h2 className="display mt-4 text-4xl md:text-[3.5rem]">Tell us what needs to work better.</h2></div><a href={CONTACT.calendar} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#f0a47a] px-6 py-4 text-[13px] font-bold text-[#18383d]">Book a conversation <ArrowUpRight size={16}/></a></div></section>;
}

function Careers() {
  return (
    <main>
      <section className="bg-[#e7e8dd] py-20 md:py-[112px]">
        <div className="site-shell grid gap-10 md:grid-cols-[1.1fr_.9fr] md:items-end">
          <div><Eyebrow>Careers / Open application</Eyebrow><h1 className="display reveal mt-7 max-w-[780px] text-[clamp(3.1rem,8vw,6.7rem)] leading-[.98] text-[#18383d]">Good work is<br/>a team sport.</h1></div>
          <p className="max-w-[440px] text-[15px] leading-7 text-[#536360] md:ml-auto">We’re always glad to hear from thoughtful people who care about making software genuinely useful. If that sounds like you, introduce yourself.</p>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="site-shell grid gap-12 md:grid-cols-[.68fr_1.32fr]">
          <div><Eyebrow>Work with us</Eyebrow><h2 className="display mt-5 text-4xl leading-tight text-[#18383d]">Bring your way of thinking.</h2></div>
          <div>
            <p className="max-w-[600px] text-[16px] leading-8 text-[#536360]">Anrosys works across product, design and software — helping businesses turn specific needs into dependable digital products. We value curiosity, clear communication and care for the details that make work better.</p>
            <div className="mt-10 grid gap-3 border-y border-[#18383d]/15 py-6 sm:grid-cols-3">
              {['Product-minded builders','People who ask good questions','Thoughtful collaborators'].map((trait, index) => <div key={trait} className="flex gap-3 text-[12px] font-semibold leading-5 text-[#455c58]"><span className="font-mono text-[#d8835d]">0{index + 1}</span>{trait}</div>)}
            </div>
          </div>
        </div>
      </section>
      <section className="dark-contact py-16 text-[#f7f3e9] md:py-24">
        <div className="site-shell grid gap-10 md:grid-cols-[1fr_.7fr] md:items-center">
          <div><Eyebrow light>Your next step</Eyebrow><h2 className="display mt-6 max-w-[700px] text-4xl leading-[1.04] md:text-[4.4rem]">Send us a note.<br/>Let’s see if it fits.</h2><p className="mt-5 max-w-[470px] text-[14px] leading-7 text-[#d5ddd7]">Share a little about yourself, the work you enjoy, and what you’d like to explore next. Attach your resume when you email us.</p></div>
          <div className="md:justify-self-end">
            <a href={CONTACT.careers} className="inline-flex items-center gap-3 rounded-full bg-[#f0a47a] px-6 py-4 text-[13px] font-bold text-[#18383d] transition-transform hover:-translate-y-1">Apply / send your resume <ArrowUpRight size={16}/></a>
            <p className="mt-4 text-[12px] text-white/70">Email your application to <a href={CONTACT.careers} className="font-semibold text-white underline underline-offset-4">xyz@mail</a></p>
          </div>
        </div>
      </section>
      <section className="py-14"><div className="site-shell flex flex-col gap-3 text-[13px] text-[#63716e] sm:flex-row sm:items-center sm:justify-between"><p>No specific role in mind? That’s okay. A good conversation can start anywhere.</p><a href={CONTACT.careers} className="inline-flex w-fit items-center gap-2 font-bold text-[#24645e]">Write to the team <ArrowRight size={14}/></a></div></section>
    </main>
  );
}

function NotFound() {
  return <main className="grid min-h-[60vh] place-items-center px-6 py-20 text-center"><div><Eyebrow>Page not found</Eyebrow><h1 className="display mt-6 text-5xl text-[#18383d]">A wrong turn.</h1><p className="mt-4 text-sm text-[#63716e]">This page isn’t here, but we can get you back on track.</p><Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#24645e] px-6 py-3.5 text-sm font-bold text-[#f7f3e9]">Back to Anrosys <ArrowRight size={15}/></Link></div></main>;
}

function App() {
  return <>
    <Metadata />
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
    <Header />
    <div id="main-content"><Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/careers" component={Careers} />
      <Route component={NotFound} />
    </Switch></div>
    <Footer />
  </>;
}

export default App;
