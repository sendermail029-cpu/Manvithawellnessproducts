"use client";

import { useEffect, useState, useRef } from "react";

// ─── PRODUCT CONFIG ───────────────────────────────────────────────
const PRODUCT = {
  name: "వెయిట్ లాస్ జ్యూస్",
  tagline: "వెయిట్ మేనేజ్‌మెంట్ రొటీన్‌కి సహజ హర్బల్ వెల్నెస్ సపోర్ట్",
  mrp: 3499,
  price: 2699,
  onlineDiscount: 10,
  phone: "8333914149",
  whatsapp: "918333914149",
  email: "infomanvitha15@gmail.com",
  stock: 19,
  timerMinutes: 15,
  resultDays: "45 రోజుల",
  images: [
    "/weight (1).jpeg",
    "/weight (2).jpeg",
    "/weight (3).jpeg",
    "/weight (4).jpeg",
   
  ],
  collageImage: "/weight-loss-collage.jpg",
};

const ONLINE_PRICE = Math.round(PRODUCT.price * (1 - PRODUCT.onlineDiscount / 100));

// ─── BEFORE / AFTER DATA ──────────────────────────────────────────
const beforeAfterData = [
  { 
    beforeImg: "/921.jpg", 
    afterImg: "/922.jpg", 
    before: "82 kg", 
    after: "72 kg", 
    beforeSub: "38 ఇంచ్ నడుము", 
    afterSub: "33 ఇంచ్ నడుము", 
    label: "30 రోజుల ఫలితం" 
  },
  { 
   beforeImg: "/76.png", 
    afterImg: "/86.png", 
    before: "76 kg", 
    after: "67 kg", 
    beforeSub: "36 ఇంచ్ నడుము", 
    afterSub: "31 ఇంచ్ నడుము", 
    label: "45 రోజుల ఫలితం" 
  },
  { 
    beforeImg: "/91.png", 
    afterImg: "/79.png", 
    before: "91 kg", 
    after: "79 kg", 
    beforeSub: "38 ఇంచ్ నడుము", 
    afterSub: "32 ఇంచ్ నడుము", 
    label: "60 రోజుల ఫలితం" 
  },
];
// ─── BENEFITS ─────────────────────────────────────────────────────
const benefits = [
  { icon: "🔥", title: "బాడీ షేప్ సపోర్ట్", desc: "నడుము మరియు పొట్ట చుట్టూ ఫిట్‌నెస్ రొటీన్‌కి సహాయం" },
  { icon: "✨", title: "బ్లోటింగ్ తగ్గుదల", desc: "హెవీనెస్ తగ్గి శరీరం తేలికగా అనిపించే రొటీన్ ఫోకస్" },
  { icon: "⚡", title: "ఎనర్జీ సపోర్ట్", desc: "రోజువారీ యాక్టివిటీకి మద్దతిచ్చే హర్బల్ ఫార్ములా" },
  { icon: "🌿", title: "100% హర్బల్", desc: "సహజ మూలికలతో తయారైన శుద్ధమైన ఫార్ములా" },
  { icon: "⚖️", title: "వెయిట్ రొటీన్", desc: "క్లీన్ డైట్ మరియు వ్యాయామంతో పాటు వాడటానికి అనువైనది" },
  { icon: "💧", title: "డిటాక్స్ సపోర్ట్", desc: "శరీర శుద్ధికి సహజ హర్బల్ మద్దతు" },
];

// ─── HOW TO USE ───────────────────────────────────────────────────
const steps = [
  { n: "01", title: "ఉదయం ఖాళీ కడుపుతో", desc: "ఉదయం నీటితో కలిపి తీసుకుంటే రోజు తేలికగా మొదలవుతుంది." },
  { n: "02", title: "భోజనం ముందు వాడండి", desc: "భోజనం 30 నిమిషాల ముందుగా తీసుకోవడం వల్ల రొటీన్ కంట్రోల్‌లో ఉంటుంది." },
  { n: "03", title: "క్రమంగా కొనసాగించండి", desc: "క్లీన్ డైట్, ఎక్కువ నీరు, చిన్న వాకింగ్‌తో కలిసి 45 రోజులు నిరంతరంగా వాడండి." },
];

