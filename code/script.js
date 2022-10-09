let trackOffset, timeFactor, toneShift;
let samples = {};
let duration;
let player = new Tone.Player("./Tracks/1.m4a").toDestination();
(function () {
  
  function playSynth(trackOffset=0, timeFactor=1, toneShift=0) {
    //-----------------------------------------------------------------
    const audio = document.querySelector('#audioOutput');
    // const synth = new Tone.Synth();
 
    
    Tone.loaded().then(() => {
      const actx  = Tone.context;
      const dest  = actx.createMediaStreamDestination();
      const recorder = new MediaRecorder(dest.stream);
      
      console.log(toneShift);
      toneShift = 0;

      player.connect(dest);
      player.toDestination();
      const chunks = [];
      // let time = Tone.now();
      const notes = 'CDEFGAB'.split('').map(n => `${n}4`);
  
      recorder.ondataavailable = evt => chunks.push(evt.data);
      recorder.onstop = evt => {
        let blob = new Blob(chunks, {type: 'audio/mpeg'});
        audio.src = URL.createObjectURL(blob);
        
        const url = URL.createObjectURL(blob);
        const anchor = document.querySelector("a");
        anchor.download = "McTunes.mp3";
        anchor.href = url;
        // anchor.style.display = "block";
        // anchor.click();
      };
    
      Tone.Transport.start();
      
      setTimeout(function(){
          // player.volume.value = 1;
          player.playbackRate = 1 + toneShift;
        player.start(0, trackOffset);
        recorder.start();
      }, 0 * timeFactor);

      setTimeout(function(){
        player.playbackRate = 1.15 + toneShift;
        player.start(0, trackOffset);
      }, 150 * timeFactor);
      
      setTimeout(function(){
        player.playbackRate = 1.3 + toneShift;
        player.start(0, trackOffset);
      }, 500 * timeFactor);
      
      setTimeout(function(){
        player.playbackRate = 1.7 + toneShift;
        player.start(0, trackOffset);
      }, 800 * timeFactor);
      
      setTimeout(function(){
        player.playbackRate = 1.5 + toneShift;
        player.start(0, trackOffset);
        
      }, 1100 * timeFactor);
      
      setTimeout(function(){
        player.playbackRate = 1.5 + toneShift;
        // player.getDefaults()
        // player.stop();
        // setInterval(() => {
        //   player.volume.value -= 10;  
        // }, 30);
        // player.volume.value = 1;
        recorder.stop();
        Tone.Transport.stop();
      }, 2000 * timeFactor);
      
    





      //----------------------------------------------------------------
      
      
    });
    

    // console.log(player.toSeconds());
    
  }
  
function handleFileSelect(file1) {
  //------------------------------------------------------
  
  // var file = evt.target.files[0]; // FileList object
  // console.log(file);
  console.log(file);
  var fileName = document.getElementById("fileName");
  
  // var file1 = evt.target.files[0]; // FileList object
  var file = URL.createObjectURL(file1); 
  fileName.innerHTML = file1.name + "<br/>";
  console.log(file1);
  
  // setAudio(file, note, 'audio_player');
  player = new Tone.Player(file).toDestination(); 
  audioPlayer = document.getElementById('audio_player');
  audioPlayer.src = file;
  
  // console.log(getDuration(file));
  // trackOffsetSlider.setAttribute('max', audioPlayer.duration);
}



  document.querySelector('#inputTag').addEventListener('change', function(){
    
    var file = this.files[0];
    handleFileSelect(file);
    
    var reader = new FileReader();
    reader.onload = function (event) {
        var audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.decodeAudioData(event.target.result, function(buffer) {
            var duration = buffer.duration;
            trackOffsetSlider.setAttribute('max', duration);
        });
    };
    reader.onerror = function (event) {
      trackOffsetSlider.setAttribute('max', 3);;
    };
    reader.readAsArrayBuffer(file);
  }  , false);



  document.querySelector("#playBtton").addEventListener("click", function () {

    playSynth(trackOffset, timeFactor, toneShift);
  });




})();




function dropHandler(ev) {
  console.log('File(s) dropped');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (let i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      
      if (ev.dataTransfer.items[i].kind === 'file') {
        const file1 = ev.dataTransfer.items[i].getAsFile();
        var fileName = document.getElementById("fileName");
  
        // var file1 = evt.target.files[0]; // FileList object
        var file = URL.createObjectURL(file1); 
        fileName.innerHTML = file1.name + "<br/>";
        console.log(ev.dataTransfer.items[i].getAsFile());
        
        // setAudio(file, note, 'audio_player');
        audioPlayer = document.getElementById('audio_player');
        audioPlayer.src = file;
        player = new Tone.Player(file).toDestination(); 
        


        var reader = new FileReader();
        reader.onload = function (event) {
            var audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContext.decodeAudioData(event.target.result, function(buffer) {
                var duration = buffer.duration;
                trackOffsetSlider.setAttribute('max', duration);
            });
        };
        reader.onerror = function (event) {
          trackOffsetSlider.setAttribute('max', 3);;
        };
        reader.readAsArrayBuffer(file1);
    


        // handleFileSelect(file);
        console.log('... file1.name = ' + file);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (let i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log(file[0]);
      handleFileSelect(file[0]);
      console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
    }
  }
}


function dragOverHandler(ev) {
  console.log('File(s) in drop zone');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}


//SLIDERS---------------------------------------------

var trackOffsetSlider = document.getElementById("trackOffset");
var trackOffsetOutput = document.getElementById("trackOffsetValue");
trackOffsetOutput.innerHTML = trackOffsetSlider.value;

trackOffsetSlider.oninput = function() {
  trackOffsetOutput.innerHTML =  this.value + ' Sec';
  trackOffset = this.value + 0;
}


var timeFactorSlider = document.getElementById("timeFactor");
var timeFactorOutput = document.getElementById("timeFactorValue");
timeFactorOutput.innerHTML = timeFactorSlider.value;

timeFactorSlider.oninput = function() {
  timeFactorOutput.innerHTML =  this.value + ' X';
  timeFactor = this.value + 0;
}

var toneShiftSlider = document.getElementById("toneShift");
var toneShiftOutput = document.getElementById("toneShiftValue");
toneShiftOutput.innerHTML = toneShiftSlider.value;

toneShiftSlider.oninput = function() {
  toneShiftOutput.innerHTML = this.value + ' X';
  toneShift = this.value + 0;
}





//McDonald's Note
// const now = Tone.now();
// synth.triggerAttackRelease("G3", "16n", now);
// synth.triggerAttackRelease("A3", "16n", now + 0.2);
// synth.triggerAttackRelease("B3", "16n", now + 0.5);
// synth.triggerAttackRelease("E4", "8n", now + 0.8);
// synth.triggerAttack("D4", now + 1.1);
// synth.triggerRelease(now + 1.9);
// const input = new Tone.Oscillator(230, "sawtooth").start();

