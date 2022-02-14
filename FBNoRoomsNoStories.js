// ==UserScript==
// @name         Remove rooms & stories
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description   Remove FB Stories & VideoRooms
// @author       You
// @match        https://www.facebook.com/?ref=home
// @match        https://www.facebook.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=facebook.com
// @grant        none
// ==/UserScript==

window.onload = setInterval(function() {
    'use strict';
    try{document.querySelectorAll("[data-pagelet='VideoChatHomeUnit'")[0].parentElement.parentElement.remove()}
    catch (ex){console.log.LogError(ex);};
    try{document.querySelectorAll("[data-pagelet='Stories'")[0].remove()}
    catch (ex){console.log.LogError(ex);};
    // Your code here...
}, 2000);
