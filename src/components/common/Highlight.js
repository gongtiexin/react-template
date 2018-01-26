import React from "react";

export default function highlight(text, keyword) {
  const reg = new RegExp(keyword, "gi");
  const match = text.match(reg);
  if (!match) {
    return null;
  }
  return (
    <span>
      {text
        .split(reg)
        .map(
          (fragment, i) =>
            i > 0
              ? [<em className="highlight">{match[0]}</em>, fragment]
              : fragment
        )}
    </span>
  );
}
