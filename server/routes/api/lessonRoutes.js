const mongoose = require('mongoose');
const Lesson = mongoose.model('lessons');
const moment = require('moment');

module.exports = app => {

    //create lesson
    app.post('/api/lessons', async (req, res) => {
        
        const {studentName , type, date, createdBy} = req.body;
        const lesson = new Lesson ({
            studentName,
            type,
            date,
            createdTimestamp: moment().unix(),
            createdBy
        });

        try {
            await lesson.save();
            return res.send(lesson); 
        } catch (error) {
            return res.status(500).send(err);
        }

    });

    //get single lesson
    app.get('/api/lessons/:lessonId', (req, res) => {
                
        const { lessonId } = req.params;
        Lesson.findById(
            lessonId,
            (err, item) => {
                if(err) return res.status(500).send(err)
                res.send(item);
            }
        )
    });
    //get all lessons
    app.get('/api/lessons', (req, res) => {
                
        Lesson.find(
            {},
            (err, items) => {
                if(err) return res.status(500).send(err)
                res.send(items);
            }
        )
    });

    app.put('/api/lessons/:lessonId', (req, res) => {
        
        const { lessonId } = req.params;
        Lesson.findByIdAndUpdate(
            lessonId,
            req.body,
            {new: true},
            (err, item) => {
                if (err) return res.status(500).send(err);
                return res.send(item);
            }
        )
    });

    app.delete('/api/lessons/:lessonId', (req, res) => {
        
        const { lessonId } = req.params;
        Lesson.findByIdAndRemove(lessonId, (err, item) =>{
            if (err) return res.status(500).send(err);
            const response = { 
                msg : `Deleted ${item._id}`
            };
            return res.status(200).send(response);
        });
    });
};