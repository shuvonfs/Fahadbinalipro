"""All scenes for the Fahad intro. Every beat is keyed to a cue in cues.json (C.<name>)."""
from gen import scene
from build import START

S = START

# ───────────────────────── 01 · GROWTH SYSTEM (intro) ─────────────────────────
# "আমি বিশ্বাস করি, Digital Marketing শুধু Ads চালানোর নাম না।" → "…সঠিক Strategy, Audience, Creative, Data, Funnel… Decision Making"
scene("s01-system", S["s01-system"], '''
        #ln { position: absolute; left: 240px; top: 958px; width: 600px; height: 4px; border-radius: 2px; background: #720013; transform-origin: 50% 50%; }
        #stmt { top: 300px; padding: 0 100px; }
        #wires { position: absolute; left: 0; top: 0; }
        #core { position: absolute; left: 400px; top: 820px; width: 280px; height: 280px; border-radius: 50%; background: #720013; color: #FBFCEB;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; box-shadow: 0 30px 80px rgba(114,0,19,0.3); }
        #core .ic { stroke: #FBFCEB; }
        #core b { font-size: 40px; font-weight: 800; letter-spacing: 0.08em; }
        #corering { left: 330px; top: 750px; width: 420px; height: 420px; }
        #eq { top: 1385px; font-size: 22px; letter-spacing: 0.16em; }
        #dm { position: absolute; left: 0; right: 0; margin: 0 auto; width: fit-content; top: 1450px; }
''', '''
        <div id="ln"></div>
        <div id="stmt" class="center h3 bn" data-layout-allow-overlap>Digital Marketing শুধু <span class="acc">Ads</span> চালানোর নাম না।</div>
        <svg id="wires" width="1080" height="1920" viewBox="0 0 1080 1920"></svg>
        <div id="corering" class="ring"></div>
        <div id="core"><span id="ci"></span><b data-layout-allow-overlap>GROWTH</b></div>
        <div id="chips"></div>
        <div id="eq" class="center lab" data-layout-allow-overlap>Strategy + Creative + Data + Funnel = Growth System</div>
        <div id="dm"><div class="pill" data-layout-allow-overlap><span id="dmi"></span>সঠিক DECISION MAKING</div></div>
''', '''
        $('#ci').outerHTML = K.icon("growth", 70);
        $('#dmi').outerHTML = K.icon("target", 30);
        // final ring positions around GROWTH, and loose "disconnected" starting points
        const R = [["ADS", "ads", 540, 630, 380, 520], ["STRATEGY", "strategy", 826, 795, 860, 640], ["AUDIENCE", "users", 826, 1125, 870, 1240],
                   ["CREATIVE", "image", 540, 1290, 600, 1380], ["DATA", "db", 254, 1125, 150, 1200], ["FUNNEL", "funnel", 254, 795, 170, 700]];
        const chips = R.map(([l, ic, x, y]) => K.putC($('#chips'), K.node(l, ic), x, y));
        const svg = $('#wires');
        const wires = R.map(([, , x, y]) => line(svg, `M540 960 L${x} ${y}`, 'rgba(114,0,19,0.3)', 3));
        const loop = line(svg, "M540 630 L826 795 L826 1125 L540 1290 L254 1125 L254 795 Z", 'rgba(114,0,19,0.18)', 2);

        // a thin burgundy line opens the film
        tl.fromTo("#ln", { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, at(0.15));
        // "শুধু Ads চালানোর নাম না"
        fadeUp("#stmt", C.notAds - 0.6, 0.6);
        // "Business-এর Growth" — the pieces float in, disconnected
        tl.to("#ln", { opacity: 0, scaleX: 0.2, duration: 0.5 }, at(C.growth - 0.2));
        chips.forEach((c, i) => {
          tl.fromTo(c, { opacity: 0, x: R[i][4] - R[i][2], y: R[i][5] - R[i][3], scale: 0.9 },
            { opacity: 0.55, scale: 1, duration: 0.6, ease: "power3.out" }, at(C.growth) + i * 0.12);
        });
        // each one lights up as it is named, and settles into place
        const named = { strategy: 1, audience: 2, creative: 3, data: 4, funnel: 5 };
        Object.entries(named).forEach(([k, i]) => {
          tl.to(chips[i], { opacity: 1, x: 0, y: 0, borderColor: "rgba(128,1,31,0.6)", duration: 0.55, ease: "power3.out" }, at(C[k]) - 0.08);
        });
        tl.to(chips[0], { opacity: 1, x: 0, y: 0, duration: 0.55, ease: "power3.out" }, at(C.strategy) - 0.3);
        // "সঠিক Decision Making" — everything connects into one growth system
        tl.to("#stmt", { opacity: 0.35, duration: 0.4 }, at(C.decision - 0.4));
        pop("#core", C.decision - 0.2, 0.55);
        pop("#corering", C.decision, 0.6);
        wires.forEach((w, i) => draw(w, C.decision + i * 0.08, 0.45));
        draw(loop, C.decision + 0.5, 0.9);
        tl.to(chips, { borderColor: "rgba(128,1,31,0.45)", duration: 0.4 }, at(C.decision + 0.3));
        fadeUp("#eq", C.decision + 0.6);
        fadeUp("#dm", C.decision + 0.1);
        tl.to("#corering", { scale: 1.06, duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, at(C.decision + 0.7));
''')

