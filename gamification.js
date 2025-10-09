// ========================
// Central Gamification System
// ========================

// Initial user points (can be fetched from backend in future)
let userPoints = 0;

// Blockchain ledger simulation
let blockchainLedger = [];

// Function to add points
function addPoints(source, points) {
  userPoints += points;
  updatePointsUI();
  logBlockchainTx(`+${points} points from ${source}`);
}

// Function to redeem points
function redeemPoints(rewardName, cost) {
  if (userPoints >= cost) {
    userPoints -= cost;
    updatePointsUI();
    logBlockchainTx(`Redeemed ${rewardName} for ${cost} points`);
    alert(`✅ You successfully redeemed: ${rewardName}`);
  } else {
    alert(`❌ Not enough points to redeem: ${rewardName}`);
  }
}

// Update points UI if span with id="userPoints" exists
function updatePointsUI() {
  const pointsSpan = document.getElementById("userPoints");
  if (pointsSpan) {
    pointsSpan.textContent = userPoints;
  }
}

// Simulate blockchain transaction log
function logBlockchainTx(description) {
  const timestamp = new Date().toLocaleString();
  const tx = { description, timestamp };
  blockchainLedger.push(tx);
  console.log("Blockchain TX:", tx);

  // Optionally update ledger UI if element exists
  const ledgerContainer = document.getElementById("ledgerList");
  if (ledgerContainer) {
    const li = document.createElement("li");
    li.textContent = `${tx.timestamp} — ${tx.description}`;
    ledgerContainer.prepend(li);
  }
}

// Example: Automatically award points from activities
function simulateActivityPoints() {
  // Roadmap milestone
  addPoints("Roadmap milestone completed", 50);
  // Aptitude test
  addPoints("Aptitude test passed", 30);
  // AR/VR simulation
  addPoints("AR/VR simulation completed", 40);
}

// Run on DOM load for testing
document.addEventListener("DOMContentLoaded", () => {
  updatePointsUI();
  // simulateActivityPoints(); // Uncomment for demo points
});
