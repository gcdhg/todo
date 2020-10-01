const User = require('@ToDoModels/user');
const Project = require('@ToDoModels/projects')

const privilage = async (req, res, next) => {
    const projectId = req.body.projectId;
    if (projectId) {
        try {
            const user = await User.findOne({ _id: req.user }, (err) => {
                if (err) {
                    console.log(err);

                    return res.status(400).json('DB error');
                }
            });
            if (!user) {
                return res.status(400).json('User not found');
            }
            const project = await Project.findOne({ _id: projectId }, (err) => {
                if (err) {
                    console.log(err);

                    return res.status(400).json('DB error');
                }
            });
            if (!project) {
                return res.status(400).json('Project not found');
            }
            if (String(project.owner) === String(req.user)) {
                req.role = 'owner';

                next()
            }
            else {
                if (project.participants.filter((p) => { p.users === req.user })) {
                    req.role = 'worker';

                    next()
                }
                else {
                    return res.status(401).json('Not Authorized to access');
                }
            }
        } catch (err) {
            console.log(err);
            return res.status(400).json('Project not found');
        }
    }
    else {
        req.role = 'user';
        next();
    }
}
module.exports = privilage;