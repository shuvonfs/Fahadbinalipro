# Fahad Video Studio — নিজের computer-এ (Pro plan-এর session limit দিয়ে)

এভাবে চালালে cloud credit খরচ হয় না, খরচ হয় শুধু Claude Pro plan-এর session/weekly limit।
Render হয় আপনার নিজের computer-এ, তাই সেখানে কোনো খরচ নেই।

## একবারই করবেন (প্রথম দিন)
1. GitHub থেকে এই `setup` folder-টা download করুন (অথবা পুরো repo-র ZIP)।
2. **Windows:** `1-SETUP-WINDOWS.bat` double-click করুন। **Mac:** `1-SETUP-MAC.command` double-click করুন।
   - মাঝে GitHub login চাইলে sign in করুন (repo private)।
   - Node.js বা Git নতুন install হলে window বন্ধ করে file-টা আবার double-click করুন।
3. শেষে "DONE!" লেখা এলে setup সম্পূর্ণ।

## প্রতিবার ভিডিও বানাতে
1. Voiceover MP3 রাখুন: `Fahadbinalipro/remotion/public/<ভিডিওর-নাম>/voiceover.mp3`
2. `2-START-CLAUDE` file double-click করুন → Claude খুলবে (প্রথমবার Pro account দিয়ে login)।
3. নিচের prompt copy করে script বসিয়ে পাঠান:

```
public/<ভিডিওর-নাম>/voiceover.mp3 এর জন্য নতুন 16:9 ভিডিও বানাও।
BroadSharpV2-এর kinetic kit (src/brand/kinetic) আর AGENTS.md-এর workflow ব্যবহার করো।
আগে voiceover-এর timing মেপে prompt/plan দাও, আমি approve করলে build করবে।
Captions থাকবে। কাজ শেষে render করে out/ folder-এ রাখবে।
Script:
<এখানে script paste করুন>
```

4. ভিডিও দেখতে `3-PREVIEW` file double-click করুন → browser-এ Remotion Studio খুলবে।
5. পরিবর্তন লাগলে Claude-কে সময় ধরে বলুন, যেমন: "42s-এ লেখা আগে আনো"।
6. Final ভিডিও পাবেন: `Fahadbinalipro/remotion/out/` folder-এ।

## Limit বাঁচাতে
- প্রতিটা নতুন ভিডিওর জন্য Claude-এ `/clear` লিখে নতুন করে শুরু করুন।
- ছোট পরিবর্তনে `/model` লিখে **Sonnet** বেছে নিন; নতুন design-এর সময় Opus।
- Limit শেষ হলে কয়েক ঘণ্টা পর আবার reset হয়।
