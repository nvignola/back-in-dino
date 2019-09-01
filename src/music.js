import * as TinyMusic from "tinymusic";

// create a new Web Audio API context
var ac = new AudioContext();

// set the playback tempo (120 beats per minute)
var tempo = 260;

export const when = ac.currentTime;
const bass = [
  "A2  h",
  "A2  q",
  "A2  h",
  "A2  q",
  "A2  h",
  "-   h",
  "-   h",
  "-   h",
  "F2  h",
  "F2  h",
  "F2  h",
  "F2  h",
  "F2  h",
  "F2  h",
  "F2  h",
  "F2  h",
  "C3  h",
  "C3  q",
  "C3  h",
  "C3  q",
  "C3  h",
  "-   h",
  "-   h",
  "-   h",
  "G3  h",
  "G3  h",
  "G3  h",
  "G3  h",
  "G3  h",
  "G3  h",
  "G3  h",
  "G3  q",
];
const lead = [
  "C4  h",
  "-  h",
  "-  h",
  "-  h",
  "-  h",
  "A3  q",
  "B3   h",
  "A3   q",
  "C4   h",
  "-  h",
  "-  h",
  "-  h",
  "D4  h",
  "-  h",
  "-  h",
  "-  h",
  "E4  h",
  "-  h",
  "-  h",
  "D4  q",
  "C4   h",
  "-  h",
  "-   q",
  "E4   h",
  "D4  h",
  "-  h",
  "-  h",
  "C4  q",
  "B4  q",
  "-  h",
  "-  h",
  "-  h",
  "-  q",
];

// const lead = [];
// const lead = [
//   "B3 q",
//   "B3 q",
//   "-   h",
//   "B3 q",
//   "B3 q",
//   "B3 q",
//   "Bb3 q",
//   "A3 q",
//   "G3 q",
//   "-   h",
//   "G3 q",
//   "G3 q",
//   "G3 q",
//   "G3 q",
//   "-   h",
//   "-   h",
// ];
// create a new sequence
export const sequence = new TinyMusic.Sequence(ac, tempo, lead);
export const sequenceBase = new TinyMusic.Sequence(ac, tempo, bass);

// set staccato and smoothing values for maximum coolness
sequence.staccato = 0.55;
// adjust the levels so the bass and harmony aren't too loud
sequence.gain.gain.value = 0.7;
// apply EQ settings
sequence.mid.frequency.value = 800;
sequence.mid.gain.value = 3;

// sequenceBase.staccato = 0.05;
sequenceBase.smoothing = 0.4;
sequenceBase.gain.gain.value = 0.65;
sequenceBase.mid.gain.value = 3;
sequenceBase.bass.gain.value = 6;
sequenceBase.bass.frequency.value = 80;
sequenceBase.mid.gain.value = -6;
sequenceBase.mid.frequency.value = 500;
sequenceBase.treble.gain.value = -2;
sequenceBase.treble.frequency.value = 1400;

// add the notes
// sequence.push(note1, note2, note3);

// // disable looping
// sequence.loop = false;

// // play it
// sequence.play();
