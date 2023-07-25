'use strict';

var server = require('server');
var ProductMgr = require('dw/catalog/ProductMgr');
var URLUtils = require('dw/web/URLUtils');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var UUIDUtils = require('dw/util/UUIDUtils');
var Transaction = require('dw/system/Transaction');

server.get('Show', function (req, res, next) {
  var productId = dw.system.Site.getCurrent().getCustomPreferenceValue('productId');
  var product = ProductMgr.getProduct(productId);
  var name = product.getName();
  var image = product.getImage('large').getImageURL({ scaleWidth: 300, format: 'jpg' });
  var description = product.getLongDescription();
  var sampleForm = server.forms.getForm('sampleForm');

  res.render('sampleProduct', {
    name: name,
    image: image,
    description: description,
    formactionURL: URLUtils.url('ProductRequest-Save').toString(),
    sampleForm: sampleForm
  });
  next();
});

server.post('Save', function (req, res, next) {
  var sampleForm = server.forms.getForm('sampleForm');
  Transaction.wrap(function () {
    var productRequestCO = CustomObjectMgr.createCustomObject('SampleRequest', UUIDUtils.createUUID());
    productRequestCO.custom.productID = sampleForm.productID;
    productRequestCO.custom.firstName = sampleForm.firstName;
    productRequestCO.custom.lastName = sampleForm.lastName;
    productRequestCO.custom.Email = sampleForm.Email;
    productRequestCO.custom.Address1 = sampleForm.addressLine1;
    productRequestCO.custom.Address2 = sampleForm.addressLine2;
    productRequestCO.custom.City = sampleForm.city;
    productRequestCO.custom.State = sampleForm.state;
    productRequestCO.custom.postalCode = sampleForm.postalCode;
    productRequestCO.custom.country = sampleForm.country;
  });
  next();
});

module.exports = server.exports();
