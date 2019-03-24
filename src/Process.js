function Proccess_() {
  //   {
  //     "url": "//srv01.cloudconvert.com/process/v4cw72hf3"
  //     "id": "v4cw72hf3",
  //     "host": "srv01.cloudconvert.com",
  //     "expires": "2014-09-12 13:13:00",
  //     "maxtime": 18000
  // }
  this.uuid = Utilities.getUuid();
  this.url = undefined;
  this.id = undefined;
  this.host = undefined;
  this.expires = undefined;
  this.maxtime = undefined;
  this.inputformat = undefined;
  this.outputformat = undefined;
  return this;
}

Proccess_.prototype.init = function(proc) {
  this.url = proc.url;
  this.id = proc.id;
  this.host = proc.host;
  this.expires = proc.expires;
  this.maxtime = proc.maxtime;
  this.inputformat = proc.inputformat;
  this.outputformat = proc.outputformat;
  return this;
};

Proccess_.prototype.getUrl = function() {
  return this.url;
};

Proccess_.prototype.getProperty = function(name) {
  return this[name];
};
