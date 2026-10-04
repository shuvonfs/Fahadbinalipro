from gen import scene

# 05 RETRIEVAL 22.55–33.2 · "ads recommendation system" 22.6–23.8 · "retrieval layer" 24.0 · "বিশাল সংখ্যক ad candidate" 25.1–26.8
#    "কোন ads কোন মানুষের সামনে relevant" 27.0–29.6 · "AI-driven system … বাছাই করতে সাহায্য করে" 29.98–32.9
scene("s05-retrieval", 22.55, '''
        #tag { top: 250px; }
        #many { top: 330px; }
        #band { position: absolute; left: 110px; top: 940px; width: 860px; height: 124px; border-radius: 28px; display: flex; align-items: center; justify-content: center; gap: 20px;
          background: #720013; border: 3px solid rgba(251,252,235,0.65); font-size: 44px; font-weight: 800; letter-spacing: 0.08em; transform-origin: 50% 50%; }
        #rel { top: 1330px; }
        #cflow { top: 1480px; }
        #match { top: 400px; }
        #map { position: absolute; left: 0; top: 0; }
        #pipe { top: 380px; }
        .pn { position: absolute; left: 300px; width: 480px; }
''', '''
        <div id="tag" class="center micro" data-layout-allow-overlap>ADS RECOMMENDATION SYSTEM</div>
        <div id="many" class="center micro" data-layout-allow-overlap>MANY AD CANDIDATES</div>
        <svg id="map" width="1080" height="1920" viewBox="0 0 1080 1920"></svg>
        <div id="pool"></div>
        <div id="band"><span id="bi"></span><span data-layout-allow-overlap>RETRIEVAL LAYER</span></div>
        <div id="rel" class="center micro" data-layout-allow-overlap>RELEVANT CANDIDATES</div>
        <div id="cflow" class="center micro" data-layout-allow-overlap>CONCEPTUAL FLOW · SIMPLIFIED MODEL</div>
        <div id="match" class="center micro" data-layout-allow-overlap>CONCEPTUAL MATCHING</div>
        <div id="people"></div>
        <div id="pipe" class="center micro" data-layout-allow-overlap>AI-DRIVEN SYSTEM · CONCEPTUAL FLOW</div>
        <div id="pnodes"></div>
''', '''
        $('#bi').outerHTML = S.icon("filter", 52);
        const pool = $('#pool');
        const cands = [];
        for (let i = 0; i < 24; i++) cands.push(S.put(pool, S.cand(i + 1), 130 + (i % 6) * 140, 380 + Math.floor(i / 6) * 132));
        gsap.set(cands, { scale: 0.86, transformOrigin: "50% 50%" });
        fadeUp("#tag", 22.6);
        tl.fromTo(cands, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 0.86, duration: 0.3, ease: "back.out(1.6)", stagger: 0.035 }, at(22.7));
        // 24.0 "retrieval layer"
        tl.fromTo("#band", { opacity: 0, scaleX: 0.3 }, { opacity: 1, scaleX: 1, duration: 0.5, ease: "power3.out" }, at(23.95));
        fadeUp("#cflow", 24.3);
        // 25.1 "বিশাল সংখ্যক ad candidate থেকে" — the pool is narrowed through retrieval
        fadeUp("#many", 25.1);
        const pick = [2, 7, 9, 14, 19, 22];
        const others = cands.filter((_, i) => !pick.includes(i));
        tl.to(others, { opacity: 0.16, duration: 0.4 }, at(25.8));
        pick.forEach((ix, k) => {
          const c = cands[ix];
          const x0 = 130 + (ix % 6) * 140, y0 = 380 + Math.floor(ix / 6) * 132;
          tl.to(c, { x: 130 + k * 140 - x0, y: 1150 - y0, duration: 0.8, ease: "power3.inOut" }, at(25.9) + k * 0.07);
        });
        fadeUp("#rel", 26.6);
        // 27.0 "কোন ads কোন মানুষের সামনে relevant হতে পারে" — different ads, different people
        tl.to([...others, "#band", "#many", "#tag", "#rel", "#cflow"], { opacity: 0, duration: 0.3 }, at(26.95));
        const keep = [2, 7, 14, 19], drop = [9, 22];
        tl.to(drop.map((i) => cands[i]), { opacity: 0, duration: 0.25 }, at(26.95));
        const ys = [470, 680, 890, 1100];
        keep.forEach((ix, k) => {
          const x0 = 130 + (ix % 6) * 140, y0 = 380 + Math.floor(ix / 6) * 132;
          tl.to(cands[ix], { x: 140 - x0, y: ys[k] - y0, scale: 1, duration: 0.6, ease: "power3.inOut" }, at(27.05));
        });
        fadeUp("#match", 27.2);
        const P = [["PERSON A", "price-focused"], ["PERSON B", "growing family"], ["PERSON C", "daily commuter"], ["PERSON D", "first-time buyer"]];
        const pc = P.map(([n, s], k) => S.put($('#people'), S.persona(n, s), 540, ys[k] - 6));
        tl.fromTo(pc, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out", stagger: 0.12 }, at(27.4));
        const map = $('#map');
        const pair = [2, 0, 3, 1]; // Ad → Person
        pair.forEach((p, k) => {
          const l = line(map, `M262 ${ys[k] + 75} C 400 ${ys[k] + 75}, 400 ${ys[p] + 58}, 536 ${ys[p] + 58}`, '#FBFCEB', 4);
          draw(l, 28.0 + k * 0.3, 0.45);
          tl.to(l, { opacity: 0, duration: 0.25 }, at(29.85));
        });
        // 29.98 "AI-driven system-এর মাধ্যমে বাছাই"
        tl.to([...keep.map((i) => cands[i]), ...pc, "#match"], { opacity: 0, duration: 0.3 }, at(29.85));
        fadeUp("#pipe", 30.0);
        const PN = [["SIGNALS", "signal"], ["REPRESENTATION", "image"], ["RETRIEVAL", "filter"], ["RANKING", "rank"], ["DELIVERY", "users"]];
        const pn = PN.map(([l, ic], k) => { const n = S.put($('#pnodes'), S.node(l, ic, k === 2 ? "hot" : ""), 300, 470 + k * 200); n.style.width = "480px"; return n; });
        const arrows = [0, 1, 2, 3].map((k) => line(map, `M540 ${566 + k * 200} V ${670 + k * 200 - 8}`, 'rgba(251,252,235,0.6)', 4));
        pn.forEach((n, k) => {
          tl.fromTo(n, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, at(30.15) + k * 0.28);
          if (k < 4) draw(arrows[k], 30.35 + k * 0.28, 0.25);
        });
        // "বাছাই" 31.78 — the selection runs down the flow
        pn.forEach((n, k) => tl.to(n, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1 }, at(31.75) + k * 0.2));
''')

