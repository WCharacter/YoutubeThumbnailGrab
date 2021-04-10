var createButton = function(id, txt, obj, imgs){
	btn = document.createElement("button");
    btn.id = id;
    btn.innerText = txt;
    btn.addEventListener("click", () => {
        for(var i = 0; i < imgs.length; i++){
            imgs[i].style = "display: none;";
        }
        obj.style = "display: block;";
    });
	return btn;
}

var createImg = function(imgId, id, imgType, display){
	img = document.createElement("img");
    img.src = `https://img.youtube.com/vi/${id}/${imgType}`;;
    img.id = imgId;
    img.style = `display: ${display};`;	
	return img;
}

var addButton = function(){
    controls = document.getElementsByClassName("ytp-right-controls")[0];  
	if(controls === undefined) return;
	
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
    b.addEventListener("click", () => {
        thumbBlock = document.getElementById("thumbnailImages");
        if(thumbBlock === null) {
            let id = document.URL.split('=')[1].substr(0,11);

            thumbBlock = document.createElement("div");
            thumbBlock.id = "thumbnailImages";
            
            maxRes = createImg("maxRes", id, "maxresdefault.jpg", "block");
            defaultRes = createImg("defaultRes", id, "default.jpg", "none");
            mediumRes = createImg("mediumRes", id, "mqdefault.jpg", "none");
            standardRes = createImg("standardRes", id, "sddefault.jpg", "none");
            highRes = createImg("highRes", id, "hqdefault.jpg", "none");

            images = [maxRes, defaultRes, mediumRes, standardRes, highRes];

            maxResBtn = createButton("maxResBtn", "Max resolution", maxRes, images);
            defaultResBtn = createButton("defaultResBtn", "Default resolution", defaultRes, images);
            mediumResBtn = createButton("mediumResBtn", "Medium resolution", mediumRes, images);
            standardResBtn = createButton("standardResBtn", "Standard resolution", standardRes, images);
            highResBtn = createButton("highResBtn", "High resolution", highRes, images);           
            
            thumbBlock.appendChild(maxResBtn);
            thumbBlock.appendChild(defaultResBtn);
            thumbBlock.appendChild(mediumResBtn);
            thumbBlock.appendChild(standardResBtn);
            thumbBlock.appendChild(highResBtn);

            for(var i = 0; i < images.length; i++){
                thumbBlock.appendChild(images[i]);
            }

            infBlock = document.getElementById("info");
            infBlock.appendChild(thumbBlock);
        }
        else {
            thumbBlock.remove();
        }
    });

    controls.insertBefore(b, controls.firstChild);
}

// waiting some time before execution
setTimeout(addButton, 1000);


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "removeBlock") {
            thumbBlock = document.getElementById("thumbnailImages");
            if(thumbBlock !== null) {
                thumbBlock.remove();
            }
        }
    }
);