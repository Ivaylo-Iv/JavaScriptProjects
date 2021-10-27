// Element Selection
let timeNr = document.getElementsByClassName("numbers");
let btns = document.getElementsByClassName("btn");
let interval;

// Adding event listeners

for (btn of btns) {
  btn.addEventListener("click", (e) => {
    startStopInterval(e.target.id);
  });
}

// Functions

function startStopInterval(o) {
  let minutes = timeNr[0];
  let seconds = timeNr[1];
  let mlseconds = timeNr[2];

  switch (o) {
    case "start":
      if (!interval) {
        interval = setInterval(() => {
          if (Number(mlseconds.innerText) == 99) {
            if (Number(seconds.innerText) == 59) {
              minutes.innerText = doubleDigitChecker(
                Number(minutes.innerText) + 1
              );
              seconds.innerText = "00";
              mlseconds.innerText = "00";
            } else {
              seconds.innerText = doubleDigitChecker(
                Number(seconds.innerText) + 1
              );
            }
            mlseconds.innerText = "00";
          } else {
            mlseconds.innerText = doubleDigitChecker(
              Number(mlseconds.innerText) + 1
            );
          }
        }, 10);
      }
      break;
    case "stop":
      clearInterval(interval);
      interval = null;
      break;
    case "reset":
      clearInterval(interval);
      interval = null;
      minutes.innerText = "00";
      seconds.innerText = "00";
      mlseconds.innerText = "00";
      break;
  }
}

function doubleDigitChecker(number) {
  if (Number(number) <= 9) {
    return `0${number}`;
  } else {
    return number;
  }
}
