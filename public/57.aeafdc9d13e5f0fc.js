'use strict';
(self.webpackChunkportal = self.webpackChunkportal || []).push([
    [57],
    {
        7057: (lt, I, s) => {
            s.r(I), s.d(I, { ReportComponentModule: () => et });
            var B = s(6666),
                b = s(9808),
                Z = s(6115),
                C = s(7579),
                J = s(1135),
                K = s(4782),
                h = s(3900),
                j = s(4128),
                z = s(8996),
                x = s(4004),
                D = s(9718),
                A = s(8675),
                Q = s(3028),
                G = s(5665),
                l = s(5620);
            const v = (0, l.R7)({
                    source: 'Report component',
                    events: {
                        'Download forms intent': (0, l.Ky)(),
                        'Copy emails intent': (0, l.Ky)(),
                    },
                }),
                d = (0, l.R7)({
                    source: 'Report effects',
                    events: {
                        'Started downloading forms': (0, l.Ky)(),
                        'Finished downloading forms': (0, l.Ky)(),
                        'Failed downloading forms': (0, l.Ky)(),
                        'Started downloading class emails': (0, l.Ky)(),
                        'Finished downloading class emails': (0, l.Ky)(),
                        'Failed downloading class emails': (0, l.Ky)(),
                    },
                }),
                O = (0, l.Tz)({
                    name: 'reportComponentFeature',
                    reducer: (0, l.Lq)(
                        {
                            inProgressClassFormDownloads: {},
                            inProgressCopyClassEmails: {},
                        },
                        (0, l.on)(
                            d.startedDownloadingForms,
                            (o, { className: e }) =>
                                Object.assign(Object.assign({}, o), {
                                    inProgressClassFormDownloads: Object.assign(
                                        Object.assign(
                                            {},
                                            o.inProgressClassFormDownloads
                                        ),
                                        { [e]: !0 }
                                    ),
                                })
                        ),
                        (0, l.on)(
                            d.finishedDownloadingForms,
                            (o, { className: e }) =>
                                Object.assign(Object.assign({}, o), {
                                    inProgressClassFormDownloads: Object.assign(
                                        Object.assign(
                                            {},
                                            o.inProgressClassFormDownloads
                                        ),
                                        { [e]: !1 }
                                    ),
                                })
                        ),
                        (0, l.on)(
                            d.startedDownloadingClassEmails,
                            (o, { className: e }) =>
                                Object.assign(Object.assign({}, o), {
                                    inProgressCopyClassEmails: Object.assign(
                                        Object.assign(
                                            {},
                                            o.inProgressCopyClassEmails
                                        ),
                                        { [e]: !0 }
                                    ),
                                })
                        ),
                        (0, l.on)(
                            d.finishedDownloadingClassEmails,
                            (o, { className: e }) =>
                                Object.assign(Object.assign({}, o), {
                                    inProgressCopyClassEmails: Object.assign(
                                        Object.assign(
                                            {},
                                            o.inProgressCopyClassEmails
                                        ),
                                        { [e]: !1 }
                                    ),
                                })
                        )
                    ),
                });
            var t = s(5e3),
                P = s(1485),
                w = s(9962),
                T = s(9783),
                U = s(845);
            function Y(o, e) {
                1 & o &&
                    (t.TgZ(0, 'tr')(1, 'th', 5),
                    t._uU(2, ' Name '),
                    t._UZ(3, 'p-sortIcon', 6),
                    t.qZA(),
                    t.TgZ(4, 'th', 7),
                    t._uU(5, ' # Enrolled Students '),
                    t._UZ(6, 'p-sortIcon', 8),
                    t.qZA(),
                    t._UZ(7, 'th', 9)(8, 'th', 10),
                    t.qZA());
            }
            function H(o, e) {
                if (1 & o) {
                    const n = t.EpF();
                    t.TgZ(0, 'tr')(1, 'td'),
                        t._uU(2),
                        t.qZA(),
                        t.TgZ(3, 'td'),
                        t._uU(4),
                        t.qZA(),
                        t.TgZ(5, 'td')(6, 'p-button', 11),
                        t.NdJ('click', function () {
                            const p = t.CHM(n).$implicit;
                            return t.oxw(2).downloadClick(p.title);
                        }),
                        t.qZA()(),
                        t.TgZ(7, 'td')(8, 'p-button', 12),
                        t.NdJ('click', function () {
                            const p = t.CHM(n).$implicit;
                            return t.oxw(2).copyEmailsClick(p.title);
                        }),
                        t.qZA()()();
                }
                if (2 & o) {
                    const n = e.$implicit,
                        i = t.oxw().ngIf;
                    t.xp6(2),
                        t.Oqu(n.title),
                        t.xp6(2),
                        t.Oqu(n.enrolledCount),
                        t.xp6(2),
                        t.Q6J('id', n.id + 'downloadBtn')(
                            'loading',
                            i.isClassFormDownloadInProgress[n.title]
                        ),
                        t.xp6(2),
                        t.Q6J('id', n.id + 'emailsBtn')(
                            'loading',
                            i.isClassSignInFormDownloadsInProgress[n.title]
                        );
                }
            }
            const X = function () {
                return [];
            };
            function N(o, e) {
                if (
                    (1 & o &&
                        (t.TgZ(0, 'p-table', 2),
                        t.ALo(1, 'async'),
                        t.ALo(2, 'async'),
                        t.YNc(3, Y, 9, 0, 'ng-template', 3),
                        t.YNc(4, H, 9, 6, 'ng-template', 4),
                        t.qZA()),
                    2 & o)
                ) {
                    const n = t.oxw();
                    let i;
                    t.Q6J(
                        'value',
                        null !==
                            (i =
                                null == (i = t.lcZ(1, 2, n.classes$))
                                    ? null
                                    : i.classes) && void 0 !== i
                            ? i
                            : t.DdM(6, X)
                    )('loading', null === t.lcZ(2, 4, n.classes$));
                }
            }
            const S = function () {
                    return {};
                },
                V = function (o, e) {
                    return {
                        isClassFormDownloadInProgress: o,
                        isClassSignInFormDownloadsInProgress: e,
                    };
                },
                k = [
                    {
                        path: '',
                        component: (() => {
                            class o {
                                constructor(n, i) {
                                    (this.functionsApi = n),
                                        (this.store = i),
                                        (this.uploadClick$ = new C.x()),
                                        (this.selectedClass$ = new J.X(void 0)),
                                        (this.classNameInput$ = new C.x()),
                                        (this.reportNameKeydown$ = new C.x()),
                                        (this.emailClick$ = new C.x()),
                                        (this.classes$ = this.functionsApi
                                            .call('classes')
                                            .pipe((0, K.d)(1))),
                                        (this.isUploading$ =
                                            this.uploadClick$.pipe(
                                                (0, h.w)(({ files: r }) =>
                                                    (0, j.D)(
                                                        r.map((p) =>
                                                            (0, z.D)(
                                                                p.text()
                                                            ).pipe(
                                                                (0, x.U)(
                                                                    (a) => {
                                                                        const c =
                                                                            new Map();
                                                                        return Q.parse(
                                                                            a,
                                                                            {
                                                                                header: !0,
                                                                                transform:
                                                                                    (
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
                                                                                    (
                                                                                        m
                                                                                    ) => {
                                                                                        var u;
                                                                                        const E =
                                                                                                G
                                                                                                    .N[
                                                                                                    m
                                                                                                ],
                                                                                            M =
                                                                                                null !==
                                                                                                    (u =
                                                                                                        c.get(
                                                                                                            m
                                                                                                        )) &&
                                                                                                void 0 !==
                                                                                                    u
                                                                                                    ? u
                                                                                                    : 0,
                                                                                            it =
                                                                                                'string' ==
                                                                                                typeof E
                                                                                                    ? E
                                                                                                    : E[
                                                                                                          M
                                                                                                      ];
                                                                                        return (
                                                                                            c.set(
                                                                                                m,
                                                                                                M +
                                                                                                    1
                                                                                            ),
                                                                                            it
                                                                                        );
                                                                                    },
                                                                            }
                                                                        ).data;
                                                                    }
                                                                )
                                                            )
                                                        )
                                                    ).pipe(
                                                        (0, x.U)((p) =>
                                                            p.reduce(
                                                                (a, c) => [
                                                                    ...a,
                                                                    ...c,
                                                                ],
                                                                []
                                                            )
                                                        ),
                                                        (0, h.w)((p) =>
                                                            this.functionsApi
                                                                .call(
                                                                    'importStudentEnrollmentSummer2022',
                                                                    p
                                                                )
                                                                .pipe(
                                                                    (0, D.h)(!1)
                                                                )
                                                        ),
                                                        (0, A.O)(!0)
                                                    )
                                                )
                                            ));
                                }
                                ngOnInit() {
                                    (this.isClassFormDownloadInProgress$ =
                                        this.store.select(
                                            O.selectInProgressClassFormDownloads
                                        )),
                                        (this.isClassSignInFormDownloadsInProgress$ =
                                            this.store.select(
                                                O.selectInProgressCopyClassEmails
                                            ));
                                }
                                copyEmailsClick(n) {
                                    this.store.dispatch(
                                        v.copyEmailsIntent({ className: n })
                                    );
                                }
                                downloadClick(n) {
                                    this.store.dispatch(
                                        v.downloadFormsIntent({ className: n })
                                    );
                                }
                            }
                            return (
                                (o.ɵfac = function (n) {
                                    return new (n || o)(
                                        t.Y36(P.O),
                                        t.Y36(l.yh)
                                    );
                                }),
                                (o.ɵcmp = t.Xpm({
                                    type: o,
                                    selectors: [['ng-component']],
                                    decls: 6,
                                    vars: 10,
                                    consts: [
                                        [2, 'margin-top', '20px'],
                                        [
                                            'responsiveLayout',
                                            'scroll',
                                            'sortMode',
                                            'single',
                                            3,
                                            'value',
                                            'loading',
                                            4,
                                            'ngIf',
                                        ],
                                        [
                                            'responsiveLayout',
                                            'scroll',
                                            'sortMode',
                                            'single',
                                            3,
                                            'value',
                                            'loading',
                                        ],
                                        ['pTemplate', 'header'],
                                        ['pTemplate', 'body'],
                                        [
                                            'pSortableColumn',
                                            'title',
                                            2,
                                            'width',
                                            '40%',
                                        ],
                                        ['field', 'title'],
                                        ['pSortableColumn', 'enrolledCount'],
                                        ['field', 'enrolledCount'],
                                        [2, 'width', '20%'],
                                        [2, 'width', '15%'],
                                        [
                                            'label',
                                            'View/Print Class Forms',
                                            'icon',
                                            'pi pi-download',
                                            1,
                                            'sol-button',
                                            3,
                                            'id',
                                            'loading',
                                            'click',
                                        ],
                                        [
                                            'label',
                                            'Copy Email Lists',
                                            1,
                                            'sol-button',
                                            3,
                                            'id',
                                            'loading',
                                            'click',
                                        ],
                                    ],
                                    template: function (n, i) {
                                        if (
                                            (1 & n &&
                                                (t.TgZ(0, 'h1'),
                                                t._uU(
                                                    1,
                                                    'Class Forms and Contacts'
                                                ),
                                                t.qZA(),
                                                t.TgZ(2, 'div', 0),
                                                t.YNc(3, N, 5, 7, 'p-table', 1),
                                                t.ALo(4, 'async'),
                                                t.ALo(5, 'async'),
                                                t.qZA()),
                                            2 & n)
                                        ) {
                                            let r;
                                            t.xp6(3),
                                                t.Q6J(
                                                    'ngIf',
                                                    t.WLB(
                                                        7,
                                                        V,
                                                        null !==
                                                            (r = t.lcZ(
                                                                4,
                                                                1,
                                                                i.isClassFormDownloadInProgress$
                                                            )) && void 0 !== r
                                                            ? r
                                                            : t.DdM(5, S),
                                                        null !==
                                                            (r = t.lcZ(
                                                                5,
                                                                3,
                                                                i.isClassSignInFormDownloadsInProgress$
                                                            )) && void 0 !== r
                                                            ? r
                                                            : t.DdM(6, S)
                                                    )
                                                );
                                        }
                                    },
                                    directives: [
                                        b.O5,
                                        w.iA,
                                        T.jx,
                                        w.lQ,
                                        w.fz,
                                        U.zx,
                                    ],
                                    pipes: [b.Ov],
                                    encapsulation: 2,
                                    changeDetection: 0,
                                })),
                                o
                            );
                        })(),
                        children: [],
                    },
                ];
            let q = (() => {
                class o {}
                return (
                    (o.ɵfac = function (n) {
                        return new (n || o)();
                    }),
                    (o.ɵmod = t.oAB({ type: o })),
                    (o.ɵinj = t.cJS({ imports: [[Z.Bz.forChild(k)], Z.Bz] })),
                    o
                );
            })();
            var F,
                $,
                _ = s(1424),
                tt = s(2145),
                ot = s(8205),
                nt = s(8185),
                g = s(4394),
                L = s(655),
                y = s(8505),
                st = s(9287);
            class f {
                constructor(e, n, i, r, p) {
                    (this.actions$ = e),
                        (this.store = n),
                        (this.functionsApi = i),
                        (this.clipboard = r),
                        (this.messageService = p),
                        F.add(this),
                        (this.downloadClassForms$ = (0, g.GW)(() =>
                            this.actions$.pipe(
                                (0, g.l4)(v.downloadFormsIntent),
                                (0, h.w)(({ className: a }) =>
                                    (0, j.D)([
                                        this.functionsApi
                                            .call(`roster?class=${a}`)
                                            .pipe(
                                                (0, y.b)(({ data: c }) => {
                                                    const R = new Blob(
                                                        [new Uint8Array(c)],
                                                        {
                                                            type: 'application/pdf',
                                                        }
                                                    );
                                                    (0, L.Q_)(
                                                        this,
                                                        F,
                                                        'm',
                                                        $
                                                    ).call(
                                                        this,
                                                        R,
                                                        `${a} roster.pdf`
                                                    );
                                                })
                                            ),
                                        this.functionsApi
                                            .call(`signIn?class=${a}`)
                                            .pipe(
                                                (0, y.b)(({ data: c }) => {
                                                    const R = new Blob(
                                                        [new Uint8Array(c)],
                                                        {
                                                            type: 'application/pdf',
                                                        }
                                                    );
                                                    (0, L.Q_)(
                                                        this,
                                                        F,
                                                        'm',
                                                        $
                                                    ).call(
                                                        this,
                                                        R,
                                                        `${a} sign-in.pdf`
                                                    );
                                                })
                                            ),
                                    ]).pipe(
                                        (0, D.h)(
                                            d.finishedDownloadingForms({
                                                className: a,
                                            })
                                        ),
                                        (0, A.O)(
                                            d.startedDownloadingForms({
                                                className: a,
                                            })
                                        )
                                    )
                                )
                            )
                        )),
                        (this.copyClassEmails$ = (0, g.GW)(() =>
                            this.actions$.pipe(
                                (0, g.l4)(v.copyEmailsIntent),
                                (0, h.w)(({ className: a }) =>
                                    this.functionsApi
                                        .call(`emails?class=${a}`)
                                        .pipe(
                                            (0, x.U)(({ list: c }) =>
                                                c.join(', ')
                                            ),
                                            (0, y.b)((c) =>
                                                this.clipboard.copy(c)
                                            ),
                                            (0, D.h)(
                                                d.finishedDownloadingClassEmails(
                                                    { className: a }
                                                )
                                            ),
                                            (0, y.b)(() =>
                                                this.messageService.add({
                                                    summary: `Copied emails for ${a}!`,
                                                    severity: 'success',
                                                })
                                            ),
                                            (0, A.O)(
                                                d.startedDownloadingClassEmails(
                                                    { className: a }
                                                )
                                            )
                                        )
                                )
                            )
                        ));
                }
            }
            (F = new WeakSet()),
                ($ = function (e, n = 'file.txt') {
                    const i = window.URL.createObjectURL(e),
                        r = document.createElement('a');
                    (r.href = i),
                        (r.download = n),
                        r.dispatchEvent(
                            new MouseEvent('click', {
                                bubbles: !0,
                                cancelable: !0,
                                view: window,
                            })
                        ),
                        setTimeout(() => {
                            window.URL.revokeObjectURL(i), r.remove();
                        }, 100);
                }),
                (f.ɵfac = function (e) {
                    return new (e || f)(
                        t.LFG(g.eX),
                        t.LFG(l.yh),
                        t.LFG(P.O),
                        t.LFG(st.TU),
                        t.LFG(T.ez)
                    );
                }),
                (f.ɵprov = t.Yz7({
                    token: f,
                    factory: f.ɵfac,
                    providedIn: 'root',
                }));
            let et = (() => {
                class o {}
                return (
                    (o.ɵfac = function (n) {
                        return new (n || o)();
                    }),
                    (o.ɵmod = t.oAB({ type: o })),
                    (o.ɵinj = t.cJS({
                        imports: [
                            [
                                b.ez,
                                B.B,
                                q,
                                U.hJ,
                                _.j,
                                tt.WN,
                                ot.O,
                                nt.q,
                                w.U$,
                                l.Aw.forFeature(O),
                                g.sQ.forFeature([f]),
                            ],
                        ],
                    })),
                    o
                );
            })();
        },
    },
]);
