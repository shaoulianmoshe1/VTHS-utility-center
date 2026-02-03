// Navigation Functions
function showFeature(featureId) {
    // Hide main menu
    document.getElementById('main-menu').classList.add('hidden');
    
    // Hide all features
    const features = document.querySelectorAll('.feature-container');
    features.forEach(feature => feature.classList.add('hidden'));
    
    // Show selected feature
    document.getElementById(featureId).classList.remove('hidden');
}

function showMainMenu() {
    // Hide all features
    const features = document.querySelectorAll('.feature-container');
    features.forEach(feature => feature.classList.add('hidden'));
    
    // Show main menu
    document.getElementById('main-menu').classList.remove('hidden');
}

// ============== GRADE CALCULATOR ==============

function generateGradeInputs() {
    const numGrades = parseInt(document.getElementById('num-grades').value);
    
    if (numGrades <= 0 || numGrades > 20) {
        alert('Please enter a number between 1 and 20');
        return;
    }
    
    const container = document.getElementById('grade-inputs');
    container.innerHTML = '<h3>Enter Your Grades</h3>';
    
    for (let i = 1; i <= numGrades; i++) {
        const row = document.createElement('div');
        row.className = 'grade-input-row';
        row.innerHTML = `
            <label>Grade ${i}:</label>
            <input type="number" id="grade-${i}" min="0" max="100" step="0.01" placeholder="0-100">
        `;
        container.appendChild(row);
    }
    
    const button = document.createElement('button');
    button.className = 'primary-btn';
    button.textContent = 'Calculate Results';
    button.onclick = calculateGrades;
    container.appendChild(button);
    
    container.classList.remove('hidden');
    document.getElementById('grade-results').classList.add('hidden');
}

function calculateGrades() {
    const numGrades = parseInt(document.getElementById('num-grades').value);
    const grades = [];
    
    // Collect all grades
    for (let i = 1; i <= numGrades; i++) {
        const gradeInput = document.getElementById(`grade-${i}`);
        const grade = parseFloat(gradeInput.value);
        
        if (isNaN(grade) || grade < 0 || grade > 100) {
            alert(`Grade ${i} must be between 0 and 100`);
            return;
        }
        
        grades.push(grade);
    }
    
    // Calculate statistics
    const total = grades.reduce((sum, grade) => sum + grade, 0);
    const average = total / numGrades;
    const highest = Math.max(...grades);
    const lowest = Math.min(...grades);
    
    // Calculate letter grade
    let letter = '';
    if (average >= 90) letter = 'A';
    else if (average >= 80) letter = 'B';
    else if (average >= 70) letter = 'C';
    else if (average >= 60) letter = 'D';
    else letter = 'F';
    
    // Calculate GPA
    let gpa = 0;
    if (average >= 93) gpa = 4.0;
    else if (average >= 90) gpa = 3.7;
    else if (average >= 87) gpa = 3.3;
    else if (average >= 83) gpa = 3.0;
    else if (average >= 80) gpa = 2.7;
    else if (average >= 77) gpa = 2.3;
    else if (average >= 73) gpa = 2.0;
    else if (average >= 70) gpa = 1.7;
    else if (average >= 67) gpa = 1.3;
    else if (average >= 60) gpa = 1.0;
    else gpa = 0.0;
    
    // Performance message
    let message = '';
    let messageClass = '';
    if (average >= 90) {
        message = '🎉 Excellent work!';
        messageClass = 'alert-success';
    } else if (average >= 80) {
        message = '✅ Great job!';
        messageClass = 'alert-success';
    } else if (average >= 70) {
        message = '👍 Good effort!';
        messageClass = 'alert-info';
    } else if (average >= 60) {
        message = '📚 Keep studying!';
        messageClass = 'alert-warning';
    } else {
        message = '⚠️ Need improvement';
        messageClass = 'alert-danger';
    }
    
    // Display results
    const resultsContainer = document.getElementById('grade-results');
    resultsContainer.innerHTML = `
        <h3>📊 Grade Results</h3>
        
        <div class="result-item">
            <h4>Summary Statistics</h4>
            <div class="result-stat">
                <span>Total Grades:</span>
                <span><strong>${numGrades}</strong></span>
            </div>
            <div class="result-stat">
                <span>Average:</span>
                <span><strong>${average.toFixed(2)}%</strong></span>
            </div>
            <div class="result-stat">
                <span>Highest:</span>
                <span><strong>${highest.toFixed(2)}%</strong></span>
            </div>
            <div class="result-stat">
                <span>Lowest:</span>
                <span><strong>${lowest.toFixed(2)}%</strong></span>
            </div>
        </div>
        
        <div class="result-item">
            <h4>Academic Performance</h4>
            <div class="result-stat">
                <span>Letter Grade:</span>
                <span><strong>${letter}</strong></span>
            </div>
            <div class="result-stat">
                <span>GPA (4.0 scale):</span>
                <span><strong>${gpa.toFixed(2)}</strong></span>
            </div>
        </div>
        
        <div class="alert ${messageClass}">
            ${message}
        </div>
    `;
    
    resultsContainer.classList.remove('hidden');
}

