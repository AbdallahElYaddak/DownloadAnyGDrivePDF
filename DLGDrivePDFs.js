// ==UserScript==
// @name         Download Google Drive PDFs
// @namespace    http://tampermonkey.net/
// @updateURL    https://nikkidelrosso.com/userscripts/DLGDrivePDFs.js
// @version      0.2
// @description  try to take over the world!
// @author       Abdallah Khaled El-Yaddak
// @match        https://drive.google.com/file/d/*
// ==/UserScript==

'use strict';
const debuggingMode = 1 //0:no console outputs, 1:Final outputs only, 2:all debugging probes
const speed = 2 // Pages per second

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === "complete") {
        verboseLog('Page loaded!');
        CheckDownloadBtn();
        //addButton();
    };
});

// async function addButton() {
//     let b = CheckDownloadBtn();
//     log(b);
//     if (b != null) {
//         var sidebar = b.parentElement.parentElement;
//         let n = sidebar.childElementCount
//         var button = sidebar;
//         var a = button;
//         button = sidebar.children[n-2].cloneNode(true);
//         sidebar.prepend(button);
//         button.setAttribute('href', 'javascript:void(0);');
//         button.setAttribute('data-tooltip', 'Download');
//         button.setAttribute('aria-label', 'Download');
//         a = button.getElementsByTagName('div')[0];
//         a.setAttribute('class', 'ndfHFb-c4YZDc-Bz112c ndfHFb-c4YZDc-C7uZwb-LgbsSe-Bz112c ndfHFb-c4YZDc-nupQLb-Bz112c');
//         button.addEventListener('click', downloadPDF);
//         log('Button added!');
//     };
// };

async function loadImg(img,pdf){
        img.scrollIntoView();
        let can = document.createElement('canvas');
        let con = can.getContext("2d");
        can.width = img.width;
        can.height = img.height;
        con.drawImage(img, 0, 0, img.width, img.height);
        let imgData = can.toDataURL("image/jpeg", 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.addPage();
}

function sleepFor(sec) {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("Woke up!");
        }, sec * 1000);
    });
}

async function downloadPDF () {
    let n = document.getElementsByClassName("ndfHFb-c4YZDc-DARUcf-NnAfwf-j4LONd")[0].innerText;
    let pdf = new jsPDF();
    for (let i = 0; i < n; i++) {
        let img = document.getElementsByTagName("img")[i];
        img.scrollIntoView();
        await sleepFor(1/speed);
        let can = document.createElement('canvas');
        let con = can.getContext("2d");
        can.width = img.width;
        can.height = img.height;
        con.drawImage(img, 0, 0, img.width, img.height);
        let imgData = can.toDataURL("image/jpeg", 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.addPage();
        verboseLog('Imgage ' + i.toString() + " / " + n.toString() + " added...");
    }
    let s = document.getElementsByClassName("ndfHFb-c4YZDc-Wrql6b-V1ur5d")[0].innerText;
    pdf.save(s);
}

function CheckDownloadBtn(){
    verboseLog('Checking if Download Button is available...');
    let elements = document.getElementsByTagName("div");
    let b = false
    for (let i in elements) {
        let btn = elements[i];
        if (btn.getAttribute('aria-label') == 'PDF icon') {
            b = true
        }
        if (btn.getAttribute('aria-label') == 'Download' && b) {
            //             log(btn);
            if (btn.getAttribute('aria-hidden') == 'true'){
                verboseLog('Download Button is found disabled');
                btn.setAttribute('style', 'user-select: none;');
                btn.setAttribute('aria-hidden', 'false');
                btn.setAttribute('aria-disabled', 'false');
                btn.setAttribute('class', 'ndfHFb-c4YZDc-to915-LgbsSe ndfHFb-c4YZDc-C7uZwb-LgbsSe VIpgJd-TzA9Ye-eEGnhe ndfHFb-c4YZDc-LgbsSe ndfHFb-c4YZDc-C7uZwb-LgbsSe-SfQLQb-Bz112c');
                let a = btn.getElementsByTagName('div')[0];
                a.setAttribute('href', 'javascript:void(0);');
                a.addEventListener('click', downloadPDF);
                let jspdf = document.createElement("script");
                jspdf.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js';
                document.head.appendChild(jspdf);
                log('Download Button added');
                return null;
            }else{
                verboseLog('Download Button is already enabled');
                return null;
            }
        } else if(btn.getAttribute('aria-label') == 'More actions'){
            verboseLog('Download Button is missing',"error");
            verboseLog('Please send the PDF link to the script author',"error");
            return btn;
        }
    }

}

function log(message, type) {
    if (debuggingMode == 0) {
        return;
    };//1,2
    writeLog(message, type);
};

function verboseLog(message, type) {
    if (debuggingMode < 2) {
        return;
    };//2
    writeLog(message, type);
};

function writeLog(message, type) {
    if (typeof type == undefined) {
        type = "verboseLog";
    };
    switch (type) {
        case "error": return console.error(message);
        case "log": default: return console.log(message);
    };
};
