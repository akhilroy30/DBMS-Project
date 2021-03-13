var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser")
    app             = express();
    PORT            = 5000;

var current = {
   customer: {},
   admin: {},
   error: ''
}

//Routes
var authRoutes = require('./routes/auth')
var productRoutes = require('./routes/product')
var workerRoutes = require('./routes/worker')
var warehouseRoutes = require('./routes/warehouse')
var rawRoutes = require('./routes/raw')
var machineRoutes = require('./routes/machine')
var departmentRoutes = require('./routes/department');
var dealerRoutes = require('./routes/dealer');
var myProductsRoutes = require('./routes/myProducts');
var shipmentRoutes = require('./routes/shipment');

//Body Parser Config
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

//Mongoose init
mongoose.connect("mongodb+srv://AkhilRoy:AkhilRoy123@cluster0.p4xpk.mongodb.net/Factory-Management?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
app.set("view engine", "ejs");

app.use(function(req, res, next){
   res.locals.current = current;
   next();
});

//Routes

app.use('/', authRoutes)
app.use('/', productRoutes)
app.use('/worker', workerRoutes)
app.use('/warehouse', warehouseRoutes)
app.use('/raw', rawRoutes)
app.use('/machine', machineRoutes)
app.use('/department', departmentRoutes)
app.use('/dealer', dealerRoutes)
app.use('/myproducts', myProductsRoutes)
app.use('/shipment', shipmentRoutes)

app.listen(PORT, function(){
   console.log("The Factory Management Server Started");
})