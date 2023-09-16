/**
 * @file 考勤管理路由
 * @module src\router\AttendanceManagement.js
 * @version 1.0
 */



/**
 * @description 考勤记录路由
 * @type {Object}
 * @property {string} path - 路由路径
 * @property {Object} component - 路由组件
 * @property {Object} children - 子路由
 * @property {Object} children.path - 子路由路径
 * @property {Object} children.components - 子路由组件
 */
const setupAttendanceManagementRouter = {
    path: '/uesdata',
    component: () => import('./../components/home/ui/home.vue'),
    children: [
        {
            path: '',
            components: {
                left: () => import('./../components/home/ui/left.vue'),
                right: () => import('./../components/home/ui/right/topInBody.vue'),
            },
            children: [
                {
                    path: '',
                    components: {
                        top: () => import('./../components/home/ui/head.vue'),
                        // body: () => import('./../components/home/ui/useDate.vue')
                    }
                }
            ]
        },
        {
            path: 'attendanceRecordRoute',
            components: {
                left: () => import('./../components/home/ui/left.vue'),
                right: () => import('./../components/home/ui/right/notop.vue')
            }
        }
    ]
}

/**
 * @description 加班管理路由
 */
const setupOvertimeManagementRouter = {
    path: '/uesdata/setupOvertimeManagementRouter',
    components: {
        default: () => import('./../components/home/ui/home.vue'),
    },
    children: [
        {
            path: '',
            components: {
                left: () => import('./../components/home/ui/left.vue'),
                right: () => import('./../components/attendanceManagement/setupOvertimeManagementRouter/ui/home.vue'),
            },
        },
        // // 请假记录路由
        // {
        //     path: '1',
        //     components: {
        //         left: () => import('./../components/home/ui/left.vue'),
        //         left: () => import('./../components/home/ui/left.vue'),
        //         right: () => import('./../components/attendanceManagement/setupOvertimeManagementRouter/ui/home.vue'),
        //         bottom: () => import('./../components/attendanceManagement/setupOvertimeManagementRouter/ui/bodyView/1/index.vue')
                
        //     }
        // },
        // // 添加请假路由
        // {
        //     path: '2'
        // }
    ]
}

/**
 * @description 出差管理路由
 */
const setupBusinessTripManagementRouter = {
    path: '/uesdata/setupBusinessTripManagementRouter',
    component: () => import('./../components/home/ui/home.vue'),

    children: [
        {
            name: 'setupBusinessTripManagementRouter',
            path: '',
            components: {
                left: () => import('./../components/home/ui/left.vue'),
                right: () => import('./../components/attendanceManagement/BusinessTripManagement/ui/home.vue'),
            },
        }
    ]
}

/**
 * @description 请假管理路由
 */
const setupLeaveManagementRouter = {
    path: '/uesdata/setupLeaveManagementRouter',
    component: () => import('./../components/home/ui/home.vue'),
    children: [
        {
            path: '',
            components: {
                left: () => import('./../components/home/ui/left.vue'),
                right: () => import('./../components/attendanceManagement/LeaveManagement/ui/home.vue'),
            }
        }
    ]
}


const AttendanceManagement = [
    setupAttendanceManagementRouter,
    setupOvertimeManagementRouter,
    setupBusinessTripManagementRouter,
    setupLeaveManagementRouter
]
export default AttendanceManagement
