/**
 * Caption track: the real script, chunked into spoken phrases with measured start/end (seconds).
 * Word times inside a phrase are distributed by character weight (karaoke highlight).
 */
export type Phrase = { a: number; b: number; text: string };

export const PHRASES: Phrase[] = [
  { a: 0.04, b: 2.15, text: "Meta Ads-এ Broad Targeting ব্যবহার করছেন?" },
  { a: 2.51, b: 5.24, text: "তার মানে কিন্তু আপনার Marketing Strategy Broad হয়ে যায়নি।" },
  { a: 5.73, b: 7.38, text: "বরং একটা সময় আমরা ভাবতাম—" },
  { a: 7.66, b: 8.81, text: "“আমি কাকে Target করব?”" },
  { a: 9.1, b: 9.93, text: "Interest কী হবে?" },
  { a: 10.17, b: 10.81, text: "Age কত?" },
  { a: 10.99, b: 11.81, text: "Location কোথায়?" },
  { a: 12.03, b: 13.33, text: "কোন Behaviour select করব?" },
  { a: 13.73, b: 18.0, text: "কিন্তু আজকের AI-driven Meta Ads environment-এ প্রশ্নটা ধীরে ধীরে বদলাচ্ছে।" },
  { a: 18.3, b: 20.16, text: "এখন শুধু “কাকে Target করব?” না।" },
  { a: 20.38, b: 20.89, text: "বরং—" },
  { a: 21.15, b: 22.78, text: "“আমি আসলে কেমন Customer চাই?”" },
  { a: 23.19, b: 26.07, text: "ধরুন আপনি একটা Study Abroad Consultancy-এর Marketing করছেন।" },
  { a: 26.3, b: 29.4, text: "আপনি Meta-কে একটা broad audience দিলেন— Bangladesh-এর students।" },
  { a: 29.82, b: 32.6, text: "Meta অনেক ধরনের মানুষের কাছে আপনার ad দেখাতে পারে।" },
  { a: 32.81, b: 34.68, text: "কিন্তু আপনার Business Strategy যদি হয়—" },
  { a: 34.88, b: 38.3, text: "UK-তে Master's করতে আগ্রহী, নির্দিষ্ট academic profile" },
  { a: 38.36, b: 41.8, text: "এবং realistic budget-এর students-এর মধ্যে qualified enquiry তৈরি করা।" },
  { a: 42.13, b: 44.01, text: "তাহলে আপনার strategy কিন্তু broad না।" },
  { a: 44.46, b: 45.46, text: "আপনার delivery broad," },
  { a: 45.67, b: 46.97, text: "Customer definition sharp," },
  { a: 47.25, b: 47.93, text: "Offer sharp," },
  { a: 48.16, b: 48.9, text: "Message sharp," },
  { a: 48.95, b: 50.07, text: "Conversion goal sharp।" },
  { a: 50.47, b: 52.72, text: "ধরুন একজন Doctor-এর জন্য campaign চালাচ্ছেন।" },
  { a: 52.9, b: 54.05, text: "Audience broad রাখলেন।" },
  { a: 54.24, b: 55.38, text: "কিন্তু Creative বলছে—" },
  { a: 55.53, b: 57.16, text: "“বারবার chest discomfort হচ্ছে?" },
  { a: 57.31, b: 59.61, text: "একজন qualified cardiologist-এর পরামর্শ নিন।”" },
  { a: 59.87, b: 61.92, text: "এখানে আপনি শুধু “মানুষ” target করছেন না।" },
  { a: 62.08, b: 64.35, text: "আপনি একটা specific problem নিয়ে কথা বলছেন।" },
  { a: 64.5, b: 66.83, text: "একটা specific need-এর সঙ্গে connect করছেন।" },
  { a: 66.98, b: 67.48, text: "অর্থাৎ—" },
  { a: 67.74, b: 70.42, text: "Audience broad হতে পারে, কিন্তু message specific।" },
  { a: 70.94, b: 73.1, text: "আর Real Estate-এ ধরুন—" },
  { a: 73.1, b: 75.49, text: "Dhaka-এর একটা residential project-এর জন্য broad audience ব্যবহার করলেন।" },
  { a: 75.73, b: 76.8, text: "কিন্তু Creative বলছে—" },
  { a: 76.93, b: 79.81, text: "“নিজের পরিবারের জন্য Dhaka-তে 3-bedroom apartment খুঁজছেন?”" },
  { a: 80.1, b: 80.86, text: "আরেকটা Creative—" },
  { a: 81.12, b: 83.37, text: "“আপনার next property কি investment-এর জন্য?”" },
  { a: 83.62, b: 85.21, text: "Audience delivery broad হতে পারে।" },
  { a: 85.42, b: 89.61, text: "কিন্তু আপনি customer-এর Need, Intent এবং Context নিয়ে specific কথা বলছেন।" },
  { a: 89.78, b: 90.65, text: "এটাই Strategy।" },
  { a: 91.03, b: 93.31, text: "তাই একটা জিনিস খুব পরিষ্কারভাবে বুঝতে হবে—" },
  { a: 93.43, b: 96.07, text: "Broad Targeting আর Broad Strategy এক জিনিস না।" },
  { a: 96.38, b: 98.95, text: "Broad Targeting হলো— “Meta-কে বেশি জায়গা দেওয়া," },
  { a: 98.95, b: 101.6, text: "যাতে তার system সম্ভাব্য customer খুঁজে নিতে পারে।”" },
  { a: 101.88, b: 104.6, text: "কিন্তু Broad Strategy হলো— “আমার customer কে," },
  { a: 104.6, b: 107.0, text: "তার problem কী, আমি কী offer করছি" },
  { a: 107.0, b: 110.62, text: "এবং business-এর জন্য success দেখতে কেমন— এসব পরিষ্কার না থাকা।”" },
  { a: 110.77, b: 112.85, text: "দুটোর মধ্যে আকাশ-পাতাল difference।" },
  { a: 113.2, b: 116.9, text: "আপনি Broad Audience ব্যবহার করলেও এই জিনিসগুলো কখনো broad হওয়া উচিত না—" },
  { a: 117.3, b: 118.3, text: "Business Objective →" },
  { a: 118.4, b: 119.7, text: "Ideal Customer →" },
  { a: 119.8, b: 121.0, text: "Customer Problem →" },
  { a: 121.1, b: 121.8, text: "Offer →" },
  { a: 121.9, b: 123.1, text: "Creative Message →" },
  { a: 123.15, b: 124.4, text: "Conversion Signal →" },
  { a: 124.5, b: 125.2, text: "Business Outcome।" },
  { a: 125.38, b: 128.3, text: "এগুলো যত clear হবে, AI-driven delivery system-কে" },
  { a: 128.3, b: 130.89, text: "তত ভালোভাবে কাজ করার context দিতে পারবেন।" },
  { a: 131.2, b: 134.3, text: "Meta তার ad ranking systems-এ user behaviour" },
  { a: 134.3, b: 137.96, text: "এবং engagement-এর মতো signals আরও গভীরভাবে ব্যবহার করছে বলে জানিয়েছে।" },
  { a: 138.39, b: 141.61, text: "কিন্তু এর মানে এই নয় যে marketer-এর strategy আর প্রয়োজন নেই।" },
  { a: 141.87, b: 142.45, text: "বরং" },
  { a: 142.73, b: 146.96, text: "AI-এর জন্য relevant signals তৈরি করার দায়িত্ব আরও গুরুত্বপূর্ণ হয়ে যায়।" },
  { a: 147.31, b: 149.3, text: "তাই আমি যখন বলি “Broad Targeting”," },
  { a: 149.3, b: 151.99, text: "আমি কখনো বলি না— “যাকে খুশি তাকে ad দেখান।”" },
  { a: 152.41, b: 152.99, text: "আমি বলি—" },
  { a: 153.23, b: 154.75, text: "“Delivery-তে flexibility দিন," },
  { a: 155.0, b: 156.78, text: "কিন্তু Strategy-তে clarity রাখুন।”" },
  { a: 157.1, b: 157.52, text: "কারণ—" },
  { a: 157.73, b: 158.94, text: "Audience broad হতে পারে।" },
  { a: 159.4, b: 160.95, text: "কিন্তু Thinking broad হওয়া উচিত না।" },
  { a: 161.33, b: 164.61, text: "আর আমার কাছে এটাই modern Meta Ads-এর একটা গুরুত্বপূর্ণ shift।" },
  { a: 164.84, b: 168.72, text: "আগে আমরা অনেক সময় চেষ্টা করতাম— Customer-কে manually খুঁজে বের করতে।" },
  { a: 168.97, b: 171.99, text: "এখন AI-কে সেই discovery-তে বেশি ভূমিকা দেওয়া যায়।" },
  { a: 172.32, b: 174.24, text: "কিন্তু AI-কে আপনাকেই বলতে হবে—" },
  { a: 174.52, b: 177.17, text: "“আমার Business-এর জন্য valuable customer কাকে বলে?”" },
  { a: 177.76, b: 178.42, text: "আমি Fahad।" },
  { a: 178.71, b: 180.95, text: "আর আমার কাছে ভালো advertising মানে শুধু—" },
  { a: 181.0, b: 183.31, text: "more reach, more clicks, বা more leads না।" },
  { a: 183.66, b: 184.95, text: "ভালো advertising মানে—" },
  { a: 184.98, b: 188.31, text: "the right customer, the right message, and the right business outcome।" },
  { a: 188.64, b: 189.43, text: "Broad delivery." },
  { a: 189.7, b: 190.46, text: "Sharp strategy." },
];

/** English keywords rendered in the accent colour inside captions. */
export const EMPHASIS = new Set([
  "broad", "targeting", "strategy", "customer", "ai-driven", "specific", "sharp", "sharp,", "need", "intent", "context",
  "problem", "offer", "message", "conversion", "signals", "relevant", "flexibility", "clarity", "valuable", "right", "outcome",
  "delivery", "qualified", "enquiry", "students", "doctor", "investment", "fahad",
]);

export type CapWord = { w: string; a: number; b: number; em: boolean };
export const phraseWords = (ph: Phrase): CapWord[] => {
  const words = ph.text.split(" ");
  const weights = words.map((w) => Math.max(2, [...w].length));
  const total = weights.reduce((s, x) => s + x, 0);
  let acc = ph.a;
  return words.map((w, i) => {
    const d = ((ph.b - ph.a) * weights[i]) / total;
    const out = { w, a: acc, b: acc + d, em: EMPHASIS.has(w.toLowerCase().replace(/[“”"’,।?—.:→]/g, "").replace(/-এ$|-এর$|-কে$|-তে$/, "")) };
    acc += d;
    return out;
  });
};
