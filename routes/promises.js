{
    ...
  "categoryname": "physics",
    "levels":
        [ 


            {
                "levelname": "level_3",
                "questions":[ 
                    {
                    "question": "Nuclear sizes are expressed in a unit named",
                    "optionA": "Fermi",
                    "optionB": "angstrom",
                    "optionC": "newton",
                    "optionD": "tesla",
                    "answer": "Fermi",
                    "questionId": "Phylev3-x9f25c80"
                    },
                    {
                    "question": "Light year is a unit of",
                    "optionA": "time",
                    "optionB": "distance",
                    "optionC": "light",
                    "optionD": "intensity of light",
                    "answer": "distance",
                    "questionId": "Phylev3-r0p86v21"
                    },
                    ...
                ]
            }

        ]
  }




  db.questions.update({categoryname: upQstnObj.category, levels: { $elemMatch:{ questions: {$elemMatch:{questionId: upQstnObj.questionId}}}}}, {$set: {levels.$.questions.$: upQstnObj} }, (err, doc)=>{
    if(err){
        console.log(err);
        return;
    }
    if(doc){
        console.log(doc);
        return;
    }
  });