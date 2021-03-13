var express     = require("express"),
    router      = express.Router(),
    Worker      = require("../models/worker"),
    Department  = require("../models/department"),
    Admin       = require("../models/admin");

router.get("/", (req, res) => {
   const admin = res.locals.current.admin._id;
   if (admin) {
      Worker.find({admin}, (err, workers) => {
         if(err)
            console.log(err)
         else{
            Department.find({}, (err, departments) => {
               var depWorkers = []
               departments.forEach(dep => {
                  var depworker = {
                     dName: dep.dName,
                     workers: []
                  }
                  workers.forEach(worker => {
                     if(worker.department == dep._id)
                        depworker['workers'].push(worker);
                  })
                  depWorkers.push(depworker);
               })
               res.render('../views/worker/worker.ejs', {depWorkers})
            })
         }
     })
   }else {
      res.redirect('/admin/login')
   }
});

router.get("/add", (req, res) => {
   Department.find({}, (err, departments) => {
      res.render('../views/worker/add.ejs', {departments})
   })
})

router.post("/", (req, res) => {
   const { fName, mName, lName, dob, address, phone, email, department, position, salary } = req.body
   if(phone.length != 10){
      res.locals.current.error = 'Invalid Phone Number'      
      return res.redirect('/worker/add')
   }
   Worker.findOne({email})
      .then(worker =>{
         if(worker){
            return res.redirect('/worker')
         }
         const admin = res.locals.current.admin._id;
         const newWorker = new Worker ({
            fName, mName, lName, dob, address, phone, email, department, position, salary, admin
         })
         
         Admin.findById(admin)
            .then(adm => {
               adm.workers.push(newWorker._id);
               adm.save()
                  .then(admin => {
                     newWorker.save()
                        .then(() => res.redirect('/worker'))
                  })
                  .catch(err => console.log(err))
            })
      })
})

router.post('/delete', (req, res) => {
   const admin = res.locals.current.admin;
   const {wid} = req.body;
   Worker.findByIdAndRemove(wid, (err) => {
      if(err){
         console.log(err);
      }else{
         Admin.findById(admin._id)
            .then(admin => {
               for (let i = 0; i < admin.workers.length; i++) {
                  if(admin.workers[i] == wid)
                     admin.workers.splice(i,1)
               }
               admin.save()
                  .then(res.redirect('/worker'));
            })
      }
  });
})

router.get("/add-department", (req, res) => {
   res.render('../views/worker/add-department.ejs')
})

router.post("/add-department", (req, res) => {
   const { dName, purpose } = req.body;
   newDep = new Department({ dName, purpose })
   newDep.save()
      .then(dep => res.redirect('/worker'))
})

module.exports = router;
