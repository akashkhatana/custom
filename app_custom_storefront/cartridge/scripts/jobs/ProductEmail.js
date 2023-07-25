// 'use strict';

// var Logger = require('dw/system/Logger').getLogger('ProductEmailAvailable', 'info');
// var Resource = require('dw/web/Resource');
// var ArrayList = require('dw/util/ArrayList');
// var Site = require('dw/system/Site').getCurrent().getID();

// /**
//  * Send the Product list to an email list
//  * @param {object} emailList to send mail
//  * @param {object} productList information about products
//  * @param {object} EmailContentObject email content objects
//  * @return {Object} status
//  */
// function sendEmail(emailList, productList, EmailContentObject) {
//     var CustomerServiceNotifyObj = {
//         notificationID      : 'ProductInformation',
//         emailModel          : require('*/utils/Object').extend({}, { Products: productList, Header: EmailContentObject.headerContent, Footer: EmailContentObject.footerContent }),
//         notificationSubject : EmailContentObject.emailSubject + ' - ' + Site,
//         mailTo              : emailList,
//         templatePath        : 'mail/productEmail.isml',
//     };

//     return require('*/utils/Providers').get('Notification').send(CustomerServiceNotifyObj);
// }

// /**
//  * Process the job execution, the args.emailRecipents contains the emails addresses
//  * @param {object} args - Custom Parameters added in job step configuration.
//  */
// exports.productAvailableEmail = function productAvailableEmail(args) {
//     var emailRecipents = args.emailRecipents;
//     var footerContent = args.productStockFooterContent;
//     var products;
//     var subject;
//     var headerContent;

//     if (!empty(emailRecipents)) {
//         if (args.productavailable === 'true') {
//             var isInStock = true;
//             products = getProducts(isInStock);
//             subject = Resource.msg('email.product.availability.subject', 'email', null);
//             headerContent = args.inStockHeaderContent;
//         } else {
//             var isOutOfStock = false;
//             products = getProducts(isOutOfStock);
//             subject = Resource.msg('email.product.outofstock.subject', 'email', null);
//             headerContent = args.outofStockHeaderContent;
//         }
//         if (!empty(products)) {
//             var EmailContentObject = {
//                 emailSubject  : subject,
//                 headerContent : headerContent,
//                 footerContent : footerContent,
//             };
//             sendEmail(emailRecipents, products, EmailContentObject);
//         } else {
//             Logger.info('There is no products available');
//         }
//     } else {
//         Logger.info('The parameter emailRecipents should be defined and have at least one valid email address');
//     }
// };

// /**
//  * Get the products ready to sell
//  * @param {object} orderableProductsOnly object modified.
//  * @return {object} productObjectList list of products
//  */
// function getProducts(orderableProductsOnly) {
//     var ProductSearchModel = require('dw/catalog/ProductSearchModel');
//     var searchModel = new ProductSearchModel();
//     var category = require('dw/catalog/CatalogMgr').getSiteCatalog().getRoot();
//     searchModel.setCategoryID(category.ID);
//     searchModel.setRecursiveCategorySearch(true);
//     searchModel.setOrderableProductsOnly(orderableProductsOnly);
//     searchModel.search();

//     if (searchModel.getCount() > 0) {
//         var productObjectList = new ArrayList();
//         var productHitResult = searchModel.getProductSearchHits();
//         var addedProductIDs = [];
//         while (productHitResult.hasNext()) {
//             var products = productHitResult.next().getRepresentedProducts();
//             if (!empty(products)) {
//                 products.toArray().forEach(function (product) {
//                     if (orderableProductsOnly === true || !product.availabilityModel.orderable) {
//                         if (addedProductIDs.indexOf(product.ID) === -1) {
//                             var variationModel = product.getVariationModel();
//                             var variationAttributes = variationModel.getProductVariationAttributes();
//                             var variantText = '';
//                             if (!empty(variationAttributes)) {
//                                 variationAttributes.toArray().forEach(function (variationAttr) {
//                                     var attrValue = variationModel.getVariationValue(product, variationAttr);
//                                     if (!empty(attrValue)) {
//                                         variantText += variationAttr.getDisplayName() + ':' + attrValue.getDisplayValue() + ' ';
//                                     }
//                                 });
//                             }
//                             productObjectList.add({
//                                 ID: product.ID, UPC: product.getUPC(), name: product.getName(), variant: variantText,
//                             });
//                             addedProductIDs.push(product.ID);
//                         }
//                     }
//                 });
//             }
//         }
//         return productObjectList;
//     }
//     return null;
// }

