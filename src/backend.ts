const DEFAULT_API='https://chemquest-assessment-lab.citrusskink66.chatgpt.site';
export function apiBase(){return ((window as any).CQ_API_BASE||DEFAULT_API).replace(/\/$/,'');}
export function teacherUrl(){return apiBase()+'/teacher';}
export function isConnected(){return true;}
async function request(path:string,init?:RequestInit){const response=await fetch(apiBase()+path,{...init,credentials:'omit',signal:AbortSignal.timeout(30000)});const data=await response.json();if(!response.ok)throw new Error(data.error||'Sambungan database gagal. Silakan coba lagi.');return data;}
export async function checkConnection(){const data=await request('/api/health');if(!data.ok)throw new Error('Database belum tersedia.');return data;}
export async function backendRequest(action:string,payload:Record<string,any>={}){
 if(action==='reference')return{ok:true};
 if(action==='preview')return request('/api/questions?stage='+encodeURIComponent(payload.stage));
 if(action==='report'){
  if(payload.dataset==='live')throw new Error('Buka Panel guru untuk melihat hasil kelas.');
  return request('/api/lab?dataset=reference');
 }
 if(action!=='start'&&action!=='submit')throw new Error('Pengelolaan kelas tersedia di Panel guru.');
 return request('/api/lab',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,...payload})});
}
