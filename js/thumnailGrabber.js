var addButton = function(){
    a = document.getElementsByClassName("ytp-right-controls")[0];
    b = document.createElement("button");

    b.classList.add("playerButton");
    b.classList.add("ytp-button");
    b.id = "grabThumbnail";
    b.title = "Get thumbnail of this video";
    b.draggable = false;

    img = document.createElement("img");
    img.src = chrome.runtime.getURL("/icon/icon256px.png");
    img.classList.add("thumbGrabImage");

    b.appendChild(img);
    b.addEventListener("click", ()=>{
        if(document.getElementById("thumbnailImg") === null) {
            let id = document.URL.split('=')[1];
            thumbnailImg = document.createElement("img");
            thumbnailImg.src = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
            thumbnailImg.id = "thumbnailImg";
            infBlock = document.getElementById("info");
            infBlock.appendChild(thumbnailImg);
        }
        else {
            thumbnailImg = document.getElementById("thumbnailImg");
            thumbnailImg.remove();
        }
    });

    a.insertBefore(b, a.firstChild);
}();