class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.budgetLeft = this.budget;
  }
  subtractBudget(amount) {
    return (this.budgetLeft -= amount);
  }
}
class HTML {
  insertBudget(amount) {
    budgetli.innerHTML = `${amount}`;
    left.innerHTML = `${amount}`;
  }
  printMessge(message, className) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("text-center", "alert", className);
    wrapper.appendChild(document.createTextNode(message));
    document.querySelector(".primary").insertBefore(wrapper, addExpense);
  }
  addExpenseToList(name, amount) {
    const expensesList = document.querySelector("#expenses ul");
    const li = document.createElement("li");
   
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
    ${name}
    <span class='badge badge-primary badge-pill'>${amount}</span>
    `;
    expensesList.appendChild(li);
  }
  
  trackBudget(amount) {
    const budgetLeft = document.querySelector('span#left')
    const budgetLeftDollars = budget.subtractBudget(amount);
    budgetLeft.innerHTML = `${budgetLeftDollars}`;
  }
}

const budgetli = document.getElementById("total");
const left = document.getElementById("left");

let budget, userBudget;
const addExpense = document.querySelector("#add-expense");
const html = new HTML();

//event listners

eventListners();
function eventListners() {
  document.addEventListener("DOMContentLoaded", function () {
    userBudget = prompt("what is your budget");
    if (userBudget === null || userBudget === "" || userBudget === "0") {
      window.location.reload();
    } else {
      budget = new Budget(userBudget);
      html.insertBudget(budget.budget);
    }
  });
  addExpense.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("expense").value;
    const amount = document.getElementById("amount").value;
    if (name === "" || amount === "") {
      html.printMessge("All fields are mandatory", "alert-danger");
    } else {
      html.addExpenseToList(name, amount);
      html.trackBudget(amount);
    }
  });
}