# ───────────────────────── 02 · PROFILE ─────────────────────────
# "আমি Fahad।"
scene("s02-profile", S["s02-profile"], '''
        #halo { position: absolute; left: 90px; top: 200px; width: 900px; height: 1100px; background: radial-gradient(ellipse at 50% 50%, rgba(128,1,31,0.22) 0%, rgba(128,1,31,0.07) 45%, rgba(128,1,31,0) 70%); }
        #frame { position: absolute; left: 230px; top: 300px; width: 620px; height: 826px; border-radius: 44px; overflow: hidden; border: 3px solid rgba(114,0,19,0.25);
          box-shadow: 0 40px 90px rgba(45,0,1,0.22); }
        #frame img { position: absolute; left: 0; top: 0; width: 100%; height: 100%; object-fit: cover; transform-origin: 50% 35%; }
        #panel { position: absolute; left: 180px; top: 1062px; width: 720px; height: 120px; border-radius: 30px; }
        #name { top: 1190px; }
        #role { top: 1350px; }
        #desc { top: 1440px; }
''', '''
        <div id="halo"></div>
        <div id="frame"><img id="ph" src="assets/fahad.jpg" alt="Fahad" /></div>
        <div id="name" class="center"><div class="mask"><div class="h1" id="nm" data-layout-allow-overlap>FAHAD</div></div></div>
        <div id="role" class="center h3" data-layout-allow-overlap>Digital Marketing <span class="acc">&amp;</span> Growth</div>
        <div id="desc" class="center lab" data-layout-allow-overlap>7+ YEARS  |  DIGITAL MARKETING  |  BUSINESS GROWTH</div>
''', '''
        // the portrait is the hero — revealed with a soft mask, then only a slow push-in
        tl.fromTo("#halo", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }, at(C.fahad - 0.3));
        tl.fromTo("#frame", { clipPath: "inset(12% 12% 12% 12% round 44px)", opacity: 0 }, { clipPath: "inset(0% 0% 0% 0% round 44px)", opacity: 1, duration: 0.8, ease: "power3.out" }, at(C.fahad - 0.25));
        tl.fromTo("#ph", { scale: 1.08 }, { scale: 1.0, duration: (C.years - C.fahad) + 0.3, ease: "power1.out" }, at(C.fahad - 0.25));
        rise("#nm", C.fahad, 0.55);
        fadeUp("#role", C.fahad + 0.45);
        fadeUp("#desc", C.fahad + 0.8);
''')

# ───────────────────────── 03 · EXPERIENCE / INDUSTRIES ─────────────────────────
# "গত 7+ বছর ধরে Real Estate, Study Abroad Consultancy এবং বিভিন্ন Local & International Service-based Business…"
scene("s03-industries", S["s03-industries"], '''
        #yrs { position: absolute; left: 110px; top: 290px; display: flex; align-items: baseline; gap: 22px; }
        #yrs b { font-size: 170px; font-weight: 800; letter-spacing: -0.04em; color: #720013; line-height: 1; }
        #tline { position: absolute; left: 110px; top: 520px; width: 860px; height: 6px; border-radius: 3px; background: rgba(114,0,19,0.12); }
        #tfill { position: absolute; left: 0; top: 0; bottom: 0; width: 100%; border-radius: 3px; background: #80011F; transform-origin: left center; }
        .tk { position: absolute; top: -9px; width: 24px; height: 24px; border-radius: 50%; background: #FBFCEB; border: 4px solid #80011F; }
        .ind { position: absolute; width: 420px; height: 210px; padding: 28px; border-radius: 30px; display: flex; flex-direction: column; justify-content: space-between; }
        .ind b { font-size: 34px; font-weight: 800; letter-spacing: 0.04em; line-height: 1.15; }
        .ind.hot { background: #720013; border-color: #720013; color: #FBFCEB; }
        .ind.hot .ic { stroke: #FBFCEB; }
''', '''
        <div id="yrs"><b data-layout-allow-overlap>7+</b><span class="lab" data-layout-allow-overlap>YEARS OF DIGITAL MARKETING</span></div>
        <div id="tline"><div id="tfill"></div></div>
        <div id="cards"></div>
''', '''
        const I = [["REAL ESTATE", "building", "hot"], ["STUDY ABROAD", "grad", "hot"], ["TRAVEL", "plane"], ["AUTOMOTIVE", "car"], ["FINANCIAL", "chart"], ["SERVICE BUSINESSES", "nodes"]];
        const cards = I.map(([l, ic, h], k) => K.put($('#cards'), `<div class="ind glass ${h || ""}">${K.icon(ic, 64)}<b data-layout-allow-overlap>${l}</b></div>`, k % 2 ? 550 : 110, 600 + Math.floor(k / 2) * 240));
        const ticks = [0, 1, 2, 3, 4, 5, 6].map((k) => K.put($('#tline'), '<div class="tk"></div>', k * 139 - 2, -9));
        // "গত 7+ বছর"
        tl.fromTo("#yrs", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, at(C.years - 0.1));
        tl.fromTo("#tfill", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, at(C.years + 0.1));
        tl.fromTo(ticks, { scale: 0 }, { scale: 1, duration: 0.25, ease: "back.out(2)", stagger: 0.2 }, at(C.years + 0.1));
        // each industry enters with its spoken emphasis
        const T = [C.realEstate, C.studyAbroad, C.localIntl, C.localIntl + 0.4, C.localIntl + 0.8, C.service];
        cards.forEach((c, k) => tl.fromTo(c, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }, at(T[k]) - 0.08));
''')

