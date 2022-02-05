window.exclude = [];
window.watch = false;
window.environment = 'release';
window.localMode = 'build';

window.appConfig = {
    showDebugger: false,
    projectGraphs: [
        {
            id: 'local',
            label: 'local',
            url: 'projectGraph.json',
        },
    ],
    defaultProjectGraph: 'local',
};
window.projectGraphResponse = {
    hash: '7f3f0ffc3019209cf5ca1817bcbd343731ab8eb30fa842b3e295bc0cd71a17a1',
    projects: [
        {
            name: 'firebase-functions-api',
            type: 'lib',
            data: { tags: [], root: 'libs/firebase/functions-api', files: [] },
        },
        {
            name: 'calendar-sol-calendar',
            type: 'lib',
            data: { tags: [], root: 'libs/calendar/sol-calendar', files: [] },
        },
        {
            name: 'firebase-functions',
            type: 'lib',
            data: {
                tags: ['scope:firebase', 'type:api'],
                root: 'libs/firebase/functions',
                files: [],
            },
        },
        {
            name: 'firebase-database',
            type: 'lib',
            data: {
                tags: ['scope:firebase', 'type:api'],
                root: 'libs/firebase/database',
                files: [],
            },
        },
        {
            name: 'student-reports',
            type: 'lib',
            data: {
                tags: ['scope:student'],
                root: 'libs/student/reports',
                files: [],
            },
        },
        {
            name: 'student-domain',
            type: 'lib',
            data: {
                tags: ['scope:student'],
                root: 'libs/student/domain',
                files: [],
            },
        },
        {
            name: 'firebase-auth',
            type: 'lib',
            data: {
                tags: ['scope:firebase'],
                root: 'libs/firebase/auth',
                files: [],
            },
        },
        {
            name: 'record-domain',
            type: 'lib',
            data: {
                tags: ['scope:record', 'type:api'],
                root: 'libs/record/domain',
                files: [],
            },
        },
        {
            name: 'pdf-firebase',
            type: 'lib',
            data: {
                tags: ['scope:pdf', 'type:api'],
                root: 'libs/pdf/firebase',
                files: [],
            },
        },
        {
            name: 'pdf-generate',
            type: 'lib',
            data: {
                tags: ['scope:pdf', 'type:api'],
                root: 'libs/pdf/generate',
                files: [],
            },
        },
        {
            name: 'table-domain',
            type: 'lib',
            data: {
                tags: ['scope:table', 'type:api'],
                root: 'libs/table/domain',
                files: [],
            },
        },
        {
            name: 'auth-login',
            type: 'lib',
            data: { tags: ['scope:auth'], root: 'libs/auth/login', files: [] },
        },
        {
            name: 'portal-e2e',
            type: 'e2e',
            data: { tags: [], root: 'apps/portal-e2e', files: [] },
        },
        {
            name: 'table-html',
            type: 'lib',
            data: {
                tags: ['scope:table', 'type:api'],
                root: 'libs/table/html',
                files: [],
            },
        },
        {
            name: 'functions',
            type: 'app',
            data: { tags: [], root: 'apps/functions', files: [] },
        },
        {
            name: 'table-pdf',
            type: 'lib',
            data: {
                tags: ['scope:table', 'type:api'],
                root: 'libs/table/pdf',
                files: [],
            },
        },
        {
            name: 'header',
            type: 'lib',
            data: { tags: ['scope:header'], root: 'libs/header', files: [] },
        },
        {
            name: 'portal',
            type: 'app',
            data: { tags: [], root: 'apps/portal', files: [] },
        },
        {
            name: 'paths',
            type: 'lib',
            data: { tags: ['scope:libs/paths'], root: 'libs/paths', files: [] },
        },
    ],
    dependencies: {
        'firebase-functions-api': [],
        'calendar-sol-calendar': [
            {
                source: 'calendar-sol-calendar',
                target: 'firebase-functions-api',
                type: 'static',
            },
        ],
        'firebase-functions': [],
        'firebase-database': [],
        'student-reports': [
            {
                source: 'student-reports',
                target: 'firebase-database',
                type: 'static',
            },
            {
                source: 'student-reports',
                target: 'student-domain',
                type: 'static',
            },
            {
                source: 'student-reports',
                target: 'table-domain',
                type: 'static',
            },
            { source: 'student-reports', target: 'table-pdf', type: 'static' },
        ],
        'student-domain': [
            {
                source: 'student-domain',
                target: 'record-domain',
                type: 'static',
            },
        ],
        'firebase-auth': [],
        'record-domain': [],
        'pdf-firebase': [],
        'pdf-generate': [],
        'table-domain': [],
        'auth-login': [
            { source: 'auth-login', target: 'firebase-auth', type: 'static' },
        ],
        'portal-e2e': [
            { source: 'portal-e2e', target: 'portal', type: 'implicit' },
        ],
        'table-html': [
            { source: 'table-html', target: 'table-domain', type: 'static' },
            { source: 'table-html', target: 'record-domain', type: 'static' },
        ],
        functions: [
            {
                source: 'functions',
                target: 'firebase-functions',
                type: 'static',
            },
            { source: 'functions', target: 'pdf-firebase', type: 'static' },
            {
                source: 'functions',
                target: 'firebase-database',
                type: 'static',
            },
            { source: 'functions', target: 'student-reports', type: 'static' },
        ],
        'table-pdf': [
            { source: 'table-pdf', target: 'record-domain', type: 'static' },
            { source: 'table-pdf', target: 'table-domain', type: 'static' },
            { source: 'table-pdf', target: 'table-html', type: 'static' },
        ],
        header: [{ source: 'header', target: 'auth-login', type: 'static' }],
        portal: [
            { source: 'portal', target: 'header', type: 'static' },
            { source: 'portal', target: 'auth-login', type: 'static' },
            {
                source: 'portal',
                target: 'calendar-sol-calendar',
                type: 'static',
            },
            {
                source: 'portal',
                target: 'firebase-functions-api',
                type: 'static',
            },
        ],
        paths: [],
    },
    layout: { appsDir: 'apps', libsDir: 'libs' },
    affected: [],
    focus: null,
    groupByFolder: false,
    exclude: [],
};
