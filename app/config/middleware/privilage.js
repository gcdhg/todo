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
                const foundProject = await project.participants.find( async (p) => p.user === req.user)

                console.log(foundProject);

                if (foundProject === undefined) {
                    return res.json(400).json('Not Authorized to access')
                }
                else {
                    req.role = foundProject.role
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