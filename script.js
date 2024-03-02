const dayinput = document.querySelector("#day");
const monthinput = document.querySelector("#month");
const yearinput = document.querySelector("#year");
const dayoutput = document.querySelector(".day-output");
const monthoutput = document.querySelector(".month-output");
const yearoutput = document.querySelector(".year-output");
const placeholder = document.querySelectorAll(".placeholder");
const btn = document.querySelector(".btn");
const errormsg = document.querySelectorAll(".error");
let arr = [31,28,31,30,31,30,31,31,30,31,30,31];
const d = new Date();
const curryear = d.getFullYear();
const currmonth = d.getMonth();
const currday = d.getDate();
btn.addEventListener("click",(e)=>{
    let daycheck = true;
    let monthcheck = true;
    let yearcheck = true;
    if((curryear%100==0)?(curryear%400==0):(curryear%4==0))
        arr[1] = 29;
    if(dayinput.value == ""){
        required(0);
        daycheck = false;
    }
    else if(dayinput.value<1 || ((monthinput.value == "")? dayinput.value>31 : dayinput.value>arr[monthinput.value-1] || (yearinput.value == curryear && monthinput.value-1 == currmonth && dayinput.value>currday)))
    {
        daycheck = false;
        valid("day",0);
    }
    if(monthinput.value == ""){
        required(1);
        monthcheck = false;
    }
    else if(monthinput.value<1 || monthinput.value>12 || (yearinput.value == curryear && monthinput.value-1>currmonth)){
        valid("month",1);
        monthcheck = false;
    }
    if(yearinput.value == ""){
        required(2);
        yearcheck = false;
    }
    if(yearinput.value>curryear){
        valid("year",2);
        yearcheck = false;   
    }
    if(daycheck == true)
        success(0);
    if(monthcheck == true)
        success(1);
    if(yearcheck == true)
        success(2);
    if(daycheck==true && monthcheck==true && yearcheck==true)
    {
        let ageday=0,agemonth=0,ageyear=0;
        if(currmonth+1>monthinput.value)
        {
            ageyear = curryear - yearinput.value;
            agemonth = currmonth - monthinput.value;
            ageday = arr[monthinput.value-1] - dayinput.value + currday;
            if(ageday>arr[agemonth])
            {
                ageday = ageday - arr[agemonth];
                agemonth++;
            }
        }
        else
        {
            ageyear = curryear - yearinput.value - 1;
            agemonth = 12-monthinput.value + currmonth;
            ageday = arr[monthinput.value-1] - dayinput.value + currday;
            if(ageday>arr[agemonth])
            {
                ageday = ageday - arr[agemonth];
                agemonth++;
            }

        }
        console.log(ageyear);
        console.log(agemonth);
        console.log(ageday);
        /*if(agemonth>11)
        {
            agemonth = agemonth-12;
            ageyear++;
        }*/  
        yearoutput.innerHTML = ageyear;
        monthoutput.innerHTML = agemonth;
        dayoutput.innerHTML = ageday;
    }

})
function required(i){
    errormsg[i].innerHTML = "This field is required";
    placeholder[i].classList.add("err");
}
function valid(msg,i){
    placeholder[i].classList.add("err");
    errormsg[i].innerHTML = `Must be a valid ${msg}`;
}
function success(i){
    errormsg[i].innerHTML = "";
    if(placeholder[i].classList.contains("err"))
        placeholder[i].classList.remove("err");
}

