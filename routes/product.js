var express     = require("express"),
    router      = express.Router(),
    Product     = require("../models/product"),
    Machine     = require("../models/machine"),
    Warehouse   = require("../models/warehouse");

router.get("/", (req, res) => {
   Product.find()
      .then(products => {    
         res.render('../views/home', {products})
      })
});

router.get("/add", (req, res) => {
   const adminId = res.locals.current.admin;
   if (adminId) {
      Machine.find({})
      .then(machines => {
         res.render("../views/add.ejs", {machines})
      })   
   }else {
      res.redirect('/admin/login')
   }
})

router.post("/", (req, res) => {
   const { pName, quantity, price, mfDate, machines } = req.body

   const admin = res.locals.current.admin._id;
   
   const machineNames = []
   if(machines){
      if(typeof machines == 'string'){
         machineNames.push(machines.split(' - ')[0])
      }else{
         for (let i = 0; i < machines.length; i++) {
            machineNames.push(machines[i].split(' - ')[0]);
         }
      }
   }

   Product.findOne({pName})
      .then(product =>{
         if(product){
            return res.redirect('/')
         }
         Warehouse.findById(res.locals.current.admin.warehouse)
            .then(ware => {
               const warehouse = ware.wName;
               const newProduct = new Product ({
                  pName, quantity, price, mfDate, warehouse, admin, machines: machineNames
               })
               
               newProduct.save()
                  .then(product => res.redirect('/'))
                  .catch(err => console.log(err))
            })
      })
})

router.post('/delete', (req, res) => {
   const {pid} = req.body;
   Product.findByIdAndRemove(pid, (err) => {
      if(err){
          console.log(err);
      }else{
          res.redirect("/");
      }
  });
})

module.exports = router;
