function dropDown() {

    var classElement = document.getElementById("iconDrop").className;
    if(classElement.indexOf('glyphicon-chevron-up') !== -1){
      document.getElementById("iconDrop").className = "glyphicon glyphicon-chevron-down pull-right";
      document.getElementById('bodyTable').style.display = 'none';
    }
    else {
      document.getElementById("iconDrop").className = "glyphicon glyphicon-chevron-up pull-right";
      document.getElementById('bodyTable').removeAttribute("style");
    }

    // document.getElementById('bodyTable').style.display = 'none';
}
