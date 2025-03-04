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
  
  // For nominal calculations, the expense is simply what you enter.
  // For the USD scenario, we apply the 2% cashback (only on gym and furnishings).
  const gymCashback = gymCost * 0.02;
  const furnishCashback = furnishCost * 0.02;
  
  // Effective expense in nominal terms:
  // - USD scenario: expense minus cashback
  // - MXN scenario: expense remains as entered (no cashback)
  const effectiveExpenseUSD = (gymCost + rentCost + furnishCost) - (gymCashback + furnishCashback);
  const effectiveExpenseMXN = (gymCost + rentCost + furnishCost);
  
  // Final account balances after growth (nominal terms)
  const finalUsdBalance = initialDeposit * Math.pow(1 + usdApy, timeHorizon);
  
  // For MXN: convert deposit to MXN, grow it, then convert back using the adjusted conversion rate.
  const adjustedConversionRate = conversionRate * (1 + fxChange);
  const finalMxnBalance = (initialDeposit * conversionRate * Math.pow(1 + mxnApy, timeHorizon)) / adjustedConversionRate;
  
  // Leftover funds after paying the nominal expense:
  const leftoverUSD = finalUsdBalance - effectiveExpenseUSD;
  const leftoverMXN = finalMxnBalance - effectiveExpenseMXN;
  
  // Output the results
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
    <h2>Results (Nominal Terms)</h2>
    <p><strong>USD HYSA Scenario:</strong></p>
    <p>• Final account balance after ${timeHorizon} years: \$${finalUsdBalance.toFixed(2)} USD</p>
    <p>• Nominal expense (after 2% cashback): \$${effectiveExpenseUSD.toFixed(2)} USD</p>
    <p>• Leftover funds after purchase: \$${leftoverUSD.toFixed(2)} USD</p>
    <hr>
    <p><strong>MXN Bond Scenario:</strong></p>
    <p>• Final account balance after ${timeHorizon} years (in USD-equivalent): \$${finalMxnBalance.toFixed(2)} USD</p>
    <p>• Nominal expense (no cashback): \$${effectiveExpenseMXN.toFixed(2)} USD</p>
    <p>• Leftover funds after purchase: \$${leftoverMXN.toFixed(2)} USD</p>
    <hr>
    <p>Adjusted Conversion Rate for conversion back to USD: ${adjustedConversionRate.toFixed(2)} MXN per USD</p>
  `;
});