# ───────────────────────── 04 · 8 BRANDS → EXPERIENCE → IN-HOUSE ↔ AGENCY → GROWTH ─────────────────────────
scene("s04-brands", S["s04-brands"], '''
        #hd { position: absolute; left: 0; right: 0; top: 280px; display: flex; justify-content: center; align-items: baseline; gap: 20px; }
        #hd b { font-size: 140px; font-weight: 800; letter-spacing: -0.04em; color: #720013; line-height: 1; }
        .bt { position: absolute; width: 170px; height: 104px; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 800; letter-spacing: 0.1em; color: #3F1521; }
        #exp { position: absolute; left: 0; top: 0; }
        #wires { position: absolute; left: 0; top: 0; }
        .env { position: absolute; top: 1130px; width: 400px; height: 170px; border-radius: 28px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; text-align: center; }
        .env b { font-size: 32px; font-weight: 800; letter-spacing: 0.04em; }
        #swap { position: absolute; left: 510px; top: 1190px; font-size: 52px; font-weight: 800; color: #80011F; }
''', '''
        <div id="hd"><b data-layout-allow-overlap>8+</b><span class="lab" data-layout-allow-overlap>BRANDS</span></div>
        <svg id="wires" width="1080" height="1920" viewBox="0 0 1080 1920"></svg>
        <div id="tiles"></div>
        <div id="expw"></div>
        <div id="e1" class="env glass"><span id="e1i"></span><b data-layout-allow-overlap>IN-HOUSE</b></div>
        <div id="swap">↔</div>
        <div id="e2" class="env glass"><span id="e2i"></span><b data-layout-allow-overlap>AGENCY / FREELANCE</b></div>
        <div id="gw"></div>
''', '''
        $('#e1i').outerHTML = K.icon("building", 56);
        $('#e2i').outerHTML = K.icon("laptop", 56);
        $('#e1').style.left = "90px"; $('#e2').style.left = "590px";
        const cx = 540, cy = 760, R = 300;
        const tiles = [...Array(8)].map((_, k) => {
          const a = -Math.PI / 2 + k * Math.PI / 4;
          return K.putC($('#tiles'), `<div class="bt glass" data-layout-allow-overlap>BRAND 0${k + 1}</div>`, cx + Math.cos(a) * R * 1.05, cy + Math.sin(a) * R * 0.95);
        });
        const exp = K.putC($('#expw'), K.node("EXPERIENCE", "star", "hot"), cx, cy);
        const g = K.putC($('#gw'), K.node("GROWTH", "growth", "hot"), 540, 1420);
        const svg = $('#wires');
        // "প্রায় 8টি Brand"
        fadeUp("#hd", C.brands - 0.1);
        tl.fromTo(tiles, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)", stagger: 0.12 }, at(C.brands + 0.1));
        // the eight merge into one body of experience
        tiles.forEach((t, k) => {
          const a = -Math.PI / 2 + k * Math.PI / 4;
          tl.to(t, { x: -Math.cos(a) * R * 1.05, y: -Math.sin(a) * R * 0.95, scale: 0.4, opacity: 0, duration: 0.7, ease: "power3.in" }, at(C.brands + 1.9) + k * 0.03);
        });
        pop(exp, C.brands + 2.45, 0.5);
        // "In-house এবং Agency/Freelance"
        tl.fromTo("#e1", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, at(C.inhouse - 0.08));
        tl.fromTo("#e2", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, at(C.agency - 0.08));
        fadeUp("#swap", C.agency + 0.2, 0.3);
        draw(line(svg, "M540 850 L290 1126", 'rgba(114,0,19,0.35)', 3), C.inhouse, 0.4);
        draw(line(svg, "M540 850 L790 1126", 'rgba(114,0,19,0.35)', 3), C.agency, 0.4);
        // "দুই ধরনের working environment" → both feed growth
        draw(line(svg, "M290 1302 C 290 1380, 420 1420, 452 1420", '#80011F', 4), C.environment, 0.45);
        draw(line(svg, "M790 1302 C 790 1380, 660 1420, 628 1420", '#80011F', 4), C.environment, 0.45);
        pop(g, C.environment + 0.35, 0.5);
''')

# ───────────────────────── 05 · NOT JUST LEADS ─────────────────────────
# "আমার কাজের মূল focus সবসময় শুধু Lead Generate করা নয়।"
scene("s05-lead", S["s05-lead"], '''
        #stmt { top: 280px; padding: 0 90px; }
        #wires { position: absolute; left: 0; top: 0; }
''', '''
        <div id="stmt" class="center h3 bn" data-layout-allow-overlap>শুধু <span class="acc">Lead Generate</span> করা নয়</div>
        <svg id="wires" width="1080" height="1920" viewBox="0 0 1080 1920"></svg>
        <div id="nodes"></div>
''', '''
        const svg = $('#wires');
        // the conventional view: AD → LEAD
        const ad0 = K.putC($('#nodes'), K.node("AD", "ads"), 330, 820);
        const lead0 = K.putC($('#nodes'), K.node("LEAD", "users", "hot"), 750, 820);
        const arr0 = line(svg, "M430 820 H 630", '#720013', 4);
        fadeUp("#stmt", C.focus);
        pop(ad0, C.focus + 0.1);
        draw(arr0, C.focus + 0.4, 0.4);
        pop(lead0, C.focus + 0.7);
        // pause on "নয়" … then LEAD becomes one small step of a much longer chain
        const CH = [["AD", "ads"], ["LEAD", "users"], ["CONTACTED", "phone"], ["QUALIFIED", "check"], ["MEETING / SITE VISIT", "cal"], ["SALE", "tag"], ["REVENUE", "revenue"]];
        const chain = CH.map(([l, ic], k) => K.putC($('#nodes'), K.node(l, ic, k === 6 ? "hot" : (k === 1 ? "sm" : "")), 540, 500 + k * 150));
        const t0 = C.leadGen + 0.6;
        tl.to([ad0, lead0], { opacity: 0, scale: 0.8, duration: 0.35, ease: "power2.in" }, at(t0 - 0.35));
        tl.to(arr0, { opacity: 0, duration: 0.2 }, at(t0 - 0.35));
        tl.to("#stmt", { y: -60, opacity: 0.45, duration: 0.4 }, at(t0 - 0.35));
        const span = Math.max(1.6, (C.dekhte - 0.5) - t0);
        chain.forEach((n, k) => {
          tl.fromTo(n, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, at(t0) + k * span / 7);
          if (k < 6) draw(line(svg, `M540 ${540 + k * 150} V ${610 + k * 150}`, 'rgba(114,0,19,0.45)', 3), t0 + k * span / 7 + 0.2, 0.2);
        });
''')

