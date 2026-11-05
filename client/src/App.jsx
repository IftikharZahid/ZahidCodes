import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowUpRight,
  Github,
  Globe,
  Code2,
  Layers3,
  Smartphone,
  Search,
  Menu,
  X,
  Sparkles,
  Mail,
  Linkedin,
  Instagram,
  Facebook,
  ChevronRight,
  ExternalLink,
  Plus,
  Pencil,
  Trash2,
  LogOut,
  LayoutDashboard,
  FolderKanban,
  Star,
  Eye,
  CheckCircle2,
  Bot,
  Send,
  RotateCcw,
  MessageSquare,
} from "lucide-react";
import { seedProjects } from "./data/seedProjects";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const asset = (p) => p;

function WhatsAppIcon({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0 }}
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.45 0-2.87-.38-4.12-1.11l-.3-.17-3.12.82.83-3.04-.19-.32a8.2 8.2 0 0 1-1.25-4.42c0-4.54 3.69-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.49-1.41-1.74-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z" />
    </svg>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <Link to="/" className="brand">
        <img src="/assets/zahidcodes-logo.png" />
        <span>
          Zahid<span className="cyan">Codes</span>
          <small>DECODING THE FUTURE</small>
        </span>
      </Link>
      <button className="mobile-menu" onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? "navlinks show" : "navlinks"}>
        <a href="#work" onClick={() => setOpen(false)}>
          Projects
        </a>
        <a href="#services" onClick={() => setOpen(false)}>
          What I do
        </a>
        <a href="#about" onClick={() => setOpen(false)}>
          About
        </a>
        <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
          Let's talk <ArrowUpRight size={16} />
        </a>
      </nav>
    </header>
  );
}
function ProjectCard({ p, onOpen }) {
  return (
    <article
      className="project-card"
      onClick={() => onOpen(p)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen(p);
      }}
      tabIndex={0}
      role="link"
      aria-label={`View ${p.title} project details`}
    >
      <div className="project-image">
        <img
          src={p.image || "/assets/projects/web-platform.svg"}
          onError={(e) =>
            (e.currentTarget.src = "/assets/projects/web-platform.svg")
          }
        />
        <span className="image-arrow">
          <ArrowUpRight />
        </span>
        {p.featured && (
          <span className="featured-tag">
            <Star size={12} fill="currentColor" /> Featured
          </span>
        )}
      </div>
      <div className="project-info">
        <div className="project-meta">
          <span>{p.category}</span>
          <span>{(p.technologies || []).slice(0, 2).join(" · ")}</span>
        </div>
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
        <button className="text-link">
          Explore project <ArrowUpRight size={15} />
        </button>
      </div>
    </article>
  );
}
function Detail({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          <X />
        </button>
        <img className="detail-image" src={project.image} />
        <div className="detail-content">
          <span className="eyebrow">{project.category}</span>
          <h2>{project.title}</h2>
          <p>{project.description || project.summary}</p>
          <div className="chips">
            {(project.technologies || []).map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="detail-actions">
            {project.liveUrl && (
              <a
                className="button primary"
                href={project.liveUrl}
                target="_blank"
              >
                Live preview <ExternalLink size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a
                className="button ghost"
                href={project.githubUrl}
                target="_blank"
              >
                <Github size={16} /> Source code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
function slugify(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function youtubeEmbedUrl(value = "") {
  try {
    const url = new URL(value);
    if (!["www.youtube.com", "youtube.com", "youtu.be", "m.youtube.com"].includes(url.hostname)) {
      return "";
    }
    if (url.hostname === "youtu.be") return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    if (url.pathname.startsWith("/embed/")) return url.toString();
    const id = url.searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : "";
  } catch {
    return "";
  }
}

function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    axios
      .get(`${API}/projects/${slug}`)
      .then((r) => active && setProject(r.data))
      .catch(() => {
        const fallback = seedProjects.find(
          (item) => item.slug === slug || slugify(item.title) === slug,
        );
        if (active) setProject(fallback || null);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return <div className="project-detail-state">Loading project details…</div>;
  }
  if (!project) {
    return (
      <div className="project-detail-state">
        <p className="eyebrow">PROJECT NOT FOUND</p>
        <h1>That project is unavailable.</h1>
        <button className="button primary" onClick={() => navigate("/")}>
          Back to projects <ArrowUpRight size={16} />
        </button>
      </div>
    );
  }

  const video = youtubeEmbedUrl(project.videoUrl);
  const features = Array.isArray(project.features)
    ? project.features
    : (project.features || "").split(",").map((item) => item.trim()).filter(Boolean);

  return (
    <div className="project-detail-page">
      <Header />
      <main className="project-detail">
        <button className="back-link project-back" onClick={() => navigate("/")}>
          <ChevronRight size={16} className="back-icon" /> Back to projects
        </button>
        <div className="project-detail-hero">
          <div className="project-detail-copy">
            <p className="eyebrow">{project.category}</p>
            <h1>{project.title}</h1>
            <p className="project-detail-summary">{project.summary}</p>
            <div className="detail-actions">
              {project.liveUrl && (
                <a className="button primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                  Live preview <ExternalLink size={16} />
                </a>
              )}
              {project.githubUrl && (
                <a className="button ghost" href={project.githubUrl} target="_blank" rel="noreferrer">
                  <Github size={16} /> Source code
                </a>
              )}
            </div>
          </div>
          <img
            className="project-detail-image"
            src={project.image || "/assets/projects/web-platform.svg"}
            alt={`${project.title} preview`}
            onError={(e) => (e.currentTarget.src = "/assets/projects/web-platform.svg")}
          />
        </div>
        <div className="project-detail-layout">
          <article className="project-detail-main">
            <section className="detail-section">
              <p className="eyebrow">ABOUT THE PROJECT</p>
              <h2>Built to make an idea useful.</h2>
              <p>{project.description || project.summary}</p>
            </section>
            {features.length > 0 && (
              <section className="detail-section">
                <p className="eyebrow">KEY FEATURES</p>
                <ul className="feature-list">
                  {features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </section>
            )}
            {video && (
              <section className="detail-section">
                <p className="eyebrow">PROJECT WALKTHROUGH</p>
                <div className="video-frame">
                  <iframe
                    src={video}
                    title={`${project.title} video walkthrough`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </section>
            )}
          </article>
          <aside className="project-facts">
            <div>
              <span>Category</span>
              <strong>{project.category || "—"}</strong>
            </div>
            <div>
              <span>Technology</span>
              <div className="chips">
                {(project.technologies || []).map((technology) => <span key={technology}>{technology}</span>)}
              </div>
            </div>
            {project.role && <div><span>Role</span><strong>{project.role}</strong></div>}
            {project.year && <div><span>Year</span><strong>{project.year}</strong></div>}
          </aside>
        </div>
      </main>
    </div>
  );
}
function Home() {
  const [projects, setProjects] = useState(seedProjects),
    [query, setQuery] = useState(""),
    [category, setCategory] = useState("All"),
    [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${API}/projects`)
      .then((r) => {
        if (r.data?.length) setProjects(r.data);
      })
      .catch(() => {});
  }, []);
  const categories = [
    "All",
    ...new Set(projects.map((p) => p.category).filter(Boolean)),
  ];
  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (p.title + " " + p.summary + " " + (p.technologies || []).join(" "))
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (category === "All" || p.category === category),
      ),
    [projects, query, category],
  );
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-glow" />
          <div className="hero-copy">
            <div className="availability">
              <span /> AVAILABLE FOR SELECT PROJECTS
            </div>
            <p className="hero-kicker">
              INDEPENDENT DEVELOPER & DIGITAL PRODUCT BUILDER
            </p>
            <h1>
              Turning ideas into
              <br />
              <span className="gradient-text">digital experiences.</span>
            </h1>
            <p className="hero-desc">
              I’m Iftikhar Zahid — building useful software, mobile apps and web
              platforms that solve real-world problems.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                Explore my work <ArrowUpRight size={17} />
              </a>
              <a className="button ghost" href="#contact">
                Get in touch <ChevronRight size={17} />
              </a>
            </div>
            <div className="hero-stats">
              <div>
                <b>
                  09<span>+</span>
                </b>
                <small>Showcase projects</small>
              </div>
              <div>
                <b>03</b>
                <small>Core disciplines</small>
              </div>
              <div>
                <b>
                  100<span>%</span>
                </b>
                <small>Problem-focused</small>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="profile-frame">
              <img src="/assets/iftikhar-zahid.png" alt="Iftikhar Zahid" />
            </div>
            <div className="floating-card code-card">
              <Code2 />
              <span>
                <b>Clean code</b>
                <small>Built to scale</small>
              </span>
            </div>
            <div className="floating-card stack-card">
              <Layers3 />
              <span>
                <b>Full-stack</b>
                <small>Web · Mobile · AI</small>
              </span>
            </div>
          </div>
        </section>
        <section className="trust-strip">
          <span>BUILDING WITH</span>
          <b>React.js</b>
          <b>React Native</b>
          <b>Node.js</b>
          <b>Python</b>
          <b>MongoDB</b>
          <b>Firebase</b>
        </section>
        <section id="work" className="section work-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SELECTED WORK</p>
              <h2>
                Projects that make
                <br />
                <span className="muted-title">ideas useful.</span>
              </h2>
            </div>
            <p className="section-note">
              A curated collection of products, experiments and digital
              solutions. More work is added as projects evolve.
            </p>
          </div>
          <div className="filter-row">
            <div className="filters">
              {categories.map((c) => (
                <button
                  key={c}
                  className={category === c ? "filter active" : "filter"}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="search-box">
              <Search size={16} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects"
              />
            </label>
          </div>
          <div className="project-grid">
            {filtered.map((p) => (
              <ProjectCard
                key={p._id || p.id || p.slug}
                p={p}
                onOpen={(project) => navigate(`/projects/${project.slug || slugify(project.title)}`)}
              />
            ))}
          </div>
          {!filtered.length && (
            <div className="empty">
              No projects match your search. Try another keyword or category.
            </div>
          )}
        </section>
        <section id="services" className="section services-section">
          <p className="eyebrow">CAPABILITIES</p>
          <h2>
            From first sketch to
            <br />
            <span className="muted-title">a working product.</span>
          </h2>
          <div className="service-grid">
            <div className="service">
              <div className="service-icon">
                <Globe />
              </div>
              <h3>Web Development</h3>
              <p>
                Responsive websites, dashboards and full-stack platforms
                designed for performance and maintainability.
              </p>
              <span>React · Node.js · APIs</span>
            </div>
            <div className="service">
              <div className="service-icon">
                <Smartphone />
              </div>
              <h3>Mobile Applications</h3>
              <p>
                Practical Android applications with thoughtful user experiences
                and reliable backend integration.
              </p>
              <span>React Native · Expo</span>
            </div>
            <div className="service">
              <div className="service-icon">
                <Sparkles />
              </div>
              <h3>AI & Automation</h3>
              <p>
                Intelligent tools and workflow automation that reduce repetitive
                work and unlock better decisions.
              </p>
              <span>Python · AI · Automation</span>
            </div>
          </div>
        </section>
        <section id="about" className="about-section">
          <div className="about-photo">
            <img src="/assets/iftikhar-zahid.png" />
          </div>
          <div>
            <p className="eyebrow">A LITTLE ABOUT ME</p>
            <h2>
              Technology should
              <br />
              make things <span className="gradient-text">simpler.</span>
            </h2>
            <p>
              I’m a computer science educator and software developer focused on
              creating practical digital products. ZahidCodes is the home for my
              independent work — from education technology to custom web and
              mobile applications.
            </p>
            <a className="text-link" href="#contact">
              Let's build something useful <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="contact-copy">
            <p className="eyebrow">HAVE A PROJECT IN MIND?</p>
            <h2>
              Let's make your
              <br />
              <span className="gradient-text">next idea real.</span>
            </h2>
            <p>
              Have a product idea, an institute or business that needs a digital
              system, or a collaboration in mind? Reach out directly — I'm
              active and quick to respond.
            </p>
          </div>
          <div className="contact-channels">
            <div className="contact-primary-actions">
              <a
                className="contact-btn whatsapp"
                href="https://wa.me/+923007971374"
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon size={19} />
                <div className="contact-btn-text">
                  <b>Chat on WhatsApp</b>
                  <small>Instant response</small>
                </div>
                <ArrowUpRight size={16} />
              </a>
              <a
                className="contact-btn email"
                href="mailto:XahidCodes@gmail.com"
              >
                <Mail size={19} />
                <div className="contact-btn-text">
                  <b>Send an Email</b>
                  <small>XahidCodes@gmail.com</small>
                </div>
                <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="contact-social-row">
              <a
                className="social-pill fb"
                href="https://facebook.com/iftikharxahid"
                target="_blank"
                rel="noreferrer"
                title="Facebook"
              >
                <Facebook size={15} /> <span>Facebook</span>
              </a>
              <a
                className="social-pill insta"
                href="https://instagram.com/iftikharxahid"
                target="_blank"
                rel="noreferrer"
                title="Instagram"
              >
                <Instagram size={15} /> <span>Instagram</span>
              </a>
              <a
                className="social-pill gh"
                href="https://github.com/IftikharZahid"
                target="_blank"
                rel="noreferrer"
                title="GitHub"
              >
                <Github size={15} /> <span>GitHub</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <Link to="/" className="footer-brand">
          Zahid<span>Codes</span>
        </Link>
        <span>
          © {new Date().getFullYear()} ZahidCodes. Built with purpose.
        </span>
        <div className="footer-links">
          <a
            href="https://wa.me/+923007971374"
            target="_blank"
            rel="noreferrer"
            title="WhatsApp"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon size={16} />
          </a>
          <a
            href="https://facebook.com/zahidcodes"
            target="_blank"
            rel="noreferrer"
            title="Facebook"
            aria-label="Facebook"
          >
            <Facebook size={16} />
          </a>
          <a
            href="https://instagram.com/iftikharxahid"
            target="_blank"
            rel="noreferrer"
            title="Instagram"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
          <a
            href="https://github.com/IftikharZahid"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="mailto:XahidCodes@gmail.com"
            title="Email"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>
      </footer>

      <AIAssistant />
    </>
  );
}

function renderFormattedText(text) {
  if (!text) return null;
  const lines = text.split("\n");
  return lines.map((line, idx) => {
    const parts = [];
    const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith("**") && token.endsWith("**")) {
        parts.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
      } else if (token.startsWith("[") && token.includes("](")) {
        const linkText = token.substring(1, token.indexOf("]("));
        const linkUrl = token.substring(
          token.indexOf("](") + 2,
          token.length - 1,
        );
        parts.push(
          <a
            key={match.index}
            href={linkUrl}
            target="_blank"
            rel="noreferrer"
            className="chat-link"
          >
            {linkText}
          </a>,
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    const trimmed = line.trim();
    if (
      trimmed.startsWith("- ") ||
      trimmed.startsWith("• ") ||
      /^\d+\.\s/.test(trimmed)
    ) {
      return (
        <li key={idx} className="chat-list-item">
          {parts.length ? parts : trimmed.replace(/^[-•\d.]\s*/, "")}
        </li>
      );
    }

    if (!trimmed) {
      return <div key={idx} className="chat-spacer" />;
    }

    return (
      <p key={idx} className="chat-p">
        {parts.length ? parts : line}
      </p>
    );
  });
}

function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi there! 👋 I'm **Iftikhar Zahid's AI Assistant**.\n\nAsk me anything about his technical skills, projects, services, or how to get in touch for custom software development!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [teaser, setTeaser] = useState(true);
  const messagesEndRef = React.useRef(null);

  const quickPrompts = [
    "💻 Core skills & tech stack",
    "🚀 The Seeks Academy suite",
    "🛠️ Available services",
    "📩 How to hire or contact",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
      setTeaser(false);
    }
  }, [open, messages, loading]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const handleSend = async (queryText) => {
    const text = (queryText || input).trim();
    if (!text || loading) return;

    const userMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API}/chat`, { message: text });
      if (res.data?.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: res.data.reply },
        ]);
      } else {
        throw new Error("No response");
      }
    } catch {
      let fallback =
        "Iftikhar Zahid is an independent developer and CS educator specializing in **Web Platforms (React & Node.js)**, **Mobile Apps (React Native & Expo)**, and **AI & Automation**.\n\nYou can connect directly anytime on **WhatsApp** or via **XahidCodes@gmail.com**!";
      const q = text.toLowerCase();
      if (
        q.includes("skill") ||
        q.includes("stack") ||
        q.includes("technolog")
      ) {
        fallback =
          "Here is Iftikhar's tech stack:\n- **Frontend**: React.js, Vite, JavaScript (ES6+), HTML5, Modern CSS\n- **Mobile**: React Native, Expo (Android & iOS)\n- **Backend**: Node.js, Express.js, REST APIs\n- **Databases**: MongoDB, Firebase\n- **AI & Automation**: Python, AI APIs";
      } else if (
        q.includes("project") ||
        q.includes("seeks") ||
        q.includes("portfolio")
      ) {
        fallback =
          "Some of Iftikhar's key projects include:\n1. **The Seeks Academy Suite**: Connected institute ecosystem with Web Admin, Teacher App, and Student App.\n2. **Teacher Mobile App**: Attendance, diary, exam grading.\n3. **Student Learning App**: Video lectures, e-Library, and result tracking.\n4. **Analytics Dashboards & APIs**: Node.js & MongoDB cloud platforms.";
      } else if (
        q.includes("contact") ||
        q.includes("hire") ||
        q.includes("reach") ||
        q.includes("email") ||
        q.includes("whatsapp")
      ) {
        fallback =
          "You can connect with Iftikhar directly through:\n- 💬 **WhatsApp**: [Chat directly on WhatsApp](https://wa.me/+923007971374/)\n- ✉️ **Email**: [ZahidCodes](mailto:XahidCodes@gmail.com)\n- 🌐 **Facebook**: [facebook](https://facebook.com/zahidcodes)\n- 📸 **Instagram**: [instagram](https://instagram.com/zahidcodes)\n- 💻 **GitHub**: [github](https://github.com/IftikharZahid)";
      }
      setMessages((prev) => [...prev, { role: "assistant", text: fallback }]);
    } finally {
      setLoading(false);
    }
  };
  
  const clearHistory = () => {
    setMessages([
      {
        role: "assistant",
        text: "Conversation reset! How can I assist you with Iftikhar's portfolio today?",
      },
    ]);
  };

  return (
    <aside
      className={`ai-assistant-container ${open ? "drawer-open" : ""}`}
      aria-label="AI Portfolio Assistant"
    >
      {/* Mobile Backdrop */}
      {open && (
        <div
          className="ai-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating Trigger Button */}
      <div className={`ai-floating-wrap ${open ? "is-open" : ""}`}>
        {teaser && !open && (
          <div className="ai-teaser" onClick={() => setOpen(true)}>
            <div className="ai-teaser-text">
              <Sparkles size={13} className="cyan" />
              <span>Ask AI about Iftikhar</span>
            </div>
            <button
              type="button"
              className="ai-teaser-close"
              onClick={(e) => {
                e.stopPropagation();
                setTeaser(false);
              }}
              aria-label="Dismiss message"
            >
              <X size={12} />
            </button>
          </div>
        )}

        <button
          type="button"
          className={`ai-trigger-btn ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close AI Assistant" : "Open AI Assistant"}
          title="Chat with ZahidCodes AI"
        >
          <span className="ai-pulse-dot" />
          {open ? <X size={20} /> : <Bot size={20} />}
          <span className="ai-trigger-label">{open ? "Close" : "Ask AI"}</span>
        </button>
      </div>

      {/* Floating Chat Drawer */}
      {open && (
        <div
          className="ai-chat-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="AI Assistant Window"
        >
          {/* Mobile Sheet Pull Bar */}
          <div className="ai-mobile-handle-bar">
            <span className="ai-mobile-handle" />
          </div>

          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-chat-header-info">
              <div className="ai-avatar-ring">
                <Bot size={18} />
                <span className="ai-status-online" />
              </div>
              <div>
                <div className="ai-header-title">
                  <b>ZahidCodes AI</b>
                  <span className="ai-badge">Online</span>
                </div>
                <small className="ai-header-subtitle">
                  Answers about projects & skills
                </small>
              </div>
            </div>
            <div className="ai-header-actions">
              <button
                type="button"
                className="ai-icon-action"
                onClick={clearHistory}
                title="Restart chat"
                aria-label="Restart chat"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                className="ai-icon-action"
                onClick={() => setOpen(false)}
                title="Minimize chat"
                aria-label="Minimize chat"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="ai-chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`ai-message ${m.role}`}>
                {m.role === "assistant" && (
                  <div className="ai-msg-avatar">
                    <Bot size={13} />
                  </div>
                )}
                <div className="ai-msg-bubble">
                  {renderFormattedText(m.text)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="ai-message assistant">
                <div className="ai-msg-avatar">
                  <Bot size={13} />
                </div>
                <div className="ai-msg-bubble typing-bubble">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="ai-quick-prompts">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                type="button"
                className="ai-prompt-chip"
                onClick={() => handleSend(q.replace(/^[^\s]+\s/, ""))}
                disabled={loading}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            className="ai-chat-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Iftikhar..."
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className="ai-send-btn"
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}

function AdminLogin() {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState("");
  const nav = useNavigate();
  async function submit(e) {
    e.preventDefault();
    try {
      const r = await axios.post(`${API}/auth/login`, { email, password });
      localStorage.setItem("zc_token", r.data.token);
      nav("/admin");
    } catch (e) {
      setError(e.response?.data?.message || "Could not connect to the API.");
    }
  }
  return (
    <div className="admin-shell">
      <div className="login-card">
        <Link to="/" className="brand">
          <img src="/assets/zahidcodes-logo.png" alt="ZahidCodes" />
          <span>
            Zahid<span className="cyan">Codes</span>
          </span>
        </Link>
        <p className="eyebrow">CONTENT MANAGEMENT</p>
        <h1>Welcome back.</h1>
        <p className="login-desc">Sign in to manage your project showcase.</p>
        <form onSubmit={submit}>
          <label>
            <span>Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@zahidcodes.tech"
              autoComplete="email"
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
            />
          </label>
          {error && <div className="error">{error}</div>}
          <button className="button primary full">
            Sign in <ArrowUpRight size={16} />
          </button>
        </form>
        <Link className="back-link" to="/">
          ← Back to portfolio
        </Link>
      </div>
    </div>
  );
}

function Admin() {
  const nav = useNavigate(),
    [items, setItems] = useState([]),
    [loading, setLoading] = useState(true),
    [form, setForm] = useState(null),
    [message, setMessage] = useState("");
  const token = localStorage.getItem("zc_token");
  const headers = { Authorization: `Bearer ${token}` };

  async function load() {
    try {
      const r = await axios.get(`${API}/projects?admin=true`);
      setItems(r.data);
    } catch {
      setItems(seedProjects);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!token) {
      nav("/admin/login");
      return;
    }
    load();
  }, []);

  function logout() {
    localStorage.removeItem("zc_token");
    nav("/admin/login");
  }

  async function save(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      if (form._id)
        await axios.put(`${API}/projects/${form._id}`, fd, { headers });
      else await axios.post(`${API}/projects`, fd, { headers });
      setMessage("Project saved successfully.");
      setForm(null);
      load();
    } catch (e) {
      setMessage(
        e.response?.data?.message || "Save failed. Check API and MongoDB.",
      );
    }
  }

  async function del(id) {
    if (!confirm("Delete this project?")) return;
    try {
      await axios.delete(`${API}/projects/${id}`, { headers });
      setMessage("Project deleted.");
      load();
    } catch {
      setMessage("Delete failed.");
    }
  }

  return (
    <div className="admin-layout">
      {/* Sidebar for desktop / Header topbar for mobile & tablets */}
      <aside className="admin-side">
        <div className="admin-side-top">
          <Link to="/" className="brand">
            <img src="/assets/zahidcodes-logo.png" alt="ZahidCodes" />
            <span>
              Zahid<span className="cyan">Codes</span>
            </span>
          </Link>
          <div className="admin-mobile-nav-actions">
            <Link
              to="/"
              className="admin-nav-link"
              title="View Portfolio Website"
            >
              <ExternalLink size={14} /> <span>View site</span>
            </Link>
            <button
              onClick={logout}
              className="admin-nav-btn logout-pill"
              title="Sign out"
            >
              <LogOut size={14} /> <span>Sign out</span>
            </button>
          </div>
        </div>

        <div className="admin-side-body">
          <p className="side-label">WORKSPACE</p>
          <div className="side-active">
            <LayoutDashboard size={17} /> <span>Overview</span>
          </div>
          <div className="side-active current">
            <FolderKanban size={17} /> <span>Projects</span>
          </div>
          <Link to="/" className="side-link">
            <Globe size={17} /> <span>View Website</span>
          </Link>
        </div>

        <div className="admin-side-footer">
          <button onClick={logout} className="logout">
            <LogOut size={16} /> <span>Sign out</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-top">
          <div className="admin-top-text">
            <p className="eyebrow">PORTFOLIO CMS</p>
            <h1>Projects</h1>
            <p className="admin-subtitle">
              Manage the work displayed on ZahidCodes.tech.
            </p>
          </div>
          <button
            className="button primary add-btn"
            onClick={() => setForm({})}
          >
            <Plus size={18} /> <span>Add project</span>
          </button>
        </div>

        {message && (
          <div className="notice">
            <div className="notice-inner">
              <CheckCircle2 size={16} />
              <span>{message}</span>
            </div>
            <button
              type="button"
              className="notice-close"
              onClick={() => setMessage("")}
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* Dashboard KPIs */}
        <div className="admin-kpis">
          <div className="kpi-card">
            <span>Total projects</span>
            <b>{items.length}</b>
          </div>
          <div className="kpi-card">
            <span>Featured</span>
            <b>{items.filter((x) => x.featured).length}</b>
          </div>
          <div className="kpi-card">
            <span>Published</span>
            <b>{items.filter((x) => x.status === "published").length}</b>
          </div>
        </div>

        {/* Desktop Data Table (> 768px) */}
        <div className="admin-table-wrap desktop-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Category</th>
                <th>Status</th>
                <th>Featured</th>
                <th className="actions-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p._id || p.id}>
                  <td>
                    <div className="table-project">
                      <img
                        src={p.image || "/assets/projects/web-platform.svg"}
                        onError={(e) =>
                          (e.currentTarget.src =
                            "/assets/projects/web-platform.svg")
                        }
                        alt=""
                      />
                      <div className="table-project-meta">
                        <b>{p.title}</b>
                        <small>
                          {(p.technologies || []).slice(0, 3).join(" · ")}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="category-pill">{p.category}</span>
                  </td>
                  <td>
                    <span className={`status ${p.status || "published"}`}>
                      {p.status || "published"}
                    </span>
                  </td>
                  <td>
                    {p.featured ? (
                      <span className="badge-featured">
                        <Star size={12} fill="currentColor" /> Yes
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="actions-cell">
                    <button
                      className="icon-btn"
                      title="Edit project"
                      onClick={() => setForm(p)}
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      className="icon-btn danger"
                      title="Delete project"
                      onClick={() => del(p._id)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!items.length && !loading && (
            <p className="empty">
              No database projects found yet. Add your first project.
            </p>
          )}
        </div>

        {/* Mobile Cards View (<= 768px) */}
        <div className="admin-cards-list mobile-cards-list">
          {items.map((p) => (
            <article className="admin-mobile-card" key={p._id || p.id}>
              <div className="admin-card-head">
                <img
                  className="admin-card-img"
                  src={p.image || "/assets/projects/web-platform.svg"}
                  onError={(e) =>
                    (e.currentTarget.src = "/assets/projects/web-platform.svg")
                  }
                  alt=""
                />
                <div className="admin-card-info">
                  <span className="admin-card-category">{p.category}</span>
                  <h3 className="admin-card-title">{p.title}</h3>
                  <div className="admin-card-badges">
                    <span className={`status ${p.status || "published"}`}>
                      {p.status || "published"}
                    </span>
                    {p.featured && (
                      <span className="badge-featured">
                        <Star size={11} fill="currentColor" /> Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {p.summary && <p className="admin-card-summary">{p.summary}</p>}
              <div className="admin-card-actions">
                <button
                  className="mobile-action-btn edit"
                  onClick={() => setForm(p)}
                >
                  <Pencil size={15} /> <span>Edit</span>
                </button>
                <button
                  className="mobile-action-btn delete"
                  onClick={() => del(p._id)}
                >
                  <Trash2 size={15} /> <span>Delete</span>
                </button>
              </div>
            </article>
          ))}
          {!items.length && !loading && (
            <p className="empty">
              No database projects found yet. Add your first project.
            </p>
          )}
        </div>

        {/* Responsive Add / Edit Modal */}
        {form && (
          <div className="modal-backdrop" onClick={() => setForm(null)}>
            <form
              className="project-form"
              onSubmit={save}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="project-form-header">
                <div>
                  <p className="eyebrow">
                    {form._id ? "EDIT PROJECT" : "NEW PROJECT"}
                  </p>
                  <h2>{form._id ? "Update project" : "Add a project"}</h2>
                </div>
                <button
                  type="button"
                  className="close"
                  onClick={() => setForm(null)}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="project-form-fields">
                <label>
                  <span>Project title *</span>
                  <input
                    name="title"
                    required
                    defaultValue={form.title || ""}
                    placeholder="e.g. Modern Web Platform"
                  />
                </label>

                <label>
                  <span>Category *</span>
                  <input
                    name="category"
                    required
                    defaultValue={form.category || "Web Development"}
                    placeholder="e.g. Web Development, Mobile Apps"
                  />
                </label>

                <label>
                  <span>Short summary *</span>
                  <textarea
                    name="summary"
                    required
                    rows={2}
                    defaultValue={form.summary || ""}
                    placeholder="Brief one or two line overview"
                  />
                </label>

                <label>
                  <span>Description</span>
                  <textarea
                    name="description"
                    rows={3}
                    defaultValue={form.description || ""}
                    placeholder="Full project details"
                  />
                </label>

                <label>
                  <span>YouTube video URL</span>
                  <input
                    name="videoUrl"
                    defaultValue={form.videoUrl || ""}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </label>

                <label>
                  <span>Key features (comma separated)</span>
                  <textarea
                    name="features"
                    rows={2}
                    defaultValue={(form.features || []).join(", ")}
                    placeholder="Attendance, reports, notifications"
                  />
                </label>

                <div className="form-row-2">
                  <label>
                    <span>Your role</span>
                    <input
                      name="role"
                      defaultValue={form.role || ""}
                      placeholder="Product design & development"
                    />
                  </label>
                  <label>
                    <span>Project year</span>
                    <input
                      name="year"
                      defaultValue={form.year || ""}
                      placeholder="2025"
                    />
                  </label>
                </div>

                <label>
                  <span>Technologies (comma separated)</span>
                  <input
                    name="technologies"
                    defaultValue={(form.technologies || []).join(", ")}
                    placeholder="React, Node.js, MongoDB"
                  />
                </label>

                <div className="form-row-2">
                  <label>
                    <span>Project image URL</span>
                    <input
                      name="image"
                      defaultValue={form.image || ""}
                      placeholder="/assets/projects/web-platform.svg"
                    />
                  </label>
                  <label>
                    <span>Or upload image</span>
                    <input name="image" type="file" accept="image/*" />
                  </label>
                </div>

                <div className="form-row-2">
                  <label>
                    <span>Live URL</span>
                    <input
                      name="liveUrl"
                      defaultValue={form.liveUrl || ""}
                      placeholder="https://example.com"
                    />
                  </label>
                  <label>
                    <span>GitHub URL</span>
                    <input
                      name="githubUrl"
                      defaultValue={form.githubUrl || ""}
                      placeholder="https://github.com/username/repo"
                    />
                  </label>
                </div>

                <div className="form-checks">
                  <label className="checkbox-pill">
                    <input
                      name="featured"
                      type="checkbox"
                      value="true"
                      defaultChecked={!!form.featured}
                    />
                    <span>
                      <Star size={13} fill="currentColor" /> Featured
                    </span>
                  </label>
                  <label className="checkbox-pill">
                    <input
                      name="status"
                      type="checkbox"
                      value="published"
                      defaultChecked={form.status !== "draft"}
                    />
                    <span>Published</span>
                  </label>
                </div>
              </div>

              <div className="project-form-footer">
                <button
                  type="button"
                  className="button ghost cancel-btn"
                  onClick={() => setForm(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="button primary save-btn">
                  Save project <CheckCircle2 size={16} />
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
