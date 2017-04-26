var Vue = require('vue');
var $ = require('jquery');
var expect = require('chai').expect;
var collaboratorViewComponent = require('./../../vue_components/collaborators-view');
var User = require('./../../models/user');
var sinon = require('sinon');

describe('collaborator view component', function() {
  
  var vm, collaborators;

  after(function() {
    $('body').empty();
  })
  
  before(function() {

    var usersData = [
      {
        id : '1234',
        name : 'budi',
        profilePictureUrl : 'http://www.google.com'
      },
      {
        id : '1235',
        name : 'budiman',
        profilePictureUrl : 'http://www.google.com'
      },
      {
        id : '1236',
        name : 'jancok',
        profilePictureUrl : 'http://www.google.com'
      }
    ];

    var createUser = function(userData) {
      var user = new User();
      user
        .setId(userData.id)
        .setName(userData.name)
        .setProfilePictureUrl(userData.profilePictureUrl)
      
      return user;
    }
    
    collaborators = usersData.map(createUser);

    vm = new Vue({
      components : {
        'collaborator-view' : collaboratorViewComponent
      },
      template : 
      `
        <div>
          <collaborator-view v-bind:collaborators="collaborators">
          </collaborator-view>
        </div>
      `,
      data : {
        collaborators : collaborators
      }
    }).$mount();
  })

  it('there is panel that show collaborator, with same count as collaborators data', function() {
    
    var $panels = $(vm.$el).find('.panel');

    var expectedLength = collaborators.length;

    expect($panels.length).to.equal(expectedLength);
  })

  it('its dom reflect user data', function() {

    var $panels = $(vm.$el).find('.panel');
    var $firstPanel = $($panels[0]);

    var collaboratorName = $firstPanel.find('.collaborator-name').text();
    var profilePictureUrl = $firstPanel.find('img').attr('src');

    expect(profilePictureUrl).to.equal(collaborators[0].getProfilePictureUrl());
    expect(collaboratorName).to.equal(collaborators[0].getName());
  })
})