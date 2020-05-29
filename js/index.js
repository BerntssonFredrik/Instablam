let oldValueBrightness = 0;
let oldValueHue = 0;
let oldValueExposure = 0;
let oldValueSaturation = 0;
let oldValueSepia = 0;

/* Brightness */
let range1 = document.getElementById("range1");
let value1 = document.getElementById("value1");
value1.innerHTML = range1.value;

range1.oninput = function() {
    value1.innerHTML = this.value;
    changeBrightness(range1.value);
};

function changeBrightness(value) {
    Caman("#photo", function() {
        this.brightness(value - oldValueBrightness);
        oldValueBrightness = value;
        this.render();
    });
}

/* Hue */
let range2 = document.getElementById("range2");
let value2 = document.getElementById("value2");
value2.innerHTML = range2.value;

range2.oninput = function() {
    value2.innerHTML = this.value;
    changeHue(range2.value);
};

function changeHue(value) {
    Caman("#photo", function() {
        this.hue(value - oldValueExposure);
        oldValueExposure = value;
        this.render();
    });
}

/* Exposure */
let range3 = document.getElementById("range3");
let value3 = document.getElementById("value3");
value3.innerHTML = range3.value;

range3.oninput = function() {
    value3.innerHTML = this.value;
    changeExposure(range3.value);
};

function changeExposure(value) {
    Caman("#photo", function() {
        this.exposure(value - oldValueExposure);
        oldValueExposure = value;
        this.render();
    });
}

/* Sauration */
let range4 = document.getElementById("range4");
let value4 = document.getElementById("value4");
value4.innerHTML = range4.value;

range4.oninput = function() {
    value4.innerHTML = this.value;
    changeSaturation(range4.value);
};

function changeSaturation(value) {
    Caman("#photo", function() {
        this.saturation(value - oldValueSaturation);
        oldValueSaturation = value;
        this.render();
    });
}

/* Sepia */
let range5 = document.getElementById("range5");
let value5 = document.getElementById("value5");
value5.innerHTML = range5.value;

range5.oninput = function() {
    value5.innerHTML = this.value;
    changeSepia(range5.value);
};

function changeSepia(value) {
    Caman("#photo", function() {
        this.sepia(value - oldValueSepia);
        oldValueSepia = value;
        this.render();
    });
}

document.getElementById("revert").addEventListener("click", function(e) {
    Caman("#photo", function() {
        this.revert();
    });
});

/*  Reset sliders to 0 */
document.getElementById("reset").addEventListener("click", function(e) {
    if (range1.value != 0) {
        range1.value = 0;
        value1.innerHTML = range1.value;
    }
    if (range2.value != 0) {
        range2.value = 0;
        value2.innerHTML = range2.value;
    }
    if (range3.value != 0) {
        range3.value = 0;
        value3.innerHTML = range3.value;
    }
    if (range4.value != 0) {
        range4.value = 0;
        value4.innerHTML = range4.value;
    }
    if (range5.value != 0) {
        range5.value = 0;
        value5.innerHTML = range5.value;
    }
});

/* Download image */
document.getElementById("save").addEventListener("click", () => {
    const downloadElem = document.createElement("a");
    document.body.appendChild(downloadElem);
    downloadElem.style.display = "none";
    downloadElem.download = "savedPicture";

    const canvas = document.querySelector("canvas");

    if (canvas) {
        downloadElem.href = document.getElementById("photo").toDataURL();
        downloadElem.click();
        document.body.removeChild(downloadElem);
    } else {
        downloadElem.href = photo.src;
        downloadElem.click();
        document.body.removeChild(downloadElem);
    }
});

let stream = {};

async function captureImage(stream) {
    const mediaTrack = stream.getVideoTracks()[0];
    document.getElementById("frame").style.display = "inline-block";
    document.getElementById("save").style.display = "block";
    document.getElementById("revert").style.display = "block";
    document.getElementById("inputs").style.display = "flex";
    console.log(mediaTrack);
    const captureImg = new ImageCapture(mediaTrack);
    const photo = await captureImg.takePhoto();
    console.log(photo);
    const imgUrl = URL.createObjectURL(photo);
    console.log(imgUrl);
    document.querySelector("#photo").src = imgUrl;
}

document.getElementById("takePic").addEventListener("click", (event) => {
    captureImage(stream);

    const canvas = document.querySelector("canvas");
    if (canvas) {
        location.reload();
    }
});
async function getMedia() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElem = document.getElementById("camera");
        videoElem.srcObject = stream;
        videoElem.addEventListener("loadedmetadata", () => {
            videoElem.play();
        });
        console.log(stream);
    } catch (error) {
        console.log(error);
    }
}
getMedia();

function registrateServiceWorker() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("../sw.js")
            .then((registration) => {
                console.log("Registered service worker");
                push();
            })
            .catch((error) => console.log("Error with register service worker"));
    }
}

registrateServiceWorker();