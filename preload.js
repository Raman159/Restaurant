const {contextBridge, ipcRenderer} = require('electron');
const {os, homedir} = require('os');

contextBridge.exposeInMainWorld('electron', {
   homedir:() => os.homedir(),

});

contextBridge.exposeInMainWorld('ipcRenderer', {
   send: (channel, data) => {
       ipcRenderer.send(channel, data);
   },
   receive: (channel, func) => {
       ipcRenderer.on(channel, (event, ...args) => func(...args));
   }
});