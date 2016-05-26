var medications = [];
var quantityTaken = [40];
var quantitySkipped = 0;

var tableEl = document.getElementById('upNextTable');

function Medication (name, prescriber, dosage, doseType, quantity, start, duration, intervals, first, food, numRefills, pharmName, pharmPhone, taking, addCurrSched, notes) {
  this.name = name;
  this.prescriber = prescriber;
  this.dosage = dosage;
  this.doseType = doseType;
  this.quantity = quantity;
  this.start = start;
  this.duration = duration;
  this.intervals = intervals;
  this.first = first;
  // this.second = second;
  // this.third = third;
  this.food = food;
  // this.beforeFood = beforeFood;
  this.numRefills = numRefills;
  this.pharmName = pharmName;
  this.pharmPhone = pharmPhone;
  this.taking = taking;
  this.pillsLeft = quantity; // this has to be this.quantity - this.dosage anytime a user clicks 'taken' within the UpNextTable.
  this.addCurrSched = addCurrSched;
  this.notes = notes;
  medications.push(this);
};

Medication.renderUpNextTable = function() {
  //Also at this time the page will be displaying all current medications in no particular order
  //Need to arrange medications array by time to take somehow.
  document.getElementById('noMedMessage').hidden = true;
  tableEl.hidden = false;

  for (meds in medications) {
    if (medications[meds].taking === false) {
      var trEl = document.createElement('tr');
      trEl.id = medications[meds].name + 'Alert';

      var medNameThEl = document.createElement('th');
      medNameThEl.innerHTML = '<a href="addmed.html" id=' + medications[meds].name + '>' + medications[meds].name + '</a>';
      trEl.appendChild(medNameThEl);

      var timeNextTdEl = document.createElement('td');
      timeNextTdEl.textContent = medications[meds].first;
      trEl.appendChild(timeNextTdEl);

      var dosageTdEl = document.createElement('td');
      dosageTdEl.textContent = medications[meds].dosage;
      trEl.appendChild(dosageTdEl);

      var adherenceTdEl = document.createElement('td');
      adherenceTdEl.innerHTML = '<form id="' + medications[meds].name + 'Adhere' + '"><input type="radio" name="adherence" value="took" /> Took <input type="radio" name="adherence" value="skipped"> Skip </form>';
      trEl.appendChild(adherenceTdEl);

      tableEl.appendChild(trEl);
    }
  }
};

var schedule = {
  data: {
    labels: ['Taken'],
    datasets: [
      {
        label: 'Your History',
        backgroundColor: '#d5f4f0',
        data: quantityTaken
      }
    ]
  },

  alertMed: function() {
    var date = new Date();
    var currentTime = [date.getHours(), date.getMinutes()];
    for (obj in medications) {
      if (medications[obj].taking === false) {
        var medTime = [parseInt(medications[obj].first.substring(0,2)), parseInt(medications[obj].first.substring(3))];
        if (currentTime[0] > medTime[0]) {
          var alertRow = document.getElementById(medications[obj].name + 'Alert');
          alertRow.className = 'alert';
          alert('You have missed your scheduled dose of ' + medications[obj].name + '!');
        } else if (currentTime[0] === medTime[0]) {
          if (currentTime[1] > medTime[1]) {
            var alertRow = document.getElementById(medications[obj].name + 'Alert');
            alertRow.className = 'alert';
            alert('You have missed your scheduled dose of ' + medications[obj].name + '!');
          }
        }
      }
    }
  },

  clickMedName: function() {
    var jsonDrugClicked = JSON.stringify(medications[obj]);
    localStorage.setItem('medClicked', jsonDrugClicked);
  },

  tookEvent: function(element) {
    var removeTr = element.parentNode.parentNode.parentNode;
    if (removeTr.id === medications[obj].name + 'Alert') {
      tableEl.removeChild(removeTr);
      console.log(medications[obj].pillsLeft);
      medications[obj].pillsLeft = medications[obj].pillsLeft - medications[obj].dosage;
      console.log(medications[obj].pillsLeft);
      localStorage.setItem('drugArray', JSON.stringify(medications));
    }
  },

  skipEvent: function (element) {
    var removeTr = element.parentNode.parentNode.parentNode;
    if (removeTr.id === medications[obj].name + 'Alert') {
      tableEl.removeChild(removeTr);
      console.log(medications[obj].pillsLeft);
    }
  },

  displayChart: function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: this.data,
    });
  }
};

if (localStorage.drugArray) {
  medications = JSON.parse(localStorage.getItem('drugArray'));
  Medication.renderUpNextTable();
  schedule.alertMed();
}

tableEl.addEventListener('click', function(event) {
  for(obj in medications) {
    if (event.target.id === medications[obj].name) {
      schedule.clickMedName();
    } else if (event.target.value === 'took' && event.target.parentNode.parentNode.parentNode.id === medications[obj].name + 'Alert') {
      schedule.tookEvent(event.target);
    } else if (event.target.value === 'skipped' && event.target.parentNode.parentNode.parentNode.id === medications[obj].name + 'Alert') {
      schedule.skipEvent(event.target);
    }
  }
});

schedule.displayChart();

function renderRefills(){
  var refMsg = document.getElementById('refills');
  for(obj in medications) {
    if(medications[obj].pillsLeft < 10) {
      var userMessageRefills = document.createElement('p');
      console.log('created the p');
      userMessageRefills.textContent = 'You need to refill ' + medications[obj].name + ' in the next ' + medications[obj].quantity + ' days.';
      refMsg.appendChild(userMessageRefills);
    }
  }
};
//'<p class=refMessage>' + 'You need to refill ' + medications[obj].name + ' in the next ' + medications[obj].quantity + 'days.' + '</p>';
renderRefills();
