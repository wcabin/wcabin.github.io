// video-config.js
const videoSources = {
    mainVideo: 'src/v1gtq69s8rqsqx47hcu9d6b82ky9.mp4'
};

var originalConsoleLog = console.log;

console.log = function() {

};

window.onresize = function() {
    const viewportWidth = window.innerWidth;
    document.body.style.fontSize = (viewportWidth > 800) ? "16px" : "12px";
};