import React, { Fragment } from "react";
import shortid from "shortid";

export default function highlight(text, keyword) {
  const reg = new RegExp(keyword, "gi");
  const match = text.match(reg);
  if (!match) {
    return null;
  }
  return (
    <span>
      {text.split(reg).map(
        (fragment, i) =>
          i > 0 ? (
            <Fragment key={shortid.generate()}>
              <em className="highlight">{match[0]}</em>
              {fragment}
            </Fragment>
          ) : (
            fragment
          )
      )}
    </span>
  );
}
