import { useEffect, useState } from "react";

/** Types each word, pauses, deletes it, then moves to the next. */
export function useTypewriter(words: string[], { typeMs = 70, deleteMs = 40, pauseMs = 1600 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];

    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
      return;
    }

    const t = setTimeout(
      () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
      deleting ? deleteMs : typeMs,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typeMs, deleteMs, pauseMs]);

  return text;
}
