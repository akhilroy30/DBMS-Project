var express     = require("express"),
    router      = express.Router(),
    Product      = require("../models/product"),
    Shipment      = require("../models/shipment");

router.get("/", (req, res) => {
   const admin = res.locals.current.admin._id;
   if (admin) {
      Shipment.find({admin}, (err, shipments) => {
         if(err)
            console.log(err)
         else
            res.render('../views/shipment/shipment.ejs', {shipments})
     })
   }else {
      res.redirect('/admin/login')
   }
});

router.get("/add", (req, res) => {
   Product.find({}, function(err, products){
      if(err){
         console.log(err)
      }
      else{
         res.render('../views/shipment/add.ejs', {products})
      }
   })
})

router.post("/", (req, res) => {
   const { sName, date, location, products } = req.body
   const pNames = []
   if(products){
      if(typeof products == 'string'){
         pNames.push(products.split(' - ')[0])
      }else {
         for (let i = 0; i < products.length; i++) {
            pNames.push(products[i].split(' - ')[0])
         }
      }
   }

   Shipment.findOne({sName})
      .then(shipement =>{
         if(shipement){
            return res.redirect('/shipment')
         }
         const admin = res.locals.current.admin._id;
         const newShipment = new Shipment ({
            sName, date, location, admin, products: pNames
         })
         
         newShipment.save()
            .then(() => res.redirect('/shipment'))
      })
})

router.post('/delete', (req, res) => {
   const {sid} = req.body;
   Shipment.findByIdAndRemove(sid, (err) => {
      if(err){
         console.log(err);
      }else{
         res.redirect('/shipment')
      }
  });
})

module.exports = router;
