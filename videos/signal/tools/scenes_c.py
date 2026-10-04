from gen import scene

AUD_CSS = '''
        .aud { position: absolute; width: 780px; border-radius: 34px; padding: 30px 34px; transform-origin: 50% 50%; }
        .aud .uchip { margin: 0 14px 14px 0; height: 72px; font-size: 28px; }
'''

# 09 CONTROL SHIFT 46.75–54.6 · "এর মানে হলো" 46.91 · "আপনার control-এর একটা অংশ" 47.99 · "audience selection থেকে সরে গিয়ে" 49.39–50.99
#    creative 51.15 · conversion signal 51.83 · business objective 52.95 · "দিকে যাচ্ছে" 53.83
scene("s09-shift", 46.75, AUD_CSS + '''
        #tag { top: 270px; }
        #aud { left: 150px; top: 430px; }
        #meter { position: absolute; left: 160px; top: 900px; width: 760px; }
        #track { position: relative; height: 16px; border-radius: 8px; background: rgba(251,252,235,0.15); margin-top: 18px; }
        #fill { position: absolute; left: 0; top: 0; bottom: 0; width: 100%; border-radius: 8px; background: #80011F; transform-origin: left center; }
        #knob { position: absolute; left: -22px; top: -14px; width: 44px; height: 44px; border-radius: 50%; background: #FBFCEB; }
        .mends { display: flex; justify-content: space-between; margin-top: 18px; }
        .cc { position: absolute; top: 640px; width: 280px; height: 340px; border-radius: 28px; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 12px; text-align: center; }
        .cc b { font-size: 30px; font-weight: 800; line-height: 1.1; letter-spacing: 0.02em; }
        .cc .ev { font-size: 26px; font-weight: 800; padding: 8px 18px; border-radius: 12px; background: #80011F; letter-spacing: 0.08em; }
        #ccv { position: absolute; left: 0; top: 0; }
        #plus1, #plus2 { position: absolute; top: 780px; font-size: 56px; font-weight: 800; color: rgba(251,252,235,0.6); }
        #ai { position: absolute; left: 290px; top: 1190px; width: 500px; }
''', '''
        <div id="tag" class="center micro" data-layout-allow-overlap>WHERE YOUR CONTROL IS MOVING</div>
        <div id="aud" class="aud glass"><div class="ph micro" style="margin-bottom:18px" data-layout-allow-overlap>AUDIENCE SELECTION</div><div id="achips"></div></div>
        <div id="meter"><div class="micro" data-layout-allow-overlap>YOUR CONTROL</div><div id="track"><div id="fill"></div><div id="knob"></div></div>
          <div class="mends"><span class="micro" data-layout-allow-overlap>AUDIENCE</span><span class="micro" data-layout-allow-overlap>CREATIVE · SIGNAL · OBJECTIVE</span></div></div>
        <svg id="ccv" width="1080" height="1920" viewBox="0 0 1080 1920"></svg>
        <div id="c1" class="cc glass" style="left:90px"><div id="adbox" style="position:relative;width:200px;height:225px"></div><b data-layout-allow-overlap>CREATIVE</b></div>
        <div id="plus1" style="left:378px">+</div>
        <div id="c2" class="cc glass" style="left:400px"><span id="c2i"></span><div class="ev" data-layout-allow-overlap>LEAD</div><b data-layout-allow-overlap>CONVERSION<br>SIGNAL</b></div>
        <div id="plus2" style="left:688px">+</div>
        <div id="c3" class="cc glass" style="left:710px"><span id="c3i"></span><b data-layout-allow-overlap>BUSINESS<br>OBJECTIVE</b></div>
        <div id="aiw"></div>
''', '''
        $('#achips').innerHTML = [["INTEREST", "heart"], ["AGE", "cal"], ["LOCATION", "pin"], ["DETAILED TARGETING", "filter"]].map(([l, i]) => S.chip(l, i)).join("");
        $('#c2i').outerHTML = S.icon("check", 110);
        $('#c3i').outerHTML = S.icon("goal", 110);
        const ad = H.place($('#adbox'), H.angleAd(0, "sh"), 100, 112, 0.3);
        gsap.set("#fill", { scaleX: 0.08 });
        fadeUp("#tag", 46.9);
        // 47.99 "আপনার control-এর একটা অংশ"
        tl.fromTo("#aud", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, at(47.6));
        fadeUp("#meter", 48.0);
        // 49.39 "audience selection থেকে সরে গিয়ে" — not removed, just less dominant
        tl.to("#aud", { scale: 0.55, y: -150, opacity: 0.5, duration: 0.8, ease: "power3.inOut" }, at(49.4));
        tl.to("#knob", { x: 560, duration: 1.2, ease: "power3.inOut" }, at(49.5));
        tl.to("#fill", { scaleX: 0.78, duration: 1.2, ease: "power3.inOut" }, at(49.5));
        tl.to("#meter", { opacity: 0, y: 260, duration: 0.35 }, at(50.75));
        // the three things that now carry control — each on its word
        tl.fromTo("#c1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }, at(51.1));
        fadeUp("#plus1", 51.7, 0.25);
        tl.fromTo("#c2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }, at(51.8));
        fadeUp("#plus2", 52.8, 0.25);
        tl.fromTo("#c3", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }, at(52.9));
        // 53.83 "দিকে যাচ্ছে" → AI-driven delivery
        const v = $('#ccv');
        [[230, 990], [540, 990], [850, 990]].forEach(([x, y], k) => draw(line(v, `M${x} ${y} C ${x} 1100, 540 1090, 540 1184`, '#FBFCEB', 4), 53.6 + k * 0.06, 0.4));
        const ai = S.put($('#aiw'), S.node("AI-DRIVEN DELIVERY", "ai", "hot"), 290, 1190);
        ai.style.width = "500px";
        tl.fromTo(ai, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }, at(53.9));
''')

