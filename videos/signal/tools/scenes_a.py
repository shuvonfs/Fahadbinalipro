from gen import scene

# 01 HOOK 0–3.95 · "একটা কথা এখন মেনে নিতেই হবে" 0.24 · "Meta Ads-এর game" 2.05/2.61 · "আগের মতো নেই" 3.0–3.5
scene("s01-hook", 0, '''
        #panel { left: 130px; top: 360px; width: 820px; }
        .row { display: flex; align-items: center; justify-content: space-between; height: 104px; border-top: 2px solid rgba(251,252,235,0.12); }
        .row .k { display: flex; align-items: center; gap: 16px; font-size: 32px; font-weight: 800; }
        .row .v { font-size: 26px; font-weight: 600; padding: 10px 18px; border-radius: 12px; background: rgba(251,252,235,0.1); color: rgba(251,252,235,0.85); }
        #wave { position: absolute; left: 130px; top: 360px; width: 820px; height: 560px; }
        #hero { top: 1060px; }
        #hero .l1 { font-size: 150px; }
''', '''
        <div id="panel" class="panel glass">
          <div class="ph" id="ph"><span id="ph-i"></span>AUDIENCE · DETAILED TARGETING</div>
          <div class="row" id="r1"><div class="k"><span class="ri"></span>Location</div><div class="v">Dhaka</div></div>
          <div class="row" id="r2"><div class="k"><span class="ri"></span>Age</div><div class="v">25 – 45</div></div>
          <div class="row" id="r3"><div class="k"><span class="ri"></span>Interests</div><div class="v">+ add interests</div></div>
          <div class="row" id="r4"><div class="k"><span class="ri"></span>Detailed targeting</div><div class="v">Include people who…</div></div>
        </div>
        <svg id="wave" viewBox="0 0 820 560"></svg>
        <div id="hero" class="center">
          <div class="mask"><div class="l1" id="h1" data-layout-allow-overlap>THE GAME</div></div>
          <div class="mask"><div class="l1" id="h2" data-layout-allow-overlap><span class="mark">CHANGED</span></div></div>
        </div>
''', '''
        $('#ph-i').outerHTML = S.icon("users", 34);
        const ris = $$('.ri'); ["pin", "cal", "heart", "filter"].forEach((ic, i) => { ris[i].outerHTML = S.icon(ic, 40); });
        // signal waves that take over the old panel when the game changes
        const svg = $('#wave');
        const waves = [0, 1, 2, 3].map((k) => line(svg, `M0 ${150 + k * 95} C 140 ${90 + k * 95}, 270 ${210 + k * 95}, 410 ${150 + k * 95} S 680 ${90 + k * 95}, 820 ${150 + k * 95}`, '#FBFCEB', 3));
        tl.fromTo("#panel", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, at(0.05));
        tl.fromTo(["#r1", "#r2", "#r3", "#r4"], { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", stagger: 0.22 }, at(0.3));
        // "game … আগের মতো নেই" — the old interface gives way
        tl.to(["#r1 .v", "#r2 .v", "#r3 .v", "#r4 .v"], { opacity: 0, x: 30, duration: 0.3, stagger: 0.06 }, at(2.45));
        tl.to("#panel", { opacity: 0.35, scale: 0.94, duration: 0.6, ease: "power2.inOut" }, at(2.5));
        waves.forEach((w, i) => draw(w, 2.6 + i * 0.08, 0.7));
        rise("#h1", 2.55);
        rise("#h2", 3.0);
''')

