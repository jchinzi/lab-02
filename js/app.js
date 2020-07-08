$.ajax('data/page-1.json', {method: "GET", dataType: "JSON"})
  .then ( hornData => {
    hornData.forEach(objectInDataArray => {
      new HornedCreature(objectInDataArray).creatureCreator();
    });
  });

const listItems = [];


function HornedCreature(obj) {
  this.image = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns; // TODO: Horns, what?
  this.dropdownFill();
}

HornedCreature.prototype.creatureCreator = function(){
  const creatureTemplate = $('#photo-template').html();
  const $newSection = $(`<section>${creatureTemplate}</section>`); // why backticks?
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image);
  $newSection.find('img').attr('alt', this.keyword);
  $newSection.find('p').text(this.description);
  $('main').append($newSection);
};

HornedCreature.prototype.dropdownFill = function(){
  const dropdown = $('select');
  if (listItems.includes(this.keyword) === false) {
    const $newFilter = $(`<option>${this.keyword}</option>`);
    $('select').append($newFilter);
    listItems.push(this.keyword);
    console.log(listItems);
  }
};

/* <select>
<option value="default">Filter by Keyword</option>
</select> */

// Create a <select> element which contains unique <option> elements extracted dynamically from the JSON file, one for each keyword.
// Use an event handler to respond when the user chooses an option from the select menu. Hide all of the images, then show those whose keyword matches the option chosen.



// {
//   "image_url": "https://ae01.alicdn.com/kf/HTB18GwSQVXXXXaZaXXXq6xXFXXXh/Animal-Cosplay-Costume-Narwhal-Onesie-Mens-Womens-Cartoon-Whale-Pajamas.jpg",
//   "title": "Narwhal costume",
//   "description": "A woman wearing a blue narwhal costume",
//   "keyword": "narwhal",
//   "horns": 1 TODO: WHERE DOES THIS GO?
// }
