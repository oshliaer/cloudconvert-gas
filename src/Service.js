function Service_() {
  this.apikey = undefined;
  this.proc = undefined;
  return this;
}

Service_.prototype.setApikey = function(apikey) {
  this.apikey = apikey;
  return this;
};

Service_.prototype.getProcess = function() {
  return this.proc;
};

Service_.prototype.newProccess = function(inputformat, outputformat, mode) {
  var payload = {
    inputformat: inputformat,
    outputformat: outputformat
  };

  if (mode) payload.mode = mode;

  var fetch = UrlFetchApp.fetch('https://api.cloudconvert.com/process', {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + this.apikey
    },
    payload: JSON.stringify(payload)
  });

  var proc = JSON.parse(fetch.getContentText());
  proc.inputformat = inputformat;
  proc.outputformat = outputformat;
  this.proc = new Proccess_().init(proc);
  return this;
};

Service_.prototype.convert = function(input, conversion, output) {
  // Multipart url
  // var payload = {
  //   inputformat: this.getProcess().getProperty('inputformat'),
  //   outputformat: this.getProcess().getProperty('outputformat'),
  //   input: input
  // };
  // // var fileId = '### file ID on Google Drive ###';
  // var metadata = {
  //   token: '### access token ###',
  //   channels: '### channel ID ###',
  //   filename: '### filename on Slack ###',
  //   title: '### title on Slack ###'
  // };
  // var url = 'https://slack.com/api/files.upload';
  // var file = DriveApp.getFileById(fileId);
  // var boundary = 'xxxxxxxxxx';
  // var data = '';
  // for (var i in metadata) {
  //   data += '--' + boundary + '\r\n';
  //   data +=
  //     'Content-Disposition: form-data; name="' +
  //     i +
  //     '"; \r\n\r\n' +
  //     metadata[i] +
  //     '\r\n';
  // }
  // data += '--' + boundary + '\r\n';
  // data +=
  //   'Content-Disposition: form-data; name="file"; filename="' +
  //   file.getName() +
  //   '"\r\n';
  // data += 'Content-Type:' + file.getMimeType() + '\r\n\r\n';
  // var payload = Utilities.newBlob(data)
  //   .getBytes()
  //   .concat(file.getBlob().getBytes())
  //   .concat(Utilities.newBlob('\r\n--' + boundary + '\r\n').getBytes());
  // var options = {
  //   method: 'post',
  //   contentType: 'multipart/form-data; boundary=' + boundary,
  //   payload: payload,
  //   muteHttpExceptions: true
  // };
  // var fetch = UrlFetchApp.fetch('https://api.cloudconvert.com/process', {
  //   method: 'post',
  //   contentType: 'application/json',
  //   headers: {
  //     Authorization: 'Bearer ' + this.apikey
  //   },
  //   payload: JSON.stringify(payload)
  // });
  // return fetch;
};
