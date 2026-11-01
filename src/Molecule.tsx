'use client';
import {useEffect,useId,useRef,useState} from 'react';
import {RotateCcw,Play,Pause,Plus,Minus,Move} from 'lucide-react';
import {molecules,type Vec} from './lib/molecules';
export default function Molecule({model='butane',caption,auto=false,compact=false}:{model?:string;caption?:string;auto?:boolean;compact?:boolean}){
 const data=molecules[model];const uid=useId().replace(/:/g,'');const [angle,setAngle]=useState({x:.25,y:.4});const [spin,setSpin]=useState(auto);const [zoom,setZoom]=useState(1);const [hydrogen,setHydrogen]=useState(true);const drag=useRef<{x:number;y:number}|null>(null);
 useEffect(()=>{if(!spin||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const timer=setInterval(()=>setAngle(a=>({...a,y:a.y+.013})),45);return()=>clearInterval(timer);},[spin]);
 const project=(p:Vec)=>{const x=p[0]*Math.cos(angle.y)+p[2]*Math.sin(angle.y),z=-p[0]*Math.sin(angle.y)+p[2]*Math.cos(angle.y);return{x:x*44*zoom+180,y:(p[1]*Math.cos(angle.x)-z*Math.sin(angle.x))*44*zoom+135,z:p[1]*Math.sin(angle.x)+z*Math.cos(angle.x)};};
 const atoms=data.atoms.map((a,i)=>({...a,...project(a.p),i})).filter(a=>hydrogen||a.element==='C');
 const drawables=[...data.bonds.filter(([i,j])=>hydrogen||(data.atoms[i].element==='C'&&data.atoms[j].element==='C')).map(([i,j,order],k)=>({kind:'bond' as const,i,j,order,z:(project(data.atoms[i].p).z+project(data.atoms[j].p).z)/2,key:'b'+k})),...atoms.map(a=>({kind:'atom' as const,...a,key:'a'+a.i}))].sort((a,b)=>a.z-b.z);
 return <div className={'molecule '+(compact?'compact':'')}>
  {caption&&<span className="model-caption">{caption}</span>}
  <svg viewBox="0 0 360 270" role="img" aria-label={caption?`${caption}. Model molekul 3D interaktif; gunakan tombol panah untuk memutar.`:'Model molekul 3D interaktif'} tabIndex={0} style={{touchAction:'none',cursor:'grab'}}
   onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);drag.current={x:e.clientX,y:e.clientY};setSpin(false);}}
   onPointerMove={e=>{if(!drag.current)return;const dx=e.clientX-drag.current.x,dy=e.clientY-drag.current.y;setAngle(a=>({x:a.x+dy*.012,y:a.y+dx*.012}));drag.current={x:e.clientX,y:e.clientY};}}
   onPointerUp={()=>drag.current=null} onPointerCancel={()=>drag.current=null} onKeyDown={e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();setSpin(false);setAngle(a=>({x:a.x+(e.key==='ArrowDown'?.15:e.key==='ArrowUp'?-.15:0),y:a.y+(e.key==='ArrowRight'?.15:e.key==='ArrowLeft'?-.15:0)}));}}}>
   <defs><radialGradient id={uid+'C'} cx="30%" cy="25%"><stop stopColor="#9ce6d7"/><stop offset=".4" stopColor="#57bda9"/><stop offset="1" stopColor="#167364"/></radialGradient><radialGradient id={uid+'H'} cx="30%" cy="25%"><stop stopColor="#fff"/><stop offset=".4" stopColor="#eceee7"/><stop offset="1" stopColor="#8d9b9b"/></radialGradient></defs>
   <ellipse cx="180" cy="238" rx="91" ry="9" fill="#000" opacity=".12"/>
   {drawables.map(d=>{if(d.kind==='atom'){const r=(d.element==='C'?13:8)*(1+d.z*.025);return <g key={d.key}><circle cx={d.x} cy={d.y} r={r+1} fill="#0a282c"/><circle cx={d.x} cy={d.y} r={r} fill={`url(#${uid+d.element})`}/><text x={d.x} y={d.y+3.5} textAnchor="middle" fontSize={d.element==='C'?10:8} fill={d.element==='C'?'#053a35':'#284044'} fontWeight="700">{d.element}</text></g>;}const a=project(data.atoms[d.i].p),b=project(data.atoms[d.j].p);const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy);return <g key={d.key}>{Array.from({length:d.order},(_,k)=>{const offset=(k-(d.order-1)/2)*5;return <g key={k}><line x1={a.x-dy/len*offset} y1={a.y+dx/len*offset} x2={b.x-dy/len*offset} y2={b.y+dx/len*offset} stroke="#183e43" strokeWidth="6" strokeLinecap="round"/><line x1={a.x-dy/len*offset} y1={a.y+dx/len*offset-1} x2={b.x-dy/len*offset} y2={b.y+dx/len*offset-1} stroke="#8da7a4" strokeWidth="3" strokeLinecap="round"/></g>;})}</g>;})}
  </svg>
  <div className="model-tools"><button title={spin?'Jeda rotasi':'Putar otomatis'} aria-label={spin?'Jeda rotasi':'Putar otomatis'} onClick={()=>setSpin(!spin)}>{spin?<Pause size={14}/>:<Play size={14}/>}</button><button aria-label="Perbesar model" disabled={zoom>=1.6} onClick={()=>setZoom(z=>Math.min(1.6,z+.15))}><Plus size={14}/></button><button aria-label="Perkecil model" disabled={zoom<=.55} onClick={()=>setZoom(z=>Math.max(.55,z-.15))}><Minus size={14}/></button><button aria-label="Reset model" onClick={()=>{setAngle({x:.25,y:.4});setZoom(1);}}><RotateCcw size={14}/></button><button className={hydrogen?'hydrogen active':'hydrogen'} aria-pressed={hydrogen} onClick={()=>setHydrogen(!hydrogen)}>H</button></div>
  {!compact&&<div className="model-hint"><Move size={11}/> Geser untuk memutar <span className="carbon-dot"/> C <span className="hydrogen-dot"/> H</div>}
 </div>;
}
