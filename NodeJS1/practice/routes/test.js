const express = require('express');
const router = express.Router();
var Inko = require('inko');


router.post('/hangul', async(req, res) => {
    const result = Hangul.disassemble('가나다');
    const postIdx = await Post.test();

    // 자음만 검색해도 해당 자음이 들어간 목록 뽑아내기
    for (i = 0; i < postIdx.length; ++i) {
        if (ChosungSearch.isSearch('ㄱ', postIdx[i].title) || ChosungSearch.isSearch('ㄱ', postIdx[i].author)) {
            console.log(postIdx[i].title + " " + postIdx[i].author);
        }
    }  
})


router.post('/eng', async(req, res) => {
    const eng = req.body;

    // 한글 검색을 하려다가 영어로 쳤을 때 한글로 변환해주는 라이브러리
    var inko = new Inko();
    const result = inko.en2ko('dkssudgktpdy tptkd!');
    console.log(result);

    console.log(inko.ko2en('ㅗ디ㅣㅐ 재깅!'));
    
  
})

router.post('/search', async(req, res) => {
    const {result} = req.body;
    console.log(result);
})


module.exports = router;