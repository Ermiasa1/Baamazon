var mysql = require("mysql");

var inquirer = require('inquirer');
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "abc",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayProducts();
});

function displayProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    for(var i = 0; i<res.length;i++){
    console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
    console.log('--------------------------------------------------------------------------------------------------')
    } 
    inquireForPurchase();

  });
}

function inquireForPurchase() {
	//get item ID and desired quantity from user
    inquirer.prompt([

        {
            name: "ID",
            type: "input",
            message: "What is the ID of the product you wish to purchase?"
        }, {
            name: 'Quantity',
            type: 'input',
            message: "How many would you like to purchase?"
        },

    ]).then(function(answers) {
        //set captured input as variables, pass variables as parameters.
        var quantityOrdered = answers.Quantity;
        var IDOdrered = answers.ID;
        purchaseFromDatabase(IDOdrered, quantityOrdered);
       // console.log("quantity ordered": + quantityOrdered + "id ordered": + IDOdrered);
    });
};

function purchaseFromDatabase(ID, quantityOrdered) {
    //check quantity of desired purchase. Minus quantity of the itemID from database if possible. Else inform user "Quantity desired not in stock" 
    connection.query('SELECT * FROM products WHERE item_id = ' + ID, function(error, response) {
        if (error) { console.log(error) };

        //if in stock
        if (quantityOrdered <= response[0].stock_quantity) {
            //calculate cost
            var totalCost = response[0].price * quantityOrdered;
            //inform user
            console.log("okay! I'll have your order right out!");
            console.log("Your total cost for " + quantityOrdered + " " + response[0].product_name + " is " + totalCost + ". Thank you for your Business!");
            //update database, minus purchased quantity
            connection.query('UPDATE products SET stock_quantity = stock_quantity - ' + quantityOrdered + ' WHERE item_id = ' + ID);
        } else {
            console.log("Our apologies! We don't have enough " + response[0].product_name + " to fulfill your order.");
        };
       connection.end();
    });


};

