/*
  Melody

  Plays a melody

  circuit:
  - 8 ohm speaker on digital pin 8

  created 21 Jan 2010
  modified 30 Aug 2011
  by Tom Igoe

  This example code is in the public domain.

  http://www.arduino.cc/en/Tutorial/Tone
*/

#include "pitches.h"

// notes in the melody:
int melody[] = { 31, 33, 35, 35, 37, 39, 39, 41, 44, 46, 46, 49, 52, 52, 55, 58, 58, 62, 65, 69, 69, 73, 78, 78, 82, 87, 93, 93, 98, 104, 104, 110, 117, 117, 123, 131, 139, 139, 147, 156, 156, 165, 175, 185, 185, 196, 208, 208, 220, 233, 233, 247, 262, 277, 277, 294, 311, 311, 330, 349, 370, 370, 392, 415, 415, 440, 466, 466, 494, 523, 554, 587, 587, 622, 622, 659, 698, 740, 740, 784, 831, 831, 880, 932, 932, 988, 1047, 1109, 1109, 1175, 1245, 1245, 1319, 1397, 1480, 1480, 1568, 1661, 1661, 1760, 1865, 1865, 1976, 2093, 2217, 2217, 2349, 2489, 2489, 2637, 2794, 2960, 2960, 3136, 3322, 3322, 3520, 3729, 3729, 3951, 4186, 4435, 4435, 4699, 4978 };

void setup() {
  // iterate over the notes of the melody:
  for (int thisNote = 0; thisNote < sizeof(melody)/2; thisNote++) {

    // to calculate the note duration, take one second divided by the note type.
    //e.g. quarter note = 1000 / 4, eighth note = 1000/8, etc.
    int noteDuration = 250;
    tone(8, melody[thisNote], noteDuration);

    // to distinguish the notes, set a minimum time between them.
    // the note's duration + 30% seems to work well:
    int pauseBetweenNotes = noteDuration * 1.30;
    delay(pauseBetweenNotes);
    // stop the tone playing:
    noTone(8);
  }
}

void loop() {
  // no need to repeat the melody.
}
