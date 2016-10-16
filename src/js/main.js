function dropDown() {
  var logoImg = "./content/images/dropdown-arrow.png";
    const img = document.createElement('img');
    img.src = logoImg;

    document.getElementById('arrowDrop').src = logoImg;

    document.getElementById('bodyTable').style.display = 'none';
}
