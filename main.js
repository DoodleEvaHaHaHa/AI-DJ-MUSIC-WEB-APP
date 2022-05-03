Peter_Pan = ""
Harry_Potter = "";

rightWrist_x = 0;
rightWrist_y = 0;

leftWrist_x = 0;
leftWrist_y = 0;

scoreleftWrist = 0;
scoreRightWrist = 0;
song_name = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Peter_Pan = loadSound("Peter Pan.mp3");
    Harry_Potter = loadSound("Harry Potter.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_name = Peter_Pan.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.2)
    {
        circle(leftWrist_x,leftWrist_y,20);
        Harry_Potter.stop();
        if(song_name == false)
        {
            Peter_Pan.play();
        }
        else
        {
            console.log("Song Name: Peter Pan Song");
            document.getElementById("song_name").innerHTML = "Song Name: Peter Pan"; 
        }
    }
    if(scoreRightWrist > 0.2)
    {
        circle(rightWrist_x, rightWrist_y, 20);
        Peter_Pan.stop();
        if(song_name == false)
        {
            Harry_Potter.play();
        }
        else{
            console.log("Song Name: Harry Potter Theme Song");
            document.getElementById("song_name").innerHTML = "Song Name: Harry Potter Theme Song";
        }
    }
}

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreleftWrist + "scoreRightWrist = " + scoreRightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}