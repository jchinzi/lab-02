'use strict';

$.ajax('data/page-2.json', {method: "GET", dataType: "JSON"}) // swapped in data/page-2.json and it all started working.
  .then ( hornData => {
    hornData.forEach(objectInDataArray => {
      new HornedCreature(objectInDataArray).creatureCreator();
    });
  }).then(() => {hornArrayPageTwo.forEach(horn => {
    $('main').append(horn.creatureCreator());
  });
  }).then(() => {$('#name').attr("checked", "checked");
    animalSort();
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
  }
};

$('select').on('change ', hornSelect);

function hornSelect() {
  let selectedHorn = $(this).val();
  console.log('this is the selection ' + selectedHorn);
  $('section').hide();
  $(`.${selectedHorn}`).show(); // thanks to Matt Herriges for the assist.
}

$('form').on('change', animalSort);
function animalSort() {
  let selectedSort = $("input[name='sortOptions']:checked").val();
  console.log('here is array before' + hornArrayPageTwo);
  if (selectedSort === 'Name') {
    hornArrayPageTwo.sort((a, b) => {
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
    hornArrayPageTwo.sort((a, b) => {
      if (a.horns > b.horns) {
        return 1;
      }
      else if (a.horns < b.horns) {
        return -1;
      }
    });
  }
  $('main').empty();
  return hornArrayPageTwo.forEach((data) => {
    $('main').append(data.creatureCreator());
  });
}
