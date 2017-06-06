var Vue = require('vue');
var jquery = window.$ = window.jQuery = require('jquery');
var expect = require('chai').expect;
var modalComponent = require('./../../vue_components/modal');
var sinon = require('sinon');

describe('modal component', function() {
  var vm;

  before(function() {
    vm = new Vue({
      components : {
        'modal-component' : modalComponent
      },
      template : 
      `
        <div>
          <modal-component 
            ref="exampleModal"  
            :options="{
              modalSize: 'small',
              title: 'example modal'
            }">
            <div class="col-md-12">
              <h2>Hello World</h2>
            </div>
          </modal-component>
        </div>
      `
    }).$mount();
  })

  after(function() {
    $('body').empty();
  })

  it('there is a modal', function() {
    var $modal = $(vm.$el).find('.modal');
    expect($modal.length).to.equal(1);
  })

  it('modal will be shown if show() method invoked', function() {
    // to be implemented
  })

  it('modal will be hidden if hide() method invoked', function() {
    // to be implemented
  })

  it('modal component will emit on-hidden event when modal after being hidden', function() {
    // to be implemented
  })
})