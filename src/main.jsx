import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Feather, Mail, NotebookPen, Sparkles } from 'lucide-react';
import './styles.css';

const navItems = [
  { id: 'home', label: '首页', en: 'Home' },
  { id: 'about', label: '关于', en: 'About' },
  { id: 'projects', label: '项目', en: 'Projects' },
  { id: 'journal', label: '日志', en: 'Journal' },
  { id: 'contact', label: '联系', en: 'Contact' },
];

const entryCards = [
  {
    id: 'about',
    eyebrow: '01 / About Me',
    title: '个人手札',
    text: '关于我与创作的起点、方法和生活方式。',
    action: 'Read more',
    icon: Feather,
    drift: 'card-a',
  },
  {
    id: 'projects',
    eyebrow: '02 / Projects',
    title: '作品档案',
    text: '精选作品与案例展示，探索想法落地的过程。',
    action: 'View projects',
    icon: Sparkles,
    drift: 'card-b',
  },
  {
    id: 'journal',
    eyebrow: '03 / Journal',
    title: '日常来信',
    text: '记录灵感与思考的日常，文字、影像与随笔。',
    action: 'Read journal',
    icon: BookOpen,
    drift: 'card-c',
  },
  {
    id: 'contact',
    eyebrow: '04 / Contact',
    title: '寄出一封信',
    text: '有想法或合作意向？期待与你交流。',
    action: 'Say hello',
    icon: Mail,
    drift: 'card-d',
  },
];

const projects = [
  {
    title: '书信式交互首页',
    tag: 'Web / Motion',
    text: '以信封展开、纸卡上浮与金线导航构成首页叙事。',
  },
  {
    title: '旧照片视觉系统',
    tag: 'Visual / Identity',
    text: '用青蓝底色、米色纸张、红色花卉重构复古记忆感。',
  },
  {
    title: '灵感日记模块',
    tag: 'Journal / Writing',
    text: '把文章列表设计成散落信纸与邮戳索引。',
  },
];

