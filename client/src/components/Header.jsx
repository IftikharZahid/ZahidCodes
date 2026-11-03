import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
export default function Header() {
 const [open,setOpen]=useState(false);
 return <header className="site-header"><Link className="brand" to="/"><img src="/images/zahidcodes-logo.png" alt="ZahidCodes logo"/><span>Zahid<span className="brand-lilac">Codes</span><small>.tech</small></span></Link>
 <button className="mobile-menu" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
 <nav className={open?"site-nav nav-visible":"site-nav"}>{[["Home","/#home"],["Projects","/#projects"],["About","/#about"],["Contact","/#contact"]].map(([t,h])=><a key={t} href={h} onClick={()=>setOpen(false)}>{t}</a>)}<a className="nav-button" href="mailto:hello@zahidcodes.tech">Let's talk <ArrowUpRight size={15}/></a></nav></header>;
}