// ─── TESTIMONIALS: 4 Telugu + 1 Hindi + 1 English + 1 Tamil + 1 Kannada ─────
const testimonials = [
  {
    name: "రేఖా రెడ్డి",
    area: "హైదరాబాద్, తెలంగాణ",
    lang: "తెలుగు",
    stars: 5,
    // Add your customer photo: /public/testimonials/rekha.jpg
    image: "/testimonials/rekha.jpg",
    text: "నేను గత 3 సంవత్సరాలుగా బరువు సమస్యతో చాలా ఇబ్బంది పడ్డాను. పెళ్ళి తర్వాత బరువు చాలా పెరిగింది. జిమ్‌కి వెళ్ళే సమయం లేదు, డైట్ చేస్తే తలనొప్పి వస్తుంది. ఇంట్లో వాళ్ళు కూడా చాలా ఏడిపించేవారు. ఒకసారి ఈ జ్యూస్ గురించి విని ట్రై చేశాను. మొదటి వారంలో పెద్ద తేడా కనిపించలేదు కానీ నిరాశపడకుండా కొనసాగించాను. 45 రోజుల తర్వాత నడుము చుట్టూ 4 ఇంచ్‌లు తగ్గాయి. శరీరం చాలా తేలికగా అనిపిస్తోంది. మా ఆయన కూడా తేడా గమనించారు. ఇప్పుడు నేను చాలా కాన్ఫిడెంట్‌గా బయటకు వెళ్తున్నాను!",
  },
  {
    name: "సంధ్య కుమారి",
    area: "విజయవాడ, ఆంధ్రప్రదేశ్",
    lang: "తెలుగు",
    stars: 5,
    image: "/testimonials/sandhya.jpg",
    text: "థైరాయిడ్ వల్ల నా బరువు తగ్గడం చాలా కష్టంగా మారింది. డాక్టర్ దగ్గరకు వెళ్తే మందులు మాత్రమే ఇస్తారు కానీ బరువు మాత్రం తగ్గేది కాదు. పొట్ట ప్రాంతంలో చాలా హెవీనెస్ అనుభవించేదాన్ని. ఈ జ్యూస్ మా చెల్లెలు సూచించింది. రోజూ ఉదయం ఖాళీ కడుపుతో తీసుకోవడం మొదలుపెట్టాను. రెండు నెలల తర్వాత పొట్ట చాలా తగ్గింది, బ్లోటింగ్ పూర్తిగా తగ్గింది. ఎనర్జీ కూడా చాలా పెరిగింది. నా రొటీన్‌లో చాలా మంచి మార్పు వచ్చింది.",
  },
  {
    name: "అనుపమ శర్మ",
    area: "నిజామాబాద్, తెలంగాణ",
    lang: "తెలుగు",
    stars: 4,
    image: "/testimonials/anupama.jpg",
    text: "డెలివరీ తర్వాత 15 కిలోలు పెరిగాయి. పిల్లలను చూసుకుంటూ వ్యాయామానికి సమయం దొరక్కపోయేది. చాలా నిరాశగా అనిపించేది. నా ఫ్రెండ్ ఈ జ్యూస్ ట్రై చేయమని చెప్పింది. మూడు నెలలు క్రమంగా వాడాను. 8 కిలోల బరువు తగ్గాను. డైట్ కూడా కొంచెం మెరుగుపరచుకున్నాను. ఫలితాలు వ్యక్తి వ్యక్తికి మారవచ్చు కానీ నాకు మంచి అనుభవం కలిగింది. ఇప్పుడు జీన్స్ వేసుకుంటున్నాను — అది చాలా పెద్ద విషయం నాకు!",
  },
  {
    name: "పద్మావతి నాయుడు",
    area: "విశాఖపట్నం, ఆంధ్రప్రదేశ్",
    lang: "తెలుగు",
    stars: 5,
    image: "/testimonials/padmavathi.jpg",
    text: "50 ఏళ్ళ వయసులో బరువు తగ్గడం చాలా కష్టం అని అందరూ చెప్పేవారు. నేను కూడా నమ్మలేదు. కానీ ఈ జ్యూస్ వాడిన తర్వాత నాలో చాలా మార్పు కనిపించింది. ముఖ్యంగా నడుము చుట్టూ ఉన్న కొవ్వు చాలా తగ్గింది. సాయంత్రం వేళ కూడా ఎనర్జెటిక్‌గా ఉంటున్నాను. మా పక్కింటి ఆంటీ కూడా ఆశ్చర్యపడి తనకు కూడా ఒక బాటిల్ తెప్పించమంది. హర్బల్ ఫార్ములా అయినందున నమ్మకంగా వాడగలుగుతున్నాను.",
  },
  {
    name: "प्रिया गुप्ता",
    area: "दिल्ली, उत्तर प्रदेश",
    lang: "हिंदी",
    stars: 5,
    image: "/testimonials/priya.jpg",
    text: "मैं पिछले 2 साल से अपना वजन कम करने की कोशिश कर रही थी। जिम जाती थी, डाइटिंग भी करती थी लेकिन पेट और कमर पर चर्बी कम नहीं हो रही थी। एक दोस्त ने इस जूस के बारे में बताया। पहले तो मुझे यकीन नहीं था, लेकिन 60 दिन लगातार इस्तेमाल करने के बाद सच में फर्क नजर आया। पेट काफी कम हुआ, शरीर हल्का लगने लगा। साथ में खाना भी सही रखा और थोड़ा वॉकिंग भी किया। नतीजे बेहतरीन रहे। अब मैं अपने सभी दोस्तों को यह recommend कर रही हूं।",
  },
  {
    name: "Meenakshi Rajan",
    area: "Chennai, Tamil Nadu",
    lang: "English",
    stars: 5,
    image: "/testimonials/meenakshi.jpg",
    text: "I had been struggling with post-pregnancy weight for almost two years. Nothing seemed to work — crash diets left me exhausted and gym sessions were impossible to maintain with a toddler at home. My cousin from Hyderabad suggested this juice. I was skeptical at first, but decided to give it a genuine shot for 45 days. I paired it with a simple morning walk and clean eating. The bloating reduced significantly within the first two weeks. By day 45, I had lost 7 kgs and three inches around my waist. The herbal formula is gentle and I had no side effects at all. I genuinely feel like myself again.",
  },
  {
    name: "மீனா சுந்தரம்",
    area: "கோயம்புத்தூர், தமிழ்நாடு",
    lang: "Tamil",
    stars: 5,
    image: "/testimonials/meena.jpg",
    text: "என்னுடைய திருமணத்திற்கு பிறகு எடை மிகவும் அதிகரித்தது. சேலை உடுத்திக்கொள்ள மிகவும் சங்கடமாக இருந்தது. பல முறை டயட் பண்ணி பார்த்தேன், ஆனால் சின்ன நேரத்தில் திரும்பவும் எடை போட்டுவிட்டது. இந்த ஜூஸ் பத்தி என் தங்கை சொன்னாள். 45 நாள் தொடர்ந்து குடிச்சேன். தோள்பட்டை மற்றும் இடுப்பு பகுதியில் நல்ல மாற்றம் தெரிஞ்சது. வயிறு தொல்லை குறைஞ்சது, உடம்பு லேசா ஆச்சு. ரொம்ப சந்தோஷமா இருக்கு. தமிழ்நாட்டிலயும் டெலிவரி சீக்கிரம் வந்துச்சு.",
  },
  {
    name: "ಸುಮಿತ್ರಾ ಹೆಗಡೆ",
    area: "ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ",
    lang: "Kannada",
    stars: 4,
    image: "/testimonials/sumitra.jpg",
    text: "ನನಗೆ ಡೆಸ್ಕ್ ಜಾಬ್ ಇರುವ ಕಾರಣ ದಿನಕ್ಕೆ 8 ಗಂಟೆ ಕೂರಬೇಕಾಗುತ್ತದೆ. ಹೊಟ್ಟೆ ಮತ್ತು ತೊಡೆಯ ಸುತ್ತ ತುಂಬಾ ತೊಂದರೆಯಾಗಿತ್ತು. ಅನೇಕ ಬಾರಿ ಡಯಟ್ ಮಾಡಿದ್ದೆ ಆದರೆ ಒಂದೇ ತಿಂಗಳಲ್ಲಿ ಮತ್ತೆ ಎಲ್ಲ ಮೊದಲಿನ ಹಾಗಾಗುತ್ತಿತ್ತು. ಈ ವೇಟ್ ಲಾಸ್ ಜ್ಯೂಸ್ ಪ್ರಯತ್ನಿಸಿದೆ. 2 ತಿಂಗಳ ನಿರಂತರ ಬಳಕೆಯ ನಂತರ ಶರೀರ ತುಂಬಾ ಹಗುರವಾಗಿ ಅನಿಸುತ್ತಿದೆ. ಹೊಟ್ಟೆ ಊತ ಕಡಿಮೆಯಾಯಿತು. ಫಲಿತಾಂಶಗಳು ವ್ಯಕ್ತಿಯಿಂದ ವ್ಯಕ್ತಿಗೆ ಬದಲಾಗಬಹುದು ಆದರೆ ನನಗೆ ಉತ್ತಮ ಅನುಭವವಾಯಿತು.",
  },
];

