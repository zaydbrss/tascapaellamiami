(function(){
  // Mobile navigation
  var toggle=document.querySelector('.menu-toggle');
  var nav=document.getElementById('mobile-nav');
  function setNav(open){
    nav.classList.toggle('open',open);
    nav.setAttribute('aria-hidden',String(!open));
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
    document.body.classList.toggle('nav-open',open);
    toggle.querySelector('svg').innerHTML=open
      ?'<path d="M6 6l12 12M18 6 6 18"/>'
      :'<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>';
  }
  toggle.addEventListener('click',function(){setNav(!nav.classList.contains('open'))});
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setNav(false)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){setNav(false);toggle.focus()}});
  window.addEventListener('resize',function(){if(window.innerWidth>=960&&nav.classList.contains('open'))setNav(false)});

  // Header shadow + mobile action bar
  var header=document.querySelector('.site-header');
  var bar=document.getElementById('action-bar');
  function onScroll(){
    var y=window.scrollY;
    header.classList.toggle('scrolled',y>8);
    bar.classList.toggle('show',y>window.innerHeight*0.6);
  }
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  // Menu tabs
  var tabs=[].slice.call(document.querySelectorAll('.tab'));
  function select(tab){
    tabs.forEach(function(t){
      var on=t===tab;
      t.setAttribute('aria-selected',String(on));
      t.tabIndex=on?0:-1;
      var p=document.getElementById(t.getAttribute('aria-controls'));
      p.hidden=!on;p.classList.toggle('active',on);
    });
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){select(t)});
    t.addEventListener('keydown',function(e){
      var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;
      if(d){e.preventDefault();var n=tabs[(i+d+tabs.length)%tabs.length];select(n);n.focus()}
    });
  });

  // Today's hours (Miami time)
  var hours={0:[690,1380],1:[690,1380],2:[690,1380],3:[690,1380],4:[690,1380],5:[690,1440],6:[690,1440]};
  try{
    var parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());
    var get=function(t){return (parts.find(function(p){return p.type===t})||{}).value};
    var day=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(get('weekday'));
    var mins=(parseInt(get('hour'),10)%24)*60+parseInt(get('minute'),10);
    var li=document.querySelector('#hours li[data-day="'+day+'"]');
    if(li)li.classList.add('today');
    var h=hours[day],status=document.getElementById('status');
    var open=mins>=h[0]&&mins<h[1];
    var closeLabel=h[1]===1440?'midnight':'11 pm';
    status.classList.toggle('closed',!open);
    status.querySelector('span').textContent=open?'Open now, until '+closeLabel:(mins<h[0]?'Closed now, opens at 11:30 am':'Closed now, opens tomorrow at 11:30 am');
  }catch(e){document.getElementById('status').style.display='none'}

  // Contact form
  // Sends to data-endpoint (e.g. Formspree) when set; otherwise opens a prefilled WhatsApp message.
  var form=document.getElementById('contact-form');
  var dateInput=document.getElementById('f-date');
  var WHATSAPP='17865210937';
  try{dateInput.min=new Date().toISOString().split('T')[0]}catch(e){}
  function showSuccess(name){
    document.getElementById('success-name').textContent=name.split(' ')[0];
    form.style.display='none';
    var ok=document.getElementById('form-success');
    ok.style.display='block';ok.focus();
  }
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var fName=document.getElementById('f-name'),fContact=document.getElementById('f-email');
    var name=fName.value.trim(),contact=fContact.value.trim();
    var err=document.getElementById('form-error'),sendErr=document.getElementById('form-send-error');
    sendErr.style.display='none';
    if(!name||!contact){err.style.display='block';(name?fContact:fName).focus();return}
    err.style.display='none';
    var data={
      name:name,contact:contact,
      date:dateInput.value,
      guests:document.getElementById('f-guests').value,
      message:document.getElementById('f-msg').value.trim()
    };
    var endpoint=form.getAttribute('data-endpoint');
    if(!endpoint){
      var text='Hi Tasca Paella! Table request:\n'+
        'Name: '+data.name+'\nContact: '+data.contact+
        (data.date?'\nDate: '+data.date:'')+'\nGuests: '+data.guests+
        (data.message?'\nNote: '+data.message:'');
      window.open('https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(text),'_blank','noopener');
      showSuccess(name);return;
    }
    var btn=document.getElementById('form-submit');
    btn.disabled=true;btn.textContent='Sending…';
    fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
      .then(function(r){if(!r.ok)throw new Error(r.status);showSuccess(name)})
      .catch(function(){sendErr.style.display='block'})
      .then(function(){btn.disabled=false;btn.textContent='Send request'});
  });

  // Gallery lightbox
  var shots=[].slice.call(document.querySelectorAll('.shot'));
  var lb=document.getElementById('lightbox'),lbImg=document.getElementById('lb-img'),lbCap=document.getElementById('lb-cap'),lbCount=document.getElementById('lb-count');
  var cur=0,lastFocus=null;
  function show(i){
    cur=(i+shots.length)%shots.length;
    var img=shots[cur].querySelector('img');
    lbImg.src=img.src;lbImg.alt=img.alt;
    lbCap.textContent=shots[cur].querySelector('.shot-cap').textContent;
    lbCount.textContent=(cur+1)+' of '+shots.length;
  }
  function openLb(i){lastFocus=document.activeElement;show(i);lb.hidden=false;document.body.classList.add('nav-open');lb.querySelector('.lb-close').focus()}
  function closeLb(){lb.hidden=true;document.body.classList.remove('nav-open');if(lastFocus)lastFocus.focus()}
  shots.forEach(function(b,i){b.addEventListener('click',function(){openLb(i)})});
  lb.querySelector('.lb-close').addEventListener('click',closeLb);
  lb.querySelector('.lb-prev').addEventListener('click',function(){show(cur-1)});
  lb.querySelector('.lb-next').addEventListener('click',function(){show(cur+1)});
  lb.addEventListener('click',function(e){if(e.target===lb)closeLb()});
  document.addEventListener('keydown',function(e){
    if(lb.hidden)return;
    if(e.key==='Escape')closeLb();
    if(e.key==='ArrowLeft')show(cur-1);
    if(e.key==='ArrowRight')show(cur+1);
  });
  var tx=null;
  lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){if(tx===null)return;var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)show(cur+(dx<0?1:-1));tx=null});

  document.getElementById('year').textContent=new Date().getFullYear();
})();
