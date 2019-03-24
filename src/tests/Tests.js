function setProperty() {
  var apikey = '';
  PropertiesService.getUserProperties().setProperty('cloudconvert_api', apikey);
}

function runTests() {
  // if (typeof GasTap === 'undefined') {
  //   // GasT Initialization. (only if not initialized yet.)
  //   var cs = CacheService.getScriptCache().get('gast');
  //   if (!cs) {
  //     cs = UrlFetchApp.fetch(
  //       'https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js'
  //     ).getContentText();
  //     CacheService.getScriptCache().put('gast', cs, 21600);
  //   }
  //   eval(cs);
  // } // Class GasTap is ready for use now!

  // var test = new GasTap();
  var service = new Service_();
  service.setApikey(
    PropertiesService.getUserProperties().getProperty('cloudconvert_api')
  );
  service.newProccess('jpeg', 'png');
  Logger.log(service.convert('upload'));
}