// ============== UNIT CONVERTER ==============

function showConverterType(type) {
    // Update tab buttons
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // Hide all converter sections
    const sections = document.querySelectorAll('.converter-section');
    sections.forEach(section => section.classList.add('hidden'));
    
    // Show selected converter
    document.getElementById(`${type}-converter`).classList.remove('hidden');
}

function convertDistance() {
    const type = document.getElementById('distance-type').value;
    const input = parseFloat(document.getElementById('distance-input').value);
    
    if (isNaN(input)) {
        alert('Please enter a valid number');
        return;
    }
    
    let result, fromUnit, toUnit;
    
    switch(type) {
        case 'miles-to-km':
            result = input * 1.60934;
            fromUnit = 'miles';
            toUnit = 'km';
            break;
        case 'km-to-miles':
            result = input / 1.60934;
            fromUnit = 'km';
            toUnit = 'miles';
            break;
        case 'feet-to-meters':
            result = input * 0.3048;
            fromUnit = 'feet';
            toUnit = 'meters';
            break;
        case 'meters-to-feet':
            result = input / 0.3048;
            fromUnit = 'meters';
            toUnit = 'feet';
            break;
    }
    
    document.getElementById('distance-result').innerHTML = 
        `✓ ${input.toFixed(2)} ${fromUnit} = <strong>${result.toFixed(2)} ${toUnit}</strong>`;
}

function convertTemperature() {
    const type = document.getElementById('temp-type').value;
    const input = parseFloat(document.getElementById('temp-input').value);
    
    if (isNaN(input)) {
        alert('Please enter a valid number');
        return;
    }
    
    let result, fromUnit, toUnit;
    
    switch(type) {
        case 'c-to-f':
            result = (input * 9/5) + 32;
            fromUnit = '°C';
            toUnit = '°F';
            break;
        case 'f-to-c':
            result = (input - 32) * 5/9;
            fromUnit = '°F';
            toUnit = '°C';
            break;
        case 'c-to-k':
            result = input + 273.15;
            fromUnit = '°C';
            toUnit = 'K';
            break;
        case 'k-to-c':
            result = input - 273.15;
            fromUnit = 'K';
            toUnit = '°C';
            break;
    }
    
    document.getElementById('temp-result').innerHTML = 
        `✓ ${input.toFixed(2)}${fromUnit} = <strong>${result.toFixed(2)}${toUnit}</strong>`;
}

function convertWeight() {
    const type = document.getElementById('weight-type').value;
    const input = parseFloat(document.getElementById('weight-input').value);
    
    if (isNaN(input)) {
        alert('Please enter a valid number');
        return;
    }
    
    let result, fromUnit, toUnit;
    
    switch(type) {
        case 'lbs-to-kg':
            result = input * 0.453592;
            fromUnit = 'lbs';
            toUnit = 'kg';
            break;
        case 'kg-to-lbs':
            result = input / 0.453592;
            fromUnit = 'kg';
            toUnit = 'lbs';
            break;
        case 'oz-to-g':
            result = input * 28.3495;
            fromUnit = 'oz';
            toUnit = 'g';
            break;
        case 'g-to-oz':
            result = input / 28.3495;
            fromUnit = 'g';
            toUnit = 'oz';
            break;
    }
    
    document.getElementById('weight-result').innerHTML = 
        `✓ ${input.toFixed(2)} ${fromUnit} = <strong>${result.toFixed(2)} ${toUnit}</strong>`;
}

