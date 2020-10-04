const User = require('@ToDoModels/user');
const Project = require('@ToDoModels/projects')

const privilage = async (req, res, next) => {
    const projectId = req.body.projectId;
    if (projectId) {
        try {
            const project = await Project.findById(projectId)

            if (!project) {
                return res.status(400).json('No project found')
            }
            else {
                const foundProject = project.participants.filter( p => p.user === req.user)

                if (foundProject === []) {
                    return res.json(400).json('Not Authorized to access')
                }
                else {
                    req.role = foundProject[0].role
                    next()
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