# ───────────────────────── 06 · FUNNEL DIAGNOSTICS ─────────────────────────
# "আমি দেখতে চাই— কোথা থেকে Lead আসছে, কোন Lead … Valuable, Funnel-এর কোথায় Leakage, Campaign কোথায় Improve, … Revenue Growth"
scene("s06-funnel", S["s06-funnel"], '''
        #ttl { top: 270px; }
        .band { position: absolute; height: 106px; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 800; letter-spacing: 0.08em;
          color: #3F1521; background: rgba(114,0,19,0.08); border: 2px solid rgba(114,0,19,0.16); border-radius: 18px; }
        .band.hot { background: #720013; border-color: #720013; color: #FBFCEB; }
        .call { position: absolute; }
        #drops { position: absolute; left: 0; top: 0; }
''', '''
        <div id="ttl" class="center lab" data-layout-allow-overlap>WHAT I WANT TO SEE</div>
        <div id="bands"></div>
        <svg id="drops" width="1080" height="1920" viewBox="0 0 1080 1920"></svg>
        <div id="calls"></div>
''', '''
        const ST = ["TRAFFIC", "LEAD", "CONTACTED", "QUALIFIED", "MEETING / SITE VISIT", "SALE", "REVENUE"];
        const bands = ST.map((l, k) => {
          const w = 860 - k * 82;
          return K.put($('#bands'), `<div class="band" style="width:${w}px" data-layout-allow-overlap>${l}</div>`, 540 - w / 2, 400 + k * 122);
        });
        const call = (txt, ic, x, y) => K.put($('#calls'), `<div class="pill">${K.icon(ic, 28)}<span data-layout-allow-overlap>${txt}</span></div>`, x, y);
        const cSrc = call("WHERE LEADS COME FROM", "search", 0, 0); cSrc.style.left = "0"; cSrc.style.right = "0"; cSrc.style.margin = "0 auto"; cSrc.style.width = "fit-content"; cSrc.style.top = "320px";
        const top = (c) => { c.style.left = "0"; c.style.right = "0"; c.style.margin = "0 auto"; c.style.width = "fit-content"; c.style.top = "320px"; return c; };
        const cQ = top(call("LEAD QUALITY", "star", 0, 0));
        const cLk = top(call("FUNNEL LEAKAGE", "leak", 0, 0));
        const cIm = top(call("CAMPAIGN IMPROVEMENT", "target", 0, 0));
        const cRv = call("REVENUE", "revenue", 0, 0); cRv.style.left = "0"; cRv.style.right = "0"; cRv.style.margin = "0 auto"; cRv.style.width = "fit-content"; cRv.style.top = "320px";
        // "আমি দেখতে চাই" — a transparent funnel builds
        fadeUp("#ttl", C.dekhte - 0.1);
        tl.fromTo(bands, { opacity: 0, scaleX: 0.85 }, { opacity: 1, scaleX: 1, duration: 0.4, ease: "power3.out", stagger: 0.1 }, at(C.dekhte));
        // "কোথা থেকে Lead আসছে"
        tl.to("#ttl", { opacity: 0, duration: 0.2 }, at(C.source - 0.2));
        tl.to(bands[0], { backgroundColor: "#720013", color: "#FBFCEB", duration: 0.3 }, at(C.source));
        fadeUp(cSrc, C.source + 0.1);
        tl.to(bands[0], { backgroundColor: "rgba(114,0,19,0.08)", color: "#3F1521", duration: 0.3 }, at(C.valuable - 0.2));
        tl.to(cSrc, { opacity: 0, duration: 0.25 }, at(C.valuable - 0.2));
        // "কোন Lead সত্যিকার অর্থে Valuable"
        tl.to(bands[3], { backgroundColor: "#720013", color: "#FBFCEB", duration: 0.3 }, at(C.valuable));
        fadeUp(cQ, C.valuable + 0.1);
        tl.to(cQ, { opacity: 0, duration: 0.25 }, at(C.leakage - 0.2));
        tl.to(bands[3], { backgroundColor: "rgba(114,0,19,0.08)", color: "#3F1521", duration: 0.3 }, at(C.leakage - 0.2));
        // "Funnel-এর কোথায় Leakage" — a quiet leak, a few particles escape
        const svg = $('#drops');
        const leakX = 540 + (860 - 2 * 82) / 2 - 10;
        [0, 1, 2, 3, 4, 5].forEach((k) => {
          const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          c.setAttribute('cx', leakX); c.setAttribute('cy', 400 + 2 * 122 + 80); c.setAttribute('r', 9 - (k % 3) * 2); c.setAttribute('fill', '#80011F');
          svg.appendChild(c);
          tl.fromTo(c, { opacity: 0, x: 0, y: 0 }, { opacity: 0.9, x: 40 + k * 14, y: 150 + k * 20, duration: 1.1, ease: "power1.in" }, at(C.leakage) + k * 0.16);
          tl.to(c, { opacity: 0, duration: 0.3 }, at(C.leakage) + k * 0.16 + 1.0);
        });
        tl.to(bands[2], { borderColor: "#80011F", duration: 0.3 }, at(C.leakage));
        fadeUp(cLk, C.leakage + 0.3);
        tl.to(cLk, { opacity: 0, duration: 0.25 }, at(C.improve - 0.2));
        fadeUp(cIm, C.improve);
        tl.to(cIm, { opacity: 0, duration: 0.25 }, at(C.revenue - 0.2));
        // "Campaign কোথায় Improve করা দরকার" — the top of the funnel tightens
        tl.to([bands[0], bands[1]], { borderColor: "#80011F", duration: 0.3, yoyo: true, repeat: 1 }, at(C.improve));
        // "Revenue Growth-এ Contribution"
                tl.to(bands[6], { backgroundColor: "#80011F", color: "#FBFCEB", scale: 1.08, duration: 0.35 }, at(C.revenue));
        fadeUp(cRv, C.revenue + 0.15);
''')

