var medications = [];
var totalListTable = document.getElementById('theTable');

if (localStorage.drugArray) {
  medications = JSON.parse(localStorage.getItem('drugArray'));
} else {
  medications = [];
}

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

Medication.renderCurrTable = function () {
  if(localStorage.drugArray){
    medications = JSON.parse(localStorage.getItem('drugArray'));
    console.log(medications);
    for(medication in medications) {
      if (medications[medication].taking === false) {
        var medRows = document.createElement('tr');
        medRows.id = medications[medication].name;
        var drugName = document.createElement('th');
        drugName.innerHTML = '<a href="addmed.html" id=' + medications[medication].name + '>' + medications[medication].name.charAt(0).toUpperCase() + medications[medication].name.slice(1) + '</a>';
        medRows.appendChild(drugName);
        var doseData = document.createElement('td');
        doseData.textContent = medications[medication].dosage;
        var doseTypeData = document.createElement('td');
        doseTypeData.textContent = medications[medication].doseType;
        var amountLeft = document.createElement('td');
        amountLeft.textContent = medications[medication].pillsLeft;
        medRows.appendChild(doseData);
        medRows.appendChild(doseTypeData);
        medRows.appendChild(amountLeft);
        var remove = document.createElement('a');
        var linkText = document.createTextNode('Remove');
        remove.appendChild(linkText);
        remove.title = 'Remove';
        remove.href = ''; // this needs to be more functions removing the element and putting it in the archive table...so i need to see how to remove the row, but then i'll call whatever 'add to archive table' method we have.
        medRows.appendChild(remove);
        totalListTable.appendChild(medRows);
      };
    };
  };
};

Medication.renderCurrTable();

totalListTable.addEventListener('click', function(event) {
  for(obj in medications) {
    if (event.target.id === medications[obj].name) {
      var jsonDrugClicked = JSON.stringify(medications[obj]);
      localStorage.setItem('medClicked', jsonDrugClicked);
    };
  }
});

// Medication.sendClick();
//On medList.html need event listener for when you click on medication name -- should take you to addmed.html page with all fields prepopulated.
