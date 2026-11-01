export type Vec=[number,number,number];
export type Atom={element:'C'|'H';p:Vec};
export type Molecule={atoms:Atom[];bonds:[number,number,number][];name:string;formula:string};
const tetra:Vec[]=[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]];
const add=(a:Vec,b:Vec,s=1):Vec=>a.map((v,i)=>v+s*b[i]) as Vec;
const scale=(v:Vec,s:number):Vec=>v.map(x=>x*s) as Vec;
const distance=(a:Vec,b:Vec)=>Math.hypot(...a.map((v,i)=>v-b[i]));
function alkane(name:string,formula:string,n:number,edges:[number,number][]):Molecule{
 const atoms:Atom[]=Array.from({length:n},()=>({element:'C',p:[0,0,0]}));const depths=Array(n).fill(-1);depths[0]=0;
 const used:number[][]=Array.from({length:n},()=>[]);const queue=[0];
 for(const i of queue){const dirs=tetra.map(v=>scale(v,depths[i]%2?-1:1));for(const [a,b]of edges){const child=a===i?b:b===i?a:-1;if(child<0||depths[child]>=0)continue;const slot=dirs.findIndex((_,k)=>!used[i].includes(k));used[i].push(slot);used[child].push(slot);atoms[child].p=add(atoms[i].p,dirs[slot],1.54/Math.sqrt(3));depths[child]=depths[i]+1;queue.push(child);}}
 const bonds:[number,number,number][]=edges.map(([a,b])=>[a,b,1]);
 for(let i=0;i<n;i++)for(let j=0;j<4;j++)if(!used[i].includes(j)){const dir=scale(tetra[j],(depths[i]%2?-1:1)*1.09/Math.sqrt(3));bonds.push([i,atoms.length,1]);atoms.push({element:'H',p:add(atoms[i].p,dir)});}
 return center({atoms,bonds,name,formula});
}
function center(m:Molecule):Molecule{const avg=m.atoms.reduce((a,b)=>add(a,b.p),[0,0,0] as Vec).map(v=>v/m.atoms.length) as Vec;m.atoms.forEach(a=>a.p=add(a.p,avg,-1));return m;}
function butene(cis:boolean):Molecule{
 const sign=cis?1:-1;const atoms:Atom[]=[{element:'C',p:[-.67,0,0]},{element:'C',p:[.67,0,0]},{element:'C',p:[-1.44,1.334,0]},{element:'C',p:[1.44,sign*1.334,0]},{element:'H',p:[-1.215,-.944,0]},{element:'H',p:[1.215,-sign*.944,0]}];
 const bonds:[number,number,number][]=[[0,1,2],[0,2,1],[1,3,1],[0,4,1],[1,5,1]];
 for(const [i,parent]of [[2,0],[3,1]]){const length=distance(atoms[parent].p,atoms[i].p);const back=scale(add(atoms[parent].p,atoms[i].p,-1),1/length);const u:Vec=[-back[1],back[0],0];for(let k=0;k<3;k++){const angle=k*Math.PI*2/3;const dir=add(add(scale(back,-1/3),scale(u,Math.sqrt(8/9)*Math.cos(angle))),[0,0,Math.sqrt(8/9)*Math.sin(angle)]);bonds.push([i,atoms.length,1]);atoms.push({element:'H',p:add(atoms[i].p,dir,1.09)});}}
 return center({atoms,bonds,name:cis?'cis-2-butena':'trans-2-butena',formula:'C₄H₈'});
}
export const molecules:Record<string,Molecule>={
 butane:alkane('Butana','C₄H₁₀',4,[[0,1],[1,2],[2,3]]),
 isobutane:alkane('2-metilpropana','C₄H₁₀',4,[[0,1],[0,2],[0,3]]),
 pentane:alkane('Pentana','C₅H₁₂',5,[[0,1],[1,2],[2,3],[3,4]]),
 isopentane:alkane('2-metilbutana','C₅H₁₂',5,[[0,1],[0,2],[0,3],[3,4]]),
 neopentane:alkane('2,2-dimetilpropana','C₅H₁₂',5,[[0,1],[0,2],[0,3],[0,4]]),
 cisbutene:butene(true),transbutene:butene(false)
};
