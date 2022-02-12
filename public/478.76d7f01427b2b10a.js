'use strict';
(self.webpackChunkportal = self.webpackChunkportal || []).push([
    [478],
    {
        5478: (Ei, q, a) => {
            a.r(q), a.d(q, { ReportComponentModule: () => ki });
            var Ie = a(6666),
                p = a(9808),
                K = a(6115),
                A = a(655),
                h = a(7579),
                Ae = a(6451),
                P = a(9300),
                S = a(4004),
                j = a(1365),
                X = a(3900),
                O = a(8675),
                Oe = a(8505),
                t = a(5e3),
                De = a(1485),
                v = a(1777),
                ee = a(1424),
                R = a(845),
                te = a(5787),
                C = a(9783),
                m = a(5730),
                g = a(5921),
                Le = a(2382);
            function D(i, o = 0) {
                return (function Fe(i) {
                    return !isNaN(parseFloat(i)) && !isNaN(Number(i));
                })(i)
                    ? Number(i)
                    : o;
            }
            var N = a(9646),
                y = a(8306),
                ie = a(8421),
                ze = a(5577),
                Be = a(1144),
                _ = a(576),
                Pe = a(3268);
            const Ne = ['addListener', 'removeListener'],
                Ze = ['addEventListener', 'removeEventListener'],
                He = ['on', 'off'];
            function L(i, o, e, n) {
                if (((0, _.m)(e) && ((n = e), (e = void 0)), n))
                    return L(i, o, e).pipe((0, Pe.Z)(n));
                const [s, l] = (function Ye(i) {
                    return (
                        (0, _.m)(i.addEventListener) &&
                        (0, _.m)(i.removeEventListener)
                    );
                })(i)
                    ? Ze.map((r) => (d) => i[r](o, d, e))
                    : (function Ue(i) {
                          return (
                              (0, _.m)(i.addListener) &&
                              (0, _.m)(i.removeListener)
                          );
                      })(i)
                    ? Ne.map(ne(i, o))
                    : (function Ge(i) {
                          return (0, _.m)(i.on) && (0, _.m)(i.off);
                      })(i)
                    ? He.map(ne(i, o))
                    : [];
                if (!s && (0, Be.z)(i))
                    return (0, ze.z)((r) => L(r, o, e))((0, ie.Xf)(i));
                if (!s) throw new TypeError('Invalid event target');
                return new y.y((r) => {
                    const d = (...c) => r.next(1 < c.length ? c : c[0]);
                    return s(d), () => l(d);
                });
            }
            function ne(i, o) {
                return (e) => (n) => i[e](o, n);
            }
            var oe = a(4408),
                se = a(727);
            const T = {
                schedule(i) {
                    let o = requestAnimationFrame,
                        e = cancelAnimationFrame;
                    const { delegate: n } = T;
                    n &&
                        ((o = n.requestAnimationFrame),
                        (e = n.cancelAnimationFrame));
                    const s = o((l) => {
                        (e = void 0), i(l);
                    });
                    return new se.w0(() => (null == e ? void 0 : e(s)));
                },
                requestAnimationFrame(...i) {
                    const { delegate: o } = T;
                    return (
                        (null == o ? void 0 : o.requestAnimationFrame) ||
                        requestAnimationFrame
                    )(...i);
                },
                cancelAnimationFrame(...i) {
                    const { delegate: o } = T;
                    return (
                        (null == o ? void 0 : o.cancelAnimationFrame) ||
                        cancelAnimationFrame
                    )(...i);
                },
                delegate: void 0,
            };
            var le = a(7565);
            const We = new (class Qe extends le.v {
                flush(o) {
                    (this._active = !0), (this._scheduled = void 0);
                    const { actions: e } = this;
                    let n,
                        s = -1;
                    o = o || e.shift();
                    const l = e.length;
                    do {
                        if ((n = o.execute(o.state, o.delay))) break;
                    } while (++s < l && (o = e.shift()));
                    if (((this._active = !1), n)) {
                        for (; ++s < l && (o = e.shift()); ) o.unsubscribe();
                        throw n;
                    }
                }
            })(
                class Je extends oe.o {
                    constructor(o, e) {
                        super(o, e), (this.scheduler = o), (this.work = e);
                    }
                    requestAsyncId(o, e, n = 0) {
                        return null !== n && n > 0
                            ? super.requestAsyncId(o, e, n)
                            : (o.actions.push(this),
                              o._scheduled ||
                                  (o._scheduled = T.requestAnimationFrame(() =>
                                      o.flush(void 0)
                                  )));
                    }
                    recycleAsyncId(o, e, n = 0) {
                        if (
                            (null != n && n > 0) ||
                            (null == n && this.delay > 0)
                        )
                            return super.recycleAsyncId(o, e, n);
                        0 === o.actions.length &&
                            (T.cancelAnimationFrame(e),
                            (o._scheduled = void 0));
                    }
                }
            );
            let Z,
                $e = 1;
            const M = {};
            function re(i) {
                return i in M && (delete M[i], !0);
            }
            const qe = {
                    setImmediate(i) {
                        const o = $e++;
                        return (
                            (M[o] = !0),
                            Z || (Z = Promise.resolve()),
                            Z.then(() => re(o) && i()),
                            o
                        );
                    },
                    clearImmediate(i) {
                        re(i);
                    },
                },
                { setImmediate: Ke, clearImmediate: je } = qe,
                F = {
                    setImmediate(...i) {
                        const { delegate: o } = F;
                        return ((null == o ? void 0 : o.setImmediate) || Ke)(
                            ...i
                        );
                    },
                    clearImmediate(i) {
                        const { delegate: o } = F;
                        return ((null == o ? void 0 : o.clearImmediate) || je)(
                            i
                        );
                    },
                    delegate: void 0,
                },
                tt = new (class et extends le.v {
                    flush(o) {
                        (this._active = !0), (this._scheduled = void 0);
                        const { actions: e } = this;
                        let n,
                            s = -1;
                        o = o || e.shift();
                        const l = e.length;
                        do {
                            if ((n = o.execute(o.state, o.delay))) break;
                        } while (++s < l && (o = e.shift()));
                        if (((this._active = !1), n)) {
                            for (; ++s < l && (o = e.shift()); )
                                o.unsubscribe();
                            throw n;
                        }
                    }
                })(
                    class Xe extends oe.o {
                        constructor(o, e) {
                            super(o, e), (this.scheduler = o), (this.work = e);
                        }
                        requestAsyncId(o, e, n = 0) {
                            return null !== n && n > 0
                                ? super.requestAsyncId(o, e, n)
                                : (o.actions.push(this),
                                  o._scheduled ||
                                      (o._scheduled = F.setImmediate(
                                          o.flush.bind(o, void 0)
                                      )));
                        }
                        recycleAsyncId(o, e, n = 0) {
                            if (
                                (null != n && n > 0) ||
                                (null == n && this.delay > 0)
                            )
                                return super.recycleAsyncId(o, e, n);
                            0 === o.actions.length &&
                                (F.clearImmediate(e), (o._scheduled = void 0));
                        }
                    }
                );
            function ae(i) {
                return (
                    !!i &&
                    (i instanceof y.y ||
                        ((0, _.m)(i.lift) && (0, _.m)(i.subscribe)))
                );
            }
            var it = a(1884),
                ce = a(4986),
                ue = a(4482),
                H = a(5403),
                ot = a(3532),
                st = a(1165);
            function U(i, o = ce.P) {
                return (function nt(i) {
                    return (0, ue.e)((o, e) => {
                        let n = !1,
                            s = null,
                            l = null,
                            r = !1;
                        const d = () => {
                                if (
                                    (null == l || l.unsubscribe(),
                                    (l = null),
                                    n)
                                ) {
                                    n = !1;
                                    const u = s;
                                    (s = null), e.next(u);
                                }
                                r && e.complete();
                            },
                            c = () => {
                                (l = null), r && e.complete();
                            };
                        o.subscribe(
                            new H.Q(
                                e,
                                (u) => {
                                    (n = !0),
                                        (s = u),
                                        l ||
                                            (0, ie.Xf)(i(u)).subscribe(
                                                (l = new H.Q(e, d, c))
                                            );
                                },
                                () => {
                                    (r = !0),
                                        (!n || !l || l.closed) && e.complete();
                                }
                            )
                        );
                    });
                })(() =>
                    (function lt(i = 0, o, e = ce.P) {
                        let n = -1;
                        return (
                            null != o && ((0, ot.K)(o) ? (e = o) : (n = o)),
                            new y.y((s) => {
                                let l = (0, st.q)(i) ? +i - e.now() : i;
                                l < 0 && (l = 0);
                                let r = 0;
                                return e.schedule(function () {
                                    s.closed ||
                                        (s.next(r++),
                                        0 <= n
                                            ? this.schedule(void 0, n)
                                            : s.complete());
                                }, l);
                            })
                        );
                    })(i, o)
                );
            }
            var G = a(2722),
                at = a(4782);
            let Y;
            try {
                Y = 'undefined' != typeof Intl && Intl.v8BreakIterator;
            } catch (i) {
                Y = !1;
            }
            let V,
                w,
                de = (() => {
                    class i {
                        constructor(e) {
                            (this._platformId = e),
                                (this.isBrowser = this._platformId
                                    ? (0, p.NF)(this._platformId)
                                    : 'object' == typeof document &&
                                      !!document),
                                (this.EDGE =
                                    this.isBrowser &&
                                    /(edge)/i.test(navigator.userAgent)),
                                (this.TRIDENT =
                                    this.isBrowser &&
                                    /(msie|trident)/i.test(
                                        navigator.userAgent
                                    )),
                                (this.BLINK =
                                    this.isBrowser &&
                                    !(!window.chrome && !Y) &&
                                    'undefined' != typeof CSS &&
                                    !this.EDGE &&
                                    !this.TRIDENT),
                                (this.WEBKIT =
                                    this.isBrowser &&
                                    /AppleWebKit/i.test(navigator.userAgent) &&
                                    !this.BLINK &&
                                    !this.EDGE &&
                                    !this.TRIDENT),
                                (this.IOS =
                                    this.isBrowser &&
                                    /iPad|iPhone|iPod/.test(
                                        navigator.userAgent
                                    ) &&
                                    !('MSStream' in window)),
                                (this.FIREFOX =
                                    this.isBrowser &&
                                    /(firefox|minefield)/i.test(
                                        navigator.userAgent
                                    )),
                                (this.ANDROID =
                                    this.isBrowser &&
                                    /android/i.test(navigator.userAgent) &&
                                    !this.TRIDENT),
                                (this.SAFARI =
                                    this.isBrowser &&
                                    /safari/i.test(navigator.userAgent) &&
                                    this.WEBKIT);
                        }
                    }
                    return (
                        (i.ɵfac = function (e) {
                            return new (e || i)(t.LFG(t.Lbi));
                        }),
                        (i.ɵprov = t.Yz7({
                            token: i,
                            factory: i.ɵfac,
                            providedIn: 'root',
                        })),
                        i
                    );
                })(),
                ct = (() => {
                    class i {}
                    return (
                        (i.ɵfac = function (e) {
                            return new (e || i)();
                        }),
                        (i.ɵmod = t.oAB({ type: i })),
                        (i.ɵinj = t.cJS({})),
                        i
                    );
                })();
            function k() {
                if ('object' != typeof document || !document) return 0;
                if (null == V) {
                    const i = document.createElement('div'),
                        o = i.style;
                    (i.dir = 'rtl'),
                        (o.width = '1px'),
                        (o.overflow = 'auto'),
                        (o.visibility = 'hidden'),
                        (o.pointerEvents = 'none'),
                        (o.position = 'absolute');
                    const e = document.createElement('div'),
                        n = e.style;
                    (n.width = '2px'),
                        (n.height = '1px'),
                        i.appendChild(e),
                        document.body.appendChild(i),
                        (V = 0),
                        0 === i.scrollLeft &&
                            ((i.scrollLeft = 1),
                            (V = 0 === i.scrollLeft ? 1 : 2)),
                        i.remove();
                }
                return V;
            }
            const pt = new t.OlP('cdk-dir-doc', {
                    providedIn: 'root',
                    factory: function ft() {
                        return (0, t.f3M)(p.K0);
                    },
                }),
                mt =
                    /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
            let pe = (() => {
                    class i {
                        constructor(e) {
                            if (
                                ((this.value = 'ltr'),
                                (this.change = new t.vpe()),
                                e)
                            ) {
                                const s = e.documentElement
                                    ? e.documentElement.dir
                                    : null;
                                this.value = (function gt(i) {
                                    const o =
                                        (null == i
                                            ? void 0
                                            : i.toLowerCase()) || '';
                                    return 'auto' === o &&
                                        'undefined' != typeof navigator &&
                                        (null == navigator
                                            ? void 0
                                            : navigator.language)
                                        ? mt.test(navigator.language)
                                            ? 'rtl'
                                            : 'ltr'
                                        : 'rtl' === o
                                        ? 'rtl'
                                        : 'ltr';
                                })((e.body ? e.body.dir : null) || s || 'ltr');
                            }
                        }
                        ngOnDestroy() {
                            this.change.complete();
                        }
                    }
                    return (
                        (i.ɵfac = function (e) {
                            return new (e || i)(t.LFG(pt, 8));
                        }),
                        (i.ɵprov = t.Yz7({
                            token: i,
                            factory: i.ɵfac,
                            providedIn: 'root',
                        })),
                        i
                    );
                })(),
                fe = (() => {
                    class i {}
                    return (
                        (i.ɵfac = function (e) {
                            return new (e || i)();
                        }),
                        (i.ɵmod = t.oAB({ type: i })),
                        (i.ɵinj = t.cJS({})),
                        i
                    );
                })();
            class wt extends class _t {} {
                constructor(o) {
                    super(), (this._data = o);
                }
                connect() {
                    return ae(this._data) ? this._data : (0, N.of)(this._data);
                }
                disconnect() {}
            }
            class Ct {
                constructor() {
                    (this.viewCacheSize = 20), (this._viewCache = []);
                }
                applyChanges(o, e, n, s, l) {
                    o.forEachOperation((r, d, c) => {
                        let u, f;
                        null == r.previousIndex
                            ? ((u = this._insertView(
                                  () => n(r, d, c),
                                  c,
                                  e,
                                  s(r)
                              )),
                              (f = u ? 1 : 0))
                            : null == c
                            ? (this._detachAndCacheView(d, e), (f = 3))
                            : ((u = this._moveView(d, c, e, s(r))), (f = 2)),
                            l &&
                                l({
                                    context: null == u ? void 0 : u.context,
                                    operation: f,
                                    record: r,
                                });
                    });
                }
                detach() {
                    for (const o of this._viewCache) o.destroy();
                    this._viewCache = [];
                }
                _insertView(o, e, n, s) {
                    const l = this._insertViewFromCache(e, n);
                    if (l) return void (l.context.$implicit = s);
                    const r = o();
                    return n.createEmbeddedView(
                        r.templateRef,
                        r.context,
                        r.index
                    );
                }
                _detachAndCacheView(o, e) {
                    const n = e.detach(o);
                    this._maybeCacheView(n, e);
                }
                _moveView(o, e, n, s) {
                    const l = n.get(o);
                    return n.move(l, e), (l.context.$implicit = s), l;
                }
                _maybeCacheView(o, e) {
                    if (this._viewCache.length < this.viewCacheSize)
                        this._viewCache.push(o);
                    else {
                        const n = e.indexOf(o);
                        -1 === n ? o.destroy() : e.remove(n);
                    }
                }
                _insertViewFromCache(o, e) {
                    const n = this._viewCache.pop();
                    return n && e.insert(n, o), n || null;
                }
            }
            const me = new t.OlP('_ViewRepeater'),
                yt = ['contentWrapper'],
                xt = ['*'],
                ge = new t.OlP('VIRTUAL_SCROLL_STRATEGY');
            class St {
                constructor(o, e, n) {
                    (this._scrolledIndexChange = new h.x()),
                        (this.scrolledIndexChange =
                            this._scrolledIndexChange.pipe((0, it.x)())),
                        (this._viewport = null),
                        (this._itemSize = o),
                        (this._minBufferPx = e),
                        (this._maxBufferPx = n);
                }
                attach(o) {
                    (this._viewport = o),
                        this._updateTotalContentSize(),
                        this._updateRenderedRange();
                }
                detach() {
                    this._scrolledIndexChange.complete(),
                        (this._viewport = null);
                }
                updateItemAndBufferSize(o, e, n) {
                    (this._itemSize = o),
                        (this._minBufferPx = e),
                        (this._maxBufferPx = n),
                        this._updateTotalContentSize(),
                        this._updateRenderedRange();
                }
                onContentScrolled() {
                    this._updateRenderedRange();
                }
                onDataLengthChanged() {
                    this._updateTotalContentSize(), this._updateRenderedRange();
                }
                onContentRendered() {}
                onRenderedOffsetChanged() {}
                scrollToIndex(o, e) {
                    this._viewport &&
                        this._viewport.scrollToOffset(o * this._itemSize, e);
                }
                _updateTotalContentSize() {
                    !this._viewport ||
                        this._viewport.setTotalContentSize(
                            this._viewport.getDataLength() * this._itemSize
                        );
                }
                _updateRenderedRange() {
                    if (!this._viewport) return;
                    const o = this._viewport.getRenderedRange(),
                        e = { start: o.start, end: o.end },
                        n = this._viewport.getViewportSize(),
                        s = this._viewport.getDataLength();
                    let l = this._viewport.measureScrollOffset(),
                        r = this._itemSize > 0 ? l / this._itemSize : 0;
                    if (e.end > s) {
                        const c = Math.ceil(n / this._itemSize),
                            u = Math.max(0, Math.min(r, s - c));
                        r != u &&
                            ((r = u),
                            (l = u * this._itemSize),
                            (e.start = Math.floor(r))),
                            (e.end = Math.max(0, Math.min(s, e.start + c)));
                    }
                    const d = l - e.start * this._itemSize;
                    if (d < this._minBufferPx && 0 != e.start) {
                        const c = Math.ceil(
                            (this._maxBufferPx - d) / this._itemSize
                        );
                        (e.start = Math.max(0, e.start - c)),
                            (e.end = Math.min(
                                s,
                                Math.ceil(
                                    r + (n + this._minBufferPx) / this._itemSize
                                )
                            ));
                    } else {
                        const c = e.end * this._itemSize - (l + n);
                        if (c < this._minBufferPx && e.end != s) {
                            const u = Math.ceil(
                                (this._maxBufferPx - c) / this._itemSize
                            );
                            u > 0 &&
                                ((e.end = Math.min(s, e.end + u)),
                                (e.start = Math.max(
                                    0,
                                    Math.floor(
                                        r - this._minBufferPx / this._itemSize
                                    )
                                )));
                        }
                    }
                    this._viewport.setRenderedRange(e),
                        this._viewport.setRenderedContentOffset(
                            this._itemSize * e.start
                        ),
                        this._scrolledIndexChange.next(Math.floor(r));
                }
            }
            function Tt(i) {
                return i._scrollStrategy;
            }
            let bt = (() => {
                    class i {
                        constructor() {
                            (this._itemSize = 20),
                                (this._minBufferPx = 100),
                                (this._maxBufferPx = 200),
                                (this._scrollStrategy = new St(
                                    this.itemSize,
                                    this.minBufferPx,
                                    this.maxBufferPx
                                ));
                        }
                        get itemSize() {
                            return this._itemSize;
                        }
                        set itemSize(e) {
                            this._itemSize = D(e);
                        }
                        get minBufferPx() {
                            return this._minBufferPx;
                        }
                        set minBufferPx(e) {
                            this._minBufferPx = D(e);
                        }
                        get maxBufferPx() {
                            return this._maxBufferPx;
                        }
                        set maxBufferPx(e) {
                            this._maxBufferPx = D(e);
                        }
                        ngOnChanges() {
                            this._scrollStrategy.updateItemAndBufferSize(
                                this.itemSize,
                                this.minBufferPx,
                                this.maxBufferPx
                            );
                        }
                    }
                    return (
                        (i.ɵfac = function (e) {
                            return new (e || i)();
                        }),
                        (i.ɵdir = t.lG2({
                            type: i,
                            selectors: [
                                ['cdk-virtual-scroll-viewport', 'itemSize', ''],
                            ],
                            inputs: {
                                itemSize: 'itemSize',
                                minBufferPx: 'minBufferPx',
                                maxBufferPx: 'maxBufferPx',
                            },
                            features: [
                                t._Bn([
                                    {
                                        provide: ge,
                                        useFactory: Tt,
                                        deps: [(0, t.Gpc)(() => i)],
                                    },
                                ]),
                                t.TTD,
                            ],
                        })),
                        i
                    );
                })(),
                _e = (() => {
                    class i {
                        constructor(e, n, s) {
                            (this._ngZone = e),
                                (this._platform = n),
                                (this._scrolled = new h.x()),
                                (this._globalSubscription = null),
                                (this._scrolledCount = 0),
                                (this.scrollContainers = new Map()),
                                (this._document = s);
                        }
                        register(e) {
                            this.scrollContainers.has(e) ||
                                this.scrollContainers.set(
                                    e,
                                    e
                                        .elementScrolled()
                                        .subscribe(() => this._scrolled.next(e))
                                );
                        }
                        deregister(e) {
                            const n = this.scrollContainers.get(e);
                            n &&
                                (n.unsubscribe(),
                                this.scrollContainers.delete(e));
                        }
                        scrolled(e = 20) {
                            return this._platform.isBrowser
                                ? new y.y((n) => {
                                      this._globalSubscription ||
                                          this._addGlobalListener();
                                      const s =
                                          e > 0
                                              ? this._scrolled
                                                    .pipe(U(e))
                                                    .subscribe(n)
                                              : this._scrolled.subscribe(n);
                                      return (
                                          this._scrolledCount++,
                                          () => {
                                              s.unsubscribe(),
                                                  this._scrolledCount--,
                                                  this._scrolledCount ||
                                                      this._removeGlobalListener();
                                          }
                                      );
                                  })
                                : (0, N.of)();
                        }
                        ngOnDestroy() {
                            this._removeGlobalListener(),
                                this.scrollContainers.forEach((e, n) =>
                                    this.deregister(n)
                                ),
                                this._scrolled.complete();
                        }
                        ancestorScrolled(e, n) {
                            const s = this.getAncestorScrollContainers(e);
                            return this.scrolled(n).pipe(
                                (0, P.h)((l) => !l || s.indexOf(l) > -1)
                            );
                        }
                        getAncestorScrollContainers(e) {
                            const n = [];
                            return (
                                this.scrollContainers.forEach((s, l) => {
                                    this._scrollableContainsElement(l, e) &&
                                        n.push(l);
                                }),
                                n
                            );
                        }
                        _getWindow() {
                            return this._document.defaultView || window;
                        }
                        _scrollableContainsElement(e, n) {
                            let s = (function Ve(i) {
                                    return i instanceof t.SBq
                                        ? i.nativeElement
                                        : i;
                                })(n),
                                l = e.getElementRef().nativeElement;
                            do {
                                if (s == l) return !0;
                            } while ((s = s.parentElement));
                            return !1;
                        }
                        _addGlobalListener() {
                            this._globalSubscription =
                                this._ngZone.runOutsideAngular(() =>
                                    L(
                                        this._getWindow().document,
                                        'scroll'
                                    ).subscribe(() => this._scrolled.next())
                                );
                        }
                        _removeGlobalListener() {
                            this._globalSubscription &&
                                (this._globalSubscription.unsubscribe(),
                                (this._globalSubscription = null));
                        }
                    }
                    return (
                        (i.ɵfac = function (e) {
                            return new (e || i)(
                                t.LFG(t.R0b),
                                t.LFG(de),
                                t.LFG(p.K0, 8)
                            );
                        }),
                        (i.ɵprov = t.Yz7({
                            token: i,
                            factory: i.ɵfac,
                            providedIn: 'root',
                        })),
                        i
                    );
                })(),
                ve = (() => {
                    class i {
                        constructor(e, n, s, l) {
                            (this.elementRef = e),
                                (this.scrollDispatcher = n),
                                (this.ngZone = s),
                                (this.dir = l),
                                (this._destroyed = new h.x()),
                                (this._elementScrolled = new y.y((r) =>
                                    this.ngZone.runOutsideAngular(() =>
                                        L(
                                            this.elementRef.nativeElement,
                                            'scroll'
                                        )
                                            .pipe((0, G.R)(this._destroyed))
                                            .subscribe(r)
                                    )
                                ));
                        }
                        ngOnInit() {
                            this.scrollDispatcher.register(this);
                        }
                        ngOnDestroy() {
                            this.scrollDispatcher.deregister(this),
                                this._destroyed.next(),
                                this._destroyed.complete();
                        }
                        elementScrolled() {
                            return this._elementScrolled;
                        }
                        getElementRef() {
                            return this.elementRef;
                        }
                        scrollTo(e) {
                            const n = this.elementRef.nativeElement,
                                s = this.dir && 'rtl' == this.dir.value;
                            null == e.left && (e.left = s ? e.end : e.start),
                                null == e.right &&
                                    (e.right = s ? e.start : e.end),
                                null != e.bottom &&
                                    (e.top =
                                        n.scrollHeight -
                                        n.clientHeight -
                                        e.bottom),
                                s && 0 != k()
                                    ? (null != e.left &&
                                          (e.right =
                                              n.scrollWidth -
                                              n.clientWidth -
                                              e.left),
                                      2 == k()
                                          ? (e.left = e.right)
                                          : 1 == k() &&
                                            (e.left = e.right
                                                ? -e.right
                                                : e.right))
                                    : null != e.right &&
                                      (e.left =
                                          n.scrollWidth -
                                          n.clientWidth -
                                          e.right),
                                this._applyScrollToOptions(e);
                        }
                        _applyScrollToOptions(e) {
                            const n = this.elementRef.nativeElement;
                            !(function dt() {
                                if (null == w) {
                                    if (
                                        'object' != typeof document ||
                                        !document ||
                                        'function' != typeof Element ||
                                        !Element
                                    )
                                        return (w = !1), w;
                                    if (
                                        'scrollBehavior' in
                                        document.documentElement.style
                                    )
                                        w = !0;
                                    else {
                                        const i = Element.prototype.scrollTo;
                                        w =
                                            !!i &&
                                            !/\{\s*\[native code\]\s*\}/.test(
                                                i.toString()
                                            );
                                    }
                                }
                                return w;
                            })()
                                ? (null != e.top && (n.scrollTop = e.top),
                                  null != e.left && (n.scrollLeft = e.left))
                                : n.scrollTo(e);
                        }
                        measureScrollOffset(e) {
                            const n = 'left',
                                s = 'right',
                                l = this.elementRef.nativeElement;
                            if ('top' == e) return l.scrollTop;
                            if ('bottom' == e)
                                return (
                                    l.scrollHeight -
                                    l.clientHeight -
                                    l.scrollTop
                                );
                            const r = this.dir && 'rtl' == this.dir.value;
                            return (
                                'start' == e
                                    ? (e = r ? s : n)
                                    : 'end' == e && (e = r ? n : s),
                                r && 2 == k()
                                    ? e == n
                                        ? l.scrollWidth -
                                          l.clientWidth -
                                          l.scrollLeft
                                        : l.scrollLeft
                                    : r && 1 == k()
                                    ? e == n
                                        ? l.scrollLeft +
                                          l.scrollWidth -
                                          l.clientWidth
                                        : -l.scrollLeft
                                    : e == n
                                    ? l.scrollLeft
                                    : l.scrollWidth -
                                      l.clientWidth -
                                      l.scrollLeft
                            );
                        }
                    }
                    return (
                        (i.ɵfac = function (e) {
                            return new (e || i)(
                                t.Y36(t.SBq),
                                t.Y36(_e),
                                t.Y36(t.R0b),
                                t.Y36(pe, 8)
                            );
                        }),
                        (i.ɵdir = t.lG2({
                            type: i,
                            selectors: [
                                ['', 'cdk-scrollable', ''],
                                ['', 'cdkScrollable', ''],
                            ],
                        })),
                        i
                    );
                })(),
                It = (() => {
                    class i {
                        constructor(e, n, s) {
                            (this._platform = e),
                                (this._change = new h.x()),
                                (this._changeListener = (l) => {
                                    this._change.next(l);
                                }),
                                (this._document = s),
                                n.runOutsideAngular(() => {
                                    if (e.isBrowser) {
                                        const l = this._getWindow();
                                        l.addEventListener(
                                            'resize',
                                            this._changeListener
                                        ),
                                            l.addEventListener(
                                                'orientationchange',
                                                this._changeListener
                                            );
                                    }
                                    this.change().subscribe(
                                        () => (this._viewportSize = null)
                                    );
                                });
                        }
                        ngOnDestroy() {
                            if (this._platform.isBrowser) {
                                const e = this._getWindow();
                                e.removeEventListener(
                                    'resize',
                                    this._changeListener
                                ),
                                    e.removeEventListener(
                                        'orientationchange',
                                        this._changeListener
                                    );
                            }
                            this._change.complete();
                        }
                        getViewportSize() {
                            this._viewportSize || this._updateViewportSize();
                            const e = {
                                width: this._viewportSize.width,
                                height: this._viewportSize.height,
                            };
                            return (
                                this._platform.isBrowser ||
                                    (this._viewportSize = null),
                                e
                            );
                        }
                        getViewportRect() {
                            const e = this.getViewportScrollPosition(),
                                { width: n, height: s } =
                                    this.getViewportSize();
                            return {
                                top: e.top,
                                left: e.left,
                                bottom: e.top + s,
                                right: e.left + n,
                                height: s,
                                width: n,
                            };
                        }
                        getViewportScrollPosition() {
                            if (!this._platform.isBrowser)
                                return { top: 0, left: 0 };
                            const e = this._document,
                                n = this._getWindow(),
                                s = e.documentElement,
                                l = s.getBoundingClientRect();
                            return {
                                top:
                                    -l.top ||
                                    e.body.scrollTop ||
                                    n.scrollY ||
                                    s.scrollTop ||
                                    0,
                                left:
                                    -l.left ||
                                    e.body.scrollLeft ||
                                    n.scrollX ||
                                    s.scrollLeft ||
                                    0,
                            };
                        }
                        change(e = 20) {
                            return e > 0
                                ? this._change.pipe(U(e))
                                : this._change;
                        }
                        _getWindow() {
                            return this._document.defaultView || window;
                        }
                        _updateViewportSize() {
                            const e = this._getWindow();
                            this._viewportSize = this._platform.isBrowser
                                ? { width: e.innerWidth, height: e.innerHeight }
                                : { width: 0, height: 0 };
                        }
                    }
                    return (
                        (i.ɵfac = function (e) {
                            return new (e || i)(
                                t.LFG(de),
                                t.LFG(t.R0b),
                                t.LFG(p.K0, 8)
                            );
                        }),
                        (i.ɵprov = t.Yz7({
                            token: i,
                            factory: i.ɵfac,
                            providedIn: 'root',
                        })),
                        i
                    );
                })();
            const Ot = 'undefined' != typeof requestAnimationFrame ? We : tt;
            let Q = (() => {
                class i extends ve {
                    constructor(e, n, s, l, r, d, c) {
                        super(e, d, s, r),
                            (this.elementRef = e),
                            (this._changeDetectorRef = n),
                            (this._scrollStrategy = l),
                            (this._detachedSubject = new h.x()),
                            (this._renderedRangeSubject = new h.x()),
                            (this._orientation = 'vertical'),
                            (this._appendOnly = !1),
                            (this.scrolledIndexChange = new y.y((u) =>
                                this._scrollStrategy.scrolledIndexChange.subscribe(
                                    (f) =>
                                        Promise.resolve().then(() =>
                                            this.ngZone.run(() => u.next(f))
                                        )
                                )
                            )),
                            (this.renderedRangeStream =
                                this._renderedRangeSubject),
                            (this._totalContentSize = 0),
                            (this._totalContentWidth = ''),
                            (this._totalContentHeight = ''),
                            (this._renderedRange = { start: 0, end: 0 }),
                            (this._dataLength = 0),
                            (this._viewportSize = 0),
                            (this._renderedContentOffset = 0),
                            (this._renderedContentOffsetNeedsRewrite = !1),
                            (this._isChangeDetectionPending = !1),
                            (this._runAfterChangeDetection = []),
                            (this._viewportChanges = se.w0.EMPTY),
                            (this._viewportChanges = c
                                .change()
                                .subscribe(() => {
                                    this.checkViewportSize();
                                }));
                    }
                    get orientation() {
                        return this._orientation;
                    }
                    set orientation(e) {
                        this._orientation !== e &&
                            ((this._orientation = e),
                            this._calculateSpacerSize());
                    }
                    get appendOnly() {
                        return this._appendOnly;
                    }
                    set appendOnly(e) {
                        this._appendOnly = (function Me(i) {
                            return null != i && 'false' != `${i}`;
                        })(e);
                    }
                    ngOnInit() {
                        super.ngOnInit(),
                            this.ngZone.runOutsideAngular(() =>
                                Promise.resolve().then(() => {
                                    this._measureViewportSize(),
                                        this._scrollStrategy.attach(this),
                                        this.elementScrolled()
                                            .pipe((0, O.O)(null), U(0, Ot))
                                            .subscribe(() =>
                                                this._scrollStrategy.onContentScrolled()
                                            ),
                                        this._markChangeDetectionNeeded();
                                })
                            );
                    }
                    ngOnDestroy() {
                        this.detach(),
                            this._scrollStrategy.detach(),
                            this._renderedRangeSubject.complete(),
                            this._detachedSubject.complete(),
                            this._viewportChanges.unsubscribe(),
                            super.ngOnDestroy();
                    }
                    attach(e) {
                        this.ngZone.runOutsideAngular(() => {
                            (this._forOf = e),
                                this._forOf.dataStream
                                    .pipe((0, G.R)(this._detachedSubject))
                                    .subscribe((n) => {
                                        const s = n.length;
                                        s !== this._dataLength &&
                                            ((this._dataLength = s),
                                            this._scrollStrategy.onDataLengthChanged()),
                                            this._doChangeDetection();
                                    });
                        });
                    }
                    detach() {
                        (this._forOf = null), this._detachedSubject.next();
                    }
                    getDataLength() {
                        return this._dataLength;
                    }
                    getViewportSize() {
                        return this._viewportSize;
                    }
                    getRenderedRange() {
                        return this._renderedRange;
                    }
                    setTotalContentSize(e) {
                        this._totalContentSize !== e &&
                            ((this._totalContentSize = e),
                            this._calculateSpacerSize(),
                            this._markChangeDetectionNeeded());
                    }
                    setRenderedRange(e) {
                        (function At(i, o) {
                            return i.start == o.start && i.end == o.end;
                        })(this._renderedRange, e) ||
                            (this.appendOnly &&
                                (e = {
                                    start: 0,
                                    end: Math.max(
                                        this._renderedRange.end,
                                        e.end
                                    ),
                                }),
                            this._renderedRangeSubject.next(
                                (this._renderedRange = e)
                            ),
                            this._markChangeDetectionNeeded(() =>
                                this._scrollStrategy.onContentRendered()
                            ));
                    }
                    getOffsetToRenderedContentStart() {
                        return this._renderedContentOffsetNeedsRewrite
                            ? null
                            : this._renderedContentOffset;
                    }
                    setRenderedContentOffset(e, n = 'to-start') {
                        const l = 'horizontal' == this.orientation,
                            r = l ? 'X' : 'Y';
                        let c = `translate${r}(${Number(
                            (l && this.dir && 'rtl' == this.dir.value
                                ? -1
                                : 1) * e
                        )}px)`;
                        (this._renderedContentOffset = e),
                            'to-end' === n &&
                                ((c += ` translate${r}(-100%)`),
                                (this._renderedContentOffsetNeedsRewrite = !0)),
                            this._renderedContentTransform != c &&
                                ((this._renderedContentTransform = c),
                                this._markChangeDetectionNeeded(() => {
                                    this._renderedContentOffsetNeedsRewrite
                                        ? ((this._renderedContentOffset -=
                                              this.measureRenderedContentSize()),
                                          (this._renderedContentOffsetNeedsRewrite =
                                              !1),
                                          this.setRenderedContentOffset(
                                              this._renderedContentOffset
                                          ))
                                        : this._scrollStrategy.onRenderedOffsetChanged();
                                }));
                    }
                    scrollToOffset(e, n = 'auto') {
                        const s = { behavior: n };
                        'horizontal' === this.orientation
                            ? (s.start = e)
                            : (s.top = e),
                            this.scrollTo(s);
                    }
                    scrollToIndex(e, n = 'auto') {
                        this._scrollStrategy.scrollToIndex(e, n);
                    }
                    measureScrollOffset(e) {
                        return super.measureScrollOffset(
                            e ||
                                ('horizontal' === this.orientation
                                    ? 'start'
                                    : 'top')
                        );
                    }
                    measureRenderedContentSize() {
                        const e = this._contentWrapper.nativeElement;
                        return 'horizontal' === this.orientation
                            ? e.offsetWidth
                            : e.offsetHeight;
                    }
                    measureRangeSize(e) {
                        return this._forOf
                            ? this._forOf.measureRangeSize(e, this.orientation)
                            : 0;
                    }
                    checkViewportSize() {
                        this._measureViewportSize(),
                            this._scrollStrategy.onDataLengthChanged();
                    }
                    _measureViewportSize() {
                        const e = this.elementRef.nativeElement;
                        this._viewportSize =
                            'horizontal' === this.orientation
                                ? e.clientWidth
                                : e.clientHeight;
                    }
                    _markChangeDetectionNeeded(e) {
                        e && this._runAfterChangeDetection.push(e),
                            this._isChangeDetectionPending ||
                                ((this._isChangeDetectionPending = !0),
                                this.ngZone.runOutsideAngular(() =>
                                    Promise.resolve().then(() => {
                                        this._doChangeDetection();
                                    })
                                ));
                    }
                    _doChangeDetection() {
                        (this._isChangeDetectionPending = !1),
                            (this._contentWrapper.nativeElement.style.transform =
                                this._renderedContentTransform),
                            this.ngZone.run(() =>
                                this._changeDetectorRef.markForCheck()
                            );
                        const e = this._runAfterChangeDetection;
                        this._runAfterChangeDetection = [];
                        for (const n of e) n();
                    }
                    _calculateSpacerSize() {
                        (this._totalContentHeight =
                            'horizontal' === this.orientation
                                ? ''
                                : `${this._totalContentSize}px`),
                            (this._totalContentWidth =
                                'horizontal' === this.orientation
                                    ? `${this._totalContentSize}px`
                                    : '');
                    }
                }
                return (
                    (i.ɵfac = function (e) {
                        return new (e || i)(
                            t.Y36(t.SBq),
                            t.Y36(t.sBO),
                            t.Y36(t.R0b),
                            t.Y36(ge, 8),
                            t.Y36(pe, 8),
                            t.Y36(_e),
                            t.Y36(It)
                        );
                    }),
                    (i.ɵcmp = t.Xpm({
                        type: i,
                        selectors: [['cdk-virtual-scroll-viewport']],
                        viewQuery: function (e, n) {
                            if ((1 & e && t.Gf(yt, 7), 2 & e)) {
                                let s;
                                t.iGM((s = t.CRH())) &&
                                    (n._contentWrapper = s.first);
                            }
                        },
                        hostAttrs: [1, 'cdk-virtual-scroll-viewport'],
                        hostVars: 4,
                        hostBindings: function (e, n) {
                            2 & e &&
                                t.ekj(
                                    'cdk-virtual-scroll-orientation-horizontal',
                                    'horizontal' === n.orientation
                                )(
                                    'cdk-virtual-scroll-orientation-vertical',
                                    'horizontal' !== n.orientation
                                );
                        },
                        inputs: {
                            orientation: 'orientation',
                            appendOnly: 'appendOnly',
                        },
                        outputs: { scrolledIndexChange: 'scrolledIndexChange' },
                        features: [
                            t._Bn([{ provide: ve, useExisting: i }]),
                            t.qOj,
                        ],
                        ngContentSelectors: xt,
                        decls: 4,
                        vars: 4,
                        consts: [
                            [1, 'cdk-virtual-scroll-content-wrapper'],
                            ['contentWrapper', ''],
                            [1, 'cdk-virtual-scroll-spacer'],
                        ],
                        template: function (e, n) {
                            1 & e &&
                                (t.F$t(),
                                t.TgZ(0, 'div', 0, 1),
                                t.Hsn(2),
                                t.qZA(),
                                t._UZ(3, 'div', 2)),
                                2 & e &&
                                    (t.xp6(3),
                                    t.Udp('width', n._totalContentWidth)(
                                        'height',
                                        n._totalContentHeight
                                    ));
                        },
                        styles: [
                            'cdk-virtual-scroll-viewport{display:block;position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;-webkit-overflow-scrolling:touch}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0}[dir=rtl] .cdk-virtual-scroll-spacer{right:0;left:auto;transform-origin:100% 0}\n',
                        ],
                        encapsulation: 2,
                        changeDetection: 0,
                    })),
                    i
                );
            })();
            function we(i, o, e) {
                if (!e.getBoundingClientRect) return 0;
                const s = e.getBoundingClientRect();
                return 'horizontal' === i
                    ? 'start' === o
                        ? s.left
                        : s.right
                    : 'start' === o
                    ? s.top
                    : s.bottom;
            }
            let Rt = (() => {
                    class i {
                        constructor(e, n, s, l, r, d) {
                            (this._viewContainerRef = e),
                                (this._template = n),
                                (this._differs = s),
                                (this._viewRepeater = l),
                                (this._viewport = r),
                                (this.viewChange = new h.x()),
                                (this._dataSourceChanges = new h.x()),
                                (this.dataStream = this._dataSourceChanges.pipe(
                                    (0, O.O)(null),
                                    (function rt() {
                                        return (0, ue.e)((i, o) => {
                                            let e,
                                                n = !1;
                                            i.subscribe(
                                                new H.Q(o, (s) => {
                                                    const l = e;
                                                    (e = s),
                                                        n && o.next([l, s]),
                                                        (n = !0);
                                                })
                                            );
                                        });
                                    })(),
                                    (0, X.w)(([c, u]) =>
                                        this._changeDataSource(c, u)
                                    ),
                                    (0, at.d)(1)
                                )),
                                (this._differ = null),
                                (this._needsUpdate = !1),
                                (this._destroyed = new h.x()),
                                this.dataStream.subscribe((c) => {
                                    (this._data = c),
                                        this._onRenderedDataChange();
                                }),
                                this._viewport.renderedRangeStream
                                    .pipe((0, G.R)(this._destroyed))
                                    .subscribe((c) => {
                                        (this._renderedRange = c),
                                            d.run(() =>
                                                this.viewChange.next(
                                                    this._renderedRange
                                                )
                                            ),
                                            this._onRenderedDataChange();
                                    }),
                                this._viewport.attach(this);
                        }
                        get cdkVirtualForOf() {
                            return this._cdkVirtualForOf;
                        }
                        set cdkVirtualForOf(e) {
                            (this._cdkVirtualForOf = e),
                                (function vt(i) {
                                    return i && 'function' == typeof i.connect;
                                })(e)
                                    ? this._dataSourceChanges.next(e)
                                    : this._dataSourceChanges.next(
                                          new wt(
                                              ae(e) ? e : Array.from(e || [])
                                          )
                                      );
                        }
                        get cdkVirtualForTrackBy() {
                            return this._cdkVirtualForTrackBy;
                        }
                        set cdkVirtualForTrackBy(e) {
                            (this._needsUpdate = !0),
                                (this._cdkVirtualForTrackBy = e
                                    ? (n, s) =>
                                          e(
                                              n +
                                                  (this._renderedRange
                                                      ? this._renderedRange
                                                            .start
                                                      : 0),
                                              s
                                          )
                                    : void 0);
                        }
                        set cdkVirtualForTemplate(e) {
                            e &&
                                ((this._needsUpdate = !0),
                                (this._template = e));
                        }
                        get cdkVirtualForTemplateCacheSize() {
                            return this._viewRepeater.viewCacheSize;
                        }
                        set cdkVirtualForTemplateCacheSize(e) {
                            this._viewRepeater.viewCacheSize = D(e);
                        }
                        measureRangeSize(e, n) {
                            if (e.start >= e.end) return 0;
                            const s = e.start - this._renderedRange.start,
                                l = e.end - e.start;
                            let r, d;
                            for (let c = 0; c < l; c++) {
                                const u = this._viewContainerRef.get(c + s);
                                if (u && u.rootNodes.length) {
                                    r = d = u.rootNodes[0];
                                    break;
                                }
                            }
                            for (let c = l - 1; c > -1; c--) {
                                const u = this._viewContainerRef.get(c + s);
                                if (u && u.rootNodes.length) {
                                    d = u.rootNodes[u.rootNodes.length - 1];
                                    break;
                                }
                            }
                            return r && d
                                ? we(n, 'end', d) - we(n, 'start', r)
                                : 0;
                        }
                        ngDoCheck() {
                            if (this._differ && this._needsUpdate) {
                                const e = this._differ.diff(
                                    this._renderedItems
                                );
                                e
                                    ? this._applyChanges(e)
                                    : this._updateContext(),
                                    (this._needsUpdate = !1);
                            }
                        }
                        ngOnDestroy() {
                            this._viewport.detach(),
                                this._dataSourceChanges.next(void 0),
                                this._dataSourceChanges.complete(),
                                this.viewChange.complete(),
                                this._destroyed.next(),
                                this._destroyed.complete(),
                                this._viewRepeater.detach();
                        }
                        _onRenderedDataChange() {
                            !this._renderedRange ||
                                ((this._renderedItems = this._data.slice(
                                    this._renderedRange.start,
                                    this._renderedRange.end
                                )),
                                this._differ ||
                                    (this._differ = this._differs
                                        .find(this._renderedItems)
                                        .create((e, n) =>
                                            this.cdkVirtualForTrackBy
                                                ? this.cdkVirtualForTrackBy(
                                                      e,
                                                      n
                                                  )
                                                : n
                                        )),
                                (this._needsUpdate = !0));
                        }
                        _changeDataSource(e, n) {
                            return (
                                e && e.disconnect(this),
                                (this._needsUpdate = !0),
                                n ? n.connect(this) : (0, N.of)()
                            );
                        }
                        _updateContext() {
                            const e = this._data.length;
                            let n = this._viewContainerRef.length;
                            for (; n--; ) {
                                const s = this._viewContainerRef.get(n);
                                (s.context.index =
                                    this._renderedRange.start + n),
                                    (s.context.count = e),
                                    this._updateComputedContextProperties(
                                        s.context
                                    ),
                                    s.detectChanges();
                            }
                        }
                        _applyChanges(e) {
                            this._viewRepeater.applyChanges(
                                e,
                                this._viewContainerRef,
                                (l, r, d) => this._getEmbeddedViewArgs(l, d),
                                (l) => l.item
                            ),
                                e.forEachIdentityChange((l) => {
                                    this._viewContainerRef.get(
                                        l.currentIndex
                                    ).context.$implicit = l.item;
                                });
                            const n = this._data.length;
                            let s = this._viewContainerRef.length;
                            for (; s--; ) {
                                const l = this._viewContainerRef.get(s);
                                (l.context.index =
                                    this._renderedRange.start + s),
                                    (l.context.count = n),
                                    this._updateComputedContextProperties(
                                        l.context
                                    );
                            }
                        }
                        _updateComputedContextProperties(e) {
                            (e.first = 0 === e.index),
                                (e.last = e.index === e.count - 1),
                                (e.even = e.index % 2 == 0),
                                (e.odd = !e.even);
                        }
                        _getEmbeddedViewArgs(e, n) {
                            return {
                                templateRef: this._template,
                                context: {
                                    $implicit: e.item,
                                    cdkVirtualForOf: this._cdkVirtualForOf,
                                    index: -1,
                                    count: -1,
                                    first: !1,
                                    last: !1,
                                    odd: !1,
                                    even: !1,
                                },
                                index: n,
                            };
                        }
                    }
                    return (
                        (i.ɵfac = function (e) {
                            return new (e || i)(
                                t.Y36(t.s_b),
                                t.Y36(t.Rgc),
                                t.Y36(t.ZZ4),
                                t.Y36(me),
                                t.Y36(Q, 4),
                                t.Y36(t.R0b)
                            );
                        }),
                        (i.ɵdir = t.lG2({
                            type: i,
                            selectors: [
                                [
                                    '',
                                    'cdkVirtualFor',
                                    '',
                                    'cdkVirtualForOf',
                                    '',
                                ],
                            ],
                            inputs: {
                                cdkVirtualForOf: 'cdkVirtualForOf',
                                cdkVirtualForTrackBy: 'cdkVirtualForTrackBy',
                                cdkVirtualForTemplate: 'cdkVirtualForTemplate',
                                cdkVirtualForTemplateCacheSize:
                                    'cdkVirtualForTemplateCacheSize',
                            },
                            features: [t._Bn([{ provide: me, useClass: Ct }])],
                        })),
                        i
                    );
                })(),
                Ce = (() => {
                    class i {}
                    return (
                        (i.ɵfac = function (e) {
                            return new (e || i)();
                        }),
                        (i.ɵmod = t.oAB({ type: i })),
                        (i.ɵinj = t.cJS({})),
                        i
                    );
                })(),
                ye = (() => {
                    class i {}
                    return (
                        (i.ɵfac = function (e) {
                            return new (e || i)();
                        }),
                        (i.ɵmod = t.oAB({ type: i })),
                        (i.ɵinj = t.cJS({ imports: [[fe, ct, Ce], fe, Ce] })),
                        i
                    );
                })();
            const Dt = ['container'],
                Lt = ['in'],
                Mt = ['multiIn'],
                Ft = ['multiContainer'],
                Vt = ['ddBtn'],
                zt = function (i, o) {
                    return { 'p-autocomplete-dd-input': i, 'p-disabled': o };
                };
            function Bt(i, o) {
                if (1 & i) {
                    const e = t.EpF();
                    t.TgZ(0, 'input', 7, 8),
                        t.NdJ('click', function (s) {
                            return t.CHM(e), t.oxw().onInputClick(s);
                        })('input', function (s) {
                            return t.CHM(e), t.oxw().onInput(s);
                        })('keydown', function (s) {
                            return t.CHM(e), t.oxw().onKeydown(s);
                        })('keyup', function (s) {
                            return t.CHM(e), t.oxw().onKeyup(s);
                        })('focus', function (s) {
                            return t.CHM(e), t.oxw().onInputFocus(s);
                        })('blur', function (s) {
                            return t.CHM(e), t.oxw().onInputBlur(s);
                        })('change', function (s) {
                            return t.CHM(e), t.oxw().onInputChange(s);
                        })('paste', function (s) {
                            return t.CHM(e), t.oxw().onInputPaste(s);
                        }),
                        t.qZA();
                }
                if (2 & i) {
                    const e = t.oxw();
                    t.Tol(e.inputStyleClass),
                        t.Q6J('ngStyle', e.inputStyle)(
                            'autocomplete',
                            e.autocomplete
                        )('ngClass', t.WLB(23, zt, e.dropdown, e.disabled))(
                            'value',
                            e.inputFieldValue
                        )('readonly', e.readonly)('disabled', e.disabled),
                        t.uIk('type', e.type)('id', e.inputId)(
                            'required',
                            e.required
                        )('name', e.name)('aria-controls', e.listId)(
                            'aria-expanded',
                            e.overlayVisible
                        )('aria-activedescendant', 'p-highlighted-option')(
                            'autofocus',
                            e.autofocus
                        )('placeholder', e.placeholder)('size', e.size)(
                            'maxlength',
                            e.maxlength
                        )('tabindex', e.tabindex)('aria-label', e.ariaLabel)(
                            'aria-labelledby',
                            e.ariaLabelledBy
                        )('aria-required', e.required);
                }
            }
            function Pt(i, o) {
                1 & i && t.GkF(0);
            }
            function Nt(i, o) {
                if (
                    (1 & i && (t.TgZ(0, 'span', 20), t._uU(1), t.qZA()), 2 & i)
                ) {
                    const e = t.oxw().$implicit,
                        n = t.oxw(2);
                    t.xp6(1), t.Oqu(n.resolveFieldData(e));
                }
            }
            function Zt(i, o) {
                if (1 & i) {
                    const e = t.EpF();
                    t.TgZ(0, 'span', 21),
                        t.NdJ('click', function () {
                            t.CHM(e), t.oxw();
                            const s = t.MAs(1);
                            return t.oxw(2).removeItem(s);
                        }),
                        t.qZA();
                }
            }
            const z = function (i) {
                return { $implicit: i };
            };
            function Ht(i, o) {
                if (
                    (1 & i &&
                        (t.TgZ(0, 'li', 15, 16),
                        t.YNc(2, Pt, 1, 0, 'ng-container', 17),
                        t.YNc(3, Nt, 2, 1, 'span', 18),
                        t.YNc(4, Zt, 1, 0, 'span', 19),
                        t.qZA()),
                    2 & i)
                ) {
                    const e = o.$implicit,
                        n = t.oxw(2);
                    t.xp6(2),
                        t.Q6J('ngTemplateOutlet', n.selectedItemTemplate)(
                            'ngTemplateOutletContext',
                            t.VKq(4, z, e)
                        ),
                        t.xp6(1),
                        t.Q6J('ngIf', !n.selectedItemTemplate),
                        t.xp6(1),
                        t.Q6J('ngIf', !n.disabled && !n.readonly);
                }
            }
            const Ut = function (i, o) {
                return { 'p-disabled': i, 'p-focus': o };
            };
            function Gt(i, o) {
                if (1 & i) {
                    const e = t.EpF();
                    t.TgZ(0, 'ul', 9, 10),
                        t.NdJ('click', function () {
                            return t.CHM(e), t.MAs(5).focus();
                        }),
                        t.YNc(2, Ht, 5, 6, 'li', 11),
                        t.TgZ(3, 'li', 12),
                        t.TgZ(4, 'input', 13, 14),
                        t.NdJ('input', function (s) {
                            return t.CHM(e), t.oxw().onInput(s);
                        })('click', function (s) {
                            return t.CHM(e), t.oxw().onInputClick(s);
                        })('keydown', function (s) {
                            return t.CHM(e), t.oxw().onKeydown(s);
                        })('keyup', function (s) {
                            return t.CHM(e), t.oxw().onKeyup(s);
                        })('focus', function (s) {
                            return t.CHM(e), t.oxw().onInputFocus(s);
                        })('blur', function (s) {
                            return t.CHM(e), t.oxw().onInputBlur(s);
                        })('change', function (s) {
                            return t.CHM(e), t.oxw().onInputChange(s);
                        })('paste', function (s) {
                            return t.CHM(e), t.oxw().onInputPaste(s);
                        }),
                        t.qZA(),
                        t.qZA(),
                        t.qZA();
                }
                if (2 & i) {
                    const e = t.oxw();
                    t.Q6J('ngClass', t.WLB(20, Ut, e.disabled, e.focus)),
                        t.xp6(2),
                        t.Q6J('ngForOf', e.value),
                        t.xp6(2),
                        t.Tol(e.inputStyleClass),
                        t.Q6J('disabled', e.disabled)('readonly', e.readonly)(
                            'autocomplete',
                            e.autocomplete
                        )('ngStyle', e.inputStyle),
                        t.uIk('type', e.type)('id', e.inputId)(
                            'placeholder',
                            e.value && e.value.length ? null : e.placeholder
                        )('tabindex', e.tabindex)('maxlength', e.maxlength)(
                            'autofocus',
                            e.autofocus
                        )('aria-label', e.ariaLabel)(
                            'aria-labelledby',
                            e.ariaLabelledBy
                        )('aria-required', e.required)(
                            'aria-controls',
                            e.listId
                        )('aria-expanded', e.overlayVisible)(
                            'aria-activedescendant',
                            'p-highlighted-option'
                        );
                }
            }
            function Yt(i, o) {
                1 & i && t._UZ(0, 'i', 22);
            }
            function Jt(i, o) {
                if (1 & i) {
                    const e = t.EpF();
                    t.TgZ(0, 'button', 23, 24),
                        t.NdJ('click', function (s) {
                            return t.CHM(e), t.oxw().handleDropdownClick(s);
                        }),
                        t.qZA();
                }
                if (2 & i) {
                    const e = t.oxw();
                    t.Q6J('icon', e.dropdownIcon)('disabled', e.disabled),
                        t.uIk('aria-label', e.dropdownAriaLabel)(
                            'tabindex',
                            e.tabindex
                        );
                }
            }
            function Qt(i, o) {
                1 & i && t.GkF(0);
            }
            function Wt(i, o) {
                if ((1 & i && (t.TgZ(0, 'span'), t._uU(1), t.qZA()), 2 & i)) {
                    const e = t.oxw().$implicit,
                        n = t.oxw(3);
                    t.xp6(1), t.Oqu(n.getOptionGroupLabel(e) || 'empty');
                }
            }
            function $t(i, o) {
                1 & i && t.GkF(0);
            }
            function qt(i, o) {
                1 & i && t.GkF(0);
            }
            function Kt(i, o) {
                if (
                    (1 & i &&
                        (t.TgZ(0, 'li', 32),
                        t.YNc(1, Wt, 2, 1, 'span', 29),
                        t.YNc(2, $t, 1, 0, 'ng-container', 17),
                        t.qZA(),
                        t.YNc(3, qt, 1, 0, 'ng-container', 17)),
                    2 & i)
                ) {
                    const e = o.$implicit;
                    t.oxw(2);
                    const n = t.MAs(7),
                        s = t.oxw();
                    t.xp6(1),
                        t.Q6J('ngIf', !s.groupTemplate),
                        t.xp6(1),
                        t.Q6J('ngTemplateOutlet', s.groupTemplate)(
                            'ngTemplateOutletContext',
                            t.VKq(5, z, e)
                        ),
                        t.xp6(1),
                        t.Q6J('ngTemplateOutlet', n)(
                            'ngTemplateOutletContext',
                            t.VKq(7, z, s.getOptionGroupChildren(e))
                        );
                }
            }
            function jt(i, o) {
                if (
                    (1 & i &&
                        (t.ynx(0),
                        t.YNc(1, Kt, 4, 9, 'ng-template', 31),
                        t.BQk()),
                    2 & i)
                ) {
                    const e = t.oxw(2);
                    t.xp6(1), t.Q6J('ngForOf', e.suggestions);
                }
            }
            function Xt(i, o) {
                1 & i && t.GkF(0);
            }
            function ei(i, o) {
                if (
                    (1 & i &&
                        (t.ynx(0),
                        t.YNc(1, Xt, 1, 0, 'ng-container', 17),
                        t.BQk()),
                    2 & i)
                ) {
                    t.oxw();
                    const e = t.MAs(7),
                        n = t.oxw();
                    t.xp6(1),
                        t.Q6J('ngTemplateOutlet', e)(
                            'ngTemplateOutletContext',
                            t.VKq(2, z, n.suggestions)
                        );
                }
            }
            function ti(i, o) {
                if ((1 & i && (t.TgZ(0, 'span'), t._uU(1), t.qZA()), 2 & i)) {
                    const e = t.oxw().$implicit,
                        n = t.oxw(4);
                    t.xp6(1), t.Oqu(n.resolveFieldData(e));
                }
            }
            function ii(i, o) {
                1 & i && t.GkF(0);
            }
            const xe = function (i) {
                    return { 'p-highlight': i };
                },
                Se = function (i, o) {
                    return { $implicit: i, index: o };
                };
            function ni(i, o) {
                if (1 & i) {
                    const e = t.EpF();
                    t.TgZ(0, 'li', 37),
                        t.NdJ('click', function () {
                            const l = t.CHM(e).$implicit;
                            return t.oxw(4).selectItem(l);
                        }),
                        t.YNc(1, ti, 2, 1, 'span', 29),
                        t.YNc(2, ii, 1, 0, 'ng-container', 17),
                        t.qZA();
                }
                if (2 & i) {
                    const e = o.$implicit,
                        n = o.index,
                        s = t.oxw(4);
                    t.Q6J('ngClass', t.VKq(5, xe, e === s.highlightOption))(
                        'id',
                        s.highlightOption == e ? 'p-highlighted-option' : ''
                    ),
                        t.xp6(1),
                        t.Q6J('ngIf', !s.itemTemplate),
                        t.xp6(1),
                        t.Q6J('ngTemplateOutlet', s.itemTemplate)(
                            'ngTemplateOutletContext',
                            t.WLB(7, Se, e, n)
                        );
                }
            }
            function oi(i, o) {
                if (
                    (1 & i &&
                        (t.ynx(0), t.YNc(1, ni, 3, 10, 'li', 36), t.BQk()),
                    2 & i)
                ) {
                    const e = t.oxw().$implicit;
                    t.xp6(1), t.Q6J('ngForOf', e);
                }
            }
            function si(i, o) {
                if ((1 & i && (t.TgZ(0, 'span'), t._uU(1), t.qZA()), 2 & i)) {
                    const e = t.oxw().$implicit,
                        n = t.oxw(5);
                    t.xp6(1), t.Oqu(n.resolveFieldData(e));
                }
            }
            function li(i, o) {
                1 & i && t.GkF(0);
            }
            const Te = function (i) {
                return { height: i };
            };
            function ri(i, o) {
                if (1 & i) {
                    const e = t.EpF();
                    t.ynx(0),
                        t.TgZ(1, 'li', 41),
                        t.NdJ('click', function () {
                            const l = t.CHM(e).$implicit;
                            return t.oxw(5).selectItem(l);
                        }),
                        t.YNc(2, si, 2, 1, 'span', 29),
                        t.YNc(3, li, 1, 0, 'ng-container', 17),
                        t.qZA(),
                        t.BQk();
                }
                if (2 & i) {
                    const e = o.$implicit,
                        n = o.index,
                        s = t.oxw(5);
                    t.xp6(1),
                        t.Q6J('ngClass', t.VKq(6, xe, e === s.highlightOption))(
                            'ngStyle',
                            t.VKq(8, Te, s.itemSize + 'px')
                        )(
                            'id',
                            s.highlightOption == e ? 'p-highlighted-option' : ''
                        ),
                        t.xp6(1),
                        t.Q6J('ngIf', !s.itemTemplate),
                        t.xp6(1),
                        t.Q6J('ngTemplateOutlet', s.itemTemplate)(
                            'ngTemplateOutletContext',
                            t.WLB(10, Se, e, n)
                        );
                }
            }
            function ai(i, o) {
                if (
                    (1 & i &&
                        (t.TgZ(0, 'cdk-virtual-scroll-viewport', 39),
                        t.YNc(1, ri, 4, 13, 'ng-container', 40),
                        t.qZA()),
                    2 & i)
                ) {
                    const e = t.oxw(2).$implicit,
                        n = t.oxw(2);
                    t.Q6J('ngStyle', t.VKq(3, Te, n.scrollHeight))(
                        'itemSize',
                        n.itemSize
                    ),
                        t.xp6(1),
                        t.Q6J('cdkVirtualForOf', e);
                }
            }
            function ci(i, o) {
                if (
                    (1 & i &&
                        t.YNc(0, ai, 2, 5, 'cdk-virtual-scroll-viewport', 38),
                    2 & i)
                ) {
                    const e = t.oxw(3);
                    t.Q6J('ngIf', e.virtualScroll && !e.noResults);
                }
            }
            function ui(i, o) {
                if ((1 & i && (t.ynx(0), t._uU(1), t.BQk()), 2 & i)) {
                    const e = t.oxw(4);
                    t.xp6(1), t.hij(' ', e.emptyMessageLabel, ' ');
                }
            }
            function di(i, o) {
                1 & i && t.GkF(0, null, 43);
            }
            function hi(i, o) {
                if (
                    (1 & i &&
                        (t.TgZ(0, 'li', 42),
                        t.YNc(1, ui, 2, 1, 'ng-container', 33),
                        t.YNc(2, di, 2, 0, 'ng-container', 27),
                        t.qZA()),
                    2 & i)
                ) {
                    const e = t.oxw(3);
                    t.xp6(1),
                        t.Q6J('ngIf', !e.emptyTemplate)('ngIfElse', e.empty),
                        t.xp6(1),
                        t.Q6J('ngTemplateOutlet', e.emptyTemplate);
                }
            }
            function pi(i, o) {
                if (
                    (1 & i &&
                        (t.YNc(0, oi, 2, 1, 'ng-container', 33),
                        t.YNc(1, ci, 1, 1, 'ng-template', null, 34, t.W1O),
                        t.YNc(3, hi, 3, 3, 'li', 35)),
                    2 & i)
                ) {
                    const e = t.MAs(2),
                        n = t.oxw(2);
                    t.Q6J('ngIf', !n.virtualScroll)('ngIfElse', e),
                        t.xp6(3),
                        t.Q6J('ngIf', n.noResults && n.showEmptyMessage);
                }
            }
            function fi(i, o) {
                1 & i && t.GkF(0);
            }
            const mi = function () {
                    return ['p-autocomplete-panel p-component'];
                },
                gi = function (i, o) {
                    return { showTransitionParams: i, hideTransitionParams: o };
                },
                _i = function (i) {
                    return { value: 'visible', params: i };
                },
                vi = function (i) {
                    return { 'p-autocomplete-virtualscroll': i };
                };
            function wi(i, o) {
                if (1 & i) {
                    const e = t.EpF();
                    t.TgZ(0, 'div', 25, 26),
                        t.NdJ('click', function (s) {
                            return t.CHM(e), t.oxw().onOverlayClick(s);
                        })('@overlayAnimation.start', function (s) {
                            return t.CHM(e), t.oxw().onOverlayAnimationStart(s);
                        })('@overlayAnimation.done', function (s) {
                            return t.CHM(e), t.oxw().onOverlayAnimationEnd(s);
                        }),
                        t.YNc(2, Qt, 1, 0, 'ng-container', 27),
                        t.TgZ(3, 'ul', 28),
                        t.YNc(4, jt, 2, 1, 'ng-container', 29),
                        t.YNc(5, ei, 2, 4, 'ng-container', 29),
                        t.YNc(6, pi, 4, 3, 'ng-template', null, 30, t.W1O),
                        t.qZA(),
                        t.YNc(8, fi, 1, 0, 'ng-container', 27),
                        t.qZA();
                }
                if (2 & i) {
                    const e = t.oxw();
                    t.Tol(e.panelStyleClass),
                        t.Udp(
                            'max-height',
                            e.virtualScroll ? 'auto' : e.scrollHeight
                        ),
                        t.Q6J('ngClass', t.DdM(13, mi))(
                            'ngStyle',
                            e.panelStyle
                        )(
                            '@overlayAnimation',
                            t.VKq(
                                17,
                                _i,
                                t.WLB(
                                    14,
                                    gi,
                                    e.showTransitionOptions,
                                    e.hideTransitionOptions
                                )
                            )
                        ),
                        t.xp6(2),
                        t.Q6J('ngTemplateOutlet', e.headerTemplate),
                        t.xp6(1),
                        t.Q6J('ngClass', t.VKq(19, vi, e.virtualScroll)),
                        t.uIk('id', e.listId),
                        t.xp6(1),
                        t.Q6J('ngIf', e.group),
                        t.xp6(1),
                        t.Q6J('ngIf', !e.group),
                        t.xp6(3),
                        t.Q6J('ngTemplateOutlet', e.footerTemplate);
                }
            }
            const Ci = function (i, o) {
                    return {
                        'p-autocomplete p-component': !0,
                        'p-autocomplete-dd': i,
                        'p-autocomplete-multiple': o,
                    };
                },
                yi = {
                    provide: Le.JU,
                    useExisting: (0, t.Gpc)(() => be),
                    multi: !0,
                };
            let be = (() => {
                    class i {
                        constructor(e, n, s, l, r, d) {
                            (this.el = e),
                                (this.renderer = n),
                                (this.cd = s),
                                (this.differs = l),
                                (this.config = r),
                                (this.overlayService = d),
                                (this.minLength = 1),
                                (this.delay = 300),
                                (this.type = 'text'),
                                (this.autoZIndex = !0),
                                (this.baseZIndex = 0),
                                (this.dropdownIcon = 'pi pi-chevron-down'),
                                (this.unique = !0),
                                (this.completeOnFocus = !1),
                                (this.completeMethod = new t.vpe()),
                                (this.onSelect = new t.vpe()),
                                (this.onUnselect = new t.vpe()),
                                (this.onFocus = new t.vpe()),
                                (this.onBlur = new t.vpe()),
                                (this.onDropdownClick = new t.vpe()),
                                (this.onClear = new t.vpe()),
                                (this.onKeyUp = new t.vpe()),
                                (this.onShow = new t.vpe()),
                                (this.onHide = new t.vpe()),
                                (this.scrollHeight = '200px'),
                                (this.dropdownMode = 'blank'),
                                (this.showTransitionOptions =
                                    '.12s cubic-bezier(0, 0, 0.2, 1)'),
                                (this.hideTransitionOptions = '.1s linear'),
                                (this.autocomplete = 'off'),
                                (this.onModelChange = () => {}),
                                (this.onModelTouched = () => {}),
                                (this.overlayVisible = !1),
                                (this.focus = !1),
                                (this.inputFieldValue = null),
                                (this.differ = l.find([]).create(null)),
                                (this.listId = (0, g.Th)() + '_list');
                        }
                        get suggestions() {
                            return this._suggestions;
                        }
                        set suggestions(e) {
                            (this._suggestions = e),
                                this.handleSuggestionsChange();
                        }
                        ngAfterViewChecked() {
                            this.suggestionsUpdated &&
                                this.overlay &&
                                this.overlay.offsetParent &&
                                (setTimeout(() => {
                                    this.overlay && this.alignOverlay();
                                }, 1),
                                (this.suggestionsUpdated = !1)),
                                this.highlightOptionChanged &&
                                    (setTimeout(() => {
                                        if (this.overlay && this.itemsWrapper) {
                                            let e = m.p.findSingle(
                                                this.overlay,
                                                'li.p-highlight'
                                            );
                                            if (
                                                (e &&
                                                    m.p.scrollInView(
                                                        this.itemsWrapper,
                                                        e
                                                    ),
                                                this.virtualScroll &&
                                                    this.viewPort)
                                            ) {
                                                let n =
                                                    this.viewPort.getRenderedRange();
                                                this.updateVirtualScrollSelectedIndex(),
                                                    (n.start >
                                                        this
                                                            .virtualScrollSelectedIndex ||
                                                        n.end <
                                                            this
                                                                .virtualScrollSelectedIndex) &&
                                                        this.viewPort.scrollToIndex(
                                                            this
                                                                .virtualScrollSelectedIndex
                                                        );
                                            }
                                        }
                                    }, 1),
                                    (this.highlightOptionChanged = !1));
                        }
                        handleSuggestionsChange() {
                            null != this._suggestions &&
                                this.loading &&
                                ((this.highlightOption = null),
                                this._suggestions.length
                                    ? ((this.noResults = !1),
                                      this.show(),
                                      (this.suggestionsUpdated = !0),
                                      this.autoHighlight &&
                                          (this.highlightOption =
                                              this._suggestions[0]))
                                    : ((this.noResults = !0),
                                      this.showEmptyMessage
                                          ? (this.show(),
                                            (this.suggestionsUpdated = !0))
                                          : this.hide()),
                                (this.loading = !1));
                        }
                        ngAfterContentInit() {
                            this.templates.forEach((e) => {
                                switch (e.getType()) {
                                    case 'item':
                                    default:
                                        this.itemTemplate = e.template;
                                        break;
                                    case 'group':
                                        this.groupTemplate = e.template;
                                        break;
                                    case 'selectedItem':
                                        this.selectedItemTemplate = e.template;
                                        break;
                                    case 'header':
                                        this.headerTemplate = e.template;
                                        break;
                                    case 'empty':
                                        this.emptyTemplate = e.template;
                                        break;
                                    case 'footer':
                                        this.footerTemplate = e.template;
                                }
                            });
                        }
                        updateVirtualScrollSelectedIndex() {
                            this.highlightOption &&
                                this.suggestions &&
                                this.suggestions.length &&
                                (this.virtualScrollSelectedIndex =
                                    this.findOptionIndex(
                                        this.highlightOption,
                                        this.suggestions
                                    ));
                        }
                        writeValue(e) {
                            (this.value = e),
                                (this.filled = this.value && '' != this.value),
                                this.updateInputField(),
                                this.cd.markForCheck();
                        }
                        getOptionGroupChildren(e) {
                            return this.optionGroupChildren
                                ? g.gb.resolveFieldData(
                                      e,
                                      this.optionGroupChildren
                                  )
                                : e.items;
                        }
                        getOptionGroupLabel(e) {
                            return this.optionGroupLabel
                                ? g.gb.resolveFieldData(
                                      e,
                                      this.optionGroupLabel
                                  )
                                : null != e.label
                                ? e.label
                                : e;
                        }
                        registerOnChange(e) {
                            this.onModelChange = e;
                        }
                        registerOnTouched(e) {
                            this.onModelTouched = e;
                        }
                        setDisabledState(e) {
                            (this.disabled = e), this.cd.markForCheck();
                        }
                        onInput(e) {
                            if (!this.inputKeyDown && m.p.isIE()) return;
                            this.timeout && clearTimeout(this.timeout);
                            let n = e.target.value;
                            !this.multiple &&
                                !this.forceSelection &&
                                this.onModelChange(n),
                                0 === n.length &&
                                    !this.multiple &&
                                    (this.hide(),
                                    this.onClear.emit(e),
                                    this.onModelChange(n)),
                                n.length >= this.minLength
                                    ? (this.timeout = setTimeout(() => {
                                          this.search(e, n);
                                      }, this.delay))
                                    : this.hide(),
                                this.updateFilledState(),
                                (this.inputKeyDown = !1);
                        }
                        onInputClick(e) {
                            this.documentClickListener &&
                                (this.inputClick = !0);
                        }
                        search(e, n) {
                            null != n &&
                                ((this.loading = !0),
                                this.completeMethod.emit({
                                    originalEvent: e,
                                    query: n,
                                }));
                        }
                        selectItem(e, n = !0) {
                            this.forceSelectionUpdateModelTimeout &&
                                (clearTimeout(
                                    this.forceSelectionUpdateModelTimeout
                                ),
                                (this.forceSelectionUpdateModelTimeout = null)),
                                this.multiple
                                    ? ((this.multiInputEL.nativeElement.value =
                                          ''),
                                      (this.value = this.value || []),
                                      (!this.isSelected(e) || !this.unique) &&
                                          ((this.value = [...this.value, e]),
                                          this.onModelChange(this.value)))
                                    : ((this.inputEL.nativeElement.value =
                                          this.resolveFieldData(e)),
                                      (this.value = e),
                                      this.onModelChange(this.value)),
                                this.onSelect.emit(e),
                                this.updateFilledState(),
                                n &&
                                    ((this.itemClicked = !0),
                                    this.focusInput());
                        }
                        show() {
                            if (this.multiInputEL || this.inputEL) {
                                let e = this.multiple
                                    ? this.multiInputEL.nativeElement
                                          .ownerDocument.activeElement ==
                                      this.multiInputEL.nativeElement
                                    : this.inputEL.nativeElement.ownerDocument
                                          .activeElement ==
                                      this.inputEL.nativeElement;
                                !this.overlayVisible &&
                                    e &&
                                    (this.overlayVisible = !0);
                            }
                        }
                        onOverlayAnimationStart(e) {
                            switch (e.toState) {
                                case 'visible':
                                    (this.overlay = e.element),
                                        (this.itemsWrapper = this.virtualScroll
                                            ? m.p.findSingle(
                                                  this.overlay,
                                                  '.cdk-virtual-scroll-viewport'
                                              )
                                            : this.overlay),
                                        this.appendOverlay(),
                                        this.autoZIndex &&
                                            g.P9.set(
                                                'overlay',
                                                this.overlay,
                                                this.baseZIndex +
                                                    this.config.zIndex.overlay
                                            ),
                                        this.alignOverlay(),
                                        this.bindDocumentClickListener(),
                                        this.bindDocumentResizeListener(),
                                        this.bindScrollListener(),
                                        this.onShow.emit(e);
                                    break;
                                case 'void':
                                    this.onOverlayHide();
                            }
                        }
                        onOverlayAnimationEnd(e) {
                            'void' === e.toState &&
                                this.autoZIndex &&
                                g.P9.clear(e.element);
                        }
                        onOverlayClick(e) {
                            this.overlayService.add({
                                originalEvent: e,
                                target: this.el.nativeElement,
                            });
                        }
                        appendOverlay() {
                            this.appendTo &&
                                ('body' === this.appendTo
                                    ? document.body.appendChild(this.overlay)
                                    : m.p.appendChild(
                                          this.overlay,
                                          this.appendTo
                                      ),
                                this.overlay.style.minWidth ||
                                    (this.overlay.style.minWidth =
                                        m.p.getWidth(
                                            this.el.nativeElement.children[0]
                                        ) + 'px'));
                        }
                        resolveFieldData(e) {
                            let n = this.field
                                ? g.gb.resolveFieldData(e, this.field)
                                : e;
                            return void 0 !== n ? n : '';
                        }
                        restoreOverlayAppend() {
                            this.overlay &&
                                this.appendTo &&
                                this.el.nativeElement.appendChild(this.overlay);
                        }
                        alignOverlay() {
                            this.appendTo
                                ? m.p.absolutePosition(
                                      this.overlay,
                                      this.multiple
                                          ? this.multiContainerEL.nativeElement
                                          : this.inputEL.nativeElement
                                  )
                                : m.p.relativePosition(
                                      this.overlay,
                                      this.multiple
                                          ? this.multiContainerEL.nativeElement
                                          : this.inputEL.nativeElement
                                  );
                        }
                        hide() {
                            (this.overlayVisible = !1), this.cd.markForCheck();
                        }
                        handleDropdownClick(e) {
                            if (this.overlayVisible) this.hide();
                            else {
                                this.focusInput();
                                let n = this.multiple
                                    ? this.multiInputEL.nativeElement.value
                                    : this.inputEL.nativeElement.value;
                                'blank' === this.dropdownMode
                                    ? this.search(e, '')
                                    : 'current' === this.dropdownMode &&
                                      this.search(e, n),
                                    this.onDropdownClick.emit({
                                        originalEvent: e,
                                        query: n,
                                    });
                            }
                        }
                        focusInput() {
                            this.multiple
                                ? this.multiInputEL.nativeElement.focus()
                                : this.inputEL.nativeElement.focus();
                        }
                        get emptyMessageLabel() {
                            return (
                                this.emptyMessage ||
                                this.config.getTranslation(C.ws.EMPTY_MESSAGE)
                            );
                        }
                        removeItem(e) {
                            let n = m.p.index(e),
                                s = this.value[n];
                            (this.value = this.value.filter((l, r) => r != n)),
                                this.onModelChange(this.value),
                                this.updateFilledState(),
                                this.onUnselect.emit(s);
                        }
                        onKeydown(e) {
                            if (this.overlayVisible)
                                switch (e.which) {
                                    case 40:
                                        if (this.group) {
                                            let s = this.findOptionGroupIndex(
                                                this.highlightOption,
                                                this.suggestions
                                            );
                                            if (-1 !== s) {
                                                let l = s.itemIndex + 1;
                                                l <
                                                this.getOptionGroupChildren(
                                                    this.suggestions[
                                                        s.groupIndex
                                                    ]
                                                ).length
                                                    ? ((this.highlightOption =
                                                          this.getOptionGroupChildren(
                                                              this.suggestions[
                                                                  s.groupIndex
                                                              ]
                                                          )[l]),
                                                      (this.highlightOptionChanged =
                                                          !0))
                                                    : this.suggestions[
                                                          s.groupIndex + 1
                                                      ] &&
                                                      ((this.highlightOption =
                                                          this.getOptionGroupChildren(
                                                              this.suggestions[
                                                                  s.groupIndex +
                                                                      1
                                                              ]
                                                          )[0]),
                                                      (this.highlightOptionChanged =
                                                          !0));
                                            } else
                                                this.highlightOption =
                                                    this.getOptionGroupChildren(
                                                        this.suggestions[0]
                                                    )[0];
                                        } else {
                                            let s = this.findOptionIndex(
                                                this.highlightOption,
                                                this.suggestions
                                            );
                                            if (-1 != s) {
                                                var n = s + 1;
                                                n != this.suggestions.length &&
                                                    ((this.highlightOption =
                                                        this.suggestions[n]),
                                                    (this.highlightOptionChanged =
                                                        !0));
                                            } else
                                                this.highlightOption =
                                                    this.suggestions[0];
                                        }
                                        e.preventDefault();
                                        break;
                                    case 38:
                                        if (this.group) {
                                            let s = this.findOptionGroupIndex(
                                                this.highlightOption,
                                                this.suggestions
                                            );
                                            if (-1 !== s) {
                                                let l = s.itemIndex - 1;
                                                if (l >= 0)
                                                    (this.highlightOption =
                                                        this.getOptionGroupChildren(
                                                            this.suggestions[
                                                                s.groupIndex
                                                            ]
                                                        )[l]),
                                                        (this.highlightOptionChanged =
                                                            !0);
                                                else if (l < 0) {
                                                    let r =
                                                        this.suggestions[
                                                            s.groupIndex - 1
                                                        ];
                                                    r &&
                                                        ((this.highlightOption =
                                                            this.getOptionGroupChildren(
                                                                r
                                                            )[
                                                                this.getOptionGroupChildren(
                                                                    r
                                                                ).length - 1
                                                            ]),
                                                        (this.highlightOptionChanged =
                                                            !0));
                                                }
                                            }
                                        } else {
                                            let s = this.findOptionIndex(
                                                this.highlightOption,
                                                this.suggestions
                                            );
                                            s > 0 &&
                                                ((this.highlightOption =
                                                    this.suggestions[s - 1]),
                                                (this.highlightOptionChanged =
                                                    !0));
                                        }
                                        e.preventDefault();
                                        break;
                                    case 13:
                                        this.highlightOption &&
                                            (this.selectItem(
                                                this.highlightOption
                                            ),
                                            this.hide()),
                                            e.preventDefault();
                                        break;
                                    case 27:
                                        this.hide(), e.preventDefault();
                                        break;
                                    case 9:
                                        this.highlightOption &&
                                            this.selectItem(
                                                this.highlightOption
                                            ),
                                            this.hide();
                                }
                            else
                                40 === e.which &&
                                    this.suggestions &&
                                    this.search(e, e.target.value);
                            if (
                                this.multiple &&
                                8 === e.which &&
                                this.value &&
                                this.value.length &&
                                !this.multiInputEL.nativeElement.value
                            ) {
                                this.value = [...this.value];
                                const s = this.value.pop();
                                this.onModelChange(this.value),
                                    this.updateFilledState(),
                                    this.onUnselect.emit(s);
                            }
                            this.inputKeyDown = !0;
                        }
                        onKeyup(e) {
                            this.onKeyUp.emit(e);
                        }
                        onInputFocus(e) {
                            !this.itemClicked &&
                                this.completeOnFocus &&
                                this.search(
                                    e,
                                    this.multiple
                                        ? this.multiInputEL.nativeElement.value
                                        : this.inputEL.nativeElement.value
                                ),
                                (this.focus = !0),
                                this.onFocus.emit(e),
                                (this.itemClicked = !1);
                        }
                        onInputBlur(e) {
                            (this.focus = !1),
                                this.onModelTouched(),
                                this.onBlur.emit(e);
                        }
                        onInputChange(e) {
                            if (this.forceSelection) {
                                let n = !1,
                                    s = e.target.value.trim();
                                if (this.suggestions)
                                    for (let l of this.suggestions) {
                                        let r = this.field
                                            ? g.gb.resolveFieldData(
                                                  l,
                                                  this.field
                                              )
                                            : l;
                                        if (r && s === r.trim()) {
                                            (n = !0),
                                                (this.forceSelectionUpdateModelTimeout =
                                                    setTimeout(() => {
                                                        this.selectItem(l, !1);
                                                    }, 250));
                                            break;
                                        }
                                    }
                                n ||
                                    (this.multiple
                                        ? (this.multiInputEL.nativeElement.value =
                                              '')
                                        : ((this.value = null),
                                          (this.inputEL.nativeElement.value =
                                              '')),
                                    this.onClear.emit(e),
                                    this.onModelChange(this.value),
                                    this.updateFilledState());
                            }
                        }
                        onInputPaste(e) {
                            this.onKeydown(e);
                        }
                        isSelected(e) {
                            let n = !1;
                            if (this.value && this.value.length)
                                for (let s = 0; s < this.value.length; s++)
                                    if (
                                        g.gb.equals(
                                            this.value[s],
                                            e,
                                            this.dataKey
                                        )
                                    ) {
                                        n = !0;
                                        break;
                                    }
                            return n;
                        }
                        findOptionIndex(e, n) {
                            let s = -1;
                            if (n)
                                for (let l = 0; l < n.length; l++)
                                    if (g.gb.equals(e, n[l])) {
                                        s = l;
                                        break;
                                    }
                            return s;
                        }
                        findOptionGroupIndex(e, n) {
                            let s, l;
                            if (n)
                                for (
                                    let r = 0;
                                    r < n.length &&
                                    ((s = r),
                                    (l = this.findOptionIndex(
                                        e,
                                        this.getOptionGroupChildren(n[r])
                                    )),
                                    -1 === l);
                                    r++
                                );
                            return -1 !== l
                                ? { groupIndex: s, itemIndex: l }
                                : -1;
                        }
                        updateFilledState() {
                            this.filled = this.multiple
                                ? (this.value && this.value.length) ||
                                  (this.multiInputEL &&
                                      this.multiInputEL.nativeElement &&
                                      '' !=
                                          this.multiInputEL.nativeElement.value)
                                : (this.inputFieldValue &&
                                      '' != this.inputFieldValue) ||
                                  (this.inputEL &&
                                      this.inputEL.nativeElement &&
                                      '' != this.inputEL.nativeElement.value);
                        }
                        updateInputField() {
                            let e = this.resolveFieldData(this.value);
                            (this.inputFieldValue = e),
                                this.inputEL &&
                                    this.inputEL.nativeElement &&
                                    (this.inputEL.nativeElement.value = e),
                                this.updateFilledState();
                        }
                        bindDocumentClickListener() {
                            this.documentClickListener ||
                                (this.documentClickListener =
                                    this.renderer.listen(
                                        this.el
                                            ? this.el.nativeElement
                                                  .ownerDocument
                                            : 'document',
                                        'click',
                                        (n) => {
                                            3 !== n.which &&
                                                (!this.inputClick &&
                                                    !this.isDropdownClick(n) &&
                                                    this.hide(),
                                                (this.inputClick = !1),
                                                this.cd.markForCheck());
                                        }
                                    ));
                        }
                        isDropdownClick(e) {
                            if (this.dropdown) {
                                let n = e.target;
                                return (
                                    n === this.dropdownButton.nativeElement ||
                                    n.parentNode ===
                                        this.dropdownButton.nativeElement
                                );
                            }
                            return !1;
                        }
                        unbindDocumentClickListener() {
                            this.documentClickListener &&
                                (this.documentClickListener(),
                                (this.documentClickListener = null));
                        }
                        bindDocumentResizeListener() {
                            (this.documentResizeListener =
                                this.onWindowResize.bind(this)),
                                window.addEventListener(
                                    'resize',
                                    this.documentResizeListener
                                );
                        }
                        unbindDocumentResizeListener() {
                            this.documentResizeListener &&
                                (window.removeEventListener(
                                    'resize',
                                    this.documentResizeListener
                                ),
                                (this.documentResizeListener = null));
                        }
                        onWindowResize() {
                            this.hide();
                        }
                        bindScrollListener() {
                            this.scrollHandler ||
                                (this.scrollHandler = new m.V(
                                    this.containerEL.nativeElement,
                                    () => {
                                        this.overlayVisible && this.hide();
                                    }
                                )),
                                this.scrollHandler.bindScrollListener();
                        }
                        unbindScrollListener() {
                            this.scrollHandler &&
                                this.scrollHandler.unbindScrollListener();
                        }
                        onOverlayHide() {
                            this.unbindDocumentClickListener(),
                                this.unbindDocumentResizeListener(),
                                this.unbindScrollListener(),
                                (this.overlay = null),
                                this.onHide.emit();
                        }
                        ngOnDestroy() {
                            this.forceSelectionUpdateModelTimeout &&
                                (clearTimeout(
                                    this.forceSelectionUpdateModelTimeout
                                ),
                                (this.forceSelectionUpdateModelTimeout = null)),
                                this.scrollHandler &&
                                    (this.scrollHandler.destroy(),
                                    (this.scrollHandler = null)),
                                this.overlay && g.P9.clear(this.overlay),
                                this.restoreOverlayAppend(),
                                this.onOverlayHide();
                        }
                    }
                    return (
                        (i.ɵfac = function (e) {
                            return new (e || i)(
                                t.Y36(t.SBq),
                                t.Y36(t.Qsj),
                                t.Y36(t.sBO),
                                t.Y36(t.ZZ4),
                                t.Y36(C.b4),
                                t.Y36(C.F0)
                            );
                        }),
                        (i.ɵcmp = t.Xpm({
                            type: i,
                            selectors: [['p-autoComplete']],
                            contentQueries: function (e, n, s) {
                                if ((1 & e && t.Suo(s, C.jx, 4), 2 & e)) {
                                    let l;
                                    t.iGM((l = t.CRH())) && (n.templates = l);
                                }
                            },
                            viewQuery: function (e, n) {
                                if (
                                    (1 & e &&
                                        (t.Gf(Dt, 5),
                                        t.Gf(Lt, 5),
                                        t.Gf(Mt, 5),
                                        t.Gf(Ft, 5),
                                        t.Gf(Vt, 5),
                                        t.Gf(Q, 5)),
                                    2 & e)
                                ) {
                                    let s;
                                    t.iGM((s = t.CRH())) &&
                                        (n.containerEL = s.first),
                                        t.iGM((s = t.CRH())) &&
                                            (n.inputEL = s.first),
                                        t.iGM((s = t.CRH())) &&
                                            (n.multiInputEL = s.first),
                                        t.iGM((s = t.CRH())) &&
                                            (n.multiContainerEL = s.first),
                                        t.iGM((s = t.CRH())) &&
                                            (n.dropdownButton = s.first),
                                        t.iGM((s = t.CRH())) &&
                                            (n.viewPort = s.first);
                                }
                            },
                            hostAttrs: [1, 'p-element', 'p-inputwrapper'],
                            hostVars: 4,
                            hostBindings: function (e, n) {
                                2 & e &&
                                    t.ekj('p-inputwrapper-filled', n.filled)(
                                        'p-inputwrapper-focus',
                                        (n.focus && !n.disabled) ||
                                            n.overlayVisible
                                    );
                            },
                            inputs: {
                                minLength: 'minLength',
                                delay: 'delay',
                                style: 'style',
                                panelStyle: 'panelStyle',
                                styleClass: 'styleClass',
                                panelStyleClass: 'panelStyleClass',
                                inputStyle: 'inputStyle',
                                inputId: 'inputId',
                                inputStyleClass: 'inputStyleClass',
                                placeholder: 'placeholder',
                                readonly: 'readonly',
                                disabled: 'disabled',
                                virtualScroll: 'virtualScroll',
                                itemSize: 'itemSize',
                                maxlength: 'maxlength',
                                name: 'name',
                                required: 'required',
                                size: 'size',
                                appendTo: 'appendTo',
                                autoHighlight: 'autoHighlight',
                                forceSelection: 'forceSelection',
                                type: 'type',
                                autoZIndex: 'autoZIndex',
                                baseZIndex: 'baseZIndex',
                                ariaLabel: 'ariaLabel',
                                dropdownAriaLabel: 'dropdownAriaLabel',
                                ariaLabelledBy: 'ariaLabelledBy',
                                dropdownIcon: 'dropdownIcon',
                                unique: 'unique',
                                group: 'group',
                                completeOnFocus: 'completeOnFocus',
                                field: 'field',
                                scrollHeight: 'scrollHeight',
                                dropdown: 'dropdown',
                                showEmptyMessage: 'showEmptyMessage',
                                dropdownMode: 'dropdownMode',
                                multiple: 'multiple',
                                tabindex: 'tabindex',
                                dataKey: 'dataKey',
                                emptyMessage: 'emptyMessage',
                                showTransitionOptions: 'showTransitionOptions',
                                hideTransitionOptions: 'hideTransitionOptions',
                                autofocus: 'autofocus',
                                autocomplete: 'autocomplete',
                                optionGroupChildren: 'optionGroupChildren',
                                optionGroupLabel: 'optionGroupLabel',
                                suggestions: 'suggestions',
                            },
                            outputs: {
                                completeMethod: 'completeMethod',
                                onSelect: 'onSelect',
                                onUnselect: 'onUnselect',
                                onFocus: 'onFocus',
                                onBlur: 'onBlur',
                                onDropdownClick: 'onDropdownClick',
                                onClear: 'onClear',
                                onKeyUp: 'onKeyUp',
                                onShow: 'onShow',
                                onHide: 'onHide',
                            },
                            features: [t._Bn([yi])],
                            decls: 7,
                            vars: 12,
                            consts: [
                                [3, 'ngClass', 'ngStyle'],
                                ['container', ''],
                                [
                                    'class',
                                    'p-autocomplete-input p-inputtext p-component',
                                    'aria-autocomplete',
                                    'list',
                                    'role',
                                    'searchbox',
                                    'aria-haspopup',
                                    'true',
                                    3,
                                    'ngStyle',
                                    'class',
                                    'autocomplete',
                                    'ngClass',
                                    'value',
                                    'readonly',
                                    'disabled',
                                    'click',
                                    'input',
                                    'keydown',
                                    'keyup',
                                    'focus',
                                    'blur',
                                    'change',
                                    'paste',
                                    4,
                                    'ngIf',
                                ],
                                [
                                    'class',
                                    'p-autocomplete-multiple-container p-component p-inputtext',
                                    3,
                                    'ngClass',
                                    'click',
                                    4,
                                    'ngIf',
                                ],
                                [
                                    'class',
                                    'p-autocomplete-loader pi pi-spinner pi-spin',
                                    4,
                                    'ngIf',
                                ],
                                [
                                    'type',
                                    'button',
                                    'pButton',
                                    '',
                                    'class',
                                    'p-autocomplete-dropdown',
                                    'pRipple',
                                    '',
                                    3,
                                    'icon',
                                    'disabled',
                                    'click',
                                    4,
                                    'ngIf',
                                ],
                                [
                                    3,
                                    'ngClass',
                                    'max-height',
                                    'ngStyle',
                                    'class',
                                    'click',
                                    4,
                                    'ngIf',
                                ],
                                [
                                    'aria-autocomplete',
                                    'list',
                                    'role',
                                    'searchbox',
                                    'aria-haspopup',
                                    'true',
                                    1,
                                    'p-autocomplete-input',
                                    'p-inputtext',
                                    'p-component',
                                    3,
                                    'ngStyle',
                                    'autocomplete',
                                    'ngClass',
                                    'value',
                                    'readonly',
                                    'disabled',
                                    'click',
                                    'input',
                                    'keydown',
                                    'keyup',
                                    'focus',
                                    'blur',
                                    'change',
                                    'paste',
                                ],
                                ['in', ''],
                                [
                                    1,
                                    'p-autocomplete-multiple-container',
                                    'p-component',
                                    'p-inputtext',
                                    3,
                                    'ngClass',
                                    'click',
                                ],
                                ['multiContainer', ''],
                                [
                                    'class',
                                    'p-autocomplete-token',
                                    4,
                                    'ngFor',
                                    'ngForOf',
                                ],
                                [1, 'p-autocomplete-input-token'],
                                [
                                    'aria-autocomplete',
                                    'list',
                                    'role',
                                    'searchbox',
                                    'aria-haspopup',
                                    'true',
                                    3,
                                    'disabled',
                                    'readonly',
                                    'autocomplete',
                                    'ngStyle',
                                    'input',
                                    'click',
                                    'keydown',
                                    'keyup',
                                    'focus',
                                    'blur',
                                    'change',
                                    'paste',
                                ],
                                ['multiIn', ''],
                                [1, 'p-autocomplete-token'],
                                ['token', ''],
                                [
                                    4,
                                    'ngTemplateOutlet',
                                    'ngTemplateOutletContext',
                                ],
                                [
                                    'class',
                                    'p-autocomplete-token-label',
                                    4,
                                    'ngIf',
                                ],
                                [
                                    'class',
                                    'p-autocomplete-token-icon pi pi-times-circle',
                                    3,
                                    'click',
                                    4,
                                    'ngIf',
                                ],
                                [1, 'p-autocomplete-token-label'],
                                [
                                    1,
                                    'p-autocomplete-token-icon',
                                    'pi',
                                    'pi-times-circle',
                                    3,
                                    'click',
                                ],
                                [
                                    1,
                                    'p-autocomplete-loader',
                                    'pi',
                                    'pi-spinner',
                                    'pi-spin',
                                ],
                                [
                                    'type',
                                    'button',
                                    'pButton',
                                    '',
                                    'pRipple',
                                    '',
                                    1,
                                    'p-autocomplete-dropdown',
                                    3,
                                    'icon',
                                    'disabled',
                                    'click',
                                ],
                                ['ddBtn', ''],
                                [3, 'ngClass', 'ngStyle', 'click'],
                                ['panel', ''],
                                [4, 'ngTemplateOutlet'],
                                [
                                    'role',
                                    'listbox',
                                    1,
                                    'p-autocomplete-items',
                                    3,
                                    'ngClass',
                                ],
                                [4, 'ngIf'],
                                ['itemslist', ''],
                                ['ngFor', '', 3, 'ngForOf'],
                                [1, 'p-autocomplete-item-group'],
                                [4, 'ngIf', 'ngIfElse'],
                                ['virtualScrollList', ''],
                                [
                                    'class',
                                    'p-autocomplete-empty-message',
                                    4,
                                    'ngIf',
                                ],
                                [
                                    'role',
                                    'option',
                                    'class',
                                    'p-autocomplete-item',
                                    'pRipple',
                                    '',
                                    3,
                                    'ngClass',
                                    'id',
                                    'click',
                                    4,
                                    'ngFor',
                                    'ngForOf',
                                ],
                                [
                                    'role',
                                    'option',
                                    'pRipple',
                                    '',
                                    1,
                                    'p-autocomplete-item',
                                    3,
                                    'ngClass',
                                    'id',
                                    'click',
                                ],
                                [3, 'ngStyle', 'itemSize', 4, 'ngIf'],
                                [3, 'ngStyle', 'itemSize'],
                                [4, 'cdkVirtualFor', 'cdkVirtualForOf'],
                                [
                                    'role',
                                    'option',
                                    'pRipple',
                                    '',
                                    1,
                                    'p-autocomplete-item',
                                    3,
                                    'ngClass',
                                    'ngStyle',
                                    'id',
                                    'click',
                                ],
                                [1, 'p-autocomplete-empty-message'],
                                ['empty', ''],
                            ],
                            template: function (e, n) {
                                1 & e &&
                                    (t.TgZ(0, 'span', 0, 1),
                                    t.YNc(2, Bt, 2, 26, 'input', 2),
                                    t.YNc(3, Gt, 6, 23, 'ul', 3),
                                    t.YNc(4, Yt, 1, 0, 'i', 4),
                                    t.YNc(5, Jt, 2, 4, 'button', 5),
                                    t.YNc(6, wi, 9, 21, 'div', 6),
                                    t.qZA()),
                                    2 & e &&
                                        (t.Tol(n.styleClass),
                                        t.Q6J(
                                            'ngClass',
                                            t.WLB(9, Ci, n.dropdown, n.multiple)
                                        )('ngStyle', n.style),
                                        t.xp6(2),
                                        t.Q6J('ngIf', !n.multiple),
                                        t.xp6(1),
                                        t.Q6J('ngIf', n.multiple),
                                        t.xp6(1),
                                        t.Q6J('ngIf', n.loading),
                                        t.xp6(1),
                                        t.Q6J('ngIf', n.dropdown),
                                        t.xp6(1),
                                        t.Q6J('ngIf', n.overlayVisible));
                            },
                            directives: [
                                Q,
                                p.mk,
                                p.PC,
                                p.O5,
                                p.sg,
                                p.tP,
                                R.Hq,
                                te.H,
                                bt,
                                Rt,
                            ],
                            styles: [
                                '.p-autocomplete{display:inline-flex;position:relative}.p-autocomplete-loader{position:absolute;top:50%;margin-top:-.5rem}.p-autocomplete-dd .p-autocomplete-input{flex:1 1 auto;width:1%}.p-autocomplete-dd .p-autocomplete-input,.p-autocomplete-dd .p-autocomplete-multiple-container{border-top-right-radius:0;border-bottom-right-radius:0}.p-autocomplete-dd .p-autocomplete-dropdown{border-top-left-radius:0;border-bottom-left-radius:0}.p-autocomplete .p-autocomplete-panel{min-width:100%;top:0;left:0}.p-autocomplete-panel{position:absolute;overflow:auto}.p-autocomplete-items{margin:0;padding:0;list-style-type:none}.p-autocomplete-item{cursor:pointer;white-space:nowrap;position:relative;overflow:hidden}.p-autocomplete-multiple-container{margin:0;padding:0;list-style-type:none;cursor:text;overflow:hidden;display:flex;align-items:center;flex-wrap:wrap}.p-autocomplete-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-autocomplete-token-icon{cursor:pointer}.p-autocomplete-input-token{flex:1 1 auto;display:inline-flex}.p-autocomplete-input-token input{border:0 none;outline:0 none;background-color:transparent;margin:0;padding:0;box-shadow:none;border-radius:0;width:100%}.p-fluid .p-autocomplete{display:flex}.p-fluid .p-autocomplete-dd .p-autocomplete-input{width:1%}\n',
                            ],
                            encapsulation: 2,
                            data: {
                                animation: [
                                    (0, v.X$)('overlayAnimation', [
                                        (0, v.eR)(':enter', [
                                            (0, v.oB)({
                                                opacity: 0,
                                                transform: 'scaleY(0.8)',
                                            }),
                                            (0, v.jt)(
                                                '{{showTransitionParams}}'
                                            ),
                                        ]),
                                        (0, v.eR)(':leave', [
                                            (0, v.jt)(
                                                '{{hideTransitionParams}}',
                                                (0, v.oB)({ opacity: 0 })
                                            ),
                                        ]),
                                    ]),
                                ],
                            },
                            changeDetection: 0,
                        })),
                        i
                    );
                })(),
                xi = (() => {
                    class i {}
                    return (
                        (i.ɵfac = function (e) {
                            return new (e || i)();
                        }),
                        (i.ɵmod = t.oAB({ type: i })),
                        (i.ɵinj = t.cJS({
                            imports: [
                                [p.ez, ee.j, R.hJ, C.m8, te.T, ye],
                                C.m8,
                                ye,
                            ],
                        })),
                        i
                    );
                })();
            var B, W, $, ke, Ee;
            const Si = function () {
                return [];
            };
            class E {
                constructor(o) {
                    (this.functionsApi = o),
                        B.add(this),
                        (this.downloadClick$ = new h.x()),
                        (this.selectedClass$ = new h.x()),
                        (this.classNameInput$ = new h.x()),
                        (this.reportNameKeydown$ = new h.x()),
                        W.set(
                            this,
                            (0, Ae.T)(
                                this.downloadClick$,
                                this.reportNameKeydown$.pipe(
                                    (0, P.h)((e) => 'Enter' === e.key)
                                )
                            )
                        ),
                        $.set(
                            this,
                            this.functionsApi
                                .get('classes')
                                .pipe(
                                    (0, S.U)(({ classes: e }) =>
                                        e.map(({ title: n }) => n)
                                    )
                                )
                        ),
                        (this.classSuggestions$ = this.classNameInput$.pipe(
                            (0, j.M)((0, A.Q_)(this, $, 'f')),
                            (0, S.U)(([{ query: e }, n]) =>
                                n.filter((s) =>
                                    s
                                        .toLocaleLowerCase()
                                        .startsWith(e.toLocaleLowerCase())
                                )
                            ),
                            (0, S.U)((e) => e.map((n) => ({ name: n })))
                        )),
                        (this.isLoadingReport$ = (0, A.Q_)(this, W, 'f').pipe(
                            (0, j.M)(this.selectedClass$),
                            (0, P.h)(([, { name: e }]) => '' !== e),
                            (0, X.w)(([, { name: e }]) =>
                                (0, A.Q_)(this, B, 'm', ke)
                                    .call(this, e)
                                    .pipe((0, S.U)(({ finished: n }) => !n))
                            ),
                            (0, O.O)(!1)
                        ));
                }
            }
            (W = new WeakMap()),
                ($ = new WeakMap()),
                (B = new WeakSet()),
                (ke = function (o) {
                    return this.functionsApi.get(`roster?class=${o}`).pipe(
                        (0, Oe.b)(({ data: e }) => {
                            const n = new Blob([new Uint8Array(e)], {
                                type: 'application/pdf',
                            });
                            (0, A.Q_)(this, B, 'm', Ee).call(
                                this,
                                n,
                                'roster.pdf'
                            );
                        }),
                        (function Re(i) {
                            return (0, S.U)(() => i);
                        })({ finished: !0 }),
                        (0, O.O)({ finished: !1 })
                    );
                }),
                (Ee = function (o, e = 'file.txt') {
                    const n = window.URL.createObjectURL(o),
                        s = document.createElement('a');
                    (s.href = n),
                        (s.download = e),
                        s.dispatchEvent(
                            new MouseEvent('click', {
                                bubbles: !0,
                                cancelable: !0,
                                view: window,
                            })
                        ),
                        setTimeout(() => {
                            window.URL.revokeObjectURL(n), s.remove();
                        }, 100);
                }),
                (E.ɵfac = function (o) {
                    return new (o || E)(t.Y36(De.O));
                }),
                (E.ɵcmp = t.Xpm({
                    type: E,
                    selectors: [['ng-component']],
                    decls: 10,
                    vars: 9,
                    consts: [
                        [2, 'display', 'flex', 'align-items', 'flex-start'],
                        [2, 'align-self', 'flex-end'],
                        [1, 'field', 2, 'margin-right', '4px'],
                        ['for', 'classNameInput', 1, 'block'],
                        [
                            'field',
                            'name',
                            'field',
                            'name',
                            3,
                            'showEmptyMessage',
                            'suggestions',
                            'minLength',
                            'completeMethod',
                            'onSelect',
                            'onKeyUp',
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
                    template: function (o, e) {
                        if (
                            (1 & o &&
                                (t.TgZ(0, 'div', 0),
                                t.TgZ(1, 'div', 1),
                                t.TgZ(2, 'span', 2),
                                t.TgZ(3, 'label', 3),
                                t._uU(4, 'Class Name'),
                                t.qZA(),
                                t.TgZ(5, 'p-autoComplete', 4),
                                t.NdJ('completeMethod', function (s) {
                                    return e.classNameInput$.next(s);
                                })('onSelect', function (s) {
                                    return e.selectedClass$.next(s);
                                })('onKeyUp', function (s) {
                                    return e.reportNameKeydown$.next(s);
                                }),
                                t.ALo(6, 'async'),
                                t.qZA(),
                                t.qZA(),
                                t.qZA(),
                                t.TgZ(7, 'div', 1),
                                t.TgZ(8, 'p-button', 5),
                                t.NdJ('click', function () {
                                    return e.downloadClick$.next();
                                }),
                                t.ALo(9, 'async'),
                                t.qZA(),
                                t.qZA(),
                                t.qZA()),
                            2 & o)
                        ) {
                            let n, s;
                            t.xp6(5),
                                t.Q6J('showEmptyMessage', !0)(
                                    'suggestions',
                                    null !==
                                        (n = t.lcZ(
                                            6,
                                            4,
                                            e.classSuggestions$
                                        )) && void 0 !== n
                                        ? n
                                        : t.DdM(8, Si)
                                )('minLength', 1),
                                t.xp6(3),
                                t.Q6J(
                                    'loading',
                                    null !==
                                        (s = t.lcZ(9, 6, e.isLoadingReport$)) &&
                                        void 0 !== s &&
                                        s
                                );
                        }
                    },
                    directives: [be, R.zx],
                    pipes: [p.Ov],
                    encapsulation: 2,
                    changeDetection: 0,
                }));
            const Ti = [{ path: '', component: E, children: [] }];
            let bi = (() => {
                    class i {}
                    return (
                        (i.ɵfac = function (e) {
                            return new (e || i)();
                        }),
                        (i.ɵmod = t.oAB({ type: i })),
                        (i.ɵinj = t.cJS({
                            imports: [[K.Bz.forChild(Ti)], K.Bz],
                        })),
                        i
                    );
                })(),
                ki = (() => {
                    class i {}
                    return (
                        (i.ɵfac = function (e) {
                            return new (e || i)();
                        }),
                        (i.ɵmod = t.oAB({ type: i })),
                        (i.ɵinj = t.cJS({
                            imports: [[p.ez, Ie.B, bi, R.hJ, ee.j, xi]],
                        })),
                        i
                    );
                })();
        },
    },
]);