# 02 OLD TARGETING 3.95–11.85 · interest 4.44 · age 5.40 · location 5.64 · detailed targeting 6.28 · "নিয়ে বসে থাকলে" 7.04
#    "আপনি Meta-এর বর্তমান advertising system" 8.12 · "বড় অংশ miss করছেন" 10.36–11.4
scene("s02-targeting", 3.95, '''
        #grp { position: absolute; left: 150px; top: 640px; width: 780px; height: 400px; border-radius: 34px; border: 3px dashed rgba(251,252,235,0.0); transform-origin: 50% 50%; display: flex; flex-wrap: wrap; justify-content: center; align-content: center; gap: 24px; padding: 40px; }
        #grp .uchip { position: relative !important; left: auto !important; top: auto !important; }
        #glabel { position: absolute; left: 0; right: 0; top: -64px; text-align: center; }
        #map { position: absolute; left: 0; top: 0; }
        .sn { position: absolute; }
        #hub { position: absolute; left: 400px; top: 912px; width: 280px; }
        #here { position: absolute; left: 80px; top: 330px; width: 420px; text-align: center; }
        #miss { top: 1440px; }
        #miss .l3 { font-weight: 800; }
''', '''
        <svg id="map" width="1080" height="1920" viewBox="0 0 1080 1920"></svg>
        <div id="grp"><div id="glabel" class="micro">AUDIENCE SELECTION</div></div>
        <div id="here" class="micro" data-layout-allow-overlap>YOU ARE LOOKING HERE</div>
        <div id="nodes"></div>
        <div id="miss" class="center"><div class="mask"><div class="l3" id="miss-w" data-layout-allow-overlap>…and missing the bigger system</div></div></div>
''', '''
        const grp = $('#grp');
        const chips = [
          S.put(grp, S.chip("INTEREST", "heart"), 40, 50),
          S.put(grp, S.chip("AGE", "cal"), 430, 50),
          S.put(grp, S.chip("LOCATION", "pin"), 40, 160),
          S.put(grp, S.chip("DETAILED TARGETING", "filter"), 40, 270)
        ];
        // spoken: interest 4.44 · age 5.40 · location 5.64 · detailed targeting 6.28
        [4.4, 5.36, 5.6, 6.24].forEach((t, i) => tl.fromTo(chips[i], { opacity: 0, y: 26, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.6)" }, at(t)));
        // 7.04 grouped as one thing: AUDIENCE SELECTION
        tl.to(grp, { borderColor: "rgba(251,252,235,0.55)", duration: 0.4 }, at(7.0));
        fadeUp("#glabel", 7.05);
        // 8.12 pull back — it is only one part of a larger system
        tl.to(grp, { scale: 0.5, x: -250, y: -330, duration: 0.8, ease: "power3.inOut" }, at(8.1));
        const map = $('#map');
        const hub = S.put($('#nodes'), S.node("AD SYSTEM", "ai", "hot"), 0, 0);
        hub.id = "hubn"; hub.style.left = "395px"; hub.style.top = "800px"; hub.style.width = "290px";
        const N = [["CREATIVE", "image", 640, 610], ["SIGNALS", "signal", 640, 1000], ["OBJECTIVE", "goal", 640, 1300], ["DATA", "db", 90, 1300], ["DELIVERY", "users", 90, 1000]];
        const nodes = N.map(([l, ic, x, y]) => { const n = S.put($('#nodes'), S.node(l, ic), x, y); n.style.width = "340px"; return n; });
        const wires = [[290, 612], [810, 658], [810, 1048], [810, 1348], [260, 1348], [260, 1048]].map(([x, y]) => line(map, `M540 848 L${x} ${y}`, 'rgba(251,252,235,0.3)', 3));
        tl.fromTo(hub, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.5)" }, at(8.55));
        wires.forEach((w, i) => draw(w, 8.7 + i * 0.12, 0.4));
        tl.fromTo(nodes, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)", stagger: 0.25 }, at(8.85));
        // 10.36 "একটা বড় অংশ miss করছেন"
        fadeUp("#here", 10.3);
        tl.to(nodes, { borderColor: "rgba(251,252,235,0.85)", background: "#720013", duration: 0.3, stagger: 0.06 }, at(10.8));
        rise("#miss-w", 10.85);
''')

