var englishTime = document.querySelector('#englishTime');
var convertButton = document.querySelector('#convertButton');

var headingResult = document.querySelector("#germanTime");

var germanUnits = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf"];
var germanTens = ["ein","zehn","zwanzig", "dreißig", "vierzig", "fünfzig", "sechszig"];

function resultDisplay(value) {
  headingResult.innerText = value;
}

function germanConvert(num){
  num = num.toString();
  let firstDigit = num.slice(0,1);
  let secondDigit = num.slice(1,2);

  if ( num < 13 ){
    return germanUnits[num];
  } else if (num < 20) {
    if(secondDigit == 7){
      return `siebzehn`;
    }
    return `${germanUnits[secondDigit]}zehn`;
  } else {
    if ( num % 10 == 0 ) {
      return germanTens[firstDigit];
    } else {
        if ( secondDigit == 1 ) {
     	return `einund${germanTens[firstDigit]}`;
      }
      return `${germanUnits[secondDigit]}und${germanTens[firstDigit]}`;
    }
  }
}

function quarterCheck(num){
  if (num == 15){
    return 'viertel';
  } else {
    return germanConvert(num);
  }
}

function check(ARRAY){
  let hours = ARRAY[0];
  let minutes = ARRAY[1];

  let hoursFirstDigit = hours.slice(0,1);
  let hoursSecondDigit = hours.slice(1,2);

  let minutesFirstDigit = minutes.slice(0,1);
  let minutesSecondDigit = minutes.slice(1,2);

  if ( minutes == '00' ){
    resultDisplay(`${germanConvert(hours)} Uhr`);
  }

  if ( minutesFirstDigit == 0 && minutesSecondDigit != 0 ) {
    if ( minutesSecondDigit == 1 ) {
      resultDisplay( `ein nach ${germanConvert(hours)}`);
    } else {
    resultDisplay( `${germanConvert(minutesSecondDigit)} nach ${germanConvert(hours)}` );
    }
  }

  if ( minutesFirstDigit < 2 && minutesFirstDigit != 0) {
    resultDisplay( `${quarterCheck(minutes)} nach ${germanConvert(hours)} `);
  }

  let minutesLeft = quarterCheck(60 - parseInt(minutes));
  let nextHour = 1 + parseInt(hours);

  if ( minutesFirstDigit >= 4 ) {
    resultDisplay(`${minutesLeft} vor ${germanConvert(nextHour)}`);
  }
  
  let minutesLeftBeforeHalfHour = 30 - parseInt(minutes);
  let minutesLeftAfterHalfHour = parseInt(minutes) - 30;  

  if ( minutesFirstDigit == 2 ) {
    resultDisplay(`${germanConvert(minutesLeftBeforeHalfHour)} vor halb ${germanConvert(nextHour)}`);
  }

  if ( minutesFirstDigit == 3 && minutesSecondDigit != 0 ) {
    resultDisplay(`${germanConvert(minutesLeftAfterHalfHour)} nach halb ${germanConvert(nextHour)}`);
  }

  if( minutes == '30' ) {
    resultDisplay(`halb ${germanConvert(nextHour)}`);
  }
}

convertButton.addEventListener("click", () =>{
  let userTime = englishTime.value;
  let timeArray = userTime.split(':');

  // TODO Validate

  check(timeArray);
});