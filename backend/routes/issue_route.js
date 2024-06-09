const express = require("express")
const router=express.Router();
const requireLogin=require("../middleware/auth")
const Issue=require("../models/book");
const ReturnBook=require("../models/Return")

//to issue a book --> USER
router.post("/issueRequest",async (req,res)=>{
    const { title,author,publisher,year,userId,bookId,userBranch,userName,isRecom,copies } = req.body ;
    if(req.body.bookId != undefined){
    const Modbook = await Book.findOne({_id : bookId})
    Modbook.copies -= 1 ;
    await Modbook.save();
    }
    const book = await new Issue({
        title,author,publisher,year,userId,bookId,userBranch,userName,isRecom,copies
    })
    await book.save();
    res.status(201).json(book);
})

router.post("/returnreq",async(req,res)=>{
    const {title,author,publisher,userName,userId,bookId}=req.body
    const ReturnBook=await new ReturnBook({title,author,publisher,userName,userBranch,userId,bookId});
    await ReturnBook.save()
    res.status(201).json(ReturnBook);
})

//list of all returned books
router.get("/allreturnedBook" ,(req,res)=>{
    ReturnBook.find()
    .then((admins) => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
    });
})

//list of books issued by a student -->USER
router.get("/issuedBook", requireLogin ,(req,res)=>{
    Issue.find({ userId: req.user._id })
    .then((admins) => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
    });
})

//list of all books issued by students --->ADMIN
router.get("/allIssuedBook" ,(req,res)=>{
    Issue.find()
    .then((admins) => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
    });
})

//list of all issued books --->ADMIN
router.get("/allIssueRequest" ,(req,res)=>{   
    Issue.find()
    .then(admins => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
    });
})

//return the book --> USER
router.post("/issuedBookDelete" , async(req,res)=>{
     const {postId} = req.body ;         
     try {
        await Issue.findOneAndDelete({ bookId: req.body.postId }) ;
        const book = await Book.findOne({_id : postId}) ;
        book.copies += 1 ;
        await book.save();
        res.send("you successfully return the book")
     } catch (error) {
        console.log(error);
     }   
})

router.post("/issuedReqAccept", async(req, res) => {
    const {bookId,postId} = req.body ;
    try {
        const issue = await Issue.findOne({_id : bookId})
        const book = await Book.findOne({_id : postId})
          book.copies -= 1 ;
          await book.save();
        issue.isIssue = true
        await issue.save()
        res.send('issue Delivered Successfully')
    } catch (error) {
        return res.status(400).json({ message: error}); 
    }
});

router.post("/issueReqDelete" , async(req,res)=>{ 
    try {
       await Issue.findOneAndDelete({ _id: req.body.postId }) ;     
       res.send("you successfully return the book")
    } catch (error) {
       console.log(error);
    }  
})

router.post("/issuedBook", async(req, res) => {
    const postId = req.body.postId
    try {
        const book = await Book.findOne({_id : postId})
        console.log(book)
        book.isIssue = true
        await book.save()
        res.send('book issued Successfully')
    } catch (error) {
        return res.status(400).json({ message: error});   
    } 
});

router.post("/singleIssuedBook", async(req, res) => {
    const postId = req.body.postId 
    try {
        const book = await Book.findOne({_id : postId});
        res.json(book)
    } catch (error) {
        return res.status(400).json({ message: error});        
    }
});

module.exports = router;