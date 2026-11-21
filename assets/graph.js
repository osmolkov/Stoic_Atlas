/* СТОЯ / ATLAS — интерактивный граф знаний, без сторонних библиотек */
(()=>{
'use strict';
const root=document.getElementById('graph');
if(!root)return;
const $=id=>document.getElementById(id);
const kind={
 concept:{title:'Понятия',color:'#b8d5a9',size:9},
 virtue:{title:'Добродетели',color:'#f0c480',size:8},
 thinker:{title:'Философы и авторы',color:'#d9a77a',size:6.5},
 term:{title:'Термины',color:'#b8a9e5',size:6.5},
 rule:{title:'12 практик',color:'#8bced1',size:5.5},
 work:{title:'Произведения',color:'#e1afb9',size:6.5}
};
const refs={
 sep:'https://plato.stanford.edu/entries/stoicism/',
 epictetus:'https://plato.stanford.edu/entries/epictetus/',
 ench:'https://classics.mit.edu/Epictetus/epicench.html',
 disc:'https://en.wikisource.org/wiki/Discourses_of_Epictetus',
 med:'https://classics.mit.edu/Antoninus/meditations.html',
 seneca:'https://en.wikisource.org/wiki/Moral_letters_to_Lucilius',
 diog:'https://en.wikisource.org/wiki/Lives_of_the_Eminent_Philosophers/Book_VII',
 neostoic:'https://iep.utm.edu/neo-stoicism/',
 pig:'https://howtobeastoic.wordpress.com/',
 modern:'https://modernstoicism.com/',
 hadot:'https://iep.utm.edu/hadot/',
 rebt:'https://albertellis.org/',
 stanford:'https://plato.stanford.edu/'
};
const nodes=[],byId=new Map(),edges=[];
function add(id,label,type,description,section,target,url){
 const n={id,label,type,description,section:section||'',target:target||'',url:url||refs.sep,x:0,y:0,vx:0,vy:0};
 nodes.push(n);byId.set(id,n);
}
function edge(a,b,relation){
 if(!byId.has(a)||!byId.has(b)){console.warn('Неизвестный узел графа',a,b);return;}
 if(edges.some(e=>(e.a===a&&e.b===b)||(e.a===b&&e.b===a)))return;
 edges.push({a,b,relation:relation||'связано'});
}
[
 ['nature','Природа и разум','Жизнь в согласии с разумной природой; логос как принцип порядка.'],
 ['control','Сфера выбора','Различение собственных решений и внешних результатов.'],
 ['virtue','Добродетель','Нравственное совершенство как единственное безусловное благо.'],
 ['emotion','Суждения и эмоции','Проверка впечатлений и работа с разрушительными страстями.'],
 ['fate','Судьба и перемены','Разумные усилия без требования гарантированного исхода.'],
 ['community','Люди и долг','Справедливость, обязанности и забота о других.'],
 ['exercise','Практика характера','Упражнения, превращающие философию в образ жизни.']
].forEach(x=>add('c:'+x[0],x[1],'concept',x[2],'ideas',x[0]));
[
 ['wisdom','Мудрость','Умение судить о благе и выбирать обоснованное действие.'],
 ['courage','Мужество','Верность правильному действию перед страхом и трудностями.'],
 ['justice','Справедливость','Честность, забота о других и уважение обязанностей.'],
 ['temperance','Умеренность','Самообладание и разумная мера в желаниях и реакциях.']
].forEach(x=>add('v:'+x[0],x[1],'virtue',x[2],'virtues',x[0],refs.diog));
[
 ['zeno','Зенон','Основатель афинской Стои; жизнь согласно природе.','sep'],
 ['cleanthes','Клеанф','Преемник Зенона; космический разум и «Гимн Зевсу».','sep'],
 ['chrys','Хрисипп','Систематизатор раннего стоицизма: логика, судьба, этика.','sep'],
 ['panaetius','Панетий','Средняя Стоя; обязанности и гражданская жизнь.','sep'],
 ['posidonius','Посидоний','Средняя Стоя; космология и исследование природы.','sep'],
 ['cicero','Цицерон','Не стоик: передача и обсуждение стоических идей в Риме.','sep'],
 ['seneca','Сенека','Практическая этика, гнев, время, нравственный самоанализ.','seneca'],
 ['musonius','Музоний Руф','Наставник Эпиктета; практика и образование женщин.','sep'],
 ['epictetus','Эпиктет','Нравственный выбор, впечатления и внутренняя свобода.','epictetus'],
 ['hierocles','Иерокл','Круги заботы и расширение социального родства.','sep'],
 ['marcus','Марк Аврелий','Самоанализ, долг и сотрудничество между людьми.','med'],
 ['lipsius','Юст Липсий','Неостоическая рецепция: стойкость и христианская мораль.','neostoic'],
 ['ellis','Альберт Эллис','Психолог, использовавший близкий стоикам подход к убеждениям.','rebt'],
 ['hadot','Пьер Адо','Историк: философия как образ жизни и духовные упражнения.','hadot'],
 ['becker','Лоуренс Беккер','Светская реконструкция стоической этики.','sep'],
 ['irvine','Уильям Ирвайн','Современное прикладное прочтение стоических упражнений.','modern'],
 ['sellars','Джон Селларс','Исследование античного стоицизма и проект Modern Stoicism.','modern'],
 ['holiday','Райан Холидей','Популяризация стоицизма в массовой культуре.','modern'],
 ['pigliucci','Массимо Пильюччи','Современная этика и 12 упражнений на основе Эпиктета.','pig'],
 ['robertson','Дональд Робертсон','Связь стоических практик с современной психологией.','modern']
].forEach(x=>add('p:'+x[0],x[1],'thinker',x[2],'people',x[0],refs[x[3]]));
[
 ['logos','Логос','Разумный принцип космического порядка в античной Стое.'],
 ['prohairesis','Проайресис','Способность нравственного выбора у Эпиктета.'],
 ['apatheia','Апатейя','Свобода от разрушительных страстей, не отсутствие всех чувств.'],
 ['oikeiosis','Ойкейосис','Осознание близости и родства, основа социальной заботы.'],
 ['kathekon','Катекон','Подобающее действие, связанное с социальными ролями и разумом.'],
 ['indifferent','Безразличные вещи','Внешние обстоятельства: не благо и не зло сами по себе.'],
 ['reserve','Оговорка о судьбе','Действовать с пониманием, что исход не полностью зависит от нас.']
].forEach(x=>add('t:'+x[0],x[1],'term',x[2],'','',x[0]==='prohairesis'?refs.epictetus:refs.sep));
[
 ['1','Проверяй впечатления','Отделяй события от интерпретаций.'],
 ['2','Помни о непостоянстве','Замечай ценность того, что может измениться.'],
 ['3','Добавляй оговорку','Планируй с учётом непредсказуемого.'],
 ['4','Применяй добродетель','Ищи разумный и достойный поступок.'],
 ['5','Сделай паузу','Не реагируй на сильное впечатление мгновенно.'],
 ['6','Посмотри со стороны','Сравни ситуацию с тем, как ты оценил бы её у друга.'],
 ['7','Говори по делу','Будь осмысленным и внимательным в разговоре.'],
 ['8','Выбирай окружение','Замечай, какое общение влияет на привычки.'],
 ['9','Отвечай спокойно','Не позволяй мелким колкостям управлять реакцией.'],
 ['10','Не делай себя центром','Оставляй место взглядам и опыту других.'],
 ['11','Не осуждай поспешно','Отделяй наблюдение от домыслов о мотивах.'],
 ['12','Размышляй о дне','Отмечай поступки и находи следующий шаг.']
].forEach(x=>add('r:'+x[0],x[1],'rule',x[2],'exercises',x[0],refs.ench));
[
 ['ench','Энхиридион','Краткое руководство Эпиктета, записанное Аррианом.','ench'],
 ['disc','Беседы Эпиктета','Записи философских бесед, сделанные Аррианом.','disc'],
 ['med','Размышления','Личные философские заметки Марка Аврелия.','med'],
 ['letters','Письма к Луцилию','Нравственные письма Сенеки.','seneca'],
 ['constancy','О постоянстве','Книга Юста Липсия (1584) и неостоическая традиция.','neostoic'],
 ['how','Как быть стоиком','Книга Массимо Пильюччи (2017).','pig'],
 ['way','Философия как образ жизни','Исследование Пьера Адо об античных упражнениях.','hadot'],
 ['new','Новый стоицизм','Светское переосмысление Лоуренса Беккера.','sep']
].forEach(x=>add('w:'+x[0],x[1],'work',x[2],'sources','',refs[x[3]]));
[
 ['p:zeno','p:cleanthes','преемник'],['p:cleanthes','p:chrys','преемник'],
 ['p:chrys','p:panaetius','традиция'],['p:panaetius','p:posidonius','традиция'],
 ['p:panaetius','p:cicero','использовал учение'],['p:musonius','p:epictetus','учитель'],
 ['p:epictetus','p:marcus','влияние'],['p:seneca','p:lipsius','переосмысление'],
 ['p:epictetus','p:ellis','влияние'],['p:epictetus','p:pigliucci','переосмысление'],
 ['p:epictetus','p:robertson','современное прочтение'],
 ['p:marcus','p:robertson','основа книги'],['p:marcus','p:holiday','популяризация'],
 ['p:hadot','p:sellars','современные исследования'],
 ['c:nature','t:logos','центральный термин'],
 ['c:control','t:prohairesis','центральный термин'],
 ['c:emotion','t:apatheia','связанное понятие'],
 ['c:community','t:oikeiosis','объясняет социальную заботу'],
 ['c:community','t:kathekon','обязанности и действия'],
 ['c:virtue','t:indifferent','разграничение ценностей'],
 ['c:fate','t:reserve','практический принцип'],
 ['c:virtue','v:wisdom','составляющая'],['c:virtue','v:courage','составляющая'],
 ['c:virtue','v:justice','составляющая'],['c:virtue','v:temperance','составляющая'],
 ['v:wisdom','c:nature','разум'],['v:wisdom','c:control','правильное суждение'],
 ['v:courage','c:fate','стойкость'],['v:justice','c:community','общественная этика'],
 ['v:temperance','c:emotion','самообладание'],
 ['p:zeno','c:nature','сформулировал'],['p:zeno','c:virtue','основной тезис'],
 ['p:cleanthes','t:logos','космический порядок'],
 ['p:chrys','t:logos','систематизировал'],['p:chrys','c:fate','разработал'],
 ['p:panaetius','t:kathekon','обязанности'],
 ['p:posidonius','c:nature','космология'],
 ['p:cicero','t:kathekon','передал римской аудитории'],
 ['p:seneca','c:emotion','анализ гнева'],['p:seneca','c:exercise','самоанализ'],
 ['p:seneca','v:courage','стойкость'],['p:seneca','v:temperance','самообладание'],
 ['p:musonius','c:exercise','практическая этика'],
 ['p:musonius','v:justice','равная способность к добродетели'],
 ['p:epictetus','c:control','главная тема'],['p:epictetus','t:prohairesis','нравственный выбор'],
 ['p:epictetus','c:emotion','проверка впечатлений'],['p:epictetus','c:exercise','практические упражнения'],
 ['p:hierocles','t:oikeiosis','круги заботы'],['p:hierocles','c:community','общественная этика'],
 ['p:marcus','c:community','сотрудничество'],['p:marcus','c:exercise','самонаблюдение'],
 ['p:lipsius','c:fate','постоянство'],['p:ellis','c:emotion','роль убеждений'],
 ['p:hadot','c:exercise','философия как жизнь'],
 ['p:becker','c:virtue','светская реконструкция'],
 ['p:irvine','c:exercise','упражнения'],
 ['p:sellars','c:virtue','исследование'],
 ['p:holiday','c:fate','популяризация'],
 ['p:pigliucci','c:exercise','12 упражнений'],
 ['p:robertson','c:emotion','психологические параллели'],
 ['p:epictetus','w:ench','зафиксировал Арриан'],['p:epictetus','w:disc','зафиксировал Арриан'],
 ['p:marcus','w:med','автор'],['p:seneca','w:letters','автор'],
 ['p:lipsius','w:constancy','автор'],['p:pigliucci','w:how','автор'],
 ['p:hadot','w:way','автор'],['p:becker','w:new','автор'],
 ['w:ench','c:control','объясняет'],['w:disc','t:prohairesis','развивает'],
 ['w:med','v:justice','применяет'],['w:letters','c:emotion','анализирует'],
 ['w:constancy','c:fate','рассматривает'],['w:how','c:exercise','современные упражнения'],
 ['w:way','c:exercise','античная практика'],['w:new','v:wisdom','современная этика']
].forEach(x=>edge(x[0],x[1],x[2]));
[
 ['1','c:emotion','впечатления'],['1','t:prohairesis','суждение'],
 ['2','c:fate','непостоянство'],['3','t:reserve','оговорка'],
 ['4','c:virtue','нравственный выбор'],['4','v:wisdom','рассудительность'],
 ['5','v:temperance','пауза'],['5','c:emotion','реакция'],
 ['6','v:wisdom','смена взгляда'],['7','c:community','речь и отношения'],
 ['8','c:community','окружение'],['9','v:temperance','самообладание'],
 ['10','v:justice','внимание к другим'],['11','c:emotion','суждения'],
 ['12','c:exercise','самоанализ'],['12','p:seneca','близкая практика']
].forEach(x=>edge('r:'+x[0],x[1],x[2]));
for(let i=1;i<=12;i++){
 edge('r:'+i,'p:pigliucci','современная адаптация');
 if(i!==12)edge('r:'+i,'w:ench','основано на тексте');
}
const canvas=$('graphCanvas'),stage=$('graphStage'),ctx=canvas.getContext('2d');
if(!ctx){$('graphInspector').textContent='Граф недоступен в этом браузере. Содержимое остальных разделов атласа остаётся доступным.';return;}
let selected='c:virtue',hovered=null,activeTypes=new Set(Object.keys(kind)),search='',visible=nodes.slice();
let width=800,height=560,dpr=1,scale=.84,panX=0,panY=0,frame=0,animation=null;
let dragging=null,dragStart=null,moved=false;
const pixelRatio=()=>Math.min(window.devicePixelRatio||1,2);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const neighbors=id=>edges.filter(e=>e.a===id||e.b===id).map(e=>({node:byId.get(e.a===id?e.b:e.a),relation:e.relation}));
const visibleIds=()=>new Set(visible.map(n=>n.id));
const hash=s=>{let n=0;for(const c of s)n=(n*31+c.charCodeAt(0))>>>0;return n};
const centers={concept:[0,0],virtue:[-210,-105],thinker:[120,100],term:[210,-125],rule:[-230,160],work:[260,185]};
nodes.forEach(n=>{
 let h=hash(n.id),ang=(h%6283)/1000,rad=28+((h>>>11)%190);
 let c=centers[n.type];
 n.x=c[0]+Math.cos(ang)*rad;n.y=c[1]+Math.sin(ang)*rad;
});
function resize(){
 const r=stage.getBoundingClientRect();
 width=Math.max(280,r.width);height=Math.max(290,r.height);
 dpr=pixelRatio();canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
 draw();
}
function setScale(next,x=width/2,y=height/2){
 const before=toWorld(x,y);
 scale=clamp(next,.23,3.1);
 panX=x-width/2-before.x*scale;panY=y-height/2-before.y*scale;
 draw();
}
function toWorld(px,py){return{x:(px-width/2-panX)/scale,y:(py-height/2-panY)/scale}}
function resetView(){
 panX=0;panY=0;scale=clamp(width/1020,.42,1.05);draw();
}
function hit(px,py){
 const p=toWorld(px,py);let found=null,best=Infinity;
 visible.forEach(n=>{
  const d=Math.hypot(n.x-p.x,n.y-p.y);
  const threshold=Math.max(14/scale,kind[n.type].size+7/scale);
  if(d<threshold&&d<best){found=n;best=d}
 });
 return found;
}
function draw(){
 if(!canvas.width)return;
 ctx.setTransform(dpr,0,0,dpr,0,0);
 ctx.clearRect(0,0,width,height);
 ctx.save();ctx.translate(width/2+panX,height/2+panY);ctx.scale(scale,scale);
 const ids=visibleIds(),focus=selected||hovered,near=new Set(focus?neighbors(focus).map(x=>x.node.id):[]);
 if(focus)near.add(focus);
 edges.forEach(e=>{
  if(!ids.has(e.a)||!ids.has(e.b))return;
  const a=byId.get(e.a),b=byId.get(e.b),isNear=focus&&(e.a===focus||e.b===focus);
  ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
  ctx.strokeStyle=isNear?'rgba(230,200,135,.83)':(focus?'rgba(152,183,160,.075)':'rgba(153,189,166,.23)');
  ctx.lineWidth=(isNear?1.65:.8)/Math.max(scale,.5);ctx.stroke();
 });
 visible.forEach(n=>{
  const marked=n.id===selected,hover=n.id===hovered,dim=focus&&!near.has(n.id);
  const r=kind[n.type].size+(marked?3:0)+(hover?2:0);
  if(marked||hover){
   ctx.beginPath();ctx.arc(n.x,n.y,r+9,0,Math.PI*2);
   ctx.fillStyle=marked?'rgba(242,210,151,.19)':'rgba(222,232,203,.13)';ctx.fill();
  }
  ctx.globalAlpha=dim?.34:1;
  ctx.beginPath();ctx.arc(n.x,n.y,r,0,Math.PI*2);
  ctx.fillStyle=kind[n.type].color;ctx.fill();
  if(marked){ctx.strokeStyle='#fff5da';ctx.lineWidth=1.65/scale;ctx.stroke()}
  const label=marked||hover||n.type==='concept'||n.type==='virtue'||scale>.71;
  if(label&&!dim){
   ctx.font=(marked?'700 ':'600 ')+(n.type==='concept'?13:11)+'px Manrope,system-ui,sans-serif';
   ctx.textBaseline='middle';ctx.textAlign='left';ctx.lineWidth=3/Math.max(scale,.4);
   ctx.strokeStyle='rgba(17,35,29,.9)';ctx.strokeText(n.label,n.x+r+6,n.y+1);
   ctx.fillStyle=marked?'#fff9e8':'#e0e9dc';ctx.fillText(n.label,n.x+r+6,n.y+1);
  }
  ctx.globalAlpha=1;
 });
 ctx.restore();
}
function simulate(){
 if(frame>=360||!visible.length){animation=null;draw();return}
 const arr=visible,ids=visibleIds();
 for(let i=0;i<arr.length;i++){
  const a=arr[i];
  a.vx-=a.x*.00009;a.vy-=a.y*.00009;
  for(let j=i+1;j<arr.length;j++){
   const b=arr[j],dx=b.x-a.x,dy=b.y-a.y,d2=dx*dx+dy*dy+110;
   if(d2>135000)continue;
   const force=1600/d2,dist=Math.sqrt(d2);
   const fx=dx/dist*force,fy=dy/dist*force;
   a.vx-=fx;a.vy-=fy;b.vx+=fx;b.vy+=fy;
  }
 }
 edges.forEach(e=>{
  if(!ids.has(e.a)||!ids.has(e.b))return;
  const a=byId.get(e.a),b=byId.get(e.b),dx=b.x-a.x,dy=b.y-a.y;
  const d=Math.max(1,Math.hypot(dx,dy));
  const preferred=(a.type==='concept'||b.type==='concept')?125:96;
  const f=(d-preferred)*.00125;
  a.vx+=dx/d*f;a.vy+=dy/d*f;b.vx-=dx/d*f;b.vy-=dy/d*f;
 });
 arr.forEach(n=>{
  if(dragging&&dragging.node===n){n.vx=0;n.vy=0;return}
  n.vx=clamp(n.vx*.85,-3,3);n.vy=clamp(n.vy*.85,-3,3);
  n.x+=n.vx;n.y+=n.vy;
 });
 frame++;draw();animation=requestAnimationFrame(simulate);
}
function restart(){
 if(animation)cancelAnimationFrame(animation);
 frame=0;animation=requestAnimationFrame(simulate);
}
function renderFilters(){
 $('graphFilters').innerHTML='';
 const all=document.createElement('button');all.type='button';all.className='graph-filter '+(activeTypes.size===Object.keys(kind).length?'active':'');all.textContent='Все';all.setAttribute('aria-pressed',String(activeTypes.size===Object.keys(kind).length));
 all.onclick=()=>{activeTypes=new Set(Object.keys(kind));applyFilters()};$('graphFilters').append(all);
 Object.entries(kind).forEach(([k,v])=>{
  const b=document.createElement('button');b.type='button';b.className='graph-filter '+(activeTypes.has(k)?'active':'');b.setAttribute('aria-pressed',String(activeTypes.has(k)));b.innerHTML='<span class="graph-legend-dot" style="--dot:'+v.color+'"></span>'+v.title;
  b.onclick=()=>{if(activeTypes.has(k)&&activeTypes.size>1)activeTypes.delete(k);else activeTypes.add(k);applyFilters()};
  $('graphFilters').append(b);
 });
}
function applyFilters(){
 visible=nodes.filter(n=>activeTypes.has(n.type));
 if(!visible.some(n=>n.id===selected))selected=visible[0]?.id||null;
 hovered=null;renderFilters();renderInspector();renderResults();draw();
 $('graphCount').textContent=visible.length+' узлов · '+edges.filter(e=>activeTypes.has(byId.get(e.a).type)&&activeTypes.has(byId.get(e.b).type)).length+' связей';
 restart();
}
function makeButton(label,action,klass){
 const b=document.createElement('button');b.type='button';b.className=klass||'graph-relation';b.textContent=label;b.onclick=action;return b;
}
function renderInspector(){
 const box=$('graphInspector');box.textContent='';
 const n=byId.get(selected);
 if(!n)return;
 const type=document.createElement('div');type.className='graph-type';type.textContent=kind[n.type].title;box.append(type);
 const h=document.createElement('h3');h.textContent=n.label;box.append(h);
 const p=document.createElement('p');p.textContent=n.description;box.append(p);
 if(n.section){
  const jump=makeButton('Открыть в атласе ↗',()=>openAtlas(n),'graph-action');box.append(jump);
 }
 if(n.url){
  const a=document.createElement('a');a.href=n.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Источник / материал ↗';box.append(a);
 }
 const connected=neighbors(n.id).filter(x=>visible.includes(x.node)).sort((a,b)=>a.node.label.localeCompare(b.node.label,'ru'));
 const t=document.createElement('h4');t.textContent='Связи ('+connected.length+')';box.append(t);
 const wrap=document.createElement('div');wrap.className='graph-relations';
 connected.forEach(e=>wrap.append(makeButton(e.node.label+' · '+e.relation,()=>select(e.node.id,true))));
 box.append(wrap);
}
function select(id,center=false){
 const n=byId.get(id);if(!n)return;
 if(!activeTypes.has(n.type)){activeTypes.add(n.type);applyFilters()}
 selected=id;renderInspector();
 if(center){panX=-n.x*scale;panY=-n.y*scale}
 draw();
}
function openAtlas(n){
 const section=document.getElementById(n.section);
 if(!section)return;
 if(n.section==='people'){
  const all=document.querySelector('#peopleFilters [data-person-era="all"]');if(all)all.click();
  const b=document.querySelector('#peopleGallery [data-person="'+n.target+'"]');if(b)b.click();
 }else if(n.section==='exercises'){
  const all=document.querySelector('#exerciseFilters [data-kind="all"]');if(all)all.click();
  const b=document.querySelector('#practiceGrid [data-practice="'+n.target+'"]');if(b)b.click();
 }else if(n.section==='ideas'){
  const b=document.querySelector('#ideaGrid [data-idea="'+n.target+'"]');if(b)b.click();
 }else if(n.section==='virtues'){
  const b=document.querySelector('#virtueMenu [data-virtue="'+n.target+'"]');if(b)b.click();
 }
 section.scrollIntoView({behavior:'smooth',block:'start'});
}
function renderResults(){
 const q=$('graphSearch').value.trim().toLocaleLowerCase('ru');
 const container=$('graphResults'),list=$('graphResultsList');
 list.textContent='';
 container.classList.toggle('show',q.length>0);
 if(!q){$('graphResultsText').textContent='';return}
 const matches=nodes.filter(n=>(n.label+' '+n.description).toLocaleLowerCase('ru').includes(q));
 $('graphResultsText').textContent=matches.length?'Найдено: '+matches.length+' · нажмите на результат':'Совпадений нет';
 matches.slice(0,14).forEach(n=>{
  list.append(makeButton(n.label+' · '+kind[n.type].title,()=>{select(n.id,true);$('graphSearch').value=n.label;renderResults()},'graph-result'));
 });
}
function mousePos(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
canvas.addEventListener('pointerdown',e=>{
 if(e.button!==undefined&&e.button!==0)return;
 const p=mousePos(e),n=hit(p.x,p.y);
 dragging={pointer:e.pointerId,node:n,px:p.x,py:p.y,lastX:p.x,lastY:p.y};
 dragStart={...p};moved=false;
 if(n)select(n.id,false);
 canvas.setPointerCapture(e.pointerId);canvas.classList.add('dragging');
 restart();
});
canvas.addEventListener('pointermove',e=>{
 const p=mousePos(e);
 if(dragging&&dragging.pointer===e.pointerId){
  if(Math.hypot(p.x-dragStart.x,p.y-dragStart.y)>3)moved=true;
  const dx=p.x-dragging.lastX,dy=p.y-dragging.lastY;
  if(dragging.node){dragging.node.x+=dx/scale;dragging.node.y+=dy/scale}
  else{panX+=dx;panY+=dy}
  dragging.lastX=p.x;dragging.lastY=p.y;draw();return;
 }
 const n=hit(p.x,p.y);hovered=n?.id||null;
 canvas.style.cursor=n?'pointer':'grab';
 const tip=$('graphTooltip');if(n){
  tip.textContent=n.label+' · '+kind[n.type].title;tip.style.display='block';
  tip.style.left=clamp(p.x+13,8,width-195)+'px';tip.style.top=clamp(p.y-10,8,height-35)+'px';
 }else{tip.style.display='none'}
 draw();
});
function finishPointer(e){
 if(!dragging||dragging.pointer!==e.pointerId)return;
 const p=mousePos(e);
 if(!moved&&!dragging.node){selected=null;renderInspector()}
 if(!moved&&dragging.node)select(dragging.node.id,false);
 dragging=null;canvas.classList.remove('dragging');draw();
 if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);
}
canvas.addEventListener('pointerup',finishPointer);
canvas.addEventListener('pointercancel',finishPointer);
canvas.addEventListener('pointerleave',()=>{$('graphTooltip').style.display='none';hovered=null;draw()});
canvas.addEventListener('wheel',e=>{
 e.preventDefault();
 const p=mousePos(e);
 setScale(scale*(e.deltaY<0?1.12:.89),p.x,p.y);
},{passive:false});
canvas.addEventListener('keydown',e=>{
 if(e.key==='+'||e.key==='='){setScale(scale*1.15);e.preventDefault()}
 else if(e.key==='-'){setScale(scale/.15*0.13);e.preventDefault()}
 else if(e.key==='0'){resetView();e.preventDefault()}
 else if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
  const i=visible.findIndex(n=>n.id===selected);
  const next=(i+(e.key==='ArrowRight'?1:-1)+visible.length)%visible.length;
  if(visible[next])select(visible[next].id,true);
  e.preventDefault();
 }else if(e.key==='Enter'&&byId.has(selected)){openAtlas(byId.get(selected));e.preventDefault()}
});
$('graphSearch').addEventListener('input',renderResults);
$('graphSearch').addEventListener('keydown',e=>{
 if(e.key==='Escape'){$('graphSearch').value='';renderResults()}
 if(e.key==='Enter'){
  const q=$('graphSearch').value.trim().toLocaleLowerCase('ru');
  const n=nodes.find(n=>n.label.toLocaleLowerCase('ru').includes(q));
  if(n&&q){select(n.id,true);$('graphResults').classList.remove('show')}
 }
});
$('graphZoomIn').onclick=()=>setScale(scale*1.25);
$('graphZoomOut').onclick=()=>setScale(scale/1.25);
$('graphReset').onclick=()=>{resetView();restart()};
$('graphRandom').onclick=()=>{
 const candidates=visible.filter(n=>n.type==='concept'||n.type==='term'||n.type==='virtue');
 if(candidates.length)select(candidates[Math.floor(Math.random()*candidates.length)].id,true);
};
const ro=new ResizeObserver(resize);ro.observe(stage);
renderFilters();renderResults();renderInspector();resetView();applyFilters();
})();