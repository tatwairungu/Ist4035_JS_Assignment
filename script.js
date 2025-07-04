
  // ===== Global Variables =====
  const expenses = [];

  // DOM references
  const nameInput = document.getElementById('expense-name');
  const amountInput = document.getElementById('expense-amount');
  const addButton = document.getElementById('add-expense-btn');
  const expenseList = document.getElementById('expense-list');
  const totalDisplay = document.getElementById('total-amount');

  // ===== Add New Expense =====
  function addExpense() {
    const name = nameInput.value.trim(); // Get and trim name input
    const amount = parseFloat(amountInput.value); // Convert amount input to number

    // ===== Input Validation =====
    if (!name || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid expense name and a positive amount.");
      return;
    }

    // Create expense object
    const expense = {
      name: name,
      amount: amount
    };

    // Add to expenses array
    expenses.push(expense);

    // Clear input fields
    nameInput.value = '';
    amountInput.value = '';

    // Update UI
    renderExpenses();
    calculateTotal();
  }

  // ===== Render Expense List =====

  function renderExpenses() {
  // Clear existing content
  expenseList.innerHTML = '';

  // Loop through each expense and add to the list
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.style.backgroundColor = 'red';
    deleteBtn.style.color = 'white';

    // Handle delete logic
    deleteBtn.addEventListener('click', () => {
      expenses.splice(index, 1);        // Remove the expense from the array
      renderExpenses();                 // Re-render the list
      calculateTotal();                 // Recalculate total
    });

    // Set the text and append delete button
    li.textContent = `${expense.name}: ${expense.amount.toLocaleString()}`;
    li.appendChild(deleteBtn);

    expenseList.appendChild(li);
  });
}

  // ===== Calculate and Display Total Spent =====
  function calculateTotal() {
    let total = 0;

    // Sum all expense amounts
    expenses.forEach(expense => {
      total += expense.amount;
    });

    // Format and update total display
    totalDisplay.textContent = total.toLocaleString();
  }

  // ===== Event Listener for Add Button =====
  addButton.addEventListener('click', addExpense);