# 10 REAL ESTATE 54.6–57.85 · "ধরেন, আপনি একটা real estate project-এর ad চালাচ্ছেন" 54.9–57.58 (real estate 55.9 · ad 56.9)
scene("s10-realestate", 54.6, '''
        #chip { position: absolute; left: 0; right: 0; margin: 0 auto; width: fit-content; top: 330px; height: 76px; padding: 0 36px; border-radius: 38px; display: flex; align-items: center; }
        #chip .micro { color: #FBFCEB; }
        #pin { position: absolute; left: 438px; top: 600px; width: 100px; height: 100px; }
        #run { position: absolute; left: 0; right: 0; margin: 0 auto; width: fit-content; top: 1250px; height: 70px; padding: 0 30px; border-radius: 35px; background: #720013;
          border: 2px solid rgba(251,252,235,0.6); display: flex; align-items: center; gap: 14px; font-size: 28px; font-weight: 800; letter-spacing: 0.12em; }
        #dot { width: 16px; height: 16px; border-radius: 50%; background: #FBFCEB; }
''', '''
        <div id="chip" class="glass"><span class="micro" data-layout-allow-overlap>REAL ESTATE EXAMPLE</span></div>
        <div id="adw"></div>
        <svg id="pin" viewBox="0 0 24 24"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" fill="#80011F" stroke="#FBFCEB" stroke-width="1.4" /><circle cx="12" cy="10" r="2.6" fill="#FBFCEB" /></svg>
        <div id="run"><div id="dot"></div><span data-layout-allow-overlap>AD RUNNING</span></div>
''', '''
        const ad = H.place($('#adw'), H.ad({ photo: H.photos.tower("re"), headline: "Your Dream Apartment", cta: "Learn more" }), 540, 860, 0.95);
        fadeUp("#chip", 54.9);
        // "real estate project" 55.9
        tl.fromTo(ad, { opacity: 0, y: 60, scale: 0.88 }, { opacity: 1, y: 0, scale: 0.95, duration: 0.55, ease: "power3.out" }, at(55.8));
        tl.fromTo(ad.querySelectorAll('.win.lit'), { opacity: 0.1 }, { opacity: 0.85, duration: 0.2, stagger: 0.015 }, at(56.1));
        tl.fromTo("#pin", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }, at(56.4));
        // "ad চালাচ্ছেন" 56.9
        tl.fromTo("#run", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, at(56.95));
        tl.to("#dot", { opacity: 0.25, duration: 0.3, yoyo: true, repeat: 1 }, at(57.3));
''')

