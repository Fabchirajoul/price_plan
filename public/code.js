document.addEventListener("alpine:init", () => {
  Alpine.data("BOOTCAMPEXPRESSAPIWITHSQL", () => {
    return {
      title: "MY PHONEBILL API WITH SQL USING MATERIALIZE FRAMEWORK",

      titlePhoneBillsql: "MY PHONE BILL API WITH SQL",
      titlePhoneBillsqladd: "ADDING A NEW PRICE PLAN",
      titlePhoneBillsqlupdate: "UPDATING AN EXISITING PRICE PLAN",
      titlePhoneBillsqldelete: "DELETING AN EXISITING PRICE PLAN",
      titlePhoneBillsqlavailable:
        "TOTAL AVAILABLE PRICE PLANS IN THE DATABABSE",
      totalplanprice: false,
      call_price: 0,
      sms_price: 0,
      plan_name: "",
      response: [],
      // allplans:[],

      // Phone bill starts Here

      // get all plan price plan starts here
      getPlans() {
        axios.get("/api/price_plans").then((result) => {
          this.response = result.data.price_plans;
          console.log(result.data.price_plans);
        });
      },

      // get all price plans ends here

      // creating a new price plan starts here

      createPlan() {
        axios
          .post("/api/price_plan/create", {
            plan_name: this.plan_name,
            sms_price: this.sms_price,
            call_price: this.call_price,
          })
          .then((result) => {
            console.log("result here " + result.data.response);
          });
        console.log("ook");
      },

      // creating a new price plans ends here

      // delete plan starts here

      deletePlan(plan_name){


        axios
        .post("/api/price_plan/delete", {

          plan_name: plan_name,
        })
        .then((result) =>{
          console.log("result here" +result.data.response);
        });
      },
      // delete plan ends here

      // total starts here 

      planTotal (price_plan){


        axios
        .post("/api/phonebill/", {

          price_plan: price_plan,
        })
        .then((result) =>{
          console.log("result here" +result.data);
        })
      },



      // total ends here 

      init() {
        this.getPlans();
        // this.createPlan();
      },

      // get all price plan ends here
      // Creates a new price plan starts here

      // Creating to add a new price plan ends here

      // update price plan starts here

      // update price plan ends here



      // Getting total for a price plan starts here

      // getting total for a price plan ends here
    };
  });
});
