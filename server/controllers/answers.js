var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Module = require("../models/module"),
    Question = require("../models/question"),
    Answer = require("../models/answer");

router.post("/", function(req, res) {
    var mark = 0;
    if (req.body.data){
        req.body.data.forEach(function(values){
            var answer = new Answer({ 
                num        : values.id,
                _course    : values._course,
                _module    : values._module,
                _user      : req.body._user,
                userAnswer : values.userAnswer,
            }); 
            answer.save();

            Question.findOne({"_course": answer._course, "_module": answer._module,"num": answer.num})
            .exec(function(error, question) {
                if (error) throw error;
                if (question.typeVariant == 1) {
                    mark = (question.answer == answer.userAnswer)?(mark+1):mark;
                }
                else {
                    var questions = question.variants;
                    var userAnswers = answer.userAnswer.split(",");
                    var rightAnswers = [];
                    var counter = 0;
                    for(variant in questions) {
                        if(questions[variant][1]){
                            rightAnswers.push(variant); 
                        }
                    }
                    for(answer in rightAnswers) {
                        if(userAnswers.indexOf(rightAnswers[answer]) > -1) {
                            counter++; 
                        }
                    }
                    if (userAnswers.length == rightAnswers.length && rightAnswers.length == counter) {
                        mark++;
                    }
                }
            });
        });
        Module.findOneAndUpdate({"_id": req.body.data[0]._module},
            {$set: {"numberOfTests": req.body.numberOfTests, "result": mark}},
            function(err, module) {
                if (err) return err;
        });
    }

    return res.json({ success: true });
});

module.exports = router;