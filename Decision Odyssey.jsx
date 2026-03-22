import { useState } from "react";

const quests = [
  {
    id: 1,
    title: "Quest 1: The Job Crossroads",
    emoji: "💼",
    scenario: "Your current company in Sholinganallur just offered a promotion (+₹8k/month) but with crazy deadlines. A Bangalore firm emails a 40% hike + WFH. Your parents in Adyar keep saying "Stay close, we're getting older and Pongal is coming." Appraisal deadline is in 3 days.",
    question: "What do you do FIRST?",
    options: {
      A: "Grab the Bangalore offer — more money, why overthink?",
      B: "Immediately call Amma, Appa, and your manager for their opinion before doing anything else.",
      C: "Clearly name the problem, then quietly check Glassdoor/AmbitionBox, compare cost of living + monsoon train tickets, talk to 2 ex-colleagues, and list 4-5 real alternatives.",
      D: "Keep the emails unread — maybe the offers will sort themselves.",
    },
  },
  {
    id: 2,
    title: "Quest 2: Monsoon Mayhem",
    emoji: "🌧️",
    scenario: "Northeast monsoon hits hard. Velachery is flooded. You have a must-attend client meeting in T-Nagar tomorrow 10 AM. Metro might stop, autos charging double, your two-wheeler risks waterlogging near Adyar Bridge. Your sister texts "Anna, stay safe."",
    question: "How do you evaluate & decide?",
    options: {
      A: "Panic-cancel the meeting and stay home stressed.",
      B: "Quickly check 3 weather apps + Google Maps, calculate time/cost/risk for each option, factor in family peace of mind, then pick the lowest-risk balanced choice.",
      C: "Just copy what your team lead is doing — he's senior.",
      D: ""Chennai rains are normal" — ride anyway without checking anything.",
    },
  },
  {
    id: 3,
    title: "Quest 3: Family Alliance",
    emoji: "💍",
    scenario: "Your parents arrange a meeting with a "good alliance" — same caste, IT girl from Besant Nagar. You met her once at Kapaleeshwarar Temple coffee shop and felt good chemistry, but your long-term plan involves maybe moving to Singapore in 2 years. Tradition says family must approve first.",
    question: "How do you choose?",
    options: {
      A: "Say yes immediately to keep everyone happy and avoid drama.",
      B: "Avoid replying to the WhatsApp group and hope it fades.",
      C: "Sit with parents openly, share your feelings, weigh compatibility + family harmony + future goals, quietly consult one trusted uncle or counsellor, then decide together.",
      D: "Decide alone on gut feeling and tell family later — my life, my rules.",
    },
  },
  {
    id: 4,
    title: "Quest 4: Startup Spark",
    emoji: "🚀",
    scenario: "You saved ₹3.5 lakh. Your close friend pitches: "Let's start a Tamil home-food delivery app — sambar-rice, pongal boxes, targeting OMR offices." Market looks promising but failure rate is high. Safe alternative: mutual funds.",
    question: "What's your move?",
    options: {
      A: '"Too risky, stick to job and fixed deposit."',
      B: "Ask parents and 5 friends for opinion only — no personal research.",
      C: "Brainstorm 3 solid alternatives, make a 6-month budget + MVP test plan (first trial with 20 friends in Adyar), register on Udyam, set review dates every 2 months.",
      D: '"Let\'s do it tomorrow!" — sign papers without details.',
    },
  },
  {
    id: 5,
    title: "Quest 5: Festival Finance",
    emoji: "🎊",
    scenario: "Pongal is 3 weeks away. You want to buy 2 sovereign gold for Amma (tradition), host family lunch in Mylapore with new clothes. But you just spent ₹40k on bike repair. Budget pressure.",
    question: "How do you decide spending?",
    options: {
      A: "Borrow a little and go full traditional — family will love it, figure money later.",
      B: "Cancel gold and celebration to save — feel guilty but safe.",
      C: "List priorities (gold for Amma first, scaled celebration), check current gold price + festive discounts, allocate exact amounts, plan a small side gig, and decide you'll review after Pongal to learn for next year.",
      D: "Spend whatever feels right on the day — Chennai spirit!",
    },
  },
];

