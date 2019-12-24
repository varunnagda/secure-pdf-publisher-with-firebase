# secure-pdf-publisher-with-firebase
Secure pdf  publisher stop users to copy our content.

**Pros:**
- Prevent download plugins
- Print:blank document will print
- Copy text: Disable 
- Save:  blank document will save
- Download: Disable
- Right Click: Disable

**Cons:**
- user still can take screenshots

## Tools

**Mozilla pdf.js** (open source) link= https://mozilla.github.io/pdf.js/

**Firebase hosting**

## Modification in pdf.js:-
```javascript
/*comment this code on line no. 1863*/
if (fileOrigin !== viewerOrigin) {
        throw new Error('file origin does not match viewer\'s');
      }      
```
## Setting Cors for cross domain request:- if we are using firebase or gcp




- download:- GoogleCloudSDKInstaller.exe

-create cors.json

```json
[
    {
      "origin": ["*"],
      "method": ["GET"],
      "maxAgeSeconds": 3600
    }
  ]
  ```
  - set cors:-
  ```
  \viewer>gsutil cors set cors.json gs://projectname.appspot.com/
  ```
## Viewer.html modification:-
```javascript
        document.addEventListener('contextmenu', event => event.preventDefault());
        $(function(){
         $("#download").style.display="none";
        });

        document.onkeydown = function(e) {
if(event.keyCode == 123) {
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
return false;
}
}
```
```html
<style type="text/css" media="print">
          * { display: none; }
      </style>
```
