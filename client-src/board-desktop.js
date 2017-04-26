const Vue = require('vue');
const jquery = window.$ = window.jQuery = require('jquery');
const GrabToPan = require('./libs/grab-to-pan');
require('jsplumb/dist/js/jsplumb');

new Vue({
  el: '#app',
  data : {
    zoomScale : 10,
    mapValue : {
        "1" : 0.1,
        "2" : 0.2,
        "3" : 0.3,
        "4" : 0.4,
        "5" : 0.5,
        "6" : 0.6,
        "7" : 0.7,
        "8" : 0.8,
        "9" : 0.9,
        "10" : 1,
    },
    selectedCardIndex : null
  },
  methods : {
    chooseThis(index) {
      this.selectedCardIndex = index;
    },
    zoom(zoomScaleInString) {
      const scale = this.mapValue[zoomScaleInString];
      
      jsPlumb.setZoom(scale);
      
      const cssValue = 'scale(' + scale +')';
      
      $("#jsplumb-container").css({
        "-webkit-transform" : cssValue,
        "-moz-transform"    : cssValue,
        "-ms-transform"     : cssValue,
        "-o-transform"      : cssValue,
        "transform"         : cssValue,
        "-webkit-transform-origin": '1.1% 1.1%'
      });
    },
    zoomIn() {
      if(this.zoomScale == '10') {
        return;
      }
      console.log(this.zoomScale);
    },
    zoomOut() {
      if(this.zoomScale == '1') {
        return;
      }
      console.log(this.zoomScale);
    }
  },
  mounted() {
    const vm = this;
    const scrollableContainer = document.getElementById('scrollale-container');
    
    const g2p = new GrabToPan({
      element: scrollableContainer,
      onBeingPanned : function() {

      }
    });

    g2p.ignoreTarget = function(targetElement) {
      if($(targetElement).attr('id') != 'jsplumb-container') {
          return true;
      }
    };

    jsPlumb.bind("ready", function () {
      g2p.activate();

      jsPlumb.draggable($(".panel"), {
        drag : function(event, ui) {
            console.log($(event.el).attr('id'))
        },
        start : function(event, ui) {
            console.log(event)
        },
        stop : function(event, ui) {
             console.log(event)
        }
      });
      
      jsPlumb.setContainer("jsplumb-container");

      jsPlumb.connect({
          source: document.getElementById('panel1'),
          target: document.getElementById('panel2'),
          detachable: false,
          connector : ["Flowchart"],
          cssClass: 'connection-line',
          overlays: [ 
              ["Arrow", { 
                  width:12, 
                  length:12, 
                  location: 1 
              }]
          ],
          deleteEndpointsOnDetach:true,
          endpoint:"Blank",
          anchor : [
              "Top",
              "Bottom",
              "Left",
              "Right"
          ]
      });
    })
    
    document.getElementById('scrollale-container').addEventListener('wheel', function (e) {
      if(e.deltaY > 0) {
        if(vm.zoomScale > 0) {
          vm.zoomScale--;
          vm.zoom(vm.zoomScale.toString());
        }
      } else {
        if(vm.zoomScale < 10) {
          vm.zoomScale++;
          vm.zoom(vm.zoomScale.toString());
        }
      }
    });
  }
})