# 03 COMMON TAKE 11.85–17.6 · "Andromeda নিয়ে অনেকেই … বলে" 12.05–14.6 · "Targeting শেষ" 15.02 · "আমি কিন্তু এভাবে বলব না" 16.31
scene("s03-common", 11.85, '''
        .cm { position: absolute; left: 110px; width: 860px; padding: 28px 32px; border-radius: 28px; display: flex; gap: 22px; align-items: flex-start; }
        .cm .av { width: 72px; height: 72px; border-radius: 50%; background: #720013; border: 2px solid rgba(251,252,235,0.5); flex: none; display: flex; align-items: center; justify-content: center; }
        .cm .nm { width: 200px; height: 14px; border-radius: 7px; background: rgba(251,252,235,0.45); margin: 8px 0 18px; }
        .cm .ln { height: 12px; border-radius: 6px; background: rgba(251,252,235,0.22); margin-bottom: 12px; }
        #main { top: 760px; }
        #main .q { font-size: 96px; font-weight: 800; line-height: 1.15; margin-top: 4px; }
        #take { position: absolute; left: 110px; top: 690px; }
        #tag { position: absolute; left: 0; right: 0; top: 330px; text-align: center; }
        #ns { top: 1270px; }
        #ns .l1 { font-size: 150px; }
''', '''
        <div id="tag" class="micro">ANDROMEDA · WHAT PEOPLE SAY</div>
        <div id="c1" class="cm glass" style="top:430px"><div class="av"></div><div style="flex:1"><div class="nm"></div><div class="ln" style="width:520px"></div><div class="ln" style="width:360px"></div></div></div>
        <div id="c2" class="cm glass" style="top:610px"><div class="av"></div><div style="flex:1"><div class="nm"></div><div class="ln" style="width:470px"></div><div class="ln" style="width:300px"></div></div></div>
        <div id="main" class="cm glass"><div class="av" id="mav"></div><div style="flex:1"><div class="nm"></div><div class="q" data-layout-allow-overlap>“Targeting শেষ।”</div></div></div>
        <div id="take" class="micro" data-layout-allow-overlap>COMMON TAKE</div>
        <div id="ns" class="center">
          <div class="mask"><div class="l1" id="n1" data-layout-allow-overlap>NOT THAT</div></div>
          <div class="mask"><div class="l1" id="n2" data-layout-allow-overlap><span class="mark">SIMPLE</span></div></div>
        </div>
''', '''
        $$('.av').forEach((a) => { a.innerHTML = S.icon("user", 40); });
        fadeUp("#tag", 12.05);
        tl.fromTo(["#c1", "#c2"], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", stagger: 0.45 }, at(12.2));
        // 15.02 “Targeting শেষ”
        tl.to(["#c1", "#c2"], { opacity: 0.25, y: -40, duration: 0.4 }, at(14.85));
        tl.fromTo("#main", { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }, at(14.95));
        fadeUp("#take", 15.2);
        // 16.31 “আমি কিন্তু এভাবে বলব না।” — push the take back, correct it
        tl.to(["#main", "#take"], { opacity: 0.4, scale: 0.86, y: -170, duration: 0.5, ease: "power3.inOut" }, at(16.25));
        tl.to(["#c1", "#c2", "#tag"], { opacity: 0, duration: 0.3 }, at(16.25));
        rise("#n1", 16.35);
        rise("#n2", 16.7);
''')

# 04 NOT A BUTTON 17.6–21.75 · "কারণ Andromeda আসলে advertiser-এর জন্য" 17.82 · "কোনো নতুন targeting button" 19.98–21.14 · "না" 21.26
scene("s04-button", 17.6, '''
        #lbl { top: 360px; }
        #btn { position: absolute; left: 0; right: 0; margin: 0 auto; top: 780px; width: fit-content; height: 150px; padding: 0 64px; border-radius: 75px; background: #FBFCEB; color: #2D0001;
          display: flex; align-items: center; gap: 22px; font-size: 60px; font-weight: 800; letter-spacing: 0.02em; box-shadow: 0 30px 70px rgba(20,0,0,0.5); }
        #btn .ic { stroke: #2D0001; }
        #cur { position: absolute; left: 720px; top: 1180px; width: 110px; height: 110px; }
        #nb { top: 1080px; }
        #nb .l2 { font-size: 84px; }
''', '''
        <div id="lbl" class="center micro">ANDROMEDA FOR ADVERTISERS</div>
        <div id="btn"><span id="bi"></span>NEW TARGETING</div>
        <svg id="cur" viewBox="0 0 24 24"><path d="M6 3.5l12 7-5.2 1.4 3.4 6-2.4 1.4-3.4-6L6.5 17z" fill="#FBFCEB" stroke="#2D0001" stroke-width="1.2" stroke-linejoin="round" /></svg>
        <div id="nb" class="center">
          <div class="mask"><div class="l2" id="nb1" data-layout-allow-overlap>NOT A NEW</div></div>
          <div class="mask"><div class="l2" id="nb2" data-layout-allow-overlap>TARGETING BUTTON</div></div>
        </div>
''', '''
        $('#bi').outerHTML = S.icon("target", 64);
        fadeUp("#lbl", 17.85);
        tl.fromTo("#btn", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, at(18.3));
        // cursor reaches for it on "নতুন targeting button"
        tl.fromTo("#cur", { opacity: 0, x: 120, y: 160 }, { opacity: 1, x: -150, y: -330, duration: 1.1, ease: "power2.inOut" }, at(19.85));
        tl.to("#cur", { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 }, at(21.0));
        // 21.26 "না" — the button isn't the thing
        tl.to("#btn", { opacity: 0.18, scale: 0.92, duration: 0.35, ease: "power2.out" }, at(21.22));
        tl.to("#cur", { opacity: 0, duration: 0.2 }, at(21.25));
        rise("#nb1", 21.24, 0.35);
        rise("#nb2", 21.34, 0.35);
''')
