var Vue = require('vue');
var Board = require('../models/board');

var board = Vue.component('board', {
	template : 
	`
		<div class="col-md-12">
			<div class="panel panel-default">
				<div class="panel-body">
					<section class="card-title">
						<a href="/"><h3>{{ board.getTitle() }}</h3></a>	
					</section>
					
					<section class="card-spec">
						<button class="btn btn-success btn-xs">{{ board.getCountOfReason() + ' Alasan' }}</button>
						<button class="btn btn-danger btn-xs">{{ board.getCountOfObjection() + ' Keberatan' }}</button>
						<button class="btn btn-warning btn-xs">{{ board.getCountOfRebuttal() + ' Bantahan' }}</button>
						<button class="btn btn-info btn-xs">{{ board.getCountOfCollaborators() + ' Kolaborator' }}</button>
					</section>
					
					<section class="card-description" style="margin-top: 5px;">
						<p>{{ board.getDescription() }}</p>	
					</section>	
				</div>
				<div class="panel-footer">
					<div class="row">
						<div class="col-md-4">
							<img v-bind:src="board.getUserProfilePictureUrl()" width="40px" height="40px" class="img-circle">
							<span class="board-username">{{ board.getUserName() }}</span>
						</div>
						<div class="col-md-8">
							<div class="pull-right">
								<button v-for="tag in board.getTags()" class="btn btn-default btn-xs button-tags">{{ tag }}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
	props : {
		board : {
			type : Board,
			required : true
		}
	}
})

module.exports = board;