'use strict';
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const FONT_GAP = 20;
const BAR_MAX_HEIGHT = 150;
const BAR_WIDTH = 40;
const BAR_GAP = BAR_WIDTH * 2 + GAP;
const FIRST_BAR_X = CLOUD_X + BAR_WIDTH;
const FIRST_BAR_Y = CLOUD_Y + CLOUD_HEIGHT - GAP;
const Font = {
  SIZE: `16px`,
  FAMILY: `PT Mono`
};

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderText = function (ctx, text, x, y, font, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.font = `${font.SIZE} ${font.FAMILY}`;
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return Math.round(maxElement);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);

  renderText(ctx, `Ура вы победили!`, CLOUD_X + FONT_GAP, CLOUD_Y + GAP + FONT_GAP, Font, `#000`);
  renderText(ctx, `Список результатов:`, CLOUD_X + FONT_GAP, CLOUD_Y + GAP + FONT_GAP * 2, Font, `#000`);

  ctx.fillStyle = `hsl(0, 100%, 50%)`;
  let maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    let barHeight = BAR_MAX_HEIGHT * Math.round(times[i]) / maxTime;
    let randomSat = Math.round(Math.random() * 100);
    let barColor = `hsl(240, ${randomSat}%, 20%)`;
    if (names[i] === `Вы`) {
      barColor = `hsl(0, 100%, 50%)`;
    }
    renderText(ctx, names[i], FIRST_BAR_X + BAR_GAP * i, FIRST_BAR_Y, Font, `#000`);
    ctx.fillStyle = barColor;
    ctx.fillRect(FIRST_BAR_X + BAR_GAP * i, FIRST_BAR_Y - FONT_GAP, BAR_WIDTH, -barHeight);
    renderText(ctx, Math.round(times[i]), FIRST_BAR_X + BAR_GAP * i, FIRST_BAR_Y - FONT_GAP - barHeight - GAP, Font, `#000`);
  }

};
