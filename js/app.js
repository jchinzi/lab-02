$.ajax('data/page-1.json', {method: "GET", dataType: "JSON"})
  .then ( hornData => {
    hornData.forEach(objectInDataArray => {
      new HornedCreature(objectInDataArray).creatureCreator();
    });
  });

function HornedCreature(obj) {
  this.image = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns; // TODO: Horns, what?
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

/* <section id="photo-template">
<h2>TITLE</h2>
<img src="IMAGE" alt="KEYWORD">
<p>DESCRIPTION</p>
</section> */


// {
//   "image_url": "https://ae01.alicdn.com/kf/HTB18GwSQVXXXXaZaXXXq6xXFXXXh/Animal-Cosplay-Costume-Narwhal-Onesie-Mens-Womens-Cartoon-Whale-Pajamas.jpg",
//   "title": "Narwhal costume",
//   "description": "A woman wearing a blue narwhal costume",
//   "keyword": "narwhal",
//   "horns": 1 TODO: WHERE DOES THIS GO?
// }