// ─── FAQ (removed "can I use with other products", replaced with new Q) ───────
const faqs = [
  {
    q: "వెయిట్ లాస్ జ్యూస్ ఎలా వాడాలి?",
    a: "ఉదయం ఖాళీ కడుపుతో లేదా భోజనం ముందు నీటితో కలిపి క్రమంగా వాడండి. లేబుల్‌లో సూచించిన పరిమాణం అనుసరించండి.",
  },
  {
    q: "ఎప్పుడు తేడా కనిపించవచ్చు?",
    a: "వ్యక్తిగతంగా ఫలితాలు మారవచ్చు. క్రమంగా వాడినప్పుడు లైటర్ ఫీలింగ్, రొటీన్ కంట్రోల్ వంటి అనుభూతులు కనిపించవచ్చు. మంచి ఆహారం మరియు చిన్న వ్యాయామంతో పాటు వాడితే ఇంకా మంచిది.",
  },
  {
    q: "ఈ జ్యూస్ డైట్ లేకుండా వాడవచ్చా?",
    a: "అవును వాడవచ్చు. కానీ క్లీన్ డైట్, సరిపడా నీరు తాగడం, రోజూ కొంచెం వాకింగ్ చేయడం వంటివి పాటించినప్పుడు ఫలితాలు మరింత మెరుగ్గా అనిపించవచ్చు. ఇది రొటీన్‌కు సహాయకరమైన ఉత్పత్తి.",
  },
  {
    q: "ఆన్‌లైన్ పేమెంట్ చేస్తే ఎంత తగ్గింపు వస్తుంది?",
    a: `ఆన్‌లైన్ పేమెంట్ చేస్తే ${PRODUCT.onlineDiscount}% అదనపు తగ్గింపు లభిస్తుంది. ఆర్డర్ ఫారమ్‌లో "ఆన్‌లైన్ పేమెంట్" ఎంచుకుంటే స్వయంచాలకంగా డిస్కౌంట్ వర్తిస్తుంది.`,
  },
  {
    q: "డెలివరీ ఎంత కాలం పడుతుంది?",
    a: "సాధారణంగా 3–5 పని దినాలలో డెలివరీ అవుతుంది. ఉచిత డెలివరీ మరియు COD రెండూ అందుబాటులో ఉన్నాయి.",
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────
export default function WeightLossPage() {
  const [timer, setTimer] = useState(PRODUCT.timerMinutes * 60);
  const [stock, setStock] = useState(PRODUCT.stock);
  const [imgIdx, setImgIdx] = useState(0);
  const [baIdx, setBaIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", address: "", state: "", pin: "", qty: "1", payment: "cod", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const tickRef = useRef(0);

  useEffect(() => {
    const t = setInterval(() => {
      setTimer(p => {
        if (p <= 1) return PRODUCT.timerMinutes * 60;
        tickRef.current++;
        if (tickRef.current % 90 === 0) setStock(s => Math.max(3, s - 1));
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

useEffect(() => {
  const t1 = setInterval(() => {
    setImgIdx(p => (p + 1) % PRODUCT.images.length);
  }, 6000); // 👉 6 seconds

  const t2 = setInterval(() => {
    setBaIdx(p => (p + 1) % beforeAfterData.length);
  }, 6000); // optional: also slow this

  return () => {
    clearInterval(t1);
    clearInterval(t2);
  };
}, []);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  const stockPct = Math.max(10, (stock / PRODUCT.stock) * 100);
  const savings = PRODUCT.mrp - PRODUCT.price;
  const discPct = Math.round((savings / PRODUCT.mrp) * 100);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "పేరు అవసరం";
    if (!/^\d{10}$/.test(form.mobile)) e.mobile = "సరైన 10 అంకెల నంబర్ నమోదు చేయండి";
    if (!form.address.trim()) e.address = "చిరునామా అవసరం";
    if (!form.state.trim()) e.state = "రాష్ట్రం అవసరం";
    if (!/^\d{6}$/.test(form.pin)) e.pin = "6 అంకెల పిన్‌కోడ్ నమోదు చేయండి";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const total = form.payment === "online" ? ONLINE_PRICE : PRODUCT.price;
    const payLabel = form.payment === "online"
      ? `ఆన్‌లైన్ పేమెంట్ (${PRODUCT.onlineDiscount}% తగ్గింపు) ₹${total.toLocaleString("en-IN")}`
      : `COD ₹${total.toLocaleString("en-IN")}`;
    const msg = `*${PRODUCT.name} ఆర్డర్*\n\nపేరు: ${form.name}\nమొబైల్: ${form.mobile}\nచిరునామా: ${form.address}\nరాష్ట్రం: ${form.state}\nపిన్: ${form.pin}\nపరిమాణం: ${form.qty}\nచెల్లింపు: ${payLabel}${form.notes ? `\nగమనిక: ${form.notes}` : ""}\n\nఆర్డర్ కన్ఫర్మ్ చేయండి.`;
    window.open(`https://wa.me/${PRODUCT.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  const inp = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));
  const clrErr = (field: string) => setErrors(e => ({ ...e, [field]: "" }));

  const langMeta: Record<string, { bg: string; text: string; fontCls: string }> = {
    "తెలుగు": { bg: "#ecfdf5", text: "#065f46", fontCls: "tel" },
    "हिंदी":  { bg: "#eff6ff", text: "#1e40af", fontCls: "dev" },
    "English": { bg: "#f5f3ff", text: "#5b21b6", fontCls: "" },
    "Tamil":   { bg: "#fff7ed", text: "#9a3412", fontCls: "tam" },
    "Kannada": { bg: "#fdf4ff", text: "#7e22ce", fontCls: "kan" },
  };

  const waIcon = (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.849L.057 23.9l6.274-1.643A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.015-1.376l-.36-.213-3.728.977.996-3.635-.234-.374A9.818 9.818 0 1112 21.818z"/>
    </svg>
  );


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;600;700;800&family=Noto+Serif+Telugu:wght@600;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Sans+Tamil:wght@400;600;700&family=Noto+Sans+Kannada:wght@400;600;700&family=Inter:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        :root{
          --g1:#0d2137;--g2:#0a3d2e;
          --em:#10b981;--em-l:#d1fae5;--em-d:#065f46;
          --am:#f59e0b;--am-l:#fef3c7;--am-d:#92400e;
          --rose:#f43f5e;
          --sl:#64748b;--sl-l:#f1f5f9;--sl-ll:#e2e8f0;
          --tx:#0f172a;--tx2:#475569;
        }
        body{font-family:'Inter',sans-serif;background:#f8fafc;color:var(--tx);padding-bottom:100px}
        .tel{font-family:'Noto Sans Telugu',sans-serif}
        .tel-s{font-family:'Noto Serif Telugu',serif}
        .dev{font-family:'Noto Sans Devanagari',sans-serif}
        .tam{font-family:'Noto Sans Tamil',sans-serif}
        .kan{font-family:'Noto Sans Kannada',sans-serif}

        /* Ticker */
        .tkr{background:linear-gradient(90deg,var(--g1),var(--g2));padding:9px 0;overflow:hidden;position:sticky;top:0;z-index:50}
        .tkr-in{display:flex;width:max-content;animation:tkr 30s linear infinite}
        @keyframes tkr{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .tkr-seg{display:flex;align-items:center;white-space:nowrap}
        .tkr-dot{width:5px;height:5px;border-radius:50%;background:var(--am);margin:0 18px;flex-shrink:0}

        /* Hero */
        .hero{background:linear-gradient(140deg,var(--g1) 0%,#0f3d2a 55%,#0d3b1a 100%);min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:0 16px 48px;position:relative;overflow:hidden}
        .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 60% 30%,rgba(16,185,129,.12),transparent);pointer-events:none}
        .h-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(16,185,129,.18);border:1px solid rgba(16,185,129,.3);color:#6ee7b7;padding:5px 14px;border-radius:999px;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:14px}
        .h-title{font-family:'Noto Serif Telugu',serif;font-size:clamp(2rem,6vw,3.2rem);color:#fff;text-align:center;line-height:1.15;margin-bottom:10px}
        .h-tag{font-family:'Noto Sans Telugu',sans-serif;color:#a7f3d0;font-size:clamp(.85rem,2.5vw,1rem);text-align:center;line-height:1.7;max-width:520px;margin-bottom:24px}

        /* Timer */
        .tmr{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:20px;padding:16px 20px;margin-bottom:24px;text-align:center;width:100%;max-width:440px}
        .tmr-lbl{font-family:'Noto Sans Telugu',sans-serif;color:#fca5a5;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px}
        .tmr-dig{display:flex;align-items:center;justify-content:center;gap:8px}
        .tmr-cell{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);border-radius:12px;padding:10px 14px;min-width:60px;text-align:center}
        .tmr-num{display:block;font-size:1.8rem;font-weight:800;color:#fff;line-height:1}
        .tmr-sub{display:block;font-family:'Noto Sans Telugu',sans-serif;font-size:9px;color:#86efac;margin-top:3px;font-weight:600}
        .tmr-colon{font-size:1.6rem;font-weight:800;color:var(--am);margin-top:-4px}
        .tmr-urg{font-family:'Noto Sans Telugu',sans-serif;color:#fca5a5;font-size:12px;margin-top:10px;font-weight:600}

        /* Hero grid */
        .hgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px;width:100%;max-width:680px;margin-bottom:28px}
        @media(max-width:560px){.hgrid{grid-template-columns:1fr}}
     .psh{
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 32px;
  overflow: hidden;
  padding: 0 0 14px;
  width: 100%;
  max-width: 560px;
  position: relative;
}

.ptk{
  display: flex;
  height: 100%;
  transition: transform 1.2s ease-in-out;
}

.psl{
  min-width: 100%;
  width: 100%;
  height: 520px;
  display: flex;
  align-items: center;     /* 👈 change */
  justify-content: center; /* 👈 change */
  padding: 0px;           /* 👈 optional */
}

.pimg{
  width: 100%;
  height: 100%;
  object-fit: contain;   /* 👈 THIS IS THE FIX */
  object-position: center;
  background: #fff;      /* 👈 optional (better look) */
}
        .bash{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:24px;overflow:hidden;padding:12px;display:flex;flex-direction:column}
        .batk{display:flex;flex:1;transition:transform .8s cubic-bezier(.4,0,.2,1)}
        .basl{min-width:100%;padding:2px}
        .bacd{background:rgba(255,255,255,.94);border-radius:18px;padding:14px;height:100%;display:flex;flex-direction:column;gap:10px}
        .bah{font-family:'Noto Sans Telugu',sans-serif;color:#065f46;font-size:11px;font-weight:700;text-align:center;letter-spacing:.06em}
        .bar{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:stretch;flex:1}
        .bap{border-radius:14px;padding:12px 10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px}
        .bap.bef{background:linear-gradient(160deg,#fff1f2,#fff5f5);border:1.5px solid #fecdd3}
        .bap.aft{background:linear-gradient(160deg,#ecfdf5,#f0fdf4);border:1.5px solid #a7f3d0}
        .balbl{font-family:'Noto Sans Telugu',sans-serif;font-size:9px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
        .balbl.bef{color:#e11d48}.balbl.aft{color:#059669}
        .babig{font-size:1.35rem;font-weight:800;color:#0f172a;line-height:1}
        .basml{font-size:.75rem;color:#64748b;font-weight:600}
        .baarr{font-size:1.2rem;color:var(--em);font-weight:900;display:flex;align-items:center;justify-content:center}
        .dots{display:flex;justify-content:center;gap:6px;margin-top:10px}
        .dot{width:7px;height:7px;border-radius:999px;background:rgba(255,255,255,.25);transition:all .3s;cursor:pointer}
        .dot.on{width:20px;background:var(--am)}

        /* Price block */
        .pblk{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:20px;padding:20px 24px;width:100%;max-width:440px;margin-bottom:20px;text-align:center}
        .pblk-mrp{font-size:.85rem;color:rgba(255,255,255,.4);text-decoration:line-through;margin-bottom:2px}
        .pblk-main{font-size:3rem;font-weight:800;color:#fff;line-height:1}
        .pblk-save-row{display:flex;gap:8px;align-items:center;justify-content:center;margin-top:8px;flex-wrap:wrap}
        .pblk-badge{background:var(--rose);color:#fff;font-size:10px;font-weight:800;padding:3px 10px;border-radius:999px;letter-spacing:.04em}
        .pblk-saved{font-family:'Noto Sans Telugu',sans-serif;font-size:12px;color:#6ee7b7;font-weight:600}
        .online-pill{background:rgba(245,158,11,.15);border:1px solid rgba(245,158,11,.3);border-radius:12px;padding:10px 14px;margin-top:12px}

        /* CTA */
        .ctar{display:flex;gap:10px;width:100%;max-width:440px;flex-wrap:wrap}
        .btn-o{flex:1;min-width:160px;background:linear-gradient(135deg,var(--am),#fbbf24);color:#0f172a;border:none;border-radius:14px;padding:15px 20px;font-family:'Noto Sans Telugu',sans-serif;font-size:.95rem;font-weight:800;cursor:pointer;transition:transform .2s,box-shadow .2s;box-shadow:0 8px 24px rgba(245,158,11,.35)}
        .btn-o:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(245,158,11,.45)}
        .btn-wa{flex:1;min-width:140px;background:#25d366;color:#fff;border:none;border-radius:14px;padding:15px 20px;font-family:'Noto Sans Telugu',sans-serif;font-size:.95rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;transition:transform .2s;text-decoration:none}
        .btn-wa:hover{transform:translateY(-2px)}
        .btn-call{color:#86efac;font-family:'Noto Sans Telugu',sans-serif;font-size:.8rem;font-weight:600;text-align:center;margin-top:8px;text-decoration:none;display:block}
        .trst{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;width:100%;max-width:440px}
        .trst-b{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);color:#a7f3d0;font-family:'Noto Sans Telugu',sans-serif;font-size:10px;font-weight:600;padding:5px 12px;border-radius:999px}

        /* Sections */
        .sec{padding:56px 16px}
        .sec-in{max-width:720px;margin:0 auto}
        .sec-badge{display:inline-flex;align-items:center;gap:6px;background:var(--em-l);color:var(--em-d);padding:4px 12px;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px}
        .sec-t{font-family:'Noto Serif Telugu',serif;font-size:clamp(1.6rem,4vw,2.2rem);color:var(--tx);line-height:1.2;margin-bottom:6px}
        .sec-s{font-family:'Noto Sans Telugu',sans-serif;font-size:.9rem;color:var(--tx2);line-height:1.7;margin-bottom:32px}

        /* Benefits */
        .bg-wh{background:#fff}
        .ben-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px}
        .ben-c{background:#fff;border:1.5px solid var(--sl-ll);border-radius:18px;padding:20px 16px;transition:border-color .2s,box-shadow .2s}
        .ben-c:hover{border-color:var(--em);box-shadow:0 4px 20px rgba(16,185,129,.1)}
        .ben-ic{width:44px;height:44px;background:var(--em-l);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin-bottom:12px}
        .ben-t{font-family:'Noto Sans Telugu',sans-serif;font-size:.88rem;font-weight:700;color:var(--tx);margin-bottom:5px}
        .ben-d{font-family:'Noto Sans Telugu',sans-serif;font-size:.78rem;color:var(--tx2);line-height:1.6}

        /* Steps dark */
        .bg-dk{background:linear-gradient(135deg,#0d2137,#0a3d2e)}
        .stp{display:flex;gap:16px;margin-bottom:20px;align-items:flex-start}
        .stp-n{width:48px;height:48px;border-radius:50%;background:var(--am);color:#0f172a;font-size:1rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .stp-t{font-family:'Noto Sans Telugu',sans-serif;font-size:.95rem;font-weight:700;color:#fff;margin-bottom:4px}
        .stp-d{font-family:'Noto Sans Telugu',sans-serif;font-size:.82rem;color:#86efac;line-height:1.7}

        /* BA Gallery */
        .bg-sl{background:var(--sl-l)}
        .bag-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px}
        .bag-c{background:#fff;border-radius:18px;overflow:hidden;border:1.5px solid var(--sl-ll)}
        .bag-img{width:100%;aspect-ratio:4/5;display:grid;grid-template-columns:1fr 1fr;border-bottom:1.5px solid var(--sl-ll)}
        .bag-lbl{padding:10px 14px;text-align:center}

        /* ── TESTIMONIALS – collage background ── */
        .test-wrap{
          position:relative;
          background-image:url('${PRODUCT.collageImage}');
          background-size:cover;
          background-position:center;
          background-attachment:fixed;
          padding:64px 16px;
        }
        .test-wrap::before{
          content:'';position:absolute;inset:0;
          background:linear-gradient(to bottom,rgba(13,33,55,.90) 0%,rgba(10,61,46,.85) 100%);
          pointer-events:none;
        }
        .test-in{position:relative;z-index:1;max-width:720px;margin:0 auto}
        .test-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
        .test-c{
          background:rgba(255,255,255,.94);
          border:1.5px solid rgba(255,255,255,.5);
          border-radius:20px;
          padding:20px 18px;
          display:flex;flex-direction:column;gap:12px;
          backdrop-filter:blur(8px);
        }
        .test-top{display:flex;align-items:flex-start;gap:12px}
        .tav-img{width:52px;height:52px;border-radius:50%;object-fit:cover;border:2.5px solid var(--em);display:block;flex-shrink:0}
        .tav-fb{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#0d2137,#0a3d2e);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1rem;font-weight:700;border:2.5px solid var(--em);flex-shrink:0}
        .tst-stars{color:var(--am);font-size:.85rem;letter-spacing:1px;margin-top:2px}
        .tst-name{font-weight:700;color:var(--tx);font-size:.92rem;line-height:1.2}
        .tst-area{font-size:.72rem;color:var(--tx2)}
        .tst-lbadge{margin-left:auto;padding:3px 9px;border-radius:999px;font-size:.65rem;font-weight:700;flex-shrink:0;align-self:flex-start}
        .tst-text{font-size:.83rem;color:var(--tx2);line-height:1.75;font-style:italic;flex:1}
        .tst-vrf{display:inline-flex;align-items:center;gap:4px;background:var(--em-l);color:var(--em-d);font-size:.65rem;font-weight:700;padding:3px 9px;border-radius:999px;align-self:flex-start}

        /* FAQ */
        .faq-c{background:#fff;border-radius:16px;overflow:hidden;margin-bottom:10px;border:1.5px solid var(--sl-ll)}
        .faq-q{width:100%;background:none;border:none;text-align:left;padding:16px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px;cursor:pointer}
        .faq-qt{font-family:'Noto Sans Telugu',sans-serif;font-size:.88rem;font-weight:700;color:var(--tx);line-height:1.5}
        .faq-ic{width:24px;height:24px;border-radius:50%;background:var(--em-l);color:var(--em-d);display:flex;align-items:center;justify-content:center;font-size:.9rem;font-weight:800;flex-shrink:0;transition:transform .3s}
        .faq-a{padding:0 18px 16px;border-top:1px solid var(--sl-ll)}
        .faq-ap{font-family:'Noto Sans Telugu',sans-serif;font-size:.82rem;color:var(--tx2);line-height:1.75;padding-top:12px}

        /* Order */
        .bg-ord{background:linear-gradient(135deg,#0d2137 0%,#0a3d2e 100%)}
        .ocard{background:#fff;border-radius:24px;padding:28px 22px;max-width:520px;margin:0 auto;width:100%}
        .flbl{display:block;font-family:'Noto Sans Telugu',sans-serif;font-size:.8rem;font-weight:700;color:var(--tx);margin-bottom:6px}
        .finp{width:100%;border:1.5px solid var(--sl-ll);border-radius:12px;padding:11px 14px;font-family:'Noto Sans Telugu',sans-serif;font-size:.88rem;color:var(--tx);outline:none;transition:border-color .2s;background:#fff}
        .finp:focus{border-color:var(--em);box-shadow:0 0 0 3px rgba(16,185,129,.12)}
        .finp.err{border-color:#ef4444}
        .ferr{font-family:'Noto Sans Telugu',sans-serif;font-size:.72rem;color:#ef4444;margin-top:4px}
        .frow{margin-bottom:14px}
        .pgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .pbtn{border:2px solid var(--sl-ll);border-radius:14px;padding:13px 10px;cursor:pointer;background:#fff;text-align:center;transition:all .2s}
        .pbtn.on{border-color:var(--em);background:var(--em-l)}
        .pbtn-t{font-family:'Noto Sans Telugu',sans-serif;font-size:.82rem;font-weight:700;color:var(--tx);display:block;margin-bottom:2px}
        .pbtn-d{font-family:'Noto Sans Telugu',sans-serif;font-size:.75rem;color:var(--em-d);font-weight:700;display:block;margin-bottom:2px}
        .pbtn-p{font-size:1.1rem;font-weight:800;color:var(--em-d)}
        .sbtn{width:100%;background:linear-gradient(135deg,var(--am),#fbbf24);color:#0f172a;border:none;border-radius:14px;padding:16px;font-family:'Noto Sans Telugu',sans-serif;font-size:1rem;font-weight:800;cursor:pointer;margin-top:16px;display:flex;align-items:center;justify-content:center;gap:8px;transition:transform .2s}
        .sbtn:hover{transform:translateY(-1px)}

        /* Sticky */
        .stky{position:fixed;bottom:0;left:0;right:0;z-index:100;background:linear-gradient(90deg,var(--g1),var(--g2));border-top:1px solid rgba(255,255,255,.1);padding:10px 14px;box-shadow:0 -8px 30px rgba(0,0,0,.25)}
        .stky-in{max-width:720px;margin:0 auto;display:flex;align-items:center;gap:12px}
        .stky-t{font-size:.8rem;color:#a7f3d0;font-weight:700;white-space:nowrap}
        .stky-s{flex:1}
        .stky-sb{height:5px;background:rgba(255,255,255,.15);border-radius:999px;overflow:hidden}
        .stky-sf{height:100%;background:linear-gradient(90deg,var(--am),#fbbf24);border-radius:999px;transition:width .5s}
        .stky-sl{font-family:'Noto Sans Telugu',sans-serif;font-size:.7rem;color:rgba(255,255,255,.5);margin-top:3px}
        .stky-btn{background:linear-gradient(135deg,var(--am),#fbbf24);color:#0f172a;border:none;border-radius:10px;padding:10px 16px;font-family:'Noto Sans Telugu',sans-serif;font-size:.82rem;font-weight:800;cursor:pointer;white-space:nowrap;flex-shrink:0}

        /* Footer */
        .ftr{background:var(--g1);padding:40px 16px;text-align:center}
        .ftr-brand{font-family:'Noto Serif Telugu',serif;font-size:1.8rem;color:#fff;margin-bottom:6px}
        .ftr-tag{font-family:'Noto Sans Telugu',sans-serif;font-size:.82rem;color:#86efac;margin-bottom:20px}
        .ftr-links{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin-bottom:16px}
        .ftr-link{color:#93c5fd;font-size:.82rem;text-decoration:none;font-weight:600;font-family:'Noto Sans Telugu',sans-serif}
        .ftr-disc{font-family:'Noto Sans Telugu',sans-serif;font-size:.72rem;color:rgba(255,255,255,.35);max-width:500px;margin:0 auto}

        /* Modal */
        .modal-ov{position:fixed;inset:0;z-index:200;background:rgba(13,33,55,.7);display:flex;align-items:center;justify-content:center;padding:12px;backdrop-filter:blur(6px)}
        .modal-bx{background:#fff;border-radius:24px;width:100%;max-width:480px;max-height:92vh;overflow-y:auto;padding:24px 20px;position:relative}
        .modal-cl{position:absolute;top:14px;right:14px;width:32px;height:32px;border-radius:50%;background:var(--sl-l);border:none;cursor:pointer;font-size:1rem;font-weight:700;color:var(--tx2)}
        .suc-box{text-align:center;padding:32px 16px}
        .suc-ic{width:60px;height:60px;background:var(--em-l);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:1.6rem}

        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp .6s ease both}
        .fu1{animation-delay:.1s}.fu2{animation-delay:.2s}.fu3{animation-delay:.3s}.fu4{animation-delay:.4s}

        @media(max-width:480px){
          .ctar{flex-direction:column}
          .hgrid{grid-template-columns:1fr}
          .ben-g{grid-template-columns:1fr 1fr}
          .test-g{grid-template-columns:1fr}
        }
      `}</style>

      {/* Ticker */}
      <div className="tkr">
        <div className="tkr-in tel" style={{ color: "#fff", fontSize: "12px", fontWeight: 600 }}>
          {[0, 1].map(k => (
            <div key={k} className="tkr-seg">
              {["🌿 వెయిట్ లాస్ జ్యూస్", "45 రోజుల రిజల్ట్", "ఉచిత డెలివరీ", "COD అందుబాటులో", `స్టాక్ పరిమితం – ${stock} మాత్రమే`].map((t, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
                  <span style={{ padding: "0 16px" }}>{t}</span>
                  <span className="tkr-dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div style={{ maxWidth: 680, width: "100%", paddingTop: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="h-badge fu">🌿 <span className="tel">100% హర్బల్ • FSSAI సర్టిఫైడ్</span></div>
          <h1 className="h-title tel-s fu fu1">{PRODUCT.name}</h1>
          <p className="h-tag fu fu2">{PRODUCT.tagline}</p>

          {/* Timer */}
          <div className="tmr fu fu2">
            <p className="tmr-lbl tel">⚠️ ప్రత్యేక ఆఫర్ ముగియడానికి ఇంకా:</p>
            <div className="tmr-dig">
              <div className="tmr-cell">
                <span className="tmr-num">{Math.floor(timer / 60).toString().padStart(2, "0")}</span>
                <span className="tmr-sub">నిమిషాలు</span>
              </div>
              <span className="tmr-colon">:</span>
              <div className="tmr-cell">
                <span className="tmr-num" style={{ color: "#fca5a5" }}>{(timer % 60).toString().padStart(2, "0")}</span>
                <span className="tmr-sub">సెకన్లు</span>
              </div>
            </div>
            <p className="tmr-urg">🔥 ఈరోజే ఆర్డర్ చేయండి — స్టాక్ పరిమితం!</p>
          </div>

          {/* Product + Before/After grid */}
          <div className="hgrid fu fu2">
           <div
  className="psh"
  style={{
    position: "relative",
    width: "100%",
    margin: "0 auto"
  }}
>
              <div className="ptk" style={{ transform: `translateX(-${imgIdx * 100}%)` }}>
             {PRODUCT.images.map((src, i) => (
  <div
    key={i}
    className="psl"
    style={{
      minWidth: "100%",
      width: "100%",
      height: "520px"
    }}
  >
    <img
      src={src}
      alt={`${PRODUCT.name} ${i + 1}`}
      className="pimg"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        display: "block"
      }}
      onError={e => {
        (e.target as HTMLImageElement).style.opacity = ".3";
      }}
    />
  </div>
))}
              </div>
              <div className="dots">
                {PRODUCT.images.map((_, i) => <span key={i} className={`dot${imgIdx === i ? " on" : ""}`} onClick={() => setImgIdx(i)} />)}
              </div>
            </div>
            <div className="bash">
              <div className="batk" style={{ transform: `translateX(-${baIdx * 100}%)` }}>
                {beforeAfterData.map((d, i) => (
                  <div key={i} className="basl">
                    <div className="bacd">
                      <p className="bah">{d.label}</p>
                      <div className="bar">
                        <div className="bap bef">
                          <span className="balbl bef">ముందు</span>
                          <span className="babig">{d.before}</span>
                          <span className="basml tel">{d.beforeSub}</span>
                        </div>
                        <div className="baarr">→</div>
                        <div className="bap aft">
                          <span className="balbl aft">తర్వాత</span>
                          <span className="babig">{d.after}</span>
                          <span className="basml tel">{d.afterSub}</span>
                        </div>
                      </div>
                      <p className="tel" style={{ fontSize: ".7rem", color: "#475569", textAlign: "center" }}>* ఫలితాలు వ్యక్తి వ్యక్తికి మారవచ్చు</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dots" style={{ marginTop: 10 }}>
                {beforeAfterData.map((_, i) => <span key={i} className={`dot${baIdx === i ? " on" : ""}`} onClick={() => setBaIdx(i)} />)}
              </div>
            </div>
          </div>

          {/* Price — no online price shown, only % discount */}
          <div className="pblk fu fu3">
            <p className="pblk-mrp">₹{PRODUCT.mrp.toLocaleString("en-IN")} MRP</p>
            <p className="pblk-main">₹{PRODUCT.price.toLocaleString("en-IN")}</p>
            <div className="pblk-save-row">
              <span className="pblk-badge">{discPct}% OFF</span>
              <span className="pblk-saved tel">₹{savings.toLocaleString("en-IN")} ఆదా!</span>
            </div>
            <div className="online-pill">
              <p className="tel" style={{ color: "#fcd34d", fontSize: "12px", fontWeight: 700 }}>
                💳 ఆన్‌లైన్ పేమెంట్ చేస్తే అదనంగా {PRODUCT.onlineDiscount}% తగ్గింపు పొందండి!
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="ctar fu fu4">
            <button className="btn-o tel" onClick={() => setShowModal(true)}>🛒 ఇప్పుడే ఆర్డర్ చేయండి</button>
            <a href={`https://wa.me/${PRODUCT.whatsapp}?text=${encodeURIComponent(`${PRODUCT.name} గురించి సమాచారం కావాలి`)}`} target="_blank" rel="noopener noreferrer" className="btn-wa tel">
              {waIcon} WhatsApp
            </a>
          </div>
          <a href={`tel:${PRODUCT.phone}`} className="btn-call fu fu4">📞 కాల్ చేయండి: +91 {PRODUCT.phone}</a>
          <div className="trst fu fu4" style={{ marginTop: 16 }}>
            {["100% హర్బల్", "ఉచిత డెలివరీ", "COD అందుబాటు", "నిరాపద ఫార్ములా"].map(b => <span key={b} className="trst-b">{b}</span>)}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="sec bg-wh">
        <div className="sec-in">
          <span className="sec-badge">ప్రయోజనాలు</span>
          <h2 className="sec-t tel-s">ఎందుకు {PRODUCT.name}?</h2>
          <p className="sec-s tel">సహజ మూలికలతో రూపొందించిన ఈ జ్యూస్ మీ రోజువారీ వెల్నెస్ రొటీన్‌కి మద్దతు అందిస్తుంది</p>
          <div className="ben-g">
            {benefits.map((b, i) => (
              <div key={i} className="ben-c">
                <div className="ben-ic">{b.icon}</div>
                <p className="ben-t tel">{b.title}</p>
                <p className="ben-d tel">{b.desc}</p>
              </div>
            ))}
          </div>
          <p className="tel" style={{ fontSize: ".72rem", color: "#94a3b8", marginTop: 20, textAlign: "center" }}>
            * ఈ ఉత్పత్తి రోజువారీ వెల్నెస్ రొటీన్‌కు సహాయకం. వ్యాధి నివారణ కాదు.
          </p>
        </div>
      </section>

      {/* ── HOW TO USE ── */}
      <section className="sec bg-dk">
        <div className="sec-in">
          <span className="sec-badge" style={{ background: "rgba(16,185,129,.2)", color: "#6ee7b7" }}>వాడే విధానం</span>
          <h2 className="sec-t tel-s" style={{ color: "#fff" }}>ఎలా వాడాలి?</h2>
          <p className="sec-s tel" style={{ color: "#86efac" }}>సరైన విధానంలో వాడితే మంచి ఫలితాలు</p>
          {steps.map((s, i) => (
            <div key={i} className="stp">
              <div className="stp-n">{s.n}</div>
              <div><p className="stp-t">{s.title}</p><p className="stp-d">{s.desc}</p></div>
            </div>
          ))}
          <div style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 14, padding: "14px 18px", marginTop: 8 }}>
            <p className="tel" style={{ color: "#fcd34d", fontSize: ".8rem", fontWeight: 600 }}>⚠️ గమనిక: ఉత్పత్తి లేబుల్‌పై ఉన్న సూచనలను అనుసరించండి. ఆరోగ్య సమస్య ఉంటే వైద్యుని సంప్రదించండి.</p>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER GALLERY ── */}
    <section className="sec bg-sl" id="before-after">
  <div className="sec-in">
    <span className="sec-badge">ట్రాన్స్‌ఫర్మేషన్</span>
    <h2 className="sec-t tel-s">బిఫోర్ / ఆఫ్టర్ రిజల్ట్స్</h2>
    <p className="sec-s tel">నిరంతరంగా వాడిన కస్టమర్ల అనుభవాలు. ఫలితాలు వ్యక్తి వ్యక్తికి మారవచ్చు.</p>
    
    <div className="bag-g" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
      {beforeAfterData.map((d, i) => (
        <div key={i} className="bag-c" style={{ overflow: 'hidden', borderRadius: '16px', background: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
          
          {/* --- TWO IMAGES SIDE BY SIDE --- */}
          <div className="bag-img-pair" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: '#f1f5f9' }}>
            <div style={{ position: 'relative', aspectRatio: '4/5' }}>
              <img src={d.beforeImg} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>BEFORE</span>
            </div>
            <div style={{ position: 'relative', aspectRatio: '4/5' }}>
              <img src={d.afterImg} alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(5, 150, 105, 0.8)', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>AFTER</span>
            </div>
          </div>

          {/* --- DATA OVERLAY / FOOTER --- */}
          <div className="bag-info" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'center' }}>
              <div style={{ background: '#fff1f2', padding: '10px 5px', borderRadius: '12px' }}>
                <span className="tel" style={{ fontSize: 9, fontWeight: 800, color: "#e11d48", display: 'block', textTransform: 'uppercase' }}>ముందు</span>
                <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a" }}>{d.before}</span>
                <span className="tel" style={{ fontSize: ".7rem", color: "#64748b", display: 'block', fontWeight: 600 }}>{d.beforeSub}</span>
              </div>
              <div style={{ background: '#ecfdf5', padding: '10px 5px', borderRadius: '12px' }}>
                <span className="tel" style={{ fontSize: 9, fontWeight: 800, color: "#059669", display: 'block', textTransform: 'uppercase' }}>తర్వాత</span>
                <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a" }}>{d.after}</span>
                <span className="tel" style={{ fontSize: ".7rem", color: "#64748b", display: 'block', fontWeight: 600 }}>{d.afterSub}</span>
              </div>
            </div>
            
            <div className="bag-lbl" style={{ textAlign: 'center', borderTop: '1px solid #f8fafc', paddingTop: '8px' }}>
              <p className="tel" style={{ fontSize: ".85rem", color: "#334155", fontWeight: 700 }}>{d.label}</p>
            </div>
          </div>

        </div>
      ))}
    </div>

    <p className="tel" style={{ textAlign: "center", fontSize: ".72rem", color: "#94a3b8", marginTop: 20 }}>
      * ఫలితాలు వ్యక్తి వ్యక్తికి మారవచ్చు. ఈ ఉత్పత్తి వ్యాధిని నివారించడానికి ఉద్దేశించబడలేదు.
    </p>
  </div>
</section>

      {/* ── TESTIMONIALS with collage background ── */}
      <section>
        <div className="test-wrap">
          <div className="test-in">
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16,185,129,.25)", border: "1px solid rgba(16,185,129,.35)", color: "#6ee7b7", padding: "4px 14px", borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 10 }}>
                కస్టమర్ స్పందనలు
              </span>
              <h2 className="tel-s" style={{ color: "#fff", fontSize: "clamp(1.6rem,4vw,2.2rem)", lineHeight: 1.2, marginBottom: 8 }}>వారు చెప్పింది వినండి</h2>
              <p className="tel" style={{ color: "#a7f3d0", fontSize: ".9rem", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
                {PRODUCT.resultDays} రొటీన్ తర్వాత ఫలితాలు గమనించిన వినియోగదారుల నిజమైన అనుభవాలు
              </p>
            </div>
            <div className="test-g">
              {testimonials.map((t, i) => {
                const lm = langMeta[t.lang] || langMeta["తెలుగు"];
                return (
                  <div key={i} className="test-c">
                    <div className="test-top">
                      <div style={{ flexShrink: 0 }}>
                  
                        <div className="tav-fb" style={{ display: "none" }}>{t.name[0]}</div>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p className={`tst-name ${lm.fontCls}`}>{t.name}</p>
                        <p className={`tst-area ${lm.fontCls}`}>{t.area}</p>
                        <p className="tst-stars">{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</p>
                      </div>
                      <span className="tst-lbadge" style={{ background: lm.bg, color: lm.text }}>{t.lang}</span>
                    </div>
                    <p className={`tst-text ${lm.fontCls}`}>"{t.text}"</p>
                    <span className="tst-vrf">✓ Verified Buyer</span>
                  </div>
                );
              })}
            </div>
            <p className="tel" style={{ textAlign: "center", fontSize: ".72rem", color: "rgba(255,255,255,.3)", marginTop: 24 }}>
              * ఫలితాలు వ్యక్తి వ్యక్తికి మారవచ్చు. వ్యక్తిగత అనుభవాలు భిన్నంగా ఉండవచ్చు.
            </p>
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA ── */}
      <section style={{ background: "linear-gradient(135deg,#0d2137,#0a3d2e)", padding: "40px 16px", textAlign: "center" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <p className="tel" style={{ color: "#fca5a5", fontSize: "11px", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 }}>⚡ పరిమిత ఆఫర్</p>
          <h3 className="tel-s" style={{ color: "#fff", fontSize: "1.6rem", marginBottom: 8 }}>ఇప్పుడే ఆర్డర్ చేయండి</h3>
          <p style={{ color: "#fff", fontSize: "2.2rem", fontWeight: 800, marginBottom: 4 }}>₹{PRODUCT.price.toLocaleString("en-IN")}</p>
          <p className="tel" style={{ color: "#86efac", fontSize: ".82rem", marginBottom: 20 }}>💳 ఆన్‌లైన్ పేమెంట్ చేస్తే {PRODUCT.onlineDiscount}% అదనపు తగ్గింపు!</p>
          <button className="btn-o tel" style={{ width: "100%" }} onClick={() => setShowModal(true)}>🛒 ఆర్డర్ ఫారమ్ తెరవండి</button>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sec bg-sl">
        <div className="sec-in">
          <span className="sec-badge">తరచుగా అడిగే ప్రశ్నలు</span>
          <h2 className="sec-t tel-s">మీ సందేహాలు</h2>
          <p className="sec-s tel">సాధారణ ప్రశ్నలకు సమాధానాలు</p>
          {faqs.map((f, i) => (
            <div key={i} className="faq-c">
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="faq-qt tel">{f.q}</span>
                <span className="faq-ic" style={{ transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {openFaq === i && (
                <div className="faq-a"><p className="faq-ap tel">{f.a}</p></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── ORDER FORM ── */}
      <section className="sec bg-ord" id="order-form">
        <div className="sec-in" style={{ textAlign: "center" }}>
          <span className="sec-badge" style={{ background: "rgba(16,185,129,.2)", color: "#6ee7b7", marginBottom: 16 }}>ఆర్డర్ చేయండి</span>
          <h2 className="sec-t tel-s" style={{ color: "#fff", marginBottom: 6 }}>మీ ఆర్డర్ ఇవ్వండి</h2>
          <p className="sec-s tel" style={{ color: "#86efac", marginBottom: 28 }}>వివరాలు నమోదు చేయండి — WhatsApp ద్వారా కన్ఫర్మ్ అవుతుంది</p>
          <div className="ocard">
            {submitted ? (
              <div className="suc-box">
                <div className="suc-ic">✓</div>
                <h3 className="tel-s" style={{ fontSize: "1.4rem", marginBottom: 8 }}>ధన్యవాదాలు!</h3>
                <p className="tel" style={{ color: "#475569", fontSize: ".88rem", lineHeight: 1.7 }}>మీ ఆర్డర్ WhatsApp కు పంపబడింది. మేము త్వరలో కన్ఫర్మ్ చేస్తాము.</p>
              </div>
            ) : (
              <>
                {[["name","పూర్తి పేరు *","text","మీ పేరు"],["mobile","మొబైల్ నంబర్ *","tel","10 అంకెల నంబర్"]].map(([f,l,t,p]) => (
                  <div key={f} className="frow">
                    <label className="flbl tel">{l}</label>
                    <input type={t} className={`finp${errors[f]?" err":""}`} value={(form as Record<string,string>)[f]} maxLength={f==="mobile"?10:undefined} onChange={e=>{inp(f,f==="mobile"?e.target.value.replace(/\D/g,""):e.target.value);clrErr(f);}} placeholder={p} />
                    {errors[f]&&<p className="ferr">{errors[f]}</p>}
                  </div>
                ))}
                <div className="frow">
                  <label className="flbl tel">పూర్తి చిరునామా *</label>
                  <textarea className={`finp${errors.address?" err":""}`} rows={3} value={form.address} onChange={e=>{inp("address",e.target.value);clrErr("address");}} placeholder="ఇంటి నంబర్, వీధి, నగరం" style={{resize:"none"}} />
                  {errors.address&&<p className="ferr">{errors.address}</p>}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                  <div>
                    <label className="flbl tel">రాష్ట్రం *</label>
                    <input className={`finp${errors.state?" err":""}`} value={form.state} onChange={e=>{inp("state",e.target.value);clrErr("state");}} placeholder="రాష్ట్రం" />
                    {errors.state&&<p className="ferr">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="flbl tel">పిన్‌కోడ్ *</label>
                    <input className={`finp${errors.pin?" err":""}`} value={form.pin} maxLength={6} onChange={e=>{inp("pin",e.target.value.replace(/\D/g,""));clrErr("pin");}} placeholder="6 అంకెలు" />
                    {errors.pin&&<p className="ferr">{errors.pin}</p>}
                  </div>
                </div>
                <div className="frow">
                  <label className="flbl tel">పరిమాణం</label>
                  <select className="finp" value={form.qty} onChange={e=>inp("qty",e.target.value)}>
                    {[1,2,3].map(n=><option key={n} value={n}>{n} బాటిల్{n>1?"లు":""}</option>)}
                  </select>
                </div>
                <div className="frow">
                  <label className="flbl tel">చెల్లింపు విధానం *</label>
                  <div className="pgrid">
                    <button className={`pbtn${form.payment==="cod"?" on":""}`} onClick={()=>inp("payment","cod")}>
                      <span className="pbtn-t tel">క్యాష్ ఆన్ డెలివరీ</span>
                      <span className="pbtn-p">₹{PRODUCT.price.toLocaleString("en-IN")}</span>
                    </button>
                    <button className={`pbtn${form.payment==="online"?" on":""}`} onClick={()=>inp("payment","online")}>
                      <span className="pbtn-t tel">ఆన్‌లైన్ పేమెంట్</span>
                      <span className="pbtn-d">{PRODUCT.onlineDiscount}% అదనపు తగ్గింపు</span>
                      <span className="pbtn-p">₹{ONLINE_PRICE.toLocaleString("en-IN")}</span>
                    </button>
                  </div>
                </div>
                <div className="frow">
                  <label className="flbl tel">అదనపు గమనికలు</label>
                  <textarea className="finp" rows={2} value={form.notes} onChange={e=>inp("notes",e.target.value)} placeholder="ఏదైనా ప్రత్యేక సూచన..." style={{resize:"none"}} />
                </div>
                <div style={{background:"#f0fdf4",border:"1.5px solid #a7f3d0",borderRadius:12,padding:"12px 16px",textAlign:"center",marginBottom:4}}>
                  <p className="tel" style={{color:"#065f46",fontSize:".78rem",fontWeight:600,marginBottom:4}}>మీ మొత్తం</p>
                  <p style={{fontSize:"1.8rem",fontWeight:800,color:"#0f172a"}}>₹{(form.payment==="online"?ONLINE_PRICE:PRODUCT.price).toLocaleString("en-IN")}</p>
                  {form.payment==="online"&&<p className="tel" style={{color:"#059669",fontSize:".75rem",fontWeight:600,marginTop:2}}>🎉 {PRODUCT.onlineDiscount}% ఆన్‌లైన్ తగ్గింపు వర్తించింది!</p>}
                </div>
                <button className="sbtn tel" onClick={handleSubmit}>{waIcon} WhatsApp లో ఆర్డర్ చేయండి</button>
                <p className="tel" style={{textAlign:"center",fontSize:".72rem",color:"#94a3b8",marginTop:10}}>మీ వివరాలు ఆర్డర్ కన్ఫర్మేషన్ కోసం మాత్రమే ఉపయోగించబడతాయి</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ftr">
        <p className="ftr-brand tel-s">Manvitha Wellness</p>
        <p className="ftr-tag tel">సహజ హర్బల్ వెల్నెస్ ఉత్పత్తులు</p>
        <div className="ftr-links">
          <a href={`tel:${PRODUCT.phone}`} className="ftr-link">📞 {PRODUCT.phone}</a>
          <a href={`mailto:${PRODUCT.email}`} className="ftr-link">✉ {PRODUCT.email}</a>
          <a href={`https://wa.me/${PRODUCT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="ftr-link">💬 WhatsApp</a>
        </div>
        <p className="ftr-disc tel">* ఫలితాలు వ్యక్తి వ్యక్తికి మారవచ్చు. ఈ ఉత్పత్తి ఏ వ్యాధిని నివారించడానికి లేదా చికిత్స చేయడానికి ఉద్దేశించబడలేదు. రోజువారీ వెల్నెస్ రొటీన్‌కు సహాయకం మాత్రమే.</p>
        <p style={{color:"rgba(255,255,255,.2)",fontSize:".7rem",marginTop:12}}>© 2024 Manviyha Wellness. అన్ని హక్కులు మా వద్ద ఉన్నాయి.</p>
      </footer>

      {/* Sticky bar */}
      <div className="stky">
        <div className="stky-in">
          <div className="stky-t">⏱ {fmt(timer)}</div>
          <div className="stky-s">
            <div className="stky-sb"><div className="stky-sf" style={{width:`${stockPct}%`}} /></div>
            <p className="stky-sl tel">{stock} స్టాక్ మాత్రమే మిగిలాయి</p>
          </div>
          <button className="stky-btn tel" onClick={()=>setShowModal(true)}>ఆర్డర్ చేయండి</button>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a href={`https://wa.me/${PRODUCT.whatsapp}?text=${encodeURIComponent(`${PRODUCT.name} గురించి సమాచారం కావాలి`)}`} target="_blank" rel="noopener noreferrer"
        style={{position:"fixed",bottom:76,right:16,zIndex:90,width:52,height:52,background:"#25d366",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(37,211,102,.4)",transition:"transform .2s"}}
        onMouseOver={e=>(e.currentTarget.style.transform="scale(1.1)")} onMouseOut={e=>(e.currentTarget.style.transform="scale(1)")}>
        <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.849L.057 23.9l6.274-1.643A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.015-1.376l-.36-.213-3.728.977.996-3.635-.234-.374A9.818 9.818 0 1112 21.818z"/></svg>
      </a>

      {/* Quick Order Modal */}
      {showModal && (
        <div className="modal-ov" onClick={e=>{if(e.target===e.currentTarget)setShowModal(false)}}>
          <div className="modal-bx">
            <button className="modal-cl" onClick={()=>setShowModal(false)}>×</button>
            <div style={{textAlign:"center",marginBottom:20}}>
              <p className="tel-s" style={{fontSize:"1.5rem",fontWeight:700,color:"#0f172a"}}>త్వరిత ఆర్డర్</p>
              <p className="tel" style={{fontSize:".8rem",color:"#64748b",marginTop:4}}>వివరాలు నమోదు చేయండి — WhatsApp కు పంపుతాం</p>
            </div>
            {submitted ? (
              <div className="suc-box">
                <div className="suc-ic">✓</div>
                <h3 className="tel-s" style={{fontSize:"1.4rem",marginBottom:8}}>ధన్యవాదాలు!</h3>
                <p className="tel" style={{color:"#475569",fontSize:".88rem",lineHeight:1.7}}>WhatsApp కు ఆర్డర్ పంపబడింది. మేము త్వరలో సంప్రదిస్తాము.</p>
                <button className="tel" onClick={()=>{setShowModal(false);setSubmitted(false);}} style={{marginTop:16,background:"#ecfdf5",border:"1.5px solid #a7f3d0",borderRadius:10,padding:"10px 20px",cursor:"pointer",color:"#065f46",fontWeight:700}}>మూసివేయి</button>
              </div>
            ) : (
              <>
                {[["name","పూర్తి పేరు *","text","మీ పేరు"],["mobile","మొబైల్ *","tel","10 అంకెల నంబర్"],["address","చిరునామా *","text","ఇంటి నంబర్, వీధి, నగరం"]].map(([f,l,t,p])=>(
                  <div key={f} className="frow">
                    <label className="flbl tel">{l}</label>
                    <input type={t} className={`finp${errors[f]?" err":""}`} value={(form as Record<string,string>)[f]} maxLength={f==="mobile"?10:undefined} onChange={e=>{inp(f,f==="mobile"?e.target.value.replace(/\D/g,""):e.target.value);clrErr(f);}} placeholder={p} />
                    {errors[f]&&<p className="ferr">{errors[f]}</p>}
                  </div>
                ))}
                <div className="pgrid" style={{marginBottom:14}}>
                  <button className={`pbtn${form.payment==="cod"?" on":""}`} onClick={()=>inp("payment","cod")}>
                    <span className="pbtn-t tel">COD</span>
                    <span className="pbtn-p">₹{PRODUCT.price.toLocaleString("en-IN")}</span>
                  </button>
                  <button className={`pbtn${form.payment==="online"?" on":""}`} onClick={()=>inp("payment","online")}>
                    <span className="pbtn-t tel">ఆన్‌లైన్</span>
                    <span className="pbtn-d">{PRODUCT.onlineDiscount}% తగ్గింపు</span>
                    <span className="pbtn-p">₹{ONLINE_PRICE.toLocaleString("en-IN")}</span>
                  </button>
                </div>
                <button className="sbtn tel" onClick={handleSubmit}>{waIcon} WhatsApp లో ఆర్డర్ చేయండి</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}