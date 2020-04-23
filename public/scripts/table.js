// question and answer array
let qa = new Array();
// tabs array
let tabs = new Array();
// keeps track of current row
let currentRow = 1;
// keeps track of current tab
let currentTab = 0;
function getValueOfRow(radioGroupName) {
  var checkedElement = $("input[name=" + radioGroupName + "]:checked");
  var value = checkedElement.val();
  var id = checkedElement.attr("id");
  var name = checkedElement.attr("name");
  var question = checkedElement.parent().parent().children("td").children("div").children("p")[0].innerText;
  // console.log('name: ' + name + ', id: ' + id + ', value: ' + value);
  // console.log(question + ': ' + value);
  let a = new Answer(question, value);
  // console.log(a.getAnswer(), a.getQuestion());
  qa.push(a);
}

$("button").click(function() {
  for (var x = currentRow; x < currentRow + 6; x++) {
    getValueOfRow("row" + x + "-radio");
  }
  currentRow += 6;

  //  check if there is another tab
  if(tabs[currentTab + 1] !== undefined) {
    // hide current tab
    tabs[currentTab].classList.add("tab");
    // show next tab
    tabs[currentTab + 1].classList.remove("tab");
    currentTab++;
  } else {
    // let tableData = '{"data":"' + JSON.stringify(qa) + '"}';
    let tableData = JSON.stringify(qa);
    let data1 = {
      "data": tableData
    };
    // tableData = JSON.stringify(qa);
    // console.log(tableData);

    // post answers to server
    let urlDestination = window.location.href;
    console.log(urlDestination);
    // post
    $.post(urlDestination, data1, (data, status) => {

    });

  }
});

$(document).ready(() => {

  // put all tabs in an array
  tabs = $('table.tab').toArray();
  // display first tab
  tabs[0].classList.remove("tab");
});

class Answer {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
  }

  getQuestion() {
    return this.question;
  }

  getAnswer() {
    return this.answer;
  }
}
