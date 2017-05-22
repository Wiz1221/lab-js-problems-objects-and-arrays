// Customer Object
var Customer = function (customerInfo) {
  this.id = customerInfo.id;
  this.name = customerInfo.name;
  this.carRented = {};
};

// Car Object
var Car = function (carInfo) {
  this.id = carInfo.id;
  this.producer = carInfo.producer;
  this.model = carInfo.model;
  this.rentalPricePerDay = carInfo.rentalPrice;
  this.available = true;
  this.customer = customerA;
  this.rentalDuration = 0;
  this.quotePrice = function(rentalDuration){
    return this.rentalPricePerDay * rentalDuration
  };
  this.reserve = function(customer, rentalDuration){
    if(this.available){
      this.available = false;
      this.customer = customer;
      this.rentalDuration = rentalDuration;
      return true;
    }else {
      return false;
    }
  };
  this.return = function(){
    if(this.available){
      return "Sorry, this car have already been returned";
    }else{
      this.available = true;
      this.customer = 0;
      this.rentalDuration = 0;
    }
  };
};

// Vendor Object
var Vendor = function(name) {
  this.name = name;
  this.cars = [];
  this.customers = [];
  var customerCarRented;

  this.findCarIndex = function (carID) {
    return this.cars.findIndex(function(car){
      return car.id === carID ? true : false ;
    });
  };

  this.findCustomerIndex = function (customerID) {
    return this.customers.findIndex(function(customer){
      return customer.id === customerID ? true : false ;
    });
  };

  this.getCar = function (carID) {
    return this.cars.find(function(car){
      return car.id === carID ? true : false ;
    });
  };

  this.getCustomer = function (customerID) {
    return this.customers.find(function(customer){
      return customer.id === customerID ? true : false ;
    });
  };

  this.addCar = function(carObj){
    if(this.getCar(carObj.id)!=null){
      console.log("ID already exists");
    }else{
      this.cars.push(carObj);
      console.log("Car added to warehouse");
    }
  };

  this.addCustomer = function(customerObj){
    if(this.getCustomer(customerObj.id)!=null){
      console.log("ID already exists");
    }else{
      this.customers.push(customerObj);
      console.log("Customer added to warehouse");
    }
  };

  this.removeCar = function(carID){
    if(this.findCarIndex(carID)>=0){
        this.cars.splice(this.findCarIndex(carID),1);
        console.log("Car deleted");
    }else {
      console.log("Car not found");
    }
  };

  this.removeCustomer = function(customerID){
    if(this.findCustomerIndex(customerID)>=0){
        this.customers.splice(this.findCustomerIndex(customerID),1);
        console.log("Customer deleted");
    }else {
      console.log("Customer not found");
    }
  };

  this.availableCars = function(){
    return this.cars.filter(function(e){return e.available;});
  };

  this.rentCar = function(customerID,rentalDuration){
    var list = this.availableCars();
    if (list.length==0){
      console.log("All our cars have been rented");
    }else {
      var customer = this.getCustomer(customerID);
      if(customer!=null){
         customerCarRented = this.availableCars()[0];
        customerCarRented.reserve(customer,rentalDuration);
        console.log("The car has been reserved");
      }else {
        console.log("Please provide a valid customerID");
      }
    }
  };
  this.returnCar = function(customerID){
    var customer = this.getCustomer(customerID);
    if(customer!=null){
      customerCarRented.return();
      customerCarRented = null;
      console.log("Thank you for your service");
    }else{
      console.log("Please provide a valid customerID");
    }
  };
  this.totalRevenue = function(){
    var car = this.cars;
    var duration = 0;
    var priceArray = [];
    for(var i=0; i<car.length; i++){
      duration = car[i].rentalDuration;
    priceArray.push(car[i].quotePrice(duration));
    }
    return priceArray.reduce(function(a,e){return a+e;});
  };

};


// Codes you can run to test your code
var customerInfo = {
  id: "001",
  name: "Sherman"
};
var customerA = new Customer(customerInfo);

var carInfo = {
  id: "001",
  producer: "Toyota",
  model: "Subra",
  rentalPrice: 200,
};

var carA = new Car(carInfo);

var vendor = new Vendor('Jens Limited');
vendor.addCustomer(customerA);

console.log(vendor.availableCars());
vendor.addCar(carA);
console.log(vendor.availableCars());

vendor.rentCar(customerA.id, 5);
