/**
 * 已知点A(x, y), 求到原点的角度
 *
 * @param    {number}  x         A点x坐标
 * @param    {number}  y         A点y坐标
 * @return   {number}            真实角度
 *
 * @date     18-4-9
 * @author   gongtiexin
 */
const getAtanAngle = (x, y) => {
  let angle = Math.atan(y / x);
  if (x === 0 && y > 0) {
    angle = Math.PI * 0.5;
  } else if (x === 0 && y < 0) {
    angle = Math.PI * 1.5;
  } else if (x >= 0 && y === 0) {
    angle = 0;
  } else if (y === 0 && x <= 0) {
    angle = Math.PI;
  } else if ((x < 0 && y > 0) || (x < 0 && y < 0)) {
    angle += Math.PI;
  } else if (x > 0 && y <= 0) {
    angle += Math.PI * 2;
  }
  if (angle > Math.PI) {
    angle -= Math.PI * 2;
  }
  return angle;
};

/**
 * 已知点A(x2, y2), B(x1, y1),直线AB,求过A点并且垂直于已知直线的另一个直线到A点距离为r的两点坐标
 *
 * @param    {number}  x1     B点x坐标
 * @param    {number}  y1     B点y坐标
 * @param    {number}  x2     A点x坐标
 * @param    {number}  y2     A点y坐标
 * @param    {number}  width  间距
 * @param    {string}  color  颜色
 * @return   {array}          两点坐标
 *
 * @date     18-4-9
 * @author   gongtiexin
 */
const getPerpendicular = (
  x1 = 0,
  y1 = 0,
  x2,
  y2,
  width = 1,
  color = "#000"
) => {
  if (x1 === x2) {
    return [
      {
        x: x2 + width,
        y: y2,
        color,
        angle: getAtanAngle(x2 + width, y2),
        kAngle: getAtanAngle(x2, y2),
        k: Infinity,
      },
      {
        x: x2 - width,
        y: y2,
        color,
        angle: getAtanAngle(x2 - width, y2),
        kAngle: getAtanAngle(x2, y2),
        k: Infinity,
      },
    ];
  }
  if (y1 === y2) {
    return [
      {
        x: x2,
        y: y2 + width,
        color,
        angle: getAtanAngle(x2, y2 + width),
        kAngle: getAtanAngle(x2, y2),
        k: 0,
      },
      {
        x: x2,
        y: y2 - width,
        color,
        angle: getAtanAngle(x2, y2 - width),
        kAngle: getAtanAngle(x2, y2),
        k: 0,
      },
    ];
  }
  // 原直线
  const k1 = (y1 - y2) / (x1 - x2);
  const b1 = y1 - k1 * x1;
  // 垂线
  const k2 = -(x1 - x2) / (y1 - y2);
  const b2 = y2 - k2 * x2;

  const m1 = (width * Math.sqrt(1 + k1 ** 2) - b2 + b1) / (k2 - k1);
  const n1 = k2 * m1 + b2;
  const m2 = (-width * Math.sqrt(1 + k1 ** 2) - b2 + b1) / (k2 - k1);
  const n2 = k2 * m2 + b2;
  const angle1 = getAtanAngle(m1, n1);
  const angle2 = getAtanAngle(m2, n2);
  const kAngle = getAtanAngle(x2, y2);

  return [
    {
      x: m1,
      y: n1,
      angle: angle1,
      kAngle,
      color,
      k: k1,
    },
    {
      x: m2,
      y: n2,
      angle: angle2,
      kAngle,
      color,
      k: k1,
    },
  ];
};

/**
 * 根据A, B两点求控制点坐标
 *
 * @param    {number}  x1         A点x坐标
 * @param    {number}  y1         A点y坐标
 * @param    {number}  k1         斜率
 * @param    {number}  x2         B点x坐标
 * @param    {number}  y2         B点y坐标
 * @param    {number}  k2         斜率
 * @return   {{x: number, y: number}}
 *
 * @date     18-4-9
 * @author   gongtiexin
 */
const getControlPoint = (x1, y1, k1, x2, y2, k2) => {
  if (k1 === k2) {
    return { x: x2, y: y2 };
  }
  if (k1 === Infinity) {
    return { x: x1, y: k2 * x1 + (y2 - k2 * x2) };
  }
  if (k2 === Infinity) {
    return { x: x2, y: k1 * x2 + (y1 - k1 * x1) };
  }
  const b1 = y1 - k1 * x1;
  const b2 = y2 - k2 * x2;
  const x = (b2 - b1) / (k1 - k2);
  const y = k2 * x + b2;
  return { x, y };
};

export { getPerpendicular, getControlPoint };
