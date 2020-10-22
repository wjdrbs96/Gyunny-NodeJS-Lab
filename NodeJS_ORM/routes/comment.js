const express = require('express');
const router = express.Router();
const { Comment, User } = require('../models');

// 댓글 전체 조회
router.get('/:id', (req, res, next) => {
  Comment.findAll({
    /**
     * include: 모델 간의 관계 연결
     * model : 어떤 모델인지 지정
     * where: 쿼리 조건 설정
     */
    include: {  
      model: User,
      where: { id: req.params.id },
    }
  })
    .then((comment) => {
      console.log(comment);
      res.json(comment);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
});

// 댓글 등록
router.post('/', (req, res, next) => {
  Comment.create({
    commenter: req.body.id, 
    comment: req.body.comment,
  })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
})

// 댓글 수정
router.patch('/:id', (req, res, next) => {
  Comment.update({
    /**
     * comment : 수정한 댓글 내용
     * where: 어떤 댓글을 수정할지 ?
     */
    comment: req.body.comment,
  }, {
    where: { id: req.params.id },
  })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
})

// 댓글 삭제
router.delete('/:id', (req, res, next) => {
  Comment.destroy({
    /**
     * where: 어떤 댓글을 수정할지 ?
     */
    where: { id: req.params.id },
  })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    })
})

module.exports = router;
