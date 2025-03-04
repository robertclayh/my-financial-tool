document.getElementById('calculateBtn').addEventListener('click', function() {
  // Retrieve general inputs
  const initialDeposit = parseFloat(document.getElementById('initialDeposit').value);
  const timeHorizon = parseFloat(document.getElementById('timeHorizon').value);
  const usdApy = parseFloat(document.getElementById('usdApy').value) / 100;
  const mxnApy = parseFloat(document.getElementById('mxnApy').value) / 100;
  const conversionRate = parseFloat(document.getElementById('conversionRate').value);
  const fxChange = parseFloat(document.getElementById('fxChange').value) / 100;
  
  // Retrieve expense amounts in USD (nominal values)
  const gymCost = parseFloat(document.getElementById('gymCost').value);
  const rentCost = parseFloat(document.getElementById('rentCost').value);
  const furnishCost = parseFloat(document.getElementById('furnishCost').value);

  // Calculate growth factors (for the deposits)
  const usdGrowthFactor = Math.pow(1 + usdApy, timeHorizon);
  const mxnGrowthFactor = Math.pow(1 + mxnApy, timeHorizon);

  // Adjusted conversion rate for MXN scenario (with FX change)
  const adjustedConversionRate = conversionRate * (1 + fxChange);

  // -------------------------------
  // USD HYSA Scenario (Nominal Terms)
  // -------------------------------
  // Future value of the USD deposit:
  const finalUsdSavings = initialDeposit * usdGrowthFactor;
  // Nominal expense remains as entered, but apply cashback on eligible items:
  const effectiveGymCostUSD = gymCost - (gymCost * 0.02); // 2% cashback for gym
  const effectiveFurnishCostUSD = furnishCost - (furnishCost * 0.02); // 2% cashback for furnishings
  // Rent has no cashback.
  const effectiveCostUSD = effectiveGymCostUSD + rentCost + effectiveFurnishCostUSD;
  // Leftover funds in USD scenario:
  const leftoverUSD = finalUsdSavings - effectiveCostUSD;

  // -------------------------------
  // MXN Bond Scenario (Nominal Terms)
  // -------------------------------
  // Convert the initial deposit to MXN, let it grow, then convert back to USD:
  const finalMXNInUSD = (initialDeposit * conversionRate * mxnGrowthFactor) / adjustedConversionRate;
  // In the MXN scenario, the expense remains the nominal value (no cashback):
  const effectiveCostMXN = gymCost + rentCost + furnishCost;
  // Leftover funds in MXN scenario:
  const leftoverMXN = finalMXNInUSD - effectiveCostMXN;

  // -------------------------------
  // Output the results
  // -------------------------------
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
    <h2>Nominal Terms Results</h2>
    <p><strong>USD HYSA Scenario:</strong></p>
    <p>• Final account balance after ${timeHorizon} years: \$${finalUsdSavings.toFixed(2)} USD</p>
    <p>• Effective expense (after 2% cashback on gym & furnishings): \$${effectiveCostUSD.toFixed(2)} USD</p>
    <p>• Leftover funds after purchase: \$${leftoverUSD.toFixed(2)} USD</p>
    <hr>
    <p><strong>MXN Bond Scenario:</strong></p>
    <p>• Final account balance after ${timeHorizon} years (in USD-equivalent): \$${finalMXNInUSD.toFixed(2)} USD</p>
    <p>• Expense (nominal, no cashback): \$${effectiveCostMXN.toFixed(2)} USD</p>
    <p>• Leftover funds after purchase: \$${leftoverMXN.toFixed(2)} USD</p>
    <hr>
    <p>Adjusted Conversion Rate for conversion back to USD: ${adjustedConversionRate.toFixed(2)} MXN per USD</p>
  `;
});