# ───────────────────────── 07 · CAMPAIGN ≠ BUSINESS ─────────────────────────
# "কারণ একটা Campaign ভালো Perform করছে মানেই Business ভালো Perform করছে— এটা সবসময় সত্যি না।"
scene("s07-campaign", S["s07-campaign"], '''
        .pnl { position: absolute; top: 420px; width: 430px; height: 720px; padding: 34px 30px; border-radius: 32px; }
        .pnl h4 { font-size: 40px; font-weight: 800; letter-spacing: 0.06em; margin: 14px 0 26px; }
        .mrow { display: flex; align-items: center; justify-content: space-between; height: 150px; border-top: 2px solid rgba(114,0,19,0.1); }
        .mrow span { font-size: 28px; font-weight: 800; letter-spacing: 0.04em; }
        .mrow em { font-style: normal; font-size: 44px; font-weight: 800; color: #80011F; }
        .mrow svg.sp { width: 120px; height: 60px; }
        #neq { top: 1230px; }
        #neq .h2 { font-size: 64px; }
''', '''
        <div id="pl" class="pnl glass" style="left:100px"><span class="lab">DASHBOARD</span><h4 data-layout-allow-overlap>CAMPAIGN</h4><div id="lrows"></div></div>
        <div id="pr" class="pnl glass" style="left:550px"><span class="lab">REALITY</span><h4 data-layout-allow-overlap>BUSINESS</h4><div id="rrows"></div></div>
        <div id="neq" class="center">
          <div class="mask"><div class="h2" id="n1" data-layout-allow-overlap>GOOD CAMPAIGN <span class="acc">≠</span></div></div>
          <div class="mask"><div class="h2" id="n2" data-layout-allow-overlap>AUTOMATIC <span class="mark">BUSINESS GROWTH</span></div></div>
        </div>
''', '''
        const sp = (d) => `<svg class="sp" viewBox="0 0 120 60"><path d="${d}" fill="none" stroke="#80011F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        const L = [["CTR", "↑", "M4 50 L40 40 L70 28 L116 8"], ["LEADS", "↑", "M4 52 L40 44 L74 22 L116 10"], ["CPL", "↓", "M4 10 L40 22 L74 36 L116 50"]];
        const Rr = [["QUALIFIED", "?", "M4 40 L40 36 L74 38 L116 34"], ["SALES", "?", "M4 42 L40 42 L74 38 L116 40"], ["REVENUE", "?", "M4 40 L40 38 L74 40 L116 37"]];
        const lrows = L.map(([n, a, d]) => { const r = K.el(`<div class="mrow"><span data-layout-allow-overlap>${n}</span>${sp(d)}<em data-layout-allow-overlap>${a}</em></div>`); $('#lrows').appendChild(r); return r; });
        const rrows = Rr.map(([n, a, d]) => { const r = K.el(`<div class="mrow"><span data-layout-allow-overlap>${n}</span>${sp(d)}<em data-layout-allow-overlap>${a}</em></div>`); $('#rrows').appendChild(r); return r; });
        $$('.sp path').forEach((p) => dash(p));
        // "একটা Campaign ভালো Perform করছে" — the campaign side looks great
        tl.fromTo("#pl", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, at(C.campaign - 0.1));
        lrows.forEach((r, k) => { tl.fromTo(r, { opacity: 0 }, { opacity: 1, duration: 0.3 }, at(C.campaign + 0.2 + k * 0.25)); tl.to(r.querySelector('path'), { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, at(C.campaign + 0.3 + k * 0.25)); });
        // "মানেই Business ভালো Perform করছে" — the business side doesn't move the same way
        tl.fromTo("#pr", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, at(C.business - 0.1));
        rrows.forEach((r, k) => { tl.fromTo(r, { opacity: 0 }, { opacity: 1, duration: 0.3 }, at(C.business + 0.2 + k * 0.25)); tl.to(r.querySelector('path'), { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, at(C.business + 0.3 + k * 0.25)); });
        // "এটা সবসময় সত্যি না"
        rise("#n1", C.notTrue);
        rise("#n2", C.notTrue + 0.3);
''')

