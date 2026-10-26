(function(){
var id=document.body.dataset.lesson,steps=[].slice.call(document.querySelectorAll('.step')),key='ch9:'+id,S={step:0,done:false,checks:{}};
try{S=Object.assign(S,JSON.parse(localStorage.getItem(key)||'{}'))}catch(e){}
function save(){try{localStorage.setItem(key,JSON.stringify(S))}catch(e){}}
var bar=document.querySelector('.bar i'),ph=document.querySelector('.phase'),pc=document.querySelector('.pct');
function go(n){S.step=Math.max(0,Math.min(steps.length-1,n));steps.forEach(function(s,i){s.classList.toggle('on',i===S.step)});
var p=Math.round(S.step/(steps.length-1)*100);bar.style.width=p+'%';pc.textContent=p+'%';ph.textContent=steps[S.step].dataset.phase;window.scrollTo(0,0);save()}
document.querySelectorAll('[data-nav]').forEach(function(b){b.addEventListener('click',function(){go(S.step+(+b.dataset.nav))})});
document.querySelectorAll('.rev').forEach(function(b){var a=document.getElementById(b.dataset.t);b.addEventListener('click',function(){a.hidden=!a.hidden;b.setAttribute('aria-expanded',!a.hidden)})});
document.querySelectorAll('.quiz').forEach(function(q){var fb=q.querySelector('.fb');q.querySelectorAll('.opt').forEach(function(o,i){o.addEventListener('click',function(){
var ok=i===+q.dataset.a;q.querySelectorAll('.opt').forEach(function(x){x.classList.remove('right','wrong')});o.classList.add(ok?'right':'wrong');
fb.className='fb '+(ok?'ok':'no');fb.textContent=ok?'Correct. '+q.dataset.why:'Not quite. '+(q.dataset.hint||'Try again.');
if(ok){q.dataset.got=1;tally()}})})});
function tally(){var t=document.querySelector('.score');if(!t)return;var all=document.querySelectorAll('.ev .quiz');t.textContent=document.querySelectorAll('.ev .quiz[data-got]').length+' of '+all.length+' correct'}
document.querySelectorAll('.sort').forEach(function(s){var sel=null;
s.querySelectorAll('.chip').forEach(function(c){c.addEventListener('click',function(){if(sel)sel.classList.remove('sel');sel=c;c.classList.remove('right','wrong');c.classList.add('sel')})});
s.querySelectorAll('.bucket').forEach(function(b){b.addEventListener('click',function(){if(!sel)return;b.querySelector('div').appendChild(sel);var ok=sel.dataset.t===b.dataset.b;sel.classList.remove('sel');sel.classList.add(ok?'right':'wrong');sel=null;
var n=s.querySelectorAll('.chip.right').length,m=s.querySelectorAll('.chip').length;s.querySelector('.fb').textContent=n+' of '+m+' sorted correctly. Tap a red item to try again.'})})});
document.querySelectorAll('.hs').forEach(function(h){function f(){document.querySelectorAll('.hs').forEach(function(x){x.classList.remove('on')});h.classList.add('on','seen');var p=document.getElementById(h.dataset.p);p.innerHTML=h.dataset.info}
h.addEventListener('click',f);h.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();f()}})});
document.querySelectorAll('.checks input').forEach(function(c,i){c.checked=!!S.checks[i];c.addEventListener('change',function(){S.checks[i]=c.checked;var all=document.querySelectorAll('.checks input'),n=[].filter.call(all,function(x){return x.checked}).length;S.done=n===all.length;S.n=n;S.total=all.length;save()})});
document.querySelectorAll('.again').forEach(function(b){b.addEventListener('click',function(){location.reload()})});
S.total=document.querySelectorAll(".checks input").length;go(S.step);tally();
})();
