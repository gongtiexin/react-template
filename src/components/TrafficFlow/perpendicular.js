/**
 * 已知点A(x, y), 求到原点的角度
 *
 * @param    {number}  x         A点x坐标
 * @param    {number}  y         A点y坐标
 * @return   number
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
 * @return   *[]
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
 * 根据kAngle求沿直线垂线相对左方向的偏移offset后的坐标
 *
 * @param    {number}  x          坐标x
 * @param    {number}  y          坐标y
 * @param    {number}  kAngle     直线夹角
 * @param    {number}  offset     偏移量
 * @param    {number}  type       偏移方向
 * @return   {{x: number, y: number}}
 *
 * @date     18-4-12
 * @author   gongtiexin
 */
const getOffsetPoint = (x, y, kAngle, offset = 1, type = 0) => ({
  x:
    x +
    Math.sin(kAngle) * offset * (1 - type) -
    Math.sin(kAngle) * offset * type,
  y:
    y -
    Math.cos(kAngle) * offset * (1 - type) +
    Math.cos(kAngle) * offset * type,
});

/**
 * 根据A, B两点求控制点坐标
 *
 * @param    {number}  x1         A点x坐标
 * @param    {number}  y1         A点y坐标
 * @param    {number}  k1         斜率
 * @param    {number}  kAngle1    角度
 * @param    {number}  x2         B点x坐标
 * @param    {number}  y2         B点y坐标
 * @param    {number}  k2         斜率
 * @param    {number}  kAngle2    角度
 * @param    {number}  totalWidth 总长度
 * @param    {number}  lastwidth  剩余长度
 * @param    {number}  offset     偏移量
 * @return   {{x1: number, y1: number, x2: number, y2: number, cpx: number, cpy: number}}
 *
 * @date     18-4-9
 * @author   gongtiexin
 */
const getControlPoint = (
  x1,
  y1,
  k1,
  kAngle1,
  x2,
  y2,
  k2,
  kAngle2,
  totalWidth = 0,
  lastwidth = 0,
  offset = 0
) => {
  const offset$ = lastwidth - totalWidth / 2 - offset / 2;
  const { x: x1$, y: y1$ } = getOffsetPoint(x1, y1, kAngle1, offset$);
  const { x: x2$, y: y2$ } = getOffsetPoint(x2, y2, kAngle2, offset$, 1);
  const point = { x1: x1$, y1: y1$, x2: x2$, y2: y2$ };
  if (k1 === k2) {
    return {
      ...point,
      cpx: x1$,
      cpy: y1$,
    };
  }
  if (k1 === Infinity) {
    return { ...point, cpx: x1$, cpy: k2 * x1$ + (y2$ - k2 * x2$) };
  }
  if (k2 === Infinity) {
    return { ...point, cpx: x2$, cpy: k1 * x2$ + (y1$ - k1 * x1$) };
  }
  const b1 = y1$ - k1 * x1$;
  const b2 = y2$ - k2 * x2$;
  const cpx = (b2 - b1) / (k1 - k2);
  const cpy = k2 * cpx + b2;
  return { ...point, cpx, cpy };
};

/**
 * 已知点A(x1, y1), B(x2, y2), C(x3, y3), 求线段AB, BC夹角 角ABC
 *
 * @param    {number}  x1     坐标
 * @param    {number}  y1     坐标
 * @param    {number}  x2     坐标
 * @param    {number}  y2     坐标
 * @param    {number}  x3     坐标
 * @param    {number}  y3     坐标
 * @return   number
 *
 * @date     18-4-12
 * @author   gongtiexin
 */
const getLinesAngle = (x1, y1, x2, y2, x3, y3) => {
  const dsx = x1 - x2;
  const dsy = y1 - y2;
  const dex = x3 - x2;
  const dey = y3 - y2;

  let cosfi = dsx * dex + dsy * dey;
  const norm = (dsx * dsx + dsy * dsy) * (dex * dex + dey * dey);
  cosfi /= Math.sqrt(norm);

  if (cosfi >= 1) return 0;
  if (cosfi <= -1) return Math.PI;
  const fi = Math.acos(cosfi);

  if (180 * fi / Math.PI < 180) {
    return 180 * fi / Math.PI;
  }

  return 360 - 180 * fi / Math.PI;
};

export { getPerpendicular, getControlPoint, getLinesAngle, getOffsetPoint };
