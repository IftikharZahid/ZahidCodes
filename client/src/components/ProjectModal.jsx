import { X, Github, ExternalLink } from "lucide-react";
import { assetUrl, api } from "../api";
export default function ProjectModal({ project, close }) {
 if(!project)return null;
 async function track(){try{await api(`/analytics/click/${project._id}`,{method:"POST",body:JSON.stringify({})})}catch{}}
 return <div className="modal-layer" onClick={close}><section className="project-modal" onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true">
  <button className="modal-x" onClick={close} aria-label="Close"><X/></button><span className="eyebrow">{project.category}</span><h2>{project.title}</h2>
  {project.coverImage&&<img className="modal-cover" src={assetUrl(project.coverImage)} alt={`${project.title} preview`}/>}
  <p>{project.description||project.summary}</p><div className="tags modal-tags">{(project.technologies||[]).map(t=><span key={t}>{t}</span>)}</div>
  <div className="modal-links">{project.demoUrl&&<a className="button primary" onClick={track} href={project.demoUrl} target="_blank" rel="noreferrer">Live project <ExternalLink size={16}/></a>}{project.githubUrl&&<a className="button secondary" onClick={track} href={project.githubUrl} target="_blank" rel="noreferrer">Source code <Github size={16}/></a>}</div>
 </section></div>;
}