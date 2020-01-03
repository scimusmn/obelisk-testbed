#include "arduino-base/Libraries/SerialManager.h"

SerialManager serialManager;

long baudrate = 115200;
int blinkrate = 1000;
bool blinking = true;
bool led_on = false;
long blinkcounter = 0;

#define ledpin 13

void setup() {

  // Enables/disables debug messaging from ArduinoJson
  boolean arduinoJsonDebug = false;

  // Ensure Serial Port is open and ready to communicate
  serialManager.setup(baudrate, [](char* message, char* value) {
    onParse(message, value);
  }, arduinoJsonDebug);

  // For every sketch, we need to set up our IO
  // Setup digital pins and default modes as needed, analog inputs are setup by default
  pinMode(ledpin, OUTPUT);
}

void loop() {
  serialManager.idle();
  if (blinking) {
    if ((millis() - blinkcounter) >= blinkrate) {
      led_on = !led_on;
      digitalWrite(ledpin,led_on);
      blinkcounter = millis();
      serialManager.sendJsonMessage("led-status", led_on);
    }
  }
}

void onParse(char* message, int value) {
  if (strcmp(message, "led") == 0) {
    // Turn-on led
    digitalWrite(ledpin, value);
  }
  else if (strcmp(message, "blinkrate") == 0) {
    blinkrate = value;
  }
  else if (strcmp(message, "blinking") == 0) {
    blinking = value;
  }
  else if (strcmp(message, "wake-arduino") == 0 && value == 1) {
    serialManager.sendJsonMessage("arduino-ready", 1);
  }
  else {
    serialManager.sendJsonMessage("unknown-command", 1);
  }
}
