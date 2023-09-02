// console.log(handTrack);

const video = document.getElementById("myVideo");
const canvas = document.getElementById("myCanvas");

let model;

const options = {
    flipHorizontal: false,
    maxNumBoxes: 3,
    scoreTHreshold: 0.7,
};

let context = canvas.getContext("2d");

handTrack.load(options).then(function(modelData){
    model = modelData;
    console.log(model);

    // start web camera
    handTrack.startVideo(video).then(function(status){
        if(status){
            console.log(status);
            startDetection();
        } else {
            console.log("failed");
        }
    });
});

function startDetection(){
    model.detect(video).then((prediction) => {
        model.renderPredictions(prediction, canvas, context, video);
    
        requestAnimationFrame(startDetection);
    })
};