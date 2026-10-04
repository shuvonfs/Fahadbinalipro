from gen import scene

# 13 CHAPTER 77.25–79.3 · "কারণ 2026-এর Meta Ads-এ" 77.43 (2026 77.67 · Meta Ads 78.63)
scene("s13-chapter", 77.25, '''
        #yr { top: 700px; font-weight: 800; font-size: 300px; line-height: 1; letter-spacing: -0.03em; }
        #ma { top: 640px; }
        #rule { position: absolute; left: 340px; top: 1040px; width: 400px; height: 8px; border-radius: 4px; background: #80011F; transform-origin: left center; }
''', '''
        <div id="ma" class="center micro" data-layout-allow-overlap>META ADS</div>
        <div class="center" style="top:700px"><div class="mask"><div id="yr" data-layout-allow-overlap>2026</div></div></div>
        <div id="rule"></div>
''', '''
        tl.fromTo("#yr", { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: "expo.out" }, at(77.62));
        tl.fromTo("#rule", { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power3.inOut" }, at(78.1));
        fadeUp("#ma", 78.6);
''')

# 14 OLD QUESTION 79.3–83.85 · "আমার কাছে সবচেয়ে গুরুত্বপূর্ণ question" 79.47–81.43 · "আর শুধু" 81.63 · "কাকে target করব?" 82.11 · "না" 83.39
scene("s14-oldq", 79.3, '''
        #mi { top: 520px; }
        #card { position: absolute; left: 110px; top: 640px; width: 860px; height: 400px; border-radius: 34px; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; text-align: center; transform-origin: 50% 50%; }
        #card .l2 { font-size: 82px; }
        #qm { font-size: 220px; font-weight: 800; line-height: 1; color: rgba(251,252,235,0.25); }
        #fill { display: flex; flex-direction: column; align-items: center; gap: 14px; }
        #one { position: absolute; left: 140px; top: 1110px; }
''', '''
        <div id="mi" class="center micro" data-layout-allow-overlap>THE MOST IMPORTANT QUESTION</div>
        <div id="card" class="glass">
          <div id="qm" data-layout-allow-overlap>?</div>
          <div id="fill"><span id="ti"></span><div class="l2" data-layout-allow-overlap>WHO DO I TARGET?</div><div class="l3" data-layout-allow-overlap>কাকে target করব?</div></div>
        </div>
        <div id="onew"></div>
''', '''
        $('#ti').outerHTML = S.icon("target", 80);
        gsap.set("#fill", { position: "absolute" });
        fadeUp("#mi", 79.5);
        tl.fromTo("#card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, at(80.1));
        // 82.11 “কাকে target করব?”
        tl.to("#qm", { opacity: 0, scale: 0.6, duration: 0.25 }, at(81.95));
        tl.fromTo("#fill", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, at(82.05));
        // 83.39 "না" — not wrong, just no longer the whole question
        tl.to("#card", { scale: 0.56, x: -210, y: -300, opacity: 0.6, duration: 0.55, ease: "power3.inOut" }, at(83.35));
        tl.to("#mi", { opacity: 0, duration: 0.25 }, at(83.35));
        const one = S.put($('#onew'), S.chip("ONE COMPONENT", "plus"), 150, 690);
        tl.fromTo(one, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 }, at(83.55));
''')

