const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {

    //create user
    app.post('/api/users', async (req, res) => {
        
        const {uid, username, email, role} = req.body;
        const user = new User ({
            externalId: uid,
            username: username,
            email: email,
            role: role
        });

        try {
            await user.save();
            return res.send(user); 
        } catch (error) {
            return res.status(500).send(err);
        }

    });

    //get single lesson
    // app.get('/api/lessons/:lessonId', (req, res) => {
                
    //     const { lessonId } = req.params;
    //     Lesson.findById(
    //         lessonId,
    //         (err, item) => {
    //             if(err) return res.status(500).send(err)
    //             res.send(item);
    //         }
    //     )
    // });
    // get all users
    app.get('/api/users', (req, res) => {
                
        User.find(
            {},
            (err, items) => {
                if(err) return res.status(500).send(err)
                res.send(items);
            }
        )
    });

    // app.put('/api/lessons/:lessonId', (req, res) => {
        
    //     const { lessonId } = req.params;
    //     Lesson.findByIdAndUpdate(
    //         lessonId,
    //         req.body,
    //         {new: true},
    //         (err, item) => {
    //             if (err) return res.status(500).send(err);
    //             return res.send(item);
    //         }
    //     )
    // });

    // app.delete('/api/lessons/:lessonId', (req, res) => {
        
    //     const { lessonId } = req.params;
    //     Lesson.findByIdAndRemove(lessonId, (err, item) =>{
    //         if (err) return res.status(500).send(err);
    //         const response = { 
    //             msg : `Deleted ${item._id}`
    //         };
    //         return res.status(200).send(response);
    //     });
    // });
};