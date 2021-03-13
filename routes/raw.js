var express     = require("express"),
    router      = express.Router(),
    Dealer       = require("../models/dealer"),
    Warehouse = require("../models/warehouse");

router.get("/", (req, res) => {
   const adminId = res.locals.current.admin._id;
   if (adminId) {
      Raw.find({}, function(err, raws){
         if(err){
            console.log(err)
         }
         else{
            res.render('../views/raw/raw.ejs', {raws})
         }
     })
   }else {
      res.redirect('/admin/login')
   }
});

router.get("/add", (req, res) => {
   Dealer.find({}, function(err, dealers){
      if(err)
         console.log(err)
      else{
         res.render("../views/raw/add.ejs", {dealers})
      }
   })
})

router.post("/", (req, res) => {
   const admin = res.locals.current.admin
   const { rName, quantity, dealer, price, expDate } = req.body
   Raw.findOne({rName})
      .then(raw => {
         const newRaw = new Raw ({
            rName, quantity, dealer, price, expDate
         })
         Warehouse.findById(admin.warehouse)
            .then(ware => {
               ware.raws.push(newRaw.rName);
               ware.save()
                  .then(ware => {
                     newRaw.warehouse = ware.wName;
                     newRaw.save()
                        .then(() => res.redirect('/raw'))
                  })
                  .catch(err => console.log(err))
            })
      })
})

router.post('/delete', (req, res) => {
   const {rid} = req.body;
   Raw.findByIdAndRemove(rid, (err) => {
      if(err){
         console.log(err);
      }else{
         res.redirect('/raw')
      }
  });
})

module.exports = router;
