/* ============================================================
   Sachin's Portfolio Assistant
   A self-built retrieval chatbot. No external API, no pretrained
   model. Just a knowledge base + a small ranking function.

   To edit answers: change the KB array below.
   To add a starter question: change STARTERS below.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1. Knowledge base (edit these freely) ---------- */
  // Each entry: keys = words/phrases a visitor might use, answer = reply.
  const KB = [
    {
      id: "greeting",
      keys: ["hi", "hello", "hey", "yo", "hiya", "namaste", "greetings", "good morning", "good evening"],
      answer: "Hey! I'm Sachin's assistant. Ask me about his projects, skills, experience, or how to get in touch. Try one of the suggestions below."
    },
    {
      id: "about",
      keys: ["about", "who", "sachin", "yourself", "introduce", "bio", "background", "tell me about him", "what does he do"],
      answer: "Sachin Gupta is a final-year MCA student at Lovely Professional University and an AI/ML engineer. He builds end-to-end AI systems, computer vision, and backend APIs, with a focus on machine learning, deep learning, and privacy-focused applications."
    },
    {
      id: "skills",
      keys: ["skills", "skill", "stack", "tech stack", "technologies", "technology", "tools", "languages", "proficient", "expertise", "good at", "what does he know", "tech"],
      answer: "Sachin's core stack: Python, C++ and Java for languages; PyTorch, TensorFlow, Scikit-Learn, YOLOv8, OpenCV and MediaPipe for AI and computer vision; FastAPI, Django, Flask, MySQL, MongoDB and Firebase on the backend; and Docker, Git, Linux and React for tooling and deployment."
    },
    {
      id: "vision",
      keys: ["computer vision", "cv", "opencv", "yolo", "object detection", "image", "detection", "mediapipe", "vision"],
      answer: "Computer vision is one of Sachin's strongest areas. He works with YOLOv8, OpenCV and MediaPipe on real-time object and gesture detection, and has built systems for threat detection and sign-language recognition that run live on a GPU."
    },
    {
      id: "ml",
      keys: ["machine learning", "ml", "deep learning", "models", "neural", "training", "rag", "llm", "ai models", "data science"],
      answer: "Sachin builds machine learning and deep learning systems end to end, from data and model training through evaluation to deployment. He works with PyTorch, TensorFlow, Scikit-Learn and sequence models like BiLSTM, plus hands-on RAG and applied LLM workflows."
    },
    {
      id: "projects",
      keys: ["projects", "project", "work", "built", "portfolio", "showcase", "apps", "what has he made", "things he built"],
      answer: "A few of Sachin's main projects: Mitra, a privacy-first AI wellness companion for students; IERS, a real-time AI threat-detection system for fire, smoke and weapons; and SignBridge, an Indian Sign Language recognition model. Ask me about any of them for more detail."
    },
    {
      id: "best",
      keys: ["best", "strongest", "favourite", "favorite", "proudest", "impressive", "flagship", "top project", "main project", "highlight"],
      answer: "The highlights: Mitra (privacy-first AI wellness companion), IERS (real-time threat detection), and SignBridge (sign-language recognition). Together they show his range, from applied computer vision to full-stack AI products. Ask me about any one of them."
    },
    {
      id: "mitra",
      keys: ["mitra", "wellness", "mental health", "companion", "wellbeing", "student support"],
      answer: "Mitra is a privacy-first AI wellness companion built for Indian college students. It focuses on secure, judgement-free support with end-to-end encryption so conversations stay private, plus a crisis-detection layer that surfaces help resources when someone needs them."
    },
    {
      id: "iers",
      keys: ["iers", "emergency", "surveillance", "threat", "fire", "smoke", "weapon", "safety", "security", "cctv", "monitoring"],
      answer: "IERS (Intelligent Emergency Recognition System) is a real-time AI threat-detection platform for places like hotels, schools and institutions. It uses a YOLOv8 backbone to detect fire, smoke, weapons and people from a live video feed, running on GPU with a dashboard and a desktop app."
    },
    {
      id: "signbridge",
      keys: ["signbridge", "sign language", "isl", "gesture", "deaf", "accessibility", "bilstm", "hand"],
      answer: "SignBridge is Sachin's Indian Sign Language recognition system. It pairs MediaPipe hand and pose tracking with a BiLSTM model to recognise gestures and turn them into text, aimed at making communication more accessible. The work is written up as a research paper."
    },
    {
      id: "experience",
      keys: ["experience", "job", "internship", "intern", "worked", "company", "professional", "career"],
      answer: "Sachin is a final-year MCA student with a deep portfolio of applied AI projects, both independent products and academic work. He is open to internships and roles where he can work on real ML and computer-vision systems. Ask about his projects or availability for more."
    },
    {
      id: "education",
      keys: ["education", "degree", "college", "university", "study", "mca", "bsc", "qualification", "studying", "student"],
      answer: "Sachin is pursuing his Master of Computer Applications (MCA) at Lovely Professional University (2025 to present), after a BSc (Hons) in Information Technology from Noida International University (2022 to 2025)."
    },
    {
      id: "availability",
      keys: ["hire", "available", "availability", "freelance", "opportunity", "opportunities", "work together", "recruit", "hiring", "collaborate", "join", "openings", "open to work"],
      answer: "Yes, Sachin is open to internships, projects and collaborations, especially in AI, machine learning and computer vision. The best way to start a conversation is email: sachingupta1437@gmail.com, or connect on LinkedIn."
    },
    {
      id: "contact",
      keys: ["contact", "reach", "email", "connect", "get in touch", "message", "linkedin", "how do i reach", "talk to him"],
      answer: "You can reach Sachin by email at sachingupta1437@gmail.com, on LinkedIn (Sachin Gupta), or on GitHub (@sachin1437). He usually replies quickly."
    },
    {
      id: "resume",
      keys: ["resume", "cv document", "curriculum", "download resume"],
      answer: "You can download Sachin's resume from the Resume section of this site, or directly at assets/resume/Sachin-resume.pdf. It covers his projects, skills and achievements in detail."
    },
    {
      id: "location",
      keys: ["location", "where", "based", "live", "city", "country", "punjab", "india", "remote", "relocate"],
      answer: "Sachin is based in Punjab, India, currently at Lovely Professional University. He is open to remote work and relocation for the right opportunity."
    },
    {
      id: "certs",
      keys: ["certificate", "certification", "certified", "oracle", "credential", "achievements", "hackathon"],
      answer: "Sachin holds Oracle Cloud Infrastructure certifications in Data Science, Generative AI and AI Vector Search, and has taken part in national-level coding contests and hackathons. See the Certificates section for the credentials."
    },
    {
      id: "github",
      keys: ["github", "code", "repository", "repo", "source code", "git"],
      answer: "Sachin's code is on GitHub at github.com/sachin1437, where you'll find his portfolio and project repositories."
    },
    {
      id: "help",
      keys: ["help", "what can you do", "options", "capabilities", "what do you know"],
      answer: "I can tell you about Sachin's skills, his projects (like Mitra, IERS and SignBridge), his education and experience, whether he's available for work, and how to reach him. What would you like to know?"
    },
    {
      id: "thanks",
      keys: ["thanks", "thank you", "thx", "appreciate", "cheers"],
      answer: "Anytime. If you want to take it further, email Sachin at sachingupta1437@gmail.com."
    }
  ];

  const FALLBACK = "I don't have that one on hand yet. I can tell you about Sachin's projects, skills, experience, or how to contact him. Or email him directly at sachingupta1437@gmail.com and he'll be happy to answer.";

  const STARTERS = [
    "What are his strongest projects?",
    "What's his tech stack?",
    "Tell me about Mitra",
    "Is he available for hire?",
    "How do I contact him?"
  ];

  /* ---------- 2. Ranking (the "brain") ---------- */
  const STOP = new Set(("a an the is are was were be been being do does did what whats which who whom whose how why when where your you his him he she they them their our we i me my of for to in on at with about and or but as can could would should tell give show know me please hey").split(" "));
  const SYN = { cv: ["computer", "vision"], ai: ["machine", "learning"], ml: ["machine", "learning"], ui: ["frontend"], db: ["database"] };

  function tokens(str) {
    const raw = String(str).toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
    const out = [];
    for (const t of raw) {
      if (STOP.has(t)) continue;
      out.push(t);
      if (SYN[t]) out.push.apply(out, SYN[t]);
    }
    return out;
  }

  // Precompute keyword token sets + document frequency for idf weighting.
  const N = KB.length;
  const df = Object.create(null);
  KB.forEach(function (e) {
    const set = new Set();
    e.keys.forEach(function (k) { tokens(k).forEach(function (t) { set.add(t); }); });
    e._tokens = set;
    set.forEach(function (t) { df[t] = (df[t] || 0) + 1; });
  });
  function idf(t) { return Math.log((N + 1) / ((df[t] || 0) + 0.5)); }

  function answer(query) {
    const qt = tokens(query);
    if (!qt.length) return FALLBACK;
    let best = null, bestScore = 0;
    KB.forEach(function (e) {
      let s = 0;
      qt.forEach(function (t) { if (e._tokens.has(t)) s += idf(t); });
      // small bonus when a full multi-word phrase key appears verbatim
      e.keys.forEach(function (k) {
        if (k.indexOf(" ") > -1 && query.toLowerCase().indexOf(k) > -1) s += 1.5;
      });
      if (s > bestScore) { bestScore = s; best = e; }
    });
    return (best && bestScore >= 0.8) ? best.answer : FALLBACK;
  }

  /* ---------- 3. Widget (self-injecting UI) ---------- */
  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function build() {
    if (document.getElementById("cb-root")) return;

    const root = el("div", null); root.id = "cb-root";

    // Floating button
    const fab = el("button", "cb-fab");
    fab.setAttribute("aria-label", "Chat with Sachin's assistant");
    fab.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';

    // Panel
    const panel = el("div", "cb-panel");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Assistant chat");
    panel.setAttribute("aria-hidden", "true");

    const header = el("div", "cb-head",
      '<div class="cb-head-info">' +
        '<img class="cb-avatar" src="assets/images/assistant.jpg" alt="" onerror="this.style.display=\'none\'">' +
        '<div><div class="cb-title">Ask about Sachin</div><div class="cb-status">Usually replies instantly</div></div>' +
      '</div>' +
      '<button class="cb-close" aria-label="Close chat">&times;</button>');

    const body = el("div", "cb-body");
    const chips = el("div", "cb-chips");
    STARTERS.forEach(function (q) {
      const b = el("button", "cb-chip", q);
      b.addEventListener("click", function () { send(q); });
      chips.appendChild(b);
    });

    const inputRow = el("div", "cb-input-row");
    const input = el("input", "cb-input");
    input.type = "text";
    input.placeholder = "Type your question...";
    input.setAttribute("aria-label", "Type your question");
    const sendBtn = el("button", "cb-send", '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>');
    sendBtn.setAttribute("aria-label", "Send");
    inputRow.appendChild(input);
    inputRow.appendChild(sendBtn);

    panel.appendChild(header);
    panel.appendChild(body);
    panel.appendChild(chips);
    panel.appendChild(inputRow);
    root.appendChild(panel);
    root.appendChild(fab);
    document.body.appendChild(root);

    // Behaviour
    function addMsg(text, who) {
      const wrap = el("div", "cb-msg cb-" + who);
      if (who === "bot") wrap.innerHTML = '<img class="cb-msg-av" src="assets/images/assistant.jpg" alt="" onerror="this.style.display=\'none\'"><div class="cb-bubble"></div>';
      else wrap.innerHTML = '<div class="cb-bubble"></div>';
      wrap.querySelector(".cb-bubble").textContent = text;
      body.appendChild(wrap);
      body.scrollTop = body.scrollHeight;
      return wrap;
    }

    function typing() {
      const wrap = el("div", "cb-msg cb-bot");
      wrap.innerHTML = '<img class="cb-msg-av" src="assets/images/assistant.jpg" alt="" onerror="this.style.display=\'none\'"><div class="cb-bubble cb-typing"><span></span><span></span><span></span></div>';
      body.appendChild(wrap);
      body.scrollTop = body.scrollHeight;
      return wrap;
    }

    let greeted = false;
    function send(text) {
      const q = (text != null ? text : input.value).trim();
      if (!q) return;
      input.value = "";
      addMsg(q, "user");
      chips.classList.add("cb-chips-min");
      const t = typing();
      setTimeout(function () {
        t.remove();
        addMsg(answer(q), "bot");
      }, 450 + Math.random() * 350);
    }

    function open() {
      panel.classList.add("cb-open");
      panel.setAttribute("aria-hidden", "false");
      fab.classList.add("cb-hidden");
      if (!greeted) { addMsg("Hi! I'm Sachin's assistant. What would you like to know about him?", "bot"); greeted = true; }
      setTimeout(function () { input.focus(); }, 150);
    }
    function close() {
      panel.classList.remove("cb-open");
      panel.setAttribute("aria-hidden", "true");
      fab.classList.remove("cb-hidden");
    }

    fab.addEventListener("click", open);
    header.querySelector(".cb-close").addEventListener("click", close);
    sendBtn.addEventListener("click", function () { send(); });
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") send(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && panel.classList.contains("cb-open")) close(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();