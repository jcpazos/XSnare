//Database for user-defined signatures, currently shown in plaintext for ease of use
//might want to move to an actual database later?

var signatures = [
  { url: '',
       //TODO: revise if it makes sense to have multiple software listed, change to array if it stays
       software: '#wordPress #wpPlugin',
       softwareDetails: 'wf-cookie-consent',
       version: '1.1.3',
       description: '',
       sigType: 'verifyHTML',
       src: ['<h1 class="entry-title">', '<span class="screen-reader-text">']
  }
];

window.Sigs = (function (module) {


  var exports = {
    signatures
  };


  Object.keys(exports).forEach(k => module[k] = exports[k]);
  return module;
})(window.Sigs || {});