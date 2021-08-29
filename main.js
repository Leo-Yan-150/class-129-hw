song1 = "";
song2 = "";
lwx = 0;
lwy = 0;
rwx = 0;
rwy = 0;
scoreLeftWrist = 0;
song1play = "false";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("moosic.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill(255,0,0);
    stroke(0);

    song1play = song1.isPlaying();

    if(scoreLeftWrist > 0.2){

        ellipse(lwx, lwy, 50);

        song2.stop();

        if(song1play = "false"){

            song1.stop();
            song1.play();

            document.getElementById("song_name").innerHTML = "Song playing - vibing in the 20s"

        }
    }
}

function modelLoaded(){
    console.log("model is officially loaded");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score left wrist = " + scoreLeftWrist + ".");

        lwx = results[0].pose.leftWrist.x;
        lwy = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + lwx + ". left wrist y = " + lwy + ".");

        rwx = results[0].pose.rightWrist.x;
        rwy = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + rwx + ". Right wrist y = " + rwy + ".");
    }
}