const journal = [
  ['05.01', '关于一封信的网页结构'],
  ['05.03', '青蓝、红花与金色线条'],
  ['05.08', '把作品集做成可阅读的故事'],
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function useActiveSection() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { threshold: [0.24, 0.42, 0.6], rootMargin: '-10% 0px -35% 0px' },
    );

    navItems.forEach((item) => {
      const node = document.getElementById(item.id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function Header() {
  const active = useActiveSection();

  return (
    <header className="site-header">
      <button className="brand" onClick={() => scrollToSection('home')} aria-label="Back to home">
        <span>LIEGG</span>
        <small>A Little Love Letter</small>
      </button>
      <nav aria-label="Main navigation">
        {navItems.slice(1).map((item) => (
          <button
            key={item.id}
            className={active === item.id ? 'active' : ''}
            onClick={() => scrollToSection(item.id)}
          >
            {item.en}
          </button>
        ))}
      </nav>
      <span className="header-mark">写给日常的情书</span>
    </header>
  );
}

function GoldOrnaments() {
  return (
    <div className="gold-ornaments" aria-hidden="true">
      <span className="ornament o1" />
      <span className="ornament o2" />
      <span className="ornament o3" />
      <span className="cloud-line c1" />
      <span className="cloud-line c2" />
    </div>
  );
}

function FlowerCluster() {
  return (
    <div className="flower-cluster" aria-hidden="true">
      <span className="petal p1" />
      <span className="petal p2" />
      <span className="petal p3" />
      <span className="petal p4" />
      <span className="petal p5" />
      <span className="petal p6" />
      <i className="stamen s1" />
      <i className="stamen s2" />
      <i className="stem" />
      <i className="leaf l1" />
      <i className="leaf l2" />
    </div>
  );
}

function EnvelopeStage() {
  return (
    <motion.div className="envelope-stage" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}>
      <motion.div className="letter-back" animate={{ y: [0, -7, 0] }} transition={{ duration: 8, repeat: Infinity }} />
      <FlowerCluster />
      <motion.div
        className="ribbon"
        animate={{ rotate: [-7, -9, -5, -7], y: [0, -3, 2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="envelope" whileHover={{ y: -8, rotate: -2 }}>
        <div className="wax-seal">L</div>
        <span className="stamp">A LITTLE<br />LOVE</span>
        <span className="envelope-lines">for visitors<br />and little moments</span>
      </motion.div>
      <div className="petal-fall one" />
      <div className="petal-fall two" />
      <div className="mini-person person-reader" />
      <div className="mini-person person-photo" />
    </motion.div>
  );
}

function PaperCard({ card, index }) {
  const Icon = card.icon;

  return (
    <motion.article
      className={`paper-card ${card.drift}`}
      initial={{ opacity: 0, y: 24, rotate: index % 2 ? 1 : -1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -12, rotate: 0 }}
      onClick={() => scrollToSection(card.id)}
    >
      <span className="pin" />
      <Icon size={23} />
      <small>{card.eyebrow}</small>
      <h3>{card.title}</h3>
      <p>{card.text}</p>
      <button>
        {card.action} <ArrowRight size={15} />
      </button>
    </motion.article>
  );
}

function SectionTitle({ number, eyebrow, title, children }) {
  return (
    <div className="section-title">
      <small>{number} / {eyebrow}</small>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero section" id="home">
      <GoldOrnaments />
      <div className="hero-copy">
        <motion.p className="kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          一封写给访客的个人来信
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          LIEGG 的<br />个人网站
        </motion.h1>
        <motion.p className="subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}>
          A personal web story
        </motion.p>
        <p className="role">设计师 / 开发者 / 视觉创作者</p>
        <p className="intro">
          我用代码搭建想象，用图像记录感受，在日常的细微里寻找灵感的形状，
          把热爱变成持续创造的理由。
        </p>
        <div className="hero-actions">
          <button onClick={() => scrollToSection('projects')}>翻阅作品</button>
          <button className="ghost" onClick={() => scrollToSection('contact')}>寄出一封信</button>
        </div>
      </div>
      <EnvelopeStage />
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section">
      <SectionTitle number="01" eyebrow="About" title="像翻开一页私人手札">
        这里不是简历，而是一组关于创作方法、兴趣与日常观察的纸页。
      </SectionTitle>
      <div className="note-grid">
        {['视觉叙事', '前端实现', '影像记录', '创意编码', '生活观察', '持续学习'].map((item) => (
          <motion.div className="note" key={item} whileHover={{ y: -6, rotate: -1 }}>
            {item}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <SectionTitle number="02" eyebrow="Projects" title="作品像一叠旧信纸">
        每个项目都保留一点创作过程：想法、草图、实现和情绪。
      </SectionTitle>
      <div className="project-grid">
        {projects.map((item, index) => (
          <motion.article
            className="project-card"
            key={item.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -8 }}
          >
            <div className="project-image">{String(index + 1).padStart(2, '0')}</div>
            <small>{item.tag}</small>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Journal() {
  return (
    <section id="journal" className="section journal-section">
      <SectionTitle number="03" eyebrow="Journal" title="散落的日记纸页">
        记录灵感与生活的短句，像从信封里滑出的几张便笺。
      </SectionTitle>
      <div className="journal-list">
        {journal.map(([date, title]) => (
          <motion.article key={title} whileHover={{ x: 10 }}>
            <time>{date}</time>
            <span>{title}</span>
            <ArrowRight size={16} />
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const status = useMemo(() => sent ? '信已寄出，期待与你相遇。' : '写下你的想法，我会认真读完。', [sent]);

  return (
    <section id="contact" className="section contact-section">
      <SectionTitle number="04" eyebrow="Contact" title="寄出一封信">
        {status}
      </SectionTitle>
      <div className="contact-card">
        <div>
          <small>Email</small>
          <b>hello@liegg.dev</b>
        </div>
        <div>
          <small>Social</small>
          <b>@liegg.dev</b>
        </div>
        <button onClick={() => setSent(true)} className={sent ? 'sent' : ''}>
          {sent ? '已寄出 / Sent' : '寄出 / Send Letter'}
        </button>
      </div>
    </section>
  );
}

function VerticalNav() {
  const active = useActiveSection();

  return (
    <aside className="vertical-nav" aria-label="Section anchors">
      {navItems.slice(1).map((item) => (
        <button
          key={item.id}
          className={active === item.id ? 'active' : ''}
          onClick={() => scrollToSection(item.id)}
        >
          {item.label}
        </button>
      ))}
    </aside>
  );
}

function App() {
  return (
    <main>
      <Header />
      <VerticalNav />
      <Hero />
      <section className="cards-strip" aria-label="Site sections">
        {entryCards.map((card, index) => <PaperCard key={card.id} card={card} index={index} />)}
      </section>
      <About />
      <Projects />
      <Journal />
      <Contact />
      <footer className="footer">
        <span>© 2026 LIEGG</span>
        <span>GitHub / Instagram / Behance / Email</span>
        <button onClick={() => scrollToSection('home')}>Back to top ↑</button>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
