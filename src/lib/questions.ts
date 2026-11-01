import type {Stage} from './assessment';
export type Question={id:number;topic:string;text:string;options:string[];models?:string[];correct:number};
type Form={text:string;options:string[];correct:number;models?:string[]};
const f=(text:string,options:string[],correct:number,models?:string[]):Form=>({text,options,correct,models});
// Identical pre/post forms as requested. Teacher validation is required before research use.
const bank:[string,Form,Form][]=[
 ['Isomer rantai',f('Apa hubungan model I dan II?',['Isomer rantai','Senyawa yang sama','Berbeda rumus molekul','Isomer geometris'],0,['butane','isobutane']),f('Kedua model mempunyai C₅H₁₂. Apa hubungan strukturnya?',['Berbeda rumus molekul','Isomer rantai','Isomer geometris','Senyawa yang sama'],1,['pentane','isopentane'])],
 ['Penamaan',f('Apa nama IUPAC molekul ini?',['Butana','2-metilpropana','Pentana','2-metilbutana'],1,['isobutane']),f('Apa nama IUPAC molekul ini?',['Pentana','2,2-dimetilpropana','2-metilbutana','Butana'],2,['isopentane'])],
 ['Rumus molekul',f('Apa rumus molekul butana?',['C₄H₈','C₄H₆','C₄H₁₀','C₅H₁₂'],2),f('Apa rumus molekul pentana?',['C₅H₁₀','C₆H₁₄','C₄H₁₀','C₅H₁₂'],3)],
 ['Rantai utama',f('Berapa atom C pada rantai karbon terpanjang model ini?',['2','3','4','5'],1,['isobutane']),f('Berapa atom C pada rantai karbon terpanjang model ini?',['3','5','4','2'],2,['isopentane'])],
 ['Jumlah isomer',f('Berapa jumlah isomer konstitusional alkana dengan rumus C₄H₁₀?',['1','2','3','4'],1),f('Berapa jumlah isomer konstitusional alkana dengan rumus C₅H₁₂?',['2','4','5','3'],3)],
 ['Valensi',f('Pada alkana netral, satu C membentuk total berapa ikatan tunggal?',['1','2','3','4'],3),f('Pada alkana netral, satu H membentuk berapa ikatan kovalen?',['1','2','3','4'],0)],
 ['Hidrokarbon',f('Unsur penyusun hidrokarbon adalah …',['C dan O','C dan H','H dan O','C, H, dan N'],1),f('Senyawa mana yang termasuk hidrokarbon?',['C₂H₅OH','CO₂','C₃H₈','CH₃COOH'],2)],
 ['Alkana',f('Apa rumus umum alkana rantai terbuka?',['CₙH₂ₙ','CₙH₂ₙ₋₂','CₙH₂ₙ₊₂','CₙHₙ'],2),f('Alkana rantai terbuka dengan 6 atom C mempunyai rumus …',['C₆H₆','C₆H₁₀','C₆H₁₂','C₆H₁₄'],3)],
 ['Alkena',f('Alkena rantai terbuka dengan satu C=C mempunyai rumus umum …',['CₙH₂ₙ','CₙH₂ₙ₊₂','CₙH₂ₙ₋₂','CₙHₙ₊₂'],0),f('Alkena rantai terbuka dengan satu C=C dan 3 atom C mempunyai rumus …',['C₃H₈','C₃H₆','C₃H₄','C₃H₂'],1)],
 ['Alkuna',f('Alkuna rantai terbuka dengan satu C≡C mempunyai rumus umum …',['CₙH₂ₙ₊₂','CₙH₂ₙ','CₙH₂ₙ₋₂','CₙHₙ'],2),f('Alkuna rantai terbuka dengan satu C≡C dan 4 atom C mempunyai rumus …',['C₄H₁₀','C₄H₈','C₄H₄','C₄H₆'],3)],
 ['Struktur bercabang',f('Berapa total atom C pada model ini?',['3','4','5','6'],2,['isopentane']),f('Berapa total atom C pada model ini?',['4','5','6','3'],1,['neopentane'])],
 ['Posisi cabang',f('Pada CH₃–CH(CH₃)–CH₂–CH₃, nomor posisi cabang metil yang benar adalah …',['1','2','3','4'],1),f('Apa nama IUPAC struktur CH₃–CH(CH₃)–CH₂–CH₃?',['2-metilbutana','3-metilbutana','2-metilpentana','Pentana'],0)],
 ['Karbon pusat',f('Pada C(CH₃)₄, berapa atom C yang langsung terikat pada karbon pusat?',['1','2','3','4'],3),f('Karbon pusat pada struktur C(CH₃)₄ termasuk karbon …',['Primer','Sekunder','Tersier','Kuarterner'],3)],
 ['Cis–trans',f('Bagaimana posisi kedua gugus CH₃ terhadap C=C pada model ini?',['Sisi yang sama (cis)','Sisi berlawanan (trans)','Tidak ada CH₃','Terikat rangkap tiga'],0,['cisbutene']),f('Bagaimana posisi kedua gugus CH₃ terhadap C=C pada model ini?',['Sisi yang sama (cis)','Sisi berlawanan (trans)','Tidak ada C=C','Keduanya atom H'],1,['transbutene'])],
 ['Rotasi model',f('Jika model butana hanya diputar tanpa mengubah sambungan atom, maka …',['Menjadi isomer baru','Rumus berubah','Tetap molekul yang sama','Menjadi alkena'],2),f('Dua gambar butana berbeda sudut pandang tetapi konektivitasnya sama. Keduanya …',['Senyawa yang sama','Isomer rantai','Berbeda jumlah C','Isomer posisi'],0)],
 ['Pasangan isomer',f('Pasangan mana yang merupakan isomer rantai?',['Metana dan etana','Butana dan 2-metilpropana','Etana dan etena','Propana dan butana'],1),f('Pasangan mana yang merupakan isomer rantai?',['Etana dan propana','Pentana dan heksana','Pentana dan 2-metilbutana','Etena dan etuna'],2)],
 ['Cabang metil',f('Apa nama IUPAC model ini?',['2-metilbutana','Pentana','2,2-dimetilpropana','2-metilpropana'],2,['neopentane']),f('Berapa banyak cabang metil pada rantai utama propana dalam model ini?',['1','2','3','4'],1,['neopentane'])],
 ['Definisi isomer',f('Isomer konstitusional mempunyai …',['Rumus sama, konektivitas berbeda','Rumus berbeda, massa sama','Konektivitas dan struktur sama','Jumlah C selalu berbeda'],0),f('Rumus sama tetapi sambungan antaratom berbeda. Kedua senyawa disebut …',['Homolog','Unsur','Konformer identik','Isomer konstitusional'],3)],
 ['Ikatan',f('Semua ikatan antarkarbon pada butana adalah …',['Rangkap dua','Rangkap tiga','Tunggal','Ionik'],2),f('Molekul yang memiliki ikatan C=C termasuk kelompok …',['Alkana','Alkena','Alkuna','Logam'],1)],
 ['Syarat cis–trans',f('Agar alkena menunjukkan cis–trans, masing-masing C pada C=C harus …',['Terikat pada dua gugus berbeda','Terikat pada dua H','Berikatan rangkap tiga','Memiliki lima ikatan'],0),f('Mengapa etena (CH₂=CH₂) tidak mempunyai cis–trans?',['Tidak punya C=C','Setiap C pada C=C terikat pada dua H yang sama','Memiliki tiga karbon','Bukan hidrokarbon'],1)]
];
export function questions(stage:Stage):Question[]{return bank.map((b,i)=>({id:i+1,topic:b[0],...b[1]}));}
export function publicQuestions(stage:Stage){return questions(stage).map(({correct,...q})=>q);}
export function grade(stage:Stage,answers:unknown){if(!Array.isArray(answers)||answers.length!==20||answers.some(a=>!Number.isInteger(a)||a<0||a>3))throw new Error('Lengkapi 20 jawaban yang valid.');return questions(stage).reduce((s,q,i)=>s+(answers[i]===q.correct?5:0),0);}
