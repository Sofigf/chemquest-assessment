import {referenceRows,summarize,participantLabel} from './lib/assessment';
import {publicQuestions,grade} from './lib/questions';
const KEY='chemquest:github:v1';
export function scriptUrl(){return localStorage.getItem('cq_sheet_url')||(window as any).CQ_SCRIPT_URL||new URLSearchParams(location.search).get('sheets')||'';}
export function isConnected(){return !!scriptUrl();}
export function saveConnection(url:string,key:string){if(url&&!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url))throw new Error('Gunakan URL deployment Apps Script yang berakhir /exec.');localStorage.setItem('cq_sheet_url',url);if(key)sessionStorage.setItem('cq_admin_key',key);else sessionStorage.removeItem('cq_admin_key');}
async function remote(action:string,payload:Record<string,unknown>){
 const endpoint=scriptUrl();if(!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(endpoint))throw new Error('URL Google Sheets backend tidak valid.');
 const nonce=crypto.randomUUID();return new Promise<any>((resolve,reject)=>{
  const frame=document.createElement('iframe');frame.name='cq_'+nonce;frame.hidden=true;frame.setAttribute('title','Google Sheets response transport');
  const form=document.createElement('form');form.method='POST';form.action=endpoint;form.target=frame.name;form.hidden=true;
  const input=document.createElement('input');input.name='payload';input.value=JSON.stringify({action,...payload,adminKey:sessionStorage.getItem('cq_admin_key')||'',nonce,origin:location.origin});form.append(input);
  const cleanup=()=>{clearTimeout(timer);window.removeEventListener('message',receive);form.remove();frame.remove();};
  const receive=(event:MessageEvent)=>{let host='';try{host=new URL(event.origin).hostname;}catch{return;}if(host!=='script.google.com'&&!host.endsWith('.googleusercontent.com'))return;if(event.data?.channel!=='CHEMQUEST'||event.data?.nonce!==nonce)return;cleanup();event.data.error?reject(new Error(event.data.error)):resolve(event.data.result);};
  const timer=setTimeout(()=>{cleanup();reject(new Error('Backend belum merespons. Periksa deployment Apps Script, akses Anyone, dan URL /exec.'));},45000);
  window.addEventListener('message',receive);document.body.append(frame,form);form.submit();
 });
}
async function digest(s:string){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))].map(v=>v.toString(16).padStart(2,'0')).join('');}
function read(){return JSON.parse(localStorage.getItem(KEY)||'{"sessions":[],"participants":[],"responses":[]}');}
function write(data:any){localStorage.setItem(KEY,JSON.stringify(data));}
export async function backendRequest(action:string,payload:Record<string,any>={}){
 if(action==='preview')return{questions:publicQuestions(payload.stage)};
 if(isConnected())return remote(action,payload);
 const data=read();
 if(action==='reference')return{ok:true};
 if(action==='report'){
  if(payload.dataset!=='live'){const rows=referenceRows();return{origin:'illustrative_reference_summary',rows,summary:summarize(rows),session:null};}
  const session=data.sessions.at(-1)||null;
  const rows=session?data.participants.filter((p:any)=>p.sessionId===session.id).map((p:any)=>{const pre=data.responses.find((r:any)=>r.participantId===p.id&&r.stage==='PRE'),post=data.responses.find((r:any)=>r.participantId===p.id&&r.stage==='POST');return{label:p.label,pre:pre?.score??null,post:post?.score??null,preAt:pre?.submittedAt,postAt:post?.submittedAt};}):[];
  return{origin:'device_responses',session,rows,summary:summarize(rows)};
 }
 if(action==='create'){
  const count=Number(payload.count);if(!Number.isInteger(count)||count<1||count>100)throw new Error('Jumlah peserta 1–100.');if(data.sessions.some((s:any)=>s.phase!=='CLOSED'))throw new Error('Tutup kelas aktif sebelum membuat kelas baru.');
  const session={id:crypto.randomUUID(),title:payload.title||'Kelas Hidrokarbon',phase:'PRE',created_at:new Date().toISOString()};const roster=[];
  for(let i=0;i<count;i++){const code=[...crypto.getRandomValues(new Uint8Array(8))].map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase(),label=participantLabel(i);data.participants.push({id:crypto.randomUUID(),sessionId:session.id,label,codeHash:await digest(code)});roster.push({label,code});}
  data.sessions.push(session);write(data);return{ok:true,roster,sessionId:session.id};
 }
 if(action==='phase'){if(!['PRE','POST','CLOSED'].includes(payload.phase))throw new Error('Tahap tidak valid.');const s=data.sessions.find((s:any)=>s.id===payload.sessionId);if(!s)throw new Error('Kelas tidak ditemukan.');s.phase=payload.phase;write(data);return{ok:true};}
 if(!/^[A-F0-9]{16}$/i.test(payload.code||''))throw new Error('Masukkan kode akses 16 karakter.');const hash=await digest(payload.code.trim().toUpperCase());const p=data.participants.find((p:any)=>p.codeHash===hash);if(!p)throw new Error('Kode tidak ditemukan pada browser ini. Untuk akses lintas perangkat, sambungkan Google Sheets.');const s=data.sessions.find((s:any)=>s.id===p.sessionId);if(!s||s.phase==='CLOSED')throw new Error('Sesi tes ditutup.');const pre=data.responses.find((r:any)=>r.participantId===p.id&&r.stage==='PRE');if(s.phase==='POST'&&!pre)throw new Error('Selesaikan pre-test dahulu.');const done=data.responses.find((r:any)=>r.participantId===p.id&&r.stage===s.phase);
 if(action==='start'){if(done)throw new Error('Jawaban sudah tersimpan. Tunggu tahap berikutnya.');return{label:p.label,stage:s.phase,questions:publicQuestions(s.phase)};}
 if(action==='submit'){if(s.phase!==payload.stage)throw new Error('Tahap berubah. Hubungi pengelola.');if(done)return{ok:true,label:p.label,score:done.score,message:'Jawaban sudah tersimpan di browser ini.'};const score=grade(payload.stage,payload.answers);data.responses.push({id:crypto.randomUUID(),participantId:p.id,stage:payload.stage,answers:payload.answers,score,submittedAt:new Date().toISOString()});write(data);return{ok:true,label:p.label,score,message:'Jawaban tersimpan di browser ini.'};}
 throw new Error('Aksi tidak dikenal.');
}
