const TARGET = 10; 

const NAMES  = ["Maya", "Theo", "June", "Noah", "Ava", "Liam", "Zoe", "Ben", "Isla", "Leo"];
const DRINKS = ["Oat latte", "Cappuccino", "Matcha"];
const SKINS  = ["#A86B4A", "#E0A07F", "#7A4A2A", "#C98B65", "#8D5A3B"];
const HAIRS  = ["#8A6A4F", "#8A4A3A", "#8A7A2A", "#4A5A3A", "#6B5A7A", "#5A4034"];
const SHIRTS = ["#3F6F85", "#E0705A", "#D9AE3A", "#7A9468", "#8A6FA8", "#D98567"];

const DRINK_ICONS = {
  "Oat latte": "assets/icons-for-queue/oat-latte.svg",
  "Cappuccino": "assets/icons-for-queue/cappuccino.svg",
  "Matcha": "assets/icons-for-queue/macha.svg"
};

let queue = [];  
let customerNo = 100;  
let served = 0;

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function enqueue() {
  if (gameOver) {
    showMessage("Shift complete! Click Reset to play again.", "success");
    return;
  }

  customerNo++;   
  const customer = {
    number: customerNo,
    name: randomItem(NAMES),
    order: randomItem(DRINKS),
    skin: randomItem(SKINS),
    hair: randomItem(HAIRS),
    shirt: randomItem(SHIRTS)
  };

  queue.push(customer);
  showMessage(customer.name + " (#" + customer.number + ") joined the line.", "");
  render();
}

function dequeue() {
  return queue.shift();
}

function peek() {
  if (queue.length === 0) {
    return null;
  }
  return queue[0];
}

// Player clicked a drink button
function serveDrink(drink) {
  if (gameOver) {
    showMessage("Shift complete! Click Reset to play again.", "success");
    return;
  }

  const front = peek();

  // can't serve an empty queue
  if (front === null) {
    showMessage("No customers waiting. Click Add customer first.", "error");
    return;
  }

  // wrong drink: the customer stays in the line
  if (drink !== front.order) {
    showMessage("Wrong drink! " + front.name + " wants " + front.order + ".", "error");
    return;
  }

  // correct drink: serve the earliest customer
  dequeue();
  served++;
  showMessage("Served " + front.name + "'s " + front.order + "!", "success");
  checkWin();
  render();
}

// Check if the player served 10 customers
function checkWin() {
  if (served >= TARGET) {
    gameOver = true;
    showMessage("You win! You served " + TARGET + " customers.", "success");
  }
}

// Start over
function reset() {
  queue = [];
  customerNo = 100;
  served = 0;
  gameOver = false;
  showMessage('Click "Add customer" to start.', "");
  render();
}

