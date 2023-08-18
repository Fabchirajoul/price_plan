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

  return price_plans?.map((item) => {
    return {
      ...item,
      total: Number(item.sms_price) + Number(item.call_price),
    };
  });
}
// all plans in the database ends  here

// adding a new price plan starts here

export async function createPlan(name, sms_cost, call_cost) {
  await db.run(
    `insert into price_plan (plan_name, sms_price, call_price) VALUES (?,?,?)`,
    [name, sms_cost, call_cost]
  );
}

export async function deletePlan(name) {
  // console.log(name)
  await db.run(`delete from price_plan where plan_name = ?`, [name]);
}

