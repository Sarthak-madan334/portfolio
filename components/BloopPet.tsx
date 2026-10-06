"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import styles from "./BloopPet.module.css";

const NAME = "Bloop";
const CHIPS = ["What has Sarthak built?", "His tech stack", "How can I contact him?"];
const MOOD_KEY = "bloop-mood";

type ChatMessage = { id: number; role: "user" | "bot" | "typing"; text: string };

function withMood(reply: string, mood: number) {
  if (mood < 30) return `*sigh* ${reply[0]?.toLowerCase() ?? ""}${reply.slice(1)}... I'm hungry.`;
  return mood > 66 ? `${reply} ♥` : reply;
}

export function BloopPet() {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(true);
  const [mood, setMood] = useState(70);
  const [moodLoaded, setMoodLoaded] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hearts, setHearts] = useState<number[]>([]);

  const moodRef = useRef(70);
  const openRef = useRef(false);
  const openedOnce = useRef(false);
  const snackReplies = useRef(0);
  const lastInteraction = useRef(0);
  const nextId = useRef(0);
  const busyRef = useRef(false);
  const messagesRef = useRef<ChatMessage[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const petRef = useRef<HTMLButtonElement>(null);
  const leftPupil = useRef<SVGGElement>(null);
  const rightPupil = useRef<SVGGElement>(null);

  const addMessage = useCallback((role: ChatMessage["role"], text: string) => {
    const item = { id: ++nextId.current, role, text };
    messagesRef.current = [...messagesRef.current, item];
    setMessages(messagesRef.current);
    return item.id;
  }, []);

  const changeMood = useCallback((amount: number) => {
    const next = Math.max(0, Math.min(100, moodRef.current + amount));
    moodRef.current = next;
    setMood(next);
    return next;
  }, []);

  const touch = () => { lastInteraction.current = Date.now(); };

  const hop = (showHeart = false) => {
    const pet = petRef.current;
    if (pet) {
      pet.classList.remove(styles.hopping);
      void pet.offsetWidth;
      pet.classList.add(styles.hopping);
      window.setTimeout(() => pet.classList.remove(styles.hopping), 550);
    }
    if (showHeart) {
      const id = ++nextId.current;
      setHearts((current) => [...current, id]);
      window.setTimeout(() => setHearts((current) => current.filter((item) => item !== id)), 950);
    }
  };

  useEffect(() => {
    lastInteraction.current = Date.now();
    try {
      const saved = localStorage.getItem(MOOD_KEY);
      if (saved !== null) {
        const value = Number(saved);
        if (Number.isFinite(value)) {
          moodRef.current = Math.max(0, Math.min(100, value));
          setMood(moodRef.current);
        }
      }
    } catch { /* Storage may be unavailable. */ }
    setMoodLoaded(true);
  }, []);

  useEffect(() => {
    if (!moodLoaded) return;
    try { localStorage.setItem(MOOD_KEY, String(mood)); } catch { /* Storage may be unavailable. */ }
  }, [mood, moodLoaded]);

  useEffect(() => { openRef.current = open; }, [open]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const amount = Date.now() - lastInteraction.current > 30_000 ? -3 : -1;
      if (changeMood(amount) < 25 && openRef.current && Math.random() < 0.3) {
        addMessage("bot", `${NAME}… is anyone there? 🥺`);
      }
    }, 6_000);
    return () => window.clearInterval(timer);
  }, [addMessage, changeMood]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let blinkTimer: number;
    let clearTimer: number;
    const scheduleBlink = () => {
      blinkTimer = window.setTimeout(() => {
        setBlinking(true);
        clearTimer = window.setTimeout(() => {
          setBlinking(false);
          scheduleBlink();
        }, 180);
      }, 2_500 + Math.random() * 3_000);
    };
    scheduleBlink();
    return () => { window.clearTimeout(blinkTimer); window.clearTimeout(clearTimer); };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const followPointer = (event: PointerEvent) => {
      const pet = petRef.current;
      if (!pet) return;
      const bounds = pet.getBoundingClientRect();
      const dx = event.clientX - (bounds.left + bounds.width / 2);
      const dy = event.clientY - (bounds.top + bounds.height / 2);
      const distance = Math.hypot(dx, dy) || 1;
      const reach = Math.min(3.5, distance / 45);
      const offset = `translate(${(dx / distance) * reach}px, ${(dy / distance) * reach}px)`;
      if (leftPupil.current) leftPupil.current.style.transform = offset;
      if (rightPupil.current) rightPupil.current.style.transform = offset;
    };
    window.addEventListener("pointermove", followPointer, { passive: true });
    return () => window.removeEventListener("pointermove", followPointer);
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const clickPet = () => {
    touch();
    if (!open) {
      setOpen(true);
      if (!openedOnce.current) {
        openedOnce.current = true;
        setHint(false);
        addMessage("bot", `${NAME}! I'm ${NAME}. Pet me, feed me, or ask about Sarthak's work. ♥`);
      }
      return;
    }
    changeMood(4);
    hop(true);
  };

  const giveSnack = () => {
    touch();
    changeMood(20);
    hop(true);
    if (snackReplies.current < 2) {
      snackReplies.current += 1;
      addMessage("bot", "Nom nom nom! Thank you! ♥");
    }
  };

  const sendMessage = async (value: string) => {
    const question = value.trim();
    if (!question || busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setInput("");
    touch();
    changeMood(2);

    const history = messagesRef.current
      .filter((item) => item.role !== "typing")
      .slice(-6)
      .map((item) => ({ role: item.role === "user" ? "user" : "assistant", content: item.text }));
    addMessage("user", question);
    const typingId = addMessage("typing", "…");

    try {
      const started = performance.now();
      const response = await fetch("/api/bloop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history }),
      });
      const data = await response.json() as { reply?: string; error?: string };
      if (!response.ok || typeof data.reply !== "string") throw new Error(data.error || "Bloop couldn't answer just now.");
      const remaining = Math.max(0, 600 - (performance.now() - started));
      if (remaining) await new Promise((resolve) => window.setTimeout(resolve, remaining));
      const reply = withMood(data.reply, moodRef.current);
      messagesRef.current = messagesRef.current.map((item) => item.id === typingId ? { ...item, role: "bot", text: reply } : item);
      setMessages(messagesRef.current);
      hop();
    } catch (error) {
      const text = error instanceof Error ? error.message : "Bloop couldn't answer just now.";
      messagesRef.current = messagesRef.current.map((item) => item.id === typingId ? { ...item, role: "bot", text } : item);
      setMessages(messagesRef.current);
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const mouth = mood < 30
    ? "M43 78 Q50 70 57 78"
    : mood > 66 ? "M42 73 Q45 80 50 74 Q55 80 58 73" : "M44 76 H56";

  return (
    <aside className={styles.widget} aria-label={`${NAME} portfolio helper`}>
      {open && <section id="bloop-chat" className={styles.panel} aria-label={`Chat with ${NAME}`}>
        <div className={styles.header}>
          <div className={styles.moodGroup}>
            <span>Mood</span>
            <span className={styles.moodTrack} role="progressbar" aria-label={`${NAME}'s mood`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={mood}>
              <span className={styles.moodFill} style={{ width: `${mood}%` }} />
            </span>
          </div>
          <button type="button" className={styles.snack} onClick={giveSnack}>🍪 Snack</button>
          <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close Bloop chat">×</button>
        </div>

        <div ref={logRef} className={styles.log} role="log" aria-live="polite" aria-relevant="additions text">
          {messages.map((item) => <div key={item.id} className={`${styles.bubble} ${item.role === "user" ? styles.userBubble : styles.botBubble} ${item.role === "typing" ? styles.typing : ""}`}>{item.text}</div>)}
        </div>

        <div className={styles.chips} aria-label="Suggested questions">
          {CHIPS.map((chip) => <button key={chip} type="button" disabled={busy} onClick={() => void sendMessage(chip)}>{chip}</button>)}
        </div>

        <form className={styles.form} onSubmit={submit}>
          <input value={input} onChange={(event) => setInput(event.target.value)} maxLength={500} disabled={busy} placeholder="Ask about Sarthak…" aria-label="Ask Bloop about Sarthak's portfolio" />
          <button type="submit" disabled={busy || !input.trim()}>Send</button>
        </form>
      </section>}

      {hint && <span className={styles.hint} aria-hidden="true">Psst… talk to me! 💬</span>}
      {hearts.map((id) => <span key={id} className={styles.heart} aria-hidden="true">💜</span>)}
      <button ref={petRef} type="button" className={`${styles.petButton} ${blinking ? styles.blinking : ""}`} onClick={clickPet} aria-label={open ? `Pet ${NAME}` : `Open chat with ${NAME}`} aria-expanded={open} aria-controls="bloop-chat">
        <svg className={styles.art} viewBox="0 0 100 100" width="92" height="92" aria-hidden="true">
          <ellipse className={styles.ground} cx="50" cy="95" rx="34" ry="4" />
          <g className={styles.blob}>
            <path className={styles.tail} d="M76 67 C92 77 98 67 94 57 C103 65 99 84 78 80 Z" />
            <path className={styles.body} d="M26 37 L24 12 L43 27 Q50 24 57 27 L76 12 L74 38 C81 46 84 57 83 69 C82 85 69 91 50 91 C31 91 18 85 17 69 C16 56 19 45 26 37 Z" />
            <path className={styles.innerEar} d="M28 19 L30 35 L40 28 Z M72 19 L70 35 L60 28 Z" />
            <path className={styles.highlight} d="M23 52 Q18 66 25 76" />
            <ellipse className={styles.foot} cx="36" cy="90" rx="9" ry="5" />
            <ellipse className={styles.foot} cx="64" cy="90" rx="9" ry="5" />
            <ellipse className={styles.eye} cx="39" cy="58" rx="10" ry="12" />
            <ellipse className={styles.eye} cx="65" cy="58" rx="10" ry="12" />
            <g ref={leftPupil}>
              <ellipse className={styles.pupil} cx="41" cy="59" rx="5.5" ry="7" />
              <circle className={styles.sparkle} cx="39" cy="55" r="2.3" />
              <circle className={styles.sparkle} cx="44" cy="61" r="1" />
            </g>
            <g ref={rightPupil}>
              <ellipse className={styles.pupil} cx="63" cy="59" rx="5.5" ry="7" />
              <circle className={styles.sparkle} cx="61" cy="55" r="2.3" />
              <circle className={styles.sparkle} cx="66" cy="61" r="1" />
            </g>
            <rect className={styles.eyelid} x="29" y="45" width="20" height="0" rx="5" />
            <rect className={styles.eyelid} x="55" y="45" width="20" height="0" rx="5" />
            <ellipse className={styles.blush} cx="25" cy="76" rx="6" ry="3.5" />
            <ellipse className={styles.blush} cx="77" cy="76" rx="6" ry="3.5" />
            <path className={styles.mouth} d={mouth} />
          </g>
        </svg>
      </button>
    </aside>
  );
}
