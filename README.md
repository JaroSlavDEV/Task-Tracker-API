# <Task Tracker API>

# USER
[CREATE_USER] [POST] - http://localhost:3000/api/user

[UPDATE_USER] [PUT] - http://localhost:3000/api/user/:id

[DELETE_USER] [DELETE] - http://localhost:3000/api/user/:id

[GET_USERS] [GET] - http://localhost:3000/api/user

# TASK
[CREATE_TASK] [POST] - http://localhost:3000/api/task

[UPDATE_TASK] [PUT] - http://localhost:3000/api/task/:id

[UPDATE_TASK_STATUS] [PATCH] - http://localhost:3000/api/task/status/:id

[UPDATE_TASK_USERID] [PATCH] - http://localhost:3000/api/task/user/:id

[DELETE_TASK] [DELETE] - http://localhost:3000/api/task/:id

[GET_TASKS] [GET] - http://localhost:3000/api/task (/?status=value&sort=value)