# 06 DEEPER 33.2–34.85 · "And Meta এখানেই থামেনি" 33.46–34.6
scene("s06-deeper", 33.2, '''
        #stack { position: absolute; left: 140px; top: 520px; width: 800px; height: 700px; perspective: 1400px; }
        .lay { position: absolute; left: 0; width: 800px; height: 220px; border-radius: 30px; transform: rotateX(58deg); border: 3px solid rgba(251,252,235,0.35); background: rgba(63,21,33,0.75); }
        .lay.hot { background: #720013; border-color: rgba(251,252,235,0.8); }
        #hd { top: 1280px; }
        #hd .l2 { font-size: 92px; }
''', '''
        <div id="stack">
          <div class="lay" id="L1" style="top:40px"></div>
          <div class="lay" id="L2" style="top:200px"></div>
          <div class="lay" id="L3" style="top:360px"></div>
          <div class="lay hot" id="L4" style="top:520px"></div>
        </div>
        <div id="hd" class="center">
          <div class="mask"><div class="l2" id="d1" data-layout-allow-overlap>THE SYSTEM</div></div>
          <div class="mask"><div class="l2" id="d2" data-layout-allow-overlap>GETS <span class="mark">DEEPER</span></div></div>
        </div>
''', '''
        tl.fromTo(["#L1", "#L2", "#L3"], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.08 }, at(33.25));
        // the camera sinks one layer deeper
        tl.to(["#L1", "#L2", "#L3"], { y: -170, opacity: (i) => 0.3 + i * 0.2, duration: 0.9, ease: "power3.inOut" }, at(33.7));
        tl.fromTo("#L4", { opacity: 0, y: 120 }, { opacity: 1, y: -170, duration: 0.9, ease: "power3.inOut" }, at(33.7));
        rise("#d1", 33.5);
        rise("#d2", 33.75);
''')

