'use strict';

$.ajax('data/page-2.json', {method: "GET", dataType: "JSON"}) // swapped in data/page-2.json and it all started working.
  .then ( hornData => {
    hornData.forEach(objectInDataArray => {
      new HornedCreature(objectInDataArray).creatureCreator();
    });
  }).then(() => {hornArrayPageTwo.forEach(horn => {
    $('main').append(horn.creatureCreator());
  });
  });

const listItemPageTwo = [];
const hornArrayPageTwo = [];

function HornedCreature(obj) { // TODO: Wire this back to app.js via script on html page 2.
  this.image = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  hornArrayPageTwo.push(this);
  this.dropdownFill();
}

// HornedCreature.prototype.creatureCreator = function(){
//   const creatureTemplate = $('#photo-template').html();
//   const $newSection = $(`<section>${creatureTemplate}</section>`);
//   $newSection.find('h2').text(this.title);
//   $newSection.find('img').attr('src', this.image);
//   $newSection.find('img').attr('alt', this.keyword);
//   $newSection.find('p').text(this.description);
//   $('main').append($newSection);
// };


HornedCreature.prototype.creatureCreator = function(){
  let template = $('#hornTemplate').html();
  let html = Mustache.render(template, this);
  return html;
};

HornedCreature.prototype.dropdownFill = function(){
  if (listItemPageTwo.includes(this.keyword) === false) {
    const $newFilter = $(`<option>${this.keyword}</option>`);
    $('select').append($newFilter);
    listItemPageTwo.push(this.keyword);
    // console.log(listItemPageTwo);
  }
};

$('select').on('change ', hornSelect);

function hornSelect() {
  let selectedHorn = $(this).val();
  console.log('this is the selection ' + selectedHorn);
  $('section').hide();
  $(`img[alt=${selectedHorn}]`).parent().show(); // thanks to Matt Herriges for the assist.
}
