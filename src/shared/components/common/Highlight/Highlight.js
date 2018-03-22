/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       高亮
 * */

import React, { Fragment } from "react";
import shortid from "shortid";

export default function Highlight(text, keyword) {
  const reg = new RegExp(keyword, "gi");
  const match = text.match(reg);
  if (!match) {
    return <Fragment />;
  }
  return (
    <span>
      {text.split(reg).map(
        (fragment, i) =>
          i > 0 ? (
            <Fragment key={shortid.generate()}>
              <em className="fe-highlight">{match[0]}</em>
              {fragment}
            </Fragment>
          ) : (
            fragment
          )
      )}
    </span>
  );
}
