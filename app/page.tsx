"use client";
import { useState, useEffect, useRef } from "react";

const MRP_PRICE = 3499;
const OFFER_PRICE = 2699;
const ONLINE_DISCOUNT_PERCENT = 10;
const ONLINE_PRICE = Math.round(OFFER_PRICE * (1 - ONLINE_DISCOUNT_PERCENT / 100));
const CALL_NUMBER = "8500097376";
const WHATSAPP_NUMBER = "918500097376";
const EMAIL = "infomanviyha15@gmail.com";
const INITIAL_STOCK = 23;
const TIMER_SECONDS = 15 * 60;
const PRODUCT_NAME = "Digestive Juice";
const PRODUCT_IMAGES = [
  "/digestion%20juice%20(1).png",
  "/digestion%20juice%20(2).png",
  "/digestion%20juice%20(3).png",
];

export default function ManvithaWellnessPage() {
  const [form, setForm] = useState({ name: "", mobile: "", address: "", payment: "cod", notes: "" });
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [stock, setStock] = useState(INITIAL_STOCK);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) return TIMER_SECONDS;
        const n = prev - 1;
        if ((TIMER_SECONDS - n) % 90 === 0) setStock(s => Math.max(3, s - 1));
        return n;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setActiveImg(p => (p + 1) % PRODUCT_IMAGES.length), 3800);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (showForm) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [showForm]);

  useEffect(() => {
    const els = document.querySelectorAll(".scroll-reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).style.opacity = "1"; (e.target as HTMLElement).style.transform = "translateY(0)"; obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  const finalPrice = form.payment === "online" ? ONLINE_PRICE : OFFER_PRICE;
  const stockPct = Math.max(8, (stock / INITIAL_STOCK) * 100);
  const stockColor = stock <= 8 ? "#f87171" : stock <= 14 ? "#fb923c" : "#4ade80";

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "పేరు నమోదు చేయండి";
    if (!/^\d{10}$/.test(form.mobile)) e.mobile = "సరైన 10 అంకెల మొబైల్ నంబర్";
    if (!form.address.trim()) e.address = "చిరునామా నమోదు చేయండి";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const pi = form.payment === "online" ? `ఆన్‌లైన్ పేమెంట్ (₹${ONLINE_PRICE})` : `Cash on Delivery (₹${OFFER_PRICE})`;
    const msg = `🌿 *${PRODUCT_NAME} Order — Manvitha Wellness*\n\n👤 పేరు: ${form.name}\n📱 మొబైల్: ${form.mobile}\n🏠 చిరునామా: ${form.address}\n💳 చెల్లింపు: ${pi}${form.notes ? `\n📝 గమనికలు: ${form.notes}` : ""}\n\n✅ దయచేసి నా ఆర్డర్ కన్‌ఫర్మ్ చేయండి.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const faqs = [
    { q: "ఈ ఉత్పత్తి సురక్షితమేనా?", a: "అవును, ఇది పూర్తిగా సహజ హర్బల్ పదార్థాలతో తయారు చేయబడింది మరియు వైద్యపరంగా పరీక్షించబడింది. దీనిలో ఏ రసాయన పదార్థాలూ లేవు." },
    { q: "ఎంత కాలంలో ఫలితాలు కనిపిస్తాయి?", a: "చాలా మంది వినియోగదారులు 7-14 రోజులలో మెరుగుదల గమనించారు. క్రమం తప్పకుండా వాడితే 30 రోజులలో పూర్తి ఫలితాలు కనిపిస్తాయి." },
    { q: "రోజుకు ఎంత మోతాదు తీసుకోవాలి?", a: "ఆహారం తినే కనీసం 30 నిమిషాల ముందు, ఖాళీ కడుపుతో 150ml నీళ్లలో కలిపి తీసుకోవాలి. మొదటి 3 రోజులు 5ml రోజుకు 2 సార్లు, తరువాతి 3 రోజులు 10ml రోజుకు 2 సార్లు, 7వ రోజు నుండి 15-30ml రోజుకు 2 సార్లు వాడాలి." },
    { q: "డెలివరీ ఎంత కాలం పడుతుంది?", a: "ఆర్డర్ చేసిన 3-5 పని దినాలలో మీ చిరునామాకు డెలివరీ జరుగుతుంది. హైదరాబాద్ మరియు పక్క నగరాలకు 2-3 రోజులలో అందుతుంది." },
    { q: "రిటర్న్ పాలసీ ఉందా?", a: "అవును, ఉత్పత్తి సంతృప్తి కలిగించకపోతే 7 రోజులలో మాకు తెలియజేయండి. మేము పూర్తి మొత్తం రీఫండ్ చేస్తాము." },
    { q: "ఆన్‌లైన్ పేమెంట్ ఎలా చేయాలి?", a: `UPI, PhonePe, Google Pay ద్వారా పేమెంట్ చేయవచ్చు. ఆన్‌లైన్ పేమెంట్ చేస్తే అదనంగా ${ONLINE_DISCOUNT_PERCENT}% డిస్కౌంట్ వర్తిస్తుంది.` },
  ];

  const testimonials = [
    { name: "రవి కుమార్ రెడ్డి", area: "హైదరాబాద్, తెలంగాణ", lang: "తెలుగు", rating: 5, text: "చాలా కాలంగా గ్యాస్ మరియు అసిడిటీ సమస్యతో బాధపడుతున్నాను.  Digestive Juice వాడిన 10 రోజులకే నిజమైన తేడా అనిపించింది. ఇప్పుడు భోజనం తర్వాత ఎలాంటి అసౌకర్యం లేదు. ఈ ఉత్పత్తి నిజంగా అద్భుతంగా పనిచేసింది!" },
    { name: "సుజాత వెంకటేశ్వర్లు", area: "విజయవాడ, ఆంధ్రప్రదేశ్", lang: "తెలుగు", rating: 5, text: "నాకు చాలా సంవత్సరాలుగా కడుపు ఉబ్బరం సమస్య ఉంది. ఈ జ్యూస్ రోజూ ఉదయం తాగడం మొదలుపెట్టాను. రెండు వారాలలో పొట్ట తేలికగా అనిపించడం మొదలైంది. ఇది పూర్తిగా నేచురల్ అని నాకు నమ్మకంగా ఉంది. తప్పకుండా ట్రై చేయండి!" },
    { name: "నాగేశ్వర రావు", area: "గుంటూరు, ఆంధ్రప్రదేశ్", lang: "తెలుగు", rating: 5, text: "మా ఇంట్లో అందరూ ఇప్పుడు ఈ ప్రొడక్ట్ వాడుతున్నారు. మా అమ్మకి చాలా కాలంగా అజీర్ణం సమస్య ఉంది, ఒక్క నెలలోనే చాలా మెరుగుపడింది. Customer service కూడా చాలా బాగుంది." },
    { name: "లక్ష్మీ ప్రసాద్", area: "విశాఖపట్నం, ఆంధ్రప్రదేశ్", lang: "తెలుగు", rating: 5, text: "Digestive Juice వాడడం మొదలుపెట్టిన తర్వాత నా జీవితం మారిపోయింది. ఏ side effects లేవు, పూర్తిగా natural feel. Packaging చాలా neat గా వచ్చింది.  ధన్యవాదాలు!" },
    { name: "Rajesh Sharma", area: "Mumbai, Maharashtra", lang: "हिंदी", rating: 5, text: "मैं कई सालों से गैस और एसिडिटी की समस्या से परेशान था।  Digestive Juice के बारे में एक दोस्त से सुना। सिर्फ 2 हफ्तों में जबरदस्त फर्क नजर आया। 100% natural product है, बिल्कुल safe है। सभी को recommend करता हूं!" },
    { name: "Ravi Shankar Rao", area: "Bengaluru, Karnataka", lang: "English", rating: 5, text: "After just 10 days of regular use each morning on empty stomach with warm water, the burning sensation reduced drastically. Genuinely natural product with zero side effects. Fast delivery and a very responsive team. Highly recommended for anyone with digestive issues!" },
    { name: "ಮಹೇಶ್ ಗೌಡ", area: "Mysuru, Karnataka", lang: "ಕನ್ನಡ", rating: 5, text: "ನಾನು ಅನೇಕ ವರ್ಷಗಳಿಂದ ಅಸಿಡಿಟಿ ಮತ್ತು ಅಜೀರ್ಣ ಸಮಸ್ಯೆಯಿಂದ ಬಳಲುತ್ತಿದ್ದೆ. Digestive Juice ಕೇವಲ 15 ದಿನಗಳಲ್ಲಿ ಗ್ಯಾಸ್ ಸಮಸ್ಯೆ ಗಣನೀಯವಾಗಿ ಕಡಿಮೆಮಾಡಿತು. ತುಂಬಾ ಉಪಕಾರವಾಯಿತು!" },
    { name: "Meenakshi Sundaram", area: "Chennai, Tamil Nadu", lang: "தமிழ்", rating: 5, text: "நான் பல வருடங்களாக வாயு மற்றும் அஜீரணக் கோளாறுகளால் அவதிப்பட்டு வந்தேன். 2 வாரங்களில் நல்ல மாற்றம் தெரிந்தது. என் குடும்பத்தினர் அனைவருக்கும் பரிந்துரைத்துள்ளேன்!" },
  ];

  const WA_SVG = <svg viewBox="0 0 24 24" style={{width:"20px",height:"20px",fill:"white",flexShrink:0}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;

  return (
    <div style={{minHeight:"100vh",background:"#0a0f0d",color:"#e8f5e0",fontFamily:"'Cormorant Garamond', Georgia, serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Baloo+Tamma+2:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'DM Sans',sans-serif;background:#0a0f0d;overflow-x:hidden;}
        .telugu{font-family:'Baloo Tamma 2',sans-serif;}
        .serif{font-family:'Cormorant Garamond',Georgia,serif;}
        .sans{font-family:'DM Sans',sans-serif;}

        /* ---- KEYFRAMES ---- */
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes goldPulse{0%,100%{box-shadow:0 0 0 0 rgba(212,175,55,0.35)}60%{box-shadow:0 0 0 16px rgba(212,175,55,0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.45}}
        @keyframes shimmerGold{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes rotateSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes stockSlide{from{width:100%}to{width:var(--stock-w)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
        @keyframes gradMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes leafFloat{0%,100%{transform:rotate(-8deg) translateY(0)}50%{transform:rotate(8deg) translateY(-18px)}}

        /* ---- UTILITIES ---- */
        .float{animation:float 5s ease-in-out infinite;}
        .gold-pulse{animation:goldPulse 2.2s infinite;}
        .blink{animation:blink 1.6s ease-in-out infinite;}
        .spin-slow{animation:rotateSlow 18s linear infinite;}
        .leaf-float{animation:leafFloat 6s ease-in-out infinite;}

        .gold-shimmer-text{
          background:linear-gradient(90deg,#a87c3a,#f0c862,#d4af37,#f0c862,#a87c3a);
          background-size:300% auto;
          animation:shimmerGold 4s linear infinite;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
        }

        .gold-btn{
          background:linear-gradient(135deg,#a87c3a 0%,#d4af37 40%,#f0c862 60%,#d4af37 100%);
          background-size:200% auto;
          animation:shimmerGold 3s linear infinite;
          color:#0a0f0d;
          font-weight:700;
          border:none;
          cursor:pointer;
          transition:transform .25s,box-shadow .25s;
          box-shadow:0 6px 28px rgba(212,175,55,0.45);
          letter-spacing:.03em;
        }
        .gold-btn:hover{transform:translateY(-3px) scale(1.025);box-shadow:0 12px 36px rgba(212,175,55,0.6);}
        .gold-btn:active{transform:scale(0.97);}

        .wa-btn{
          background:linear-gradient(135deg,#25D366,#128C7E);
          box-shadow:0 6px 24px rgba(37,211,102,0.35);
          transition:transform .25s,box-shadow .25s;
        }
        .wa-btn:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 10px 30px rgba(37,211,102,0.5);}

        .glass{
          background:rgba(255,255,255,0.04);
          backdrop-filter:blur(18px);
          border:1px solid rgba(212,175,55,0.12);
        }
        .glass-light{
          background:rgba(255,255,255,0.06);
          backdrop-filter:blur(20px);
          border:1px solid rgba(212,175,55,0.18);
        }

        .premium-card{
          background:linear-gradient(145deg,rgba(20,35,25,0.9),rgba(10,20,14,0.95));
          border:1px solid rgba(212,175,55,0.15);
          box-shadow:0 8px 40px rgba(0,0,0,0.5),inset 0 1px 0 rgba(212,175,55,0.1);
          transition:transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s;
        }
        .premium-card:hover{transform:translateY(-5px);box-shadow:0 18px 50px rgba(0,0,0,0.55),0 0 0 1px rgba(212,175,55,0.25),inset 0 1px 0 rgba(212,175,55,0.12);}

        .divider-gold{
          height:1px;
          background:linear-gradient(90deg,transparent,rgba(212,175,55,0.5),transparent);
        }

        .scroll-reveal{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease;}

        /* ---- TICKER ---- */
        .ticker-wrap{overflow:hidden;white-space:nowrap;}
        .ticker-track{display:inline-flex;animation:ticker 36s linear infinite;}
        .ticker-item{display:inline-flex;align-items:center;padding:0 24px;}

        /* ---- CAROUSEL ---- */
        .carousel-window{overflow:hidden;border-radius:24px;}
        .carousel-track{display:flex;transition:transform .85s cubic-bezier(.77,0,.18,1);}
        .carousel-slide{min-width:100%;display:flex;align-items:center;justify-content:center;}

        /* ---- MODAL ---- */
        .modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.82);z-index:1000;display:flex;align-items:center;justify-content:center;padding:14px;backdrop-filter:blur(10px);animation:fadeIn .3s ease;}
        .modal-box{background:linear-gradient(160deg,#0d1a12,#111e15);border:1px solid rgba(212,175,55,0.2);border-radius:28px;width:100%;max-width:500px;max-height:92vh;overflow-y:auto;padding:28px 24px;position:relative;animation:scaleIn .3s ease;box-shadow:0 30px 80px rgba(0,0,0,0.6);}
        .modal-box::-webkit-scrollbar{width:3px;}
        .modal-box::-webkit-scrollbar-thumb{background:rgba(212,175,55,0.3);border-radius:3px;}

        /* ---- INPUTS ---- */
        input,textarea{color:#e8f5e0 !important;font-family:'DM Sans',sans-serif;background:rgba(255,255,255,0.04)!important;}
        input::placeholder,textarea::placeholder{color:rgba(200,220,205,0.35);}
        input:focus,textarea:focus{outline:none!important;border-color:rgba(212,175,55,0.5)!important;box-shadow:0 0 0 3px rgba(212,175,55,0.1)!important;}

        /* ---- FAQ ---- */
        .faq-item{background:rgba(255,255,255,0.03);border:1px solid rgba(212,175,55,0.1);border-radius:16px;overflow:hidden;transition:border-color .3s;}
        .faq-item.open{border-color:rgba(212,175,55,0.3);}

        /* ---- REVIEW ---- */
        .review-card{background:linear-gradient(145deg,rgba(18,32,22,0.95),rgba(12,22,16,0.98));border:1px solid rgba(212,175,55,0.12);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(0,0,0,0.35);}

        /* ---- STEP ---- */
        .step-num{background:linear-gradient(135deg,#a87c3a,#d4af37);color:#0a0f0d;font-weight:800;border-radius:50%;width:42px;height:42px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.95rem;box-shadow:0 4px 14px rgba(212,175,55,0.4);}

        /* ---- HERO ORBS ---- */
        .orb{position:absolute;border-radius:50%;pointer-events:none;}

        /* ---- BADGE ---- */
        .badge-pill{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border-radius:999px;font-size:.72rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;}

        @media(max-width:640px){
          .hero-title{font-size:2.5rem!important;}
          .modal-box{padding:20px 16px;}
        }
      `}</style>

      {/* ===== TOP TICKER ===== */}
      <div style={{position:"fixed",top:0,left:0,right:0,zIndex:998,background:"linear-gradient(90deg,#060f08,#0d1a10,#060f08)",borderBottom:"1px solid rgba(212,175,55,0.2)",padding:"9px 0",boxShadow:"0 2px 20px rgba(0,0,0,0.6)"}}>
        <div className="ticker-wrap">
          <div className="ticker-track sans" style={{fontSize:".73rem",fontWeight:600,color:"rgba(240,200,98,0.85)"}}>
            {[0,1].map(s => (
              <span key={s} style={{display:"inline-flex",alignItems:"center"}}>
                <span className="ticker-item">🌿 Manvitha Wellness — 100% Pure Herbal</span>
                <span className="ticker-item blink" style={{color:"#f87171"}}>⚠️ కేవలం {stock} ప్యాకెట్లు మాత్రమే!</span>
                <span className="ticker-item">⏰ ఆఫర్: <span style={{color:"#fbbf24"}}>{fmt(timeLeft)}</span></span>
                <span className="ticker-item" style={{color:"#86efac"}}>🚚 Free Delivery | COD Available</span>
                <span className="ticker-item">✦ Clinically Tested ✦ GMP Certified ✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section style={{paddingTop:"44px",minHeight:"100vh",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        {/* Background orbs */}
        <div className="orb" style={{width:"600px",height:"600px",background:"radial-gradient(circle,rgba(15,80,40,0.4) 0%,transparent 70%)",top:"-150px",left:"-200px",filter:"blur(60px)"}}></div>
        <div className="orb" style={{width:"400px",height:"400px",background:"radial-gradient(circle,rgba(212,175,55,0.07) 0%,transparent 70%)",bottom:"0",right:"-100px",filter:"blur(50px)"}}></div>
        {/* Decorative botanical */}
        <div className="orb leaf-float" style={{fontSize:"8rem",opacity:".04",top:"10%",right:"3%",pointerEvents:"none",userSelect:"none"}}>🌿</div>
        <div className="orb leaf-float" style={{fontSize:"5rem",opacity:".03",bottom:"15%",left:"2%",pointerEvents:"none",userSelect:"none",animationDelay:"2s"}}>🍃</div>

        <div style={{maxWidth:"600px",margin:"0 auto",padding:"40px 20px 100px",textAlign:"center",position:"relative",zIndex:1}}>

          {/* Brand wordmark */}
          <div style={{animation:"fadeUp .6s ease both",marginBottom:"20px"}}>
            <span className="sans" style={{display:"inline-block",padding:"6px 20px",borderRadius:"999px",fontSize:".68rem",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:"#d4af37",border:"1px solid rgba(212,175,55,0.3)",background:"rgba(212,175,55,0.05)"}}>
              ✦ Manvitha Wellness ✦
            </span>
          </div>

          {/* Product carousel */}
          <div style={{animation:"fadeUp .7s .1s ease both",marginBottom:"24px"}}>
            <div style={{position:"relative",width:"min(100%,380px)",margin:"0 auto",padding:"20px 20px 14px",borderRadius:"32px",background:"linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))",border:"1px solid rgba(212,175,55,0.15)",boxShadow:"0 24px 60px rgba(0,0,0,0.5),inset 0 1px 0 rgba(212,175,55,0.08)"}}>
              <div className="carousel-window">
                <div className="carousel-track" style={{transform:`translateX(-${activeImg*100}%)`}}>
                  {PRODUCT_IMAGES.map((src,i) => (
                    <div key={i} className="carousel-slide">
                      <img src={src} alt={`${PRODUCT_NAME} ${i+1}`} style={{width:"100%",maxWidth:"320px",height:"300px",objectFit:"contain",filter:"drop-shadow(0 20px 40px rgba(0,0,0,0.5)) drop-shadow(0 0 60px rgba(30,120,60,0.25))"}} />
                    </div>
                  ))}
                </div>
              </div>
              {/* Dots */}
              <div style={{display:"flex",justifyContent:"center",gap:"8px",marginTop:"14px"}}>
                {PRODUCT_IMAGES.map((_,i) => (
                  <button key={i} onClick={()=>setActiveImg(i)} style={{border:"none",cursor:"pointer",padding:0,borderRadius:"999px",background:activeImg===i?"#d4af37":"rgba(255,255,255,0.2)",width:activeImg===i?"28px":"9px",height:"9px",transition:"all .4s ease"}}></button>
                ))}
              </div>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="telugu hero-title serif" style={{animation:"fadeUp .7s .2s ease both",fontSize:"3.2rem",fontWeight:600,color:"#f0ece4",lineHeight:1.18,marginBottom:"8px",letterSpacing:"-.01em"}}>
            {PRODUCT_NAME}
          </h1>
          <p className="telugu sans" style={{animation:"fadeUp .7s .28s ease both",fontSize:"1rem",color:"rgba(160,210,180,0.85)",marginBottom:"6px",letterSpacing:".01em"}}>
            కడుపు సమస్యలకు సహజ పరిష్కారం
          </p>
          <p className="telugu sans" style={{animation:"fadeUp .7s .33s ease both",fontSize:".82rem",color:"rgba(120,180,140,0.65)",marginBottom:"28px"}}>
            గ్యాస్ &nbsp;•&nbsp; అసిడిటీ &nbsp;•&nbsp; అజీర్ణం నుండి శాశ్వత ఉపశమనం
          </p>

          {/* Price row */}
          <div style={{animation:"fadeUp .7s .38s ease both",display:"inline-block",padding:"16px 32px",borderRadius:"20px",marginBottom:"24px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(212,175,55,0.18)",boxShadow:"0 8px 32px rgba(0,0,0,0.4)"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"14px",flexWrap:"wrap"}}>
              <span className="sans" style={{color:"rgba(200,200,200,0.4)",textDecoration:"line-through",fontSize:"1rem"}}>₹{MRP_PRICE.toLocaleString("en-IN")}</span>
              <span className="sans" style={{color:"#f0ece4",fontSize:"2.8rem",fontWeight:700,lineHeight:1,letterSpacing:"-.03em"}}>₹{OFFER_PRICE.toLocaleString("en-IN")}</span>
              <span className="sans" style={{background:"linear-gradient(135deg,#b91c1c,#ef4444)",color:"#fff",fontSize:".7rem",fontWeight:700,padding:"5px 12px",borderRadius:"999px",letterSpacing:".08em"}}>
                {Math.round((1-OFFER_PRICE/MRP_PRICE)*100)}% OFF
              </span>
            </div>
          </div>

          {/* CTA */}
          <div style={{animation:"fadeUp .7s .44s ease both"}}>
            <button onClick={()=>setShowForm(true)} className="gold-btn gold-pulse telugu" style={{padding:"18px 44px",borderRadius:"999px",fontSize:"1.05rem",display:"inline-flex",alignItems:"center",gap:"10px"}}>
              ✦ ఇప్పుడే ఆర్డర్ చేయండి
            </button>
          </div>

          {/* Trust pills */}
          <div style={{animation:"fadeUp .7s .5s ease both",display:"flex",justifyContent:"center",flexWrap:"wrap",gap:"10px",marginTop:"20px"}}>
            {["🚚 Free Delivery","💵 Cash on Delivery","🌿 Ayurvedic"].map((t,i)=>(
              <span key={i} className="sans badge-pill glass" style={{color:"rgba(180,230,195,0.8)",fontSize:".7rem"}}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div style={{padding:"0 20px"}}>
        <div className="divider-gold" style={{maxWidth:"600px",margin:"0 auto"}}></div>
      </div>

      {/* ===== TRUST STRIP ===== */}
      <div style={{padding:"20px",background:"rgba(255,255,255,0.02)"}}>
        <div style={{maxWidth:"600px",margin:"0 auto",display:"flex",justifyContent:"center",flexWrap:"wrap",gap:"24px"}}>
          {[["🌿","100% Natural"],["🔬","Clinically Tested"],["🏭","GMP Certified"],["🔒","Secure Payments"]].map(([ic,txt],i)=>(
            <div key={i} className="sans" style={{display:"flex",alignItems:"center",gap:"7px"}}>
              <span style={{fontSize:"1.1rem"}}>{ic}</span>
              <span style={{fontSize:".72rem",fontWeight:600,color:"rgba(160,210,170,0.75)",letterSpacing:".04em",textTransform:"uppercase"}}>{txt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== PROBLEMS ===== */}
      <section className="scroll-reveal" style={{padding:"70px 20px",background:"#080e0b"}}>
        <div style={{maxWidth:"600px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"40px"}}>
            <span className="gold-shimmer-text serif" style={{fontSize:".75rem",fontWeight:600,letterSpacing:".2em",textTransform:"uppercase",display:"block",marginBottom:"12px"}}>The Problem</span>
            <h2 className="telugu serif" style={{fontSize:"2rem",fontWeight:600,color:"#f0ece4",lineHeight:1.3}}>మీకు ఈ సమస్యలు ఉన్నాయా?</h2>
            <div className="divider-gold" style={{maxWidth:"100px",margin:"16px auto 0"}}></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
            {[
              {icon:"💨",title:"గ్యాస్",desc:"అకారణంగా వచ్చే గ్యాస్ మరియు అస్వస్థత"},
              {icon:"🫃",title:"కడుపు ఉబ్బరం",desc:"భోజనం తర్వాత కడుపు నిండినట్లు అనిపించడం"},
              {icon:"🔥",title:"అసిడిటీ",desc:"గొంతు వరకు వచ్చే యాసిడ్ మంట"},
              {icon:"🤢",title:"అజీర్ణం",desc:"ఆహారం సరిగా అరగకపోవడం"},
            ].map((p,i)=>(
              <div key={i} className="premium-card" style={{borderRadius:"20px",padding:"22px 16px",textAlign:"center",borderColor:"rgba(248,113,113,0.12)"}}>
                <span style={{fontSize:"2.2rem",display:"block",marginBottom:"10px"}}>{p.icon}</span>
                <h3 className="telugu sans" style={{fontWeight:700,fontSize:".95rem",color:"#fca5a5",marginBottom:"7px"}}>{p.title}</h3>
                <p className="telugu sans" style={{fontSize:".75rem",color:"rgba(200,200,200,0.5)",lineHeight:1.65}}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"28px"}}>
            <span className="telugu sans" style={{display:"inline-block",padding:"14px 28px",borderRadius:"999px",border:"1px solid rgba(74,222,128,0.3)",background:"rgba(74,222,128,0.06)",color:"#4ade80",fontWeight:600,fontSize:".85rem"}}>
              ✓ {PRODUCT_NAME} ఈ అన్ని సమస్యలకు పరిష్కారం
            </span>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="scroll-reveal" style={{padding:"70px 20px",background:"linear-gradient(180deg,#060f08 0%,#0a1510 100%)"}}>
        <div style={{maxWidth:"600px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"40px"}}>
            <span className="gold-shimmer-text serif" style={{fontSize:".75rem",fontWeight:600,letterSpacing:".2em",textTransform:"uppercase",display:"block",marginBottom:"12px"}}>Benefits</span>
            <h2 className="telugu serif" style={{fontSize:"2rem",fontWeight:600,color:"#f0ece4"}}>ఉత్పత్తి ప్రయోజనాలు</h2>
            <div className="divider-gold" style={{maxWidth:"100px",margin:"16px auto 0"}}></div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
            {[
              {icon:"⚡",title:"జీర్ణక్రియకు మద్దతు",desc:"ఆహారం వేగంగా మరియు సమర్థంగా జీర్ణమవుతుంది. పోషకాలు సక్రమంగా అందుతాయి.",accent:"rgba(74,222,128,0.1)",border:"rgba(74,222,128,0.15)"},
              {icon:"💨",title:"గ్యాస్ తగ్గేందుకు సహాయం",desc:"సహజ హర్బల్ పదార్థాలు గ్యాస్‌ను తగ్గించి పొట్ట తేలికగా అనిపింపజేస్తాయి.",accent:"rgba(96,165,250,0.08)",border:"rgba(96,165,250,0.15)"},
              {icon:"🫁",title:"కడుపు సౌకర్యం",desc:"భోజనం తర్వాత కడుపులో అసౌకర్యం తొలగిపోతుంది. రోజంతా హాయిగా ఉండవచ్చు.",accent:"rgba(251,191,36,0.08)",border:"rgba(251,191,36,0.15)"},
              {icon:"🌿",title:"100% సహజ హర్బల్ సపోర్ట్",desc:"100% సహజ మూలికలతో తయారైన ఈ ఉత్పత్తి ఏ దుష్ప్రభావాలూ లేకుండా పని చేస్తుంది.",accent:"rgba(167,139,250,0.08)",border:"rgba(167,139,250,0.15)"},
            ].map((b,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"16px",borderRadius:"18px",padding:"20px",background:b.accent,border:`1px solid ${b.border}`,transition:"transform .3s,box-shadow .3s",cursor:"default"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-3px)";(e.currentTarget as HTMLElement).style.boxShadow="0 12px 32px rgba(0,0,0,0.4)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.boxShadow="";}}
              >
                <div style={{width:"50px",height:"50px",borderRadius:"14px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",flexShrink:0,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.08)"}}>{b.icon}</div>
                <div>
                  <h3 className="telugu sans" style={{fontWeight:700,fontSize:".95rem",color:"#e8f5e0",marginBottom:"6px"}}>{b.title}</h3>
                  <p className="telugu sans" style={{fontSize:".8rem",color:"rgba(180,210,190,0.7)",lineHeight:1.7}}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW TO USE ===== */}
      <section className="scroll-reveal" style={{padding:"70px 20px",background:"#060f08",position:"relative",overflow:"hidden"}}>
        <div className="orb" style={{width:"400px",height:"400px",background:"radial-gradient(circle,rgba(212,175,55,0.06) 0%,transparent 70%)",top:"-100px",right:"-100px",filter:"blur(50px)",pointerEvents:"none"}}></div>
        <div style={{maxWidth:"600px",margin:"0 auto",position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"40px"}}>
            <span className="gold-shimmer-text serif" style={{fontSize:".75rem",fontWeight:600,letterSpacing:".2em",textTransform:"uppercase",display:"block",marginBottom:"12px"}}>Usage Guide</span>
            <h2 className="telugu serif" style={{fontSize:"2rem",fontWeight:600,color:"#f0ece4"}}>వాడే విధానం</h2>
            <div className="divider-gold" style={{maxWidth:"100px",margin:"16px auto 0"}}></div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
            {[
              {step:"1",icon:"⏰",title:"ఖాళీ కడుపుతో తీసుకోండి",desc:"ఆహారం తినే కనీసం 30 నిమిషాల ముందు ఖాళీ కడుపుతో తీసుకోవాలి."},
              {step:"2",icon:"💧",title:"150ml నీళ్లలో కలపండి",desc:"సూచించిన మోతాదును 150ml శుభ్రమైన నీళ్లలో బాగా కలిపి తాగాలి."},
              {step:"3",icon:"🥄",title:"రోజుల వారీ మోతాదు",desc:"మొదటి 3 రోజులు 5ml రోజుకు 2 సార్లు. తరువాతి 3 రోజులు 10ml రోజుకు 2 సార్లు."},
              {step:"4",icon:"🌿",title:"7వ రోజు నుండి కొనసాగింపు",desc:"7వ రోజు నుండి 15-30ml రోజుకు 2 సార్లు. మంచి ఫలితాల కోసం 6-12 నెలలు కొనసాగించండి."},
            ].map((s,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"16px",padding:"20px",borderRadius:"18px",background:"rgba(255,255,255,0.025)",border:"1px solid rgba(212,175,55,0.1)"}}>
                <div className="step-num">{s.step}</div>
                <div style={{display:"flex",alignItems:"flex-start",gap:"12px"}}>
                  <span style={{fontSize:"1.6rem",flexShrink:0,marginTop:"2px"}}>{s.icon}</span>
                  <div>
                    <h3 className="telugu sans" style={{fontWeight:700,color:"#f0ece4",fontSize:".95rem",marginBottom:"6px"}}>{s.title}</h3>
                    <p className="telugu sans" style={{color:"rgba(160,210,175,0.65)",fontSize:".8rem",lineHeight:1.7}}>{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Highlight */}
          <div style={{marginTop:"22px",borderRadius:"18px",padding:"18px 22px",textAlign:"center",border:"1px solid rgba(212,175,55,0.3)",background:"rgba(212,175,55,0.05)"}}>
            <p className="telugu sans" style={{color:"#d4af37",fontWeight:600,fontSize:".85rem",lineHeight:1.6}}>
              ✦ <strong>సూచించిన మోతాదు:</strong> మొదటి 3 రోజులు 5ml → తరువాతి 3 రోజులు 10ml → 7వ రోజు నుండి 15–30ml — రోజుకు 2 సార్లు, 150ml నీళ్లలో కలిపి, భోజనానికి 30 నిమిషాల ముందు ✦
            </p>
          </div>
        </div>
      </section>

      {/* ===== EXPERT ===== */}
      <section className="scroll-reveal" style={{padding:"50px 20px",background:"#080e0b"}}>
        <div style={{maxWidth:"520px",margin:"0 auto"}}>
          <div style={{borderRadius:"26px",padding:"32px 26px",textAlign:"center",background:"linear-gradient(145deg,rgba(30,64,175,0.3),rgba(59,130,246,0.15))",border:"1px solid rgba(96,165,250,0.2)",boxShadow:"0 12px 40px rgba(30,64,175,0.25)"}}>
            <span style={{fontSize:"2.8rem",display:"block",marginBottom:"12px"}} className="float">👨‍⚕️</span>
            <h3 className="telugu serif" style={{color:"#e0f2fe",fontWeight:600,fontSize:"1.35rem",marginBottom:"10px"}}>వైద్య నిపుణులతో మాట్లాడాలా?</h3>
            <p className="telugu sans" style={{color:"rgba(186,230,253,0.7)",fontSize:".82rem",marginBottom:"22px",lineHeight:1.7}}>
              ఏదైనా సందేహం ఉంటే మా medical expert కి నేరుగా call లేదా WhatsApp చేయండి
            </p>
            <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
              <a href={`tel:${CALL_NUMBER}`} className="sans" style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"rgba(255,255,255,0.9)",color:"#1e3a5f",fontWeight:700,fontSize:".88rem",padding:"13px 24px",borderRadius:"999px",textDecoration:"none",boxShadow:"0 4px 18px rgba(0,0,0,0.35)",transition:"all .25s"}}>
                📞 Call Now
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`నమస్కారం! నాకు ${PRODUCT_NAME} గురించి కొన్ని ప్రశ్నలు ఉన్నాయి.`)}`} target="_blank" rel="noreferrer" className="wa-btn sans" style={{display:"inline-flex",alignItems:"center",gap:"8px",color:"#fff",fontWeight:700,fontSize:".88rem",padding:"13px 24px",borderRadius:"999px",textDecoration:"none",border:"none",cursor:"pointer"}}>
                {WA_SVG} WhatsApp
              </a>
            </div>
            <p className="sans" style={{color:"rgba(147,197,253,0.55)",fontSize:".72rem",marginTop:"14px"}}>📞 {CALL_NUMBER} &nbsp;·&nbsp; ✉️ {EMAIL}</p>
          </div>
        </div>
      </section>

      {/* ===== ORDER / PRICING ===== */}
      <section id="order" className="scroll-reveal" style={{padding:"70px 20px",background:"#060f08",position:"relative",overflow:"hidden"}}>
        <div className="orb" style={{width:"500px",height:"500px",background:"radial-gradient(circle,rgba(212,175,55,0.08) 0%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",filter:"blur(60px)",pointerEvents:"none"}}></div>
        <div style={{maxWidth:"480px",margin:"0 auto",textAlign:"center",position:"relative",zIndex:1}}>
          <span className="gold-shimmer-text serif" style={{fontSize:".75rem",fontWeight:600,letterSpacing:".2em",textTransform:"uppercase",display:"block",marginBottom:"12px"}}>Order Now</span>
          <h2 className="telugu serif" style={{fontSize:"2rem",fontWeight:600,color:"#f0ece4",marginBottom:"8px"}}>ఆర్డర్ వివరాలు</h2>
          <div className="divider-gold" style={{maxWidth:"100px",margin:"0 auto 36px"}}></div>

          <div style={{borderRadius:"28px",padding:"32px 26px",background:"linear-gradient(160deg,rgba(18,32,22,0.95),rgba(10,18,14,0.98))",border:"1px solid rgba(212,175,55,0.2)",boxShadow:"0 16px 50px rgba(0,0,0,0.6),inset 0 1px 0 rgba(212,175,55,0.1)",marginBottom:"20px"}}>
            {/* Price */}
            <p className="sans" style={{color:"rgba(248,113,113,0.9)",fontWeight:700,fontSize:"1.1rem",marginBottom:"4px"}}>
              Special Offer &nbsp;<span style={{fontSize:"2.2rem",fontWeight:800,color:"#fef2f2"}}>₹{OFFER_PRICE.toLocaleString("en-IN")}</span>
            </p>
            <p className="sans" style={{color:"rgba(200,200,200,0.3)",textDecoration:"line-through",fontSize:".82rem",marginBottom:"22px"}}>MRP: ₹{MRP_PRICE.toLocaleString("en-IN")}</p>

            {/* Online offer box */}
            <div style={{borderRadius:"18px",padding:"22px 20px",border:"1.5px dashed rgba(212,175,55,0.4)",background:"rgba(212,175,55,0.04)",marginBottom:"4px"}}>
              <span className="sans" style={{display:"inline-block",background:"linear-gradient(135deg,#b91c1c,#dc2626)",color:"#fff",fontSize:".65rem",fontWeight:800,padding:"5px 14px",borderRadius:"999px",marginBottom:"12px",letterSpacing:".1em",textTransform:"uppercase"}}>
                🔥 SUPER SAVER
              </span>
              <p className="telugu sans" style={{color:"rgba(220,200,140,0.85)",fontWeight:600,fontSize:".85rem",marginBottom:"12px"}}>
                ఆన్‌లైన్ పేమెంట్ చేస్తే అదనంగా {ONLINE_DISCOUNT_PERCENT}% తగ్గింపు
              </p>
              <p className="sans" style={{color:"rgba(200,200,200,0.4)",fontSize:".72rem",marginBottom:"6px",fontWeight:600,textTransform:"uppercase",letterSpacing:".08em"}}>Final Price</p>
              <p className="sans" style={{color:"#f0ece4",fontSize:"3.2rem",fontWeight:800,lineHeight:1,letterSpacing:"-.04em"}}>₹{ONLINE_PRICE.toLocaleString("en-IN")}</p>
              <p className="sans" style={{color:"rgba(200,200,200,0.35)",fontSize:".72rem",marginTop:"8px"}}>UPI / PhonePe / Google Pay</p>
            </div>
          </div>

          <button onClick={()=>setShowForm(true)} className="gold-btn telugu" style={{width:"100%",padding:"20px",borderRadius:"18px",fontSize:"1.1rem",marginBottom:"12px"}}>
            ✦ ఇప్పుడే ఆర్డర్ చేయండి →
          </button>
          <p className="telugu sans" style={{color:"rgba(160,180,165,0.5)",fontSize:".72rem"}}>🔒 100% సురక్షిత పేమెంట్ &nbsp;|&nbsp; Discreet Packaging</p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="scroll-reveal" style={{padding:"70px 20px",background:"#080e0b"}}>
        <div style={{maxWidth:"600px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"40px"}}>
            <span className="gold-shimmer-text serif" style={{fontSize:".75rem",fontWeight:600,letterSpacing:".2em",textTransform:"uppercase",display:"block",marginBottom:"12px"}}>FAQ</span>
            <h2 className="telugu serif" style={{fontSize:"2rem",fontWeight:600,color:"#f0ece4"}}>తరచుగా అడిగే ప్రశ్నలు</h2>
            <div className="divider-gold" style={{maxWidth:"100px",margin:"16px auto 0"}}></div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
            {faqs.map((faq,i)=>(
              <div key={i} className={`faq-item${openFaq===i?" open":""}`}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",textAlign:"left",padding:"18px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px",background:"none",border:"none",cursor:"pointer"}}>
                  <span className="telugu sans" style={{fontWeight:600,color:openFaq===i?"#d4af37":"#c8dbc0",fontSize:".88rem",lineHeight:1.5}}>{faq.q}</span>
                  <span style={{color:"#d4af37",fontWeight:700,fontSize:"1.2rem",flexShrink:0,transition:"transform .3s",transform:openFaq===i?"rotate(45deg)":"none",minWidth:"20px",textAlign:"center"}}>+</span>
                </button>
                {openFaq===i&&(
                  <div style={{padding:"0 20px 18px",animation:"slideUp .3s ease"}}>
                    <div className="divider-gold" style={{marginBottom:"14px"}}></div>
                    <p className="telugu sans" style={{color:"rgba(180,210,190,0.7)",fontSize:".82rem",lineHeight:1.75}}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="scroll-reveal" style={{padding:"70px 20px",background:"linear-gradient(180deg,#060f08 0%,#0a1510 100%)"}}>
        <div style={{maxWidth:"600px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"12px"}}>
            <span className="gold-shimmer-text serif" style={{fontSize:".75rem",fontWeight:600,letterSpacing:".2em",textTransform:"uppercase",display:"block",marginBottom:"12px"}}>Reviews</span>
            <h2 className="telugu serif" style={{fontSize:"2rem",fontWeight:600,color:"#f0ece4"}}>వినియోగదారుల అభిప్రాయాలు</h2>
            <p className="sans" style={{color:"rgba(160,180,165,0.4)",fontSize:".72rem",marginTop:"8px",fontStyle:"italic"}}>All testimonials shared with prior customer consent. Results may vary.</p>
          </div>
          <div className="divider-gold" style={{maxWidth:"100px",margin:"16px auto 36px"}}></div>
          <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
            {testimonials.map((t,i)=>(
              <div key={i} className="review-card">
                <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px",flexWrap:"wrap"}}>
                  <span className="sans" style={{background:"rgba(212,175,55,0.1)",color:"#d4af37",fontSize:".68rem",padding:"3px 10px",borderRadius:"999px",fontWeight:600,border:"1px solid rgba(212,175,55,0.2)"}}>{t.lang}</span>
                  <span style={{display:"flex",gap:"2px"}}>{Array.from({length:t.rating}).map((_,j)=><span key={j} style={{color:"#f59e0b",fontSize:".78rem"}}>★</span>)}</span>
                </div>
                <p className="serif" style={{color:"rgba(210,230,215,0.75)",fontSize:".9rem",lineHeight:1.8,marginBottom:"16px",fontStyle:"italic"}}>"{t.text}"</p>
                <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
                  <div style={{width:"38px",height:"38px",background:"linear-gradient(135deg,#15803d,#064e2d)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#d4af37",fontWeight:800,fontSize:".95rem",flexShrink:0,border:"1px solid rgba(212,175,55,0.2)"}}>{t.name[0]}</div>
                  <div>
                    <p className="sans" style={{fontWeight:700,color:"#c8dbc0",fontSize:".88rem"}}>{t.name}</p>
                    <p className="sans" style={{color:"rgba(160,180,165,0.45)",fontSize:".72rem"}}>{t.area}</p>
                  </div>
                  <span className="sans" style={{marginLeft:"auto",background:"rgba(74,222,128,0.08)",color:"#4ade80",fontSize:".68rem",padding:"5px 12px",borderRadius:"999px",fontWeight:600,border:"1px solid rgba(74,222,128,0.2)",whiteSpace:"nowrap"}}>✓ Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{background:"#040a06",borderTop:"1px solid rgba(212,175,55,0.2)",padding:"52px 20px 36px"}}>
        <div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
          <div className="float" style={{fontSize:"2.5rem",marginBottom:"14px"}}>🌿</div>
          <h3 className="serif" style={{color:"#f0ece4",fontSize:"1.5rem",fontWeight:600,letterSpacing:".08em",textTransform:"uppercase",marginBottom:"6px"}}>MANVITHA WELLNESS</h3>
          <p className="telugu sans" style={{color:"rgba(160,210,175,0.55)",fontSize:".8rem",marginBottom:"28px",fontStyle:"italic"}}>ప్రకృతి నుండి మీ ఆరోగ్యానికి</p>
          <div className="divider-gold" style={{maxWidth:"160px",margin:"0 auto 28px"}}></div>

          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"14px",marginBottom:"28px"}}>
            <a href={`tel:${CALL_NUMBER}`} className="sans" style={{display:"flex",alignItems:"center",gap:"10px",textDecoration:"none"}}>
              <span style={{fontSize:"1.2rem"}}>📞</span>
              <span style={{color:"#d4af37",fontWeight:700,fontSize:"1.2rem",letterSpacing:".05em"}}>+91 {CALL_NUMBER}</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="sans" style={{display:"flex",alignItems:"center",gap:"10px",textDecoration:"none"}}>
              <span style={{fontSize:"1.2rem"}}>✉️</span>
              <span style={{color:"rgba(160,210,175,0.7)",fontWeight:500,fontSize:".9rem",wordBreak:"break-all"}}>{EMAIL}</span>
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="sans" style={{display:"flex",alignItems:"center",gap:"10px",textDecoration:"none"}}>
              <span style={{fontSize:"1.2rem"}}>💬</span>
              <span style={{color:"#4ade80",fontWeight:500,fontSize:".9rem"}}>WhatsApp: +91 {CALL_NUMBER}</span>
            </a>
          </div>

          <div style={{display:"flex",justifyContent:"center",gap:"20px",marginBottom:"24px",flexWrap:"wrap"}}>
            <span className="sans" style={{color:"rgba(160,180,165,0.5)",fontSize:".72rem"}}>🔒 100% Secure</span>
            <span className="sans" style={{color:"rgba(160,180,165,0.5)",fontSize:".72rem"}}>📦 Discreet Packaging</span>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"20px",marginBottom:"22px"}}>
            {["గోప్యతా విధానం","నిబంధనలు","రిటర్న్ పాలసీ","సంప్రదించండి"].map((l,i)=>(
              <a key={i} href="#" className="telugu sans" style={{color:"rgba(160,180,165,0.4)",fontSize:".72rem",textDecoration:"none",borderBottom:"1px dotted rgba(212,175,55,0.2)"}}>{l}</a>
            ))}
          </div>
          <p className="telugu sans" style={{color:"rgba(255,255,255,0.15)",fontSize:".68rem",lineHeight:1.6}}>
            *గమనిక: ఇది ఒక ఆయుర్వేద సహాయక ఉత్పత్తి. ఫలితాలు వ్యక్తిగత శరీర స్వభావం మరియు జీవనశైలిపై ఆధారపడి ఉండవచ్చు.
          </p>
          <p className="sans" style={{color:"rgba(255,255,255,0.1)",fontSize:".65rem",marginTop:"10px"}}>© 2025 Manvitha Wellness Herbal Care. All rights reserved.</p>
        </div>
      </footer>

      {/* ===== STICKY BOTTOM CTA ===== */}
      {!showForm && (
        <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:997,padding:"6px 10px",background:"linear-gradient(90deg,#132741,#123f3d)",backdropFilter:"blur(16px)",borderTop:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 -6px 22px rgba(0,0,0,0.28)"}}>
          <div style={{maxWidth:"600px",margin:"0 auto",display:"flex",alignItems:"center",gap:"12px",minHeight:"62px"}}>
            <div style={{minWidth:"52px",textAlign:"left",display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                <span style={{fontSize:".82rem"}}>⏱</span>
                <p className="sans" style={{color:"#4ade80",fontSize:"1.45rem",fontWeight:800,lineHeight:1}}>{stock}</p>
              </div>
              <p className="telugu sans" style={{color:"rgba(210,240,225,0.62)",fontSize:".62rem",fontWeight:600,marginTop:"3px",lineHeight:1.2}}>స్టాక్</p>
            </div>
            <div style={{flex:1}}>
              <div style={{background:"rgba(255,255,255,0.14)",borderRadius:"999px",height:"6px",overflow:"hidden",marginBottom:"6px"}}>
                <div style={{height:"100%",width:`${stockPct}%`,background:"linear-gradient(90deg,#34d399,#fbbf24 78%)",borderRadius:"999px",transition:"width 1.5s ease"}}></div>
              </div>
              <p className="telugu sans" style={{color:"rgba(220,240,232,0.7)",fontSize:".74rem",fontWeight:600,lineHeight:1.15}}>{stock} స్టాక్ మాత్రమే మిగిలాయి</p>
            </div>
            <button onClick={()=>setShowForm(true)} className="telugu" style={{background:"linear-gradient(135deg,#f5b019,#fcd34d)",color:"#0f172a",border:"none",cursor:"pointer",padding:"13px 18px",borderRadius:"16px",fontSize:".92rem",fontWeight:800,boxShadow:"0 8px 20px rgba(245,176,25,0.22)",whiteSpace:"nowrap",minWidth:"148px"}}>
              ₹{OFFER_PRICE.toLocaleString("en-IN")} ఆర్డర్
            </button>
          </div>
        </div>
      )}

      {/* ===== ORDER FORM MODAL ===== */}
      {showForm && (
        <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget)setShowForm(false);}}>
          <div className="modal-box">
            <button onClick={()=>setShowForm(false)} style={{position:"absolute",top:"16px",right:"16px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(212,175,55,0.15)",borderRadius:"50%",width:"34px",height:"34px",cursor:"pointer",fontSize:"1.1rem",color:"rgba(200,200,200,0.6)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>×</button>

            <div style={{textAlign:"center",marginBottom:"24px"}}>
              <span style={{fontSize:"1.8rem",display:"block"}}>🛒</span>
              <h3 className="telugu serif" style={{fontSize:"1.4rem",fontWeight:600,color:"#f0ece4",marginTop:"8px"}}>ఆర్డర్ ఫారం</h3>
              <p className="telugu sans" style={{color:"rgba(160,200,175,0.5)",fontSize:".76rem",marginTop:"5px"}}>వివరాలు నమోదు చేసి WhatsApp లో కన్‌ఫర్మ్ చేయండి</p>
              <div className="divider-gold" style={{marginTop:"14px"}}></div>
            </div>

            {[
              {key:"name",label:"పేరు",type:"text",ph:"మీ పేరు నమోదు చేయండి"},
            ].map(f=>(
              <div key={f.key} style={{marginBottom:"16px"}}>
                <label className="telugu sans" style={{fontSize:".78rem",fontWeight:700,color:"rgba(212,175,55,0.8)",display:"block",marginBottom:"6px",letterSpacing:".03em"}}>{f.label} *</label>
                <input type={f.type} placeholder={f.ph} value={(form as any)[f.key]}
                  onChange={e=>{setForm({...form,[f.key]:e.target.value});setErrors({...errors,[f.key]:""});}}
                  style={{width:"100%",border:errors[f.key]?"1px solid rgba(248,113,113,0.6)":"1px solid rgba(212,175,55,0.15)",borderRadius:"12px",padding:"13px 16px",fontSize:".88rem",transition:"all .3s"}}
                  className="telugu"
                />
                {errors[f.key]&&<p className="telugu sans" style={{color:"#f87171",fontSize:".72rem",marginTop:"4px"}}>{errors[f.key]}</p>}
              </div>
            ))}

            <div style={{marginBottom:"16px"}}>
              <label className="telugu sans" style={{fontSize:".78rem",fontWeight:700,color:"rgba(212,175,55,0.8)",display:"block",marginBottom:"6px"}}>మొబైల్ నంబర్ *</label>
              <input type="tel" placeholder="10 అంకెల మొబైల్ నంబర్" value={form.mobile} maxLength={10}
                onChange={e=>{setForm({...form,mobile:e.target.value.replace(/\D/g,"")});setErrors({...errors,mobile:""});}}
                style={{width:"100%",border:errors.mobile?"1px solid rgba(248,113,113,0.6)":"1px solid rgba(212,175,55,0.15)",borderRadius:"12px",padding:"13px 16px",fontSize:".88rem",transition:"all .3s"}}
              />
              {errors.mobile&&<p className="telugu sans" style={{color:"#f87171",fontSize:".72rem",marginTop:"4px"}}>{errors.mobile}</p>}
            </div>

            <div style={{marginBottom:"16px"}}>
              <label className="telugu sans" style={{fontSize:".78rem",fontWeight:700,color:"rgba(212,175,55,0.8)",display:"block",marginBottom:"6px"}}>పూర్తి చిరునామా *</label>
              <textarea placeholder="మీ డెలివరీ చిరునామా నమోదు చేయండి" value={form.address} rows={3}
                onChange={e=>{setForm({...form,address:e.target.value});setErrors({...errors,address:""});}}
                style={{width:"100%",border:errors.address?"1px solid rgba(248,113,113,0.6)":"1px solid rgba(212,175,55,0.15)",borderRadius:"12px",padding:"13px 16px",fontSize:".88rem",resize:"none",transition:"all .3s"}}
                className="telugu"
              />
              {errors.address&&<p className="telugu sans" style={{color:"#f87171",fontSize:".72rem",marginTop:"4px"}}>{errors.address}</p>}
            </div>

            <div style={{marginBottom:"16px"}}>
              <label className="telugu sans" style={{fontSize:".78rem",fontWeight:700,color:"rgba(212,175,55,0.8)",display:"block",marginBottom:"10px"}}>చెల్లింపు విధానం *</label>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
                {[
                  {val:"cod",label:"💵 Cash on Delivery",price:`₹${OFFER_PRICE.toLocaleString("en-IN")}`,sub:""},
                  {val:"online",label:"📱 Online Payment",price:`₹${ONLINE_PRICE.toLocaleString("en-IN")}`,sub:`Save ${ONLINE_DISCOUNT_PERCENT}%`},
                ].map(opt=>(
                  <button key={opt.val} onClick={()=>setForm({...form,payment:opt.val})} style={{borderRadius:"14px",padding:"14px 10px",fontSize:".82rem",fontWeight:600,border:form.payment===opt.val?"1px solid rgba(212,175,55,0.5)":"1px solid rgba(212,175,55,0.1)",background:form.payment===opt.val?"rgba(212,175,55,0.1)":"rgba(255,255,255,0.02)",color:form.payment===opt.val?"#d4af37":"rgba(200,210,205,0.65)",cursor:"pointer",textAlign:"center",transition:"all .25s"}} className="telugu sans">
                    {opt.label}
                    <br/><span style={{fontWeight:800,fontSize:"1rem",color:form.payment===opt.val?"#f0c862":"#e8f5e0"}}>{opt.price}</span>
                    {opt.sub&&<><br/><span style={{fontSize:".68rem",color:"#4ade80"}}>{opt.sub}</span></>}
                  </button>
                ))}
              </div>
            </div>

            {form.payment==="online"&&(
              <div style={{borderRadius:"12px",padding:"13px 16px",marginBottom:"14px",textAlign:"center",background:"rgba(251,191,36,0.06)",border:"1px solid rgba(251,191,36,0.2)"}}>
                <p className="telugu sans" style={{color:"#d4af37",fontWeight:600,fontSize:".82rem"}}>🎉 ఆన్‌లైన్ పేమెంట్ డిస్కౌంట్ వర్తించింది!</p>
                <p className="sans" style={{color:"rgba(200,200,200,0.5)",fontSize:".75rem",marginTop:"4px"}}>
                  ₹{OFFER_PRICE.toLocaleString("en-IN")} → <span style={{fontWeight:800,color:"#f0ece4",fontSize:"1.05rem"}}>₹{ONLINE_PRICE.toLocaleString("en-IN")}</span>
                  <span style={{color:"rgba(200,200,200,0.35)"}}> (UPI / PhonePe / Google Pay)</span>
                </p>
              </div>
            )}

            <div style={{borderRadius:"14px",padding:"16px",marginBottom:"16px",textAlign:"center",background:"rgba(74,222,128,0.04)",border:"1px solid rgba(74,222,128,0.15)"}}>
              <p className="telugu sans" style={{color:"rgba(160,210,175,0.6)",fontWeight:600,fontSize:".8rem"}}>మీ మొత్తం చెల్లింపు</p>
              <p className="sans" style={{color:"#f0ece4",fontWeight:800,fontSize:"2rem",letterSpacing:"-.03em"}}>₹{finalPrice.toLocaleString("en-IN")}</p>
            </div>

            <button onClick={handleSubmit} className="wa-btn telugu" style={{width:"100%",border:"none",cursor:"pointer",color:"#fff",fontWeight:700,fontSize:"1rem",padding:"16px",borderRadius:"14px",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",marginBottom:"10px"}}>
              {WA_SVG} WhatsApp లో ఆర్డర్ చేయండి
            </button>
            <p className="telugu sans" style={{textAlign:"center",fontSize:".68rem",color:"rgba(160,180,165,0.35)"}}>🔒 మీ సమాచారం పూర్తిగా సురక్షితం</p>

            <div style={{marginTop:"20px",paddingTop:"16px",borderTop:"1px solid rgba(212,175,55,0.08)"}}>
              <label className="telugu sans" style={{fontSize:".78rem",fontWeight:700,color:"rgba(212,175,55,0.8)",display:"block",marginBottom:"8px"}}>వ్యాఖ్యలు / గమనికలు (ఐచ్ఛికం)</label>
              <textarea placeholder="ఏదైనా ప్రత్యేక సూచనలు..." value={form.notes}
                onChange={e=>setForm({...form,notes:e.target.value})} rows={3}
                style={{width:"100%",border:"1px solid rgba(212,175,55,0.1)",borderRadius:"12px",padding:"13px 16px",fontSize:".85rem",resize:"none"}}
              />
            </div>
          </div>
        </div>
      )}

      <div style={{height:"68px"}}></div>
    </div>
  );
}