# ───────────────────────── 08 · DATA · AI · CONNECTED ─────────────────────────
# "আজকের Digital Marketing আরও অনেক বেশি Data-driven, AI-powered এবং connected।"
scene("s08-modern", S["s08-modern"], '''
        #ttl { top: 270px; }
        .big { position: absolute; top: 360px; width: 280px; height: 250px; border-radius: 30px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; text-align: center; }
        .big b { font-size: 34px; font-weight: 800; letter-spacing: 0.04em; line-height: 1.1; }
        #wires { position: absolute; left: 0; top: 0; }
        .rowl { position: absolute; left: 70px; }
''', '''
        <div id="ttl" class="center lab" data-layout-allow-overlap>TODAY'S DIGITAL MARKETING</div>
        <svg id="wires" width="1080" height="1920" viewBox="0 0 1080 1920"></svg>
        <div id="b1" class="big glass" style="left:80px"><span id="i1"></span><b data-layout-allow-overlap>DATA</b></div>
        <div id="b2" class="big glass" style="left:400px"><span id="i2"></span><b data-layout-allow-overlap>AI</b></div>
        <div id="b3" class="big glass" style="left:720px"><span id="i3"></span><b data-layout-allow-overlap>CONNECTED<br>SYSTEMS</b></div>
        <div id="eco"></div>
''', '''
        $('#i1').outerHTML = K.icon("db", 80); $('#i2').outerHTML = K.icon("ai", 80); $('#i3').outerHTML = K.icon("nodes", 80);
        const svg = $('#wires');
        fadeUp("#ttl", C.today);
        pop("#b1", C.dataDriven - 0.08); pop("#b2", C.aiPowered - 0.08); pop("#b3", C.connected - 0.08);
        draw(line(svg, "M360 485 H 400", '#80011F', 4), C.aiPowered + 0.1, 0.25);
        draw(line(svg, "M680 485 H 720", '#80011F', 4), C.connected + 0.1, 0.25);
        // a subtle ecosystem: two acquisition paths → one growth outcome (no platform logos)
        const F = ["WEBSITE", "CRM", "CUSTOMER", "REVENUE"];
        const rows = [["META", 760], ["GOOGLE", 960]];
        const t0 = C.connected + 0.6;
        rows.forEach(([src, y], r) => {
          const xs = [140, 320, 500, 690, 880];
          const items = [src, ...F].map((l, k) => K.putC($('#eco'), K.node(l, null, "sm" + (k === 0 ? " hot" : "")), xs[k], y));
          items.forEach((n, k) => {
            tl.fromTo(n, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, at(t0) + r * 0.25 + k * 0.12);
          });
          [0, 1, 2, 3].forEach((k) => draw(line(svg, `M${xs[k] + 70} ${y} H ${xs[k + 1] - 75}`, 'rgba(114,0,19,0.4)', 3), t0 + r * 0.25 + k * 0.12 + 0.15, 0.2));
          pulse(svg, `M140 ${y} H 880`, t0 + 0.9 + r * 0.3, C.advertising - 0.4, 6);
        });
        const g = K.putC($('#eco'), K.node("GROWTH", "growth", "hot"), 540, 1220);
        draw(line(svg, "M880 800 C 880 1100, 700 1220, 640 1220", '#80011F', 4), t0 + 0.9, 0.5);
        draw(line(svg, "M880 1000 C 870 1150, 720 1220, 640 1220", '#80011F', 4), t0 + 1.0, 0.5);
        pop(g, t0 + 1.3, 0.45);
''')

# ───────────────────────── 09 · ADVERTISING ⊂ MARKETING ⊂ GROWTH ─────────────────────────
# "তাই আমি Marketing-কে শুধু Advertising হিসেবে দেখি না।"
scene("s09-nested", S["s09-nested"], '''
        #grp { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; transform-origin: 540px 900px; }
        .nest { position: absolute; border-radius: 50%; display: flex; align-items: flex-start; justify-content: center; }
        .nest span { margin-top: 36px; font-size: 28px; font-weight: 800; letter-spacing: 0.16em; color: #720013; }
        #ad { left: 400px; top: 760px; width: 280px; height: 280px; align-items: center; background: #720013; border: none; box-shadow: 0 30px 70px rgba(114,0,19,0.3); }
        #ad span { margin: 0; color: #FBFCEB; font-size: 30px; letter-spacing: 0.08em; }
        #mk { left: 240px; top: 600px; width: 600px; height: 600px; }
        #gr { left: 90px; top: 450px; width: 900px; height: 900px; }
        #formula { top: 1430px; }
''', '''
        <div id="grp">
          <div id="gr" class="nest glass"><span data-layout-allow-overlap>BUSINESS GROWTH</span></div>
          <div id="mk" class="nest glass"><span data-layout-allow-overlap>MARKETING</span></div>
          <div id="ad" class="nest"><span data-layout-allow-overlap>ADVERTISING</span></div>
        </div>
        <div id="formula" class="center lab" data-layout-allow-overlap>ADVERTISING ⊂ MARKETING ⊂ GROWTH</div>
''', '''
        // start close on ADVERTISING, then pull back to reveal what it sits inside
        tl.fromTo("#grp", { scale: 1.9 }, { scale: 1.9, duration: 0.01 }, 0);
        pop("#ad", C.advertising - 0.1, 0.5);
        tl.fromTo("#mk", { opacity: 0 }, { opacity: 1, duration: 0.4 }, at(C.marketing - 0.3));
        tl.to("#grp", { scale: 1.3, duration: 1.0, ease: "power3.inOut" }, at(C.marketing - 0.3));
        tl.fromTo("#gr", { opacity: 0 }, { opacity: 1, duration: 0.4 }, at(C.marketing + 0.8));
        tl.to("#grp", { scale: 1.0, duration: 1.0, ease: "power3.inOut" }, at(C.marketing + 0.8));
        fadeUp("#formula", C.marketing + 1.4);
''')

