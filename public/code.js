document.addEventListener("alpine:init", () => {
  Alpine.data("BOOTCAMPEXPRESSAPIWITHSQL", () => {
    return {
      title: "MY PHONEBILL API WITH SQL USING MATERIALIZE FRAMEWORK",

      titlePhoneBillsql: "MY PHONE BILL API WITH SQL",
      titlePhoneBillsqladd: "PHONE BILL PRICE PLAN CALCULATOR",
      titlePhoneBillsqlupdate: "UPDATING AN EXISITING PRICE PLAN",
      titlePhoneBillsqldelete: "DELETING AN EXISITING PRICE PLAN",
      titlePhoneBillsqlavailable:
        "TOTAL AVAILABLE PRICE PLANS IN THE DATABABSE",
      totalplanprice: false,
      call_price: 0,
      sms_price: 0,
      plan_name: "",
      response: [],
      addMessage:"",
      deleteMesage:"",
      updateMessage:"",
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
            this.addMessage = this.plan_name +" plan name successfully added";
          });
          setTimeout(() => (this.addMessage = "",this.plan_name= "", this.sms_price="", this.call_price=""), 3000);
       
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
          this.deleteMesage = this.plan_name +" plan name successfully deleted";
        });
        setTimeout(() => (this.deleteMesage = ""), 3000);
      },
      // delete plan ends here

      init() {
        this.getPlans();
        // this.createPlan();
      },

      refresh(){

        this.plan_name = "";
        this.sms_price = 0;
        this.call_price = 0;


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