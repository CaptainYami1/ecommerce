
var express = require("express");
var router = express.Router();

const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const getDB = async () => {
  try {
    const data = await fs.promises.readFile("./db.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    throw error;
  }
};

const writeDB = async (data) => {
  try {
    const db = await getDB();
    const newData = { ...db, users: [].concat(db.users).concat([data]) };
    console.log("newData", newData);
    await fs.promises.writeFile("./db.json", JSON.stringify(newData, null, 2));
  } catch (error) {
    console.error("Error writing database:", error);
    throw error;
  }
};

/* GET users listing. */
router.get("/users", async function (req, res, next) {
  const db = await getDB();
  return res.status(200).json({
    message: "Users list",
    users: db?.users || [],
  });
});

/* POST users listing. */
router.post("/users", async function (req, res, next) {
  const { email, password, firstname, lastname, phoneNumber } = req.body;

  await writeDB({ email, password, firstname, lastname, phoneNumber });
  return res.status(200).json({
    message: "added user",
    user: { email, password, firstname, lastname, phoneNumber },
  });
});

router.post("/login-user", async function (req, res, next) {
  const { email, password } = req.body;
  const db = await getDB();
  const user = db?.users?.find((user) => user.email === email);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (user.password !== password) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }
  return res.status(200).json({
    message: "Login successful",
    user: user,
  });
});

router.post("/get-email", async function (req, res, next) {
  const { email } = req.body;
  const db = await getDB();
  const user = db?.users?.find((user) => user.email === email);
  
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
return res.status(200).json({
    message: "email already exists",
    user: user,
  });
});

router.post("/users/order", async function (req, res, next) {
  const { email, order } = req.body;
  const db = await getDB();
  const user = db?.users?.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const orderWithId = {
    id: uuidv4(),       
    ...order,           
    date: new Date(),   
  };

  if (!user.orders) {
    user.orders = [];
  }

  user.orders.push(orderWithId);

 

  res.status(200).json({
    message: "Order saved successfully",
    order: orderWithId,
  });
});


module.exports = router;