const qScores = [
  { A: [40,20,30,30,40,20,10], B: [60,30,40,50,30,30,20], C: [100,100,100,80,90,70,60], D: [10,0,10,20,20,10,10] },
  { A: [30,20,20,10,20,10,30], B: [80,90,70,100,90,80,70], C: [50,40,30,40,50,30,40], D: [20,10,40,20,30,20,20] },
  { A: [60,30,40,70,40,30,30], B: [20,10,20,30,20,10,10], C: [90,80,80,90,100,80,90], D: [40,50,60,50,30,40,40] },
  { A: [30,40,20,70,40,20,30], B: [40,30,30,50,40,30,30], C: [90,90,100,80,90,100,90], D: [20,20,30,30,20,20,20] },
  { A: [40,30,40,30,30,20,30], B: [30,40,30,40,30,30,20], C: [90,80,80,90,90,90,100], D: [50,40,50,40,40,30,30] },
];

const components = [
  "Clear Problem Recognition",
  "Selective Info Gathering",
  "Creative Alternatives",
  "Risk Evaluation",
  "Balanced Final Choice",
  "Implementation Planning",
  "Post-Decision Review",
];

const componentIcons = ["🎯","🔍","💡","⚖️","✅","📋","🔄"];

function getProfile(optimalCount) {
  if (optimalCount >= 4) return { title: "Master Vigilant Collectivist", desc: "Chennai's finest decision maker", color: "#ff6600" };
  if (optimalCount === 3) return { title: "Balanced Chennai Pragmatist", desc: "Strong family + practical mix", color: "#e67e00" };
  return { title: "Spontaneous Avoider", desc: "Needs sharpening for IT + family life", color: "#cc5200" };
}

