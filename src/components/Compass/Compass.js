export default class Compass {
  /**
   * 函数功能简述
   *
   * @param    {document}   ctx       Canvas绘图环境
   * @param    {number}     x         罗盘中心点x坐标
   * @param    {number}     y         罗盘中心点y坐标
   * @param    {number}     r1        罗盘外圆半径
   * @param    {number}     r2        罗盘内圆半径
   * @param    {number}     r3        罗盘中心圆半径
   * @param    {string}     color     颜色
   * @param    {number}     width     线宽
   * @return   void
   *
   * @date     18-4-8
   * @author   gongtiexin
   */
  drawCompass = (ctx, x, y, r1, r2, r3, color = "#000", width = 1) => {
    // 圆
    const circles = [
      {
        r: r1,
      },
      {
        r: r2,
      },
      {
        r: r3,
        width$: 15,
      },
    ];
    circles.forEach(({ r, width$ = width }) =>
      this.drawCircle(ctx, x, y, r, color, width$)
    );
    // 虚线
    const dashLines = [
      {
        angle: 0,
        type: "solid",
      },
      {
        angle: Math.PI / 4,
        type: "solid",
      },
      {
        angle: Math.PI / 2,
        type: "solid",
      },
      {
        angle: Math.PI / 4 * 3,
        type: "solid",
      },
      {
        angle: Math.PI / 8,
        type: "dash",
      },
      {
        angle: Math.PI / 8 * 3,
        type: "dash",
      },
      {
        angle: Math.PI / 8 * 5,
        type: "dash",
      },
      {
        angle: Math.PI / 8 * 7,
        type: "dash",
      },
    ];
    dashLines.forEach(({ angle, type }) =>
      this.drawScale(ctx, x, y, angle, r1, type, color, width)
    );
    ctx.closePath();
  };

  /**
   * 函数功能简述
   *
   * @param    {document}   ctx       Canvas绘图环境
   * @param    {number}     x         圆心x坐标
   * @param    {number}     y         圆心y坐标
   * @param    {number}     r         半径
   * @param    {string}     color     颜色
   * @param    {number}     width     线宽
   * @return   void
   *
   * @date     18-4-8
   * @author   gongtiexin
   */
  drawCircle = (ctx, x, y, r, color = "#000", width = 1) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
  };

  drawScale = (ctx, x, y, angle, radius, type = "solid", color, width) => {
    switch (type) {
      case "solid": {
        this.drawSolidLine(
          ctx,
          x + Math.cos(angle) * radius,
          y + Math.sin(angle) * radius,
          x + Math.cos(angle + Math.PI) * radius,
          y + Math.sin(angle + Math.PI) * radius,
          color,
          width
        );
        break;
      }
      case "dash": {
        this.drawDashLine(
          ctx,
          x + Math.cos(angle) * radius,
          y + Math.sin(angle) * radius,
          x + Math.cos(angle + Math.PI) * radius,
          y + Math.sin(angle + Math.PI) * radius,
          color,
          width
        );
        break;
      }
      default:
        break;
    }
  };

  /**
   * 求斜线长度
   *
   * @param    {number}  x     x长度
   * @param    {number}  y     y长度
   * @return   {number}        斜线长度
   *
   * @date     18-4-8
   * @author   gongtiexin
   */
  getBeveling = (x, y) => Math.sqrt(x ** 2 + y ** 2);

  /**
   * 画实线
   *
   * @param    {document}   ctx       Canvas绘图环境
   * @param    {number}     x1        起点x坐标
   * @param    {number}     y1        起点y坐标
   * @param    {number}     x2        终点x坐标
   * @param    {number}     y2        终点y坐标
   * @param    {string}     color     颜色
   * @param    {number}     width     线宽
   * @param    {number}     dashLen   虚线间隔
   * @return   void
   *
   * @date     18-4-8
   * @author   gongtiexin
   */
  drawDashLine = (
    ctx,
    x1,
    y1,
    x2,
    y2,
    color = "#000",
    width = 1,
    dashLen = 5
  ) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    // 得到斜边的总长度
    const beveling = this.getBeveling(x2 - x1, y2 - y1);
    // 计算有多少个线段
    const num = Math.floor(beveling / dashLen);

    for (let i = 0; i < num; i += 1) {
      ctx[i % 2 === 0 ? "moveTo" : "lineTo"](
        x1 + (x2 - x1) / num * i,
        y1 + (y2 - y1) / num * i
      );
    }
    ctx.stroke();
  };

  /**
   * 函数功能简述
   *
   * @param    {document}   ctx       Canvas绘图环境
   * @param    {number}     x1        起点x坐标
   * @param    {number}     y1        起点y坐标
   * @param    {number}     x2        终点x坐标
   * @param    {number}     y2        终点y坐标
   * @param    {string}     color     颜色
   * @param    {number}     width     线宽
   * @return   void
   *
   * @date     18-4-8
   * @author   gongtiexin
   */
  drawSolidLine = (ctx, x1, y1, x2, y2, color = "#000", width = 1) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };
}
