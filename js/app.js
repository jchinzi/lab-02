'use strict';

$.ajax('data/page-1.json', {method: "GET", dataType: "JSON"})
  .then ( hornData => {
    hornData.forEach(objectInDataArray => {
      new HornedCreature(objectInDataArray).creatureCreator();
    });
  }).then(() => {hornArrayPageOne.forEach(horn => {
    $('main').append(horn.creatureCreator());
  });
  });

const listItems = [];
const hornArrayPageOne = [];

function HornedCreature(obj) {
  this.image = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  hornArrayPageOne.push(this);
  this.dropdownFill();
}

HornedCreature.prototype.creatureCreator = function(){
  let template = $('#hornTemplate').html();
  let html = Mustache.render(template, this);
  return html;
};

HornedCreature.prototype.dropdownFill = function(){
  if (listItems.includes(this.keyword) === false) {
    const $newFilter = $(`<option>${this.keyword}</option>`);
    $('select').append($newFilter);
    listItems.push(this.keyword);
  }
};

$('select').on('change', hornSelect);

function hornSelect() {
  let selectedHorn = $(this).val();
  console.log('this is the selection ' + selectedHorn);
  $('section').hide();
  $(`.${selectedHorn}`).show(); // thanks to Matt Herriges for the assist.
}

$('form').on('change', animalSort);
function animalSort() {
  let selectedSort = $("input[name='sortOptions']:checked").val();
  console.log('here is array before' + hornArrayPageOne);
  if (selectedSort === 'Name') {
    hornArrayPageOne.sort((a, b) => {
      console.log(a);
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
    });
  }
  else if (selectedSort === 'Horns') {
    hornArrayPageOne.sort((a, b) => {
      if (a.horns > b.horns) {
        return 1;
      }
      else if (a.horns < b.horns) {
        return -1;
      }
    });
  }
  $('main').empty();
  return hornArrayPageOne.forEach((data) => {
    $('main').append(data.creatureCreator());
  });
}
