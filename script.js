document.querySelector("#calculate").addEventListener("click", function(){
    //getting the elements
    var loan_amount = document.querySelector("#loan_amount");
    var interest_rate = document.querySelector("#interest_rate");
    var loan_term = document.querySelector("#loan_term");
    var radio = document.getElementsByName("compounding");
    //getting the values from the elements
    var loan_value = parseFloat(loan_amount.value);
    var interest_value = parseFloat(interest_rate.value)/100;
    var term_value = parseInt(loan_term.value);
    //getting value from the radio buttons
    var compounding = 1;
    var radioValue;
    for(var i =0; i < radio.length; i++) {
        if(radio[i].checked){
            radioValue = i+1;
        }
    }
    //translating the values of the radio button to actual compounding parameter
    switch(radioValue){
        case 1:
        compounding = 12;
        break;
        case 2:
        compounding = 4;
        break;
        case 3:
        compounding = 2;
        break;
        case 4:
        compounding = 1;
        break;
        default:
        compounding = 1;
        break;
    }
    //generating an error message if the input is not valid
    if(isNaN(loan_value) || isNaN(interest_value) || isNaN(term_value)){
        alert("Please enter valid numbers in all the fields");
        document.querySelector("#myForm").reset();
    }
    else {
        //declaring the calculation variables and doing the loan calculation for summary
        var monthly_interest = interest_value /compounding;
        var monthly_term = term_value * compounding;
        var compounding_factor = monthly_interest/(1 - (Math.pow((1+ monthly_interest), (-monthly_term))));
        var monthly_payment = loan_value * compounding_factor;
        //generating summary message
        var output = document.querySelector("#output");
        output.innerHTML = "Your principal amount: $" +loan_value +"<br>"
                        +"Your interest rate: " +interest_value*100 +"%" +"<br>"
                        +"Your tenure: " +term_value +" years" +"<br>"
                        +"Your monthly installment: $" +monthly_payment.toFixed(2);
        //resetting the input boxes
        document.querySelector("#myForm").reset();

        //creating and appending table headers
        var repayment_schedule = document.querySelector("#repayment_schedule");
        var payment_table = document.querySelector("#payment_table");
        payment_table.style.display = 'block';
        
        //creating the data rows and calculating the figures in it
        var sch_beg_amount= loan_value;
        var sch_end_amount=sch_beg_amount;
        var sch_principal;
        var sch_interest;
        //console.log("Monthly term: " +monthly_term);
        for(var i = 0; i < monthly_term; ++i){
            //calculations of the loan repayment schedule
            sch_interest = sch_beg_amount * monthly_interest;
            sch_principal = monthly_payment - sch_interest;
            sch_end_amount -= sch_principal;

            var data_row = document.createElement('tr');
            repayment_schedule.appendChild(data_row);
            var data_serial = document.createElement('td');
            data_serial.innerText = i+1;
            var data_begining = document.createElement('td');
            data_begining.innerText = sch_beg_amount.toFixed(2);
            var data_installment = document.createElement('td');
            data_installment.innerText = monthly_payment.toFixed(2);
            var data_interest = document.createElement('td');
            data_interest.innerText = sch_interest.toFixed(2);
            var data_principal = document.createElement('td');
            data_principal.innerText = sch_principal.toFixed(2);
            var data_ending = document.createElement('td');
            data_ending.innerText = sch_end_amount.toFixed(2);
            
            data_row.appendChild(data_serial);
            data_row.appendChild(data_begining);
            data_row.appendChild(data_installment);
            data_row.appendChild(data_interest);
            data_row.appendChild(data_principal);
            data_row.appendChild(data_ending);
            
            sch_beg_amount= sch_end_amount;
        }
    }
}, false);

document.querySelector("#refresh").addEventListener('click', function(){
    location.reload();
}, false);