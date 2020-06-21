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

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupNameField = setup.querySelector('.setup-user-name');
var setupPlayer = setup.querySelector('.setup-player');
var setupWizardCoat = setup.querySelector('.setup-wizard-wrap .wizard-coat');
var setupWizardCoatField = setup.querySelector('input[name = "coat-color"]');
var setupWizardEyes = setup.querySelector('.setup-wizard-wrap .wizard-eyes');
var setupWizardEyesField = setup.querySelector('input[name = "eyes-color"]');
var setupFireball = setup.querySelector('.setup-fireball');
var setupFireballField = setup.querySelector('input[name = "fireball-color"]');
var setupClose = setup.querySelector('.setup-close');
var setupSimilar = document.querySelector('.setup-similar');
var setupSimilarList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content;
var wizardItem = wizardTemplate.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var getRandomIntegerValue = function (max) {
  return Math.floor(Math.random() * (max + 1));
};

var getRandomMassiveItem = function (arr) {
  return arr[getRandomIntegerValue(arr.length - 1)];
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupPlayer.addEventListener('click', getNewColor);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setupPlayer.removeEventListener('click', getNewColor);
};

var getMassiveDatabase = function () {
  var massiveDatabase = [];
  for (var i = 0; i < QUANTITY_OF_WIZARDS; i++) {
    var wizard = {
      name: getRandomMassiveItem(FIRST_NAMES) + ' ' + getRandomMassiveItem(LAST_NAMES),
      coatColor: getRandomMassiveItem(COAT_COLORS),
      eyesColor: getRandomMassiveItem(EYES_COLORS)
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

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

setupNameField.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

setupNameField.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

var getNewColor = function (evt) {
  if (evt.target.matches('.' + setupWizardCoat.getAttribute('class'))) {
    setupWizardCoat.style.fill = getRandomMassiveItem(COAT_COLORS);
    setupWizardCoatField.value = setupWizardCoat.style.fill;
  }
  if (evt.target.matches('.' + setupWizardEyes.getAttribute('class'))) {
    setupWizardEyes.style.fill = getRandomMassiveItem(EYES_COLORS);
    setupWizardEyesField.value = setupWizardEyes.style.fill;
  }
  if (evt.target.matches('.' + setupFireball.getAttribute('class'))) {
    var randomColor = getRandomMassiveItem(FIREBALL_COLORS);
    setupFireball.setAttribute('style', 'background-color: ' + randomColor);
    setupFireballField.setAttribute('value', randomColor);
  }
};

for (var i = 0; i < database.length; i++) {
  var sameWizard = createWizard(database[i]);
  addWizard(sameWizard, fragment);
}

setupSimilarList.appendChild(fragment);

setupSimilar.classList.remove('hidden');
