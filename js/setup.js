'use strict';

var QUANTITY_OF_WIZARDS = 4;

var FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var setupSimilarList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content;
var wizardItem = wizardTemplate.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var getRandomIntegerValue = function (max) {
  return Math.floor(Math.random() * (max + 1));
};

var getMassiveDatabase = function () {
  var massiveDatabase = [];
  for (var i = 0; i < QUANTITY_OF_WIZARDS; i++) {
    var wizard = {
      name: FIRST_NAMES[getRandomIntegerValue(FIRST_NAMES.length - 1)] + ' ' + LAST_NAMES[getRandomIntegerValue(LAST_NAMES.length - 1)],
      coatColor: COAT_COLORS[getRandomIntegerValue(COAT_COLORS.length - 1)],
      eyesColor: EYES_COLORS[getRandomIntegerValue(EYES_COLORS.length - 1)]
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
  wizardCoat.style.fill = data.coatColor;
  wizardEyes.style.fill = data.eyesColor;
  return wizard;
};

var addWizard = function (newWizard, sameFragment) {
  sameFragment.appendChild(newWizard);
};

var database = getMassiveDatabase();

for (var i = 0; i < database.length; i++) {
  var sameWizard = createWizard(database[i]);
  addWizard(sameWizard, fragment);
}

setupSimilarList.appendChild(fragment);

setup.classList.remove('hidden');
setupSimilar.classList.remove('hidden');