function ScoreBar({ score, delay = 0 }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13, color: "#555" }}>
        <span></span>
        <span style={{ fontWeight: 700, color: score >= 75 ? "#ff6600" : score >= 50 ? "#e67e00" : "#999" }}>{score}%</span>
      </div>
      <div style={{ height: 10, background: "#ffe0c0", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${score}%`,
          background: "linear-gradient(90deg, #ff6600, #ffaa44)",
          borderRadius: 99,
          transition: `width 1.2s ease ${delay}s`,
        }} />
      </div>
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState("intro"); // intro | name | game | result
  const [name, setName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);

  function startGame() {
    setName(nameInput.trim() || "Arjun");
    setStage("game");
    setCurrentQ(0);
    setChoices([]);
    setSelected(null);
  }

  function handleChoice(opt) {
    if (animating) return;
    setSelected(opt);
    setAnimating(true);
    setTimeout(() => {
      const newChoices = [...choices, opt];
      setChoices(newChoices);
      if (currentQ + 1 < quests.length) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
        setAnimating(false);
      } else {
        setStage("result");
        setAnimating(false);
      }
    }, 700);
  }

  function calcResults() {
    const compScores = Array(7).fill(0);
    choices.forEach((c, i) => {
      qScores[i][c].forEach((pt, j) => { compScores[j] += pt; });
    });
    const averaged = compScores.map(s => Math.round(s / 5));
    const overall = Math.round(averaged.reduce((a, b) => a + b, 0) / 7);
    const optimalCount = choices.filter(c => c === "C").length;
    return { averaged, overall, optimalCount };
  }

  // ---- INTRO ----
  if (stage === "intro") return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #1a0a00 0%, #3d1500 50%, #1a0a00 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "'Georgia', serif", padding: 20, textAlign: "center",
    }}>
      <div style={{ fontSize: 72, marginBottom: 8 }}>🌴</div>
      <h1 style={{ color: "#ff8833", fontSize: "clamp(28px,6vw,52px)", margin: "0 0 8px", letterSpacing: 1, textShadow: "0 0 30px #ff6600aa" }}>
        Chennai Decision Odyssey
      </h1>
      <p style={{ color: "#ffcc88", fontSize: 16, maxWidth: 480, lineHeight: 1.7, marginBottom: 36 }}>
        A psychometric adventure through the real dilemmas of Chennai life — jobs, monsoons, family, startups & festivals.
        5 quests. 7 skills measured. Your true decision-making DNA revealed.
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
        {["💼 Career","🌧️ Monsoon","💍 Alliance","🚀 Startup","🎊 Festival"].map((tag, i) => (
          <span key={i} style={{ background: "#ff660022", border: "1px solid #ff6600aa", color: "#ffaa66", padding: "6px 14px", borderRadius: 99, fontSize: 13 }}>{tag}</span>
        ))}
      </div>
      <button onClick={() => setStage("name")} style={{
        background: "linear-gradient(135deg, #ff6600, #ff9933)", color: "white", border: "none",
        padding: "16px 48px", fontSize: 18, fontWeight: 700, borderRadius: 50, cursor: "pointer",
        boxShadow: "0 8px 32px #ff660055", letterSpacing: 1, fontFamily: "Georgia, serif",
        transition: "transform 0.15s",
      }}
        onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.target.style.transform = "scale(1)"}
      >Begin Your Odyssey →</button>
    </div>
  );

  // ---- NAME ----
  if (stage === "name") return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #1a0a00 0%, #3d1500 50%, #1a0a00 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "Georgia, serif", padding: 20, textAlign: "center",
    }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🙏</div>
      <h2 style={{ color: "#ff8833", fontSize: 28, margin: "0 0 10px" }}>Vanakkam!</h2>
      <p style={{ color: "#ffcc88", fontSize: 16, marginBottom: 28 }}>What shall we call you, decision-maker?</p>
      <input
        type="text" placeholder="Your name (or press Start for Arjun)"
        value={nameInput} onChange={e => setNameInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && startGame()}
        style={{
          background: "#2a0f00", border: "2px solid #ff6600aa", color: "#ffcc88",
          padding: "14px 24px", fontSize: 17, borderRadius: 12, width: 300, maxWidth: "90%",
          outline: "none", textAlign: "center", fontFamily: "Georgia, serif", marginBottom: 24,
        }}
        autoFocus
      />
      <button onClick={startGame} style={{
        background: "linear-gradient(135deg, #ff6600, #ff9933)", color: "white", border: "none",
        padding: "14px 44px", fontSize: 17, fontWeight: 700, borderRadius: 50, cursor: "pointer",
        boxShadow: "0 8px 32px #ff660055", fontFamily: "Georgia, serif",
      }}>Start Quest 🌴</button>
    </div>
  );

  // ---- GAME ----
  if (stage === "game") {
    const quest = quests[currentQ];
    const optionColors = { A: "#ff6600", B: "#e67e00", C: "#cc5200", D: "#aa4400" };
    const optionBg = { A: "#ff660015", B: "#e67e0015", C: "#cc520015", D: "#aa440015" };

    return (
      <div style={{
        minHeight: "100vh", background: "linear-gradient(135deg, #1a0a00 0%, #3d1500 50%, #1a0a00 100%)",
        display: "flex", flexDirection: "column", alignItems: "center",
        fontFamily: "Georgia, serif", padding: "20px 16px",
      }}>
        {/* Header */}
        <div style={{ width: "100%", maxWidth: 680, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ color: "#ff8833", fontWeight: 700, fontSize: 15 }}>Namaste, {name}!</span>
            <span style={{ color: "#ffaa66", fontSize: 13 }}>Quest {currentQ + 1} of {quests.length}</span>
          </div>
          <div style={{ height: 6, background: "#3d1500", borderRadius: 99 }}>
            <div style={{
              height: "100%", borderRadius: 99,
              background: "linear-gradient(90deg, #ff6600, #ffaa44)",
              width: `${((currentQ) / quests.length) * 100}%`,
              transition: "width 0.5s ease",
            }} />
          </div>
        </div>

        {/* Card */}
        <div style={{
          width: "100%", maxWidth: 680,
          background: "rgba(255,255,255,0.04)", backdropFilter: "blur(10px)",
          border: "1px solid #ff660033", borderRadius: 20, padding: "28px 28px 32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{quest.emoji}</div>
          <h2 style={{ color: "#ff8833", fontSize: 20, margin: "0 0 14px", letterSpacing: 0.5 }}>{quest.title}</h2>
          <p style={{ color: "#ffcc88", fontSize: 14.5, lineHeight: 1.75, marginBottom: 20, background: "#ff66000d", padding: "14px 16px", borderRadius: 10, border: "1px solid #ff660022" }}>
            {quest.scenario}
          </p>
          <p style={{ color: "#ffa366", fontWeight: 700, fontSize: 15, marginBottom: 18 }}>{quest.question}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {Object.entries(quest.options).map(([key, text]) => {
              const isSelected = selected === key;
              return (
                <button
                  key={key}
                  onClick={() => handleChoice(key)}
                  disabled={!!selected}
                  style={{
                    background: isSelected ? `linear-gradient(135deg, ${optionColors[key]}33, ${optionColors[key]}22)` : optionBg[key],
                    border: `2px solid ${isSelected ? optionColors[key] : optionColors[key] + "44"}`,
                    color: "#ffcc88", padding: "14px 18px", borderRadius: 12, cursor: selected ? "default" : "pointer",
                    textAlign: "left", fontSize: 14, lineHeight: 1.6, fontFamily: "Georgia, serif",
                    transition: "all 0.2s", transform: isSelected ? "scale(0.98)" : "scale(1)",
                    display: "flex", gap: 12, alignItems: "flex-start",
                  }}
                  onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = optionColors[key]; }}
                  onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = optionColors[key] + "44"; }}
                >
                  <span style={{
                    background: optionColors[key], color: "white", borderRadius: 6, padding: "2px 8px",
                    fontWeight: 700, fontSize: 13, flexShrink: 0, marginTop: 1,
                  }}>{key}</span>
                  <span>{text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quest dots */}
        <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
          {quests.map((_, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: "50%",
              background: i < currentQ ? "#ff6600" : i === currentQ ? "#ffaa44" : "#3d1500",
              transition: "background 0.3s",
            }} />
          ))}
        </div>
      </div>
    );
  }

  // ---- RESULTS ----
  if (stage === "result") {
    const { averaged, overall, optimalCount } = calcResults();
    const profile = getProfile(optimalCount);
    const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

    const scoreEmoji = overall >= 80 ? "🏆" : overall >= 60 ? "⭐" : "🌱";
    const choiceLabels = choices.map((c, i) => ({ q: i + 1, choice: c, optimal: c === "C" }));

    return (
      <div style={{
        minHeight: "100vh", background: "linear-gradient(135deg, #1a0a00 0%, #3d1500 50%, #1a0a00 100%)",
        fontFamily: "Georgia, serif", padding: "24px 16px",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        <div style={{ width: "100%", maxWidth: 680 }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 52, marginBottom: 8 }}>🌴</div>
            <h1 style={{ color: "#ff8833", fontSize: "clamp(20px,5vw,36px)", margin: "0 0 4px", letterSpacing: 1 }}>
              Decision Mastery Report
            </h1>
            <p style={{ color: "#ffaa66", fontSize: 14 }}>{name} · {today}</p>
          </div>

          {/* Overall Score */}
          <div style={{
            background: "rgba(255,102,0,0.1)", border: "2px solid #ff660055",
            borderRadius: 20, padding: "28px 24px", textAlign: "center", marginBottom: 20,
          }}>
            <div style={{ fontSize: 44, marginBottom: 4 }}>{scoreEmoji}</div>
            <div style={{ fontSize: 68, fontWeight: 900, color: "#ff6600", lineHeight: 1, marginBottom: 4, textShadow: "0 0 30px #ff660066" }}>
              {overall}
              <span style={{ fontSize: 28, color: "#ffaa66" }}>/100</span>
            </div>
            <p style={{ color: "#ff8833", fontWeight: 700, fontSize: 18, margin: "10px 0 4px" }}>{profile.title}</p>
            <p style={{ color: "#ffcc88", fontSize: 14, margin: 0 }}>{profile.desc}</p>
          </div>

          {/* Component Breakdown */}
          <div style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid #ff660033",
            borderRadius: 20, padding: "24px", marginBottom: 20,
          }}>
            <h2 style={{ color: "#ff8833", fontSize: 17, margin: "0 0 20px", letterSpacing: 0.5 }}>
              🧠 7-Component Breakdown
            </h2>
            {components.map((comp, i) => (
              <div key={i} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "#ffcc88", fontSize: 13 }}>{componentIcons[i]} {comp}</span>
                  <span style={{
                    fontWeight: 700, fontSize: 13,
                    color: averaged[i] >= 75 ? "#ff6600" : averaged[i] >= 50 ? "#e67e00" : "#888"
                  }}>{averaged[i]}%</span>
                </div>
                <div style={{ height: 8, background: "#3d1500", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 99,
                    background: averaged[i] >= 75 ? "linear-gradient(90deg,#ff6600,#ffaa44)" : averaged[i] >= 50 ? "linear-gradient(90deg,#cc5200,#ff8833)" : "linear-gradient(90deg,#884400,#cc6622)",
                    width: `${averaged[i]}%`,
                    transition: `width 1s ease ${i * 0.1}s`,
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Quest Choices */}
          <div style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid #ff660033",
            borderRadius: 20, padding: "24px", marginBottom: 20,
          }}>
            <h2 style={{ color: "#ff8833", fontSize: 17, margin: "0 0 16px" }}>📜 Your Choices</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {choiceLabels.map(({ q, choice, optimal }) => (
                <div key={q} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: optimal ? "#ff660015" : "#ffffff08",
                  border: `1px solid ${optimal ? "#ff660044" : "#ffffff11"}`,
                  borderRadius: 10, padding: "10px 16px",
                }}>
                  <span style={{ color: "#ffcc88", fontSize: 14 }}>{quests[q-1].emoji} Quest {q}: {quests[q-1].title.split(": ")[1]}</span>
                  <span style={{
                    background: optimal ? "#ff6600" : "#553300",
                    color: "white", padding: "3px 12px", borderRadius: 99, fontWeight: 700, fontSize: 13,
                  }}>{choice} {optimal ? "✓
