// ==UserScript==
// @name         Remove rooms & stories
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.facebook.com/?ref=home
// @icon         https://www.google.com/s2/favicons?sz=64&domain=facebook.com
// @grant        none
// ==/UserScript==

window.onload = setInterval(function() {
    'use strict';
    document.querySelectorAll("[data-pagelet='VideoChatHomeUnit'")[0].parentElement.parentElement.remove();
    document.querySelectorAll("[data-pagelet='Stories'")[0].remove();
    // Your code here...
}, 2000);
