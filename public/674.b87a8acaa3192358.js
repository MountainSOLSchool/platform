'use strict';
(self.webpackChunkportal = self.webpackChunkportal || []).push([
    [674],
    {
        8674: (oo, U, t) => {
            t.r(U), t.d(U, { ImportComponentModule: () => q });
            var x = t(6666),
                F = t(9808),
                D = t(6115),
                P = t(7579),
                C = t(3900),
                A = t(4128),
                T = t(8996),
                w = t(4004),
                h = t(8505),
                O = t(9718),
                j = t(8675),
                J = t(3028),
                K = t(5665),
                n = t(5e3),
                R = t(1485),
                e = t(5620),
                $ = t(9783),
                b = t(8205),
                S = t(8185);
            const Z = function () {
                return { height: '6px' };
            };
            function z(o, s) {
                1 & o && n._UZ(0, 'p-progressBar', 3),
                    2 & o && n.Akn(n.DdM(2, Z));
            }
            const G = [
                {
                    path: '',
                    component: (() => {
                        class o {
                            constructor(a, p, d) {
                                (this.functionsApi = a),
                                    (this.store = p),
                                    (this.messageService = d),
                                    (this.uploadClick$ = new P.x()),
                                    (this.isUploading$ = this.uploadClick$.pipe(
                                        (0, C.w)(({ files: v }) =>
                                            (0, A.D)(
                                                v.map((r) =>
                                                    (0, T.D)(r.text()).pipe(
                                                        (0, w.U)((i) => {
                                                            const l = new Map();
                                                            return J.parse(i, {
                                                                header: !0,
                                                                transform: (
                                                                    m
                                                                ) => {
                                                                    var u;
                                                                    return null !==
                                                                        (u =
                                                                            null ==
                                                                            m
                                                                                ? void 0
                                                                                : m.trim()) &&
                                                                        void 0 !==
                                                                            u
                                                                        ? u
                                                                        : '';
                                                                },
                                                                transformHeader:
                                                                    (m) => {
                                                                        var u;
                                                                        const I =
                                                                                K
                                                                                    .N[
                                                                                    m
                                                                                ],
                                                                            M =
                                                                                null !==
                                                                                    (u =
                                                                                        l.get(
                                                                                            m
                                                                                        )) &&
                                                                                void 0 !==
                                                                                    u
                                                                                    ? u
                                                                                    : 0,
                                                                            _ =
                                                                                'string' ==
                                                                                typeof I
                                                                                    ? I
                                                                                    : I[
                                                                                          M
                                                                                      ];
                                                                        return (
                                                                            l.set(
                                                                                m,
                                                                                M +
                                                                                    1
                                                                            ),
                                                                            _
                                                                        );
                                                                    },
                                                            }).data;
                                                        })
                                                    )
                                                )
                                            ).pipe(
                                                (0, w.U)((r) =>
                                                    r.reduce(
                                                        (i, l) => [...i, ...l],
                                                        []
                                                    )
                                                ),
                                                (0, C.w)((r) =>
                                                    this.functionsApi.call(
                                                        'importEnrollment',
                                                        r
                                                    )
                                                ),
                                                (0, h.b)((r) => {
                                                    var i, l;
                                                    return this.messageService.add(
                                                        {
                                                            detail: `Successfully imported ${
                                                                null !==
                                                                    (l =
                                                                        null ===
                                                                            (i =
                                                                                r
                                                                                    .result
                                                                                    .enrolled) ||
                                                                        void 0 ===
                                                                            i
                                                                            ? void 0
                                                                            : i.length) &&
                                                                void 0 !== l
                                                                    ? l
                                                                    : 0
                                                            } enrollments!`,
                                                            severity: 'success',
                                                        }
                                                    );
                                                }),
                                                (0, O.h)(!1),
                                                (0, j.O)(!0)
                                            )
                                        )
                                    ));
                            }
                            ngOnInit() {
                                console.log('opened');
                            }
                        }
                        return (
                            (o.ɵfac = function (a) {
                                return new (a || o)(
                                    n.Y36(R.O),
                                    n.Y36(e.yh),
                                    n.Y36($.ez)
                                );
                            }),
                            (o.ɵcmp = n.Xpm({
                                type: o,
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
                                template: function (a, p) {
                                    1 & a &&
                                        (n.TgZ(0, 'h1'),
                                        n._uU(
                                            1,
                                            'Import Summer 2022 Enrollment'
                                        ),
                                        n.qZA(),
                                        n.TgZ(2, 'div', 0)(3, 'h2'),
                                        n._uU(4, 'Upload Jot Forms CSV file:'),
                                        n.qZA()(),
                                        n.TgZ(5, 'div')(6, 'p-fileUpload', 1),
                                        n.NdJ('uploadHandler', function (v) {
                                            return p.uploadClick$.next(v);
                                        }),
                                        n.qZA()(),
                                        n.YNc(7, z, 1, 3, 'p-progressBar', 2),
                                        n.ALo(8, 'async')),
                                        2 & a &&
                                            (n.xp6(6),
                                            n.Q6J('showCancelButton', !1)(
                                                'multiple',
                                                !1
                                            )('customUpload', !0),
                                            n.xp6(1),
                                            n.Q6J(
                                                'ngIf',
                                                n.lcZ(8, 4, p.isUploading$)
                                            ));
                                },
                                directives: [b.p, F.O5, S.k],
                                pipes: [F.Ov],
                                encapsulation: 2,
                                changeDetection: 0,
                            })),
                            o
                        );
                    })(),
                    children: [],
                },
            ];
            let H = (() => {
                class o {}
                return (
                    (o.ɵfac = function (a) {
                        return new (a || o)();
                    }),
                    (o.ɵmod = n.oAB({ type: o })),
                    (o.ɵinj = n.cJS({ imports: [[D.Bz.forChild(G)], D.Bz] })),
                    o
                );
            })();
            var Q = t(845),
                W = t(1424),
                Y = t(2145),
                X = t(9962);
            const B = (0, e.R7)({
                    source: 'Report component',
                    events: {
                        'Download forms intent': (0, e.Ky)(),
                        'Copy emails intent': (0, e.Ky)(),
                    },
                }),
                c = (0, e.R7)({
                    source: 'Report effects',
                    events: {
                        'Started downloading forms': (0, e.Ky)(),
                        'Finished downloading forms': (0, e.Ky)(),
                        'Failed downloading forms': (0, e.Ky)(),
                        'Started downloading class emails': (0, e.Ky)(),
                        'Finished downloading class emails': (0, e.Ky)(),
                        'Failed downloading class emails': (0, e.Ky)(),
                    },
                }),
                N = (0, e.Tz)({
                    name: 'reportComponentFeature',
                    reducer: (0, e.Lq)(
                        {
                            inProgressClassFormDownloads: {},
                            inProgressCopyClassEmails: {},
                        },
                        (0, e.on)(
                            c.startedDownloadingForms,
                            (o, { className: s }) =>
                                Object.assign(Object.assign({}, o), {
                                    inProgressClassFormDownloads: Object.assign(
                                        Object.assign(
                                            {},
                                            o.inProgressClassFormDownloads
                                        ),
                                        { [s]: !0 }
                                    ),
                                })
                        ),
                        (0, e.on)(
                            c.finishedDownloadingForms,
                            (o, { className: s }) =>
                                Object.assign(Object.assign({}, o), {
                                    inProgressClassFormDownloads: Object.assign(
                                        Object.assign(
                                            {},
                                            o.inProgressClassFormDownloads
                                        ),
                                        { [s]: !1 }
                                    ),
                                })
                        ),
                        (0, e.on)(
                            c.startedDownloadingClassEmails,
                            (o, { className: s }) =>
                                Object.assign(Object.assign({}, o), {
                                    inProgressCopyClassEmails: Object.assign(
                                        Object.assign(
                                            {},
                                            o.inProgressCopyClassEmails
                                        ),
                                        { [s]: !0 }
                                    ),
                                })
                        ),
                        (0, e.on)(
                            c.finishedDownloadingClassEmails,
                            (o, { className: s }) =>
                                Object.assign(Object.assign({}, o), {
                                    inProgressCopyClassEmails: Object.assign(
                                        Object.assign(
                                            {},
                                            o.inProgressCopyClassEmails
                                        ),
                                        { [s]: !1 }
                                    ),
                                })
                        )
                    ),
                });
            var y,
                E,
                f = t(4394),
                L = t(655),
                k = t(9287);
            class g {
                constructor(s, a, p, d, v) {
                    (this.actions$ = s),
                        (this.store = a),
                        (this.functionsApi = p),
                        (this.clipboard = d),
                        (this.messageService = v),
                        y.add(this),
                        (this.downloadClassForms$ = (0, f.GW)(() =>
                            this.actions$.pipe(
                                (0, f.l4)(B.downloadFormsIntent),
                                (0, C.w)(({ className: r }) =>
                                    (0, A.D)([
                                        this.functionsApi
                                            .call(`roster?class=${r}`)
                                            .pipe(
                                                (0, h.b)(({ data: i }) => {
                                                    const l = new Blob(
                                                        [new Uint8Array(i)],
                                                        {
                                                            type: 'application/pdf',
                                                        }
                                                    );
                                                    (0, L.Q_)(
                                                        this,
                                                        y,
                                                        'm',
                                                        E
                                                    ).call(
                                                        this,
                                                        l,
                                                        `${r} roster.pdf`
                                                    );
                                                })
                                            ),
                                        this.functionsApi
                                            .call(`signIn?class=${r}`)
                                            .pipe(
                                                (0, h.b)(({ data: i }) => {
                                                    const l = new Blob(
                                                        [new Uint8Array(i)],
                                                        {
                                                            type: 'application/pdf',
                                                        }
                                                    );
                                                    (0, L.Q_)(
                                                        this,
                                                        y,
                                                        'm',
                                                        E
                                                    ).call(
                                                        this,
                                                        l,
                                                        `${r} sign-in.pdf`
                                                    );
                                                })
                                            ),
                                    ]).pipe(
                                        (0, O.h)(
                                            c.finishedDownloadingForms({
                                                className: r,
                                            })
                                        ),
                                        (0, j.O)(
                                            c.startedDownloadingForms({
                                                className: r,
                                            })
                                        )
                                    )
                                )
                            )
                        )),
                        (this.copyClassEmails$ = (0, f.GW)(() =>
                            this.actions$.pipe(
                                (0, f.l4)(B.copyEmailsIntent),
                                (0, C.w)(({ className: r }) =>
                                    this.functionsApi
                                        .call(`emails?class=${r}`)
                                        .pipe(
                                            (0, w.U)(({ list: i }) =>
                                                i.join(', ')
                                            ),
                                            (0, h.b)((i) =>
                                                this.clipboard.copy(i)
                                            ),
                                            (0, O.h)(
                                                c.finishedDownloadingClassEmails(
                                                    { className: r }
                                                )
                                            ),
                                            (0, h.b)(() =>
                                                this.messageService.add({
                                                    summary: `Copied emails for ${r}!`,
                                                    severity: 'success',
                                                })
                                            ),
                                            (0, j.O)(
                                                c.startedDownloadingClassEmails(
                                                    { className: r }
                                                )
                                            )
                                        )
                                )
                            )
                        ));
                }
            }
            (y = new WeakSet()),
                (E = function (s, a = 'file.txt') {
                    const p = window.URL.createObjectURL(s),
                        d = document.createElement('a');
                    (d.href = p),
                        (d.download = a),
                        d.dispatchEvent(
                            new MouseEvent('click', {
                                bubbles: !0,
                                cancelable: !0,
                                view: window,
                            })
                        ),
                        setTimeout(() => {
                            window.URL.revokeObjectURL(p), d.remove();
                        }, 100);
                }),
                (g.ɵfac = function (s) {
                    return new (s || g)(
                        n.LFG(f.eX),
                        n.LFG(e.yh),
                        n.LFG(R.O),
                        n.LFG(k.TU),
                        n.LFG($.ez)
                    );
                }),
                (g.ɵprov = n.Yz7({
                    token: g,
                    factory: g.ɵfac,
                    providedIn: 'root',
                }));
            let q = (() => {
                class o {}
                return (
                    (o.ɵfac = function (a) {
                        return new (a || o)();
                    }),
                    (o.ɵmod = n.oAB({ type: o })),
                    (o.ɵinj = n.cJS({
                        imports: [
                            [
                                F.ez,
                                x.B,
                                H,
                                Q.hJ,
                                W.j,
                                Y.WN,
                                b.O,
                                S.q,
                                X.U$,
                                e.Aw.forFeature(N),
                                f.sQ.forFeature([g]),
                            ],
                        ],
                    })),
                    o
                );
            })();
        },
    },
]);
