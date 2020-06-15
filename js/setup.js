'use strict';

var QUANTITY_OF_WIZARDS = 4;

var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var setupSimilarList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content;
var wizardItem = wizardTemplate.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var firstNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var lastNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var getRandomIntegerValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getMassiveDatabase = function () {
  var massiveDatabase = [];
  for (var i = 0; i < QUANTITY_OF_WIZARDS; i++) {
    var wizard = {
      name: firstNames[getRandomIntegerValue(0, firstNames.length - 1)] + ' ' + lastNames[getRandomIntegerValue(0, lastNames.length - 1)],
      coatColor: coatColors[getRandomIntegerValue(0, coatColors.length - 1)],
      eyesColor: eyesColors[getRandomIntegerValue(0, eyesColors.length - 1)]
    };
    massiveDatabase.push(wizard);
  }
  return massiveDatabase;
};

var createWizard = function (data) {
  var wizard = wizardItem.cloneNode(true);
  var wizardName = wizard.querySelector('.setup-similar-label');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  wizardName.textContent = data.name;
  wizardCoat.style = 'fill: ' + data.coatColor + ';';
  wizardEyes.style = 'fill: ' + data.eyesColor + ';';
  return wizard;
};

var addWizard = function (newWizard) {
  fragment.appendChild(newWizard);
};

var database = getMassiveDatabase();

for (var i = 0; i < database.length; i++) {
  var sameWizard = createWizard(database[i]);
  addWizard(sameWizard);
}

setupSimilarList.appendChild(fragment);

setup.classList.remove('hidden');
setupSimilar.classList.remove('hidden');