function convertTime() {
    const type = document.getElementById('time-type').value;
    const input = parseFloat(document.getElementById('time-input').value);
    
    if (isNaN(input)) {
        alert('Please enter a valid number');
        return;
    }
    
    let result, fromUnit, toUnit;
    
    switch(type) {
        case 'hours-to-min':
            result = input * 60;
            fromUnit = 'hours';
            toUnit = 'minutes';
            break;
        case 'min-to-sec':
            result = input * 60;
            fromUnit = 'minutes';
            toUnit = 'seconds';
            break;
        case 'days-to-hours':
            result = input * 24;
            fromUnit = 'days';
            toUnit = 'hours';
            break;
        case 'weeks-to-days':
            result = input * 7;
            fromUnit = 'weeks';
            toUnit = 'days';
            break;
    }
    
    document.getElementById('time-result').innerHTML = 
        `✓ ${input.toFixed(2)} ${fromUnit} = <strong>${result.toFixed(2)} ${toUnit}</strong>`;
}

// ============== BUDGET HELPER ==============

function calculateBudget() {
    // Get budget values
    const totalBudget = parseFloat(document.getElementById('total-budget').value);
    const foodBudget = parseFloat(document.getElementById('food-budget').value);
    const transBudget = parseFloat(document.getElementById('trans-budget').value);
    const entBudget = parseFloat(document.getElementById('ent-budget').value);
    const otherBudget = parseFloat(document.getElementById('other-budget').value);
    
    // Get spending values
    const foodSpent = parseFloat(document.getElementById('food-spent').value);
    const transSpent = parseFloat(document.getElementById('trans-spent').value);
    const entSpent = parseFloat(document.getElementById('ent-spent').value);
    const otherSpent = parseFloat(document.getElementById('other-spent').value);
    
    // Validate inputs
    if (isNaN(totalBudget) || isNaN(foodBudget) || isNaN(transBudget) || 
        isNaN(entBudget) || isNaN(otherBudget) || isNaN(foodSpent) || 
        isNaN(transSpent) || isNaN(entSpent) || isNaN(otherSpent)) {
        alert('Please fill in all budget and spending fields');
        return;
    }
    
    // Calculate totals
    const categoryBudgetTotal = foodBudget + transBudget + entBudget + otherBudget;
    const totalSpent = foodSpent + transSpent + entSpent + otherSpent;
    
    // Calculate remaining
    const foodRemaining = foodBudget - foodSpent;
    const transRemaining = transBudget - transSpent;
    const entRemaining = entBudget - entSpent;
    const otherRemaining = otherBudget - otherSpent;
    const totalRemaining = totalBudget - totalSpent;
    
    // Calculate percentages
    const foodPercent = (foodSpent / foodBudget) * 100;
    const transPercent = (transSpent / transBudget) * 100;
    const entPercent = (entSpent / entBudget) * 100;
    const otherPercent = (otherSpent / otherBudget) * 100;
    const overallPercent = (totalSpent / totalBudget) * 100;
    
    // Find biggest expense
    const categories = [
        {name: 'Food', spent: foodSpent},
        {name: 'Transportation', spent: transSpent},
        {name: 'Entertainment', spent: entSpent},
        {name: 'Other', spent: otherSpent}
    ];
    const biggestExpense = categories.reduce((max, cat) => 
        cat.spent > max.spent ? cat : max
    );
    
    // Calculate daily average
    const avgDailySpending = totalSpent / 30;
    
    // Generate category HTML
    function getCategoryHTML(name, icon, budget, spent, remaining, percent) {
        let warning = '';
        let warningClass = '';
        
        if (remaining < 0) {
            warning = `⚠️ OVER BUDGET by $${Math.abs(remaining).toFixed(2)}`;
            warningClass = 'alert-danger';
        } else if (percent > 90) {
            warning = '⚡ Almost out of budget!';
            warningClass = 'alert-warning';
        } else if (percent > 75) {
            warning = '⚠️ High spending';
            warningClass = 'alert-warning';
        }
        
        const progressColor = percent > 100 ? '#dc3545' : 
                             percent > 90 ? '#ffc107' : 
                             percent > 75 ? '#fd7e14' : '#28a745';
        
        return `
            <div class="result-item">
                <h4>${icon} ${name.toUpperCase()}</h4>
                <div class="result-stat">
                    <span>Budget:</span>
                    <span>$${budget.toFixed(2)}</span>
                </div>
                <div class="result-stat">
                    <span>Spent:</span>
                    <span>$${spent.toFixed(2)}</span>
                </div>
                <div class="result-stat">
                    <span>Remaining:</span>
                    <span style="color: ${remaining < 0 ? '#ff6b6b' : '#51cf66'}">
                        $${remaining.toFixed(2)}
                    </span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${Math.min(percent, 100)}%; background: ${progressColor}">
                        ${percent.toFixed(1)}%
                    </div>
                </div>
                ${warning ? `<div class="alert ${warningClass}" style="margin-top: 10px">${warning}</div>` : ''}
            </div>
        `;
    }
    
    // Generate recommendations
    let recommendations = '';
    if (totalRemaining < 0) {
        recommendations = `
            <div class="alert alert-danger">
                <strong>⚠️ URGENT:</strong> You're over budget! Cut spending immediately.<br>
                Need to reduce spending by $${Math.abs(totalRemaining).toFixed(2)}
            </div>
        `;
    } else if (overallPercent > 90) {
        recommendations = `
            <div class="alert alert-warning">
                <strong>⚡ Warning:</strong> Be very careful with remaining funds.<br>
                Avoid non-essential purchases.
            </div>
        `;
    } else if (overallPercent > 75) {
        recommendations = `
            <div class="alert alert-warning">
                <strong>⚠️ Caution:</strong> You're spending at a high rate.<br>
                Consider reducing spending to stay on track.
            </div>
        `;
    } else if (overallPercent > 50) {
        recommendations = `
            <div class="alert alert-info">
                <strong>👍 Good pace!</strong> Stay mindful of spending.
            </div>
        `;
    } else {
        recommendations = `
            <div class="alert alert-success">
                <strong>🎉 Excellent!</strong> You're managing your money well.
            </div>
        `;
    }
    
    // Display results
    const resultsContainer = document.getElementById('budget-results');
    resultsContainer.innerHTML = `
        <h3>💰 Budget Summary</h3>
        
        ${getCategoryHTML('Food', '🍔', foodBudget, foodSpent, foodRemaining, foodPercent)}
        ${getCategoryHTML('Transportation', '🚗', transBudget, transSpent, transRemaining, transPercent)}
        ${getCategoryHTML('Entertainment', '🎮', entBudget, entSpent, entRemaining, entPercent)}
        ${getCategoryHTML('Other', '📦', otherBudget, otherSpent, otherRemaining, otherPercent)}
        
        <div class="result-item" style="margin-top: 20px">
            <h4>📊 OVERALL SUMMARY</h4>
            <div class="result-stat">
                <span>Total Budget:</span>
                <span><strong>$${totalBudget.toFixed(2)}</strong></span>
            </div>
            <div class="result-stat">
                <span>Category Budgets:</span>
                <span>$${categoryBudgetTotal.toFixed(2)}</span>
            </div>
            <div class="result-stat">
                <span>Total Spent:</span>
                <span><strong>$${totalSpent.toFixed(2)}</strong></span>
            </div>
            <div class="result-stat">
                <span>Total Remaining:</span>
                <span style="color: ${totalRemaining < 0 ? '#ff6b6b' : '#51cf66'}">
                    <strong>$${totalRemaining.toFixed(2)}</strong>
                </span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${Math.min(overallPercent, 100)}%; 
                     background: ${overallPercent > 100 ? '#dc3545' : overallPercent > 90 ? '#ffc107' : '#28a745'}">
                    ${overallPercent.toFixed(1)}%
                </div>
            </div>
        </div>
        
        <div class="result-item">
            <h4>💡 INSIGHTS & RECOMMENDATIONS</h4>
            ${recommendations}
            <div class="result-stat">
                <span>Biggest Expense:</span>
                <span><strong>${biggestExpense.name} ($${biggestExpense.spent.toFixed(2)})</strong></span>
            </div>
            <div class="result-stat">
                <span>Average Daily Spending:</span>
                <span><strong>$${avgDailySpending.toFixed(2)}</strong></span>
            </div>
        </div>
    `;
    
    resultsContainer.classList.remove('hidden');
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
