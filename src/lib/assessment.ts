export type Stage = 'PRE' | 'POST';
export type ScoreRow = {label:string;pre:number|null;post:number|null;preAt?:string;postAt?:string};
export function participantLabel(n:number):string {let s='';for(let x=n+1;x>0;x=Math.floor((x-1)/26))s=String.fromCharCode(65+(x-1)%26)+s;return s;}
// Illustrative imported summaries; no fabricated answers or submission dates.
export function referenceRows():ScoreRow[]{
 const pre=[40,45,50,55,60,65,50,55,60,65,45,50,55,60,65,70,40,45,50,55,60,65,70,75,45,50,55,60,65,49];
 const post=[75,80,80,85,85,90,80,85,90,90,75,80,85,85,90,95,70,75,80,85,85,90,95,95,75,80,85,85,90,86];
 return pre.map((v,i)=>({label:participantLabel(i),pre:v,post:post[i]}));
}
export function summarize(rows:ScoreRow[]){const paired=rows.filter(r=>r.pre!==null&&r.post!==null);const pre=paired.length?paired.reduce((s,r)=>s+r.pre!,0)/paired.length:null;const post=paired.length?paired.reduce((s,r)=>s+r.post!,0)/paired.length:null;const gain=pre!==null&&post!==null?post-pre:null;const ngain=pre!==null&&pre<100?gain!/(100-pre):null;return{n:paired.length,pre,post,gain,ngain,preCount:rows.filter(r=>r.pre!==null).length,postCount:rows.filter(r=>r.post!==null).length};}
