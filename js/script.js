// Expense tracker data
const transactions = [];

// DOM elements
const balanceDisplay = document.getElementById('balance');
const incomeDisplay = document.getElementById('inc-amt');
const expenseDisplay = document.getElementById('exp-amt');
const form = document.getElementById('form');
const transactionList = document.getElementById('trans');

// Function to display transaction details
function displayTransactions() {
  transactionList.innerHTML = '';

  transactions.forEach(transaction => {
    const listItem = document.createElement('li');
    listItem.classList.add(transaction.amount < 0 ? 'exp' : 'inc');
    listItem.innerHTML = `
      ${transaction.description} <span>₹ ${Math.abs(transaction.amount).toFixed(2)}</span>
      <button 
        class="del-btn" 
        onclick="deleteTransaction(${transaction.id})">
          X
        </button>
    `;

    transactionList.appendChild(listItem);
  });

  updateBalance();
}

// Function to update balance, income, and expense displays
function updateBalance() {
  const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const income = transactions.filter(transaction => transaction.amount > 0).reduce((acc, transaction) => acc + transaction.amount, 0);
  const expense = transactions.filter(transaction => transaction.amount < 0).reduce((acc, transaction) => acc + transaction.amount, 0);

  balanceDisplay.textContent = `₹ ${total.toFixed(2)}`;
  incomeDisplay.textContent = `₹ ${income.toFixed(2)}`;
  expenseDisplay.textContent = `₹ ${Math.abs(expense).toFixed(2)}`;
}

// Function to add a new transaction
function addTransaction(description, amount) {
  const id = transactions.length + 1;
  const transaction = {
    id,
    description,
    amount: parseFloat(amount)
  };
  transactions.push(transaction);
  displayTransactions();
}

// Function to handle form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const description = document.getElementById('desc').value;
  const amount = document.getElementById('amt').value;

  if (!description || isNaN(amount)) {
    alert('Please enter valid values for Description and Amount.');
    return;
  }

  addTransaction(description, amount);

  // Clear input fields after adding a transaction
  document.getElementById('desc').value = '';
  document.getElementById('amt').value = '';
});

// Function to delete a transaction
function deleteTransaction(id) {
  const index = transactions.findIndex(transaction => transaction.id === id);

  if (index !== -1) {
    transactions.splice(index, 1);
    displayTransactions();
  }
}

// Initial display of transactions
displayTransactions();
