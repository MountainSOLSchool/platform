'use strict';
(self.webpackChunkportal = self.webpackChunkportal || []).push([
    [57],
    {
        7057: (k, b, s) => {
            s.r(b), s.d(b, { ReportComponentModule: () => V });
            var Z = s(6666),
                v = s(9808),
                F = s(6115),
                f = s(7579),
                j = s(1135),
                T = s(4782),
                l = s(5620);
            const C = (0, l.R7)({
                    source: 'Report component',
                    events: {
                        'Download forms intent': (0, l.Ky)(),
                        'Copy emails intent': (0, l.Ky)(),
                    },
                }),
                c = (0, l.R7)({
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
                y = (0, l.Tz)({
                    name: 'reportComponentFeature',
                    reducer: (0, l.Lq)(
                        {
                            inProgressClassFormDownloads: {},
                            inProgressCopyClassEmails: {},
                        },
                        (0, l.on)(
                            c.startedDownloadingForms,
                            (t, { className: e }) =>
                                Object.assign(Object.assign({}, t), {
                                    inProgressClassFormDownloads: Object.assign(
                                        Object.assign(
                                            {},
                                            t.inProgressClassFormDownloads
                                        ),
                                        { [e]: !0 }
                                    ),
                                })
                        ),
                        (0, l.on)(
                            c.finishedDownloadingForms,
                            (t, { className: e }) =>
                                Object.assign(Object.assign({}, t), {
                                    inProgressClassFormDownloads: Object.assign(
                                        Object.assign(
                                            {},
                                            t.inProgressClassFormDownloads
                                        ),
                                        { [e]: !1 }
                                    ),
                                })
                        ),
                        (0, l.on)(
                            c.startedDownloadingClassEmails,
                            (t, { className: e }) =>
                                Object.assign(Object.assign({}, t), {
                                    inProgressCopyClassEmails: Object.assign(
                                        Object.assign(
                                            {},
                                            t.inProgressCopyClassEmails
                                        ),
                                        { [e]: !0 }
                                    ),
                                })
                        ),
                        (0, l.on)(
                            c.finishedDownloadingClassEmails,
                            (t, { className: e }) =>
                                Object.assign(Object.assign({}, t), {
                                    inProgressCopyClassEmails: Object.assign(
                                        Object.assign(
                                            {},
                                            t.inProgressCopyClassEmails
                                        ),
                                        { [e]: !1 }
                                    ),
                                })
                        )
                    ),
                });
            var o = s(5e3),
                R = s(1485),
                h = s(9962),
                $ = s(9783),
                x = s(845);
            function L(t, e) {
                1 & t &&
                    (o.TgZ(0, 'tr')(1, 'th', 5),
                    o._uU(2, ' Name '),
                    o._UZ(3, 'p-sortIcon', 6),
                    o.qZA(),
                    o.TgZ(4, 'th', 7),
                    o._uU(5, ' # Enrolled Students '),
                    o._UZ(6, 'p-sortIcon', 8),
                    o.qZA(),
                    o._UZ(7, 'th', 9)(8, 'th', 10),
                    o.qZA());
            }
            function M(t, e) {
                if (1 & t) {
                    const n = o.EpF();
                    o.TgZ(0, 'tr')(1, 'td'),
                        o._uU(2),
                        o.qZA(),
                        o.TgZ(3, 'td'),
                        o._uU(4),
                        o.qZA(),
                        o.TgZ(5, 'td')(6, 'p-button', 11),
                        o.NdJ('click', function () {
                            const g = o.CHM(n).$implicit;
                            return o.oxw(2).downloadClick(g.title);
                        }),
                        o.qZA()(),
                        o.TgZ(7, 'td')(8, 'p-button', 12),
                        o.NdJ('click', function () {
                            const g = o.CHM(n).$implicit;
                            return o.oxw(2).copyEmailsClick(g.title);
                        }),
                        o.qZA()()();
                }
                if (2 & t) {
                    const n = e.$implicit,
                        i = o.oxw().ngIf;
                    o.xp6(2),
                        o.Oqu(n.title),
                        o.xp6(2),
                        o.Oqu(n.enrolledCount),
                        o.xp6(2),
                        o.Q6J('id', n.id + 'downloadBtn')(
                            'loading',
                            i.isClassFormDownloadInProgress[n.title]
                        ),
                        o.xp6(2),
                        o.Q6J('id', n.id + 'emailsBtn')(
                            'loading',
                            i.isClassSignInFormDownloadsInProgress[n.title]
                        );
                }
            }
            const S = function () {
                return [];
            };
            function U(t, e) {
                if (
                    (1 & t &&
                        (o.TgZ(0, 'p-table', 2),
                        o.ALo(1, 'async'),
                        o.ALo(2, 'async'),
                        o.YNc(3, L, 9, 0, 'ng-template', 3),
                        o.YNc(4, M, 9, 6, 'ng-template', 4),
                        o.qZA()),
                    2 & t)
                ) {
                    const n = o.oxw();
                    let i;
                    o.Q6J(
                        'value',
                        null !==
                            (i =
                                null == (i = o.lcZ(1, 2, n.classes$))
                                    ? null
                                    : i.classes) && void 0 !== i
                            ? i
                            : o.DdM(6, S)
                    )('loading', null === o.lcZ(2, 4, n.classes$));
                }
            }
            const O = function () {
                    return {};
                },
                B = function (t, e) {
                    return {
                        isClassFormDownloadInProgress: t,
                        isClassSignInFormDownloadsInProgress: e,
                    };
                },
                z = [
                    {
                        path: '',
                        component: (() => {
                            class t {
                                constructor(n, i) {
                                    (this.functionsApi = n),
                                        (this.store = i),
                                        (this.uploadClick$ = new f.x()),
                                        (this.selectedClass$ = new j.X(void 0)),
                                        (this.classNameInput$ = new f.x()),
                                        (this.reportNameKeydown$ = new f.x()),
                                        (this.emailClick$ = new f.x()),
                                        (this.classes$ = this.functionsApi
                                            .call('classes')
                                            .pipe((0, T.d)(1)));
                                }
                                ngOnInit() {
                                    (this.isClassFormDownloadInProgress$ =
                                        this.store.select(
                                            y.selectInProgressClassFormDownloads
                                        )),
                                        (this.isClassSignInFormDownloadsInProgress$ =
                                            this.store.select(
                                                y.selectInProgressCopyClassEmails
                                            ));
                                }
                                copyEmailsClick(n) {
                                    this.store.dispatch(
                                        C.copyEmailsIntent({ className: n })
                                    );
                                }
                                downloadClick(n) {
                                    this.store.dispatch(
                                        C.downloadFormsIntent({ className: n })
                                    );
                                }
                            }
                            return (
                                (t.ɵfac = function (n) {
                                    return new (n || t)(
                                        o.Y36(R.O),
                                        o.Y36(l.yh)
                                    );
                                }),
                                (t.ɵcmp = o.Xpm({
                                    type: t,
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
                                                (o.TgZ(0, 'h1'),
                                                o._uU(
                                                    1,
                                                    'Class Forms and Contacts'
                                                ),
                                                o.qZA(),
                                                o.TgZ(2, 'div', 0),
                                                o.YNc(3, U, 5, 7, 'p-table', 1),
                                                o.ALo(4, 'async'),
                                                o.ALo(5, 'async'),
                                                o.qZA()),
                                            2 & n)
                                        ) {
                                            let r;
                                            o.xp6(3),
                                                o.Q6J(
                                                    'ngIf',
                                                    o.WLB(
                                                        7,
                                                        B,
                                                        null !==
                                                            (r = o.lcZ(
                                                                4,
                                                                1,
                                                                i.isClassFormDownloadInProgress$
                                                            )) && void 0 !== r
                                                            ? r
                                                            : o.DdM(5, O),
                                                        null !==
                                                            (r = o.lcZ(
                                                                5,
                                                                3,
                                                                i.isClassSignInFormDownloadsInProgress$
                                                            )) && void 0 !== r
                                                            ? r
                                                            : o.DdM(6, O)
                                                    )
                                                );
                                        }
                                    },
                                    directives: [
                                        v.O5,
                                        h.iA,
                                        $.jx,
                                        h.lQ,
                                        h.fz,
                                        x.zx,
                                    ],
                                    pipes: [v.Ov],
                                    encapsulation: 2,
                                    changeDetection: 0,
                                })),
                                t
                            );
                        })(),
                        children: [],
                    },
                ];
            let J = (() => {
                class t {}
                return (
                    (t.ɵfac = function (n) {
                        return new (n || t)();
                    }),
                    (t.ɵmod = o.oAB({ type: t })),
                    (t.ɵinj = o.cJS({ imports: [[F.Bz.forChild(z)], F.Bz] })),
                    t
                );
            })();
            var A,
                K = s(1424),
                G = s(2145),
                Q = s(8205),
                W = s(8185),
                p = s(4394),
                D = s(3900),
                Y = s(4128),
                w = s(8505),
                I = s(9718),
                E = s(8675),
                H = s(4004),
                X = s(9287);
            class m {
                constructor(e, n, i, r, g) {
                    (this.actions$ = e),
                        (this.store = n),
                        (this.functionsApi = i),
                        (this.clipboard = r),
                        (this.messageService = g),
                        A.add(this),
                        (this.downloadClassForms$ = (0, p.GW)(() =>
                            this.actions$.pipe(
                                (0, p.l4)(C.downloadFormsIntent),
                                (0, D.w)(({ className: a }) =>
                                    (0, Y.D)([
                                        this.functionsApi
                                            .call(`roster?class=${a}`)
                                            .pipe(
                                                (0, w.b)(({ html: d }) => {
                                                    const u = window.open(
                                                        '',
                                                        `${a} Roster`,
                                                        `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${
                                                            screen.width / 2
                                                        },height=${
                                                            screen.height
                                                        },top=0,left=0`
                                                    );
                                                    u &&
                                                        (u.document.body.innerHTML =
                                                            d);
                                                })
                                            ),
                                        this.functionsApi
                                            .call(`signIn?class=${a}`)
                                            .pipe(
                                                (0, w.b)(({ html: d }) => {
                                                    const u = window.open(
                                                        '',
                                                        `${a} Sign In/Out`,
                                                        `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${
                                                            screen.width / 2
                                                        },height=${
                                                            screen.height
                                                        },top=0,left=${
                                                            screen.width / 2
                                                        }`
                                                    );
                                                    u &&
                                                        (u.document.body.innerHTML =
                                                            d);
                                                })
                                            ),
                                    ]).pipe(
                                        (0, I.h)(
                                            c.finishedDownloadingForms({
                                                className: a,
                                            })
                                        ),
                                        (0, E.O)(
                                            c.startedDownloadingForms({
                                                className: a,
                                            })
                                        )
                                    )
                                )
                            )
                        )),
                        (this.copyClassEmails$ = (0, p.GW)(() =>
                            this.actions$.pipe(
                                (0, p.l4)(C.copyEmailsIntent),
                                (0, D.w)(({ className: a }) =>
                                    this.functionsApi
                                        .call(`emails?class=${a}`)
                                        .pipe(
                                            (0, H.U)(({ list: d }) =>
                                                d.join(', ')
                                            ),
                                            (0, w.b)((d) =>
                                                this.clipboard.copy(d)
                                            ),
                                            (0, I.h)(
                                                c.finishedDownloadingClassEmails(
                                                    { className: a }
                                                )
                                            ),
                                            (0, w.b)(() =>
                                                this.messageService.add({
                                                    summary: `Copied emails for ${a}!`,
                                                    severity: 'success',
                                                })
                                            ),
                                            (0, E.O)(
                                                c.startedDownloadingClassEmails(
                                                    { className: a }
                                                )
                                            )
                                        )
                                )
                            )
                        ));
                }
            }
            (A = new WeakSet()),
                (m.ɵfac = function (e) {
                    return new (e || m)(
                        o.LFG(p.eX),
                        o.LFG(l.yh),
                        o.LFG(R.O),
                        o.LFG(X.TU),
                        o.LFG($.ez)
                    );
                }),
                (m.ɵprov = o.Yz7({
                    token: m,
                    factory: m.ɵfac,
                    providedIn: 'root',
                }));
            let V = (() => {
                class t {}
                return (
                    (t.ɵfac = function (n) {
                        return new (n || t)();
                    }),
                    (t.ɵmod = o.oAB({ type: t })),
                    (t.ɵinj = o.cJS({
                        imports: [
                            [
                                v.ez,
                                Z.B,
                                J,
                                x.hJ,
                                K.j,
                                G.WN,
                                Q.O,
                                W.q,
                                h.U$,
                                l.Aw.forFeature(y),
                                p.sQ.forFeature([m]),
                            ],
                        ],
                    })),
                    t
                );
            })();
        },
    },
]);
