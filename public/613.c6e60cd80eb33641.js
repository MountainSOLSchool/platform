'use strict';
(self.webpackChunkportal = self.webpackChunkportal || []).push([
    [613],
    {
        613: (ue, Ve, R) => {
            R.r(Ve),
                R.d(Ve, {
                    ClassesCalendarModule: () => Wp,
                    SelectClassesCalendarComponent: () => Le,
                });
            var pe,
                S,
                cr,
                Ge,
                dr,
                fr,
                ur,
                N = R(9808),
                ne = R(2559),
                J = R.n(ne),
                u = R(655),
                st = {},
                pr = [],
                Sa =
                    /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
            function re(t, e) {
                for (var n in e) t[n] = e[n];
                return t;
            }
            function vr(t) {
                var e = t.parentNode;
                e && e.removeChild(t);
            }
            function X(t, e, n) {
                var r,
                    i,
                    o,
                    a = {};
                for (o in e)
                    'key' == o
                        ? (r = e[o])
                        : 'ref' == o
                        ? (i = e[o])
                        : (a[o] = e[o]);
                if (
                    (arguments.length > 2 &&
                        (a.children =
                            arguments.length > 3 ? pe.call(arguments, 2) : n),
                    'function' == typeof t && null != t.defaultProps)
                )
                    for (o in t.defaultProps)
                        void 0 === a[o] && (a[o] = t.defaultProps[o]);
                return Ze(t, a, r, i, null);
            }
            function Ze(t, e, n, r, i) {
                var o = {
                    type: t,
                    props: e,
                    key: n,
                    ref: r,
                    __k: null,
                    __: null,
                    __b: 0,
                    __e: null,
                    __d: void 0,
                    __c: null,
                    __h: null,
                    constructor: void 0,
                    __v: null == i ? ++cr : i,
                };
                return null == i && null != S.vnode && S.vnode(o), o;
            }
            function ee(t) {
                return t.children;
            }
            function K(t, e) {
                (this.props = t), (this.context = e);
            }
            function Te(t, e) {
                if (null == e)
                    return t.__ ? Te(t.__, t.__.__k.indexOf(t) + 1) : null;
                for (var n; e < t.__k.length; e++)
                    if (null != (n = t.__k[e]) && null != n.__e) return n.__e;
                return 'function' == typeof t.type ? Te(t) : null;
            }
            function gr(t) {
                var e, n;
                if (null != (t = t.__) && null != t.__c) {
                    for (
                        t.__e = t.__c.base = null, e = 0;
                        e < t.__k.length;
                        e++
                    )
                        if (null != (n = t.__k[e]) && null != n.__e) {
                            t.__e = t.__c.base = n.__e;
                            break;
                        }
                    return gr(t);
                }
            }
            function jt(t) {
                ((!t.__d && (t.__d = !0) && Ge.push(t) && !lt.__r++) ||
                    fr !== S.debounceRendering) &&
                    ((fr = S.debounceRendering) || dr)(lt);
            }
            function lt() {
                for (var t; (lt.__r = Ge.length); )
                    (t = Ge.sort(function (e, n) {
                        return e.__v.__b - n.__v.__b;
                    })),
                        (Ge = []),
                        t.some(function (e) {
                            var n, r, i, o, a, s;
                            e.__d &&
                                ((a = (o = (n = e).__v).__e),
                                (s = n.__P) &&
                                    ((r = []),
                                    ((i = re({}, o)).__v = o.__v + 1),
                                    Yt(
                                        s,
                                        o,
                                        i,
                                        n.__n,
                                        void 0 !== s.ownerSVGElement,
                                        null != o.__h ? [a] : null,
                                        r,
                                        null == a ? Te(o) : a,
                                        o.__h
                                    ),
                                    Dr(r, o),
                                    o.__e != a && gr(o)));
                        });
            }
            function mr(t, e, n, r, i, o, a, s, l, c) {
                var d,
                    f,
                    p,
                    v,
                    g,
                    b,
                    E,
                    m = (r && r.__k) || pr,
                    w = m.length;
                for (n.__k = [], d = 0; d < e.length; d++)
                    if (
                        null !=
                        (v = n.__k[d] =
                            null == (v = e[d]) || 'boolean' == typeof v
                                ? null
                                : 'string' == typeof v ||
                                  'number' == typeof v ||
                                  'bigint' == typeof v
                                ? Ze(null, v, null, null, v)
                                : Array.isArray(v)
                                ? Ze(ee, { children: v }, null, null, null)
                                : v.__b > 0
                                ? Ze(v.type, v.props, v.key, null, v.__v)
                                : v)
                    ) {
                        if (
                            ((v.__ = n),
                            (v.__b = n.__b + 1),
                            null === (p = m[d]) ||
                                (p && v.key == p.key && v.type === p.type))
                        )
                            m[d] = void 0;
                        else
                            for (f = 0; f < w; f++) {
                                if (
                                    (p = m[f]) &&
                                    v.key == p.key &&
                                    v.type === p.type
                                ) {
                                    m[f] = void 0;
                                    break;
                                }
                                p = null;
                            }
                        Yt(t, v, (p = p || st), i, o, a, s, l, c),
                            (g = v.__e),
                            (f = v.ref) &&
                                p.ref != f &&
                                (E || (E = []),
                                p.ref && E.push(p.ref, null, v),
                                E.push(f, v.__c || g, v)),
                            null != g
                                ? (null == b && (b = g),
                                  'function' == typeof v.type && v.__k === p.__k
                                      ? (v.__d = l = yr(v, l, t))
                                      : (l = br(t, v, p, m, g, l)),
                                  'function' == typeof n.type && (n.__d = l))
                                : l &&
                                  p.__e == l &&
                                  l.parentNode != t &&
                                  (l = Te(p));
                    }
                for (n.__e = b, d = w; d--; )
                    null != m[d] &&
                        ('function' == typeof n.type &&
                            null != m[d].__e &&
                            m[d].__e == n.__d &&
                            (n.__d = Te(r, d + 1)),
                        Sr(m[d], m[d]));
                if (E) for (d = 0; d < E.length; d++) Cr(E[d], E[++d], E[++d]);
            }
            function yr(t, e, n) {
                for (var r, i = t.__k, o = 0; i && o < i.length; o++)
                    (r = i[o]) &&
                        ((r.__ = t),
                        (e =
                            'function' == typeof r.type
                                ? yr(r, e, n)
                                : br(n, r, r, i, r.__e, e)));
                return e;
            }
            function ie(t, e) {
                return (
                    (e = e || []),
                    null == t ||
                        'boolean' == typeof t ||
                        (Array.isArray(t)
                            ? t.some(function (n) {
                                  ie(n, e);
                              })
                            : e.push(t)),
                    e
                );
            }
            function br(t, e, n, r, i, o) {
                var a, s, l;
                if (void 0 !== e.__d) (a = e.__d), (e.__d = void 0);
                else if (null == n || i != o || null == i.parentNode)
                    e: if (null == o || o.parentNode !== t)
                        t.appendChild(i), (a = null);
                    else {
                        for (
                            s = o, l = 0;
                            (s = s.nextSibling) && l < r.length;
                            l += 2
                        )
                            if (s == i) break e;
                        t.insertBefore(i, o), (a = o);
                    }
                return void 0 !== a ? a : i.nextSibling;
            }
            function Ar(t, e, n) {
                '-' === e[0]
                    ? t.setProperty(e, n)
                    : (t[e] =
                          null == n
                              ? ''
                              : 'number' != typeof n || Sa.test(e)
                              ? n
                              : n + 'px');
            }
            function ct(t, e, n, r, i) {
                var o;
                e: if ('style' === e)
                    if ('string' == typeof n) t.style.cssText = n;
                    else {
                        if (
                            ('string' == typeof r && (t.style.cssText = r = ''),
                            r)
                        )
                            for (e in r) (n && e in n) || Ar(t.style, e, '');
                        if (n)
                            for (e in n)
                                (r && n[e] === r[e]) || Ar(t.style, e, n[e]);
                    }
                else if ('o' === e[0] && 'n' === e[1])
                    (o = e !== (e = e.replace(/Capture$/, ''))),
                        (e =
                            e.toLowerCase() in t
                                ? e.toLowerCase().slice(2)
                                : e.slice(2)),
                        t.l || (t.l = {}),
                        (t.l[e + o] = n),
                        n
                            ? r || t.addEventListener(e, o ? wr : Er, o)
                            : t.removeEventListener(e, o ? wr : Er, o);
                else if ('dangerouslySetInnerHTML' !== e) {
                    if (i)
                        e = e.replace(/xlink[H:h]/, 'h').replace(/sName$/, 's');
                    else if (
                        'href' !== e &&
                        'list' !== e &&
                        'form' !== e &&
                        'tabIndex' !== e &&
                        'download' !== e &&
                        e in t
                    )
                        try {
                            t[e] = null == n ? '' : n;
                            break e;
                        } catch (a) {}
                    'function' == typeof n ||
                        (null != n &&
                        (!1 !== n || ('a' === e[0] && 'r' === e[1]))
                            ? t.setAttribute(e, n)
                            : t.removeAttribute(e));
                }
            }
            function Er(t) {
                this.l[t.type + !1](S.event ? S.event(t) : t);
            }
            function wr(t) {
                this.l[t.type + !0](S.event ? S.event(t) : t);
            }
            function Yt(t, e, n, r, i, o, a, s, l) {
                var c,
                    d,
                    f,
                    p,
                    v,
                    g,
                    b,
                    E,
                    m,
                    w,
                    C,
                    D = e.type;
                if (void 0 !== e.constructor) return null;
                null != n.__h &&
                    ((l = n.__h),
                    (s = e.__e = n.__e),
                    (e.__h = null),
                    (o = [s])),
                    (c = S.__b) && c(e);
                try {
                    e: if ('function' == typeof D) {
                        if (
                            ((E = e.props),
                            (m = (c = D.contextType) && r[c.__c]),
                            (w = c ? (m ? m.props.value : c.__) : r),
                            n.__c
                                ? (b = (d = e.__c = n.__c).__ = d.__E)
                                : ('prototype' in D && D.prototype.render
                                      ? (e.__c = d = new D(E, w))
                                      : ((e.__c = d = new K(E, w)),
                                        (d.constructor = D),
                                        (d.render = Ra)),
                                  m && m.sub(d),
                                  (d.props = E),
                                  d.state || (d.state = {}),
                                  (d.context = w),
                                  (d.__n = r),
                                  (f = d.__d = !0),
                                  (d.__h = [])),
                            null == d.__s && (d.__s = d.state),
                            null != D.getDerivedStateFromProps &&
                                (d.__s == d.state && (d.__s = re({}, d.__s)),
                                re(
                                    d.__s,
                                    D.getDerivedStateFromProps(E, d.__s)
                                )),
                            (p = d.props),
                            (v = d.state),
                            f)
                        )
                            null == D.getDerivedStateFromProps &&
                                null != d.componentWillMount &&
                                d.componentWillMount(),
                                null != d.componentDidMount &&
                                    d.__h.push(d.componentDidMount);
                        else {
                            if (
                                (null == D.getDerivedStateFromProps &&
                                    E !== p &&
                                    null != d.componentWillReceiveProps &&
                                    d.componentWillReceiveProps(E, w),
                                (!d.__e &&
                                    null != d.shouldComponentUpdate &&
                                    !1 ===
                                        d.shouldComponentUpdate(E, d.__s, w)) ||
                                    e.__v === n.__v)
                            ) {
                                (d.props = E),
                                    (d.state = d.__s),
                                    e.__v !== n.__v && (d.__d = !1),
                                    (d.__v = e),
                                    (e.__e = n.__e),
                                    (e.__k = n.__k),
                                    e.__k.forEach(function (_) {
                                        _ && (_.__ = e);
                                    }),
                                    d.__h.length && a.push(d);
                                break e;
                            }
                            null != d.componentWillUpdate &&
                                d.componentWillUpdate(E, d.__s, w),
                                null != d.componentDidUpdate &&
                                    d.__h.push(function () {
                                        d.componentDidUpdate(p, v, g);
                                    });
                        }
                        (d.context = w),
                            (d.props = E),
                            (d.state = d.__s),
                            (c = S.__r) && c(e),
                            (d.__d = !1),
                            (d.__v = e),
                            (d.__P = t),
                            (c = d.render(d.props, d.state, d.context)),
                            (d.state = d.__s),
                            null != d.getChildContext &&
                                (r = re(re({}, r), d.getChildContext())),
                            f ||
                                null == d.getSnapshotBeforeUpdate ||
                                (g = d.getSnapshotBeforeUpdate(p, v)),
                            (C =
                                null != c && c.type === ee && null == c.key
                                    ? c.props.children
                                    : c),
                            mr(
                                t,
                                Array.isArray(C) ? C : [C],
                                e,
                                n,
                                r,
                                i,
                                o,
                                a,
                                s,
                                l
                            ),
                            (d.base = e.__e),
                            (e.__h = null),
                            d.__h.length && a.push(d),
                            b && (d.__E = d.__ = null),
                            (d.__e = !1);
                    } else
                        null == o && e.__v === n.__v
                            ? ((e.__k = n.__k), (e.__e = n.__e))
                            : (e.__e = (function Ta(t, e, n, r, i, o, a, s) {
                                  var l,
                                      c,
                                      d,
                                      f = n.props,
                                      p = e.props,
                                      v = e.type,
                                      g = 0;
                                  if (('svg' === v && (i = !0), null != o))
                                      for (; g < o.length; g++)
                                          if (
                                              (l = o[g]) &&
                                              'setAttribute' in l == !!v &&
                                              (v
                                                  ? l.localName === v
                                                  : 3 === l.nodeType)
                                          ) {
                                              (t = l), (o[g] = null);
                                              break;
                                          }
                                  if (null == t) {
                                      if (null === v)
                                          return document.createTextNode(p);
                                      (t = i
                                          ? document.createElementNS(
                                                'http://www.w3.org/2000/svg',
                                                v
                                            )
                                          : document.createElement(
                                                v,
                                                p.is && p
                                            )),
                                          (o = null),
                                          (s = !1);
                                  }
                                  if (null === v)
                                      f === p ||
                                          (s && t.data === p) ||
                                          (t.data = p);
                                  else {
                                      if (
                                          ((o = o && pe.call(t.childNodes)),
                                          (c = (f = n.props || st)
                                              .dangerouslySetInnerHTML),
                                          (d = p.dangerouslySetInnerHTML),
                                          !s)
                                      ) {
                                          if (null != o)
                                              for (
                                                  f = {}, g = 0;
                                                  g < t.attributes.length;
                                                  g++
                                              )
                                                  f[t.attributes[g].name] =
                                                      t.attributes[g].value;
                                          (d || c) &&
                                              ((d &&
                                                  ((c &&
                                                      d.__html == c.__html) ||
                                                      d.__html ===
                                                          t.innerHTML)) ||
                                                  (t.innerHTML =
                                                      (d && d.__html) || ''));
                                      }
                                      if (
                                          ((function xa(t, e, n, r, i) {
                                              var o;
                                              for (o in n)
                                                  'children' === o ||
                                                      'key' === o ||
                                                      o in e ||
                                                      ct(t, o, null, n[o], r);
                                              for (o in e)
                                                  (i &&
                                                      'function' !=
                                                          typeof e[o]) ||
                                                      'children' === o ||
                                                      'key' === o ||
                                                      'value' === o ||
                                                      'checked' === o ||
                                                      n[o] === e[o] ||
                                                      ct(t, o, e[o], n[o], r);
                                          })(t, p, f, i, s),
                                          d)
                                      )
                                          e.__k = [];
                                      else if (
                                          ((g = e.props.children),
                                          mr(
                                              t,
                                              Array.isArray(g) ? g : [g],
                                              e,
                                              n,
                                              r,
                                              i && 'foreignObject' !== v,
                                              o,
                                              a,
                                              o ? o[0] : n.__k && Te(n, 0),
                                              s
                                          ),
                                          null != o)
                                      )
                                          for (g = o.length; g--; )
                                              null != o[g] && vr(o[g]);
                                      s ||
                                          ('value' in p &&
                                              void 0 !== (g = p.value) &&
                                              (g !== f.value ||
                                                  g !== t.value ||
                                                  ('progress' === v && !g)) &&
                                              ct(t, 'value', g, f.value, !1),
                                          'checked' in p &&
                                              void 0 !== (g = p.checked) &&
                                              g !== t.checked &&
                                              ct(
                                                  t,
                                                  'checked',
                                                  g,
                                                  f.checked,
                                                  !1
                                              ));
                                  }
                                  return t;
                              })(n.__e, e, n, r, i, o, a, l));
                    (c = S.diffed) && c(e);
                } catch (_) {
                    (e.__v = null),
                        (l || null != o) &&
                            ((e.__e = s),
                            (e.__h = !!l),
                            (o[o.indexOf(s)] = null)),
                        S.__e(_, e, n);
                }
            }
            function Dr(t, e) {
                S.__c && S.__c(e, t),
                    t.some(function (n) {
                        try {
                            (t = n.__h),
                                (n.__h = []),
                                t.some(function (r) {
                                    r.call(n);
                                });
                        } catch (r) {
                            S.__e(r, n.__v);
                        }
                    });
            }
            function Cr(t, e, n) {
                try {
                    'function' == typeof t ? t(e) : (t.current = e);
                } catch (r) {
                    S.__e(r, n);
                }
            }
            function Sr(t, e, n) {
                var r, i;
                if (
                    (S.unmount && S.unmount(t),
                    (r = t.ref) &&
                        ((r.current && r.current !== t.__e) || Cr(r, null, e)),
                    null != (r = t.__c))
                ) {
                    if (r.componentWillUnmount)
                        try {
                            r.componentWillUnmount();
                        } catch (o) {
                            S.__e(o, e);
                        }
                    r.base = r.__P = null;
                }
                if ((r = t.__k))
                    for (i = 0; i < r.length; i++)
                        r[i] && Sr(r[i], e, 'function' != typeof t.type);
                n || null == t.__e || vr(t.__e), (t.__e = t.__d = void 0);
            }
            function Ra(t, e, n) {
                return this.constructor(t, n);
            }
            function ve(t, e, n) {
                var r, i, o;
                S.__ && S.__(t, e),
                    (i = (r = 'function' == typeof n)
                        ? null
                        : (n && n.__k) || e.__k),
                    (o = []),
                    Yt(
                        e,
                        (t = ((!r && n) || e).__k = X(ee, null, [t])),
                        i || st,
                        st,
                        void 0 !== e.ownerSVGElement,
                        !r && n
                            ? [n]
                            : i
                            ? null
                            : e.firstChild
                            ? pe.call(e.childNodes)
                            : null,
                        o,
                        !r && n ? n : i ? i.__e : e.firstChild,
                        r
                    ),
                    Dr(o, t);
            }
            (pe = pr.slice),
                (S = {
                    __e: function (t, e) {
                        for (var n, r, i; (e = e.__); )
                            if ((n = e.__c) && !n.__)
                                try {
                                    if (
                                        ((r = n.constructor) &&
                                            null !=
                                                r.getDerivedStateFromError &&
                                            (n.setState(
                                                r.getDerivedStateFromError(t)
                                            ),
                                            (i = n.__d)),
                                        null != n.componentDidCatch &&
                                            (n.componentDidCatch(t),
                                            (i = n.__d)),
                                        i)
                                    )
                                        return (n.__E = n);
                                } catch (o) {
                                    t = o;
                                }
                        throw t;
                    },
                }),
                (cr = 0),
                (K.prototype.setState = function (t, e) {
                    var n;
                    (n =
                        null != this.__s && this.__s !== this.state
                            ? this.__s
                            : (this.__s = re({}, this.state))),
                        'function' == typeof t &&
                            (t = t(re({}, n), this.props)),
                        t && re(n, t),
                        null != t &&
                            this.__v &&
                            (e && this.__h.push(e), jt(this));
                }),
                (K.prototype.forceUpdate = function (t) {
                    this.__v &&
                        ((this.__e = !0), t && this.__h.push(t), jt(this));
                }),
                (K.prototype.render = ee),
                (Ge = []),
                (dr =
                    'function' == typeof Promise
                        ? Promise.prototype.then.bind(Promise.resolve())
                        : setTimeout),
                (lt.__r = 0),
                (ur = 0);
            var Q,
                Rr,
                kr = [],
                _r = S.__b,
                Mr = S.__r,
                Ir = S.diffed,
                Nr = S.__c,
                Pr = S.unmount;
            function Ha() {
                for (var t; (t = kr.shift()); )
                    if (t.__P)
                        try {
                            t.__H.__h.forEach(dt),
                                t.__H.__h.forEach(Jt),
                                (t.__H.__h = []);
                        } catch (e) {
                            (t.__H.__h = []), S.__e(e, t.__v);
                        }
            }
            (S.__b = function (t) {
                (Q = null), _r && _r(t);
            }),
                (S.__r = function (t) {
                    Mr && Mr(t);
                    var e = (Q = t.__c).__H;
                    e && (e.__h.forEach(dt), e.__h.forEach(Jt), (e.__h = []));
                }),
                (S.diffed = function (t) {
                    Ir && Ir(t);
                    var e = t.__c;
                    e &&
                        e.__H &&
                        e.__H.__h.length &&
                        ((1 !== kr.push(e) && Rr === S.requestAnimationFrame) ||
                            (
                                (Rr = S.requestAnimationFrame) ||
                                function (n) {
                                    var r,
                                        i = function () {
                                            clearTimeout(o),
                                                zr && cancelAnimationFrame(r),
                                                setTimeout(n);
                                        },
                                        o = setTimeout(i, 100);
                                    zr && (r = requestAnimationFrame(i));
                                }
                            )(Ha)),
                        (Q = null);
                }),
                (S.__c = function (t, e) {
                    e.some(function (n) {
                        try {
                            n.__h.forEach(dt),
                                (n.__h = n.__h.filter(function (r) {
                                    return !r.__ || Jt(r);
                                }));
                        } catch (r) {
                            e.some(function (i) {
                                i.__h && (i.__h = []);
                            }),
                                (e = []),
                                S.__e(r, n.__v);
                        }
                    }),
                        Nr && Nr(t, e);
                }),
                (S.unmount = function (t) {
                    Pr && Pr(t);
                    var e,
                        n = t.__c;
                    n &&
                        n.__H &&
                        (n.__H.__.forEach(function (r) {
                            try {
                                dt(r);
                            } catch (i) {
                                e = i;
                            }
                        }),
                        e && S.__e(e, n.__v));
                });
            var zr = 'function' == typeof requestAnimationFrame;
            function dt(t) {
                var e = Q,
                    n = t.__c;
                'function' == typeof n && ((t.__c = void 0), n()), (Q = e);
            }
            function Jt(t) {
                var e = Q;
                (t.__c = t.__()), (Q = e);
            }
            function Kt(t, e) {
                for (var n in t) if ('__source' !== n && !(n in e)) return !0;
                for (var r in e)
                    if ('__source' !== r && t[r] !== e[r]) return !0;
                return !1;
            }
            function $t(t) {
                this.props = t;
            }
            (($t.prototype = new K()).isPureReactComponent = !0),
                ($t.prototype.shouldComponentUpdate = function (t, e) {
                    return Kt(this.props, t) || Kt(this.state, e);
                });
            var Lr = S.__b;
            (S.__b = function (t) {
                t.type &&
                    t.type.__f &&
                    t.ref &&
                    ((t.props.ref = t.ref), (t.ref = null)),
                    Lr && Lr(t);
            }),
                'undefined' != typeof Symbol &&
                    Symbol.for &&
                    Symbol.for('react.forward_ref');
            var La = S.__e;
            S.__e = function (t, e, n) {
                if (t.then)
                    for (var r, i = e; (i = i.__); )
                        if ((r = i.__c) && r.__c)
                            return (
                                null == e.__e &&
                                    ((e.__e = n.__e), (e.__k = n.__k)),
                                r.__c(t, e)
                            );
                La(t, e, n);
            };
            var Wr = S.unmount;
            function ft() {
                (this.__u = 0), (this.t = null), (this.__b = null);
            }
            function Vr(t) {
                var e = t.__.__c;
                return e && e.__e && e.__e(t);
            }
            function je() {
                (this.u = null), (this.o = null);
            }
            (S.unmount = function (t) {
                var e = t.__c;
                e && e.__R && e.__R(),
                    e && !0 === t.__h && (t.type = null),
                    Wr && Wr(t);
            }),
                ((ft.prototype = new K()).__c = function (t, e) {
                    var n = e.__c,
                        r = this;
                    null == r.t && (r.t = []), r.t.push(n);
                    var i = Vr(r.__v),
                        o = !1,
                        a = function () {
                            o || ((o = !0), (n.__R = null), i ? i(s) : s());
                        };
                    n.__R = a;
                    var s = function () {
                            if (!--r.__u) {
                                if (r.state.__e) {
                                    var c = r.state.__e;
                                    r.__v.__k[0] = (function f(p, v, g) {
                                        return (
                                            p &&
                                                ((p.__v = null),
                                                (p.__k =
                                                    p.__k &&
                                                    p.__k.map(function (b) {
                                                        return f(b, v, g);
                                                    })),
                                                p.__c &&
                                                    p.__c.__P === v &&
                                                    (p.__e &&
                                                        g.insertBefore(
                                                            p.__e,
                                                            p.__d
                                                        ),
                                                    (p.__c.__e = !0),
                                                    (p.__c.__P = g))),
                                            p
                                        );
                                    })(c, c.__c.__P, c.__c.__O);
                                }
                                var d;
                                for (
                                    r.setState({ __e: (r.__b = null) });
                                    (d = r.t.pop());

                                )
                                    d.forceUpdate();
                            }
                        },
                        l = !0 === e.__h;
                    r.__u++ || l || r.setState({ __e: (r.__b = r.__v.__k[0]) }),
                        t.then(a, a);
                }),
                (ft.prototype.componentWillUnmount = function () {
                    this.t = [];
                }),
                (ft.prototype.render = function (t, e) {
                    if (this.__b) {
                        if (this.__v.__k) {
                            var n = document.createElement('div'),
                                r = this.__v.__k[0].__c;
                            this.__v.__k[0] = (function o(a, s, l) {
                                return (
                                    a &&
                                        (a.__c &&
                                            a.__c.__H &&
                                            (a.__c.__H.__.forEach(function (c) {
                                                'function' == typeof c.__c &&
                                                    c.__c();
                                            }),
                                            (a.__c.__H = null)),
                                        null !=
                                            (a = (function Ur(t, e) {
                                                for (var n in e) t[n] = e[n];
                                                return t;
                                            })({}, a)).__c &&
                                            (a.__c.__P === l && (a.__c.__P = s),
                                            (a.__c = null)),
                                        (a.__k =
                                            a.__k &&
                                            a.__k.map(function (c) {
                                                return o(c, s, l);
                                            }))),
                                    a
                                );
                            })(this.__b, n, (r.__O = r.__P));
                        }
                        this.__b = null;
                    }
                    var i = e.__e && X(ee, null, t.fallback);
                    return (
                        i && (i.__h = null),
                        [X(ee, null, e.__e ? null : t.children), i]
                    );
                });
            var Gr = function (t, e, n) {
                if (
                    (++n[1] === n[0] && t.o.delete(e),
                    t.props.revealOrder &&
                        ('t' !== t.props.revealOrder[0] || !t.o.size))
                )
                    for (n = t.u; n; ) {
                        for (; n.length > 3; ) n.pop()();
                        if (n[1] < n[0]) break;
                        t.u = n = n[2];
                    }
            };
            function Wa(t) {
                return (
                    (this.getChildContext = function () {
                        return t.context;
                    }),
                    t.children
                );
            }
            function Va(t) {
                var e = this,
                    n = t.i;
                (e.componentWillUnmount = function () {
                    ve(null, e.l), (e.l = null), (e.i = null);
                }),
                    e.i && e.i !== n && e.componentWillUnmount(),
                    t.__v
                        ? (e.l ||
                              ((e.i = n),
                              (e.l = {
                                  nodeType: 1,
                                  parentNode: n,
                                  childNodes: [],
                                  appendChild: function (r) {
                                      this.childNodes.push(r),
                                          e.i.appendChild(r);
                                  },
                                  insertBefore: function (r, i) {
                                      this.childNodes.push(r),
                                          e.i.appendChild(r);
                                  },
                                  removeChild: function (r) {
                                      this.childNodes.splice(
                                          this.childNodes.indexOf(r) >>> 1,
                                          1
                                      ),
                                          e.i.removeChild(r);
                                  },
                              })),
                          ve(X(Wa, { context: e.context }, t.__v), e.l))
                        : e.l && e.componentWillUnmount();
            }
            ((je.prototype = new K()).__e = function (t) {
                var e = this,
                    n = Vr(e.__v),
                    r = e.o.get(t);
                return (
                    r[0]++,
                    function (i) {
                        var o = function () {
                            e.props.revealOrder
                                ? (r.push(i), Gr(e, t, r))
                                : i();
                        };
                        n ? n(o) : o();
                    }
                );
            }),
                (je.prototype.render = function (t) {
                    (this.u = null), (this.o = new Map());
                    var e = ie(t.children);
                    t.revealOrder && 'b' === t.revealOrder[0] && e.reverse();
                    for (var n = e.length; n--; )
                        this.o.set(e[n], (this.u = [1, 0, this.u]));
                    return t.children;
                }),
                (je.prototype.componentDidUpdate =
                    je.prototype.componentDidMount =
                        function () {
                            var t = this;
                            this.o.forEach(function (e, n) {
                                Gr(t, n, e);
                            });
                        });
            var jr =
                    ('undefined' != typeof Symbol &&
                        Symbol.for &&
                        Symbol.for('react.element')) ||
                    60103,
                Ga =
                    /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
                Za = 'undefined' != typeof document,
                ja = function (t) {
                    return (
                        'undefined' != typeof Symbol &&
                        'symbol' == typeof Symbol()
                            ? /fil|che|rad/i
                            : /fil|che|ra/i
                    ).test(t);
                };
            (K.prototype.isReactComponent = {}),
                [
                    'componentWillMount',
                    'componentWillReceiveProps',
                    'componentWillUpdate',
                ].forEach(function (t) {
                    Object.defineProperty(K.prototype, t, {
                        configurable: !0,
                        get: function () {
                            return this['UNSAFE_' + t];
                        },
                        set: function (e) {
                            Object.defineProperty(this, t, {
                                configurable: !0,
                                writable: !0,
                                value: e,
                            });
                        },
                    });
                });
            var Yr = S.event;
            function Ja() {}
            function Xa() {
                return this.cancelBubble;
            }
            function Ka() {
                return this.defaultPrevented;
            }
            S.event = function (t) {
                return (
                    Yr && (t = Yr(t)),
                    (t.persist = Ja),
                    (t.isPropagationStopped = Xa),
                    (t.isDefaultPrevented = Ka),
                    (t.nativeEvent = t)
                );
            };
            var Jr = {
                    configurable: !0,
                    get: function () {
                        return this.class;
                    },
                },
                Xr = S.vnode;
            S.vnode = function (t) {
                var e = t.type,
                    n = t.props,
                    r = n;
                if ('string' == typeof e) {
                    var i = -1 === e.indexOf('-');
                    for (var o in ((r = {}), n)) {
                        var a = n[o];
                        (Za && 'children' === o && 'noscript' === e) ||
                            ('value' === o &&
                                'defaultValue' in n &&
                                null == a) ||
                            ('defaultValue' === o &&
                            'value' in n &&
                            null == n.value
                                ? (o = 'value')
                                : 'download' === o && !0 === a
                                ? (a = '')
                                : /ondoubleclick/i.test(o)
                                ? (o = 'ondblclick')
                                : /^onchange(textarea|input)/i.test(o + e) &&
                                  !ja(n.type)
                                ? (o = 'oninput')
                                : /^onfocus$/i.test(o)
                                ? (o = 'onfocusin')
                                : /^onblur$/i.test(o)
                                ? (o = 'onfocusout')
                                : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o)
                                ? (o = o.toLowerCase())
                                : i && Ga.test(o)
                                ? (o = o
                                      .replace(/[A-Z0-9]/, '-$&')
                                      .toLowerCase())
                                : null === a && (a = void 0),
                            (r[o] = a));
                    }
                    'select' == e &&
                        r.multiple &&
                        Array.isArray(r.value) &&
                        (r.value = ie(n.children).forEach(function (s) {
                            s.props.selected =
                                -1 != r.value.indexOf(s.props.value);
                        })),
                        'select' == e &&
                            null != r.defaultValue &&
                            (r.value = ie(n.children).forEach(function (s) {
                                s.props.selected = r.multiple
                                    ? -1 !=
                                      r.defaultValue.indexOf(s.props.value)
                                    : r.defaultValue == s.props.value;
                            })),
                        (t.props = r),
                        n.class != n.className &&
                            ((Jr.enumerable = 'className' in n),
                            null != n.className && (r.class = n.className),
                            Object.defineProperty(r, 'className', Jr));
                }
                (t.$$typeof = jr), Xr && Xr(t);
            };
            var Kr = S.__r;
            S.__r = function (t) {
                Kr && Kr(t);
            };
            var ei = 'undefined' != typeof globalThis ? globalThis : window;
            ei.FullCalendarVDom
                ? console.warn('FullCalendar VDOM already loaded')
                : (ei.FullCalendarVDom = {
                      Component: K,
                      createElement: X,
                      render: ve,
                      createRef: function hr() {
                          return { current: null };
                      },
                      Fragment: ee,
                      createContext: function ls(t) {
                          var e = (function Tr(t, e) {
                                  var n = {
                                      __c: (e = '__cC' + ur++),
                                      __: t,
                                      Consumer: function (r, i) {
                                          return r.children(i);
                                      },
                                      Provider: function (r) {
                                          var i, o;
                                          return (
                                              this.getChildContext ||
                                                  ((i = []),
                                                  ((o = {})[e] = this),
                                                  (this.getChildContext =
                                                      function () {
                                                          return o;
                                                      }),
                                                  (this.shouldComponentUpdate =
                                                      function (a) {
                                                          this.props.value !==
                                                              a.value &&
                                                              i.some(jt);
                                                      }),
                                                  (this.sub = function (a) {
                                                      i.push(a);
                                                      var s =
                                                          a.componentWillUnmount;
                                                      a.componentWillUnmount =
                                                          function () {
                                                              i.splice(
                                                                  i.indexOf(a),
                                                                  1
                                                              ),
                                                                  s &&
                                                                      s.call(a);
                                                          };
                                                  })),
                                              r.children
                                          );
                                      },
                                  };
                                  return (n.Provider.__ =
                                      n.Consumer.contextType =
                                          n);
                              })(t),
                              n = e.Provider;
                          return (
                              (e.Provider = function () {
                                  var r = this,
                                      i = !this.getChildContext,
                                      o = n.apply(this, arguments);
                                  if (i) {
                                      var a = [];
                                      (this.shouldComponentUpdate = function (
                                          s
                                      ) {
                                          r.props.value !== s.value &&
                                              a.forEach(function (l) {
                                                  (l.context = s.value),
                                                      l.forceUpdate();
                                              });
                                      }),
                                          (this.sub = function (s) {
                                              a.push(s);
                                              var l = s.componentWillUnmount;
                                              s.componentWillUnmount =
                                                  function () {
                                                      a.splice(a.indexOf(s), 1),
                                                          l && l.call(s);
                                                  };
                                          });
                                  }
                                  return o;
                              }),
                              e
                          );
                      },
                      createPortal: function Zr(t, e) {
                          return X(Va, { __v: t, i: e });
                      },
                      flushToDom: function as() {
                          var t = S.debounceRendering,
                              e = [];
                          for (
                              S.debounceRendering = function n(r) {
                                  e.push(r);
                              },
                                  ve(X(ss, {}), document.createElement('div'));
                              e.length;

                          )
                              e.shift()();
                          S.debounceRendering = t;
                      },
                      unmountComponentAtNode: function cs(t) {
                          ve(null, t);
                      },
                  });
            var ss = (function (t) {
                function e() {
                    return (null !== t && t.apply(this, arguments)) || this;
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.render = function () {
                        return X('div', {});
                    }),
                    (e.prototype.componentDidMount = function () {
                        this.setState({});
                    }),
                    e
                );
            })(K);
            if ((R(4602), 'undefined' == typeof FullCalendarVDom))
                throw new Error(
                    'Please import the top-level fullcalendar lib before attempting to import a plugin.'
                );
            var en = FullCalendarVDom.Component,
                h = FullCalendarVDom.createElement,
                ds = FullCalendarVDom.render,
                U = FullCalendarVDom.createRef,
                L = FullCalendarVDom.Fragment,
                ti = FullCalendarVDom.createContext,
                fs = FullCalendarVDom.createPortal,
                ni = FullCalendarVDom.flushToDom,
                us = FullCalendarVDom.unmountComponentAtNode,
                _e = (function () {
                    function t(e, n) {
                        (this.context = e), (this.internalEventSource = n);
                    }
                    return (
                        (t.prototype.remove = function () {
                            this.context.dispatch({
                                type: 'REMOVE_EVENT_SOURCE',
                                sourceId: this.internalEventSource.sourceId,
                            });
                        }),
                        (t.prototype.refetch = function () {
                            this.context.dispatch({
                                type: 'FETCH_EVENT_SOURCES',
                                sourceIds: [this.internalEventSource.sourceId],
                                isRefetch: !0,
                            });
                        }),
                        Object.defineProperty(t.prototype, 'id', {
                            get: function () {
                                return this.internalEventSource.publicId;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'url', {
                            get: function () {
                                return this.internalEventSource.meta.url;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'format', {
                            get: function () {
                                return this.internalEventSource.meta.format;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        t
                    );
                })();
            function tn(t) {
                t.parentNode && t.parentNode.removeChild(t);
            }
            function W(t, e) {
                if (t.closest) return t.closest(e);
                if (!document.documentElement.contains(t)) return null;
                do {
                    if (nn(t, e)) return t;
                    t = t.parentElement || t.parentNode;
                } while (null !== t && 1 === t.nodeType);
                return null;
            }
            function nn(t, e) {
                return (
                    t.matches ||
                    t.matchesSelector ||
                    t.msMatchesSelector
                ).call(t, e);
            }
            var vs = /(top|left|right|bottom|width|height)$/i;
            function Ye(t, e) {
                for (var n in e) ri(t, n, e[n]);
            }
            function ri(t, e, n) {
                t.style[e] =
                    null == n
                        ? ''
                        : 'number' == typeof n && vs.test(e)
                        ? n + 'px'
                        : n;
            }
            function ii(t) {
                var e, n;
                return null !==
                    (n =
                        null === (e = t.composedPath) || void 0 === e
                            ? void 0
                            : e.call(t)[0]) && void 0 !== n
                    ? n
                    : t.target;
            }
            function oi(t) {
                return t.getRootNode ? t.getRootNode() : document;
            }
            var ai = 0;
            function ut() {
                return 'fc-dom-' + (ai += 1);
            }
            function pt(t) {
                t.preventDefault();
            }
            function si(t, e, n, r) {
                var i = (function hs(t, e) {
                    return function (n) {
                        var r = W(n.target, t);
                        r && e.call(r, n, r);
                    };
                })(n, r);
                return (
                    t.addEventListener(e, i),
                    function () {
                        t.removeEventListener(e, i);
                    }
                );
            }
            var li = [
                'webkitTransitionEnd',
                'otransitionend',
                'oTransitionEnd',
                'msTransitionEnd',
                'transitionend',
            ];
            function ci(t) {
                return (0, u.pi)({ onClick: t }, di(t));
            }
            function di(t) {
                return {
                    tabIndex: 0,
                    onKeyDown: function (e) {
                        ('Enter' === e.key || ' ' === e.key) &&
                            (t(e), e.preventDefault());
                    },
                };
            }
            var fi = 0;
            function Me() {
                return String((fi += 1));
            }
            function vt() {
                document.body.classList.add('fc-not-allowed');
            }
            function ht() {
                document.body.classList.remove('fc-not-allowed');
            }
            function Cs(t, e, n) {
                return n.func
                    ? n.func(t, e)
                    : (function Ss(t, e) {
                          return t || e
                              ? null == e
                                  ? -1
                                  : null == t
                                  ? 1
                                  : 'string' == typeof t || 'string' == typeof e
                                  ? String(t).localeCompare(String(e))
                                  : t - e
                              : 0;
                      })(t[n.field], e[n.field]) * (n.order || 1);
            }
            function Ie(t, e) {
                var n = String(t);
                return '000'.substr(0, e - n.length) + n;
            }
            function qe(t, e, n) {
                return 'function' == typeof t
                    ? t.apply(void 0, e)
                    : 'string' == typeof t
                    ? e.reduce(function (r, i, o) {
                          return r.replace('$' + o, i || '');
                      }, t)
                    : n;
            }
            function xs(t, e) {
                return t - e;
            }
            function gt(t) {
                return t % 1 == 0;
            }
            function Ts(t) {
                var e = t.querySelector('.fc-scrollgrid-shrink-frame'),
                    n = t.querySelector('.fc-scrollgrid-shrink-cushion');
                if (!e)
                    throw new Error(
                        'needs fc-scrollgrid-shrink-frame className'
                    );
                if (!n)
                    throw new Error(
                        'needs fc-scrollgrid-shrink-cushion className'
                    );
                return (
                    t.getBoundingClientRect().width -
                    e.getBoundingClientRect().width +
                    n.getBoundingClientRect().width
                );
            }
            var ui = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
            function pi(t, e) {
                var n = ge(t);
                return (n[2] += 7 * e), j(n);
            }
            function G(t, e) {
                var n = ge(t);
                return (n[2] += e), j(n);
            }
            function De(t, e) {
                var n = ge(t);
                return (n[6] += e), j(n);
            }
            function he(t, e) {
                return (e.valueOf() - t.valueOf()) / 864e5;
            }
            function mt(t, e) {
                return me(t) === me(e) ? Math.round(he(t, e)) : null;
            }
            function H(t) {
                return j([t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()]);
            }
            function rn(t, e, n, r) {
                var i = j([e, 0, 1 + zs(e, n, r)]),
                    o = H(t),
                    a = Math.round(he(i, o));
                return Math.floor(a / 7) + 1;
            }
            function zs(t, e, n) {
                var r = 7 + e - n;
                return (-(7 + j([t, 0, r]).getUTCDay() - e) % 7) + r - 1;
            }
            function vi(t) {
                return [
                    t.getFullYear(),
                    t.getMonth(),
                    t.getDate(),
                    t.getHours(),
                    t.getMinutes(),
                    t.getSeconds(),
                    t.getMilliseconds(),
                ];
            }
            function hi(t) {
                return new Date(
                    t[0],
                    t[1] || 0,
                    null == t[2] ? 1 : t[2],
                    t[3] || 0,
                    t[4] || 0,
                    t[5] || 0
                );
            }
            function ge(t) {
                return [
                    t.getUTCFullYear(),
                    t.getUTCMonth(),
                    t.getUTCDate(),
                    t.getUTCHours(),
                    t.getUTCMinutes(),
                    t.getUTCSeconds(),
                    t.getUTCMilliseconds(),
                ];
            }
            function j(t) {
                return (
                    1 === t.length && (t = t.concat([0])),
                    new Date(Date.UTC.apply(Date, t))
                );
            }
            function gi(t) {
                return !isNaN(t.valueOf());
            }
            function me(t) {
                return (
                    1e3 * t.getUTCHours() * 60 * 60 +
                    1e3 * t.getUTCMinutes() * 60 +
                    1e3 * t.getUTCSeconds() +
                    t.getUTCMilliseconds()
                );
            }
            function yt(t, e, n, r) {
                return {
                    instanceId: Me(),
                    defId: t,
                    range: e,
                    forcedStartTzo: null == n ? null : n,
                    forcedEndTzo: null == r ? null : r,
                };
            }
            var bt = Object.prototype.hasOwnProperty;
            function on(t, e) {
                var n = {};
                if (e)
                    for (var r in e) {
                        for (var i = [], o = t.length - 1; o >= 0; o -= 1) {
                            var a = t[o][r];
                            if ('object' == typeof a && a) i.unshift(a);
                            else if (void 0 !== a) {
                                n[r] = a;
                                break;
                            }
                        }
                        i.length && (n[r] = on(i));
                    }
                for (o = t.length - 1; o >= 0; o -= 1) {
                    var s = t[o];
                    for (var l in s) l in n || (n[l] = s[l]);
                }
                return n;
            }
            function Ce(t, e) {
                var n = {};
                for (var r in t) e(t[r], r) && (n[r] = t[r]);
                return n;
            }
            function oe(t, e) {
                var n = {};
                for (var r in t) n[r] = e(t[r], r);
                return n;
            }
            function mi(t) {
                for (var e = {}, n = 0, r = t; n < r.length; n++) e[r[n]] = !0;
                return e;
            }
            function an(t) {
                var e = [];
                for (var n in t) e.push(t[n]);
                return e;
            }
            function ae(t, e) {
                if (t === e) return !0;
                for (var n in t) if (bt.call(t, n) && !(n in e)) return !1;
                for (var n in e) if (bt.call(e, n) && t[n] !== e[n]) return !1;
                return !0;
            }
            function yi(t, e) {
                var n = [];
                for (var r in t) bt.call(t, r) && (r in e || n.push(r));
                for (var r in e) bt.call(e, r) && t[r] !== e[r] && n.push(r);
                return n;
            }
            function bi(t, e, n) {
                if ((void 0 === n && (n = {}), t === e)) return !0;
                for (var r in e)
                    if (!(r in t) || !Fs(t[r], e[r], n[r])) return !1;
                for (var r in t) if (!(r in e)) return !1;
                return !0;
            }
            function Fs(t, e, n) {
                return t === e || !0 === n || (!!n && n(t, e));
            }
            function Ne(t, e, n) {
                var r = n.dateEnv,
                    i = n.pluginHooks,
                    o = n.options,
                    a = t.defs,
                    s = t.instances;
                for (var l in ((s = Ce(s, function (E) {
                    return !a[E.defId].recurringDef;
                })),
                a)) {
                    var c = a[l];
                    if (c.recurringDef) {
                        var d = c.recurringDef.duration;
                        d ||
                            (d = c.allDay
                                ? o.defaultAllDayEventDuration
                                : o.defaultTimedEventDuration);
                        for (
                            var p = 0, v = Qs(c, d, e, r, i.recurringTypes);
                            p < v.length;
                            p++
                        ) {
                            var g = v[p],
                                b = yt(l, { start: g, end: r.add(g, d) });
                            s[b.instanceId] = b;
                        }
                    }
                }
                return { defs: a, instances: s };
            }
            function Qs(t, e, n, r, i) {
                var a = i[t.recurringDef.typeId].expand(
                    t.recurringDef.typeData,
                    { start: r.subtract(n.start, e), end: n.end },
                    r
                );
                return t.allDay && (a = a.map(H)), a;
            }
            var Ai = ['years', 'months', 'days', 'milliseconds'],
                Ws = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
            function M(t, e) {
                var n;
                return 'string' == typeof t
                    ? (function Vs(t) {
                          var e = Ws.exec(t);
                          if (e) {
                              var n = e[1] ? -1 : 1;
                              return {
                                  years: 0,
                                  months: 0,
                                  days: n * (e[2] ? parseInt(e[2], 10) : 0),
                                  milliseconds:
                                      n *
                                      (60 *
                                          (e[3] ? parseInt(e[3], 10) : 0) *
                                          60 *
                                          1e3 +
                                          60 *
                                              (e[4] ? parseInt(e[4], 10) : 0) *
                                              1e3 +
                                          1e3 *
                                              (e[5] ? parseInt(e[5], 10) : 0) +
                                          (e[6] ? parseInt(e[6], 10) : 0)),
                              };
                          }
                          return null;
                      })(t)
                    : 'object' == typeof t && t
                    ? Ei(t)
                    : 'number' == typeof t
                    ? Ei((((n = {})[e || 'milliseconds'] = t), n))
                    : null;
            }
            function Ei(t) {
                var e = {
                        years: t.years || t.year || 0,
                        months: t.months || t.month || 0,
                        days: t.days || t.day || 0,
                        milliseconds:
                            60 * (t.hours || t.hour || 0) * 60 * 1e3 +
                            60 * (t.minutes || t.minute || 0) * 1e3 +
                            1e3 * (t.seconds || t.second || 0) +
                            (t.milliseconds || t.millisecond || t.ms || 0),
                    },
                    n = t.weeks || t.week;
                return n && ((e.days += 7 * n), (e.specifiedWeeks = !0)), e;
            }
            function sn(t, e) {
                return {
                    years: t.years + e.years,
                    months: t.months + e.months,
                    days: t.days + e.days,
                    milliseconds: t.milliseconds + e.milliseconds,
                };
            }
            function Pe(t) {
                return Y(t) / 864e5;
            }
            function Y(t) {
                return (
                    31536e6 * t.years +
                    2592e6 * t.months +
                    864e5 * t.days +
                    t.milliseconds
                );
            }
            function ln(t, e) {
                for (var n = null, r = 0; r < Ai.length; r += 1) {
                    var i = Ai[r];
                    if (e[i]) {
                        var o = t[i] / e[i];
                        if (!gt(o) || (null !== n && n !== o)) return null;
                        n = o;
                    } else if (t[i]) return null;
                }
                return n;
            }
            function cn(t) {
                var e = t.milliseconds;
                if (e) {
                    if (e % 1e3 != 0) return { unit: 'millisecond', value: e };
                    if (e % 6e4 != 0) return { unit: 'second', value: e / 1e3 };
                    if (e % 36e5 != 0)
                        return { unit: 'minute', value: e / 6e4 };
                    if (e) return { unit: 'hour', value: e / 36e5 };
                }
                return t.days
                    ? t.specifiedWeeks && t.days % 7 == 0
                        ? { unit: 'week', value: t.days / 7 }
                        : { unit: 'day', value: t.days }
                    : t.months
                    ? { unit: 'month', value: t.months }
                    : t.years
                    ? { unit: 'year', value: t.years }
                    : { unit: 'millisecond', value: 0 };
            }
            function wi(t, e, n) {
                void 0 === n && (n = !1);
                var r = t.toISOString();
                return (
                    (r = r.replace('.000', '')),
                    n && (r = r.replace('T00:00:00Z', '')),
                    r.length > 10 &&
                        (null == e
                            ? (r = r.replace('Z', ''))
                            : 0 !== e && (r = r.replace('Z', dn(e, !0)))),
                    r
                );
            }
            function Di(t) {
                return t.toISOString().replace(/T.*$/, '');
            }
            function Js(t) {
                return (
                    Ie(t.getUTCHours(), 2) +
                    ':' +
                    Ie(t.getUTCMinutes(), 2) +
                    ':' +
                    Ie(t.getUTCSeconds(), 2)
                );
            }
            function dn(t, e) {
                void 0 === e && (e = !1);
                var n = t < 0 ? '-' : '+',
                    r = Math.abs(t),
                    i = Math.floor(r / 60),
                    o = Math.round(r % 60);
                return e
                    ? n + Ie(i, 2) + ':' + Ie(o, 2)
                    : 'GMT' + n + i + (o ? ':' + Ie(o, 2) : '');
            }
            function ye(t, e, n) {
                if (t === e) return !0;
                var i,
                    r = t.length;
                if (r !== e.length) return !1;
                for (i = 0; i < r; i += 1)
                    if (!(n ? n(t[i], e[i]) : t[i] === e[i])) return !1;
                return !0;
            }
            function x(t, e, n) {
                var r, i;
                return function () {
                    for (var o = [], a = 0; a < arguments.length; a++)
                        o[a] = arguments[a];
                    if (r) {
                        if (!ye(r, o)) {
                            n && n(i);
                            var s = t.apply(this, o);
                            (!e || !e(s, i)) && (i = s);
                        }
                    } else i = t.apply(this, o);
                    return (r = o), i;
                };
            }
            function At(t, e, n) {
                var i,
                    o,
                    r = this;
                return function (a) {
                    if (i) {
                        if (!ae(i, a)) {
                            n && n(o);
                            var s = t.call(r, a);
                            (!e || !e(s, o)) && (o = s);
                        }
                    } else o = t.call(r, a);
                    return (i = a), o;
                };
            }
            var Ci = {
                    week: 3,
                    separator: 0,
                    omitZeroMinute: 0,
                    meridiem: 0,
                    omitCommas: 0,
                },
                Et = {
                    timeZoneName: 7,
                    era: 6,
                    year: 5,
                    month: 4,
                    day: 2,
                    weekday: 2,
                    hour: 1,
                    minute: 1,
                    second: 1,
                },
                wt = /\s*([ap])\.?m\.?/i,
                Xs = /,/g,
                Ks = /\s+/g,
                $s = /\u200e/g,
                el = /UTC|GMT/,
                tl = (function () {
                    function t(e) {
                        var n = {},
                            r = {},
                            i = 0;
                        for (var o in e)
                            o in Ci
                                ? ((r[o] = e[o]), (i = Math.max(Ci[o], i)))
                                : ((n[o] = e[o]),
                                  o in Et && (i = Math.max(Et[o], i)));
                        (this.standardDateProps = n),
                            (this.extendedSettings = r),
                            (this.severity = i),
                            (this.buildFormattingFunc = x(Si));
                    }
                    return (
                        (t.prototype.format = function (e, n) {
                            return this.buildFormattingFunc(
                                this.standardDateProps,
                                this.extendedSettings,
                                n
                            )(e);
                        }),
                        (t.prototype.formatRange = function (e, n, r, i) {
                            var a = this.standardDateProps,
                                s = this.extendedSettings,
                                l = (function sl(t, e, n) {
                                    return n.getMarkerYear(t) !==
                                        n.getMarkerYear(e)
                                        ? 5
                                        : n.getMarkerMonth(t) !==
                                          n.getMarkerMonth(e)
                                        ? 4
                                        : n.getMarkerDay(t) !==
                                          n.getMarkerDay(e)
                                        ? 2
                                        : me(t) !== me(e)
                                        ? 1
                                        : 0;
                                })(e.marker, n.marker, r.calendarSystem);
                            if (!l) return this.format(e, r);
                            var c = l;
                            c > 1 &&
                                ('numeric' === a.year ||
                                    '2-digit' === a.year) &&
                                ('numeric' === a.month ||
                                    '2-digit' === a.month) &&
                                ('numeric' === a.day || '2-digit' === a.day) &&
                                (c = 1);
                            var d = this.format(e, r),
                                f = this.format(n, r);
                            if (d === f) return d;
                            var p = (function ll(t, e) {
                                    var n = {};
                                    for (var r in t)
                                        (!(r in Et) || Et[r] <= e) &&
                                            (n[r] = t[r]);
                                    return n;
                                })(a, c),
                                v = Si(p, s, r),
                                g = v(e),
                                b = v(n),
                                E = (function cl(t, e, n, r) {
                                    for (var i = 0; i < t.length; ) {
                                        var o = t.indexOf(e, i);
                                        if (-1 === o) break;
                                        for (
                                            var a = t.substr(0, o),
                                                s = t.substr(
                                                    (i = o + e.length)
                                                ),
                                                l = 0;
                                            l < n.length;

                                        ) {
                                            var c = n.indexOf(r, l);
                                            if (-1 === c) break;
                                            var d = n.substr(0, c),
                                                f = n.substr(
                                                    (l = c + r.length)
                                                );
                                            if (a === d && s === f)
                                                return { before: a, after: s };
                                        }
                                    }
                                    return null;
                                })(d, g, f, b),
                                m =
                                    s.separator ||
                                    i ||
                                    r.defaultSeparator ||
                                    '';
                            return E
                                ? E.before + g + m + b + E.after
                                : d + m + f;
                        }),
                        (t.prototype.getLargestUnit = function () {
                            switch (this.severity) {
                                case 7:
                                case 6:
                                case 5:
                                    return 'year';
                                case 4:
                                    return 'month';
                                case 3:
                                    return 'week';
                                case 2:
                                    return 'day';
                                default:
                                    return 'time';
                            }
                        }),
                        t
                    );
                })();
            function Si(t, e, n) {
                var r = Object.keys(t).length;
                return 1 === r && 'short' === t.timeZoneName
                    ? function (i) {
                          return dn(i.timeZoneOffset);
                      }
                    : 0 === r && e.week
                    ? function (i) {
                          return (function al(t, e, n, r, i) {
                              var o = [];
                              return (
                                  'long' === i
                                      ? o.push(n)
                                      : ('short' === i || 'narrow' === i) &&
                                        o.push(e),
                                  ('long' === i || 'short' === i) &&
                                      o.push(' '),
                                  o.push(r.simpleNumberFormat.format(t)),
                                  'rtl' === r.options.direction && o.reverse(),
                                  o.join('')
                              );
                          })(
                              n.computeWeekNumber(i.marker),
                              n.weekText,
                              n.weekTextLong,
                              n.locale,
                              e.week
                          );
                      }
                    : (function nl(t, e, n) {
                          (t = (0, u.pi)({}, t)),
                              (e = (0, u.pi)({}, e)),
                              (function rl(t, e) {
                                  t.timeZoneName &&
                                      (t.hour || (t.hour = '2-digit'),
                                      t.minute || (t.minute = '2-digit')),
                                      'long' === t.timeZoneName &&
                                          (t.timeZoneName = 'short'),
                                      e.omitZeroMinute &&
                                          (t.second || t.millisecond) &&
                                          delete e.omitZeroMinute;
                              })(t, e),
                              (t.timeZone = 'UTC');
                          var i,
                              r = new Intl.DateTimeFormat(n.locale.codes, t);
                          if (e.omitZeroMinute) {
                              var o = (0, u.pi)({}, t);
                              delete o.minute,
                                  (i = new Intl.DateTimeFormat(
                                      n.locale.codes,
                                      o
                                  ));
                          }
                          return function (a) {
                              var s = a.marker;
                              return (function il(t, e, n, r, i) {
                                  return (
                                      (t = t.replace($s, '')),
                                      'short' === n.timeZoneName &&
                                          (t = (function ol(t, e) {
                                              var n = !1;
                                              return (
                                                  (t = t.replace(
                                                      el,
                                                      function () {
                                                          return (n = !0), e;
                                                      }
                                                  )),
                                                  n || (t += ' ' + e),
                                                  t
                                              );
                                          })(
                                              t,
                                              'UTC' === i.timeZone ||
                                                  null == e.timeZoneOffset
                                                  ? 'UTC'
                                                  : dn(e.timeZoneOffset)
                                          )),
                                      r.omitCommas &&
                                          (t = t.replace(Xs, '').trim()),
                                      r.omitZeroMinute &&
                                          (t = t.replace(':00', '')),
                                      !1 === r.meridiem
                                          ? (t = t.replace(wt, '').trim())
                                          : 'narrow' === r.meridiem
                                          ? (t = t.replace(wt, function (o, a) {
                                                return a.toLocaleLowerCase();
                                            }))
                                          : 'short' === r.meridiem
                                          ? (t = t.replace(wt, function (o, a) {
                                                return (
                                                    a.toLocaleLowerCase() + 'm'
                                                );
                                            }))
                                          : 'lowercase' === r.meridiem &&
                                            (t = t.replace(wt, function (o) {
                                                return o.toLocaleLowerCase();
                                            })),
                                      (t = t.replace(Ks, ' ')).trim()
                                  );
                              })(
                                  (i && !s.getUTCMinutes() ? i : r).format(s),
                                  a,
                                  t,
                                  e,
                                  n
                              );
                          };
                      })(t, e, n);
            }
            function xi(t, e) {
                var n = e.markerToArray(t.marker);
                return {
                    marker: t.marker,
                    timeZoneOffset: t.timeZoneOffset,
                    array: n,
                    year: n[0],
                    month: n[1],
                    day: n[2],
                    hour: n[3],
                    minute: n[4],
                    second: n[5],
                    millisecond: n[6],
                };
            }
            function Dt(t, e, n, r) {
                var i = xi(t, n.calendarSystem);
                return {
                    date: i,
                    start: i,
                    end: e ? xi(e, n.calendarSystem) : null,
                    timeZone: n.timeZone,
                    localeCodes: n.locale.codes,
                    defaultSeparator: r || n.defaultSeparator,
                };
            }
            var dl = (function () {
                    function t(e) {
                        this.cmdStr = e;
                    }
                    return (
                        (t.prototype.format = function (e, n, r) {
                            return n.cmdFormatter(
                                this.cmdStr,
                                Dt(e, null, n, r)
                            );
                        }),
                        (t.prototype.formatRange = function (e, n, r, i) {
                            return r.cmdFormatter(this.cmdStr, Dt(e, n, r, i));
                        }),
                        t
                    );
                })(),
                fl = (function () {
                    function t(e) {
                        this.func = e;
                    }
                    return (
                        (t.prototype.format = function (e, n, r) {
                            return this.func(Dt(e, null, n, r));
                        }),
                        (t.prototype.formatRange = function (e, n, r, i) {
                            return this.func(Dt(e, n, r, i));
                        }),
                        t
                    );
                })();
            function O(t) {
                return 'object' == typeof t && t
                    ? new tl(t)
                    : 'string' == typeof t
                    ? new dl(t)
                    : 'function' == typeof t
                    ? new fl(t)
                    : null;
            }
            var Ti = {
                    navLinkDayClick: A,
                    navLinkWeekClick: A,
                    duration: M,
                    bootstrapFontAwesome: A,
                    buttonIcons: A,
                    customButtons: A,
                    defaultAllDayEventDuration: M,
                    defaultTimedEventDuration: M,
                    nextDayThreshold: M,
                    scrollTime: M,
                    scrollTimeReset: Boolean,
                    slotMinTime: M,
                    slotMaxTime: M,
                    dayPopoverFormat: O,
                    slotDuration: M,
                    snapDuration: M,
                    headerToolbar: A,
                    footerToolbar: A,
                    defaultRangeSeparator: String,
                    titleRangeSeparator: String,
                    forceEventDuration: Boolean,
                    dayHeaders: Boolean,
                    dayHeaderFormat: O,
                    dayHeaderClassNames: A,
                    dayHeaderContent: A,
                    dayHeaderDidMount: A,
                    dayHeaderWillUnmount: A,
                    dayCellClassNames: A,
                    dayCellContent: A,
                    dayCellDidMount: A,
                    dayCellWillUnmount: A,
                    initialView: String,
                    aspectRatio: Number,
                    weekends: Boolean,
                    weekNumberCalculation: A,
                    weekNumbers: Boolean,
                    weekNumberClassNames: A,
                    weekNumberContent: A,
                    weekNumberDidMount: A,
                    weekNumberWillUnmount: A,
                    editable: Boolean,
                    viewClassNames: A,
                    viewDidMount: A,
                    viewWillUnmount: A,
                    nowIndicator: Boolean,
                    nowIndicatorClassNames: A,
                    nowIndicatorContent: A,
                    nowIndicatorDidMount: A,
                    nowIndicatorWillUnmount: A,
                    showNonCurrentDates: Boolean,
                    lazyFetching: Boolean,
                    startParam: String,
                    endParam: String,
                    timeZoneParam: String,
                    timeZone: String,
                    locales: A,
                    locale: A,
                    themeSystem: String,
                    dragRevertDuration: Number,
                    dragScroll: Boolean,
                    allDayMaintainDuration: Boolean,
                    unselectAuto: Boolean,
                    dropAccept: A,
                    eventOrder: function ws(t) {
                        var r,
                            i,
                            e = [],
                            n = [];
                        for (
                            'string' == typeof t
                                ? (n = t.split(/\s*,\s*/))
                                : 'function' == typeof t
                                ? (n = [t])
                                : Array.isArray(t) && (n = t),
                                r = 0;
                            r < n.length;
                            r += 1
                        )
                            'string' == typeof (i = n[r])
                                ? e.push(
                                      '-' === i.charAt(0)
                                          ? { field: i.substring(1), order: -1 }
                                          : { field: i, order: 1 }
                                  )
                                : 'function' == typeof i && e.push({ func: i });
                        return e;
                    },
                    eventOrderStrict: Boolean,
                    handleWindowResize: Boolean,
                    windowResizeDelay: Number,
                    longPressDelay: Number,
                    eventDragMinDistance: Number,
                    expandRows: Boolean,
                    height: A,
                    contentHeight: A,
                    direction: String,
                    weekNumberFormat: O,
                    eventResizableFromStart: Boolean,
                    displayEventTime: Boolean,
                    displayEventEnd: Boolean,
                    weekText: String,
                    weekTextLong: String,
                    progressiveEventRendering: Boolean,
                    businessHours: A,
                    initialDate: A,
                    now: A,
                    eventDataTransform: A,
                    stickyHeaderDates: A,
                    stickyFooterScrollbar: A,
                    viewHeight: A,
                    defaultAllDay: Boolean,
                    eventSourceFailure: A,
                    eventSourceSuccess: A,
                    eventDisplay: String,
                    eventStartEditable: Boolean,
                    eventDurationEditable: Boolean,
                    eventOverlap: A,
                    eventConstraint: A,
                    eventAllow: A,
                    eventBackgroundColor: String,
                    eventBorderColor: String,
                    eventTextColor: String,
                    eventColor: String,
                    eventClassNames: A,
                    eventContent: A,
                    eventDidMount: A,
                    eventWillUnmount: A,
                    selectConstraint: A,
                    selectOverlap: A,
                    selectAllow: A,
                    droppable: Boolean,
                    unselectCancel: String,
                    slotLabelFormat: A,
                    slotLaneClassNames: A,
                    slotLaneContent: A,
                    slotLaneDidMount: A,
                    slotLaneWillUnmount: A,
                    slotLabelClassNames: A,
                    slotLabelContent: A,
                    slotLabelDidMount: A,
                    slotLabelWillUnmount: A,
                    dayMaxEvents: A,
                    dayMaxEventRows: A,
                    dayMinWidth: Number,
                    slotLabelInterval: M,
                    allDayText: String,
                    allDayClassNames: A,
                    allDayContent: A,
                    allDayDidMount: A,
                    allDayWillUnmount: A,
                    slotMinWidth: Number,
                    navLinks: Boolean,
                    eventTimeFormat: O,
                    rerenderDelay: Number,
                    moreLinkText: A,
                    moreLinkHint: A,
                    selectMinDistance: Number,
                    selectable: Boolean,
                    selectLongPressDelay: Number,
                    eventLongPressDelay: Number,
                    selectMirror: Boolean,
                    eventMaxStack: Number,
                    eventMinHeight: Number,
                    eventMinWidth: Number,
                    eventShortHeight: Number,
                    slotEventOverlap: Boolean,
                    plugins: A,
                    firstDay: Number,
                    dayCount: Number,
                    dateAlignment: String,
                    dateIncrement: M,
                    hiddenDays: A,
                    monthMode: Boolean,
                    fixedWeekCount: Boolean,
                    validRange: A,
                    visibleRange: A,
                    titleFormat: A,
                    eventInteractive: Boolean,
                    noEventsText: String,
                    viewHint: A,
                    navLinkHint: A,
                    closeHint: String,
                    timeHint: String,
                    eventHint: String,
                    moreLinkClick: A,
                    moreLinkClassNames: A,
                    moreLinkContent: A,
                    moreLinkDidMount: A,
                    moreLinkWillUnmount: A,
                },
                se = {
                    eventDisplay: 'auto',
                    defaultRangeSeparator: ' - ',
                    titleRangeSeparator: ' \u2013 ',
                    defaultTimedEventDuration: '01:00:00',
                    defaultAllDayEventDuration: { day: 1 },
                    forceEventDuration: !1,
                    nextDayThreshold: '00:00:00',
                    dayHeaders: !0,
                    initialView: '',
                    aspectRatio: 1.35,
                    headerToolbar: {
                        start: 'title',
                        center: '',
                        end: 'today prev,next',
                    },
                    weekends: !0,
                    weekNumbers: !1,
                    weekNumberCalculation: 'local',
                    editable: !1,
                    nowIndicator: !1,
                    scrollTime: '06:00:00',
                    scrollTimeReset: !0,
                    slotMinTime: '00:00:00',
                    slotMaxTime: '24:00:00',
                    showNonCurrentDates: !0,
                    lazyFetching: !0,
                    startParam: 'start',
                    endParam: 'end',
                    timeZoneParam: 'timeZone',
                    timeZone: 'local',
                    locales: [],
                    locale: '',
                    themeSystem: 'standard',
                    dragRevertDuration: 500,
                    dragScroll: !0,
                    allDayMaintainDuration: !1,
                    unselectAuto: !0,
                    dropAccept: '*',
                    eventOrder: 'start,-duration,allDay,title',
                    dayPopoverFormat: {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    },
                    handleWindowResize: !0,
                    windowResizeDelay: 100,
                    longPressDelay: 1e3,
                    eventDragMinDistance: 5,
                    expandRows: !1,
                    navLinks: !1,
                    selectable: !1,
                    eventMinHeight: 15,
                    eventMinWidth: 30,
                    eventShortHeight: 30,
                },
                Ri = {
                    datesSet: A,
                    eventsSet: A,
                    eventAdd: A,
                    eventChange: A,
                    eventRemove: A,
                    windowResize: A,
                    eventClick: A,
                    eventMouseEnter: A,
                    eventMouseLeave: A,
                    select: A,
                    unselect: A,
                    loading: A,
                    _unmount: A,
                    _beforeprint: A,
                    _afterprint: A,
                    _noEventDrop: A,
                    _noEventResize: A,
                    _resize: A,
                    _scrollRequest: A,
                },
                ki = {
                    buttonText: A,
                    buttonHints: A,
                    views: A,
                    plugins: A,
                    initialEvents: A,
                    events: A,
                    eventSources: A,
                },
                fn = {
                    headerToolbar: Je,
                    footerToolbar: Je,
                    buttonText: Je,
                    buttonHints: Je,
                    buttonIcons: Je,
                };
            function Je(t, e) {
                return 'object' == typeof t && 'object' == typeof e && t && e
                    ? ae(t, e)
                    : t === e;
            }
            var ul = {
                type: String,
                component: A,
                buttonText: String,
                buttonTextKey: String,
                dateProfileGeneratorClass: A,
                usesMinMaxTime: Boolean,
                classNames: A,
                content: A,
                didMount: A,
                willUnmount: A,
            };
            function un(t) {
                return on(t, fn);
            }
            function Ct(t, e) {
                var n = {},
                    r = {};
                for (var i in e) i in t && (n[i] = e[i](t[i]));
                for (var i in t) i in e || (r[i] = t[i]);
                return { refined: n, extra: r };
            }
            function A(t) {
                return t;
            }
            function St(t, e, n, r) {
                for (
                    var i = { defs: {}, instances: {} },
                        o = mn(n),
                        a = 0,
                        s = t;
                    a < s.length;
                    a++
                ) {
                    var c = Ii(s[a], e, n, r, o);
                    c && Xe(c, i);
                }
                return i;
            }
            function Xe(t, e) {
                return (
                    void 0 === e && (e = { defs: {}, instances: {} }),
                    (e.defs[t.def.defId] = t.def),
                    t.instance &&
                        (e.instances[t.instance.instanceId] = t.instance),
                    e
                );
            }
            function pn(t, e) {
                var n = t.instances[e];
                if (n) {
                    var r = t.defs[n.defId],
                        i = xt(t, function (o) {
                            return (function pl(t, e) {
                                return Boolean(
                                    t.groupId && t.groupId === e.groupId
                                );
                            })(r, o);
                        });
                    return (
                        (i.defs[r.defId] = r),
                        (i.instances[n.instanceId] = n),
                        i
                    );
                }
                return { defs: {}, instances: {} };
            }
            function vn(t, e) {
                return {
                    defs: (0, u.pi)((0, u.pi)({}, t.defs), e.defs),
                    instances: (0, u.pi)(
                        (0, u.pi)({}, t.instances),
                        e.instances
                    ),
                };
            }
            function xt(t, e) {
                var n = Ce(t.defs, e),
                    r = Ce(t.instances, function (i) {
                        return n[i.defId];
                    });
                return { defs: n, instances: r };
            }
            function hn(t) {
                return Array.isArray(t)
                    ? t
                    : 'string' == typeof t
                    ? t.split(/\s+/)
                    : [];
            }
            var Tt = {
                    display: String,
                    editable: Boolean,
                    startEditable: Boolean,
                    durationEditable: Boolean,
                    constraint: A,
                    overlap: A,
                    allow: A,
                    className: hn,
                    classNames: hn,
                    color: String,
                    backgroundColor: String,
                    borderColor: String,
                    textColor: String,
                },
                gl = {
                    display: null,
                    startEditable: null,
                    durationEditable: null,
                    constraints: [],
                    overlap: null,
                    allows: [],
                    backgroundColor: '',
                    borderColor: '',
                    textColor: '',
                    classNames: [],
                };
            function Rt(t, e) {
                var n = (function hl(t, e) {
                    return Array.isArray(t)
                        ? St(t, null, e, !0)
                        : 'object' == typeof t && t
                        ? St([t], null, e, !0)
                        : null != t
                        ? String(t)
                        : null;
                })(t.constraint, e);
                return {
                    display: t.display || null,
                    startEditable:
                        null != t.startEditable ? t.startEditable : t.editable,
                    durationEditable:
                        null != t.durationEditable
                            ? t.durationEditable
                            : t.editable,
                    constraints: null != n ? [n] : [],
                    overlap: null != t.overlap ? t.overlap : null,
                    allows: null != t.allow ? [t.allow] : [],
                    backgroundColor: t.backgroundColor || t.color || '',
                    borderColor: t.borderColor || t.color || '',
                    textColor: t.textColor || '',
                    classNames: (t.className || []).concat(t.classNames || []),
                };
            }
            function _i(t) {
                return t.reduce(ml, gl);
            }
            function ml(t, e) {
                return {
                    display: null != e.display ? e.display : t.display,
                    startEditable:
                        null != e.startEditable
                            ? e.startEditable
                            : t.startEditable,
                    durationEditable:
                        null != e.durationEditable
                            ? e.durationEditable
                            : t.durationEditable,
                    constraints: t.constraints.concat(e.constraints),
                    overlap:
                        'boolean' == typeof e.overlap ? e.overlap : t.overlap,
                    allows: t.allows.concat(e.allows),
                    backgroundColor: e.backgroundColor || t.backgroundColor,
                    borderColor: e.borderColor || t.borderColor,
                    textColor: e.textColor || t.textColor,
                    classNames: t.classNames.concat(e.classNames),
                };
            }
            var kt = {
                    id: String,
                    groupId: String,
                    title: String,
                    url: String,
                    interactive: Boolean,
                },
                Mi = { start: A, end: A, date: A, allDay: Boolean },
                yl = (0, u.pi)((0, u.pi)((0, u.pi)({}, kt), Mi), {
                    extendedProps: A,
                });
            function Ii(t, e, n, r, i) {
                void 0 === i && (i = mn(n));
                var o = gn(t, n, i),
                    a = o.refined,
                    s = o.extra,
                    l = (function Al(t, e) {
                        var n = null;
                        return (
                            t && (n = t.defaultAllDay),
                            null == n && (n = e.options.defaultAllDay),
                            n
                        );
                    })(e, n),
                    c = (function Ls(t, e, n, r) {
                        for (var i = 0; i < r.length; i += 1) {
                            var o = r[i].parse(t, n);
                            if (o) {
                                var a = t.allDay;
                                return (
                                    null == a &&
                                        null == (a = e) &&
                                        null == (a = o.allDayGuess) &&
                                        (a = !1),
                                    {
                                        allDay: a,
                                        duration: o.duration,
                                        typeData: o.typeData,
                                        typeId: i,
                                    }
                                );
                            }
                        }
                        return null;
                    })(a, l, n.dateEnv, n.pluginHooks.recurringTypes);
                if (c)
                    return (
                        ((d = _t(
                            a,
                            s,
                            e ? e.sourceId : '',
                            c.allDay,
                            Boolean(c.duration),
                            n
                        )).recurringDef = {
                            typeId: c.typeId,
                            typeData: c.typeData,
                            duration: c.duration,
                        }),
                        { def: d, instance: null }
                    );
                var d,
                    f = (function bl(t, e, n, r) {
                        var o,
                            l,
                            i = t.allDay,
                            a = null,
                            s = !1,
                            c = null;
                        if (
                            (o = n.dateEnv.createMarkerMeta(
                                null != t.start ? t.start : t.date
                            ))
                        )
                            a = o.marker;
                        else if (!r) return null;
                        return (
                            null != t.end &&
                                (l = n.dateEnv.createMarkerMeta(t.end)),
                            null == i &&
                                (i =
                                    null != e
                                        ? e
                                        : (!o || o.isTimeUnspecified) &&
                                          (!l || l.isTimeUnspecified)),
                            i && a && (a = H(a)),
                            l &&
                                ((c = l.marker),
                                i && (c = H(c)),
                                a && c <= a && (c = null)),
                            c
                                ? (s = !0)
                                : r ||
                                  ((s = n.options.forceEventDuration || !1),
                                  (c = n.dateEnv.add(
                                      a,
                                      i
                                          ? n.options.defaultAllDayEventDuration
                                          : n.options.defaultTimedEventDuration
                                  ))),
                            {
                                allDay: i,
                                hasEnd: s,
                                range: { start: a, end: c },
                                forcedStartTzo: o ? o.forcedTzo : null,
                                forcedEndTzo: l ? l.forcedTzo : null,
                            }
                        );
                    })(a, l, n, r);
                return f
                    ? {
                          def: (d = _t(
                              a,
                              s,
                              e ? e.sourceId : '',
                              f.allDay,
                              f.hasEnd,
                              n
                          )),
                          instance: yt(
                              d.defId,
                              f.range,
                              f.forcedStartTzo,
                              f.forcedEndTzo
                          ),
                      }
                    : null;
            }
            function gn(t, e, n) {
                return void 0 === n && (n = mn(e)), Ct(t, n);
            }
            function mn(t) {
                return (0, u.pi)(
                    (0, u.pi)((0, u.pi)({}, Tt), yl),
                    t.pluginHooks.eventRefiners
                );
            }
            function _t(t, e, n, r, i, o) {
                for (
                    var a = {
                            title: t.title || '',
                            groupId: t.groupId || '',
                            publicId: t.id || '',
                            url: t.url || '',
                            recurringDef: null,
                            defId: Me(),
                            sourceId: n,
                            allDay: r,
                            hasEnd: i,
                            interactive: t.interactive,
                            ui: Rt(t, o),
                            extendedProps: (0, u.pi)(
                                (0, u.pi)({}, t.extendedProps || {}),
                                e
                            ),
                        },
                        s = 0,
                        l = o.pluginHooks.eventDefMemberAdders;
                    s < l.length;
                    s++
                )
                    (0, u.pi)(a, (0, l[s])(t));
                return (
                    Object.freeze(a.ui.classNames),
                    Object.freeze(a.extendedProps),
                    a
                );
            }
            function Ni(t) {
                var e = Math.floor(he(t.start, t.end)) || 1,
                    n = H(t.start);
                return { start: n, end: G(n, e) };
            }
            function yn(t, e) {
                void 0 === e && (e = M(0));
                var n = null,
                    r = null;
                if (t.end) {
                    r = H(t.end);
                    var i = t.end.valueOf() - r.valueOf();
                    i && i >= Y(e) && (r = G(r, 1));
                }
                return (
                    t.start && ((n = H(t.start)), r && r <= n && (r = G(n, 1))),
                    { start: n, end: r }
                );
            }
            function Be(t, e, n, r) {
                return 'year' === r
                    ? M(n.diffWholeYears(t, e), 'year')
                    : 'month' === r
                    ? M(n.diffWholeMonths(t, e), 'month')
                    : (function Is(t, e) {
                          var n = H(t),
                              r = H(e);
                          return {
                              years: 0,
                              months: 0,
                              days: Math.round(he(n, r)),
                              milliseconds:
                                  e.valueOf() -
                                  r.valueOf() -
                                  (t.valueOf() - n.valueOf()),
                          };
                      })(t, e);
            }
            function Pi(t, e) {
                var i,
                    o,
                    n = [],
                    r = e.start;
                for (t.sort(wl), i = 0; i < t.length; i += 1)
                    (o = t[i]).start > r && n.push({ start: r, end: o.start }),
                        o.end > r && (r = o.end);
                return r < e.end && n.push({ start: r, end: e.end }), n;
            }
            function wl(t, e) {
                return t.start.valueOf() - e.start.valueOf();
            }
            function He(t, e) {
                var n = t.start,
                    r = t.end,
                    i = null;
                return (
                    null !== e.start &&
                        (n =
                            null === n
                                ? e.start
                                : new Date(
                                      Math.max(n.valueOf(), e.start.valueOf())
                                  )),
                    null != e.end &&
                        (r =
                            null === r
                                ? e.end
                                : new Date(
                                      Math.min(r.valueOf(), e.end.valueOf())
                                  )),
                    (null === n || null === r || n < r) &&
                        (i = { start: n, end: r }),
                    i
                );
            }
            function bn(t, e) {
                return (
                    (null === t.end || null === e.start || t.end > e.start) &&
                    (null === t.start || null === e.end || t.start < e.end)
                );
            }
            function Mt(t, e) {
                return (
                    (null === t.start ||
                        (null !== e.start && e.start >= t.start)) &&
                    (null === t.end || (null !== e.end && e.end <= t.end))
                );
            }
            function be(t, e) {
                return (
                    (null === t.start || e >= t.start) &&
                    (null === t.end || e < t.end)
                );
            }
            function An(t, e, n, r) {
                var i = {},
                    o = {},
                    a = {},
                    s = [],
                    l = [],
                    c = It(t.defs, e);
                for (var d in t.defs)
                    'inverse-background' ===
                        (p = c[(f = t.defs[d]).defId]).display &&
                        (f.groupId
                            ? ((i[f.groupId] = []),
                              a[f.groupId] || (a[f.groupId] = f))
                            : (o[d] = []));
                for (var v in t.instances) {
                    var g = t.instances[v],
                        p = c[(f = t.defs[g.defId]).defId],
                        b = g.range,
                        E = !f.allDay && r ? yn(b, r) : b,
                        m = He(E, n);
                    m &&
                        ('inverse-background' === p.display
                            ? f.groupId
                                ? i[f.groupId].push(m)
                                : o[g.defId].push(m)
                            : 'none' !== p.display &&
                              ('background' === p.display ? s : l).push({
                                  def: f,
                                  ui: p,
                                  instance: g,
                                  range: m,
                                  isStart:
                                      E.start &&
                                      E.start.valueOf() === m.start.valueOf(),
                                  isEnd:
                                      E.end &&
                                      E.end.valueOf() === m.end.valueOf(),
                              }));
                }
                for (var w in i)
                    for (var _ = 0, k = Pi(i[w], n); _ < k.length; _++) {
                        var f;
                        s.push({
                            def: (f = a[w]),
                            ui: (p = c[f.defId]),
                            instance: null,
                            range: k[_],
                            isStart: !1,
                            isEnd: !1,
                        });
                    }
                for (var d in o)
                    for (var T = 0, F = Pi(o[d], n); T < F.length; T++)
                        s.push({
                            def: t.defs[d],
                            ui: c[d],
                            instance: null,
                            range: F[T],
                            isStart: !1,
                            isEnd: !1,
                        });
                return { bg: s, fg: l };
            }
            function Bi(t, e) {
                t.fcSeg = e;
            }
            function Oe(t) {
                return t.fcSeg || t.parentNode.fcSeg || null;
            }
            function It(t, e) {
                return oe(t, function (n) {
                    return Hi(n, e);
                });
            }
            function Hi(t, e) {
                var n = [];
                return (
                    e[''] && n.push(e['']),
                    e[t.defId] && n.push(e[t.defId]),
                    n.push(t.ui),
                    _i(n)
                );
            }
            function Oi(t, e) {
                var n = t.map(xl);
                return (
                    n.sort(function (r, i) {
                        return (function Ds(t, e, n) {
                            var r, i;
                            for (r = 0; r < n.length; r += 1)
                                if ((i = Cs(t, e, n[r]))) return i;
                            return 0;
                        })(r, i, e);
                    }),
                    n.map(function (r) {
                        return r._seg;
                    })
                );
            }
            function xl(t) {
                var e = t.eventRange,
                    n = e.def,
                    r = e.instance ? e.instance.range : e.range,
                    i = r.start ? r.start.valueOf() : 0,
                    o = r.end ? r.end.valueOf() : 0;
                return (0, u.pi)((0, u.pi)((0, u.pi)({}, n.extendedProps), n), {
                    id: n.publicId,
                    start: i,
                    end: o,
                    duration: o - i,
                    allDay: Number(n.allDay),
                    _seg: t,
                });
            }
            function Tl(t, e) {
                for (
                    var i = t.eventRange,
                        o = i.def,
                        a = i.ui,
                        s = a.startEditable,
                        l = 0,
                        c = e.pluginHooks.isDraggableTransformers;
                    l < c.length;
                    l++
                )
                    s = (0, c[l])(s, o, a, e);
                return s;
            }
            function Rl(t, e) {
                return (
                    t.isStart &&
                    t.eventRange.ui.durationEditable &&
                    e.options.eventResizableFromStart
                );
            }
            function kl(t, e) {
                return t.isEnd && t.eventRange.ui.durationEditable;
            }
            function zi(t, e, n, r, i, o, a) {
                var s = n.dateEnv,
                    l = n.options,
                    c = l.displayEventTime,
                    d = l.displayEventEnd,
                    f = t.eventRange.def,
                    p = t.eventRange.instance;
                null == c && (c = !1 !== r), null == d && (d = !1 !== i);
                var v = p.range.start,
                    g = p.range.end,
                    b = o || t.start || t.eventRange.range.start,
                    E = a || t.end || t.eventRange.range.end,
                    m = H(v).valueOf() === H(b).valueOf(),
                    w = H(De(g, -1)).valueOf() === H(De(E, -1)).valueOf();
                return c && !f.allDay && (m || w)
                    ? ((b = m ? v : b),
                      (E = w ? g : E),
                      d && f.hasEnd
                          ? s.formatRange(b, E, e, {
                                forcedStartTzo: o ? null : p.forcedStartTzo,
                                forcedEndTzo: a ? null : p.forcedEndTzo,
                            })
                          : s.format(b, e, {
                                forcedTzo: o ? null : p.forcedStartTzo,
                            }))
                    : '';
            }
            function Ae(t, e, n) {
                var r = t.eventRange.range;
                return {
                    isPast: r.end < (n || e.start),
                    isFuture: r.start >= (n || e.end),
                    isToday: e && be(e, r.start),
                };
            }
            function Fi(t) {
                return t.instance
                    ? t.instance.instanceId
                    : t.def.defId + ':' + t.range.start.toISOString();
            }
            function Ui(t, e) {
                var n = t.eventRange,
                    r = n.def,
                    i = n.instance,
                    o = r.url;
                if (o) return { href: o };
                var a = e.emitter,
                    l = e.options.eventInteractive;
                return (
                    null == l &&
                        null == (l = r.interactive) &&
                        (l = Boolean(a.hasHandlers('eventClick'))),
                    l
                        ? di(function (c) {
                              a.trigger('eventClick', {
                                  el: c.target,
                                  event: new z(e, r, i),
                                  jsEvent: c,
                                  view: e.viewApi,
                              });
                          })
                        : {}
                );
            }
            var Ml = { start: A, end: A, allDay: Boolean };
            function Li(t, e, n) {
                return (0, u.pi)((0, u.pi)({}, Qi(t, e, n)), {
                    timeZone: e.timeZone,
                });
            }
            function Qi(t, e, n) {
                return {
                    start: e.toDate(t.start),
                    end: e.toDate(t.end),
                    startStr: e.formatIso(t.start, { omitTime: n }),
                    endStr: e.formatIso(t.end, { omitTime: n }),
                };
            }
            function Ol(t, e, n) {
                var r = gn({ editable: !1 }, n),
                    i = _t(r.refined, r.extra, '', t.allDay, !0, n);
                return {
                    def: i,
                    ui: Hi(i, e),
                    instance: yt(i.defId, t.range),
                    range: t.range,
                    isStart: !0,
                    isEnd: !0,
                };
            }
            function Wi(t, e, n) {
                n.emitter.trigger(
                    'select',
                    (0, u.pi)((0, u.pi)({}, En(t, n)), {
                        jsEvent: e ? e.origEvent : null,
                        view: n.viewApi || n.calendarApi.view,
                    })
                );
            }
            function En(t, e) {
                for (
                    var n = {}, r = 0, i = e.pluginHooks.dateSpanTransforms;
                    r < i.length;
                    r++
                )
                    (0, u.pi)(n, (0, i[r])(t, e));
                return (
                    (0, u.pi)(
                        n,
                        (function Hl(t, e) {
                            return (0, u.pi)(
                                (0, u.pi)({}, Qi(t.range, e, t.allDay)),
                                { allDay: t.allDay }
                            );
                        })(t, e.dateEnv)
                    ),
                    n
                );
            }
            function wn(t, e, n) {
                var r = n.dateEnv,
                    i = n.options,
                    o = e;
                return (
                    t
                        ? ((o = H(o)),
                          (o = r.add(o, i.defaultAllDayEventDuration)))
                        : (o = r.add(o, i.defaultTimedEventDuration)),
                    o
                );
            }
            function Dn(t, e, n, r) {
                var i = It(t.defs, e),
                    o = { defs: {}, instances: {} };
                for (var a in t.defs) o.defs[a] = Fl(t.defs[a], i[a], n, r);
                for (var l in t.instances) {
                    var c = t.instances[l];
                    o.instances[l] = Ul(c, o.defs[c.defId], i[c.defId], n, r);
                }
                return o;
            }
            function Fl(t, e, n, r) {
                var i = n.standardProps || {};
                null == i.hasEnd &&
                    e.durationEditable &&
                    (n.startDelta || n.endDelta) &&
                    (i.hasEnd = !0);
                var o = (0, u.pi)((0, u.pi)((0, u.pi)({}, t), i), {
                    ui: (0, u.pi)((0, u.pi)({}, t.ui), i.ui),
                });
                n.extendedProps &&
                    (o.extendedProps = (0, u.pi)(
                        (0, u.pi)({}, o.extendedProps),
                        n.extendedProps
                    ));
                for (
                    var a = 0, s = r.pluginHooks.eventDefMutationAppliers;
                    a < s.length;
                    a++
                )
                    (0, s[a])(o, n, r);
                return (
                    !o.hasEnd &&
                        r.options.forceEventDuration &&
                        (o.hasEnd = !0),
                    o
                );
            }
            function Ul(t, e, n, r, i) {
                var o = i.dateEnv,
                    a = r.standardProps && !0 === r.standardProps.allDay,
                    s = r.standardProps && !1 === r.standardProps.hasEnd,
                    l = (0, u.pi)({}, t);
                return (
                    a && (l.range = Ni(l.range)),
                    r.datesDelta &&
                        n.startEditable &&
                        (l.range = {
                            start: o.add(l.range.start, r.datesDelta),
                            end: o.add(l.range.end, r.datesDelta),
                        }),
                    r.startDelta &&
                        n.durationEditable &&
                        (l.range = {
                            start: o.add(l.range.start, r.startDelta),
                            end: l.range.end,
                        }),
                    r.endDelta &&
                        n.durationEditable &&
                        (l.range = {
                            start: l.range.start,
                            end: o.add(l.range.end, r.endDelta),
                        }),
                    s &&
                        (l.range = {
                            start: l.range.start,
                            end: wn(e.allDay, l.range.start, i),
                        }),
                    e.allDay &&
                        (l.range = {
                            start: H(l.range.start),
                            end: H(l.range.end),
                        }),
                    l.range.end < l.range.start &&
                        (l.range.end = wn(e.allDay, l.range.start, i)),
                    l
                );
            }
            var Ll = (function () {
                    function t(e, n, r) {
                        (this.type = e),
                            (this.getCurrentData = n),
                            (this.dateEnv = r);
                    }
                    return (
                        Object.defineProperty(t.prototype, 'calendar', {
                            get: function () {
                                return this.getCurrentData().calendarApi;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'title', {
                            get: function () {
                                return this.getCurrentData().viewTitle;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'activeStart', {
                            get: function () {
                                return this.dateEnv.toDate(
                                    this.getCurrentData().dateProfile
                                        .activeRange.start
                                );
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'activeEnd', {
                            get: function () {
                                return this.dateEnv.toDate(
                                    this.getCurrentData().dateProfile
                                        .activeRange.end
                                );
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'currentStart', {
                            get: function () {
                                return this.dateEnv.toDate(
                                    this.getCurrentData().dateProfile
                                        .currentRange.start
                                );
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'currentEnd', {
                            get: function () {
                                return this.dateEnv.toDate(
                                    this.getCurrentData().dateProfile
                                        .currentRange.end
                                );
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        (t.prototype.getOption = function (e) {
                            return this.getCurrentData().options[e];
                        }),
                        t
                    );
                })(),
                Ql = {
                    id: String,
                    defaultAllDay: Boolean,
                    url: String,
                    format: String,
                    events: A,
                    eventDataTransform: A,
                    success: A,
                    failure: A,
                };
            function Vi(t, e, n) {
                var r;
                if (
                    (void 0 === n && (n = Gi(e)),
                    'string' == typeof t
                        ? (r = { url: t })
                        : 'function' == typeof t || Array.isArray(t)
                        ? (r = { events: t })
                        : 'object' == typeof t && t && (r = t),
                    r)
                ) {
                    var i = Ct(r, n),
                        o = i.refined,
                        a = i.extra,
                        s = (function Wl(t, e) {
                            for (
                                var n = e.pluginHooks.eventSourceDefs,
                                    r = n.length - 1;
                                r >= 0;
                                r -= 1
                            ) {
                                var o = n[r].parseMeta(t);
                                if (o) return { sourceDefId: r, meta: o };
                            }
                            return null;
                        })(o, e);
                    if (s)
                        return {
                            _raw: t,
                            isFetching: !1,
                            latestFetchId: '',
                            fetchRange: null,
                            defaultAllDay: o.defaultAllDay,
                            eventDataTransform: o.eventDataTransform,
                            success: o.success,
                            failure: o.failure,
                            publicId: o.id || '',
                            sourceId: Me(),
                            sourceDefId: s.sourceDefId,
                            meta: s.meta,
                            ui: Rt(o, e),
                            extendedProps: a,
                        };
                }
                return null;
            }
            function Gi(t) {
                return (0, u.pi)(
                    (0, u.pi)((0, u.pi)({}, Tt), Ql),
                    t.pluginHooks.eventSourceRefiners
                );
            }
            function Ke(t, e) {
                return (
                    'function' == typeof t && (t = t()),
                    null == t ? e.createNowMarker() : e.createMarker(t)
                );
            }
            var Zl = (function () {
                    function t() {}
                    return (
                        (t.prototype.getCurrentData = function () {
                            return this.currentDataManager.getCurrentData();
                        }),
                        (t.prototype.dispatch = function (e) {
                            return this.currentDataManager.dispatch(e);
                        }),
                        Object.defineProperty(t.prototype, 'view', {
                            get: function () {
                                return this.getCurrentData().viewApi;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        (t.prototype.batchRendering = function (e) {
                            e();
                        }),
                        (t.prototype.updateSize = function () {
                            this.trigger('_resize', !0);
                        }),
                        (t.prototype.setOption = function (e, n) {
                            this.dispatch({
                                type: 'SET_OPTION',
                                optionName: e,
                                rawOptionValue: n,
                            });
                        }),
                        (t.prototype.getOption = function (e) {
                            return this.currentDataManager
                                .currentCalendarOptionsInput[e];
                        }),
                        (t.prototype.getAvailableLocaleCodes = function () {
                            return Object.keys(
                                this.getCurrentData().availableRawLocales
                            );
                        }),
                        (t.prototype.on = function (e, n) {
                            var r = this.currentDataManager;
                            r.currentCalendarOptionsRefiners[e]
                                ? r.emitter.on(e, n)
                                : console.warn(
                                      "Unknown listener name '" + e + "'"
                                  );
                        }),
                        (t.prototype.off = function (e, n) {
                            this.currentDataManager.emitter.off(e, n);
                        }),
                        (t.prototype.trigger = function (e) {
                            for (
                                var n, r = [], i = 1;
                                i < arguments.length;
                                i++
                            )
                                r[i - 1] = arguments[i];
                            (n = this.currentDataManager.emitter).trigger.apply(
                                n,
                                (0, u.ev)([e], r)
                            );
                        }),
                        (t.prototype.changeView = function (e, n) {
                            var r = this;
                            this.batchRendering(function () {
                                if ((r.unselect(), n))
                                    if (n.start && n.end)
                                        r.dispatch({
                                            type: 'CHANGE_VIEW_TYPE',
                                            viewType: e,
                                        }),
                                            r.dispatch({
                                                type: 'SET_OPTION',
                                                optionName: 'visibleRange',
                                                rawOptionValue: n,
                                            });
                                    else {
                                        var i = r.getCurrentData().dateEnv;
                                        r.dispatch({
                                            type: 'CHANGE_VIEW_TYPE',
                                            viewType: e,
                                            dateMarker: i.createMarker(n),
                                        });
                                    }
                                else
                                    r.dispatch({
                                        type: 'CHANGE_VIEW_TYPE',
                                        viewType: e,
                                    });
                            });
                        }),
                        (t.prototype.zoomTo = function (e, n) {
                            var i;
                            (i =
                                this.getCurrentData().viewSpecs[
                                    (n = n || 'day')
                                ] || this.getUnitViewSpec(n)),
                                this.unselect(),
                                this.dispatch(
                                    i
                                        ? {
                                              type: 'CHANGE_VIEW_TYPE',
                                              viewType: i.type,
                                              dateMarker: e,
                                          }
                                        : { type: 'CHANGE_DATE', dateMarker: e }
                                );
                        }),
                        (t.prototype.getUnitViewSpec = function (e) {
                            var a,
                                s,
                                n = this.getCurrentData(),
                                r = n.viewSpecs,
                                i = n.toolbarConfig,
                                o = [].concat(
                                    i.header ? i.header.viewsWithButtons : [],
                                    i.footer ? i.footer.viewsWithButtons : []
                                );
                            for (var l in r) o.push(l);
                            for (a = 0; a < o.length; a += 1)
                                if ((s = r[o[a]]) && s.singleUnit === e)
                                    return s;
                            return null;
                        }),
                        (t.prototype.prev = function () {
                            this.unselect(), this.dispatch({ type: 'PREV' });
                        }),
                        (t.prototype.next = function () {
                            this.unselect(), this.dispatch({ type: 'NEXT' });
                        }),
                        (t.prototype.prevYear = function () {
                            var e = this.getCurrentData();
                            this.unselect(),
                                this.dispatch({
                                    type: 'CHANGE_DATE',
                                    dateMarker: e.dateEnv.addYears(
                                        e.currentDate,
                                        -1
                                    ),
                                });
                        }),
                        (t.prototype.nextYear = function () {
                            var e = this.getCurrentData();
                            this.unselect(),
                                this.dispatch({
                                    type: 'CHANGE_DATE',
                                    dateMarker: e.dateEnv.addYears(
                                        e.currentDate,
                                        1
                                    ),
                                });
                        }),
                        (t.prototype.today = function () {
                            var e = this.getCurrentData();
                            this.unselect(),
                                this.dispatch({
                                    type: 'CHANGE_DATE',
                                    dateMarker: Ke(
                                        e.calendarOptions.now,
                                        e.dateEnv
                                    ),
                                });
                        }),
                        (t.prototype.gotoDate = function (e) {
                            var n = this.getCurrentData();
                            this.unselect(),
                                this.dispatch({
                                    type: 'CHANGE_DATE',
                                    dateMarker: n.dateEnv.createMarker(e),
                                });
                        }),
                        (t.prototype.incrementDate = function (e) {
                            var n = this.getCurrentData(),
                                r = M(e);
                            r &&
                                (this.unselect(),
                                this.dispatch({
                                    type: 'CHANGE_DATE',
                                    dateMarker: n.dateEnv.add(n.currentDate, r),
                                }));
                        }),
                        (t.prototype.getDate = function () {
                            var e = this.getCurrentData();
                            return e.dateEnv.toDate(e.currentDate);
                        }),
                        (t.prototype.formatDate = function (e, n) {
                            var r = this.getCurrentData().dateEnv;
                            return r.format(r.createMarker(e), O(n));
                        }),
                        (t.prototype.formatRange = function (e, n, r) {
                            var i = this.getCurrentData().dateEnv;
                            return i.formatRange(
                                i.createMarker(e),
                                i.createMarker(n),
                                O(r),
                                r
                            );
                        }),
                        (t.prototype.formatIso = function (e, n) {
                            var r = this.getCurrentData().dateEnv;
                            return r.formatIso(r.createMarker(e), {
                                omitTime: n,
                            });
                        }),
                        (t.prototype.select = function (e, n) {
                            var r;
                            r =
                                null == n
                                    ? null != e.start
                                        ? e
                                        : { start: e, end: null }
                                    : { start: e, end: n };
                            var i = this.getCurrentData(),
                                o = (function Il(t, e, n) {
                                    var r = (function Nl(t, e) {
                                            var n = Ct(t, Ml),
                                                r = n.refined,
                                                i = n.extra,
                                                o = r.start
                                                    ? e.createMarkerMeta(
                                                          r.start
                                                      )
                                                    : null,
                                                a = r.end
                                                    ? e.createMarkerMeta(r.end)
                                                    : null,
                                                s = r.allDay;
                                            return (
                                                null == s &&
                                                    (s =
                                                        o &&
                                                        o.isTimeUnspecified &&
                                                        (!a ||
                                                            a.isTimeUnspecified)),
                                                (0, u.pi)(
                                                    {
                                                        range: {
                                                            start: o
                                                                ? o.marker
                                                                : null,
                                                            end: a
                                                                ? a.marker
                                                                : null,
                                                        },
                                                        allDay: s,
                                                    },
                                                    i
                                                )
                                            );
                                        })(t, e),
                                        i = r.range;
                                    if (!i.start) return null;
                                    if (!i.end) {
                                        if (null == n) return null;
                                        i.end = e.add(i.start, n);
                                    }
                                    return r;
                                })(r, i.dateEnv, M({ days: 1 }));
                            o &&
                                (this.dispatch({
                                    type: 'SELECT_DATES',
                                    selection: o,
                                }),
                                Wi(o, null, i));
                        }),
                        (t.prototype.unselect = function (e) {
                            var n = this.getCurrentData();
                            n.dateSelection &&
                                (this.dispatch({ type: 'UNSELECT_DATES' }),
                                (function zl(t, e) {
                                    e.emitter.trigger('unselect', {
                                        jsEvent: t ? t.origEvent : null,
                                        view: e.viewApi || e.calendarApi.view,
                                    });
                                })(e, n));
                        }),
                        (t.prototype.addEvent = function (e, n) {
                            if (e instanceof z) {
                                var r = e._def,
                                    i = e._instance;
                                return (
                                    this.getCurrentData().eventStore.defs[
                                        r.defId
                                    ] ||
                                        (this.dispatch({
                                            type: 'ADD_EVENTS',
                                            eventStore: Xe({
                                                def: r,
                                                instance: i,
                                            }),
                                        }),
                                        this.triggerEventAdd(e)),
                                    e
                                );
                            }
                            var s,
                                a = this.getCurrentData();
                            if (n instanceof _e) s = n.internalEventSource;
                            else if ('boolean' == typeof n)
                                n && (s = an(a.eventSources)[0]);
                            else if (null != n) {
                                var l = this.getEventSourceById(n);
                                if (!l)
                                    return (
                                        console.warn(
                                            'Could not find an event source with ID "' +
                                                n +
                                                '"'
                                        ),
                                        null
                                    );
                                s = l.internalEventSource;
                            }
                            var c = Ii(e, s, a, !1);
                            if (c) {
                                var d = new z(
                                    a,
                                    c.def,
                                    c.def.recurringDef ? null : c.instance
                                );
                                return (
                                    this.dispatch({
                                        type: 'ADD_EVENTS',
                                        eventStore: Xe(c),
                                    }),
                                    this.triggerEventAdd(d),
                                    d
                                );
                            }
                            return null;
                        }),
                        (t.prototype.triggerEventAdd = function (e) {
                            var n = this;
                            this.getCurrentData().emitter.trigger('eventAdd', {
                                event: e,
                                relatedEvents: [],
                                revert: function () {
                                    n.dispatch({
                                        type: 'REMOVE_EVENTS',
                                        eventStore: Zi(e),
                                    });
                                },
                            });
                        }),
                        (t.prototype.getEventById = function (e) {
                            var n = this.getCurrentData(),
                                r = n.eventStore,
                                i = r.defs,
                                o = r.instances;
                            for (var a in ((e = String(e)), i)) {
                                var s = i[a];
                                if (s.publicId === e) {
                                    if (s.recurringDef)
                                        return new z(n, s, null);
                                    for (var l in o) {
                                        var c = o[l];
                                        if (c.defId === s.defId)
                                            return new z(n, s, c);
                                    }
                                }
                            }
                            return null;
                        }),
                        (t.prototype.getEvents = function () {
                            var e = this.getCurrentData();
                            return Se(e.eventStore, e);
                        }),
                        (t.prototype.removeAllEvents = function () {
                            this.dispatch({ type: 'REMOVE_ALL_EVENTS' });
                        }),
                        (t.prototype.getEventSources = function () {
                            var e = this.getCurrentData(),
                                n = e.eventSources,
                                r = [];
                            for (var i in n) r.push(new _e(e, n[i]));
                            return r;
                        }),
                        (t.prototype.getEventSourceById = function (e) {
                            var n = this.getCurrentData(),
                                r = n.eventSources;
                            for (var i in ((e = String(e)), r))
                                if (r[i].publicId === e) return new _e(n, r[i]);
                            return null;
                        }),
                        (t.prototype.addEventSource = function (e) {
                            var n = this.getCurrentData();
                            if (e instanceof _e)
                                return (
                                    n.eventSources[
                                        e.internalEventSource.sourceId
                                    ] ||
                                        this.dispatch({
                                            type: 'ADD_EVENT_SOURCES',
                                            sources: [e.internalEventSource],
                                        }),
                                    e
                                );
                            var r = Vi(e, n);
                            return r
                                ? (this.dispatch({
                                      type: 'ADD_EVENT_SOURCES',
                                      sources: [r],
                                  }),
                                  new _e(n, r))
                                : null;
                        }),
                        (t.prototype.removeAllEventSources = function () {
                            this.dispatch({ type: 'REMOVE_ALL_EVENT_SOURCES' });
                        }),
                        (t.prototype.refetchEvents = function () {
                            this.dispatch({
                                type: 'FETCH_EVENT_SOURCES',
                                isRefetch: !0,
                            });
                        }),
                        (t.prototype.scrollToTime = function (e) {
                            var n = M(e);
                            n && this.trigger('_scrollRequest', { time: n });
                        }),
                        t
                    );
                })(),
                z = (function () {
                    function t(e, n, r) {
                        (this._context = e),
                            (this._def = n),
                            (this._instance = r || null);
                    }
                    return (
                        (t.prototype.setProp = function (e, n) {
                            var r, i;
                            if (e in Mi)
                                console.warn(
                                    "Could not set date-related prop 'name'. Use one of the date-related methods instead."
                                );
                            else if ('id' === e)
                                (n = kt[e](n)),
                                    this.mutate({
                                        standardProps: { publicId: n },
                                    });
                            else if (e in kt)
                                (n = kt[e](n)),
                                    this.mutate({
                                        standardProps:
                                            ((r = {}), (r[e] = n), r),
                                    });
                            else if (e in Tt) {
                                var o = Tt[e](n);
                                'color' === e
                                    ? (o = {
                                          backgroundColor: n,
                                          borderColor: n,
                                      })
                                    : 'editable' === e
                                    ? (o = {
                                          startEditable: n,
                                          durationEditable: n,
                                      })
                                    : (((i = {})[e] = n), (o = i)),
                                    this.mutate({ standardProps: { ui: o } });
                            } else
                                console.warn(
                                    "Could not set prop '" +
                                        e +
                                        "'. Use setExtendedProp instead."
                                );
                        }),
                        (t.prototype.setExtendedProp = function (e, n) {
                            var r;
                            this.mutate({
                                extendedProps: ((r = {}), (r[e] = n), r),
                            });
                        }),
                        (t.prototype.setStart = function (e, n) {
                            void 0 === n && (n = {});
                            var r = this._context.dateEnv,
                                i = r.createMarker(e);
                            if (i && this._instance) {
                                var a = Be(
                                    this._instance.range.start,
                                    i,
                                    r,
                                    n.granularity
                                );
                                this.mutate(
                                    n.maintainDuration
                                        ? { datesDelta: a }
                                        : { startDelta: a }
                                );
                            }
                        }),
                        (t.prototype.setEnd = function (e, n) {
                            void 0 === n && (n = {});
                            var i,
                                r = this._context.dateEnv;
                            if (
                                (null == e || (i = r.createMarker(e))) &&
                                this._instance
                            )
                                if (i) {
                                    var o = Be(
                                        this._instance.range.end,
                                        i,
                                        r,
                                        n.granularity
                                    );
                                    this.mutate({ endDelta: o });
                                } else
                                    this.mutate({
                                        standardProps: { hasEnd: !1 },
                                    });
                        }),
                        (t.prototype.setDates = function (e, n, r) {
                            void 0 === r && (r = {});
                            var s,
                                i = this._context.dateEnv,
                                o = { allDay: r.allDay },
                                a = i.createMarker(e);
                            if (
                                a &&
                                (null == n || (s = i.createMarker(n))) &&
                                this._instance
                            ) {
                                var l = this._instance.range;
                                !0 === r.allDay && (l = Ni(l));
                                var c = Be(l.start, a, i, r.granularity);
                                if (s) {
                                    var d = Be(l.end, s, i, r.granularity);
                                    !(function Gs(t, e) {
                                        return (
                                            t.years === e.years &&
                                            t.months === e.months &&
                                            t.days === e.days &&
                                            t.milliseconds === e.milliseconds
                                        );
                                    })(c, d)
                                        ? this.mutate({
                                              startDelta: c,
                                              endDelta: d,
                                              standardProps: o,
                                          })
                                        : this.mutate({
                                              datesDelta: c,
                                              standardProps: o,
                                          });
                                } else
                                    (o.hasEnd = !1),
                                        this.mutate({
                                            datesDelta: c,
                                            standardProps: o,
                                        });
                            }
                        }),
                        (t.prototype.moveStart = function (e) {
                            var n = M(e);
                            n && this.mutate({ startDelta: n });
                        }),
                        (t.prototype.moveEnd = function (e) {
                            var n = M(e);
                            n && this.mutate({ endDelta: n });
                        }),
                        (t.prototype.moveDates = function (e) {
                            var n = M(e);
                            n && this.mutate({ datesDelta: n });
                        }),
                        (t.prototype.setAllDay = function (e, n) {
                            void 0 === n && (n = {});
                            var r = { allDay: e },
                                i = n.maintainDuration;
                            null == i &&
                                (i =
                                    this._context.options
                                        .allDayMaintainDuration),
                                this._def.allDay !== e && (r.hasEnd = i),
                                this.mutate({ standardProps: r });
                        }),
                        (t.prototype.formatRange = function (e) {
                            var n = this._context.dateEnv,
                                r = this._instance,
                                i = O(e);
                            return this._def.hasEnd
                                ? n.formatRange(r.range.start, r.range.end, i, {
                                      forcedStartTzo: r.forcedStartTzo,
                                      forcedEndTzo: r.forcedEndTzo,
                                  })
                                : n.format(r.range.start, i, {
                                      forcedTzo: r.forcedStartTzo,
                                  });
                        }),
                        (t.prototype.mutate = function (e) {
                            var n = this._instance;
                            if (n) {
                                var r = this._def,
                                    i = this._context,
                                    o = i.getCurrentData().eventStore,
                                    a = pn(o, n.instanceId);
                                a = Dn(
                                    a,
                                    {
                                        '': {
                                            display: '',
                                            startEditable: !0,
                                            durationEditable: !0,
                                            constraints: [],
                                            overlap: null,
                                            allows: [],
                                            backgroundColor: '',
                                            borderColor: '',
                                            textColor: '',
                                            classNames: [],
                                        },
                                    },
                                    e,
                                    i
                                );
                                var l = new t(i, r, n);
                                (this._def = a.defs[r.defId]),
                                    (this._instance =
                                        a.instances[n.instanceId]),
                                    i.dispatch({
                                        type: 'MERGE_EVENTS',
                                        eventStore: a,
                                    }),
                                    i.emitter.trigger('eventChange', {
                                        oldEvent: l,
                                        event: this,
                                        relatedEvents: Se(a, i, n),
                                        revert: function () {
                                            i.dispatch({
                                                type: 'RESET_EVENTS',
                                                eventStore: o,
                                            });
                                        },
                                    });
                            }
                        }),
                        (t.prototype.remove = function () {
                            var e = this._context,
                                n = Zi(this);
                            e.dispatch({
                                type: 'REMOVE_EVENTS',
                                eventStore: n,
                            }),
                                e.emitter.trigger('eventRemove', {
                                    event: this,
                                    relatedEvents: [],
                                    revert: function () {
                                        e.dispatch({
                                            type: 'MERGE_EVENTS',
                                            eventStore: n,
                                        });
                                    },
                                });
                        }),
                        Object.defineProperty(t.prototype, 'source', {
                            get: function () {
                                var e = this._def.sourceId;
                                return e
                                    ? new _e(
                                          this._context,
                                          this._context.getCurrentData().eventSources[
                                              e
                                          ]
                                      )
                                    : null;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'start', {
                            get: function () {
                                return this._instance
                                    ? this._context.dateEnv.toDate(
                                          this._instance.range.start
                                      )
                                    : null;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'end', {
                            get: function () {
                                return this._instance && this._def.hasEnd
                                    ? this._context.dateEnv.toDate(
                                          this._instance.range.end
                                      )
                                    : null;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'startStr', {
                            get: function () {
                                var e = this._instance;
                                return e
                                    ? this._context.dateEnv.formatIso(
                                          e.range.start,
                                          {
                                              omitTime: this._def.allDay,
                                              forcedTzo: e.forcedStartTzo,
                                          }
                                      )
                                    : '';
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'endStr', {
                            get: function () {
                                var e = this._instance;
                                return e && this._def.hasEnd
                                    ? this._context.dateEnv.formatIso(
                                          e.range.end,
                                          {
                                              omitTime: this._def.allDay,
                                              forcedTzo: e.forcedEndTzo,
                                          }
                                      )
                                    : '';
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'id', {
                            get: function () {
                                return this._def.publicId;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'groupId', {
                            get: function () {
                                return this._def.groupId;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'allDay', {
                            get: function () {
                                return this._def.allDay;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'title', {
                            get: function () {
                                return this._def.title;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'url', {
                            get: function () {
                                return this._def.url;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'display', {
                            get: function () {
                                return this._def.ui.display || 'auto';
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'startEditable', {
                            get: function () {
                                return this._def.ui.startEditable;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'durationEditable', {
                            get: function () {
                                return this._def.ui.durationEditable;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'constraint', {
                            get: function () {
                                return this._def.ui.constraints[0] || null;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'overlap', {
                            get: function () {
                                return this._def.ui.overlap;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'allow', {
                            get: function () {
                                return this._def.ui.allows[0] || null;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'backgroundColor', {
                            get: function () {
                                return this._def.ui.backgroundColor;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'borderColor', {
                            get: function () {
                                return this._def.ui.borderColor;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'textColor', {
                            get: function () {
                                return this._def.ui.textColor;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'classNames', {
                            get: function () {
                                return this._def.ui.classNames;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        Object.defineProperty(t.prototype, 'extendedProps', {
                            get: function () {
                                return this._def.extendedProps;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        (t.prototype.toPlainObject = function (e) {
                            void 0 === e && (e = {});
                            var n = this._def,
                                r = n.ui,
                                o = this.startStr,
                                a = this.endStr,
                                s = {};
                            return (
                                n.title && (s.title = n.title),
                                o && (s.start = o),
                                a && (s.end = a),
                                n.publicId && (s.id = n.publicId),
                                n.groupId && (s.groupId = n.groupId),
                                n.url && (s.url = n.url),
                                r.display &&
                                    'auto' !== r.display &&
                                    (s.display = r.display),
                                e.collapseColor &&
                                r.backgroundColor &&
                                r.backgroundColor === r.borderColor
                                    ? (s.color = r.backgroundColor)
                                    : (r.backgroundColor &&
                                          (s.backgroundColor =
                                              r.backgroundColor),
                                      r.borderColor &&
                                          (s.borderColor = r.borderColor)),
                                r.textColor && (s.textColor = r.textColor),
                                r.classNames.length &&
                                    (s.classNames = r.classNames),
                                Object.keys(n.extendedProps).length &&
                                    (e.collapseExtendedProps
                                        ? (0, u.pi)(s, n.extendedProps)
                                        : (s.extendedProps = n.extendedProps)),
                                s
                            );
                        }),
                        (t.prototype.toJSON = function () {
                            return this.toPlainObject();
                        }),
                        t
                    );
                })();
            function Zi(t) {
                var e,
                    n,
                    r = t._def,
                    i = t._instance;
                return {
                    defs: ((e = {}), (e[r.defId] = r), e),
                    instances: i ? ((n = {}), (n[i.instanceId] = i), n) : {},
                };
            }
            function Se(t, e, n) {
                var r = t.defs,
                    i = t.instances,
                    o = [],
                    a = n ? n.instanceId : '';
                for (var s in i) {
                    var l = i[s];
                    l.instanceId !== a && o.push(new z(e, r[l.defId], l));
                }
                return o;
            }
            var ji = {};
            !(function jl(t, e) {
                ji[t] = e;
            })(
                'gregory',
                (function () {
                    function t() {}
                    return (
                        (t.prototype.getMarkerYear = function (e) {
                            return e.getUTCFullYear();
                        }),
                        (t.prototype.getMarkerMonth = function (e) {
                            return e.getUTCMonth();
                        }),
                        (t.prototype.getMarkerDay = function (e) {
                            return e.getUTCDate();
                        }),
                        (t.prototype.arrayToMarker = function (e) {
                            return j(e);
                        }),
                        (t.prototype.markerToArray = function (e) {
                            return ge(e);
                        }),
                        t
                    );
                })()
            );
            var Jl =
                    /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/,
                Yi = (function () {
                    function t(e) {
                        var n = (this.timeZone = e.timeZone),
                            r = 'local' !== n && 'UTC' !== n;
                        e.namedTimeZoneImpl &&
                            r &&
                            (this.namedTimeZoneImpl = new e.namedTimeZoneImpl(
                                n
                            )),
                            (this.canComputeOffset = Boolean(
                                !r || this.namedTimeZoneImpl
                            )),
                            (this.calendarSystem = (function Yl(t) {
                                return new ji[t]();
                            })(e.calendarSystem)),
                            (this.locale = e.locale),
                            (this.weekDow = e.locale.week.dow),
                            (this.weekDoy = e.locale.week.doy),
                            'ISO' === e.weekNumberCalculation &&
                                ((this.weekDow = 1), (this.weekDoy = 4)),
                            'number' == typeof e.firstDay &&
                                (this.weekDow = e.firstDay),
                            'function' == typeof e.weekNumberCalculation &&
                                (this.weekNumberFunc = e.weekNumberCalculation),
                            (this.weekText =
                                null != e.weekText
                                    ? e.weekText
                                    : e.locale.options.weekText),
                            (this.weekTextLong =
                                (null != e.weekTextLong
                                    ? e.weekTextLong
                                    : e.locale.options.weekTextLong) ||
                                this.weekText),
                            (this.cmdFormatter = e.cmdFormatter),
                            (this.defaultSeparator = e.defaultSeparator);
                    }
                    return (
                        (t.prototype.createMarker = function (e) {
                            var n = this.createMarkerMeta(e);
                            return null === n ? null : n.marker;
                        }),
                        (t.prototype.createNowMarker = function () {
                            return this.canComputeOffset
                                ? this.timestampToMarker(new Date().valueOf())
                                : j(vi(new Date()));
                        }),
                        (t.prototype.createMarkerMeta = function (e) {
                            if ('string' == typeof e) return this.parse(e);
                            var n = null;
                            return (
                                'number' == typeof e
                                    ? (n = this.timestampToMarker(e))
                                    : e instanceof Date
                                    ? ((e = e.valueOf()),
                                      isNaN(e) ||
                                          (n = this.timestampToMarker(e)))
                                    : Array.isArray(e) && (n = j(e)),
                                null !== n && gi(n)
                                    ? {
                                          marker: n,
                                          isTimeUnspecified: !1,
                                          forcedTzo: null,
                                      }
                                    : null
                            );
                        }),
                        (t.prototype.parse = function (e) {
                            var n = (function Xl(t) {
                                var e = Jl.exec(t);
                                if (e) {
                                    var n = new Date(
                                        Date.UTC(
                                            Number(e[1]),
                                            e[3] ? Number(e[3]) - 1 : 0,
                                            Number(e[5] || 1),
                                            Number(e[7] || 0),
                                            Number(e[8] || 0),
                                            Number(e[10] || 0),
                                            e[12]
                                                ? 1e3 * Number('0.' + e[12])
                                                : 0
                                        )
                                    );
                                    if (gi(n)) {
                                        var r = null;
                                        return (
                                            e[13] &&
                                                (r =
                                                    ('-' === e[15] ? -1 : 1) *
                                                    (60 * Number(e[16] || 0) +
                                                        Number(e[18] || 0))),
                                            {
                                                marker: n,
                                                isTimeUnspecified: !e[6],
                                                timeZoneOffset: r,
                                            }
                                        );
                                    }
                                }
                                return null;
                            })(e);
                            if (null === n) return null;
                            var r = n.marker,
                                i = null;
                            return (
                                null !== n.timeZoneOffset &&
                                    (this.canComputeOffset
                                        ? (r = this.timestampToMarker(
                                              r.valueOf() -
                                                  60 * n.timeZoneOffset * 1e3
                                          ))
                                        : (i = n.timeZoneOffset)),
                                {
                                    marker: r,
                                    isTimeUnspecified: n.isTimeUnspecified,
                                    forcedTzo: i,
                                }
                            );
                        }),
                        (t.prototype.getYear = function (e) {
                            return this.calendarSystem.getMarkerYear(e);
                        }),
                        (t.prototype.getMonth = function (e) {
                            return this.calendarSystem.getMarkerMonth(e);
                        }),
                        (t.prototype.add = function (e, n) {
                            var r = this.calendarSystem.markerToArray(e);
                            return (
                                (r[0] += n.years),
                                (r[1] += n.months),
                                (r[2] += n.days),
                                (r[6] += n.milliseconds),
                                this.calendarSystem.arrayToMarker(r)
                            );
                        }),
                        (t.prototype.subtract = function (e, n) {
                            var r = this.calendarSystem.markerToArray(e);
                            return (
                                (r[0] -= n.years),
                                (r[1] -= n.months),
                                (r[2] -= n.days),
                                (r[6] -= n.milliseconds),
                                this.calendarSystem.arrayToMarker(r)
                            );
                        }),
                        (t.prototype.addYears = function (e, n) {
                            var r = this.calendarSystem.markerToArray(e);
                            return (
                                (r[0] += n),
                                this.calendarSystem.arrayToMarker(r)
                            );
                        }),
                        (t.prototype.addMonths = function (e, n) {
                            var r = this.calendarSystem.markerToArray(e);
                            return (
                                (r[1] += n),
                                this.calendarSystem.arrayToMarker(r)
                            );
                        }),
                        (t.prototype.diffWholeYears = function (e, n) {
                            var r = this.calendarSystem;
                            return me(e) === me(n) &&
                                r.getMarkerDay(e) === r.getMarkerDay(n) &&
                                r.getMarkerMonth(e) === r.getMarkerMonth(n)
                                ? r.getMarkerYear(n) - r.getMarkerYear(e)
                                : null;
                        }),
                        (t.prototype.diffWholeMonths = function (e, n) {
                            var r = this.calendarSystem;
                            return me(e) === me(n) &&
                                r.getMarkerDay(e) === r.getMarkerDay(n)
                                ? r.getMarkerMonth(n) -
                                      r.getMarkerMonth(e) +
                                      12 *
                                          (r.getMarkerYear(n) -
                                              r.getMarkerYear(e))
                                : null;
                        }),
                        (t.prototype.greatestWholeUnit = function (e, n) {
                            var r = this.diffWholeYears(e, n);
                            return null !== r
                                ? { unit: 'year', value: r }
                                : null !== (r = this.diffWholeMonths(e, n))
                                ? { unit: 'month', value: r }
                                : ((r = (function Ns(t, e) {
                                      var n = mt(t, e);
                                      return null !== n && n % 7 == 0
                                          ? n / 7
                                          : null;
                                  })(e, n)),
                                  null !== r
                                      ? { unit: 'week', value: r }
                                      : null !== (r = mt(e, n))
                                      ? { unit: 'day', value: r }
                                      : ((r = (function ks(t, e) {
                                            return (
                                                (e.valueOf() - t.valueOf()) /
                                                36e5
                                            );
                                        })(e, n)),
                                        gt(r)
                                            ? { unit: 'hour', value: r }
                                            : ((r = (function _s(t, e) {
                                                  return (
                                                      (e.valueOf() -
                                                          t.valueOf()) /
                                                      6e4
                                                  );
                                              })(e, n)),
                                              gt(r)
                                                  ? { unit: 'minute', value: r }
                                                  : ((r = (function Ms(t, e) {
                                                        return (
                                                            (e.valueOf() -
                                                                t.valueOf()) /
                                                            1e3
                                                        );
                                                    })(e, n)),
                                                    gt(r)
                                                        ? {
                                                              unit: 'second',
                                                              value: r,
                                                          }
                                                        : {
                                                              unit: 'millisecond',
                                                              value:
                                                                  n.valueOf() -
                                                                  e.valueOf(),
                                                          }))));
                        }),
                        (t.prototype.countDurationsBetween = function (
                            e,
                            n,
                            r
                        ) {
                            var i;
                            return r.years &&
                                null !== (i = this.diffWholeYears(e, n))
                                ? i /
                                      (function Ys(t) {
                                          return Pe(t) / 365;
                                      })(r)
                                : r.months &&
                                  null !== (i = this.diffWholeMonths(e, n))
                                ? i /
                                  (function qs(t) {
                                      return Pe(t) / 30;
                                  })(r)
                                : r.days && null !== (i = mt(e, n))
                                ? i / Pe(r)
                                : (n.valueOf() - e.valueOf()) / Y(r);
                        }),
                        (t.prototype.startOf = function (e, n) {
                            return 'year' === n
                                ? this.startOfYear(e)
                                : 'month' === n
                                ? this.startOfMonth(e)
                                : 'week' === n
                                ? this.startOfWeek(e)
                                : 'day' === n
                                ? H(e)
                                : 'hour' === n
                                ? (function Ps(t) {
                                      return j([
                                          t.getUTCFullYear(),
                                          t.getUTCMonth(),
                                          t.getUTCDate(),
                                          t.getUTCHours(),
                                      ]);
                                  })(e)
                                : 'minute' === n
                                ? (function Bs(t) {
                                      return j([
                                          t.getUTCFullYear(),
                                          t.getUTCMonth(),
                                          t.getUTCDate(),
                                          t.getUTCHours(),
                                          t.getUTCMinutes(),
                                      ]);
                                  })(e)
                                : 'second' === n
                                ? (function Hs(t) {
                                      return j([
                                          t.getUTCFullYear(),
                                          t.getUTCMonth(),
                                          t.getUTCDate(),
                                          t.getUTCHours(),
                                          t.getUTCMinutes(),
                                          t.getUTCSeconds(),
                                      ]);
                                  })(e)
                                : null;
                        }),
                        (t.prototype.startOfYear = function (e) {
                            return this.calendarSystem.arrayToMarker([
                                this.calendarSystem.getMarkerYear(e),
                            ]);
                        }),
                        (t.prototype.startOfMonth = function (e) {
                            return this.calendarSystem.arrayToMarker([
                                this.calendarSystem.getMarkerYear(e),
                                this.calendarSystem.getMarkerMonth(e),
                            ]);
                        }),
                        (t.prototype.startOfWeek = function (e) {
                            return this.calendarSystem.arrayToMarker([
                                this.calendarSystem.getMarkerYear(e),
                                this.calendarSystem.getMarkerMonth(e),
                                e.getUTCDate() -
                                    ((e.getUTCDay() - this.weekDow + 7) % 7),
                            ]);
                        }),
                        (t.prototype.computeWeekNumber = function (e) {
                            return this.weekNumberFunc
                                ? this.weekNumberFunc(this.toDate(e))
                                : (function Os(t, e, n) {
                                      var r = t.getUTCFullYear(),
                                          i = rn(t, r, e, n);
                                      if (i < 1) return rn(t, r - 1, e, n);
                                      var o = rn(t, r + 1, e, n);
                                      return o >= 1 ? Math.min(i, o) : i;
                                  })(e, this.weekDow, this.weekDoy);
                        }),
                        (t.prototype.format = function (e, n, r) {
                            return (
                                void 0 === r && (r = {}),
                                n.format(
                                    {
                                        marker: e,
                                        timeZoneOffset:
                                            null != r.forcedTzo
                                                ? r.forcedTzo
                                                : this.offsetForMarker(e),
                                    },
                                    this
                                )
                            );
                        }),
                        (t.prototype.formatRange = function (e, n, r, i) {
                            return (
                                void 0 === i && (i = {}),
                                i.isEndExclusive && (n = De(n, -1)),
                                r.formatRange(
                                    {
                                        marker: e,
                                        timeZoneOffset:
                                            null != i.forcedStartTzo
                                                ? i.forcedStartTzo
                                                : this.offsetForMarker(e),
                                    },
                                    {
                                        marker: n,
                                        timeZoneOffset:
                                            null != i.forcedEndTzo
                                                ? i.forcedEndTzo
                                                : this.offsetForMarker(n),
                                    },
                                    this,
                                    i.defaultSeparator
                                )
                            );
                        }),
                        (t.prototype.formatIso = function (e, n) {
                            void 0 === n && (n = {});
                            var r = null;
                            return (
                                n.omitTimeZoneOffset ||
                                    (r =
                                        null != n.forcedTzo
                                            ? n.forcedTzo
                                            : this.offsetForMarker(e)),
                                wi(e, r, n.omitTime)
                            );
                        }),
                        (t.prototype.timestampToMarker = function (e) {
                            return 'local' === this.timeZone
                                ? j(vi(new Date(e)))
                                : 'UTC' !== this.timeZone &&
                                  this.namedTimeZoneImpl
                                ? j(this.namedTimeZoneImpl.timestampToArray(e))
                                : new Date(e);
                        }),
                        (t.prototype.offsetForMarker = function (e) {
                            return 'local' === this.timeZone
                                ? -hi(ge(e)).getTimezoneOffset()
                                : 'UTC' === this.timeZone
                                ? 0
                                : this.namedTimeZoneImpl
                                ? this.namedTimeZoneImpl.offsetForArray(ge(e))
                                : null;
                        }),
                        (t.prototype.toDate = function (e, n) {
                            return 'local' === this.timeZone
                                ? hi(ge(e))
                                : 'UTC' === this.timeZone
                                ? new Date(e.valueOf())
                                : this.namedTimeZoneImpl
                                ? new Date(
                                      e.valueOf() -
                                          1e3 *
                                              this.namedTimeZoneImpl.offsetForArray(
                                                  ge(e)
                                              ) *
                                              60
                                  )
                                : new Date(e.valueOf() - (n || 0));
                        }),
                        t
                    );
                })(),
                Kl = [],
                qi = {
                    code: 'en',
                    week: { dow: 0, doy: 4 },
                    direction: 'ltr',
                    buttonText: {
                        prev: 'prev',
                        next: 'next',
                        prevYear: 'prev year',
                        nextYear: 'next year',
                        year: 'year',
                        today: 'today',
                        month: 'month',
                        week: 'week',
                        day: 'day',
                        list: 'list',
                    },
                    weekText: 'W',
                    weekTextLong: 'Week',
                    closeHint: 'Close',
                    timeHint: 'Time',
                    eventHint: 'Event',
                    allDayText: 'all-day',
                    moreLinkText: 'more',
                    noEventsText: 'No events to display',
                },
                Ji = (0, u.pi)((0, u.pi)({}, qi), {
                    buttonHints: {
                        prev: 'Previous $0',
                        next: 'Next $0',
                        today: function (t, e) {
                            return 'day' === e ? 'Today' : 'This ' + t;
                        },
                    },
                    viewHint: '$0 view',
                    navLinkHint: 'Go to $0',
                    moreLinkHint: function (t) {
                        return (
                            'Show ' + t + ' more event' + (1 === t ? '' : 's')
                        );
                    },
                });
            function Xi(t) {
                for (
                    var e = t.length > 0 ? t[0].code : 'en',
                        n = Kl.concat(t),
                        r = { en: Ji },
                        i = 0,
                        o = n;
                    i < o.length;
                    i++
                ) {
                    var a = o[i];
                    r[a.code] = a;
                }
                return { map: r, defaultCode: e };
            }
            function Cn(t, e) {
                return 'object' != typeof t || Array.isArray(t)
                    ? (function $l(t, e) {
                          var n = [].concat(t || []),
                              r =
                                  (function ec(t, e) {
                                      for (var n = 0; n < t.length; n += 1)
                                          for (
                                              var r = t[n]
                                                      .toLocaleLowerCase()
                                                      .split('-'),
                                                  i = r.length;
                                              i > 0;
                                              i -= 1
                                          ) {
                                              var o = r.slice(0, i).join('-');
                                              if (e[o]) return e[o];
                                          }
                                      return null;
                                  })(n, e) || Ji;
                          return Ki(t, n, r);
                      })(t, e)
                    : Ki(t.code, [t.code], t);
            }
            function Ki(t, e, n) {
                var r = on([qi, n], ['buttonText']);
                delete r.code;
                var i = r.week;
                return (
                    delete r.week,
                    {
                        codeArg: t,
                        codes: e,
                        week: i,
                        simpleNumberFormat: new Intl.NumberFormat(t),
                        options: r,
                    }
                );
            }
            var Sn,
                tc = {
                    startTime: '09:00',
                    endTime: '17:00',
                    daysOfWeek: [1, 2, 3, 4, 5],
                    display: 'inverse-background',
                    classNames: 'fc-non-business',
                    groupId: '_businessHours',
                };
            function ic(t, e) {
                return (
                    t.left >= e.left &&
                    t.left < e.right &&
                    t.top >= e.top &&
                    t.top < e.bottom
                );
            }
            function eo(t, e) {
                var n = {
                    left: Math.max(t.left, e.left),
                    right: Math.min(t.right, e.right),
                    top: Math.max(t.top, e.top),
                    bottom: Math.min(t.bottom, e.bottom),
                };
                return n.left < n.right && n.top < n.bottom && n;
            }
            function to() {
                return (
                    null == Sn &&
                        (Sn = (function lc() {
                            if ('undefined' == typeof document) return !0;
                            var t = document.createElement('div');
                            (t.style.position = 'absolute'),
                                (t.style.top = '0px'),
                                (t.style.left = '0px'),
                                (t.innerHTML =
                                    '<table><tr><td><div></div></td></tr></table>'),
                                (t.querySelector('table').style.height =
                                    '100px'),
                                (t.querySelector('div').style.height = '100%'),
                                document.body.appendChild(t);
                            var n = t.querySelector('div').offsetHeight > 0;
                            return document.body.removeChild(t), n;
                        })()),
                    Sn
                );
            }
            var xn = { defs: {}, instances: {} },
                cc = (function () {
                    function t() {
                        (this.getKeysForEventDefs = x(
                            this._getKeysForEventDefs
                        )),
                            (this.splitDateSelection = x(this._splitDateSpan)),
                            (this.splitEventStore = x(this._splitEventStore)),
                            (this.splitIndividualUi = x(
                                this._splitIndividualUi
                            )),
                            (this.splitEventDrag = x(this._splitInteraction)),
                            (this.splitEventResize = x(this._splitInteraction)),
                            (this.eventUiBuilders = {});
                    }
                    return (
                        (t.prototype.splitProps = function (e) {
                            var n = this,
                                r = this.getKeyInfo(e),
                                i = this.getKeysForEventDefs(e.eventStore),
                                o = this.splitDateSelection(e.dateSelection),
                                a = this.splitIndividualUi(e.eventUiBases, i),
                                s = this.splitEventStore(e.eventStore, i),
                                l = this.splitEventDrag(e.eventDrag),
                                c = this.splitEventResize(e.eventResize),
                                d = {};
                            for (var f in ((this.eventUiBuilders = oe(
                                r,
                                function (b, E) {
                                    return n.eventUiBuilders[E] || x(dc);
                                }
                            )),
                            r)) {
                                var p = r[f],
                                    v = s[f] || xn;
                                d[f] = {
                                    businessHours:
                                        p.businessHours || e.businessHours,
                                    dateSelection: o[f] || null,
                                    eventStore: v,
                                    eventUiBases: (0, this.eventUiBuilders[f])(
                                        e.eventUiBases[''],
                                        p.ui,
                                        a[f]
                                    ),
                                    eventSelection: v.instances[
                                        e.eventSelection
                                    ]
                                        ? e.eventSelection
                                        : '',
                                    eventDrag: l[f] || null,
                                    eventResize: c[f] || null,
                                };
                            }
                            return d;
                        }),
                        (t.prototype._splitDateSpan = function (e) {
                            var n = {};
                            if (e)
                                for (
                                    var i = 0, o = this.getKeysForDateSpan(e);
                                    i < o.length;
                                    i++
                                )
                                    n[o[i]] = e;
                            return n;
                        }),
                        (t.prototype._getKeysForEventDefs = function (e) {
                            var n = this;
                            return oe(e.defs, function (r) {
                                return n.getKeysForEventDef(r);
                            });
                        }),
                        (t.prototype._splitEventStore = function (e, n) {
                            var r = e.defs,
                                i = e.instances,
                                o = {};
                            for (var a in r)
                                for (var s = 0, l = n[a]; s < l.length; s++)
                                    o[(c = l[s])] ||
                                        (o[c] = { defs: {}, instances: {} }),
                                        (o[c].defs[a] = r[a]);
                            for (var d in i)
                                for (
                                    var f = i[d], p = 0, v = n[f.defId];
                                    p < v.length;
                                    p++
                                ) {
                                    var c;
                                    o[(c = v[p])] && (o[c].instances[d] = f);
                                }
                            return o;
                        }),
                        (t.prototype._splitIndividualUi = function (e, n) {
                            var r = {};
                            for (var i in e)
                                if (i)
                                    for (
                                        var o = 0, a = n[i];
                                        o < a.length;
                                        o++
                                    ) {
                                        var s = a[o];
                                        r[s] || (r[s] = {}), (r[s][i] = e[i]);
                                    }
                            return r;
                        }),
                        (t.prototype._splitInteraction = function (e) {
                            var n = {};
                            if (e) {
                                var r = this._splitEventStore(
                                        e.affectedEvents,
                                        this._getKeysForEventDefs(
                                            e.affectedEvents
                                        )
                                    ),
                                    i = this._getKeysForEventDefs(
                                        e.mutatedEvents
                                    ),
                                    o = this._splitEventStore(
                                        e.mutatedEvents,
                                        i
                                    ),
                                    a = function (l) {
                                        n[l] ||
                                            (n[l] = {
                                                affectedEvents: r[l] || xn,
                                                mutatedEvents: o[l] || xn,
                                                isEvent: e.isEvent,
                                            });
                                    };
                                for (var s in r) a(s);
                                for (var s in o) a(s);
                            }
                            return n;
                        }),
                        t
                    );
                })();
            function dc(t, e, n) {
                var r = [];
                t && r.push(t), e && r.push(e);
                var i = { '': _i(r) };
                return n && (0, u.pi)(i, n), i;
            }
            function no(t, e, n, r) {
                return {
                    dow: t.getUTCDay(),
                    isDisabled: Boolean(r && !be(r.activeRange, t)),
                    isOther: Boolean(r && !be(r.currentRange, t)),
                    isToday: Boolean(e && be(e, t)),
                    isPast: Boolean(n ? t < n : !!e && t < e.start),
                    isFuture: Boolean(n ? t > n : !!e && t >= e.end),
                };
            }
            function Tn(t, e) {
                var n = ['fc-day', 'fc-day-' + ui[t.dow]];
                return (
                    t.isDisabled
                        ? n.push('fc-day-disabled')
                        : (t.isToday &&
                              (n.push('fc-day-today'),
                              n.push(e.getClass('today'))),
                          t.isPast && n.push('fc-day-past'),
                          t.isFuture && n.push('fc-day-future'),
                          t.isOther && n.push('fc-day-other')),
                    n
                );
            }
            var fc = O({ year: 'numeric', month: 'long', day: 'numeric' }),
                uc = O({ week: 'long' });
            function Nt(t, e, n, r) {
                void 0 === n && (n = 'day'), void 0 === r && (r = !0);
                var i = t.dateEnv,
                    o = t.options,
                    a = t.calendarApi,
                    s = i.format(e, 'week' === n ? uc : fc);
                if (o.navLinks) {
                    var l = i.toDate(e),
                        c = function (d) {
                            var f =
                                'day' === n
                                    ? o.navLinkDayClick
                                    : 'week' === n
                                    ? o.navLinkWeekClick
                                    : null;
                            'function' == typeof f
                                ? f.call(a, i.toDate(e), d)
                                : ('string' == typeof f && (n = f),
                                  a.zoomTo(e, n));
                        };
                    return (0, u.pi)(
                        {
                            title: qe(o.navLinkHint, [s, l], s),
                            'data-navlink': '',
                        },
                        r ? ci(c) : { onClick: c }
                    );
                }
                return { 'aria-label': s };
            }
            var kn,
                Rn = null;
            function ro(t) {
                return {
                    x: t.offsetHeight - t.clientHeight,
                    y: t.offsetWidth - t.clientWidth,
                };
            }
            function yc(t, e, n) {
                void 0 === e && (e = !1);
                var r = n ? t.getBoundingClientRect() : _n(t),
                    i = (function mc(t, e) {
                        void 0 === e && (e = !1);
                        var n = window.getComputedStyle(t),
                            r = parseInt(n.borderLeftWidth, 10) || 0,
                            i = parseInt(n.borderRightWidth, 10) || 0,
                            o = parseInt(n.borderTopWidth, 10) || 0,
                            a = parseInt(n.borderBottomWidth, 10) || 0,
                            s = ro(t),
                            l = s.y - r - i,
                            d = {
                                borderLeft: r,
                                borderRight: i,
                                borderTop: o,
                                borderBottom: a,
                                scrollbarBottom: s.x - o - a,
                                scrollbarLeft: 0,
                                scrollbarRight: 0,
                            };
                        return (
                            (function pc() {
                                return (
                                    null === Rn &&
                                        (Rn = (function vc() {
                                            var t =
                                                document.createElement('div');
                                            Ye(t, {
                                                position: 'absolute',
                                                top: -1e3,
                                                left: 0,
                                                border: 0,
                                                padding: 0,
                                                overflow: 'scroll',
                                                direction: 'rtl',
                                            }),
                                                (t.innerHTML = '<div></div>'),
                                                document.body.appendChild(t);
                                            var n =
                                                t.firstChild.getBoundingClientRect()
                                                    .left >
                                                t.getBoundingClientRect().left;
                                            return tn(t), n;
                                        })()),
                                    Rn
                                );
                            })() && 'rtl' === n.direction
                                ? (d.scrollbarLeft = l)
                                : (d.scrollbarRight = l),
                            e &&
                                ((d.paddingLeft =
                                    parseInt(n.paddingLeft, 10) || 0),
                                (d.paddingRight =
                                    parseInt(n.paddingRight, 10) || 0),
                                (d.paddingTop =
                                    parseInt(n.paddingTop, 10) || 0),
                                (d.paddingBottom =
                                    parseInt(n.paddingBottom, 10) || 0)),
                            d
                        );
                    })(t, e),
                    o = {
                        left: r.left + i.borderLeft + i.scrollbarLeft,
                        right: r.right - i.borderRight - i.scrollbarRight,
                        top: r.top + i.borderTop,
                        bottom: r.bottom - i.borderBottom - i.scrollbarBottom,
                    };
                return (
                    e &&
                        ((o.left += i.paddingLeft),
                        (o.right -= i.paddingRight),
                        (o.top += i.paddingTop),
                        (o.bottom -= i.paddingBottom)),
                    o
                );
            }
            function _n(t) {
                var e = t.getBoundingClientRect();
                return {
                    left: e.left + window.pageXOffset,
                    top: e.top + window.pageYOffset,
                    right: e.right + window.pageXOffset,
                    bottom: e.bottom + window.pageYOffset,
                };
            }
            function io(t) {
                for (var e = []; t instanceof HTMLElement; ) {
                    var n = window.getComputedStyle(t);
                    if ('fixed' === n.position) break;
                    /(auto|scroll)/.test(
                        n.overflow + n.overflowY + n.overflowX
                    ) && e.push(t),
                        (t = t.parentNode);
                }
                return e;
            }
            var Pt = (function () {
                    function t() {
                        (this.handlers = {}), (this.thisContext = null);
                    }
                    return (
                        (t.prototype.setThisContext = function (e) {
                            this.thisContext = e;
                        }),
                        (t.prototype.setOptions = function (e) {
                            this.options = e;
                        }),
                        (t.prototype.on = function (e, n) {
                            !(function wc(t, e, n) {
                                (t[e] || (t[e] = [])).push(n);
                            })(this.handlers, e, n);
                        }),
                        (t.prototype.off = function (e, n) {
                            !(function Dc(t, e, n) {
                                n
                                    ? t[e] &&
                                      (t[e] = t[e].filter(function (r) {
                                          return r !== n;
                                      }))
                                    : delete t[e];
                            })(this.handlers, e, n);
                        }),
                        (t.prototype.trigger = function (e) {
                            for (var n = [], r = 1; r < arguments.length; r++)
                                n[r - 1] = arguments[r];
                            for (
                                var i = this.handlers[e] || [],
                                    o = this.options && this.options[e],
                                    a = [].concat(o || [], i),
                                    s = 0,
                                    l = a;
                                s < l.length;
                                s++
                            ) {
                                var c = l[s];
                                c.apply(this.thisContext, n);
                            }
                        }),
                        (t.prototype.hasHandlers = function (e) {
                            return Boolean(
                                (this.handlers[e] && this.handlers[e].length) ||
                                    (this.options && this.options[e])
                            );
                        }),
                        t
                    );
                })(),
                $e = (function () {
                    function t(e, n, r, i) {
                        this.els = n;
                        var o = (this.originClientRect =
                            e.getBoundingClientRect());
                        r && this.buildElHorizontals(o.left),
                            i && this.buildElVerticals(o.top);
                    }
                    return (
                        (t.prototype.buildElHorizontals = function (e) {
                            for (
                                var n = [], r = [], i = 0, o = this.els;
                                i < o.length;
                                i++
                            ) {
                                var s = o[i].getBoundingClientRect();
                                n.push(s.left - e), r.push(s.right - e);
                            }
                            (this.lefts = n), (this.rights = r);
                        }),
                        (t.prototype.buildElVerticals = function (e) {
                            for (
                                var n = [], r = [], i = 0, o = this.els;
                                i < o.length;
                                i++
                            ) {
                                var s = o[i].getBoundingClientRect();
                                n.push(s.top - e), r.push(s.bottom - e);
                            }
                            (this.tops = n), (this.bottoms = r);
                        }),
                        (t.prototype.leftToIndex = function (e) {
                            var a,
                                r = this.lefts,
                                i = this.rights,
                                o = r.length;
                            for (a = 0; a < o; a += 1)
                                if (e >= r[a] && e < i[a]) return a;
                        }),
                        (t.prototype.topToIndex = function (e) {
                            var a,
                                r = this.tops,
                                i = this.bottoms,
                                o = r.length;
                            for (a = 0; a < o; a += 1)
                                if (e >= r[a] && e < i[a]) return a;
                        }),
                        (t.prototype.getWidth = function (e) {
                            return this.rights[e] - this.lefts[e];
                        }),
                        (t.prototype.getHeight = function (e) {
                            return this.bottoms[e] - this.tops[e];
                        }),
                        t
                    );
                })(),
                Mn = (function () {
                    function t() {}
                    return (
                        (t.prototype.getMaxScrollTop = function () {
                            return (
                                this.getScrollHeight() - this.getClientHeight()
                            );
                        }),
                        (t.prototype.getMaxScrollLeft = function () {
                            return (
                                this.getScrollWidth() - this.getClientWidth()
                            );
                        }),
                        (t.prototype.canScrollVertically = function () {
                            return this.getMaxScrollTop() > 0;
                        }),
                        (t.prototype.canScrollHorizontally = function () {
                            return this.getMaxScrollLeft() > 0;
                        }),
                        (t.prototype.canScrollUp = function () {
                            return this.getScrollTop() > 0;
                        }),
                        (t.prototype.canScrollDown = function () {
                            return this.getScrollTop() < this.getMaxScrollTop();
                        }),
                        (t.prototype.canScrollLeft = function () {
                            return this.getScrollLeft() > 0;
                        }),
                        (t.prototype.canScrollRight = function () {
                            return (
                                this.getScrollLeft() < this.getMaxScrollLeft()
                            );
                        }),
                        t
                    );
                })(),
                Cc = (function (t) {
                    function e(n) {
                        var r = t.call(this) || this;
                        return (r.el = n), r;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.getScrollTop = function () {
                            return this.el.scrollTop;
                        }),
                        (e.prototype.getScrollLeft = function () {
                            return this.el.scrollLeft;
                        }),
                        (e.prototype.setScrollTop = function (n) {
                            this.el.scrollTop = n;
                        }),
                        (e.prototype.setScrollLeft = function (n) {
                            this.el.scrollLeft = n;
                        }),
                        (e.prototype.getScrollWidth = function () {
                            return this.el.scrollWidth;
                        }),
                        (e.prototype.getScrollHeight = function () {
                            return this.el.scrollHeight;
                        }),
                        (e.prototype.getClientHeight = function () {
                            return this.el.clientHeight;
                        }),
                        (e.prototype.getClientWidth = function () {
                            return this.el.clientWidth;
                        }),
                        e
                    );
                })(Mn),
                Sc = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.getScrollTop = function () {
                            return window.pageYOffset;
                        }),
                        (e.prototype.getScrollLeft = function () {
                            return window.pageXOffset;
                        }),
                        (e.prototype.setScrollTop = function (n) {
                            window.scroll(window.pageXOffset, n);
                        }),
                        (e.prototype.setScrollLeft = function (n) {
                            window.scroll(n, window.pageYOffset);
                        }),
                        (e.prototype.getScrollWidth = function () {
                            return document.documentElement.scrollWidth;
                        }),
                        (e.prototype.getScrollHeight = function () {
                            return document.documentElement.scrollHeight;
                        }),
                        (e.prototype.getClientHeight = function () {
                            return document.documentElement.clientHeight;
                        }),
                        (e.prototype.getClientWidth = function () {
                            return document.documentElement.clientWidth;
                        }),
                        e
                    );
                })(Mn),
                et = (function () {
                    function t(e) {
                        this.iconOverrideOption &&
                            this.setIconOverride(e[this.iconOverrideOption]);
                    }
                    return (
                        (t.prototype.setIconOverride = function (e) {
                            var n, r;
                            if ('object' == typeof e && e) {
                                for (r in ((n = (0, u.pi)(
                                    {},
                                    this.iconClasses
                                )),
                                e))
                                    n[r] = this.applyIconOverridePrefix(e[r]);
                                this.iconClasses = n;
                            } else !1 === e && (this.iconClasses = {});
                        }),
                        (t.prototype.applyIconOverridePrefix = function (e) {
                            var n = this.iconOverridePrefix;
                            return n && 0 !== e.indexOf(n) && (e = n + e), e;
                        }),
                        (t.prototype.getClass = function (e) {
                            return this.classes[e] || '';
                        }),
                        (t.prototype.getIconClass = function (e, n) {
                            var r;
                            return (r =
                                (n &&
                                    this.rtlIconClasses &&
                                    this.rtlIconClasses[e]) ||
                                this.iconClasses[e])
                                ? this.baseIconClass + ' ' + r
                                : '';
                        }),
                        (t.prototype.getCustomButtonIconClass = function (e) {
                            var n;
                            return this.iconOverrideCustomButtonOption &&
                                (n = e[this.iconOverrideCustomButtonOption])
                                ? this.baseIconClass +
                                      ' ' +
                                      this.applyIconOverridePrefix(n)
                                : '';
                        }),
                        t
                    );
                })();
            (et.prototype.classes = {}),
                (et.prototype.iconClasses = {}),
                (et.prototype.baseIconClass = ''),
                (et.prototype.iconOverridePrefix = '');
            var xc = (function () {
                    function t(e, n, r, i) {
                        var o = this;
                        (this.execFunc = e),
                            (this.emitter = n),
                            (this.scrollTime = r),
                            (this.scrollTimeReset = i),
                            (this.handleScrollRequest = function (a) {
                                (o.queuedRequest = (0, u.pi)(
                                    {},
                                    o.queuedRequest || {},
                                    a
                                )),
                                    o.drain();
                            }),
                            n.on('_scrollRequest', this.handleScrollRequest),
                            this.fireInitialScroll();
                    }
                    return (
                        (t.prototype.detach = function () {
                            this.emitter.off(
                                '_scrollRequest',
                                this.handleScrollRequest
                            );
                        }),
                        (t.prototype.update = function (e) {
                            e && this.scrollTimeReset
                                ? this.fireInitialScroll()
                                : this.drain();
                        }),
                        (t.prototype.fireInitialScroll = function () {
                            this.handleScrollRequest({ time: this.scrollTime });
                        }),
                        (t.prototype.drain = function () {
                            this.queuedRequest &&
                                this.execFunc(this.queuedRequest) &&
                                (this.queuedRequest = null);
                        }),
                        t
                    );
                })(),
                le = ti({});
            function Tc(t, e, n, r, i, o, a, s, l, c, d, f, p) {
                return {
                    dateEnv: i,
                    options: n,
                    pluginHooks: a,
                    emitter: c,
                    dispatch: s,
                    getCurrentData: l,
                    calendarApi: d,
                    viewSpec: t,
                    viewApi: e,
                    dateProfileGenerator: r,
                    theme: o,
                    isRtl: 'rtl' === n.direction,
                    addResizeHandler: function (v) {
                        c.on('_resize', v);
                    },
                    removeResizeHandler: function (v) {
                        c.off('_resize', v);
                    },
                    createScrollResponder: function (v) {
                        return new xc(v, c, M(n.scrollTime), n.scrollTimeReset);
                    },
                    registerInteractiveComponent: f,
                    unregisterInteractiveComponent: p,
                };
            }
            var Bt = (function (t) {
                function e() {
                    return (null !== t && t.apply(this, arguments)) || this;
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.shouldComponentUpdate = function (n, r) {
                        return (
                            this.debug &&
                                console.log(
                                    yi(n, this.props),
                                    yi(r, this.state)
                                ),
                            !bi(this.props, n, this.propEquality) ||
                                !bi(this.state, r, this.stateEquality)
                        );
                    }),
                    (e.addPropsEquality = Rc),
                    (e.addStateEquality = kc),
                    (e.contextType = le),
                    e
                );
            })(en);
            (Bt.prototype.propEquality = {}), (Bt.prototype.stateEquality = {});
            var I = (function (t) {
                function e() {
                    return (null !== t && t.apply(this, arguments)) || this;
                }
                return (0, u.ZT)(e, t), (e.contextType = le), e;
            })(Bt);
            function Rc(t) {
                var e = Object.create(this.prototype.propEquality);
                (0, u.pi)(e, t), (this.prototype.propEquality = e);
            }
            function kc(t) {
                var e = Object.create(this.prototype.stateEquality);
                (0, u.pi)(e, t), (this.prototype.stateEquality = e);
            }
            function $(t, e) {
                'function' == typeof t ? t(e) : t && (t.current = e);
            }
            var ce = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (n.uid = Me()), n;
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.prepareHits = function () {}),
                    (e.prototype.queryHit = function (n, r, i, o) {
                        return null;
                    }),
                    (e.prototype.isValidSegDownEl = function (n) {
                        return (
                            !this.props.eventDrag &&
                            !this.props.eventResize &&
                            !W(n, '.fc-event-mirror')
                        );
                    }),
                    (e.prototype.isValidDateDownEl = function (n) {
                        return !(
                            W(n, '.fc-event:not(.fc-bg-event)') ||
                            W(n, '.fc-more-link') ||
                            W(n, 'a[data-navlink]') ||
                            W(n, '.fc-popover')
                        );
                    }),
                    e
                );
            })(I);
            function de(t) {
                return {
                    id: Me(),
                    deps: t.deps || [],
                    reducers: t.reducers || [],
                    isLoadingFuncs: t.isLoadingFuncs || [],
                    contextInit: [].concat(t.contextInit || []),
                    eventRefiners: t.eventRefiners || {},
                    eventDefMemberAdders: t.eventDefMemberAdders || [],
                    eventSourceRefiners: t.eventSourceRefiners || {},
                    isDraggableTransformers: t.isDraggableTransformers || [],
                    eventDragMutationMassagers:
                        t.eventDragMutationMassagers || [],
                    eventDefMutationAppliers: t.eventDefMutationAppliers || [],
                    dateSelectionTransformers:
                        t.dateSelectionTransformers || [],
                    datePointTransforms: t.datePointTransforms || [],
                    dateSpanTransforms: t.dateSpanTransforms || [],
                    views: t.views || {},
                    viewPropsTransformers: t.viewPropsTransformers || [],
                    isPropsValid: t.isPropsValid || null,
                    externalDefTransforms: t.externalDefTransforms || [],
                    viewContainerAppends: t.viewContainerAppends || [],
                    eventDropTransformers: t.eventDropTransformers || [],
                    componentInteractions: t.componentInteractions || [],
                    calendarInteractions: t.calendarInteractions || [],
                    themeClasses: t.themeClasses || {},
                    eventSourceDefs: t.eventSourceDefs || [],
                    cmdFormatter: t.cmdFormatter,
                    recurringTypes: t.recurringTypes || [],
                    namedTimeZonedImpl: t.namedTimeZonedImpl,
                    initialView: t.initialView || '',
                    elementDraggingImpl: t.elementDraggingImpl,
                    optionChangeHandlers: t.optionChangeHandlers || {},
                    scrollGridImpl: t.scrollGridImpl || null,
                    contentTypeHandlers: t.contentTypeHandlers || {},
                    listenerRefiners: t.listenerRefiners || {},
                    optionRefiners: t.optionRefiners || {},
                    propSetHandlers: t.propSetHandlers || {},
                };
            }
            function Ic(t, e) {
                return {
                    reducers: t.reducers.concat(e.reducers),
                    isLoadingFuncs: t.isLoadingFuncs.concat(e.isLoadingFuncs),
                    contextInit: t.contextInit.concat(e.contextInit),
                    eventRefiners: (0, u.pi)(
                        (0, u.pi)({}, t.eventRefiners),
                        e.eventRefiners
                    ),
                    eventDefMemberAdders: t.eventDefMemberAdders.concat(
                        e.eventDefMemberAdders
                    ),
                    eventSourceRefiners: (0, u.pi)(
                        (0, u.pi)({}, t.eventSourceRefiners),
                        e.eventSourceRefiners
                    ),
                    isDraggableTransformers: t.isDraggableTransformers.concat(
                        e.isDraggableTransformers
                    ),
                    eventDragMutationMassagers:
                        t.eventDragMutationMassagers.concat(
                            e.eventDragMutationMassagers
                        ),
                    eventDefMutationAppliers: t.eventDefMutationAppliers.concat(
                        e.eventDefMutationAppliers
                    ),
                    dateSelectionTransformers:
                        t.dateSelectionTransformers.concat(
                            e.dateSelectionTransformers
                        ),
                    datePointTransforms: t.datePointTransforms.concat(
                        e.datePointTransforms
                    ),
                    dateSpanTransforms: t.dateSpanTransforms.concat(
                        e.dateSpanTransforms
                    ),
                    views: (0, u.pi)((0, u.pi)({}, t.views), e.views),
                    viewPropsTransformers: t.viewPropsTransformers.concat(
                        e.viewPropsTransformers
                    ),
                    isPropsValid: e.isPropsValid || t.isPropsValid,
                    externalDefTransforms: t.externalDefTransforms.concat(
                        e.externalDefTransforms
                    ),
                    viewContainerAppends: t.viewContainerAppends.concat(
                        e.viewContainerAppends
                    ),
                    eventDropTransformers: t.eventDropTransformers.concat(
                        e.eventDropTransformers
                    ),
                    calendarInteractions: t.calendarInteractions.concat(
                        e.calendarInteractions
                    ),
                    componentInteractions: t.componentInteractions.concat(
                        e.componentInteractions
                    ),
                    themeClasses: (0, u.pi)(
                        (0, u.pi)({}, t.themeClasses),
                        e.themeClasses
                    ),
                    eventSourceDefs: t.eventSourceDefs.concat(
                        e.eventSourceDefs
                    ),
                    cmdFormatter: e.cmdFormatter || t.cmdFormatter,
                    recurringTypes: t.recurringTypes.concat(e.recurringTypes),
                    namedTimeZonedImpl:
                        e.namedTimeZonedImpl || t.namedTimeZonedImpl,
                    initialView: t.initialView || e.initialView,
                    elementDraggingImpl:
                        t.elementDraggingImpl || e.elementDraggingImpl,
                    optionChangeHandlers: (0, u.pi)(
                        (0, u.pi)({}, t.optionChangeHandlers),
                        e.optionChangeHandlers
                    ),
                    scrollGridImpl: e.scrollGridImpl || t.scrollGridImpl,
                    contentTypeHandlers: (0, u.pi)(
                        (0, u.pi)({}, t.contentTypeHandlers),
                        e.contentTypeHandlers
                    ),
                    listenerRefiners: (0, u.pi)(
                        (0, u.pi)({}, t.listenerRefiners),
                        e.listenerRefiners
                    ),
                    optionRefiners: (0, u.pi)(
                        (0, u.pi)({}, t.optionRefiners),
                        e.optionRefiners
                    ),
                    propSetHandlers: (0, u.pi)(
                        (0, u.pi)({}, t.propSetHandlers),
                        e.propSetHandlers
                    ),
                };
            }
            var Ee = (function (t) {
                function e() {
                    return (null !== t && t.apply(this, arguments)) || this;
                }
                return (0, u.ZT)(e, t), e;
            })(et);
            function In(t, e, n, r) {
                if (e[t]) return e[t];
                var i = (function Pc(t, e, n, r) {
                    var i = n[t],
                        o = r[t],
                        a = function (d) {
                            return i && null !== i[d]
                                ? i[d]
                                : o && null !== o[d]
                                ? o[d]
                                : null;
                        },
                        s = a('component'),
                        l = a('superType'),
                        c = null;
                    if (l) {
                        if (l === t)
                            throw new Error(
                                "Can't have a custom view type that references itself"
                            );
                        c = In(l, e, n, r);
                    }
                    return (
                        !s && c && (s = c.component),
                        s
                            ? {
                                  type: t,
                                  component: s,
                                  defaults: (0, u.pi)(
                                      (0, u.pi)({}, c ? c.defaults : {}),
                                      i ? i.rawOptions : {}
                                  ),
                                  overrides: (0, u.pi)(
                                      (0, u.pi)({}, c ? c.overrides : {}),
                                      o ? o.rawOptions : {}
                                  ),
                              }
                            : null
                    );
                })(t, e, n, r);
                return i && (e[t] = i), i;
            }
            (Ee.prototype.classes = {
                root: 'fc-theme-standard',
                tableCellShaded: 'fc-cell-shaded',
                buttonGroup: 'fc-button-group',
                button: 'fc-button fc-button-primary',
                buttonActive: 'fc-button-active',
            }),
                (Ee.prototype.baseIconClass = 'fc-icon'),
                (Ee.prototype.iconClasses = {
                    close: 'fc-icon-x',
                    prev: 'fc-icon-chevron-left',
                    next: 'fc-icon-chevron-right',
                    prevYear: 'fc-icon-chevrons-left',
                    nextYear: 'fc-icon-chevrons-right',
                }),
                (Ee.prototype.rtlIconClasses = {
                    prev: 'fc-icon-chevron-right',
                    next: 'fc-icon-chevron-left',
                    prevYear: 'fc-icon-chevrons-right',
                    nextYear: 'fc-icon-chevrons-left',
                }),
                (Ee.prototype.iconOverrideOption = 'buttonIcons'),
                (Ee.prototype.iconOverrideCustomButtonOption = 'icon'),
                (Ee.prototype.iconOverridePrefix = 'fc-icon-');
            var te = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.rootElRef = U()),
                            (n.handleRootEl = function (r) {
                                $(n.rootElRef, r),
                                    n.props.elRef && $(n.props.elRef, r);
                            }),
                            n
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this,
                                r = this.props,
                                i = r.hookProps;
                            return h(
                                Nn,
                                {
                                    hookProps: i,
                                    didMount: r.didMount,
                                    willUnmount: r.willUnmount,
                                    elRef: this.handleRootEl,
                                },
                                function (o) {
                                    return h(
                                        ao,
                                        {
                                            hookProps: i,
                                            content: r.content,
                                            defaultContent: r.defaultContent,
                                            backupElRef: n.rootElRef,
                                        },
                                        function (a, s) {
                                            return r.children(
                                                o,
                                                lo(r.classNames, i),
                                                a,
                                                s
                                            );
                                        }
                                    );
                                }
                            );
                        }),
                        e
                    );
                })(I),
                oo = ti(0);
            function ao(t) {
                return h(oo.Consumer, null, function (e) {
                    return h(Bc, (0, u.pi)({ renderId: e }, t));
                });
            }
            var Bc = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (n.innerElRef = U()), n;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            return this.props.children(
                                this.innerElRef,
                                this.renderInnerContent()
                            );
                        }),
                        (e.prototype.componentDidMount = function () {
                            this.updateCustomContent();
                        }),
                        (e.prototype.componentDidUpdate = function () {
                            this.updateCustomContent();
                        }),
                        (e.prototype.componentWillUnmount = function () {
                            this.customContentInfo &&
                                this.customContentInfo.destroy &&
                                this.customContentInfo.destroy();
                        }),
                        (e.prototype.renderInnerContent = function () {
                            var n = this.customContentInfo,
                                r = this.getInnerContent(),
                                i = this.getContentMeta(r);
                            return (
                                n && n.contentKey === i.contentKey
                                    ? n && (n.contentVal = r[i.contentKey])
                                    : (n &&
                                          (n.destroy && n.destroy(),
                                          (n = this.customContentInfo = null)),
                                      i.contentKey &&
                                          (n = this.customContentInfo =
                                              (0, u.pi)(
                                                  {
                                                      contentKey: i.contentKey,
                                                      contentVal:
                                                          r[i.contentKey],
                                                  },
                                                  i.buildLifecycleFuncs()
                                              ))),
                                n ? [] : r
                            );
                        }),
                        (e.prototype.getInnerContent = function () {
                            var n = this.props,
                                r = co(n.content, n.hookProps);
                            return (
                                void 0 === r &&
                                    (r = co(n.defaultContent, n.hookProps)),
                                null == r ? null : r
                            );
                        }),
                        (e.prototype.getContentMeta = function (n) {
                            var r =
                                    this.context.pluginHooks
                                        .contentTypeHandlers,
                                i = '',
                                o = null;
                            if (n)
                                for (var a in r)
                                    if (void 0 !== n[a]) {
                                        (i = a), (o = r[a]);
                                        break;
                                    }
                            return { contentKey: i, buildLifecycleFuncs: o };
                        }),
                        (e.prototype.updateCustomContent = function () {
                            this.customContentInfo &&
                                this.customContentInfo.render(
                                    this.innerElRef.current ||
                                        this.props.backupElRef.current,
                                    this.customContentInfo.contentVal
                                );
                        }),
                        e
                    );
                })(I),
                Nn = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.handleRootEl = function (r) {
                                (n.rootEl = r),
                                    n.props.elRef && $(n.props.elRef, r);
                            }),
                            n
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            return this.props.children(this.handleRootEl);
                        }),
                        (e.prototype.componentDidMount = function () {
                            var n = this.props.didMount;
                            n &&
                                n(
                                    (0, u.pi)(
                                        (0, u.pi)({}, this.props.hookProps),
                                        { el: this.rootEl }
                                    )
                                );
                        }),
                        (e.prototype.componentWillUnmount = function () {
                            var n = this.props.willUnmount;
                            n &&
                                n(
                                    (0, u.pi)(
                                        (0, u.pi)({}, this.props.hookProps),
                                        { el: this.rootEl }
                                    )
                                );
                        }),
                        e
                    );
                })(I);
            function so() {
                var t,
                    e,
                    n = [];
                return function (r, i) {
                    return (
                        (!e || !ae(e, i) || r !== t) &&
                            ((t = r), (e = i), (n = lo(r, i))),
                        n
                    );
                };
            }
            function lo(t, e) {
                return 'function' == typeof t && (t = t(e)), hn(t);
            }
            function co(t, e) {
                return 'function' == typeof t ? t(e, h) : t;
            }
            var tt = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (n.normalizeClassNames = so()), n;
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.render = function () {
                        var r = this.props,
                            i = this.context,
                            o = i.options,
                            a = { view: i.viewApi },
                            s = this.normalizeClassNames(o.viewClassNames, a);
                        return h(
                            Nn,
                            {
                                hookProps: a,
                                didMount: o.viewDidMount,
                                willUnmount: o.viewWillUnmount,
                                elRef: r.elRef,
                            },
                            function (l) {
                                return r.children(
                                    l,
                                    [
                                        'fc-' + r.viewSpec.type + '-view',
                                        'fc-view',
                                    ].concat(s)
                                );
                            }
                        );
                    }),
                    e
                );
            })(I);
            function fo(t) {
                return oe(t, Hc);
            }
            function Hc(t) {
                var e = 'function' == typeof t ? { component: t } : t,
                    n = e.component;
                return (
                    e.content &&
                        (n = (function Oc(t) {
                            return function (e) {
                                return h(le.Consumer, null, function (n) {
                                    return h(
                                        tt,
                                        { viewSpec: n.viewSpec },
                                        function (r, i) {
                                            var o = (0, u.pi)(
                                                (0, u.pi)({}, e),
                                                {
                                                    nextDayThreshold:
                                                        n.options
                                                            .nextDayThreshold,
                                                }
                                            );
                                            return h(
                                                te,
                                                {
                                                    hookProps: o,
                                                    classNames: t.classNames,
                                                    content: t.content,
                                                    didMount: t.didMount,
                                                    willUnmount: t.willUnmount,
                                                    elRef: r,
                                                },
                                                function (a, s, l, c) {
                                                    return h(
                                                        'div',
                                                        {
                                                            className: i
                                                                .concat(s)
                                                                .join(' '),
                                                            ref: a,
                                                        },
                                                        c
                                                    );
                                                }
                                            );
                                        }
                                    );
                                });
                            };
                        })(e)),
                    { superType: e.type, component: n, rawOptions: e }
                );
            }
            function zc(t, e, n, r) {
                var i = fo(t),
                    o = fo(e.views),
                    a = (function Nc(t, e) {
                        var r,
                            n = {};
                        for (r in t) In(r, n, t, e);
                        for (r in e) In(r, n, t, e);
                        return n;
                    })(i, o);
                return oe(a, function (s) {
                    return (function Fc(t, e, n, r, i) {
                        var o =
                                t.overrides.duration ||
                                t.defaults.duration ||
                                r.duration ||
                                n.duration,
                            a = null,
                            s = '',
                            l = '',
                            c = {};
                        if (
                            o &&
                            (a = (function Uc(t) {
                                var e = JSON.stringify(t),
                                    n = uo[e];
                                return (
                                    void 0 === n && ((n = M(t)), (uo[e] = n)), n
                                );
                            })(o))
                        ) {
                            var d = cn(a);
                            (s = d.unit),
                                1 === d.value &&
                                    ((l = s),
                                    (c = e[s] ? e[s].rawOptions : {}));
                        }
                        var f = function (v) {
                                var g = v.buttonText || {},
                                    b = t.defaults.buttonTextKey;
                                return null != b && null != g[b]
                                    ? g[b]
                                    : null != g[t.type]
                                    ? g[t.type]
                                    : null != g[l]
                                    ? g[l]
                                    : null;
                            },
                            p = function (v) {
                                var g = v.buttonHints || {},
                                    b = t.defaults.buttonTextKey;
                                return null != b && null != g[b]
                                    ? g[b]
                                    : null != g[t.type]
                                    ? g[t.type]
                                    : null != g[l]
                                    ? g[l]
                                    : null;
                            };
                        return {
                            type: t.type,
                            component: t.component,
                            duration: a,
                            durationUnit: s,
                            singleUnit: l,
                            optionDefaults: t.defaults,
                            optionOverrides: (0, u.pi)(
                                (0, u.pi)({}, c),
                                t.overrides
                            ),
                            buttonTextOverride:
                                f(r) || f(n) || t.overrides.buttonText,
                            buttonTextDefault:
                                f(i) ||
                                t.defaults.buttonText ||
                                f(se) ||
                                t.type,
                            buttonTitleOverride:
                                p(r) || p(n) || t.overrides.buttonHint,
                            buttonTitleDefault:
                                p(i) || t.defaults.buttonHint || p(se),
                        };
                    })(s, o, e, n, r);
                });
            }
            var uo = {},
                po = (function () {
                    function t(e) {
                        (this.props = e),
                            (this.nowDate = Ke(e.nowInput, e.dateEnv)),
                            this.initHiddenDays();
                    }
                    return (
                        (t.prototype.buildPrev = function (e, n, r) {
                            var i = this.props.dateEnv,
                                o = i.subtract(
                                    i.startOf(n, e.currentRangeUnit),
                                    e.dateIncrement
                                );
                            return this.build(o, -1, r);
                        }),
                        (t.prototype.buildNext = function (e, n, r) {
                            var i = this.props.dateEnv,
                                o = i.add(
                                    i.startOf(n, e.currentRangeUnit),
                                    e.dateIncrement
                                );
                            return this.build(o, 1, r);
                        }),
                        (t.prototype.build = function (e, n, r) {
                            void 0 === r && (r = !0);
                            var o,
                                a,
                                s,
                                l,
                                c,
                                d,
                                i = this.props;
                            return (
                                (o = this.buildValidRange()),
                                (o = this.trimHiddenDays(o)),
                                r &&
                                    (e = (function Cl(t, e) {
                                        return null != e.start && t < e.start
                                            ? e.start
                                            : null != e.end && t >= e.end
                                            ? new Date(e.end.valueOf() - 1)
                                            : t;
                                    })(e, o)),
                                (a = this.buildCurrentRangeInfo(e, n)),
                                (s = /^(year|month|week|day)$/.test(a.unit)),
                                (l = this.buildRenderRange(
                                    this.trimHiddenDays(a.range),
                                    a.unit,
                                    s
                                )),
                                (c = l = this.trimHiddenDays(l)),
                                i.showNonCurrentDates || (c = He(c, a.range)),
                                (c = He((c = this.adjustActiveRange(c)), o)),
                                (d = bn(a.range, o)),
                                {
                                    validRange: o,
                                    currentRange: a.range,
                                    currentRangeUnit: a.unit,
                                    isRangeAllDay: s,
                                    activeRange: c,
                                    renderRange: l,
                                    slotMinTime: i.slotMinTime,
                                    slotMaxTime: i.slotMaxTime,
                                    isValid: d,
                                    dateIncrement: this.buildDateIncrement(
                                        a.duration
                                    ),
                                }
                            );
                        }),
                        (t.prototype.buildValidRange = function () {
                            var e = this.props.validRangeInput,
                                n =
                                    'function' == typeof e
                                        ? e.call(
                                              this.props.calendarApi,
                                              this.nowDate
                                          )
                                        : e;
                            return (
                                this.refineRange(n) || {
                                    start: null,
                                    end: null,
                                }
                            );
                        }),
                        (t.prototype.buildCurrentRangeInfo = function (e, n) {
                            var s,
                                r = this.props,
                                i = null,
                                o = null,
                                a = null;
                            return (
                                r.duration
                                    ? (a = this.buildRangeFromDuration(
                                          e,
                                          n,
                                          (i = r.duration),
                                          (o = r.durationUnit)
                                      ))
                                    : (s = this.props.dayCount)
                                    ? ((o = 'day'),
                                      (a = this.buildRangeFromDayCount(
                                          e,
                                          n,
                                          s
                                      )))
                                    : (a = this.buildCustomVisibleRange(e))
                                    ? (o = r.dateEnv.greatestWholeUnit(
                                          a.start,
                                          a.end
                                      ).unit)
                                    : ((o = cn(
                                          (i = this.getFallbackDuration())
                                      ).unit),
                                      (a = this.buildRangeFromDuration(
                                          e,
                                          n,
                                          i,
                                          o
                                      ))),
                                { duration: i, unit: o, range: a }
                            );
                        }),
                        (t.prototype.getFallbackDuration = function () {
                            return M({ day: 1 });
                        }),
                        (t.prototype.adjustActiveRange = function (e) {
                            var n = this.props,
                                r = n.dateEnv,
                                o = n.slotMinTime,
                                a = n.slotMaxTime,
                                s = e.start,
                                l = e.end;
                            return (
                                n.usesMinMaxTime &&
                                    (Pe(o) < 0 &&
                                        ((s = H(s)), (s = r.add(s, o))),
                                    Pe(a) > 1 &&
                                        ((l = G((l = H(l)), -1)),
                                        (l = r.add(l, a)))),
                                { start: s, end: l }
                            );
                        }),
                        (t.prototype.buildRangeFromDuration = function (
                            e,
                            n,
                            r,
                            i
                        ) {
                            var l,
                                c,
                                d,
                                o = this.props,
                                a = o.dateEnv,
                                s = o.dateAlignment;
                            if (!s) {
                                var f = this.props.dateIncrement;
                                s = f && Y(f) < Y(r) ? cn(f).unit : i;
                            }
                            function p() {
                                (l = a.startOf(e, s)),
                                    (c = a.add(l, r)),
                                    (d = { start: l, end: c });
                            }
                            return (
                                Pe(r) <= 1 &&
                                    this.isHiddenDay(l) &&
                                    (l = H((l = this.skipHiddenDays(l, n)))),
                                p(),
                                this.trimHiddenDays(d) ||
                                    ((e = this.skipHiddenDays(e, n)), p()),
                                d
                            );
                        }),
                        (t.prototype.buildRangeFromDayCount = function (
                            e,
                            n,
                            r
                        ) {
                            var c,
                                i = this.props,
                                a = i.dateAlignment,
                                s = 0,
                                l = e;
                            a && (l = i.dateEnv.startOf(l, a)),
                                (l = H(l)),
                                (c = l = this.skipHiddenDays(l, n));
                            do {
                                (c = G(c, 1)), this.isHiddenDay(c) || (s += 1);
                            } while (s < r);
                            return { start: l, end: c };
                        }),
                        (t.prototype.buildCustomVisibleRange = function (e) {
                            var n = this.props,
                                r = n.visibleRangeInput,
                                i =
                                    'function' == typeof r
                                        ? r.call(
                                              n.calendarApi,
                                              n.dateEnv.toDate(e)
                                          )
                                        : r,
                                o = this.refineRange(i);
                            return !o || (null != o.start && null != o.end)
                                ? o
                                : null;
                        }),
                        (t.prototype.buildRenderRange = function (e, n, r) {
                            return e;
                        }),
                        (t.prototype.buildDateIncrement = function (e) {
                            var r;
                            return (
                                this.props.dateIncrement ||
                                ((r = this.props.dateAlignment)
                                    ? M(1, r)
                                    : e || M({ days: 1 }))
                            );
                        }),
                        (t.prototype.refineRange = function (e) {
                            if (e) {
                                var n = (function El(t, e) {
                                    var n = null,
                                        r = null;
                                    return (
                                        t.start &&
                                            (n = e.createMarker(t.start)),
                                        t.end && (r = e.createMarker(t.end)),
                                        (!n && !r) || (n && r && r < n)
                                            ? null
                                            : { start: n, end: r }
                                    );
                                })(e, this.props.dateEnv);
                                return n && (n = yn(n)), n;
                            }
                            return null;
                        }),
                        (t.prototype.initHiddenDays = function () {
                            var i,
                                e = this.props.hiddenDays || [],
                                n = [],
                                r = 0;
                            for (
                                !1 === this.props.weekends && e.push(0, 6),
                                    i = 0;
                                i < 7;
                                i += 1
                            )
                                (n[i] = -1 !== e.indexOf(i)) || (r += 1);
                            if (!r) throw new Error('invalid hiddenDays');
                            this.isHiddenDayHash = n;
                        }),
                        (t.prototype.trimHiddenDays = function (e) {
                            var n = e.start,
                                r = e.end;
                            return (
                                n && (n = this.skipHiddenDays(n)),
                                r && (r = this.skipHiddenDays(r, -1, !0)),
                                null == n || null == r || n < r
                                    ? { start: n, end: r }
                                    : null
                            );
                        }),
                        (t.prototype.isHiddenDay = function (e) {
                            return (
                                e instanceof Date && (e = e.getUTCDay()),
                                this.isHiddenDayHash[e]
                            );
                        }),
                        (t.prototype.skipHiddenDays = function (e, n, r) {
                            for (
                                void 0 === n && (n = 1),
                                    void 0 === r && (r = !1);
                                this.isHiddenDayHash[
                                    (e.getUTCDay() + (r ? n : 0) + 7) % 7
                                ];

                            )
                                e = G(e, n);
                            return e;
                        }),
                        t
                    );
                })();
            function vo(t) {
                for (var e in t) if (t[e].isFetching) return !0;
                return !1;
            }
            function ho(t, e, n, r) {
                for (var i = {}, o = 0, a = e; o < a.length; o++) {
                    var s = a[o];
                    i[s.sourceId] = s;
                }
                return n && (i = go(i, n, r)), (0, u.pi)((0, u.pi)({}, t), i);
            }
            function go(t, e, n) {
                return Pn(
                    t,
                    Ce(t, function (r) {
                        return (function Yc(t, e, n) {
                            return yo(t, n)
                                ? !n.options.lazyFetching ||
                                      !t.fetchRange ||
                                      t.isFetching ||
                                      e.start < t.fetchRange.start ||
                                      e.end > t.fetchRange.end
                                : !t.latestFetchId;
                        })(r, e, n);
                    }),
                    e,
                    !1,
                    n
                );
            }
            function Pn(t, e, n, r, i) {
                var o = {};
                for (var a in t) {
                    var s = t[a];
                    o[a] = e[a] ? qc(s, n, r, i) : s;
                }
                return o;
            }
            function qc(t, e, n, r) {
                var i = r.options,
                    o = r.calendarApi,
                    a = r.pluginHooks.eventSourceDefs[t.sourceDefId],
                    s = Me();
                return (
                    a.fetch(
                        { eventSource: t, range: e, isRefetch: n, context: r },
                        function (l) {
                            var c = l.rawEvents;
                            i.eventSourceSuccess &&
                                (c =
                                    i.eventSourceSuccess.call(o, c, l.xhr) ||
                                    c),
                                t.success &&
                                    (c = t.success.call(o, c, l.xhr) || c),
                                r.dispatch({
                                    type: 'RECEIVE_EVENTS',
                                    sourceId: t.sourceId,
                                    fetchId: s,
                                    fetchRange: e,
                                    rawEvents: c,
                                });
                        },
                        function (l) {
                            console.warn(l.message, l),
                                i.eventSourceFailure &&
                                    i.eventSourceFailure.call(o, l),
                                t.failure && t.failure(l),
                                r.dispatch({
                                    type: 'RECEIVE_EVENT_ERROR',
                                    sourceId: t.sourceId,
                                    fetchId: s,
                                    fetchRange: e,
                                    error: l,
                                });
                        }
                    ),
                    (0, u.pi)((0, u.pi)({}, t), {
                        isFetching: !0,
                        latestFetchId: s,
                    })
                );
            }
            function mo(t, e) {
                return Ce(t, function (n) {
                    return yo(n, e);
                });
            }
            function yo(t, e) {
                return !e.pluginHooks.eventSourceDefs[t.sourceDefId]
                    .ignoreRange;
            }
            function bo(t, e) {
                var n;
                if (e) {
                    n = [];
                    for (var r = 0, i = t; r < i.length; r++) {
                        var o = i[r],
                            a = e(o);
                        a ? n.push(a) : null == a && n.push(o);
                    }
                } else n = t;
                return n;
            }
            function Ao(t, e) {
                return xt(t, function (n) {
                    return n.sourceId !== e;
                });
            }
            function id(t, e) {
                switch (e.type) {
                    case 'UNSELECT_DATES':
                        return null;
                    case 'SELECT_DATES':
                        return e.selection;
                    default:
                        return t;
                }
            }
            function od(t, e) {
                switch (e.type) {
                    case 'UNSELECT_EVENT':
                        return '';
                    case 'SELECT_EVENT':
                        return e.eventInstanceId;
                    default:
                        return t;
                }
            }
            function ad(t, e) {
                var n;
                switch (e.type) {
                    case 'UNSET_EVENT_DRAG':
                        return null;
                    case 'SET_EVENT_DRAG':
                        return {
                            affectedEvents: (n = e.state).affectedEvents,
                            mutatedEvents: n.mutatedEvents,
                            isEvent: n.isEvent,
                        };
                    default:
                        return t;
                }
            }
            function sd(t, e) {
                var n;
                switch (e.type) {
                    case 'UNSET_EVENT_RESIZE':
                        return null;
                    case 'SET_EVENT_RESIZE':
                        return {
                            affectedEvents: (n = e.state).affectedEvents,
                            mutatedEvents: n.mutatedEvents,
                            isEvent: n.isEvent,
                        };
                    default:
                        return t;
                }
            }
            function ld(t, e, n, r, i) {
                return {
                    header: t.headerToolbar
                        ? Eo(t.headerToolbar, t, e, n, r, i)
                        : null,
                    footer: t.footerToolbar
                        ? Eo(t.footerToolbar, t, e, n, r, i)
                        : null,
                };
            }
            function Eo(t, e, n, r, i, o) {
                var a = {},
                    s = [],
                    l = !1;
                for (var c in t) {
                    var f = cd(t[c], e, n, r, i, o);
                    (a[c] = f.widgets),
                        s.push.apply(s, f.viewsWithButtons),
                        (l = l || f.hasTitle);
                }
                return { sectionWidgets: a, viewsWithButtons: s, hasTitle: l };
            }
            function cd(t, e, n, r, i, o) {
                var a = 'rtl' === e.direction,
                    s = e.customButtons || {},
                    l = n.buttonText || {},
                    c = e.buttonText || {},
                    d = n.buttonHints || {},
                    f = e.buttonHints || {},
                    p = t ? t.split(' ') : [],
                    v = [],
                    g = !1;
                return {
                    widgets: p.map(function (E) {
                        return E.split(',').map(function (m) {
                            if ('title' === m)
                                return (g = !0), { buttonName: m };
                            var w, C, D, _, k, P;
                            if ((w = s[m]))
                                (D = function (B) {
                                    w.click &&
                                        w.click.call(B.target, B, B.target);
                                }),
                                    (_ = r.getCustomButtonIconClass(w)) ||
                                        (_ = r.getIconClass(m, a)) ||
                                        (k = w.text),
                                    (P = w.hint || w.text);
                            else if ((C = i[m])) {
                                v.push(m),
                                    (D = function () {
                                        o.changeView(m);
                                    }),
                                    (k = C.buttonTextOverride) ||
                                        (_ = r.getIconClass(m, a)) ||
                                        (k = C.buttonTextDefault);
                                var T =
                                    C.buttonTextOverride || C.buttonTextDefault;
                                P = qe(
                                    C.buttonTitleOverride ||
                                        C.buttonTitleDefault ||
                                        e.viewHint,
                                    [T, m],
                                    T
                                );
                            } else if (o[m])
                                if (
                                    ((D = function () {
                                        o[m]();
                                    }),
                                    (k = l[m]) ||
                                        (_ = r.getIconClass(m, a)) ||
                                        (k = c[m]),
                                    'prevYear' === m || 'nextYear' === m)
                                ) {
                                    var F = 'prevYear' === m ? 'prev' : 'next';
                                    P = qe(
                                        d[F] || f[F],
                                        [c.year || 'year', 'year'],
                                        c[m]
                                    );
                                } else
                                    P = function (B) {
                                        return qe(
                                            d[m] || f[m],
                                            [c[B] || B, B],
                                            c[m]
                                        );
                                    };
                            return {
                                buttonName: m,
                                buttonClick: D,
                                buttonIcon: _,
                                buttonText: k,
                                buttonHint: P,
                            };
                        });
                    }),
                    viewsWithButtons: v,
                    hasTitle: g,
                };
            }
            function wo(t) {
                var e = [];
                for (var n in t)
                    e.push(
                        encodeURIComponent(n) + '=' + encodeURIComponent(t[n])
                    );
                return e.join('&');
            }
            function Do(t, e) {
                for (
                    var n = an(e.getCurrentData().eventSources),
                        r = [],
                        i = 0,
                        o = t;
                    i < o.length;
                    i++
                ) {
                    for (var a = o[i], s = !1, l = 0; l < n.length; l += 1)
                        if (n[l]._raw === a) {
                            n.splice(l, 1), (s = !0);
                            break;
                        }
                    s || r.push(a);
                }
                for (var c = 0, d = n; c < d.length; c++)
                    e.dispatch({
                        type: 'REMOVE_EVENT_SOURCE',
                        sourceId: d[c].sourceId,
                    });
                for (var p = 0, v = r; p < v.length; p++)
                    e.calendarApi.addEventSource(v[p]);
            }
            var Co = [
                    de({
                        eventSourceDefs: [
                            {
                                ignoreRange: !0,
                                parseMeta: function (t) {
                                    return Array.isArray(t.events)
                                        ? t.events
                                        : null;
                                },
                                fetch: function (t, e) {
                                    e({ rawEvents: t.eventSource.meta });
                                },
                            },
                        ],
                    }),
                    de({
                        eventSourceDefs: [
                            {
                                parseMeta: function (t) {
                                    return 'function' == typeof t.events
                                        ? t.events
                                        : null;
                                },
                                fetch: function (t, e, n) {
                                    !(function Ec(t, e, n) {
                                        var r = !1,
                                            i = function () {
                                                r ||
                                                    ((r = !0),
                                                    e.apply(this, arguments));
                                            },
                                            o = function () {
                                                r ||
                                                    ((r = !0),
                                                    n &&
                                                        n.apply(
                                                            this,
                                                            arguments
                                                        ));
                                            },
                                            a = t(i, o);
                                        a &&
                                            'function' == typeof a.then &&
                                            a.then(i, o);
                                    })(
                                        t.eventSource.meta.bind(
                                            null,
                                            Li(t.range, t.context.dateEnv)
                                        ),
                                        function (o) {
                                            e({ rawEvents: o });
                                        },
                                        n
                                    );
                                },
                            },
                        ],
                    }),
                    de({
                        eventSourceRefiners: {
                            method: String,
                            extraParams: A,
                            startParam: String,
                            endParam: String,
                            timeZoneParam: String,
                        },
                        eventSourceDefs: [
                            {
                                parseMeta: function (t) {
                                    return !t.url ||
                                        ('json' !== t.format && t.format)
                                        ? null
                                        : {
                                              url: t.url,
                                              format: 'json',
                                              method: (
                                                  t.method || 'GET'
                                              ).toUpperCase(),
                                              extraParams: t.extraParams,
                                              startParam: t.startParam,
                                              endParam: t.endParam,
                                              timeZoneParam: t.timeZoneParam,
                                          };
                                },
                                fetch: function (t, e, n) {
                                    var r = t.eventSource.meta,
                                        i = (function bd(t, e, n) {
                                            var o,
                                                a,
                                                s,
                                                l,
                                                r = n.dateEnv,
                                                i = n.options,
                                                c = {};
                                            return (
                                                null == (o = t.startParam) &&
                                                    (o = i.startParam),
                                                null == (a = t.endParam) &&
                                                    (a = i.endParam),
                                                null == (s = t.timeZoneParam) &&
                                                    (s = i.timeZoneParam),
                                                (l =
                                                    'function' ==
                                                    typeof t.extraParams
                                                        ? t.extraParams()
                                                        : t.extraParams || {}),
                                                (0, u.pi)(c, l),
                                                (c[o] = r.formatIso(e.start)),
                                                (c[a] = r.formatIso(e.end)),
                                                'local' !== r.timeZone &&
                                                    (c[s] = r.timeZone),
                                                c
                                            );
                                        })(r, t.range, t.context);
                                    !(function vd(t, e, n, r, i) {
                                        var o = null;
                                        'GET' === (t = t.toUpperCase())
                                            ? (e = (function hd(t, e) {
                                                  return (
                                                      t +
                                                      (-1 === t.indexOf('?')
                                                          ? '?'
                                                          : '&') +
                                                      wo(e)
                                                  );
                                              })(e, n))
                                            : (o = wo(n));
                                        var a = new XMLHttpRequest();
                                        a.open(t, e, !0),
                                            'GET' !== t &&
                                                a.setRequestHeader(
                                                    'Content-Type',
                                                    'application/x-www-form-urlencoded'
                                                ),
                                            (a.onload = function () {
                                                if (
                                                    a.status >= 200 &&
                                                    a.status < 400
                                                ) {
                                                    var s = !1,
                                                        l = void 0;
                                                    try {
                                                        (l = JSON.parse(
                                                            a.responseText
                                                        )),
                                                            (s = !0);
                                                    } catch (c) {}
                                                    s
                                                        ? r(l, a)
                                                        : i(
                                                              'Failure parsing JSON',
                                                              a
                                                          );
                                                } else i('Request failed', a);
                                            }),
                                            (a.onerror = function () {
                                                i('Request failed', a);
                                            }),
                                            a.send(o);
                                    })(
                                        r.method,
                                        r.url,
                                        i,
                                        function (o, a) {
                                            e({ rawEvents: o, xhr: a });
                                        },
                                        function (o, a) {
                                            n({ message: o, xhr: a });
                                        }
                                    );
                                },
                            },
                        ],
                    }),
                    de({
                        recurringTypes: [
                            {
                                parse: function (t, e) {
                                    if (
                                        t.daysOfWeek ||
                                        t.startTime ||
                                        t.endTime ||
                                        t.startRecur ||
                                        t.endRecur
                                    ) {
                                        var n = {
                                                daysOfWeek:
                                                    t.daysOfWeek || null,
                                                startTime: t.startTime || null,
                                                endTime: t.endTime || null,
                                                startRecur: t.startRecur
                                                    ? e.createMarker(
                                                          t.startRecur
                                                      )
                                                    : null,
                                                endRecur: t.endRecur
                                                    ? e.createMarker(t.endRecur)
                                                    : null,
                                            },
                                            r = void 0;
                                        return (
                                            t.duration && (r = t.duration),
                                            !r &&
                                                t.startTime &&
                                                t.endTime &&
                                                (r = (function Zs(t, e) {
                                                    return {
                                                        years:
                                                            t.years - e.years,
                                                        months:
                                                            t.months - e.months,
                                                        days: t.days - e.days,
                                                        milliseconds:
                                                            t.milliseconds -
                                                            e.milliseconds,
                                                    };
                                                })(t.endTime, t.startTime)),
                                            {
                                                allDayGuess: Boolean(
                                                    !t.startTime && !t.endTime
                                                ),
                                                duration: r,
                                                typeData: n,
                                            }
                                        );
                                    }
                                    return null;
                                },
                                expand: function (t, e, n) {
                                    var r = He(e, {
                                        start: t.startRecur,
                                        end: t.endRecur,
                                    });
                                    return r
                                        ? (function Dd(t, e, n, r) {
                                              for (
                                                  var i = t ? mi(t) : null,
                                                      o = H(n.start),
                                                      a = n.end,
                                                      s = [];
                                                  o < a;

                                              ) {
                                                  var l = void 0;
                                                  (!i || i[o.getUTCDay()]) &&
                                                      ((l = e
                                                          ? r.add(o, e)
                                                          : o),
                                                      s.push(l)),
                                                      (o = G(o, 1));
                                              }
                                              return s;
                                          })(t.daysOfWeek, t.startTime, r, n)
                                        : [];
                                },
                            },
                        ],
                        eventRefiners: {
                            daysOfWeek: A,
                            startTime: M,
                            endTime: M,
                            duration: M,
                            startRecur: A,
                            endRecur: A,
                        },
                    }),
                    de({
                        optionChangeHandlers: {
                            events: function (t, e) {
                                Do([t], e);
                            },
                            eventSources: Do,
                        },
                    }),
                    de({
                        isLoadingFuncs: [
                            function (t) {
                                return vo(t.eventSources);
                            },
                        ],
                        contentTypeHandlers: {
                            html: function Td() {
                                var t = null,
                                    e = '';
                                return {
                                    render: function n(i, o) {
                                        (i !== t || o !== e) &&
                                            (i.innerHTML = o),
                                            (t = i),
                                            (e = o);
                                    },
                                    destroy: function r() {
                                        (t.innerHTML = ''),
                                            (t = null),
                                            (e = '');
                                    },
                                };
                            },
                            domNodes: function Rd() {
                                var t = null,
                                    e = [];
                                function r() {
                                    e.forEach(tn), (e = []), (t = null);
                                }
                                return {
                                    render: function n(i, o) {
                                        var a = Array.prototype.slice.call(o);
                                        if (i !== t || !ye(e, a)) {
                                            for (
                                                var s = 0, l = a;
                                                s < l.length;
                                                s++
                                            )
                                                i.appendChild(l[s]);
                                            r();
                                        }
                                        (t = i), (e = a);
                                    },
                                    destroy: r,
                                };
                            },
                        },
                        propSetHandlers: {
                            dateProfile: function Sd(t, e) {
                                e.emitter.trigger(
                                    'datesSet',
                                    (0, u.pi)(
                                        (0, u.pi)(
                                            {},
                                            Li(t.activeRange, e.dateEnv)
                                        ),
                                        { view: e.viewApi }
                                    )
                                );
                            },
                            eventStore: function xd(t, e) {
                                var n = e.emitter;
                                n.hasHandlers('eventsSet') &&
                                    n.trigger('eventsSet', Se(t, e));
                            },
                        },
                    }),
                ],
                Bn = (function () {
                    function t(e) {
                        (this.drainedOption = e),
                            (this.isRunning = !1),
                            (this.isDirty = !1),
                            (this.pauseDepths = {}),
                            (this.timeoutId = 0);
                    }
                    return (
                        (t.prototype.request = function (e) {
                            (this.isDirty = !0),
                                this.isPaused() ||
                                    (this.clearTimeout(),
                                    null == e
                                        ? this.tryDrain()
                                        : (this.timeoutId = setTimeout(
                                              this.tryDrain.bind(this),
                                              e
                                          )));
                        }),
                        (t.prototype.pause = function (e) {
                            void 0 === e && (e = '');
                            var n = this.pauseDepths;
                            (n[e] = (n[e] || 0) + 1), this.clearTimeout();
                        }),
                        (t.prototype.resume = function (e, n) {
                            void 0 === e && (e = '');
                            var r = this.pauseDepths;
                            e in r &&
                                (n
                                    ? delete r[e]
                                    : ((r[e] -= 1), r[e] <= 0 && delete r[e]),
                                this.tryDrain());
                        }),
                        (t.prototype.isPaused = function () {
                            return Object.keys(this.pauseDepths).length;
                        }),
                        (t.prototype.tryDrain = function () {
                            if (!this.isRunning && !this.isPaused()) {
                                for (this.isRunning = !0; this.isDirty; )
                                    (this.isDirty = !1), this.drained();
                                this.isRunning = !1;
                            }
                        }),
                        (t.prototype.clear = function () {
                            this.clearTimeout(),
                                (this.isDirty = !1),
                                (this.pauseDepths = {});
                        }),
                        (t.prototype.clearTimeout = function () {
                            this.timeoutId &&
                                (clearTimeout(this.timeoutId),
                                (this.timeoutId = 0));
                        }),
                        (t.prototype.drained = function () {
                            this.drainedOption && this.drainedOption();
                        }),
                        t
                    );
                })(),
                kd = (function () {
                    function t(e, n) {
                        (this.runTaskOption = e),
                            (this.drainedOption = n),
                            (this.queue = []),
                            (this.delayedRunner = new Bn(
                                this.drain.bind(this)
                            ));
                    }
                    return (
                        (t.prototype.request = function (e, n) {
                            this.queue.push(e), this.delayedRunner.request(n);
                        }),
                        (t.prototype.pause = function (e) {
                            this.delayedRunner.pause(e);
                        }),
                        (t.prototype.resume = function (e, n) {
                            this.delayedRunner.resume(e, n);
                        }),
                        (t.prototype.drain = function () {
                            for (var e = this.queue; e.length; ) {
                                for (var n = [], r = void 0; (r = e.shift()); )
                                    this.runTask(r), n.push(r);
                                this.drained(n);
                            }
                        }),
                        (t.prototype.runTask = function (e) {
                            this.runTaskOption && this.runTaskOption(e);
                        }),
                        (t.prototype.drained = function (e) {
                            this.drainedOption && this.drainedOption(e);
                        }),
                        t
                    );
                })();
            function _d(t, e, n) {
                var r;
                return (
                    (r = /^(year|month)$/.test(t.currentRangeUnit)
                        ? t.currentRange
                        : t.activeRange),
                    n.formatRange(
                        r.start,
                        r.end,
                        O(
                            e.titleFormat ||
                                (function Md(t) {
                                    var e = t.currentRangeUnit;
                                    if ('year' === e)
                                        return { year: 'numeric' };
                                    if ('month' === e)
                                        return {
                                            year: 'numeric',
                                            month: 'long',
                                        };
                                    var n = mt(
                                        t.currentRange.start,
                                        t.currentRange.end
                                    );
                                    return null !== n && n > 1
                                        ? {
                                              year: 'numeric',
                                              month: 'short',
                                              day: 'numeric',
                                          }
                                        : {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                          };
                                })(t)
                        ),
                        {
                            isEndExclusive: t.isRangeAllDay,
                            defaultSeparator: e.titleRangeSeparator,
                        }
                    )
                );
            }
            var So = (function () {
                function t(e) {
                    var n = this;
                    (this.computeOptionsData = x(this._computeOptionsData)),
                        (this.computeCurrentViewData = x(
                            this._computeCurrentViewData
                        )),
                        (this.organizeRawLocales = x(Xi)),
                        (this.buildLocale = x(Cn)),
                        (this.buildPluginHooks = (function Mc() {
                            var n,
                                t = [],
                                e = [];
                            return function (r, i) {
                                return (
                                    (!n || !ye(r, t) || !ye(i, e)) &&
                                        (n = (function _c(t, e) {
                                            var n = {},
                                                r = {
                                                    reducers: [],
                                                    isLoadingFuncs: [],
                                                    contextInit: [],
                                                    eventRefiners: {},
                                                    eventDefMemberAdders: [],
                                                    eventSourceRefiners: {},
                                                    isDraggableTransformers: [],
                                                    eventDragMutationMassagers:
                                                        [],
                                                    eventDefMutationAppliers:
                                                        [],
                                                    dateSelectionTransformers:
                                                        [],
                                                    datePointTransforms: [],
                                                    dateSpanTransforms: [],
                                                    views: {},
                                                    viewPropsTransformers: [],
                                                    isPropsValid: null,
                                                    externalDefTransforms: [],
                                                    viewContainerAppends: [],
                                                    eventDropTransformers: [],
                                                    componentInteractions: [],
                                                    calendarInteractions: [],
                                                    themeClasses: {},
                                                    eventSourceDefs: [],
                                                    cmdFormatter: null,
                                                    recurringTypes: [],
                                                    namedTimeZonedImpl: null,
                                                    initialView: '',
                                                    elementDraggingImpl: null,
                                                    optionChangeHandlers: {},
                                                    scrollGridImpl: null,
                                                    contentTypeHandlers: {},
                                                    listenerRefiners: {},
                                                    optionRefiners: {},
                                                    propSetHandlers: {},
                                                };
                                            function i(o) {
                                                for (
                                                    var a = 0, s = o;
                                                    a < s.length;
                                                    a++
                                                ) {
                                                    var l = s[a];
                                                    n[l.id] ||
                                                        ((n[l.id] = !0),
                                                        i(l.deps),
                                                        (r = Ic(r, l)));
                                                }
                                            }
                                            return t && i(t), i(e), r;
                                        })(r, i)),
                                    (t = r),
                                    (e = i),
                                    n
                                );
                            };
                        })()),
                        (this.buildDateEnv = x(Id)),
                        (this.buildTheme = x(Nd)),
                        (this.parseToolbars = x(ld)),
                        (this.buildViewSpecs = x(zc)),
                        (this.buildDateProfileGenerator = At(Pd)),
                        (this.buildViewApi = x(Bd)),
                        (this.buildViewUiProps = At(zd)),
                        (this.buildEventUiBySource = x(Hd, ae)),
                        (this.buildEventUiBases = x(Od)),
                        (this.parseContextBusinessHours = At(Fd)),
                        (this.buildTitle = x(_d)),
                        (this.emitter = new Pt()),
                        (this.actionRunner = new kd(
                            this._handleAction.bind(this),
                            this.updateData.bind(this)
                        )),
                        (this.currentCalendarOptionsInput = {}),
                        (this.currentCalendarOptionsRefined = {}),
                        (this.currentViewOptionsInput = {}),
                        (this.currentViewOptionsRefined = {}),
                        (this.currentCalendarOptionsRefiners = {}),
                        (this.getCurrentData = function () {
                            return n.data;
                        }),
                        (this.dispatch = function (C) {
                            n.actionRunner.request(C);
                        }),
                        (this.props = e),
                        this.actionRunner.pause();
                    var r = {},
                        i = this.computeOptionsData(
                            e.optionOverrides,
                            r,
                            e.calendarApi
                        ),
                        o =
                            i.calendarOptions.initialView ||
                            i.pluginHooks.initialView,
                        a = this.computeCurrentViewData(
                            o,
                            i,
                            e.optionOverrides,
                            r
                        );
                    (e.calendarApi.currentDataManager = this),
                        this.emitter.setThisContext(e.calendarApi),
                        this.emitter.setOptions(a.options);
                    var s = (function Gl(t, e) {
                            var n = t.initialDate;
                            return null != n ? e.createMarker(n) : Ke(t.now, e);
                        })(i.calendarOptions, i.dateEnv),
                        l = a.dateProfileGenerator.build(s);
                    be(l.activeRange, s) || (s = l.currentRange.start);
                    for (
                        var c = {
                                dateEnv: i.dateEnv,
                                options: i.calendarOptions,
                                pluginHooks: i.pluginHooks,
                                calendarApi: e.calendarApi,
                                dispatch: this.dispatch,
                                emitter: this.emitter,
                                getCurrentData: this.getCurrentData,
                            },
                            d = 0,
                            f = i.pluginHooks.contextInit;
                        d < f.length;
                        d++
                    )
                        (0, f[d])(c);
                    for (
                        var v = (function Vc(t, e, n) {
                                var r = e ? e.activeRange : null;
                                return ho(
                                    {},
                                    (function Xc(t, e) {
                                        var n = Gi(e),
                                            r = [].concat(t.eventSources || []),
                                            i = [];
                                        t.initialEvents &&
                                            r.unshift(t.initialEvents),
                                            t.events && r.unshift(t.events);
                                        for (
                                            var o = 0, a = r;
                                            o < a.length;
                                            o++
                                        ) {
                                            var l = Vi(a[o], e, n);
                                            l && i.push(l);
                                        }
                                        return i;
                                    })(t, n),
                                    r,
                                    n
                                );
                            })(i.calendarOptions, l, c),
                            g = {
                                dynamicOptionOverrides: r,
                                currentViewType: o,
                                currentDate: s,
                                dateProfile: l,
                                businessHours:
                                    this.parseContextBusinessHours(c),
                                eventSources: v,
                                eventUiBases: {},
                                eventStore: { defs: {}, instances: {} },
                                renderableEventStore: {
                                    defs: {},
                                    instances: {},
                                },
                                dateSelection: null,
                                eventSelection: '',
                                eventDrag: null,
                                eventResize: null,
                                selectionConfig:
                                    this.buildViewUiProps(c).selectionConfig,
                            },
                            b = (0, u.pi)((0, u.pi)({}, c), g),
                            E = 0,
                            m = i.pluginHooks.reducers;
                        E < m.length;
                        E++
                    )
                        (0, u.pi)(g, (0, m[E])(null, null, b));
                    Hn(g, c) && this.emitter.trigger('loading', !0),
                        (this.state = g),
                        this.updateData(),
                        this.actionRunner.resume();
                }
                return (
                    (t.prototype.resetOptions = function (e, n) {
                        var r = this.props;
                        (r.optionOverrides = n
                            ? (0, u.pi)((0, u.pi)({}, r.optionOverrides), e)
                            : e),
                            this.actionRunner.request({ type: 'NOTHING' });
                    }),
                    (t.prototype._handleAction = function (e) {
                        var n = this,
                            r = n.props,
                            i = n.state,
                            o = n.emitter,
                            a = (function Qc(t, e) {
                                var n;
                                return 'SET_OPTION' === e.type
                                    ? (0, u.pi)(
                                          (0, u.pi)({}, t),
                                          (((n = {})[e.optionName] =
                                              e.rawOptionValue),
                                          n)
                                      )
                                    : t;
                            })(i.dynamicOptionOverrides, e),
                            s = this.computeOptionsData(
                                r.optionOverrides,
                                a,
                                r.calendarApi
                            ),
                            l = (function Lc(t, e) {
                                return (
                                    'CHANGE_VIEW_TYPE' === e.type &&
                                        (t = e.viewType),
                                    t
                                );
                            })(i.currentViewType, e),
                            c = this.computeCurrentViewData(
                                l,
                                s,
                                r.optionOverrides,
                                a
                            );
                        (r.calendarApi.currentDataManager = this),
                            o.setThisContext(r.calendarApi),
                            o.setOptions(c.options);
                        var d = {
                                dateEnv: s.dateEnv,
                                options: s.calendarOptions,
                                pluginHooks: s.pluginHooks,
                                calendarApi: r.calendarApi,
                                dispatch: this.dispatch,
                                emitter: o,
                                getCurrentData: this.getCurrentData,
                            },
                            f = i.currentDate,
                            p = i.dateProfile;
                        this.data &&
                            this.data.dateProfileGenerator !==
                                c.dateProfileGenerator &&
                            (p = c.dateProfileGenerator.build(f)),
                            (f = (function Vl(t, e) {
                                return 'CHANGE_DATE' === e.type
                                    ? e.dateMarker
                                    : t;
                            })(f, e)),
                            (p = (function Wc(t, e, n, r) {
                                var i;
                                switch (e.type) {
                                    case 'CHANGE_VIEW_TYPE':
                                        return r.build(e.dateMarker || n);
                                    case 'CHANGE_DATE':
                                        return r.build(e.dateMarker);
                                    case 'PREV':
                                        if ((i = r.buildPrev(t, n)).isValid)
                                            return i;
                                        break;
                                    case 'NEXT':
                                        if ((i = r.buildNext(t, n)).isValid)
                                            return i;
                                }
                                return t;
                            })(p, e, f, c.dateProfileGenerator)),
                            ('PREV' === e.type ||
                                'NEXT' === e.type ||
                                !be(p.currentRange, f)) &&
                                (f = p.currentRange.start);
                        for (
                            var v = (function Gc(t, e, n, r) {
                                    var i = n ? n.activeRange : null;
                                    switch (e.type) {
                                        case 'ADD_EVENT_SOURCES':
                                            return ho(t, e.sources, i, r);
                                        case 'REMOVE_EVENT_SOURCE':
                                            return (function jc(t, e) {
                                                return Ce(t, function (n) {
                                                    return n.sourceId !== e;
                                                });
                                            })(t, e.sourceId);
                                        case 'PREV':
                                        case 'NEXT':
                                        case 'CHANGE_DATE':
                                        case 'CHANGE_VIEW_TYPE':
                                            return n ? go(t, i, r) : t;
                                        case 'FETCH_EVENT_SOURCES':
                                            return Pn(
                                                t,
                                                e.sourceIds
                                                    ? mi(e.sourceIds)
                                                    : mo(t, r),
                                                i,
                                                e.isRefetch || !1,
                                                r
                                            );
                                        case 'RECEIVE_EVENTS':
                                        case 'RECEIVE_EVENT_ERROR':
                                            return (function Jc(t, e, n, r) {
                                                var i,
                                                    o = t[e];
                                                return o &&
                                                    n === o.latestFetchId
                                                    ? (0, u.pi)(
                                                          (0, u.pi)({}, t),
                                                          (((i = {})[e] = (0,
                                                          u.pi)(
                                                              (0, u.pi)({}, o),
                                                              {
                                                                  isFetching:
                                                                      !1,
                                                                  fetchRange: r,
                                                              }
                                                          )),
                                                          i)
                                                      )
                                                    : t;
                                            })(
                                                t,
                                                e.sourceId,
                                                e.fetchId,
                                                e.fetchRange
                                            );
                                        case 'REMOVE_ALL_EVENT_SOURCES':
                                            return {};
                                        default:
                                            return t;
                                    }
                                })(i.eventSources, e, p, d),
                                g = (function Kc(t, e, n, r, i) {
                                    switch (e.type) {
                                        case 'RECEIVE_EVENTS':
                                            return (function $c(
                                                t,
                                                e,
                                                n,
                                                r,
                                                i,
                                                o
                                            ) {
                                                if (
                                                    e &&
                                                    n === e.latestFetchId
                                                ) {
                                                    var a = St(
                                                        (function ed(t, e, n) {
                                                            var r =
                                                                    n.options
                                                                        .eventDataTransform,
                                                                i = e
                                                                    ? e.eventDataTransform
                                                                    : null;
                                                            return (
                                                                i &&
                                                                    (t = bo(
                                                                        t,
                                                                        i
                                                                    )),
                                                                r &&
                                                                    (t = bo(
                                                                        t,
                                                                        r
                                                                    )),
                                                                t
                                                            );
                                                        })(i, e, o),
                                                        e,
                                                        o
                                                    );
                                                    return (
                                                        r && (a = Ne(a, r, o)),
                                                        vn(Ao(t, e.sourceId), a)
                                                    );
                                                }
                                                return t;
                                            })(
                                                t,
                                                n[e.sourceId],
                                                e.fetchId,
                                                e.fetchRange,
                                                e.rawEvents,
                                                i
                                            );
                                        case 'ADD_EVENTS':
                                            return (function td(t, e, n, r) {
                                                return (
                                                    n && (e = Ne(e, n, r)),
                                                    vn(t, e)
                                                );
                                            })(
                                                t,
                                                e.eventStore,
                                                r ? r.activeRange : null,
                                                i
                                            );
                                        case 'RESET_EVENTS':
                                            return e.eventStore;
                                        case 'MERGE_EVENTS':
                                            return vn(t, e.eventStore);
                                        case 'PREV':
                                        case 'NEXT':
                                        case 'CHANGE_DATE':
                                        case 'CHANGE_VIEW_TYPE':
                                            return r
                                                ? Ne(t, r.activeRange, i)
                                                : t;
                                        case 'REMOVE_EVENTS':
                                            return (function vl(t, e) {
                                                var n = t.defs,
                                                    r = t.instances,
                                                    i = {},
                                                    o = {};
                                                for (var a in n)
                                                    e.defs[a] || (i[a] = n[a]);
                                                for (var s in r)
                                                    !e.instances[s] &&
                                                        i[r[s].defId] &&
                                                        (o[s] = r[s]);
                                                return {
                                                    defs: i,
                                                    instances: o,
                                                };
                                            })(t, e.eventStore);
                                        case 'REMOVE_EVENT_SOURCE':
                                            return Ao(t, e.sourceId);
                                        case 'REMOVE_ALL_EVENT_SOURCES':
                                            return xt(t, function (o) {
                                                return !o.sourceId;
                                            });
                                        case 'REMOVE_ALL_EVENTS':
                                            return { defs: {}, instances: {} };
                                        default:
                                            return t;
                                    }
                                })(i.eventStore, e, v, p, d),
                                E =
                                    (vo(v) &&
                                        !c.options.progressiveEventRendering &&
                                        i.renderableEventStore) ||
                                    g,
                                m = this.buildViewUiProps(d),
                                w = m.eventUiSingleBase,
                                C = m.selectionConfig,
                                D = this.buildEventUiBySource(v),
                                k = {
                                    dynamicOptionOverrides: a,
                                    currentViewType: l,
                                    currentDate: f,
                                    dateProfile: p,
                                    eventSources: v,
                                    eventStore: g,
                                    renderableEventStore: E,
                                    selectionConfig: C,
                                    eventUiBases: this.buildEventUiBases(
                                        E.defs,
                                        w,
                                        D
                                    ),
                                    businessHours:
                                        this.parseContextBusinessHours(d),
                                    dateSelection: id(i.dateSelection, e),
                                    eventSelection: od(i.eventSelection, e),
                                    eventDrag: ad(i.eventDrag, e),
                                    eventResize: sd(i.eventResize, e),
                                },
                                P = (0, u.pi)((0, u.pi)({}, d), k),
                                T = 0,
                                F = s.pluginHooks.reducers;
                            T < F.length;
                            T++
                        )
                            (0, u.pi)(k, (0, F[T])(i, e, P));
                        var q = Hn(i, d),
                            Z = Hn(k, d);
                        !q && Z
                            ? o.trigger('loading', !0)
                            : q && !Z && o.trigger('loading', !1),
                            (this.state = k),
                            r.onAction && r.onAction(e);
                    }),
                    (t.prototype.updateData = function () {
                        var n = this.props,
                            r = this.state,
                            i = this.data,
                            o = this.computeOptionsData(
                                n.optionOverrides,
                                r.dynamicOptionOverrides,
                                n.calendarApi
                            ),
                            a = this.computeCurrentViewData(
                                r.currentViewType,
                                o,
                                n.optionOverrides,
                                r.dynamicOptionOverrides
                            ),
                            s = (this.data = (0, u.pi)(
                                (0, u.pi)(
                                    (0, u.pi)(
                                        {
                                            viewTitle: this.buildTitle(
                                                r.dateProfile,
                                                a.options,
                                                o.dateEnv
                                            ),
                                            calendarApi: n.calendarApi,
                                            dispatch: this.dispatch,
                                            emitter: this.emitter,
                                            getCurrentData: this.getCurrentData,
                                        },
                                        o
                                    ),
                                    a
                                ),
                                r
                            )),
                            l = o.pluginHooks.optionChangeHandlers,
                            c = i && i.calendarOptions,
                            d = o.calendarOptions;
                        if (c && c !== d)
                            for (var f in (c.timeZone !== d.timeZone &&
                                ((r.eventSources = s.eventSources =
                                    (function Zc(t, e, n) {
                                        var r = e ? e.activeRange : null;
                                        return Pn(t, mo(t, n), r, !0, n);
                                    })(s.eventSources, r.dateProfile, s)),
                                (r.eventStore = s.eventStore =
                                    (function nd(t, e, n) {
                                        var r = t.defs,
                                            i = oe(t.instances, function (o) {
                                                var a = r[o.defId];
                                                return a.allDay ||
                                                    a.recurringDef
                                                    ? o
                                                    : (0, u.pi)(
                                                          (0, u.pi)({}, o),
                                                          {
                                                              range: {
                                                                  start: n.createMarker(
                                                                      e.toDate(
                                                                          o
                                                                              .range
                                                                              .start,
                                                                          o.forcedStartTzo
                                                                      )
                                                                  ),
                                                                  end: n.createMarker(
                                                                      e.toDate(
                                                                          o
                                                                              .range
                                                                              .end,
                                                                          o.forcedEndTzo
                                                                      )
                                                                  ),
                                                              },
                                                              forcedStartTzo:
                                                                  n.canComputeOffset
                                                                      ? null
                                                                      : o.forcedStartTzo,
                                                              forcedEndTzo:
                                                                  n.canComputeOffset
                                                                      ? null
                                                                      : o.forcedEndTzo,
                                                          }
                                                      );
                                            });
                                        return { defs: r, instances: i };
                                    })(s.eventStore, i.dateEnv, s.dateEnv))),
                            l))
                                c[f] !== d[f] && l[f](d[f], s);
                        n.onData && n.onData(s);
                    }),
                    (t.prototype._computeOptionsData = function (e, n, r) {
                        var i = this.processRawCalendarOptions(e, n),
                            o = i.refinedOptions,
                            a = i.pluginHooks,
                            s = i.localeDefaults,
                            l = i.availableLocaleData;
                        xo(i.extra);
                        var d = this.buildDateEnv(
                                o.timeZone,
                                o.locale,
                                o.weekNumberCalculation,
                                o.firstDay,
                                o.weekText,
                                a,
                                l,
                                o.defaultRangeSeparator
                            ),
                            f = this.buildViewSpecs(a.views, e, n, s),
                            p = this.buildTheme(o, a);
                        return {
                            calendarOptions: o,
                            pluginHooks: a,
                            dateEnv: d,
                            viewSpecs: f,
                            theme: p,
                            toolbarConfig: this.parseToolbars(o, e, p, f, r),
                            localeDefaults: s,
                            availableRawLocales: l.map,
                        };
                    }),
                    (t.prototype.processRawCalendarOptions = function (e, n) {
                        var r = un([se, e, n]),
                            o = r.locale,
                            a = this.organizeRawLocales(r.locales),
                            l = this.buildLocale(
                                o || a.defaultCode,
                                a.map
                            ).options,
                            c = this.buildPluginHooks(e.plugins || [], Co),
                            d = (this.currentCalendarOptionsRefiners = (0,
                            u.pi)(
                                (0, u.pi)(
                                    (0, u.pi)(
                                        (0, u.pi)((0, u.pi)({}, Ti), Ri),
                                        ki
                                    ),
                                    c.listenerRefiners
                                ),
                                c.optionRefiners
                            )),
                            f = {},
                            p = un([se, l, e, n]),
                            v = {},
                            g = this.currentCalendarOptionsInput,
                            b = this.currentCalendarOptionsRefined,
                            E = !1;
                        for (var m in p)
                            'plugins' !== m &&
                                (p[m] === g[m] ||
                                (fn[m] && m in g && fn[m](g[m], p[m]))
                                    ? (v[m] = b[m])
                                    : d[m]
                                    ? ((v[m] = d[m](p[m])), (E = !0))
                                    : (f[m] = g[m]));
                        return (
                            E &&
                                ((this.currentCalendarOptionsInput = p),
                                (this.currentCalendarOptionsRefined = v)),
                            {
                                rawOptions: this.currentCalendarOptionsInput,
                                refinedOptions:
                                    this.currentCalendarOptionsRefined,
                                pluginHooks: c,
                                availableLocaleData: a,
                                localeDefaults: l,
                                extra: f,
                            }
                        );
                    }),
                    (t.prototype._computeCurrentViewData = function (
                        e,
                        n,
                        r,
                        i
                    ) {
                        var o = n.viewSpecs[e];
                        if (!o)
                            throw new Error(
                                'viewType "' +
                                    e +
                                    '" is not available. Please make sure you\'ve loaded all neccessary plugins'
                            );
                        var a = this.processRawViewOptions(
                                o,
                                n.pluginHooks,
                                n.localeDefaults,
                                r,
                                i
                            ),
                            s = a.refinedOptions;
                        return (
                            xo(a.extra),
                            {
                                viewSpec: o,
                                options: s,
                                dateProfileGenerator:
                                    this.buildDateProfileGenerator({
                                        dateProfileGeneratorClass:
                                            o.optionDefaults
                                                .dateProfileGeneratorClass,
                                        duration: o.duration,
                                        durationUnit: o.durationUnit,
                                        usesMinMaxTime:
                                            o.optionDefaults.usesMinMaxTime,
                                        dateEnv: n.dateEnv,
                                        calendarApi: this.props.calendarApi,
                                        slotMinTime: s.slotMinTime,
                                        slotMaxTime: s.slotMaxTime,
                                        showNonCurrentDates:
                                            s.showNonCurrentDates,
                                        dayCount: s.dayCount,
                                        dateAlignment: s.dateAlignment,
                                        dateIncrement: s.dateIncrement,
                                        hiddenDays: s.hiddenDays,
                                        weekends: s.weekends,
                                        nowInput: s.now,
                                        validRangeInput: s.validRange,
                                        visibleRangeInput: s.visibleRange,
                                        monthMode: s.monthMode,
                                        fixedWeekCount: s.fixedWeekCount,
                                    }),
                                viewApi: this.buildViewApi(
                                    e,
                                    this.getCurrentData,
                                    n.dateEnv
                                ),
                            }
                        );
                    }),
                    (t.prototype.processRawViewOptions = function (
                        e,
                        n,
                        r,
                        i,
                        o
                    ) {
                        var a = un([
                                se,
                                e.optionDefaults,
                                r,
                                i,
                                e.optionOverrides,
                                o,
                            ]),
                            s = (0, u.pi)(
                                (0, u.pi)(
                                    (0, u.pi)(
                                        (0, u.pi)(
                                            (0, u.pi)((0, u.pi)({}, Ti), Ri),
                                            ki
                                        ),
                                        ul
                                    ),
                                    n.listenerRefiners
                                ),
                                n.optionRefiners
                            ),
                            l = {},
                            c = this.currentViewOptionsInput,
                            d = this.currentViewOptionsRefined,
                            f = !1,
                            p = {};
                        for (var v in a)
                            a[v] === c[v]
                                ? (l[v] = d[v])
                                : (a[v] === this.currentCalendarOptionsInput[v]
                                      ? v in
                                            this
                                                .currentCalendarOptionsRefined &&
                                        (l[v] =
                                            this.currentCalendarOptionsRefined[
                                                v
                                            ])
                                      : s[v]
                                      ? (l[v] = s[v](a[v]))
                                      : (p[v] = a[v]),
                                  (f = !0));
                        return (
                            f &&
                                ((this.currentViewOptionsInput = a),
                                (this.currentViewOptionsRefined = l)),
                            {
                                rawOptions: this.currentViewOptionsInput,
                                refinedOptions: this.currentViewOptionsRefined,
                                extra: p,
                            }
                        );
                    }),
                    t
                );
            })();
            function Id(t, e, n, r, i, o, a, s) {
                var l = Cn(e || a.defaultCode, a.map);
                return new Yi({
                    calendarSystem: 'gregory',
                    timeZone: t,
                    namedTimeZoneImpl: o.namedTimeZonedImpl,
                    locale: l,
                    weekNumberCalculation: n,
                    firstDay: r,
                    weekText: i,
                    cmdFormatter: o.cmdFormatter,
                    defaultSeparator: s,
                });
            }
            function Nd(t, e) {
                return new (e.themeClasses[t.themeSystem] || Ee)(t);
            }
            function Pd(t) {
                return new (t.dateProfileGeneratorClass || po)(t);
            }
            function Bd(t, e, n) {
                return new Ll(t, e, n);
            }
            function Hd(t) {
                return oe(t, function (e) {
                    return e.ui;
                });
            }
            function Od(t, e, n) {
                var r = { '': e };
                for (var i in t) {
                    var o = t[i];
                    o.sourceId && n[o.sourceId] && (r[i] = n[o.sourceId]);
                }
                return r;
            }
            function zd(t) {
                var e = t.options;
                return {
                    eventUiSingleBase: Rt(
                        {
                            display: e.eventDisplay,
                            editable: e.editable,
                            startEditable: e.eventStartEditable,
                            durationEditable: e.eventDurationEditable,
                            constraint: e.eventConstraint,
                            overlap:
                                'boolean' == typeof e.eventOverlap
                                    ? e.eventOverlap
                                    : void 0,
                            allow: e.eventAllow,
                            backgroundColor: e.eventBackgroundColor,
                            borderColor: e.eventBorderColor,
                            textColor: e.eventTextColor,
                            color: e.eventColor,
                        },
                        t
                    ),
                    selectionConfig: Rt(
                        {
                            constraint: e.selectConstraint,
                            overlap:
                                'boolean' == typeof e.selectOverlap
                                    ? e.selectOverlap
                                    : void 0,
                            allow: e.selectAllow,
                        },
                        t
                    ),
                };
            }
            function Hn(t, e) {
                for (
                    var n = 0, r = e.pluginHooks.isLoadingFuncs;
                    n < r.length;
                    n++
                )
                    if ((0, r[n])(t)) return !0;
                return !1;
            }
            function Fd(t) {
                return (function nc(t, e) {
                    return St(
                        (function rc(t) {
                            return (
                                !0 === t
                                    ? [{}]
                                    : Array.isArray(t)
                                    ? t.filter(function (n) {
                                          return n.daysOfWeek;
                                      })
                                    : 'object' == typeof t && t
                                    ? [t]
                                    : []
                            ).map(function (n) {
                                return (0, u.pi)((0, u.pi)({}, tc), n);
                            });
                        })(t),
                        null,
                        e
                    );
                })(t.options.businessHours, t);
            }
            function xo(t, e) {
                for (var n in t)
                    console.warn(
                        "Unknown option '" +
                            n +
                            "'" +
                            (e ? " for view '" + e + "'" : '')
                    );
            }
            !(function (t) {
                function e(n) {
                    var r = t.call(this, n) || this;
                    return (
                        (r.handleData = function (i) {
                            r.dataManager ? r.setState(i) : (r.state = i);
                        }),
                        (r.dataManager = new So({
                            optionOverrides: n.optionOverrides,
                            calendarApi: n.calendarApi,
                            onData: r.handleData,
                        })),
                        r
                    );
                }
                (0, u.ZT)(e, t),
                    (e.prototype.render = function () {
                        return this.props.children(this.state);
                    }),
                    (e.prototype.componentDidUpdate = function (n) {
                        var r = this.props.optionOverrides;
                        r !== n.optionOverrides &&
                            this.dataManager.resetOptions(r);
                    });
            })(en);
            var To = (function () {
                function t() {
                    (this.strictOrder = !1),
                        (this.allowReslicing = !1),
                        (this.maxCoord = -1),
                        (this.maxStackCnt = -1),
                        (this.levelCoords = []),
                        (this.entriesByLevel = []),
                        (this.stackCnts = {});
                }
                return (
                    (t.prototype.addSegs = function (e) {
                        for (var n = [], r = 0, i = e; r < i.length; r++)
                            this.insertEntry(i[r], n);
                        return n;
                    }),
                    (t.prototype.insertEntry = function (e, n) {
                        var r = this.findInsertion(e);
                        return this.isInsertionValid(r, e)
                            ? (this.insertEntryAt(e, r), 1)
                            : this.handleInvalidInsertion(r, e, n);
                    }),
                    (t.prototype.isInsertionValid = function (e, n) {
                        return (
                            (-1 === this.maxCoord ||
                                e.levelCoord + n.thickness <= this.maxCoord) &&
                            (-1 === this.maxStackCnt ||
                                e.stackCnt < this.maxStackCnt)
                        );
                    }),
                    (t.prototype.handleInvalidInsertion = function (e, n, r) {
                        return this.allowReslicing && e.touchingEntry
                            ? this.splitEntry(n, e.touchingEntry, r)
                            : (r.push(n), 0);
                    }),
                    (t.prototype.splitEntry = function (e, n, r) {
                        var i = 0,
                            o = [],
                            a = e.span,
                            s = n.span;
                        return (
                            a.start < s.start &&
                                (i += this.insertEntry(
                                    {
                                        index: e.index,
                                        thickness: e.thickness,
                                        span: { start: a.start, end: s.start },
                                    },
                                    o
                                )),
                            a.end > s.end &&
                                (i += this.insertEntry(
                                    {
                                        index: e.index,
                                        thickness: e.thickness,
                                        span: { start: s.end, end: a.end },
                                    },
                                    o
                                )),
                            i
                                ? (r.push.apply(
                                      r,
                                      (0, u.ev)(
                                          [
                                              {
                                                  index: e.index,
                                                  thickness: e.thickness,
                                                  span: zn(s, a),
                                              },
                                          ],
                                          o
                                      )
                                  ),
                                  i)
                                : (r.push(e), 0)
                        );
                    }),
                    (t.prototype.insertEntryAt = function (e, n) {
                        var i = this.entriesByLevel;
                        -1 === n.lateral
                            ? (Fn(this.levelCoords, n.level, n.levelCoord),
                              Fn(i, n.level, [e]))
                            : Fn(i[n.level], n.lateral, e),
                            (this.stackCnts[xe(e)] = n.stackCnt);
                    }),
                    (t.prototype.findInsertion = function (e) {
                        for (
                            var n = this,
                                r = n.levelCoords,
                                i = n.entriesByLevel,
                                o = n.strictOrder,
                                a = n.stackCnts,
                                s = r.length,
                                l = 0,
                                c = -1,
                                d = -1,
                                f = null,
                                p = 0,
                                v = 0;
                            v < s;
                            v += 1
                        ) {
                            var g = r[v];
                            if (!o && g >= l + e.thickness) break;
                            for (
                                var b = i[v],
                                    E = void 0,
                                    m = Un(b, e.span.start, On),
                                    w = m[0] + m[1];
                                (E = b[w]) && E.span.start < e.span.end;

                            ) {
                                var C = g + E.thickness;
                                C > l && ((l = C), (f = E), (c = v), (d = w)),
                                    C === l && (p = Math.max(p, a[xe(E)] + 1)),
                                    (w += 1);
                            }
                        }
                        var D = 0;
                        if (f) for (D = c + 1; D < s && r[D] < l; ) D += 1;
                        var _ = -1;
                        return (
                            D < s &&
                                r[D] === l &&
                                (_ = Un(i[D], e.span.end, On)[0]),
                            {
                                touchingLevel: c,
                                touchingLateral: d,
                                touchingEntry: f,
                                stackCnt: p,
                                levelCoord: l,
                                level: D,
                                lateral: _,
                            }
                        );
                    }),
                    (t.prototype.toRects = function () {
                        for (
                            var n = this.entriesByLevel,
                                r = this.levelCoords,
                                i = n.length,
                                o = [],
                                a = 0;
                            a < i;
                            a += 1
                        )
                            for (
                                var l = r[a], c = 0, d = n[a];
                                c < d.length;
                                c++
                            )
                                o.push(
                                    (0, u.pi)((0, u.pi)({}, d[c]), {
                                        levelCoord: l,
                                    })
                                );
                        return o;
                    }),
                    t
                );
            })();
            function On(t) {
                return t.span.end;
            }
            function xe(t) {
                return t.index + ':' + t.span.start;
            }
            function Ld(t, e) {
                return {
                    start: Math.min(t.start, e.start),
                    end: Math.max(t.end, e.end),
                };
            }
            function zn(t, e) {
                var n = Math.max(t.start, e.start),
                    r = Math.min(t.end, e.end);
                return n < r ? { start: n, end: r } : null;
            }
            function Fn(t, e, n) {
                t.splice(e, 0, n);
            }
            function Un(t, e, n) {
                var r = 0,
                    i = t.length;
                if (!i || e < n(t[r])) return [0, 0];
                if (e > n(t[i - 1])) return [i, 0];
                for (; r < i; ) {
                    var o = Math.floor(r + (i - r) / 2),
                        a = n(t[o]);
                    if (e < a) i = o;
                    else {
                        if (!(e > a)) return [o, 1];
                        r = o + 1;
                    }
                }
                return [r, 0];
            }
            var ze = (function () {
                function t(e) {
                    (this.component = e.component),
                        (this.isHitComboAllowed = e.isHitComboAllowed || null);
                }
                return (t.prototype.destroy = function () {}), t;
            })();
            function Qd(t, e) {
                return {
                    component: t,
                    el: e.el,
                    useEventCenter:
                        null == e.useEventCenter || e.useEventCenter,
                    isHitComboAllowed: e.isHitComboAllowed || null,
                };
            }
            function Ln(t) {
                var e;
                return ((e = {})[t.component.uid] = t), e;
            }
            var Ht = {},
                Ro = (function () {
                    function t(e, n) {
                        this.emitter = new Pt();
                    }
                    return (
                        (t.prototype.destroy = function () {}),
                        (t.prototype.setMirrorIsVisible = function (e) {}),
                        (t.prototype.setMirrorNeedsRevert = function (e) {}),
                        (t.prototype.setAutoScrollEnabled = function (e) {}),
                        t
                    );
                })(),
                Ot = {},
                Wd = {
                    startTime: M,
                    duration: M,
                    create: Boolean,
                    sourceId: String,
                };
            function Qn(t) {
                var e = Ct(t, Wd),
                    n = e.refined;
                return {
                    startTime: n.startTime || null,
                    duration: n.duration || null,
                    create: null == n.create || n.create,
                    sourceId: n.sourceId,
                    leftoverProps: e.extra,
                };
            }
            var Vd = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this,
                                r = this.props.widgetGroups.map(function (i) {
                                    return n.renderWidgetGroup(i);
                                });
                            return h.apply(
                                void 0,
                                (0, u.ev)(
                                    ['div', { className: 'fc-toolbar-chunk' }],
                                    r
                                )
                            );
                        }),
                        (e.prototype.renderWidgetGroup = function (n) {
                            for (
                                var r = this.props,
                                    i = this.context.theme,
                                    o = [],
                                    a = !0,
                                    s = 0,
                                    l = n;
                                s < l.length;
                                s++
                            ) {
                                var c = l[s],
                                    d = c.buttonName,
                                    f = c.buttonClick,
                                    p = c.buttonText,
                                    v = c.buttonIcon,
                                    g = c.buttonHint;
                                if ('title' === d)
                                    (a = !1),
                                        o.push(
                                            h(
                                                'h2',
                                                {
                                                    className:
                                                        'fc-toolbar-title',
                                                    id: r.titleId,
                                                },
                                                r.title
                                            )
                                        );
                                else {
                                    var b = d === r.activeButton,
                                        E =
                                            (!r.isTodayEnabled &&
                                                'today' === d) ||
                                            (!r.isPrevEnabled &&
                                                'prev' === d) ||
                                            (!r.isNextEnabled && 'next' === d),
                                        m = [
                                            'fc-' + d + '-button',
                                            i.getClass('button'),
                                        ];
                                    b && m.push(i.getClass('buttonActive')),
                                        o.push(
                                            h(
                                                'button',
                                                {
                                                    type: 'button',
                                                    title:
                                                        'function' == typeof g
                                                            ? g(r.navUnit)
                                                            : g,
                                                    disabled: E,
                                                    'aria-pressed': b,
                                                    className: m.join(' '),
                                                    onClick: f,
                                                },
                                                p ||
                                                    (v
                                                        ? h('span', {
                                                              className: v,
                                                          })
                                                        : '')
                                            )
                                        );
                                }
                            }
                            if (o.length > 1) {
                                var w = (a && i.getClass('buttonGroup')) || '';
                                return h.apply(
                                    void 0,
                                    (0, u.ev)(['div', { className: w }], o)
                                );
                            }
                            return o[0];
                        }),
                        e
                    );
                })(I),
                ko = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var a,
                                s,
                                n = this.props,
                                o = !1,
                                l = n.model.sectionWidgets,
                                c = l.center;
                            return (
                                l.left
                                    ? ((o = !0), (a = l.left))
                                    : (a = l.start),
                                l.right
                                    ? ((o = !0), (s = l.right))
                                    : (s = l.end),
                                h(
                                    'div',
                                    {
                                        className: [
                                            n.extraClassName || '',
                                            'fc-toolbar',
                                            o ? 'fc-toolbar-ltr' : '',
                                        ].join(' '),
                                    },
                                    this.renderSection('start', a || []),
                                    this.renderSection('center', c || []),
                                    this.renderSection('end', s || [])
                                )
                            );
                        }),
                        (e.prototype.renderSection = function (n, r) {
                            var i = this.props;
                            return h(Vd, {
                                key: n,
                                widgetGroups: r,
                                title: i.title,
                                navUnit: i.navUnit,
                                activeButton: i.activeButton,
                                isTodayEnabled: i.isTodayEnabled,
                                isPrevEnabled: i.isPrevEnabled,
                                isNextEnabled: i.isNextEnabled,
                                titleId: i.titleId,
                            });
                        }),
                        e
                    );
                })(I),
                Gd = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.state = { availableWidth: null }),
                            (n.handleEl = function (r) {
                                (n.el = r),
                                    $(n.props.elRef, r),
                                    n.updateAvailableWidth();
                            }),
                            (n.handleResize = function () {
                                n.updateAvailableWidth();
                            }),
                            n
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var r = this.props,
                                i = this.state,
                                o = r.aspectRatio,
                                s = '',
                                l = '';
                            return (
                                o
                                    ? null !== i.availableWidth
                                        ? (s = i.availableWidth / o)
                                        : (l = (1 / o) * 100 + '%')
                                    : (s = r.height || ''),
                                h(
                                    'div',
                                    {
                                        'aria-labelledby': r.labeledById,
                                        ref: this.handleEl,
                                        className: [
                                            'fc-view-harness',
                                            o || r.liquid || r.height
                                                ? 'fc-view-harness-active'
                                                : 'fc-view-harness-passive',
                                        ].join(' '),
                                        style: { height: s, paddingBottom: l },
                                    },
                                    r.children
                                )
                            );
                        }),
                        (e.prototype.componentDidMount = function () {
                            this.context.addResizeHandler(this.handleResize);
                        }),
                        (e.prototype.componentWillUnmount = function () {
                            this.context.removeResizeHandler(this.handleResize);
                        }),
                        (e.prototype.updateAvailableWidth = function () {
                            this.el &&
                                this.props.aspectRatio &&
                                this.setState({
                                    availableWidth: this.el.offsetWidth,
                                });
                        }),
                        e
                    );
                })(I),
                Zd = (function (t) {
                    function e(n) {
                        var r = t.call(this, n) || this;
                        return (
                            (r.handleSegClick = function (i, o) {
                                var a = r.component,
                                    s = a.context,
                                    l = Oe(o);
                                if (l && a.isValidSegDownEl(i.target)) {
                                    var c = W(i.target, '.fc-event-forced-url'),
                                        d = c
                                            ? c.querySelector('a[href]').href
                                            : '';
                                    s.emitter.trigger('eventClick', {
                                        el: o,
                                        event: new z(
                                            a.context,
                                            l.eventRange.def,
                                            l.eventRange.instance
                                        ),
                                        jsEvent: i,
                                        view: s.viewApi,
                                    }),
                                        d &&
                                            !i.defaultPrevented &&
                                            (window.location.href = d);
                                }
                            }),
                            (r.destroy = si(
                                n.el,
                                'click',
                                '.fc-event',
                                r.handleSegClick
                            )),
                            r
                        );
                    }
                    return (0, u.ZT)(e, t), e;
                })(ze),
                jd = (function (t) {
                    function e(n) {
                        var r = t.call(this, n) || this;
                        return (
                            (r.handleEventElRemove = function (i) {
                                i === r.currentSegEl &&
                                    r.handleSegLeave(null, r.currentSegEl);
                            }),
                            (r.handleSegEnter = function (i, o) {
                                Oe(o) &&
                                    ((r.currentSegEl = o),
                                    r.triggerEvent('eventMouseEnter', i, o));
                            }),
                            (r.handleSegLeave = function (i, o) {
                                r.currentSegEl &&
                                    ((r.currentSegEl = null),
                                    r.triggerEvent('eventMouseLeave', i, o));
                            }),
                            (r.removeHoverListeners = (function gs(t, e, n, r) {
                                var i;
                                return si(t, 'mouseover', e, function (o, a) {
                                    if (a !== i) {
                                        (i = a), n(o, a);
                                        var s = function (l) {
                                            (i = null),
                                                r(l, a),
                                                a.removeEventListener(
                                                    'mouseleave',
                                                    s
                                                );
                                        };
                                        a.addEventListener('mouseleave', s);
                                    }
                                });
                            })(
                                n.el,
                                '.fc-event',
                                r.handleSegEnter,
                                r.handleSegLeave
                            )),
                            r
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.destroy = function () {
                            this.removeHoverListeners();
                        }),
                        (e.prototype.triggerEvent = function (n, r, i) {
                            var o = this.component,
                                a = o.context,
                                s = Oe(i);
                            (!r || o.isValidSegDownEl(r.target)) &&
                                a.emitter.trigger(n, {
                                    el: i,
                                    event: new z(
                                        a,
                                        s.eventRange.def,
                                        s.eventRange.instance
                                    ),
                                    jsEvent: r,
                                    view: a.viewApi,
                                });
                        }),
                        e
                    );
                })(ze),
                Yd = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.buildViewContext = x(Tc)),
                            (n.buildViewPropTransformers = x(Jd)),
                            (n.buildToolbarProps = x(qd)),
                            (n.headerRef = U()),
                            (n.footerRef = U()),
                            (n.interactionsStore = {}),
                            (n.state = { viewLabelId: ut() }),
                            (n.registerInteractiveComponent = function (r, i) {
                                var o = Qd(r, i),
                                    l = [Zd, jd]
                                        .concat(
                                            n.props.pluginHooks
                                                .componentInteractions
                                        )
                                        .map(function (c) {
                                            return new c(o);
                                        });
                                (n.interactionsStore[r.uid] = l),
                                    (Ht[r.uid] = o);
                            }),
                            (n.unregisterInteractiveComponent = function (r) {
                                for (
                                    var i = 0, o = n.interactionsStore[r.uid];
                                    i < o.length;
                                    i++
                                )
                                    o[i].destroy();
                                delete n.interactionsStore[r.uid],
                                    delete Ht[r.uid];
                            }),
                            (n.resizeRunner = new Bn(function () {
                                n.props.emitter.trigger('_resize', !0),
                                    n.props.emitter.trigger('windowResize', {
                                        view: n.props.viewApi,
                                    });
                            })),
                            (n.handleWindowResize = function (r) {
                                var i = n.props.options;
                                i.handleWindowResize &&
                                    r.target === window &&
                                    n.resizeRunner.request(i.windowResizeDelay);
                            }),
                            n
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var l,
                                n = this.props,
                                r = n.toolbarConfig,
                                i = n.options,
                                o = this.buildToolbarProps(
                                    n.viewSpec,
                                    n.dateProfile,
                                    n.dateProfileGenerator,
                                    n.currentDate,
                                    Ke(n.options.now, n.dateEnv),
                                    n.viewTitle
                                ),
                                a = !1,
                                s = '';
                            n.isHeightAuto || n.forPrint
                                ? (s = '')
                                : null != i.height
                                ? (a = !0)
                                : null != i.contentHeight
                                ? (s = i.contentHeight)
                                : (l = Math.max(i.aspectRatio, 0.5));
                            var c = this.buildViewContext(
                                    n.viewSpec,
                                    n.viewApi,
                                    n.options,
                                    n.dateProfileGenerator,
                                    n.dateEnv,
                                    n.theme,
                                    n.pluginHooks,
                                    n.dispatch,
                                    n.getCurrentData,
                                    n.emitter,
                                    n.calendarApi,
                                    this.registerInteractiveComponent,
                                    this.unregisterInteractiveComponent
                                ),
                                d =
                                    r.header && r.header.hasTitle
                                        ? this.state.viewLabelId
                                        : '';
                            return h(
                                le.Provider,
                                { value: c },
                                r.header &&
                                    h(
                                        ko,
                                        (0, u.pi)(
                                            {
                                                ref: this.headerRef,
                                                extraClassName:
                                                    'fc-header-toolbar',
                                                model: r.header,
                                                titleId: d,
                                            },
                                            o
                                        )
                                    ),
                                h(
                                    Gd,
                                    {
                                        liquid: a,
                                        height: s,
                                        aspectRatio: l,
                                        labeledById: d,
                                    },
                                    this.renderView(n),
                                    this.buildAppendContent()
                                ),
                                r.footer &&
                                    h(
                                        ko,
                                        (0, u.pi)(
                                            {
                                                ref: this.footerRef,
                                                extraClassName:
                                                    'fc-footer-toolbar',
                                                model: r.footer,
                                                titleId: '',
                                            },
                                            o
                                        )
                                    )
                            );
                        }),
                        (e.prototype.componentDidMount = function () {
                            var n = this.props;
                            (this.calendarInteractions =
                                n.pluginHooks.calendarInteractions.map(
                                    function (o) {
                                        return new o(n);
                                    }
                                )),
                                window.addEventListener(
                                    'resize',
                                    this.handleWindowResize
                                );
                            var r = n.pluginHooks.propSetHandlers;
                            for (var i in r) r[i](n[i], n);
                        }),
                        (e.prototype.componentDidUpdate = function (n) {
                            var r = this.props,
                                i = r.pluginHooks.propSetHandlers;
                            for (var o in i) r[o] !== n[o] && i[o](r[o], r);
                        }),
                        (e.prototype.componentWillUnmount = function () {
                            window.removeEventListener(
                                'resize',
                                this.handleWindowResize
                            ),
                                this.resizeRunner.clear();
                            for (
                                var n = 0, r = this.calendarInteractions;
                                n < r.length;
                                n++
                            )
                                r[n].destroy();
                            this.props.emitter.trigger('_unmount');
                        }),
                        (e.prototype.buildAppendContent = function () {
                            var n = this.props,
                                r = n.pluginHooks.viewContainerAppends.map(
                                    function (i) {
                                        return i(n);
                                    }
                                );
                            return h.apply(void 0, (0, u.ev)([L, {}], r));
                        }),
                        (e.prototype.renderView = function (n) {
                            for (
                                var i = n.viewSpec,
                                    o = {
                                        dateProfile: n.dateProfile,
                                        businessHours: n.businessHours,
                                        eventStore: n.renderableEventStore,
                                        eventUiBases: n.eventUiBases,
                                        dateSelection: n.dateSelection,
                                        eventSelection: n.eventSelection,
                                        eventDrag: n.eventDrag,
                                        eventResize: n.eventResize,
                                        isHeightAuto: n.isHeightAuto,
                                        forPrint: n.forPrint,
                                    },
                                    s = 0,
                                    l = this.buildViewPropTransformers(
                                        n.pluginHooks.viewPropsTransformers
                                    );
                                s < l.length;
                                s++
                            )
                                (0, u.pi)(o, l[s].transform(o, n));
                            return h(i.component, (0, u.pi)({}, o));
                        }),
                        e
                    );
                })(Bt);
            function qd(t, e, n, r, i, o) {
                var a = n.build(i, void 0, !1),
                    s = n.buildPrev(e, r, !1),
                    l = n.buildNext(e, r, !1);
                return {
                    title: o,
                    activeButton: t.type,
                    navUnit: t.singleUnit,
                    isTodayEnabled: a.isValid && !be(e.currentRange, i),
                    isPrevEnabled: s.isValid,
                    isNextEnabled: l.isValid,
                };
            }
            function Jd(t) {
                return t.map(function (e) {
                    return new e();
                });
            }
            var Xd = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.state = { forPrint: !1 }),
                            (n.handleBeforePrint = function () {
                                n.setState({ forPrint: !0 });
                            }),
                            (n.handleAfterPrint = function () {
                                n.setState({ forPrint: !1 });
                            }),
                            n
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this.props,
                                r = n.options,
                                i = this.state.forPrint,
                                o =
                                    i ||
                                    'auto' === r.height ||
                                    'auto' === r.contentHeight,
                                a = o || null == r.height ? '' : r.height,
                                s = [
                                    'fc',
                                    i ? 'fc-media-print' : 'fc-media-screen',
                                    'fc-direction-' + r.direction,
                                    n.theme.getClass('root'),
                                ];
                            return (
                                to() || s.push('fc-liquid-hack'),
                                n.children(s, a, o, i)
                            );
                        }),
                        (e.prototype.componentDidMount = function () {
                            var n = this.props.emitter;
                            n.on('_beforeprint', this.handleBeforePrint),
                                n.on('_afterprint', this.handleAfterPrint);
                        }),
                        (e.prototype.componentWillUnmount = function () {
                            var n = this.props.emitter;
                            n.off('_beforeprint', this.handleBeforePrint),
                                n.off('_afterprint', this.handleAfterPrint);
                        }),
                        e
                    );
                })(I),
                _o = 'fc-col-header-cell';
            function Mo(t) {
                return t.text;
            }
            var $d = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this.context,
                                r = n.dateEnv,
                                i = n.options,
                                o = n.theme,
                                a = n.viewApi,
                                s = this.props,
                                l = s.date,
                                d = no(l, s.todayRange, null, s.dateProfile),
                                f = [_o].concat(Tn(d, o)),
                                p = r.format(l, s.dayHeaderFormat),
                                v =
                                    !d.isDisabled && s.colCnt > 1
                                        ? Nt(this.context, l)
                                        : {},
                                g = (0, u.pi)(
                                    (0, u.pi)(
                                        (0, u.pi)(
                                            { date: r.toDate(l), view: a },
                                            s.extraHookProps
                                        ),
                                        { text: p }
                                    ),
                                    d
                                );
                            return h(
                                te,
                                {
                                    hookProps: g,
                                    classNames: i.dayHeaderClassNames,
                                    content: i.dayHeaderContent,
                                    defaultContent: Mo,
                                    didMount: i.dayHeaderDidMount,
                                    willUnmount: i.dayHeaderWillUnmount,
                                },
                                function (b, E, m, w) {
                                    return h(
                                        'th',
                                        (0, u.pi)(
                                            {
                                                ref: b,
                                                role: 'columnheader',
                                                className: f
                                                    .concat(E)
                                                    .join(' '),
                                                'data-date': d.isDisabled
                                                    ? void 0
                                                    : Di(l),
                                                colSpan: s.colSpan,
                                            },
                                            s.extraDataAttrs
                                        ),
                                        h(
                                            'div',
                                            {
                                                className:
                                                    'fc-scrollgrid-sync-inner',
                                            },
                                            !d.isDisabled &&
                                                h(
                                                    'a',
                                                    (0, u.pi)(
                                                        {
                                                            ref: m,
                                                            className: [
                                                                'fc-col-header-cell-cushion',
                                                                s.isSticky
                                                                    ? 'fc-sticky'
                                                                    : '',
                                                            ].join(' '),
                                                        },
                                                        v
                                                    ),
                                                    w
                                                )
                                        )
                                    );
                                }
                            );
                        }),
                        e
                    );
                })(I),
                ef = O({ weekday: 'long' }),
                tf = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this.props,
                                r = this.context,
                                i = r.dateEnv,
                                o = r.theme,
                                a = r.viewApi,
                                s = r.options,
                                l = G(new Date(2592e5), n.dow),
                                c = {
                                    dow: n.dow,
                                    isDisabled: !1,
                                    isFuture: !1,
                                    isPast: !1,
                                    isToday: !1,
                                    isOther: !1,
                                },
                                d = [_o].concat(
                                    Tn(c, o),
                                    n.extraClassNames || []
                                ),
                                f = i.format(l, n.dayHeaderFormat),
                                p = (0, u.pi)(
                                    (0, u.pi)(
                                        (0, u.pi)((0, u.pi)({ date: l }, c), {
                                            view: a,
                                        }),
                                        n.extraHookProps
                                    ),
                                    { text: f }
                                );
                            return h(
                                te,
                                {
                                    hookProps: p,
                                    classNames: s.dayHeaderClassNames,
                                    content: s.dayHeaderContent,
                                    defaultContent: Mo,
                                    didMount: s.dayHeaderDidMount,
                                    willUnmount: s.dayHeaderWillUnmount,
                                },
                                function (v, g, b, E) {
                                    return h(
                                        'th',
                                        (0, u.pi)(
                                            {
                                                ref: v,
                                                role: 'columnheader',
                                                className: d
                                                    .concat(g)
                                                    .join(' '),
                                                colSpan: n.colSpan,
                                            },
                                            n.extraDataAttrs
                                        ),
                                        h(
                                            'div',
                                            {
                                                className:
                                                    'fc-scrollgrid-sync-inner',
                                            },
                                            h(
                                                'a',
                                                {
                                                    'aria-label': i.format(
                                                        l,
                                                        ef
                                                    ),
                                                    className: [
                                                        'fc-col-header-cell-cushion',
                                                        n.isSticky
                                                            ? 'fc-sticky'
                                                            : '',
                                                    ].join(' '),
                                                    ref: b,
                                                },
                                                E
                                            )
                                        )
                                    );
                                }
                            );
                        }),
                        e
                    );
                })(I),
                zt = (function (t) {
                    function e(n, r) {
                        var i = t.call(this, n, r) || this;
                        return (
                            (i.initialNowDate = Ke(r.options.now, r.dateEnv)),
                            (i.initialNowQueriedMs = new Date().valueOf()),
                            (i.state = i.computeTiming().currentState),
                            i
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var i = this.state;
                            return this.props.children(i.nowDate, i.todayRange);
                        }),
                        (e.prototype.componentDidMount = function () {
                            this.setTimeout();
                        }),
                        (e.prototype.componentDidUpdate = function (n) {
                            n.unit !== this.props.unit &&
                                (this.clearTimeout(), this.setTimeout());
                        }),
                        (e.prototype.componentWillUnmount = function () {
                            this.clearTimeout();
                        }),
                        (e.prototype.computeTiming = function () {
                            var r = this.props,
                                i = this.context,
                                o = De(
                                    this.initialNowDate,
                                    new Date().valueOf() -
                                        this.initialNowQueriedMs
                                ),
                                a = i.dateEnv.startOf(o, r.unit),
                                s = i.dateEnv.add(a, M(1, r.unit)),
                                l = s.valueOf() - o.valueOf();
                            return (
                                (l = Math.min(864e5, l)),
                                {
                                    currentState: {
                                        nowDate: a,
                                        todayRange: Io(a),
                                    },
                                    nextState: {
                                        nowDate: s,
                                        todayRange: Io(s),
                                    },
                                    waitMs: l,
                                }
                            );
                        }),
                        (e.prototype.setTimeout = function () {
                            var n = this,
                                r = this.computeTiming(),
                                i = r.nextState;
                            this.timeoutId = setTimeout(function () {
                                n.setState(i, function () {
                                    n.setTimeout();
                                });
                            }, r.waitMs);
                        }),
                        (e.prototype.clearTimeout = function () {
                            this.timeoutId && clearTimeout(this.timeoutId);
                        }),
                        (e.contextType = le),
                        e
                    );
                })(en);
            function Io(t) {
                var e = H(t);
                return { start: e, end: G(e, 1) };
            }
            var No = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (n.createDayHeaderFormatter = x(nf)), n;
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.render = function () {
                        var r = this.props,
                            i = r.dates,
                            o = r.dateProfile,
                            a = r.datesRepDistinctDays,
                            s = r.renderIntro,
                            l = this.createDayHeaderFormatter(
                                this.context.options.dayHeaderFormat,
                                a,
                                i.length
                            );
                        return h(zt, { unit: 'day' }, function (c, d) {
                            return h(
                                'tr',
                                { role: 'row' },
                                s && s('day'),
                                i.map(function (f) {
                                    return a
                                        ? h($d, {
                                              key: f.toISOString(),
                                              date: f,
                                              dateProfile: o,
                                              todayRange: d,
                                              colCnt: i.length,
                                              dayHeaderFormat: l,
                                          })
                                        : h(tf, {
                                              key: f.getUTCDay(),
                                              dow: f.getUTCDay(),
                                              dayHeaderFormat: l,
                                          });
                                })
                            );
                        });
                    }),
                    e
                );
            })(I);
            function nf(t, e, n) {
                return (
                    t ||
                    (function Kd(t, e) {
                        return O(
                            !t || e > 10
                                ? { weekday: 'short' }
                                : e > 1
                                ? {
                                      weekday: 'short',
                                      month: 'numeric',
                                      day: 'numeric',
                                      omitCommas: !0,
                                  }
                                : { weekday: 'long' }
                        );
                    })(e, n)
                );
            }
            var Po = (function () {
                    function t(e, n) {
                        for (
                            var r = e.start, i = e.end, o = [], a = [], s = -1;
                            r < i;

                        )
                            n.isHiddenDay(r)
                                ? o.push(s + 0.5)
                                : (o.push((s += 1)), a.push(r)),
                                (r = G(r, 1));
                        (this.dates = a),
                            (this.indices = o),
                            (this.cnt = a.length);
                    }
                    return (
                        (t.prototype.sliceRange = function (e) {
                            var n = this.getDateDayIndex(e.start),
                                r = this.getDateDayIndex(G(e.end, -1)),
                                i = Math.max(0, n),
                                o = Math.min(this.cnt - 1, r);
                            return (i = Math.ceil(i)) <= (o = Math.floor(o))
                                ? {
                                      firstIndex: i,
                                      lastIndex: o,
                                      isStart: n === i,
                                      isEnd: r === o,
                                  }
                                : null;
                        }),
                        (t.prototype.getDateDayIndex = function (e) {
                            var n = this.indices,
                                r = Math.floor(he(this.dates[0], e));
                            return r < 0
                                ? n[0] - 1
                                : r >= n.length
                                ? n[n.length - 1] + 1
                                : n[r];
                        }),
                        t
                    );
                })(),
                Bo = (function () {
                    function t(e, n) {
                        var i,
                            o,
                            a,
                            r = e.dates;
                        if (n) {
                            for (
                                o = r[0].getUTCDay(), i = 1;
                                i < r.length && r[i].getUTCDay() !== o;
                                i += 1
                            );
                            a = Math.ceil(r.length / i);
                        } else (a = 1), (i = r.length);
                        (this.rowCnt = a),
                            (this.colCnt = i),
                            (this.daySeries = e),
                            (this.cells = this.buildCells()),
                            (this.headerDates = this.buildHeaderDates());
                    }
                    return (
                        (t.prototype.buildCells = function () {
                            for (var e = [], n = 0; n < this.rowCnt; n += 1) {
                                for (var r = [], i = 0; i < this.colCnt; i += 1)
                                    r.push(this.buildCell(n, i));
                                e.push(r);
                            }
                            return e;
                        }),
                        (t.prototype.buildCell = function (e, n) {
                            var r = this.daySeries.dates[e * this.colCnt + n];
                            return { key: r.toISOString(), date: r };
                        }),
                        (t.prototype.buildHeaderDates = function () {
                            for (var e = [], n = 0; n < this.colCnt; n += 1)
                                e.push(this.cells[0][n].date);
                            return e;
                        }),
                        (t.prototype.sliceRange = function (e) {
                            var n = this.colCnt,
                                r = this.daySeries.sliceRange(e),
                                i = [];
                            if (r)
                                for (
                                    var o = r.firstIndex,
                                        a = r.lastIndex,
                                        s = o;
                                    s <= a;

                                ) {
                                    var l = Math.floor(s / n),
                                        c = Math.min((l + 1) * n, a + 1);
                                    i.push({
                                        row: l,
                                        firstCol: s % n,
                                        lastCol: (c - 1) % n,
                                        isStart: r.isStart && s === o,
                                        isEnd: r.isEnd && c - 1 === a,
                                    }),
                                        (s = c);
                                }
                            return i;
                        }),
                        t
                    );
                })(),
                Ho = (function () {
                    function t() {
                        (this.sliceBusinessHours = x(this._sliceBusinessHours)),
                            (this.sliceDateSelection = x(this._sliceDateSpan)),
                            (this.sliceEventStore = x(this._sliceEventStore)),
                            (this.sliceEventDrag = x(this._sliceInteraction)),
                            (this.sliceEventResize = x(this._sliceInteraction)),
                            (this.forceDayIfListItem = !1);
                    }
                    return (
                        (t.prototype.sliceProps = function (e, n, r, i) {
                            for (var o = [], a = 4; a < arguments.length; a++)
                                o[a - 4] = arguments[a];
                            var s = e.eventUiBases,
                                l = this.sliceEventStore.apply(
                                    this,
                                    (0, u.ev)([e.eventStore, s, n, r], o)
                                );
                            return {
                                dateSelectionSegs:
                                    this.sliceDateSelection.apply(
                                        this,
                                        (0, u.ev)([e.dateSelection, s, i], o)
                                    ),
                                businessHourSegs: this.sliceBusinessHours.apply(
                                    this,
                                    (0, u.ev)([e.businessHours, n, r, i], o)
                                ),
                                fgEventSegs: l.fg,
                                bgEventSegs: l.bg,
                                eventDrag: this.sliceEventDrag.apply(
                                    this,
                                    (0, u.ev)([e.eventDrag, s, n, r], o)
                                ),
                                eventResize: this.sliceEventResize.apply(
                                    this,
                                    (0, u.ev)([e.eventResize, s, n, r], o)
                                ),
                                eventSelection: e.eventSelection,
                            };
                        }),
                        (t.prototype.sliceNowDate = function (e, n) {
                            for (var r = [], i = 2; i < arguments.length; i++)
                                r[i - 2] = arguments[i];
                            return this._sliceDateSpan.apply(
                                this,
                                (0, u.ev)(
                                    [
                                        {
                                            range: { start: e, end: De(e, 1) },
                                            allDay: !1,
                                        },
                                        {},
                                        n,
                                    ],
                                    r
                                )
                            );
                        }),
                        (t.prototype._sliceBusinessHours = function (
                            e,
                            n,
                            r,
                            i
                        ) {
                            for (var o = [], a = 4; a < arguments.length; a++)
                                o[a - 4] = arguments[a];
                            return e
                                ? this._sliceEventStore.apply(
                                      this,
                                      (0, u.ev)(
                                          [
                                              Ne(e, Wn(n, Boolean(r)), i),
                                              {},
                                              n,
                                              r,
                                          ],
                                          o
                                      )
                                  ).bg
                                : [];
                        }),
                        (t.prototype._sliceEventStore = function (e, n, r, i) {
                            for (var o = [], a = 4; a < arguments.length; a++)
                                o[a - 4] = arguments[a];
                            if (e) {
                                var s = An(e, n, Wn(r, Boolean(i)), i);
                                return {
                                    bg: this.sliceEventRanges(s.bg, o),
                                    fg: this.sliceEventRanges(s.fg, o),
                                };
                            }
                            return { bg: [], fg: [] };
                        }),
                        (t.prototype._sliceInteraction = function (e, n, r, i) {
                            for (var o = [], a = 4; a < arguments.length; a++)
                                o[a - 4] = arguments[a];
                            if (!e) return null;
                            var s = An(
                                e.mutatedEvents,
                                n,
                                Wn(r, Boolean(i)),
                                i
                            );
                            return {
                                segs: this.sliceEventRanges(s.fg, o),
                                affectedInstances: e.affectedEvents.instances,
                                isEvent: e.isEvent,
                            };
                        }),
                        (t.prototype._sliceDateSpan = function (e, n, r) {
                            for (var i = [], o = 3; o < arguments.length; o++)
                                i[o - 3] = arguments[o];
                            if (!e) return [];
                            for (
                                var a = Ol(e, n, r),
                                    s = this.sliceRange.apply(
                                        this,
                                        (0, u.ev)([e.range], i)
                                    ),
                                    l = 0,
                                    c = s;
                                l < c.length;
                                l++
                            ) {
                                var d = c[l];
                                d.eventRange = a;
                            }
                            return s;
                        }),
                        (t.prototype.sliceEventRanges = function (e, n) {
                            for (var r = [], i = 0, o = e; i < o.length; i++)
                                r.push.apply(r, this.sliceEventRange(o[i], n));
                            return r;
                        }),
                        (t.prototype.sliceEventRange = function (e, n) {
                            var r = e.range;
                            this.forceDayIfListItem &&
                                'list-item' === e.ui.display &&
                                (r = { start: r.start, end: G(r.start, 1) });
                            for (
                                var i = this.sliceRange.apply(
                                        this,
                                        (0, u.ev)([r], n)
                                    ),
                                    o = 0,
                                    a = i;
                                o < a.length;
                                o++
                            ) {
                                var s = a[o];
                                (s.eventRange = e),
                                    (s.isStart = e.isStart && s.isStart),
                                    (s.isEnd = e.isEnd && s.isEnd);
                            }
                            return i;
                        }),
                        t
                    );
                })();
            function Wn(t, e) {
                var n = t.activeRange;
                return e
                    ? n
                    : {
                          start: De(n.start, t.slotMinTime.milliseconds),
                          end: De(n.end, t.slotMaxTime.milliseconds - 864e5),
                      };
            }
            function Vn(t, e, n) {
                var r = t.mutatedEvents.instances;
                for (var i in r) if (!Mt(e.validRange, r[i].range)) return !1;
                return Oo({ eventDrag: t }, n);
            }
            function Oo(t, e) {
                var n = e.getCurrentData(),
                    r = (0, u.pi)(
                        {
                            businessHours: n.businessHours,
                            dateSelection: '',
                            eventStore: n.eventStore,
                            eventUiBases: n.eventUiBases,
                            eventSelection: '',
                            eventDrag: null,
                            eventResize: null,
                        },
                        t
                    );
                return (e.pluginHooks.isPropsValid || of)(r, e);
            }
            function of(t, e, n, r) {
                return (
                    void 0 === n && (n = {}),
                    !(
                        (t.eventDrag &&
                            !(function af(t, e, n, r) {
                                var i = e.getCurrentData(),
                                    o = t.eventDrag,
                                    a = o.mutatedEvents,
                                    s = a.defs,
                                    l = a.instances,
                                    c = It(
                                        s,
                                        o.isEvent
                                            ? t.eventUiBases
                                            : { '': i.selectionConfig }
                                    );
                                r && (c = oe(c, r));
                                var d = (function rd(t, e) {
                                        return {
                                            defs: t.defs,
                                            instances: Ce(
                                                t.instances,
                                                function (n) {
                                                    return !e[n.instanceId];
                                                }
                                            ),
                                        };
                                    })(
                                        t.eventStore,
                                        o.affectedEvents.instances
                                    ),
                                    f = d.defs,
                                    p = d.instances,
                                    v = It(f, t.eventUiBases);
                                for (var g in l) {
                                    var b = l[g],
                                        E = b.range,
                                        m = c[b.defId],
                                        w = s[b.defId];
                                    if (
                                        !zo(
                                            m.constraints,
                                            E,
                                            d,
                                            t.businessHours,
                                            e
                                        )
                                    )
                                        return !1;
                                    var C = e.options.eventOverlap,
                                        D = 'function' == typeof C ? C : null;
                                    for (var _ in p) {
                                        var k = p[_];
                                        if (
                                            bn(E, k.range) &&
                                            ((!1 === v[k.defId].overlap &&
                                                o.isEvent) ||
                                                !1 === m.overlap ||
                                                (D &&
                                                    !D(
                                                        new z(e, f[k.defId], k),
                                                        new z(e, w, b)
                                                    )))
                                        )
                                            return !1;
                                    }
                                    for (
                                        var T = i.eventStore,
                                            F = 0,
                                            B = m.allows;
                                        F < B.length;
                                        F++
                                    ) {
                                        var at,
                                            q = B[F],
                                            Z = (0, u.pi)((0, u.pi)({}, n), {
                                                range: b.range,
                                                allDay: w.allDay,
                                            }),
                                            Qe = T.defs[w.defId];
                                        if (
                                            ((at = Qe
                                                ? new z(e, Qe, T.instances[g])
                                                : new z(e, w)),
                                            !q(En(Z, e), at))
                                        )
                                            return !1;
                                    }
                                }
                                return !0;
                            })(t, e, n, r)) ||
                        (t.dateSelection &&
                            !(function sf(t, e, n, r) {
                                var i = t.eventStore,
                                    o = i.defs,
                                    a = i.instances,
                                    s = t.dateSelection,
                                    l = s.range,
                                    c = e.getCurrentData().selectionConfig;
                                if (
                                    (r && (c = r(c)),
                                    !zo(
                                        c.constraints,
                                        l,
                                        i,
                                        t.businessHours,
                                        e
                                    ))
                                )
                                    return !1;
                                var d = e.options.selectOverlap,
                                    f = 'function' == typeof d ? d : null;
                                for (var p in a) {
                                    var v = a[p];
                                    if (
                                        bn(l, v.range) &&
                                        (!1 === c.overlap ||
                                            (f &&
                                                !f(
                                                    new z(e, o[v.defId], v),
                                                    null
                                                )))
                                    )
                                        return !1;
                                }
                                for (var g = 0, b = c.allows; g < b.length; g++)
                                    if (
                                        !(0, b[g])(
                                            En(
                                                (0, u.pi)((0, u.pi)({}, n), s),
                                                e
                                            ),
                                            null
                                        )
                                    )
                                        return !1;
                                return !0;
                            })(t, e, n, r))
                    )
                );
            }
            function zo(t, e, n, r, i) {
                for (var o = 0, a = t; o < a.length; o++)
                    if (!cf(lf(a[o], e, n, r, i), e)) return !1;
                return !0;
            }
            function lf(t, e, n, r, i) {
                return 'businessHours' === t
                    ? Gn(Ne(r, e, i))
                    : 'string' == typeof t
                    ? Gn(
                          xt(n, function (o) {
                              return o.groupId === t;
                          })
                      )
                    : 'object' == typeof t && t
                    ? Gn(Ne(t, e, i))
                    : [];
            }
            function Gn(t) {
                var e = t.instances,
                    n = [];
                for (var r in e) n.push(e[r].range);
                return n;
            }
            function cf(t, e) {
                for (var n = 0, r = t; n < r.length; n++)
                    if (Mt(r[n], e)) return !0;
                return !1;
            }
            var Ft = /^(visible|hidden)$/,
                df = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.handleEl = function (r) {
                                (n.el = r), $(n.props.elRef, r);
                            }),
                            n
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this.props,
                                r = n.liquid,
                                i = n.liquidIsAbsolute,
                                o = r && i,
                                a = ['fc-scroller'];
                            return (
                                r &&
                                    a.push(
                                        i
                                            ? 'fc-scroller-liquid-absolute'
                                            : 'fc-scroller-liquid'
                                    ),
                                h(
                                    'div',
                                    {
                                        ref: this.handleEl,
                                        className: a.join(' '),
                                        style: {
                                            overflowX: n.overflowX,
                                            overflowY: n.overflowY,
                                            left:
                                                (o && -(n.overcomeLeft || 0)) ||
                                                '',
                                            right:
                                                (o &&
                                                    -(n.overcomeRight || 0)) ||
                                                '',
                                            bottom:
                                                (o &&
                                                    -(n.overcomeBottom || 0)) ||
                                                '',
                                            marginLeft:
                                                (!o &&
                                                    -(n.overcomeLeft || 0)) ||
                                                '',
                                            marginRight:
                                                (!o &&
                                                    -(n.overcomeRight || 0)) ||
                                                '',
                                            marginBottom:
                                                (!o &&
                                                    -(n.overcomeBottom || 0)) ||
                                                '',
                                            maxHeight: n.maxHeight || '',
                                        },
                                    },
                                    n.children
                                )
                            );
                        }),
                        (e.prototype.needsXScrolling = function () {
                            if (Ft.test(this.props.overflowX)) return !1;
                            for (
                                var n = this.el,
                                    r =
                                        this.el.getBoundingClientRect().width -
                                        this.getYScrollbarWidth(),
                                    i = n.children,
                                    o = 0;
                                o < i.length;
                                o += 1
                            )
                                if (i[o].getBoundingClientRect().width > r)
                                    return !0;
                            return !1;
                        }),
                        (e.prototype.needsYScrolling = function () {
                            if (Ft.test(this.props.overflowY)) return !1;
                            for (
                                var n = this.el,
                                    r =
                                        this.el.getBoundingClientRect().height -
                                        this.getXScrollbarWidth(),
                                    i = n.children,
                                    o = 0;
                                o < i.length;
                                o += 1
                            )
                                if (i[o].getBoundingClientRect().height > r)
                                    return !0;
                            return !1;
                        }),
                        (e.prototype.getXScrollbarWidth = function () {
                            return Ft.test(this.props.overflowX)
                                ? 0
                                : this.el.offsetHeight - this.el.clientHeight;
                        }),
                        (e.prototype.getYScrollbarWidth = function () {
                            return Ft.test(this.props.overflowY)
                                ? 0
                                : this.el.offsetWidth - this.el.clientWidth;
                        }),
                        e
                    );
                })(I),
                fe = (function () {
                    function t(e) {
                        var n = this;
                        (this.masterCallback = e),
                            (this.currentMap = {}),
                            (this.depths = {}),
                            (this.callbackMap = {}),
                            (this.handleValue = function (r, i) {
                                var a = n.depths,
                                    s = n.currentMap,
                                    l = !1,
                                    c = !1;
                                null !== r
                                    ? ((l = i in s),
                                      (s[i] = r),
                                      (a[i] = (a[i] || 0) + 1),
                                      (c = !0))
                                    : ((a[i] -= 1),
                                      a[i] ||
                                          (delete s[i],
                                          delete n.callbackMap[i],
                                          (l = !0))),
                                    n.masterCallback &&
                                        (l && n.masterCallback(null, String(i)),
                                        c && n.masterCallback(r, String(i)));
                            });
                    }
                    return (
                        (t.prototype.createRef = function (e) {
                            var n = this,
                                r = this.callbackMap[e];
                            return (
                                r ||
                                    (r = this.callbackMap[e] =
                                        function (i) {
                                            n.handleValue(i, String(e));
                                        }),
                                r
                            );
                        }),
                        (t.prototype.collect = function (e, n, r) {
                            return (function Us(t, e, n, r) {
                                void 0 === e && (e = 0),
                                    void 0 === r && (r = 1);
                                var i = [];
                                null == n && (n = Object.keys(t).length);
                                for (var o = e; o < n; o += r) {
                                    var a = t[o];
                                    void 0 !== a && i.push(a);
                                }
                                return i;
                            })(this.currentMap, e, n, r);
                        }),
                        (t.prototype.getAll = function () {
                            return an(this.currentMap);
                        }),
                        t
                    );
                })();
            function Fo(t, e) {
                return t.liquid && e.liquid;
            }
            function vf(t, e) {
                return ye(t, e, ae);
            }
            function hf(t, e) {
                for (var n = [], r = 0, i = t; r < i.length; r++)
                    for (var o = i[r], a = o.span || 1, s = 0; s < a; s += 1)
                        n.push(
                            h('col', {
                                style: {
                                    width:
                                        'shrink' === o.width
                                            ? gf(e)
                                            : o.width || '',
                                    minWidth: o.minWidth || '',
                                },
                            })
                        );
                return h.apply(void 0, (0, u.ev)(['colgroup', {}], n));
            }
            function gf(t) {
                return null == t ? 4 : t;
            }
            function bf(t, e) {
                var n = [
                    'fc-scrollgrid-section',
                    'fc-scrollgrid-section-' + t.type,
                    t.className,
                ];
                return (
                    e &&
                        t.liquid &&
                        null == t.maxHeight &&
                        n.push('fc-scrollgrid-section-liquid'),
                    t.isSticky && n.push('fc-scrollgrid-section-sticky'),
                    n
                );
            }
            function Zn(t) {
                return h('div', {
                    className: 'fc-scrollgrid-sticky-shim',
                    style: { width: t.clientWidth, minWidth: t.tableMinWidth },
                });
            }
            function Ut(t) {
                var e = t.stickyHeaderDates;
                return (
                    (null == e || 'auto' === e) &&
                        (e = 'auto' === t.height || 'auto' === t.viewHeight),
                    e
                );
            }
            function Uo(t) {
                var e = t.stickyFooterScrollbar;
                return (
                    (null == e || 'auto' === e) &&
                        (e = 'auto' === t.height || 'auto' === t.viewHeight),
                    e
                );
            }
            var jn = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (
                        (n.processCols = x(function (r) {
                            return r;
                        }, vf)),
                        (n.renderMicroColGroup = x(hf)),
                        (n.scrollerRefs = new fe()),
                        (n.scrollerElRefs = new fe(
                            n._handleScrollerEl.bind(n)
                        )),
                        (n.state = {
                            shrinkWidth: null,
                            forceYScrollbars: !1,
                            scrollerClientWidths: {},
                            scrollerClientHeights: {},
                        }),
                        (n.handleSizing = function () {
                            n.setState(
                                (0, u.pi)(
                                    { shrinkWidth: n.computeShrinkWidth() },
                                    n.computeScrollerDims()
                                )
                            );
                        }),
                        n
                    );
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.render = function () {
                        var n = this,
                            r = n.props,
                            i = n.state,
                            o = n.context,
                            a = r.sections || [],
                            s = this.processCols(r.cols),
                            l = this.renderMicroColGroup(s, i.shrinkWidth),
                            c = (function yf(t, e) {
                                var n = [
                                    'fc-scrollgrid',
                                    e.theme.getClass('table'),
                                ];
                                return t && n.push('fc-scrollgrid-liquid'), n;
                            })(r.liquid, o);
                        r.collapsibleWidth &&
                            c.push('fc-scrollgrid-collapsible');
                        for (
                            var p, d = a.length, f = 0, v = [], g = [], b = [];
                            f < d && 'header' === (p = a[f]).type;

                        )
                            v.push(this.renderSection(p, l, !0)), (f += 1);
                        for (; f < d && 'body' === (p = a[f]).type; )
                            g.push(this.renderSection(p, l, !1)), (f += 1);
                        for (; f < d && 'footer' === (p = a[f]).type; )
                            b.push(this.renderSection(p, l, !0)), (f += 1);
                        var E = !to(),
                            m = { role: 'rowgroup' };
                        return h(
                            'table',
                            {
                                role: 'grid',
                                className: c.join(' '),
                                style: { height: r.height },
                            },
                            Boolean(!E && v.length) &&
                                h.apply(void 0, (0, u.ev)(['thead', m], v)),
                            Boolean(!E && g.length) &&
                                h.apply(void 0, (0, u.ev)(['tbody', m], g)),
                            Boolean(!E && b.length) &&
                                h.apply(void 0, (0, u.ev)(['tfoot', m], b)),
                            E &&
                                h.apply(
                                    void 0,
                                    (0, u.ev)(
                                        (0, u.ev)(
                                            (0, u.ev)(['tbody', m], v),
                                            g
                                        ),
                                        b
                                    )
                                )
                        );
                    }),
                    (e.prototype.renderSection = function (n, r, i) {
                        return 'outerContent' in n
                            ? h(L, { key: n.key }, n.outerContent)
                            : h(
                                  'tr',
                                  {
                                      key: n.key,
                                      role: 'presentation',
                                      className: bf(n, this.props.liquid).join(
                                          ' '
                                      ),
                                  },
                                  this.renderChunkTd(n, r, n.chunk, i)
                              );
                    }),
                    (e.prototype.renderChunkTd = function (n, r, i, o) {
                        if ('outerContent' in i) return i.outerContent;
                        var a = this.props,
                            s = this.state,
                            l = s.forceYScrollbars,
                            c = s.scrollerClientWidths,
                            d = s.scrollerClientHeights,
                            f = (function uf(t, e) {
                                return null != e.maxHeight || Fo(t, e);
                            })(a, n),
                            p = Fo(a, n),
                            v = a.liquid
                                ? l
                                    ? 'scroll'
                                    : f
                                    ? 'auto'
                                    : 'hidden'
                                : 'visible',
                            g = n.key,
                            b = (function pf(t, e, n, r) {
                                var i = n.expandRows;
                                return 'function' == typeof e.content
                                    ? e.content(n)
                                    : h(
                                          'table',
                                          {
                                              role: 'presentation',
                                              className: [
                                                  e.tableClassName,
                                                  t.syncRowHeights
                                                      ? 'fc-scrollgrid-sync-table'
                                                      : '',
                                              ].join(' '),
                                              style: {
                                                  minWidth: n.tableMinWidth,
                                                  width: n.clientWidth,
                                                  height: i
                                                      ? n.clientHeight
                                                      : '',
                                              },
                                          },
                                          n.tableColGroupNode,
                                          h(
                                              r ? 'thead' : 'tbody',
                                              { role: 'presentation' },
                                              'function' == typeof e.rowContent
                                                  ? e.rowContent(n)
                                                  : e.rowContent
                                          )
                                      );
                            })(
                                n,
                                i,
                                {
                                    tableColGroupNode: r,
                                    tableMinWidth: '',
                                    clientWidth:
                                        a.collapsibleWidth || void 0 === c[g]
                                            ? null
                                            : c[g],
                                    clientHeight: void 0 !== d[g] ? d[g] : null,
                                    expandRows: n.expandRows,
                                    syncRowHeights: !1,
                                    rowSyncHeights: [],
                                    reportRowHeightChange: function () {},
                                },
                                o
                            );
                        return h(
                            o ? 'th' : 'td',
                            { ref: i.elRef, role: 'presentation' },
                            h(
                                'div',
                                {
                                    className:
                                        'fc-scroller-harness' +
                                        (p
                                            ? ' fc-scroller-harness-liquid'
                                            : ''),
                                },
                                h(
                                    df,
                                    {
                                        ref: this.scrollerRefs.createRef(g),
                                        elRef: this.scrollerElRefs.createRef(g),
                                        overflowY: v,
                                        overflowX: a.liquid
                                            ? 'hidden'
                                            : 'visible',
                                        maxHeight: n.maxHeight,
                                        liquid: p,
                                        liquidIsAbsolute: !0,
                                    },
                                    b
                                )
                            )
                        );
                    }),
                    (e.prototype._handleScrollerEl = function (n, r) {
                        var i = (function Af(t, e) {
                            for (var n = 0, r = t; n < r.length; n++) {
                                var i = r[n];
                                if (i.key === e) return i;
                            }
                            return null;
                        })(this.props.sections, r);
                        i && $(i.chunk.scrollerElRef, n);
                    }),
                    (e.prototype.componentDidMount = function () {
                        this.handleSizing(),
                            this.context.addResizeHandler(this.handleSizing);
                    }),
                    (e.prototype.componentDidUpdate = function () {
                        this.handleSizing();
                    }),
                    (e.prototype.componentWillUnmount = function () {
                        this.context.removeResizeHandler(this.handleSizing);
                    }),
                    (e.prototype.computeShrinkWidth = function () {
                        return (function mf(t) {
                            for (var e = 0, n = t; e < n.length; e++)
                                if ('shrink' === n[e].width) return !0;
                            return !1;
                        })(this.props.cols)
                            ? (function ff(t) {
                                  for (
                                      var e = (function ps(t, e) {
                                              for (
                                                  var n =
                                                          t instanceof
                                                          HTMLElement
                                                              ? [t]
                                                              : t,
                                                      r = [],
                                                      i = 0;
                                                  i < n.length;
                                                  i += 1
                                              )
                                                  for (
                                                      var o =
                                                              n[
                                                                  i
                                                              ].querySelectorAll(
                                                                  e
                                                              ),
                                                          a = 0;
                                                      a < o.length;
                                                      a += 1
                                                  )
                                                      r.push(o[a]);
                                              return r;
                                          })(t, '.fc-scrollgrid-shrink'),
                                          n = 0,
                                          r = 0,
                                          i = e;
                                      r < i.length;
                                      r++
                                  )
                                      n = Math.max(n, Ts(i[r]));
                                  return Math.ceil(n);
                              })(this.scrollerElRefs.getAll())
                            : 0;
                    }),
                    (e.prototype.computeScrollerDims = function () {
                        var n = (function hc() {
                                return (
                                    kn ||
                                        (kn = (function gc() {
                                            var t =
                                                document.createElement('div');
                                            (t.style.overflow = 'scroll'),
                                                (t.style.position = 'absolute'),
                                                (t.style.top = '-9999px'),
                                                (t.style.left = '-9999px'),
                                                document.body.appendChild(t);
                                            var e = ro(t);
                                            return (
                                                document.body.removeChild(t), e
                                            );
                                        })()),
                                    kn
                                );
                            })(),
                            i = this.scrollerRefs,
                            o = this.scrollerElRefs,
                            a = !1,
                            s = {},
                            l = {};
                        for (var c in i.currentMap) {
                            var d = i.currentMap[c];
                            if (d && d.needsYScrolling()) {
                                a = !0;
                                break;
                            }
                        }
                        for (
                            var f = 0, p = this.props.sections;
                            f < p.length;
                            f++
                        ) {
                            var g = o.currentMap[(c = p[f].key)];
                            if (g) {
                                var b = g.parentNode;
                                (s[c] = Math.floor(
                                    b.getBoundingClientRect().width -
                                        (a ? n.y : 0)
                                )),
                                    (l[c] = Math.floor(
                                        b.getBoundingClientRect().height
                                    ));
                            }
                        }
                        return {
                            forceYScrollbars: a,
                            scrollerClientWidths: s,
                            scrollerClientHeights: l,
                        };
                    }),
                    e
                );
            })(I);
            jn.addStateEquality({
                scrollerClientWidths: ae,
                scrollerClientHeights: ae,
            });
            var Yn = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (n.elRef = U()), n;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var r = this.props,
                                i = this.context,
                                o = i.options,
                                a = r.seg,
                                s = a.eventRange,
                                l = s.ui,
                                c = {
                                    event: new z(i, s.def, s.instance),
                                    view: i.viewApi,
                                    timeText: r.timeText,
                                    textColor: l.textColor,
                                    backgroundColor: l.backgroundColor,
                                    borderColor: l.borderColor,
                                    isDraggable: !r.disableDragging && Tl(a, i),
                                    isStartResizable:
                                        !r.disableResizing && Rl(a, i),
                                    isEndResizable: !r.disableResizing && kl(a),
                                    isMirror: Boolean(
                                        r.isDragging ||
                                            r.isResizing ||
                                            r.isDateSelecting
                                    ),
                                    isStart: Boolean(a.isStart),
                                    isEnd: Boolean(a.isEnd),
                                    isPast: Boolean(r.isPast),
                                    isFuture: Boolean(r.isFuture),
                                    isToday: Boolean(r.isToday),
                                    isSelected: Boolean(r.isSelected),
                                    isDragging: Boolean(r.isDragging),
                                    isResizing: Boolean(r.isResizing),
                                },
                                d = (function _l(t) {
                                    var e = ['fc-event'];
                                    return (
                                        t.isMirror && e.push('fc-event-mirror'),
                                        t.isDraggable &&
                                            e.push('fc-event-draggable'),
                                        (t.isStartResizable ||
                                            t.isEndResizable) &&
                                            e.push('fc-event-resizable'),
                                        t.isDragging &&
                                            e.push('fc-event-dragging'),
                                        t.isResizing &&
                                            e.push('fc-event-resizing'),
                                        t.isSelected &&
                                            e.push('fc-event-selected'),
                                        t.isStart && e.push('fc-event-start'),
                                        t.isEnd && e.push('fc-event-end'),
                                        t.isPast && e.push('fc-event-past'),
                                        t.isToday && e.push('fc-event-today'),
                                        t.isFuture && e.push('fc-event-future'),
                                        e
                                    );
                                })(c).concat(l.classNames);
                            return h(
                                te,
                                {
                                    hookProps: c,
                                    classNames: o.eventClassNames,
                                    content: o.eventContent,
                                    defaultContent: r.defaultContent,
                                    didMount: o.eventDidMount,
                                    willUnmount: o.eventWillUnmount,
                                    elRef: this.elRef,
                                },
                                function (f, p, v, g) {
                                    return r.children(f, d.concat(p), v, g, c);
                                }
                            );
                        }),
                        (e.prototype.componentDidMount = function () {
                            Bi(this.elRef.current, this.props.seg);
                        }),
                        (e.prototype.componentDidUpdate = function (n) {
                            var r = this.props.seg;
                            r !== n.seg && Bi(this.elRef.current, r);
                        }),
                        e
                    );
                })(I),
                Lo = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var r = this.props,
                                i = this.context,
                                o = r.seg,
                                s = zi(
                                    o,
                                    i.options.eventTimeFormat ||
                                        r.defaultTimeFormat,
                                    i,
                                    r.defaultDisplayEventTime,
                                    r.defaultDisplayEventEnd
                                );
                            return h(
                                Yn,
                                {
                                    seg: o,
                                    timeText: s,
                                    disableDragging: r.disableDragging,
                                    disableResizing: r.disableResizing,
                                    defaultContent: r.defaultContent || Ef,
                                    isDragging: r.isDragging,
                                    isResizing: r.isResizing,
                                    isDateSelecting: r.isDateSelecting,
                                    isSelected: r.isSelected,
                                    isPast: r.isPast,
                                    isFuture: r.isFuture,
                                    isToday: r.isToday,
                                },
                                function (l, c, d, f, p) {
                                    return h(
                                        'a',
                                        (0, u.pi)(
                                            {
                                                className: r.extraClassNames
                                                    .concat(c)
                                                    .join(' '),
                                                style: {
                                                    borderColor: p.borderColor,
                                                    backgroundColor:
                                                        p.backgroundColor,
                                                },
                                                ref: l,
                                            },
                                            Ui(o, i)
                                        ),
                                        h(
                                            'div',
                                            {
                                                className: 'fc-event-main',
                                                ref: d,
                                                style: { color: p.textColor },
                                            },
                                            f
                                        ),
                                        p.isStartResizable &&
                                            h('div', {
                                                className:
                                                    'fc-event-resizer fc-event-resizer-start',
                                            }),
                                        p.isEndResizable &&
                                            h('div', {
                                                className:
                                                    'fc-event-resizer fc-event-resizer-end',
                                            })
                                    );
                                }
                            );
                        }),
                        e
                    );
                })(I);
            function Ef(t) {
                return h(
                    'div',
                    { className: 'fc-event-main-frame' },
                    t.timeText &&
                        h('div', { className: 'fc-event-time' }, t.timeText),
                    h(
                        'div',
                        { className: 'fc-event-title-container' },
                        h(
                            'div',
                            { className: 'fc-event-title fc-sticky' },
                            t.event.title || h(L, null, '\xa0')
                        )
                    )
                );
            }
            var qn = function (t) {
                    return h(le.Consumer, null, function (e) {
                        var n = e.options,
                            r = {
                                isAxis: t.isAxis,
                                date: e.dateEnv.toDate(t.date),
                                view: e.viewApi,
                            };
                        return h(
                            te,
                            {
                                hookProps: r,
                                classNames: n.nowIndicatorClassNames,
                                content: n.nowIndicatorContent,
                                didMount: n.nowIndicatorDidMount,
                                willUnmount: n.nowIndicatorWillUnmount,
                            },
                            t.children
                        );
                    });
                },
                wf = O({ day: 'numeric' }),
                Jn = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var r = this.props,
                                i = this.context,
                                o = i.options,
                                a = Qo({
                                    date: r.date,
                                    dateProfile: r.dateProfile,
                                    todayRange: r.todayRange,
                                    showDayNumber: r.showDayNumber,
                                    extraProps: r.extraHookProps,
                                    viewApi: i.viewApi,
                                    dateEnv: i.dateEnv,
                                });
                            return h(
                                ao,
                                {
                                    hookProps: a,
                                    content: o.dayCellContent,
                                    defaultContent: r.defaultContent,
                                },
                                r.children
                            );
                        }),
                        e
                    );
                })(I);
            function Qo(t) {
                var e = t.date,
                    n = t.dateEnv,
                    r = no(e, t.todayRange, null, t.dateProfile);
                return (0, u.pi)(
                    (0, u.pi)(
                        (0, u.pi)({ date: n.toDate(e), view: t.viewApi }, r),
                        {
                            dayNumberText: t.showDayNumber
                                ? n.format(e, wf)
                                : '',
                        }
                    ),
                    t.extraProps
                );
            }
            var Xn = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (
                        (n.refineHookProps = At(Qo)),
                        (n.normalizeClassNames = so()),
                        n
                    );
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.render = function () {
                        var r = this.props,
                            i = this.context,
                            o = i.options,
                            a = this.refineHookProps({
                                date: r.date,
                                dateProfile: r.dateProfile,
                                todayRange: r.todayRange,
                                showDayNumber: r.showDayNumber,
                                extraProps: r.extraHookProps,
                                viewApi: i.viewApi,
                                dateEnv: i.dateEnv,
                            }),
                            s = Tn(a, i.theme).concat(
                                a.isDisabled
                                    ? []
                                    : this.normalizeClassNames(
                                          o.dayCellClassNames,
                                          a
                                      )
                            ),
                            l = a.isDisabled ? {} : { 'data-date': Di(r.date) };
                        return h(
                            Nn,
                            {
                                hookProps: a,
                                didMount: o.dayCellDidMount,
                                willUnmount: o.dayCellWillUnmount,
                                elRef: r.elRef,
                            },
                            function (c) {
                                return r.children(c, s, l, a.isDisabled);
                            }
                        );
                    }),
                    e
                );
            })(I);
            function Wo(t) {
                return h('div', { className: 'fc-' + t });
            }
            var Vo = function (t) {
                return h(
                    Yn,
                    {
                        defaultContent: Df,
                        seg: t.seg,
                        timeText: '',
                        disableDragging: !0,
                        disableResizing: !0,
                        isDragging: !1,
                        isResizing: !1,
                        isDateSelecting: !1,
                        isSelected: !1,
                        isPast: t.isPast,
                        isFuture: t.isFuture,
                        isToday: t.isToday,
                    },
                    function (e, n, r, i, o) {
                        return h(
                            'div',
                            {
                                ref: e,
                                className: ['fc-bg-event'].concat(n).join(' '),
                                style: { backgroundColor: o.backgroundColor },
                            },
                            i
                        );
                    }
                );
            };
            function Df(t) {
                return (
                    t.event.title &&
                    h('div', { className: 'fc-event-title' }, t.event.title)
                );
            }
            var Go = function (t) {
                return h(le.Consumer, null, function (e) {
                    var n = e.dateEnv,
                        r = e.options,
                        i = t.date,
                        o = r.weekNumberFormat || t.defaultFormat,
                        a = n.computeWeekNumber(i),
                        s = n.format(i, o);
                    return h(
                        te,
                        {
                            hookProps: { num: a, text: s, date: i },
                            classNames: r.weekNumberClassNames,
                            content: r.weekNumberContent,
                            defaultContent: Cf,
                            didMount: r.weekNumberDidMount,
                            willUnmount: r.weekNumberWillUnmount,
                        },
                        t.children
                    );
                });
            };
            function Cf(t) {
                return t.text;
            }
            var Sf = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.state = { titleId: ut() }),
                            (n.handleRootEl = function (r) {
                                (n.rootEl = r),
                                    n.props.elRef && $(n.props.elRef, r);
                            }),
                            (n.handleDocumentMouseDown = function (r) {
                                var i = ii(r);
                                n.rootEl.contains(i) || n.handleCloseClick();
                            }),
                            (n.handleDocumentKeyDown = function (r) {
                                'Escape' === r.key && n.handleCloseClick();
                            }),
                            (n.handleCloseClick = function () {
                                var r = n.props.onClose;
                                r && r();
                            }),
                            n
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this.context,
                                r = n.theme,
                                i = n.options,
                                a = this.props,
                                s = this.state,
                                l = [
                                    'fc-popover',
                                    r.getClass('popover'),
                                ].concat(a.extraClassNames || []);
                            return fs(
                                h(
                                    'div',
                                    (0, u.pi)(
                                        {
                                            id: a.id,
                                            className: l.join(' '),
                                            'aria-labelledby': s.titleId,
                                        },
                                        a.extraAttrs,
                                        { ref: this.handleRootEl }
                                    ),
                                    h(
                                        'div',
                                        {
                                            className:
                                                'fc-popover-header ' +
                                                r.getClass('popoverHeader'),
                                        },
                                        h(
                                            'span',
                                            {
                                                className: 'fc-popover-title',
                                                id: s.titleId,
                                            },
                                            a.title
                                        ),
                                        h('span', {
                                            className:
                                                'fc-popover-close ' +
                                                r.getIconClass('close'),
                                            title: i.closeHint,
                                            onClick: this.handleCloseClick,
                                        })
                                    ),
                                    h(
                                        'div',
                                        {
                                            className:
                                                'fc-popover-body ' +
                                                r.getClass('popoverContent'),
                                        },
                                        a.children
                                    )
                                ),
                                a.parentEl
                            );
                        }),
                        (e.prototype.componentDidMount = function () {
                            document.addEventListener(
                                'mousedown',
                                this.handleDocumentMouseDown
                            ),
                                document.addEventListener(
                                    'keydown',
                                    this.handleDocumentKeyDown
                                ),
                                this.updateSize();
                        }),
                        (e.prototype.componentWillUnmount = function () {
                            document.removeEventListener(
                                'mousedown',
                                this.handleDocumentMouseDown
                            ),
                                document.removeEventListener(
                                    'keydown',
                                    this.handleDocumentKeyDown
                                );
                        }),
                        (e.prototype.updateSize = function () {
                            var n = this.context.isRtl,
                                r = this.props,
                                i = r.alignmentEl,
                                o = r.alignGridTop,
                                a = this.rootEl,
                                s = (function bc(t) {
                                    for (
                                        var e = io(t),
                                            n = t.getBoundingClientRect(),
                                            r = 0,
                                            i = e;
                                        r < i.length;
                                        r++
                                    ) {
                                        var a = eo(
                                            n,
                                            i[r].getBoundingClientRect()
                                        );
                                        if (!a) return null;
                                        n = a;
                                    }
                                    return n;
                                })(i);
                            if (s) {
                                var l = a.getBoundingClientRect(),
                                    c = o
                                        ? W(
                                              i,
                                              '.fc-scrollgrid'
                                          ).getBoundingClientRect().top
                                        : s.top,
                                    d = n ? s.right - l.width : s.left;
                                (c = Math.max(c, 10)),
                                    (d = Math.min(
                                        d,
                                        document.documentElement.clientWidth -
                                            10 -
                                            l.width
                                    )),
                                    (d = Math.max(d, 10));
                                var f = a.offsetParent.getBoundingClientRect();
                                Ye(a, { top: c - f.top, left: d - f.left });
                            }
                        }),
                        e
                    );
                })(I),
                xf = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.handleRootEl = function (r) {
                                (n.rootEl = r),
                                    r
                                        ? n.context.registerInteractiveComponent(
                                              n,
                                              { el: r, useEventCenter: !1 }
                                          )
                                        : n.context.unregisterInteractiveComponent(
                                              n
                                          );
                            }),
                            n
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this.context,
                                o = this.props,
                                a = o.startDate,
                                s = o.todayRange,
                                l = o.dateProfile,
                                c = n.dateEnv.format(
                                    a,
                                    n.options.dayPopoverFormat
                                );
                            return h(
                                Xn,
                                {
                                    date: a,
                                    dateProfile: l,
                                    todayRange: s,
                                    elRef: this.handleRootEl,
                                },
                                function (d, f, p) {
                                    return h(
                                        Sf,
                                        {
                                            elRef: d,
                                            id: o.id,
                                            title: c,
                                            extraClassNames: [
                                                'fc-more-popover',
                                            ].concat(f),
                                            extraAttrs: p,
                                            parentEl: o.parentEl,
                                            alignmentEl: o.alignmentEl,
                                            alignGridTop: o.alignGridTop,
                                            onClose: o.onClose,
                                        },
                                        h(
                                            Jn,
                                            {
                                                date: a,
                                                dateProfile: l,
                                                todayRange: s,
                                            },
                                            function (v, g) {
                                                return (
                                                    g &&
                                                    h(
                                                        'div',
                                                        {
                                                            className:
                                                                'fc-more-popover-misc',
                                                            ref: v,
                                                        },
                                                        g
                                                    )
                                                );
                                            }
                                        ),
                                        o.children
                                    );
                                }
                            );
                        }),
                        (e.prototype.queryHit = function (n, r, i, o) {
                            var s = this.rootEl,
                                l = this.props;
                            return n >= 0 && n < i && r >= 0 && r < o
                                ? {
                                      dateProfile: l.dateProfile,
                                      dateSpan: (0, u.pi)(
                                          {
                                              allDay: !0,
                                              range: {
                                                  start: l.startDate,
                                                  end: l.endDate,
                                              },
                                          },
                                          l.extraDateSpan
                                      ),
                                      dayEl: s,
                                      rect: {
                                          left: 0,
                                          top: 0,
                                          right: i,
                                          bottom: o,
                                      },
                                      layer: 1,
                                  }
                                : null;
                        }),
                        e
                    );
                })(ce),
                Zo = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.linkElRef = U()),
                            (n.state = { isPopoverOpen: !1, popoverId: ut() }),
                            (n.handleClick = function (r) {
                                var o = n.props,
                                    a = n.context,
                                    s = a.options.moreLinkClick,
                                    l = jo(o).start;
                                function c(d) {
                                    var f = d.eventRange,
                                        g = f.range;
                                    return {
                                        event: new z(a, f.def, f.instance),
                                        start: a.dateEnv.toDate(g.start),
                                        end: a.dateEnv.toDate(g.end),
                                        isStart: d.isStart,
                                        isEnd: d.isEnd,
                                    };
                                }
                                'function' == typeof s &&
                                    (s = s({
                                        date: l,
                                        allDay: Boolean(o.allDayDate),
                                        allSegs: o.allSegs.map(c),
                                        hiddenSegs: o.hiddenSegs.map(c),
                                        jsEvent: r,
                                        view: a.viewApi,
                                    })),
                                    s && 'popover' !== s
                                        ? 'string' == typeof s &&
                                          a.calendarApi.zoomTo(l, s)
                                        : n.setState({ isPopoverOpen: !0 });
                            }),
                            (n.handlePopoverClose = function () {
                                n.setState({ isPopoverOpen: !1 });
                            }),
                            n
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this,
                                i = this.props,
                                o = this.state;
                            return h(le.Consumer, null, function (a) {
                                var s = a.viewApi,
                                    l = a.options,
                                    c = a.calendarApi,
                                    d = l.moreLinkText,
                                    f = i.moreCnt,
                                    p = jo(i),
                                    v =
                                        'function' == typeof d
                                            ? d.call(c, f)
                                            : '+' + f + ' ' + d,
                                    g = qe(l.moreLinkHint, [f], v),
                                    b = {
                                        num: f,
                                        shortText: '+' + f,
                                        text: v,
                                        view: s,
                                    };
                                return h(
                                    L,
                                    null,
                                    Boolean(i.moreCnt) &&
                                        h(
                                            te,
                                            {
                                                elRef: n.linkElRef,
                                                hookProps: b,
                                                classNames:
                                                    l.moreLinkClassNames,
                                                content: l.moreLinkContent,
                                                defaultContent:
                                                    i.defaultContent || Tf,
                                                didMount: l.moreLinkDidMount,
                                                willUnmount:
                                                    l.moreLinkWillUnmount,
                                            },
                                            function (E, m, w, C) {
                                                return i.children(
                                                    E,
                                                    ['fc-more-link'].concat(m),
                                                    w,
                                                    C,
                                                    n.handleClick,
                                                    g,
                                                    o.isPopoverOpen,
                                                    o.isPopoverOpen
                                                        ? o.popoverId
                                                        : ''
                                                );
                                            }
                                        ),
                                    o.isPopoverOpen &&
                                        h(
                                            xf,
                                            {
                                                id: o.popoverId,
                                                startDate: p.start,
                                                endDate: p.end,
                                                dateProfile: i.dateProfile,
                                                todayRange: i.todayRange,
                                                extraDateSpan: i.extraDateSpan,
                                                parentEl: n.parentEl,
                                                alignmentEl:
                                                    i.alignmentElRef.current,
                                                alignGridTop: i.alignGridTop,
                                                onClose: n.handlePopoverClose,
                                            },
                                            i.popoverContent()
                                        )
                                );
                            });
                        }),
                        (e.prototype.componentDidMount = function () {
                            this.updateParentEl();
                        }),
                        (e.prototype.componentDidUpdate = function () {
                            this.updateParentEl();
                        }),
                        (e.prototype.updateParentEl = function () {
                            this.linkElRef.current &&
                                (this.parentEl = W(
                                    this.linkElRef.current,
                                    '.fc-view-harness'
                                ));
                        }),
                        e
                    );
                })(I);
            function Tf(t) {
                return t.text;
            }
            function jo(t) {
                if (t.allDayDate)
                    return { start: t.allDayDate, end: G(t.allDayDate, 1) };
                var e = t.hiddenSegs;
                return { start: Yo(e), end: kf(e) };
            }
            function Yo(t) {
                return t.reduce(Rf).eventRange.range.start;
            }
            function Rf(t, e) {
                return t.eventRange.range.start < e.eventRange.range.start
                    ? t
                    : e;
            }
            function kf(t) {
                return t.reduce(_f).eventRange.range.end;
            }
            function _f(t, e) {
                return t.eventRange.range.end > e.eventRange.range.end ? t : e;
            }
            var Mf = (function (t) {
                    function e(n, r) {
                        void 0 === r && (r = {});
                        var i = t.call(this) || this;
                        return (
                            (i.isRendering = !1),
                            (i.isRendered = !1),
                            (i.currentClassNames = []),
                            (i.customContentRenderId = 0),
                            (i.handleAction = function (o) {
                                switch (o.type) {
                                    case 'SET_EVENT_DRAG':
                                    case 'SET_EVENT_RESIZE':
                                        i.renderRunner.tryDrain();
                                }
                            }),
                            (i.handleData = function (o) {
                                (i.currentData = o),
                                    i.renderRunner.request(
                                        o.calendarOptions.rerenderDelay
                                    );
                            }),
                            (i.handleRenderRequest = function () {
                                if (i.isRendering) {
                                    i.isRendered = !0;
                                    var o = i.currentData;
                                    ds(
                                        h(
                                            Xd,
                                            {
                                                options: o.calendarOptions,
                                                theme: o.theme,
                                                emitter: o.emitter,
                                            },
                                            function (a, s, l, c) {
                                                return (
                                                    i.setClassNames(a),
                                                    i.setHeight(s),
                                                    h(
                                                        oo.Provider,
                                                        {
                                                            value: i.customContentRenderId,
                                                        },
                                                        h(
                                                            Yd,
                                                            (0, u.pi)(
                                                                {
                                                                    isHeightAuto:
                                                                        l,
                                                                    forPrint: c,
                                                                },
                                                                o
                                                            )
                                                        )
                                                    )
                                                );
                                            }
                                        ),
                                        i.el
                                    );
                                } else
                                    i.isRendered &&
                                        ((i.isRendered = !1),
                                        us(i.el),
                                        i.setClassNames([]),
                                        i.setHeight(''));
                                ni();
                            }),
                            (i.el = n),
                            (i.renderRunner = new Bn(i.handleRenderRequest)),
                            new So({
                                optionOverrides: r,
                                calendarApi: i,
                                onAction: i.handleAction,
                                onData: i.handleData,
                            }),
                            i
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        Object.defineProperty(e.prototype, 'view', {
                            get: function () {
                                return this.currentData.viewApi;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        (e.prototype.render = function () {
                            var n = this.isRendering;
                            n
                                ? (this.customContentRenderId += 1)
                                : (this.isRendering = !0),
                                this.renderRunner.request(),
                                n && this.updateSize();
                        }),
                        (e.prototype.destroy = function () {
                            this.isRendering &&
                                ((this.isRendering = !1),
                                this.renderRunner.request());
                        }),
                        (e.prototype.updateSize = function () {
                            t.prototype.updateSize.call(this), ni();
                        }),
                        (e.prototype.batchRendering = function (n) {
                            this.renderRunner.pause('batchRendering'),
                                n(),
                                this.renderRunner.resume('batchRendering');
                        }),
                        (e.prototype.pauseRendering = function () {
                            this.renderRunner.pause('pauseRendering');
                        }),
                        (e.prototype.resumeRendering = function () {
                            this.renderRunner.resume('pauseRendering', !0);
                        }),
                        (e.prototype.resetOptions = function (n, r) {
                            this.currentDataManager.resetOptions(n, r);
                        }),
                        (e.prototype.setClassNames = function (n) {
                            if (!ye(n, this.currentClassNames)) {
                                for (
                                    var r = this.el.classList,
                                        i = 0,
                                        o = this.currentClassNames;
                                    i < o.length;
                                    i++
                                )
                                    r.remove(o[i]);
                                for (var s = 0, l = n; s < l.length; s++)
                                    r.add(l[s]);
                                this.currentClassNames = n;
                            }
                        }),
                        (e.prototype.setHeight = function (n) {
                            ri(this.el, 'height', n);
                        }),
                        e
                    );
                })(Zl),
                y = R(5e3);
            const If = Object.prototype.hasOwnProperty;
            function Lt(t) {
                return Array.isArray(t)
                    ? t.map(Lt)
                    : t instanceof Date
                    ? new Date(t.valueOf())
                    : 'object' == typeof t && t
                    ? qo(t, Lt)
                    : t;
            }
            function Nf(t) {
                return (
                    'object' == typeof t &&
                        (Array.isArray(t)
                            ? (t = Array.prototype.slice.call(t))
                            : t && (t = Object.assign({}, t))),
                    t
                );
            }
            function qo(t, e) {
                const n = {};
                for (const r in t) If.call(t, r) && (n[r] = e(t[r], r));
                return n;
            }
            const Jo = {
                headerToolbar: !0,
                footerToolbar: !0,
                events: !0,
                eventSources: !0,
                resources: !0,
            };
            let Pf = (() => {
                    class t {
                        constructor(n) {
                            (this.element = n), (this.optionSnapshot = {});
                        }
                        ngAfterViewInit() {
                            const { deepChangeDetection: n } = this,
                                r = this.options || {};
                            (this.optionSnapshot = qo(r, (i, o) =>
                                n && Jo[o] ? Lt(i) : i
                            )),
                                (this.calendar = new Mf(
                                    this.element.nativeElement,
                                    r
                                )),
                                this.calendar.render();
                        }
                        ngDoCheck() {
                            if (this.calendar) {
                                const {
                                        deepChangeDetection: n,
                                        optionSnapshot: r,
                                    } = this,
                                    i = this.options || {},
                                    o = {};
                                let a = !1;
                                for (const l in i)
                                    if (i.hasOwnProperty(l)) {
                                        let c = i[l];
                                        n && Jo[l]
                                            ? J()(r[l], c) ||
                                              ((r[l] = Lt(c)),
                                              (a = !0),
                                              (c = Nf(c)))
                                            : r[l] !== c &&
                                              ((r[l] = c), (a = !0)),
                                            (o[l] = c);
                                    }
                                const s = Object.keys(r);
                                for (const l of s)
                                    l in i || (delete r[l], (a = !0));
                                a &&
                                    (this.calendar.pauseRendering(),
                                    this.calendar.resetOptions(o));
                            }
                        }
                        ngAfterContentChecked() {
                            this.calendar && this.calendar.resumeRendering();
                        }
                        ngOnDestroy() {
                            this.calendar &&
                                (this.calendar.destroy(),
                                (this.calendar = null));
                        }
                        getApi() {
                            return this.calendar;
                        }
                    }
                    return (
                        (t.ɵfac = function (n) {
                            return new (n || t)(y.Y36(y.SBq));
                        }),
                        (t.ɵcmp = y.Xpm({
                            type: t,
                            selectors: [['full-calendar']],
                            inputs: {
                                options: 'options',
                                deepChangeDetection: 'deepChangeDetection',
                            },
                            decls: 0,
                            vars: 0,
                            template: function (n, r) {},
                            styles: [
                                '@charset "UTF-8";.fc-not-allowed,.fc-not-allowed .fc-event{cursor:not-allowed}.fc-unselectable{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.fc{display:flex;flex-direction:column;font-size:1em}.fc,.fc *,.fc :after,.fc :before{box-sizing:border-box}.fc table{border-collapse:collapse;border-spacing:0;font-size:1em}.fc th{text-align:center}.fc td,.fc th{vertical-align:top;padding:0}.fc a[data-navlink]{cursor:pointer}.fc a[data-navlink]:hover{text-decoration:underline}.fc-direction-ltr{direction:ltr;text-align:left}.fc-direction-rtl{direction:rtl;text-align:right}.fc-theme-standard td,.fc-theme-standard th{border:1px solid #ddd;border:1px solid var(--fc-border-color,#ddd)}.fc-liquid-hack td,.fc-liquid-hack th{position:relative}@font-face{font-family:fcicons;src:url("data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBfAAAAC8AAAAYGNtYXAXVtKNAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZgYydxIAAAF4AAAFNGhlYWQUJ7cIAAAGrAAAADZoaGVhB20DzAAABuQAAAAkaG10eCIABhQAAAcIAAAALGxvY2ED4AU6AAAHNAAAABhtYXhwAA8AjAAAB0wAAAAgbmFtZXsr690AAAdsAAABhnBvc3QAAwAAAAAI9AAAACAAAwPAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpBgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6Qb//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAWIAjQKeAskAEwAAJSc3NjQnJiIHAQYUFwEWMjc2NCcCnuLiDQ0MJAz/AA0NAQAMJAwNDcni4gwjDQwM/wANIwz/AA0NDCMNAAAAAQFiAI0CngLJABMAACUBNjQnASYiBwYUHwEHBhQXFjI3AZ4BAA0N/wAMJAwNDeLiDQ0MJAyNAQAMIw0BAAwMDSMM4uINIwwNDQAAAAIA4gC3Ax4CngATACcAACUnNzY0JyYiDwEGFB8BFjI3NjQnISc3NjQnJiIPAQYUHwEWMjc2NCcB87e3DQ0MIw3VDQ3VDSMMDQ0BK7e3DQ0MJAzVDQ3VDCQMDQ3zuLcMJAwNDdUNIwzWDAwNIwy4twwkDA0N1Q0jDNYMDA0jDAAAAgDiALcDHgKeABMAJwAAJTc2NC8BJiIHBhQfAQcGFBcWMjchNzY0LwEmIgcGFB8BBwYUFxYyNwJJ1Q0N1Q0jDA0Nt7cNDQwjDf7V1Q0N1QwkDA0Nt7cNDQwkDLfWDCMN1Q0NDCQMt7gMIw0MDNYMIw3VDQ0MJAy3uAwjDQwMAAADAFUAAAOrA1UAMwBoAHcAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMhMjY1NCYjISIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAAVYRGRkR/qoRGRkRA1UFBAUOCQkVDAsZDf2rDRkLDBUJCA4FBQUFBQUOCQgVDAsZDQJVDRkLDBUJCQ4FBAVVAgECBQMCBwQECAX9qwQJAwQHAwMFAQICAgIBBQMDBwQDCQQCVQUIBAQHAgMFAgEC/oAZEhEZGRESGQAAAAADAFUAAAOrA1UAMwBoAIkAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMzFRQWMzI2PQEzMjY1NCYrATU0JiMiBh0BIyIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAgBkSEhmAERkZEYAZEhIZgBEZGREDVQUEBQ4JCRUMCxkN/asNGQsMFQkIDgUFBQUFBQ4JCBUMCxkNAlUNGQsMFQkJDgUEBVUCAQIFAwIHBAQIBf2rBAkDBAcDAwUBAgICAgEFAwMHBAMJBAJVBQgEBAcCAwUCAQL+gIASGRkSgBkSERmAEhkZEoAZERIZAAABAOIAjQMeAskAIAAAExcHBhQXFjI/ARcWMjc2NC8BNzY0JyYiDwEnJiIHBhQX4uLiDQ0MJAzi4gwkDA0N4uINDQwkDOLiDCQMDQ0CjeLiDSMMDQ3h4Q0NDCMN4uIMIw0MDOLiDAwNIwwAAAABAAAAAQAAa5n0y18PPPUACwQAAAAAANivOVsAAAAA2K85WwAAAAADqwNVAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAOrAAEAAAAAAAAAAAAAAAAAAAALBAAAAAAAAAAAAAAAAgAAAAQAAWIEAAFiBAAA4gQAAOIEAABVBAAAVQQAAOIAAAAAAAoAFAAeAEQAagCqAOoBngJkApoAAQAAAAsAigADAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGZjaWNvbnMAZgBjAGkAYwBvAG4Ac1ZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGZjaWNvbnMAZgBjAGkAYwBvAG4Ac2ZjaWNvbnMAZgBjAGkAYwBvAG4Ac1JlZ3VsYXIAUgBlAGcAdQBsAGEAcmZjaWNvbnMAZgBjAGkAYwBvAG4Ac0ZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=") format("truetype");font-weight:400;font-style:normal}.fc-icon{display:inline-block;width:1em;height:1em;text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;font-family:fcicons!important;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fc-icon-chevron-left:before{content:"\ue900"}.fc-icon-chevron-right:before{content:"\ue901"}.fc-icon-chevrons-left:before{content:"\ue902"}.fc-icon-chevrons-right:before{content:"\ue903"}.fc-icon-minus-square:before{content:"\ue904"}.fc-icon-plus-square:before{content:"\ue905"}.fc-icon-x:before{content:"\ue906"}.fc .fc-button{border-radius:0;overflow:visible;text-transform:none;margin:0;font-family:inherit;font-size:inherit;line-height:inherit}.fc .fc-button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}.fc .fc-button{-webkit-appearance:button}.fc .fc-button:not(:disabled){cursor:pointer}.fc .fc-button::-moz-focus-inner{padding:0;border-style:none}.fc .fc-button{display:inline-block;font-weight:400;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;padding:.4em .65em;font-size:1em;line-height:1.5;border-radius:.25em}.fc .fc-button:hover{text-decoration:none}.fc .fc-button:focus{outline:0;box-shadow:0 0 0 .2rem rgba(44,62,80,.25)}.fc .fc-button:disabled{opacity:.65}.fc .fc-button-primary{color:#fff;color:var(--fc-button-text-color,#fff);background-color:#2c3e50;background-color:var(--fc-button-bg-color,#2c3e50);border-color:#2c3e50;border-color:var(--fc-button-border-color,#2c3e50)}.fc .fc-button-primary:hover{color:#fff;color:var(--fc-button-text-color,#fff);background-color:#1e2b37;background-color:var(--fc-button-hover-bg-color,#1e2b37);border-color:#1a252f;border-color:var(--fc-button-hover-border-color,#1a252f)}.fc .fc-button-primary:disabled{color:#fff;color:var(--fc-button-text-color,#fff);background-color:#2c3e50;background-color:var(--fc-button-bg-color,#2c3e50);border-color:#2c3e50;border-color:var(--fc-button-border-color,#2c3e50)}.fc .fc-button-primary:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button-primary:not(:disabled).fc-button-active,.fc .fc-button-primary:not(:disabled):active{color:#fff;color:var(--fc-button-text-color,#fff);background-color:#1a252f;background-color:var(--fc-button-active-bg-color,#1a252f);border-color:#151e27;border-color:var(--fc-button-active-border-color,#151e27)}.fc .fc-button-primary:not(:disabled).fc-button-active:focus,.fc .fc-button-primary:not(:disabled):active:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button .fc-icon{vertical-align:middle;font-size:1.5em}.fc .fc-button-group{position:relative;display:inline-flex;vertical-align:middle}.fc .fc-button-group>.fc-button{position:relative;flex:1 1 auto}.fc .fc-button-group>.fc-button.fc-button-active,.fc .fc-button-group>.fc-button:active,.fc .fc-button-group>.fc-button:focus,.fc .fc-button-group>.fc-button:hover{z-index:1}.fc-direction-ltr .fc-button-group>.fc-button:not(:first-child){margin-left:-1px;border-top-left-radius:0;border-bottom-left-radius:0}.fc-direction-ltr .fc-button-group>.fc-button:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.fc-direction-rtl .fc-button-group>.fc-button:not(:first-child){margin-right:-1px;border-top-right-radius:0;border-bottom-right-radius:0}.fc-direction-rtl .fc-button-group>.fc-button:not(:last-child){border-top-left-radius:0;border-bottom-left-radius:0}.fc .fc-toolbar{display:flex;justify-content:space-between;align-items:center}.fc .fc-toolbar.fc-header-toolbar{margin-bottom:1.5em}.fc .fc-toolbar.fc-footer-toolbar{margin-top:1.5em}.fc .fc-toolbar-title{font-size:1.75em;margin:0}.fc-direction-ltr .fc-toolbar>*>:not(:first-child){margin-left:.75em}.fc-direction-rtl .fc-toolbar>*>:not(:first-child){margin-right:.75em}.fc-direction-rtl .fc-toolbar-ltr{flex-direction:row-reverse}.fc .fc-scroller{-webkit-overflow-scrolling:touch;position:relative}.fc .fc-scroller-liquid{height:100%}.fc .fc-scroller-liquid-absolute{position:absolute;top:0;right:0;left:0;bottom:0}.fc .fc-scroller-harness{position:relative;overflow:hidden;direction:ltr}.fc .fc-scroller-harness-liquid{height:100%}.fc-direction-rtl .fc-scroller-harness>.fc-scroller{direction:rtl}.fc-theme-standard .fc-scrollgrid{border:1px solid #ddd;border:1px solid var(--fc-border-color,#ddd)}.fc .fc-scrollgrid,.fc .fc-scrollgrid table{width:100%;table-layout:fixed}.fc .fc-scrollgrid table{border-top-style:hidden;border-left-style:hidden;border-right-style:hidden}.fc .fc-scrollgrid{border-collapse:separate;border-right-width:0;border-bottom-width:0}.fc .fc-scrollgrid-liquid{height:100%}.fc .fc-scrollgrid-section,.fc .fc-scrollgrid-section>td,.fc .fc-scrollgrid-section table{height:1px}.fc .fc-scrollgrid-section-liquid>td{height:100%}.fc .fc-scrollgrid-section>*{border-top-width:0;border-left-width:0}.fc .fc-scrollgrid-section-footer>*,.fc .fc-scrollgrid-section-header>*{border-bottom-width:0}.fc .fc-scrollgrid-section-body table,.fc .fc-scrollgrid-section-footer table{border-bottom-style:hidden}.fc .fc-scrollgrid-section-sticky>*{background:#fff;background:var(--fc-page-bg-color,#fff);position:sticky;z-index:3}.fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky>*{top:0}.fc .fc-scrollgrid-section-footer.fc-scrollgrid-section-sticky>*{bottom:0}.fc .fc-scrollgrid-sticky-shim{height:1px;margin-bottom:-1px}.fc-sticky{position:sticky}.fc .fc-view-harness{flex-grow:1;position:relative}.fc .fc-view-harness-active>.fc-view{position:absolute;top:0;right:0;bottom:0;left:0}.fc .fc-col-header-cell-cushion{display:inline-block;padding:2px 4px}.fc .fc-bg-event,.fc .fc-highlight,.fc .fc-non-business{position:absolute;top:0;left:0;right:0;bottom:0}.fc .fc-non-business{background:hsla(0,0%,84.3%,.3);background:var(--fc-non-business-color,hsla(0,0%,84.3%,.3))}.fc .fc-bg-event{background:#8fdf82;background:var(--fc-bg-event-color,#8fdf82);opacity:.3;opacity:var(--fc-bg-event-opacity,.3)}.fc .fc-bg-event .fc-event-title{margin:.5em;font-size:.85em;font-size:var(--fc-small-font-size,.85em);font-style:italic}.fc .fc-highlight{background:rgba(188,232,241,.3);background:var(--fc-highlight-color,rgba(188,232,241,.3))}.fc .fc-cell-shaded,.fc .fc-day-disabled{background:hsla(0,0%,81.6%,.3);background:var(--fc-neutral-bg-color,hsla(0,0%,81.6%,.3))}a.fc-event,a.fc-event:hover{text-decoration:none}.fc-event.fc-event-draggable,.fc-event[href]{cursor:pointer}.fc-event .fc-event-main{position:relative;z-index:2}.fc-event-dragging:not(.fc-event-selected){opacity:.75}.fc-event-dragging.fc-event-selected{box-shadow:0 2px 7px rgba(0,0,0,.3)}.fc-event .fc-event-resizer{display:none;position:absolute;z-index:4}.fc-event-selected .fc-event-resizer,.fc-event:hover .fc-event-resizer{display:block}.fc-event-selected .fc-event-resizer{border-radius:4px;border-radius:calc(var(--fc-event-resizer-dot-total-width, 8px) / 2);border-width:1px;width:8px;width:var(--fc-event-resizer-dot-total-width,8px);height:8px;height:var(--fc-event-resizer-dot-total-width,8px);border:var(--fc-event-resizer-dot-border-width,1px) solid;border-color:inherit;background:#fff;background:var(--fc-page-bg-color,#fff)}.fc-event-selected .fc-event-resizer:before{content:"";position:absolute;top:-20px;left:-20px;right:-20px;bottom:-20px}.fc-event-selected,.fc-event:focus{box-shadow:0 2px 5px rgba(0,0,0,.2)}.fc-event-selected:before,.fc-event:focus:before{content:"";position:absolute;z-index:3;top:0;left:0;right:0;bottom:0}.fc-event-selected:after,.fc-event:focus:after{content:"";background:rgba(0,0,0,.25);background:var(--fc-event-selected-overlay-color,rgba(0,0,0,.25));position:absolute;z-index:1;top:-1px;left:-1px;right:-1px;bottom:-1px}.fc-h-event{display:block;border:1px solid #3788d8;border:1px solid var(--fc-event-border-color,#3788d8);background-color:#3788d8;background-color:var(--fc-event-bg-color,#3788d8)}.fc-h-event .fc-event-main{color:#fff;color:var(--fc-event-text-color,#fff)}.fc-h-event .fc-event-main-frame{display:flex}.fc-h-event .fc-event-time{max-width:100%;overflow:hidden}.fc-h-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-width:0}.fc-h-event .fc-event-title{display:inline-block;vertical-align:top;left:0;right:0;max-width:100%;overflow:hidden}.fc-h-event.fc-event-selected:before{top:-10px;bottom:-10px}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-start),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-end){border-top-left-radius:0;border-bottom-left-radius:0;border-left-width:0}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-end),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-start){border-top-right-radius:0;border-bottom-right-radius:0;border-right-width:0}.fc-h-event:not(.fc-event-selected) .fc-event-resizer{top:0;bottom:0;width:8px;width:var(--fc-event-resizer-thickness,8px)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end{cursor:w-resize;left:-4px;left:calc(-.5 * var(--fc-event-resizer-thickness, 8px))}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start{cursor:e-resize;right:-4px;right:calc(-.5 * var(--fc-event-resizer-thickness, 8px))}.fc-h-event.fc-event-selected .fc-event-resizer{top:50%;margin-top:-4px;margin-top:calc(-.5 * var(--fc-event-resizer-dot-total-width, 8px))}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-start,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-end{left:-4px;left:calc(-.5 * var(--fc-event-resizer-dot-total-width, 8px))}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-end,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-start{right:-4px;right:calc(-.5 * var(--fc-event-resizer-dot-total-width, 8px))}.fc .fc-popover{position:absolute;z-index:9999;box-shadow:0 2px 6px rgba(0,0,0,.15)}.fc .fc-popover-header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:3px 4px}.fc .fc-popover-title{margin:0 2px}.fc .fc-popover-close{cursor:pointer;opacity:.65;font-size:1.1em}.fc-theme-standard .fc-popover{border:1px solid #ddd;border:1px solid var(--fc-border-color,#ddd);background:#fff;background:var(--fc-page-bg-color,#fff)}.fc-theme-standard .fc-popover-header{background:hsla(0,0%,81.6%,.3);background:var(--fc-neutral-bg-color,hsla(0,0%,81.6%,.3))}:root{--fc-daygrid-event-dot-width:8px}.fc-daygrid-day-events:after,.fc-daygrid-day-events:before,.fc-daygrid-day-frame:after,.fc-daygrid-day-frame:before,.fc-daygrid-event-harness:after,.fc-daygrid-event-harness:before{content:"";clear:both;display:table}.fc .fc-daygrid-body{position:relative;z-index:1}.fc .fc-daygrid-day.fc-day-today{background-color:rgba(255,220,40,.15);background-color:var(--fc-today-bg-color,rgba(255,220,40,.15))}.fc .fc-daygrid-day-frame{position:relative;min-height:100%}.fc .fc-daygrid-day-top{display:flex;flex-direction:row-reverse}.fc .fc-day-other .fc-daygrid-day-top{opacity:.3}.fc .fc-daygrid-day-number{position:relative;z-index:4;padding:4px}.fc .fc-daygrid-day-events{margin-top:1px}.fc .fc-daygrid-body-balanced .fc-daygrid-day-events{position:absolute;left:0;right:0}.fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events{position:relative;min-height:2em}.fc .fc-daygrid-body-natural .fc-daygrid-day-events{margin-bottom:1em}.fc .fc-daygrid-event-harness{position:relative}.fc .fc-daygrid-event-harness-abs{position:absolute;top:0;left:0;right:0}.fc .fc-daygrid-bg-harness{position:absolute;top:0;bottom:0}.fc .fc-daygrid-day-bg .fc-non-business{z-index:1}.fc .fc-daygrid-day-bg .fc-bg-event{z-index:2}.fc .fc-daygrid-day-bg .fc-highlight{z-index:3}.fc .fc-daygrid-event{z-index:6;margin-top:1px}.fc .fc-daygrid-event.fc-event-mirror{z-index:7}.fc .fc-daygrid-day-bottom{font-size:.85em;padding:2px 3px 0}.fc .fc-daygrid-day-bottom:before{content:"";clear:both;display:table}.fc .fc-daygrid-more-link{position:relative;z-index:4;cursor:pointer}.fc .fc-daygrid-week-number{position:absolute;z-index:5;top:0;padding:2px;min-width:1.5em;text-align:center;background-color:hsla(0,0%,81.6%,.3);background-color:var(--fc-neutral-bg-color,hsla(0,0%,81.6%,.3));color:grey;color:var(--fc-neutral-text-color,grey)}.fc .fc-more-popover .fc-popover-body{min-width:220px;padding:10px}.fc-direction-ltr .fc-daygrid-event.fc-event-start,.fc-direction-rtl .fc-daygrid-event.fc-event-end{margin-left:2px}.fc-direction-ltr .fc-daygrid-event.fc-event-end,.fc-direction-rtl .fc-daygrid-event.fc-event-start{margin-right:2px}.fc-direction-ltr .fc-daygrid-week-number{left:0;border-radius:0 0 3px 0}.fc-direction-rtl .fc-daygrid-week-number{right:0;border-radius:0 0 0 3px}.fc-liquid-hack .fc-daygrid-day-frame{position:static}.fc-daygrid-event{position:relative;white-space:nowrap;border-radius:3px;font-size:.85em;font-size:var(--fc-small-font-size,.85em)}.fc-daygrid-block-event .fc-event-time{font-weight:700}.fc-daygrid-block-event .fc-event-time,.fc-daygrid-block-event .fc-event-title{padding:1px}.fc-daygrid-dot-event{display:flex;align-items:center;padding:2px 0}.fc-daygrid-dot-event .fc-event-title{flex-grow:1;flex-shrink:1;min-width:0;overflow:hidden;font-weight:700}.fc-daygrid-dot-event.fc-event-mirror,.fc-daygrid-dot-event:hover{background:rgba(0,0,0,.1)}.fc-daygrid-dot-event.fc-event-selected:before{top:-10px;bottom:-10px}.fc-daygrid-event-dot{margin:0 4px;box-sizing:content-box;width:0;height:0;border:4px solid #3788d8;border:calc(var(--fc-daygrid-event-dot-width, 8px) / 2) solid var(--fc-event-border-color,#3788d8);border-radius:4px;border-radius:calc(var(--fc-daygrid-event-dot-width, 8px) / 2)}.fc-direction-ltr .fc-daygrid-event .fc-event-time{margin-right:3px}.fc-direction-rtl .fc-daygrid-event .fc-event-time{margin-left:3px}.fc-v-event{display:block;border:1px solid #3788d8;border:1px solid var(--fc-event-border-color,#3788d8);background-color:#3788d8;background-color:var(--fc-event-bg-color,#3788d8)}.fc-v-event .fc-event-main{color:#fff;color:var(--fc-event-text-color,#fff);height:100%}.fc-v-event .fc-event-main-frame{height:100%;display:flex;flex-direction:column}.fc-v-event .fc-event-time{flex-grow:0;flex-shrink:0;max-height:100%;overflow:hidden}.fc-v-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-height:0}.fc-v-event .fc-event-title{top:0;bottom:0;max-height:100%;overflow:hidden}.fc-v-event:not(.fc-event-start){border-top-width:0;border-top-left-radius:0;border-top-right-radius:0}.fc-v-event:not(.fc-event-end){border-bottom-width:0;border-bottom-left-radius:0;border-bottom-right-radius:0}.fc-v-event.fc-event-selected:before{left:-10px;right:-10px}.fc-v-event .fc-event-resizer-start{cursor:n-resize}.fc-v-event .fc-event-resizer-end{cursor:s-resize}.fc-v-event:not(.fc-event-selected) .fc-event-resizer{height:8px;height:var(--fc-event-resizer-thickness,8px);left:0;right:0}.fc-v-event:not(.fc-event-selected) .fc-event-resizer-start{top:-4px;top:calc(var(--fc-event-resizer-thickness, 8px) / -2)}.fc-v-event:not(.fc-event-selected) .fc-event-resizer-end{bottom:-4px;bottom:calc(var(--fc-event-resizer-thickness, 8px) / -2)}.fc-v-event.fc-event-selected .fc-event-resizer{left:50%;margin-left:-4px;margin-left:calc(var(--fc-event-resizer-dot-total-width, 8px) / -2)}.fc-v-event.fc-event-selected .fc-event-resizer-start{top:-4px;top:calc(var(--fc-event-resizer-dot-total-width, 8px) / -2)}.fc-v-event.fc-event-selected .fc-event-resizer-end{bottom:-4px;bottom:calc(var(--fc-event-resizer-dot-total-width, 8px) / -2)}.fc .fc-timegrid .fc-daygrid-body{z-index:2}.fc .fc-timegrid-divider{padding:0 0 2px}.fc .fc-timegrid-body{position:relative;z-index:1;min-height:100%}.fc .fc-timegrid-axis-chunk{position:relative}.fc .fc-timegrid-axis-chunk>table,.fc .fc-timegrid-slots{position:relative;z-index:1}.fc .fc-timegrid-slot{height:1.5em;border-bottom:0}.fc .fc-timegrid-slot:empty:before{content:"\xa0"}.fc .fc-timegrid-slot-minor{border-top-style:dotted}.fc .fc-timegrid-slot-label-cushion{display:inline-block;white-space:nowrap}.fc .fc-timegrid-slot-label{vertical-align:middle}.fc .fc-timegrid-axis-cushion,.fc .fc-timegrid-slot-label-cushion{padding:0 4px}.fc .fc-timegrid-axis-frame-liquid{height:100%}.fc .fc-timegrid-axis-frame{overflow:hidden;display:flex;align-items:center;justify-content:flex-end}.fc .fc-timegrid-axis-cushion{max-width:60px;flex-shrink:0}.fc-direction-ltr .fc-timegrid-slot-label-frame{text-align:right}.fc-direction-rtl .fc-timegrid-slot-label-frame{text-align:left}.fc-liquid-hack .fc-timegrid-axis-frame-liquid{height:auto;position:absolute;top:0;right:0;bottom:0;left:0}.fc .fc-timegrid-col.fc-day-today{background-color:rgba(255,220,40,.15);background-color:var(--fc-today-bg-color,rgba(255,220,40,.15))}.fc .fc-timegrid-col-frame{min-height:100%;position:relative}.fc-media-screen.fc-liquid-hack .fc-timegrid-col-frame{height:auto;position:absolute;top:0;right:0;bottom:0;left:0}.fc-media-screen .fc-timegrid-cols{position:absolute;top:0;left:0;right:0;bottom:0}.fc-media-screen .fc-timegrid-cols>table{height:100%}.fc-media-screen .fc-timegrid-col-bg,.fc-media-screen .fc-timegrid-col-events,.fc-media-screen .fc-timegrid-now-indicator-container{position:absolute;top:0;left:0;right:0}.fc .fc-timegrid-col-bg{z-index:2}.fc .fc-timegrid-col-bg .fc-non-business{z-index:1}.fc .fc-timegrid-col-bg .fc-bg-event{z-index:2}.fc .fc-timegrid-col-bg .fc-highlight{z-index:3}.fc .fc-timegrid-bg-harness{position:absolute;left:0;right:0}.fc .fc-timegrid-col-events{z-index:3}.fc .fc-timegrid-now-indicator-container{bottom:0;overflow:hidden}.fc-direction-ltr .fc-timegrid-col-events{margin:0 2.5% 0 2px}.fc-direction-rtl .fc-timegrid-col-events{margin:0 2px 0 2.5%}.fc-timegrid-event-harness{position:absolute}.fc-timegrid-event-harness>.fc-timegrid-event{position:absolute;top:0;bottom:0;left:0;right:0}.fc-timegrid-event-harness-inset .fc-timegrid-event,.fc-timegrid-event.fc-event-mirror,.fc-timegrid-more-link{box-shadow:0 0 0 1px #fff;box-shadow:0 0 0 1px var(--fc-page-bg-color,#fff)}.fc-timegrid-event,.fc-timegrid-more-link{font-size:.85em;font-size:var(--fc-small-font-size,.85em);border-radius:3px}.fc-timegrid-event{margin-bottom:1px}.fc-timegrid-event .fc-event-main{padding:1px 1px 0}.fc-timegrid-event .fc-event-time{white-space:nowrap;font-size:.85em;font-size:var(--fc-small-font-size,.85em);margin-bottom:1px}.fc-timegrid-event-short .fc-event-main-frame{flex-direction:row;overflow:hidden}.fc-timegrid-event-short .fc-event-time:after{content:"\xa0-\xa0"}.fc-timegrid-event-short .fc-event-title{font-size:.85em;font-size:var(--fc-small-font-size,.85em)}.fc-timegrid-more-link{position:absolute;z-index:9999;color:inherit;color:var(--fc-more-link-text-color,inherit);background:#d0d0d0;background:var(--fc-more-link-bg-color,#d0d0d0);cursor:pointer;margin-bottom:1px}.fc-timegrid-more-link-inner{padding:3px 2px;top:0}.fc-direction-ltr .fc-timegrid-more-link{right:0}.fc-direction-rtl .fc-timegrid-more-link{left:0}.fc .fc-timegrid-now-indicator-line{position:absolute;z-index:4;left:0;right:0;border:0 solid red;border-color:var(--fc-now-indicator-color,red);border-top:1px solid var(--fc-now-indicator-color,red)}.fc .fc-timegrid-now-indicator-arrow{position:absolute;z-index:4;margin-top:-5px;border-style:solid;border-color:red;border-color:var(--fc-now-indicator-color,red)}.fc-direction-ltr .fc-timegrid-now-indicator-arrow{left:0;border-width:5px 0 5px 6px;border-top-color:transparent;border-bottom-color:transparent}.fc-direction-rtl .fc-timegrid-now-indicator-arrow{right:0;border-width:5px 6px 5px 0;border-top-color:transparent;border-bottom-color:transparent}:root{--fc-list-event-dot-width:10px;--fc-list-event-hover-bg-color:#f5f5f5}.fc-theme-standard .fc-list{border:1px solid #ddd;border:1px solid var(--fc-border-color,#ddd)}.fc .fc-list-empty{background-color:hsla(0,0%,81.6%,.3);background-color:var(--fc-neutral-bg-color,hsla(0,0%,81.6%,.3));height:100%;display:flex;justify-content:center;align-items:center}.fc .fc-list-empty-cushion{margin:5em 0}.fc .fc-list-table{width:100%;border-style:hidden}.fc .fc-list-table tr>*{border-left:0;border-right:0}.fc .fc-list-sticky .fc-list-day>*{position:sticky;top:0;background:#fff;background:var(--fc-page-bg-color,#fff)}.fc .fc-list-table thead{position:absolute;left:-10000px}.fc .fc-list-table tbody>tr:first-child th{border-top:0}.fc .fc-list-table th{padding:0}.fc .fc-list-day-cushion,.fc .fc-list-table td{padding:8px 14px}.fc .fc-list-day-cushion:after{content:"";clear:both;display:table}.fc-theme-standard .fc-list-day-cushion{background-color:hsla(0,0%,81.6%,.3);background-color:var(--fc-neutral-bg-color,hsla(0,0%,81.6%,.3))}.fc-direction-ltr .fc-list-day-text,.fc-direction-rtl .fc-list-day-side-text{float:left}.fc-direction-ltr .fc-list-day-side-text,.fc-direction-rtl .fc-list-day-text{float:right}.fc-direction-ltr .fc-list-table .fc-list-event-graphic{padding-right:0}.fc-direction-rtl .fc-list-table .fc-list-event-graphic{padding-left:0}.fc .fc-list-event.fc-event-forced-url{cursor:pointer}.fc .fc-list-event:hover td{background-color:#f5f5f5;background-color:var(--fc-list-event-hover-bg-color,#f5f5f5)}.fc .fc-list-event-graphic,.fc .fc-list-event-time{white-space:nowrap;width:1px}.fc .fc-list-event-dot{display:inline-block;box-sizing:content-box;width:0;height:0;border:5px solid #3788d8;border:calc(var(--fc-list-event-dot-width, 10px) / 2) solid var(--fc-event-border-color,#3788d8);border-radius:5px;border-radius:calc(var(--fc-list-event-dot-width, 10px) / 2)}.fc .fc-list-event-title a{color:inherit;text-decoration:none}.fc .fc-list-event.fc-event-forced-url:hover a{text-decoration:underline}.fc-theme-bootstrap a:not([href]){color:inherit}.fc .fc-event,.fc .fc-scrollgrid table tr{-moz-column-break-inside:avoid;break-inside:avoid}.fc-media-print{display:block;max-width:100%}.fc-media-print .fc-bg-event,.fc-media-print .fc-non-business,.fc-media-print .fc-timegrid-axis-chunk,.fc-media-print .fc-timegrid-slots,.fc-media-print .fc-timeline-slots{display:none}.fc-media-print .fc-h-event,.fc-media-print .fc-toolbar button,.fc-media-print .fc-v-event{color:#000!important;background:#fff!important}.fc-media-print .fc-event,.fc-media-print .fc-event-main{color:#000!important}.fc-media-print .fc-timegrid-event{margin:.5em 0}.fc .fc-timeline-body{min-height:100%;position:relative;z-index:1}.fc .fc-timeline-slots{position:absolute;z-index:1;top:0;bottom:0}.fc .fc-timeline-slots>table{height:100%}.fc .fc-timeline-slot-minor{border-style:dotted}.fc .fc-timeline-slot-frame{display:flex;align-items:center;justify-content:center}.fc .fc-timeline-header-row-chrono .fc-timeline-slot-frame{justify-content:flex-start}.fc .fc-timeline-header-row:last-child .fc-timeline-slot-frame{overflow:hidden}.fc .fc-timeline-slot-cushion{padding:4px 5px;white-space:nowrap}.fc-direction-ltr .fc-timeline-slot{border-right:0!important}.fc-direction-rtl .fc-timeline-slot{border-left:0!important}.fc .fc-timeline-now-indicator-container{position:absolute;z-index:4;top:0;bottom:0;left:0;right:0;width:0}.fc .fc-timeline-now-indicator-arrow,.fc .fc-timeline-now-indicator-line{position:absolute;top:0;border-style:solid;border-color:red;border-color:var(--fc-now-indicator-color,red)}.fc .fc-timeline-now-indicator-arrow{margin:0 -6px;border-width:6px 5px 0;border-left-color:transparent;border-right-color:transparent}.fc .fc-timeline-now-indicator-line{margin:0 -1px;bottom:0;border-width:0 0 0 1px}.fc .fc-timeline-events{position:relative;z-index:3;width:0}.fc .fc-timeline-event-harness,.fc .fc-timeline-more-link{position:absolute;top:0}.fc-timeline-event{z-index:1}.fc-timeline-event.fc-event-mirror{z-index:2}.fc-timeline-event{position:relative;display:flex;align-items:center;border-radius:0;padding:2px 1px;margin-bottom:1px;font-size:.85em;font-size:var(--fc-small-font-size,.85em)}.fc-timeline-event .fc-event-main{flex-grow:1;flex-shrink:1;min-width:0}.fc-timeline-event .fc-event-time{font-weight:700}.fc-timeline-event .fc-event-time,.fc-timeline-event .fc-event-title{white-space:nowrap;padding:0 2px}.fc-direction-ltr .fc-timeline-event.fc-event-end,.fc-direction-ltr .fc-timeline-more-link{margin-right:1px}.fc-direction-rtl .fc-timeline-event.fc-event-end,.fc-direction-rtl .fc-timeline-more-link{margin-left:1px}.fc-timeline-overlap-disabled .fc-timeline-event{padding-top:5px;padding-bottom:5px;margin-bottom:0}.fc-timeline-event:not(.fc-event-end):after,.fc-timeline-event:not(.fc-event-start):before{content:"";flex-grow:0;flex-shrink:0;opacity:.5;width:0;height:0;margin:0 1px;border-color:transparent #000;border-style:solid;border-width:5px}.fc-direction-ltr .fc-timeline-event:not(.fc-event-start):before,.fc-direction-rtl .fc-timeline-event:not(.fc-event-end):after{border-left:0}.fc-direction-ltr .fc-timeline-event:not(.fc-event-end):after,.fc-direction-rtl .fc-timeline-event:not(.fc-event-start):before{border-right:0}.fc-timeline-more-link{font-size:.85em;font-size:var(--fc-small-font-size,.85em);color:inherit;color:var(--fc-more-link-text-color,inherit);background:#d0d0d0;background:var(--fc-more-link-bg-color,#d0d0d0);padding:1px;cursor:pointer}.fc-timeline-more-link-inner{display:inline-block;left:0;right:0;padding:2px}.fc .fc-timeline-bg{position:absolute;z-index:2;top:0;bottom:0;width:0;left:0;right:0}.fc .fc-timeline-bg .fc-non-business{z-index:1}.fc .fc-timeline-bg .fc-bg-event{z-index:2}.fc .fc-timeline-bg .fc-highlight{z-index:3}.fc .fc-timeline-bg-harness{position:absolute;top:0;bottom:0}.fc .fc-resource-timeline-divider{width:3px;cursor:col-resize}.fc .fc-resource-group{font-weight:inherit;text-align:inherit}.fc .fc-resource-timeline .fc-resource-group:not([rowspan]){background:hsla(0,0%,81.6%,.3);background:var(--fc-neutral-bg-color,hsla(0,0%,81.6%,.3))}.fc .fc-timeline-lane-frame{position:relative}.fc .fc-timeline-overlap-enabled .fc-timeline-lane-frame .fc-timeline-events{box-sizing:content-box;padding-bottom:10px}.fc-timeline-body-expandrows td.fc-timeline-lane{position:relative}.fc-timeline-body-expandrows .fc-timeline-lane-frame{position:static}.fc-datagrid-cell-frame-liquid{height:100%}.fc-liquid-hack .fc-datagrid-cell-frame-liquid{height:auto;position:absolute;top:0;right:0;bottom:0;left:0}.fc .fc-datagrid-header .fc-datagrid-cell-frame{position:relative;display:flex;justify-content:flex-start;align-items:center}.fc .fc-datagrid-cell-resizer{position:absolute;z-index:1;top:0;bottom:0;width:5px;cursor:col-resize}.fc .fc-datagrid-cell-cushion{padding:8px;white-space:nowrap;overflow:hidden}.fc .fc-datagrid-expander{cursor:pointer;opacity:.65}.fc .fc-datagrid-expander .fc-icon{display:inline-block;width:1em}.fc .fc-datagrid-expander-placeholder{cursor:auto}.fc .fc-resource-timeline-flat .fc-datagrid-expander-placeholder{display:none}.fc-direction-ltr .fc-datagrid-cell-resizer{right:-3px}.fc-direction-rtl .fc-datagrid-cell-resizer{left:-3px}.fc-direction-ltr .fc-datagrid-expander{margin-right:3px}.fc-direction-rtl .fc-datagrid-expander{margin-left:3px}',
                            ],
                            encapsulation: 2,
                        })),
                        t
                    );
                })(),
                Xo = (() => {
                    class t {
                        static registerPlugins(n) {
                            Co.push(...n);
                        }
                    }
                    return (
                        (t.ɵfac = function (n) {
                            return new (n || t)();
                        }),
                        (t.ɵmod = y.oAB({ type: t })),
                        (t.ɵinj = y.cJS({ imports: [[]] })),
                        t
                    );
                })();
            Ot.touchMouseIgnoreWait = 500;
            var $n = 0,
                Qt = 0,
                er = !1,
                tr = (function () {
                    function t(e) {
                        var n = this;
                        (this.subjectEl = null),
                            (this.selector = ''),
                            (this.handleSelector = ''),
                            (this.shouldIgnoreMove = !1),
                            (this.shouldWatchScroll = !0),
                            (this.isDragging = !1),
                            (this.isTouchDragging = !1),
                            (this.wasTouchScroll = !1),
                            (this.handleMouseDown = function (r) {
                                if (
                                    !n.shouldIgnoreMouse() &&
                                    (function Bf(t) {
                                        return 0 === t.button && !t.ctrlKey;
                                    })(r) &&
                                    n.tryStart(r)
                                ) {
                                    var i = n.createEventFromMouse(r, !0);
                                    n.emitter.trigger('pointerdown', i),
                                        n.initScrollWatch(i),
                                        n.shouldIgnoreMove ||
                                            document.addEventListener(
                                                'mousemove',
                                                n.handleMouseMove
                                            ),
                                        document.addEventListener(
                                            'mouseup',
                                            n.handleMouseUp
                                        );
                                }
                            }),
                            (this.handleMouseMove = function (r) {
                                var i = n.createEventFromMouse(r);
                                n.recordCoords(i),
                                    n.emitter.trigger('pointermove', i);
                            }),
                            (this.handleMouseUp = function (r) {
                                document.removeEventListener(
                                    'mousemove',
                                    n.handleMouseMove
                                ),
                                    document.removeEventListener(
                                        'mouseup',
                                        n.handleMouseUp
                                    ),
                                    n.emitter.trigger(
                                        'pointerup',
                                        n.createEventFromMouse(r)
                                    ),
                                    n.cleanup();
                            }),
                            (this.handleTouchStart = function (r) {
                                if (n.tryStart(r)) {
                                    n.isTouchDragging = !0;
                                    var i = n.createEventFromTouch(r, !0);
                                    n.emitter.trigger('pointerdown', i),
                                        n.initScrollWatch(i);
                                    var o = r.target;
                                    n.shouldIgnoreMove ||
                                        o.addEventListener(
                                            'touchmove',
                                            n.handleTouchMove
                                        ),
                                        o.addEventListener(
                                            'touchend',
                                            n.handleTouchEnd
                                        ),
                                        o.addEventListener(
                                            'touchcancel',
                                            n.handleTouchEnd
                                        ),
                                        window.addEventListener(
                                            'scroll',
                                            n.handleTouchScroll,
                                            !0
                                        );
                                }
                            }),
                            (this.handleTouchMove = function (r) {
                                var i = n.createEventFromTouch(r);
                                n.recordCoords(i),
                                    n.emitter.trigger('pointermove', i);
                            }),
                            (this.handleTouchEnd = function (r) {
                                if (n.isDragging) {
                                    var i = r.target;
                                    i.removeEventListener(
                                        'touchmove',
                                        n.handleTouchMove
                                    ),
                                        i.removeEventListener(
                                            'touchend',
                                            n.handleTouchEnd
                                        ),
                                        i.removeEventListener(
                                            'touchcancel',
                                            n.handleTouchEnd
                                        ),
                                        window.removeEventListener(
                                            'scroll',
                                            n.handleTouchScroll,
                                            !0
                                        ),
                                        n.emitter.trigger(
                                            'pointerup',
                                            n.createEventFromTouch(r)
                                        ),
                                        n.cleanup(),
                                        (n.isTouchDragging = !1),
                                        (function Hf() {
                                            ($n += 1),
                                                setTimeout(function () {
                                                    $n -= 1;
                                                }, Ot.touchMouseIgnoreWait);
                                        })();
                                }
                            }),
                            (this.handleTouchScroll = function () {
                                n.wasTouchScroll = !0;
                            }),
                            (this.handleScroll = function (r) {
                                if (!n.shouldIgnoreMove) {
                                    var i =
                                            window.pageXOffset -
                                            n.prevScrollX +
                                            n.prevPageX,
                                        o =
                                            window.pageYOffset -
                                            n.prevScrollY +
                                            n.prevPageY;
                                    n.emitter.trigger('pointermove', {
                                        origEvent: r,
                                        isTouch: n.isTouchDragging,
                                        subjectEl: n.subjectEl,
                                        pageX: i,
                                        pageY: o,
                                        deltaX: i - n.origPageX,
                                        deltaY: o - n.origPageY,
                                    });
                                }
                            }),
                            (this.containerEl = e),
                            (this.emitter = new Pt()),
                            e.addEventListener(
                                'mousedown',
                                this.handleMouseDown
                            ),
                            e.addEventListener(
                                'touchstart',
                                this.handleTouchStart,
                                { passive: !0 }
                            ),
                            (function Of() {
                                1 === (Qt += 1) &&
                                    window.addEventListener('touchmove', Ko, {
                                        passive: !1,
                                    });
                            })();
                    }
                    return (
                        (t.prototype.destroy = function () {
                            this.containerEl.removeEventListener(
                                'mousedown',
                                this.handleMouseDown
                            ),
                                this.containerEl.removeEventListener(
                                    'touchstart',
                                    this.handleTouchStart,
                                    { passive: !0 }
                                ),
                                (function zf() {
                                    (Qt -= 1) ||
                                        window.removeEventListener(
                                            'touchmove',
                                            Ko,
                                            { passive: !1 }
                                        );
                                })();
                        }),
                        (t.prototype.tryStart = function (e) {
                            var n = this.querySubjectEl(e);
                            return !(
                                !n ||
                                (this.handleSelector &&
                                    !W(e.target, this.handleSelector)) ||
                                ((this.subjectEl = n),
                                (this.isDragging = !0),
                                (this.wasTouchScroll = !1),
                                0)
                            );
                        }),
                        (t.prototype.cleanup = function () {
                            (er = !1),
                                (this.isDragging = !1),
                                (this.subjectEl = null),
                                this.destroyScrollWatch();
                        }),
                        (t.prototype.querySubjectEl = function (e) {
                            return this.selector
                                ? W(e.target, this.selector)
                                : this.containerEl;
                        }),
                        (t.prototype.shouldIgnoreMouse = function () {
                            return $n || this.isTouchDragging;
                        }),
                        (t.prototype.cancelTouchScroll = function () {
                            this.isDragging && (er = !0);
                        }),
                        (t.prototype.initScrollWatch = function (e) {
                            this.shouldWatchScroll &&
                                (this.recordCoords(e),
                                window.addEventListener(
                                    'scroll',
                                    this.handleScroll,
                                    !0
                                ));
                        }),
                        (t.prototype.recordCoords = function (e) {
                            this.shouldWatchScroll &&
                                ((this.prevPageX = e.pageX),
                                (this.prevPageY = e.pageY),
                                (this.prevScrollX = window.pageXOffset),
                                (this.prevScrollY = window.pageYOffset));
                        }),
                        (t.prototype.destroyScrollWatch = function () {
                            this.shouldWatchScroll &&
                                window.removeEventListener(
                                    'scroll',
                                    this.handleScroll,
                                    !0
                                );
                        }),
                        (t.prototype.createEventFromMouse = function (e, n) {
                            var r = 0,
                                i = 0;
                            return (
                                n
                                    ? ((this.origPageX = e.pageX),
                                      (this.origPageY = e.pageY))
                                    : ((r = e.pageX - this.origPageX),
                                      (i = e.pageY - this.origPageY)),
                                {
                                    origEvent: e,
                                    isTouch: !1,
                                    subjectEl: this.subjectEl,
                                    pageX: e.pageX,
                                    pageY: e.pageY,
                                    deltaX: r,
                                    deltaY: i,
                                }
                            );
                        }),
                        (t.prototype.createEventFromTouch = function (e, n) {
                            var i,
                                o,
                                r = e.touches,
                                a = 0,
                                s = 0;
                            return (
                                r && r.length
                                    ? ((i = r[0].pageX), (o = r[0].pageY))
                                    : ((i = e.pageX), (o = e.pageY)),
                                n
                                    ? ((this.origPageX = i),
                                      (this.origPageY = o))
                                    : ((a = i - this.origPageX),
                                      (s = o - this.origPageY)),
                                {
                                    origEvent: e,
                                    isTouch: !0,
                                    subjectEl: this.subjectEl,
                                    pageX: i,
                                    pageY: o,
                                    deltaX: a,
                                    deltaY: s,
                                }
                            );
                        }),
                        t
                    );
                })();
            function Ko(t) {
                er && t.preventDefault();
            }
            var Ff = (function () {
                    function t() {
                        (this.isVisible = !1),
                            (this.sourceEl = null),
                            (this.mirrorEl = null),
                            (this.sourceElRect = null),
                            (this.parentNode = document.body),
                            (this.zIndex = 9999),
                            (this.revertDuration = 0);
                    }
                    return (
                        (t.prototype.start = function (e, n, r) {
                            (this.sourceEl = e),
                                (this.sourceElRect =
                                    this.sourceEl.getBoundingClientRect()),
                                (this.origScreenX = n - window.pageXOffset),
                                (this.origScreenY = r - window.pageYOffset),
                                (this.deltaX = 0),
                                (this.deltaY = 0),
                                this.updateElPosition();
                        }),
                        (t.prototype.handleMove = function (e, n) {
                            (this.deltaX =
                                e - window.pageXOffset - this.origScreenX),
                                (this.deltaY =
                                    n - window.pageYOffset - this.origScreenY),
                                this.updateElPosition();
                        }),
                        (t.prototype.setIsVisible = function (e) {
                            e
                                ? this.isVisible ||
                                  (this.mirrorEl &&
                                      (this.mirrorEl.style.display = ''),
                                  (this.isVisible = e),
                                  this.updateElPosition())
                                : this.isVisible &&
                                  (this.mirrorEl &&
                                      (this.mirrorEl.style.display = 'none'),
                                  (this.isVisible = e));
                        }),
                        (t.prototype.stop = function (e, n) {
                            var r = this,
                                i = function () {
                                    r.cleanup(), n();
                                };
                            e &&
                            this.mirrorEl &&
                            this.isVisible &&
                            this.revertDuration &&
                            (this.deltaX || this.deltaY)
                                ? this.doRevertAnimation(i, this.revertDuration)
                                : setTimeout(i, 0);
                        }),
                        (t.prototype.doRevertAnimation = function (e, n) {
                            var r = this.mirrorEl,
                                i = this.sourceEl.getBoundingClientRect();
                            (r.style.transition =
                                'top ' + n + 'ms,left ' + n + 'ms'),
                                Ye(r, { left: i.left, top: i.top }),
                                (function ms(t, e) {
                                    var n = function (r) {
                                        e(r),
                                            li.forEach(function (i) {
                                                t.removeEventListener(i, n);
                                            });
                                    };
                                    li.forEach(function (r) {
                                        t.addEventListener(r, n);
                                    });
                                })(r, function () {
                                    (r.style.transition = ''), e();
                                });
                        }),
                        (t.prototype.cleanup = function () {
                            this.mirrorEl &&
                                (tn(this.mirrorEl), (this.mirrorEl = null)),
                                (this.sourceEl = null);
                        }),
                        (t.prototype.updateElPosition = function () {
                            this.sourceEl &&
                                this.isVisible &&
                                Ye(this.getMirrorEl(), {
                                    left: this.sourceElRect.left + this.deltaX,
                                    top: this.sourceElRect.top + this.deltaY,
                                });
                        }),
                        (t.prototype.getMirrorEl = function () {
                            var e = this.sourceElRect,
                                n = this.mirrorEl;
                            return (
                                n ||
                                    ((n = this.mirrorEl =
                                        this.sourceEl.cloneNode(
                                            !0
                                        )).classList.add('fc-unselectable'),
                                    n.classList.add('fc-event-dragging'),
                                    Ye(n, {
                                        position: 'fixed',
                                        zIndex: this.zIndex,
                                        visibility: '',
                                        boxSizing: 'border-box',
                                        width: e.right - e.left,
                                        height: e.bottom - e.top,
                                        right: 'auto',
                                        bottom: 'auto',
                                        margin: 0,
                                    }),
                                    this.parentNode.appendChild(n)),
                                n
                            );
                        }),
                        t
                    );
                })(),
                $o = (function (t) {
                    function e(n, r) {
                        var i = t.call(this) || this;
                        return (
                            (i.handleScroll = function () {
                                (i.scrollTop =
                                    i.scrollController.getScrollTop()),
                                    (i.scrollLeft =
                                        i.scrollController.getScrollLeft()),
                                    i.handleScrollChange();
                            }),
                            (i.scrollController = n),
                            (i.doesListening = r),
                            (i.scrollTop = i.origScrollTop = n.getScrollTop()),
                            (i.scrollLeft = i.origScrollLeft =
                                n.getScrollLeft()),
                            (i.scrollWidth = n.getScrollWidth()),
                            (i.scrollHeight = n.getScrollHeight()),
                            (i.clientWidth = n.getClientWidth()),
                            (i.clientHeight = n.getClientHeight()),
                            (i.clientRect = i.computeClientRect()),
                            i.doesListening &&
                                i
                                    .getEventTarget()
                                    .addEventListener('scroll', i.handleScroll),
                            i
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.destroy = function () {
                            this.doesListening &&
                                this.getEventTarget().removeEventListener(
                                    'scroll',
                                    this.handleScroll
                                );
                        }),
                        (e.prototype.getScrollTop = function () {
                            return this.scrollTop;
                        }),
                        (e.prototype.getScrollLeft = function () {
                            return this.scrollLeft;
                        }),
                        (e.prototype.setScrollTop = function (n) {
                            this.scrollController.setScrollTop(n),
                                this.doesListening ||
                                    ((this.scrollTop = Math.max(
                                        Math.min(n, this.getMaxScrollTop()),
                                        0
                                    )),
                                    this.handleScrollChange());
                        }),
                        (e.prototype.setScrollLeft = function (n) {
                            this.scrollController.setScrollLeft(n),
                                this.doesListening ||
                                    ((this.scrollLeft = Math.max(
                                        Math.min(n, this.getMaxScrollLeft()),
                                        0
                                    )),
                                    this.handleScrollChange());
                        }),
                        (e.prototype.getClientWidth = function () {
                            return this.clientWidth;
                        }),
                        (e.prototype.getClientHeight = function () {
                            return this.clientHeight;
                        }),
                        (e.prototype.getScrollWidth = function () {
                            return this.scrollWidth;
                        }),
                        (e.prototype.getScrollHeight = function () {
                            return this.scrollHeight;
                        }),
                        (e.prototype.handleScrollChange = function () {}),
                        e
                    );
                })(Mn),
                ea = (function (t) {
                    function e(n, r) {
                        return t.call(this, new Cc(n), r) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.getEventTarget = function () {
                            return this.scrollController.el;
                        }),
                        (e.prototype.computeClientRect = function () {
                            return yc(this.scrollController.el);
                        }),
                        e
                    );
                })($o),
                Uf = (function (t) {
                    function e(n) {
                        return t.call(this, new Sc(), n) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.getEventTarget = function () {
                            return window;
                        }),
                        (e.prototype.computeClientRect = function () {
                            return {
                                left: this.scrollLeft,
                                right: this.scrollLeft + this.clientWidth,
                                top: this.scrollTop,
                                bottom: this.scrollTop + this.clientHeight,
                            };
                        }),
                        (e.prototype.handleScrollChange = function () {
                            this.clientRect = this.computeClientRect();
                        }),
                        e
                    );
                })($o),
                ta =
                    'function' == typeof performance
                        ? performance.now
                        : Date.now,
                Lf = (function () {
                    function t() {
                        var e = this;
                        (this.isEnabled = !0),
                            (this.scrollQuery = [window, '.fc-scroller']),
                            (this.edgeThreshold = 50),
                            (this.maxVelocity = 300),
                            (this.pointerScreenX = null),
                            (this.pointerScreenY = null),
                            (this.isAnimating = !1),
                            (this.scrollCaches = null),
                            (this.everMovedUp = !1),
                            (this.everMovedDown = !1),
                            (this.everMovedLeft = !1),
                            (this.everMovedRight = !1),
                            (this.animate = function () {
                                if (e.isAnimating) {
                                    var n = e.computeBestEdge(
                                        e.pointerScreenX + window.pageXOffset,
                                        e.pointerScreenY + window.pageYOffset
                                    );
                                    if (n) {
                                        var r = ta();
                                        e.handleSide(
                                            n,
                                            (r - e.msSinceRequest) / 1e3
                                        ),
                                            e.requestAnimation(r);
                                    } else e.isAnimating = !1;
                                }
                            });
                    }
                    return (
                        (t.prototype.start = function (e, n, r) {
                            this.isEnabled &&
                                ((this.scrollCaches = this.buildCaches(r)),
                                (this.pointerScreenX = null),
                                (this.pointerScreenY = null),
                                (this.everMovedUp = !1),
                                (this.everMovedDown = !1),
                                (this.everMovedLeft = !1),
                                (this.everMovedRight = !1),
                                this.handleMove(e, n));
                        }),
                        (t.prototype.handleMove = function (e, n) {
                            if (this.isEnabled) {
                                var r = e - window.pageXOffset,
                                    i = n - window.pageYOffset,
                                    o =
                                        null === this.pointerScreenY
                                            ? 0
                                            : i - this.pointerScreenY,
                                    a =
                                        null === this.pointerScreenX
                                            ? 0
                                            : r - this.pointerScreenX;
                                o < 0
                                    ? (this.everMovedUp = !0)
                                    : o > 0 && (this.everMovedDown = !0),
                                    a < 0
                                        ? (this.everMovedLeft = !0)
                                        : a > 0 && (this.everMovedRight = !0),
                                    (this.pointerScreenX = r),
                                    (this.pointerScreenY = i),
                                    this.isAnimating ||
                                        ((this.isAnimating = !0),
                                        this.requestAnimation(ta()));
                            }
                        }),
                        (t.prototype.stop = function () {
                            if (this.isEnabled) {
                                this.isAnimating = !1;
                                for (
                                    var e = 0, n = this.scrollCaches;
                                    e < n.length;
                                    e++
                                )
                                    n[e].destroy();
                                this.scrollCaches = null;
                            }
                        }),
                        (t.prototype.requestAnimation = function (e) {
                            (this.msSinceRequest = e),
                                requestAnimationFrame(this.animate);
                        }),
                        (t.prototype.handleSide = function (e, n) {
                            var r = e.scrollCache,
                                i = this.edgeThreshold,
                                o = i - e.distance,
                                a = ((o * o) / (i * i)) * this.maxVelocity * n,
                                s = 1;
                            switch (e.name) {
                                case 'left':
                                    s = -1;
                                case 'right':
                                    r.setScrollLeft(r.getScrollLeft() + a * s);
                                    break;
                                case 'top':
                                    s = -1;
                                case 'bottom':
                                    r.setScrollTop(r.getScrollTop() + a * s);
                            }
                        }),
                        (t.prototype.computeBestEdge = function (e, n) {
                            for (
                                var r = this.edgeThreshold,
                                    i = null,
                                    o = 0,
                                    a = this.scrollCaches;
                                o < a.length;
                                o++
                            ) {
                                var s = a[o],
                                    l = s.clientRect,
                                    c = e - l.left,
                                    d = l.right - e,
                                    f = n - l.top,
                                    p = l.bottom - n;
                                c >= 0 &&
                                    d >= 0 &&
                                    f >= 0 &&
                                    p >= 0 &&
                                    (f <= r &&
                                        this.everMovedUp &&
                                        s.canScrollUp() &&
                                        (!i || i.distance > f) &&
                                        (i = {
                                            scrollCache: s,
                                            name: 'top',
                                            distance: f,
                                        }),
                                    p <= r &&
                                        this.everMovedDown &&
                                        s.canScrollDown() &&
                                        (!i || i.distance > p) &&
                                        (i = {
                                            scrollCache: s,
                                            name: 'bottom',
                                            distance: p,
                                        }),
                                    c <= r &&
                                        this.everMovedLeft &&
                                        s.canScrollLeft() &&
                                        (!i || i.distance > c) &&
                                        (i = {
                                            scrollCache: s,
                                            name: 'left',
                                            distance: c,
                                        }),
                                    d <= r &&
                                        this.everMovedRight &&
                                        s.canScrollRight() &&
                                        (!i || i.distance > d) &&
                                        (i = {
                                            scrollCache: s,
                                            name: 'right',
                                            distance: d,
                                        }));
                            }
                            return i;
                        }),
                        (t.prototype.buildCaches = function (e) {
                            return this.queryScrollEls(e).map(function (n) {
                                return n === window
                                    ? new Uf(!1)
                                    : new ea(n, !1);
                            });
                        }),
                        (t.prototype.queryScrollEls = function (e) {
                            for (
                                var n = [], r = 0, i = this.scrollQuery;
                                r < i.length;
                                r++
                            ) {
                                var o = i[r];
                                'object' == typeof o
                                    ? n.push(o)
                                    : n.push.apply(
                                          n,
                                          Array.prototype.slice.call(
                                              oi(e).querySelectorAll(o)
                                          )
                                      );
                            }
                            return n;
                        }),
                        t
                    );
                })(),
                Fe = (function (t) {
                    function e(n, r) {
                        var i = t.call(this, n) || this;
                        (i.containerEl = n),
                            (i.delay = null),
                            (i.minDistance = 0),
                            (i.touchScrollAllowed = !0),
                            (i.mirrorNeedsRevert = !1),
                            (i.isInteracting = !1),
                            (i.isDragging = !1),
                            (i.isDelayEnded = !1),
                            (i.isDistanceSurpassed = !1),
                            (i.delayTimeoutId = null),
                            (i.onPointerDown = function (a) {
                                i.isDragging ||
                                    ((i.isInteracting = !0),
                                    (i.isDelayEnded = !1),
                                    (i.isDistanceSurpassed = !1),
                                    (function ys(t) {
                                        t.classList.add('fc-unselectable'),
                                            t.addEventListener(
                                                'selectstart',
                                                pt
                                            );
                                    })(document.body),
                                    (function As(t) {
                                        t.addEventListener('contextmenu', pt);
                                    })(document.body),
                                    a.isTouch || a.origEvent.preventDefault(),
                                    i.emitter.trigger('pointerdown', a),
                                    i.isInteracting &&
                                        !i.pointer.shouldIgnoreMove &&
                                        (i.mirror.setIsVisible(!1),
                                        i.mirror.start(
                                            a.subjectEl,
                                            a.pageX,
                                            a.pageY
                                        ),
                                        i.startDelay(a),
                                        i.minDistance ||
                                            i.handleDistanceSurpassed(a)));
                            }),
                            (i.onPointerMove = function (a) {
                                if (i.isInteracting) {
                                    if (
                                        (i.emitter.trigger('pointermove', a),
                                        !i.isDistanceSurpassed)
                                    ) {
                                        var s = i.minDistance,
                                            c = a.deltaX,
                                            d = a.deltaY;
                                        c * c + d * d >= s * s &&
                                            i.handleDistanceSurpassed(a);
                                    }
                                    i.isDragging &&
                                        ('scroll' !== a.origEvent.type &&
                                            (i.mirror.handleMove(
                                                a.pageX,
                                                a.pageY
                                            ),
                                            i.autoScroller.handleMove(
                                                a.pageX,
                                                a.pageY
                                            )),
                                        i.emitter.trigger('dragmove', a));
                                }
                            }),
                            (i.onPointerUp = function (a) {
                                i.isInteracting &&
                                    ((i.isInteracting = !1),
                                    (function bs(t) {
                                        t.classList.remove('fc-unselectable'),
                                            t.removeEventListener(
                                                'selectstart',
                                                pt
                                            );
                                    })(document.body),
                                    (function Es(t) {
                                        t.removeEventListener(
                                            'contextmenu',
                                            pt
                                        );
                                    })(document.body),
                                    i.emitter.trigger('pointerup', a),
                                    i.isDragging &&
                                        (i.autoScroller.stop(),
                                        i.tryStopDrag(a)),
                                    i.delayTimeoutId &&
                                        (clearTimeout(i.delayTimeoutId),
                                        (i.delayTimeoutId = null)));
                            });
                        var o = (i.pointer = new tr(n));
                        return (
                            o.emitter.on('pointerdown', i.onPointerDown),
                            o.emitter.on('pointermove', i.onPointerMove),
                            o.emitter.on('pointerup', i.onPointerUp),
                            r && (o.selector = r),
                            (i.mirror = new Ff()),
                            (i.autoScroller = new Lf()),
                            i
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.destroy = function () {
                            this.pointer.destroy(), this.onPointerUp({});
                        }),
                        (e.prototype.startDelay = function (n) {
                            var r = this;
                            'number' == typeof this.delay
                                ? (this.delayTimeoutId = setTimeout(
                                      function () {
                                          (r.delayTimeoutId = null),
                                              r.handleDelayEnd(n);
                                      },
                                      this.delay
                                  ))
                                : this.handleDelayEnd(n);
                        }),
                        (e.prototype.handleDelayEnd = function (n) {
                            (this.isDelayEnded = !0), this.tryStartDrag(n);
                        }),
                        (e.prototype.handleDistanceSurpassed = function (n) {
                            (this.isDistanceSurpassed = !0),
                                this.tryStartDrag(n);
                        }),
                        (e.prototype.tryStartDrag = function (n) {
                            this.isDelayEnded &&
                                this.isDistanceSurpassed &&
                                (!this.pointer.wasTouchScroll ||
                                    this.touchScrollAllowed) &&
                                ((this.isDragging = !0),
                                (this.mirrorNeedsRevert = !1),
                                this.autoScroller.start(
                                    n.pageX,
                                    n.pageY,
                                    this.containerEl
                                ),
                                this.emitter.trigger('dragstart', n),
                                !1 === this.touchScrollAllowed &&
                                    this.pointer.cancelTouchScroll());
                        }),
                        (e.prototype.tryStopDrag = function (n) {
                            this.mirror.stop(
                                this.mirrorNeedsRevert,
                                this.stopDrag.bind(this, n)
                            );
                        }),
                        (e.prototype.stopDrag = function (n) {
                            (this.isDragging = !1),
                                this.emitter.trigger('dragend', n);
                        }),
                        (e.prototype.setIgnoreMove = function (n) {
                            this.pointer.shouldIgnoreMove = n;
                        }),
                        (e.prototype.setMirrorIsVisible = function (n) {
                            this.mirror.setIsVisible(n);
                        }),
                        (e.prototype.setMirrorNeedsRevert = function (n) {
                            this.mirrorNeedsRevert = n;
                        }),
                        (e.prototype.setAutoScrollEnabled = function (n) {
                            this.autoScroller.isEnabled = n;
                        }),
                        e
                    );
                })(Ro),
                Qf = (function () {
                    function t(e) {
                        (this.origRect = _n(e)),
                            (this.scrollCaches = io(e).map(function (n) {
                                return new ea(n, !0);
                            }));
                    }
                    return (
                        (t.prototype.destroy = function () {
                            for (
                                var e = 0, n = this.scrollCaches;
                                e < n.length;
                                e++
                            )
                                n[e].destroy();
                        }),
                        (t.prototype.computeLeft = function () {
                            for (
                                var e = this.origRect.left,
                                    n = 0,
                                    r = this.scrollCaches;
                                n < r.length;
                                n++
                            ) {
                                var i = r[n];
                                e += i.origScrollLeft - i.getScrollLeft();
                            }
                            return e;
                        }),
                        (t.prototype.computeTop = function () {
                            for (
                                var e = this.origRect.top,
                                    n = 0,
                                    r = this.scrollCaches;
                                n < r.length;
                                n++
                            ) {
                                var i = r[n];
                                e += i.origScrollTop - i.getScrollTop();
                            }
                            return e;
                        }),
                        (t.prototype.isWithinClipping = function (e, n) {
                            for (
                                var r = { left: e, top: n },
                                    i = 0,
                                    o = this.scrollCaches;
                                i < o.length;
                                i++
                            ) {
                                var a = o[i];
                                if (
                                    !Wf(a.getEventTarget()) &&
                                    !ic(r, a.clientRect)
                                )
                                    return !1;
                            }
                            return !0;
                        }),
                        t
                    );
                })();
            function Wf(t) {
                var e = t.tagName;
                return 'HTML' === e || 'BODY' === e;
            }
            var nt = (function () {
                function t(e, n) {
                    var r = this;
                    (this.useSubjectCenter = !1),
                        (this.requireInitial = !0),
                        (this.initialHit = null),
                        (this.movingHit = null),
                        (this.finalHit = null),
                        (this.handlePointerDown = function (i) {
                            var o = r.dragging;
                            (r.initialHit = null),
                                (r.movingHit = null),
                                (r.finalHit = null),
                                r.prepareHits(),
                                r.processFirstCoord(i),
                                r.initialHit || !r.requireInitial
                                    ? (o.setIgnoreMove(!1),
                                      r.emitter.trigger('pointerdown', i))
                                    : o.setIgnoreMove(!0);
                        }),
                        (this.handleDragStart = function (i) {
                            r.emitter.trigger('dragstart', i),
                                r.handleMove(i, !0);
                        }),
                        (this.handleDragMove = function (i) {
                            r.emitter.trigger('dragmove', i), r.handleMove(i);
                        }),
                        (this.handlePointerUp = function (i) {
                            r.releaseHits(), r.emitter.trigger('pointerup', i);
                        }),
                        (this.handleDragEnd = function (i) {
                            r.movingHit &&
                                r.emitter.trigger('hitupdate', null, !0, i),
                                (r.finalHit = r.movingHit),
                                (r.movingHit = null),
                                r.emitter.trigger('dragend', i);
                        }),
                        (this.droppableStore = n),
                        e.emitter.on('pointerdown', this.handlePointerDown),
                        e.emitter.on('dragstart', this.handleDragStart),
                        e.emitter.on('dragmove', this.handleDragMove),
                        e.emitter.on('pointerup', this.handlePointerUp),
                        e.emitter.on('dragend', this.handleDragEnd),
                        (this.dragging = e),
                        (this.emitter = new Pt());
                }
                return (
                    (t.prototype.processFirstCoord = function (e) {
                        var o,
                            n = { left: e.pageX, top: e.pageY },
                            r = n,
                            i = e.subjectEl;
                        i instanceof HTMLElement &&
                            (r = (function oc(t, e) {
                                return {
                                    left: Math.min(
                                        Math.max(t.left, e.left),
                                        e.right
                                    ),
                                    top: Math.min(
                                        Math.max(t.top, e.top),
                                        e.bottom
                                    ),
                                };
                            })(r, (o = _n(i))));
                        var a = (this.initialHit = this.queryHitForOffset(
                            r.left,
                            r.top
                        ));
                        if (a) {
                            if (this.useSubjectCenter && o) {
                                var s = eo(o, a.rect);
                                s &&
                                    (r = (function ac(t) {
                                        return {
                                            left: (t.left + t.right) / 2,
                                            top: (t.top + t.bottom) / 2,
                                        };
                                    })(s));
                            }
                            this.coordAdjust = (function sc(t, e) {
                                return {
                                    left: t.left - e.left,
                                    top: t.top - e.top,
                                };
                            })(r, n);
                        } else this.coordAdjust = { left: 0, top: 0 };
                    }),
                    (t.prototype.handleMove = function (e, n) {
                        var r = this.queryHitForOffset(
                            e.pageX + this.coordAdjust.left,
                            e.pageY + this.coordAdjust.top
                        );
                        (n || !Wt(this.movingHit, r)) &&
                            ((this.movingHit = r),
                            this.emitter.trigger('hitupdate', r, !1, e));
                    }),
                    (t.prototype.prepareHits = function () {
                        this.offsetTrackers = oe(
                            this.droppableStore,
                            function (e) {
                                return e.component.prepareHits(), new Qf(e.el);
                            }
                        );
                    }),
                    (t.prototype.releaseHits = function () {
                        var e = this.offsetTrackers;
                        for (var n in e) e[n].destroy();
                        this.offsetTrackers = {};
                    }),
                    (t.prototype.queryHitForOffset = function (e, n) {
                        var i = this.droppableStore,
                            o = this.offsetTrackers,
                            a = null;
                        for (var s in i) {
                            var l = i[s].component,
                                c = o[s];
                            if (c && c.isWithinClipping(e, n)) {
                                var d = c.computeLeft(),
                                    f = c.computeTop(),
                                    p = e - d,
                                    v = n - f,
                                    g = c.origRect,
                                    b = g.right - g.left,
                                    E = g.bottom - g.top;
                                if (p >= 0 && p < b && v >= 0 && v < E) {
                                    var m = l.queryHit(p, v, b, E);
                                    m &&
                                        Mt(
                                            m.dateProfile.activeRange,
                                            m.dateSpan.range
                                        ) &&
                                        (!a || m.layer > a.layer) &&
                                        ((m.componentId = s),
                                        (m.context = l.context),
                                        (m.rect.left += d),
                                        (m.rect.right += d),
                                        (m.rect.top += f),
                                        (m.rect.bottom += f),
                                        (a = m));
                                }
                            }
                        }
                        return a;
                    }),
                    t
                );
            })();
            function Wt(t, e) {
                return (
                    (!t && !e) ||
                    (Boolean(t) === Boolean(e) &&
                        (function Pl(t, e) {
                            return (
                                (function Dl(t, e) {
                                    return (
                                        (null === t.start
                                            ? null
                                            : t.start.valueOf()) ===
                                            (null === e.start
                                                ? null
                                                : e.start.valueOf()) &&
                                        (null === t.end
                                            ? null
                                            : t.end.valueOf()) ===
                                            (null === e.end
                                                ? null
                                                : e.end.valueOf())
                                    );
                                })(t.range, e.range) &&
                                t.allDay === e.allDay &&
                                (function Bl(t, e) {
                                    for (var n in e)
                                        if (
                                            'range' !== n &&
                                            'allDay' !== n &&
                                            t[n] !== e[n]
                                        )
                                            return !1;
                                    for (var n in t) if (!(n in e)) return !1;
                                    return !0;
                                })(t, e)
                            );
                        })(t.dateSpan, e.dateSpan))
                );
            }
            function nr(t, e) {
                for (
                    var n = {}, r = 0, i = e.pluginHooks.datePointTransforms;
                    r < i.length;
                    r++
                )
                    (0, u.pi)(n, (0, i[r])(t, e));
                return (
                    (0, u.pi)(
                        n,
                        (function Vf(t, e) {
                            return {
                                date: e.toDate(t.range.start),
                                dateStr: e.formatIso(t.range.start, {
                                    omitTime: t.allDay,
                                }),
                                allDay: t.allDay,
                            };
                        })(t, e.dateEnv)
                    ),
                    n
                );
            }
            var Gf = (function (t) {
                    function e(n) {
                        var r = t.call(this, n) || this;
                        (r.handlePointerDown = function (o) {
                            r.dragging.setIgnoreMove(
                                !r.component.isValidDateDownEl(
                                    o.origEvent.target
                                )
                            );
                        }),
                            (r.handleDragEnd = function (o) {
                                var a = r.component;
                                if (!r.dragging.pointer.wasTouchScroll) {
                                    var l = r.hitDragging,
                                        c = l.initialHit,
                                        d = l.finalHit;
                                    if (c && d && Wt(c, d)) {
                                        var f = a.context,
                                            p = (0, u.pi)(
                                                (0, u.pi)(
                                                    {},
                                                    nr(c.dateSpan, f)
                                                ),
                                                {
                                                    dayEl: c.dayEl,
                                                    jsEvent: o.origEvent,
                                                    view:
                                                        f.viewApi ||
                                                        f.calendarApi.view,
                                                }
                                            );
                                        f.emitter.trigger('dateClick', p);
                                    }
                                }
                            }),
                            (r.dragging = new Fe(n.el)),
                            (r.dragging.autoScroller.isEnabled = !1);
                        var i = (r.hitDragging = new nt(r.dragging, Ln(n)));
                        return (
                            i.emitter.on('pointerdown', r.handlePointerDown),
                            i.emitter.on('dragend', r.handleDragEnd),
                            r
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.destroy = function () {
                            this.dragging.destroy();
                        }),
                        e
                    );
                })(ze),
                Zf = (function (t) {
                    function e(n) {
                        var r = t.call(this, n) || this;
                        (r.dragSelection = null),
                            (r.handlePointerDown = function (l) {
                                var d = r.component,
                                    f = r.dragging,
                                    v =
                                        d.context.options.selectable &&
                                        d.isValidDateDownEl(l.origEvent.target);
                                f.setIgnoreMove(!v),
                                    (f.delay = l.isTouch
                                        ? (function jf(t) {
                                              var e = t.context.options,
                                                  n = e.selectLongPressDelay;
                                              return (
                                                  null == n &&
                                                      (n = e.longPressDelay),
                                                  n
                                              );
                                          })(d)
                                        : null);
                            }),
                            (r.handleDragStart = function (l) {
                                r.component.context.calendarApi.unselect(l);
                            }),
                            (r.handleHitUpdate = function (l, c) {
                                var d = r.component.context,
                                    f = null,
                                    p = !1;
                                if (l) {
                                    var v = r.hitDragging.initialHit;
                                    (l.componentId === v.componentId &&
                                        r.isHitComboAllowed &&
                                        !r.isHitComboAllowed(v, l)) ||
                                        (f = (function Yf(t, e, n) {
                                            var r = t.dateSpan,
                                                i = e.dateSpan,
                                                o = [
                                                    r.range.start,
                                                    r.range.end,
                                                    i.range.start,
                                                    i.range.end,
                                                ];
                                            o.sort(xs);
                                            for (
                                                var a = {}, s = 0, l = n;
                                                s < l.length;
                                                s++
                                            ) {
                                                var d = (0, l[s])(t, e);
                                                if (!1 === d) return null;
                                                d && (0, u.pi)(a, d);
                                            }
                                            return (
                                                (a.range = {
                                                    start: o[0],
                                                    end: o[3],
                                                }),
                                                (a.allDay = r.allDay),
                                                a
                                            );
                                        })(
                                            v,
                                            l,
                                            d.pluginHooks
                                                .dateSelectionTransformers
                                        )),
                                        (!f ||
                                            !(function rf(t, e, n) {
                                                return (
                                                    !!Mt(
                                                        e.validRange,
                                                        t.range
                                                    ) &&
                                                    Oo({ dateSelection: t }, n)
                                                );
                                            })(f, l.dateProfile, d)) &&
                                            ((p = !0), (f = null));
                                }
                                f
                                    ? d.dispatch({
                                          type: 'SELECT_DATES',
                                          selection: f,
                                      })
                                    : c ||
                                      d.dispatch({ type: 'UNSELECT_DATES' }),
                                    p ? vt() : ht(),
                                    c || (r.dragSelection = f);
                            }),
                            (r.handlePointerUp = function (l) {
                                r.dragSelection &&
                                    (Wi(
                                        r.dragSelection,
                                        l,
                                        r.component.context
                                    ),
                                    (r.dragSelection = null));
                            });
                        var o = n.component.context.options,
                            a = (r.dragging = new Fe(n.el));
                        (a.touchScrollAllowed = !1),
                            (a.minDistance = o.selectMinDistance || 0),
                            (a.autoScroller.isEnabled = o.dragScroll);
                        var s = (r.hitDragging = new nt(r.dragging, Ln(n)));
                        return (
                            s.emitter.on('pointerdown', r.handlePointerDown),
                            s.emitter.on('dragstart', r.handleDragStart),
                            s.emitter.on('hitupdate', r.handleHitUpdate),
                            s.emitter.on('pointerup', r.handlePointerUp),
                            r
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.destroy = function () {
                            this.dragging.destroy();
                        }),
                        e
                    );
                })(ze),
                na = (function (t) {
                    function e(n) {
                        var r = t.call(this, n) || this;
                        (r.subjectEl = null),
                            (r.subjectSeg = null),
                            (r.isDragging = !1),
                            (r.eventRange = null),
                            (r.relevantEvents = null),
                            (r.receivingContext = null),
                            (r.validMutation = null),
                            (r.mutatedRelevantEvents = null),
                            (r.handlePointerDown = function (l) {
                                var c = l.origEvent.target,
                                    f = r.component,
                                    p = r.dragging,
                                    v = p.mirror,
                                    g = f.context.options,
                                    b = f.context;
                                r.subjectEl = l.subjectEl;
                                var E = (r.subjectSeg = Oe(l.subjectEl)),
                                    w = (r.eventRange = E.eventRange).instance
                                        .instanceId;
                                (r.relevantEvents = pn(
                                    b.getCurrentData().eventStore,
                                    w
                                )),
                                    (p.minDistance = l.isTouch
                                        ? 0
                                        : g.eventDragMinDistance),
                                    (p.delay =
                                        l.isTouch &&
                                        w !== f.props.eventSelection
                                            ? (function Jf(t) {
                                                  var e = t.context.options,
                                                      n = e.eventLongPressDelay;
                                                  return (
                                                      null == n &&
                                                          (n =
                                                              e.longPressDelay),
                                                      n
                                                  );
                                              })(f)
                                            : null),
                                    (v.parentNode = g.fixedMirrorParent
                                        ? g.fixedMirrorParent
                                        : W(c, '.fc')),
                                    (v.revertDuration = g.dragRevertDuration);
                                var C =
                                    f.isValidSegDownEl(c) &&
                                    !W(c, '.fc-event-resizer');
                                p.setIgnoreMove(!C),
                                    (r.isDragging =
                                        C &&
                                        l.subjectEl.classList.contains(
                                            'fc-event-draggable'
                                        ));
                            }),
                            (r.handleDragStart = function (l) {
                                var c = r.component.context,
                                    d = r.eventRange,
                                    f = d.instance.instanceId;
                                l.isTouch
                                    ? f !== r.component.props.eventSelection &&
                                      c.dispatch({
                                          type: 'SELECT_EVENT',
                                          eventInstanceId: f,
                                      })
                                    : c.dispatch({ type: 'UNSELECT_EVENT' }),
                                    r.isDragging &&
                                        (c.calendarApi.unselect(l),
                                        c.emitter.trigger('eventDragStart', {
                                            el: r.subjectEl,
                                            event: new z(c, d.def, d.instance),
                                            jsEvent: l.origEvent,
                                            view: c.viewApi,
                                        }));
                            }),
                            (r.handleHitUpdate = function (l, c) {
                                if (r.isDragging) {
                                    var d = r.relevantEvents,
                                        f = r.hitDragging.initialHit,
                                        p = r.component.context,
                                        v = null,
                                        g = null,
                                        b = null,
                                        E = !1,
                                        m = {
                                            affectedEvents: d,
                                            mutatedEvents: {
                                                defs: {},
                                                instances: {},
                                            },
                                            isEvent: !0,
                                        };
                                    if (l) {
                                        var w = (v = l.context).options;
                                        p === v || (w.editable && w.droppable)
                                            ? ((g = (function qf(t, e, n) {
                                                  var r = t.dateSpan,
                                                      i = e.dateSpan,
                                                      o = r.range.start,
                                                      a = i.range.start,
                                                      s = {};
                                                  r.allDay !== i.allDay &&
                                                      ((s.allDay = i.allDay),
                                                      (s.hasEnd =
                                                          e.context.options.allDayMaintainDuration),
                                                      i.allDay && (o = H(o)));
                                                  var l = Be(
                                                      o,
                                                      a,
                                                      t.context.dateEnv,
                                                      t.componentId ===
                                                          e.componentId
                                                          ? t.largeUnit
                                                          : null
                                                  );
                                                  l.milliseconds &&
                                                      (s.allDay = !1);
                                                  for (
                                                      var c = {
                                                              datesDelta: l,
                                                              standardProps: s,
                                                          },
                                                          d = 0,
                                                          f = n;
                                                      d < f.length;
                                                      d++
                                                  )
                                                      (0, f[d])(c, t, e);
                                                  return c;
                                              })(
                                                  f,
                                                  l,
                                                  v.getCurrentData().pluginHooks
                                                      .eventDragMutationMassagers
                                              )),
                                              g &&
                                                  ((b = Dn(
                                                      d,
                                                      v.getCurrentData()
                                                          .eventUiBases,
                                                      g,
                                                      v
                                                  )),
                                                  (m.mutatedEvents = b),
                                                  Vn(m, l.dateProfile, v) ||
                                                      ((E = !0),
                                                      (g = null),
                                                      (b = null),
                                                      (m.mutatedEvents = {
                                                          defs: {},
                                                          instances: {},
                                                      }))))
                                            : (v = null);
                                    }
                                    r.displayDrag(v, m),
                                        E ? vt() : ht(),
                                        c ||
                                            (p === v && Wt(f, l) && (g = null),
                                            r.dragging.setMirrorNeedsRevert(!g),
                                            r.dragging.setMirrorIsVisible(
                                                !l ||
                                                    !oi(
                                                        r.subjectEl
                                                    ).querySelector(
                                                        '.fc-event-mirror'
                                                    )
                                            ),
                                            (r.receivingContext = v),
                                            (r.validMutation = g),
                                            (r.mutatedRelevantEvents = b));
                                }
                            }),
                            (r.handlePointerUp = function () {
                                r.isDragging || r.cleanup();
                            }),
                            (r.handleDragEnd = function (l) {
                                if (r.isDragging) {
                                    var c = r.component.context,
                                        d = c.viewApi,
                                        p = r.receivingContext,
                                        v = r.validMutation,
                                        g = r.eventRange.def,
                                        b = r.eventRange.instance,
                                        E = new z(c, g, b),
                                        m = r.relevantEvents,
                                        w = r.mutatedRelevantEvents,
                                        C = r.hitDragging.finalHit;
                                    if (
                                        (r.clearDrag(),
                                        c.emitter.trigger('eventDragStop', {
                                            el: r.subjectEl,
                                            event: E,
                                            jsEvent: l.origEvent,
                                            view: d,
                                        }),
                                        v)
                                    ) {
                                        if (p === c) {
                                            var D = new z(
                                                c,
                                                w.defs[g.defId],
                                                b
                                                    ? w.instances[b.instanceId]
                                                    : null
                                            );
                                            c.dispatch({
                                                type: 'MERGE_EVENTS',
                                                eventStore: w,
                                            });
                                            for (
                                                var _ = {
                                                        oldEvent: E,
                                                        event: D,
                                                        relatedEvents: Se(
                                                            w,
                                                            c,
                                                            b
                                                        ),
                                                        revert: function () {
                                                            c.dispatch({
                                                                type: 'MERGE_EVENTS',
                                                                eventStore: m,
                                                            });
                                                        },
                                                    },
                                                    k = {},
                                                    P = 0,
                                                    T =
                                                        c.getCurrentData()
                                                            .pluginHooks
                                                            .eventDropTransformers;
                                                P < T.length;
                                                P++
                                            )
                                                (0, u.pi)(k, (0, T[P])(v, c));
                                            c.emitter.trigger(
                                                'eventDrop',
                                                (0, u.pi)(
                                                    (0, u.pi)(
                                                        (0, u.pi)({}, _),
                                                        k
                                                    ),
                                                    {
                                                        el: l.subjectEl,
                                                        delta: v.datesDelta,
                                                        jsEvent: l.origEvent,
                                                        view: d,
                                                    }
                                                )
                                            ),
                                                c.emitter.trigger(
                                                    'eventChange',
                                                    _
                                                );
                                        } else if (p) {
                                            var B = {
                                                event: E,
                                                relatedEvents: Se(m, c, b),
                                                revert: function () {
                                                    c.dispatch({
                                                        type: 'MERGE_EVENTS',
                                                        eventStore: m,
                                                    });
                                                },
                                            };
                                            c.emitter.trigger(
                                                'eventLeave',
                                                (0, u.pi)((0, u.pi)({}, B), {
                                                    draggedEl: l.subjectEl,
                                                    view: d,
                                                })
                                            ),
                                                c.dispatch({
                                                    type: 'REMOVE_EVENTS',
                                                    eventStore: m,
                                                }),
                                                c.emitter.trigger(
                                                    'eventRemove',
                                                    B
                                                );
                                            var Z = w.instances[b.instanceId],
                                                Qe = new z(
                                                    p,
                                                    w.defs[g.defId],
                                                    Z
                                                );
                                            p.dispatch({
                                                type: 'MERGE_EVENTS',
                                                eventStore: w,
                                            });
                                            var We = {
                                                event: Qe,
                                                relatedEvents: Se(w, p, Z),
                                                revert: function () {
                                                    p.dispatch({
                                                        type: 'REMOVE_EVENTS',
                                                        eventStore: w,
                                                    });
                                                },
                                            };
                                            p.emitter.trigger('eventAdd', We),
                                                l.isTouch &&
                                                    p.dispatch({
                                                        type: 'SELECT_EVENT',
                                                        eventInstanceId:
                                                            b.instanceId,
                                                    }),
                                                p.emitter.trigger(
                                                    'drop',
                                                    (0, u.pi)(
                                                        (0, u.pi)(
                                                            {},
                                                            nr(C.dateSpan, p)
                                                        ),
                                                        {
                                                            draggedEl:
                                                                l.subjectEl,
                                                            jsEvent:
                                                                l.origEvent,
                                                            view: C.context
                                                                .viewApi,
                                                        }
                                                    )
                                                ),
                                                p.emitter.trigger(
                                                    'eventReceive',
                                                    (0, u.pi)(
                                                        (0, u.pi)({}, We),
                                                        {
                                                            draggedEl:
                                                                l.subjectEl,
                                                            view: C.context
                                                                .viewApi,
                                                        }
                                                    )
                                                );
                                        }
                                    } else c.emitter.trigger('_noEventDrop');
                                }
                                r.cleanup();
                            });
                        var o = r.component.context.options,
                            a = (r.dragging = new Fe(n.el));
                        (a.pointer.selector = e.SELECTOR),
                            (a.touchScrollAllowed = !1),
                            (a.autoScroller.isEnabled = o.dragScroll);
                        var s = (r.hitDragging = new nt(r.dragging, Ht));
                        return (
                            (s.useSubjectCenter = n.useEventCenter),
                            s.emitter.on('pointerdown', r.handlePointerDown),
                            s.emitter.on('dragstart', r.handleDragStart),
                            s.emitter.on('hitupdate', r.handleHitUpdate),
                            s.emitter.on('pointerup', r.handlePointerUp),
                            s.emitter.on('dragend', r.handleDragEnd),
                            r
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.destroy = function () {
                            this.dragging.destroy();
                        }),
                        (e.prototype.displayDrag = function (n, r) {
                            var o = this.receivingContext;
                            o &&
                                o !== n &&
                                o.dispatch(
                                    o === this.component.context
                                        ? {
                                              type: 'SET_EVENT_DRAG',
                                              state: {
                                                  affectedEvents:
                                                      r.affectedEvents,
                                                  mutatedEvents: {
                                                      defs: {},
                                                      instances: {},
                                                  },
                                                  isEvent: !0,
                                              },
                                          }
                                        : { type: 'UNSET_EVENT_DRAG' }
                                ),
                                n &&
                                    n.dispatch({
                                        type: 'SET_EVENT_DRAG',
                                        state: r,
                                    });
                        }),
                        (e.prototype.clearDrag = function () {
                            var n = this.component.context,
                                r = this.receivingContext;
                            r && r.dispatch({ type: 'UNSET_EVENT_DRAG' }),
                                n !== r &&
                                    n.dispatch({ type: 'UNSET_EVENT_DRAG' });
                        }),
                        (e.prototype.cleanup = function () {
                            (this.subjectSeg = null),
                                (this.isDragging = !1),
                                (this.eventRange = null),
                                (this.relevantEvents = null),
                                (this.receivingContext = null),
                                (this.validMutation = null),
                                (this.mutatedRelevantEvents = null);
                        }),
                        (e.SELECTOR =
                            '.fc-event-draggable, .fc-event-resizable'),
                        e
                    );
                })(ze),
                Xf = (function (t) {
                    function e(n) {
                        var r = t.call(this, n) || this;
                        (r.draggingSegEl = null),
                            (r.draggingSeg = null),
                            (r.eventRange = null),
                            (r.relevantEvents = null),
                            (r.validMutation = null),
                            (r.mutatedRelevantEvents = null),
                            (r.handlePointerDown = function (s) {
                                var l = r.component,
                                    d = Oe(r.querySegEl(s)),
                                    f = (r.eventRange = d.eventRange);
                                (r.dragging.minDistance =
                                    l.context.options.eventDragMinDistance),
                                    r.dragging.setIgnoreMove(
                                        !r.component.isValidSegDownEl(
                                            s.origEvent.target
                                        ) ||
                                            (s.isTouch &&
                                                r.component.props
                                                    .eventSelection !==
                                                    f.instance.instanceId)
                                    );
                            }),
                            (r.handleDragStart = function (s) {
                                var l = r.component.context,
                                    c = r.eventRange;
                                r.relevantEvents = pn(
                                    l.getCurrentData().eventStore,
                                    r.eventRange.instance.instanceId
                                );
                                var d = r.querySegEl(s);
                                (r.draggingSegEl = d),
                                    (r.draggingSeg = Oe(d)),
                                    l.calendarApi.unselect(),
                                    l.emitter.trigger('eventResizeStart', {
                                        el: d,
                                        event: new z(l, c.def, c.instance),
                                        jsEvent: s.origEvent,
                                        view: l.viewApi,
                                    });
                            }),
                            (r.handleHitUpdate = function (s, l, c) {
                                var d = r.component.context,
                                    f = r.relevantEvents,
                                    p = r.hitDragging.initialHit,
                                    v = r.eventRange.instance,
                                    g = null,
                                    b = null,
                                    E = !1,
                                    m = {
                                        affectedEvents: f,
                                        mutatedEvents: {
                                            defs: {},
                                            instances: {},
                                        },
                                        isEvent: !0,
                                    };
                                s &&
                                    ((s.componentId === p.componentId &&
                                        r.isHitComboAllowed &&
                                        !r.isHitComboAllowed(p, s)) ||
                                        (g = (function Kf(t, e, n, r) {
                                            var i = t.context.dateEnv,
                                                s = Be(
                                                    t.dateSpan.range.start,
                                                    e.dateSpan.range.start,
                                                    i,
                                                    t.largeUnit
                                                );
                                            if (n) {
                                                if (i.add(r.start, s) < r.end)
                                                    return { startDelta: s };
                                            } else if (
                                                i.add(r.end, s) > r.start
                                            )
                                                return { endDelta: s };
                                            return null;
                                        })(
                                            p,
                                            s,
                                            c.subjectEl.classList.contains(
                                                'fc-event-resizer-start'
                                            ),
                                            v.range
                                        ))),
                                    g &&
                                        ((b = Dn(
                                            f,
                                            d.getCurrentData().eventUiBases,
                                            g,
                                            d
                                        )),
                                        (m.mutatedEvents = b),
                                        Vn(m, s.dateProfile, d) ||
                                            ((E = !0),
                                            (g = null),
                                            (b = null),
                                            (m.mutatedEvents = null))),
                                    d.dispatch(
                                        b
                                            ? {
                                                  type: 'SET_EVENT_RESIZE',
                                                  state: m,
                                              }
                                            : { type: 'UNSET_EVENT_RESIZE' }
                                    ),
                                    E ? vt() : ht(),
                                    l ||
                                        (g && Wt(p, s) && (g = null),
                                        (r.validMutation = g),
                                        (r.mutatedRelevantEvents = b));
                            }),
                            (r.handleDragEnd = function (s) {
                                var l = r.component.context,
                                    c = r.eventRange.def,
                                    d = r.eventRange.instance,
                                    f = new z(l, c, d),
                                    p = r.relevantEvents,
                                    v = r.mutatedRelevantEvents;
                                if (
                                    (l.emitter.trigger('eventResizeStop', {
                                        el: r.draggingSegEl,
                                        event: f,
                                        jsEvent: s.origEvent,
                                        view: l.viewApi,
                                    }),
                                    r.validMutation)
                                ) {
                                    var g = new z(
                                        l,
                                        v.defs[c.defId],
                                        d ? v.instances[d.instanceId] : null
                                    );
                                    l.dispatch({
                                        type: 'MERGE_EVENTS',
                                        eventStore: v,
                                    });
                                    var b = {
                                        oldEvent: f,
                                        event: g,
                                        relatedEvents: Se(v, l, d),
                                        revert: function () {
                                            l.dispatch({
                                                type: 'MERGE_EVENTS',
                                                eventStore: p,
                                            });
                                        },
                                    };
                                    l.emitter.trigger(
                                        'eventResize',
                                        (0, u.pi)((0, u.pi)({}, b), {
                                            el: r.draggingSegEl,
                                            startDelta:
                                                r.validMutation.startDelta ||
                                                M(0),
                                            endDelta:
                                                r.validMutation.endDelta ||
                                                M(0),
                                            jsEvent: s.origEvent,
                                            view: l.viewApi,
                                        })
                                    ),
                                        l.emitter.trigger('eventChange', b);
                                } else l.emitter.trigger('_noEventResize');
                                (r.draggingSeg = null),
                                    (r.relevantEvents = null),
                                    (r.validMutation = null);
                            });
                        var i = n.component,
                            o = (r.dragging = new Fe(n.el));
                        (o.pointer.selector = '.fc-event-resizer'),
                            (o.touchScrollAllowed = !1),
                            (o.autoScroller.isEnabled =
                                i.context.options.dragScroll);
                        var a = (r.hitDragging = new nt(r.dragging, Ln(n)));
                        return (
                            a.emitter.on('pointerdown', r.handlePointerDown),
                            a.emitter.on('dragstart', r.handleDragStart),
                            a.emitter.on('hitupdate', r.handleHitUpdate),
                            a.emitter.on('dragend', r.handleDragEnd),
                            r
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.destroy = function () {
                            this.dragging.destroy();
                        }),
                        (e.prototype.querySegEl = function (n) {
                            return W(n.subjectEl, '.fc-event');
                        }),
                        e
                    );
                })(ze),
                $f = (function () {
                    function t(e) {
                        var n = this;
                        (this.context = e),
                            (this.isRecentPointerDateSelect = !1),
                            (this.matchesCancel = !1),
                            (this.matchesEvent = !1),
                            (this.onSelect = function (i) {
                                i.jsEvent && (n.isRecentPointerDateSelect = !0);
                            }),
                            (this.onDocumentPointerDown = function (i) {
                                var o = n.context.options.unselectCancel,
                                    a = ii(i.origEvent);
                                (n.matchesCancel = !!W(a, o)),
                                    (n.matchesEvent = !!W(a, na.SELECTOR));
                            }),
                            (this.onDocumentPointerUp = function (i) {
                                var o = n.context,
                                    a = n.documentPointer,
                                    s = o.getCurrentData();
                                if (!a.wasTouchScroll) {
                                    if (
                                        s.dateSelection &&
                                        !n.isRecentPointerDateSelect
                                    ) {
                                        var l = o.options.unselectAuto;
                                        l &&
                                            (!l || !n.matchesCancel) &&
                                            o.calendarApi.unselect(i);
                                    }
                                    s.eventSelection &&
                                        !n.matchesEvent &&
                                        o.dispatch({ type: 'UNSELECT_EVENT' });
                                }
                                n.isRecentPointerDateSelect = !1;
                            });
                        var r = (this.documentPointer = new tr(document));
                        (r.shouldIgnoreMove = !0),
                            (r.shouldWatchScroll = !1),
                            r.emitter.on(
                                'pointerdown',
                                this.onDocumentPointerDown
                            ),
                            r.emitter.on('pointerup', this.onDocumentPointerUp),
                            e.emitter.on('select', this.onSelect);
                    }
                    return (
                        (t.prototype.destroy = function () {
                            this.context.emitter.off('select', this.onSelect),
                                this.documentPointer.destroy();
                        }),
                        t
                    );
                })(),
                eu = { fixedMirrorParent: A },
                tu = {
                    dateClick: A,
                    eventDragStart: A,
                    eventDragStop: A,
                    eventDrop: A,
                    eventResizeStart: A,
                    eventResizeStop: A,
                    eventResize: A,
                    drop: A,
                    eventReceive: A,
                    eventLeave: A,
                };
            !(function () {
                function t(e, n) {
                    var r = this;
                    (this.receivingContext = null),
                        (this.droppableEvent = null),
                        (this.suppliedDragMeta = null),
                        (this.dragMeta = null),
                        (this.handleDragStart = function (o) {
                            r.dragMeta = r.buildDragMeta(o.subjectEl);
                        }),
                        (this.handleHitUpdate = function (o, a, s) {
                            var l = r.hitDragging.dragging,
                                c = null,
                                d = null,
                                f = !1,
                                p = {
                                    affectedEvents: { defs: {}, instances: {} },
                                    mutatedEvents: { defs: {}, instances: {} },
                                    isEvent: r.dragMeta.create,
                                };
                            o &&
                                r.canDropElOnCalendar(
                                    s.subjectEl,
                                    (c = o.context)
                                ) &&
                                ((d = (function nu(t, e, n) {
                                    for (
                                        var r = (0, u.pi)({}, e.leftoverProps),
                                            i = 0,
                                            o =
                                                n.pluginHooks
                                                    .externalDefTransforms;
                                        i < o.length;
                                        i++
                                    )
                                        (0, u.pi)(r, (0, o[i])(t, e));
                                    var s = gn(r, n),
                                        d = _t(
                                            s.refined,
                                            s.extra,
                                            e.sourceId,
                                            t.allDay,
                                            n.options.forceEventDuration ||
                                                Boolean(e.duration),
                                            n
                                        ),
                                        f = t.range.start;
                                    t.allDay &&
                                        e.startTime &&
                                        (f = n.dateEnv.add(f, e.startTime));
                                    var p = e.duration
                                        ? n.dateEnv.add(f, e.duration)
                                        : wn(t.allDay, f, n);
                                    return {
                                        def: d,
                                        instance: yt(d.defId, {
                                            start: f,
                                            end: p,
                                        }),
                                    };
                                })(o.dateSpan, r.dragMeta, c)),
                                (p.mutatedEvents = Xe(d)),
                                (f = !Vn(p, o.dateProfile, c)) &&
                                    ((p.mutatedEvents = {
                                        defs: {},
                                        instances: {},
                                    }),
                                    (d = null))),
                                r.displayDrag(c, p),
                                l.setMirrorIsVisible(
                                    a ||
                                        !d ||
                                        !document.querySelector(
                                            '.fc-event-mirror'
                                        )
                                ),
                                f ? vt() : ht(),
                                a ||
                                    (l.setMirrorNeedsRevert(!d),
                                    (r.receivingContext = c),
                                    (r.droppableEvent = d));
                        }),
                        (this.handleDragEnd = function (o) {
                            var s = r.receivingContext,
                                l = r.droppableEvent;
                            if ((r.clearDrag(), s && l)) {
                                var c = r.hitDragging.finalHit,
                                    d = c.context.viewApi,
                                    f = r.dragMeta;
                                if (
                                    (s.emitter.trigger(
                                        'drop',
                                        (0, u.pi)(
                                            (0, u.pi)({}, nr(c.dateSpan, s)),
                                            {
                                                draggedEl: o.subjectEl,
                                                jsEvent: o.origEvent,
                                                view: d,
                                            }
                                        )
                                    ),
                                    f.create)
                                ) {
                                    var p = Xe(l);
                                    s.dispatch({
                                        type: 'MERGE_EVENTS',
                                        eventStore: p,
                                    }),
                                        o.isTouch &&
                                            s.dispatch({
                                                type: 'SELECT_EVENT',
                                                eventInstanceId:
                                                    l.instance.instanceId,
                                            }),
                                        s.emitter.trigger('eventReceive', {
                                            event: new z(s, l.def, l.instance),
                                            relatedEvents: [],
                                            revert: function () {
                                                s.dispatch({
                                                    type: 'REMOVE_EVENTS',
                                                    eventStore: p,
                                                });
                                            },
                                            draggedEl: o.subjectEl,
                                            view: d,
                                        });
                                }
                            }
                            (r.receivingContext = null),
                                (r.droppableEvent = null);
                        });
                    var i = (this.hitDragging = new nt(e, Ht));
                    (i.requireInitial = !1),
                        i.emitter.on('dragstart', this.handleDragStart),
                        i.emitter.on('hitupdate', this.handleHitUpdate),
                        i.emitter.on('dragend', this.handleDragEnd),
                        (this.suppliedDragMeta = n);
                }
                (t.prototype.buildDragMeta = function (e) {
                    return 'object' == typeof this.suppliedDragMeta
                        ? Qn(this.suppliedDragMeta)
                        : 'function' == typeof this.suppliedDragMeta
                        ? Qn(this.suppliedDragMeta(e))
                        : (function ru(t) {
                              var e = (function iu(t, e) {
                                  var n = Ot.dataAttrPrefix;
                                  return (
                                      t.getAttribute(
                                          'data-' + (n ? n + '-' : '') + e
                                      ) || ''
                                  );
                              })(t, 'event');
                              return Qn(e ? JSON.parse(e) : { create: !1 });
                          })(e);
                }),
                    (t.prototype.displayDrag = function (e, n) {
                        var r = this.receivingContext;
                        r &&
                            r !== e &&
                            r.dispatch({ type: 'UNSET_EVENT_DRAG' }),
                            e &&
                                e.dispatch({
                                    type: 'SET_EVENT_DRAG',
                                    state: n,
                                });
                    }),
                    (t.prototype.clearDrag = function () {
                        this.receivingContext &&
                            this.receivingContext.dispatch({
                                type: 'UNSET_EVENT_DRAG',
                            });
                    }),
                    (t.prototype.canDropElOnCalendar = function (e, n) {
                        var r = n.options.dropAccept;
                        return 'function' == typeof r
                            ? r.call(n.calendarApi, e)
                            : 'string' != typeof r || !r || Boolean(nn(e, r));
                    });
            })();
            Ot.dataAttrPrefix = '';
            !(function (t) {
                function e(n) {
                    var r = t.call(this, n) || this;
                    (r.shouldIgnoreMove = !1),
                        (r.mirrorSelector = ''),
                        (r.currentMirrorEl = null),
                        (r.handlePointerDown = function (o) {
                            r.emitter.trigger('pointerdown', o),
                                r.shouldIgnoreMove ||
                                    r.emitter.trigger('dragstart', o);
                        }),
                        (r.handlePointerMove = function (o) {
                            r.shouldIgnoreMove ||
                                r.emitter.trigger('dragmove', o);
                        }),
                        (r.handlePointerUp = function (o) {
                            r.emitter.trigger('pointerup', o),
                                r.shouldIgnoreMove ||
                                    r.emitter.trigger('dragend', o);
                        });
                    var i = (r.pointer = new tr(n));
                    return (
                        i.emitter.on('pointerdown', r.handlePointerDown),
                        i.emitter.on('pointermove', r.handlePointerMove),
                        i.emitter.on('pointerup', r.handlePointerUp),
                        r
                    );
                }
                (0, u.ZT)(e, t),
                    (e.prototype.destroy = function () {
                        this.pointer.destroy();
                    }),
                    (e.prototype.setIgnoreMove = function (n) {
                        this.shouldIgnoreMove = n;
                    }),
                    (e.prototype.setMirrorIsVisible = function (n) {
                        if (n)
                            this.currentMirrorEl &&
                                ((this.currentMirrorEl.style.visibility = ''),
                                (this.currentMirrorEl = null));
                        else {
                            var r = this.mirrorSelector
                                ? document.querySelector(this.mirrorSelector)
                                : null;
                            r &&
                                ((this.currentMirrorEl = r),
                                (r.style.visibility = 'hidden'));
                        }
                    });
            })(Ro);
            const su = de({
                componentInteractions: [Gf, Zf, na, Xf],
                calendarInteractions: [$f],
                elementDraggingImpl: Fe,
                optionRefiners: eu,
                listenerRefiners: tu,
            });
            R(4516);
            var lu = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (n.headerElRef = U()), n;
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.renderSimpleLayout = function (n, r) {
                        var o = this.props,
                            a = this.context,
                            s = [],
                            l = Ut(a.options);
                        return (
                            n &&
                                s.push({
                                    type: 'header',
                                    key: 'header',
                                    isSticky: l,
                                    chunk: {
                                        elRef: this.headerElRef,
                                        tableClassName: 'fc-col-header',
                                        rowContent: n,
                                    },
                                }),
                            s.push({
                                type: 'body',
                                key: 'body',
                                liquid: !0,
                                chunk: { content: r },
                            }),
                            h(tt, { viewSpec: a.viewSpec }, function (c, d) {
                                return h(
                                    'div',
                                    {
                                        ref: c,
                                        className: ['fc-daygrid']
                                            .concat(d)
                                            .join(' '),
                                    },
                                    h(jn, {
                                        liquid: !o.isHeightAuto && !o.forPrint,
                                        collapsibleWidth: o.forPrint,
                                        cols: [],
                                        sections: s,
                                    })
                                );
                            })
                        );
                    }),
                    (e.prototype.renderHScrollLayout = function (n, r, i, o) {
                        var a = this.context.pluginHooks.scrollGridImpl;
                        if (!a) throw new Error('No ScrollGrid implementation');
                        var l = this.props,
                            c = this.context,
                            d = !l.forPrint && Ut(c.options),
                            f = !l.forPrint && Uo(c.options),
                            p = [];
                        return (
                            n &&
                                p.push({
                                    type: 'header',
                                    key: 'header',
                                    isSticky: d,
                                    chunks: [
                                        {
                                            key: 'main',
                                            elRef: this.headerElRef,
                                            tableClassName: 'fc-col-header',
                                            rowContent: n,
                                        },
                                    ],
                                }),
                            p.push({
                                type: 'body',
                                key: 'body',
                                liquid: !0,
                                chunks: [{ key: 'main', content: r }],
                            }),
                            f &&
                                p.push({
                                    type: 'footer',
                                    key: 'footer',
                                    isSticky: !0,
                                    chunks: [{ key: 'main', content: Zn }],
                                }),
                            h(tt, { viewSpec: c.viewSpec }, function (v, g) {
                                return h(
                                    'div',
                                    {
                                        ref: v,
                                        className: ['fc-daygrid']
                                            .concat(g)
                                            .join(' '),
                                    },
                                    h(a, {
                                        liquid: !l.isHeightAuto && !l.forPrint,
                                        collapsibleWidth: l.forPrint,
                                        colGroups: [
                                            {
                                                cols: [
                                                    { span: i, minWidth: o },
                                                ],
                                            },
                                        ],
                                        sections: p,
                                    })
                                );
                            })
                        );
                    }),
                    e
                );
            })(ce);
            function Vt(t, e) {
                for (var n = [], r = 0; r < e; r += 1) n[r] = [];
                for (var i = 0, o = t; i < o.length; i++) {
                    var a = o[i];
                    n[a.row].push(a);
                }
                return n;
            }
            function Gt(t, e) {
                for (var n = [], r = 0; r < e; r += 1) n[r] = [];
                for (var i = 0, o = t; i < o.length; i++) {
                    var a = o[i];
                    n[a.firstCol].push(a);
                }
                return n;
            }
            function ia(t, e) {
                var n = [];
                if (t) {
                    for (var r = 0; r < e; r += 1)
                        n[r] = {
                            affectedInstances: t.affectedInstances,
                            isEvent: t.isEvent,
                            segs: [],
                        };
                    for (var i = 0, o = t.segs; i < o.length; i++) {
                        var a = o[i];
                        n[a.row].segs.push(a);
                    }
                } else for (r = 0; r < e; r += 1) n[r] = null;
                return n;
            }
            var cu = (function (t) {
                function e() {
                    return (null !== t && t.apply(this, arguments)) || this;
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.render = function () {
                        var n = this.props,
                            r = Nt(this.context, n.date);
                        return h(
                            Jn,
                            {
                                date: n.date,
                                dateProfile: n.dateProfile,
                                todayRange: n.todayRange,
                                showDayNumber: n.showDayNumber,
                                extraHookProps: n.extraHookProps,
                                defaultContent: du,
                            },
                            function (i, o) {
                                return (
                                    (o || n.forceDayTop) &&
                                    h(
                                        'div',
                                        {
                                            className: 'fc-daygrid-day-top',
                                            ref: i,
                                        },
                                        h(
                                            'a',
                                            (0, u.pi)(
                                                {
                                                    id: n.dayNumberId,
                                                    className:
                                                        'fc-daygrid-day-number',
                                                },
                                                r
                                            ),
                                            o || h(L, null, '\xa0')
                                        )
                                    )
                                );
                            }
                        );
                    }),
                    e
                );
            })(I);
            function du(t) {
                return t.dayNumberText;
            }
            var oa = O({
                hour: 'numeric',
                minute: '2-digit',
                omitZeroMinute: !0,
                meridiem: 'narrow',
            });
            function aa(t) {
                var e = t.eventRange.ui.display;
                return (
                    'list-item' === e ||
                    ('auto' === e &&
                        !t.eventRange.def.allDay &&
                        t.firstCol === t.lastCol &&
                        t.isStart &&
                        t.isEnd)
                );
            }
            var sa = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this.props;
                            return h(
                                Lo,
                                (0, u.pi)({}, n, {
                                    extraClassNames: [
                                        'fc-daygrid-event',
                                        'fc-daygrid-block-event',
                                        'fc-h-event',
                                    ],
                                    defaultTimeFormat: oa,
                                    defaultDisplayEventEnd:
                                        n.defaultDisplayEventEnd,
                                    disableResizing:
                                        !n.seg.eventRange.def.allDay,
                                })
                            );
                        }),
                        e
                    );
                })(I),
                la = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var r = this.props,
                                i = this.context,
                                a = zi(
                                    r.seg,
                                    i.options.eventTimeFormat || oa,
                                    i,
                                    !0,
                                    r.defaultDisplayEventEnd
                                );
                            return h(
                                Yn,
                                {
                                    seg: r.seg,
                                    timeText: a,
                                    defaultContent: fu,
                                    isDragging: r.isDragging,
                                    isResizing: !1,
                                    isDateSelecting: !1,
                                    isSelected: r.isSelected,
                                    isPast: r.isPast,
                                    isFuture: r.isFuture,
                                    isToday: r.isToday,
                                },
                                function (s, l, c, d) {
                                    return h(
                                        'a',
                                        (0, u.pi)(
                                            {
                                                className: [
                                                    'fc-daygrid-event',
                                                    'fc-daygrid-dot-event',
                                                ]
                                                    .concat(l)
                                                    .join(' '),
                                                ref: s,
                                            },
                                            Ui(r.seg, i)
                                        ),
                                        d
                                    );
                                }
                            );
                        }),
                        e
                    );
                })(I);
            function fu(t) {
                return h(
                    L,
                    null,
                    h('div', {
                        className: 'fc-daygrid-event-dot',
                        style: {
                            borderColor: t.borderColor || t.backgroundColor,
                        },
                    }),
                    t.timeText &&
                        h('div', { className: 'fc-event-time' }, t.timeText),
                    h(
                        'div',
                        { className: 'fc-event-title' },
                        t.event.title || h(L, null, '\xa0')
                    )
                );
            }
            var uu = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (n.compileSegs = x(pu)), n;
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.render = function () {
                        var n = this.props,
                            r = this.compileSegs(n.singlePlacements),
                            i = r.allSegs;
                        return h(
                            Zo,
                            {
                                dateProfile: n.dateProfile,
                                todayRange: n.todayRange,
                                allDayDate: n.allDayDate,
                                moreCnt: n.moreCnt,
                                allSegs: i,
                                hiddenSegs: r.invisibleSegs,
                                alignmentElRef: n.alignmentElRef,
                                alignGridTop: n.alignGridTop,
                                extraDateSpan: n.extraDateSpan,
                                popoverContent: function () {
                                    var a =
                                        (n.eventDrag
                                            ? n.eventDrag.affectedInstances
                                            : null) ||
                                        (n.eventResize
                                            ? n.eventResize.affectedInstances
                                            : null) ||
                                        {};
                                    return h(
                                        L,
                                        null,
                                        i.map(function (s) {
                                            var l =
                                                s.eventRange.instance
                                                    .instanceId;
                                            return h(
                                                'div',
                                                {
                                                    className:
                                                        'fc-daygrid-event-harness',
                                                    key: l,
                                                    style: {
                                                        visibility: a[l]
                                                            ? 'hidden'
                                                            : '',
                                                    },
                                                },
                                                aa(s)
                                                    ? h(
                                                          la,
                                                          (0, u.pi)(
                                                              {
                                                                  seg: s,
                                                                  isDragging:
                                                                      !1,
                                                                  isSelected:
                                                                      l ===
                                                                      n.eventSelection,
                                                                  defaultDisplayEventEnd:
                                                                      !1,
                                                              },
                                                              Ae(
                                                                  s,
                                                                  n.todayRange
                                                              )
                                                          )
                                                      )
                                                    : h(
                                                          sa,
                                                          (0, u.pi)(
                                                              {
                                                                  seg: s,
                                                                  isDragging:
                                                                      !1,
                                                                  isResizing:
                                                                      !1,
                                                                  isDateSelecting:
                                                                      !1,
                                                                  isSelected:
                                                                      l ===
                                                                      n.eventSelection,
                                                                  defaultDisplayEventEnd:
                                                                      !1,
                                                              },
                                                              Ae(
                                                                  s,
                                                                  n.todayRange
                                                              )
                                                          )
                                                      )
                                            );
                                        })
                                    );
                                },
                            },
                            function (a, s, l, c, d, f, p, v) {
                                return h(
                                    'a',
                                    (0, u.pi)(
                                        {
                                            ref: a,
                                            className: ['fc-daygrid-more-link']
                                                .concat(s)
                                                .join(' '),
                                            title: f,
                                            'aria-expanded': p,
                                            'aria-controls': v,
                                        },
                                        ci(d)
                                    ),
                                    c
                                );
                            }
                        );
                    }),
                    e
                );
            })(I);
            function pu(t) {
                for (var e = [], n = [], r = 0, i = t; r < i.length; r++) {
                    var o = i[r];
                    e.push(o.seg), o.isVisible || n.push(o.seg);
                }
                return { allSegs: e, invisibleSegs: n };
            }
            var vu = O({ week: 'narrow' }),
                hu = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.rootElRef = U()),
                            (n.state = { dayNumberId: ut() }),
                            (n.handleRootEl = function (r) {
                                $(n.rootElRef, r), $(n.props.elRef, r);
                            }),
                            n
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this,
                                i = n.props,
                                o = n.state,
                                a = n.rootElRef,
                                s = i.date,
                                l = i.dateProfile,
                                c = Nt(n.context, s, 'week');
                            return h(
                                Xn,
                                {
                                    date: s,
                                    dateProfile: l,
                                    todayRange: i.todayRange,
                                    showDayNumber: i.showDayNumber,
                                    extraHookProps: i.extraHookProps,
                                    elRef: this.handleRootEl,
                                },
                                function (d, f, p, v) {
                                    return h(
                                        'td',
                                        (0, u.pi)(
                                            {
                                                ref: d,
                                                role: 'gridcell',
                                                className: ['fc-daygrid-day']
                                                    .concat(
                                                        f,
                                                        i.extraClassNames || []
                                                    )
                                                    .join(' '),
                                            },
                                            p,
                                            i.extraDataAttrs,
                                            i.showDayNumber
                                                ? {
                                                      'aria-labelledby':
                                                          o.dayNumberId,
                                                  }
                                                : {}
                                        ),
                                        h(
                                            'div',
                                            {
                                                className:
                                                    'fc-daygrid-day-frame fc-scrollgrid-sync-inner',
                                                ref: i.innerElRef,
                                            },
                                            i.showWeekNumber &&
                                                h(
                                                    Go,
                                                    {
                                                        date: s,
                                                        defaultFormat: vu,
                                                    },
                                                    function (g, b, E, m) {
                                                        return h(
                                                            'a',
                                                            (0, u.pi)(
                                                                {
                                                                    ref: g,
                                                                    className: [
                                                                        'fc-daygrid-week-number',
                                                                    ]
                                                                        .concat(
                                                                            b
                                                                        )
                                                                        .join(
                                                                            ' '
                                                                        ),
                                                                },
                                                                c
                                                            ),
                                                            m
                                                        );
                                                    }
                                                ),
                                            !v &&
                                                h(cu, {
                                                    date: s,
                                                    dateProfile: l,
                                                    showDayNumber:
                                                        i.showDayNumber,
                                                    dayNumberId: o.dayNumberId,
                                                    forceDayTop: i.forceDayTop,
                                                    todayRange: i.todayRange,
                                                    extraHookProps:
                                                        i.extraHookProps,
                                                }),
                                            h(
                                                'div',
                                                {
                                                    className:
                                                        'fc-daygrid-day-events',
                                                    ref: i.fgContentElRef,
                                                },
                                                i.fgContent,
                                                h(
                                                    'div',
                                                    {
                                                        className:
                                                            'fc-daygrid-day-bottom',
                                                        style: {
                                                            marginTop:
                                                                i.moreMarginTop,
                                                        },
                                                    },
                                                    h(uu, {
                                                        allDayDate: s,
                                                        singlePlacements:
                                                            i.singlePlacements,
                                                        moreCnt: i.moreCnt,
                                                        alignmentElRef: a,
                                                        alignGridTop:
                                                            !i.showDayNumber,
                                                        extraDateSpan:
                                                            i.extraDateSpan,
                                                        dateProfile:
                                                            i.dateProfile,
                                                        eventSelection:
                                                            i.eventSelection,
                                                        eventDrag: i.eventDrag,
                                                        eventResize:
                                                            i.eventResize,
                                                        todayRange:
                                                            i.todayRange,
                                                    })
                                                )
                                            ),
                                            h(
                                                'div',
                                                {
                                                    className:
                                                        'fc-daygrid-day-bg',
                                                },
                                                i.bgContent
                                            )
                                        )
                                    );
                                }
                            );
                        }),
                        e
                    );
                })(ce);
            function Ue(t, e, n, r) {
                if (t.firstCol === e && t.lastCol === n - 1) return t;
                var i = t.eventRange,
                    o = i.range,
                    a = He(o, { start: r[e].date, end: G(r[n - 1].date, 1) });
                return (0, u.pi)((0, u.pi)({}, t), {
                    firstCol: e,
                    lastCol: n - 1,
                    eventRange: {
                        def: i.def,
                        ui: (0, u.pi)((0, u.pi)({}, i.ui), {
                            durationEditable: !1,
                        }),
                        instance: i.instance,
                        range: a,
                    },
                    isStart:
                        t.isStart && a.start.valueOf() === o.start.valueOf(),
                    isEnd: t.isEnd && a.end.valueOf() === o.end.valueOf(),
                });
            }
            var bu = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (n.hiddenConsumes = !1), (n.forceHidden = {}), n;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.addSegs = function (n) {
                            for (
                                var r = this,
                                    i = t.prototype.addSegs.call(this, n),
                                    o = this.entriesByLevel,
                                    a = function (l) {
                                        return !r.forceHidden[xe(l)];
                                    },
                                    s = 0;
                                s < o.length;
                                s += 1
                            )
                                o[s] = o[s].filter(a);
                            return i;
                        }),
                        (e.prototype.handleInvalidInsertion = function (
                            n,
                            r,
                            i
                        ) {
                            var a = this.entriesByLevel,
                                s = this.forceHidden,
                                l = n.touchingEntry,
                                c = n.touchingLevel,
                                d = n.touchingLateral;
                            if (this.hiddenConsumes && l) {
                                var f = xe(l);
                                if (!s[f])
                                    if (this.allowReslicing) {
                                        var p = (0, u.pi)((0, u.pi)({}, l), {
                                            span: zn(l.span, r.span),
                                        });
                                        (s[xe(p)] = !0),
                                            (a[c][d] = p),
                                            this.splitEntry(l, r, i);
                                    } else (s[f] = !0), i.push(l);
                            }
                            return t.prototype.handleInvalidInsertion.call(
                                this,
                                n,
                                r,
                                i
                            );
                        }),
                        e
                    );
                })(To),
                ca = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.cellElRefs = new fe()),
                            (n.frameElRefs = new fe()),
                            (n.fgElRefs = new fe()),
                            (n.segHarnessRefs = new fe()),
                            (n.rootElRef = U()),
                            (n.state = {
                                framePositions: null,
                                maxContentHeight: null,
                                eventInstanceHeights: {},
                            }),
                            n
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this,
                                r = this,
                                i = r.props,
                                o = r.state,
                                s = r.context.options,
                                l = i.cells.length,
                                c = Gt(i.businessHourSegs, l),
                                d = Gt(i.bgEventSegs, l),
                                f = Gt(this.getHighlightSegs(), l),
                                p = Gt(this.getMirrorSegs(), l),
                                v = (function gu(t, e, n, r, i, o, a) {
                                    var s = new bu();
                                    (s.allowReslicing = !0),
                                        (s.strictOrder = r),
                                        !0 === e || !0 === n
                                            ? ((s.maxCoord = o),
                                              (s.hiddenConsumes = !0))
                                            : 'number' == typeof e
                                            ? (s.maxStackCnt = e)
                                            : 'number' == typeof n &&
                                              ((s.maxStackCnt = n),
                                              (s.hiddenConsumes = !0));
                                    for (
                                        var l = [], c = [], d = 0;
                                        d < t.length;
                                        d += 1
                                    ) {
                                        var v =
                                            i[
                                                (f = t[d]).eventRange.instance
                                                    .instanceId
                                            ];
                                        null != v
                                            ? l.push({
                                                  index: d,
                                                  thickness: v,
                                                  span: {
                                                      start: f.firstCol,
                                                      end: f.lastCol + 1,
                                                  },
                                              })
                                            : c.push(f);
                                    }
                                    for (
                                        var g = s.addSegs(l),
                                            E = (function mu(t, e, n) {
                                                for (
                                                    var r = (function yu(t, e) {
                                                            for (
                                                                var n = [],
                                                                    r = 0;
                                                                r < e;
                                                                r += 1
                                                            )
                                                                n.push([]);
                                                            for (
                                                                var i = 0,
                                                                    o = t;
                                                                i < o.length;
                                                                i++
                                                            ) {
                                                                var a = o[i];
                                                                for (
                                                                    r =
                                                                        a.span
                                                                            .start;
                                                                    r <
                                                                    a.span.end;
                                                                    r += 1
                                                                )
                                                                    n[r].push(
                                                                        a
                                                                    );
                                                            }
                                                            return n;
                                                        })(t, n.length),
                                                        i = [],
                                                        o = [],
                                                        a = [],
                                                        s = 0;
                                                    s < n.length;
                                                    s += 1
                                                ) {
                                                    for (
                                                        var l = r[s],
                                                            c = [],
                                                            d = 0,
                                                            f = 0,
                                                            p = 0,
                                                            v = l;
                                                        p < v.length;
                                                        p++
                                                    )
                                                        c.push({
                                                            seg: Ue(
                                                                (b =
                                                                    e[
                                                                        (g =
                                                                            v[
                                                                                p
                                                                            ])
                                                                            .index
                                                                    ]),
                                                                s,
                                                                s + 1,
                                                                n
                                                            ),
                                                            isVisible: !0,
                                                            isAbsolute: !1,
                                                            absoluteTop:
                                                                g.levelCoord,
                                                            marginTop:
                                                                g.levelCoord -
                                                                d,
                                                        }),
                                                            (d =
                                                                g.levelCoord +
                                                                g.thickness);
                                                    var E = [];
                                                    (d = 0), (f = 0);
                                                    for (
                                                        var m = 0, w = l;
                                                        m < w.length;
                                                        m++
                                                    ) {
                                                        var g,
                                                            b =
                                                                e[
                                                                    (g = w[m])
                                                                        .index
                                                                ],
                                                            D =
                                                                g.span.start ===
                                                                s;
                                                        (f += g.levelCoord - d),
                                                            (d =
                                                                g.levelCoord +
                                                                g.thickness),
                                                            g.span.end -
                                                                g.span.start >
                                                            1
                                                                ? ((f +=
                                                                      g.thickness),
                                                                  D &&
                                                                      E.push({
                                                                          seg: Ue(
                                                                              b,
                                                                              g
                                                                                  .span
                                                                                  .start,
                                                                              g
                                                                                  .span
                                                                                  .end,
                                                                              n
                                                                          ),
                                                                          isVisible:
                                                                              !0,
                                                                          isAbsolute:
                                                                              !0,
                                                                          absoluteTop:
                                                                              g.levelCoord,
                                                                          marginTop: 0,
                                                                      }))
                                                                : D &&
                                                                  (E.push({
                                                                      seg: Ue(
                                                                          b,
                                                                          g.span
                                                                              .start,
                                                                          g.span
                                                                              .end,
                                                                          n
                                                                      ),
                                                                      isVisible:
                                                                          !0,
                                                                      isAbsolute:
                                                                          !1,
                                                                      absoluteTop:
                                                                          g.levelCoord,
                                                                      marginTop:
                                                                          f,
                                                                  }),
                                                                  (f = 0));
                                                    }
                                                    i.push(c),
                                                        o.push(E),
                                                        a.push(f);
                                                }
                                                return {
                                                    singleColPlacements: i,
                                                    multiColPlacements: o,
                                                    leftoverMargins: a,
                                                };
                                            })(s.toRects(), t, a),
                                            m = E.singleColPlacements,
                                            w = E.multiColPlacements,
                                            C = E.leftoverMargins,
                                            D = [],
                                            _ = [],
                                            k = 0,
                                            P = c;
                                        k < P.length;
                                        k++
                                    ) {
                                        w[(f = P[k]).firstCol].push({
                                            seg: f,
                                            isVisible: !1,
                                            isAbsolute: !0,
                                            absoluteTop: 0,
                                            marginTop: 0,
                                        });
                                        for (
                                            var T = f.firstCol;
                                            T <= f.lastCol;
                                            T += 1
                                        )
                                            m[T].push({
                                                seg: Ue(f, T, T + 1, a),
                                                isVisible: !1,
                                                isAbsolute: !1,
                                                absoluteTop: 0,
                                                marginTop: 0,
                                            });
                                    }
                                    for (T = 0; T < a.length; T += 1) D.push(0);
                                    for (var F = 0, B = g; F < B.length; F++) {
                                        var f,
                                            q = B[F],
                                            Z = q.span;
                                        for (
                                            w[Z.start].push({
                                                seg: Ue(
                                                    (f = t[q.index]),
                                                    Z.start,
                                                    Z.end,
                                                    a
                                                ),
                                                isVisible: !1,
                                                isAbsolute: !0,
                                                absoluteTop: 0,
                                                marginTop: 0,
                                            }),
                                                T = Z.start;
                                            T < Z.end;
                                            T += 1
                                        )
                                            (D[T] += 1),
                                                m[T].push({
                                                    seg: Ue(f, T, T + 1, a),
                                                    isVisible: !1,
                                                    isAbsolute: !1,
                                                    absoluteTop: 0,
                                                    marginTop: 0,
                                                });
                                    }
                                    for (T = 0; T < a.length; T += 1)
                                        _.push(C[T]);
                                    return {
                                        singleColPlacements: m,
                                        multiColPlacements: w,
                                        moreCnts: D,
                                        moreMarginTops: _,
                                    };
                                })(
                                    Oi(i.fgEventSegs, s.eventOrder),
                                    i.dayMaxEvents,
                                    i.dayMaxEventRows,
                                    s.eventOrderStrict,
                                    o.eventInstanceHeights,
                                    o.maxContentHeight,
                                    i.cells
                                ),
                                g = v.singleColPlacements,
                                b = v.multiColPlacements,
                                E = v.moreCnts,
                                m = v.moreMarginTops,
                                w =
                                    (i.eventDrag &&
                                        i.eventDrag.affectedInstances) ||
                                    (i.eventResize &&
                                        i.eventResize.affectedInstances) ||
                                    {};
                            return h(
                                'tr',
                                { ref: this.rootElRef, role: 'row' },
                                i.renderIntro && i.renderIntro(),
                                i.cells.map(function (C, D) {
                                    var _ = n.renderFgSegs(
                                            D,
                                            i.forPrint ? g[D] : b[D],
                                            i.todayRange,
                                            w
                                        ),
                                        k = n.renderFgSegs(
                                            D,
                                            (function Au(t, e) {
                                                if (!t.length) return [];
                                                var n = (function Eu(t) {
                                                    for (
                                                        var e = {},
                                                            n = 0,
                                                            r = t;
                                                        n < r.length;
                                                        n++
                                                    )
                                                        for (
                                                            var o = 0, a = r[n];
                                                            o < a.length;
                                                            o++
                                                        ) {
                                                            var s = a[o];
                                                            e[
                                                                s.seg.eventRange.instance.instanceId
                                                            ] = s.absoluteTop;
                                                        }
                                                    return e;
                                                })(e);
                                                return t.map(function (r) {
                                                    return {
                                                        seg: r,
                                                        isVisible: !0,
                                                        isAbsolute: !0,
                                                        absoluteTop:
                                                            n[
                                                                r.eventRange
                                                                    .instance
                                                                    .instanceId
                                                            ],
                                                        marginTop: 0,
                                                    };
                                                });
                                            })(p[D], b),
                                            i.todayRange,
                                            {},
                                            Boolean(i.eventDrag),
                                            Boolean(i.eventResize),
                                            !1
                                        );
                                    return h(hu, {
                                        key: C.key,
                                        elRef: n.cellElRefs.createRef(C.key),
                                        innerElRef: n.frameElRefs.createRef(
                                            C.key
                                        ),
                                        dateProfile: i.dateProfile,
                                        date: C.date,
                                        showDayNumber: i.showDayNumbers,
                                        showWeekNumber:
                                            i.showWeekNumbers && 0 === D,
                                        forceDayTop: i.showWeekNumbers,
                                        todayRange: i.todayRange,
                                        eventSelection: i.eventSelection,
                                        eventDrag: i.eventDrag,
                                        eventResize: i.eventResize,
                                        extraHookProps: C.extraHookProps,
                                        extraDataAttrs: C.extraDataAttrs,
                                        extraClassNames: C.extraClassNames,
                                        extraDateSpan: C.extraDateSpan,
                                        moreCnt: E[D],
                                        moreMarginTop: m[D],
                                        singlePlacements: g[D],
                                        fgContentElRef: n.fgElRefs.createRef(
                                            C.key
                                        ),
                                        fgContent: h(
                                            L,
                                            null,
                                            h(L, null, _),
                                            h(L, null, k)
                                        ),
                                        bgContent: h(
                                            L,
                                            null,
                                            n.renderFillSegs(f[D], 'highlight'),
                                            n.renderFillSegs(
                                                c[D],
                                                'non-business'
                                            ),
                                            n.renderFillSegs(d[D], 'bg-event')
                                        ),
                                    });
                                })
                            );
                        }),
                        (e.prototype.componentDidMount = function () {
                            this.updateSizing(!0);
                        }),
                        (e.prototype.componentDidUpdate = function (n, r) {
                            this.updateSizing(!ae(n, this.props));
                        }),
                        (e.prototype.getHighlightSegs = function () {
                            var n = this.props;
                            return n.eventDrag && n.eventDrag.segs.length
                                ? n.eventDrag.segs
                                : n.eventResize && n.eventResize.segs.length
                                ? n.eventResize.segs
                                : n.dateSelectionSegs;
                        }),
                        (e.prototype.getMirrorSegs = function () {
                            var n = this.props;
                            return n.eventResize && n.eventResize.segs.length
                                ? n.eventResize.segs
                                : [];
                        }),
                        (e.prototype.renderFgSegs = function (
                            n,
                            r,
                            i,
                            o,
                            a,
                            s,
                            l
                        ) {
                            var c = this.context,
                                d = this.props.eventSelection,
                                f = this.state.framePositions,
                                p = 1 === this.props.cells.length,
                                v = a || s || l,
                                g = [];
                            if (f)
                                for (var b = 0, E = r; b < E.length; b++) {
                                    var m = E[b],
                                        w = m.seg,
                                        C = w.eventRange.instance.instanceId,
                                        D = C + ':' + n,
                                        _ = m.isVisible && !o[C],
                                        k = m.isAbsolute,
                                        P = '',
                                        T = '';
                                    k &&
                                        (c.isRtl
                                            ? ((T = 0),
                                              (P =
                                                  f.lefts[w.lastCol] -
                                                  f.lefts[w.firstCol]))
                                            : ((P = 0),
                                              (T =
                                                  f.rights[w.firstCol] -
                                                  f.rights[w.lastCol]))),
                                        g.push(
                                            h(
                                                'div',
                                                {
                                                    className:
                                                        'fc-daygrid-event-harness' +
                                                        (k
                                                            ? ' fc-daygrid-event-harness-abs'
                                                            : ''),
                                                    key: D,
                                                    ref: v
                                                        ? null
                                                        : this.segHarnessRefs.createRef(
                                                              D
                                                          ),
                                                    style: {
                                                        visibility: _
                                                            ? ''
                                                            : 'hidden',
                                                        marginTop: k
                                                            ? ''
                                                            : m.marginTop,
                                                        top: k
                                                            ? m.absoluteTop
                                                            : '',
                                                        left: P,
                                                        right: T,
                                                    },
                                                },
                                                aa(w)
                                                    ? h(
                                                          la,
                                                          (0, u.pi)(
                                                              {
                                                                  seg: w,
                                                                  isDragging: a,
                                                                  isSelected:
                                                                      C === d,
                                                                  defaultDisplayEventEnd:
                                                                      p,
                                                              },
                                                              Ae(w, i)
                                                          )
                                                      )
                                                    : h(
                                                          sa,
                                                          (0, u.pi)(
                                                              {
                                                                  seg: w,
                                                                  isDragging: a,
                                                                  isResizing: s,
                                                                  isDateSelecting:
                                                                      l,
                                                                  isSelected:
                                                                      C === d,
                                                                  defaultDisplayEventEnd:
                                                                      p,
                                                              },
                                                              Ae(w, i)
                                                          )
                                                      )
                                            )
                                        );
                                }
                            return g;
                        }),
                        (e.prototype.renderFillSegs = function (n, r) {
                            var i = this.context.isRtl,
                                o = this.props.todayRange,
                                a = this.state.framePositions,
                                s = [];
                            if (a)
                                for (var l = 0, c = n; l < c.length; l++) {
                                    var d = c[l],
                                        f = i
                                            ? {
                                                  right: 0,
                                                  left:
                                                      a.lefts[d.lastCol] -
                                                      a.lefts[d.firstCol],
                                              }
                                            : {
                                                  left: 0,
                                                  right:
                                                      a.rights[d.firstCol] -
                                                      a.rights[d.lastCol],
                                              };
                                    s.push(
                                        h(
                                            'div',
                                            {
                                                key: Fi(d.eventRange),
                                                className:
                                                    'fc-daygrid-bg-harness',
                                                style: f,
                                            },
                                            'bg-event' === r
                                                ? h(
                                                      Vo,
                                                      (0, u.pi)(
                                                          { seg: d },
                                                          Ae(d, o)
                                                      )
                                                  )
                                                : Wo(r)
                                        )
                                    );
                                }
                            return h.apply(void 0, (0, u.ev)([L, {}], s));
                        }),
                        (e.prototype.updateSizing = function (n) {
                            var i = this.props,
                                o = this.frameElRefs;
                            if (!i.forPrint && null !== i.clientWidth) {
                                if (n) {
                                    var a = i.cells.map(function (f) {
                                        return o.currentMap[f.key];
                                    });
                                    a.length &&
                                        this.setState({
                                            framePositions: new $e(
                                                this.rootElRef.current,
                                                a,
                                                !0,
                                                !1
                                            ),
                                        });
                                }
                                var l = this.state.eventInstanceHeights,
                                    c = this.queryEventInstanceHeights(),
                                    d =
                                        !0 === i.dayMaxEvents ||
                                        !0 === i.dayMaxEventRows;
                                this.setState({
                                    eventInstanceHeights: (0, u.pi)(
                                        (0, u.pi)({}, l),
                                        c
                                    ),
                                    maxContentHeight: d
                                        ? this.computeMaxContentHeight()
                                        : null,
                                });
                            }
                        }),
                        (e.prototype.queryEventInstanceHeights = function () {
                            var n = this.segHarnessRefs.currentMap,
                                r = {};
                            for (var i in n) {
                                var o = Math.round(
                                        n[i].getBoundingClientRect().height
                                    ),
                                    a = i.split(':')[0];
                                r[a] = Math.max(r[a] || 0, o);
                            }
                            return r;
                        }),
                        (e.prototype.computeMaxContentHeight = function () {
                            var n = this.props.cells[0].key,
                                i = this.fgElRefs.currentMap[n];
                            return (
                                this.cellElRefs.currentMap[
                                    n
                                ].getBoundingClientRect().bottom -
                                i.getBoundingClientRect().top
                            );
                        }),
                        (e.prototype.getCellEls = function () {
                            var n = this.cellElRefs.currentMap;
                            return this.props.cells.map(function (r) {
                                return n[r.key];
                            });
                        }),
                        e
                    );
                })(ce);
            ca.addStateEquality({ eventInstanceHeights: ae });
            var wu = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (
                        (n.splitBusinessHourSegs = x(Vt)),
                        (n.splitBgEventSegs = x(Vt)),
                        (n.splitFgEventSegs = x(Vt)),
                        (n.splitDateSelectionSegs = x(Vt)),
                        (n.splitEventDrag = x(ia)),
                        (n.splitEventResize = x(ia)),
                        (n.rowRefs = new fe()),
                        (n.handleRootEl = function (r) {
                            (n.rootEl = r),
                                r
                                    ? n.context.registerInteractiveComponent(
                                          n,
                                          {
                                              el: r,
                                              isHitComboAllowed:
                                                  n.props.isHitComboAllowed,
                                          }
                                      )
                                    : n.context.unregisterInteractiveComponent(
                                          n
                                      );
                        }),
                        n
                    );
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.render = function () {
                        var n = this,
                            r = this.props,
                            i = r.dateProfile,
                            o = r.dayMaxEventRows,
                            a = r.dayMaxEvents,
                            s = r.expandRows,
                            l = r.cells.length,
                            c = this.splitBusinessHourSegs(
                                r.businessHourSegs,
                                l
                            ),
                            d = this.splitBgEventSegs(r.bgEventSegs, l),
                            f = this.splitFgEventSegs(r.fgEventSegs, l),
                            p = this.splitDateSelectionSegs(
                                r.dateSelectionSegs,
                                l
                            ),
                            v = this.splitEventDrag(r.eventDrag, l),
                            g = this.splitEventResize(r.eventResize, l),
                            b = !0 === a || !0 === o;
                        return (
                            b && !s && ((b = !1), (o = null), (a = null)),
                            h(
                                'div',
                                {
                                    className: [
                                        'fc-daygrid-body',
                                        b
                                            ? 'fc-daygrid-body-balanced'
                                            : 'fc-daygrid-body-unbalanced',
                                        s ? '' : 'fc-daygrid-body-natural',
                                    ].join(' '),
                                    ref: this.handleRootEl,
                                    style: {
                                        width: r.clientWidth,
                                        minWidth: r.tableMinWidth,
                                    },
                                },
                                h(zt, { unit: 'day' }, function (m, w) {
                                    return h(
                                        L,
                                        null,
                                        h(
                                            'table',
                                            {
                                                role: 'presentation',
                                                className:
                                                    'fc-scrollgrid-sync-table',
                                                style: {
                                                    width: r.clientWidth,
                                                    minWidth: r.tableMinWidth,
                                                    height: s
                                                        ? r.clientHeight
                                                        : '',
                                                },
                                            },
                                            r.colGroupNode,
                                            h(
                                                'tbody',
                                                { role: 'presentation' },
                                                r.cells.map(function (C, D) {
                                                    return h(ca, {
                                                        ref: n.rowRefs.createRef(
                                                            D
                                                        ),
                                                        key: C.length
                                                            ? C[0].date.toISOString()
                                                            : D,
                                                        showDayNumbers: l > 1,
                                                        showWeekNumbers:
                                                            r.showWeekNumbers,
                                                        todayRange: w,
                                                        dateProfile: i,
                                                        cells: C,
                                                        renderIntro:
                                                            r.renderRowIntro,
                                                        businessHourSegs: c[D],
                                                        eventSelection:
                                                            r.eventSelection,
                                                        bgEventSegs:
                                                            d[D].filter(Du),
                                                        fgEventSegs: f[D],
                                                        dateSelectionSegs: p[D],
                                                        eventDrag: v[D],
                                                        eventResize: g[D],
                                                        dayMaxEvents: a,
                                                        dayMaxEventRows: o,
                                                        clientWidth:
                                                            r.clientWidth,
                                                        clientHeight:
                                                            r.clientHeight,
                                                        forPrint: r.forPrint,
                                                    });
                                                })
                                            )
                                        )
                                    );
                                })
                            )
                        );
                    }),
                    (e.prototype.prepareHits = function () {
                        (this.rowPositions = new $e(
                            this.rootEl,
                            this.rowRefs.collect().map(function (n) {
                                return n.getCellEls()[0];
                            }),
                            !1,
                            !0
                        )),
                            (this.colPositions = new $e(
                                this.rootEl,
                                this.rowRefs.currentMap[0].getCellEls(),
                                !0,
                                !1
                            ));
                    }),
                    (e.prototype.queryHit = function (n, r) {
                        var o = this.colPositions,
                            a = this.rowPositions,
                            s = o.leftToIndex(n),
                            l = a.topToIndex(r);
                        if (null != l && null != s) {
                            var c = this.props.cells[l][s];
                            return {
                                dateProfile: this.props.dateProfile,
                                dateSpan: (0, u.pi)(
                                    {
                                        range: this.getCellRange(l, s),
                                        allDay: !0,
                                    },
                                    c.extraDateSpan
                                ),
                                dayEl: this.getCellEl(l, s),
                                rect: {
                                    left: o.lefts[s],
                                    right: o.rights[s],
                                    top: a.tops[l],
                                    bottom: a.bottoms[l],
                                },
                                layer: 0,
                            };
                        }
                        return null;
                    }),
                    (e.prototype.getCellEl = function (n, r) {
                        return this.rowRefs.currentMap[n].getCellEls()[r];
                    }),
                    (e.prototype.getCellRange = function (n, r) {
                        var i = this.props.cells[n][r].date;
                        return { start: i, end: G(i, 1) };
                    }),
                    e
                );
            })(ce);
            function Du(t) {
                return t.eventRange.def.allDay;
            }
            var Cu = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (n.forceDayIfListItem = !0), n;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.sliceRange = function (n, r) {
                            return r.sliceRange(n);
                        }),
                        e
                    );
                })(Ho),
                da = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (n.slicer = new Cu()), (n.tableRef = U()), n;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var r = this.props;
                            return h(
                                wu,
                                (0, u.pi)(
                                    { ref: this.tableRef },
                                    this.slicer.sliceProps(
                                        r,
                                        r.dateProfile,
                                        r.nextDayThreshold,
                                        this.context,
                                        r.dayTableModel
                                    ),
                                    {
                                        dateProfile: r.dateProfile,
                                        cells: r.dayTableModel.cells,
                                        colGroupNode: r.colGroupNode,
                                        tableMinWidth: r.tableMinWidth,
                                        renderRowIntro: r.renderRowIntro,
                                        dayMaxEvents: r.dayMaxEvents,
                                        dayMaxEventRows: r.dayMaxEventRows,
                                        showWeekNumbers: r.showWeekNumbers,
                                        expandRows: r.expandRows,
                                        headerAlignElRef: r.headerAlignElRef,
                                        clientWidth: r.clientWidth,
                                        clientHeight: r.clientHeight,
                                        forPrint: r.forPrint,
                                    }
                                )
                            );
                        }),
                        e
                    );
                })(ce);
            function xu(t, e) {
                var n = new Po(t.renderRange, e);
                return new Bo(n, /year|month|week/.test(t.currentRangeUnit));
            }
            const ku = de({
                initialView: 'dayGridMonth',
                views: {
                    dayGrid: {
                        component: (function (t) {
                            function e() {
                                var n =
                                    (null !== t && t.apply(this, arguments)) ||
                                    this;
                                return (
                                    (n.buildDayTableModel = x(xu)),
                                    (n.headerRef = U()),
                                    (n.tableRef = U()),
                                    n
                                );
                            }
                            return (
                                (0, u.ZT)(e, t),
                                (e.prototype.render = function () {
                                    var n = this,
                                        r = this.context,
                                        i = r.options,
                                        a = this.props,
                                        s = this.buildDayTableModel(
                                            a.dateProfile,
                                            r.dateProfileGenerator
                                        ),
                                        l =
                                            i.dayHeaders &&
                                            h(No, {
                                                ref: this.headerRef,
                                                dateProfile: a.dateProfile,
                                                dates: s.headerDates,
                                                datesRepDistinctDays:
                                                    1 === s.rowCnt,
                                            }),
                                        c = function (d) {
                                            return h(da, {
                                                ref: n.tableRef,
                                                dateProfile: a.dateProfile,
                                                dayTableModel: s,
                                                businessHours: a.businessHours,
                                                dateSelection: a.dateSelection,
                                                eventStore: a.eventStore,
                                                eventUiBases: a.eventUiBases,
                                                eventSelection:
                                                    a.eventSelection,
                                                eventDrag: a.eventDrag,
                                                eventResize: a.eventResize,
                                                nextDayThreshold:
                                                    i.nextDayThreshold,
                                                colGroupNode:
                                                    d.tableColGroupNode,
                                                tableMinWidth: d.tableMinWidth,
                                                dayMaxEvents: i.dayMaxEvents,
                                                dayMaxEventRows:
                                                    i.dayMaxEventRows,
                                                showWeekNumbers: i.weekNumbers,
                                                expandRows: !a.isHeightAuto,
                                                headerAlignElRef: n.headerElRef,
                                                clientWidth: d.clientWidth,
                                                clientHeight: d.clientHeight,
                                                forPrint: a.forPrint,
                                            });
                                        };
                                    return i.dayMinWidth
                                        ? this.renderHScrollLayout(
                                              l,
                                              c,
                                              s.colCnt,
                                              i.dayMinWidth
                                          )
                                        : this.renderSimpleLayout(l, c);
                                }),
                                e
                            );
                        })(lu),
                        dateProfileGeneratorClass: (function (t) {
                            function e() {
                                return (
                                    (null !== t && t.apply(this, arguments)) ||
                                    this
                                );
                            }
                            return (
                                (0, u.ZT)(e, t),
                                (e.prototype.buildRenderRange = function (
                                    n,
                                    r,
                                    i
                                ) {
                                    var c,
                                        o = this.props.dateEnv,
                                        a = t.prototype.buildRenderRange.call(
                                            this,
                                            n,
                                            r,
                                            i
                                        ),
                                        s = a.start,
                                        l = a.end;
                                    if (
                                        (/^(year|month)$/.test(r) &&
                                            ((s = o.startOfWeek(s)),
                                            (c = o.startOfWeek(l)).valueOf() !==
                                                l.valueOf() && (l = pi(c, 1))),
                                        this.props.monthMode &&
                                            this.props.fixedWeekCount)
                                    ) {
                                        var d = Math.ceil(
                                            (function Rs(t, e) {
                                                return he(t, e) / 7;
                                            })(s, l)
                                        );
                                        l = pi(l, 6 - d);
                                    }
                                    return { start: s, end: l };
                                }),
                                e
                            );
                        })(po),
                    },
                    dayGridDay: { type: 'dayGrid', duration: { days: 1 } },
                    dayGridWeek: { type: 'dayGrid', duration: { weeks: 1 } },
                    dayGridMonth: {
                        type: 'dayGrid',
                        duration: { months: 1 },
                        monthMode: !0,
                        fixedWeekCount: !0,
                    },
                },
            });
            R(8537);
            var _u = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.getKeyInfo = function () {
                            return { allDay: {}, timed: {} };
                        }),
                        (e.prototype.getKeysForDateSpan = function (n) {
                            return n.allDay ? ['allDay'] : ['timed'];
                        }),
                        (e.prototype.getKeysForEventDef = function (n) {
                            return n.allDay
                                ? (function Sl(t) {
                                      return (
                                          'background' === t.ui.display ||
                                          'inverse-background' === t.ui.display
                                      );
                                  })(n)
                                    ? ['timed', 'allDay']
                                    : ['allDay']
                                : ['timed'];
                        }),
                        e
                    );
                })(cc),
                Mu = O({
                    hour: 'numeric',
                    minute: '2-digit',
                    omitZeroMinute: !0,
                    meridiem: 'short',
                });
            function fa(t) {
                var e = [
                    'fc-timegrid-slot',
                    'fc-timegrid-slot-label',
                    t.isLabeled
                        ? 'fc-scrollgrid-shrink'
                        : 'fc-timegrid-slot-minor',
                ];
                return h(le.Consumer, null, function (n) {
                    if (!t.isLabeled)
                        return h('td', {
                            className: e.join(' '),
                            'data-time': t.isoTimeStr,
                        });
                    var r = n.dateEnv,
                        i = n.options,
                        o = n.viewApi,
                        a =
                            null == i.slotLabelFormat
                                ? Mu
                                : Array.isArray(i.slotLabelFormat)
                                ? O(i.slotLabelFormat[0])
                                : O(i.slotLabelFormat),
                        s = {
                            level: 0,
                            time: t.time,
                            date: r.toDate(t.date),
                            view: o,
                            text: r.format(t.date, a),
                        };
                    return h(
                        te,
                        {
                            hookProps: s,
                            classNames: i.slotLabelClassNames,
                            content: i.slotLabelContent,
                            defaultContent: Iu,
                            didMount: i.slotLabelDidMount,
                            willUnmount: i.slotLabelWillUnmount,
                        },
                        function (l, c, d, f) {
                            return h(
                                'td',
                                {
                                    ref: l,
                                    className: e.concat(c).join(' '),
                                    'data-time': t.isoTimeStr,
                                },
                                h(
                                    'div',
                                    {
                                        className:
                                            'fc-timegrid-slot-label-frame fc-scrollgrid-shrink-frame',
                                    },
                                    h(
                                        'div',
                                        {
                                            className:
                                                'fc-timegrid-slot-label-cushion fc-scrollgrid-shrink-cushion',
                                            ref: d,
                                        },
                                        f
                                    )
                                )
                            );
                        }
                    );
                });
            }
            function Iu(t) {
                return t.text;
            }
            var Nu = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            return this.props.slatMetas.map(function (n) {
                                return h(
                                    'tr',
                                    { key: n.key },
                                    h(fa, (0, u.pi)({}, n))
                                );
                            });
                        }),
                        e
                    );
                })(I),
                Pu = O({ week: 'short' }),
                Hu = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.allDaySplitter = new _u()),
                            (n.headerElRef = U()),
                            (n.rootElRef = U()),
                            (n.scrollerElRef = U()),
                            (n.state = { slatCoords: null }),
                            (n.handleScrollTopRequest = function (r) {
                                var i = n.scrollerElRef.current;
                                i && (i.scrollTop = r);
                            }),
                            (n.renderHeadAxis = function (r, i) {
                                void 0 === i && (i = '');
                                var o = n.context.options,
                                    s = n.props.dateProfile.renderRange,
                                    c =
                                        1 === he(s.start, s.end)
                                            ? Nt(n.context, s.start, 'week')
                                            : {};
                                return o.weekNumbers && 'day' === r
                                    ? h(
                                          Go,
                                          { date: s.start, defaultFormat: Pu },
                                          function (d, f, p, v) {
                                              return h(
                                                  'th',
                                                  {
                                                      ref: d,
                                                      'aria-hidden': !0,
                                                      className: [
                                                          'fc-timegrid-axis',
                                                          'fc-scrollgrid-shrink',
                                                      ]
                                                          .concat(f)
                                                          .join(' '),
                                                  },
                                                  h(
                                                      'div',
                                                      {
                                                          className:
                                                              'fc-timegrid-axis-frame fc-scrollgrid-shrink-frame fc-timegrid-axis-frame-liquid',
                                                          style: { height: i },
                                                      },
                                                      h(
                                                          'a',
                                                          (0, u.pi)(
                                                              {
                                                                  ref: p,
                                                                  className:
                                                                      'fc-timegrid-axis-cushion fc-scrollgrid-shrink-cushion fc-scrollgrid-sync-inner',
                                                              },
                                                              c
                                                          ),
                                                          v
                                                      )
                                                  )
                                              );
                                          }
                                      )
                                    : h(
                                          'th',
                                          {
                                              'aria-hidden': !0,
                                              className: 'fc-timegrid-axis',
                                          },
                                          h('div', {
                                              className:
                                                  'fc-timegrid-axis-frame',
                                              style: { height: i },
                                          })
                                      );
                            }),
                            (n.renderTableRowAxis = function (r) {
                                var i = n.context,
                                    o = i.options;
                                return h(
                                    te,
                                    {
                                        hookProps: {
                                            text: o.allDayText,
                                            view: i.viewApi,
                                        },
                                        classNames: o.allDayClassNames,
                                        content: o.allDayContent,
                                        defaultContent: Ou,
                                        didMount: o.allDayDidMount,
                                        willUnmount: o.allDayWillUnmount,
                                    },
                                    function (l, c, d, f) {
                                        return h(
                                            'td',
                                            {
                                                ref: l,
                                                'aria-hidden': !0,
                                                className: [
                                                    'fc-timegrid-axis',
                                                    'fc-scrollgrid-shrink',
                                                ]
                                                    .concat(c)
                                                    .join(' '),
                                            },
                                            h(
                                                'div',
                                                {
                                                    className:
                                                        'fc-timegrid-axis-frame fc-scrollgrid-shrink-frame' +
                                                        (null == r
                                                            ? ' fc-timegrid-axis-frame-liquid'
                                                            : ''),
                                                    style: { height: r },
                                                },
                                                h(
                                                    'span',
                                                    {
                                                        className:
                                                            'fc-timegrid-axis-cushion fc-scrollgrid-shrink-cushion fc-scrollgrid-sync-inner',
                                                        ref: d,
                                                    },
                                                    f
                                                )
                                            )
                                        );
                                    }
                                );
                            }),
                            (n.handleSlatCoords = function (r) {
                                n.setState({ slatCoords: r });
                            }),
                            n
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.renderSimpleLayout = function (n, r, i) {
                            var a = this.context,
                                s = this.props,
                                l = [],
                                c = Ut(a.options);
                            return (
                                n &&
                                    l.push({
                                        type: 'header',
                                        key: 'header',
                                        isSticky: c,
                                        chunk: {
                                            elRef: this.headerElRef,
                                            tableClassName: 'fc-col-header',
                                            rowContent: n,
                                        },
                                    }),
                                r &&
                                    (l.push({
                                        type: 'body',
                                        key: 'all-day',
                                        chunk: { content: r },
                                    }),
                                    l.push({
                                        type: 'body',
                                        key: 'all-day-divider',
                                        outerContent: h(
                                            'tr',
                                            {
                                                role: 'presentation',
                                                className:
                                                    'fc-scrollgrid-section',
                                            },
                                            h('td', {
                                                className:
                                                    'fc-timegrid-divider ' +
                                                    a.theme.getClass(
                                                        'tableCellShaded'
                                                    ),
                                            })
                                        ),
                                    })),
                                l.push({
                                    type: 'body',
                                    key: 'body',
                                    liquid: !0,
                                    expandRows: Boolean(a.options.expandRows),
                                    chunk: {
                                        scrollerElRef: this.scrollerElRef,
                                        content: i,
                                    },
                                }),
                                h(
                                    tt,
                                    {
                                        viewSpec: a.viewSpec,
                                        elRef: this.rootElRef,
                                    },
                                    function (d, f) {
                                        return h(
                                            'div',
                                            {
                                                className: ['fc-timegrid']
                                                    .concat(f)
                                                    .join(' '),
                                                ref: d,
                                            },
                                            h(jn, {
                                                liquid:
                                                    !s.isHeightAuto &&
                                                    !s.forPrint,
                                                collapsibleWidth: s.forPrint,
                                                cols: [{ width: 'shrink' }],
                                                sections: l,
                                            })
                                        );
                                    }
                                )
                            );
                        }),
                        (e.prototype.renderHScrollLayout = function (
                            n,
                            r,
                            i,
                            o,
                            a,
                            s,
                            l
                        ) {
                            var c = this,
                                d = this.context.pluginHooks.scrollGridImpl;
                            if (!d)
                                throw new Error('No ScrollGrid implementation');
                            var p = this.context,
                                v = this.props,
                                g = !v.forPrint && Ut(p.options),
                                b = !v.forPrint && Uo(p.options),
                                E = [];
                            n &&
                                E.push({
                                    type: 'header',
                                    key: 'header',
                                    isSticky: g,
                                    syncRowHeights: !0,
                                    chunks: [
                                        {
                                            key: 'axis',
                                            rowContent: function (w) {
                                                return h(
                                                    'tr',
                                                    { role: 'presentation' },
                                                    c.renderHeadAxis(
                                                        'day',
                                                        w.rowSyncHeights[0]
                                                    )
                                                );
                                            },
                                        },
                                        {
                                            key: 'cols',
                                            elRef: this.headerElRef,
                                            tableClassName: 'fc-col-header',
                                            rowContent: n,
                                        },
                                    ],
                                }),
                                r &&
                                    (E.push({
                                        type: 'body',
                                        key: 'all-day',
                                        syncRowHeights: !0,
                                        chunks: [
                                            {
                                                key: 'axis',
                                                rowContent: function (w) {
                                                    return h(
                                                        'tr',
                                                        {
                                                            role: 'presentation',
                                                        },
                                                        c.renderTableRowAxis(
                                                            w.rowSyncHeights[0]
                                                        )
                                                    );
                                                },
                                            },
                                            { key: 'cols', content: r },
                                        ],
                                    }),
                                    E.push({
                                        key: 'all-day-divider',
                                        type: 'body',
                                        outerContent: h(
                                            'tr',
                                            {
                                                role: 'presentation',
                                                className:
                                                    'fc-scrollgrid-section',
                                            },
                                            h('td', {
                                                colSpan: 2,
                                                className:
                                                    'fc-timegrid-divider ' +
                                                    p.theme.getClass(
                                                        'tableCellShaded'
                                                    ),
                                            })
                                        ),
                                    }));
                            var m = p.options.nowIndicator;
                            return (
                                E.push({
                                    type: 'body',
                                    key: 'body',
                                    liquid: !0,
                                    expandRows: Boolean(p.options.expandRows),
                                    chunks: [
                                        {
                                            key: 'axis',
                                            content: function (w) {
                                                return h(
                                                    'div',
                                                    {
                                                        className:
                                                            'fc-timegrid-axis-chunk',
                                                    },
                                                    h(
                                                        'table',
                                                        {
                                                            'aria-hidden': !0,
                                                            style: {
                                                                height: w.expandRows
                                                                    ? w.clientHeight
                                                                    : '',
                                                            },
                                                        },
                                                        w.tableColGroupNode,
                                                        h(
                                                            'tbody',
                                                            null,
                                                            h(Nu, {
                                                                slatMetas: s,
                                                            })
                                                        )
                                                    ),
                                                    h(
                                                        'div',
                                                        {
                                                            className:
                                                                'fc-timegrid-now-indicator-container',
                                                        },
                                                        h(
                                                            zt,
                                                            {
                                                                unit: m
                                                                    ? 'minute'
                                                                    : 'day',
                                                            },
                                                            function (C) {
                                                                var D =
                                                                    m &&
                                                                    l &&
                                                                    l.safeComputeTop(
                                                                        C
                                                                    );
                                                                return 'number' ==
                                                                    typeof D
                                                                    ? h(
                                                                          qn,
                                                                          {
                                                                              isAxis: !0,
                                                                              date: C,
                                                                          },
                                                                          function (
                                                                              _,
                                                                              k,
                                                                              P,
                                                                              T
                                                                          ) {
                                                                              return h(
                                                                                  'div',
                                                                                  {
                                                                                      ref: _,
                                                                                      className:
                                                                                          [
                                                                                              'fc-timegrid-now-indicator-arrow',
                                                                                          ]
                                                                                              .concat(
                                                                                                  k
                                                                                              )
                                                                                              .join(
                                                                                                  ' '
                                                                                              ),
                                                                                      style: {
                                                                                          top: D,
                                                                                      },
                                                                                  },
                                                                                  T
                                                                              );
                                                                          }
                                                                      )
                                                                    : null;
                                                            }
                                                        )
                                                    )
                                                );
                                            },
                                        },
                                        {
                                            key: 'cols',
                                            scrollerElRef: this.scrollerElRef,
                                            content: i,
                                        },
                                    ],
                                }),
                                b &&
                                    E.push({
                                        key: 'footer',
                                        type: 'footer',
                                        isSticky: !0,
                                        chunks: [
                                            { key: 'axis', content: Zn },
                                            { key: 'cols', content: Zn },
                                        ],
                                    }),
                                h(
                                    tt,
                                    {
                                        viewSpec: p.viewSpec,
                                        elRef: this.rootElRef,
                                    },
                                    function (w, C) {
                                        return h(
                                            'div',
                                            {
                                                className: ['fc-timegrid']
                                                    .concat(C)
                                                    .join(' '),
                                                ref: w,
                                            },
                                            h(d, {
                                                liquid:
                                                    !v.isHeightAuto &&
                                                    !v.forPrint,
                                                collapsibleWidth: !1,
                                                colGroups: [
                                                    {
                                                        width: 'shrink',
                                                        cols: [
                                                            { width: 'shrink' },
                                                        ],
                                                    },
                                                    {
                                                        cols: [
                                                            {
                                                                span: o,
                                                                minWidth: a,
                                                            },
                                                        ],
                                                    },
                                                ],
                                                sections: E,
                                            })
                                        );
                                    }
                                )
                            );
                        }),
                        (e.prototype.getAllDayMaxEventProps = function () {
                            var n = this.context.options,
                                r = n.dayMaxEvents,
                                i = n.dayMaxEventRows;
                            return (
                                (!0 === r || !0 === i) &&
                                    ((r = void 0), (i = 5)),
                                { dayMaxEvents: r, dayMaxEventRows: i }
                            );
                        }),
                        e
                    );
                })(ce);
            function Ou(t) {
                return t.text;
            }
            var zu = (function () {
                    function t(e, n, r) {
                        (this.positions = e),
                            (this.dateProfile = n),
                            (this.slotDuration = r);
                    }
                    return (
                        (t.prototype.safeComputeTop = function (e) {
                            var n = this.dateProfile;
                            if (be(n.currentRange, e)) {
                                var r = H(e),
                                    i = e.valueOf() - r.valueOf();
                                if (
                                    i >= Y(n.slotMinTime) &&
                                    i < Y(n.slotMaxTime)
                                )
                                    return this.computeTimeTop(M(i));
                            }
                            return null;
                        }),
                        (t.prototype.computeDateTop = function (e, n) {
                            return (
                                n || (n = H(e)),
                                this.computeTimeTop(
                                    M(e.valueOf() - n.valueOf())
                                )
                            );
                        }),
                        (t.prototype.computeTimeTop = function (e) {
                            var s,
                                l,
                                r = this.positions,
                                o = r.els.length,
                                a =
                                    (e.milliseconds -
                                        Y(this.dateProfile.slotMinTime)) /
                                    Y(this.slotDuration);
                            return (
                                (a = Math.max(0, a)),
                                (a = Math.min(o, a)),
                                (s = Math.floor(a)),
                                (l = a - (s = Math.min(s, o - 1))),
                                r.tops[s] + r.getHeight(s) * l
                            );
                        }),
                        t
                    );
                })(),
                Fu = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var r = this.props,
                                i = this.context,
                                o = i.options,
                                a = r.slatElRefs;
                            return h(
                                'tbody',
                                null,
                                r.slatMetas.map(function (s, l) {
                                    var c = {
                                            time: s.time,
                                            date: i.dateEnv.toDate(s.date),
                                            view: i.viewApi,
                                        },
                                        d = [
                                            'fc-timegrid-slot',
                                            'fc-timegrid-slot-lane',
                                            s.isLabeled
                                                ? ''
                                                : 'fc-timegrid-slot-minor',
                                        ];
                                    return h(
                                        'tr',
                                        { key: s.key, ref: a.createRef(s.key) },
                                        r.axis && h(fa, (0, u.pi)({}, s)),
                                        h(
                                            te,
                                            {
                                                hookProps: c,
                                                classNames:
                                                    o.slotLaneClassNames,
                                                content: o.slotLaneContent,
                                                didMount: o.slotLaneDidMount,
                                                willUnmount:
                                                    o.slotLaneWillUnmount,
                                            },
                                            function (f, p, v, g) {
                                                return h(
                                                    'td',
                                                    {
                                                        ref: f,
                                                        className: d
                                                            .concat(p)
                                                            .join(' '),
                                                        'data-time':
                                                            s.isoTimeStr,
                                                    },
                                                    g
                                                );
                                            }
                                        )
                                    );
                                })
                            );
                        }),
                        e
                    );
                })(I),
                Uu = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.rootElRef = U()), (n.slatElRefs = new fe()), n
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var r = this.props;
                            return h(
                                'div',
                                {
                                    ref: this.rootElRef,
                                    className: 'fc-timegrid-slots',
                                },
                                h(
                                    'table',
                                    {
                                        'aria-hidden': !0,
                                        className:
                                            this.context.theme.getClass(
                                                'table'
                                            ),
                                        style: {
                                            minWidth: r.tableMinWidth,
                                            width: r.clientWidth,
                                            height: r.minHeight,
                                        },
                                    },
                                    r.tableColGroupNode,
                                    h(Fu, {
                                        slatElRefs: this.slatElRefs,
                                        axis: r.axis,
                                        slatMetas: r.slatMetas,
                                    })
                                )
                            );
                        }),
                        (e.prototype.componentDidMount = function () {
                            this.updateSizing();
                        }),
                        (e.prototype.componentDidUpdate = function () {
                            this.updateSizing();
                        }),
                        (e.prototype.componentWillUnmount = function () {
                            this.props.onCoords && this.props.onCoords(null);
                        }),
                        (e.prototype.updateSizing = function () {
                            var r = this.context,
                                i = this.props;
                            i.onCoords &&
                                null !== i.clientWidth &&
                                this.rootElRef.current.offsetHeight &&
                                i.onCoords(
                                    new zu(
                                        new $e(
                                            this.rootElRef.current,
                                            (function Lu(t, e) {
                                                return e.map(function (n) {
                                                    return t[n.key];
                                                });
                                            })(
                                                this.slatElRefs.currentMap,
                                                i.slatMetas
                                            ),
                                            !1,
                                            !0
                                        ),
                                        this.props.dateProfile,
                                        r.options.slotDuration
                                    )
                                );
                        }),
                        e
                    );
                })(I);
            function rt(t, e) {
                var r,
                    n = [];
                for (r = 0; r < e; r += 1) n.push([]);
                if (t) for (r = 0; r < t.length; r += 1) n[t[r].col].push(t[r]);
                return n;
            }
            function ua(t, e) {
                var n = [];
                if (t) {
                    for (var r = 0; r < e; r += 1)
                        n[r] = {
                            affectedInstances: t.affectedInstances,
                            isEvent: t.isEvent,
                            segs: [],
                        };
                    for (var i = 0, o = t.segs; i < o.length; i++) {
                        var a = o[i];
                        n[a.col].segs.push(a);
                    }
                } else for (r = 0; r < e; r += 1) n[r] = null;
                return n;
            }
            var Qu = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (n.rootElRef = U()), n;
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.render = function () {
                        var n = this,
                            r = this.props;
                        return h(
                            Zo,
                            {
                                allDayDate: null,
                                moreCnt: r.hiddenSegs.length,
                                allSegs: r.hiddenSegs,
                                hiddenSegs: r.hiddenSegs,
                                alignmentElRef: this.rootElRef,
                                defaultContent: Wu,
                                extraDateSpan: r.extraDateSpan,
                                dateProfile: r.dateProfile,
                                todayRange: r.todayRange,
                                popoverContent: function () {
                                    return ga(r.hiddenSegs, r);
                                },
                            },
                            function (i, o, a, s, l, c, d, f) {
                                return h(
                                    'a',
                                    {
                                        ref: function (p) {
                                            $(i, p), $(n.rootElRef, p);
                                        },
                                        className: ['fc-timegrid-more-link']
                                            .concat(o)
                                            .join(' '),
                                        style: { top: r.top, bottom: r.bottom },
                                        onClick: l,
                                        title: c,
                                        'aria-expanded': d,
                                        'aria-controls': f,
                                    },
                                    h(
                                        'div',
                                        {
                                            ref: a,
                                            className:
                                                'fc-timegrid-more-link-inner fc-sticky',
                                        },
                                        s
                                    )
                                );
                            }
                        );
                    }),
                    e
                );
            })(I);
            function Wu(t) {
                return t.shortText;
            }
            function pa(t, e) {
                if (!t) return [[], 0];
                for (
                    var n = t.level,
                        i = t.lateralEnd,
                        o = t.lateralStart,
                        a = [];
                    o < i;

                )
                    a.push(e(n, o)), (o += 1);
                return a.sort(Zu), [a.map(ju), a[0][1]];
            }
            function Zu(t, e) {
                return e[1] - t[1];
            }
            function ju(t) {
                return t[0];
            }
            function rr(t, e) {
                var n = {};
                return function () {
                    for (var r = [], i = 0; i < arguments.length; i++)
                        r[i] = arguments[i];
                    var o = t.apply(void 0, r);
                    return o in n ? n[o] : (n[o] = e.apply(void 0, r));
                };
            }
            function va(t, e, n, r) {
                void 0 === n && (n = null), void 0 === r && (r = 0);
                var i = [];
                if (n)
                    for (var o = 0; o < t.length; o += 1) {
                        var a = t[o],
                            s = n.computeDateTop(a.start, e),
                            l = Math.max(
                                s + (r || 0),
                                n.computeDateTop(a.end, e)
                            );
                        i.push({ start: Math.round(s), end: Math.round(l) });
                    }
                return i;
            }
            var Ku = O({ hour: 'numeric', minute: '2-digit', meridiem: !1 }),
                ha = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = ['fc-timegrid-event', 'fc-v-event'];
                            return (
                                this.props.isShort &&
                                    n.push('fc-timegrid-event-short'),
                                h(
                                    Lo,
                                    (0, u.pi)({}, this.props, {
                                        defaultTimeFormat: Ku,
                                        extraClassNames: n,
                                    })
                                )
                            );
                        }),
                        e
                    );
                })(I),
                $u = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this.props;
                            return h(
                                Jn,
                                {
                                    date: n.date,
                                    dateProfile: n.dateProfile,
                                    todayRange: n.todayRange,
                                    extraHookProps: n.extraHookProps,
                                },
                                function (r, i) {
                                    return (
                                        i &&
                                        h(
                                            'div',
                                            {
                                                className:
                                                    'fc-timegrid-col-misc',
                                                ref: r,
                                            },
                                            i
                                        )
                                    );
                                }
                            );
                        }),
                        e
                    );
                })(I),
                ep = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (n.sortEventSegs = x(Oi)), n;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this,
                                i = this.props,
                                o = this.context,
                                a = o.options.selectMirror,
                                s =
                                    (i.eventDrag && i.eventDrag.segs) ||
                                    (i.eventResize && i.eventResize.segs) ||
                                    (a && i.dateSelectionSegs) ||
                                    [],
                                l =
                                    (i.eventDrag &&
                                        i.eventDrag.affectedInstances) ||
                                    (i.eventResize &&
                                        i.eventResize.affectedInstances) ||
                                    {},
                                c = this.sortEventSegs(
                                    i.fgEventSegs,
                                    o.options.eventOrder
                                );
                            return h(
                                Xn,
                                {
                                    elRef: i.elRef,
                                    date: i.date,
                                    dateProfile: i.dateProfile,
                                    todayRange: i.todayRange,
                                    extraHookProps: i.extraHookProps,
                                },
                                function (d, f, p) {
                                    return h(
                                        'td',
                                        (0, u.pi)(
                                            {
                                                ref: d,
                                                role: 'gridcell',
                                                className: ['fc-timegrid-col']
                                                    .concat(
                                                        f,
                                                        i.extraClassNames || []
                                                    )
                                                    .join(' '),
                                            },
                                            p,
                                            i.extraDataAttrs
                                        ),
                                        h(
                                            'div',
                                            {
                                                className:
                                                    'fc-timegrid-col-frame',
                                            },
                                            h(
                                                'div',
                                                {
                                                    className:
                                                        'fc-timegrid-col-bg',
                                                },
                                                n.renderFillSegs(
                                                    i.businessHourSegs,
                                                    'non-business'
                                                ),
                                                n.renderFillSegs(
                                                    i.bgEventSegs,
                                                    'bg-event'
                                                ),
                                                n.renderFillSegs(
                                                    i.dateSelectionSegs,
                                                    'highlight'
                                                )
                                            ),
                                            h(
                                                'div',
                                                {
                                                    className:
                                                        'fc-timegrid-col-events',
                                                },
                                                n.renderFgSegs(c, l, !1, !1, !1)
                                            ),
                                            h(
                                                'div',
                                                {
                                                    className:
                                                        'fc-timegrid-col-events',
                                                },
                                                n.renderFgSegs(
                                                    s,
                                                    {},
                                                    Boolean(i.eventDrag),
                                                    Boolean(i.eventResize),
                                                    Boolean(a)
                                                )
                                            ),
                                            h(
                                                'div',
                                                {
                                                    className:
                                                        'fc-timegrid-now-indicator-container',
                                                },
                                                n.renderNowIndicator(
                                                    i.nowIndicatorSegs
                                                )
                                            ),
                                            h($u, {
                                                date: i.date,
                                                dateProfile: i.dateProfile,
                                                todayRange: i.todayRange,
                                                extraHookProps:
                                                    i.extraHookProps,
                                            })
                                        )
                                    );
                                }
                            );
                        }),
                        (e.prototype.renderFgSegs = function (n, r, i, o, a) {
                            var s = this.props;
                            return s.forPrint
                                ? ga(n, s)
                                : this.renderPositionedFgSegs(n, r, i, o, a);
                        }),
                        (e.prototype.renderPositionedFgSegs = function (
                            n,
                            r,
                            i,
                            o,
                            a
                        ) {
                            var s = this,
                                l = this.context.options,
                                c = l.eventMaxStack,
                                d = l.eventShortHeight,
                                f = l.eventOrderStrict,
                                v = this.props,
                                E = v.eventSelection,
                                m = v.todayRange,
                                w = v.nowDate,
                                C = i || o || a,
                                _ = (function Xu(t, e, n, r) {
                                    for (
                                        var i = [], o = [], a = 0;
                                        a < t.length;
                                        a += 1
                                    ) {
                                        var s = e[a];
                                        s
                                            ? i.push({
                                                  index: a,
                                                  thickness: 1,
                                                  span: s,
                                              })
                                            : o.push(t[a]);
                                    }
                                    for (
                                        var l = (function Vu(t, e, n) {
                                                var r = new To();
                                                null != e &&
                                                    (r.strictOrder = e),
                                                    null != n &&
                                                        (r.maxStackCnt = n);
                                                var o = (function Ud(t) {
                                                        for (
                                                            var e = [],
                                                                n = 0,
                                                                r = t;
                                                            n < r.length;
                                                            n++
                                                        ) {
                                                            for (
                                                                var i = r[n],
                                                                    o = [],
                                                                    a = {
                                                                        span: i.span,
                                                                        entries:
                                                                            [i],
                                                                    },
                                                                    s = 0,
                                                                    l = e;
                                                                s < l.length;
                                                                s++
                                                            ) {
                                                                var c = l[s];
                                                                zn(
                                                                    c.span,
                                                                    a.span
                                                                )
                                                                    ? (a = {
                                                                          entries:
                                                                              c.entries.concat(
                                                                                  a.entries
                                                                              ),
                                                                          span: Ld(
                                                                              c.span,
                                                                              a.span
                                                                          ),
                                                                      })
                                                                    : o.push(c);
                                                            }
                                                            o.push(a), (e = o);
                                                        }
                                                        return e;
                                                    })(r.addSegs(t)),
                                                    a = (function Gu(t) {
                                                        var e =
                                                                t.entriesByLevel,
                                                            n = rr(
                                                                function (
                                                                    r,
                                                                    i
                                                                ) {
                                                                    return (
                                                                        r +
                                                                        ':' +
                                                                        i
                                                                    );
                                                                },
                                                                function (
                                                                    r,
                                                                    i
                                                                ) {
                                                                    var o =
                                                                            (function Yu(
                                                                                t,
                                                                                e,
                                                                                n
                                                                            ) {
                                                                                for (
                                                                                    var r =
                                                                                            t.levelCoords,
                                                                                        i =
                                                                                            t.entriesByLevel,
                                                                                        o =
                                                                                            i[
                                                                                                e
                                                                                            ][
                                                                                                n
                                                                                            ],
                                                                                        a =
                                                                                            r[
                                                                                                e
                                                                                            ] +
                                                                                            o.thickness,
                                                                                        s =
                                                                                            r.length,
                                                                                        l =
                                                                                            e;
                                                                                    l <
                                                                                        s &&
                                                                                    r[
                                                                                        l
                                                                                    ] <
                                                                                        a;
                                                                                    l += 1
                                                                                );
                                                                                for (
                                                                                    ;
                                                                                    l <
                                                                                    s;
                                                                                    l += 1
                                                                                ) {
                                                                                    for (
                                                                                        var c =
                                                                                                i[
                                                                                                    l
                                                                                                ],
                                                                                            d =
                                                                                                void 0,
                                                                                            f =
                                                                                                Un(
                                                                                                    c,
                                                                                                    o
                                                                                                        .span
                                                                                                        .start,
                                                                                                    On
                                                                                                ),
                                                                                            p =
                                                                                                f[0] +
                                                                                                f[1],
                                                                                            v =
                                                                                                p;
                                                                                        (d =
                                                                                            c[
                                                                                                v
                                                                                            ]) &&
                                                                                        d
                                                                                            .span
                                                                                            .start <
                                                                                            o
                                                                                                .span
                                                                                                .end;

                                                                                    )
                                                                                        v += 1;
                                                                                    if (
                                                                                        p <
                                                                                        v
                                                                                    )
                                                                                        return {
                                                                                            level: l,
                                                                                            lateralStart:
                                                                                                p,
                                                                                            lateralEnd:
                                                                                                v,
                                                                                        };
                                                                                }
                                                                                return null;
                                                                            })(
                                                                                t,
                                                                                r,
                                                                                i
                                                                            ),
                                                                        a = pa(
                                                                            o,
                                                                            n
                                                                        ),
                                                                        s =
                                                                            e[
                                                                                r
                                                                            ][
                                                                                i
                                                                            ];
                                                                    return [
                                                                        (0,
                                                                        u.pi)(
                                                                            (0,
                                                                            u.pi)(
                                                                                {},
                                                                                s
                                                                            ),
                                                                            {
                                                                                nextLevelNodes:
                                                                                    a[0],
                                                                            }
                                                                        ),
                                                                        s.thickness +
                                                                            a[1],
                                                                    ];
                                                                }
                                                            );
                                                        return pa(
                                                            e.length
                                                                ? {
                                                                      level: 0,
                                                                      lateralStart: 0,
                                                                      lateralEnd:
                                                                          e[0]
                                                                              .length,
                                                                  }
                                                                : null,
                                                            n
                                                        )[0];
                                                    })(r);
                                                a = (function qu(t, e) {
                                                    var n = rr(
                                                        function (r, i, o) {
                                                            return xe(r);
                                                        },
                                                        function (r, i, o) {
                                                            var d,
                                                                a =
                                                                    r.nextLevelNodes,
                                                                s = r.thickness,
                                                                l = s + o,
                                                                c = s / l,
                                                                f = [];
                                                            if (a.length)
                                                                for (
                                                                    var p = 0,
                                                                        v = a;
                                                                    p <
                                                                    v.length;
                                                                    p++
                                                                ) {
                                                                    var g =
                                                                        v[p];
                                                                    if (
                                                                        void 0 ===
                                                                        d
                                                                    )
                                                                        (d =
                                                                            (b =
                                                                                n(
                                                                                    g,
                                                                                    i,
                                                                                    l
                                                                                ))[0]),
                                                                            f.push(
                                                                                b[1]
                                                                            );
                                                                    else {
                                                                        var b =
                                                                            n(
                                                                                g,
                                                                                d,
                                                                                0
                                                                            );
                                                                        f.push(
                                                                            b[1]
                                                                        );
                                                                    }
                                                                }
                                                            else d = e;
                                                            var E = (d - i) * c;
                                                            return [
                                                                d - E,
                                                                (0, u.pi)(
                                                                    (0, u.pi)(
                                                                        {},
                                                                        r
                                                                    ),
                                                                    {
                                                                        thickness:
                                                                            E,
                                                                        nextLevelNodes:
                                                                            f,
                                                                    }
                                                                ),
                                                            ];
                                                        }
                                                    );
                                                    return t.map(function (r) {
                                                        return n(r, 0, 0)[1];
                                                    });
                                                })(a, 1);
                                                var s = (function Ju(t) {
                                                    var e = [],
                                                        n = rr(
                                                            function (i, o, a) {
                                                                return xe(i);
                                                            },
                                                            function (i, o, a) {
                                                                var s = (0,
                                                                u.pi)(
                                                                    (0, u.pi)(
                                                                        {},
                                                                        i
                                                                    ),
                                                                    {
                                                                        levelCoord:
                                                                            o,
                                                                        stackDepth:
                                                                            a,
                                                                        stackForward: 0,
                                                                    }
                                                                );
                                                                return (
                                                                    e.push(s),
                                                                    (s.stackForward =
                                                                        r(
                                                                            i.nextLevelNodes,
                                                                            o +
                                                                                i.thickness,
                                                                            a +
                                                                                1
                                                                        ) + 1)
                                                                );
                                                            }
                                                        );
                                                    function r(i, o, a) {
                                                        for (
                                                            var s = 0,
                                                                l = 0,
                                                                c = i;
                                                            l < c.length;
                                                            l++
                                                        )
                                                            s = Math.max(
                                                                n(c[l], o, a),
                                                                s
                                                            );
                                                        return s;
                                                    }
                                                    return r(t, 0, 0), e;
                                                })(a);
                                                return {
                                                    segRects: s,
                                                    hiddenGroups: o,
                                                };
                                            })(i, n, r),
                                            d = l.hiddenGroups,
                                            f = [],
                                            p = 0,
                                            v = l.segRects;
                                        p < v.length;
                                        p++
                                    ) {
                                        var g = v[p];
                                        f.push({ seg: t[g.index], rect: g });
                                    }
                                    for (var b = 0, E = o; b < E.length; b++)
                                        f.push({ seg: E[b], rect: null });
                                    return {
                                        segPlacements: f,
                                        hiddenGroups: d,
                                    };
                                })(
                                    n,
                                    va(
                                        n,
                                        v.date,
                                        v.slatCoords,
                                        l.eventMinHeight
                                    ),
                                    f,
                                    c
                                ),
                                k = _.segPlacements;
                            return h(
                                L,
                                null,
                                this.renderHiddenGroups(_.hiddenGroups, n),
                                k.map(function (T) {
                                    var F = T.seg,
                                        B = T.rect,
                                        q = F.eventRange.instance.instanceId,
                                        Z = C || Boolean(!r[q] && B),
                                        Qe = ir(B && B.span),
                                        We =
                                            !C && B
                                                ? s.computeSegHStyle(B)
                                                : { left: 0, right: 0 },
                                        at = Boolean(B) && B.stackForward > 0,
                                        Vp =
                                            Boolean(B) &&
                                            B.span.end - B.span.start < d;
                                    return h(
                                        'div',
                                        {
                                            className:
                                                'fc-timegrid-event-harness' +
                                                (at
                                                    ? ' fc-timegrid-event-harness-inset'
                                                    : ''),
                                            key: q,
                                            style: (0, u.pi)(
                                                (0, u.pi)(
                                                    {
                                                        visibility: Z
                                                            ? ''
                                                            : 'hidden',
                                                    },
                                                    Qe
                                                ),
                                                We
                                            ),
                                        },
                                        h(
                                            ha,
                                            (0, u.pi)(
                                                {
                                                    seg: F,
                                                    isDragging: i,
                                                    isResizing: o,
                                                    isDateSelecting: a,
                                                    isSelected: q === E,
                                                    isShort: Vp,
                                                },
                                                Ae(F, m, w)
                                            )
                                        )
                                    );
                                })
                            );
                        }),
                        (e.prototype.renderHiddenGroups = function (n, r) {
                            var i = this.props,
                                o = i.extraDateSpan,
                                a = i.dateProfile,
                                s = i.todayRange,
                                l = i.nowDate,
                                c = i.eventSelection,
                                d = i.eventDrag,
                                f = i.eventResize;
                            return h(
                                L,
                                null,
                                n.map(function (p) {
                                    var v = ir(p.span),
                                        g = (function tp(t, e) {
                                            return t.map(function (n) {
                                                return e[n.index];
                                            });
                                        })(p.entries, r);
                                    return h(Qu, {
                                        key: wi(Yo(g)),
                                        hiddenSegs: g,
                                        top: v.top,
                                        bottom: v.bottom,
                                        extraDateSpan: o,
                                        dateProfile: a,
                                        todayRange: s,
                                        nowDate: l,
                                        eventSelection: c,
                                        eventDrag: d,
                                        eventResize: f,
                                    });
                                })
                            );
                        }),
                        (e.prototype.renderFillSegs = function (n, r) {
                            var o = this.props,
                                l = va(
                                    n,
                                    o.date,
                                    o.slatCoords,
                                    this.context.options.eventMinHeight
                                ).map(function (c, d) {
                                    var f = n[d];
                                    return h(
                                        'div',
                                        {
                                            key: Fi(f.eventRange),
                                            className: 'fc-timegrid-bg-harness',
                                            style: ir(c),
                                        },
                                        'bg-event' === r
                                            ? h(
                                                  Vo,
                                                  (0, u.pi)(
                                                      { seg: f },
                                                      Ae(
                                                          f,
                                                          o.todayRange,
                                                          o.nowDate
                                                      )
                                                  )
                                              )
                                            : Wo(r)
                                    );
                                });
                            return h(L, null, l);
                        }),
                        (e.prototype.renderNowIndicator = function (n) {
                            var r = this.props,
                                i = r.slatCoords,
                                o = r.date;
                            return i
                                ? n.map(function (a, s) {
                                      return h(
                                          qn,
                                          { isAxis: !1, date: o, key: s },
                                          function (l, c, d, f) {
                                              return h(
                                                  'div',
                                                  {
                                                      ref: l,
                                                      className: [
                                                          'fc-timegrid-now-indicator-line',
                                                      ]
                                                          .concat(c)
                                                          .join(' '),
                                                      style: {
                                                          top: i.computeDateTop(
                                                              a.start,
                                                              o
                                                          ),
                                                      },
                                                  },
                                                  f
                                              );
                                          }
                                      );
                                  })
                                : null;
                        }),
                        (e.prototype.computeSegHStyle = function (n) {
                            var c,
                                d,
                                r = this.context,
                                i = r.isRtl,
                                a = r.options.slotEventOverlap,
                                s = n.levelCoord,
                                l = n.levelCoord + n.thickness;
                            a && (l = Math.min(1, s + 2 * (l - s))),
                                i
                                    ? ((c = 1 - l), (d = s))
                                    : ((c = s), (d = 1 - l));
                            var f = {
                                zIndex: n.stackDepth + 1,
                                left: 100 * c + '%',
                                right: 100 * d + '%',
                            };
                            return (
                                a &&
                                    !n.stackForward &&
                                    (f[i ? 'marginLeft' : 'marginRight'] = 20),
                                f
                            );
                        }),
                        e
                    );
                })(I);
            function ga(t, e) {
                var n = e.todayRange,
                    r = e.nowDate,
                    i = e.eventSelection,
                    o = e.eventDrag,
                    a = e.eventResize,
                    s =
                        (o ? o.affectedInstances : null) ||
                        (a ? a.affectedInstances : null) ||
                        {};
                return h(
                    L,
                    null,
                    t.map(function (l) {
                        var c = l.eventRange.instance.instanceId;
                        return h(
                            'div',
                            {
                                key: c,
                                style: { visibility: s[c] ? 'hidden' : '' },
                            },
                            h(
                                ha,
                                (0, u.pi)(
                                    {
                                        seg: l,
                                        isDragging: !1,
                                        isResizing: !1,
                                        isDateSelecting: !1,
                                        isSelected: c === i,
                                        isShort: !1,
                                    },
                                    Ae(l, n, r)
                                )
                            )
                        );
                    })
                );
            }
            function ir(t) {
                return t
                    ? { top: t.start, bottom: -t.end }
                    : { top: '', bottom: '' };
            }
            var np = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.splitFgEventSegs = x(rt)),
                            (n.splitBgEventSegs = x(rt)),
                            (n.splitBusinessHourSegs = x(rt)),
                            (n.splitNowIndicatorSegs = x(rt)),
                            (n.splitDateSelectionSegs = x(rt)),
                            (n.splitEventDrag = x(ua)),
                            (n.splitEventResize = x(ua)),
                            (n.rootElRef = U()),
                            (n.cellElRefs = new fe()),
                            n
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this,
                                i = this.props,
                                a =
                                    this.context.options.nowIndicator &&
                                    i.slatCoords &&
                                    i.slatCoords.safeComputeTop(i.nowDate),
                                s = i.cells.length,
                                l = this.splitFgEventSegs(i.fgEventSegs, s),
                                c = this.splitBgEventSegs(i.bgEventSegs, s),
                                d = this.splitBusinessHourSegs(
                                    i.businessHourSegs,
                                    s
                                ),
                                f = this.splitNowIndicatorSegs(
                                    i.nowIndicatorSegs,
                                    s
                                ),
                                p = this.splitDateSelectionSegs(
                                    i.dateSelectionSegs,
                                    s
                                ),
                                v = this.splitEventDrag(i.eventDrag, s),
                                g = this.splitEventResize(i.eventResize, s);
                            return h(
                                'div',
                                {
                                    className: 'fc-timegrid-cols',
                                    ref: this.rootElRef,
                                },
                                h(
                                    'table',
                                    {
                                        role: 'presentation',
                                        style: {
                                            minWidth: i.tableMinWidth,
                                            width: i.clientWidth,
                                        },
                                    },
                                    i.tableColGroupNode,
                                    h(
                                        'tbody',
                                        { role: 'presentation' },
                                        h(
                                            'tr',
                                            { role: 'row' },
                                            i.axis &&
                                                h(
                                                    'td',
                                                    {
                                                        'aria-hidden': !0,
                                                        className:
                                                            'fc-timegrid-col fc-timegrid-axis',
                                                    },
                                                    h(
                                                        'div',
                                                        {
                                                            className:
                                                                'fc-timegrid-col-frame',
                                                        },
                                                        h(
                                                            'div',
                                                            {
                                                                className:
                                                                    'fc-timegrid-now-indicator-container',
                                                            },
                                                            'number' ==
                                                                typeof a &&
                                                                h(
                                                                    qn,
                                                                    {
                                                                        isAxis: !0,
                                                                        date: i.nowDate,
                                                                    },
                                                                    function (
                                                                        b,
                                                                        E,
                                                                        m,
                                                                        w
                                                                    ) {
                                                                        return h(
                                                                            'div',
                                                                            {
                                                                                ref: b,
                                                                                className:
                                                                                    [
                                                                                        'fc-timegrid-now-indicator-arrow',
                                                                                    ]
                                                                                        .concat(
                                                                                            E
                                                                                        )
                                                                                        .join(
                                                                                            ' '
                                                                                        ),
                                                                                style: {
                                                                                    top: a,
                                                                                },
                                                                            },
                                                                            w
                                                                        );
                                                                    }
                                                                )
                                                        )
                                                    )
                                                ),
                                            i.cells.map(function (b, E) {
                                                return h(ep, {
                                                    key: b.key,
                                                    elRef: n.cellElRefs.createRef(
                                                        b.key
                                                    ),
                                                    dateProfile: i.dateProfile,
                                                    date: b.date,
                                                    nowDate: i.nowDate,
                                                    todayRange: i.todayRange,
                                                    extraHookProps:
                                                        b.extraHookProps,
                                                    extraDataAttrs:
                                                        b.extraDataAttrs,
                                                    extraClassNames:
                                                        b.extraClassNames,
                                                    extraDateSpan:
                                                        b.extraDateSpan,
                                                    fgEventSegs: l[E],
                                                    bgEventSegs: c[E],
                                                    businessHourSegs: d[E],
                                                    nowIndicatorSegs: f[E],
                                                    dateSelectionSegs: p[E],
                                                    eventDrag: v[E],
                                                    eventResize: g[E],
                                                    slatCoords: i.slatCoords,
                                                    eventSelection:
                                                        i.eventSelection,
                                                    forPrint: i.forPrint,
                                                });
                                            })
                                        )
                                    )
                                )
                            );
                        }),
                        (e.prototype.componentDidMount = function () {
                            this.updateCoords();
                        }),
                        (e.prototype.componentDidUpdate = function () {
                            this.updateCoords();
                        }),
                        (e.prototype.updateCoords = function () {
                            var n = this.props;
                            n.onColCoords &&
                                null !== n.clientWidth &&
                                n.onColCoords(
                                    new $e(
                                        this.rootElRef.current,
                                        (function rp(t, e) {
                                            return e.map(function (n) {
                                                return t[n.key];
                                            });
                                        })(this.cellElRefs.currentMap, n.cells),
                                        !0,
                                        !1
                                    )
                                );
                        }),
                        e
                    );
                })(I),
                ip = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.processSlotOptions = x(op)),
                            (n.state = { slatCoords: null }),
                            (n.handleRootEl = function (r) {
                                r
                                    ? n.context.registerInteractiveComponent(
                                          n,
                                          {
                                              el: r,
                                              isHitComboAllowed:
                                                  n.props.isHitComboAllowed,
                                          }
                                      )
                                    : n.context.unregisterInteractiveComponent(
                                          n
                                      );
                            }),
                            (n.handleScrollRequest = function (r) {
                                var i = n.props.onScrollTopRequest,
                                    o = n.state.slatCoords;
                                if (i && o) {
                                    if (r.time) {
                                        var a = o.computeTimeTop(r.time);
                                        (a = Math.ceil(a)) && (a += 1), i(a);
                                    }
                                    return !0;
                                }
                                return !1;
                            }),
                            (n.handleColCoords = function (r) {
                                n.colCoords = r;
                            }),
                            (n.handleSlatCoords = function (r) {
                                n.setState({ slatCoords: r }),
                                    n.props.onSlatCoords &&
                                        n.props.onSlatCoords(r);
                            }),
                            n
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var r = this.props,
                                i = this.state;
                            return h(
                                'div',
                                {
                                    className: 'fc-timegrid-body',
                                    ref: this.handleRootEl,
                                    style: {
                                        width: r.clientWidth,
                                        minWidth: r.tableMinWidth,
                                    },
                                },
                                h(Uu, {
                                    axis: r.axis,
                                    dateProfile: r.dateProfile,
                                    slatMetas: r.slatMetas,
                                    clientWidth: r.clientWidth,
                                    minHeight: r.expandRows
                                        ? r.clientHeight
                                        : '',
                                    tableMinWidth: r.tableMinWidth,
                                    tableColGroupNode: r.axis
                                        ? r.tableColGroupNode
                                        : null,
                                    onCoords: this.handleSlatCoords,
                                }),
                                h(np, {
                                    cells: r.cells,
                                    axis: r.axis,
                                    dateProfile: r.dateProfile,
                                    businessHourSegs: r.businessHourSegs,
                                    bgEventSegs: r.bgEventSegs,
                                    fgEventSegs: r.fgEventSegs,
                                    dateSelectionSegs: r.dateSelectionSegs,
                                    eventSelection: r.eventSelection,
                                    eventDrag: r.eventDrag,
                                    eventResize: r.eventResize,
                                    todayRange: r.todayRange,
                                    nowDate: r.nowDate,
                                    nowIndicatorSegs: r.nowIndicatorSegs,
                                    clientWidth: r.clientWidth,
                                    tableMinWidth: r.tableMinWidth,
                                    tableColGroupNode: r.tableColGroupNode,
                                    slatCoords: i.slatCoords,
                                    onColCoords: this.handleColCoords,
                                    forPrint: r.forPrint,
                                })
                            );
                        }),
                        (e.prototype.componentDidMount = function () {
                            this.scrollResponder =
                                this.context.createScrollResponder(
                                    this.handleScrollRequest
                                );
                        }),
                        (e.prototype.componentDidUpdate = function (n) {
                            this.scrollResponder.update(
                                n.dateProfile !== this.props.dateProfile
                            );
                        }),
                        (e.prototype.componentWillUnmount = function () {
                            this.scrollResponder.detach();
                        }),
                        (e.prototype.queryHit = function (n, r) {
                            var i = this.context,
                                o = i.dateEnv,
                                s = this.colCoords,
                                l = this.props.dateProfile,
                                c = this.state.slatCoords,
                                d = this.processSlotOptions(
                                    this.props.slotDuration,
                                    i.options.snapDuration
                                ),
                                f = d.snapDuration,
                                p = d.snapsPerSlot,
                                v = s.leftToIndex(n),
                                g = c.positions.topToIndex(r);
                            if (null != v && null != g) {
                                var b = this.props.cells[v],
                                    E = c.positions.tops[g],
                                    m = c.positions.getHeight(g),
                                    C = Math.floor(((r - E) / m) * p),
                                    _ = this.props.cells[v].date,
                                    k = sn(
                                        l.slotMinTime,
                                        (function js(t, e) {
                                            return {
                                                years: t.years * e,
                                                months: t.months * e,
                                                days: t.days * e,
                                                milliseconds:
                                                    t.milliseconds * e,
                                            };
                                        })(f, g * p + C)
                                    ),
                                    P = o.add(_, k),
                                    T = o.add(P, f);
                                return {
                                    dateProfile: l,
                                    dateSpan: (0, u.pi)(
                                        {
                                            range: { start: P, end: T },
                                            allDay: !1,
                                        },
                                        b.extraDateSpan
                                    ),
                                    dayEl: s.els[v],
                                    rect: {
                                        left: s.lefts[v],
                                        right: s.rights[v],
                                        top: E,
                                        bottom: E + m,
                                    },
                                    layer: 0,
                                };
                            }
                            return null;
                        }),
                        e
                    );
                })(ce);
            function op(t, e) {
                var n = e || t,
                    r = ln(t, n);
                return (
                    null === r && ((n = t), (r = 1)),
                    { snapDuration: n, snapsPerSlot: r }
                );
            }
            var ap = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.sliceRange = function (n, r) {
                            for (var i = [], o = 0; o < r.length; o += 1) {
                                var a = He(n, r[o]);
                                a &&
                                    i.push({
                                        start: a.start,
                                        end: a.end,
                                        isStart:
                                            a.start.valueOf() ===
                                            n.start.valueOf(),
                                        isEnd:
                                            a.end.valueOf() === n.end.valueOf(),
                                        col: o,
                                    });
                            }
                            return i;
                        }),
                        e
                    );
                })(Ho),
                sp = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.buildDayRanges = x(lp)),
                            (n.slicer = new ap()),
                            (n.timeColsRef = U()),
                            n
                        );
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this,
                                i = this.props,
                                o = this.context,
                                a = i.dateProfile,
                                s = i.dayTableModel,
                                l = o.options.nowIndicator,
                                c = this.buildDayRanges(s, a, o.dateEnv);
                            return h(
                                zt,
                                { unit: l ? 'minute' : 'day' },
                                function (d, f) {
                                    return h(
                                        ip,
                                        (0, u.pi)(
                                            { ref: n.timeColsRef },
                                            n.slicer.sliceProps(
                                                i,
                                                a,
                                                null,
                                                o,
                                                c
                                            ),
                                            {
                                                forPrint: i.forPrint,
                                                axis: i.axis,
                                                dateProfile: a,
                                                slatMetas: i.slatMetas,
                                                slotDuration: i.slotDuration,
                                                cells: s.cells[0],
                                                tableColGroupNode:
                                                    i.tableColGroupNode,
                                                tableMinWidth: i.tableMinWidth,
                                                clientWidth: i.clientWidth,
                                                clientHeight: i.clientHeight,
                                                expandRows: i.expandRows,
                                                nowDate: d,
                                                nowIndicatorSegs:
                                                    l &&
                                                    n.slicer.sliceNowDate(
                                                        d,
                                                        o,
                                                        c
                                                    ),
                                                todayRange: f,
                                                onScrollTopRequest:
                                                    i.onScrollTopRequest,
                                                onSlatCoords: i.onSlatCoords,
                                            }
                                        )
                                    );
                                }
                            );
                        }),
                        e
                    );
                })(ce);
            function lp(t, e, n) {
                for (var r = [], i = 0, o = t.headerDates; i < o.length; i++) {
                    var a = o[i];
                    r.push({
                        start: n.add(a, e.slotMinTime),
                        end: n.add(a, e.slotMaxTime),
                    });
                }
                return r;
            }
            var ma = [
                { hours: 1 },
                { minutes: 30 },
                { minutes: 15 },
                { seconds: 30 },
                { seconds: 15 },
            ];
            function cp(t, e, n, r, i) {
                for (
                    var o = new Date(0),
                        a = t,
                        s = M(0),
                        l =
                            n ||
                            (function dp(t) {
                                var e, n, r;
                                for (e = ma.length - 1; e >= 0; e -= 1)
                                    if (
                                        null !== (r = ln((n = M(ma[e])), t)) &&
                                        r > 1
                                    )
                                        return n;
                                return t;
                            })(r),
                        c = [];
                    Y(a) < Y(e);

                ) {
                    var d = i.add(o, a),
                        f = null !== ln(s, l);
                    c.push({
                        date: d,
                        time: a,
                        key: d.toISOString(),
                        isoTimeStr: Js(d),
                        isLabeled: f,
                    }),
                        (a = sn(a, r)),
                        (s = sn(s, r));
                }
                return c;
            }
            var fp = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (
                        (n.buildTimeColsModel = x(up)),
                        (n.buildSlatMetas = x(cp)),
                        n
                    );
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.render = function () {
                        var n = this,
                            r = this.context,
                            i = r.options,
                            o = r.dateEnv,
                            s = this.props,
                            l = s.dateProfile,
                            c = this.buildTimeColsModel(
                                l,
                                r.dateProfileGenerator
                            ),
                            d = this.allDaySplitter.splitProps(s),
                            f = this.buildSlatMetas(
                                l.slotMinTime,
                                l.slotMaxTime,
                                i.slotLabelInterval,
                                i.slotDuration,
                                o
                            ),
                            p = i.dayMinWidth,
                            v = !p,
                            g = p,
                            b =
                                i.dayHeaders &&
                                h(No, {
                                    dates: c.headerDates,
                                    dateProfile: l,
                                    datesRepDistinctDays: !0,
                                    renderIntro: v ? this.renderHeadAxis : null,
                                }),
                            E =
                                !1 !== i.allDaySlot &&
                                function (w) {
                                    return h(
                                        da,
                                        (0, u.pi)(
                                            {},
                                            d.allDay,
                                            {
                                                dateProfile: l,
                                                dayTableModel: c,
                                                nextDayThreshold:
                                                    i.nextDayThreshold,
                                                tableMinWidth: w.tableMinWidth,
                                                colGroupNode:
                                                    w.tableColGroupNode,
                                                renderRowIntro: v
                                                    ? n.renderTableRowAxis
                                                    : null,
                                                showWeekNumbers: !1,
                                                expandRows: !1,
                                                headerAlignElRef: n.headerElRef,
                                                clientWidth: w.clientWidth,
                                                clientHeight: w.clientHeight,
                                                forPrint: s.forPrint,
                                            },
                                            n.getAllDayMaxEventProps()
                                        )
                                    );
                                },
                            m = function (w) {
                                return h(
                                    sp,
                                    (0, u.pi)({}, d.timed, {
                                        dayTableModel: c,
                                        dateProfile: l,
                                        axis: v,
                                        slotDuration: i.slotDuration,
                                        slatMetas: f,
                                        forPrint: s.forPrint,
                                        tableColGroupNode: w.tableColGroupNode,
                                        tableMinWidth: w.tableMinWidth,
                                        clientWidth: w.clientWidth,
                                        clientHeight: w.clientHeight,
                                        onSlatCoords: n.handleSlatCoords,
                                        expandRows: w.expandRows,
                                        onScrollTopRequest:
                                            n.handleScrollTopRequest,
                                    })
                                );
                            };
                        return g
                            ? this.renderHScrollLayout(
                                  b,
                                  E,
                                  m,
                                  c.colCnt,
                                  p,
                                  f,
                                  this.state.slatCoords
                              )
                            : this.renderSimpleLayout(b, E, m);
                    }),
                    e
                );
            })(Hu);
            function up(t, e) {
                var n = new Po(t.renderRange, e);
                return new Bo(n, !1);
            }
            const hp = de({
                initialView: 'timeGridWeek',
                optionRefiners: { allDaySlot: Boolean },
                views: {
                    timeGrid: {
                        component: fp,
                        usesMinMaxTime: !0,
                        allDaySlot: !0,
                        slotDuration: '00:30:00',
                        slotEventOverlap: !0,
                    },
                    timeGridDay: { type: 'timeGrid', duration: { days: 1 } },
                    timeGridWeek: { type: 'timeGrid', duration: { weeks: 1 } },
                },
            });
            let gp = (() => {
                    class t {
                        constructor() {
                            (this.shape = 'rectangle'),
                                (this.animation = 'wave'),
                                (this.borderRadius = null),
                                (this.size = null),
                                (this.width = '100%'),
                                (this.height = '1rem');
                        }
                        containerClass() {
                            return {
                                'p-skeleton p-component': !0,
                                'p-skeleton-circle': 'circle' === this.shape,
                                'p-skeleton-none': 'none' === this.animation,
                            };
                        }
                        containerStyle() {
                            return Object.assign(
                                Object.assign({}, this.style),
                                this.size
                                    ? {
                                          width: this.size,
                                          height: this.size,
                                          borderRadius: this.borderRadius,
                                      }
                                    : {
                                          width: this.width,
                                          height: this.height,
                                          borderRadius: this.borderRadius,
                                      }
                            );
                        }
                    }
                    return (
                        (t.ɵfac = function (n) {
                            return new (n || t)();
                        }),
                        (t.ɵcmp = y.Xpm({
                            type: t,
                            selectors: [['p-skeleton']],
                            hostAttrs: [1, 'p-element'],
                            inputs: {
                                styleClass: 'styleClass',
                                style: 'style',
                                shape: 'shape',
                                animation: 'animation',
                                borderRadius: 'borderRadius',
                                size: 'size',
                                width: 'width',
                                height: 'height',
                            },
                            decls: 1,
                            vars: 4,
                            consts: [[3, 'ngClass', 'ngStyle']],
                            template: function (n, r) {
                                1 & n && y._UZ(0, 'div', 0),
                                    2 & n &&
                                        (y.Tol(r.styleClass),
                                        y.Q6J('ngClass', r.containerClass())(
                                            'ngStyle',
                                            r.containerStyle()
                                        ));
                            },
                            directives: [N.mk, N.PC],
                            styles: [
                                '.p-skeleton{position:relative;overflow:hidden}.p-skeleton:after{content:"";animation:p-skeleton-animation 1.2s infinite;height:100%;left:0;position:absolute;right:0;top:0;transform:translate(-100%);z-index:1}.p-skeleton.p-skeleton-circle{border-radius:50%}.p-skeleton-none:after{animation:none}@keyframes p-skeleton-animation{0%{transform:translate(-100%)}to{transform:translate(100%)}}\n',
                            ],
                            encapsulation: 2,
                            changeDetection: 0,
                        })),
                        t
                    );
                })(),
                mp = (() => {
                    class t {}
                    return (
                        (t.ɵfac = function (n) {
                            return new (n || t)();
                        }),
                        (t.ɵmod = y.oAB({ type: t })),
                        (t.ɵinj = y.cJS({ imports: [[N.ez]] })),
                        t
                    );
                })();
            Xo.registerPlugins([su, ku, hp]);
            let yp = (() => {
                class t {}
                return (
                    (t.ɵfac = function (n) {
                        return new (n || t)();
                    }),
                    (t.ɵmod = y.oAB({ type: t })),
                    (t.ɵinj = y.cJS({ imports: [[N.ez, Xo, mp]] })),
                    t
                );
            })();
            var Zt = R(9783);
            function bp(t, e) {
                1 & t && y.GkF(0);
            }
            function Ap(t, e) {
                if (
                    (1 & t &&
                        (y.TgZ(0, 'div', 8),
                        y.Hsn(1, 1),
                        y.YNc(2, bp, 1, 0, 'ng-container', 6),
                        y.qZA()),
                    2 & t)
                ) {
                    const n = y.oxw();
                    y.xp6(2), y.Q6J('ngTemplateOutlet', n.headerTemplate);
                }
            }
            function Ep(t, e) {
                1 & t && y.GkF(0);
            }
            function wp(t, e) {
                if (
                    (1 & t &&
                        (y.TgZ(0, 'div', 9),
                        y._uU(1),
                        y.YNc(2, Ep, 1, 0, 'ng-container', 6),
                        y.qZA()),
                    2 & t)
                ) {
                    const n = y.oxw();
                    y.xp6(1),
                        y.hij(' ', n.header, ' '),
                        y.xp6(1),
                        y.Q6J('ngTemplateOutlet', n.titleTemplate);
                }
            }
            function Dp(t, e) {
                1 & t && y.GkF(0);
            }
            function Cp(t, e) {
                if (
                    (1 & t &&
                        (y.TgZ(0, 'div', 10),
                        y._uU(1),
                        y.YNc(2, Dp, 1, 0, 'ng-container', 6),
                        y.qZA()),
                    2 & t)
                ) {
                    const n = y.oxw();
                    y.xp6(1),
                        y.hij(' ', n.subheader, ' '),
                        y.xp6(1),
                        y.Q6J('ngTemplateOutlet', n.subtitleTemplate);
                }
            }
            function Sp(t, e) {
                1 & t && y.GkF(0);
            }
            function xp(t, e) {
                1 & t && y.GkF(0);
            }
            function Tp(t, e) {
                if (
                    (1 & t &&
                        (y.TgZ(0, 'div', 11),
                        y.Hsn(1, 2),
                        y.YNc(2, xp, 1, 0, 'ng-container', 6),
                        y.qZA()),
                    2 & t)
                ) {
                    const n = y.oxw();
                    y.xp6(2), y.Q6J('ngTemplateOutlet', n.footerTemplate);
                }
            }
            const Rp = ['*', [['p-header']], [['p-footer']]],
                kp = ['*', 'p-header', 'p-footer'];
            let _p = (() => {
                    class t {
                        constructor(n) {
                            this.el = n;
                        }
                        ngAfterContentInit() {
                            this.templates.forEach((n) => {
                                switch (n.getType()) {
                                    case 'header':
                                        this.headerTemplate = n.template;
                                        break;
                                    case 'title':
                                        this.titleTemplate = n.template;
                                        break;
                                    case 'subtitle':
                                        this.subtitleTemplate = n.template;
                                        break;
                                    case 'content':
                                    default:
                                        this.contentTemplate = n.template;
                                        break;
                                    case 'footer':
                                        this.footerTemplate = n.template;
                                }
                            });
                        }
                        getBlockableElement() {
                            return this.el.nativeElement.children[0];
                        }
                    }
                    return (
                        (t.ɵfac = function (n) {
                            return new (n || t)(y.Y36(y.SBq));
                        }),
                        (t.ɵcmp = y.Xpm({
                            type: t,
                            selectors: [['p-card']],
                            contentQueries: function (n, r, i) {
                                if (
                                    (1 & n &&
                                        (y.Suo(i, Zt.h4, 5),
                                        y.Suo(i, Zt.$_, 5),
                                        y.Suo(i, Zt.jx, 4)),
                                    2 & n)
                                ) {
                                    let o;
                                    y.iGM((o = y.CRH())) &&
                                        (r.headerFacet = o.first),
                                        y.iGM((o = y.CRH())) &&
                                            (r.footerFacet = o.first),
                                        y.iGM((o = y.CRH())) &&
                                            (r.templates = o);
                                }
                            },
                            hostAttrs: [1, 'p-element'],
                            inputs: {
                                header: 'header',
                                subheader: 'subheader',
                                style: 'style',
                                styleClass: 'styleClass',
                            },
                            ngContentSelectors: kp,
                            decls: 9,
                            vars: 9,
                            consts: [
                                [3, 'ngClass', 'ngStyle'],
                                ['class', 'p-card-header', 4, 'ngIf'],
                                [1, 'p-card-body'],
                                ['class', 'p-card-title', 4, 'ngIf'],
                                ['class', 'p-card-subtitle', 4, 'ngIf'],
                                [1, 'p-card-content'],
                                [4, 'ngTemplateOutlet'],
                                ['class', 'p-card-footer', 4, 'ngIf'],
                                [1, 'p-card-header'],
                                [1, 'p-card-title'],
                                [1, 'p-card-subtitle'],
                                [1, 'p-card-footer'],
                            ],
                            template: function (n, r) {
                                1 & n &&
                                    (y.F$t(Rp),
                                    y.TgZ(0, 'div', 0),
                                    y.YNc(1, Ap, 3, 1, 'div', 1),
                                    y.TgZ(2, 'div', 2),
                                    y.YNc(3, wp, 3, 2, 'div', 3),
                                    y.YNc(4, Cp, 3, 2, 'div', 4),
                                    y.TgZ(5, 'div', 5),
                                    y.Hsn(6),
                                    y.YNc(7, Sp, 1, 0, 'ng-container', 6),
                                    y.qZA(),
                                    y.YNc(8, Tp, 3, 1, 'div', 7),
                                    y.qZA(),
                                    y.qZA()),
                                    2 & n &&
                                        (y.Tol(r.styleClass),
                                        y.Q6J('ngClass', 'p-card p-component')(
                                            'ngStyle',
                                            r.style
                                        ),
                                        y.xp6(1),
                                        y.Q6J(
                                            'ngIf',
                                            r.headerFacet || r.headerTemplate
                                        ),
                                        y.xp6(2),
                                        y.Q6J(
                                            'ngIf',
                                            r.header || r.titleTemplate
                                        ),
                                        y.xp6(1),
                                        y.Q6J(
                                            'ngIf',
                                            r.subheader || r.subtitleTemplate
                                        ),
                                        y.xp6(3),
                                        y.Q6J(
                                            'ngTemplateOutlet',
                                            r.contentTemplate
                                        ),
                                        y.xp6(1),
                                        y.Q6J(
                                            'ngIf',
                                            r.footerFacet || r.footerTemplate
                                        ));
                            },
                            directives: [N.mk, N.PC, N.O5, N.tP],
                            styles: ['.p-card-header img{width:100%}\n'],
                            encapsulation: 2,
                            changeDetection: 0,
                        })),
                        t
                    );
                })(),
                Mp = (() => {
                    class t {}
                    return (
                        (t.ɵfac = function (n) {
                            return new (n || t)();
                        }),
                        (t.ɵmod = y.oAB({ type: t })),
                        (t.ɵinj = y.cJS({ imports: [[N.ez], Zt.m8] })),
                        t
                    );
                })();
            var or = R(1485);
            let Ip = (() => {
                class t {}
                return (
                    (t.ɵfac = function (n) {
                        return new (n || t)();
                    }),
                    (t.ɵmod = y.oAB({ type: t })),
                    (t.ɵinj = y.cJS({ providers: [or.O] })),
                    t
                );
            })();
            var it,
                sr,
                lr,
                Da,
                ya = R(6115),
                ba = R(7579),
                Aa = R(5026),
                ar = R(4004),
                Ea = R(5577),
                wa = R(8675),
                Np = R(4707),
                Pp = R(9646);
            function Bp(t, e) {
                if (
                    (1 & t &&
                        (y.ynx(0),
                        y._UZ(1, 'full-calendar', 2),
                        y.ALo(2, 'async'),
                        y.BQk()),
                    2 & t)
                ) {
                    const n = y.oxw();
                    let r;
                    y.xp6(1),
                        y.Q6J(
                            'options',
                            null !== (r = y.lcZ(2, 1, n.options$)) &&
                                void 0 !== r
                                ? r
                                : void 0
                        );
                }
            }
            function Hp(t, e) {
                1 & t &&
                    (y.TgZ(0, 'td', 7), y._UZ(1, 'p-skeleton', 8), y.qZA());
            }
            function Op(t, e) {
                if (
                    (1 & t &&
                        (y.TgZ(0, 'tr'), y.YNc(1, Hp, 2, 0, 'td', 6), y.qZA()),
                    2 & t)
                ) {
                    const n = y.oxw(2);
                    y.xp6(1), y.Q6J('ngForOf', n.calendarColumns);
                }
            }
            function zp(t, e) {
                if (
                    (1 & t &&
                        (y.TgZ(0, 'h2', 3),
                        y._uU(1, 'Loading Calendar...'),
                        y.qZA(),
                        y.TgZ(2, 'table', 4),
                        y.YNc(3, Op, 2, 1, 'tr', 5),
                        y.qZA()),
                    2 & t)
                ) {
                    const n = y.oxw();
                    y.xp6(3), y.Q6J('ngForOf', n.calendarRows);
                }
            }
            class ot {
                constructor(e) {
                    (this.firebaseApi = e),
                        (this.calendarRows = Array(6)),
                        (this.calendarColumns = Array(7)),
                        it.set(this, new Np.t()),
                        (this.areEventsLoaded$ = (0, u.Q_)(this, it, 'f').pipe(
                            (0, ar.U)((n) => !!n)
                        )),
                        (this.eventClick = new ba.x()),
                        (this._options = {
                            initialDate: '2019-01-01',
                            headerToolbar: {
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay',
                            },
                            editable: !0,
                            selectable: !0,
                            selectMirror: !0,
                            dayMaxEvents: !0,
                            height: 600,
                            eventClick: ({ event: n }) =>
                                this.eventClick.next(n),
                        }),
                        (this.options$ = (0, Pp.of)(this._options).pipe(
                            (0, Ea.z)((n) =>
                                (0, u.Q_)(this, it, 'f').pipe(
                                    (0, ar.U)((r) =>
                                        Object.assign(Object.assign({}, n), {
                                            events: null != r ? r : [],
                                        })
                                    ),
                                    (0, wa.O)(n)
                                )
                            )
                        ));
                }
                set events(e) {
                    (0, u.Q_)(this, it, 'f').next(e), console.log(e);
                }
            }
            (it = new WeakMap()),
                (ot.ɵfac = function (e) {
                    return new (e || ot)(y.Y36(or.O));
                }),
                (ot.ɵcmp = y.Xpm({
                    type: ot,
                    selectors: [['sol-calendar']],
                    inputs: { events: 'events' },
                    outputs: { eventClick: 'eventClick' },
                    decls: 4,
                    vars: 4,
                    consts: [
                        [4, 'ngIf', 'ngIfElse'],
                        ['skeleton', ''],
                        [3, 'options'],
                        [2, 'text-align', 'center'],
                        [
                            'width',
                            '100%',
                            'height',
                            '400px',
                            2,
                            'margin-top',
                            '2rem',
                            'padding',
                            '0 10px',
                        ],
                        [4, 'ngFor', 'ngForOf'],
                        ['style', 'padding: 5px', 4, 'ngFor', 'ngForOf'],
                        [2, 'padding', '5px'],
                        ['height', '75px', 'width', '95%'],
                    ],
                    template: function (e, n) {
                        if (
                            (1 & e &&
                                (y.YNc(0, Bp, 3, 3, 'ng-container', 0),
                                y.ALo(1, 'async'),
                                y.YNc(
                                    2,
                                    zp,
                                    4,
                                    1,
                                    'ng-template',
                                    null,
                                    1,
                                    y.W1O
                                )),
                            2 & e)
                        ) {
                            const r = y.MAs(3);
                            y.Q6J('ngIf', y.lcZ(1, 2, n.areEventsLoaded$))(
                                'ngIfElse',
                                r
                            );
                        }
                    },
                    directives: [N.O5, Pf, N.sg, gp],
                    pipes: [N.Ov],
                    encapsulation: 2,
                    changeDetection: 0,
                }));
            const Fp = function () {
                return { width: '25rem', 'margin-bottom': '2em' };
            };
            function Up(t, e) {
                if (
                    (1 & t &&
                        (y.TgZ(0, 'p-card', 2),
                        y.TgZ(1, 'p'),
                        y._uU(2, "Hey I'm the details."),
                        y.qZA(),
                        y.qZA()),
                    2 & t)
                ) {
                    const n = e.$implicit;
                    y.Akn(y.DdM(3, Fp)), y.Q6J('header', n.name);
                }
            }
            class Le {
                constructor(e) {
                    (this.functionsApi = e),
                        sr.add(this),
                        (this.classSelected$ = new ba.x()),
                        (this.selectedClasses$ = this.classSelected$.pipe(
                            (0, Aa.R)(
                                (n, r) =>
                                    n.find((o) => o.id === r.id)
                                        ? n.filter((o) => o.id !== r.id)
                                        : [...n, { id: r.id, name: r.title }],
                                new Array()
                            )
                        )),
                        lr.set(
                            this,
                            this.functionsApi
                                .get('classes')
                                .pipe((0, ar.U)((n) => n.classes))
                        ),
                        (this.classEvents$ = (0, u.Q_)(this, lr, 'f').pipe(
                            (0, Ea.z)((n) =>
                                this.classSelected$.pipe(
                                    (0, Aa.R)(
                                        (r, i) =>
                                            (0, u.Q_)(this, sr, 'm', Da).call(
                                                this,
                                                r,
                                                i
                                            ),
                                        n
                                    ),
                                    (0, wa.O)(n)
                                )
                            )
                        ));
                }
            }
            (lr = new WeakMap()),
                (sr = new WeakSet()),
                (Da = function (e, n) {
                    return e.map((r) =>
                        r.id === n.id
                            ? Object.assign(Object.assign({}, r), {
                                  color:
                                      'green' === r.color ? 'default' : 'green',
                              })
                            : r
                    );
                }),
                (Le.ɵfac = function (e) {
                    return new (e || Le)(y.Y36(or.O));
                }),
                (Le.ɵcmp = y.Xpm({
                    type: Le,
                    selectors: [['ng-component']],
                    decls: 4,
                    vars: 6,
                    consts: [
                        [3, 'events', 'eventClick'],
                        [3, 'header', 'style', 4, 'ngFor', 'ngForOf'],
                        [3, 'header'],
                    ],
                    template: function (e, n) {
                        1 & e &&
                            (y.TgZ(0, 'sol-calendar', 0),
                            y.NdJ('eventClick', function (i) {
                                return n.classSelected$.next(i);
                            }),
                            y.ALo(1, 'async'),
                            y.qZA(),
                            y.YNc(2, Up, 3, 4, 'p-card', 1),
                            y.ALo(3, 'async')),
                            2 & e &&
                                (y.Q6J('events', y.lcZ(1, 2, n.classEvents$)),
                                y.xp6(2),
                                y.Q6J(
                                    'ngForOf',
                                    y.lcZ(3, 4, n.selectedClasses$)
                                ));
                    },
                    directives: [ot, N.sg, _p],
                    pipes: [N.Ov],
                    encapsulation: 2,
                    changeDetection: 0,
                }));
            const Lp = [{ path: 'classes', component: Le, children: [] }];
            let Qp = (() => {
                    class t {}
                    return (
                        (t.ɵfac = function (n) {
                            return new (n || t)();
                        }),
                        (t.ɵmod = y.oAB({ type: t })),
                        (t.ɵinj = y.cJS({
                            imports: [[ya.Bz.forChild(Lp)], ya.Bz],
                        })),
                        t
                    );
                })(),
                Wp = (() => {
                    class t {}
                    return (
                        (t.ɵfac = function (n) {
                            return new (n || t)();
                        }),
                        (t.ɵmod = y.oAB({ type: t })),
                        (t.ɵinj = y.cJS({ imports: [[N.ez, yp, Mp, Ip, Qp]] })),
                        t
                    );
                })();
        },
        2559: (ue) => {
            ue.exports = function Ve(R, N) {
                if (R === N) return !0;
                if (R && N && 'object' == typeof R && 'object' == typeof N) {
                    if (R.constructor !== N.constructor) return !1;
                    var ne, J, u;
                    if (Array.isArray(R)) {
                        if ((ne = R.length) != N.length) return !1;
                        for (J = ne; 0 != J--; ) if (!Ve(R[J], N[J])) return !1;
                        return !0;
                    }
                    if (R.constructor === RegExp)
                        return R.source === N.source && R.flags === N.flags;
                    if (R.valueOf !== Object.prototype.valueOf)
                        return R.valueOf() === N.valueOf();
                    if (R.toString !== Object.prototype.toString)
                        return R.toString() === N.toString();
                    if (
                        (ne = (u = Object.keys(R)).length) !==
                        Object.keys(N).length
                    )
                        return !1;
                    for (J = ne; 0 != J--; )
                        if (!Object.prototype.hasOwnProperty.call(N, u[J]))
                            return !1;
                    for (J = ne; 0 != J--; ) {
                        var pe = u[J];
                        if (!Ve(R[pe], N[pe])) return !1;
                    }
                    return !0;
                }
                return R != R && N != N;
            };
        },
        4602: (ue) => {
            ue.exports =
                '\n/* classes attached to <body> */\n/* TODO: make fc-event selector work when calender in shadow DOM */\n.fc-not-allowed,\n.fc-not-allowed .fc-event { /* override events\' custom cursors */\n  cursor: not-allowed;\n}\n/* TODO: not attached to body. attached to specific els. move */\n.fc-unselectable {\n  -webkit-user-select: none;\n          user-select: none;\n  -webkit-touch-callout: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.fc {\n  /* layout of immediate children */\n  display: flex;\n  flex-direction: column;\n\n  font-size: 1em\n}\n.fc,\n  .fc *,\n  .fc *:before,\n  .fc *:after {\n    box-sizing: border-box;\n  }\n.fc table {\n    border-collapse: collapse;\n    border-spacing: 0;\n    font-size: 1em; /* normalize cross-browser */\n  }\n.fc th {\n    text-align: center;\n  }\n.fc th,\n  .fc td {\n    vertical-align: top;\n    padding: 0;\n  }\n.fc a[data-navlink] {\n    cursor: pointer;\n  }\n.fc a[data-navlink]:hover {\n    text-decoration: underline;\n  }\n.fc-direction-ltr {\n  direction: ltr;\n  text-align: left;\n}\n.fc-direction-rtl {\n  direction: rtl;\n  text-align: right;\n}\n.fc-theme-standard td,\n  .fc-theme-standard th {\n    border: 1px solid #ddd;\n    border: 1px solid var(--fc-border-color, #ddd);\n  }\n/* for FF, which doesn\'t expand a 100% div within a table cell. use absolute positioning */\n/* inner-wrappers are responsible for being absolute */\n/* TODO: best place for this? */\n.fc-liquid-hack td,\n  .fc-liquid-hack th {\n    position: relative;\n  }\n@font-face {\n  font-family: \'fcicons\';\n  src: url("data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBfAAAAC8AAAAYGNtYXAXVtKNAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZgYydxIAAAF4AAAFNGhlYWQUJ7cIAAAGrAAAADZoaGVhB20DzAAABuQAAAAkaG10eCIABhQAAAcIAAAALGxvY2ED4AU6AAAHNAAAABhtYXhwAA8AjAAAB0wAAAAgbmFtZXsr690AAAdsAAABhnBvc3QAAwAAAAAI9AAAACAAAwPAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpBgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6Qb//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAWIAjQKeAskAEwAAJSc3NjQnJiIHAQYUFwEWMjc2NCcCnuLiDQ0MJAz/AA0NAQAMJAwNDcni4gwjDQwM/wANIwz/AA0NDCMNAAAAAQFiAI0CngLJABMAACUBNjQnASYiBwYUHwEHBhQXFjI3AZ4BAA0N/wAMJAwNDeLiDQ0MJAyNAQAMIw0BAAwMDSMM4uINIwwNDQAAAAIA4gC3Ax4CngATACcAACUnNzY0JyYiDwEGFB8BFjI3NjQnISc3NjQnJiIPAQYUHwEWMjc2NCcB87e3DQ0MIw3VDQ3VDSMMDQ0BK7e3DQ0MJAzVDQ3VDCQMDQ3zuLcMJAwNDdUNIwzWDAwNIwy4twwkDA0N1Q0jDNYMDA0jDAAAAgDiALcDHgKeABMAJwAAJTc2NC8BJiIHBhQfAQcGFBcWMjchNzY0LwEmIgcGFB8BBwYUFxYyNwJJ1Q0N1Q0jDA0Nt7cNDQwjDf7V1Q0N1QwkDA0Nt7cNDQwkDLfWDCMN1Q0NDCQMt7gMIw0MDNYMIw3VDQ0MJAy3uAwjDQwMAAADAFUAAAOrA1UAMwBoAHcAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMhMjY1NCYjISIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAAVYRGRkR/qoRGRkRA1UFBAUOCQkVDAsZDf2rDRkLDBUJCA4FBQUFBQUOCQgVDAsZDQJVDRkLDBUJCQ4FBAVVAgECBQMCBwQECAX9qwQJAwQHAwMFAQICAgIBBQMDBwQDCQQCVQUIBAQHAgMFAgEC/oAZEhEZGRESGQAAAAADAFUAAAOrA1UAMwBoAIkAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMzFRQWMzI2PQEzMjY1NCYrATU0JiMiBh0BIyIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAgBkSEhmAERkZEYAZEhIZgBEZGREDVQUEBQ4JCRUMCxkN/asNGQsMFQkIDgUFBQUFBQ4JCBUMCxkNAlUNGQsMFQkJDgUEBVUCAQIFAwIHBAQIBf2rBAkDBAcDAwUBAgICAgEFAwMHBAMJBAJVBQgEBAcCAwUCAQL+gIASGRkSgBkSERmAEhkZEoAZERIZAAABAOIAjQMeAskAIAAAExcHBhQXFjI/ARcWMjc2NC8BNzY0JyYiDwEnJiIHBhQX4uLiDQ0MJAzi4gwkDA0N4uINDQwkDOLiDCQMDQ0CjeLiDSMMDQ3h4Q0NDCMN4uIMIw0MDOLiDAwNIwwAAAABAAAAAQAAa5n0y18PPPUACwQAAAAAANivOVsAAAAA2K85WwAAAAADqwNVAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAOrAAEAAAAAAAAAAAAAAAAAAAALBAAAAAAAAAAAAAAAAgAAAAQAAWIEAAFiBAAA4gQAAOIEAABVBAAAVQQAAOIAAAAAAAoAFAAeAEQAagCqAOoBngJkApoAAQAAAAsAigADAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGZjaWNvbnMAZgBjAGkAYwBvAG4Ac1ZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGZjaWNvbnMAZgBjAGkAYwBvAG4Ac2ZjaWNvbnMAZgBjAGkAYwBvAG4Ac1JlZ3VsYXIAUgBlAGcAdQBsAGEAcmZjaWNvbnMAZgBjAGkAYwBvAG4Ac0ZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=") format(\'truetype\');\n  font-weight: normal;\n  font-style: normal;\n}\n.fc-icon {\n  /* added for fc */\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  text-align: center;\n  -webkit-user-select: none;\n          user-select: none;\n\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: \'fcicons\' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-feature-settings: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.fc-icon-chevron-left:before {\n  content: "\\e900";\n}\n.fc-icon-chevron-right:before {\n  content: "\\e901";\n}\n.fc-icon-chevrons-left:before {\n  content: "\\e902";\n}\n.fc-icon-chevrons-right:before {\n  content: "\\e903";\n}\n.fc-icon-minus-square:before {\n  content: "\\e904";\n}\n.fc-icon-plus-square:before {\n  content: "\\e905";\n}\n.fc-icon-x:before {\n  content: "\\e906";\n}\n/*\nLots taken from Flatly (MIT): https://bootswatch.com/4/flatly/bootstrap.css\n\nThese styles only apply when the standard-theme is activated.\nWhen it\'s NOT activated, the fc-button classes won\'t even be in the DOM.\n*/\n.fc {\n\n  /* reset */\n\n}\n.fc .fc-button {\n    border-radius: 0;\n    overflow: visible;\n    text-transform: none;\n    margin: 0;\n    font-family: inherit;\n    font-size: inherit;\n    line-height: inherit;\n  }\n.fc .fc-button:focus {\n    outline: 1px dotted;\n    outline: 5px auto -webkit-focus-ring-color;\n  }\n.fc .fc-button {\n    -webkit-appearance: button;\n  }\n.fc .fc-button:not(:disabled) {\n    cursor: pointer;\n  }\n.fc .fc-button::-moz-focus-inner {\n    padding: 0;\n    border-style: none;\n  }\n.fc {\n\n  /* theme */\n\n}\n.fc .fc-button {\n    display: inline-block;\n    font-weight: 400;\n    text-align: center;\n    vertical-align: middle;\n    -webkit-user-select: none;\n            user-select: none;\n    background-color: transparent;\n    border: 1px solid transparent;\n    padding: 0.4em 0.65em;\n    font-size: 1em;\n    line-height: 1.5;\n    border-radius: 0.25em;\n  }\n.fc .fc-button:hover {\n    text-decoration: none;\n  }\n.fc .fc-button:focus {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(44, 62, 80, 0.25);\n  }\n.fc .fc-button:disabled {\n    opacity: 0.65;\n  }\n.fc {\n\n  /* "primary" coloring */\n\n}\n.fc .fc-button-primary {\n    color: #fff;\n    color: var(--fc-button-text-color, #fff);\n    background-color: #2C3E50;\n    background-color: var(--fc-button-bg-color, #2C3E50);\n    border-color: #2C3E50;\n    border-color: var(--fc-button-border-color, #2C3E50);\n  }\n.fc .fc-button-primary:hover {\n    color: #fff;\n    color: var(--fc-button-text-color, #fff);\n    background-color: #1e2b37;\n    background-color: var(--fc-button-hover-bg-color, #1e2b37);\n    border-color: #1a252f;\n    border-color: var(--fc-button-hover-border-color, #1a252f);\n  }\n.fc .fc-button-primary:disabled { /* not DRY */\n    color: #fff;\n    color: var(--fc-button-text-color, #fff);\n    background-color: #2C3E50;\n    background-color: var(--fc-button-bg-color, #2C3E50);\n    border-color: #2C3E50;\n    border-color: var(--fc-button-border-color, #2C3E50); /* overrides :hover */\n  }\n.fc .fc-button-primary:focus {\n    box-shadow: 0 0 0 0.2rem rgba(76, 91, 106, 0.5);\n  }\n.fc .fc-button-primary:not(:disabled):active,\n  .fc .fc-button-primary:not(:disabled).fc-button-active {\n    color: #fff;\n    color: var(--fc-button-text-color, #fff);\n    background-color: #1a252f;\n    background-color: var(--fc-button-active-bg-color, #1a252f);\n    border-color: #151e27;\n    border-color: var(--fc-button-active-border-color, #151e27);\n  }\n.fc .fc-button-primary:not(:disabled):active:focus,\n  .fc .fc-button-primary:not(:disabled).fc-button-active:focus {\n    box-shadow: 0 0 0 0.2rem rgba(76, 91, 106, 0.5);\n  }\n.fc {\n\n  /* icons within buttons */\n\n}\n.fc .fc-button .fc-icon {\n    vertical-align: middle;\n    font-size: 1.5em; /* bump up the size (but don\'t make it bigger than line-height of button, which is 1.5em also) */\n  }\n.fc .fc-button-group {\n    position: relative;\n    display: inline-flex;\n    vertical-align: middle;\n  }\n.fc .fc-button-group > .fc-button {\n    position: relative;\n    flex: 1 1 auto;\n  }\n.fc .fc-button-group > .fc-button:hover {\n    z-index: 1;\n  }\n.fc .fc-button-group > .fc-button:focus,\n  .fc .fc-button-group > .fc-button:active,\n  .fc .fc-button-group > .fc-button.fc-button-active {\n    z-index: 1;\n  }\n.fc-direction-ltr .fc-button-group > .fc-button:not(:first-child) {\n    margin-left: -1px;\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n.fc-direction-ltr .fc-button-group > .fc-button:not(:last-child) {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n.fc-direction-rtl .fc-button-group > .fc-button:not(:first-child) {\n    margin-right: -1px;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n.fc-direction-rtl .fc-button-group > .fc-button:not(:last-child) {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n.fc .fc-toolbar {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n.fc .fc-toolbar.fc-header-toolbar {\n    margin-bottom: 1.5em;\n  }\n.fc .fc-toolbar.fc-footer-toolbar {\n    margin-top: 1.5em;\n  }\n.fc .fc-toolbar-title {\n    font-size: 1.75em;\n    margin: 0;\n  }\n.fc-direction-ltr .fc-toolbar > * > :not(:first-child) {\n    margin-left: .75em; /* space between */\n  }\n.fc-direction-rtl .fc-toolbar > * > :not(:first-child) {\n    margin-right: .75em; /* space between */\n  }\n.fc-direction-rtl .fc-toolbar-ltr { /* when the toolbar-chunk positioning system is explicitly left-to-right */\n    flex-direction: row-reverse;\n  }\n.fc .fc-scroller {\n    -webkit-overflow-scrolling: touch;\n    position: relative; /* for abs-positioned elements within */\n  }\n.fc .fc-scroller-liquid {\n    height: 100%;\n  }\n.fc .fc-scroller-liquid-absolute {\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    bottom: 0;\n  }\n.fc .fc-scroller-harness {\n    position: relative;\n    overflow: hidden;\n    direction: ltr;\n      /* hack for chrome computing the scroller\'s right/left wrong for rtl. undone below... */\n      /* TODO: demonstrate in codepen */\n  }\n.fc .fc-scroller-harness-liquid {\n    height: 100%;\n  }\n.fc-direction-rtl .fc-scroller-harness > .fc-scroller { /* undo above hack */\n    direction: rtl;\n  }\n.fc-theme-standard .fc-scrollgrid {\n    border: 1px solid #ddd;\n    border: 1px solid var(--fc-border-color, #ddd); /* bootstrap does this. match */\n  }\n.fc .fc-scrollgrid,\n    .fc .fc-scrollgrid table { /* all tables (self included) */\n      width: 100%; /* because tables don\'t normally do this */\n      table-layout: fixed;\n    }\n.fc .fc-scrollgrid table { /* inner tables */\n      border-top-style: hidden;\n      border-left-style: hidden;\n      border-right-style: hidden;\n    }\n.fc .fc-scrollgrid {\n\n    border-collapse: separate;\n    border-right-width: 0;\n    border-bottom-width: 0;\n\n  }\n.fc .fc-scrollgrid-liquid {\n    height: 100%;\n  }\n.fc .fc-scrollgrid-section { /* a <tr> */\n    height: 1px /* better than 0, for firefox */\n\n  }\n.fc .fc-scrollgrid-section > td {\n      height: 1px; /* needs a height so inner div within grow. better than 0, for firefox */\n    }\n.fc .fc-scrollgrid-section table {\n      height: 1px;\n        /* for most browsers, if a height isn\'t set on the table, can\'t do liquid-height within cells */\n        /* serves as a min-height. harmless */\n    }\n.fc .fc-scrollgrid-section-liquid > td {\n      height: 100%; /* better than `auto`, for firefox */\n    }\n.fc .fc-scrollgrid-section > * {\n    border-top-width: 0;\n    border-left-width: 0;\n  }\n.fc .fc-scrollgrid-section-header > *,\n  .fc .fc-scrollgrid-section-footer > * {\n    border-bottom-width: 0;\n  }\n.fc .fc-scrollgrid-section-body table,\n  .fc .fc-scrollgrid-section-footer table {\n    border-bottom-style: hidden; /* head keeps its bottom border tho */\n  }\n.fc {\n\n  /* stickiness */\n\n}\n.fc .fc-scrollgrid-section-sticky > * {\n    background: #fff;\n    background: var(--fc-page-bg-color, #fff);\n    position: sticky;\n    z-index: 3; /* TODO: var */\n    /* TODO: box-shadow when sticking */\n  }\n.fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky > * {\n    top: 0; /* because border-sharing causes a gap at the top */\n      /* TODO: give safari -1. has bug */\n  }\n.fc .fc-scrollgrid-section-footer.fc-scrollgrid-section-sticky > * {\n    bottom: 0; /* known bug: bottom-stickiness doesn\'t work in safari */\n  }\n.fc .fc-scrollgrid-sticky-shim { /* for horizontal scrollbar */\n    height: 1px; /* needs height to create scrollbars */\n    margin-bottom: -1px;\n  }\n.fc-sticky { /* no .fc wrap because used as child of body */\n  position: sticky;\n}\n.fc .fc-view-harness {\n    flex-grow: 1; /* because this harness is WITHIN the .fc\'s flexbox */\n    position: relative;\n  }\n.fc {\n\n  /* when the harness controls the height, make the view liquid */\n\n}\n.fc .fc-view-harness-active > .fc-view {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n  }\n.fc .fc-col-header-cell-cushion {\n    display: inline-block; /* x-browser for when sticky (when multi-tier header) */\n    padding: 2px 4px;\n  }\n.fc .fc-bg-event,\n  .fc .fc-non-business,\n  .fc .fc-highlight {\n    /* will always have a harness with position:relative/absolute, so absolutely expand */\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n.fc .fc-non-business {\n    background: rgba(215, 215, 215, 0.3);\n    background: var(--fc-non-business-color, rgba(215, 215, 215, 0.3));\n  }\n.fc .fc-bg-event {\n    background: rgb(143, 223, 130);\n    background: var(--fc-bg-event-color, rgb(143, 223, 130));\n    opacity: 0.3;\n    opacity: var(--fc-bg-event-opacity, 0.3)\n  }\n.fc .fc-bg-event .fc-event-title {\n      margin: .5em;\n      font-size: .85em;\n      font-size: var(--fc-small-font-size, .85em);\n      font-style: italic;\n    }\n.fc .fc-highlight {\n    background: rgba(188, 232, 241, 0.3);\n    background: var(--fc-highlight-color, rgba(188, 232, 241, 0.3));\n  }\n.fc .fc-cell-shaded,\n  .fc .fc-day-disabled {\n    background: rgba(208, 208, 208, 0.3);\n    background: var(--fc-neutral-bg-color, rgba(208, 208, 208, 0.3));\n  }\n/* link resets */\n/* ---------------------------------------------------------------------------------------------------- */\na.fc-event,\na.fc-event:hover {\n  text-decoration: none;\n}\n/* cursor */\n.fc-event[href],\n.fc-event.fc-event-draggable {\n  cursor: pointer;\n}\n/* event text content */\n/* ---------------------------------------------------------------------------------------------------- */\n.fc-event .fc-event-main {\n    position: relative;\n    z-index: 2;\n  }\n/* dragging */\n/* ---------------------------------------------------------------------------------------------------- */\n.fc-event-dragging:not(.fc-event-selected) { /* MOUSE */\n    opacity: 0.75;\n  }\n.fc-event-dragging.fc-event-selected { /* TOUCH */\n    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);\n  }\n/* resizing */\n/* ---------------------------------------------------------------------------------------------------- */\n/* (subclasses should hone positioning for touch and non-touch) */\n.fc-event .fc-event-resizer {\n    display: none;\n    position: absolute;\n    z-index: 4;\n  }\n.fc-event:hover, /* MOUSE */\n.fc-event-selected { /* TOUCH */\n\n}\n.fc-event:hover .fc-event-resizer, .fc-event-selected .fc-event-resizer {\n    display: block;\n  }\n.fc-event-selected .fc-event-resizer {\n    border-radius: 4px;\n    border-radius: calc(var(--fc-event-resizer-dot-total-width, 8px) / 2);\n    border-width: 1px;\n    border-width: var(--fc-event-resizer-dot-border-width, 1px);\n    width: 8px;\n    width: var(--fc-event-resizer-dot-total-width, 8px);\n    height: 8px;\n    height: var(--fc-event-resizer-dot-total-width, 8px);\n    border-style: solid;\n    border-color: inherit;\n    background: #fff;\n    background: var(--fc-page-bg-color, #fff)\n\n    /* expand hit area */\n\n  }\n.fc-event-selected .fc-event-resizer:before {\n      content: \'\';\n      position: absolute;\n      top: -20px;\n      left: -20px;\n      right: -20px;\n      bottom: -20px;\n    }\n/* selecting (always TOUCH) */\n/* OR, focused by tab-index */\n/* (TODO: maybe not the best focus-styling for .fc-daygrid-dot-event) */\n/* ---------------------------------------------------------------------------------------------------- */\n.fc-event-selected,\n.fc-event:focus {\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2)\n\n  /* expand hit area (subclasses should expand) */\n\n}\n.fc-event-selected:before, .fc-event:focus:before {\n    content: "";\n    position: absolute;\n    z-index: 3;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n.fc-event-selected,\n.fc-event:focus {\n\n  /* dimmer effect */\n\n}\n.fc-event-selected:after, .fc-event:focus:after {\n    content: "";\n    background: rgba(0, 0, 0, 0.25);\n    background: var(--fc-event-selected-overlay-color, rgba(0, 0, 0, 0.25));\n    position: absolute;\n    z-index: 1;\n\n    /* assume there\'s a border on all sides. overcome it. */\n    /* sometimes there\'s NOT a border, in which case the dimmer will go over */\n    /* an adjacent border, which looks fine. */\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n  }\n/*\nA HORIZONTAL event\n*/\n.fc-h-event { /* allowed to be top-level */\n  display: block;\n  border: 1px solid #3788d8;\n  border: 1px solid var(--fc-event-border-color, #3788d8);\n  background-color: #3788d8;\n  background-color: var(--fc-event-bg-color, #3788d8)\n\n}\n.fc-h-event .fc-event-main {\n    color: #fff;\n    color: var(--fc-event-text-color, #fff);\n  }\n.fc-h-event .fc-event-main-frame {\n    display: flex; /* for make fc-event-title-container expand */\n  }\n.fc-h-event .fc-event-time {\n    max-width: 100%; /* clip overflow on this element */\n    overflow: hidden;\n  }\n.fc-h-event .fc-event-title-container { /* serves as a container for the sticky cushion */\n    flex-grow: 1;\n    flex-shrink: 1;\n    min-width: 0; /* important for allowing to shrink all the way */\n  }\n.fc-h-event .fc-event-title {\n    display: inline-block; /* need this to be sticky cross-browser */\n    vertical-align: top; /* for not messing up line-height */\n    left: 0;  /* for sticky */\n    right: 0; /* for sticky */\n    max-width: 100%; /* clip overflow on this element */\n    overflow: hidden;\n  }\n.fc-h-event.fc-event-selected:before {\n    /* expand hit area */\n    top: -10px;\n    bottom: -10px;\n  }\n/* adjust border and border-radius (if there is any) for non-start/end */\n.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-start),\n.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-end) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  border-left-width: 0;\n}\n.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-end),\n.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-start) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  border-right-width: 0;\n}\n/* resizers */\n.fc-h-event:not(.fc-event-selected) .fc-event-resizer {\n  top: 0;\n  bottom: 0;\n  width: 8px;\n  width: var(--fc-event-resizer-thickness, 8px);\n}\n.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start,\n.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end {\n  cursor: w-resize;\n  left: -4px;\n  left: calc(-0.5 * var(--fc-event-resizer-thickness, 8px));\n}\n.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end,\n.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start {\n  cursor: e-resize;\n  right: -4px;\n  right: calc(-0.5 * var(--fc-event-resizer-thickness, 8px));\n}\n/* resizers for TOUCH */\n.fc-h-event.fc-event-selected .fc-event-resizer {\n  top: 50%;\n  margin-top: -4px;\n  margin-top: calc(-0.5 * var(--fc-event-resizer-dot-total-width, 8px));\n}\n.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-start,\n.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-end {\n  left: -4px;\n  left: calc(-0.5 * var(--fc-event-resizer-dot-total-width, 8px));\n}\n.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-end,\n.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-start {\n  right: -4px;\n  right: calc(-0.5 * var(--fc-event-resizer-dot-total-width, 8px));\n}\n.fc .fc-popover {\n    position: absolute;\n    z-index: 9999;\n    box-shadow: 0 2px 6px rgba(0,0,0,.15);\n  }\n.fc .fc-popover-header {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    padding: 3px 4px;\n  }\n.fc .fc-popover-title {\n    margin: 0 2px;\n  }\n.fc .fc-popover-close {\n    cursor: pointer;\n    opacity: 0.65;\n    font-size: 1.1em;\n  }\n.fc-theme-standard .fc-popover {\n    border: 1px solid #ddd;\n    border: 1px solid var(--fc-border-color, #ddd);\n    background: #fff;\n    background: var(--fc-page-bg-color, #fff);\n  }\n.fc-theme-standard .fc-popover-header {\n    background: rgba(208, 208, 208, 0.3);\n    background: var(--fc-neutral-bg-color, rgba(208, 208, 208, 0.3));\n  }\n';
        },
        4516: (ue) => {
            ue.exports =
                '\n:root {\n  --fc-daygrid-event-dot-width: 8px;\n}\n/* help things clear margins of inner content */\n.fc-daygrid-day-frame,\n.fc-daygrid-day-events,\n.fc-daygrid-event-harness { /* for event top/bottom margins */\n}\n.fc-daygrid-day-frame:before, .fc-daygrid-day-events:before, .fc-daygrid-event-harness:before {\n  content: "";\n  clear: both;\n  display: table; }\n.fc-daygrid-day-frame:after, .fc-daygrid-day-events:after, .fc-daygrid-event-harness:after {\n  content: "";\n  clear: both;\n  display: table; }\n.fc .fc-daygrid-body { /* a <div> that wraps the table */\n    position: relative;\n    z-index: 1; /* container inner z-index\'s because <tr>s can\'t do it */\n  }\n.fc .fc-daygrid-day.fc-day-today {\n      background-color: rgba(255, 220, 40, 0.15);\n      background-color: var(--fc-today-bg-color, rgba(255, 220, 40, 0.15));\n    }\n.fc .fc-daygrid-day-frame {\n    position: relative;\n    min-height: 100%; /* seems to work better than `height` because sets height after rows/cells naturally do it */\n  }\n.fc {\n\n  /* cell top */\n\n}\n.fc .fc-daygrid-day-top {\n    display: flex;\n    flex-direction: row-reverse;\n  }\n.fc .fc-day-other .fc-daygrid-day-top {\n    opacity: 0.3;\n  }\n.fc {\n\n  /* day number (within cell top) */\n\n}\n.fc .fc-daygrid-day-number {\n    position: relative;\n    z-index: 4;\n    padding: 4px;\n  }\n.fc {\n\n  /* event container */\n\n}\n.fc .fc-daygrid-day-events {\n    margin-top: 1px; /* needs to be margin, not padding, so that available cell height can be computed */\n  }\n.fc {\n\n  /* positioning for balanced vs natural */\n\n}\n.fc .fc-daygrid-body-balanced .fc-daygrid-day-events {\n      position: absolute;\n      left: 0;\n      right: 0;\n    }\n.fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events {\n      position: relative; /* for containing abs positioned event harnesses */\n      min-height: 2em; /* in addition to being a min-height during natural height, equalizes the heights a little bit */\n    }\n.fc .fc-daygrid-body-natural { /* can coexist with -unbalanced */\n  }\n.fc .fc-daygrid-body-natural .fc-daygrid-day-events {\n      margin-bottom: 1em;\n    }\n.fc {\n\n  /* event harness */\n\n}\n.fc .fc-daygrid-event-harness {\n    position: relative;\n  }\n.fc .fc-daygrid-event-harness-abs {\n    position: absolute;\n    top: 0; /* fallback coords for when cannot yet be computed */\n    left: 0; /* */\n    right: 0; /* */\n  }\n.fc .fc-daygrid-bg-harness {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n  }\n.fc {\n\n  /* bg content */\n\n}\n.fc .fc-daygrid-day-bg .fc-non-business { z-index: 1 }\n.fc .fc-daygrid-day-bg .fc-bg-event { z-index: 2 }\n.fc .fc-daygrid-day-bg .fc-highlight { z-index: 3 }\n.fc {\n\n  /* events */\n\n}\n.fc .fc-daygrid-event {\n    z-index: 6;\n    margin-top: 1px;\n  }\n.fc .fc-daygrid-event.fc-event-mirror {\n    z-index: 7;\n  }\n.fc {\n\n  /* cell bottom (within day-events) */\n\n}\n.fc .fc-daygrid-day-bottom {\n    font-size: .85em;\n    padding: 2px 3px 0\n  }\n.fc .fc-daygrid-day-bottom:before {\n  content: "";\n  clear: both;\n  display: table; }\n.fc .fc-daygrid-more-link {\n    position: relative;\n    z-index: 4;\n    cursor: pointer;\n  }\n.fc {\n\n  /* week number (within frame) */\n\n}\n.fc .fc-daygrid-week-number {\n    position: absolute;\n    z-index: 5;\n    top: 0;\n    padding: 2px;\n    min-width: 1.5em;\n    text-align: center;\n    background-color: rgba(208, 208, 208, 0.3);\n    background-color: var(--fc-neutral-bg-color, rgba(208, 208, 208, 0.3));\n    color: #808080;\n    color: var(--fc-neutral-text-color, #808080);\n  }\n.fc {\n\n  /* popover */\n\n}\n.fc .fc-more-popover .fc-popover-body {\n    min-width: 220px;\n    padding: 10px;\n  }\n.fc-direction-ltr .fc-daygrid-event.fc-event-start,\n.fc-direction-rtl .fc-daygrid-event.fc-event-end {\n  margin-left: 2px;\n}\n.fc-direction-ltr .fc-daygrid-event.fc-event-end,\n.fc-direction-rtl .fc-daygrid-event.fc-event-start {\n  margin-right: 2px;\n}\n.fc-direction-ltr .fc-daygrid-week-number {\n    left: 0;\n    border-radius: 0 0 3px 0;\n  }\n.fc-direction-rtl .fc-daygrid-week-number {\n    right: 0;\n    border-radius: 0 0 0 3px;\n  }\n.fc-liquid-hack .fc-daygrid-day-frame {\n    position: static; /* will cause inner absolute stuff to expand to <td> */\n  }\n.fc-daygrid-event { /* make root-level, because will be dragged-and-dropped outside of a component root */\n  position: relative; /* for z-indexes assigned later */\n  white-space: nowrap;\n  border-radius: 3px; /* dot event needs this to when selected */\n  font-size: .85em;\n  font-size: var(--fc-small-font-size, .85em);\n}\n/* --- the rectangle ("block") style of event --- */\n.fc-daygrid-block-event .fc-event-time {\n    font-weight: bold;\n  }\n.fc-daygrid-block-event .fc-event-time,\n  .fc-daygrid-block-event .fc-event-title {\n    padding: 1px;\n  }\n/* --- the dot style of event --- */\n.fc-daygrid-dot-event {\n  display: flex;\n  align-items: center;\n  padding: 2px 0\n\n}\n.fc-daygrid-dot-event .fc-event-title {\n    flex-grow: 1;\n    flex-shrink: 1;\n    min-width: 0; /* important for allowing to shrink all the way */\n    overflow: hidden;\n    font-weight: bold;\n  }\n.fc-daygrid-dot-event:hover,\n  .fc-daygrid-dot-event.fc-event-mirror {\n    background: rgba(0, 0, 0, 0.1);\n  }\n.fc-daygrid-dot-event.fc-event-selected:before {\n    /* expand hit area */\n    top: -10px;\n    bottom: -10px;\n  }\n.fc-daygrid-event-dot { /* the actual dot */\n  margin: 0 4px;\n  box-sizing: content-box;\n  width: 0;\n  height: 0;\n  border: 4px solid #3788d8;\n  border: calc(var(--fc-daygrid-event-dot-width, 8px) / 2) solid var(--fc-event-border-color, #3788d8);\n  border-radius: 4px;\n  border-radius: calc(var(--fc-daygrid-event-dot-width, 8px) / 2);\n}\n/* --- spacing between time and title --- */\n.fc-direction-ltr .fc-daygrid-event .fc-event-time {\n    margin-right: 3px;\n  }\n.fc-direction-rtl .fc-daygrid-event .fc-event-time {\n    margin-left: 3px;\n  }\n';
        },
        8537: (ue) => {
            ue.exports =
                '\n/*\nA VERTICAL event\n*/\n\n.fc-v-event { /* allowed to be top-level */\n  display: block;\n  border: 1px solid #3788d8;\n  border: 1px solid var(--fc-event-border-color, #3788d8);\n  background-color: #3788d8;\n  background-color: var(--fc-event-bg-color, #3788d8)\n\n}\n\n.fc-v-event .fc-event-main {\n    color: #fff;\n    color: var(--fc-event-text-color, #fff);\n    height: 100%;\n  }\n\n.fc-v-event .fc-event-main-frame {\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n  }\n\n.fc-v-event .fc-event-time {\n    flex-grow: 0;\n    flex-shrink: 0;\n    max-height: 100%;\n    overflow: hidden;\n  }\n\n.fc-v-event .fc-event-title-container { /* a container for the sticky cushion */\n    flex-grow: 1;\n    flex-shrink: 1;\n    min-height: 0; /* important for allowing to shrink all the way */\n  }\n\n.fc-v-event .fc-event-title { /* will have fc-sticky on it */\n    top: 0;\n    bottom: 0;\n    max-height: 100%; /* clip overflow */\n    overflow: hidden;\n  }\n\n.fc-v-event:not(.fc-event-start) {\n    border-top-width: 0;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n  }\n\n.fc-v-event:not(.fc-event-end) {\n    border-bottom-width: 0;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n\n.fc-v-event.fc-event-selected:before {\n    /* expand hit area */\n    left: -10px;\n    right: -10px;\n  }\n\n.fc-v-event {\n\n  /* resizer (mouse AND touch) */\n\n}\n\n.fc-v-event .fc-event-resizer-start {\n    cursor: n-resize;\n  }\n\n.fc-v-event .fc-event-resizer-end {\n    cursor: s-resize;\n  }\n\n.fc-v-event {\n\n  /* resizer for MOUSE */\n\n}\n\n.fc-v-event:not(.fc-event-selected) .fc-event-resizer {\n      height: 8px;\n      height: var(--fc-event-resizer-thickness, 8px);\n      left: 0;\n      right: 0;\n    }\n\n.fc-v-event:not(.fc-event-selected) .fc-event-resizer-start {\n      top: -4px;\n      top: calc(var(--fc-event-resizer-thickness, 8px) / -2);\n    }\n\n.fc-v-event:not(.fc-event-selected) .fc-event-resizer-end {\n      bottom: -4px;\n      bottom: calc(var(--fc-event-resizer-thickness, 8px) / -2);\n    }\n\n.fc-v-event {\n\n  /* resizer for TOUCH (when event is "selected") */\n\n}\n\n.fc-v-event.fc-event-selected .fc-event-resizer {\n      left: 50%;\n      margin-left: -4px;\n      margin-left: calc(var(--fc-event-resizer-dot-total-width, 8px) / -2);\n    }\n\n.fc-v-event.fc-event-selected .fc-event-resizer-start {\n      top: -4px;\n      top: calc(var(--fc-event-resizer-dot-total-width, 8px) / -2);\n    }\n\n.fc-v-event.fc-event-selected .fc-event-resizer-end {\n      bottom: -4px;\n      bottom: calc(var(--fc-event-resizer-dot-total-width, 8px) / -2);\n    }\n\n.fc .fc-timegrid .fc-daygrid-body { /* the all-day daygrid within the timegrid view */\n    z-index: 2; /* put above the timegrid-body so that more-popover is above everything. TODO: better solution */\n  }\n\n.fc .fc-timegrid-divider {\n    padding: 0 0 2px; /* browsers get confused when you set height. use padding instead */\n  }\n\n.fc .fc-timegrid-body {\n    position: relative;\n    z-index: 1; /* scope the z-indexes of slots and cols */\n    min-height: 100%; /* fill height always, even when slat table doesn\'t grow */\n  }\n\n.fc .fc-timegrid-axis-chunk { /* for advanced ScrollGrid */\n    position: relative /* offset parent for now-indicator-container */\n\n  }\n\n.fc .fc-timegrid-axis-chunk > table {\n      position: relative;\n      z-index: 1; /* above the now-indicator-container */\n    }\n\n.fc .fc-timegrid-slots {\n    position: relative;\n    z-index: 1;\n  }\n\n.fc .fc-timegrid-slot { /* a <td> */\n    height: 1.5em;\n    border-bottom: 0 /* each cell owns its top border */\n  }\n\n.fc .fc-timegrid-slot:empty:before {\n      content: \'\\00a0\'; /* make sure there\'s at least an empty space to create height for height syncing */\n    }\n\n.fc .fc-timegrid-slot-minor {\n    border-top-style: dotted;\n  }\n\n.fc .fc-timegrid-slot-label-cushion {\n    display: inline-block;\n    white-space: nowrap;\n  }\n\n.fc .fc-timegrid-slot-label {\n    vertical-align: middle; /* vertical align the slots */\n  }\n\n.fc {\n\n\n  /* slots AND axis cells (top-left corner of view including the "all-day" text) */\n\n}\n\n.fc .fc-timegrid-axis-cushion,\n  .fc .fc-timegrid-slot-label-cushion {\n    padding: 0 4px;\n  }\n\n.fc {\n\n\n  /* axis cells (top-left corner of view including the "all-day" text) */\n  /* vertical align is more complicated, uses flexbox */\n\n}\n\n.fc .fc-timegrid-axis-frame-liquid {\n    height: 100%; /* will need liquid-hack in FF */\n  }\n\n.fc .fc-timegrid-axis-frame {\n    overflow: hidden;\n    display: flex;\n    align-items: center; /* vertical align */\n    justify-content: flex-end; /* horizontal align. matches text-align below */\n  }\n\n.fc .fc-timegrid-axis-cushion {\n    max-width: 60px; /* limits the width of the "all-day" text */\n    flex-shrink: 0; /* allows text to expand how it normally would, regardless of constrained width */\n  }\n\n.fc-direction-ltr .fc-timegrid-slot-label-frame {\n    text-align: right;\n  }\n\n.fc-direction-rtl .fc-timegrid-slot-label-frame {\n    text-align: left;\n  }\n\n.fc-liquid-hack .fc-timegrid-axis-frame-liquid {\n  height: auto;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  }\n\n.fc .fc-timegrid-col.fc-day-today {\n      background-color: rgba(255, 220, 40, 0.15);\n      background-color: var(--fc-today-bg-color, rgba(255, 220, 40, 0.15));\n    }\n\n.fc .fc-timegrid-col-frame {\n    min-height: 100%; /* liquid-hack is below */\n    position: relative;\n  }\n\n.fc-media-screen.fc-liquid-hack .fc-timegrid-col-frame {\n  height: auto;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n    }\n\n.fc-media-screen .fc-timegrid-cols {\n    position: absolute; /* no z-index. children will decide and go above slots */\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0\n  }\n\n.fc-media-screen .fc-timegrid-cols > table {\n      height: 100%;\n    }\n\n.fc-media-screen .fc-timegrid-col-bg,\n  .fc-media-screen .fc-timegrid-col-events,\n  .fc-media-screen .fc-timegrid-now-indicator-container {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n  }\n\n.fc {\n\n  /* bg */\n\n}\n\n.fc .fc-timegrid-col-bg {\n    z-index: 2; /* TODO: kill */\n  }\n\n.fc .fc-timegrid-col-bg .fc-non-business { z-index: 1 }\n\n.fc .fc-timegrid-col-bg .fc-bg-event { z-index: 2 }\n\n.fc .fc-timegrid-col-bg .fc-highlight { z-index: 3 }\n\n.fc .fc-timegrid-bg-harness {\n    position: absolute; /* top/bottom will be set by JS */\n    left: 0;\n    right: 0;\n  }\n\n.fc {\n\n  /* fg events */\n  /* (the mirror segs are put into a separate container with same classname, */\n  /* and they must be after the normal seg container to appear at a higher z-index) */\n\n}\n\n.fc .fc-timegrid-col-events {\n    z-index: 3;\n    /* child event segs have z-indexes that are scoped within this div */\n  }\n\n.fc {\n\n  /* now indicator */\n\n}\n\n.fc .fc-timegrid-now-indicator-container {\n    bottom: 0;\n    overflow: hidden; /* don\'t let overflow of lines/arrows cause unnecessary scrolling */\n    /* z-index is set on the individual elements */\n  }\n\n.fc-direction-ltr .fc-timegrid-col-events {\n    margin: 0 2.5% 0 2px;\n  }\n\n.fc-direction-rtl .fc-timegrid-col-events {\n    margin: 0 2px 0 2.5%;\n  }\n\n.fc-timegrid-event-harness {\n  position: absolute /* top/left/right/bottom will all be set by JS */\n}\n\n.fc-timegrid-event-harness > .fc-timegrid-event {\n    position: absolute; /* absolute WITHIN the harness */\n    top: 0; /* for when not yet positioned */\n    bottom: 0; /* " */\n    left: 0;\n    right: 0;\n  }\n\n.fc-timegrid-event-harness-inset .fc-timegrid-event,\n.fc-timegrid-event.fc-event-mirror,\n.fc-timegrid-more-link {\n  box-shadow: 0px 0px 0px 1px #fff;\n  box-shadow: 0px 0px 0px 1px var(--fc-page-bg-color, #fff);\n}\n\n.fc-timegrid-event,\n.fc-timegrid-more-link { /* events need to be root */\n  font-size: .85em;\n  font-size: var(--fc-small-font-size, .85em);\n  border-radius: 3px;\n}\n\n.fc-timegrid-event { /* events need to be root */\n  margin-bottom: 1px /* give some space from bottom */\n}\n\n.fc-timegrid-event .fc-event-main {\n    padding: 1px 1px 0;\n  }\n\n.fc-timegrid-event .fc-event-time {\n    white-space: nowrap;\n    font-size: .85em;\n    font-size: var(--fc-small-font-size, .85em);\n    margin-bottom: 1px;\n  }\n\n.fc-timegrid-event-short .fc-event-main-frame {\n    flex-direction: row;\n    overflow: hidden;\n  }\n\n.fc-timegrid-event-short .fc-event-time:after {\n    content: \'\\00a0-\\00a0\'; /* dash surrounded by non-breaking spaces */\n  }\n\n.fc-timegrid-event-short .fc-event-title {\n    font-size: .85em;\n    font-size: var(--fc-small-font-size, .85em)\n  }\n\n.fc-timegrid-more-link { /* does NOT inherit from fc-timegrid-event */\n  position: absolute;\n  z-index: 9999; /* hack */\n  color: inherit;\n  color: var(--fc-more-link-text-color, inherit);\n  background: #d0d0d0;\n  background: var(--fc-more-link-bg-color, #d0d0d0);\n  cursor: pointer;\n  margin-bottom: 1px; /* match space below fc-timegrid-event */\n}\n\n.fc-timegrid-more-link-inner { /* has fc-sticky */\n  padding: 3px 2px;\n  top: 0;\n}\n\n.fc-direction-ltr .fc-timegrid-more-link {\n    right: 0;\n  }\n\n.fc-direction-rtl .fc-timegrid-more-link {\n    left: 0;\n  }\n\n.fc {\n\n  /* line */\n\n}\n\n.fc .fc-timegrid-now-indicator-line {\n    position: absolute;\n    z-index: 4;\n    left: 0;\n    right: 0;\n    border-style: solid;\n    border-color: red;\n    border-color: var(--fc-now-indicator-color, red);\n    border-width: 1px 0 0;\n  }\n\n.fc {\n\n  /* arrow */\n\n}\n\n.fc .fc-timegrid-now-indicator-arrow {\n    position: absolute;\n    z-index: 4;\n    margin-top: -5px; /* vertically center on top coordinate */\n    border-style: solid;\n    border-color: red;\n    border-color: var(--fc-now-indicator-color, red);\n  }\n\n.fc-direction-ltr .fc-timegrid-now-indicator-arrow {\n    left: 0;\n\n    /* triangle pointing right. TODO: mixin */\n    border-width: 5px 0 5px 6px;\n    border-top-color: transparent;\n    border-bottom-color: transparent;\n  }\n\n.fc-direction-rtl .fc-timegrid-now-indicator-arrow {\n    right: 0;\n\n    /* triangle pointing left. TODO: mixin */\n    border-width: 5px 6px 5px 0;\n    border-top-color: transparent;\n    border-bottom-color: transparent;\n  }\n';
        },
    },
]);