# 15 THESIS 83.85–90.15 · "Question হচ্ছে" 84.10 · "Meta-কে আমি কী signal দিচ্ছি" 85.10 (signal 85.98) · "যাতে system" 86.90 (system 87.22)
#    "সঠিক মানুষকে" 87.70 · "সঠিক ad দেখাতে পারে" 88.66–89.7
scene("s15-thesis", 83.85, '''
        #old { position: absolute; left: 110px; top: 250px; opacity: 0.5; }
        #old .uchip { height: 64px; font-size: 24px; }
        #rq { top: 370px; }
        #hero { top: 420px; }
        #hero .l2 { font-size: 80px; }
        #ins { position: absolute; left: 90px; top: 650px; width: 900px; display: flex; flex-wrap: wrap; justify-content: center; gap: 18px; }
        #ins .uchip { height: 76px; font-size: 26px; padding: 0 24px; }
        #sv { position: absolute; left: 0; top: 0; }
        #aiw .snode { position: absolute; left: 340px; top: 900px; width: 400px; }
        #pw .pcard { width: 400px; }
        .ol { position: absolute; top: 1365px; width: 400px; text-align: center; font-size: 40px; font-weight: 800; }
        #plus { position: absolute; left: 515px; top: 1200px; font-size: 64px; font-weight: 800; }
''', '''
        <div id="old"></div>
        <div id="rq" class="center micro" data-layout-allow-overlap>THE REAL QUESTION</div>
        <div id="hero" class="center">
          <div class="mask"><div class="l2" id="h1" data-layout-allow-overlap>WHAT <span class="mark">SIGNAL</span></div></div>
          <div class="mask"><div class="l2" id="h2" data-layout-allow-overlap>AM I GIVING META?</div></div>
        </div>
        <svg id="sv" width="1080" height="1920" viewBox="0 0 1080 1920"></svg>
        <div id="ins"></div>
        <div id="aiw"></div>
        <div id="pw"></div>
        <div id="adw"></div>
        <div id="plus">+</div>
        <div id="o1" class="ol" style="left:90px" data-layout-allow-overlap>RIGHT PERSON</div>
        <div id="o2" class="ol" style="left:590px" data-layout-allow-overlap>RIGHT AD</div>
''', '''
        $('#old').innerHTML = S.chip("WHO DO I TARGET?", "target", "dim");
        const IN = [["BUSINESS OBJECTIVE", "goal"], ["CONVERSION SIGNAL", "check"], ["CREATIVE", "image"], ["USER SIGNALS", "signal"]];
        $('#ins').innerHTML = IN.map(([l, i]) => S.chip(l, i)).join("");
        const ins = $$('#ins .uchip');
        const ai = S.put($('#aiw'), S.node("AI SYSTEM", "ai", "hot"), 0, 0); ai.style.left = "340px"; ai.style.top = "900px"; ai.style.width = "400px";
        const per = S.put($('#pw'), S.persona("PERSON", "most likely to act"), 90, 1110);
        const ad = H.place($('#adw'), H.angleAd(1, "th"), 790, 1240, 0.27);
        const sv = $('#sv');
        tl.fromTo("#old", { opacity: 0 }, { opacity: 0.5, duration: 0.3 }, 0);
        // 84.10 "Question হচ্ছে—"
        fadeUp("#rq", 84.1);
        // 85.10 "Meta-কে আমি কী signal দিচ্ছি"
        tl.to("#rq", { opacity: 0, duration: 0.2 }, at(85.0));
        rise("#h1", 85.1);
        rise("#h2", 85.4);
        tl.fromTo(ins, { opacity: 0, y: 24, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.5)", stagger: 0.16 }, at(85.95));
        // 86.90 "যাতে system" → AI SYSTEM
        [[300, 836], [780, 836]].forEach(([x, y], k) => draw(line(sv, `M${x} ${y} C ${x} 870, 540 860, 540 896`, '#FBFCEB', 4), 86.85 + k * 0.06, 0.35));
        tl.fromTo(ai, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }, at(87.15));
        // 87.70 "সঠিক মানুষকে"
        draw(line(sv, "M480 996 C 420 1050, 300 1060, 290 1106", '#FBFCEB', 4), 87.6, 0.35);
        tl.fromTo(per, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, at(87.75));
        fadeUp("#o1", 87.9);
        // 88.66 "সঠিক ad"
        draw(line(sv, "M600 996 C 660 1050, 780 1050, 790 1136", '#FBFCEB', 4), 88.55, 0.35);
        fadeUp("#plus", 88.6, 0.3);
        tl.fromTo(ad, { opacity: 0, scale: 0.12 }, { opacity: 1, scale: 0.27, duration: 0.45, ease: "back.out(1.4)" }, at(88.7));
        fadeUp("#o2", 88.85);
        // hold: gentle breath on the outcome
        tl.to(["#hero"], { scale: 1.03, duration: 1.2, ease: "sine.inOut" }, at(88.95));
''')

