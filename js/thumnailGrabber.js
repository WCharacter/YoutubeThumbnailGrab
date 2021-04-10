var addButton = function(){
    controls = document.getElementsByClassName("ytp-right-controls")[0];  

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
            
            maxRes = document.createElement("img");
            maxRes.src = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
            maxRes.id = "maxrRes";
            maxRes.style = "display: block;";

            defaultRes = document.createElement("img");
            defaultRes.src = `https://img.youtube.com/vi/${id}/default.jpg`;
            defaultRes.id = "defaultRes";
            defaultRes.style = "display: none;";

            mediumRes = document.createElement("img");
            mediumRes.src = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
            mediumRes.id = "mediumRes";
            mediumRes.style = "display: none;";
            
            standardRes = document.createElement("img");
            standardRes.src = `https://img.youtube.com/vi/${id}/sddefault.jpg`;
            standardRes.id = "mediumRes";
            standardRes.style = "display: none;";

            highRes = document.createElement("img");
            highRes.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
            highRes.id = "highRes";
            highRes.style = "display: none;";

            images = [maxRes, defaultRes, mediumRes, standardRes, highRes];

            maxResBtn = document.createElement("button");
            maxResBtn.id = "maxResBtn";
            maxResBtn.innerText = "Max resolution";
            maxResBtn.addEventListener("click", () => {
                for(var i = 0; i < images.length; i++){
                    images[i].style = "display: none;";
                }
                maxRes.style = "display: block;";
            });

            defaultResBtn = document.createElement("button");  
            defaultResBtn.id = "defaultResBtn";
            defaultResBtn.innerText = "Default resolution";
            defaultResBtn.addEventListener("click", () => {
                for(var i = 0; i < images.length; i++){
                    images[i].style = "display: none;";
                }
                defaultRes.style = "display: block;";
            });
            
            mediumResBtn = document.createElement("button");
            mediumResBtn.id = "mediumResBtn";
            mediumResBtn.innerText = "Medium resolution";
            mediumResBtn.addEventListener("click", () => {
                for(var i = 0; i < images.length; i++){
                    images[i].style = "display: none;";
                }
                mediumRes.style = "display: block;";
            });

            standardResBtn = document.createElement("button");
            standardResBtn.id = "standardResBtn";
            standardResBtn.innerText = "Standard resolution";
            standardResBtn.addEventListener("click", () => {
                for(var i = 0; i < images.length; i++){
                    images[i].style = "display: none;";
                }
                standardRes.style = "display: block;";
            });

            highResBtn = document.createElement("button");
            highResBtn.id = "highResBtn";
            highResBtn.innerText = "High resolution";
            highResBtn.addEventListener("click", () => {
                for(var i = 0; i < images.length; i++){
                    images[i].style = "display: none;";
                }
                highRes.style = "display: block;";
            });
            
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