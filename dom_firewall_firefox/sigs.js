//Database for user-defined signatures, currently shown in plaintext for ease of use
//might want to move to an actual database later?

var signatures = [
  { url: '',
       //TODO: revise if it makes sense to have multiple software listed, change to array if it stays
       software: '#wordPress #wpPlugin2',
       softwareDetails: 'wf-cookie-consent',
       version: '1.1.3',
       description: '',
       sigType: 'verifyHTML',
       endPoints: ['<h1 class="entry-title">', '<span class="screen-reader-text">']
  },
  { url: '',
       //TODO: revise if it makes sense to have multiple software listed, change to array if it stays
       software: '#wordPress #wpPlugin',
       softwareDetails: 'wf-cookie-consent',
       version: '1.1.3',
       description: '',
       sigType: 'verifyHTML',
       endPoints: ['<option class="level-0" value="133">', '<option class="level-0" value="12">']
  },
];

window.Sigs = (function (module) {


  var exports = {
    signatures
  };


  Object.keys(exports).forEach(k => module[k] = exports[k]);
  return module;
})(window.Sigs || {});