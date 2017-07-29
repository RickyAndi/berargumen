const Vue = require('vue');
const $ = require('../libs/jquery');
const GrabToPan = require('../libs/grab-to-pan');
const domConnectorService = require('../services/domConnector');

const pannableContainer  = Vue.component('pannable-container', {
  template: require('../templates/pannable-container.html'),
  methods: {
    zoom(zoomScaleInString) {
      const scale = this.mapValue[zoomScaleInString];
      domConnectorService.setZoom(scale);
      const cssValue = `scale(${scale})`;
  
      $('#jsplumb-container').css({
        '-webkit-transform': cssValue,
        '-moz-transform': cssValue,
        '-ms-transform': cssValue,
        '-o-transform': cssValue,
        transform: cssValue,
        '-webkit-transform-origin': '1.1% 1.1%',
      });
    },
    zoomIn() {
      if (this.zoomScale === 10) {
        return;
      }
      this.zoomScale = this.zoomScale + 1;
      this.zoom(this.zoomScale.toString());
    },
    zoomOut() {
      if (this.zoomScale === 1) {
        return;
      }
      this.zoomScale = this.zoomScale - 1;
      this.zoom(this.zoomScale.toString());
    },
  },
  data() {
    return {
      zoomScale: 10,
      mapValue: {
        1: 0.1,
        2: 0.2,
        3: 0.3,
        4: 0.4,
        5: 0.5,
        6: 0.6,
        7: 0.7,
        8: 0.8,
        9: 0.9,
        10: 1,
      },
    };
  },
  mounted() {
    const pannableContainer = document.getElementById('pannable-container');
    const g2p = new GrabToPan({
      element: pannableContainer,
      onBeingPanned: () => {

      },
    });

    g2p.ignoreTarget = function ignoreTarget(targetElement) {
      if (targetElement.getAttribute('id') !== 'jsplumb-container') {
        return true;
      }
      return false;
    };

    domConnectorService.ready(() => {
      g2p.activate();
      domConnectorService.setContainer('jsplumb-container');
    });
  }
})