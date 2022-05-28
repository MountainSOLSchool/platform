'use strict';
(self.webpackChunkportal = self.webpackChunkportal || []).push([
    [904],
    {
        904: (u, s, t) => {
            t.r(s), t.d(s, { ClassManagementModule: () => r });
            var l = t(9808),
                m = t(6115),
                e = t(5e3);
            let c = (() => {
                    class n {}
                    return (
                        (n.ɵfac = function (o) {
                            return new (o || n)();
                        }),
                        (n.ɵcmp = e.Xpm({
                            type: n,
                            selectors: [['ng-component']],
                            decls: 1,
                            vars: 0,
                            template: function (o, p) {
                                1 & o && e._uU(0, 'Class form');
                            },
                            encapsulation: 2,
                            changeDetection: 0,
                        })),
                        n
                    );
                })(),
                r = (() => {
                    class n {}
                    return (
                        (n.ɵfac = function (o) {
                            return new (o || n)();
                        }),
                        (n.ɵmod = e.oAB({ type: n })),
                        (n.ɵinj = e.cJS({
                            imports: [
                                [
                                    l.ez,
                                    m.Bz.forChild([
                                        {
                                            path: 'edit/:id',
                                            pathMatch: 'full',
                                            component: c,
                                        },
                                    ]),
                                ],
                            ],
                        })),
                        n
                    );
                })();
        },
    },
]);
