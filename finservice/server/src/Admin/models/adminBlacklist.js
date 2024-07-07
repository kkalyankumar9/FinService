const mongoose = require('mongoose');

const adminBlackListSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },

});

const AdminBlackListModule = mongoose.model('AdminBlackList', adminBlackListSchema);

module.exports = AdminBlackListModule;



