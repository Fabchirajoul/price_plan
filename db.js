import * as sqlite from "sqlite";
import sqlite3 from "sqlite3";

const db = await sqlite.open({
  filename: "./data_plan.db",
  driver: sqlite3.Database,
});

await db.migrate();

// All plans in the database starts here
export async function getPlans() {
  const price_plans = await db.all(`select * from price_plan`);

  return price_plans?.map(item => {
    console.log(item)
    return {
      ...item, 
      total: Number(item.sms_price) + Number( item.call_price)
    }
  })
}
// all plans in the database ends  here

// adding a new price plan starts here

export async function createPlan(name, sms_cost, call_cost) {
  console.log("work");
  await db.run(
    `insert into price_plan (plan_name, sms_price, call_price) VALUES (?,?,?)`,
   [ name,
    sms_cost,
    call_cost]
  );
}

// adding a new price plan ends here

// deleting a price plan starts here 

export async function deletePlan(name){
  console.log(name)
  await db.run(
    `delete from price_plan where plan_name = ?`,[name]);

}
// deleting a price plan ends here 

// Plan total starts here 


export async function planTotal(price_plan){

  // await db.get(`SELECT id, plan_name, sms_price, call_price FROM price_plan WHERE plan_name = ?`, [price_plan]);
  
    const activity = await db.get(`SELECT id, plan_name, sms_price, call_price FROM price_plan WHERE plan_name = ?`, [price_plan]);
    
    // const activities = activity.split(",");
    let total = 0;
    
    let data = activity?.map(item => {
      return {
        ...item, 
        total: item.sms_cost + item.call_cost
      }
    })
    
    console.log({data, price_plan});
    // activities.forEach((action) => {
    //   if (action.trim() == "sms") {
    //     total += price_plan.sms_price;
    //   } else if (action.trim() == "call") {
    //     total += price_plan.call_price;
    //   }
    // });

    // Use the price plan to calculate the total cost ends here
return total
    // res.json({
    //   // status: "Success",
    //   total,
    // });
  }
// plan total ends here 

// const price_plans = await getPlans();

// console.log(price_plans);