# 07 GEM + SIGNALS 34.85–45.55 · "GEM-এর মতো foundation model" 35.10–36.4 · "নতুন ranking systems" 36.94–38.2
#    user activity ≈39.25 · ad creative representation ≈40.4 · interaction signal ≈42.0 · "আরও sophisticated ভাবে ব্যবহার করছে" 43.3–45.2
scene("s07-gem", 34.85, '''
        #tag { top: 250px; }
        .st { position: absolute; top: 330px; width: 290px; height: 250px; padding: 22px 20px; border-radius: 26px; display: flex; flex-direction: column; gap: 14px; }
        .st b { font-size: 29px; font-weight: 800; line-height: 1.12; letter-spacing: 0.02em; }
        .st .ics { display: flex; gap: 14px; margin-top: auto; }
        #flow { position: absolute; left: 0; top: 0; }
        #model { position: absolute; left: 240px; top: 700px; width: 600px; height: 240px; border-radius: 34px; background: #720013; border: 3px solid rgba(251,252,235,0.75);
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; box-shadow: 0 30px 80px rgba(20,0,0,0.55); }
        #model .g { font-size: 128px; font-weight: 800; line-height: 1; letter-spacing: 0.02em; }
        #rank { position: absolute; left: 240px; top: 1000px; width: 600px; height: 210px; padding: 22px 30px; border-radius: 28px; }
        #rank .hd { display: flex; align-items: center; gap: 12px; }
        .bar { position: absolute; left: 30px; height: 22px; border-radius: 11px; background: rgba(251,252,235,0.7); }
        #out { position: absolute; left: 0; top: 0; }
        #rl { top: 1400px; }
''', '''
        <div id="tag" class="center micro" data-layout-allow-overlap>SIMPLIFIED MODEL</div>
        <svg id="flow" width="1080" height="1920" viewBox="0 0 1080 1920"></svg>
        <div id="s1" class="st glass" style="left:60px"><b data-layout-allow-overlap>USER<br>ACTIVITY</b><div class="ics" id="i1"></div></div>
        <div id="s2" class="st glass" style="left:395px"><b data-layout-allow-overlap>CREATIVE<br>REPRESENTATION</b><div class="ics" id="i2"></div></div>
        <div id="s3" class="st glass" style="left:730px"><b data-layout-allow-overlap>INTERACTION<br>SIGNAL</b><div class="ics" id="i3"></div></div>
        <div id="model"><div class="micro" style="color:rgba(251,252,235,0.8)" data-layout-allow-overlap>FOUNDATION MODEL</div><div class="g" id="gem" data-layout-allow-overlap>GEM</div></div>
        <div id="rank" class="glass"><div class="hd"><span id="ri"></span><span class="micro" data-layout-allow-overlap>RANKING SYSTEMS</span></div><div id="bars"></div></div>
        <div id="out"></div>
        <div id="rl" class="center micro" data-layout-allow-overlap>MORE RELEVANT DELIVERY</div>
''', '''
        $('#ri').outerHTML = S.icon("rank", 40);
        [["cursor", "eye", "heart", "graph"], ["image", "play", "text", "tag"], ["cursor", "check", "chat", "bolt"]].forEach((set, k) => {
          $('#i' + (k + 1)).innerHTML = set.map((ic) => S.icon(ic, 46)).join("");
        });
        // ranking bars: positions are slots; sorting swaps their y
        const L = [300, 420, 220, 380];
        const bars = L.map((w, i) => S.put($('#bars'), `<div class="bar" style="width:${w}px"></div>`, 30, 0));
        bars.forEach((b, i) => { b.style.top = (82 + i * 30) + "px"; });
        const order = [1, 3, 0, 2]; // sorted longest first → slot index per bar
        fadeUp("#tag", 35.0);
        // 35.10 "GEM-এর মতো foundation model"
        tl.fromTo("#model", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" }, at(35.05));
        // 36.94 "নতুন ranking systems"
        tl.fromTo("#rank", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, at(36.9));
        bars.forEach((b, i) => tl.to(b, { y: (order.indexOf(i) - i) * 30, duration: 0.6, ease: "power3.inOut" }, at(37.4)));
        // three signal streams flow into the model, each on its words
        const flow = $('#flow');
        const xs = [205, 540, 875];
        [39.2, 40.35, 41.95].forEach((t, k) => {
          tl.fromTo("#s" + (k + 1), { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, at(t));
          const base = line(flow, `M${xs[k]} 584 C ${xs[k]} 650, 540 640, 540 698`, 'rgba(251,252,235,0.3)', 3);
          draw(base, t + 0.2, 0.4);
          const pulse = line(flow, `M${xs[k]} 584 C ${xs[k]} 650, 540 640, 540 698`, '#FBFCEB', 6);
          const len = pulse.getTotalLength();
          pulse.style.strokeDasharray = `26 ${len}`;
          tl.fromTo(pulse, { strokeDashoffset: 26 }, { strokeDashoffset: -len, duration: 0.7, ease: "none", repeat: Math.floor((45.4 - t - 0.5) / 0.7) - 1 }, at(t + 0.5));
        });
        // 43.3 "আরও sophisticated ভাবে ব্যবহার করছে"
        tl.to("#model", { scale: 1.04, duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, at(43.3));
        bars.forEach((b, i) => tl.to(b, { y: ([2, 0, 3, 1].indexOf(i) - i) * 30, duration: 0.5, ease: "power3.inOut" }, at(43.5)));
        const ads = [0, 1, 2].map((k) => H.place($('#out'), H.angleAd(k, "g" + k), 330 + k * 210, 1300, 0.2));
        tl.fromTo(ads, { opacity: 0, scale: 0.08 }, { opacity: 1, scale: 0.2, duration: 0.4, ease: "back.out(1.5)", stagger: 0.12 }, at(43.8));
        fadeUp("#rl", 44.3);
''')

# 08 SO WHAT 45.55–46.75 · "এর মানে কী?" 45.77–46.3
scene("s08-sowhat", 45.55, '''
        #bn { top: 640px; }
        #sw { top: 760px; }
        #sw .l1 { font-size: 160px; }
''', '''
        <div id="bn" class="center l3" data-layout-allow-overlap>এর মানে কী?</div>
        <div id="sw" class="center">
          <div class="mask"><div class="l1" id="w1" data-layout-allow-overlap>SO WHAT</div></div>
          <div class="mask"><div class="l1" id="w2" data-layout-allow-overlap><span class="mark">CHANGES?</span></div></div>
        </div>
''', '''
        fadeUp("#bn", 45.7, 0.3);
        rise("#w1", 45.75, 0.4);
        rise("#w2", 45.95, 0.4);
''')
