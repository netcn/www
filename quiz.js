(function() {
var h=document.documentElement, toggle=document.getElementById('themeToggle');
var t=localStorage.getItem('theme');
if(t){h.setAttribute('data-theme',t);toggle.textContent=t==='dark'?'☀':'☾';}
else if(window.matchMedia('(prefers-color-scheme:dark)').matches){h.setAttribute('data-theme','dark');toggle.textContent='☀';}
toggle.addEventListener('click',function(){var c=h.getAttribute('data-theme')||'light',n=c==='dark'?'light':'dark';h.setAttribute('data-theme',n);localStorage.setItem('theme',n);toggle.textContent=n==='dark'?'☀':'☾';});
})();

(function() {
var all=window.quizData||[], filtered=all.slice(), idx=0, vis=!1, hist=[];
var sel=document.getElementById('categorySelect'), cn=document.getElementById('currentNum'),
tn=document.getElementById('totalNum'), ct=document.getElementById('categoryTag'),
q=document.getElementById('question'), a=document.getElementById('answer'),
ba=document.getElementById('btnAnswer'), bn=document.getElementById('btnNext'),
bp=document.getElementById('btnPrev');

var cats={};
all.forEach(function(q){if(!cats[q.c])cats[q.c]=0;cats[q.c]++;});
Object.keys(cats).sort().forEach(function(c){var o=document.createElement('option');o.value=c;o.textContent=c+' ('+cats[c]+'题)';sel.appendChild(o);});

function shuffle(a){var r=a.slice();for(var i=r.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=r[i];r[i]=r[j];r[j]=t;}return r;}
filtered=shuffle(filtered);

function show(i){
  if(!filtered.length)return;
  if(i<0)i=filtered.length-1;if(i>=filtered.length)i=0;idx=i;
  var d=filtered[idx];ct.textContent=d.c;q.textContent=d.q;a.textContent=d.a;
  a.classList.remove('show');ba.textContent='显示答案';ba.classList.remove('hide-answer');vis=!1;
  cn.textContent=idx+1;tn.textContent=filtered.length;
}

function rand(){if(!filtered.length)return;hist.push(idx);var n;do{n=Math.floor(Math.random()*filtered.length);}while(n===idx&&filtered.length>1);show(n);}
function prev(){if(hist.length){var p=hist.pop();show(p);}}

ba.addEventListener('click',function(){vis?(a.classList.remove('show'),ba.textContent='显示答案',ba.classList.remove('hide-answer'),vis=!1):(a.classList.add('show'),ba.textContent='隐藏答案',ba.classList.add('hide-answer'),vis=!0);});
bn.addEventListener('click',function(){hist=[];rand();});
bp.addEventListener('click',function(){prev();});
sel.addEventListener('change',function(){var c=this.value;filtered=c==='all'?all.slice():all.filter(function(q){return q.c===c;});filtered=shuffle(filtered);hist=[];show(0);});
document.addEventListener('keydown',function(e){if(e.key===' '||e.key==='Spacebar'){e.preventDefault();ba.click();}else if(e.key==='ArrowRight'){e.preventDefault();bn.click();}else if(e.key==='ArrowLeft'){e.preventDefault();bp.click();}});
show(0);
})();