'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/docebitdb');

module.exports = mongoose;