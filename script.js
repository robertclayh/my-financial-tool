document.getElementById('calculateBtn').addEventListener('click', function() {
  // Retrieve input values and parse them
  const timeHorizon = parseFloat(document.getElementById('timeHorizon').value);
  const usdApy = parseFloat(document.getElementById('usdApy').value) / 100;
  const mxnApy = parseFloat(document.getElementById('mxnApy').value) / 100;
  const conversionRate = parseFloat(document.getElementById('conversionRate').value);
  const fxChange = parseFloat(document.getElementById('fxChange').value) / 100;

  // Expense amounts in USD
  const gymCost = parseFloat(document.getElementById('gymCost').value);
  const rentCost = parseFloat(document.getElementById('rentCost').value);
  const furnishCost = parseFloat(document.getElementById('furnishCost').value);

  // Calculate growth factors for both scenarios
  const usdGrowthFactor = Math.pow(1 + usdApy, timeHorizon);
  const mxnGrowthFactor = Math.pow(1 + mxnApy, timeHorizon);

  // -------------------------------
  // USD HYSA Scenario with 2% Cashback
  // -------------------------------
  const gymCashback = gymCost * 0.02;
  const furnishCashback = furnishCost * 0.02;
  // Rent doesn't get cashback
  const totalExpenseUSD = gymCost + rentCost + furnishCost - (gymCashback + furnishCashback);
  const finalUsdSavings = totalExpenseUSD * usdGrowthFactor;

  // -------------------------------
  // MXN Bond Scenario without Cashback
  // -------------------------------
  // Adjust conversion rate to account for FX fluctuations
  const adjustedConversionRate = conversionRate * (1 + fxChange);
  
  // Convert expenses from USD to MXN using the initial conversion rate
  const gymCostMXN = gymCost * conversionRate;
  const rentCostMXN = rentCost * conversionRate;
  const furnishCostMXN = furnishCost * conversionRate;

  // Grow each expense over the time horizon in MXN
  const gymCostMXNFinal = gymCostMXN * mxnGrowthFactor;
  const rentCostMXNFinal = rentCostMXN * mxnGrowthFactor;
  const furnishCostMXNFinal = furnishCostMXN * mxnGrowthFactor;
  
  // Convert the final MXN amounts back to USD using the adjusted rate
  const gymCostUSD_final = gymCostMXNFinal / adjustedConversionRate;
  const rentCostUSD_final = rentCostMXNFinal / adjustedConversionRate;
  const furnishCostUSD_final = furnishCostMXNFinal / adjustedConversionRate;

  // In the MXN scenario, no cashback is applied
  const totalExpenseMXN_inUSD = gymCostUSD_final + rentCostUSD_final + furnishCostUSD_final;

  // -------------------------------
  // Output the results
  // -------------------------------
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
    <h2>Results</h2>
    <p><strong>USD HYSA Scenario:</strong> Final effective cost (after growth & cashback adjustments): $${finalUsdSavings.toFixed(2)} USD</p>
    <p><strong>MXN Bond Scenario:</strong> Final effective cost (after growth and FX adjustments, without cashback): $${totalExpenseMXN_inUSD.toFixed(2)} USD</p>
    <p>Adjusted Conversion Rate for conversion back to USD: ${adjustedConversionRate.toFixed(2)} MXN per USD</p>
  `;
});