# 16 CTA 90.15–98.429 · "আপনি এখনও Meta Ads-এ audience-কে সবচেয়ে বড় lever ভাবছেন?" 90.45–93.3 (audience 91.61 · lever 92.73)
#    "কমেন্টে বলুন" 93.90 · Targeting 94.66 · Creative 95.34 · Data 96.22 · "কোনটা এখন সবচেয়ে powerful?" 96.70–98.06
scene("s16-cta", 90.15, '''
        #hero { top: 330px; }
        #hero .l2 { font-size: 84px; }
        #com { position: absolute; left: 0; right: 0; margin: 0 auto; width: fit-content; top: 380px; }
        #com .uchip { height: 96px; font-size: 40px; background: #80011F; border-color: rgba(251,252,235,0.7); }
        .lc { position: absolute; left: 120px; width: 840px; height: 200px; border-radius: 30px; padding: 0 36px; display: flex; align-items: center; gap: 28px; transform-origin: 50% 50%; }
        .lc b { font-size: 64px; font-weight: 800; letter-spacing: 0.01em; }
        .lc em { display: block; font-style: normal; font-size: 26px; font-weight: 600; color: rgba(251,252,235,0.65); margin-top: 4px; }
        .lc .r { margin-left: auto; position: relative; width: 120px; height: 140px; }
        #vs { top: 1320px; }
        #fin { top: 1370px; }
        #fin .l2 { font-size: 66px; }
''', '''
        <div id="hero" class="center">
          <div class="mask"><div class="l2" id="h1" data-layout-allow-overlap>THE BIGGEST</div></div>
          <div class="mask"><div class="l2" id="h2" data-layout-allow-overlap><span class="mark">LEVER?</span></div></div>
        </div>
        <div id="com"></div>
        <div id="k1" class="lc glass" style="top:620px"><span id="i1"></span><div><b data-layout-allow-overlap>TARGETING</b><em data-layout-allow-overlap>audience selection</em></div><div class="r" id="r1"></div></div>
        <div id="k2" class="lc glass" style="top:850px"><span id="i2"></span><div><b data-layout-allow-overlap>CREATIVE</b><em data-layout-allow-overlap>what people see</em></div><div class="r" id="r2"></div></div>
        <div id="k3" class="lc glass" style="top:1080px"><span id="i3"></span><div><b data-layout-allow-overlap>DATA</b><em data-layout-allow-overlap>the signals you send</em></div><div class="r" id="r3"></div></div>
        <div id="vs" class="center micro" data-layout-allow-overlap>TARGETING vs CREATIVE vs DATA</div>
        <div id="fin" class="center">
          <div class="mask"><div class="l2" id="f1" data-layout-allow-overlap>WHICH IS THE BIGGEST</div></div>
          <div class="mask"><div class="l2" id="f2" data-layout-allow-overlap>LEVER FOR YOU?</div></div>
        </div>
''', '''
        $('#i1').outerHTML = S.icon("target", 90);
        $('#i2').outerHTML = S.icon("image", 90);
        $('#i3').outerHTML = S.icon("db", 90);
        $('#r1').innerHTML = S.icon("users", 96);
        H.place($('#r2'), H.angleAd(2, "ct"), 60, 70, 0.18);
        $('#r3').innerHTML = S.icon("signal", 96);
        $('#com').innerHTML = S.chip("COMMENT BELOW", "chat");
        const cards = ["#k1", "#k2", "#k3"];
        // 90.45 "…audience-কে সবচেয়ে বড় lever ভাবছেন?"
        rise("#h1", 90.45);
        rise("#h2", 90.75);
        tl.fromTo(cards, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out", stagger: 0.15 }, at(91.55));
        // 93.90 "কমেন্টে বলুন—"
        tl.to(["#h1", "#h2"], { yPercent: -125, duration: 0.35, ease: "expo.in" }, at(93.7));
        tl.fromTo("#com", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" }, at(93.9));
        // each lever lights on its word — none is "wrong"
        [94.62, 95.3, 96.18].forEach((t, k) => {
          tl.to(cards[k], { scale: 1.04, borderColor: "rgba(251,252,235,0.9)", duration: 0.2 }, at(t));
          tl.to(cards[k], { scale: 1, borderColor: "rgba(251,252,235,0.2)", duration: 0.3 }, at(t) + 0.55);
        });
        // 96.70 "কোনটা এখন সবচেয়ে powerful?"
        fadeUp("#vs", 96.6);
        rise("#f1", 96.7);
        rise("#f2", 96.95);
''')