# ───────────────────────── 10 · GROWTH SYSTEM (hero) ─────────────────────────
# "আমি দেখি একটা পুরো Growth System হিসেবে।"
scene("s10-system", S["s10-system"], '''
        #ttl { top: 250px; }
        #ttl .h2 { color: #720013; }
        #orb { position: absolute; left: 0; top: 0; }
''', '''
        <div id="ttl" class="center"><div class="mask"><div class="h2" id="t1" data-layout-allow-overlap>GROWTH SYSTEM</div></div></div>
        <svg id="orb" width="1080" height="1920" viewBox="0 0 1080 1920"></svg>
        <div id="flow"></div>
''', '''
        const svg = $('#orb');
        const FL = [["STRATEGY", "strategy"], ["ACQUISITION", "users"], ["CONVERSION", "target"], ["CRM", "crm"], ["RETENTION", "star"], ["REVENUE", "revenue"]];
        const nodes = FL.map(([l, ic], k) => K.putC($('#flow'), K.node(l, ic, k === 5 ? "hot" : ""), 540, 470 + k * 165));
        const orbit = line(svg, "M540 395 C 900 395, 960 700, 960 880 C 960 1100, 900 1385, 540 1385 C 180 1385, 120 1100, 120 880 C 120 700, 180 395, 540 395 Z", 'rgba(114,0,19,0.18)', 2);
        rise("#t1", C.growthSystem - 0.1);
        nodes.forEach((n, k) => {
          tl.fromTo(n, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, at(C.growthSystem + 0.1) + k * 0.22);
          if (k < 5) draw(line(svg, `M540 ${514 + k * 165} V ${591 + k * 165}`, 'rgba(114,0,19,0.45)', 3), C.growthSystem + 0.25 + k * 0.22, 0.2);
        });
        draw(orbit, C.growthSystem + 0.4, 1.2);
        // subtle data signals circulating around the system — held longer than usual
        [0, 1, 2].forEach((k) => {
          const p = line(svg, "M540 395 C 900 395, 960 700, 960 880 C 960 1100, 900 1385, 540 1385 C 180 1385, 120 1100, 120 880 C 120 700, 180 395, 540 395 Z", '#80011F', 6);
          const len = p.getTotalLength(); p.style.strokeDasharray = `26 ${len}`;
          const dur = 3.2, from = C.growthSystem + 1.4 + k * (dur / 3);
          const n = Math.max(1, Math.floor((C.reStudy - 0.4 - from) / dur));
          tl.fromTo(p, { strokeDashoffset: 26 }, { strokeDashoffset: -len, duration: dur, ease: "none", repeat: n - 1 }, at(from));
        });
''')

# ───────────────────────── 11 · FOCUS MARKETS ─────────────────────────
# "Real Estate এবং Study Abroad আমার প্রধান focus area হলেও, বিভিন্ন Service-based Business-এর Growth Problem নিয়েও কাজ করতে চাই।"
scene("s11-market", S["s11-market"], '''
        #ttl { top: 330px; }
        .fc { position: absolute; top: 700px; width: 380px; height: 330px; border-radius: 34px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; text-align: center;
          background: #720013; color: #FBFCEB; box-shadow: 0 30px 80px rgba(114,0,19,0.28); }
        .fc .ic { stroke: #FBFCEB; }
        .fc b { font-size: 38px; font-weight: 800; letter-spacing: 0.04em; line-height: 1.1; }
        #wide { left: 70px; top: 470px; width: 940px; height: 790px; border-radius: 46%; border: 3px dashed rgba(128,1,31,0.45); }
        #svc { position: absolute; left: 0; right: 0; margin: 0 auto; width: fit-content; top: 1225px; }
''', '''
        <div id="ttl" class="center lab" data-layout-allow-overlap>PRIMARY FOCUS</div>
        <div id="wide" class="ring"></div>
        <div id="f1" class="fc" style="left:130px"><span id="fi1"></span><b data-layout-allow-overlap>REAL<br>ESTATE</b></div>
        <div id="f2" class="fc" style="left:570px"><span id="fi2"></span><b data-layout-allow-overlap>STUDY<br>ABROAD</b></div>
        <div id="svc"><div class="pill" data-layout-allow-overlap><span id="si"></span>SERVICE BUSINESSES</div></div>
        <div id="dots"></div>
''', '''
        $('#fi1').outerHTML = K.icon("building", 96); $('#fi2').outerHTML = K.icon("grad", 96); $('#si').outerHTML = K.icon("nodes", 30);
        fadeUp("#ttl", C.reStudy - 0.1);
        pop("#f1", C.reStudy, 0.5);
        pop("#f2", C.reStudy + 0.6, 0.5);
        // a wider ring opens around them: broader service businesses
        tl.fromTo("#wide", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }, at(C.service2 - 0.1));
        fadeUp("#svc", C.service2 + 0.4);
        const D = [[120, 640], [960, 640], [120, 1100], [960, 1100], [540, 470]];
        const dots = D.map(([x, y]) => K.putC($('#dots'), `<div style="width:30px;height:30px;border-radius:50%;background:#FBFCEB;border:5px solid #80011F"></div>`, x, y));
        tl.fromTo(dots, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", stagger: 0.1 }, at(C.service2 + 0.6));
''')

