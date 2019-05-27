const mongoose = require('mongoose');

const supervisorSchema = mongoose.Schema({
   firstName: {
       type: String,
       required: true
   },
   lastName: {
       type: String,
       required: true
   },
   phoneNo: {
       type: String,
       required: true
   },
   email: {
       type: String
   },
   address: {
       type: String,
       required: true
   }
},
    {
        collection: 'supervisor'
    }
    );

module.exports = mongoose.model('SuperVisor', supervisorSchema);
