window.exclude = [];
window.watch = false;
window.environment = 'release';
window.localMode = 'build';

window.appConfig = {
    showDebugger: false,
    showExperimentalFeatures: false,
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
    hash: '3abf75b3144b0616d6a1a6f8e2c1164b887613715925e91c0f16fe634f2c19ae',
    projects: [
        {
            name: 'classes-class-enrollment',
            type: 'lib',
            data: {
                tags: ['classes'],
                root: 'libs/classes/class-enrollment',
                files: [
                    {
                        file: 'libs/classes/class-enrollment/.eslintrc.json',
                        hash: '1f9eb08cc3bab49fc6e2ae8027abb42a5050ea0f',
                    },
                    {
                        file: 'libs/classes/class-enrollment/jest.config.ts',
                        hash: 'f6c1d46134ee2beca5daeff18bdeb47cbf92685c',
                    },
                    {
                        file: 'libs/classes/class-enrollment/README.md',
                        hash: '273d5b0c429420f8e6db48df591fdb63a699d323',
                    },
                    {
                        file: 'libs/classes/class-enrollment/src/index.ts',
                        hash: '9a17db1b859be53ca5d5eec00d32d1afcac51dbe',
                    },
                    {
                        file: 'libs/classes/class-enrollment/src/lib/class-enrollment.module.ts',
                        hash: '52363abe93b1d249c05cf1b340928ea87f84b670',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/common',
                            'npm:@angular/router',
                        ],
                    },
                    {
                        file: 'libs/classes/class-enrollment/src/test-setup.ts',
                        hash: '1100b3e8a6ed08f4b5c27a96471846d57023c320',
                        deps: ['npm:jest-preset-angular'],
                    },
                    {
                        file: 'libs/classes/class-enrollment/tsconfig.json',
                        hash: '115c4df0bcff5ab97e42dc212bd1540038714598',
                    },
                    {
                        file: 'libs/classes/class-enrollment/tsconfig.lib.json',
                        hash: '298c04e06dbb12f956956f1a8eab1ca9507fbaa5',
                    },
                    {
                        file: 'libs/classes/class-enrollment/tsconfig.spec.json',
                        hash: '18c71e05e4b65aa817c3aefd69c9da7d27ca5a19',
                    },
                ],
            },
        },
        {
            name: 'classes-class-management',
            type: 'lib',
            data: {
                tags: ['scope:classes'],
                root: 'libs/classes/class-management',
                files: [
                    {
                        file: 'libs/classes/class-management/.eslintrc.json',
                        hash: '1f9eb08cc3bab49fc6e2ae8027abb42a5050ea0f',
                    },
                    {
                        file: 'libs/classes/class-management/jest.config.ts',
                        hash: 'e207770e078619a04ede1dcbb9326e9f0dfc9d7e',
                    },
                    {
                        file: 'libs/classes/class-management/README.md',
                        hash: '8edca1e3a189fad63fb698c7664e01978310fb5b',
                    },
                    {
                        file: 'libs/classes/class-management/src/index.ts',
                        hash: '53a79c5b70859c69a2e1bf242a1cdc38af0e431d',
                    },
                    {
                        file: 'libs/classes/class-management/src/lib/class-management.module.ts',
                        hash: 'f60f7af35510675068e061aa8254135e64267776',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/common',
                            'npm:@angular/router',
                        ],
                    },
                    {
                        file: 'libs/classes/class-management/src/lib/components/class-form.component.ts/class-form.component.ts',
                        hash: 'e748f79adc271267b38c04a7e1e0f1c800d9a70a',
                        deps: ['npm:@angular/core'],
                    },
                    {
                        file: 'libs/classes/class-management/src/test-setup.ts',
                        hash: '1100b3e8a6ed08f4b5c27a96471846d57023c320',
                        deps: ['npm:jest-preset-angular'],
                    },
                    {
                        file: 'libs/classes/class-management/tsconfig.json',
                        hash: '115c4df0bcff5ab97e42dc212bd1540038714598',
                    },
                    {
                        file: 'libs/classes/class-management/tsconfig.lib.json',
                        hash: '298c04e06dbb12f956956f1a8eab1ca9507fbaa5',
                    },
                    {
                        file: 'libs/classes/class-management/tsconfig.spec.json',
                        hash: '18c71e05e4b65aa817c3aefd69c9da7d27ca5a19',
                    },
                ],
            },
        },
        {
            name: 'classes-calendar',
            type: 'lib',
            data: {
                tags: ['scope:classes'],
                root: 'libs/classes/class-calendar',
                files: [
                    {
                        file: 'libs/classes/class-calendar/.eslintrc.json',
                        hash: '1f9eb08cc3bab49fc6e2ae8027abb42a5050ea0f',
                    },
                    {
                        file: 'libs/classes/class-calendar/jest.config.ts',
                        hash: '0248c9fbb036fd2a69bddb211e6ff998a28c8c5a',
                    },
                    {
                        file: 'libs/classes/class-calendar/README.md',
                        hash: '77b59da334db8aea4ff561c8f9157d87dcb1bee4',
                    },
                    {
                        file: 'libs/classes/class-calendar/src/index.ts',
                        hash: '5092954f24019e364bccbed6cd23bef348427965',
                    },
                    {
                        file: 'libs/classes/class-calendar/src/lib/calendar-routing.module.ts',
                        hash: '5da5fa28b487efaeff151dd77f886eda2182c628',
                        deps: ['npm:@angular/core', 'npm:@angular/router'],
                    },
                    {
                        file: 'libs/classes/class-calendar/src/lib/classes-calendar.module.ts',
                        hash: 'a5d611d6cff5692214b2e103329aeefe3041e3a1',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/common',
                            'calendar',
                            'npm:primeng',
                            'firebase-functions-api',
                        ],
                    },
                    {
                        file: 'libs/classes/class-calendar/src/lib/components/classes-calendar.component.ts',
                        hash: 'c4070c5f72fadfe4a08e6606c8a1aac96c8d0b8f',
                        deps: [
                            'npm:@angular/core',
                            'npm:@fullcalendar/angular',
                            'classeses-domain',
                            'firebase-functions-api',
                            'npm:rxjs',
                        ],
                    },
                    {
                        file: 'libs/classes/class-calendar/src/test-setup.ts',
                        hash: '1100b3e8a6ed08f4b5c27a96471846d57023c320',
                        deps: ['npm:jest-preset-angular'],
                    },
                    {
                        file: 'libs/classes/class-calendar/tsconfig.json',
                        hash: '115c4df0bcff5ab97e42dc212bd1540038714598',
                    },
                    {
                        file: 'libs/classes/class-calendar/tsconfig.lib.json',
                        hash: 'a689bad718802b28804a47868e45714e86d8ff5a',
                    },
                    {
                        file: 'libs/classes/class-calendar/tsconfig.spec.json',
                        hash: '18c71e05e4b65aa817c3aefd69c9da7d27ca5a19',
                    },
                ],
            },
        },
        {
            name: 'classeses-domain',
            type: 'lib',
            data: {
                tags: ['scope:classes'],
                root: 'libs/classes/classes-domain',
                files: [
                    {
                        file: 'libs/classes/classes-domain/.eslintrc.json',
                        hash: '1f9eb08cc3bab49fc6e2ae8027abb42a5050ea0f',
                    },
                    {
                        file: 'libs/classes/classes-domain/jest.config.ts',
                        hash: '190b03797257f7c0184584b3c2f49c2a576f61df',
                    },
                    {
                        file: 'libs/classes/classes-domain/README.md',
                        hash: '59000ac5304586b849f0eb50681a6c2936c8006f',
                    },
                    {
                        file: 'libs/classes/classes-domain/src/index.ts',
                        hash: '365b0e62e0b3d7a273ec0d7d116f86c94c8a12a5',
                    },
                    {
                        file: 'libs/classes/classes-domain/src/lib/classes-domain.module.ts',
                        hash: '8728e861f0240636e92ee5110e626ad5af2d7db7',
                        deps: ['npm:@angular/core', 'npm:@angular/common'],
                    },
                    {
                        file: 'libs/classes/classes-domain/src/lib/models/class.ts',
                        hash: '38d0f61eeaee1c7688e353cd05f871bbd1d71ed4',
                    },
                    {
                        file: 'libs/classes/classes-domain/src/test-setup.ts',
                        hash: '1100b3e8a6ed08f4b5c27a96471846d57023c320',
                        deps: ['npm:jest-preset-angular'],
                    },
                    {
                        file: 'libs/classes/classes-domain/tsconfig.json',
                        hash: '115c4df0bcff5ab97e42dc212bd1540038714598',
                    },
                    {
                        file: 'libs/classes/classes-domain/tsconfig.lib.json',
                        hash: '298c04e06dbb12f956956f1a8eab1ca9507fbaa5',
                    },
                    {
                        file: 'libs/classes/classes-domain/tsconfig.spec.json',
                        hash: '18c71e05e4b65aa817c3aefd69c9da7d27ca5a19',
                    },
                ],
            },
        },
        {
            name: 'firebase-functions-api',
            type: 'lib',
            data: {
                tags: [],
                root: 'libs/firebase/functions-api',
                files: [
                    {
                        file: 'libs/firebase/functions-api/.eslintrc.json',
                        hash: '1f9eb08cc3bab49fc6e2ae8027abb42a5050ea0f',
                    },
                    {
                        file: 'libs/firebase/functions-api/jest.config.ts',
                        hash: '45ac39389cc88c2832e35394213aca027c337d38',
                    },
                    {
                        file: 'libs/firebase/functions-api/README.md',
                        hash: '19e47e3c546147f3e6d2d93da2bfcb9cac1f85d7',
                    },
                    {
                        file: 'libs/firebase/functions-api/src/index.ts',
                        hash: '5e17ff9a2421b9f73894f23f4523fb9b8fd39dc3',
                    },
                    {
                        file: 'libs/firebase/functions-api/src/lib/services/functions.service.module.ts',
                        hash: '00302ccc9c27f2584811e89a6526dd3968a54221',
                        deps: ['npm:@angular/core'],
                    },
                    {
                        file: 'libs/firebase/functions-api/src/lib/services/functions.service.ts',
                        hash: '80ee41f017f3f607ff273edb32943aa9ef6ed4b1',
                        deps: [
                            'npm:@angular/fire',
                            'npm:@angular/core',
                            'npm:rxjs',
                        ],
                    },
                    {
                        file: 'libs/firebase/functions-api/src/test-setup.ts',
                        hash: '1100b3e8a6ed08f4b5c27a96471846d57023c320',
                        deps: ['npm:jest-preset-angular'],
                    },
                    {
                        file: 'libs/firebase/functions-api/tsconfig.json',
                        hash: '115c4df0bcff5ab97e42dc212bd1540038714598',
                    },
                    {
                        file: 'libs/firebase/functions-api/tsconfig.lib.json',
                        hash: '298c04e06dbb12f956956f1a8eab1ca9507fbaa5',
                    },
                    {
                        file: 'libs/firebase/functions-api/tsconfig.spec.json',
                        hash: '18c71e05e4b65aa817c3aefd69c9da7d27ca5a19',
                    },
                ],
            },
        },
        {
            name: 'student-persistence',
            type: 'lib',
            data: {
                tags: ['scope:student'],
                root: 'libs/student/persistence',
                files: [
                    {
                        file: 'libs/student/persistence/.eslintrc.json',
                        hash: '1f9eb08cc3bab49fc6e2ae8027abb42a5050ea0f',
                    },
                    {
                        file: 'libs/student/persistence/jest.config.ts',
                        hash: 'a5ca73763ab32a59340f0eea7aa1cca4fc00cc76',
                    },
                    {
                        file: 'libs/student/persistence/README.md',
                        hash: '96f2f4112c11e228faf50157090507952f1f8d5d',
                    },
                    {
                        file: 'libs/student/persistence/src/index.ts',
                        hash: 'fa9cf983a0d87ce6e43105ddac4cda3ea322192c',
                    },
                    {
                        file: 'libs/student/persistence/src/lib/persistence.module.ts',
                        hash: 'a172d41ef5d8883519fc4443481572265dbd5569',
                        deps: ['npm:@angular/core', 'npm:@angular/common'],
                    },
                    {
                        file: 'libs/student/persistence/src/lib/utilities/student-repository.utility.ts',
                        hash: '02c7fe69f257390fecf304900cc90cb640345d86',
                        deps: [
                            'firebase-database',
                            'npm:firebase-admin',
                            'student-domain',
                        ],
                    },
                    {
                        file: 'libs/student/persistence/src/test-setup.ts',
                        hash: '1100b3e8a6ed08f4b5c27a96471846d57023c320',
                        deps: ['npm:jest-preset-angular'],
                    },
                    {
                        file: 'libs/student/persistence/tsconfig.json',
                        hash: '115c4df0bcff5ab97e42dc212bd1540038714598',
                    },
                    {
                        file: 'libs/student/persistence/tsconfig.lib.json',
                        hash: '298c04e06dbb12f956956f1a8eab1ca9507fbaa5',
                    },
                    {
                        file: 'libs/student/persistence/tsconfig.spec.json',
                        hash: '18c71e05e4b65aa817c3aefd69c9da7d27ca5a19',
                    },
                ],
            },
        },
        {
            name: 'firebase-functions',
            type: 'lib',
            data: {
                tags: ['scope:firebase', 'type:api'],
                root: 'libs/firebase/functions',
                files: [
                    {
                        file: 'libs/firebase/functions/.babelrc',
                        hash: '4496e8f26c84b58235cb0a378da85bdbd7329a26',
                    },
                    {
                        file: 'libs/firebase/functions/.eslintrc.json',
                        hash: '9761c563892c65a3ab3e8d1d75c0f441fea954ca',
                    },
                    {
                        file: 'libs/firebase/functions/jest.config.ts',
                        hash: '137dd1286d2b0174f3848521affb0a41bf46a3d8',
                    },
                    {
                        file: 'libs/firebase/functions/README.md',
                        hash: 'e7a99371f27435da9c23b770304acc5c4cbfc0be',
                    },
                    {
                        file: 'libs/firebase/functions/src/index.ts',
                        hash: '9c13c6f86ec28b0e482d4ce8b4da48499c9cd133',
                    },
                    {
                        file: 'libs/firebase/functions/src/lib/firebase-functions.spec.ts',
                        hash: 'bae91d425e0f65ecf685f651287e55e6ae53dc6e',
                    },
                    {
                        file: 'libs/firebase/functions/src/lib/firebase-functions.ts',
                        hash: 'fed965026b92d95e20fed326af1f7da57f799b7b',
                    },
                    {
                        file: 'libs/firebase/functions/src/lib/utilities/auth.utility.ts',
                        hash: '49bce14cfc24942e1550e387f3505aa13b430436',
                        deps: [
                            'firebase-database',
                            'npm:firebase-admin',
                            'npm:firebase-functions',
                        ],
                    },
                    {
                        file: 'libs/firebase/functions/src/lib/utilities/http.utility.ts',
                        hash: '3ab26b1e15a2de42e5adab1cecd569ad49c67725',
                        deps: ['npm:firebase-functions', 'npm:cors'],
                    },
                    {
                        file: 'libs/firebase/functions/src/lib/utilities/index.ts',
                        hash: '809c39fab9b60d95bdfbe159e261c6d75c5a1949',
                    },
                    {
                        file: 'libs/firebase/functions/tsconfig.json',
                        hash: 'b8b7b3ce4b41fb81e471e825f9c10d9ce8dd0ad0',
                    },
                    {
                        file: 'libs/firebase/functions/tsconfig.lib.json',
                        hash: 'dddeffa118d77e2311cc0d80a6a3e79f52af307b',
                    },
                    {
                        file: 'libs/firebase/functions/tsconfig.spec.json',
                        hash: '657db49d82082b68b31659391d4aafb0dada80b2',
                    },
                ],
            },
        },
        {
            name: 'calendar',
            type: 'lib',
            data: {
                tags: [],
                root: 'libs/calendar/calendar',
                files: [
                    {
                        file: 'libs/calendar/calendar/.browserslistrc',
                        hash: '4f9ac26980c156a3d525267010d5f78144b43519',
                    },
                    {
                        file: 'libs/calendar/calendar/.eslintrc.json',
                        hash: '1f9eb08cc3bab49fc6e2ae8027abb42a5050ea0f',
                    },
                    {
                        file: 'libs/calendar/calendar/jest.config.ts',
                        hash: 'ade4b229af6cfdc29c1777c9909528420187660c',
                    },
                    {
                        file: 'libs/calendar/calendar/README.md',
                        hash: '44b081d03d10f9b0ab44d1e7a6ddfdda54d1e9d1',
                    },
                    {
                        file: 'libs/calendar/calendar/src/index.ts',
                        hash: '6427d62c0b0b420e58f2e8c04cb2f70fb137855a',
                    },
                    {
                        file: 'libs/calendar/calendar/src/lib/components/calendar.component.ts',
                        hash: '17c6e15982a5a13c290e649ada1dc9b5ad8492f0',
                        deps: [
                            'npm:@angular/core',
                            'npm:@fullcalendar/angular',
                            'firebase-functions-api',
                            'npm:rxjs',
                        ],
                    },
                    {
                        file: 'libs/calendar/calendar/src/lib/sol-calendar.module.ts',
                        hash: '447c981b0fbdb8c26d7395970b9fafbac7542091',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/common',
                            'npm:@fullcalendar/angular',
                            'npm:@fullcalendar/interaction',
                            'npm:@fullcalendar/daygrid',
                            'npm:@fullcalendar/timegrid',
                            'npm:primeng',
                        ],
                    },
                    {
                        file: 'libs/calendar/calendar/src/test-setup.ts',
                        hash: '1100b3e8a6ed08f4b5c27a96471846d57023c320',
                        deps: ['npm:jest-preset-angular'],
                    },
                    {
                        file: 'libs/calendar/calendar/tsconfig.json',
                        hash: '115c4df0bcff5ab97e42dc212bd1540038714598',
                    },
                    {
                        file: 'libs/calendar/calendar/tsconfig.lib.json',
                        hash: '37518bb616dad49c42409a8f46d17b65110bd0ca',
                    },
                    {
                        file: 'libs/calendar/calendar/tsconfig.spec.json',
                        hash: '18c71e05e4b65aa817c3aefd69c9da7d27ca5a19',
                    },
                ],
            },
        },
        {
            name: 'firebase-database',
            type: 'lib',
            data: {
                tags: ['scope:firebase', 'type:api'],
                root: 'libs/firebase/database',
                files: [
                    {
                        file: 'libs/firebase/database/.babelrc',
                        hash: '4496e8f26c84b58235cb0a378da85bdbd7329a26',
                    },
                    {
                        file: 'libs/firebase/database/.eslintrc.json',
                        hash: '9761c563892c65a3ab3e8d1d75c0f441fea954ca',
                    },
                    {
                        file: 'libs/firebase/database/jest.config.ts',
                        hash: 'e6b6d5378a121b1bb35634b92ee4a552a041d81b',
                    },
                    {
                        file: 'libs/firebase/database/README.md',
                        hash: 'd61cc20e430111f3c59bd8f5a445b1810387e41b',
                    },
                    {
                        file: 'libs/firebase/database/src/index.ts',
                        hash: 'e90b2e4df93dafbd0af1b0c98e26997425851124',
                    },
                    {
                        file: 'libs/firebase/database/src/lib/firebase-database.spec.ts',
                        hash: '6f7f91e762852e803e43d25bdd99efe99e789bd4',
                    },
                    {
                        file: 'libs/firebase/database/src/lib/firebase-database.ts',
                        hash: 'fa76a6bbceda39349a739b37eb76d7d642f8db6e',
                    },
                    {
                        file: 'libs/firebase/database/src/lib/utilities/database.utility.ts',
                        hash: '923e5ddb1f876dff4ced763f9b4e517b6d6e1f0d',
                        deps: ['npm:firebase-admin'],
                    },
                    {
                        file: 'libs/firebase/database/src/lib/utilities/index.ts',
                        hash: '26f8414414613f06f0fc5edaefb428432bc38d52',
                    },
                    {
                        file: 'libs/firebase/database/tsconfig.json',
                        hash: 'b8b7b3ce4b41fb81e471e825f9c10d9ce8dd0ad0',
                    },
                    {
                        file: 'libs/firebase/database/tsconfig.lib.json',
                        hash: 'af086246fd2485ae0585acf1a3a420b6cc356138',
                    },
                    {
                        file: 'libs/firebase/database/tsconfig.spec.json',
                        hash: '657db49d82082b68b31659391d4aafb0dada80b2',
                    },
                ],
            },
        },
        {
            name: 'student-reports',
            type: 'lib',
            data: {
                tags: ['scope:student'],
                root: 'libs/student/reports',
                files: [
                    {
                        file: 'libs/student/reports/.babelrc',
                        hash: '4496e8f26c84b58235cb0a378da85bdbd7329a26',
                    },
                    {
                        file: 'libs/student/reports/.eslintrc.json',
                        hash: '9761c563892c65a3ab3e8d1d75c0f441fea954ca',
                    },
                    {
                        file: 'libs/student/reports/jest.config.ts',
                        hash: '4ba6d5a9d761b30fb665dd9956c4b0ba4f726aa8',
                    },
                    {
                        file: 'libs/student/reports/README.md',
                        hash: '35cd90bad84e4ea9bb9ae1981067261a423c66e6',
                    },
                    {
                        file: 'libs/student/reports/src/index.ts',
                        hash: '13e83381dfc12bb8de215bd7ccf16d7d0c5d6db4',
                    },
                    {
                        file: 'libs/student/reports/src/lib/student-reports.spec.ts',
                        hash: 'f0589740e8bbda1f74b1e97707c0b0a3df4818c8',
                    },
                    {
                        file: 'libs/student/reports/src/lib/student-reports.ts',
                        hash: 'd600bc2da35c08c216812c1616c1df00d91b5558',
                    },
                    {
                        file: 'libs/student/reports/src/lib/utilities/class-emails.utilities.ts',
                        hash: 'ad89e3685769ca9b0e4177e35f650f28c4fadac6',
                        deps: ['student-persistence', 'npm:firebase-admin'],
                    },
                    {
                        file: 'libs/student/reports/src/lib/utilities/index.ts',
                        hash: '4d3f672921b1122e10fc29e3676f454ea10bdf63',
                    },
                    {
                        file: 'libs/student/reports/src/lib/utilities/roster-report.utilities.ts',
                        hash: '29d4181a611aa3f9eaec37053ba18334cc630b37',
                        deps: [
                            'npm:firebase-admin',
                            'student-domain',
                            'table-domain',
                            'table-pdf',
                            'record-domain',
                            'student-persistence',
                        ],
                    },
                    {
                        file: 'libs/student/reports/tsconfig.json',
                        hash: 'b8b7b3ce4b41fb81e471e825f9c10d9ce8dd0ad0',
                    },
                    {
                        file: 'libs/student/reports/tsconfig.lib.json',
                        hash: 'af086246fd2485ae0585acf1a3a420b6cc356138',
                    },
                    {
                        file: 'libs/student/reports/tsconfig.spec.json',
                        hash: '657db49d82082b68b31659391d4aafb0dada80b2',
                    },
                ],
            },
        },
        {
            name: 'student-domain',
            type: 'lib',
            data: {
                tags: ['scope:student'],
                root: 'libs/student/domain',
                files: [
                    {
                        file: 'libs/student/domain/.babelrc',
                        hash: '4496e8f26c84b58235cb0a378da85bdbd7329a26',
                    },
                    {
                        file: 'libs/student/domain/.eslintrc.json',
                        hash: '9761c563892c65a3ab3e8d1d75c0f441fea954ca',
                    },
                    {
                        file: 'libs/student/domain/jest.config.ts',
                        hash: 'c6719b940a81792980f538a9547b2d6dde6917ec',
                    },
                    {
                        file: 'libs/student/domain/README.md',
                        hash: '8354a17cc4540cb4b0e5bace84c803cb047c3fa5',
                    },
                    {
                        file: 'libs/student/domain/src/index.ts',
                        hash: '5b8cd8a398413db7e705a93d8a4b4137940942b6',
                    },
                    {
                        file: 'libs/student/domain/src/lib/models/contact-db-entry.type.ts',
                        hash: 'ebed5bc8e1c2a0e3fab84c7bac77d3bedd16e447',
                    },
                    {
                        file: 'libs/student/domain/src/lib/models/contact.type.ts',
                        hash: '1db04eb8a2c81ca2d9bf7532aaa8dec404882660',
                    },
                    {
                        file: 'libs/student/domain/src/lib/models/index.ts',
                        hash: '326facdae41b5f25e13a78bba5990d010defd231',
                    },
                    {
                        file: 'libs/student/domain/src/lib/models/student-db-entry.type.ts',
                        hash: '421a9903e80e5b485d390e0acf5c2dbaf02a866f',
                    },
                    {
                        file: 'libs/student/domain/src/lib/models/student-record-property-names.ts',
                        hash: '45a319c7921b0d3f603b14f1d3fe2413b331522e',
                    },
                    {
                        file: 'libs/student/domain/src/lib/models/student-record.type.ts',
                        hash: 'ade50c513284e3f11f358efef2085d6f73179169',
                        deps: ['record-domain'],
                    },
                    {
                        file: 'libs/student/domain/src/lib/models/student-sign-in-record-property-names.ts',
                        hash: '6e5e2290520b0a4d7642704270751ae7fed04f0e',
                    },
                    {
                        file: 'libs/student/domain/src/lib/student-domain.spec.ts',
                        hash: '82fa3bc67e93f60515b9045b6b4021399fb170ee',
                    },
                    {
                        file: 'libs/student/domain/src/lib/student-domain.ts',
                        hash: '4ab4393f4a23414016961dfcdecd8ef3139ce44e',
                    },
                    {
                        file: 'libs/student/domain/tsconfig.json',
                        hash: 'b8b7b3ce4b41fb81e471e825f9c10d9ce8dd0ad0',
                    },
                    {
                        file: 'libs/student/domain/tsconfig.lib.json',
                        hash: 'af086246fd2485ae0585acf1a3a420b6cc356138',
                    },
                    {
                        file: 'libs/student/domain/tsconfig.spec.json',
                        hash: '657db49d82082b68b31659391d4aafb0dada80b2',
                    },
                ],
            },
        },
        {
            name: 'student-import',
            type: 'lib',
            data: {
                tags: ['scope:student'],
                root: 'libs/student/import',
                files: [
                    {
                        file: 'libs/student/import/.eslintrc.json',
                        hash: '1f9eb08cc3bab49fc6e2ae8027abb42a5050ea0f',
                    },
                    {
                        file: 'libs/student/import/jest.config.ts',
                        hash: '5ddf7d0ba376615ca6e4012f4e177221fbf8d3f8',
                    },
                    {
                        file: 'libs/student/import/README.md',
                        hash: '11d12b2a1c0113f280d52bf72001f595f3eb8d1c',
                    },
                    {
                        file: 'libs/student/import/src/index.ts',
                        hash: '309f910f6114fdcd43a34586210a46afd7cf9dc9',
                    },
                    {
                        file: 'libs/student/import/src/lib/models/enrollment-classes-map.ts',
                        hash: '713fd73224dbf6bbd7c72f05484e6068aac3d1d7',
                    },
                    {
                        file: 'libs/student/import/src/lib/models/student-enrollment-csv-header-map.ts',
                        hash: 'e09317985e5f8a8cf60f4751aefe24618285a28a',
                    },
                    {
                        file: 'libs/student/import/src/lib/models/student-enrollment-entry.interface.ts',
                        hash: 'e75070321fcccb625d9bb35afedeaf878e49a167',
                    },
                    {
                        file: 'libs/student/import/src/test-setup.ts',
                        hash: '1100b3e8a6ed08f4b5c27a96471846d57023c320',
                        deps: ['npm:jest-preset-angular'],
                    },
                    {
                        file: 'libs/student/import/tsconfig.json',
                        hash: '115c4df0bcff5ab97e42dc212bd1540038714598',
                    },
                    {
                        file: 'libs/student/import/tsconfig.lib.json',
                        hash: '298c04e06dbb12f956956f1a8eab1ca9507fbaa5',
                    },
                    {
                        file: 'libs/student/import/tsconfig.spec.json',
                        hash: '18c71e05e4b65aa817c3aefd69c9da7d27ca5a19',
                    },
                ],
            },
        },
        {
            name: 'firebase-auth',
            type: 'lib',
            data: {
                tags: ['scope:firebase'],
                root: 'libs/firebase/auth',
                files: [
                    {
                        file: 'libs/firebase/auth/.browserslistrc',
                        hash: '4f9ac26980c156a3d525267010d5f78144b43519',
                    },
                    {
                        file: 'libs/firebase/auth/.eslintrc.json',
                        hash: '1f9eb08cc3bab49fc6e2ae8027abb42a5050ea0f',
                    },
                    {
                        file: 'libs/firebase/auth/jest.config.ts',
                        hash: '9fff8ba2c8a91d5baa16ddac92cd9e0b33fe24c7',
                    },
                    {
                        file: 'libs/firebase/auth/README.md',
                        hash: 'd10932a09f803f11ca50285e0ffc6799c94c52af',
                    },
                    {
                        file: 'libs/firebase/auth/src/index.ts',
                        hash: '78d840f3dd493db34ee969dfe6b9ad157a4689a0',
                    },
                    {
                        file: 'libs/firebase/auth/src/lib/firebase-auth.module.ts',
                        hash: '37ee080dbc4a0e4eb63a85f1fe11061ddfdf6508',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/common',
                            'npm:@angular/fire',
                        ],
                    },
                    {
                        file: 'libs/firebase/auth/src/lib/services/auth.service.ts',
                        hash: '4a6ac8f2626bb66ad0ee79962507413d6370d867',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/router',
                            'npm:@angular/fire',
                            'npm:rxjs',
                        ],
                    },
                    {
                        file: 'libs/firebase/auth/src/test-setup.ts',
                        hash: '1100b3e8a6ed08f4b5c27a96471846d57023c320',
                        deps: ['npm:jest-preset-angular'],
                    },
                    {
                        file: 'libs/firebase/auth/tsconfig.json',
                        hash: '115c4df0bcff5ab97e42dc212bd1540038714598',
                    },
                    {
                        file: 'libs/firebase/auth/tsconfig.lib.json',
                        hash: '298c04e06dbb12f956956f1a8eab1ca9507fbaa5',
                    },
                    {
                        file: 'libs/firebase/auth/tsconfig.spec.json',
                        hash: '18c71e05e4b65aa817c3aefd69c9da7d27ca5a19',
                    },
                ],
            },
        },
        {
            name: 'record-domain',
            type: 'lib',
            data: {
                tags: ['scope:record', 'type:api'],
                root: 'libs/record/domain',
                files: [
                    {
                        file: 'libs/record/domain/.babelrc',
                        hash: '4496e8f26c84b58235cb0a378da85bdbd7329a26',
                    },
                    {
                        file: 'libs/record/domain/.eslintrc.json',
                        hash: '9761c563892c65a3ab3e8d1d75c0f441fea954ca',
                    },
                    {
                        file: 'libs/record/domain/jest.config.ts',
                        hash: '057e368b724fba52ab461cd4c23d86d88c2a4025',
                    },
                    {
                        file: 'libs/record/domain/README.md',
                        hash: '49e2df4a6bbfefd7a80dd7c09abd8a45f8cbb71e',
                    },
                    {
                        file: 'libs/record/domain/src/index.ts',
                        hash: 'ad8f44e676aa41b899585ae43f450e935ee516a7',
                    },
                    {
                        file: 'libs/record/domain/src/lib/models/flat-record.type.ts',
                        hash: 'a65a64c515adc6f9127612cc510dbf869c5f945a',
                    },
                    {
                        file: 'libs/record/domain/src/lib/models/index.ts',
                        hash: '781e8483b456b38503023092e67a399b783a63f5',
                    },
                    {
                        file: 'libs/record/domain/src/lib/record-domain.spec.ts',
                        hash: '6e499ea6ea30cd16c9f7b53600eb618553b8c531',
                    },
                    {
                        file: 'libs/record/domain/src/lib/record-domain.ts',
                        hash: 'e88148a9817b1a2223096bc579605c52520ca59c',
                    },
                    {
                        file: 'libs/record/domain/tsconfig.json',
                        hash: 'b8b7b3ce4b41fb81e471e825f9c10d9ce8dd0ad0',
                    },
                    {
                        file: 'libs/record/domain/tsconfig.lib.json',
                        hash: 'dddeffa118d77e2311cc0d80a6a3e79f52af307b',
                    },
                    {
                        file: 'libs/record/domain/tsconfig.spec.json',
                        hash: '657db49d82082b68b31659391d4aafb0dada80b2',
                    },
                ],
            },
        },
        {
            name: 'pdf-firebase',
            type: 'lib',
            data: {
                tags: ['scope:pdf', 'type:api'],
                root: 'libs/pdf/firebase',
                files: [
                    {
                        file: 'libs/pdf/firebase/.babelrc',
                        hash: '4496e8f26c84b58235cb0a378da85bdbd7329a26',
                    },
                    {
                        file: 'libs/pdf/firebase/.eslintrc.json',
                        hash: '9761c563892c65a3ab3e8d1d75c0f441fea954ca',
                    },
                    {
                        file: 'libs/pdf/firebase/jest.config.ts',
                        hash: '1661f9ccb8b6766234d2c79c3adc4cd938e751a9',
                    },
                    {
                        file: 'libs/pdf/firebase/README.md',
                        hash: '095c3a23215109a9c32ce5d5f41d19a19f478d90',
                    },
                    {
                        file: 'libs/pdf/firebase/src/index.ts',
                        hash: 'b73386d342e28600e3319b4535c1f57def5123cd',
                    },
                    {
                        file: 'libs/pdf/firebase/src/lib/pdf-firebase.spec.ts',
                        hash: '1f5f911a8df2414801037b28b5bc8145ccb71b3d',
                    },
                    {
                        file: 'libs/pdf/firebase/src/lib/pdf-firebase.ts',
                        hash: '4230a9147926fe8ec9d5c5a27e0ec5f978f39fde',
                    },
                    {
                        file: 'libs/pdf/firebase/src/lib/utilities/firebase-pdf.utility.ts',
                        hash: 'cfde615065c988d4969db94c002d732813b8861d',
                        deps: ['npm:html-pdf', 'npm:firebase-functions'],
                    },
                    {
                        file: 'libs/pdf/firebase/src/lib/utilities/index.ts',
                        hash: 'f4ad2367cf08efb66045e0d06b2f21fbe1f5eb5a',
                    },
                    {
                        file: 'libs/pdf/firebase/tsconfig.json',
                        hash: 'b8b7b3ce4b41fb81e471e825f9c10d9ce8dd0ad0',
                    },
                    {
                        file: 'libs/pdf/firebase/tsconfig.lib.json',
                        hash: 'af086246fd2485ae0585acf1a3a420b6cc356138',
                    },
                    {
                        file: 'libs/pdf/firebase/tsconfig.spec.json',
                        hash: '657db49d82082b68b31659391d4aafb0dada80b2',
                    },
                ],
            },
        },
        {
            name: 'pdf-generate',
            type: 'lib',
            data: {
                tags: ['scope:pdf', 'type:api'],
                root: 'libs/pdf/generate',
                files: [
                    {
                        file: 'libs/pdf/generate/.babelrc',
                        hash: '4496e8f26c84b58235cb0a378da85bdbd7329a26',
                    },
                    {
                        file: 'libs/pdf/generate/.eslintrc.json',
                        hash: '9761c563892c65a3ab3e8d1d75c0f441fea954ca',
                    },
                    {
                        file: 'libs/pdf/generate/jest.config.ts',
                        hash: 'd20348d03940108696078a8f0abbde7a3cb4ba96',
                    },
                    {
                        file: 'libs/pdf/generate/README.md',
                        hash: 'ccb5db6785de33c8e843bdb70e2dc977a7d77b84',
                    },
                    {
                        file: 'libs/pdf/generate/src/index.ts',
                        hash: 'eaffbdaf9c14acb98d6f503ddde014e8a9791cf0',
                    },
                    {
                        file: 'libs/pdf/generate/src/lib/pdf-generate.spec.ts',
                        hash: '148c636f8b1b3d0a14f9a9c2e6a24b69af7e8fe7',
                    },
                    {
                        file: 'libs/pdf/generate/src/lib/pdf-generate.ts',
                        hash: 'dde1ed2a85e926c262869a13b70e2953603d43cf',
                    },
                    {
                        file: 'libs/pdf/generate/tsconfig.json',
                        hash: 'b8b7b3ce4b41fb81e471e825f9c10d9ce8dd0ad0',
                    },
                    {
                        file: 'libs/pdf/generate/tsconfig.lib.json',
                        hash: 'af086246fd2485ae0585acf1a3a420b6cc356138',
                    },
                    {
                        file: 'libs/pdf/generate/tsconfig.spec.json',
                        hash: '657db49d82082b68b31659391d4aafb0dada80b2',
                    },
                ],
            },
        },
        {
            name: 'table-domain',
            type: 'lib',
            data: {
                tags: ['scope:table', 'type:api'],
                root: 'libs/table/domain',
                files: [
                    {
                        file: 'libs/table/domain/.babelrc',
                        hash: '4496e8f26c84b58235cb0a378da85bdbd7329a26',
                    },
                    {
                        file: 'libs/table/domain/.eslintrc.json',
                        hash: '9761c563892c65a3ab3e8d1d75c0f441fea954ca',
                    },
                    {
                        file: 'libs/table/domain/jest.config.ts',
                        hash: 'dc822f8dd56897e327a823c4303c154c3813e576',
                    },
                    {
                        file: 'libs/table/domain/README.md',
                        hash: '01146a5871cac1b11de28149bc4321a38777d09f',
                    },
                    {
                        file: 'libs/table/domain/src/index.ts',
                        hash: '05cb4312daadad2668f131e7d518921855af9467',
                    },
                    {
                        file: 'libs/table/domain/src/lib/models/cell-style-builder.type.ts',
                        hash: 'e442458bdd6c95867b5f966222f0032a9f4ad7d2',
                    },
                    {
                        file: 'libs/table/domain/src/lib/models/cell-style.type.ts',
                        hash: '9f58a8acbb0adb3ccae68083287e4f4f06808011',
                    },
                    {
                        file: 'libs/table/domain/src/lib/models/index.ts',
                        hash: '84fabcc88ce873e065ce80604d1e28d3e0855c4b',
                    },
                    {
                        file: 'libs/table/domain/src/lib/models/table-header.type.ts',
                        hash: '56c149b99ec67a269ea00ab327ea279a4b0b0033',
                    },
                    {
                        file: 'libs/table/domain/src/lib/models/table-row.type.ts',
                        hash: '7cae7c4c7e4abb84fd220dbdc4b075ae62e279d9',
                    },
                    {
                        file: 'libs/table/domain/src/lib/table-domain.spec.ts',
                        hash: '420674c5f3df06259ce3f319b424927c7218a069',
                    },
                    {
                        file: 'libs/table/domain/src/lib/table-domain.ts',
                        hash: '67bd8feead780b59cc3e42497b7017167ce20083',
                    },
                    {
                        file: 'libs/table/domain/tsconfig.json',
                        hash: 'b8b7b3ce4b41fb81e471e825f9c10d9ce8dd0ad0',
                    },
                    {
                        file: 'libs/table/domain/tsconfig.lib.json',
                        hash: 'af086246fd2485ae0585acf1a3a420b6cc356138',
                    },
                    {
                        file: 'libs/table/domain/tsconfig.spec.json',
                        hash: '657db49d82082b68b31659391d4aafb0dada80b2',
                    },
                ],
            },
        },
        {
            name: 'auth-login',
            type: 'lib',
            data: {
                tags: ['scope:auth'],
                root: 'libs/auth/login',
                files: [
                    {
                        file: 'libs/auth/login/.browserslistrc',
                        hash: '4f9ac26980c156a3d525267010d5f78144b43519',
                    },
                    {
                        file: 'libs/auth/login/.eslintrc.json',
                        hash: '1f9eb08cc3bab49fc6e2ae8027abb42a5050ea0f',
                    },
                    {
                        file: 'libs/auth/login/jest.config.ts',
                        hash: '8388652702283089e9f2a9b2fda390cd2364b089',
                    },
                    {
                        file: 'libs/auth/login/README.md',
                        hash: '132a982e4d796a7bdaa3f539d204055951f8727e',
                    },
                    {
                        file: 'libs/auth/login/src/index.ts',
                        hash: 'c6b33cb8c272c0c32aa2eb47cd98497e6be1296d',
                    },
                    {
                        file: 'libs/auth/login/src/lib/auth-login-routing.module.ts',
                        hash: '1260cacc37b7bbc8f7ee2482c634f676735274c0',
                        deps: ['npm:@angular/core', 'npm:@angular/router'],
                    },
                    {
                        file: 'libs/auth/login/src/lib/auth-login.module.ts',
                        hash: '1df11ee4481aaf014d5246b063029a5fd821d049',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/common',
                            'firebase-auth',
                            'npm:@angular/forms',
                            'npm:@ngrx/effects',
                            'npm:primeng',
                        ],
                    },
                    {
                        file: 'libs/auth/login/src/lib/components/create-account.component copy.ts',
                        hash: '5998b8b08d19724d61059092bd3f9d7760d0ac60',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/forms',
                            'npm:@ngrx/store',
                            'npm:rxjs',
                        ],
                    },
                    {
                        file: 'libs/auth/login/src/lib/components/login.component.ts',
                        hash: '8685068264ef320cd33972ae8ed05918c2730145',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/forms',
                            'npm:@ngrx/store',
                            'npm:rxjs',
                        ],
                    },
                    {
                        file: 'libs/auth/login/src/lib/components/user-button.component.ts',
                        hash: 'cf105c654b994e63a7a6cb8e0ce7b1a945496f59',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/fire',
                            'npm:@angular/router',
                            'auth-user',
                            'firebase-auth',
                            'npm:primeng',
                            'npm:rxjs',
                        ],
                    },
                    {
                        file: 'libs/auth/login/src/lib/interceptors/authenticate.interceptor.ts',
                        hash: 'cbf70b4f4d0c4f0bd28ee41d53f3aae48bbd61ef',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/common',
                            'npm:rxjs',
                            'npm:@angular/fire',
                        ],
                    },
                    {
                        file: 'libs/auth/login/src/lib/models/user.ts',
                        hash: '4527a002d14d6f69426fd173ad159b8e7268a252',
                    },
                    {
                        file: 'libs/auth/login/src/lib/store/login.actions.ts',
                        hash: '17aec08fac7a98146b8c360836c5c9053c36bfcf',
                        deps: ['npm:@ngrx/store'],
                    },
                    {
                        file: 'libs/auth/login/src/lib/store/login.effects.ts',
                        hash: 'ce7850f978969172ea437a4cf773f68cfe33083e',
                        deps: [
                            'npm:@angular/core',
                            'npm:@ngrx/effects',
                            'npm:rxjs',
                            'firebase-auth',
                            'npm:@angular/router',
                            'npm:primeng',
                        ],
                    },
                    {
                        file: 'libs/auth/login/src/lib/user-button.module.ts',
                        hash: '76f61c6f89528e3c30b0d2ec6cb2f8d28201ce17',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/common',
                            'npm:@angular/router',
                            'npm:primeng',
                            'firebase-auth',
                            'auth-user',
                        ],
                    },
                    {
                        file: 'libs/auth/login/src/test-setup.ts',
                        hash: '1100b3e8a6ed08f4b5c27a96471846d57023c320',
                        deps: ['npm:jest-preset-angular'],
                    },
                    {
                        file: 'libs/auth/login/tsconfig.json',
                        hash: '115c4df0bcff5ab97e42dc212bd1540038714598',
                    },
                    {
                        file: 'libs/auth/login/tsconfig.lib.json',
                        hash: '298c04e06dbb12f956956f1a8eab1ca9507fbaa5',
                    },
                    {
                        file: 'libs/auth/login/tsconfig.spec.json',
                        hash: '18c71e05e4b65aa817c3aefd69c9da7d27ca5a19',
                    },
                ],
            },
        },
        {
            name: 'portal-e2e',
            type: 'e2e',
            data: {
                tags: [],
                root: 'apps/portal-e2e',
                files: [
                    {
                        file: 'apps/portal-e2e/.eslintrc.json',
                        hash: '84a4be82b5b454c939d2d525f909dc90c100160e',
                    },
                    {
                        file: 'apps/portal-e2e/cypress.json',
                        hash: '8e16868b5ff09df7e163fbd08d07d9cb30cdea14',
                    },
                    {
                        file: 'apps/portal-e2e/src/fixtures/example.json',
                        hash: 'b132a94feafb6161a141f550aed9f64d06d15e81',
                    },
                    {
                        file: 'apps/portal-e2e/src/integration/app.spec.ts',
                        hash: '87fa28c28012756ffc60755c30e8954f0697cb08',
                    },
                    {
                        file: 'apps/portal-e2e/src/plugins/index.js',
                        hash: '9cccb41a9a0f4f14ffdb7f535694634bcd5bd680',
                        deps: ['npm:@nrwl/cypress'],
                    },
                    {
                        file: 'apps/portal-e2e/src/support/app.po.ts',
                        hash: '32934246969c2ecb827ac05677785933a707a54d',
                    },
                    {
                        file: 'apps/portal-e2e/src/support/commands.ts',
                        hash: '4200179bac9ce3763bc5b7241ed364bf9eb2cba3',
                    },
                    {
                        file: 'apps/portal-e2e/src/support/index.ts',
                        hash: '3d469a6b6cf31eb66117d73e278bcf74f398f1db',
                    },
                    {
                        file: 'apps/portal-e2e/tsconfig.e2e.json',
                        hash: '52f7098969f9a29db8df00db3455cfa04c78f4c7',
                    },
                    {
                        file: 'apps/portal-e2e/tsconfig.json',
                        hash: '1b6f20167c495386fa1806ffec1d05185e268be3',
                    },
                ],
            },
        },
        {
            name: 'table-html',
            type: 'lib',
            data: {
                tags: ['scope:table', 'type:api'],
                root: 'libs/table/html',
                files: [
                    {
                        file: 'libs/table/html/.babelrc',
                        hash: '4496e8f26c84b58235cb0a378da85bdbd7329a26',
                    },
                    {
                        file: 'libs/table/html/.eslintrc.json',
                        hash: '9761c563892c65a3ab3e8d1d75c0f441fea954ca',
                    },
                    {
                        file: 'libs/table/html/jest.config.ts',
                        hash: '1ed91576b4172c2e0bbacb9914d84225c1d611e9',
                    },
                    {
                        file: 'libs/table/html/README.md',
                        hash: '8d7bb9d69c59d4338c6f3cacc298ee068ba1e826',
                    },
                    {
                        file: 'libs/table/html/src/index.ts',
                        hash: 'e4400ec1568057c2644c5a8a387c6fb4754690ed',
                    },
                    {
                        file: 'libs/table/html/src/lib/table-html.spec.ts',
                        hash: '727410da0c131880704342a650b0d7c3bee3b8b8',
                    },
                    {
                        file: 'libs/table/html/src/lib/table-html.ts',
                        hash: 'a3cce9f48c88f8ede6dab3be3e477736d5a71a63',
                    },
                    {
                        file: 'libs/table/html/src/lib/utilities/index.ts',
                        hash: '34e661588fbe6db3b449a4e88b6c1bf06453b346',
                    },
                    {
                        file: 'libs/table/html/src/lib/utilities/table-html.utility.ts',
                        hash: 'cd21e7ea3f3d8331d3d4f6ff614a6a402fcdf5c5',
                        deps: ['table-domain', 'record-domain'],
                    },
                    {
                        file: 'libs/table/html/tsconfig.json',
                        hash: 'b8b7b3ce4b41fb81e471e825f9c10d9ce8dd0ad0',
                    },
                    {
                        file: 'libs/table/html/tsconfig.lib.json',
                        hash: 'af086246fd2485ae0585acf1a3a420b6cc356138',
                    },
                    {
                        file: 'libs/table/html/tsconfig.spec.json',
                        hash: '657db49d82082b68b31659391d4aafb0dada80b2',
                    },
                ],
            },
        },
        {
            name: 'auth-user',
            type: 'lib',
            data: {
                tags: ['scope:auth', 'type:api'],
                root: 'libs/auth/user',
                files: [
                    {
                        file: 'libs/auth/user/.eslintrc.json',
                        hash: '1f9eb08cc3bab49fc6e2ae8027abb42a5050ea0f',
                    },
                    {
                        file: 'libs/auth/user/jest.config.ts',
                        hash: 'e9372e50241d344687fce5ee60e4aab2a05a7db7',
                    },
                    {
                        file: 'libs/auth/user/README.md',
                        hash: 'adbffff14df6cc9145f2cc11f7447955aba003da',
                    },
                    {
                        file: 'libs/auth/user/src/index.ts',
                        hash: '076a4a3e3a0da474e86d0abd39b73aa74323744b',
                    },
                    {
                        file: 'libs/auth/user/src/lib/auth-user.module.ts',
                        hash: '7317052adc109a7091813f85bd0c43d1d88040b8',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/common',
                            'npm:@angular/fire',
                        ],
                    },
                    {
                        file: 'libs/auth/user/src/lib/services/user.service.ts',
                        hash: 'ba4403d3c1ac7ddada27ae5016d11a7c6d9bd94c',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/fire',
                            'npm:rxjs',
                        ],
                    },
                    {
                        file: 'libs/auth/user/src/test-setup.ts',
                        hash: '1100b3e8a6ed08f4b5c27a96471846d57023c320',
                        deps: ['npm:jest-preset-angular'],
                    },
                    {
                        file: 'libs/auth/user/tsconfig.json',
                        hash: '115c4df0bcff5ab97e42dc212bd1540038714598',
                    },
                    {
                        file: 'libs/auth/user/tsconfig.lib.json',
                        hash: '298c04e06dbb12f956956f1a8eab1ca9507fbaa5',
                    },
                    {
                        file: 'libs/auth/user/tsconfig.spec.json',
                        hash: '18c71e05e4b65aa817c3aefd69c9da7d27ca5a19',
                    },
                ],
            },
        },
        {
            name: 'functions',
            type: 'app',
            data: {
                tags: [],
                root: 'apps/functions',
                files: [
                    {
                        file: 'apps/functions/.eslintrc.json',
                        hash: '5626944bd17bfaf0c5ec6cf2a07285a3c2e4fbaf',
                    },
                    {
                        file: 'apps/functions/jest.config.ts',
                        hash: '2456bfe6b9ebe74274de43715de44ca0744f1e5d',
                    },
                    {
                        file: 'apps/functions/src/app/.gitkeep',
                        hash: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
                    },
                    {
                        file: 'apps/functions/src/assets/.gitkeep',
                        hash: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
                    },
                    {
                        file: 'apps/functions/src/environments/environment.prod.ts',
                        hash: 'da7c84f6380a8d6cc95cabbed8751a6853f4f08d',
                    },
                    {
                        file: 'apps/functions/src/environments/environment.ts',
                        hash: '39644a62e3fbe94a4c05f988fb1940c80a6008a8',
                    },
                    {
                        file: 'apps/functions/src/main.ts',
                        hash: '89f74543d6de153fff9e1640da899ef2577a5c6b',
                        deps: [
                            'firebase-functions',
                            'pdf-firebase',
                            'firebase-database',
                            'student-reports',
                            'student-import',
                            'student-persistence',
                            'student-domain',
                            'table-html',
                        ],
                    },
                    {
                        file: 'apps/functions/tsconfig.app.json',
                        hash: '8880f079c82cc3536dd3c2c0c72c5c2f2f909c07',
                    },
                    {
                        file: 'apps/functions/tsconfig.json',
                        hash: 'e23d75a22e304fbc5990b934b20c1d4b05518294',
                    },
                    {
                        file: 'apps/functions/tsconfig.spec.json',
                        hash: '9c444b3c0177712bf0dc495212636071342e13c4',
                    },
                ],
            },
        },
        {
            name: 'table-pdf',
            type: 'lib',
            data: {
                tags: ['scope:table', 'type:api'],
                root: 'libs/table/pdf',
                files: [
                    {
                        file: 'libs/table/pdf/.babelrc',
                        hash: '4496e8f26c84b58235cb0a378da85bdbd7329a26',
                    },
                    {
                        file: 'libs/table/pdf/.eslintrc.json',
                        hash: '9761c563892c65a3ab3e8d1d75c0f441fea954ca',
                    },
                    {
                        file: 'libs/table/pdf/jest.config.ts',
                        hash: 'afd46557df36fb5328816c1e9ef80ae8f45315b1',
                    },
                    {
                        file: 'libs/table/pdf/README.md',
                        hash: 'ac1893f00a59419c7183b507f58c1b35297e51b9',
                    },
                    {
                        file: 'libs/table/pdf/src/index.ts',
                        hash: '078491c8fde311d9fad9f7cbd9a5cf3b374b6fc6',
                    },
                    {
                        file: 'libs/table/pdf/src/lib/table-pdf.spec.ts',
                        hash: '6be45e3685a8d0470b8bbd7fe5a9d6fd4df75066',
                    },
                    {
                        file: 'libs/table/pdf/src/lib/table-pdf.ts',
                        hash: 'f7a46560cfb2cce9efd9b23826450cedbfd69ed9',
                    },
                    {
                        file: 'libs/table/pdf/src/lib/utilities/index.ts',
                        hash: '13fdffb187ebb37aab483e2005d4791dfccb0589',
                    },
                    {
                        file: 'libs/table/pdf/src/lib/utilities/table-pdf.utility.ts',
                        hash: 'd17446a6dd02a2c290a83b97f98ff54b758e8920',
                        deps: [
                            'record-domain',
                            'table-domain',
                            'table-html',
                            'npm:html-pdf',
                        ],
                    },
                    {
                        file: 'libs/table/pdf/tsconfig.json',
                        hash: 'b8b7b3ce4b41fb81e471e825f9c10d9ce8dd0ad0',
                    },
                    {
                        file: 'libs/table/pdf/tsconfig.lib.json',
                        hash: 'af086246fd2485ae0585acf1a3a420b6cc356138',
                    },
                    {
                        file: 'libs/table/pdf/tsconfig.spec.json',
                        hash: '657db49d82082b68b31659391d4aafb0dada80b2',
                    },
                ],
            },
        },
        {
            name: 'header',
            type: 'lib',
            data: {
                tags: ['scope:header'],
                root: 'libs/header',
                files: [
                    {
                        file: 'libs/header/.browserslistrc',
                        hash: '4f9ac26980c156a3d525267010d5f78144b43519',
                    },
                    {
                        file: 'libs/header/.eslintrc.json',
                        hash: '80a133ba8bc8396d9f008f7a29771fb7ea956d2a',
                    },
                    {
                        file: 'libs/header/jest.config.ts',
                        hash: '6f9658c1ea6706300a5f349a41b1e712ad69e7f2',
                    },
                    {
                        file: 'libs/header/README.md',
                        hash: 'f2f9473c42343f7385fa21efec59b44e78d10a03',
                    },
                    {
                        file: 'libs/header/src/index.ts',
                        hash: 'b8b264c108adfc2392dfa47e5f9d20ad44b67988',
                    },
                    {
                        file: 'libs/header/src/lib/assets/sol-logo.png',
                        hash: 'd2802ec75d58e331eb47854b67f8a0eb10aa9135',
                    },
                    {
                        file: 'libs/header/src/lib/components/header.component.ts',
                        hash: 'e334a652a01df404a47925b23d49b102c71b7956',
                        deps: ['npm:@angular/core', 'auth-user'],
                    },
                    {
                        file: 'libs/header/src/lib/header.module.ts',
                        hash: '7bb5167367aa3e662ef9108c3e89c578f9aa83b2',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/common',
                            'auth-login',
                            'npm:@angular/router',
                            'npm:primeng',
                            'auth-user',
                        ],
                    },
                    {
                        file: 'libs/header/src/test-setup.ts',
                        hash: '1100b3e8a6ed08f4b5c27a96471846d57023c320',
                        deps: ['npm:jest-preset-angular'],
                    },
                    {
                        file: 'libs/header/tsconfig.json',
                        hash: 'bfd93598c2a6cca1f7e9fc0ec9c2276e2c89873c',
                    },
                    {
                        file: 'libs/header/tsconfig.lib.json',
                        hash: '27eea629178430a4e7727a1801f3d0c36e934a6f',
                    },
                    {
                        file: 'libs/header/tsconfig.spec.json',
                        hash: '0f8f44147f447f618311e30c3cb0bbe99f122d4e',
                    },
                ],
            },
        },
        {
            name: 'portal',
            type: 'app',
            data: {
                tags: [],
                root: 'apps/portal',
                files: [
                    {
                        file: 'apps/portal/.browserslistrc',
                        hash: '427441dc9308514d0e294ed878a168972f3a4c46',
                    },
                    {
                        file: 'apps/portal/.eslintrc.json',
                        hash: '80a133ba8bc8396d9f008f7a29771fb7ea956d2a',
                    },
                    {
                        file: 'apps/portal/jest.config.ts',
                        hash: '4f2b45789d80022c0dfb3699a61bac1c11cdd127',
                    },
                    {
                        file: 'apps/portal/src/app/app-routing.module.ts',
                        hash: 'b6cb3f744a46a66f03b8727ccc00e7d5365b13ac',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/router',
                            'header',
                            'auth-login',
                            'classes-calendar',
                            'classes-class-management',
                        ],
                    },
                    {
                        file: 'apps/portal/src/app/app.component.spec.ts',
                        hash: 'd2d4db2d3a7d28b4abfc1743cda4163fbb9d47e4',
                        deps: ['npm:@angular/core', 'npm:@angular/router'],
                    },
                    {
                        file: 'apps/portal/src/app/app.component.ts',
                        hash: '21e988bd2dfa7189d2eda3151b78565effd66e5d',
                        deps: ['npm:@angular/core'],
                    },
                    {
                        file: 'apps/portal/src/app/app.module.ts',
                        hash: '829b3bf4c376e0886fd4195900c41aa3bd7ecaf0',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/platform-browser',
                            'npm:@ngrx/store',
                            'npm:@ngrx/effects',
                            'npm:@angular/fire',
                            'header',
                            'npm:@ngrx/store-devtools',
                            'npm:@angular/common',
                            'auth-login',
                            'npm:primeng',
                            'npm:@angular/cdk',
                        ],
                    },
                    {
                        file: 'apps/portal/src/app/dashboard-component/dashboard-routing.module.ts',
                        hash: 'aef414ea64fd41803183ca41006893af7e092bd8',
                        deps: ['npm:@angular/core', 'npm:@angular/router'],
                    },
                    {
                        file: 'apps/portal/src/app/dashboard-component/dashboard.component.html',
                        hash: 'f64346ca55746bbf6cc278d5ecf5bfe4d27fab66',
                    },
                    {
                        file: 'apps/portal/src/app/dashboard-component/dashboard.component.module.ts',
                        hash: '60e72a651c3fda53f59c7033191975a4726fa95b',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/common',
                            'npm:primeng',
                            'firebase-functions-api',
                        ],
                    },
                    {
                        file: 'apps/portal/src/app/dashboard-component/dashboard.component.ts',
                        hash: '748d23c49c2f745274682105ae7e04c43d807df0',
                        deps: [
                            'npm:@angular/core',
                            'firebase-functions-api',
                            'npm:chart.js',
                            'npm:rxjs',
                        ],
                    },
                    {
                        file: 'apps/portal/src/app/import-component/import-routing.module.ts',
                        hash: 'b61eb7d805d4dd887b1f39a8a0cd0978787d1de3',
                        deps: ['npm:@angular/core', 'npm:@angular/router'],
                    },
                    {
                        file: 'apps/portal/src/app/import-component/import.component.html',
                        hash: 'e0b39d70a06faeee36547c63e6216cf11814a6b1',
                    },
                    {
                        file: 'apps/portal/src/app/import-component/import.component.module.ts',
                        hash: '8f8d11f60d135fa042eb2360f238c710739b009b',
                        deps: [
                            'npm:@angular/core',
                            'firebase-functions-api',
                            'npm:@angular/common',
                            'npm:primeng',
                        ],
                    },
                    {
                        file: 'apps/portal/src/app/import-component/import.component.ts',
                        hash: '3e08864ca1181423f2d04b0da18ff3effd02c00b',
                        deps: [
                            'npm:@angular/core',
                            'firebase-functions-api',
                            'npm:rxjs',
                            'npm:papaparse',
                            'student-import',
                            'npm:primeng',
                        ],
                    },
                    {
                        file: 'apps/portal/src/app/report-component/report-routing.module.ts',
                        hash: '3743311925fb9b460b6bf13b2dd8f0695b591ac0',
                        deps: ['npm:@angular/core', 'npm:@angular/router'],
                    },
                    {
                        file: 'apps/portal/src/app/report-component/report.component.html',
                        hash: '128594fd60db3f76fca3af78a622f3ca82a5369e',
                    },
                    {
                        file: 'apps/portal/src/app/report-component/report.component.module.ts',
                        hash: '6bcc53afa4744a02530c88fb1fb1ca6d73492321',
                        deps: [
                            'npm:@angular/core',
                            'firebase-functions-api',
                            'npm:@angular/common',
                            'npm:primeng',
                            'npm:@ngrx/store',
                            'npm:@ngrx/effects',
                        ],
                    },
                    {
                        file: 'apps/portal/src/app/report-component/report.component.ts',
                        hash: '0c171433ce01070dcbe00d9d2fd93412c28bbdd9',
                        deps: [
                            'npm:@angular/core',
                            'firebase-functions-api',
                            'npm:rxjs',
                            'npm:@angular/cdk',
                            'npm:papaparse',
                            'student-import',
                            'npm:@ngrx/store',
                        ],
                    },
                    {
                        file: 'apps/portal/src/app/report-component/store/report.actions.ts',
                        hash: '57b9d11349524e11d101c42f7f04514a6b0757ec',
                        deps: ['npm:@ngrx/store'],
                    },
                    {
                        file: 'apps/portal/src/app/report-component/store/report.effects.ts',
                        hash: '54b99801595d1e580b948cee2ddcb982806dc5c1',
                        deps: [
                            'npm:@angular/cdk',
                            'npm:@angular/core',
                            'npm:@ngrx/effects',
                            'npm:@ngrx/store',
                            'firebase-functions-api',
                            'npm:primeng',
                            'npm:rxjs',
                        ],
                    },
                    {
                        file: 'apps/portal/src/app/report-component/store/report.feature.ts',
                        hash: '778047e41ab46fe762e40d2787b951bd6db9000f',
                        deps: ['npm:@ngrx/store'],
                    },
                    {
                        file: 'apps/portal/src/assets/.gitkeep',
                        hash: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
                    },
                    {
                        file: 'apps/portal/src/birchleaves.jpg',
                        hash: 'bfe39b12e2fba096d7d209d3147b0895f5bcf13c',
                    },
                    {
                        file: 'apps/portal/src/environments/environment.default.ts',
                        hash: 'dbfa8f38445ec9ba9579323e9e837431f7b95eab',
                    },
                    {
                        file: 'apps/portal/src/environments/environment.prod.ts',
                        hash: '6241ea45e0643f5d7e5b791c1475e823b0ae7a71',
                    },
                    {
                        file: 'apps/portal/src/environments/environment.ts',
                        hash: 'dba3487b9b441884c093cdfc2204d413c4a07206',
                    },
                    {
                        file: 'apps/portal/src/favicon.ico',
                        hash: '7520b4729045c25fa9f98974b6992111190c0de7',
                    },
                    {
                        file: 'apps/portal/src/index.html',
                        hash: '4dcecf672ae5c37158eab85660f1314993038da2',
                    },
                    {
                        file: 'apps/portal/src/main.ts',
                        hash: 'c82b2d9b99ff93b1ee38134d159ec95f46a691f0',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/platform-browser-dynamic',
                        ],
                    },
                    {
                        file: 'apps/portal/src/polyfills.ts',
                        hash: '4efb94c71be67507240c25cf535ade79b0d872c7',
                        deps: ['npm:zone.js'],
                    },
                    {
                        file: 'apps/portal/src/styles.css',
                        hash: '75485fbc8630a5139d9e27d8e9d9e589de78759a',
                    },
                    {
                        file: 'apps/portal/src/test-setup.ts',
                        hash: '2b58abbc6c3e91d6a096fbd165a46a3e0a14f76f',
                        deps: [
                            'npm:jest-preset-angular',
                            'npm:@angular/core',
                            'npm:@angular/platform-browser-dynamic',
                        ],
                    },
                    {
                        file: 'apps/portal/tsconfig.app.json',
                        hash: 'd5618b7d055878722ac2bf8a00fb815396610b7a',
                    },
                    {
                        file: 'apps/portal/tsconfig.editor.json',
                        hash: '27fdab61c49234e31b3ab9ab16505bd5f357ebc4',
                    },
                    {
                        file: 'apps/portal/tsconfig.json',
                        hash: 'd9a2020c07e80b9be80dfb040a6b3c6af1485243',
                    },
                    {
                        file: 'apps/portal/tsconfig.spec.json',
                        hash: 'b1cdf859c8d4b7a43a5c7ff905462b98c8dca9ad',
                    },
                ],
            },
        },
        {
            name: 'paths',
            type: 'lib',
            data: {
                tags: ['scope:libs/paths'],
                root: 'libs/paths',
                files: [
                    {
                        file: 'libs/paths/.eslintrc.json',
                        hash: '80a133ba8bc8396d9f008f7a29771fb7ea956d2a',
                    },
                    {
                        file: 'libs/paths/jest.config.ts',
                        hash: 'a250476d7097213b03cfe951cb7b8d5f00250012',
                    },
                    {
                        file: 'libs/paths/README.md',
                        hash: 'b4c47975bc3f48f106c850a9b604b931fe5d4752',
                    },
                    {
                        file: 'libs/paths/src/index.ts',
                        hash: '946f4e4558d38f65eb89c9e2cdbdc05517105b66',
                    },
                    {
                        file: 'libs/paths/src/lib/components/paths-page/paths-page.component.spec.ts',
                        hash: '3741bd994d8acdee2123c1ef9f6943fb575b8134',
                        deps: ['npm:@angular/core', 'npm:@ngrx/store'],
                    },
                    {
                        file: 'libs/paths/src/lib/components/paths-page/paths-page.component.ts',
                        hash: 'edb88ba0911d176d9986607c413329e3a5c1d4b3',
                        deps: [
                            'npm:@angular/core',
                            'npm:@ngrx/store',
                            'npm:rxjs',
                        ],
                    },
                    {
                        file: 'libs/paths/src/lib/models/path.ts',
                        hash: 'be1081407dd4d81b4f26bca31d07be560c9032c0',
                    },
                    {
                        file: 'libs/paths/src/lib/paths.module.ts',
                        hash: '1e32666c55977511b1acf8174412fa1408150f36',
                        deps: [
                            'npm:@angular/core',
                            'npm:@angular/common',
                            'npm:@ngrx/store',
                        ],
                    },
                    {
                        file: 'libs/paths/src/lib/store/paths.reducer.ts',
                        hash: '22f3190c59bccf81d1ec60061baf31e414a209f4',
                        deps: ['npm:@ngrx/store'],
                    },
                    {
                        file: 'libs/paths/src/test-setup.ts',
                        hash: '2b58abbc6c3e91d6a096fbd165a46a3e0a14f76f',
                        deps: [
                            'npm:jest-preset-angular',
                            'npm:@angular/core',
                            'npm:@angular/platform-browser-dynamic',
                        ],
                    },
                    {
                        file: 'libs/paths/tsconfig.json',
                        hash: '4ab14a26e0b09677a85329abdcfce95c83947117',
                    },
                    {
                        file: 'libs/paths/tsconfig.lib.json',
                        hash: '9e87ae26d9f69f7974077cf282b4901b22ca13b9',
                    },
                    {
                        file: 'libs/paths/tsconfig.spec.json',
                        hash: 'b1cdf859c8d4b7a43a5c7ff905462b98c8dca9ad',
                    },
                ],
            },
        },
    ],
    dependencies: {
        'classes-class-enrollment': [],
        'classes-class-management': [],
        'classes-calendar': [
            { source: 'classes-calendar', target: 'calendar', type: 'static' },
            {
                source: 'classes-calendar',
                target: 'firebase-functions-api',
                type: 'static',
            },
            {
                source: 'classes-calendar',
                target: 'classeses-domain',
                type: 'static',
            },
        ],
        'classeses-domain': [],
        'firebase-functions-api': [],
        'student-persistence': [
            {
                source: 'student-persistence',
                target: 'firebase-database',
                type: 'static',
            },
            {
                source: 'student-persistence',
                target: 'student-domain',
                type: 'static',
            },
        ],
        'firebase-functions': [
            {
                source: 'firebase-functions',
                target: 'firebase-database',
                type: 'static',
            },
        ],
        calendar: [
            {
                source: 'calendar',
                target: 'firebase-functions-api',
                type: 'static',
            },
        ],
        'firebase-database': [],
        'student-reports': [
            {
                source: 'student-reports',
                target: 'student-persistence',
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
            {
                source: 'student-reports',
                target: 'record-domain',
                type: 'static',
            },
        ],
        'student-domain': [
            {
                source: 'student-domain',
                target: 'record-domain',
                type: 'static',
            },
        ],
        'student-import': [],
        'firebase-auth': [],
        'record-domain': [],
        'pdf-firebase': [],
        'pdf-generate': [],
        'table-domain': [],
        'auth-login': [
            { source: 'auth-login', target: 'firebase-auth', type: 'static' },
            { source: 'auth-login', target: 'auth-user', type: 'static' },
        ],
        'portal-e2e': [
            { source: 'portal-e2e', target: 'portal', type: 'implicit' },
        ],
        'table-html': [
            { source: 'table-html', target: 'table-domain', type: 'static' },
            { source: 'table-html', target: 'record-domain', type: 'static' },
        ],
        'auth-user': [],
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
            { source: 'functions', target: 'student-import', type: 'static' },
            {
                source: 'functions',
                target: 'student-persistence',
                type: 'static',
            },
            { source: 'functions', target: 'student-domain', type: 'static' },
            { source: 'functions', target: 'table-html', type: 'static' },
        ],
        'table-pdf': [
            { source: 'table-pdf', target: 'record-domain', type: 'static' },
            { source: 'table-pdf', target: 'table-domain', type: 'static' },
            { source: 'table-pdf', target: 'table-html', type: 'static' },
        ],
        header: [
            { source: 'header', target: 'auth-user', type: 'static' },
            { source: 'header', target: 'auth-login', type: 'static' },
        ],
        portal: [
            { source: 'portal', target: 'header', type: 'static' },
            { source: 'portal', target: 'auth-login', type: 'static' },
            { source: 'portal', target: 'classes-calendar', type: 'static' },
            {
                source: 'portal',
                target: 'classes-class-management',
                type: 'static',
            },
            {
                source: 'portal',
                target: 'firebase-functions-api',
                type: 'static',
            },
            { source: 'portal', target: 'student-import', type: 'static' },
        ],
        paths: [],
    },
    layout: { appsDir: 'apps', libsDir: 'libs' },
    affected: [],
    focus: null,
    groupByFolder: false,
    exclude: [],
};
