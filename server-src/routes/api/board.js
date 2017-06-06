const express = require('express');
const router = express.Router();
const boardsData = require('./boardData');
const Board = require('../../models/board');
const Card = require('../../models/card');
const { async, await } = require('asyncawait');
const { apiIsAuthenticated } = require('../../middlewares');
const { createArgumentValidator } = require('../../validators');
const slugify = require('slugify');
const cardTypeEnum = require('../../enums/card-type');
const { 
  boardService, 
  cardService, 
  boardArguersService, 
  upvoteService, 
  downvoteService,
  userService  
} = require('../../services');
const normalize = require('../../../shared/utils/object-normalizer');

module.exports = sockets => {
  router.get('/new', async((req, res) => {
    const page = req.query.page;
    const data = await(Board.paginate({}, { 
      page : page,
      populate : 'cards creator arguerRequests rejectedArguerRequests arguers'
    }));
    
    return res
      .status(200)
      .json(data);
  }));

  router.get('/my', apiIsAuthenticated, async((req, res) => {
    try {
      const userId = (normalize(req.user))._id;
      const bookmarkedBoardIds  = (normalize(req.user)).bookmarkedBoards; 
      const options = {
        query : { creator : userId, deleted : false },
        populate : 'cards creator arguerRequests rejectedArguerRequests arguers upvotes downvotes',
        sort : {
          updated : -1
        },
        page : req.query.page
      };

      const data = await(boardService.paginate(options, userId, bookmarkedBoardIds));
      return res
        .status(200)
        .json(data);

    } catch(error) {

      return res
        .status(500)
        .json({
          message : 'error happen'
        })
    }
  }));

  router.get('/bookmarked', apiIsAuthenticated, async((req, res) => {
    try {
      const userId = (normalize(req.user))._id;
      const bookmarkedBoardIds  = (normalize(req.user)).bookmarkedBoards;
      const options = {
        query : { 
          published : true,
          _id : {
            $in : bookmarkedBoardIds
          },
          deleted : false
        },
        populate : 'cards creator arguerRequests rejectedArguerRequests arguers upvotes downvotes',
        sort : {
          updated : -1
        },
        page : req.query.page
      };
      const data = await(boardService.paginate(options, userId, bookmarkedBoardIds));
      
      return res
        .status(200)
        .json(data);
    } catch(error) {
      return res
        .status(500)
        .json({
          message : 'error happen'
        })
    }
  }));

  router.get('/collaborated', apiIsAuthenticated, async((req, res) => {
    try {
      const userId = (normalize(req.user))._id;
      const bookmarkedBoardIds  = (normalize(req.user)).bookmarkedBoards;
      const options = {
        query : { published : true, arguers : userId, deleted : false },
        populate : 'cards creator arguerRequests rejectedArguerRequests arguers upvotes downvotes',
        sort : {
          updated : -1
        },
        page : req.query.page
      }
      
      const data = await(boardService.paginate(options, userId, bookmarkedBoardIds));
      
      return res
        .status(200)
        .json(data);

    } catch(error) {
      return res
        .status(500)
        .json({
          message : 'error happen'
        })
    }
  }));

  router.get('/all', async((req, res) => {
    try {
      const options = {
        query : { published : true, deleted : false },
        populate : 'cards creator arguerRequests rejectedArguerRequests arguers upvotes downvotes',
        sort : {
          updated : -1
        },
        page : req.query.page
      }

      const userId = req.user === undefined ? null : (normalize(req.user))._id;
      const bookmarkedBoardIds  = req.user === undefined ? [] : (normalize(req.user)).bookmarkedBoards;
      const data = await(boardService.paginate(options, userId, bookmarkedBoardIds));

      return res
        .status(200)
        .json(data);

    } catch(error) {
      return res
        .status(500)
        .json({
          message : 'error happen'
        })
    }
  }));
  
  router.post('/create', apiIsAuthenticated, createArgumentValidator, async((req, res) => {
    try {
      const newBoard = await(boardService.create(Object.assign(req.body, {
        creator : req.user._id,
        published : false,
        arguers : [
          req.user._id
        ]
      })));
      const newCard = await(cardService.create({
        creator : req.user._id,
        content : req.body.title,
        type : cardTypeEnum.CONTENTION,
        top : '100px',
        left : '100px',
        board : newBoard._id
      }));

      const upvote = await(upvoteService.create(newBoard._id));
      const downvote = await(downvoteService.create(newBoard._id));
      
      return res
        .json({
          slug : newBoard.slug
        });
    } catch(error) {
      return res
        .json({
          message : 'error happen'
        })
    }
  }));

  router.put('/edit/:boardId', apiIsAuthenticated, createArgumentValidator, async((req, res) => {
    try {
      const boardIdToBeEdited = req.params.boardId;
      const currentUserId = (normalize(req.user))._id;
      const boardToBeEdited = await(boardService.findOne({ 
        query : {
          _id : boardIdToBeEdited
        },
        select : null
      }));

      if(boardToBeEdited.creator.toString() !== currentUserId) {
        return res
          .status(401)
          .json({
            message : 'not authorized to edit this board'
          })
      }

      await(boardService.edit(boardIdToBeEdited, {
        title : req.body.title,
        description : req.body.description,
        tags : req.body.tags
      }));

      return res
        .status(200)
        .json({
          message : 'ok'
        });

    } catch(error) {
      console.log(error)
      return res
        .status(500)
        .json({
          message : 'error happen'
        })
    }
  }));

  router.put('/publish/:boardId', apiIsAuthenticated, async((req, res) => {
    try {
      const query = {
        boardId : req.params.boardId,
        userId : req.user._id
      }
      const publishedBoard = await(boardService.publish(query));
      return res
        .status(200)
        .json(publishedBoard); 
    } catch(error) {
      return res
        .status(500)
        .json({
          error : error.toString()
        })
    }
  }));

  router.put('/unpublish/:boardId', apiIsAuthenticated, async((req, res) => {
    try {
      const query = {
        boardId : req.params.boardId,
        userId : req.user._id
      }
      const publishedBoard = await(boardService.unpublish(query));
      return res
        .status(200)
        .json(publishedBoard); 
    } catch(error) {
      return res
        .status(500)
        .json({
          error : error.toString()
        })
    }
  }));

  router.put('/upvote/:boardId', apiIsAuthenticated, async((req, res) => {
    try {
      const boardId = req.params.boardId;
      const userId = req.user._id;
      await(upvoteService.addUpvote(boardId, userId));
      await(downvoteService.removeDownvote(boardId, userId));

      return res
        .status(200)
        .json({
          message : 'ok'
        });

    } catch(error) {
      return res
        .status(500)
        .json({
          message : 'error happen'
        })
    }
  }));

  router.put('/downvote/:boardId', apiIsAuthenticated, async((req, res) => {
     try {
      const boardId = req.params.boardId;
      const userId = req.user._id;
      await(downvoteService.addDownvote(boardId, userId));
      await(upvoteService.removeUpvote(boardId, userId));
      
      return res
        .status(200)
        .json({
          message : 'ok'
        })

    } catch(error) {
      return res
        .status(500)
        .json({
          message : 'error happen'
        })
    }
  }));

  router.put('/remove-upvote/:boardId', apiIsAuthenticated, async((req, res) => {
     try {
      const boardId = req.params.boardId;
      const userId = req.user._id;
      const board = await(upvoteService.removeUpvote(boardId, userId));

      return res
        .status(200)
        .json({
          message : 'ok'
        });

    } catch(error) {
      return res
        .status(500)
        .json({
          message : 'error happen'
        })
    }
  }));

  router.put('/remove-downvote/:boardId', apiIsAuthenticated, async((req, res) => {
     try {
      const boardId = req.params.boardId;
      const userId = req.user._id;
      const board = await(downvoteService.removeDownvote(boardId, userId));

      return res
        .status(200)
        .json({
          message : 'ok'
        })

    } catch(error) {
      return res
        .status(500)
        .json({
          message : 'error happen'
        })
    }
  }));

  router.delete('/delete/:boardId', apiIsAuthenticated, async((req, res) => {
    try {
      const boardId = req.params.boardId;
      const currentUserId = (normalize(req.user))._id;
      const boardToBeDeleted = await(boardService.findById({ boardId : boardId, select : null }));
      
      if(boardToBeDeleted.creator.toString() !== currentUserId) {
        return res
          .status(401)
          .json({
            message : 'not authorized to delete this board'
          });
      }

      await(boardService.delete(boardId));

      return res
        .status(200)
        .json({
          message : 'ok'
        })
    } catch(error) {
      return res
        .status(500)
        .json({
          message : 'error happen'
        })
    }
  }));

  router.post('/bookmark', apiIsAuthenticated, async((req, res) => {
    try {
      const boardId = req.body.boardId;
      const userId = (normalize(req.user))._id;
      await(userService.addBookmarkedBoard(userId, boardId));
      return res
        .status(200)
        .json({
          message : 'ok'
        })
    } catch(error) {
      return res
        .status(500)
        .json({
          message : 'error happen'
        })
    }
  }));

  router.post('/remove-bookmark', apiIsAuthenticated, async((req, res) => {
    try {
      const boardId = req.body.boardId;
      const userId = (normalize(req.user))._id;
      await(userService.removeBookmarkedBoard(userId, boardId));
      return res
        .status(200)
        .json({
          message : 'ok'
        })
    } catch(error) {
      return res
        .status(500)
        .json({
          message : 'error happen'
        })
    }
  }));

  return router;
};
