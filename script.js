document.getElementById('calculateBtn').addEventListener('click', function() {
    // Retrieve input values and parse them
    const timeHorizon = parseFloat(document.getElementById('timeHorizon').value);
    const usdApy = parseFloat(document.getElementById('usdApy').value) / 100;
    const mxnApy = parseFloat(document.getElementById('mxnApy').value) / 100;
    const conversionRate = parseFloat(document.getElementById('conversionRate').value);
    const fxChange = parseFloat(document.getElementById('fxChange').value) / 100;
  
    // Expense amounts
    const gymCost = parseFloat(document.getElementById('gymCost').value);
    const rentCost = parseFloat(document.getElementById('rentCost').value);
    const furnishCost = parseFloat(document.getElementById('furnishCost').value);
  
    // Calculate growth factors
    const usdGrowthFactor = Math.pow(1 + usdApy, timeHorizon);
    const mxnGrowthFactor = Math.pow(1 + mxnApy, timeHorizon);
  
    // For the USD scenario:
    // Funds grow in USD and eligible expenses get 2% cashback (gym & furnishings).
    const gymCashback = gymCost * 0.02;
    const furnishCashback = furnishCost * 0.02;
    // Assume rent is paid directly with no cashback.
    const totalExpenseUSD = gymCost + rentCost + furnishCost - (gymCashback + furnishCashback);
    const finalUsdSavings = totalExpenseUSD * usdGrowthFactor;
  
    // For the MXN scenario:
    // Convert USD to MXN, grow it, then convert back.
    // Adjust conversion rate for FX fluctuation: if fxChange is positive, MXN has depreciated by that percentage.
    const adjustedConversionRate = conversionRate * (1 + fxChange);
    
    // Convert each expense to MXN
    const gymCostMXN = gymCost * conversionRate;
    const rentCostMXN = rentCost * conversionRate;
    const furnishCostMXN = furnishCost * conversionRate;
  
    // Grow each expense cost over time in MXN
    const gymCostMXNFinal = gymCostMXN * mxnGrowthFactor;
    const rentCostMXNFinal = rentCostMXN * mxnGrowthFactor;
    const furnishCostMXNFinal = furnishCostMXN * mxnGrowthFactor;
    
    // Convert final MXN values back to USD using the adjusted rate
    const gymCostUSD_final = gymCostMXNFinal / adjustedConversionRate;
    const rentCostUSD_final = rentCostMXNFinal / adjustedConversionRate;
    const furnishCostUSD_final = furnishCostMXNFinal / adjustedConversionRate;
  
    // Apply cashback on eligible items (gym and furnishings)
    const gymCashback_mxn = gymCostUSD_final * 0.02;
    const furnishCashback_mxn = furnishCostUSD_final * 0.02;
  
    const totalExpenseMXN_inUSD = (gymCostUSD_final + rentCostUSD_final + furnishCostUSD_final) - (gymCashback_mxn + furnishCashback_mxn);
  
    // Output results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
      <h2>Results</h2>
      <p><strong>USD HYSA Scenario:</strong> Final effective cost (after growth & cashback adjustments): $${finalUsdSavings.toFixed(2)} USD</p>
      <p><strong>MXN Bond Scenario:</strong> Final effective cost (after growth, FX fluctuation & cashback): $${totalExpenseMXN_inUSD.toFixed(2)} USD</p>
      <p>Adjusted Conversion Rate for conversion back to USD: ${adjustedConversionRate.toFixed(2)} MXN per USD</p>
    `;
  });
  