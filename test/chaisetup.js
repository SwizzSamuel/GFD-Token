"use strict";

var chai = require("chai");

var BN = web3.utils.BN;
var chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);


module.exports = chai;