"use strict";

let modalClose = document.getElementById("infoClose");

modalClose.addEventListener("click", function () {
  console.log("クリックされました！");
  document.getElementById("fixedInfo").style.display = "none";
});


