'use strict';
(self.webpackChunkportal = self.webpackChunkportal || []).push([
    [26],
    {
        8026: (Q, u, o) => {
            o.r(u), o.d(u, { ImportComponentModule: () => E });
            var y = o(6666),
                d = o(9808),
                v = o(6115),
                B = o(7579),
                f = o(3900),
                M = o(4128),
                A = o(8996),
                g = o(4004),
                S = o(8505),
                J = o(9718),
                Z = o(8675),
                x = o(3028),
                T = o(5665),
                t = o(5e3),
                $ = o(1485),
                O = o(9783),
                h = o(8205),
                C = o(8185);
            const H = function () {
                return { height: '6px' };
            };
            function R(n, s) {
                1 & n && t._UZ(0, 'p-progressBar', 3),
                    2 & n && t.Akn(t.DdM(2, H));
            }
            const j = [
                {
                    path: '',
                    component: (() => {
                        class n {
                            constructor(e, i) {
                                (this.functionsApi = e),
                                    (this.messageService = i),
                                    (this.uploadClick$ = new B.x()),
                                    (this.isUploading$ = this.uploadClick$.pipe(
                                        (0, f.w)(({ files: I }) =>
                                            (0, M.D)(
                                                I.map((r) =>
                                                    (0, A.D)(r.text()).pipe(
                                                        (0, g.U)((p) => {
                                                            const l = new Map();
                                                            return x.parse(p, {
                                                                header: !0,
                                                                transform: (
                                                                    a
                                                                ) => {
                                                                    var m;
                                                                    return null !==
                                                                        (m =
                                                                            null ==
                                                                            a
                                                                                ? void 0
                                                                                : a.trim()) &&
                                                                        void 0 !==
                                                                            m
                                                                        ? m
                                                                        : '';
                                                                },
                                                                transformHeader:
                                                                    (a) => {
                                                                        var m;
                                                                        const c =
                                                                                T
                                                                                    .N[
                                                                                    a
                                                                                ],
                                                                            U =
                                                                                null !==
                                                                                    (m =
                                                                                        l.get(
                                                                                            a
                                                                                        )) &&
                                                                                void 0 !==
                                                                                    m
                                                                                    ? m
                                                                                    : 0,
                                                                            L =
                                                                                'string' ==
                                                                                typeof c
                                                                                    ? c
                                                                                    : c[
                                                                                          U
                                                                                      ];
                                                                        return (
                                                                            l.set(
                                                                                a,
                                                                                U +
                                                                                    1
                                                                            ),
                                                                            L
                                                                        );
                                                                    },
                                                            }).data;
                                                        })
                                                    )
                                                )
                                            ).pipe(
                                                (0, g.U)((r) =>
                                                    r.reduce(
                                                        (p, l) => [...p, ...l],
                                                        []
                                                    )
                                                ),
                                                (0, f.w)((r) =>
                                                    this.functionsApi.call(
                                                        'importEnrollment',
                                                        r
                                                    )
                                                ),
                                                (0, S.b)((r) => {
                                                    var p, l;
                                                    return this.messageService.add(
                                                        {
                                                            detail: `Successfully imported ${
                                                                null !==
                                                                    (l =
                                                                        null ===
                                                                            (p =
                                                                                r
                                                                                    .result
                                                                                    .enrolled) ||
                                                                        void 0 ===
                                                                            p
                                                                            ? void 0
                                                                            : p.length) &&
                                                                void 0 !== l
                                                                    ? l
                                                                    : 0
                                                            } enrollments!`,
                                                            severity: 'success',
                                                        }
                                                    );
                                                }),
                                                (0, J.h)(!1),
                                                (0, Z.O)(!0)
                                            )
                                        )
                                    ));
                            }
                            ngOnInit() {
                                console.log('opened');
                            }
                        }
                        return (
                            (n.ɵfac = function (e) {
                                return new (e || n)(t.Y36($.O), t.Y36(O.ez));
                            }),
                            (n.ɵcmp = t.Xpm({
                                type: n,
                                selectors: [['ng-component']],
                                decls: 9,
                                vars: 6,
                                consts: [
                                    [2, 'margin-top', '30px'],
                                    [
                                        'chooseLabel',
                                        'Select file',
                                        'accept',
                                        '.csv',
                                        3,
                                        'showCancelButton',
                                        'multiple',
                                        'customUpload',
                                        'uploadHandler',
                                    ],
                                    [
                                        'mode',
                                        'indeterminate',
                                        3,
                                        'style',
                                        4,
                                        'ngIf',
                                    ],
                                    ['mode', 'indeterminate'],
                                ],
                                template: function (e, i) {
                                    1 & e &&
                                        (t.TgZ(0, 'h1'),
                                        t._uU(
                                            1,
                                            'Import Summer 2022 Enrollment'
                                        ),
                                        t.qZA(),
                                        t.TgZ(2, 'div', 0)(3, 'h2'),
                                        t._uU(4, 'Upload Jot Forms CSV file:'),
                                        t.qZA()(),
                                        t.TgZ(5, 'div')(6, 'p-fileUpload', 1),
                                        t.NdJ('uploadHandler', function (r) {
                                            return i.uploadClick$.next(r);
                                        }),
                                        t.qZA()(),
                                        t.YNc(7, R, 1, 3, 'p-progressBar', 2),
                                        t.ALo(8, 'async')),
                                        2 & e &&
                                            (t.xp6(6),
                                            t.Q6J('showCancelButton', !1)(
                                                'multiple',
                                                !1
                                            )('customUpload', !0),
                                            t.xp6(1),
                                            t.Q6J(
                                                'ngIf',
                                                t.lcZ(8, 4, i.isUploading$)
                                            ));
                                },
                                directives: [h.p, d.O5, C.k],
                                pipes: [d.Ov],
                                encapsulation: 2,
                                changeDetection: 0,
                            })),
                            n
                        );
                    })(),
                    children: [],
                },
            ];
            let z = (() => {
                class n {}
                return (
                    (n.ɵfac = function (e) {
                        return new (e || n)();
                    }),
                    (n.ɵmod = t.oAB({ type: n })),
                    (n.ɵinj = t.cJS({ imports: [[v.Bz.forChild(j)], v.Bz] })),
                    n
                );
            })();
            var D = o(845),
                F = o(1424),
                N = o(2145),
                Y = o(9962);
            let E = (() => {
                class n {}
                return (
                    (n.ɵfac = function (e) {
                        return new (e || n)();
                    }),
                    (n.ɵmod = t.oAB({ type: n })),
                    (n.ɵinj = t.cJS({
                        imports: [
                            [d.ez, y.B, z, D.hJ, F.j, N.WN, h.O, C.q, Y.U$],
                        ],
                    })),
                    n
                );
            })();
        },
    },
]);
