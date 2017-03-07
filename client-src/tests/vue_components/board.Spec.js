var Vue = require('vue');
var $ = require('jquery');
var expect = require('chai').expect;
var boardComponent = require('./../../vue_components/board');
var Board = require('./../../models/board');
var User = require('./../../models/user');
var sinon = require('sinon');

describe('Board component', function() {
	
	var vm1, boardDataFromServer, collaboratorInstances, userInstance, boardInstance, callbackOne;

	before(function() {

		boardDataFromServer = {
			title : 'Tuhan ada',
			description : 'Lorem ipsum dolor sit amet constectur',
			countOfReason : 10,
			countOfObjection : 20,
			countOfRebuttal : 25,
			tags : ['bumi', 'bulat', 'mama'],
			collaborators : [
				{
					name : 'Budiman',
					profilePictureUrl : 'http://google.com'
				},
				{
					name : 'Janjiman',
					profilePictureUrl : 'http://duckduckgo.com'
				},
				{
					name : 'Ardiman',
					profilePictureUrl : 'http://bukalapak.com'
				}
			],
			user : {
				name : 'Jangkrikman',
				profilePictureUrl : 'http://budimen.org'
			}
		}

		boardInstance = new Board();
		
		userInstance = new User();
		userInstance
			.setName(boardDataFromServer.user.name)
			.setProfilePictureUrl(boardDataFromServer.user.profilePictureUrl);

		collaboratorInstances = boardDataFromServer.collaborators.map(function(collaborator) {
			var collaboratorInstance = new User();
			collaboratorInstance
				.setName(collaborator.name)
				.setProfilePictureUrl(collaborator.profilePictureUrl);

			return collaboratorInstances;
		})

		boardInstance
			.setTitle(boardDataFromServer.title)
			.setDescription(boardDataFromServer.description)
			.setUser(userInstance)
			.setTags(boardDataFromServer.tags)
			.setCollaborators(collaboratorInstances)
			.setCountOfReason(boardDataFromServer.countOfReason)
			.setCountOfObjection(boardDataFromServer.countOfObjection)
			.setCountOfRebuttal(boardDataFromServer.countOfRebuttal)


		vm1 = new Vue({
			template : 
			`
				<div class="container">
					<div class="row">
						<board v-bind:board="board"></board>
					</div>
				</div>
			`,
			components : {
				'board' : boardComponent
			},
			data : {
				board : boardInstance
			}
		}).$mount();
	})

	it('can get board title in its dom', function() {
		var title = $(vm1.$el).find('.col-md-12').find('.card-title').find('a').text();
		expect(title).to.equal(boardInstance.getTitle());
	})

	it('can get count of reason in its dom', function() {
		var countOfReason = $(vm1.$el).find('.col-md-12').find('.card-spec').find('.btn-success').text();
		var expectedText = boardInstance.getCountOfReason() + ' Alasan';
		expect(countOfReason).to.equal(expectedText);
	})

	it('can get count of objection in its dom', function() {
		var countOfObjection = $(vm1.$el).find('.col-md-12').find('.card-spec').find('.btn-danger').text();
		var expectedText = boardInstance.getCountOfObjection() + ' Keberatan';
		expect(countOfObjection).to.equal(expectedText);
	})

	it('can get count of rebuttal in its dom', function() {
		var countOfRebuttal = $(vm1.$el).find('.col-md-12').find('.card-spec').find('.btn-warning').text();
		var expectedText = boardInstance.getCountOfRebuttal() + ' Bantahan';
		expect(countOfRebuttal).to.equal(expectedText);
	})

	it('can get count of collaborators in its dom', function() {
		var countOfCollaborators = $(vm1.$el).find('.col-md-12').find('.card-spec').find('.btn-info').text();
		var expectedText = boardInstance.getCountOfCollaborators() + ' Kolaborator';
		expect(countOfCollaborators).to.equal(expectedText);
	})

	it('can get board description in its dom', function() {
		var boardDescription = $(vm1.$el).find('.col-md-12').find('.card-description').text();
		expect(boardDescription).to.equal(boardInstance.getDescription());
	})

	it('can get user board name in its dom', function() {
		var boardUserName = $(vm1.$el).find('.col-md-12').find('.panel-footer').find('.col-md-4').find('.board-username').text();
		expect(boardUserName).to.equal(boardInstance.getUserName());
	})

	it('can get right board user profile picture url in its image', function() {
		var $image = $(vm1.$el).find('.col-md-12').find('.panel-footer').find('.col-md-4').find('img');
		expect($image.attr('src')).to.equal(boardInstance.getUserProfilePictureUrl());
	})

	it('can get right number of tags', function() {
		var $tags = $(vm1.$el).find('.col-md-12').find('.panel-footer').find('.col-md-8').find('.pull-right').find('button');
		expect($tags.length).to.equal(3);	
	})

	it('can get right tags text in its dom', function() {
		
		var tag = []; 
		var $tags = $(vm1.$el).find('.col-md-12').find('.panel-footer').find('.col-md-8').find('.pull-right').find('button');
		
		$tags.each(function($tag) {
			tag.push($(this).text())
		})

		expect(tag).to.eql(boardInstance.getTags());
	})
});