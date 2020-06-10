'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var GAP = 5;
var FONT_GAP = 20;
var FONT_COLOR = '#000';
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;
var BAR_COLOR_PRIMARY = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getColor = function (player) {
  var barColorSecondary = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
  return player === 'Вы' ? BAR_COLOR_PRIMARY : barColorSecondary;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + 2 * GAP, CLOUD_Y + 2 * GAP, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  ctx.fillStyle = FONT_COLOR;

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + 2 * FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP + BAR_GAP * (i + 1) + BAR_WIDTH * i, CLOUD_Y + 2 * GAP + 3 * FONT_GAP + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime));
    ctx.fillText(players[i], CLOUD_X + GAP + BAR_GAP * (i + 1) + BAR_WIDTH * i, CLOUD_Y + 5 * FONT_GAP + BAR_HEIGHT);
    ctx.fillStyle = getColor(players[i]);
    ctx.fillRect(CLOUD_X + GAP + BAR_GAP * (i + 1) + BAR_WIDTH * i, CLOUD_Y + 2 * GAP + 4 * FONT_GAP + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime), BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
};
