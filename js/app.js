'use strict';

$.ajax('data/page-1.json', {method: "GET", dataType: "JSON"})
  .then ( hornData => {
    hornData.forEach(objectInDataArray => {
      new HornedCreature(objectInDataArray).creatureCreator();
    });
  });

const listItems = [];
const hornArrayPageOne = [];

function HornedCreature(obj) {
  this.image = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns; // TODO: Horns, what?
  hornArrayPageOne.push(this);
  this.dropdownFill();
}

// HornedCreature.prototype.creatureCreator = function(){
//   const creatureTemplate = $('#photo-template').html();
//   const $newSection = $(`<section>${creatureTemplate}</section>`); // why backticks?
//   $newSection.find('h2').text(this.title);
//   $newSection.find('img').attr('src', this.image);
//   $newSection.find('img').attr('alt', this.keyword);
//   $newSection.find('p').text(this.description);
//   $('main').append($newSection);
// };

// console.log(hornArrayPageOne);

HornedCreature.prototype.creatureCreator = function(){
  let template = $('#hornTemplate').html();
  let html = Mustache.render(template, this);
  return html;
};

hornArrayPageOne.forEach(horn => {
  $('main').append(horn.creatureCreator());
});

// ==============
// Create the appropriate Mustache template in your HTML with the same <h2>, <img>, and <p> elements as the jQuery template from the prior lab.
// Refactor the method that renders your images to use Mustache instead of making a copy with jQuery.
// ==============


HornedCreature.prototype.dropdownFill = function(){
  if (listItems.includes(this.keyword) === false) {
    const $newFilter = $(`<option>${this.keyword}</option>`);
    $('select').append($newFilter);
    listItems.push(this.keyword);
    // console.log(listItems);
  }
};

$('select').on('change ', hornSelect);

function hornSelect() {
  let selectedHorn = $(this).val();
  console.log('this is the selection ' + selectedHorn);
  $('section').hide();
  $(`img[alt=${selectedHorn}]`).parent().show(); // thanks to Matt Herriges for the assist.
}

