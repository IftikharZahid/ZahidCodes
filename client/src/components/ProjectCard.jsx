import { ArrowUpRight, Github, ExternalLink, Layers3 } from "lucide-react";
import { assetUrl } from "../api";
export default function ProjectCard({ project, onOpen }) {
 return <article className="project-card">
  <button className="project-cover" onClick={()=>onOpen(project)} aria-label={`Open ${project.title}`}>
   {project.coverImage?<img src={assetUrl(project.coverImage)} alt={`${project.title} preview`}/>:<div className="cover-placeholder"><Layers3 size={38}/><b>{project.title}</b><span>{project.category}</span></div>}
   <span className="cover-arrow"><ArrowUpRight size={18}/></span>
  </button>
  <div className="project-body"><div className="project-meta"><span>{project.category}</span>{project.featured&&<b>FEATURED</b>}</div><h3>{project.title}</h3><p>{project.summary}</p><div className="tags">{(project.technologies||[]).slice(0,5).map(t=><span key={t}>{t}</span>)}</div>
   <div className="project-actions"><button onClick={()=>onOpen(project)}>View details <ArrowUpRight size={15}/></button>{project.githubUrl&&<a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a>}{project.demoUrl&&<a href={project.demoUrl} target="_blank" rel="noreferrer" aria-label="Live demo"><ExternalLink size={17}/></a>}</div>
  </div>
 </article>;
}