# ───────────────────────── 12 · CONTENT ECOSYSTEM ─────────────────────────
# "এই প্ল্যাটফর্মে আমি Share করব Digital Marketing, Meta Ads, Google Ads, AI, Automation, Funnel, Data এবং Business Growth …"
scene("s12-content", S["s12-content"], '''
        #ttl { top: 270px; }
        #me { position: absolute; left: 420px; top: 820px; width: 240px; height: 240px; border-radius: 50%; overflow: hidden; border: 6px solid #720013; box-shadow: 0 30px 70px rgba(114,0,19,0.25); }
        #me img { width: 100%; height: 133%; object-fit: cover; object-position: 50% 12%; }
        #mel { position: absolute; left: 0; right: 0; top: 1075px; text-align: center; font-size: 34px; font-weight: 800; letter-spacing: 0.14em; color: #720013; }
        #orb { position: absolute; left: 0; top: 0; }
        #sub { top: 1500px; }
''', '''
        <div id="ttl" class="center lab" data-layout-allow-overlap>ON THIS PLATFORM</div>
        <svg id="orb" width="1080" height="1920" viewBox="0 0 1080 1920"></svg>
        <div id="me"><img src="assets/fahad.jpg" alt="Fahad" /></div>
        <div id="mel" data-layout-allow-overlap>FAHAD</div>
        <div id="topics"></div>
        <div id="sub" class="center lab" data-layout-allow-overlap>EXPERIENCE · ANALYSIS · PRACTICAL THINKING</div>
''', '''
        const svg = $('#orb');
        const ring = line(svg, "M540 440 A 360 500 0 1 1 539.9 440 Z", 'rgba(114,0,19,0.18)', 2);
        const TP = [["META ADS", "ads", "metaAds"], ["GOOGLE ADS", "search", "googleAds"], ["AI", "ai", "ai"], ["AUTOMATION", "gear", "automation"], ["FUNNEL", "funnel", "funnel2"], ["DATA", "db", "data2"], ["BUSINESS GROWTH", "growth", "bizGrowth"]];
        const cx = 540, cy = 940, rx = 330, ry = 480;
        const base = TP.map((_, k) => -Math.PI / 2 + k * (2 * Math.PI / TP.length));
        const tops = TP.map(([l, ic], k) => K.putC($('#topics'), K.node(l, ic, k === 6 ? "hot sm" : "sm"), cx + Math.cos(base[k]) * rx, cy + Math.sin(base[k]) * ry));
        fadeUp("#ttl", C.platform);
        pop("#me", C.platform + 0.2, 0.55);
        fadeUp("#mel", C.platform + 0.4);
        draw(ring, C.platform + 0.5, 1.2);
        // each topic card enters as it is named
        TP.forEach(([, , cue], k) => pop(tops[k], C[cue] - 0.08, 0.35));
        // the ecosystem slowly rotates around Fahad (seek-safe: positions derive from one tweened angle)
        const rot = { a: 0 };
        tl.to(rot, { a: 0.55, duration: Math.max(1, C.ifYou - 0.4 - C.bizGrowth), ease: "sine.inOut",
          onUpdate: () => tops.forEach((t, k) => { gsap.set(t, { left: cx + Math.cos(base[k] + rot.a) * rx, top: cy + Math.sin(base[k] + rot.a) * ry }); }) }, at(C.bizGrowth));
        fadeUp("#sub", C.experience);
''')

# ───────────────────────── 13 · FINAL POSITIONING ─────────────────────────
# "আপনি যদি শুধু Ads চালানোর মানুষ না, বরং Business Growth নিয়ে চিন্তা করেন— তাহলে এই journey-তে আমার সঙ্গে থাকুন। আমি Fahad। And I'm here to talk about what actually drives business growth."
scene("s13-final", S["s13-final"], '''
        #s1 { top: 640px; }
        #s2 { top: 960px; }
        #s1 .h1, #s2 .h1 { font-size: 132px; }
        #jr { top: 1330px; }
        #frame { position: absolute; left: 300px; top: 300px; width: 480px; height: 640px; border-radius: 40px; overflow: hidden; border: 3px solid rgba(114,0,19,0.25); box-shadow: 0 36px 80px rgba(45,0,1,0.2); }
        #frame img { width: 100%; height: 100%; object-fit: cover; }
        #halo { position: absolute; left: 140px; top: 200px; width: 800px; height: 900px; background: radial-gradient(ellipse, rgba(128,1,31,0.2) 0%, rgba(128,1,31,0) 65%); }
        #nm { top: 990px; }
        #rl { top: 1150px; }
        #fl { top: 1250px; padding: 0 120px; }
        #fl .h3 { font-size: 50px; color: #2D0001; font-weight: 600; }
''', '''
        <div id="s1" class="center">
          <div class="mask"><div class="h1" id="a1" data-layout-allow-overlap>DON'T JUST</div></div>
          <div class="mask"><div class="h1" id="a2" data-layout-allow-overlap>RUN ADS.</div></div>
        </div>
        <div id="s2" class="center">
          <div class="mask"><div class="h1" id="b1" data-layout-allow-overlap>THINK</div></div>
          <div class="mask"><div class="h1" id="b2" data-layout-allow-overlap><span class="mark">GROWTH.</span></div></div>
        </div>
        <div id="jr" class="center lab" data-layout-allow-overlap>JOIN THE JOURNEY</div>
        <div id="halo"></div>
        <div id="frame"><img id="ph" src="assets/fahad.jpg" alt="Fahad" /></div>
        <div id="nm" class="center"><div class="mask"><div class="h1" id="n1" data-layout-allow-overlap>FAHAD</div></div></div>
        <div id="rl" class="center h3" data-layout-allow-overlap>Digital Marketing <span class="acc">&amp;</span> Growth</div>
        <div id="fl" class="center"><div class="h3" id="f1" data-layout-allow-overlap>I'm here to talk about what actually drives <span class="acc">business growth.</span></div></div>
''', '''
        // "আপনি যদি শুধু Ads চালানোর মানুষ না"
        rise("#a1", C.ifYou);
        rise("#a2", C.ifYou + 0.3);
        // "বরং Business Growth নিয়ে চিন্তা করেন"
        rise("#b1", C.thinkGrowth);
        rise("#b2", C.thinkGrowth + 0.3);
        // "এই journey-তে আমার সঙ্গে থাকুন"
        fadeUp("#jr", C.journey);
        // "আমি Fahad।" — everything simplifies; the portrait returns
        tl.to(["#s1", "#s2", "#jr"], { opacity: 0, y: -40, duration: 0.45, ease: "power2.in" }, at(C.fahad2 - 0.55));
        tl.fromTo("#halo", { opacity: 0 }, { opacity: 1, duration: 0.8 }, at(C.fahad2 - 0.2));
        tl.fromTo("#frame", { opacity: 0, clipPath: "inset(10% 10% 10% 10% round 40px)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 40px)", duration: 0.8, ease: "power3.out" }, at(C.fahad2 - 0.2));
        tl.fromTo("#ph", { scale: 1.06 }, { scale: 1, duration: C.end - C.fahad2, ease: "power1.out" }, at(C.fahad2 - 0.2));
        rise("#n1", C.fahad2);
        fadeUp("#rl", C.fahad2 + 0.4);
        // "And I'm here to talk about what actually drives business growth." — held to the end
        fadeUp("#f1", C.final, 0.6);
''')
