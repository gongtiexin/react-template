export default class Arrow {
  /**
   * 绘制箭头头部
   *
   * @param    {document}   ctx     Canvas绘图环境
   * @param    {number}     x0      箭头顶点x坐标
   * @param    {number}     y0      箭头顶点y坐标
   * @param    {number}     x1      箭头底部点x坐标
   * @param    {number}     y1      箭头底部点y坐标
   * @param    {number}     x2      箭头底部点x坐标
   * @param    {number}     y2      箭头底部点y坐标
   * @param    {string}     style   箭头类型
   * @param    {string}     color   箭头颜色
   * @param    {number}     width   箭头宽度
   * @return   void
   *
   * @date     18-4-3
   * @author   gongtiexin
   */
  drawHead = (ctx, x0, y0, x1, y1, x2, y2, style, color, width) => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);

    switch (style) {
      case 0: {
        const backdist = Math.sqrt(
          (x2 - x0) * (x2 - x0) + (y2 - y0) * (y2 - y0)
        );
        ctx.arcTo(x1, y1, x0, y0, 0.55 * backdist);
        ctx.fill();
        break;
      }
      case 1:
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x0, y0);
        ctx.fill();
        break;
      case 2:
        ctx.stroke();
        break;
      case 3: {
        const cpx = (x0 + x1 + x2) / 3;
        const cpy = (y0 + y1 + y2) / 3;
        ctx.quadraticCurveTo(cpx, cpy, x0, y0);
        ctx.fill();
        break;
      }
      case 4: {
        let cp1x;
        let cp1y;
        let cp2x;
        let cp2y;
        let backdist;
        const shiftamt = 5;
        if (x2 === x0) {
          backdist = y2 - y0;
          cp1x = (x1 + x0) / 2;
          cp2x = (x1 + x0) / 2;
          cp1y = y1 + backdist / shiftamt;
          cp2y = y1 - backdist / shiftamt;
        } else {
          backdist = Math.sqrt((x2 - x0) * (x2 - x0) + (y2 - y0) * (y2 - y0));
          const xback = (x0 + x2) / 2;
          const yback = (y0 + y2) / 2;
          const xmid = (xback + x1) / 2;
          const ymid = (yback + y1) / 2;
          const m = (y2 - y0) / (x2 - x0);
          const dx = backdist / (2 * Math.sqrt(m * m + 1)) / shiftamt;
          const dy = m * dx;
          cp1x = xmid - dx;
          cp1y = ymid - dy;
          cp2x = xmid + dx;
          cp2y = ymid + dy;
        }
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x0, y0);
        ctx.fill();
        break;
      }
      default:
        break;
    }
    ctx.restore();
  };

  /**
   * 绘制箭头
   *
   * @param    {document}   ctx       Canvas绘图环境
   * @param    {number}     x1        起点x坐标
   * @param    {number}     y1        起点y坐标
   * @param    {number}     x2        终点x坐标
   * @param    {number}     y2        终点y坐标
   * @param    {number}     style     箭头头部样式
   * @param    {number}     which     箭头方向
   * @param    {number}     angle     箭头角度
   * @param    {number}     d         箭头长度
   * @param    {string}     color     箭头颜色
   * @param    {number}     width     箭头线宽度
   * @return   void
   *
   * @date     18-4-3
   * @author   gongtiexin
   */
  drawArrow = (
    ctx,
    x1,
    y1,
    x2,
    y2,
    style = 3,
    which = 1,
    angle = Math.PI / 9,
    d = 10,
    color = "#000",
    width = 1
  ) => {
    const toDrawHead = typeof style !== "function" ? this.drawHead : style;
    const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const ratio = (dist - d / 3) / dist;
    let tox = 0;
    let toy = 0;
    let fromY = 0;
    let fromX = 0;
    if (which & 1) {
      tox = Math.round(x1 + (x2 - x1) * ratio);
      toy = Math.round(y1 + (y2 - y1) * ratio);
    } else {
      tox = x2;
      toy = y2;
    }

    if (which & 2) {
      fromX = x1 + (x2 - x1) * (1 - ratio);
      fromY = y1 + (y2 - y1) * (1 - ratio);
    } else {
      fromX = x1;
      fromY = y1;
    }

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(tox, toy);
    ctx.stroke();

    const lineangle = Math.atan2(y2 - y1, x2 - x1);
    const h = Math.abs(d / Math.cos(angle));
    if (which & 1) {
      const angle1 = lineangle + Math.PI + angle;
      const topx = x2 + Math.cos(angle1) * h;
      const topy = y2 + Math.sin(angle1) * h;
      const angle2 = lineangle + Math.PI - angle;
      const botx = x2 + Math.cos(angle2) * h;
      const boty = y2 + Math.sin(angle2) * h;
      toDrawHead(ctx, topx, topy, x2, y2, botx, boty, style, color, width);
    }

    if (which & 2) {
      const angle1 = lineangle + angle;
      const topx = x1 + Math.cos(angle1) * h;
      const topy = y1 + Math.sin(angle1) * h;
      const angle2 = lineangle - angle;
      const botx = x1 + Math.cos(angle2) * h;
      const boty = y1 + Math.sin(angle2) * h;
      toDrawHead(ctx, topx, topy, x1, y1, botx, boty, style, color, width);
    }
  };

  /**
   * 绘制2次贝塞尔曲线
   *
   * @param    {document}   ctx       Canvas绘图环境
   * @param    {number}     x1        起始点x坐标
   * @param    {number}     y1        起始点y坐标
   * @param    {number}     x2        终点x坐标
   * @param    {number}     y2        终点x坐标
   * @param    {number}     x3        控制点x坐标
   * @param    {number}     y3        控制点x坐标
   * @param    {string}     color     线颜色
   * @param    {number}     width     线宽度
   * @return   void
   *
   * @date     18-4-3
   * @author   gongtiexin
   */
  drawCurve = (ctx, x1, y1, x2, y2, x3, y3, color = "#000", width = 5) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(x3, y3, x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  };
}