# 11 OLD MINDSET 57.85–66.75 · "আগের mindset হতে পারে" 58.10 · Bashundhara 59.34 · Age 30 to 50 60.30 · Property Interest 61.58 · manual audience 63.02
#    "কিন্তু এখন আমি শুধু audience নিয়ে চিন্তা করব না" 64.29–66.49
scene("s11-oldmind", 57.85, '''
        #old { position: absolute; left: 0; right: 0; top: 300px; text-align: center; }
        #panel { position: absolute; left: 130px; top: 370px; width: 820px; padding: 34px 36px 22px; border-radius: 34px; transform-origin: 50% 0%; }
        #panel .row { height: 112px; }
        #panel .uchip { height: 88px; font-size: 36px; }
        #hero { top: 960px; }
        #hero .l1 { font-size: 140px; }
        #qs { position: absolute; left: 0; right: 0; top: 1330px; display: flex; justify-content: center; gap: 26px; }
        .qb { width: 120px; height: 120px; border-radius: 50%; border: 3px dashed rgba(251,252,235,0.55); display: flex; align-items: center; justify-content: center; font-size: 60px; font-weight: 800; color: rgba(251,252,235,0.75); }
''', '''
        <div id="old" class="micro" data-layout-allow-overlap>OLD MINDSET</div>
        <div id="panel" class="glass">
          <div class="ph micro" style="margin-bottom:22px" data-layout-allow-overlap><span id="phi"></span>AUDIENCE SETUP</div>
          <div class="row" id="r1"></div><div class="row" id="r2"></div><div class="row" id="r3"></div><div class="row" id="r4"></div>
        </div>
        <div id="hero" class="center">
          <div class="mask"><div class="l1" id="h1" data-layout-allow-overlap>NOT JUST</div></div>
          <div class="mask"><div class="l1" id="h2" data-layout-allow-overlap><span class="mark">AUDIENCE</span></div></div>
        </div>
        <div id="qs"><div class="qb">?</div><div class="qb">?</div><div class="qb">?</div><div class="qb">?</div><div class="qb">?</div></div>
''', '''
        $('#phi').outerHTML = S.icon("users", 32);
        const C = [["BASHUNDHARA", "pin"], ["AGE 30–50", "cal"], ["PROPERTY INTEREST", "home"], ["MANUAL AUDIENCE", "users"]];
        const chips = C.map(([l, i], k) => { const r = $('#r' + (k + 1)); r.innerHTML = S.chip(l, i); return r.firstElementChild; });
        fadeUp("#old", 58.1);
        tl.fromTo("#panel", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, at(58.2));
        // each chip on its spoken word
        [59.3, 60.26, 61.54, 62.98].forEach((t, k) => tl.fromTo(chips[k], { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }, at(t)));
        // 64.29 "কিন্তু এখন আমি শুধু audience নিয়ে চিন্তা করব না"
        tl.to("#panel", { scale: 0.62, y: -60, opacity: 0.38, duration: 0.7, ease: "power3.inOut" }, at(64.3));
        tl.to("#old", { opacity: 0.4, duration: 0.4 }, at(64.3));
        rise("#h1", 64.95);
        rise("#h2", 65.25);
        tl.fromTo(scope + " .qb", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.8)", stagger: 0.08 }, at(65.85));
''')

