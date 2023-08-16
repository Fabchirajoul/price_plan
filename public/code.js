document.addEventListener("alpine:init", () => {
  Alpine.data("BOOTCAMPEXPRESSAPIWITHSQL", () => {
    return {
      title: "MY PHONEBILL API WITH SQL USING MATERIALIZE FRAMEWORK",
      
      titlePhoneBillsql: "MY PHONE BILL API WITH SQL",
      titlePhoneBillsqladd: "ADDING A NEW PRICE PLAN",
      titlePhoneBillsqlupdate: "UPDATING AN EXISITING PRICE PLAN",
      titlePhoneBillsqldelete: "DELETING AN EXISITING PRICE PLAN",
      titlePhoneBillsqlavailable: "TOTAL AVAILABLE PRICE PLANS IN THE DATABABSE",
      OPEN: false,
      

      
// Phone bill starts Here 
// Creates a new price plan starts here
addPricePlan() {
  axios
      .post('http://localhost:4011/api/price_plan/create', {
          plan_name: this.name,
          call_price: this.call_price,
          sms_price: this.sms_price
      })
      .then((result) => {
          this.response = result.data
      })
},

// Creating to add a new price plan ends here 


// update price plan starts here 
updatePricePlan() {
  axios
      .post('http://localhost:3009/api/price_plan/update', {
          plan_name: this.nameUpdate,
          call_price: this.call_priceUpdate,
          sms_price: this.sms_priceUpdate
      })
      .then((result) => {
          this.response = result.data
      })
},
// update price plan ends here

      

     
    }
  });
});
