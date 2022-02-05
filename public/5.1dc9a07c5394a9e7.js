'use strict';
(self.webpackChunkportal = self.webpackChunkportal || []).push([
    [5],
    {
        5005: (k, h, e) => {
            e.r(h), e.d(h, { ReportComponentModule: () => L });
            var s,
                c,
                m,
                y,
                $,
                M = e(6666),
                f = e(9808),
                R = e(6115),
                l = e(655),
                d = e(7579),
                N = e(6451),
                v = e(9300),
                u = e(4004),
                T = e(1365),
                A = e(3900),
                C = e(8675),
                I = e(8505),
                t = e(5e3),
                B = e(1485),
                w = e(1424),
                g = e(845);
            class i {
                constructor(a) {
                    (this.functionsApi = a),
                        s.add(this),
                        (this.downloadClick$ = new d.x()),
                        (this.reportNameInputChange$ = new d.x()),
                        (this.reportNameInputKeydown$ = new d.x()),
                        c.set(
                            this,
                            (0, N.T)(
                                this.downloadClick$,
                                this.reportNameInputKeydown$.pipe(
                                    (0, v.h)((o) => 'Enter' === o.key)
                                )
                            )
                        ),
                        m.set(
                            this,
                            this.reportNameInputChange$.pipe(
                                (0, u.U)((o) => {
                                    var p;
                                    return null !== (p = o.target.value) &&
                                        void 0 !== p
                                        ? p
                                        : '';
                                })
                            )
                        ),
                        (this.isLoadingReport$ = (0, l.Q_)(this, c, 'f').pipe(
                            (0, T.M)((0, l.Q_)(this, m, 'f')),
                            (0, v.h)(([, o]) => '' !== o),
                            (0, A.w)(([, o]) =>
                                (0, l.Q_)(this, s, 'm', y)
                                    .call(this, o)
                                    .pipe((0, u.U)(({ finished: p }) => !p))
                            ),
                            (0, C.O)(!1)
                        ));
                }
            }
            (c = new WeakMap()),
                (m = new WeakMap()),
                (s = new WeakSet()),
                (y = function (a) {
                    return this.functionsApi.get(`roster?class=${a}`).pipe(
                        (0, I.b)(({ data: o }) => {
                            const p = new Blob([new Uint8Array(o)], {
                                type: 'application/pdf',
                            });
                            (0, l.Q_)(this, s, 'm', $).call(
                                this,
                                p,
                                'roster.pdf'
                            );
                        }),
                        (function x(n) {
                            return (0, u.U)(() => n);
                        })({ finished: !0 }),
                        (0, C.O)({ finished: !1 })
                    );
                }),
                ($ = function (a, o = 'file.txt') {
                    const p = window.URL.createObjectURL(a),
                        r = document.createElement('a');
                    (r.href = p),
                        (r.download = o),
                        r.dispatchEvent(
                            new MouseEvent('click', {
                                bubbles: !0,
                                cancelable: !0,
                                view: window,
                            })
                        ),
                        setTimeout(() => {
                            window.URL.revokeObjectURL(p), r.remove();
                        }, 100);
                }),
                (i.ɵfac = function (a) {
                    return new (a || i)(t.Y36(B.O));
                }),
                (i.ɵcmp = t.Xpm({
                    type: i,
                    selectors: [['ng-component']],
                    decls: 6,
                    vars: 3,
                    consts: [
                        [1, 'field', 2, 'margin-right', '4px'],
                        ['for', 'classNameInput', 1, 'block'],
                        [
                            'pInputText',
                            '',
                            'type',
                            'text',
                            'id',
                            'classNameInput',
                            'placeholder',
                            'Knots-fall-2021',
                            3,
                            'keyup',
                            'keydown',
                        ],
                        [
                            'label',
                            'Download',
                            'icon',
                            'pi pi-download',
                            'id',
                            'downloadBtn',
                            3,
                            'loading',
                            'click',
                        ],
                    ],
                    template: function (a, o) {
                        if (
                            (1 & a &&
                                (t.TgZ(0, 'span', 0),
                                t.TgZ(1, 'label', 1),
                                t._uU(2, 'Class Name'),
                                t.qZA(),
                                t.TgZ(3, 'input', 2),
                                t.NdJ('keyup', function (r) {
                                    return o.reportNameInputChange$.next(r);
                                })('keydown', function (r) {
                                    return o.reportNameInputKeydown$.next(r);
                                }),
                                t.qZA(),
                                t.qZA(),
                                t.TgZ(4, 'p-button', 3),
                                t.NdJ('click', function () {
                                    return o.downloadClick$.next();
                                }),
                                t.ALo(5, 'async'),
                                t.qZA()),
                            2 & a)
                        ) {
                            let p;
                            t.xp6(4),
                                t.Q6J(
                                    'loading',
                                    null !==
                                        (p = t.lcZ(5, 1, o.isLoadingReport$)) &&
                                        void 0 !== p &&
                                        p
                                );
                        }
                    },
                    directives: [w.o, g.zx],
                    pipes: [f.Ov],
                    encapsulation: 2,
                    changeDetection: 0,
                }));
            const U = [{ path: '', component: i, children: [] }];
            let Z = (() => {
                    class n {}
                    return (
                        (n.ɵfac = function (o) {
                            return new (o || n)();
                        }),
                        (n.ɵmod = t.oAB({ type: n })),
                        (n.ɵinj = t.cJS({
                            imports: [[R.Bz.forChild(U)], R.Bz],
                        })),
                        n
                    );
                })(),
                L = (() => {
                    class n {}
                    return (
                        (n.ɵfac = function (o) {
                            return new (o || n)();
                        }),
                        (n.ɵmod = t.oAB({ type: n })),
                        (n.ɵinj = t.cJS({
                            imports: [[f.ez, M.B, Z, g.hJ, w.j]],
                        })),
                        n
                    );
                })();
        },
    },
]);
