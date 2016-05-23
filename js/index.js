var medications = [];
var tableEl = document.getElementById('upNextTable');

function Medication (name, prescriber, dosage, doseType, quantity, start, duration, intervals, first, second, third, withFood, beforeFood, numRefills, pharmName, pharmPhone, taking, addCurrSched, notes) {
  this.name = name;
  this.prescriber = prescriber;
  this.dosage = dosage;
  this.doseType = doseType;
  this.quantity = quantity;
  this.start = start;
  this.duration = duration;
  this.intervals = intervals;
  this.first = first;
  this.second = second;
  this.third = third;
  this.withFood = withFood;
  this.beforeFood = beforeFood;
  this.numRefills = numRefills;
  this.pharmName = pharmName;
  this.pharmPhone = pharmPhone;
  this.taking = taking;
  this.pillsLeft = 0; // this has to be this.quantity - this.dosage anytime a user clicks 'taken' within the UpNextTable.
  this.addCurrSched = addCurrSched;
  this.notes = notes;
  medications.push(this);
  // Medication.renderCurrTable(this);
};

if (localStorage.drugArray) {
  medications = JSON.parse(localStorage.getItem('drugArray'));

  Medication.renderUpNextTable = function() {
  //Also at this time the page will be displaying all current medications in no particular order
  //Need to arrange medications array by time time to take somehow.
    document.getElementById('noMedMessage').hidden = true;
    tableEl.hidden = false;

    for (meds in medications) {
      if (medications[meds].taking === true) {
        var trEl = document.createElement('tr');

        var medNameThEl = document.createElement('th');
        medNameThEl.innerHTML = '<a href="addmed.html" id=' + medications[meds].name + '>' + medications[meds].name.charAt(0).toUpperCase() + medications[meds].name.slice(1) + '</a>';
        trEl.appendChild(medNameThEl);

        var timeNextTdEl = document.createElement('td');
        timeNextTdEl.textContent = medications[meds].first;
        trEl.appendChild(timeNextTdEl);

        var dosageTdEl = document.createElement('td');
        dosageTdEl.textContent = medications[meds].dosage;
        trEl.appendChild(dosageTdEl);

        var adherenceTdEl = document.createElement('td');
        adherenceTdEl.innerHTML = '<form><input type="radio" name="adherence" value="took" /> Took <input type="radio" name="adherence" value="skipped"> Skip </form>';
        trEl.appendChild(adherenceTdEl);

        tableEl.appendChild(trEl);
      }
    }
  };
  Medication.renderUpNextTable();
};

tableEl.addEventListener('click', function(event) {
  for(obj in medications) {
    if (event.target.id === medications[obj].name) {
      var jsonDrugClicked = JSON.stringify(medications[obj]);
      localStorage.setItem('medClicked', jsonDrugClicked);
    };
  }
});

// Medication.createChart = function() {
//   //Need chart to display on landing to show current streak
//   //pulling also from localStorage and targeting the 'took it' or 'skipped' propery of each object, then adding 1 to the chart for each object htat has one of those selected (or deleting 1 if 'skipped')
// })();

// var schedule = {
//   // alert: write code to compare current time to schdeule time to alert for late dose
//
//   // taken: write code to add 1 to chart data for taken dose
//
//   // skipped; write code to add 1 to chart date for skipped dose
// };

//event listeners need for the following

//On landing page event listener for when you click on medication name -- should take you to addmed.html page with all fields prepopulated.