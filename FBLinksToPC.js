// ==UserScript==
// @name         Download Google Drive PDFs
// @namespace    http://tampermonkey.net/
// @updateURL    https://github.com/AbdallahElYaddak/DownloadAnyGDrivePDF/blob/main/FBLinksToPC.js
// @version      0.1
// @description  Changes FB Mobile links to PC links.
// @author       Abdallah Khaled El-Yaddak
// @match        https://m.facebook.com/*
// ==/UserScript==

if (window.location.href.indexOf("m.facebook.com")>-1){
    if (window.location.href.indexOf("m.facebook.com/friends/center/friends")==-1){
        var a = window.location.href;
        if (a.includes("story.php?")){
            var p2 = a.substring(a.search('story_fbid='), a.search('&'))
            var p1 = a.substring(a.search('&id=')+1,a.split("?", 2).join("?").length)
            window.location.replace("https://www.facebook.com/story.php?" + p1 + "&" + p2)
        } else {
            a = a.replace("https://m.facebook.com/", "https://www.facebook.com/");
            window.location.replace(a);
        }
    }
}
