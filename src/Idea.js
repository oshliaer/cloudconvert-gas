var APIKEY = '';

APIKEY = PropertiesService.getUserProperties().getProperty('cloudconvert_api');

/* exported clearAllProcs, getFilePayload, convertDriveFile */

function convertDriveFile() {
  var payload = {
    inputformat: 'jpg',
    outputformat: 'png'
  };

  var fetch = UrlFetchApp.fetch('https://api.cloudconvert.com/process', {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + APIKEY
    },
    payload: JSON.stringify(payload)
  });

  var proc = JSON.parse(fetch.getContentText());

  payload = {
    input: 'upload'
    // outputformat: 'png',
    // file: 'export.png'
  };

  fetch = UrlFetchApp.fetch('https:' + proc.url, {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + APIKEY
    },
    payload: JSON.stringify(payload)
  });

  var upload = JSON.parse(fetch.getContentText());

  var url = 'https:' + upload.upload.url;

  var filePayload = getFilePayload();

  var options = {
    method: 'post',
    contentType: 'multipart/form-data; boundary=' + filePayload.boundary,
    'Content-Length': filePayload.payload.length,

    payload: filePayload.payload,
    muteHttpExceptions: true
  };
  var res = UrlFetchApp.fetch(url, options).getContentText();

  Logger.log(res);
}

/**
 *  Gets payload for the file https://drive.google.com/file/d/1_GXCyxMwbd4g8dc0cWH2Q1QVqpcKZCEA/view?usp=sharing
 * @returns {object} payload
 */
function getFilePayload() {
  var fileId = '1_GXCyxMwbd4g8dc0cWH2Q1QVqpcKZCEA';
  var file = DriveApp.getFileById(fileId);
  var blob = file.getBlob();
  // blob.setName('export');
  var boundary = Utilities.getUuid();
  var data = '';
  data += '--' + boundary + '\r\n';
  data += 'Content-Disposition: file; filename="' + file.getName() + '"\r\n';
  data += 'Content-Size: ' + blob.getBytes().length + '\r\n';
  data += 'Content-Type: application/octet-stream\r\n\r\n';

  var payload = []
    .concat(Utilities.newBlob(data).getBytes())
    .concat(blob.getBytes())
    .concat(Utilities.newBlob('\r\n--' + boundary + '\r\n').getBytes());

  return {
    payload: payload,
    boundary: boundary
  };
}

/**
 * Clear all processes
 *
 */
function clearAllProcs() {
  var fetch = UrlFetchApp.fetch('https://api.cloudconvert.com/processes', {
    headers: {
      Authorization: 'Bearer ' + APIKEY
    }
  });
  var procs = JSON.parse(fetch.getContentText());
  var requests = procs.map(function(proc) {
    return UrlFetchApp.getRequest('https:' + proc.url, {
      method: 'delete',
      muteHttpExceptions: true
    });
  });
  Logger.log(UrlFetchApp.fetchAll(requests));
}