# 12 QUESTIONS 66.75–77.25 · "I'll think about" 66.97 · Q1 "কাকে attract করতে চাই?" 67.98 · Q2 "তার problem কী?" 69.37
#    Q3 "কোন offer তাকে action নিতে বাধ্য করবে?" 70.42 (action 71.14) · Q4 "কোন creative তার intent signal করবে?" 72.69 (intent 73.49)
#    Q5 "আর Meta-কে আমি কোন conversion signal দিচ্ছি?" 74.81 (conversion 75.85)
scene("s12-questions", 66.75, '''
        #think { top: 250px; }
        .stage { position: absolute; left: 0; top: 0; width: 1080px; height: 1080px; }
        .sh { position: absolute; left: 0; right: 0; top: 320px; text-align: center; }
        #rows { position: absolute; left: 110px; top: 1100px; width: 860px; }
        .qr { display: flex; align-items: center; gap: 18px; height: 78px; font-size: 36px; font-weight: 800; opacity: 0.0; }
        .qr i { font-style: normal; font-size: 24px; font-weight: 800; letter-spacing: 0.1em; width: 52px; color: rgba(251,252,235,0.55); }
        .qr span { padding: 6px 14px; border-radius: 12px; }
        #per { position: absolute; left: 300px; top: 560px; transform-origin: 50% 50%; }
        .pchip { position: absolute; }
        #offer { position: absolute; left: 220px; top: 520px; width: 640px; height: 260px; border-radius: 30px; padding: 30px 34px; display: flex; flex-direction: column; gap: 12px; }
        #offer .t { font-size: 52px; font-weight: 800; }
        #act { position: absolute; left: 0; right: 0; margin: 0 auto; width: fit-content; top: 850px; height: 100px; padding: 0 56px; border-radius: 50px; background: #FBFCEB; color: #2D0001;
          display: flex; align-items: center; gap: 16px; font-size: 44px; font-weight: 800; letter-spacing: 0.06em; }
        #act .ic { stroke: #2D0001; }
        #cur { position: absolute; left: 640px; top: 900px; width: 80px; height: 80px; }
        #q4v, #q5v { position: absolute; left: 0; top: 0; }
        .fn { position: absolute; left: 320px; width: 440px; }
        #br { position: absolute; left: 300px; top: 618px; width: 480px; height: 236px; border-radius: 28px; border: 3px dashed #FBFCEB; }
        #brl { position: absolute; left: 800px; top: 690px; width: 200px; }
''', '''
        <div id="think" class="center micro" data-layout-allow-overlap>I'LL THINK ABOUT—</div>
        <div class="stage" id="g1"><div class="sh"><div class="mask"><div class="l1" id="who" data-layout-allow-overlap>WHO?</div></div></div><div id="per"></div></div>
        <div class="stage" id="g2"><div class="sh"><div class="mask"><div class="l2" id="prob" data-layout-allow-overlap>PROBLEM?</div></div></div><div id="pchips"></div></div>
        <div class="stage" id="g3"><div class="sh"><div class="mask"><div class="l2" id="off" data-layout-allow-overlap>OFFER → ACTION</div></div></div>
          <div id="offer" class="glass"><span id="oi"></span><div class="t" data-layout-allow-overlap>Easy payment plan</div><div class="micro" data-layout-allow-overlap>THE OFFER</div></div>
          <div id="act"><span id="ai2"></span><span data-layout-allow-overlap>BOOK A VISIT</span></div>
          <svg id="cur" viewBox="0 0 24 24"><path d="M6 3.5l12 7-5.2 1.4 3.4 6-2.4 1.4-3.4-6L6.5 17z" fill="#FBFCEB" stroke="#2D0001" stroke-width="1.2" stroke-linejoin="round" /></svg></div>
        <div class="stage" id="g4"><div class="sh"><div class="mask"><div class="l2" id="cre" data-layout-allow-overlap>CREATIVE → INTENT</div></div></div><svg id="q4v" width="1080" height="1080" viewBox="0 0 1080 1080"></svg><div id="ads4"></div><div id="ppl4"></div></div>
        <div class="stage" id="g5"><svg id="q5v" width="1080" height="1080" viewBox="0 0 1080 1080"></svg><div id="fun"></div><div id="br"></div><div id="brl" class="micro" data-layout-allow-overlap>CONVERSION<br>SIGNAL</div></div>
        <div id="rows"></div>
''', '''
        const Q = ["কাকে attract করতে চাই?", "তার problem কী?", "কোন offer তাকে action নিতে বাধ্য করবে?", "কোন creative তার intent signal করবে?", "Meta-কে আমি কোন conversion signal দিচ্ছি?"];
        const rows = Q.map((q, k) => { const r = S.el(`<div class="qr"><i>0${k + 1}</i><span data-layout-allow-overlap>${q}</span></div>`); $('#rows').appendChild(r); return r; });
        const T = [67.95, 69.33, 70.38, 72.65, 74.78];
        const END = [69.25, 70.3, 72.55, 74.68, 77.25];
        fadeUp("#think", 66.95);
        rows.forEach((r, k) => {
          tl.fromTo(r, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, at(T[k]));
          tl.fromTo(r.querySelector('span'), { backgroundColor: "rgba(128,1,31,0)" }, { backgroundColor: "rgba(128,1,31,1)", duration: 0.25 }, at(T[k]));
          if (k < 4) {
            tl.to(r.querySelector('span'), { backgroundColor: "rgba(128,1,31,0)", duration: 0.25 }, at(END[k]));
            tl.to(r, { opacity: 0.5, duration: 0.25 }, at(END[k]));
          }
        });
        const stageIn = (id, k) => {
          tl.fromTo(id, { opacity: 0 }, { opacity: 1, duration: 0.2 }, at(T[k]) - 0.05);
          if (k < 4) tl.to(id, { opacity: 0, duration: 0.2 }, at(END[k]) - 0.05);
        };
        ["#g1", "#g2", "#g3", "#g4", "#g5"].forEach((g, k) => { gsap.set(g, { opacity: 0 }); stageIn(g, k); });
        // Q1 WHO — a buyer persona
        const per = S.put($('#per'), S.persona("BUYER PERSONA", "who do I want to attract?", ["NEEDS", "BUDGET", "INTENT"]), 0, 0);
        per.style.width = "480px";
        rise("#who", 67.98);
        tl.fromTo(per, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1.2, duration: 0.4, ease: "power3.out" }, at(68.1));
        // Q2 PROBLEM — conceptual examples
        rise("#prob", 69.37, 0.35);
        const PC = [["COMMUTE", "clock", 130, 540], ["SPACE", "space", 590, 540], ["INVESTMENT", "graph", 130, 680], ["LOCATION", "pin", 590, 680]];
        const pcs = PC.map(([l, i, x, y]) => S.put($('#pchips'), S.chip(l, i), x, y));
        tl.fromTo(pcs, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(1.6)", stagger: 0.08 }, at(69.45));
        // Q3 OFFER → ACTION (no invented prices)
        $('#oi').outerHTML = S.icon("tag", 60);
        $('#ai2').outerHTML = S.icon("cursor", 44);
        rise("#off", 70.42);
        tl.fromTo("#offer", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, at(70.55));
        tl.fromTo("#act", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" }, at(71.1));
        tl.fromTo("#cur", { opacity: 0, x: 120, y: 120 }, { opacity: 1, x: 0, y: 0, duration: 0.5, ease: "power2.out" }, at(71.4));
        tl.to("#act", { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1 }, at(71.95));
        // Q4 CREATIVE → INTENT — three creatives, three different people
        rise("#cre", 72.69);
        const ads = [0, 1, 2].map((k) => H.place($('#ads4'), H.angleAd(k, "q" + k), 260 + k * 280, 610, 0.3));
        tl.fromTo(ads, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out", stagger: 0.1 }, at(72.8));
        const ppl = [0, 1, 2].map((k) => { const p = S.put($('#ppl4'), `<div style="width:96px;height:96px;border-radius:50%;background:#720013;border:2px solid rgba(251,252,235,0.6);display:flex;align-items:center;justify-content:center">${S.icon("user", 56)}</div>`, 212 + k * 280, 880); return p; });
        tl.fromTo(ppl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 }, at(73.4));
        [0, 1, 2].forEach((k) => draw(line($('#q4v'), `M${260 + k * 280} 726 V 874`, '#FBFCEB', 4), 73.5 + k * 0.1, 0.3));
        // Q5 CONVERSION SIGNAL — the funnel Meta learns from (conceptual)
        const F = [["AD VIEW", "eye"], ["CLICK", "cursor"], ["LEAD", "form"], ["QUALIFIED LEAD", "star"], ["BUSINESS OUTCOME", "goal"]];
        const fn = F.map(([l, i], k) => { const n = S.put($('#fun'), S.node(l, i, k === 2 || k === 3 ? "hot" : ""), 320, 400 + k * 120); n.style.width = "440px"; return n; });
        fn.forEach((n, k) => {
          tl.fromTo(n, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, at(74.85) + k * 0.16);
          if (k < 4) draw(line($('#q5v'), `M540 ${496 + k * 120} V ${520 + k * 120}`, 'rgba(251,252,235,0.6)', 4), 75.0 + k * 0.16, 0.15);
        });
        // "conversion" 75.85
        tl.fromTo("#br", { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" }, at(75.85));
        fadeUp("#brl", 75.95);
''')
