'use strict';
(self.webpackChunkportal = self.webpackChunkportal || []).push([
    [655],
    {
        3655: (pe, ve, N) => {
            N.r(ve),
                N.d(ve, {
                    ClassesCalendarModule: () => Wp,
                    SelectClassesCalendarComponent: () => ot,
                });
            var le,
                k,
                lt,
                We,
                ct,
                pn,
                ft,
                O = N(9808),
                ee = N(2559),
                q = N.n(ee),
                u = N(655),
                Ve = {},
                vn = [],
                _r =
                    /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
            function he(t, e) {
                for (var n in e) t[n] = e[n];
                return t;
            }
            function Oe(t) {
                var e = t.parentNode;
                e && e.removeChild(t);
            }
            function ce(t, e, n) {
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
                            arguments.length > 3 ? le.call(arguments, 2) : n),
                    'function' == typeof t && null != t.defaultProps)
                )
                    for (o in t.defaultProps)
                        void 0 === a[o] && (a[o] = t.defaultProps[o]);
                return Ge(t, a, r, i, null);
            }
            function Ge(t, e, n, r, i) {
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
                    __v: null == i ? ++lt : i,
                };
                return null == i && null != k.vnode && k.vnode(o), o;
            }
            function ge(t) {
                return t.children;
            }
            function ae(t, e) {
                (this.props = t), (this.context = e);
            }
            function He(t, e) {
                if (null == e)
                    return t.__ ? He(t.__, t.__.__k.indexOf(t) + 1) : null;
                for (var n; e < t.__k.length; e++)
                    if (null != (n = t.__k[e]) && null != n.__e) return n.__e;
                return 'function' == typeof t.type ? He(t) : null;
            }
            function gn(t) {
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
                    return gn(t);
                }
            }
            function dt(t) {
                ((!t.__d && (t.__d = !0) && We.push(t) && !ut.__r++) ||
                    pn !== k.debounceRendering) &&
                    ((pn = k.debounceRendering) || ct)(ut);
            }
            function ut() {
                for (var t; (ut.__r = We.length); )
                    (t = We.sort(function (e, n) {
                        return e.__v.__b - n.__v.__b;
                    })),
                        (We = []),
                        t.some(function (e) {
                            var n, r, i, o, a, s;
                            e.__d &&
                                ((a = (o = (n = e).__v).__e),
                                (s = n.__P) &&
                                    ((r = []),
                                    ((i = he({}, o)).__v = o.__v + 1),
                                    H(
                                        s,
                                        o,
                                        i,
                                        n.__n,
                                        void 0 !== s.ownerSVGElement,
                                        null != o.__h ? [a] : null,
                                        r,
                                        null == a ? He(o) : a,
                                        o.__h
                                    ),
                                    te(r, o),
                                    o.__e != a && gn(o)));
                        });
            }
            function D(t, e, n, r, i, o, a, s, l, c) {
                var f,
                    d,
                    p,
                    v,
                    g,
                    b,
                    E,
                    m = (r && r.__k) || vn,
                    w = m.length;
                for (n.__k = [], f = 0; f < e.length; f++)
                    if (
                        null !=
                        (v = n.__k[f] =
                            null == (v = e[f]) || 'boolean' == typeof v
                                ? null
                                : 'string' == typeof v ||
                                  'number' == typeof v ||
                                  'bigint' == typeof v
                                ? Ge(null, v, null, null, v)
                                : Array.isArray(v)
                                ? Ge(ge, { children: v }, null, null, null)
                                : v.__b > 0
                                ? Ge(v.type, v.props, v.key, null, v.__v)
                                : v)
                    ) {
                        if (
                            ((v.__ = n),
                            (v.__b = n.__b + 1),
                            null === (p = m[f]) ||
                                (p && v.key == p.key && v.type === p.type))
                        )
                            m[f] = void 0;
                        else
                            for (d = 0; d < w; d++) {
                                if (
                                    (p = m[d]) &&
                                    v.key == p.key &&
                                    v.type === p.type
                                ) {
                                    m[d] = void 0;
                                    break;
                                }
                                p = null;
                            }
                        H(t, v, (p = p || Ve), i, o, a, s, l, c),
                            (g = v.__e),
                            (d = v.ref) &&
                                p.ref != d &&
                                (E || (E = []),
                                p.ref && E.push(p.ref, null, v),
                                E.push(d, v.__c || g, v)),
                            null != g
                                ? (null == b && (b = g),
                                  'function' == typeof v.type && v.__k === p.__k
                                      ? (v.__d = l = C(v, l, t))
                                      : (l = x(t, v, p, m, g, l)),
                                  'function' == typeof n.type && (n.__d = l))
                                : l &&
                                  p.__e == l &&
                                  l.parentNode != t &&
                                  (l = He(p));
                    }
                for (n.__e = b, f = w; f--; )
                    null != m[f] &&
                        ('function' == typeof n.type &&
                            null != m[f].__e &&
                            m[f].__e == n.__d &&
                            (n.__d = He(r, f + 1)),
                        Ae(m[f], m[f]));
                if (E) for (f = 0; f < E.length; f++) J(E[f], E[++f], E[++f]);
            }
            function C(t, e, n) {
                for (var r, i = t.__k, o = 0; i && o < i.length; o++)
                    (r = i[o]) &&
                        ((r.__ = t),
                        (e =
                            'function' == typeof r.type
                                ? C(r, e, n)
                                : x(n, r, r, i, r.__e, e)));
                return e;
            }
            function S(t, e) {
                return (
                    (e = e || []),
                    null == t ||
                        'boolean' == typeof t ||
                        (Array.isArray(t)
                            ? t.some(function (n) {
                                  S(n, e);
                              })
                            : e.push(t)),
                    e
                );
            }
            function x(t, e, n, r, i, o) {
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
            function T(t, e, n) {
                '-' === e[0]
                    ? t.setProperty(e, n)
                    : (t[e] =
                          null == n
                              ? ''
                              : 'number' != typeof n || _r.test(e)
                              ? n
                              : n + 'px');
            }
            function B(t, e, n, r, i) {
                var o;
                e: if ('style' === e)
                    if ('string' == typeof n) t.style.cssText = n;
                    else {
                        if (
                            ('string' == typeof r && (t.style.cssText = r = ''),
                            r)
                        )
                            for (e in r) (n && e in n) || T(t.style, e, '');
                        if (n)
                            for (e in n)
                                (r && n[e] === r[e]) || T(t.style, e, n[e]);
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
                            ? r || t.addEventListener(e, o ? ue : G, o)
                            : t.removeEventListener(e, o ? ue : G, o);
                else if ('dangerouslySetInnerHTML' !== e) {
                    if (i)
                        e = e
                            .replace(/xlink(H|:h)/, 'h')
                            .replace(/sName$/, 's');
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
            function G(t) {
                this.l[t.type + !1](k.event ? k.event(t) : t);
            }
            function ue(t) {
                this.l[t.type + !0](k.event ? k.event(t) : t);
            }
            function H(t, e, n, r, i, o, a, s, l) {
                var c,
                    f,
                    d,
                    p,
                    v,
                    g,
                    b,
                    E,
                    m,
                    w,
                    _,
                    R = e.type;
                if (void 0 !== e.constructor) return null;
                null != n.__h &&
                    ((l = n.__h),
                    (s = e.__e = n.__e),
                    (e.__h = null),
                    (o = [s])),
                    (c = k.__b) && c(e);
                try {
                    e: if ('function' == typeof R) {
                        if (
                            ((E = e.props),
                            (m = (c = R.contextType) && r[c.__c]),
                            (w = c ? (m ? m.props.value : c.__) : r),
                            n.__c
                                ? (b = (f = e.__c = n.__c).__ = f.__E)
                                : ('prototype' in R && R.prototype.render
                                      ? (e.__c = f = new R(E, w))
                                      : ((e.__c = f = new ae(E, w)),
                                        (f.constructor = R),
                                        (f.render = pt)),
                                  m && m.sub(f),
                                  (f.props = E),
                                  f.state || (f.state = {}),
                                  (f.context = w),
                                  (f.__n = r),
                                  (d = f.__d = !0),
                                  (f.__h = [])),
                            null == f.__s && (f.__s = f.state),
                            null != R.getDerivedStateFromProps &&
                                (f.__s == f.state && (f.__s = he({}, f.__s)),
                                he(
                                    f.__s,
                                    R.getDerivedStateFromProps(E, f.__s)
                                )),
                            (p = f.props),
                            (v = f.state),
                            d)
                        )
                            null == R.getDerivedStateFromProps &&
                                null != f.componentWillMount &&
                                f.componentWillMount(),
                                null != f.componentDidMount &&
                                    f.__h.push(f.componentDidMount);
                        else {
                            if (
                                (null == R.getDerivedStateFromProps &&
                                    E !== p &&
                                    null != f.componentWillReceiveProps &&
                                    f.componentWillReceiveProps(E, w),
                                (!f.__e &&
                                    null != f.shouldComponentUpdate &&
                                    !1 ===
                                        f.shouldComponentUpdate(E, f.__s, w)) ||
                                    e.__v === n.__v)
                            ) {
                                (f.props = E),
                                    (f.state = f.__s),
                                    e.__v !== n.__v && (f.__d = !1),
                                    (f.__v = e),
                                    (e.__e = n.__e),
                                    (e.__k = n.__k),
                                    e.__k.forEach(function (F) {
                                        F && (F.__ = e);
                                    }),
                                    f.__h.length && a.push(f);
                                break e;
                            }
                            null != f.componentWillUpdate &&
                                f.componentWillUpdate(E, f.__s, w),
                                null != f.componentDidUpdate &&
                                    f.__h.push(function () {
                                        f.componentDidUpdate(p, v, g);
                                    });
                        }
                        (f.context = w),
                            (f.props = E),
                            (f.state = f.__s),
                            (c = k.__r) && c(e),
                            (f.__d = !1),
                            (f.__v = e),
                            (f.__P = t),
                            (c = f.render(f.props, f.state, f.context)),
                            (f.state = f.__s),
                            null != f.getChildContext &&
                                (r = he(he({}, r), f.getChildContext())),
                            d ||
                                null == f.getSnapshotBeforeUpdate ||
                                (g = f.getSnapshotBeforeUpdate(p, v)),
                            (_ =
                                null != c && c.type === ge && null == c.key
                                    ? c.props.children
                                    : c),
                            D(
                                t,
                                Array.isArray(_) ? _ : [_],
                                e,
                                n,
                                r,
                                i,
                                o,
                                a,
                                s,
                                l
                            ),
                            (f.base = e.__e),
                            (e.__h = null),
                            f.__h.length && a.push(f),
                            b && (f.__E = f.__ = null),
                            (f.__e = !1);
                    } else
                        null == o && e.__v === n.__v
                            ? ((e.__k = n.__k), (e.__e = n.__e))
                            : (e.__e = (function Re(t, e, n, r, i, o, a, s) {
                                  var l,
                                      c,
                                      f,
                                      d = n.props,
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
                                      d === p ||
                                          (s && t.data === p) ||
                                          (t.data = p);
                                  else {
                                      if (
                                          ((o = o && le.call(t.childNodes)),
                                          (c = (d = n.props || Ve)
                                              .dangerouslySetInnerHTML),
                                          (f = p.dangerouslySetInnerHTML),
                                          !s)
                                      ) {
                                          if (null != o)
                                              for (
                                                  d = {}, g = 0;
                                                  g < t.attributes.length;
                                                  g++
                                              )
                                                  d[t.attributes[g].name] =
                                                      t.attributes[g].value;
                                          (f || c) &&
                                              ((f &&
                                                  ((c &&
                                                      f.__html == c.__html) ||
                                                      f.__html ===
                                                          t.innerHTML)) ||
                                                  (t.innerHTML =
                                                      (f && f.__html) || ''));
                                      }
                                      if (
                                          ((function M(t, e, n, r, i) {
                                              var o;
                                              for (o in n)
                                                  'children' === o ||
                                                      'key' === o ||
                                                      o in e ||
                                                      B(t, o, null, n[o], r);
                                              for (o in e)
                                                  (i &&
                                                      'function' !=
                                                          typeof e[o]) ||
                                                      'children' === o ||
                                                      'key' === o ||
                                                      'value' === o ||
                                                      'checked' === o ||
                                                      n[o] === e[o] ||
                                                      B(t, o, e[o], n[o], r);
                                          })(t, p, d, i, s),
                                          f)
                                      )
                                          e.__k = [];
                                      else if (
                                          ((g = e.props.children),
                                          D(
                                              t,
                                              Array.isArray(g) ? g : [g],
                                              e,
                                              n,
                                              r,
                                              i && 'foreignObject' !== v,
                                              o,
                                              a,
                                              o ? o[0] : n.__k && He(n, 0),
                                              s
                                          ),
                                          null != o)
                                      )
                                          for (g = o.length; g--; )
                                              null != o[g] && Oe(o[g]);
                                      s ||
                                          ('value' in p &&
                                              void 0 !== (g = p.value) &&
                                              (g !== t.value ||
                                                  ('progress' === v && !g) ||
                                                  ('option' === v &&
                                                      g !== d.value)) &&
                                              B(t, 'value', g, d.value, !1),
                                          'checked' in p &&
                                              void 0 !== (g = p.checked) &&
                                              g !== t.checked &&
                                              B(
                                                  t,
                                                  'checked',
                                                  g,
                                                  d.checked,
                                                  !1
                                              ));
                                  }
                                  return t;
                              })(n.__e, e, n, r, i, o, a, l));
                    (c = k.diffed) && c(e);
                } catch (F) {
                    (e.__v = null),
                        (l || null != o) &&
                            ((e.__e = s),
                            (e.__h = !!l),
                            (o[o.indexOf(s)] = null)),
                        k.__e(F, e, n);
                }
            }
            function te(t, e) {
                k.__c && k.__c(e, t),
                    t.some(function (n) {
                        try {
                            (t = n.__h),
                                (n.__h = []),
                                t.some(function (r) {
                                    r.call(n);
                                });
                        } catch (r) {
                            k.__e(r, n.__v);
                        }
                    });
            }
            function J(t, e, n) {
                try {
                    'function' == typeof t ? t(e) : (t.current = e);
                } catch (r) {
                    k.__e(r, n);
                }
            }
            function Ae(t, e, n) {
                var r, i;
                if (
                    (k.unmount && k.unmount(t),
                    (r = t.ref) &&
                        ((r.current && r.current !== t.__e) || J(r, null, e)),
                    null != (r = t.__c))
                ) {
                    if (r.componentWillUnmount)
                        try {
                            r.componentWillUnmount();
                        } catch (o) {
                            k.__e(o, e);
                        }
                    r.base = r.__P = null;
                }
                if ((r = t.__k))
                    for (i = 0; i < r.length; i++)
                        r[i] && Ae(r[i], e, 'function' != typeof t.type);
                n || null == t.__e || Oe(t.__e), (t.__e = t.__d = void 0);
            }
            function pt(t, e, n) {
                return this.constructor(t, n);
            }
            function ye(t, e, n) {
                var r, i, o;
                k.__ && k.__(t, e),
                    (i = (r = 'function' == typeof n)
                        ? null
                        : (n && n.__k) || e.__k),
                    (o = []),
                    H(
                        e,
                        (t = ((!r && n) || e).__k = ce(ge, null, [t])),
                        i || Ve,
                        Ve,
                        void 0 !== e.ownerSVGElement,
                        !r && n
                            ? [n]
                            : i
                            ? null
                            : e.firstChild
                            ? le.call(e.childNodes)
                            : null,
                        o,
                        !r && n ? n : i ? i.__e : e.firstChild,
                        r
                    ),
                    te(o, t);
            }
            (le = vn.slice),
                (k = {
                    __e: function (t, e, n, r) {
                        for (var i, o, a; (e = e.__); )
                            if ((i = e.__c) && !i.__)
                                try {
                                    if (
                                        ((o = i.constructor) &&
                                            null !=
                                                o.getDerivedStateFromError &&
                                            (i.setState(
                                                o.getDerivedStateFromError(t)
                                            ),
                                            (a = i.__d)),
                                        null != i.componentDidCatch &&
                                            (i.componentDidCatch(t, r || {}),
                                            (a = i.__d)),
                                        a)
                                    )
                                        return (i.__E = i);
                                } catch (s) {
                                    t = s;
                                }
                        throw t;
                    },
                }),
                (lt = 0),
                (ae.prototype.setState = function (t, e) {
                    var n;
                    (n =
                        null != this.__s && this.__s !== this.state
                            ? this.__s
                            : (this.__s = he({}, this.state))),
                        'function' == typeof t &&
                            (t = t(he({}, n), this.props)),
                        t && he(n, t),
                        null != t &&
                            this.__v &&
                            (e && this.__h.push(e), dt(this));
                }),
                (ae.prototype.forceUpdate = function (t) {
                    this.__v &&
                        ((this.__e = !0), t && this.__h.push(t), dt(this));
                }),
                (ae.prototype.render = ge),
                (We = []),
                (ct =
                    'function' == typeof Promise
                        ? Promise.prototype.then.bind(Promise.resolve())
                        : setTimeout),
                (ut.__r = 0),
                (ft = 0);
            var $,
                Ir,
                Nr = [],
                Pr = k.__b,
                Br = k.__r,
                Or = k.diffed,
                Hr = k.__c,
                zr = k.unmount;
            function Oa() {
                for (var t; (t = Nr.shift()); )
                    if (t.__P)
                        try {
                            t.__H.__h.forEach(Rt),
                                t.__H.__h.forEach(yn),
                                (t.__H.__h = []);
                        } catch (e) {
                            (t.__H.__h = []), k.__e(e, t.__v);
                        }
            }
            (k.__b = function (t) {
                ($ = null), Pr && Pr(t);
            }),
                (k.__r = function (t) {
                    Br && Br(t);
                    var e = ($ = t.__c).__H;
                    e && (e.__h.forEach(Rt), e.__h.forEach(yn), (e.__h = []));
                }),
                (k.diffed = function (t) {
                    Or && Or(t);
                    var e = t.__c;
                    e &&
                        e.__H &&
                        e.__H.__h.length &&
                        ((1 !== Nr.push(e) && Ir === k.requestAnimationFrame) ||
                            (
                                (Ir = k.requestAnimationFrame) ||
                                function (n) {
                                    var r,
                                        i = function () {
                                            clearTimeout(o),
                                                Qr && cancelAnimationFrame(r),
                                                setTimeout(n);
                                        },
                                        o = setTimeout(i, 100);
                                    Qr && (r = requestAnimationFrame(i));
                                }
                            )(Oa)),
                        ($ = null);
                }),
                (k.__c = function (t, e) {
                    e.some(function (n) {
                        try {
                            n.__h.forEach(Rt),
                                (n.__h = n.__h.filter(function (r) {
                                    return !r.__ || yn(r);
                                }));
                        } catch (r) {
                            e.some(function (i) {
                                i.__h && (i.__h = []);
                            }),
                                (e = []),
                                k.__e(r, n.__v);
                        }
                    }),
                        Hr && Hr(t, e);
                }),
                (k.unmount = function (t) {
                    zr && zr(t);
                    var e,
                        n = t.__c;
                    n &&
                        n.__H &&
                        (n.__H.__.forEach(function (r) {
                            try {
                                Rt(r);
                            } catch (i) {
                                e = i;
                            }
                        }),
                        e && k.__e(e, n.__v));
                });
            var Qr = 'function' == typeof requestAnimationFrame;
            function Rt(t) {
                var e = $,
                    n = t.__c;
                'function' == typeof n && ((t.__c = void 0), n()), ($ = e);
            }
            function yn(t) {
                var e = $;
                (t.__c = t.__()), ($ = e);
            }
            function An(t, e) {
                for (var n in t) if ('__source' !== n && !(n in e)) return !0;
                for (var r in e)
                    if ('__source' !== r && t[r] !== e[r]) return !0;
                return !1;
            }
            function En(t) {
                this.props = t;
            }
            ((En.prototype = new ae()).isPureReactComponent = !0),
                (En.prototype.shouldComponentUpdate = function (t, e) {
                    return An(this.props, t) || An(this.state, e);
                });
            var Gr = k.__b;
            (k.__b = function (t) {
                t.type &&
                    t.type.__f &&
                    t.ref &&
                    ((t.props.ref = t.ref), (t.ref = null)),
                    Gr && Gr(t);
            }),
                'undefined' != typeof Symbol &&
                    Symbol.for &&
                    Symbol.for('react.forward_ref');
            var La = k.__e;
            k.__e = function (t, e, n, r) {
                if (t.then)
                    for (var i, o = e; (o = o.__); )
                        if ((i = o.__c) && i.__c)
                            return (
                                null == e.__e &&
                                    ((e.__e = n.__e), (e.__k = n.__k)),
                                i.__c(t, e)
                            );
                La(t, e, n, r);
            };
            var jr = k.unmount;
            function _t() {
                (this.__u = 0), (this.t = null), (this.__b = null);
            }
            function Yr(t) {
                var e = t.__.__c;
                return e && e.__e && e.__e(t);
            }
            function vt() {
                (this.u = null), (this.o = null);
            }
            (k.unmount = function (t) {
                var e = t.__c;
                e && e.__R && e.__R(),
                    e && !0 === t.__h && (t.type = null),
                    jr && jr(t);
            }),
                ((_t.prototype = new ae()).__c = function (t, e) {
                    var n = e.__c,
                        r = this;
                    null == r.t && (r.t = []), r.t.push(n);
                    var i = Yr(r.__v),
                        o = !1,
                        a = function () {
                            o || ((o = !0), (n.__R = null), i ? i(s) : s());
                        };
                    n.__R = a;
                    var s = function () {
                            if (!--r.__u) {
                                if (r.state.__e) {
                                    var c = r.state.__e;
                                    r.__v.__k[0] = (function d(p, v, g) {
                                        return (
                                            p &&
                                                ((p.__v = null),
                                                (p.__k =
                                                    p.__k &&
                                                    p.__k.map(function (b) {
                                                        return d(b, v, g);
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
                                var f;
                                for (
                                    r.setState({ __e: (r.__b = null) });
                                    (f = r.t.pop());

                                )
                                    f.forceUpdate();
                            }
                        },
                        l = !0 === e.__h;
                    r.__u++ || l || r.setState({ __e: (r.__b = r.__v.__k[0]) }),
                        t.then(a, a);
                }),
                (_t.prototype.componentWillUnmount = function () {
                    this.t = [];
                }),
                (_t.prototype.render = function (t, e) {
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
                                            (a = (function Vr(t, e) {
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
                    var i = e.__e && ce(ge, null, t.fallback);
                    return (
                        i && (i.__h = null),
                        [ce(ge, null, e.__e ? null : t.children), i]
                    );
                });
            var qr = function (t, e, n) {
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
                    ye(null, e.l), (e.l = null), (e.i = null);
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
                          ye(ce(Wa, { context: e.context }, t.__v), e.l))
                        : e.l && e.componentWillUnmount();
            }
            ((vt.prototype = new ae()).__e = function (t) {
                var e = this,
                    n = Yr(e.__v),
                    r = e.o.get(t);
                return (
                    r[0]++,
                    function (i) {
                        var o = function () {
                            e.props.revealOrder
                                ? (r.push(i), qr(e, t, r))
                                : i();
                        };
                        n ? n(o) : o();
                    }
                );
            }),
                (vt.prototype.render = function (t) {
                    (this.u = null), (this.o = new Map());
                    var e = S(t.children);
                    t.revealOrder && 'b' === t.revealOrder[0] && e.reverse();
                    for (var n = e.length; n--; )
                        this.o.set(e[n], (this.u = [1, 0, this.u]));
                    return t.children;
                }),
                (vt.prototype.componentDidUpdate =
                    vt.prototype.componentDidMount =
                        function () {
                            var t = this;
                            this.o.forEach(function (e, n) {
                                qr(t, n, e);
                            });
                        });
            var Xr =
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
            (ae.prototype.isReactComponent = {}),
                [
                    'componentWillMount',
                    'componentWillReceiveProps',
                    'componentWillUpdate',
                ].forEach(function (t) {
                    Object.defineProperty(ae.prototype, t, {
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
            var Kr = k.event;
            function Ja() {}
            function Xa() {
                return this.cancelBubble;
            }
            function Ka() {
                return this.defaultPrevented;
            }
            k.event = function (t) {
                return (
                    Kr && (t = Kr(t)),
                    (t.persist = Ja),
                    (t.isPropagationStopped = Xa),
                    (t.isDefaultPrevented = Ka),
                    (t.nativeEvent = t)
                );
            };
            var ei = {
                    configurable: !0,
                    get: function () {
                        return this.class;
                    },
                },
                ti = k.vnode;
            k.vnode = function (t) {
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
                        (r.value = S(n.children).forEach(function (s) {
                            s.props.selected =
                                -1 != r.value.indexOf(s.props.value);
                        })),
                        'select' == e &&
                            null != r.defaultValue &&
                            (r.value = S(n.children).forEach(function (s) {
                                s.props.selected = r.multiple
                                    ? -1 !=
                                      r.defaultValue.indexOf(s.props.value)
                                    : r.defaultValue == s.props.value;
                            })),
                        (t.props = r),
                        n.class != n.className &&
                            ((ei.enumerable = 'className' in n),
                            null != n.className && (r.class = n.className),
                            Object.defineProperty(r, 'className', ei));
                }
                (t.$$typeof = Xr), ti && ti(t);
            };
            var ni = k.__r;
            k.__r = function (t) {
                ni && ni(t);
            };
            var ii = 'undefined' != typeof globalThis ? globalThis : window;
            ii.FullCalendarVDom
                ? console.warn('FullCalendar VDOM already loaded')
                : (ii.FullCalendarVDom = {
                      Component: ae,
                      createElement: ce,
                      render: ye,
                      createRef: function hn() {
                          return { current: null };
                      },
                      Fragment: ge,
                      createContext: function ls(t) {
                          var e = (function Mr(t, e) {
                                  var n = {
                                      __c: (e = '__cC' + ft++),
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
                                                              i.some(dt);
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
                      createPortal: function Jr(t, e) {
                          var n = ce(Va, { __v: t, i: e });
                          return (n.containerInfo = e), n;
                      },
                      flushSync: function as(t) {
                          t();
                          var e = k.debounceRendering,
                              n = [];
                          for (
                              k.debounceRendering = function r(i) {
                                  n.push(i);
                              },
                                  ye(ce(ss, {}), document.createElement('div'));
                              n.length;

                          )
                              n.shift()();
                          k.debounceRendering = e;
                      },
                      unmountComponentAtNode: function cs(t) {
                          ye(null, t);
                      },
                  });
            var ss = (function (t) {
                function e() {
                    return (null !== t && t.apply(this, arguments)) || this;
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.render = function () {
                        return ce('div', {});
                    }),
                    (e.prototype.componentDidMount = function () {
                        this.setState({});
                    }),
                    e
                );
            })(ae);
            if ((N(4602), 'undefined' == typeof FullCalendarVDom))
                throw new Error(
                    'Please import the top-level fullcalendar lib before attempting to import a plugin.'
                );
            var wn = FullCalendarVDom.Component,
                h = FullCalendarVDom.createElement,
                fs = FullCalendarVDom.render,
                X = FullCalendarVDom.createRef,
                K = FullCalendarVDom.Fragment,
                oi = FullCalendarVDom.createContext,
                ds = FullCalendarVDom.createPortal,
                ai = FullCalendarVDom.flushSync,
                us = FullCalendarVDom.unmountComponentAtNode,
                Ye = (function () {
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
            function Dn(t) {
                t.parentNode && t.parentNode.removeChild(t);
            }
            function ne(t, e) {
                if (t.closest) return t.closest(e);
                if (!document.documentElement.contains(t)) return null;
                do {
                    if (Sn(t, e)) return t;
                    t = t.parentElement || t.parentNode;
                } while (null !== t && 1 === t.nodeType);
                return null;
            }
            function Sn(t, e) {
                return (
                    t.matches ||
                    t.matchesSelector ||
                    t.msMatchesSelector
                ).call(t, e);
            }
            var vs = /(top|left|right|bottom|width|height)$/i;
            function ht(t, e) {
                for (var n in e) si(t, n, e[n]);
            }
            function si(t, e, n) {
                t.style[e] =
                    null == n
                        ? ''
                        : 'number' == typeof n && vs.test(e)
                        ? n + 'px'
                        : n;
            }
            function li(t) {
                var e, n;
                return null !==
                    (n =
                        null === (e = t.composedPath) || void 0 === e
                            ? void 0
                            : e.call(t)[0]) && void 0 !== n
                    ? n
                    : t.target;
            }
            function ci(t) {
                return t.getRootNode ? t.getRootNode() : document;
            }
            var fi = 0;
            function kt() {
                return 'fc-dom-' + (fi += 1);
            }
            function Mt(t) {
                t.preventDefault();
            }
            function di(t, e, n, r) {
                var i = (function hs(t, e) {
                    return function (n) {
                        var r = ne(n.target, t);
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
            var ui = [
                'webkitTransitionEnd',
                'otransitionend',
                'oTransitionEnd',
                'msTransitionEnd',
                'transitionend',
            ];
            function pi(t) {
                return (0, u.pi)({ onClick: t }, vi(t));
            }
            function vi(t) {
                return {
                    tabIndex: 0,
                    onKeyDown: function (e) {
                        ('Enter' === e.key || ' ' === e.key) &&
                            (t(e), e.preventDefault());
                    },
                };
            }
            var hi = 0;
            function qe() {
                return String((hi += 1));
            }
            function It() {
                document.body.classList.add('fc-not-allowed');
            }
            function Nt() {
                document.body.classList.remove('fc-not-allowed');
            }
            function Ss(t, e, n) {
                return n.func
                    ? n.func(t, e)
                    : (function Cs(t, e) {
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
            function Je(t, e) {
                var n = String(t);
                return '000'.substr(0, e - n.length) + n;
            }
            function gt(t, e, n) {
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
            function Pt(t) {
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
            var gi = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
            function mi(t, e) {
                var n = ke(t);
                return (n[2] += 7 * e), se(n);
            }
            function ie(t, e) {
                var n = ke(t);
                return (n[2] += e), se(n);
            }
            function Fe(t, e) {
                var n = ke(t);
                return (n[6] += e), se(n);
            }
            function _e(t, e) {
                return (e.valueOf() - t.valueOf()) / 864e5;
            }
            function Bt(t, e) {
                return Me(t) === Me(e) ? Math.round(_e(t, e)) : null;
            }
            function V(t) {
                return se([
                    t.getUTCFullYear(),
                    t.getUTCMonth(),
                    t.getUTCDate(),
                ]);
            }
            function Cn(t, e, n, r) {
                var i = se([e, 0, 1 + zs(e, n, r)]),
                    o = V(t),
                    a = Math.round(_e(i, o));
                return Math.floor(a / 7) + 1;
            }
            function zs(t, e, n) {
                var r = 7 + e - n;
                return (-(7 + se([t, 0, r]).getUTCDay() - e) % 7) + r - 1;
            }
            function yi(t) {
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
            function bi(t) {
                return new Date(
                    t[0],
                    t[1] || 0,
                    null == t[2] ? 1 : t[2],
                    t[3] || 0,
                    t[4] || 0,
                    t[5] || 0
                );
            }
            function ke(t) {
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
            function se(t) {
                return (
                    1 === t.length && (t = t.concat([0])),
                    new Date(Date.UTC.apply(Date, t))
                );
            }
            function Ai(t) {
                return !isNaN(t.valueOf());
            }
            function Me(t) {
                return (
                    1e3 * t.getUTCHours() * 60 * 60 +
                    1e3 * t.getUTCMinutes() * 60 +
                    1e3 * t.getUTCSeconds() +
                    t.getUTCMilliseconds()
                );
            }
            function Ot(t, e, n, r) {
                return {
                    instanceId: qe(),
                    defId: t,
                    range: e,
                    forcedStartTzo: null == n ? null : n,
                    forcedEndTzo: null == r ? null : r,
                };
            }
            var Ht = Object.prototype.hasOwnProperty;
            function xn(t, e) {
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
                        i.length && (n[r] = xn(i));
                    }
                for (o = t.length - 1; o >= 0; o -= 1) {
                    var s = t[o];
                    for (var l in s) l in n || (n[l] = s[l]);
                }
                return n;
            }
            function Ue(t, e) {
                var n = {};
                for (var r in t) e(t[r], r) && (n[r] = t[r]);
                return n;
            }
            function Ee(t, e) {
                var n = {};
                for (var r in t) n[r] = e(t[r], r);
                return n;
            }
            function Ei(t) {
                for (var e = {}, n = 0, r = t; n < r.length; n++) e[r[n]] = !0;
                return e;
            }
            function Tn(t) {
                var e = [];
                for (var n in t) e.push(t[n]);
                return e;
            }
            function we(t, e) {
                if (t === e) return !0;
                for (var n in t) if (Ht.call(t, n) && !(n in e)) return !1;
                for (var n in e) if (Ht.call(e, n) && t[n] !== e[n]) return !1;
                return !0;
            }
            function wi(t, e) {
                var n = [];
                for (var r in t) Ht.call(t, r) && (r in e || n.push(r));
                for (var r in e) Ht.call(e, r) && t[r] !== e[r] && n.push(r);
                return n;
            }
            function Di(t, e, n) {
                if ((void 0 === n && (n = {}), t === e)) return !0;
                for (var r in e)
                    if (!(r in t) || !Fs(t[r], e[r], n[r])) return !1;
                for (var r in t) if (!(r in e)) return !1;
                return !0;
            }
            function Fs(t, e, n) {
                return t === e || !0 === n || (!!n && n(t, e));
            }
            function Xe(t, e, n) {
                var r = n.dateEnv,
                    i = n.pluginHooks,
                    o = n.options,
                    a = t.defs,
                    s = t.instances;
                for (var l in ((s = Ue(s, function (E) {
                    return !a[E.defId].recurringDef;
                })),
                a)) {
                    var c = a[l];
                    if (c.recurringDef) {
                        var f = c.recurringDef.duration;
                        f ||
                            (f = c.allDay
                                ? o.defaultAllDayEventDuration
                                : o.defaultTimedEventDuration);
                        for (
                            var p = 0, v = Qs(c, f, e, r, i.recurringTypes);
                            p < v.length;
                            p++
                        ) {
                            var g = v[p],
                                b = Ot(l, { start: g, end: r.add(g, f) });
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
                return t.allDay && (a = a.map(V)), a;
            }
            var Si = ['years', 'months', 'days', 'milliseconds'],
                Ws = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
            function U(t, e) {
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
                    ? Ci(t)
                    : 'number' == typeof t
                    ? Ci((((n = {})[e || 'milliseconds'] = t), n))
                    : null;
            }
            function Ci(t) {
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
            function Rn(t, e) {
                return {
                    years: t.years + e.years,
                    months: t.months + e.months,
                    days: t.days + e.days,
                    milliseconds: t.milliseconds + e.milliseconds,
                };
            }
            function Ke(t) {
                return fe(t) / 864e5;
            }
            function fe(t) {
                return (
                    31536e6 * t.years +
                    2592e6 * t.months +
                    864e5 * t.days +
                    t.milliseconds
                );
            }
            function _n(t, e) {
                for (var n = null, r = 0; r < Si.length; r += 1) {
                    var i = Si[r];
                    if (e[i]) {
                        var o = t[i] / e[i];
                        if (!Pt(o) || (null !== n && n !== o)) return null;
                        n = o;
                    } else if (t[i]) return null;
                }
                return n;
            }
            function kn(t) {
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
            function xi(t, e, n) {
                void 0 === n && (n = !1);
                var r = t.toISOString();
                return (
                    (r = r.replace('.000', '')),
                    n && (r = r.replace('T00:00:00Z', '')),
                    r.length > 10 &&
                        (null == e
                            ? (r = r.replace('Z', ''))
                            : 0 !== e && (r = r.replace('Z', Mn(e, !0)))),
                    r
                );
            }
            function Ti(t) {
                return t.toISOString().replace(/T.*$/, '');
            }
            function Js(t) {
                return (
                    Je(t.getUTCHours(), 2) +
                    ':' +
                    Je(t.getUTCMinutes(), 2) +
                    ':' +
                    Je(t.getUTCSeconds(), 2)
                );
            }
            function Mn(t, e) {
                void 0 === e && (e = !1);
                var n = t < 0 ? '-' : '+',
                    r = Math.abs(t),
                    i = Math.floor(r / 60),
                    o = Math.round(r % 60);
                return e
                    ? n + Je(i, 2) + ':' + Je(o, 2)
                    : 'GMT' + n + i + (o ? ':' + Je(o, 2) : '');
            }
            function Ie(t, e, n) {
                if (t === e) return !0;
                var i,
                    r = t.length;
                if (r !== e.length) return !1;
                for (i = 0; i < r; i += 1)
                    if (!(n ? n(t[i], e[i]) : t[i] === e[i])) return !1;
                return !0;
            }
            function I(t, e, n) {
                var r, i;
                return function () {
                    for (var o = [], a = 0; a < arguments.length; a++)
                        o[a] = arguments[a];
                    if (r) {
                        if (!Ie(r, o)) {
                            n && n(i);
                            var s = t.apply(this, o);
                            (!e || !e(s, i)) && (i = s);
                        }
                    } else i = t.apply(this, o);
                    return (r = o), i;
                };
            }
            function zt(t, e, n) {
                var i,
                    o,
                    r = this;
                return function (a) {
                    if (i) {
                        if (!we(i, a)) {
                            n && n(o);
                            var s = t.call(r, a);
                            (!e || !e(s, o)) && (o = s);
                        }
                    } else o = t.call(r, a);
                    return (i = a), o;
                };
            }
            var Ri = {
                    week: 3,
                    separator: 0,
                    omitZeroMinute: 0,
                    meridiem: 0,
                    omitCommas: 0,
                },
                Ft = {
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
                Ut = /\s*([ap])\.?m\.?/i,
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
                            o in Ri
                                ? ((r[o] = e[o]), (i = Math.max(Ri[o], i)))
                                : ((n[o] = e[o]),
                                  o in Ft && (i = Math.max(Ft[o], i)));
                        (this.standardDateProps = n),
                            (this.extendedSettings = r),
                            (this.severity = i),
                            (this.buildFormattingFunc = I(_i));
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
                                        : Me(t) !== Me(e)
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
                            var f = this.format(e, r),
                                d = this.format(n, r);
                            if (f === d) return f;
                            var p = (function ll(t, e) {
                                    var n = {};
                                    for (var r in t)
                                        (!(r in Ft) || Ft[r] <= e) &&
                                            (n[r] = t[r]);
                                    return n;
                                })(a, c),
                                v = _i(p, s, r),
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
                                            var f = n.substr(0, c),
                                                d = n.substr(
                                                    (l = c + r.length)
                                                );
                                            if (a === f && s === d)
                                                return { before: a, after: s };
                                        }
                                    }
                                    return null;
                                })(f, g, d, b),
                                m =
                                    s.separator ||
                                    i ||
                                    r.defaultSeparator ||
                                    '';
                            return E
                                ? E.before + g + m + b + E.after
                                : f + m + d;
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
            function _i(t, e, n) {
                var r = Object.keys(t).length;
                return 1 === r && 'short' === t.timeZoneName
                    ? function (i) {
                          return Mn(i.timeZoneOffset);
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
                                                  : Mn(e.timeZoneOffset)
                                          )),
                                      r.omitCommas &&
                                          (t = t.replace(Xs, '').trim()),
                                      r.omitZeroMinute &&
                                          (t = t.replace(':00', '')),
                                      !1 === r.meridiem
                                          ? (t = t.replace(Ut, '').trim())
                                          : 'narrow' === r.meridiem
                                          ? (t = t.replace(Ut, function (o, a) {
                                                return a.toLocaleLowerCase();
                                            }))
                                          : 'short' === r.meridiem
                                          ? (t = t.replace(Ut, function (o, a) {
                                                return (
                                                    a.toLocaleLowerCase() + 'm'
                                                );
                                            }))
                                          : 'lowercase' === r.meridiem &&
                                            (t = t.replace(Ut, function (o) {
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
            function ki(t, e) {
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
            function Lt(t, e, n, r) {
                var i = ki(t, n.calendarSystem);
                return {
                    date: i,
                    start: i,
                    end: e ? ki(e, n.calendarSystem) : null,
                    timeZone: n.timeZone,
                    localeCodes: n.locale.codes,
                    defaultSeparator: r || n.defaultSeparator,
                };
            }
            var fl = (function () {
                    function t(e) {
                        this.cmdStr = e;
                    }
                    return (
                        (t.prototype.format = function (e, n, r) {
                            return n.cmdFormatter(
                                this.cmdStr,
                                Lt(e, null, n, r)
                            );
                        }),
                        (t.prototype.formatRange = function (e, n, r, i) {
                            return r.cmdFormatter(this.cmdStr, Lt(e, n, r, i));
                        }),
                        t
                    );
                })(),
                dl = (function () {
                    function t(e) {
                        this.func = e;
                    }
                    return (
                        (t.prototype.format = function (e, n, r) {
                            return this.func(Lt(e, null, n, r));
                        }),
                        (t.prototype.formatRange = function (e, n, r, i) {
                            return this.func(Lt(e, n, r, i));
                        }),
                        t
                    );
                })();
            function Z(t) {
                return 'object' == typeof t && t
                    ? new tl(t)
                    : 'string' == typeof t
                    ? new fl(t)
                    : 'function' == typeof t
                    ? new dl(t)
                    : null;
            }
            var Mi = {
                    navLinkDayClick: A,
                    navLinkWeekClick: A,
                    duration: U,
                    bootstrapFontAwesome: A,
                    buttonIcons: A,
                    customButtons: A,
                    defaultAllDayEventDuration: U,
                    defaultTimedEventDuration: U,
                    nextDayThreshold: U,
                    scrollTime: U,
                    scrollTimeReset: Boolean,
                    slotMinTime: U,
                    slotMaxTime: U,
                    dayPopoverFormat: Z,
                    slotDuration: U,
                    snapDuration: U,
                    headerToolbar: A,
                    footerToolbar: A,
                    defaultRangeSeparator: String,
                    titleRangeSeparator: String,
                    forceEventDuration: Boolean,
                    dayHeaders: Boolean,
                    dayHeaderFormat: Z,
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
                    weekNumberFormat: Z,
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
                    slotLabelInterval: U,
                    allDayText: String,
                    allDayClassNames: A,
                    allDayContent: A,
                    allDayDidMount: A,
                    allDayWillUnmount: A,
                    slotMinWidth: Number,
                    navLinks: Boolean,
                    eventTimeFormat: Z,
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
                    dateIncrement: U,
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
                De = {
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
                Ii = {
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
                Ni = {
                    buttonText: A,
                    buttonHints: A,
                    views: A,
                    plugins: A,
                    initialEvents: A,
                    events: A,
                    eventSources: A,
                },
                In = {
                    headerToolbar: mt,
                    footerToolbar: mt,
                    buttonText: mt,
                    buttonHints: mt,
                    buttonIcons: mt,
                };
            function mt(t, e) {
                return 'object' == typeof t && 'object' == typeof e && t && e
                    ? we(t, e)
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
            function Nn(t) {
                return xn(t, In);
            }
            function Qt(t, e) {
                var n = {},
                    r = {};
                for (var i in e) i in t && (n[i] = e[i](t[i]));
                for (var i in t) i in e || (r[i] = t[i]);
                return { refined: n, extra: r };
            }
            function A(t) {
                return t;
            }
            function Wt(t, e, n, r) {
                for (
                    var i = { defs: {}, instances: {} },
                        o = zn(n),
                        a = 0,
                        s = t;
                    a < s.length;
                    a++
                ) {
                    var c = Oi(s[a], e, n, r, o);
                    c && yt(c, i);
                }
                return i;
            }
            function yt(t, e) {
                return (
                    void 0 === e && (e = { defs: {}, instances: {} }),
                    (e.defs[t.def.defId] = t.def),
                    t.instance &&
                        (e.instances[t.instance.instanceId] = t.instance),
                    e
                );
            }
            function Pn(t, e) {
                var n = t.instances[e];
                if (n) {
                    var r = t.defs[n.defId],
                        i = Vt(t, function (o) {
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
            function Bn(t, e) {
                return {
                    defs: (0, u.pi)((0, u.pi)({}, t.defs), e.defs),
                    instances: (0, u.pi)(
                        (0, u.pi)({}, t.instances),
                        e.instances
                    ),
                };
            }
            function Vt(t, e) {
                var n = Ue(t.defs, e),
                    r = Ue(t.instances, function (i) {
                        return n[i.defId];
                    });
                return { defs: n, instances: r };
            }
            function On(t) {
                return Array.isArray(t)
                    ? t
                    : 'string' == typeof t
                    ? t.split(/\s+/)
                    : [];
            }
            var Gt = {
                    display: String,
                    editable: Boolean,
                    startEditable: Boolean,
                    durationEditable: Boolean,
                    constraint: A,
                    overlap: A,
                    allow: A,
                    className: On,
                    classNames: On,
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
            function Zt(t, e) {
                var n = (function hl(t, e) {
                    return Array.isArray(t)
                        ? Wt(t, null, e, !0)
                        : 'object' == typeof t && t
                        ? Wt([t], null, e, !0)
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
            function Pi(t) {
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
            var jt = {
                    id: String,
                    groupId: String,
                    title: String,
                    url: String,
                    interactive: Boolean,
                },
                Bi = { start: A, end: A, date: A, allDay: Boolean },
                yl = (0, u.pi)((0, u.pi)((0, u.pi)({}, jt), Bi), {
                    extendedProps: A,
                });
            function Oi(t, e, n, r, i) {
                void 0 === i && (i = zn(n));
                var o = Hn(t, n, i),
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
                        ((f = Yt(
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
                        { def: f, instance: null }
                    );
                var f,
                    d = (function bl(t, e, n, r) {
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
                            i && a && (a = V(a)),
                            l &&
                                ((c = l.marker),
                                i && (c = V(c)),
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
                return d
                    ? {
                          def: (f = Yt(
                              a,
                              s,
                              e ? e.sourceId : '',
                              d.allDay,
                              d.hasEnd,
                              n
                          )),
                          instance: Ot(
                              f.defId,
                              d.range,
                              d.forcedStartTzo,
                              d.forcedEndTzo
                          ),
                      }
                    : null;
            }
            function Hn(t, e, n) {
                return void 0 === n && (n = zn(e)), Qt(t, n);
            }
            function zn(t) {
                return (0, u.pi)(
                    (0, u.pi)((0, u.pi)({}, Gt), yl),
                    t.pluginHooks.eventRefiners
                );
            }
            function Yt(t, e, n, r, i, o) {
                for (
                    var a = {
                            title: t.title || '',
                            groupId: t.groupId || '',
                            publicId: t.id || '',
                            url: t.url || '',
                            recurringDef: null,
                            defId: qe(),
                            sourceId: n,
                            allDay: r,
                            hasEnd: i,
                            interactive: t.interactive,
                            ui: Zt(t, o),
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
            function Hi(t) {
                var e = Math.floor(_e(t.start, t.end)) || 1,
                    n = V(t.start);
                return { start: n, end: ie(n, e) };
            }
            function Fn(t, e) {
                void 0 === e && (e = U(0));
                var n = null,
                    r = null;
                if (t.end) {
                    r = V(t.end);
                    var i = t.end.valueOf() - r.valueOf();
                    i && i >= fe(e) && (r = ie(r, 1));
                }
                return (
                    t.start &&
                        ((n = V(t.start)), r && r <= n && (r = ie(n, 1))),
                    { start: n, end: r }
                );
            }
            function $e(t, e, n, r) {
                return 'year' === r
                    ? U(n.diffWholeYears(t, e), 'year')
                    : 'month' === r
                    ? U(n.diffWholeMonths(t, e), 'month')
                    : (function Is(t, e) {
                          var n = V(t),
                              r = V(e);
                          return {
                              years: 0,
                              months: 0,
                              days: Math.round(_e(n, r)),
                              milliseconds:
                                  e.valueOf() -
                                  r.valueOf() -
                                  (t.valueOf() - n.valueOf()),
                          };
                      })(t, e);
            }
            function zi(t, e) {
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
            function et(t, e) {
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
            function Un(t, e) {
                return (
                    (null === t.end || null === e.start || t.end > e.start) &&
                    (null === t.start || null === e.end || t.start < e.end)
                );
            }
            function qt(t, e) {
                return (
                    (null === t.start ||
                        (null !== e.start && e.start >= t.start)) &&
                    (null === t.end || (null !== e.end && e.end <= t.end))
                );
            }
            function Ne(t, e) {
                return (
                    (null === t.start || e >= t.start) &&
                    (null === t.end || e < t.end)
                );
            }
            function Ln(t, e, n, r) {
                var i = {},
                    o = {},
                    a = {},
                    s = [],
                    l = [],
                    c = Jt(t.defs, e);
                for (var f in t.defs)
                    'inverse-background' ===
                        (p = c[(d = t.defs[f]).defId]).display &&
                        (d.groupId
                            ? ((i[d.groupId] = []),
                              a[d.groupId] || (a[d.groupId] = d))
                            : (o[f] = []));
                for (var v in t.instances) {
                    var g = t.instances[v],
                        p = c[(d = t.defs[g.defId]).defId],
                        b = g.range,
                        E = !d.allDay && r ? Fn(b, r) : b,
                        m = et(E, n);
                    m &&
                        ('inverse-background' === p.display
                            ? d.groupId
                                ? i[d.groupId].push(m)
                                : o[g.defId].push(m)
                            : 'none' !== p.display &&
                              ('background' === p.display ? s : l).push({
                                  def: d,
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
                    for (var F = 0, z = zi(i[w], n); F < z.length; F++) {
                        var d;
                        s.push({
                            def: (d = a[w]),
                            ui: (p = c[d.defId]),
                            instance: null,
                            range: z[F],
                            isStart: !1,
                            isEnd: !1,
                        });
                    }
                for (var f in o)
                    for (var P = 0, Y = zi(o[f], n); P < Y.length; P++)
                        s.push({
                            def: t.defs[f],
                            ui: c[f],
                            instance: null,
                            range: Y[P],
                            isStart: !1,
                            isEnd: !1,
                        });
                return { bg: s, fg: l };
            }
            function Fi(t, e) {
                t.fcSeg = e;
            }
            function tt(t) {
                return t.fcSeg || t.parentNode.fcSeg || null;
            }
            function Jt(t, e) {
                return Ee(t, function (n) {
                    return Ui(n, e);
                });
            }
            function Ui(t, e) {
                var n = [];
                return (
                    e[''] && n.push(e['']),
                    e[t.defId] && n.push(e[t.defId]),
                    n.push(t.ui),
                    Pi(n)
                );
            }
            function Li(t, e) {
                var n = t.map(xl);
                return (
                    n.sort(function (r, i) {
                        return (function Ds(t, e, n) {
                            var r, i;
                            for (r = 0; r < n.length; r += 1)
                                if ((i = Ss(t, e, n[r]))) return i;
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
            function _l(t, e) {
                return t.isEnd && t.eventRange.ui.durationEditable;
            }
            function Qi(t, e, n, r, i, o, a) {
                var s = n.dateEnv,
                    l = n.options,
                    c = l.displayEventTime,
                    f = l.displayEventEnd,
                    d = t.eventRange.def,
                    p = t.eventRange.instance;
                null == c && (c = !1 !== r), null == f && (f = !1 !== i);
                var v = p.range.start,
                    g = p.range.end,
                    b = o || t.start || t.eventRange.range.start,
                    E = a || t.end || t.eventRange.range.end,
                    m = V(v).valueOf() === V(b).valueOf(),
                    w = V(Fe(g, -1)).valueOf() === V(Fe(E, -1)).valueOf();
                return c && !d.allDay && (m || w)
                    ? ((b = m ? v : b),
                      (E = w ? g : E),
                      f && d.hasEnd
                          ? s.formatRange(b, E, e, {
                                forcedStartTzo: o ? null : p.forcedStartTzo,
                                forcedEndTzo: a ? null : p.forcedEndTzo,
                            })
                          : s.format(b, e, {
                                forcedTzo: o ? null : p.forcedStartTzo,
                            }))
                    : '';
            }
            function Pe(t, e, n) {
                var r = t.eventRange.range;
                return {
                    isPast: r.end < (n || e.start),
                    isFuture: r.start >= (n || e.end),
                    isToday: e && Ne(e, r.start),
                };
            }
            function Wi(t) {
                return t.instance
                    ? t.instance.instanceId
                    : t.def.defId + ':' + t.range.start.toISOString();
            }
            function Vi(t, e) {
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
                        ? vi(function (c) {
                              a.trigger('eventClick', {
                                  el: c.target,
                                  event: new j(e, r, i),
                                  jsEvent: c,
                                  view: e.viewApi,
                              });
                          })
                        : {}
                );
            }
            var Ml = { start: A, end: A, allDay: Boolean };
            function Gi(t, e, n) {
                return (0, u.pi)((0, u.pi)({}, Zi(t, e, n)), {
                    timeZone: e.timeZone,
                });
            }
            function Zi(t, e, n) {
                return {
                    start: e.toDate(t.start),
                    end: e.toDate(t.end),
                    startStr: e.formatIso(t.start, { omitTime: n }),
                    endStr: e.formatIso(t.end, { omitTime: n }),
                };
            }
            function Hl(t, e, n) {
                var r = Hn({ editable: !1 }, n),
                    i = Yt(r.refined, r.extra, '', t.allDay, !0, n);
                return {
                    def: i,
                    ui: Ui(i, e),
                    instance: Ot(i.defId, t.range),
                    range: t.range,
                    isStart: !0,
                    isEnd: !0,
                };
            }
            function ji(t, e, n) {
                n.emitter.trigger(
                    'select',
                    (0, u.pi)((0, u.pi)({}, Qn(t, n)), {
                        jsEvent: e ? e.origEvent : null,
                        view: n.viewApi || n.calendarApi.view,
                    })
                );
            }
            function Qn(t, e) {
                for (
                    var n = {}, r = 0, i = e.pluginHooks.dateSpanTransforms;
                    r < i.length;
                    r++
                )
                    (0, u.pi)(n, (0, i[r])(t, e));
                return (
                    (0, u.pi)(
                        n,
                        (function Ol(t, e) {
                            return (0, u.pi)(
                                (0, u.pi)({}, Zi(t.range, e, t.allDay)),
                                { allDay: t.allDay }
                            );
                        })(t, e.dateEnv)
                    ),
                    n
                );
            }
            function Wn(t, e, n) {
                var r = n.dateEnv,
                    i = n.options,
                    o = e;
                return (
                    t
                        ? ((o = V(o)),
                          (o = r.add(o, i.defaultAllDayEventDuration)))
                        : (o = r.add(o, i.defaultTimedEventDuration)),
                    o
                );
            }
            function Vn(t, e, n, r) {
                var i = Jt(t.defs, e),
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
                    a && (l.range = Hi(l.range)),
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
                            end: Wn(e.allDay, l.range.start, i),
                        }),
                    e.allDay &&
                        (l.range = {
                            start: V(l.range.start),
                            end: V(l.range.end),
                        }),
                    l.range.end < l.range.start &&
                        (l.range.end = Wn(e.allDay, l.range.start, i)),
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
            function Yi(t, e, n) {
                var r;
                if (
                    (void 0 === n && (n = qi(e)),
                    'string' == typeof t
                        ? (r = { url: t })
                        : 'function' == typeof t || Array.isArray(t)
                        ? (r = { events: t })
                        : 'object' == typeof t && t && (r = t),
                    r)
                ) {
                    var i = Qt(r, n),
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
                            sourceId: qe(),
                            sourceDefId: s.sourceDefId,
                            meta: s.meta,
                            ui: Zt(o, e),
                            extendedProps: a,
                        };
                }
                return null;
            }
            function qi(t) {
                return (0, u.pi)(
                    (0, u.pi)((0, u.pi)({}, Gt), Ql),
                    t.pluginHooks.eventSourceRefiners
                );
            }
            function bt(t, e) {
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
                                    dateMarker: bt(
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
                                r = U(e);
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
                            return r.format(r.createMarker(e), Z(n));
                        }),
                        (t.prototype.formatRange = function (e, n, r) {
                            var i = this.getCurrentData().dateEnv;
                            return i.formatRange(
                                i.createMarker(e),
                                i.createMarker(n),
                                Z(r),
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
                                            var n = Qt(t, Ml),
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
                                })(r, i.dateEnv, U({ days: 1 }));
                            o &&
                                (this.dispatch({
                                    type: 'SELECT_DATES',
                                    selection: o,
                                }),
                                ji(o, null, i));
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
                            if (e instanceof j) {
                                var r = e._def,
                                    i = e._instance;
                                return (
                                    this.getCurrentData().eventStore.defs[
                                        r.defId
                                    ] ||
                                        (this.dispatch({
                                            type: 'ADD_EVENTS',
                                            eventStore: yt({
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
                            if (n instanceof Ye) s = n.internalEventSource;
                            else if ('boolean' == typeof n)
                                n && (s = Tn(a.eventSources)[0]);
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
                            var c = Oi(e, s, a, !1);
                            if (c) {
                                var f = new j(
                                    a,
                                    c.def,
                                    c.def.recurringDef ? null : c.instance
                                );
                                return (
                                    this.dispatch({
                                        type: 'ADD_EVENTS',
                                        eventStore: yt(c),
                                    }),
                                    this.triggerEventAdd(f),
                                    f
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
                                        eventStore: Ji(e),
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
                                        return new j(n, s, null);
                                    for (var l in o) {
                                        var c = o[l];
                                        if (c.defId === s.defId)
                                            return new j(n, s, c);
                                    }
                                }
                            }
                            return null;
                        }),
                        (t.prototype.getEvents = function () {
                            var e = this.getCurrentData();
                            return Le(e.eventStore, e);
                        }),
                        (t.prototype.removeAllEvents = function () {
                            this.dispatch({ type: 'REMOVE_ALL_EVENTS' });
                        }),
                        (t.prototype.getEventSources = function () {
                            var e = this.getCurrentData(),
                                n = e.eventSources,
                                r = [];
                            for (var i in n) r.push(new Ye(e, n[i]));
                            return r;
                        }),
                        (t.prototype.getEventSourceById = function (e) {
                            var n = this.getCurrentData(),
                                r = n.eventSources;
                            for (var i in ((e = String(e)), r))
                                if (r[i].publicId === e) return new Ye(n, r[i]);
                            return null;
                        }),
                        (t.prototype.addEventSource = function (e) {
                            var n = this.getCurrentData();
                            if (e instanceof Ye)
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
                            var r = Yi(e, n);
                            return r
                                ? (this.dispatch({
                                      type: 'ADD_EVENT_SOURCES',
                                      sources: [r],
                                  }),
                                  new Ye(n, r))
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
                            var n = U(e);
                            n && this.trigger('_scrollRequest', { time: n });
                        }),
                        t
                    );
                })(),
                j = (function () {
                    function t(e, n, r) {
                        (this._context = e),
                            (this._def = n),
                            (this._instance = r || null);
                    }
                    return (
                        (t.prototype.setProp = function (e, n) {
                            var r, i;
                            if (e in Bi)
                                console.warn(
                                    "Could not set date-related prop 'name'. Use one of the date-related methods instead."
                                );
                            else if ('id' === e)
                                (n = jt[e](n)),
                                    this.mutate({
                                        standardProps: { publicId: n },
                                    });
                            else if (e in jt)
                                (n = jt[e](n)),
                                    this.mutate({
                                        standardProps:
                                            ((r = {}), (r[e] = n), r),
                                    });
                            else if (e in Gt) {
                                var o = Gt[e](n);
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
                                var a = $e(
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
                                    var o = $e(
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
                                !0 === r.allDay && (l = Hi(l));
                                var c = $e(l.start, a, i, r.granularity);
                                if (s) {
                                    var f = $e(l.end, s, i, r.granularity);
                                    !(function Gs(t, e) {
                                        return (
                                            t.years === e.years &&
                                            t.months === e.months &&
                                            t.days === e.days &&
                                            t.milliseconds === e.milliseconds
                                        );
                                    })(c, f)
                                        ? this.mutate({
                                              startDelta: c,
                                              endDelta: f,
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
                            var n = U(e);
                            n && this.mutate({ startDelta: n });
                        }),
                        (t.prototype.moveEnd = function (e) {
                            var n = U(e);
                            n && this.mutate({ endDelta: n });
                        }),
                        (t.prototype.moveDates = function (e) {
                            var n = U(e);
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
                                i = Z(e);
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
                                    a = Pn(o, n.instanceId);
                                a = Vn(
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
                                        relatedEvents: Le(a, i, n),
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
                                n = Ji(this);
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
                                    ? new Ye(
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
            function Ji(t) {
                var e,
                    n,
                    r = t._def,
                    i = t._instance;
                return {
                    defs: ((e = {}), (e[r.defId] = r), e),
                    instances: i ? ((n = {}), (n[i.instanceId] = i), n) : {},
                };
            }
            function Le(t, e, n) {
                var r = t.defs,
                    i = t.instances,
                    o = [],
                    a = n ? n.instanceId : '';
                for (var s in i) {
                    var l = i[s];
                    l.instanceId !== a && o.push(new j(e, r[l.defId], l));
                }
                return o;
            }
            var Xi = {};
            !(function jl(t, e) {
                Xi[t] = e;
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
                            return se(e);
                        }),
                        (t.prototype.markerToArray = function (e) {
                            return ke(e);
                        }),
                        t
                    );
                })()
            );
            var Jl =
                    /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/,
                Ki = (function () {
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
                                return new Xi[t]();
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
                                : se(yi(new Date()));
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
                                    : Array.isArray(e) && (n = se(e)),
                                null !== n && Ai(n)
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
                                    if (Ai(n)) {
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
                            return Me(e) === Me(n) &&
                                r.getMarkerDay(e) === r.getMarkerDay(n) &&
                                r.getMarkerMonth(e) === r.getMarkerMonth(n)
                                ? r.getMarkerYear(n) - r.getMarkerYear(e)
                                : null;
                        }),
                        (t.prototype.diffWholeMonths = function (e, n) {
                            var r = this.calendarSystem;
                            return Me(e) === Me(n) &&
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
                                      var n = Bt(t, e);
                                      return null !== n && n % 7 == 0
                                          ? n / 7
                                          : null;
                                  })(e, n)),
                                  null !== r
                                      ? { unit: 'week', value: r }
                                      : null !== (r = Bt(e, n))
                                      ? { unit: 'day', value: r }
                                      : ((r = (function _s(t, e) {
                                            return (
                                                (e.valueOf() - t.valueOf()) /
                                                36e5
                                            );
                                        })(e, n)),
                                        Pt(r)
                                            ? { unit: 'hour', value: r }
                                            : ((r = (function ks(t, e) {
                                                  return (
                                                      (e.valueOf() -
                                                          t.valueOf()) /
                                                      6e4
                                                  );
                                              })(e, n)),
                                              Pt(r)
                                                  ? { unit: 'minute', value: r }
                                                  : ((r = (function Ms(t, e) {
                                                        return (
                                                            (e.valueOf() -
                                                                t.valueOf()) /
                                                            1e3
                                                        );
                                                    })(e, n)),
                                                    Pt(r)
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
                                          return Ke(t) / 365;
                                      })(r)
                                : r.months &&
                                  null !== (i = this.diffWholeMonths(e, n))
                                ? i /
                                  (function qs(t) {
                                      return Ke(t) / 30;
                                  })(r)
                                : r.days && null !== (i = Bt(e, n))
                                ? i / Ke(r)
                                : (n.valueOf() - e.valueOf()) / fe(r);
                        }),
                        (t.prototype.startOf = function (e, n) {
                            return 'year' === n
                                ? this.startOfYear(e)
                                : 'month' === n
                                ? this.startOfMonth(e)
                                : 'week' === n
                                ? this.startOfWeek(e)
                                : 'day' === n
                                ? V(e)
                                : 'hour' === n
                                ? (function Ps(t) {
                                      return se([
                                          t.getUTCFullYear(),
                                          t.getUTCMonth(),
                                          t.getUTCDate(),
                                          t.getUTCHours(),
                                      ]);
                                  })(e)
                                : 'minute' === n
                                ? (function Bs(t) {
                                      return se([
                                          t.getUTCFullYear(),
                                          t.getUTCMonth(),
                                          t.getUTCDate(),
                                          t.getUTCHours(),
                                          t.getUTCMinutes(),
                                      ]);
                                  })(e)
                                : 'second' === n
                                ? (function Os(t) {
                                      return se([
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
                                : (function Hs(t, e, n) {
                                      var r = t.getUTCFullYear(),
                                          i = Cn(t, r, e, n);
                                      if (i < 1) return Cn(t, r - 1, e, n);
                                      var o = Cn(t, r + 1, e, n);
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
                                i.isEndExclusive && (n = Fe(n, -1)),
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
                                xi(e, r, n.omitTime)
                            );
                        }),
                        (t.prototype.timestampToMarker = function (e) {
                            return 'local' === this.timeZone
                                ? se(yi(new Date(e)))
                                : 'UTC' !== this.timeZone &&
                                  this.namedTimeZoneImpl
                                ? se(this.namedTimeZoneImpl.timestampToArray(e))
                                : new Date(e);
                        }),
                        (t.prototype.offsetForMarker = function (e) {
                            return 'local' === this.timeZone
                                ? -bi(ke(e)).getTimezoneOffset()
                                : 'UTC' === this.timeZone
                                ? 0
                                : this.namedTimeZoneImpl
                                ? this.namedTimeZoneImpl.offsetForArray(ke(e))
                                : null;
                        }),
                        (t.prototype.toDate = function (e, n) {
                            return 'local' === this.timeZone
                                ? bi(ke(e))
                                : 'UTC' === this.timeZone
                                ? new Date(e.valueOf())
                                : this.namedTimeZoneImpl
                                ? new Date(
                                      e.valueOf() -
                                          1e3 *
                                              this.namedTimeZoneImpl.offsetForArray(
                                                  ke(e)
                                              ) *
                                              60
                                  )
                                : new Date(e.valueOf() - (n || 0));
                        }),
                        t
                    );
                })(),
                Kl = [],
                $i = {
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
                eo = (0, u.pi)((0, u.pi)({}, $i), {
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
            function to(t) {
                for (
                    var e = t.length > 0 ? t[0].code : 'en',
                        n = Kl.concat(t),
                        r = { en: eo },
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
            function Gn(t, e) {
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
                                  })(n, e) || eo;
                          return no(t, n, r);
                      })(t, e)
                    : no(t.code, [t.code], t);
            }
            function no(t, e, n) {
                var r = xn([$i, n], ['buttonText']);
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
            var Zn,
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
            function io(t, e) {
                var n = {
                    left: Math.max(t.left, e.left),
                    right: Math.min(t.right, e.right),
                    top: Math.max(t.top, e.top),
                    bottom: Math.min(t.bottom, e.bottom),
                };
                return n.left < n.right && n.top < n.bottom && n;
            }
            function oo() {
                return (
                    null == Zn &&
                        (Zn = (function lc() {
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
                    Zn
                );
            }
            var jn = { defs: {}, instances: {} },
                cc = (function () {
                    function t() {
                        (this.getKeysForEventDefs = I(
                            this._getKeysForEventDefs
                        )),
                            (this.splitDateSelection = I(this._splitDateSpan)),
                            (this.splitEventStore = I(this._splitEventStore)),
                            (this.splitIndividualUi = I(
                                this._splitIndividualUi
                            )),
                            (this.splitEventDrag = I(this._splitInteraction)),
                            (this.splitEventResize = I(this._splitInteraction)),
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
                                f = {};
                            for (var d in ((this.eventUiBuilders = Ee(
                                r,
                                function (b, E) {
                                    return n.eventUiBuilders[E] || I(fc);
                                }
                            )),
                            r)) {
                                var p = r[d],
                                    v = s[d] || jn;
                                f[d] = {
                                    businessHours:
                                        p.businessHours || e.businessHours,
                                    dateSelection: o[d] || null,
                                    eventStore: v,
                                    eventUiBases: (0, this.eventUiBuilders[d])(
                                        e.eventUiBases[''],
                                        p.ui,
                                        a[d]
                                    ),
                                    eventSelection: v.instances[
                                        e.eventSelection
                                    ]
                                        ? e.eventSelection
                                        : '',
                                    eventDrag: l[d] || null,
                                    eventResize: c[d] || null,
                                };
                            }
                            return f;
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
                            return Ee(e.defs, function (r) {
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
                            for (var f in i)
                                for (
                                    var d = i[f], p = 0, v = n[d.defId];
                                    p < v.length;
                                    p++
                                ) {
                                    var c;
                                    o[(c = v[p])] && (o[c].instances[f] = d);
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
                                                affectedEvents: r[l] || jn,
                                                mutatedEvents: o[l] || jn,
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
            function fc(t, e, n) {
                var r = [];
                t && r.push(t), e && r.push(e);
                var i = { '': Pi(r) };
                return n && (0, u.pi)(i, n), i;
            }
            function ao(t, e, n, r) {
                return {
                    dow: t.getUTCDay(),
                    isDisabled: Boolean(r && !Ne(r.activeRange, t)),
                    isOther: Boolean(r && !Ne(r.currentRange, t)),
                    isToday: Boolean(e && Ne(e, t)),
                    isPast: Boolean(n ? t < n : !!e && t < e.start),
                    isFuture: Boolean(n ? t > n : !!e && t >= e.end),
                };
            }
            function Yn(t, e) {
                var n = ['fc-day', 'fc-day-' + gi[t.dow]];
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
            var dc = Z({ year: 'numeric', month: 'long', day: 'numeric' }),
                uc = Z({ week: 'long' });
            function Xt(t, e, n, r) {
                void 0 === n && (n = 'day'), void 0 === r && (r = !0);
                var i = t.dateEnv,
                    o = t.options,
                    a = t.calendarApi,
                    s = i.format(e, 'week' === n ? uc : dc);
                if (o.navLinks) {
                    var l = i.toDate(e),
                        c = function (f) {
                            var d =
                                'day' === n
                                    ? o.navLinkDayClick
                                    : 'week' === n
                                    ? o.navLinkWeekClick
                                    : null;
                            'function' == typeof d
                                ? d.call(a, i.toDate(e), f)
                                : ('string' == typeof d && (n = d),
                                  a.zoomTo(e, n));
                        };
                    return (0, u.pi)(
                        {
                            title: gt(o.navLinkHint, [s, l], s),
                            'data-navlink': '',
                        },
                        r ? pi(c) : { onClick: c }
                    );
                }
                return { 'aria-label': s };
            }
            var Jn,
                qn = null;
            function so(t) {
                return {
                    x: t.offsetHeight - t.clientHeight,
                    y: t.offsetWidth - t.clientWidth,
                };
            }
            function yc(t, e, n) {
                void 0 === e && (e = !1);
                var r = n ? t.getBoundingClientRect() : Xn(t),
                    i = (function mc(t, e) {
                        void 0 === e && (e = !1);
                        var n = window.getComputedStyle(t),
                            r = parseInt(n.borderLeftWidth, 10) || 0,
                            i = parseInt(n.borderRightWidth, 10) || 0,
                            o = parseInt(n.borderTopWidth, 10) || 0,
                            a = parseInt(n.borderBottomWidth, 10) || 0,
                            s = so(t),
                            l = s.y - r - i,
                            f = {
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
                                    null === qn &&
                                        (qn = (function vc() {
                                            var t =
                                                document.createElement('div');
                                            ht(t, {
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
                                            return Dn(t), n;
                                        })()),
                                    qn
                                );
                            })() && 'rtl' === n.direction
                                ? (f.scrollbarLeft = l)
                                : (f.scrollbarRight = l),
                            e &&
                                ((f.paddingLeft =
                                    parseInt(n.paddingLeft, 10) || 0),
                                (f.paddingRight =
                                    parseInt(n.paddingRight, 10) || 0),
                                (f.paddingTop =
                                    parseInt(n.paddingTop, 10) || 0),
                                (f.paddingBottom =
                                    parseInt(n.paddingBottom, 10) || 0)),
                            f
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
            function Xn(t) {
                var e = t.getBoundingClientRect();
                return {
                    left: e.left + window.pageXOffset,
                    top: e.top + window.pageYOffset,
                    right: e.right + window.pageXOffset,
                    bottom: e.bottom + window.pageYOffset,
                };
            }
            function lo(t) {
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
            var Kt = (function () {
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
                At = (function () {
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
                Kn = (function () {
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
                Sc = (function (t) {
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
                })(Kn),
                Cc = (function (t) {
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
                })(Kn),
                Et = (function () {
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
            (Et.prototype.classes = {}),
                (Et.prototype.iconClasses = {}),
                (Et.prototype.baseIconClass = ''),
                (Et.prototype.iconOverridePrefix = '');
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
                Se = oi({});
            function Tc(t, e, n, r, i, o, a, s, l, c, f, d, p) {
                return {
                    dateEnv: i,
                    options: n,
                    pluginHooks: a,
                    emitter: c,
                    dispatch: s,
                    getCurrentData: l,
                    calendarApi: f,
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
                        return new xc(v, c, U(n.scrollTime), n.scrollTimeReset);
                    },
                    registerInteractiveComponent: d,
                    unregisterInteractiveComponent: p,
                };
            }
            var $t = (function (t) {
                function e() {
                    return (null !== t && t.apply(this, arguments)) || this;
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.shouldComponentUpdate = function (n, r) {
                        return (
                            this.debug &&
                                console.log(
                                    wi(n, this.props),
                                    wi(r, this.state)
                                ),
                            !Di(this.props, n, this.propEquality) ||
                                !Di(this.state, r, this.stateEquality)
                        );
                    }),
                    (e.addPropsEquality = Rc),
                    (e.addStateEquality = _c),
                    (e.contextType = Se),
                    e
                );
            })(wn);
            ($t.prototype.propEquality = {}), ($t.prototype.stateEquality = {});
            var L = (function (t) {
                function e() {
                    return (null !== t && t.apply(this, arguments)) || this;
                }
                return (0, u.ZT)(e, t), (e.contextType = Se), e;
            })($t);
            function Rc(t) {
                var e = Object.create(this.prototype.propEquality);
                (0, u.pi)(e, t), (this.prototype.propEquality = e);
            }
            function _c(t) {
                var e = Object.create(this.prototype.stateEquality);
                (0, u.pi)(e, t), (this.prototype.stateEquality = e);
            }
            function me(t, e) {
                'function' == typeof t ? t(e) : t && (t.current = e);
            }
            var Ce = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (n.uid = qe()), n;
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
                            !ne(n, '.fc-event-mirror')
                        );
                    }),
                    (e.prototype.isValidDateDownEl = function (n) {
                        return !(
                            ne(n, '.fc-event:not(.fc-bg-event)') ||
                            ne(n, '.fc-more-link') ||
                            ne(n, 'a[data-navlink]') ||
                            ne(n, '.fc-popover')
                        );
                    }),
                    e
                );
            })(L);
            function xe(t) {
                return {
                    id: qe(),
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
            var Be = (function (t) {
                function e() {
                    return (null !== t && t.apply(this, arguments)) || this;
                }
                return (0, u.ZT)(e, t), e;
            })(Et);
            function $n(t, e, n, r) {
                if (e[t]) return e[t];
                var i = (function Pc(t, e, n, r) {
                    var i = n[t],
                        o = r[t],
                        a = function (f) {
                            return i && null !== i[f]
                                ? i[f]
                                : o && null !== o[f]
                                ? o[f]
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
                        c = $n(l, e, n, r);
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
            (Be.prototype.classes = {
                root: 'fc-theme-standard',
                tableCellShaded: 'fc-cell-shaded',
                buttonGroup: 'fc-button-group',
                button: 'fc-button fc-button-primary',
                buttonActive: 'fc-button-active',
            }),
                (Be.prototype.baseIconClass = 'fc-icon'),
                (Be.prototype.iconClasses = {
                    close: 'fc-icon-x',
                    prev: 'fc-icon-chevron-left',
                    next: 'fc-icon-chevron-right',
                    prevYear: 'fc-icon-chevrons-left',
                    nextYear: 'fc-icon-chevrons-right',
                }),
                (Be.prototype.rtlIconClasses = {
                    prev: 'fc-icon-chevron-right',
                    next: 'fc-icon-chevron-left',
                    prevYear: 'fc-icon-chevrons-right',
                    nextYear: 'fc-icon-chevrons-left',
                }),
                (Be.prototype.iconOverrideOption = 'buttonIcons'),
                (Be.prototype.iconOverrideCustomButtonOption = 'icon'),
                (Be.prototype.iconOverridePrefix = 'fc-icon-');
            var be = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.rootElRef = X()),
                            (n.handleRootEl = function (r) {
                                me(n.rootElRef, r),
                                    n.props.elRef && me(n.props.elRef, r);
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
                                er,
                                {
                                    hookProps: i,
                                    didMount: r.didMount,
                                    willUnmount: r.willUnmount,
                                    elRef: this.handleRootEl,
                                },
                                function (o) {
                                    return h(
                                        fo,
                                        {
                                            hookProps: i,
                                            content: r.content,
                                            defaultContent: r.defaultContent,
                                            backupElRef: n.rootElRef,
                                        },
                                        function (a, s) {
                                            return r.children(
                                                o,
                                                po(r.classNames, i),
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
                })(L),
                co = oi(0);
            function fo(t) {
                return h(co.Consumer, null, function (e) {
                    return h(Bc, (0, u.pi)({ renderId: e }, t));
                });
            }
            var Bc = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (n.innerElRef = X()), n;
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
                                r = vo(n.content, n.hookProps);
                            return (
                                void 0 === r &&
                                    (r = vo(n.defaultContent, n.hookProps)),
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
                })(L),
                er = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.handleRootEl = function (r) {
                                (n.rootEl = r),
                                    n.props.elRef && me(n.props.elRef, r);
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
                })(L);
            function uo() {
                var t,
                    e,
                    n = [];
                return function (r, i) {
                    return (
                        (!e || !we(e, i) || r !== t) &&
                            ((t = r), (e = i), (n = po(r, i))),
                        n
                    );
                };
            }
            function po(t, e) {
                return 'function' == typeof t && (t = t(e)), On(t);
            }
            function vo(t, e) {
                return 'function' == typeof t ? t(e, h) : t;
            }
            var wt = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (n.normalizeClassNames = uo()), n;
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
                            er,
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
            })(L);
            function ho(t) {
                return Ee(t, Oc);
            }
            function Oc(t) {
                var e = 'function' == typeof t ? { component: t } : t,
                    n = e.component;
                return (
                    e.content &&
                        (n = (function Hc(t) {
                            return function (e) {
                                return h(Se.Consumer, null, function (n) {
                                    return h(
                                        wt,
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
                                                be,
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
                var i = ho(t),
                    o = ho(e.views),
                    a = (function Nc(t, e) {
                        var r,
                            n = {};
                        for (r in t) $n(r, n, t, e);
                        for (r in e) $n(r, n, t, e);
                        return n;
                    })(i, o);
                return Ee(a, function (s) {
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
                                    n = go[e];
                                return (
                                    void 0 === n && ((n = U(t)), (go[e] = n)), n
                                );
                            })(o))
                        ) {
                            var f = kn(a);
                            (s = f.unit),
                                1 === f.value &&
                                    ((l = s),
                                    (c = e[s] ? e[s].rawOptions : {}));
                        }
                        var d = function (v) {
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
                                d(r) || d(n) || t.overrides.buttonText,
                            buttonTextDefault:
                                d(i) ||
                                t.defaults.buttonText ||
                                d(De) ||
                                t.type,
                            buttonTitleOverride:
                                p(r) || p(n) || t.overrides.buttonHint,
                            buttonTitleDefault:
                                p(i) || t.defaults.buttonHint || p(De),
                        };
                    })(s, o, e, n, r);
                });
            }
            var go = {},
                mo = (function () {
                    function t(e) {
                        (this.props = e),
                            (this.nowDate = bt(e.nowInput, e.dateEnv)),
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
                                f,
                                i = this.props;
                            return (
                                (o = this.buildValidRange()),
                                (o = this.trimHiddenDays(o)),
                                r &&
                                    (e = (function Sl(t, e) {
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
                                i.showNonCurrentDates || (c = et(c, a.range)),
                                (c = et((c = this.adjustActiveRange(c)), o)),
                                (f = Un(a.range, o)),
                                {
                                    validRange: o,
                                    currentRange: a.range,
                                    currentRangeUnit: a.unit,
                                    isRangeAllDay: s,
                                    activeRange: c,
                                    renderRange: l,
                                    slotMinTime: i.slotMinTime,
                                    slotMaxTime: i.slotMaxTime,
                                    isValid: f,
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
                                    : ((o = kn(
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
                            return U({ day: 1 });
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
                                    (Ke(o) < 0 &&
                                        ((s = V(s)), (s = r.add(s, o))),
                                    Ke(a) > 1 &&
                                        ((l = ie((l = V(l)), -1)),
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
                                f,
                                o = this.props,
                                a = o.dateEnv,
                                s = o.dateAlignment;
                            if (!s) {
                                var d = this.props.dateIncrement;
                                s = d && fe(d) < fe(r) ? kn(d).unit : i;
                            }
                            function p() {
                                (l = a.startOf(e, s)),
                                    (c = a.add(l, r)),
                                    (f = { start: l, end: c });
                            }
                            return (
                                Ke(r) <= 1 &&
                                    this.isHiddenDay(l) &&
                                    (l = V((l = this.skipHiddenDays(l, n)))),
                                p(),
                                this.trimHiddenDays(f) ||
                                    ((e = this.skipHiddenDays(e, n)), p()),
                                f
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
                                (l = V(l)),
                                (c = l = this.skipHiddenDays(l, n));
                            do {
                                (c = ie(c, 1)), this.isHiddenDay(c) || (s += 1);
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
                                    ? U(1, r)
                                    : e || U({ days: 1 }))
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
                                return n && (n = Fn(n)), n;
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
                                e = ie(e, n);
                            return e;
                        }),
                        t
                    );
                })();
            function yo(t) {
                for (var e in t) if (t[e].isFetching) return !0;
                return !1;
            }
            function bo(t, e, n, r) {
                for (var i = {}, o = 0, a = e; o < a.length; o++) {
                    var s = a[o];
                    i[s.sourceId] = s;
                }
                return n && (i = Ao(i, n, r)), (0, u.pi)((0, u.pi)({}, t), i);
            }
            function Ao(t, e, n) {
                return tr(
                    t,
                    Ue(t, function (r) {
                        return (function Yc(t, e, n) {
                            return wo(t, n)
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
            function tr(t, e, n, r, i) {
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
                    s = qe();
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
            function Eo(t, e) {
                return Ue(t, function (n) {
                    return wo(n, e);
                });
            }
            function wo(t, e) {
                return !e.pluginHooks.eventSourceDefs[t.sourceDefId]
                    .ignoreRange;
            }
            function Do(t, e) {
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
            function So(t, e) {
                return Vt(t, function (n) {
                    return n.sourceId !== e;
                });
            }
            function of(t, e) {
                switch (e.type) {
                    case 'UNSELECT_DATES':
                        return null;
                    case 'SELECT_DATES':
                        return e.selection;
                    default:
                        return t;
                }
            }
            function af(t, e) {
                switch (e.type) {
                    case 'UNSELECT_EVENT':
                        return '';
                    case 'SELECT_EVENT':
                        return e.eventInstanceId;
                    default:
                        return t;
                }
            }
            function sf(t, e) {
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
            function lf(t, e) {
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
            function cf(t, e, n, r, i) {
                return {
                    header: t.headerToolbar
                        ? Co(t.headerToolbar, t, e, n, r, i)
                        : null,
                    footer: t.footerToolbar
                        ? Co(t.footerToolbar, t, e, n, r, i)
                        : null,
                };
            }
            function Co(t, e, n, r, i, o) {
                var a = {},
                    s = [],
                    l = !1;
                for (var c in t) {
                    var d = ff(t[c], e, n, r, i, o);
                    (a[c] = d.widgets),
                        s.push.apply(s, d.viewsWithButtons),
                        (l = l || d.hasTitle);
                }
                return { sectionWidgets: a, viewsWithButtons: s, hasTitle: l };
            }
            function ff(t, e, n, r, i, o) {
                var a = 'rtl' === e.direction,
                    s = e.customButtons || {},
                    l = n.buttonText || {},
                    c = e.buttonText || {},
                    f = n.buttonHints || {},
                    d = e.buttonHints || {},
                    p = t ? t.split(' ') : [],
                    v = [],
                    g = !1;
                return {
                    widgets: p.map(function (E) {
                        return E.split(',').map(function (m) {
                            if ('title' === m)
                                return (g = !0), { buttonName: m };
                            var w, _, R, F, z, Q;
                            if ((w = s[m]))
                                (R = function (W) {
                                    w.click &&
                                        w.click.call(W.target, W, W.target);
                                }),
                                    (F = r.getCustomButtonIconClass(w)) ||
                                        (F = r.getIconClass(m, a)) ||
                                        (z = w.text),
                                    (Q = w.hint || w.text);
                            else if ((_ = i[m])) {
                                v.push(m),
                                    (R = function () {
                                        o.changeView(m);
                                    }),
                                    (z = _.buttonTextOverride) ||
                                        (F = r.getIconClass(m, a)) ||
                                        (z = _.buttonTextDefault);
                                var P =
                                    _.buttonTextOverride || _.buttonTextDefault;
                                Q = gt(
                                    _.buttonTitleOverride ||
                                        _.buttonTitleDefault ||
                                        e.viewHint,
                                    [P, m],
                                    P
                                );
                            } else if (o[m])
                                if (
                                    ((R = function () {
                                        o[m]();
                                    }),
                                    (z = l[m]) ||
                                        (F = r.getIconClass(m, a)) ||
                                        (z = c[m]),
                                    'prevYear' === m || 'nextYear' === m)
                                ) {
                                    var Y = 'prevYear' === m ? 'prev' : 'next';
                                    Q = gt(
                                        f[Y] || d[Y],
                                        [c.year || 'year', 'year'],
                                        c[m]
                                    );
                                } else
                                    Q = function (W) {
                                        return gt(
                                            f[m] || d[m],
                                            [c[W] || W, W],
                                            c[m]
                                        );
                                    };
                            return {
                                buttonName: m,
                                buttonClick: R,
                                buttonIcon: F,
                                buttonText: z,
                                buttonHint: Q,
                            };
                        });
                    }),
                    viewsWithButtons: v,
                    hasTitle: g,
                };
            }
            function xo(t) {
                var e = [];
                for (var n in t)
                    e.push(
                        encodeURIComponent(n) + '=' + encodeURIComponent(t[n])
                    );
                return e.join('&');
            }
            function To(t, e) {
                for (
                    var n = Tn(e.getCurrentData().eventSources),
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
                for (var c = 0, f = n; c < f.length; c++)
                    e.dispatch({
                        type: 'REMOVE_EVENT_SOURCE',
                        sourceId: f[c].sourceId,
                    });
                for (var p = 0, v = r; p < v.length; p++)
                    e.calendarApi.addEventSource(v[p]);
            }
            var Ro = [
                    xe({
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
                    xe({
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
                                            Gi(t.range, t.context.dateEnv)
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
                    xe({
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
                                        i = (function Af(t, e, n) {
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
                                    !(function hf(t, e, n, r, i) {
                                        var o = null;
                                        'GET' === (t = t.toUpperCase())
                                            ? (e = (function gf(t, e) {
                                                  return (
                                                      t +
                                                      (-1 === t.indexOf('?')
                                                          ? '?'
                                                          : '&') +
                                                      xo(e)
                                                  );
                                              })(e, n))
                                            : (o = xo(n));
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
                    xe({
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
                                    var r = et(e, {
                                        start: t.startRecur,
                                        end: t.endRecur,
                                    });
                                    return r
                                        ? (function Sf(t, e, n, r) {
                                              for (
                                                  var i = t ? Ei(t) : null,
                                                      o = V(n.start),
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
                                                      (o = ie(o, 1));
                                              }
                                              return s;
                                          })(t.daysOfWeek, t.startTime, r, n)
                                        : [];
                                },
                            },
                        ],
                        eventRefiners: {
                            daysOfWeek: A,
                            startTime: U,
                            endTime: U,
                            duration: U,
                            startRecur: A,
                            endRecur: A,
                        },
                    }),
                    xe({
                        optionChangeHandlers: {
                            events: function (t, e) {
                                To([t], e);
                            },
                            eventSources: To,
                        },
                    }),
                    xe({
                        isLoadingFuncs: [
                            function (t) {
                                return yo(t.eventSources);
                            },
                        ],
                        contentTypeHandlers: {
                            html: function Rf() {
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
                            domNodes: function _f() {
                                var t = null,
                                    e = [];
                                function r() {
                                    e.forEach(Dn), (e = []), (t = null);
                                }
                                return {
                                    render: function n(i, o) {
                                        var a = Array.prototype.slice.call(o);
                                        if (i !== t || !Ie(e, a)) {
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
                            dateProfile: function xf(t, e) {
                                e.emitter.trigger(
                                    'datesSet',
                                    (0, u.pi)(
                                        (0, u.pi)(
                                            {},
                                            Gi(t.activeRange, e.dateEnv)
                                        ),
                                        { view: e.viewApi }
                                    )
                                );
                            },
                            eventStore: function Tf(t, e) {
                                var n = e.emitter;
                                n.hasHandlers('eventsSet') &&
                                    n.trigger('eventsSet', Le(t, e));
                            },
                        },
                    }),
                ],
                nr = (function () {
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
                kf = (function () {
                    function t(e, n) {
                        (this.runTaskOption = e),
                            (this.drainedOption = n),
                            (this.queue = []),
                            (this.delayedRunner = new nr(
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
            function Mf(t, e, n) {
                var r;
                return (
                    (r = /^(year|month)$/.test(t.currentRangeUnit)
                        ? t.currentRange
                        : t.activeRange),
                    n.formatRange(
                        r.start,
                        r.end,
                        Z(
                            e.titleFormat ||
                                (function If(t) {
                                    var e = t.currentRangeUnit;
                                    if ('year' === e)
                                        return { year: 'numeric' };
                                    if ('month' === e)
                                        return {
                                            year: 'numeric',
                                            month: 'long',
                                        };
                                    var n = Bt(
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
            var _o = (function () {
                function t(e) {
                    var n = this;
                    (this.computeOptionsData = I(this._computeOptionsData)),
                        (this.computeCurrentViewData = I(
                            this._computeCurrentViewData
                        )),
                        (this.organizeRawLocales = I(to)),
                        (this.buildLocale = I(Gn)),
                        (this.buildPluginHooks = (function Mc() {
                            var n,
                                t = [],
                                e = [];
                            return function (r, i) {
                                return (
                                    (!n || !Ie(r, t) || !Ie(i, e)) &&
                                        (n = (function kc(t, e) {
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
                        (this.buildDateEnv = I(Nf)),
                        (this.buildTheme = I(Pf)),
                        (this.parseToolbars = I(cf)),
                        (this.buildViewSpecs = I(zc)),
                        (this.buildDateProfileGenerator = zt(Bf)),
                        (this.buildViewApi = I(Of)),
                        (this.buildViewUiProps = zt(Ff)),
                        (this.buildEventUiBySource = I(Hf, we)),
                        (this.buildEventUiBases = I(zf)),
                        (this.parseContextBusinessHours = zt(Uf)),
                        (this.buildTitle = I(Mf)),
                        (this.emitter = new Kt()),
                        (this.actionRunner = new kf(
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
                        (this.dispatch = function (_) {
                            n.actionRunner.request(_);
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
                            return null != n ? e.createMarker(n) : bt(t.now, e);
                        })(i.calendarOptions, i.dateEnv),
                        l = a.dateProfileGenerator.build(s);
                    Ne(l.activeRange, s) || (s = l.currentRange.start);
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
                            f = 0,
                            d = i.pluginHooks.contextInit;
                        f < d.length;
                        f++
                    )
                        (0, d[f])(c);
                    for (
                        var v = (function Vc(t, e, n) {
                                var r = e ? e.activeRange : null;
                                return bo(
                                    {},
                                    (function Xc(t, e) {
                                        var n = qi(e),
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
                                            var l = Yi(a[o], e, n);
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
                    rr(g, c) && this.emitter.trigger('loading', !0),
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
                        var f = {
                                dateEnv: s.dateEnv,
                                options: s.calendarOptions,
                                pluginHooks: s.pluginHooks,
                                calendarApi: r.calendarApi,
                                dispatch: this.dispatch,
                                emitter: o,
                                getCurrentData: this.getCurrentData,
                            },
                            d = i.currentDate,
                            p = i.dateProfile;
                        this.data &&
                            this.data.dateProfileGenerator !==
                                c.dateProfileGenerator &&
                            (p = c.dateProfileGenerator.build(d)),
                            (d = (function Vl(t, e) {
                                return 'CHANGE_DATE' === e.type
                                    ? e.dateMarker
                                    : t;
                            })(d, e)),
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
                            })(p, e, d, c.dateProfileGenerator)),
                            ('PREV' === e.type ||
                                'NEXT' === e.type ||
                                !Ne(p.currentRange, d)) &&
                                (d = p.currentRange.start);
                        for (
                            var v = (function Gc(t, e, n, r) {
                                    var i = n ? n.activeRange : null;
                                    switch (e.type) {
                                        case 'ADD_EVENT_SOURCES':
                                            return bo(t, e.sources, i, r);
                                        case 'REMOVE_EVENT_SOURCE':
                                            return (function jc(t, e) {
                                                return Ue(t, function (n) {
                                                    return n.sourceId !== e;
                                                });
                                            })(t, e.sourceId);
                                        case 'PREV':
                                        case 'NEXT':
                                        case 'CHANGE_DATE':
                                        case 'CHANGE_VIEW_TYPE':
                                            return n ? Ao(t, i, r) : t;
                                        case 'FETCH_EVENT_SOURCES':
                                            return tr(
                                                t,
                                                e.sourceIds
                                                    ? Ei(e.sourceIds)
                                                    : Eo(t, r),
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
                                })(i.eventSources, e, p, f),
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
                                                    var a = Wt(
                                                        (function ef(t, e, n) {
                                                            var r =
                                                                    n.options
                                                                        .eventDataTransform,
                                                                i = e
                                                                    ? e.eventDataTransform
                                                                    : null;
                                                            return (
                                                                i &&
                                                                    (t = Do(
                                                                        t,
                                                                        i
                                                                    )),
                                                                r &&
                                                                    (t = Do(
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
                                                        r && (a = Xe(a, r, o)),
                                                        Bn(So(t, e.sourceId), a)
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
                                            return (function tf(t, e, n, r) {
                                                return (
                                                    n && (e = Xe(e, n, r)),
                                                    Bn(t, e)
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
                                            return Bn(t, e.eventStore);
                                        case 'PREV':
                                        case 'NEXT':
                                        case 'CHANGE_DATE':
                                        case 'CHANGE_VIEW_TYPE':
                                            return r
                                                ? Xe(t, r.activeRange, i)
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
                                            return So(t, e.sourceId);
                                        case 'REMOVE_ALL_EVENT_SOURCES':
                                            return Vt(t, function (o) {
                                                return !o.sourceId;
                                            });
                                        case 'REMOVE_ALL_EVENTS':
                                            return { defs: {}, instances: {} };
                                        default:
                                            return t;
                                    }
                                })(i.eventStore, e, v, p, f),
                                E =
                                    (yo(v) &&
                                        !c.options.progressiveEventRendering &&
                                        i.renderableEventStore) ||
                                    g,
                                m = this.buildViewUiProps(f),
                                w = m.eventUiSingleBase,
                                _ = m.selectionConfig,
                                R = this.buildEventUiBySource(v),
                                z = {
                                    dynamicOptionOverrides: a,
                                    currentViewType: l,
                                    currentDate: d,
                                    dateProfile: p,
                                    eventSources: v,
                                    eventStore: g,
                                    renderableEventStore: E,
                                    selectionConfig: _,
                                    eventUiBases: this.buildEventUiBases(
                                        E.defs,
                                        w,
                                        R
                                    ),
                                    businessHours:
                                        this.parseContextBusinessHours(f),
                                    dateSelection: of(i.dateSelection, e),
                                    eventSelection: af(i.eventSelection, e),
                                    eventDrag: sf(i.eventDrag, e),
                                    eventResize: lf(i.eventResize, e),
                                },
                                Q = (0, u.pi)((0, u.pi)({}, f), z),
                                P = 0,
                                Y = s.pluginHooks.reducers;
                            P < Y.length;
                            P++
                        )
                            (0, u.pi)(z, (0, Y[P])(i, e, Q));
                        var de = rr(i, f),
                            oe = rr(z, f);
                        !de && oe
                            ? o.trigger('loading', !0)
                            : de && !oe && o.trigger('loading', !1),
                            (this.state = z),
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
                            f = o.calendarOptions;
                        if (c && c !== f)
                            for (var d in (c.timeZone !== f.timeZone &&
                                ((r.eventSources = s.eventSources =
                                    (function Zc(t, e, n) {
                                        var r = e ? e.activeRange : null;
                                        return tr(t, Eo(t, n), r, !0, n);
                                    })(s.eventSources, r.dateProfile, s)),
                                (r.eventStore = s.eventStore =
                                    (function nf(t, e, n) {
                                        var r = t.defs,
                                            i = Ee(t.instances, function (o) {
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
                                c[d] !== f[d] && l[d](f[d], s);
                        n.onData && n.onData(s);
                    }),
                    (t.prototype._computeOptionsData = function (e, n, r) {
                        var i = this.processRawCalendarOptions(e, n),
                            o = i.refinedOptions,
                            a = i.pluginHooks,
                            s = i.localeDefaults,
                            l = i.availableLocaleData;
                        ko(i.extra);
                        var f = this.buildDateEnv(
                                o.timeZone,
                                o.locale,
                                o.weekNumberCalculation,
                                o.firstDay,
                                o.weekText,
                                a,
                                l,
                                o.defaultRangeSeparator
                            ),
                            d = this.buildViewSpecs(a.views, e, n, s),
                            p = this.buildTheme(o, a);
                        return {
                            calendarOptions: o,
                            pluginHooks: a,
                            dateEnv: f,
                            viewSpecs: d,
                            theme: p,
                            toolbarConfig: this.parseToolbars(o, e, p, d, r),
                            localeDefaults: s,
                            availableRawLocales: l.map,
                        };
                    }),
                    (t.prototype.processRawCalendarOptions = function (e, n) {
                        var r = Nn([De, e, n]),
                            o = r.locale,
                            a = this.organizeRawLocales(r.locales),
                            l = this.buildLocale(
                                o || a.defaultCode,
                                a.map
                            ).options,
                            c = this.buildPluginHooks(e.plugins || [], Ro),
                            f = (this.currentCalendarOptionsRefiners = (0,
                            u.pi)(
                                (0, u.pi)(
                                    (0, u.pi)(
                                        (0, u.pi)((0, u.pi)({}, Mi), Ii),
                                        Ni
                                    ),
                                    c.listenerRefiners
                                ),
                                c.optionRefiners
                            )),
                            d = {},
                            p = Nn([De, l, e, n]),
                            v = {},
                            g = this.currentCalendarOptionsInput,
                            b = this.currentCalendarOptionsRefined,
                            E = !1;
                        for (var m in p)
                            'plugins' !== m &&
                                (p[m] === g[m] ||
                                (In[m] && m in g && In[m](g[m], p[m]))
                                    ? (v[m] = b[m])
                                    : f[m]
                                    ? ((v[m] = f[m](p[m])), (E = !0))
                                    : (d[m] = g[m]));
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
                                extra: d,
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
                            ko(a.extra),
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
                        var a = Nn([
                                De,
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
                                            (0, u.pi)((0, u.pi)({}, Mi), Ii),
                                            Ni
                                        ),
                                        ul
                                    ),
                                    n.listenerRefiners
                                ),
                                n.optionRefiners
                            ),
                            l = {},
                            c = this.currentViewOptionsInput,
                            f = this.currentViewOptionsRefined,
                            d = !1,
                            p = {};
                        for (var v in a)
                            a[v] === c[v]
                                ? (l[v] = f[v])
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
                                  (d = !0));
                        return (
                            d &&
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
            function Nf(t, e, n, r, i, o, a, s) {
                var l = Gn(e || a.defaultCode, a.map);
                return new Ki({
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
            function Pf(t, e) {
                return new (e.themeClasses[t.themeSystem] || Be)(t);
            }
            function Bf(t) {
                return new (t.dateProfileGeneratorClass || mo)(t);
            }
            function Of(t, e, n) {
                return new Ll(t, e, n);
            }
            function Hf(t) {
                return Ee(t, function (e) {
                    return e.ui;
                });
            }
            function zf(t, e, n) {
                var r = { '': e };
                for (var i in t) {
                    var o = t[i];
                    o.sourceId && n[o.sourceId] && (r[i] = n[o.sourceId]);
                }
                return r;
            }
            function Ff(t) {
                var e = t.options;
                return {
                    eventUiSingleBase: Zt(
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
                    selectionConfig: Zt(
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
            function rr(t, e) {
                for (
                    var n = 0, r = e.pluginHooks.isLoadingFuncs;
                    n < r.length;
                    n++
                )
                    if ((0, r[n])(t)) return !0;
                return !1;
            }
            function Uf(t) {
                return (function nc(t, e) {
                    return Wt(
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
            function ko(t, e) {
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
                        (r.dataManager = new _o({
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
            })(wn);
            var Mo = (function () {
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
                                                  span: or(s, a),
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
                            ? (ar(this.levelCoords, n.level, n.levelCoord),
                              ar(i, n.level, [e]))
                            : ar(i[n.level], n.lateral, e),
                            (this.stackCnts[Qe(e)] = n.stackCnt);
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
                                f = -1,
                                d = null,
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
                                    m = sr(b, e.span.start, ir),
                                    w = m[0] + m[1];
                                (E = b[w]) && E.span.start < e.span.end;

                            ) {
                                var _ = g + E.thickness;
                                _ > l && ((l = _), (d = E), (c = v), (f = w)),
                                    _ === l && (p = Math.max(p, a[Qe(E)] + 1)),
                                    (w += 1);
                            }
                        }
                        var R = 0;
                        if (d) for (R = c + 1; R < s && r[R] < l; ) R += 1;
                        var F = -1;
                        return (
                            R < s &&
                                r[R] === l &&
                                (F = sr(i[R], e.span.end, ir)[0]),
                            {
                                touchingLevel: c,
                                touchingLateral: f,
                                touchingEntry: d,
                                stackCnt: p,
                                levelCoord: l,
                                level: R,
                                lateral: F,
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
                                var l = r[a], c = 0, f = n[a];
                                c < f.length;
                                c++
                            )
                                o.push(
                                    (0, u.pi)((0, u.pi)({}, f[c]), {
                                        levelCoord: l,
                                    })
                                );
                        return o;
                    }),
                    t
                );
            })();
            function ir(t) {
                return t.span.end;
            }
            function Qe(t) {
                return t.index + ':' + t.span.start;
            }
            function Qf(t, e) {
                return {
                    start: Math.min(t.start, e.start),
                    end: Math.max(t.end, e.end),
                };
            }
            function or(t, e) {
                var n = Math.max(t.start, e.start),
                    r = Math.min(t.end, e.end);
                return n < r ? { start: n, end: r } : null;
            }
            function ar(t, e, n) {
                t.splice(e, 0, n);
            }
            function sr(t, e, n) {
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
            var nt = (function () {
                function t(e) {
                    (this.component = e.component),
                        (this.isHitComboAllowed = e.isHitComboAllowed || null);
                }
                return (t.prototype.destroy = function () {}), t;
            })();
            function Wf(t, e) {
                return {
                    component: t,
                    el: e.el,
                    useEventCenter:
                        null == e.useEventCenter || e.useEventCenter,
                    isHitComboAllowed: e.isHitComboAllowed || null,
                };
            }
            function lr(t) {
                var e;
                return ((e = {})[t.component.uid] = t), e;
            }
            var en = {},
                Io = (function () {
                    function t(e, n) {
                        this.emitter = new Kt();
                    }
                    return (
                        (t.prototype.destroy = function () {}),
                        (t.prototype.setMirrorIsVisible = function (e) {}),
                        (t.prototype.setMirrorNeedsRevert = function (e) {}),
                        (t.prototype.setAutoScrollEnabled = function (e) {}),
                        t
                    );
                })(),
                tn = {},
                Vf = {
                    startTime: U,
                    duration: U,
                    create: Boolean,
                    sourceId: String,
                };
            function cr(t) {
                var e = Qt(t, Vf),
                    n = e.refined;
                return {
                    startTime: n.startTime || null,
                    duration: n.duration || null,
                    create: null == n.create || n.create,
                    sourceId: n.sourceId,
                    leftoverProps: e.extra,
                };
            }
            var Gf = (function (t) {
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
                                    f = c.buttonName,
                                    d = c.buttonClick,
                                    p = c.buttonText,
                                    v = c.buttonIcon,
                                    g = c.buttonHint;
                                if ('title' === f)
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
                                    var b = f === r.activeButton,
                                        E =
                                            (!r.isTodayEnabled &&
                                                'today' === f) ||
                                            (!r.isPrevEnabled &&
                                                'prev' === f) ||
                                            (!r.isNextEnabled && 'next' === f),
                                        m = [
                                            'fc-' + f + '-button',
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
                                                    onClick: d,
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
                })(L),
                No = (function (t) {
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
                            return h(Gf, {
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
                })(L),
                Zf = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.state = { availableWidth: null }),
                            (n.handleEl = function (r) {
                                (n.el = r),
                                    me(n.props.elRef, r),
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
                })(L),
                jf = (function (t) {
                    function e(n) {
                        var r = t.call(this, n) || this;
                        return (
                            (r.handleSegClick = function (i, o) {
                                var a = r.component,
                                    s = a.context,
                                    l = tt(o);
                                if (l && a.isValidSegDownEl(i.target)) {
                                    var c = ne(
                                            i.target,
                                            '.fc-event-forced-url'
                                        ),
                                        f = c
                                            ? c.querySelector('a[href]').href
                                            : '';
                                    s.emitter.trigger('eventClick', {
                                        el: o,
                                        event: new j(
                                            a.context,
                                            l.eventRange.def,
                                            l.eventRange.instance
                                        ),
                                        jsEvent: i,
                                        view: s.viewApi,
                                    }),
                                        f &&
                                            !i.defaultPrevented &&
                                            (window.location.href = f);
                                }
                            }),
                            (r.destroy = di(
                                n.el,
                                'click',
                                '.fc-event',
                                r.handleSegClick
                            )),
                            r
                        );
                    }
                    return (0, u.ZT)(e, t), e;
                })(nt),
                Yf = (function (t) {
                    function e(n) {
                        var r = t.call(this, n) || this;
                        return (
                            (r.handleEventElRemove = function (i) {
                                i === r.currentSegEl &&
                                    r.handleSegLeave(null, r.currentSegEl);
                            }),
                            (r.handleSegEnter = function (i, o) {
                                tt(o) &&
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
                                return di(t, 'mouseover', e, function (o, a) {
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
                                s = tt(i);
                            (!r || o.isValidSegDownEl(r.target)) &&
                                a.emitter.trigger(n, {
                                    el: i,
                                    event: new j(
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
                })(nt),
                qf = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.buildViewContext = I(Tc)),
                            (n.buildViewPropTransformers = I(Xf)),
                            (n.buildToolbarProps = I(Jf)),
                            (n.headerRef = X()),
                            (n.footerRef = X()),
                            (n.interactionsStore = {}),
                            (n.state = { viewLabelId: kt() }),
                            (n.registerInteractiveComponent = function (r, i) {
                                var o = Wf(r, i),
                                    l = [jf, Yf]
                                        .concat(
                                            n.props.pluginHooks
                                                .componentInteractions
                                        )
                                        .map(function (c) {
                                            return new c(o);
                                        });
                                (n.interactionsStore[r.uid] = l),
                                    (en[r.uid] = o);
                            }),
                            (n.unregisterInteractiveComponent = function (r) {
                                var i = n.interactionsStore[r.uid];
                                if (i) {
                                    for (var o = 0, a = i; o < a.length; o++)
                                        a[o].destroy();
                                    delete n.interactionsStore[r.uid];
                                }
                                delete en[r.uid];
                            }),
                            (n.resizeRunner = new nr(function () {
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
                                    bt(n.options.now, n.dateEnv),
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
                                f =
                                    r.header && r.header.hasTitle
                                        ? this.state.viewLabelId
                                        : '';
                            return h(
                                Se.Provider,
                                { value: c },
                                r.header &&
                                    h(
                                        No,
                                        (0, u.pi)(
                                            {
                                                ref: this.headerRef,
                                                extraClassName:
                                                    'fc-header-toolbar',
                                                model: r.header,
                                                titleId: f,
                                            },
                                            o
                                        )
                                    ),
                                h(
                                    Zf,
                                    {
                                        liquid: a,
                                        height: s,
                                        aspectRatio: l,
                                        labeledById: f,
                                    },
                                    this.renderView(n),
                                    this.buildAppendContent()
                                ),
                                r.footer &&
                                    h(
                                        No,
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
                            return h.apply(void 0, (0, u.ev)([K, {}], r));
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
                })($t);
            function Jf(t, e, n, r, i, o) {
                var a = n.build(i, void 0, !1),
                    s = n.buildPrev(e, r, !1),
                    l = n.buildNext(e, r, !1);
                return {
                    title: o,
                    activeButton: t.type,
                    navUnit: t.singleUnit,
                    isTodayEnabled: a.isValid && !Ne(e.currentRange, i),
                    isPrevEnabled: s.isValid,
                    isNextEnabled: l.isValid,
                };
            }
            function Xf(t) {
                return t.map(function (e) {
                    return new e();
                });
            }
            var Kf = (function (t) {
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
                                oo() || s.push('fc-liquid-hack'),
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
                })(L),
                Po = 'fc-col-header-cell';
            function Bo(t) {
                return t.text;
            }
            var ed = (function (t) {
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
                                f = ao(l, s.todayRange, null, s.dateProfile),
                                d = [Po].concat(Yn(f, o)),
                                p = r.format(l, s.dayHeaderFormat),
                                v =
                                    !f.isDisabled && s.colCnt > 1
                                        ? Xt(this.context, l)
                                        : {},
                                g = (0, u.pi)(
                                    (0, u.pi)(
                                        (0, u.pi)(
                                            { date: r.toDate(l), view: a },
                                            s.extraHookProps
                                        ),
                                        { text: p }
                                    ),
                                    f
                                );
                            return h(
                                be,
                                {
                                    hookProps: g,
                                    classNames: i.dayHeaderClassNames,
                                    content: i.dayHeaderContent,
                                    defaultContent: Bo,
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
                                                className: d
                                                    .concat(E)
                                                    .join(' '),
                                                'data-date': f.isDisabled
                                                    ? void 0
                                                    : Ti(l),
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
                                            !f.isDisabled &&
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
                })(L),
                td = Z({ weekday: 'long' }),
                nd = (function (t) {
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
                                l = ie(new Date(2592e5), n.dow),
                                c = {
                                    dow: n.dow,
                                    isDisabled: !1,
                                    isFuture: !1,
                                    isPast: !1,
                                    isToday: !1,
                                    isOther: !1,
                                },
                                f = [Po].concat(
                                    Yn(c, o),
                                    n.extraClassNames || []
                                ),
                                d = i.format(l, n.dayHeaderFormat),
                                p = (0, u.pi)(
                                    (0, u.pi)(
                                        (0, u.pi)((0, u.pi)({ date: l }, c), {
                                            view: a,
                                        }),
                                        n.extraHookProps
                                    ),
                                    { text: d }
                                );
                            return h(
                                be,
                                {
                                    hookProps: p,
                                    classNames: s.dayHeaderClassNames,
                                    content: s.dayHeaderContent,
                                    defaultContent: Bo,
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
                                                className: f
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
                                                        td
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
                })(L),
                nn = (function (t) {
                    function e(n, r) {
                        var i = t.call(this, n, r) || this;
                        return (
                            (i.initialNowDate = bt(r.options.now, r.dateEnv)),
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
                                o = Fe(
                                    this.initialNowDate,
                                    new Date().valueOf() -
                                        this.initialNowQueriedMs
                                ),
                                a = i.dateEnv.startOf(o, r.unit),
                                s = i.dateEnv.add(a, U(1, r.unit)),
                                l = s.valueOf() - o.valueOf();
                            return (
                                (l = Math.min(864e5, l)),
                                {
                                    currentState: {
                                        nowDate: a,
                                        todayRange: Oo(a),
                                    },
                                    nextState: {
                                        nowDate: s,
                                        todayRange: Oo(s),
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
                        (e.contextType = Se),
                        e
                    );
                })(wn);
            function Oo(t) {
                var e = V(t);
                return { start: e, end: ie(e, 1) };
            }
            var Ho = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (n.createDayHeaderFormatter = I(rd)), n;
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
                        return h(nn, { unit: 'day' }, function (c, f) {
                            return h(
                                'tr',
                                { role: 'row' },
                                s && s('day'),
                                i.map(function (d) {
                                    return a
                                        ? h(ed, {
                                              key: d.toISOString(),
                                              date: d,
                                              dateProfile: o,
                                              todayRange: f,
                                              colCnt: i.length,
                                              dayHeaderFormat: l,
                                          })
                                        : h(nd, {
                                              key: d.getUTCDay(),
                                              dow: d.getUTCDay(),
                                              dayHeaderFormat: l,
                                          });
                                })
                            );
                        });
                    }),
                    e
                );
            })(L);
            function rd(t, e, n) {
                return (
                    t ||
                    (function $f(t, e) {
                        return Z(
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
            var zo = (function () {
                    function t(e, n) {
                        for (
                            var r = e.start, i = e.end, o = [], a = [], s = -1;
                            r < i;

                        )
                            n.isHiddenDay(r)
                                ? o.push(s + 0.5)
                                : (o.push((s += 1)), a.push(r)),
                                (r = ie(r, 1));
                        (this.dates = a),
                            (this.indices = o),
                            (this.cnt = a.length);
                    }
                    return (
                        (t.prototype.sliceRange = function (e) {
                            var n = this.getDateDayIndex(e.start),
                                r = this.getDateDayIndex(ie(e.end, -1)),
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
                                r = Math.floor(_e(this.dates[0], e));
                            return r < 0
                                ? n[0] - 1
                                : r >= n.length
                                ? n[n.length - 1] + 1
                                : n[r];
                        }),
                        t
                    );
                })(),
                Fo = (function () {
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
                Uo = (function () {
                    function t() {
                        (this.sliceBusinessHours = I(this._sliceBusinessHours)),
                            (this.sliceDateSelection = I(this._sliceDateSpan)),
                            (this.sliceEventStore = I(this._sliceEventStore)),
                            (this.sliceEventDrag = I(this._sliceInteraction)),
                            (this.sliceEventResize = I(this._sliceInteraction)),
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
                                            range: { start: e, end: Fe(e, 1) },
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
                                              Xe(e, fr(n, Boolean(r)), i),
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
                                var s = Ln(e, n, fr(r, Boolean(i)), i);
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
                            var s = Ln(
                                e.mutatedEvents,
                                n,
                                fr(r, Boolean(i)),
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
                                var a = Hl(e, n, r),
                                    s = this.sliceRange.apply(
                                        this,
                                        (0, u.ev)([e.range], i)
                                    ),
                                    l = 0,
                                    c = s;
                                l < c.length;
                                l++
                            ) {
                                var f = c[l];
                                f.eventRange = a;
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
                                (r = { start: r.start, end: ie(r.start, 1) });
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
            function fr(t, e) {
                var n = t.activeRange;
                return e
                    ? n
                    : {
                          start: Fe(n.start, t.slotMinTime.milliseconds),
                          end: Fe(n.end, t.slotMaxTime.milliseconds - 864e5),
                      };
            }
            function dr(t, e, n) {
                var r = t.mutatedEvents.instances;
                for (var i in r) if (!qt(e.validRange, r[i].range)) return !1;
                return Lo({ eventDrag: t }, n);
            }
            function Lo(t, e) {
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
                return (e.pluginHooks.isPropsValid || od)(r, e);
            }
            function od(t, e, n, r) {
                return (
                    void 0 === n && (n = {}),
                    !(
                        (t.eventDrag &&
                            !(function ad(t, e, n, r) {
                                var i = e.getCurrentData(),
                                    o = t.eventDrag,
                                    a = o.mutatedEvents,
                                    s = a.defs,
                                    l = a.instances,
                                    c = Jt(
                                        s,
                                        o.isEvent
                                            ? t.eventUiBases
                                            : { '': i.selectionConfig }
                                    );
                                r && (c = Ee(c, r));
                                var f = (function rf(t, e) {
                                        return {
                                            defs: t.defs,
                                            instances: Ue(
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
                                    d = f.defs,
                                    p = f.instances,
                                    v = Jt(d, t.eventUiBases);
                                for (var g in l) {
                                    var b = l[g],
                                        E = b.range,
                                        m = c[b.defId],
                                        w = s[b.defId];
                                    if (
                                        !Qo(
                                            m.constraints,
                                            E,
                                            f,
                                            t.businessHours,
                                            e
                                        )
                                    )
                                        return !1;
                                    var _ = e.options.eventOverlap,
                                        R = 'function' == typeof _ ? _ : null;
                                    for (var F in p) {
                                        var z = p[F];
                                        if (
                                            Un(E, z.range) &&
                                            ((!1 === v[z.defId].overlap &&
                                                o.isEvent) ||
                                                !1 === m.overlap ||
                                                (R &&
                                                    !R(
                                                        new j(e, d[z.defId], z),
                                                        new j(e, w, b)
                                                    )))
                                        )
                                            return !1;
                                    }
                                    for (
                                        var P = i.eventStore,
                                            Y = 0,
                                            W = m.allows;
                                        Y < W.length;
                                        Y++
                                    ) {
                                        var Tt,
                                            de = W[Y],
                                            oe = (0, u.pi)((0, u.pi)({}, n), {
                                                range: b.range,
                                                allDay: w.allDay,
                                            }),
                                            at = P.defs[w.defId];
                                        if (
                                            ((Tt = at
                                                ? new j(e, at, P.instances[g])
                                                : new j(e, w)),
                                            !de(Qn(oe, e), Tt))
                                        )
                                            return !1;
                                    }
                                }
                                return !0;
                            })(t, e, n, r)) ||
                        (t.dateSelection &&
                            !(function sd(t, e, n, r) {
                                var i = t.eventStore,
                                    o = i.defs,
                                    a = i.instances,
                                    s = t.dateSelection,
                                    l = s.range,
                                    c = e.getCurrentData().selectionConfig;
                                if (
                                    (r && (c = r(c)),
                                    !Qo(
                                        c.constraints,
                                        l,
                                        i,
                                        t.businessHours,
                                        e
                                    ))
                                )
                                    return !1;
                                var f = e.options.selectOverlap,
                                    d = 'function' == typeof f ? f : null;
                                for (var p in a) {
                                    var v = a[p];
                                    if (
                                        Un(l, v.range) &&
                                        (!1 === c.overlap ||
                                            (d &&
                                                !d(
                                                    new j(e, o[v.defId], v),
                                                    null
                                                )))
                                    )
                                        return !1;
                                }
                                for (var g = 0, b = c.allows; g < b.length; g++)
                                    if (
                                        !(0, b[g])(
                                            Qn(
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
            function Qo(t, e, n, r, i) {
                for (var o = 0, a = t; o < a.length; o++)
                    if (!cd(ld(a[o], e, n, r, i), e)) return !1;
                return !0;
            }
            function ld(t, e, n, r, i) {
                return 'businessHours' === t
                    ? ur(Xe(r, e, i))
                    : 'string' == typeof t
                    ? ur(
                          Vt(n, function (o) {
                              return o.groupId === t;
                          })
                      )
                    : 'object' == typeof t && t
                    ? ur(Xe(t, e, i))
                    : [];
            }
            function ur(t) {
                var e = t.instances,
                    n = [];
                for (var r in e) n.push(e[r].range);
                return n;
            }
            function cd(t, e) {
                for (var n = 0, r = t; n < r.length; n++)
                    if (qt(r[n], e)) return !0;
                return !1;
            }
            var rn = /^(visible|hidden)$/,
                fd = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.handleEl = function (r) {
                                (n.el = r), me(n.props.elRef, r);
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
                            if (rn.test(this.props.overflowX)) return !1;
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
                            if (rn.test(this.props.overflowY)) return !1;
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
                            return rn.test(this.props.overflowX)
                                ? 0
                                : this.el.offsetHeight - this.el.clientHeight;
                        }),
                        (e.prototype.getYScrollbarWidth = function () {
                            return rn.test(this.props.overflowY)
                                ? 0
                                : this.el.offsetWidth - this.el.clientWidth;
                        }),
                        e
                    );
                })(L),
                Te = (function () {
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
                            return Tn(this.currentMap);
                        }),
                        t
                    );
                })();
            function Wo(t, e) {
                return t.liquid && e.liquid;
            }
            function vd(t, e) {
                return Ie(t, e, we);
            }
            function hd(t, e) {
                for (var n = [], r = 0, i = t; r < i.length; r++)
                    for (var o = i[r], a = o.span || 1, s = 0; s < a; s += 1)
                        n.push(
                            h('col', {
                                style: {
                                    width:
                                        'shrink' === o.width
                                            ? gd(e)
                                            : o.width || '',
                                    minWidth: o.minWidth || '',
                                },
                            })
                        );
                return h.apply(void 0, (0, u.ev)(['colgroup', {}], n));
            }
            function gd(t) {
                return null == t ? 4 : t;
            }
            function bd(t, e) {
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
            function pr(t) {
                return h('div', {
                    className: 'fc-scrollgrid-sticky-shim',
                    style: { width: t.clientWidth, minWidth: t.tableMinWidth },
                });
            }
            function on(t) {
                var e = t.stickyHeaderDates;
                return (
                    (null == e || 'auto' === e) &&
                        (e = 'auto' === t.height || 'auto' === t.viewHeight),
                    e
                );
            }
            function Vo(t) {
                var e = t.stickyFooterScrollbar;
                return (
                    (null == e || 'auto' === e) &&
                        (e = 'auto' === t.height || 'auto' === t.viewHeight),
                    e
                );
            }
            var vr = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (
                        (n.processCols = I(function (r) {
                            return r;
                        }, vd)),
                        (n.renderMicroColGroup = I(hd)),
                        (n.scrollerRefs = new Te()),
                        (n.scrollerElRefs = new Te(
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
                            c = (function yd(t, e) {
                                var n = [
                                    'fc-scrollgrid',
                                    e.theme.getClass('table'),
                                ];
                                return t && n.push('fc-scrollgrid-liquid'), n;
                            })(r.liquid, o);
                        r.collapsibleWidth &&
                            c.push('fc-scrollgrid-collapsible');
                        for (
                            var p, f = a.length, d = 0, v = [], g = [], b = [];
                            d < f && 'header' === (p = a[d]).type;

                        )
                            v.push(this.renderSection(p, l, !0)), (d += 1);
                        for (; d < f && 'body' === (p = a[d]).type; )
                            g.push(this.renderSection(p, l, !1)), (d += 1);
                        for (; d < f && 'footer' === (p = a[d]).type; )
                            b.push(this.renderSection(p, l, !0)), (d += 1);
                        var E = !oo(),
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
                            ? h(K, { key: n.key }, n.outerContent)
                            : h(
                                  'tr',
                                  {
                                      key: n.key,
                                      role: 'presentation',
                                      className: bd(n, this.props.liquid).join(
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
                            f = s.scrollerClientHeights,
                            d = (function ud(t, e) {
                                return null != e.maxHeight || Wo(t, e);
                            })(a, n),
                            p = Wo(a, n),
                            v = a.liquid
                                ? l
                                    ? 'scroll'
                                    : d
                                    ? 'auto'
                                    : 'hidden'
                                : 'visible',
                            g = n.key,
                            b = (function pd(t, e, n, r) {
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
                                    clientHeight: void 0 !== f[g] ? f[g] : null,
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
                                    fd,
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
                        var i = (function Ad(t, e) {
                            for (var n = 0, r = t; n < r.length; n++) {
                                var i = r[n];
                                if (i.key === e) return i;
                            }
                            return null;
                        })(this.props.sections, r);
                        i && me(i.chunk.scrollerElRef, n);
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
                        return (function md(t) {
                            for (var e = 0, n = t; e < n.length; e++)
                                if ('shrink' === n[e].width) return !0;
                            return !1;
                        })(this.props.cols)
                            ? (function dd(t) {
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
                                    Jn ||
                                        (Jn = (function gc() {
                                            var t =
                                                document.createElement('div');
                                            (t.style.overflow = 'scroll'),
                                                (t.style.position = 'absolute'),
                                                (t.style.top = '-9999px'),
                                                (t.style.left = '-9999px'),
                                                document.body.appendChild(t);
                                            var e = so(t);
                                            return (
                                                document.body.removeChild(t), e
                                            );
                                        })()),
                                    Jn
                                );
                            })(),
                            i = this.scrollerRefs,
                            o = this.scrollerElRefs,
                            a = !1,
                            s = {},
                            l = {};
                        for (var c in i.currentMap) {
                            var f = i.currentMap[c];
                            if (f && f.needsYScrolling()) {
                                a = !0;
                                break;
                            }
                        }
                        for (
                            var d = 0, p = this.props.sections;
                            d < p.length;
                            d++
                        ) {
                            var g = o.currentMap[(c = p[d].key)];
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
            })(L);
            vr.addStateEquality({
                scrollerClientWidths: we,
                scrollerClientHeights: we,
            });
            var hr = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (n.elRef = X()), n;
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
                                    event: new j(i, s.def, s.instance),
                                    view: i.viewApi,
                                    timeText: r.timeText,
                                    textColor: l.textColor,
                                    backgroundColor: l.backgroundColor,
                                    borderColor: l.borderColor,
                                    isDraggable: !r.disableDragging && Tl(a, i),
                                    isStartResizable:
                                        !r.disableResizing && Rl(a, i),
                                    isEndResizable: !r.disableResizing && _l(a),
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
                                f = (function kl(t) {
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
                                be,
                                {
                                    hookProps: c,
                                    classNames: o.eventClassNames,
                                    content: o.eventContent,
                                    defaultContent: r.defaultContent,
                                    didMount: o.eventDidMount,
                                    willUnmount: o.eventWillUnmount,
                                    elRef: this.elRef,
                                },
                                function (d, p, v, g) {
                                    return r.children(d, f.concat(p), v, g, c);
                                }
                            );
                        }),
                        (e.prototype.componentDidMount = function () {
                            Fi(this.elRef.current, this.props.seg);
                        }),
                        (e.prototype.componentDidUpdate = function (n) {
                            var r = this.props.seg;
                            r !== n.seg && Fi(this.elRef.current, r);
                        }),
                        e
                    );
                })(L),
                Go = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var r = this.props,
                                i = this.context,
                                o = r.seg,
                                s = Qi(
                                    o,
                                    i.options.eventTimeFormat ||
                                        r.defaultTimeFormat,
                                    i,
                                    r.defaultDisplayEventTime,
                                    r.defaultDisplayEventEnd
                                );
                            return h(
                                hr,
                                {
                                    seg: o,
                                    timeText: s,
                                    disableDragging: r.disableDragging,
                                    disableResizing: r.disableResizing,
                                    defaultContent: r.defaultContent || Ed,
                                    isDragging: r.isDragging,
                                    isResizing: r.isResizing,
                                    isDateSelecting: r.isDateSelecting,
                                    isSelected: r.isSelected,
                                    isPast: r.isPast,
                                    isFuture: r.isFuture,
                                    isToday: r.isToday,
                                },
                                function (l, c, f, d, p) {
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
                                            Vi(o, i)
                                        ),
                                        h(
                                            'div',
                                            {
                                                className: 'fc-event-main',
                                                ref: f,
                                                style: { color: p.textColor },
                                            },
                                            d
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
                })(L);
            function Ed(t) {
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
                            t.event.title || h(K, null, '\xa0')
                        )
                    )
                );
            }
            var gr = function (t) {
                    return h(Se.Consumer, null, function (e) {
                        var n = e.options,
                            r = {
                                isAxis: t.isAxis,
                                date: e.dateEnv.toDate(t.date),
                                view: e.viewApi,
                            };
                        return h(
                            be,
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
                wd = Z({ day: 'numeric' }),
                mr = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var r = this.props,
                                i = this.context,
                                o = i.options,
                                a = Zo({
                                    date: r.date,
                                    dateProfile: r.dateProfile,
                                    todayRange: r.todayRange,
                                    showDayNumber: r.showDayNumber,
                                    extraProps: r.extraHookProps,
                                    viewApi: i.viewApi,
                                    dateEnv: i.dateEnv,
                                });
                            return h(
                                fo,
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
                })(L);
            function Zo(t) {
                var e = t.date,
                    n = t.dateEnv,
                    r = ao(e, t.todayRange, null, t.dateProfile);
                return (0, u.pi)(
                    (0, u.pi)(
                        (0, u.pi)({ date: n.toDate(e), view: t.viewApi }, r),
                        {
                            dayNumberText: t.showDayNumber
                                ? n.format(e, wd)
                                : '',
                        }
                    ),
                    t.extraProps
                );
            }
            var yr = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (
                        (n.refineHookProps = zt(Zo)),
                        (n.normalizeClassNames = uo()),
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
                            s = Yn(a, i.theme).concat(
                                a.isDisabled
                                    ? []
                                    : this.normalizeClassNames(
                                          o.dayCellClassNames,
                                          a
                                      )
                            ),
                            l = a.isDisabled ? {} : { 'data-date': Ti(r.date) };
                        return h(
                            er,
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
            })(L);
            function jo(t) {
                return h('div', { className: 'fc-' + t });
            }
            var Yo = function (t) {
                return h(
                    hr,
                    {
                        defaultContent: Dd,
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
            function Dd(t) {
                return (
                    t.event.title &&
                    h('div', { className: 'fc-event-title' }, t.event.title)
                );
            }
            var qo = function (t) {
                return h(Se.Consumer, null, function (e) {
                    var n = e.dateEnv,
                        r = e.options,
                        i = t.date,
                        o = r.weekNumberFormat || t.defaultFormat,
                        a = n.computeWeekNumber(i),
                        s = n.format(i, o);
                    return h(
                        be,
                        {
                            hookProps: { num: a, text: s, date: i },
                            classNames: r.weekNumberClassNames,
                            content: r.weekNumberContent,
                            defaultContent: Sd,
                            didMount: r.weekNumberDidMount,
                            willUnmount: r.weekNumberWillUnmount,
                        },
                        t.children
                    );
                });
            };
            function Sd(t) {
                return t.text;
            }
            var Cd = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.state = { titleId: kt() }),
                            (n.handleRootEl = function (r) {
                                (n.rootEl = r),
                                    n.props.elRef && me(n.props.elRef, r);
                            }),
                            (n.handleDocumentMouseDown = function (r) {
                                var i = li(r);
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
                            return ds(
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
                                        var e = lo(t),
                                            n = t.getBoundingClientRect(),
                                            r = 0,
                                            i = e;
                                        r < i.length;
                                        r++
                                    ) {
                                        var a = io(
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
                                        ? ne(
                                              i,
                                              '.fc-scrollgrid'
                                          ).getBoundingClientRect().top
                                        : s.top,
                                    f = n ? s.right - l.width : s.left;
                                (c = Math.max(c, 10)),
                                    (f = Math.min(
                                        f,
                                        document.documentElement.clientWidth -
                                            10 -
                                            l.width
                                    )),
                                    (f = Math.max(f, 10));
                                var d = a.offsetParent.getBoundingClientRect();
                                ht(a, { top: c - d.top, left: f - d.left });
                            }
                        }),
                        e
                    );
                })(L),
                xd = (function (t) {
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
                                yr,
                                {
                                    date: a,
                                    dateProfile: l,
                                    todayRange: s,
                                    elRef: this.handleRootEl,
                                },
                                function (f, d, p) {
                                    return h(
                                        Cd,
                                        {
                                            elRef: f,
                                            id: o.id,
                                            title: c,
                                            extraClassNames: [
                                                'fc-more-popover',
                                            ].concat(d),
                                            extraAttrs: p,
                                            parentEl: o.parentEl,
                                            alignmentEl: o.alignmentEl,
                                            alignGridTop: o.alignGridTop,
                                            onClose: o.onClose,
                                        },
                                        h(
                                            mr,
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
                })(Ce),
                Jo = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.linkElRef = X()),
                            (n.state = { isPopoverOpen: !1, popoverId: kt() }),
                            (n.handleClick = function (r) {
                                var o = n.props,
                                    a = n.context,
                                    s = a.options.moreLinkClick,
                                    l = Xo(o).start;
                                function c(f) {
                                    var d = f.eventRange,
                                        g = d.range;
                                    return {
                                        event: new j(a, d.def, d.instance),
                                        start: a.dateEnv.toDate(g.start),
                                        end: a.dateEnv.toDate(g.end),
                                        isStart: f.isStart,
                                        isEnd: f.isEnd,
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
                            return h(Se.Consumer, null, function (a) {
                                var s = a.viewApi,
                                    l = a.options,
                                    c = a.calendarApi,
                                    f = l.moreLinkText,
                                    d = i.moreCnt,
                                    p = Xo(i),
                                    v =
                                        'function' == typeof f
                                            ? f.call(c, d)
                                            : '+' + d + ' ' + f,
                                    g = gt(l.moreLinkHint, [d], v),
                                    b = {
                                        num: d,
                                        shortText: '+' + d,
                                        text: v,
                                        view: s,
                                    };
                                return h(
                                    K,
                                    null,
                                    Boolean(i.moreCnt) &&
                                        h(
                                            be,
                                            {
                                                elRef: n.linkElRef,
                                                hookProps: b,
                                                classNames:
                                                    l.moreLinkClassNames,
                                                content: l.moreLinkContent,
                                                defaultContent:
                                                    i.defaultContent || Td,
                                                didMount: l.moreLinkDidMount,
                                                willUnmount:
                                                    l.moreLinkWillUnmount,
                                            },
                                            function (E, m, w, _) {
                                                return i.children(
                                                    E,
                                                    ['fc-more-link'].concat(m),
                                                    w,
                                                    _,
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
                                            xd,
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
                                (this.parentEl = ne(
                                    this.linkElRef.current,
                                    '.fc-view-harness'
                                ));
                        }),
                        e
                    );
                })(L);
            function Td(t) {
                return t.text;
            }
            function Xo(t) {
                if (t.allDayDate)
                    return { start: t.allDayDate, end: ie(t.allDayDate, 1) };
                var e = t.hiddenSegs;
                return { start: Ko(e), end: _d(e) };
            }
            function Ko(t) {
                return t.reduce(Rd).eventRange.range.start;
            }
            function Rd(t, e) {
                return t.eventRange.range.start < e.eventRange.range.start
                    ? t
                    : e;
            }
            function _d(t) {
                return t.reduce(kd).eventRange.range.end;
            }
            function kd(t, e) {
                return t.eventRange.range.end > e.eventRange.range.end ? t : e;
            }
            var Md = (function (t) {
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
                                    ai(function () {
                                        fs(
                                            h(
                                                Kf,
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
                                                            co.Provider,
                                                            {
                                                                value: i.customContentRenderId,
                                                            },
                                                            h(
                                                                qf,
                                                                (0, u.pi)(
                                                                    {
                                                                        isHeightAuto:
                                                                            l,
                                                                        forPrint:
                                                                            c,
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
                                    });
                                } else
                                    i.isRendered &&
                                        ((i.isRendered = !1),
                                        us(i.el),
                                        i.setClassNames([]),
                                        i.setHeight(''));
                            }),
                            (i.el = n),
                            (i.renderRunner = new nr(i.handleRenderRequest)),
                            new _o({
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
                            var n = this;
                            ai(function () {
                                t.prototype.updateSize.call(n);
                            });
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
                            if (!Ie(n, this.currentClassNames)) {
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
                            si(this.el, 'height', n);
                        }),
                        e
                    );
                })(Zl),
                y = N(5e3);
            const Id = Object.prototype.hasOwnProperty;
            function an(t) {
                return Array.isArray(t)
                    ? t.map(an)
                    : t instanceof Date
                    ? new Date(t.valueOf())
                    : 'object' == typeof t && t
                    ? $o(t, an)
                    : t;
            }
            function Nd(t) {
                return (
                    'object' == typeof t &&
                        (Array.isArray(t)
                            ? (t = Array.prototype.slice.call(t))
                            : t && (t = Object.assign({}, t))),
                    t
                );
            }
            function $o(t, e) {
                const n = {};
                for (const r in t) Id.call(t, r) && (n[r] = e(t[r], r));
                return n;
            }
            const ea = {
                headerToolbar: !0,
                footerToolbar: !0,
                events: !0,
                eventSources: !0,
                resources: !0,
            };
            let Pd = (() => {
                    class t {
                        constructor(n) {
                            (this.element = n), (this.optionSnapshot = {});
                        }
                        ngAfterViewInit() {
                            const { deepChangeDetection: n } = this,
                                r = this.options || {};
                            (this.optionSnapshot = $o(r, (i, o) =>
                                n && ea[o] ? an(i) : i
                            )),
                                (this.calendar = new Md(
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
                                        n && ea[l]
                                            ? q()(r[l], c) ||
                                              ((r[l] = an(c)),
                                              (a = !0),
                                              (c = Nd(c)))
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
                                '@charset "UTF-8";.fc-not-allowed,.fc-not-allowed .fc-event{cursor:not-allowed}.fc-unselectable{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.fc{display:flex;flex-direction:column;font-size:1em}.fc,.fc *,.fc :after,.fc :before{box-sizing:border-box}.fc table{border-collapse:collapse;border-spacing:0;font-size:1em}.fc th{text-align:center}.fc td,.fc th{vertical-align:top;padding:0}.fc a[data-navlink]{cursor:pointer}.fc a[data-navlink]:hover{text-decoration:underline}.fc-direction-ltr{direction:ltr;text-align:left}.fc-direction-rtl{direction:rtl;text-align:right}.fc-theme-standard td,.fc-theme-standard th{border:1px solid #ddd;border:1px solid var(--fc-border-color,#ddd)}.fc-liquid-hack td,.fc-liquid-hack th{position:relative}@font-face{font-family:fcicons;src:url("data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBfAAAAC8AAAAYGNtYXAXVtKNAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZgYydxIAAAF4AAAFNGhlYWQUJ7cIAAAGrAAAADZoaGVhB20DzAAABuQAAAAkaG10eCIABhQAAAcIAAAALGxvY2ED4AU6AAAHNAAAABhtYXhwAA8AjAAAB0wAAAAgbmFtZXsr690AAAdsAAABhnBvc3QAAwAAAAAI9AAAACAAAwPAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpBgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6Qb//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAWIAjQKeAskAEwAAJSc3NjQnJiIHAQYUFwEWMjc2NCcCnuLiDQ0MJAz/AA0NAQAMJAwNDcni4gwjDQwM/wANIwz/AA0NDCMNAAAAAQFiAI0CngLJABMAACUBNjQnASYiBwYUHwEHBhQXFjI3AZ4BAA0N/wAMJAwNDeLiDQ0MJAyNAQAMIw0BAAwMDSMM4uINIwwNDQAAAAIA4gC3Ax4CngATACcAACUnNzY0JyYiDwEGFB8BFjI3NjQnISc3NjQnJiIPAQYUHwEWMjc2NCcB87e3DQ0MIw3VDQ3VDSMMDQ0BK7e3DQ0MJAzVDQ3VDCQMDQ3zuLcMJAwNDdUNIwzWDAwNIwy4twwkDA0N1Q0jDNYMDA0jDAAAAgDiALcDHgKeABMAJwAAJTc2NC8BJiIHBhQfAQcGFBcWMjchNzY0LwEmIgcGFB8BBwYUFxYyNwJJ1Q0N1Q0jDA0Nt7cNDQwjDf7V1Q0N1QwkDA0Nt7cNDQwkDLfWDCMN1Q0NDCQMt7gMIw0MDNYMIw3VDQ0MJAy3uAwjDQwMAAADAFUAAAOrA1UAMwBoAHcAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMhMjY1NCYjISIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAAVYRGRkR/qoRGRkRA1UFBAUOCQkVDAsZDf2rDRkLDBUJCA4FBQUFBQUOCQgVDAsZDQJVDRkLDBUJCQ4FBAVVAgECBQMCBwQECAX9qwQJAwQHAwMFAQICAgIBBQMDBwQDCQQCVQUIBAQHAgMFAgEC/oAZEhEZGRESGQAAAAADAFUAAAOrA1UAMwBoAIkAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMzFRQWMzI2PQEzMjY1NCYrATU0JiMiBh0BIyIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAgBkSEhmAERkZEYAZEhIZgBEZGREDVQUEBQ4JCRUMCxkN/asNGQsMFQkIDgUFBQUFBQ4JCBUMCxkNAlUNGQsMFQkJDgUEBVUCAQIFAwIHBAQIBf2rBAkDBAcDAwUBAgICAgEFAwMHBAMJBAJVBQgEBAcCAwUCAQL+gIASGRkSgBkSERmAEhkZEoAZERIZAAABAOIAjQMeAskAIAAAExcHBhQXFjI/ARcWMjc2NC8BNzY0JyYiDwEnJiIHBhQX4uLiDQ0MJAzi4gwkDA0N4uINDQwkDOLiDCQMDQ0CjeLiDSMMDQ3h4Q0NDCMN4uIMIw0MDOLiDAwNIwwAAAABAAAAAQAAa5n0y18PPPUACwQAAAAAANivOVsAAAAA2K85WwAAAAADqwNVAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAOrAAEAAAAAAAAAAAAAAAAAAAALBAAAAAAAAAAAAAAAAgAAAAQAAWIEAAFiBAAA4gQAAOIEAABVBAAAVQQAAOIAAAAAAAoAFAAeAEQAagCqAOoBngJkApoAAQAAAAsAigADAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGZjaWNvbnMAZgBjAGkAYwBvAG4Ac1ZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGZjaWNvbnMAZgBjAGkAYwBvAG4Ac2ZjaWNvbnMAZgBjAGkAYwBvAG4Ac1JlZ3VsYXIAUgBlAGcAdQBsAGEAcmZjaWNvbnMAZgBjAGkAYwBvAG4Ac0ZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=") format("truetype");font-weight:400;font-style:normal}.fc-icon{display:inline-block;width:1em;height:1em;text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;font-family:fcicons!important;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fc-icon-chevron-left:before{content:"\\e900"}.fc-icon-chevron-right:before{content:"\\e901"}.fc-icon-chevrons-left:before{content:"\\e902"}.fc-icon-chevrons-right:before{content:"\\e903"}.fc-icon-minus-square:before{content:"\\e904"}.fc-icon-plus-square:before{content:"\\e905"}.fc-icon-x:before{content:"\\e906"}.fc .fc-button{border-radius:0;overflow:visible;text-transform:none;margin:0;font-family:inherit;font-size:inherit;line-height:inherit}.fc .fc-button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}.fc .fc-button{-webkit-appearance:button}.fc .fc-button:not(:disabled){cursor:pointer}.fc .fc-button::-moz-focus-inner{padding:0;border-style:none}.fc .fc-button{display:inline-block;font-weight:400;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;padding:.4em .65em;font-size:1em;line-height:1.5;border-radius:.25em}.fc .fc-button:hover{text-decoration:none}.fc .fc-button:focus{outline:0;box-shadow:0 0 0 .2rem rgba(44,62,80,.25)}.fc .fc-button:disabled{opacity:.65}.fc .fc-button-primary{color:#fff;color:var(--fc-button-text-color,#fff);background-color:#2c3e50;background-color:var(--fc-button-bg-color,#2c3e50);border-color:#2c3e50;border-color:var(--fc-button-border-color,#2c3e50)}.fc .fc-button-primary:hover{color:#fff;color:var(--fc-button-text-color,#fff);background-color:#1e2b37;background-color:var(--fc-button-hover-bg-color,#1e2b37);border-color:#1a252f;border-color:var(--fc-button-hover-border-color,#1a252f)}.fc .fc-button-primary:disabled{color:#fff;color:var(--fc-button-text-color,#fff);background-color:#2c3e50;background-color:var(--fc-button-bg-color,#2c3e50);border-color:#2c3e50;border-color:var(--fc-button-border-color,#2c3e50)}.fc .fc-button-primary:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button-primary:not(:disabled).fc-button-active,.fc .fc-button-primary:not(:disabled):active{color:#fff;color:var(--fc-button-text-color,#fff);background-color:#1a252f;background-color:var(--fc-button-active-bg-color,#1a252f);border-color:#151e27;border-color:var(--fc-button-active-border-color,#151e27)}.fc .fc-button-primary:not(:disabled).fc-button-active:focus,.fc .fc-button-primary:not(:disabled):active:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button .fc-icon{vertical-align:middle;font-size:1.5em}.fc .fc-button-group{position:relative;display:inline-flex;vertical-align:middle}.fc .fc-button-group>.fc-button{position:relative;flex:1 1 auto}.fc .fc-button-group>.fc-button.fc-button-active,.fc .fc-button-group>.fc-button:active,.fc .fc-button-group>.fc-button:focus,.fc .fc-button-group>.fc-button:hover{z-index:1}.fc-direction-ltr .fc-button-group>.fc-button:not(:first-child){margin-left:-1px;border-top-left-radius:0;border-bottom-left-radius:0}.fc-direction-ltr .fc-button-group>.fc-button:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.fc-direction-rtl .fc-button-group>.fc-button:not(:first-child){margin-right:-1px;border-top-right-radius:0;border-bottom-right-radius:0}.fc-direction-rtl .fc-button-group>.fc-button:not(:last-child){border-top-left-radius:0;border-bottom-left-radius:0}.fc .fc-toolbar{display:flex;justify-content:space-between;align-items:center}.fc .fc-toolbar.fc-header-toolbar{margin-bottom:1.5em}.fc .fc-toolbar.fc-footer-toolbar{margin-top:1.5em}.fc .fc-toolbar-title{font-size:1.75em;margin:0}.fc-direction-ltr .fc-toolbar>*>:not(:first-child){margin-left:.75em}.fc-direction-rtl .fc-toolbar>*>:not(:first-child){margin-right:.75em}.fc-direction-rtl .fc-toolbar-ltr{flex-direction:row-reverse}.fc .fc-scroller{-webkit-overflow-scrolling:touch;position:relative}.fc .fc-scroller-liquid{height:100%}.fc .fc-scroller-liquid-absolute{position:absolute;top:0;right:0;left:0;bottom:0}.fc .fc-scroller-harness{position:relative;overflow:hidden;direction:ltr}.fc .fc-scroller-harness-liquid{height:100%}.fc-direction-rtl .fc-scroller-harness>.fc-scroller{direction:rtl}.fc-theme-standard .fc-scrollgrid{border:1px solid #ddd;border:1px solid var(--fc-border-color,#ddd)}.fc .fc-scrollgrid,.fc .fc-scrollgrid table{width:100%;table-layout:fixed}.fc .fc-scrollgrid table{border-top-style:hidden;border-left-style:hidden;border-right-style:hidden}.fc .fc-scrollgrid{border-collapse:separate;border-right-width:0;border-bottom-width:0}.fc .fc-scrollgrid-liquid{height:100%}.fc .fc-scrollgrid-section,.fc .fc-scrollgrid-section>td,.fc .fc-scrollgrid-section table{height:1px}.fc .fc-scrollgrid-section-liquid>td{height:100%}.fc .fc-scrollgrid-section>*{border-top-width:0;border-left-width:0}.fc .fc-scrollgrid-section-footer>*,.fc .fc-scrollgrid-section-header>*{border-bottom-width:0}.fc .fc-scrollgrid-section-body table,.fc .fc-scrollgrid-section-footer table{border-bottom-style:hidden}.fc .fc-scrollgrid-section-sticky>*{background:#fff;background:var(--fc-page-bg-color,#fff);position:-webkit-sticky;position:sticky;z-index:3}.fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky>*{top:0}.fc .fc-scrollgrid-section-footer.fc-scrollgrid-section-sticky>*{bottom:0}.fc .fc-scrollgrid-sticky-shim{height:1px;margin-bottom:-1px}.fc-sticky{position:-webkit-sticky;position:sticky}.fc .fc-view-harness{flex-grow:1;position:relative}.fc .fc-view-harness-active>.fc-view{position:absolute;top:0;right:0;bottom:0;left:0}.fc .fc-col-header-cell-cushion{display:inline-block;padding:2px 4px}.fc .fc-bg-event,.fc .fc-highlight,.fc .fc-non-business{position:absolute;top:0;left:0;right:0;bottom:0}.fc .fc-non-business{background:hsla(0,0%,84.3%,.3);background:var(--fc-non-business-color,hsla(0,0%,84.3%,.3))}.fc .fc-bg-event{background:#8fdf82;background:var(--fc-bg-event-color,#8fdf82);opacity:.3;opacity:var(--fc-bg-event-opacity,.3)}.fc .fc-bg-event .fc-event-title{margin:.5em;font-size:.85em;font-size:var(--fc-small-font-size,.85em);font-style:italic}.fc .fc-highlight{background:rgba(188,232,241,.3);background:var(--fc-highlight-color,rgba(188,232,241,.3))}.fc .fc-cell-shaded,.fc .fc-day-disabled{background:hsla(0,0%,81.6%,.3);background:var(--fc-neutral-bg-color,hsla(0,0%,81.6%,.3))}a.fc-event,a.fc-event:hover{text-decoration:none}.fc-event.fc-event-draggable,.fc-event[href]{cursor:pointer}.fc-event .fc-event-main{position:relative;z-index:2}.fc-event-dragging:not(.fc-event-selected){opacity:.75}.fc-event-dragging.fc-event-selected{box-shadow:0 2px 7px rgba(0,0,0,.3)}.fc-event .fc-event-resizer{display:none;position:absolute;z-index:4}.fc-event-selected .fc-event-resizer,.fc-event:hover .fc-event-resizer{display:block}.fc-event-selected .fc-event-resizer{border-radius:4px;border-radius:calc(var(--fc-event-resizer-dot-total-width, 8px) / 2);border-width:1px;width:8px;width:var(--fc-event-resizer-dot-total-width,8px);height:8px;height:var(--fc-event-resizer-dot-total-width,8px);border:var(--fc-event-resizer-dot-border-width,1px) solid;border-color:inherit;background:#fff;background:var(--fc-page-bg-color,#fff)}.fc-event-selected .fc-event-resizer:before{content:"";position:absolute;top:-20px;left:-20px;right:-20px;bottom:-20px}.fc-event-selected,.fc-event:focus{box-shadow:0 2px 5px rgba(0,0,0,.2)}.fc-event-selected:before,.fc-event:focus:before{content:"";position:absolute;z-index:3;top:0;left:0;right:0;bottom:0}.fc-event-selected:after,.fc-event:focus:after{content:"";background:rgba(0,0,0,.25);background:var(--fc-event-selected-overlay-color,rgba(0,0,0,.25));position:absolute;z-index:1;top:-1px;left:-1px;right:-1px;bottom:-1px}.fc-h-event{display:block;border:1px solid #3788d8;border:1px solid var(--fc-event-border-color,#3788d8);background-color:#3788d8;background-color:var(--fc-event-bg-color,#3788d8)}.fc-h-event .fc-event-main{color:#fff;color:var(--fc-event-text-color,#fff)}.fc-h-event .fc-event-main-frame{display:flex}.fc-h-event .fc-event-time{max-width:100%;overflow:hidden}.fc-h-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-width:0}.fc-h-event .fc-event-title{display:inline-block;vertical-align:top;left:0;right:0;max-width:100%;overflow:hidden}.fc-h-event.fc-event-selected:before{top:-10px;bottom:-10px}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-start),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-end){border-top-left-radius:0;border-bottom-left-radius:0;border-left-width:0}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-end),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-start){border-top-right-radius:0;border-bottom-right-radius:0;border-right-width:0}.fc-h-event:not(.fc-event-selected) .fc-event-resizer{top:0;bottom:0;width:8px;width:var(--fc-event-resizer-thickness,8px)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end{cursor:w-resize;left:-4px;left:calc(-.5 * var(--fc-event-resizer-thickness, 8px))}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start{cursor:e-resize;right:-4px;right:calc(-.5 * var(--fc-event-resizer-thickness, 8px))}.fc-h-event.fc-event-selected .fc-event-resizer{top:50%;margin-top:-4px;margin-top:calc(-.5 * var(--fc-event-resizer-dot-total-width, 8px))}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-start,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-end{left:-4px;left:calc(-.5 * var(--fc-event-resizer-dot-total-width, 8px))}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-end,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-start{right:-4px;right:calc(-.5 * var(--fc-event-resizer-dot-total-width, 8px))}.fc .fc-popover{position:absolute;z-index:9999;box-shadow:0 2px 6px rgba(0,0,0,.15)}.fc .fc-popover-header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:3px 4px}.fc .fc-popover-title{margin:0 2px}.fc .fc-popover-close{cursor:pointer;opacity:.65;font-size:1.1em}.fc-theme-standard .fc-popover{border:1px solid #ddd;border:1px solid var(--fc-border-color,#ddd);background:#fff;background:var(--fc-page-bg-color,#fff)}.fc-theme-standard .fc-popover-header{background:hsla(0,0%,81.6%,.3);background:var(--fc-neutral-bg-color,hsla(0,0%,81.6%,.3))}:root{--fc-daygrid-event-dot-width:8px}.fc-daygrid-day-events:after,.fc-daygrid-day-events:before,.fc-daygrid-day-frame:after,.fc-daygrid-day-frame:before,.fc-daygrid-event-harness:after,.fc-daygrid-event-harness:before{content:"";clear:both;display:table}.fc .fc-daygrid-body{position:relative;z-index:1}.fc .fc-daygrid-day.fc-day-today{background-color:rgba(255,220,40,.15);background-color:var(--fc-today-bg-color,rgba(255,220,40,.15))}.fc .fc-daygrid-day-frame{position:relative;min-height:100%}.fc .fc-daygrid-day-top{display:flex;flex-direction:row-reverse}.fc .fc-day-other .fc-daygrid-day-top{opacity:.3}.fc .fc-daygrid-day-number{position:relative;z-index:4;padding:4px}.fc .fc-daygrid-day-events{margin-top:1px}.fc .fc-daygrid-body-balanced .fc-daygrid-day-events{position:absolute;left:0;right:0}.fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events{position:relative;min-height:2em}.fc .fc-daygrid-body-natural .fc-daygrid-day-events{margin-bottom:1em}.fc .fc-daygrid-event-harness{position:relative}.fc .fc-daygrid-event-harness-abs{position:absolute;top:0;left:0;right:0}.fc .fc-daygrid-bg-harness{position:absolute;top:0;bottom:0}.fc .fc-daygrid-day-bg .fc-non-business{z-index:1}.fc .fc-daygrid-day-bg .fc-bg-event{z-index:2}.fc .fc-daygrid-day-bg .fc-highlight{z-index:3}.fc .fc-daygrid-event{z-index:6;margin-top:1px}.fc .fc-daygrid-event.fc-event-mirror{z-index:7}.fc .fc-daygrid-day-bottom{font-size:.85em;padding:2px 3px 0}.fc .fc-daygrid-day-bottom:before{content:"";clear:both;display:table}.fc .fc-daygrid-more-link{position:relative;z-index:4;cursor:pointer}.fc .fc-daygrid-week-number{position:absolute;z-index:5;top:0;padding:2px;min-width:1.5em;text-align:center;background-color:hsla(0,0%,81.6%,.3);background-color:var(--fc-neutral-bg-color,hsla(0,0%,81.6%,.3));color:grey;color:var(--fc-neutral-text-color,grey)}.fc .fc-more-popover .fc-popover-body{min-width:220px;padding:10px}.fc-direction-ltr .fc-daygrid-event.fc-event-start,.fc-direction-rtl .fc-daygrid-event.fc-event-end{margin-left:2px}.fc-direction-ltr .fc-daygrid-event.fc-event-end,.fc-direction-rtl .fc-daygrid-event.fc-event-start{margin-right:2px}.fc-direction-ltr .fc-daygrid-week-number{left:0;border-radius:0 0 3px 0}.fc-direction-rtl .fc-daygrid-week-number{right:0;border-radius:0 0 0 3px}.fc-liquid-hack .fc-daygrid-day-frame{position:static}.fc-daygrid-event{position:relative;white-space:nowrap;border-radius:3px;font-size:.85em;font-size:var(--fc-small-font-size,.85em)}.fc-daygrid-block-event .fc-event-time{font-weight:700}.fc-daygrid-block-event .fc-event-time,.fc-daygrid-block-event .fc-event-title{padding:1px}.fc-daygrid-dot-event{display:flex;align-items:center;padding:2px 0}.fc-daygrid-dot-event .fc-event-title{flex-grow:1;flex-shrink:1;min-width:0;overflow:hidden;font-weight:700}.fc-daygrid-dot-event.fc-event-mirror,.fc-daygrid-dot-event:hover{background:rgba(0,0,0,.1)}.fc-daygrid-dot-event.fc-event-selected:before{top:-10px;bottom:-10px}.fc-daygrid-event-dot{margin:0 4px;box-sizing:content-box;width:0;height:0;border:4px solid #3788d8;border:calc(var(--fc-daygrid-event-dot-width, 8px) / 2) solid var(--fc-event-border-color,#3788d8);border-radius:4px;border-radius:calc(var(--fc-daygrid-event-dot-width, 8px) / 2)}.fc-direction-ltr .fc-daygrid-event .fc-event-time{margin-right:3px}.fc-direction-rtl .fc-daygrid-event .fc-event-time{margin-left:3px}.fc-v-event{display:block;border:1px solid #3788d8;border:1px solid var(--fc-event-border-color,#3788d8);background-color:#3788d8;background-color:var(--fc-event-bg-color,#3788d8)}.fc-v-event .fc-event-main{color:#fff;color:var(--fc-event-text-color,#fff);height:100%}.fc-v-event .fc-event-main-frame{height:100%;display:flex;flex-direction:column}.fc-v-event .fc-event-time{flex-grow:0;flex-shrink:0;max-height:100%;overflow:hidden}.fc-v-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-height:0}.fc-v-event .fc-event-title{top:0;bottom:0;max-height:100%;overflow:hidden}.fc-v-event:not(.fc-event-start){border-top-width:0;border-top-left-radius:0;border-top-right-radius:0}.fc-v-event:not(.fc-event-end){border-bottom-width:0;border-bottom-left-radius:0;border-bottom-right-radius:0}.fc-v-event.fc-event-selected:before{left:-10px;right:-10px}.fc-v-event .fc-event-resizer-start{cursor:n-resize}.fc-v-event .fc-event-resizer-end{cursor:s-resize}.fc-v-event:not(.fc-event-selected) .fc-event-resizer{height:8px;height:var(--fc-event-resizer-thickness,8px);left:0;right:0}.fc-v-event:not(.fc-event-selected) .fc-event-resizer-start{top:-4px;top:calc(var(--fc-event-resizer-thickness, 8px) / -2)}.fc-v-event:not(.fc-event-selected) .fc-event-resizer-end{bottom:-4px;bottom:calc(var(--fc-event-resizer-thickness, 8px) / -2)}.fc-v-event.fc-event-selected .fc-event-resizer{left:50%;margin-left:-4px;margin-left:calc(var(--fc-event-resizer-dot-total-width, 8px) / -2)}.fc-v-event.fc-event-selected .fc-event-resizer-start{top:-4px;top:calc(var(--fc-event-resizer-dot-total-width, 8px) / -2)}.fc-v-event.fc-event-selected .fc-event-resizer-end{bottom:-4px;bottom:calc(var(--fc-event-resizer-dot-total-width, 8px) / -2)}.fc .fc-timegrid .fc-daygrid-body{z-index:2}.fc .fc-timegrid-divider{padding:0 0 2px}.fc .fc-timegrid-body{position:relative;z-index:1;min-height:100%}.fc .fc-timegrid-axis-chunk{position:relative}.fc .fc-timegrid-axis-chunk>table,.fc .fc-timegrid-slots{position:relative;z-index:1}.fc .fc-timegrid-slot{height:1.5em;border-bottom:0}.fc .fc-timegrid-slot:empty:before{content:"\xa0"}.fc .fc-timegrid-slot-minor{border-top-style:dotted}.fc .fc-timegrid-slot-label-cushion{display:inline-block;white-space:nowrap}.fc .fc-timegrid-slot-label{vertical-align:middle}.fc .fc-timegrid-axis-cushion,.fc .fc-timegrid-slot-label-cushion{padding:0 4px}.fc .fc-timegrid-axis-frame-liquid{height:100%}.fc .fc-timegrid-axis-frame{overflow:hidden;display:flex;align-items:center;justify-content:flex-end}.fc .fc-timegrid-axis-cushion{max-width:60px;flex-shrink:0}.fc-direction-ltr .fc-timegrid-slot-label-frame{text-align:right}.fc-direction-rtl .fc-timegrid-slot-label-frame{text-align:left}.fc-liquid-hack .fc-timegrid-axis-frame-liquid{height:auto;position:absolute;top:0;right:0;bottom:0;left:0}.fc .fc-timegrid-col.fc-day-today{background-color:rgba(255,220,40,.15);background-color:var(--fc-today-bg-color,rgba(255,220,40,.15))}.fc .fc-timegrid-col-frame{min-height:100%;position:relative}.fc-media-screen.fc-liquid-hack .fc-timegrid-col-frame{height:auto;position:absolute;top:0;right:0;bottom:0;left:0}.fc-media-screen .fc-timegrid-cols{position:absolute;top:0;left:0;right:0;bottom:0}.fc-media-screen .fc-timegrid-cols>table{height:100%}.fc-media-screen .fc-timegrid-col-bg,.fc-media-screen .fc-timegrid-col-events,.fc-media-screen .fc-timegrid-now-indicator-container{position:absolute;top:0;left:0;right:0}.fc .fc-timegrid-col-bg{z-index:2}.fc .fc-timegrid-col-bg .fc-non-business{z-index:1}.fc .fc-timegrid-col-bg .fc-bg-event{z-index:2}.fc .fc-timegrid-col-bg .fc-highlight{z-index:3}.fc .fc-timegrid-bg-harness{position:absolute;left:0;right:0}.fc .fc-timegrid-col-events{z-index:3}.fc .fc-timegrid-now-indicator-container{bottom:0;overflow:hidden}.fc-direction-ltr .fc-timegrid-col-events{margin:0 2.5% 0 2px}.fc-direction-rtl .fc-timegrid-col-events{margin:0 2px 0 2.5%}.fc-timegrid-event-harness{position:absolute}.fc-timegrid-event-harness>.fc-timegrid-event{position:absolute;top:0;bottom:0;left:0;right:0}.fc-timegrid-event-harness-inset .fc-timegrid-event,.fc-timegrid-event.fc-event-mirror,.fc-timegrid-more-link{box-shadow:0 0 0 1px #fff;box-shadow:0 0 0 1px var(--fc-page-bg-color,#fff)}.fc-timegrid-event,.fc-timegrid-more-link{font-size:.85em;font-size:var(--fc-small-font-size,.85em);border-radius:3px}.fc-timegrid-event{margin-bottom:1px}.fc-timegrid-event .fc-event-main{padding:1px 1px 0}.fc-timegrid-event .fc-event-time{white-space:nowrap;font-size:.85em;font-size:var(--fc-small-font-size,.85em);margin-bottom:1px}.fc-timegrid-event-short .fc-event-main-frame{flex-direction:row;overflow:hidden}.fc-timegrid-event-short .fc-event-time:after{content:"\xa0-\xa0"}.fc-timegrid-event-short .fc-event-title{font-size:.85em;font-size:var(--fc-small-font-size,.85em)}.fc-timegrid-more-link{position:absolute;z-index:9999;color:inherit;color:var(--fc-more-link-text-color,inherit);background:#d0d0d0;background:var(--fc-more-link-bg-color,#d0d0d0);cursor:pointer;margin-bottom:1px}.fc-timegrid-more-link-inner{padding:3px 2px;top:0}.fc-direction-ltr .fc-timegrid-more-link{right:0}.fc-direction-rtl .fc-timegrid-more-link{left:0}.fc .fc-timegrid-now-indicator-line{position:absolute;z-index:4;left:0;right:0;border:0 solid red;border-color:var(--fc-now-indicator-color,red);border-top:1px solid var(--fc-now-indicator-color,red)}.fc .fc-timegrid-now-indicator-arrow{position:absolute;z-index:4;margin-top:-5px;border-style:solid;border-color:red;border-color:var(--fc-now-indicator-color,red)}.fc-direction-ltr .fc-timegrid-now-indicator-arrow{left:0;border-width:5px 0 5px 6px;border-top-color:transparent;border-bottom-color:transparent}.fc-direction-rtl .fc-timegrid-now-indicator-arrow{right:0;border-width:5px 6px 5px 0;border-top-color:transparent;border-bottom-color:transparent}:root{--fc-list-event-dot-width:10px;--fc-list-event-hover-bg-color:#f5f5f5}.fc-theme-standard .fc-list{border:1px solid #ddd;border:1px solid var(--fc-border-color,#ddd)}.fc .fc-list-empty{background-color:hsla(0,0%,81.6%,.3);background-color:var(--fc-neutral-bg-color,hsla(0,0%,81.6%,.3));height:100%;display:flex;justify-content:center;align-items:center}.fc .fc-list-empty-cushion{margin:5em 0}.fc .fc-list-table{width:100%;border-style:hidden}.fc .fc-list-table tr>*{border-left:0;border-right:0}.fc .fc-list-sticky .fc-list-day>*{position:-webkit-sticky;position:sticky;top:0;background:#fff;background:var(--fc-page-bg-color,#fff)}.fc .fc-list-table thead{position:absolute;left:-10000px}.fc .fc-list-table tbody>tr:first-child th{border-top:0}.fc .fc-list-table th{padding:0}.fc .fc-list-day-cushion,.fc .fc-list-table td{padding:8px 14px}.fc .fc-list-day-cushion:after{content:"";clear:both;display:table}.fc-theme-standard .fc-list-day-cushion{background-color:hsla(0,0%,81.6%,.3);background-color:var(--fc-neutral-bg-color,hsla(0,0%,81.6%,.3))}.fc-direction-ltr .fc-list-day-text,.fc-direction-rtl .fc-list-day-side-text{float:left}.fc-direction-ltr .fc-list-day-side-text,.fc-direction-rtl .fc-list-day-text{float:right}.fc-direction-ltr .fc-list-table .fc-list-event-graphic{padding-right:0}.fc-direction-rtl .fc-list-table .fc-list-event-graphic{padding-left:0}.fc .fc-list-event.fc-event-forced-url{cursor:pointer}.fc .fc-list-event:hover td{background-color:#f5f5f5;background-color:var(--fc-list-event-hover-bg-color,#f5f5f5)}.fc .fc-list-event-graphic,.fc .fc-list-event-time{white-space:nowrap;width:1px}.fc .fc-list-event-dot{display:inline-block;box-sizing:content-box;width:0;height:0;border:5px solid #3788d8;border:calc(var(--fc-list-event-dot-width, 10px) / 2) solid var(--fc-event-border-color,#3788d8);border-radius:5px;border-radius:calc(var(--fc-list-event-dot-width, 10px) / 2)}.fc .fc-list-event-title a{color:inherit;text-decoration:none}.fc .fc-list-event.fc-event-forced-url:hover a{text-decoration:underline}.fc-theme-bootstrap a:not([href]){color:inherit}.fc .fc-event,.fc .fc-scrollgrid table tr{-moz-column-break-inside:avoid;break-inside:avoid}.fc-media-print{display:block;max-width:100%}.fc-media-print .fc-bg-event,.fc-media-print .fc-non-business,.fc-media-print .fc-timegrid-axis-chunk,.fc-media-print .fc-timegrid-slots,.fc-media-print .fc-timeline-slots{display:none}.fc-media-print .fc-h-event,.fc-media-print .fc-toolbar button,.fc-media-print .fc-v-event{color:#000!important;background:#fff!important}.fc-media-print .fc-event,.fc-media-print .fc-event-main{color:#000!important}.fc-media-print .fc-timegrid-event{margin:.5em 0}.fc .fc-timeline-body{min-height:100%;position:relative;z-index:1}.fc .fc-timeline-slots{position:absolute;z-index:1;top:0;bottom:0}.fc .fc-timeline-slots>table{height:100%}.fc .fc-timeline-slot-minor{border-style:dotted}.fc .fc-timeline-slot-frame{display:flex;align-items:center;justify-content:center}.fc .fc-timeline-header-row-chrono .fc-timeline-slot-frame{justify-content:flex-start}.fc .fc-timeline-header-row:last-child .fc-timeline-slot-frame{overflow:hidden}.fc .fc-timeline-slot-cushion{padding:4px 5px;white-space:nowrap}.fc-direction-ltr .fc-timeline-slot{border-right:0!important}.fc-direction-rtl .fc-timeline-slot{border-left:0!important}.fc .fc-timeline-now-indicator-container{position:absolute;z-index:4;top:0;bottom:0;left:0;right:0;width:0}.fc .fc-timeline-now-indicator-arrow,.fc .fc-timeline-now-indicator-line{position:absolute;top:0;border-style:solid;border-color:red;border-color:var(--fc-now-indicator-color,red)}.fc .fc-timeline-now-indicator-arrow{margin:0 -6px;border-width:6px 5px 0;border-left-color:transparent;border-right-color:transparent}.fc .fc-timeline-now-indicator-line{margin:0 -1px;bottom:0;border-width:0 0 0 1px}.fc .fc-timeline-events{position:relative;z-index:3;width:0}.fc .fc-timeline-event-harness,.fc .fc-timeline-more-link{position:absolute;top:0}.fc-timeline-event{z-index:1}.fc-timeline-event.fc-event-mirror{z-index:2}.fc-timeline-event{position:relative;display:flex;align-items:center;border-radius:0;padding:2px 1px;margin-bottom:1px;font-size:.85em;font-size:var(--fc-small-font-size,.85em)}.fc-timeline-event .fc-event-main{flex-grow:1;flex-shrink:1;min-width:0}.fc-timeline-event .fc-event-time{font-weight:700}.fc-timeline-event .fc-event-time,.fc-timeline-event .fc-event-title{white-space:nowrap;padding:0 2px}.fc-direction-ltr .fc-timeline-event.fc-event-end,.fc-direction-ltr .fc-timeline-more-link{margin-right:1px}.fc-direction-rtl .fc-timeline-event.fc-event-end,.fc-direction-rtl .fc-timeline-more-link{margin-left:1px}.fc-timeline-overlap-disabled .fc-timeline-event{padding-top:5px;padding-bottom:5px;margin-bottom:0}.fc-timeline-event:not(.fc-event-end):after,.fc-timeline-event:not(.fc-event-start):before{content:"";flex-grow:0;flex-shrink:0;opacity:.5;width:0;height:0;margin:0 1px;border-color:transparent #000;border-style:solid;border-width:5px}.fc-direction-ltr .fc-timeline-event:not(.fc-event-start):before,.fc-direction-rtl .fc-timeline-event:not(.fc-event-end):after{border-left:0}.fc-direction-ltr .fc-timeline-event:not(.fc-event-end):after,.fc-direction-rtl .fc-timeline-event:not(.fc-event-start):before{border-right:0}.fc-timeline-more-link{font-size:.85em;font-size:var(--fc-small-font-size,.85em);color:inherit;color:var(--fc-more-link-text-color,inherit);background:#d0d0d0;background:var(--fc-more-link-bg-color,#d0d0d0);padding:1px;cursor:pointer}.fc-timeline-more-link-inner{display:inline-block;left:0;right:0;padding:2px}.fc .fc-timeline-bg{position:absolute;z-index:2;top:0;bottom:0;width:0;left:0;right:0}.fc .fc-timeline-bg .fc-non-business{z-index:1}.fc .fc-timeline-bg .fc-bg-event{z-index:2}.fc .fc-timeline-bg .fc-highlight{z-index:3}.fc .fc-timeline-bg-harness{position:absolute;top:0;bottom:0}.fc .fc-resource-timeline-divider{width:3px;cursor:col-resize}.fc .fc-resource-group{font-weight:inherit;text-align:inherit}.fc .fc-resource-timeline .fc-resource-group:not([rowspan]){background:hsla(0,0%,81.6%,.3);background:var(--fc-neutral-bg-color,hsla(0,0%,81.6%,.3))}.fc .fc-timeline-lane-frame{position:relative}.fc .fc-timeline-overlap-enabled .fc-timeline-lane-frame .fc-timeline-events{box-sizing:content-box;padding-bottom:10px}.fc-timeline-body-expandrows td.fc-timeline-lane{position:relative}.fc-timeline-body-expandrows .fc-timeline-lane-frame{position:static}.fc-datagrid-cell-frame-liquid{height:100%}.fc-liquid-hack .fc-datagrid-cell-frame-liquid{height:auto;position:absolute;top:0;right:0;bottom:0;left:0}.fc .fc-datagrid-header .fc-datagrid-cell-frame{position:relative;display:flex;justify-content:flex-start;align-items:center}.fc .fc-datagrid-cell-resizer{position:absolute;z-index:1;top:0;bottom:0;width:5px;cursor:col-resize}.fc .fc-datagrid-cell-cushion{padding:8px;white-space:nowrap;overflow:hidden}.fc .fc-datagrid-expander{cursor:pointer;opacity:.65}.fc .fc-datagrid-expander .fc-icon{display:inline-block;width:1em}.fc .fc-datagrid-expander-placeholder{cursor:auto}.fc .fc-resource-timeline-flat .fc-datagrid-expander-placeholder{display:none}.fc-direction-ltr .fc-datagrid-cell-resizer{right:-3px}.fc-direction-rtl .fc-datagrid-cell-resizer{left:-3px}.fc-direction-ltr .fc-datagrid-expander{margin-right:3px}.fc-direction-rtl .fc-datagrid-expander{margin-left:3px}',
                            ],
                            encapsulation: 2,
                        })),
                        t
                    );
                })(),
                ta = (() => {
                    class t {
                        static registerPlugins(n) {
                            Ro.push(...n);
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
            tn.touchMouseIgnoreWait = 500;
            var Ar = 0,
                sn = 0,
                Er = !1,
                wr = (function () {
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
                                    (function Bd(t) {
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
                                        (function Od() {
                                            (Ar += 1),
                                                setTimeout(function () {
                                                    Ar -= 1;
                                                }, tn.touchMouseIgnoreWait);
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
                            (this.emitter = new Kt()),
                            e.addEventListener(
                                'mousedown',
                                this.handleMouseDown
                            ),
                            e.addEventListener(
                                'touchstart',
                                this.handleTouchStart,
                                { passive: !0 }
                            ),
                            (function Hd() {
                                1 === (sn += 1) &&
                                    window.addEventListener('touchmove', na, {
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
                                (function zd() {
                                    (sn -= 1) ||
                                        window.removeEventListener(
                                            'touchmove',
                                            na,
                                            { passive: !1 }
                                        );
                                })();
                        }),
                        (t.prototype.tryStart = function (e) {
                            var n = this.querySubjectEl(e);
                            return !(
                                !n ||
                                (this.handleSelector &&
                                    !ne(e.target, this.handleSelector)) ||
                                ((this.subjectEl = n),
                                (this.isDragging = !0),
                                (this.wasTouchScroll = !1),
                                0)
                            );
                        }),
                        (t.prototype.cleanup = function () {
                            (Er = !1),
                                (this.isDragging = !1),
                                (this.subjectEl = null),
                                this.destroyScrollWatch();
                        }),
                        (t.prototype.querySubjectEl = function (e) {
                            return this.selector
                                ? ne(e.target, this.selector)
                                : this.containerEl;
                        }),
                        (t.prototype.shouldIgnoreMouse = function () {
                            return Ar || this.isTouchDragging;
                        }),
                        (t.prototype.cancelTouchScroll = function () {
                            this.isDragging && (Er = !0);
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
            function na(t) {
                Er && t.preventDefault();
            }
            var Fd = (function () {
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
                                ht(r, { left: i.left, top: i.top }),
                                (function ms(t, e) {
                                    var n = function (r) {
                                        e(r),
                                            ui.forEach(function (i) {
                                                t.removeEventListener(i, n);
                                            });
                                    };
                                    ui.forEach(function (r) {
                                        t.addEventListener(r, n);
                                    });
                                })(r, function () {
                                    (r.style.transition = ''), e();
                                });
                        }),
                        (t.prototype.cleanup = function () {
                            this.mirrorEl &&
                                (Dn(this.mirrorEl), (this.mirrorEl = null)),
                                (this.sourceEl = null);
                        }),
                        (t.prototype.updateElPosition = function () {
                            this.sourceEl &&
                                this.isVisible &&
                                ht(this.getMirrorEl(), {
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
                                    ht(n, {
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
                ra = (function (t) {
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
                })(Kn),
                ia = (function (t) {
                    function e(n, r) {
                        return t.call(this, new Sc(n), r) || this;
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
                })(ra),
                Ud = (function (t) {
                    function e(n) {
                        return t.call(this, new Cc(), n) || this;
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
                })(ra),
                oa =
                    'function' == typeof performance
                        ? performance.now
                        : Date.now,
                Ld = (function () {
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
                                        var r = oa();
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
                                        this.requestAnimation(oa()));
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
                                    a = 0,
                                    s = this.scrollCaches || [];
                                a < s.length;
                                a++
                            ) {
                                var l = s[a],
                                    c = l.clientRect,
                                    f = e - c.left,
                                    d = c.right - e,
                                    p = n - c.top,
                                    v = c.bottom - n;
                                f >= 0 &&
                                    d >= 0 &&
                                    p >= 0 &&
                                    v >= 0 &&
                                    (p <= r &&
                                        this.everMovedUp &&
                                        l.canScrollUp() &&
                                        (!i || i.distance > p) &&
                                        (i = {
                                            scrollCache: l,
                                            name: 'top',
                                            distance: p,
                                        }),
                                    v <= r &&
                                        this.everMovedDown &&
                                        l.canScrollDown() &&
                                        (!i || i.distance > v) &&
                                        (i = {
                                            scrollCache: l,
                                            name: 'bottom',
                                            distance: v,
                                        }),
                                    f <= r &&
                                        this.everMovedLeft &&
                                        l.canScrollLeft() &&
                                        (!i || i.distance > f) &&
                                        (i = {
                                            scrollCache: l,
                                            name: 'left',
                                            distance: f,
                                        }),
                                    d <= r &&
                                        this.everMovedRight &&
                                        l.canScrollRight() &&
                                        (!i || i.distance > d) &&
                                        (i = {
                                            scrollCache: l,
                                            name: 'right',
                                            distance: d,
                                        }));
                            }
                            return i;
                        }),
                        (t.prototype.buildCaches = function (e) {
                            return this.queryScrollEls(e).map(function (n) {
                                return n === window
                                    ? new Ud(!1)
                                    : new ia(n, !1);
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
                                              ci(e).querySelectorAll(o)
                                          )
                                      );
                            }
                            return n;
                        }),
                        t
                    );
                })(),
                rt = (function (t) {
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
                                                Mt
                                            );
                                    })(document.body),
                                    (function As(t) {
                                        t.addEventListener('contextmenu', Mt);
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
                                            f = a.deltaY;
                                        c * c + f * f >= s * s &&
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
                                                Mt
                                            );
                                    })(document.body),
                                    (function Es(t) {
                                        t.removeEventListener(
                                            'contextmenu',
                                            Mt
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
                        var o = (i.pointer = new wr(n));
                        return (
                            o.emitter.on('pointerdown', i.onPointerDown),
                            o.emitter.on('pointermove', i.onPointerMove),
                            o.emitter.on('pointerup', i.onPointerUp),
                            r && (o.selector = r),
                            (i.mirror = new Fd()),
                            (i.autoScroller = new Ld()),
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
                })(Io),
                Qd = (function () {
                    function t(e) {
                        (this.origRect = Xn(e)),
                            (this.scrollCaches = lo(e).map(function (n) {
                                return new ia(n, !0);
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
                                    !Wd(a.getEventTarget()) &&
                                    !ic(r, a.clientRect)
                                )
                                    return !1;
                            }
                            return !0;
                        }),
                        t
                    );
                })();
            function Wd(t) {
                var e = t.tagName;
                return 'HTML' === e || 'BODY' === e;
            }
            var Dt = (function () {
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
                        (this.emitter = new Kt());
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
                            })(r, (o = Xn(i))));
                        var a = (this.initialHit = this.queryHitForOffset(
                            r.left,
                            r.top
                        ));
                        if (a) {
                            if (this.useSubjectCenter && o) {
                                var s = io(o, a.rect);
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
                        (n || !ln(this.movingHit, r)) &&
                            ((this.movingHit = r),
                            this.emitter.trigger('hitupdate', r, !1, e));
                    }),
                    (t.prototype.prepareHits = function () {
                        this.offsetTrackers = Ee(
                            this.droppableStore,
                            function (e) {
                                return e.component.prepareHits(), new Qd(e.el);
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
                                var f = c.computeLeft(),
                                    d = c.computeTop(),
                                    p = e - f,
                                    v = n - d,
                                    g = c.origRect,
                                    b = g.right - g.left,
                                    E = g.bottom - g.top;
                                if (p >= 0 && p < b && v >= 0 && v < E) {
                                    var m = l.queryHit(p, v, b, E);
                                    m &&
                                        qt(
                                            m.dateProfile.activeRange,
                                            m.dateSpan.range
                                        ) &&
                                        (!a || m.layer > a.layer) &&
                                        ((m.componentId = s),
                                        (m.context = l.context),
                                        (m.rect.left += f),
                                        (m.rect.right += f),
                                        (m.rect.top += d),
                                        (m.rect.bottom += d),
                                        (a = m));
                                }
                            }
                        }
                        return a;
                    }),
                    t
                );
            })();
            function ln(t, e) {
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
            function Dr(t, e) {
                for (
                    var n = {}, r = 0, i = e.pluginHooks.datePointTransforms;
                    r < i.length;
                    r++
                )
                    (0, u.pi)(n, (0, i[r])(t, e));
                return (
                    (0, u.pi)(
                        n,
                        (function Vd(t, e) {
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
            var Gd = (function (t) {
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
                                        f = l.finalHit;
                                    if (c && f && ln(c, f)) {
                                        var d = a.context,
                                            p = (0, u.pi)(
                                                (0, u.pi)(
                                                    {},
                                                    Dr(c.dateSpan, d)
                                                ),
                                                {
                                                    dayEl: c.dayEl,
                                                    jsEvent: o.origEvent,
                                                    view:
                                                        d.viewApi ||
                                                        d.calendarApi.view,
                                                }
                                            );
                                        d.emitter.trigger('dateClick', p);
                                    }
                                }
                            }),
                            (r.dragging = new rt(n.el)),
                            (r.dragging.autoScroller.isEnabled = !1);
                        var i = (r.hitDragging = new Dt(r.dragging, lr(n)));
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
                })(nt),
                Zd = (function (t) {
                    function e(n) {
                        var r = t.call(this, n) || this;
                        (r.dragSelection = null),
                            (r.handlePointerDown = function (l) {
                                var f = r.component,
                                    d = r.dragging,
                                    v =
                                        f.context.options.selectable &&
                                        f.isValidDateDownEl(l.origEvent.target);
                                d.setIgnoreMove(!v),
                                    (d.delay = l.isTouch
                                        ? (function jd(t) {
                                              var e = t.context.options,
                                                  n = e.selectLongPressDelay;
                                              return (
                                                  null == n &&
                                                      (n = e.longPressDelay),
                                                  n
                                              );
                                          })(f)
                                        : null);
                            }),
                            (r.handleDragStart = function (l) {
                                r.component.context.calendarApi.unselect(l);
                            }),
                            (r.handleHitUpdate = function (l, c) {
                                var f = r.component.context,
                                    d = null,
                                    p = !1;
                                if (l) {
                                    var v = r.hitDragging.initialHit;
                                    (l.componentId === v.componentId &&
                                        r.isHitComboAllowed &&
                                        !r.isHitComboAllowed(v, l)) ||
                                        (d = (function Yd(t, e, n) {
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
                                                var f = (0, l[s])(t, e);
                                                if (!1 === f) return null;
                                                f && (0, u.pi)(a, f);
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
                                            f.pluginHooks
                                                .dateSelectionTransformers
                                        )),
                                        (!d ||
                                            !(function id(t, e, n) {
                                                return (
                                                    !!qt(
                                                        e.validRange,
                                                        t.range
                                                    ) &&
                                                    Lo({ dateSelection: t }, n)
                                                );
                                            })(d, l.dateProfile, f)) &&
                                            ((p = !0), (d = null));
                                }
                                d
                                    ? f.dispatch({
                                          type: 'SELECT_DATES',
                                          selection: d,
                                      })
                                    : c ||
                                      f.dispatch({ type: 'UNSELECT_DATES' }),
                                    p ? It() : Nt(),
                                    c || (r.dragSelection = d);
                            }),
                            (r.handlePointerUp = function (l) {
                                r.dragSelection &&
                                    (ji(
                                        r.dragSelection,
                                        l,
                                        r.component.context
                                    ),
                                    (r.dragSelection = null));
                            });
                        var o = n.component.context.options,
                            a = (r.dragging = new rt(n.el));
                        (a.touchScrollAllowed = !1),
                            (a.minDistance = o.selectMinDistance || 0),
                            (a.autoScroller.isEnabled = o.dragScroll);
                        var s = (r.hitDragging = new Dt(r.dragging, lr(n)));
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
                })(nt),
                aa = (function (t) {
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
                                    d = r.component,
                                    p = r.dragging,
                                    v = p.mirror,
                                    g = d.context.options,
                                    b = d.context;
                                r.subjectEl = l.subjectEl;
                                var E = (r.subjectSeg = tt(l.subjectEl)),
                                    w = (r.eventRange = E.eventRange).instance
                                        .instanceId;
                                (r.relevantEvents = Pn(
                                    b.getCurrentData().eventStore,
                                    w
                                )),
                                    (p.minDistance = l.isTouch
                                        ? 0
                                        : g.eventDragMinDistance),
                                    (p.delay =
                                        l.isTouch &&
                                        w !== d.props.eventSelection
                                            ? (function Jd(t) {
                                                  var e = t.context.options,
                                                      n = e.eventLongPressDelay;
                                                  return (
                                                      null == n &&
                                                          (n =
                                                              e.longPressDelay),
                                                      n
                                                  );
                                              })(d)
                                            : null),
                                    (v.parentNode = g.fixedMirrorParent
                                        ? g.fixedMirrorParent
                                        : ne(c, '.fc')),
                                    (v.revertDuration = g.dragRevertDuration);
                                var _ =
                                    d.isValidSegDownEl(c) &&
                                    !ne(c, '.fc-event-resizer');
                                p.setIgnoreMove(!_),
                                    (r.isDragging =
                                        _ &&
                                        l.subjectEl.classList.contains(
                                            'fc-event-draggable'
                                        ));
                            }),
                            (r.handleDragStart = function (l) {
                                var c = r.component.context,
                                    f = r.eventRange,
                                    d = f.instance.instanceId;
                                l.isTouch
                                    ? d !== r.component.props.eventSelection &&
                                      c.dispatch({
                                          type: 'SELECT_EVENT',
                                          eventInstanceId: d,
                                      })
                                    : c.dispatch({ type: 'UNSELECT_EVENT' }),
                                    r.isDragging &&
                                        (c.calendarApi.unselect(l),
                                        c.emitter.trigger('eventDragStart', {
                                            el: r.subjectEl,
                                            event: new j(c, f.def, f.instance),
                                            jsEvent: l.origEvent,
                                            view: c.viewApi,
                                        }));
                            }),
                            (r.handleHitUpdate = function (l, c) {
                                if (r.isDragging) {
                                    var f = r.relevantEvents,
                                        d = r.hitDragging.initialHit,
                                        p = r.component.context,
                                        v = null,
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
                                    if (l) {
                                        var w = (v = l.context).options;
                                        p === v || (w.editable && w.droppable)
                                            ? ((g = (function qd(t, e, n) {
                                                  var r = t.dateSpan,
                                                      i = e.dateSpan,
                                                      o = r.range.start,
                                                      a = i.range.start,
                                                      s = {};
                                                  r.allDay !== i.allDay &&
                                                      ((s.allDay = i.allDay),
                                                      (s.hasEnd =
                                                          e.context.options.allDayMaintainDuration),
                                                      i.allDay && (o = V(o)));
                                                  var l = $e(
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
                                                          f = 0,
                                                          d = n;
                                                      f < d.length;
                                                      f++
                                                  )
                                                      (0, d[f])(c, t, e);
                                                  return c;
                                              })(
                                                  d,
                                                  l,
                                                  v.getCurrentData().pluginHooks
                                                      .eventDragMutationMassagers
                                              )),
                                              g &&
                                                  ((b = Vn(
                                                      f,
                                                      v.getCurrentData()
                                                          .eventUiBases,
                                                      g,
                                                      v
                                                  )),
                                                  (m.mutatedEvents = b),
                                                  dr(m, l.dateProfile, v) ||
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
                                        E ? It() : Nt(),
                                        c ||
                                            (p === v && ln(d, l) && (g = null),
                                            r.dragging.setMirrorNeedsRevert(!g),
                                            r.dragging.setMirrorIsVisible(
                                                !l ||
                                                    !ci(
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
                                        f = c.viewApi,
                                        p = r.receivingContext,
                                        v = r.validMutation,
                                        g = r.eventRange.def,
                                        b = r.eventRange.instance,
                                        E = new j(c, g, b),
                                        m = r.relevantEvents,
                                        w = r.mutatedRelevantEvents,
                                        _ = r.hitDragging.finalHit;
                                    if (
                                        (r.clearDrag(),
                                        c.emitter.trigger('eventDragStop', {
                                            el: r.subjectEl,
                                            event: E,
                                            jsEvent: l.origEvent,
                                            view: f,
                                        }),
                                        v)
                                    ) {
                                        if (p === c) {
                                            var R = new j(
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
                                                var F = {
                                                        oldEvent: E,
                                                        event: R,
                                                        relatedEvents: Le(
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
                                                    z = {},
                                                    Q = 0,
                                                    P =
                                                        c.getCurrentData()
                                                            .pluginHooks
                                                            .eventDropTransformers;
                                                Q < P.length;
                                                Q++
                                            )
                                                (0, u.pi)(z, (0, P[Q])(v, c));
                                            c.emitter.trigger(
                                                'eventDrop',
                                                (0, u.pi)(
                                                    (0, u.pi)(
                                                        (0, u.pi)({}, F),
                                                        z
                                                    ),
                                                    {
                                                        el: l.subjectEl,
                                                        delta: v.datesDelta,
                                                        jsEvent: l.origEvent,
                                                        view: f,
                                                    }
                                                )
                                            ),
                                                c.emitter.trigger(
                                                    'eventChange',
                                                    F
                                                );
                                        } else if (p) {
                                            var W = {
                                                event: E,
                                                relatedEvents: Le(m, c, b),
                                                revert: function () {
                                                    c.dispatch({
                                                        type: 'MERGE_EVENTS',
                                                        eventStore: m,
                                                    });
                                                },
                                            };
                                            c.emitter.trigger(
                                                'eventLeave',
                                                (0, u.pi)((0, u.pi)({}, W), {
                                                    draggedEl: l.subjectEl,
                                                    view: f,
                                                })
                                            ),
                                                c.dispatch({
                                                    type: 'REMOVE_EVENTS',
                                                    eventStore: m,
                                                }),
                                                c.emitter.trigger(
                                                    'eventRemove',
                                                    W
                                                );
                                            var oe = w.instances[b.instanceId],
                                                at = new j(
                                                    p,
                                                    w.defs[g.defId],
                                                    oe
                                                );
                                            p.dispatch({
                                                type: 'MERGE_EVENTS',
                                                eventStore: w,
                                            });
                                            var st = {
                                                event: at,
                                                relatedEvents: Le(w, p, oe),
                                                revert: function () {
                                                    p.dispatch({
                                                        type: 'REMOVE_EVENTS',
                                                        eventStore: w,
                                                    });
                                                },
                                            };
                                            p.emitter.trigger('eventAdd', st),
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
                                                            Dr(_.dateSpan, p)
                                                        ),
                                                        {
                                                            draggedEl:
                                                                l.subjectEl,
                                                            jsEvent:
                                                                l.origEvent,
                                                            view: _.context
                                                                .viewApi,
                                                        }
                                                    )
                                                ),
                                                p.emitter.trigger(
                                                    'eventReceive',
                                                    (0, u.pi)(
                                                        (0, u.pi)({}, st),
                                                        {
                                                            draggedEl:
                                                                l.subjectEl,
                                                            view: _.context
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
                            a = (r.dragging = new rt(n.el));
                        (a.pointer.selector = e.SELECTOR),
                            (a.touchScrollAllowed = !1),
                            (a.autoScroller.isEnabled = o.dragScroll);
                        var s = (r.hitDragging = new Dt(r.dragging, en));
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
                })(nt),
                Xd = (function (t) {
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
                                    f = tt(r.querySegEl(s)),
                                    d = (r.eventRange = f.eventRange);
                                (r.dragging.minDistance =
                                    l.context.options.eventDragMinDistance),
                                    r.dragging.setIgnoreMove(
                                        !r.component.isValidSegDownEl(
                                            s.origEvent.target
                                        ) ||
                                            (s.isTouch &&
                                                r.component.props
                                                    .eventSelection !==
                                                    d.instance.instanceId)
                                    );
                            }),
                            (r.handleDragStart = function (s) {
                                var l = r.component.context,
                                    c = r.eventRange;
                                r.relevantEvents = Pn(
                                    l.getCurrentData().eventStore,
                                    r.eventRange.instance.instanceId
                                );
                                var f = r.querySegEl(s);
                                (r.draggingSegEl = f),
                                    (r.draggingSeg = tt(f)),
                                    l.calendarApi.unselect(),
                                    l.emitter.trigger('eventResizeStart', {
                                        el: f,
                                        event: new j(l, c.def, c.instance),
                                        jsEvent: s.origEvent,
                                        view: l.viewApi,
                                    });
                            }),
                            (r.handleHitUpdate = function (s, l, c) {
                                var f = r.component.context,
                                    d = r.relevantEvents,
                                    p = r.hitDragging.initialHit,
                                    v = r.eventRange.instance,
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
                                s &&
                                    ((s.componentId === p.componentId &&
                                        r.isHitComboAllowed &&
                                        !r.isHitComboAllowed(p, s)) ||
                                        (g = (function Kd(t, e, n, r) {
                                            var i = t.context.dateEnv,
                                                s = $e(
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
                                        ((b = Vn(
                                            d,
                                            f.getCurrentData().eventUiBases,
                                            g,
                                            f
                                        )),
                                        (m.mutatedEvents = b),
                                        dr(m, s.dateProfile, f) ||
                                            ((E = !0),
                                            (g = null),
                                            (b = null),
                                            (m.mutatedEvents = null))),
                                    f.dispatch(
                                        b
                                            ? {
                                                  type: 'SET_EVENT_RESIZE',
                                                  state: m,
                                              }
                                            : { type: 'UNSET_EVENT_RESIZE' }
                                    ),
                                    E ? It() : Nt(),
                                    l ||
                                        (g && ln(p, s) && (g = null),
                                        (r.validMutation = g),
                                        (r.mutatedRelevantEvents = b));
                            }),
                            (r.handleDragEnd = function (s) {
                                var l = r.component.context,
                                    c = r.eventRange.def,
                                    f = r.eventRange.instance,
                                    d = new j(l, c, f),
                                    p = r.relevantEvents,
                                    v = r.mutatedRelevantEvents;
                                if (
                                    (l.emitter.trigger('eventResizeStop', {
                                        el: r.draggingSegEl,
                                        event: d,
                                        jsEvent: s.origEvent,
                                        view: l.viewApi,
                                    }),
                                    r.validMutation)
                                ) {
                                    var g = new j(
                                        l,
                                        v.defs[c.defId],
                                        f ? v.instances[f.instanceId] : null
                                    );
                                    l.dispatch({
                                        type: 'MERGE_EVENTS',
                                        eventStore: v,
                                    });
                                    var b = {
                                        oldEvent: d,
                                        event: g,
                                        relatedEvents: Le(v, l, f),
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
                                                U(0),
                                            endDelta:
                                                r.validMutation.endDelta ||
                                                U(0),
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
                            o = (r.dragging = new rt(n.el));
                        (o.pointer.selector = '.fc-event-resizer'),
                            (o.touchScrollAllowed = !1),
                            (o.autoScroller.isEnabled =
                                i.context.options.dragScroll);
                        var a = (r.hitDragging = new Dt(r.dragging, lr(n)));
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
                            return ne(n.subjectEl, '.fc-event');
                        }),
                        e
                    );
                })(nt),
                $d = (function () {
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
                                    a = li(i.origEvent);
                                (n.matchesCancel = !!ne(a, o)),
                                    (n.matchesEvent = !!ne(a, aa.SELECTOR));
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
                        var r = (this.documentPointer = new wr(document));
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
                                f = null,
                                d = !1,
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
                                ((f = (function nu(t, e, n) {
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
                                    var s = Hn(r, n),
                                        f = Yt(
                                            s.refined,
                                            s.extra,
                                            e.sourceId,
                                            t.allDay,
                                            n.options.forceEventDuration ||
                                                Boolean(e.duration),
                                            n
                                        ),
                                        d = t.range.start;
                                    t.allDay &&
                                        e.startTime &&
                                        (d = n.dateEnv.add(d, e.startTime));
                                    var p = e.duration
                                        ? n.dateEnv.add(d, e.duration)
                                        : Wn(t.allDay, d, n);
                                    return {
                                        def: f,
                                        instance: Ot(f.defId, {
                                            start: d,
                                            end: p,
                                        }),
                                    };
                                })(o.dateSpan, r.dragMeta, c)),
                                (p.mutatedEvents = yt(f)),
                                (d = !dr(p, o.dateProfile, c)) &&
                                    ((p.mutatedEvents = {
                                        defs: {},
                                        instances: {},
                                    }),
                                    (f = null))),
                                r.displayDrag(c, p),
                                l.setMirrorIsVisible(
                                    a ||
                                        !f ||
                                        !document.querySelector(
                                            '.fc-event-mirror'
                                        )
                                ),
                                d ? It() : Nt(),
                                a ||
                                    (l.setMirrorNeedsRevert(!f),
                                    (r.receivingContext = c),
                                    (r.droppableEvent = f));
                        }),
                        (this.handleDragEnd = function (o) {
                            var s = r.receivingContext,
                                l = r.droppableEvent;
                            if ((r.clearDrag(), s && l)) {
                                var c = r.hitDragging.finalHit,
                                    f = c.context.viewApi,
                                    d = r.dragMeta;
                                if (
                                    (s.emitter.trigger(
                                        'drop',
                                        (0, u.pi)(
                                            (0, u.pi)({}, Dr(c.dateSpan, s)),
                                            {
                                                draggedEl: o.subjectEl,
                                                jsEvent: o.origEvent,
                                                view: f,
                                            }
                                        )
                                    ),
                                    d.create)
                                ) {
                                    var p = yt(l);
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
                                            event: new j(s, l.def, l.instance),
                                            relatedEvents: [],
                                            revert: function () {
                                                s.dispatch({
                                                    type: 'REMOVE_EVENTS',
                                                    eventStore: p,
                                                });
                                            },
                                            draggedEl: o.subjectEl,
                                            view: f,
                                        });
                                }
                            }
                            (r.receivingContext = null),
                                (r.droppableEvent = null);
                        });
                    var i = (this.hitDragging = new Dt(e, en));
                    (i.requireInitial = !1),
                        i.emitter.on('dragstart', this.handleDragStart),
                        i.emitter.on('hitupdate', this.handleHitUpdate),
                        i.emitter.on('dragend', this.handleDragEnd),
                        (this.suppliedDragMeta = n);
                }
                (t.prototype.buildDragMeta = function (e) {
                    return 'object' == typeof this.suppliedDragMeta
                        ? cr(this.suppliedDragMeta)
                        : 'function' == typeof this.suppliedDragMeta
                        ? cr(this.suppliedDragMeta(e))
                        : (function ru(t) {
                              var e = (function iu(t, e) {
                                  var n = tn.dataAttrPrefix;
                                  return (
                                      t.getAttribute(
                                          'data-' + (n ? n + '-' : '') + e
                                      ) || ''
                                  );
                              })(t, 'event');
                              return cr(e ? JSON.parse(e) : { create: !1 });
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
                            : 'string' != typeof r || !r || Boolean(Sn(e, r));
                    });
            })();
            tn.dataAttrPrefix = '';
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
                    var i = (r.pointer = new wr(n));
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
            })(Io);
            const su = xe({
                componentInteractions: [Gd, Zd, aa, Xd],
                calendarInteractions: [$d],
                elementDraggingImpl: rt,
                optionRefiners: eu,
                listenerRefiners: tu,
            });
            N(4516);
            var lu = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (n.headerElRef = X()), n;
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.renderSimpleLayout = function (n, r) {
                        var o = this.props,
                            a = this.context,
                            s = [],
                            l = on(a.options);
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
                            h(wt, { viewSpec: a.viewSpec }, function (c, f) {
                                return h(
                                    'div',
                                    {
                                        ref: c,
                                        className: ['fc-daygrid']
                                            .concat(f)
                                            .join(' '),
                                    },
                                    h(vr, {
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
                            f = !l.forPrint && on(c.options),
                            d = !l.forPrint && Vo(c.options),
                            p = [];
                        return (
                            n &&
                                p.push({
                                    type: 'header',
                                    key: 'header',
                                    isSticky: f,
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
                            d &&
                                p.push({
                                    type: 'footer',
                                    key: 'footer',
                                    isSticky: !0,
                                    chunks: [{ key: 'main', content: pr }],
                                }),
                            h(wt, { viewSpec: c.viewSpec }, function (v, g) {
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
            })(Ce);
            function cn(t, e) {
                for (var n = [], r = 0; r < e; r += 1) n[r] = [];
                for (var i = 0, o = t; i < o.length; i++) {
                    var a = o[i];
                    n[a.row].push(a);
                }
                return n;
            }
            function fn(t, e) {
                for (var n = [], r = 0; r < e; r += 1) n[r] = [];
                for (var i = 0, o = t; i < o.length; i++) {
                    var a = o[i];
                    n[a.firstCol].push(a);
                }
                return n;
            }
            function la(t, e) {
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
                            r = Xt(this.context, n.date);
                        return h(
                            mr,
                            {
                                date: n.date,
                                dateProfile: n.dateProfile,
                                todayRange: n.todayRange,
                                showDayNumber: n.showDayNumber,
                                extraHookProps: n.extraHookProps,
                                defaultContent: fu,
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
                                            o || h(K, null, '\xa0')
                                        )
                                    )
                                );
                            }
                        );
                    }),
                    e
                );
            })(L);
            function fu(t) {
                return t.dayNumberText;
            }
            var ca = Z({
                hour: 'numeric',
                minute: '2-digit',
                omitZeroMinute: !0,
                meridiem: 'narrow',
            });
            function fa(t) {
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
            var da = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this.props;
                            return h(
                                Go,
                                (0, u.pi)({}, n, {
                                    extraClassNames: [
                                        'fc-daygrid-event',
                                        'fc-daygrid-block-event',
                                        'fc-h-event',
                                    ],
                                    defaultTimeFormat: ca,
                                    defaultDisplayEventEnd:
                                        n.defaultDisplayEventEnd,
                                    disableResizing:
                                        !n.seg.eventRange.def.allDay,
                                })
                            );
                        }),
                        e
                    );
                })(L),
                ua = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var r = this.props,
                                i = this.context,
                                a = Qi(
                                    r.seg,
                                    i.options.eventTimeFormat || ca,
                                    i,
                                    !0,
                                    r.defaultDisplayEventEnd
                                );
                            return h(
                                hr,
                                {
                                    seg: r.seg,
                                    timeText: a,
                                    defaultContent: du,
                                    isDragging: r.isDragging,
                                    isResizing: !1,
                                    isDateSelecting: !1,
                                    isSelected: r.isSelected,
                                    isPast: r.isPast,
                                    isFuture: r.isFuture,
                                    isToday: r.isToday,
                                },
                                function (s, l, c, f) {
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
                                            Vi(r.seg, i)
                                        ),
                                        f
                                    );
                                }
                            );
                        }),
                        e
                    );
                })(L);
            function du(t) {
                return h(
                    K,
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
                        t.event.title || h(K, null, '\xa0')
                    )
                );
            }
            var uu = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (n.compileSegs = I(pu)), n;
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.render = function () {
                        var n = this.props,
                            r = this.compileSegs(n.singlePlacements),
                            i = r.allSegs;
                        return h(
                            Jo,
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
                                        K,
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
                                                fa(s)
                                                    ? h(
                                                          ua,
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
                                                              Pe(
                                                                  s,
                                                                  n.todayRange
                                                              )
                                                          )
                                                      )
                                                    : h(
                                                          da,
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
                                                              Pe(
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
                            function (a, s, l, c, f, d, p, v) {
                                return h(
                                    'a',
                                    (0, u.pi)(
                                        {
                                            ref: a,
                                            className: ['fc-daygrid-more-link']
                                                .concat(s)
                                                .join(' '),
                                            title: d,
                                            'aria-expanded': p,
                                            'aria-controls': v,
                                        },
                                        pi(f)
                                    ),
                                    c
                                );
                            }
                        );
                    }),
                    e
                );
            })(L);
            function pu(t) {
                for (var e = [], n = [], r = 0, i = t; r < i.length; r++) {
                    var o = i[r];
                    e.push(o.seg), o.isVisible || n.push(o.seg);
                }
                return { allSegs: e, invisibleSegs: n };
            }
            var vu = Z({ week: 'narrow' }),
                hu = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.rootElRef = X()),
                            (n.state = { dayNumberId: kt() }),
                            (n.handleRootEl = function (r) {
                                me(n.rootElRef, r), me(n.props.elRef, r);
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
                                c = Xt(n.context, s, 'week');
                            return h(
                                yr,
                                {
                                    date: s,
                                    dateProfile: l,
                                    todayRange: i.todayRange,
                                    showDayNumber: i.showDayNumber,
                                    extraHookProps: i.extraHookProps,
                                    elRef: this.handleRootEl,
                                },
                                function (f, d, p, v) {
                                    return h(
                                        'td',
                                        (0, u.pi)(
                                            {
                                                ref: f,
                                                role: 'gridcell',
                                                className: ['fc-daygrid-day']
                                                    .concat(
                                                        d,
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
                                                    qo,
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
                })(Ce);
            function it(t, e, n, r) {
                if (t.firstCol === e && t.lastCol === n - 1) return t;
                var i = t.eventRange,
                    o = i.range,
                    a = et(o, { start: r[e].date, end: ie(r[n - 1].date, 1) });
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
                                        return !r.forceHidden[Qe(l)];
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
                                f = n.touchingLateral;
                            if (this.hiddenConsumes && l) {
                                var d = Qe(l);
                                if (!s[d])
                                    if (this.allowReslicing) {
                                        var p = (0, u.pi)((0, u.pi)({}, l), {
                                            span: or(l.span, r.span),
                                        });
                                        (s[Qe(p)] = !0),
                                            (a[c][f] = p),
                                            this.splitEntry(l, r, i);
                                    } else (s[d] = !0), i.push(l);
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
                })(Mo),
                pa = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.cellElRefs = new Te()),
                            (n.frameElRefs = new Te()),
                            (n.fgElRefs = new Te()),
                            (n.segHarnessRefs = new Te()),
                            (n.rootElRef = X()),
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
                                c = fn(i.businessHourSegs, l),
                                f = fn(i.bgEventSegs, l),
                                d = fn(this.getHighlightSegs(), l),
                                p = fn(this.getMirrorSegs(), l),
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
                                        var l = [], c = [], f = 0;
                                        f < t.length;
                                        f += 1
                                    ) {
                                        var v =
                                            i[
                                                (d = t[f]).eventRange.instance
                                                    .instanceId
                                            ];
                                        null != v
                                            ? l.push({
                                                  index: f,
                                                  thickness: v,
                                                  span: {
                                                      start: d.firstCol,
                                                      end: d.lastCol + 1,
                                                  },
                                              })
                                            : c.push(d);
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
                                                            f = 0,
                                                            d = 0,
                                                            p = 0,
                                                            v = l;
                                                        p < v.length;
                                                        p++
                                                    )
                                                        c.push({
                                                            seg: it(
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
                                                                f,
                                                        }),
                                                            (f =
                                                                g.levelCoord +
                                                                g.thickness);
                                                    var E = [];
                                                    (f = 0), (d = 0);
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
                                                            R =
                                                                g.span.start ===
                                                                s;
                                                        (d += g.levelCoord - f),
                                                            (f =
                                                                g.levelCoord +
                                                                g.thickness),
                                                            g.span.end -
                                                                g.span.start >
                                                            1
                                                                ? ((d +=
                                                                      g.thickness),
                                                                  R &&
                                                                      E.push({
                                                                          seg: it(
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
                                                                : R &&
                                                                  (E.push({
                                                                      seg: it(
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
                                                                          d,
                                                                  }),
                                                                  (d = 0));
                                                    }
                                                    i.push(c),
                                                        o.push(E),
                                                        a.push(d);
                                                }
                                                return {
                                                    singleColPlacements: i,
                                                    multiColPlacements: o,
                                                    leftoverMargins: a,
                                                };
                                            })(s.toRects(), t, a),
                                            m = E.singleColPlacements,
                                            w = E.multiColPlacements,
                                            _ = E.leftoverMargins,
                                            R = [],
                                            F = [],
                                            z = 0,
                                            Q = c;
                                        z < Q.length;
                                        z++
                                    ) {
                                        w[(d = Q[z]).firstCol].push({
                                            seg: d,
                                            isVisible: !1,
                                            isAbsolute: !0,
                                            absoluteTop: 0,
                                            marginTop: 0,
                                        });
                                        for (
                                            var P = d.firstCol;
                                            P <= d.lastCol;
                                            P += 1
                                        )
                                            m[P].push({
                                                seg: it(d, P, P + 1, a),
                                                isVisible: !1,
                                                isAbsolute: !1,
                                                absoluteTop: 0,
                                                marginTop: 0,
                                            });
                                    }
                                    for (P = 0; P < a.length; P += 1) R.push(0);
                                    for (var Y = 0, W = g; Y < W.length; Y++) {
                                        var d,
                                            de = W[Y],
                                            oe = de.span;
                                        for (
                                            w[oe.start].push({
                                                seg: it(
                                                    (d = t[de.index]),
                                                    oe.start,
                                                    oe.end,
                                                    a
                                                ),
                                                isVisible: !1,
                                                isAbsolute: !0,
                                                absoluteTop: 0,
                                                marginTop: 0,
                                            }),
                                                P = oe.start;
                                            P < oe.end;
                                            P += 1
                                        )
                                            (R[P] += 1),
                                                m[P].push({
                                                    seg: it(d, P, P + 1, a),
                                                    isVisible: !1,
                                                    isAbsolute: !1,
                                                    absoluteTop: 0,
                                                    marginTop: 0,
                                                });
                                    }
                                    for (P = 0; P < a.length; P += 1)
                                        F.push(_[P]);
                                    return {
                                        singleColPlacements: m,
                                        multiColPlacements: w,
                                        moreCnts: R,
                                        moreMarginTops: F,
                                    };
                                })(
                                    Li(i.fgEventSegs, s.eventOrder),
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
                                i.cells.map(function (_, R) {
                                    var F = n.renderFgSegs(
                                            R,
                                            i.forPrint ? g[R] : b[R],
                                            i.todayRange,
                                            w
                                        ),
                                        z = n.renderFgSegs(
                                            R,
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
                                            })(p[R], b),
                                            i.todayRange,
                                            {},
                                            Boolean(i.eventDrag),
                                            Boolean(i.eventResize),
                                            !1
                                        );
                                    return h(hu, {
                                        key: _.key,
                                        elRef: n.cellElRefs.createRef(_.key),
                                        innerElRef: n.frameElRefs.createRef(
                                            _.key
                                        ),
                                        dateProfile: i.dateProfile,
                                        date: _.date,
                                        showDayNumber: i.showDayNumbers,
                                        showWeekNumber:
                                            i.showWeekNumbers && 0 === R,
                                        forceDayTop: i.showWeekNumbers,
                                        todayRange: i.todayRange,
                                        eventSelection: i.eventSelection,
                                        eventDrag: i.eventDrag,
                                        eventResize: i.eventResize,
                                        extraHookProps: _.extraHookProps,
                                        extraDataAttrs: _.extraDataAttrs,
                                        extraClassNames: _.extraClassNames,
                                        extraDateSpan: _.extraDateSpan,
                                        moreCnt: E[R],
                                        moreMarginTop: m[R],
                                        singlePlacements: g[R],
                                        fgContentElRef: n.fgElRefs.createRef(
                                            _.key
                                        ),
                                        fgContent: h(
                                            K,
                                            null,
                                            h(K, null, F),
                                            h(K, null, z)
                                        ),
                                        bgContent: h(
                                            K,
                                            null,
                                            n.renderFillSegs(d[R], 'highlight'),
                                            n.renderFillSegs(
                                                c[R],
                                                'non-business'
                                            ),
                                            n.renderFillSegs(f[R], 'bg-event')
                                        ),
                                    });
                                })
                            );
                        }),
                        (e.prototype.componentDidMount = function () {
                            this.updateSizing(!0);
                        }),
                        (e.prototype.componentDidUpdate = function (n, r) {
                            this.updateSizing(!we(n, this.props));
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
                                f = this.props.eventSelection,
                                d = this.state.framePositions,
                                p = 1 === this.props.cells.length,
                                v = a || s || l,
                                g = [];
                            if (d)
                                for (var b = 0, E = r; b < E.length; b++) {
                                    var m = E[b],
                                        w = m.seg,
                                        _ = w.eventRange.instance.instanceId,
                                        R = _ + ':' + n,
                                        F = m.isVisible && !o[_],
                                        z = m.isAbsolute,
                                        Q = '',
                                        P = '';
                                    z &&
                                        (c.isRtl
                                            ? ((P = 0),
                                              (Q =
                                                  d.lefts[w.lastCol] -
                                                  d.lefts[w.firstCol]))
                                            : ((Q = 0),
                                              (P =
                                                  d.rights[w.firstCol] -
                                                  d.rights[w.lastCol]))),
                                        g.push(
                                            h(
                                                'div',
                                                {
                                                    className:
                                                        'fc-daygrid-event-harness' +
                                                        (z
                                                            ? ' fc-daygrid-event-harness-abs'
                                                            : ''),
                                                    key: R,
                                                    ref: v
                                                        ? null
                                                        : this.segHarnessRefs.createRef(
                                                              R
                                                          ),
                                                    style: {
                                                        visibility: F
                                                            ? ''
                                                            : 'hidden',
                                                        marginTop: z
                                                            ? ''
                                                            : m.marginTop,
                                                        top: z
                                                            ? m.absoluteTop
                                                            : '',
                                                        left: Q,
                                                        right: P,
                                                    },
                                                },
                                                fa(w)
                                                    ? h(
                                                          ua,
                                                          (0, u.pi)(
                                                              {
                                                                  seg: w,
                                                                  isDragging: a,
                                                                  isSelected:
                                                                      _ === f,
                                                                  defaultDisplayEventEnd:
                                                                      p,
                                                              },
                                                              Pe(w, i)
                                                          )
                                                      )
                                                    : h(
                                                          da,
                                                          (0, u.pi)(
                                                              {
                                                                  seg: w,
                                                                  isDragging: a,
                                                                  isResizing: s,
                                                                  isDateSelecting:
                                                                      l,
                                                                  isSelected:
                                                                      _ === f,
                                                                  defaultDisplayEventEnd:
                                                                      p,
                                                              },
                                                              Pe(w, i)
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
                                    var f = c[l],
                                        d = i
                                            ? {
                                                  right: 0,
                                                  left:
                                                      a.lefts[f.lastCol] -
                                                      a.lefts[f.firstCol],
                                              }
                                            : {
                                                  left: 0,
                                                  right:
                                                      a.rights[f.firstCol] -
                                                      a.rights[f.lastCol],
                                              };
                                    s.push(
                                        h(
                                            'div',
                                            {
                                                key: Wi(f.eventRange),
                                                className:
                                                    'fc-daygrid-bg-harness',
                                                style: d,
                                            },
                                            'bg-event' === r
                                                ? h(
                                                      Yo,
                                                      (0, u.pi)(
                                                          { seg: f },
                                                          Pe(f, o)
                                                      )
                                                  )
                                                : jo(r)
                                        )
                                    );
                                }
                            return h.apply(void 0, (0, u.ev)([K, {}], s));
                        }),
                        (e.prototype.updateSizing = function (n) {
                            var i = this.props,
                                o = this.frameElRefs;
                            if (!i.forPrint && null !== i.clientWidth) {
                                if (n) {
                                    var a = i.cells.map(function (d) {
                                        return o.currentMap[d.key];
                                    });
                                    a.length &&
                                        this.setState({
                                            framePositions: new At(
                                                this.rootElRef.current,
                                                a,
                                                !0,
                                                !1
                                            ),
                                        });
                                }
                                var l = this.state.eventInstanceHeights,
                                    c = this.queryEventInstanceHeights(),
                                    f =
                                        !0 === i.dayMaxEvents ||
                                        !0 === i.dayMaxEventRows;
                                this.setState({
                                    eventInstanceHeights: (0, u.pi)(
                                        (0, u.pi)({}, l),
                                        c
                                    ),
                                    maxContentHeight: f
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
                })(Ce);
            pa.addStateEquality({ eventInstanceHeights: we });
            var wu = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (
                        (n.splitBusinessHourSegs = I(cn)),
                        (n.splitBgEventSegs = I(cn)),
                        (n.splitFgEventSegs = I(cn)),
                        (n.splitDateSelectionSegs = I(cn)),
                        (n.splitEventDrag = I(la)),
                        (n.splitEventResize = I(la)),
                        (n.rowRefs = new Te()),
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
                            f = this.splitBgEventSegs(r.bgEventSegs, l),
                            d = this.splitFgEventSegs(r.fgEventSegs, l),
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
                                h(nn, { unit: 'day' }, function (m, w) {
                                    return h(
                                        K,
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
                                                r.cells.map(function (_, R) {
                                                    return h(pa, {
                                                        ref: n.rowRefs.createRef(
                                                            R
                                                        ),
                                                        key: _.length
                                                            ? _[0].date.toISOString()
                                                            : R,
                                                        showDayNumbers: l > 1,
                                                        showWeekNumbers:
                                                            r.showWeekNumbers,
                                                        todayRange: w,
                                                        dateProfile: i,
                                                        cells: _,
                                                        renderIntro:
                                                            r.renderRowIntro,
                                                        businessHourSegs: c[R],
                                                        eventSelection:
                                                            r.eventSelection,
                                                        bgEventSegs:
                                                            f[R].filter(Du),
                                                        fgEventSegs: d[R],
                                                        dateSelectionSegs: p[R],
                                                        eventDrag: v[R],
                                                        eventResize: g[R],
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
                        (this.rowPositions = new At(
                            this.rootEl,
                            this.rowRefs.collect().map(function (n) {
                                return n.getCellEls()[0];
                            }),
                            !1,
                            !0
                        )),
                            (this.colPositions = new At(
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
                        return { start: i, end: ie(i, 1) };
                    }),
                    e
                );
            })(Ce);
            function Du(t) {
                return t.eventRange.def.allDay;
            }
            var Su = (function (t) {
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
                })(Uo),
                va = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (n.slicer = new Su()), (n.tableRef = X()), n;
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
                })(Ce);
            function xu(t, e) {
                var n = new zo(t.renderRange, e);
                return new Fo(n, /year|month|week/.test(t.currentRangeUnit));
            }
            const _u = xe({
                initialView: 'dayGridMonth',
                views: {
                    dayGrid: {
                        component: (function (t) {
                            function e() {
                                var n =
                                    (null !== t && t.apply(this, arguments)) ||
                                    this;
                                return (
                                    (n.buildDayTableModel = I(xu)),
                                    (n.headerRef = X()),
                                    (n.tableRef = X()),
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
                                            h(Ho, {
                                                ref: this.headerRef,
                                                dateProfile: a.dateProfile,
                                                dates: s.headerDates,
                                                datesRepDistinctDays:
                                                    1 === s.rowCnt,
                                            }),
                                        c = function (f) {
                                            return h(va, {
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
                                                    f.tableColGroupNode,
                                                tableMinWidth: f.tableMinWidth,
                                                dayMaxEvents: i.dayMaxEvents,
                                                dayMaxEventRows:
                                                    i.dayMaxEventRows,
                                                showWeekNumbers: i.weekNumbers,
                                                expandRows: !a.isHeightAuto,
                                                headerAlignElRef: n.headerElRef,
                                                clientWidth: f.clientWidth,
                                                clientHeight: f.clientHeight,
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
                                                l.valueOf() && (l = mi(c, 1))),
                                        this.props.monthMode &&
                                            this.props.fixedWeekCount)
                                    ) {
                                        var f = Math.ceil(
                                            (function Rs(t, e) {
                                                return _e(t, e) / 7;
                                            })(s, l)
                                        );
                                        l = mi(l, 6 - f);
                                    }
                                    return { start: s, end: l };
                                }),
                                e
                            );
                        })(mo),
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
            N(8537);
            var ku = (function (t) {
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
                                ? (function Cl(t) {
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
                Mu = Z({
                    hour: 'numeric',
                    minute: '2-digit',
                    omitZeroMinute: !0,
                    meridiem: 'short',
                });
            function ha(t) {
                var e = [
                    'fc-timegrid-slot',
                    'fc-timegrid-slot-label',
                    t.isLabeled
                        ? 'fc-scrollgrid-shrink'
                        : 'fc-timegrid-slot-minor',
                ];
                return h(Se.Consumer, null, function (n) {
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
                                ? Z(i.slotLabelFormat[0])
                                : Z(i.slotLabelFormat),
                        s = {
                            level: 0,
                            time: t.time,
                            date: r.toDate(t.date),
                            view: o,
                            text: r.format(t.date, a),
                        };
                    return h(
                        be,
                        {
                            hookProps: s,
                            classNames: i.slotLabelClassNames,
                            content: i.slotLabelContent,
                            defaultContent: Iu,
                            didMount: i.slotLabelDidMount,
                            willUnmount: i.slotLabelWillUnmount,
                        },
                        function (l, c, f, d) {
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
                                            ref: f,
                                        },
                                        d
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
                                    h(ha, (0, u.pi)({}, n))
                                );
                            });
                        }),
                        e
                    );
                })(L),
                Pu = Z({ week: 'short' }),
                Ou = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.allDaySplitter = new ku()),
                            (n.headerElRef = X()),
                            (n.rootElRef = X()),
                            (n.scrollerElRef = X()),
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
                                        1 === _e(s.start, s.end)
                                            ? Xt(n.context, s.start, 'week')
                                            : {};
                                return o.weekNumbers && 'day' === r
                                    ? h(
                                          qo,
                                          { date: s.start, defaultFormat: Pu },
                                          function (f, d, p, v) {
                                              return h(
                                                  'th',
                                                  {
                                                      ref: f,
                                                      'aria-hidden': !0,
                                                      className: [
                                                          'fc-timegrid-axis',
                                                          'fc-scrollgrid-shrink',
                                                      ]
                                                          .concat(d)
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
                                    be,
                                    {
                                        hookProps: {
                                            text: o.allDayText,
                                            view: i.viewApi,
                                        },
                                        classNames: o.allDayClassNames,
                                        content: o.allDayContent,
                                        defaultContent: Hu,
                                        didMount: o.allDayDidMount,
                                        willUnmount: o.allDayWillUnmount,
                                    },
                                    function (l, c, f, d) {
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
                                                        ref: f,
                                                    },
                                                    d
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
                                c = on(a.options);
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
                                    wt,
                                    {
                                        viewSpec: a.viewSpec,
                                        elRef: this.rootElRef,
                                    },
                                    function (f, d) {
                                        return h(
                                            'div',
                                            {
                                                className: ['fc-timegrid']
                                                    .concat(d)
                                                    .join(' '),
                                                ref: f,
                                            },
                                            h(vr, {
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
                                f = this.context.pluginHooks.scrollGridImpl;
                            if (!f)
                                throw new Error('No ScrollGrid implementation');
                            var p = this.context,
                                v = this.props,
                                g = !v.forPrint && on(p.options),
                                b = !v.forPrint && Vo(p.options),
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
                                                            nn,
                                                            {
                                                                unit: m
                                                                    ? 'minute'
                                                                    : 'day',
                                                            },
                                                            function (_) {
                                                                var R =
                                                                    m &&
                                                                    l &&
                                                                    l.safeComputeTop(
                                                                        _
                                                                    );
                                                                return 'number' ==
                                                                    typeof R
                                                                    ? h(
                                                                          gr,
                                                                          {
                                                                              isAxis: !0,
                                                                              date: _,
                                                                          },
                                                                          function (
                                                                              F,
                                                                              z,
                                                                              Q,
                                                                              P
                                                                          ) {
                                                                              return h(
                                                                                  'div',
                                                                                  {
                                                                                      ref: F,
                                                                                      className:
                                                                                          [
                                                                                              'fc-timegrid-now-indicator-arrow',
                                                                                          ]
                                                                                              .concat(
                                                                                                  z
                                                                                              )
                                                                                              .join(
                                                                                                  ' '
                                                                                              ),
                                                                                      style: {
                                                                                          top: R,
                                                                                      },
                                                                                  },
                                                                                  P
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
                                            { key: 'axis', content: pr },
                                            { key: 'cols', content: pr },
                                        ],
                                    }),
                                h(
                                    wt,
                                    {
                                        viewSpec: p.viewSpec,
                                        elRef: this.rootElRef,
                                    },
                                    function (w, _) {
                                        return h(
                                            'div',
                                            {
                                                className: ['fc-timegrid']
                                                    .concat(_)
                                                    .join(' '),
                                                ref: w,
                                            },
                                            h(f, {
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
                })(Ce);
            function Hu(t) {
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
                            if (Ne(n.currentRange, e)) {
                                var r = V(e),
                                    i = e.valueOf() - r.valueOf();
                                if (
                                    i >= fe(n.slotMinTime) &&
                                    i < fe(n.slotMaxTime)
                                )
                                    return this.computeTimeTop(U(i));
                            }
                            return null;
                        }),
                        (t.prototype.computeDateTop = function (e, n) {
                            return (
                                n || (n = V(e)),
                                this.computeTimeTop(
                                    U(e.valueOf() - n.valueOf())
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
                                        fe(this.dateProfile.slotMinTime)) /
                                    fe(this.slotDuration);
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
                                        f = [
                                            'fc-timegrid-slot',
                                            'fc-timegrid-slot-lane',
                                            s.isLabeled
                                                ? ''
                                                : 'fc-timegrid-slot-minor',
                                        ];
                                    return h(
                                        'tr',
                                        { key: s.key, ref: a.createRef(s.key) },
                                        r.axis && h(ha, (0, u.pi)({}, s)),
                                        h(
                                            be,
                                            {
                                                hookProps: c,
                                                classNames:
                                                    o.slotLaneClassNames,
                                                content: o.slotLaneContent,
                                                didMount: o.slotLaneDidMount,
                                                willUnmount:
                                                    o.slotLaneWillUnmount,
                                            },
                                            function (d, p, v, g) {
                                                return h(
                                                    'td',
                                                    {
                                                        ref: d,
                                                        className: f
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
                })(L),
                Uu = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.rootElRef = X()), (n.slatElRefs = new Te()), n
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
                                        new At(
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
                })(L);
            function St(t, e) {
                var r,
                    n = [];
                for (r = 0; r < e; r += 1) n.push([]);
                if (t) for (r = 0; r < t.length; r += 1) n[t[r].col].push(t[r]);
                return n;
            }
            function ga(t, e) {
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
                    return (n.rootElRef = X()), n;
                }
                return (
                    (0, u.ZT)(e, t),
                    (e.prototype.render = function () {
                        var n = this,
                            r = this.props;
                        return h(
                            Jo,
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
                                    return Aa(r.hiddenSegs, r);
                                },
                            },
                            function (i, o, a, s, l, c, f, d) {
                                return h(
                                    'a',
                                    {
                                        ref: function (p) {
                                            me(i, p), me(n.rootElRef, p);
                                        },
                                        className: ['fc-timegrid-more-link']
                                            .concat(o)
                                            .join(' '),
                                        style: { top: r.top, bottom: r.bottom },
                                        onClick: l,
                                        title: c,
                                        'aria-expanded': f,
                                        'aria-controls': d,
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
            })(L);
            function Wu(t) {
                return t.shortText;
            }
            function ma(t, e) {
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
            function Sr(t, e) {
                var n = {};
                return function () {
                    for (var r = [], i = 0; i < arguments.length; i++)
                        r[i] = arguments[i];
                    var o = t.apply(void 0, r);
                    return o in n ? n[o] : (n[o] = e.apply(void 0, r));
                };
            }
            function ya(t, e, n, r) {
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
            var Ku = Z({ hour: 'numeric', minute: '2-digit', meridiem: !1 }),
                ba = (function (t) {
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
                                    Go,
                                    (0, u.pi)({}, this.props, {
                                        defaultTimeFormat: Ku,
                                        extraClassNames: n,
                                    })
                                )
                            );
                        }),
                        e
                    );
                })(L),
                $u = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        (0, u.ZT)(e, t),
                        (e.prototype.render = function () {
                            var n = this.props;
                            return h(
                                mr,
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
                })(L),
                ep = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (n.sortEventSegs = I(Li)), n;
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
                                yr,
                                {
                                    elRef: i.elRef,
                                    date: i.date,
                                    dateProfile: i.dateProfile,
                                    todayRange: i.todayRange,
                                    extraHookProps: i.extraHookProps,
                                },
                                function (f, d, p) {
                                    return h(
                                        'td',
                                        (0, u.pi)(
                                            {
                                                ref: f,
                                                role: 'gridcell',
                                                className: ['fc-timegrid-col']
                                                    .concat(
                                                        d,
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
                                ? Aa(n, s)
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
                                f = l.eventShortHeight,
                                d = l.eventOrderStrict,
                                v = this.props,
                                E = v.eventSelection,
                                m = v.todayRange,
                                w = v.nowDate,
                                _ = i || o || a,
                                F = (function Xu(t, e, n, r) {
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
                                                var r = new Mo();
                                                null != e &&
                                                    (r.strictOrder = e),
                                                    null != n &&
                                                        (r.maxStackCnt = n);
                                                var o = (function Lf(t) {
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
                                                                or(
                                                                    c.span,
                                                                    a.span
                                                                )
                                                                    ? (a = {
                                                                          entries:
                                                                              c.entries.concat(
                                                                                  a.entries
                                                                              ),
                                                                          span: Qf(
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
                                                            n = Sr(
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
                                                                                            f =
                                                                                                void 0,
                                                                                            d =
                                                                                                sr(
                                                                                                    c,
                                                                                                    o
                                                                                                        .span
                                                                                                        .start,
                                                                                                    ir
                                                                                                ),
                                                                                            p =
                                                                                                d[0] +
                                                                                                d[1],
                                                                                            v =
                                                                                                p;
                                                                                        (f =
                                                                                            c[
                                                                                                v
                                                                                            ]) &&
                                                                                        f
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
                                                                        a = ma(
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
                                                        return ma(
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
                                                    var n = Sr(
                                                        function (r, i, o) {
                                                            return Qe(r);
                                                        },
                                                        function (r, i, o) {
                                                            var f,
                                                                a =
                                                                    r.nextLevelNodes,
                                                                s = r.thickness,
                                                                l = s + o,
                                                                c = s / l,
                                                                d = [];
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
                                                                        f
                                                                    )
                                                                        (f =
                                                                            (b =
                                                                                n(
                                                                                    g,
                                                                                    i,
                                                                                    l
                                                                                ))[0]),
                                                                            d.push(
                                                                                b[1]
                                                                            );
                                                                    else {
                                                                        var b =
                                                                            n(
                                                                                g,
                                                                                f,
                                                                                0
                                                                            );
                                                                        d.push(
                                                                            b[1]
                                                                        );
                                                                    }
                                                                }
                                                            else f = e;
                                                            var E = (f - i) * c;
                                                            return [
                                                                f - E,
                                                                (0, u.pi)(
                                                                    (0, u.pi)(
                                                                        {},
                                                                        r
                                                                    ),
                                                                    {
                                                                        thickness:
                                                                            E,
                                                                        nextLevelNodes:
                                                                            d,
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
                                                        n = Sr(
                                                            function (i, o, a) {
                                                                return Qe(i);
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
                                            f = l.hiddenGroups,
                                            d = [],
                                            p = 0,
                                            v = l.segRects;
                                        p < v.length;
                                        p++
                                    ) {
                                        var g = v[p];
                                        d.push({ seg: t[g.index], rect: g });
                                    }
                                    for (var b = 0, E = o; b < E.length; b++)
                                        d.push({ seg: E[b], rect: null });
                                    return {
                                        segPlacements: d,
                                        hiddenGroups: f,
                                    };
                                })(
                                    n,
                                    ya(
                                        n,
                                        v.date,
                                        v.slatCoords,
                                        l.eventMinHeight
                                    ),
                                    d,
                                    c
                                ),
                                z = F.segPlacements;
                            return h(
                                K,
                                null,
                                this.renderHiddenGroups(F.hiddenGroups, n),
                                z.map(function (P) {
                                    var Y = P.seg,
                                        W = P.rect,
                                        de = Y.eventRange.instance.instanceId,
                                        oe = _ || Boolean(!r[de] && W),
                                        at = Cr(W && W.span),
                                        st =
                                            !_ && W
                                                ? s.computeSegHStyle(W)
                                                : { left: 0, right: 0 },
                                        Tt = Boolean(W) && W.stackForward > 0,
                                        Vp =
                                            Boolean(W) &&
                                            W.span.end - W.span.start < f;
                                    return h(
                                        'div',
                                        {
                                            className:
                                                'fc-timegrid-event-harness' +
                                                (Tt
                                                    ? ' fc-timegrid-event-harness-inset'
                                                    : ''),
                                            key: de,
                                            style: (0, u.pi)(
                                                (0, u.pi)(
                                                    {
                                                        visibility: oe
                                                            ? ''
                                                            : 'hidden',
                                                    },
                                                    at
                                                ),
                                                st
                                            ),
                                        },
                                        h(
                                            ba,
                                            (0, u.pi)(
                                                {
                                                    seg: Y,
                                                    isDragging: i,
                                                    isResizing: o,
                                                    isDateSelecting: a,
                                                    isSelected: de === E,
                                                    isShort: Vp,
                                                },
                                                Pe(Y, m, w)
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
                                f = i.eventDrag,
                                d = i.eventResize;
                            return h(
                                K,
                                null,
                                n.map(function (p) {
                                    var v = Cr(p.span),
                                        g = (function tp(t, e) {
                                            return t.map(function (n) {
                                                return e[n.index];
                                            });
                                        })(p.entries, r);
                                    return h(Qu, {
                                        key: xi(Ko(g)),
                                        hiddenSegs: g,
                                        top: v.top,
                                        bottom: v.bottom,
                                        extraDateSpan: o,
                                        dateProfile: a,
                                        todayRange: s,
                                        nowDate: l,
                                        eventSelection: c,
                                        eventDrag: f,
                                        eventResize: d,
                                    });
                                })
                            );
                        }),
                        (e.prototype.renderFillSegs = function (n, r) {
                            var o = this.props,
                                l = ya(
                                    n,
                                    o.date,
                                    o.slatCoords,
                                    this.context.options.eventMinHeight
                                ).map(function (c, f) {
                                    var d = n[f];
                                    return h(
                                        'div',
                                        {
                                            key: Wi(d.eventRange),
                                            className: 'fc-timegrid-bg-harness',
                                            style: Cr(c),
                                        },
                                        'bg-event' === r
                                            ? h(
                                                  Yo,
                                                  (0, u.pi)(
                                                      { seg: d },
                                                      Pe(
                                                          d,
                                                          o.todayRange,
                                                          o.nowDate
                                                      )
                                                  )
                                              )
                                            : jo(r)
                                    );
                                });
                            return h(K, null, l);
                        }),
                        (e.prototype.renderNowIndicator = function (n) {
                            var r = this.props,
                                i = r.slatCoords,
                                o = r.date;
                            return i
                                ? n.map(function (a, s) {
                                      return h(
                                          gr,
                                          { isAxis: !1, date: o, key: s },
                                          function (l, c, f, d) {
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
                                                  d
                                              );
                                          }
                                      );
                                  })
                                : null;
                        }),
                        (e.prototype.computeSegHStyle = function (n) {
                            var c,
                                f,
                                r = this.context,
                                i = r.isRtl,
                                a = r.options.slotEventOverlap,
                                s = n.levelCoord,
                                l = n.levelCoord + n.thickness;
                            a && (l = Math.min(1, s + 2 * (l - s))),
                                i
                                    ? ((c = 1 - l), (f = s))
                                    : ((c = s), (f = 1 - l));
                            var d = {
                                zIndex: n.stackDepth + 1,
                                left: 100 * c + '%',
                                right: 100 * f + '%',
                            };
                            return (
                                a &&
                                    !n.stackForward &&
                                    (d[i ? 'marginLeft' : 'marginRight'] = 20),
                                d
                            );
                        }),
                        e
                    );
                })(L);
            function Aa(t, e) {
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
                    K,
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
                                ba,
                                (0, u.pi)(
                                    {
                                        seg: l,
                                        isDragging: !1,
                                        isResizing: !1,
                                        isDateSelecting: !1,
                                        isSelected: c === i,
                                        isShort: !1,
                                    },
                                    Pe(l, n, r)
                                )
                            )
                        );
                    })
                );
            }
            function Cr(t) {
                return t
                    ? { top: t.start, bottom: -t.end }
                    : { top: '', bottom: '' };
            }
            var np = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.splitFgEventSegs = I(St)),
                            (n.splitBgEventSegs = I(St)),
                            (n.splitBusinessHourSegs = I(St)),
                            (n.splitNowIndicatorSegs = I(St)),
                            (n.splitDateSelectionSegs = I(St)),
                            (n.splitEventDrag = I(ga)),
                            (n.splitEventResize = I(ga)),
                            (n.rootElRef = X()),
                            (n.cellElRefs = new Te()),
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
                                f = this.splitBusinessHourSegs(
                                    i.businessHourSegs,
                                    s
                                ),
                                d = this.splitNowIndicatorSegs(
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
                                                                    gr,
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
                                                    businessHourSegs: f[E],
                                                    nowIndicatorSegs: d[E],
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
                                    new At(
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
                })(L),
                ip = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.processSlotOptions = I(op)),
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
                                f = this.processSlotOptions(
                                    this.props.slotDuration,
                                    i.options.snapDuration
                                ),
                                d = f.snapDuration,
                                p = f.snapsPerSlot,
                                v = s.leftToIndex(n),
                                g = c.positions.topToIndex(r);
                            if (null != v && null != g) {
                                var b = this.props.cells[v],
                                    E = c.positions.tops[g],
                                    m = c.positions.getHeight(g),
                                    _ = Math.floor(((r - E) / m) * p),
                                    F = this.props.cells[v].date,
                                    z = Rn(
                                        l.slotMinTime,
                                        (function js(t, e) {
                                            return {
                                                years: t.years * e,
                                                months: t.months * e,
                                                days: t.days * e,
                                                milliseconds:
                                                    t.milliseconds * e,
                                            };
                                        })(d, g * p + _)
                                    ),
                                    Q = o.add(F, z),
                                    P = o.add(Q, d);
                                return {
                                    dateProfile: l,
                                    dateSpan: (0, u.pi)(
                                        {
                                            range: { start: Q, end: P },
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
                })(Ce);
            function op(t, e) {
                var n = e || t,
                    r = _n(t, n);
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
                                var a = et(n, r[o]);
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
                })(Uo),
                sp = (function (t) {
                    function e() {
                        var n =
                            (null !== t && t.apply(this, arguments)) || this;
                        return (
                            (n.buildDayRanges = I(lp)),
                            (n.slicer = new ap()),
                            (n.timeColsRef = X()),
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
                                nn,
                                { unit: l ? 'minute' : 'day' },
                                function (f, d) {
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
                                                nowDate: f,
                                                nowIndicatorSegs:
                                                    l &&
                                                    n.slicer.sliceNowDate(
                                                        f,
                                                        o,
                                                        c
                                                    ),
                                                todayRange: d,
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
                })(Ce);
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
            var Ea = [
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
                        s = U(0),
                        l =
                            n ||
                            (function fp(t) {
                                var e, n, r;
                                for (e = Ea.length - 1; e >= 0; e -= 1)
                                    if (
                                        null !== (r = _n((n = U(Ea[e])), t)) &&
                                        r > 1
                                    )
                                        return n;
                                return t;
                            })(r),
                        c = [];
                    fe(a) < fe(e);

                ) {
                    var f = i.add(o, a),
                        d = null !== _n(s, l);
                    c.push({
                        date: f,
                        time: a,
                        key: f.toISOString(),
                        isoTimeStr: Js(f),
                        isLabeled: d,
                    }),
                        (a = Rn(a, r)),
                        (s = Rn(s, r));
                }
                return c;
            }
            var dp = (function (t) {
                function e() {
                    var n = (null !== t && t.apply(this, arguments)) || this;
                    return (
                        (n.buildTimeColsModel = I(up)),
                        (n.buildSlatMetas = I(cp)),
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
                            f = this.allDaySplitter.splitProps(s),
                            d = this.buildSlatMetas(
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
                                h(Ho, {
                                    dates: c.headerDates,
                                    dateProfile: l,
                                    datesRepDistinctDays: !0,
                                    renderIntro: v ? this.renderHeadAxis : null,
                                }),
                            E =
                                !1 !== i.allDaySlot &&
                                function (w) {
                                    return h(
                                        va,
                                        (0, u.pi)(
                                            {},
                                            f.allDay,
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
                                    (0, u.pi)({}, f.timed, {
                                        dayTableModel: c,
                                        dateProfile: l,
                                        axis: v,
                                        slotDuration: i.slotDuration,
                                        slatMetas: d,
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
                                  d,
                                  this.state.slatCoords
                              )
                            : this.renderSimpleLayout(b, E, m);
                    }),
                    e
                );
            })(Ou);
            function up(t, e) {
                var n = new zo(t.renderRange, e);
                return new Fo(n, !1);
            }
            const hp = xe({
                initialView: 'timeGridWeek',
                optionRefiners: { allDaySlot: Boolean },
                views: {
                    timeGrid: {
                        component: dp,
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
                            directives: [O.mk, O.PC],
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
                        (t.ɵinj = y.cJS({ imports: [[O.ez]] })),
                        t
                    );
                })();
            ta.registerPlugins([su, _u, hp]);
            let yp = (() => {
                class t {}
                return (
                    (t.ɵfac = function (n) {
                        return new (n || t)();
                    }),
                    (t.ɵmod = y.oAB({ type: t })),
                    (t.ɵinj = y.cJS({ imports: [[O.ez, ta, mp]] })),
                    t
                );
            })();
            var dn = N(9783);
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
            function Sp(t, e) {
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
            function Cp(t, e) {
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
                _p = ['*', 'p-header', 'p-footer'];
            let kp = (() => {
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
                                        (y.Suo(i, dn.h4, 5),
                                        y.Suo(i, dn.$_, 5),
                                        y.Suo(i, dn.jx, 4)),
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
                            ngContentSelectors: _p,
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
                                    y.YNc(4, Sp, 3, 2, 'div', 4),
                                    y.TgZ(5, 'div', 5),
                                    y.Hsn(6),
                                    y.YNc(7, Cp, 1, 0, 'ng-container', 6),
                                    y.qZA(),
                                    y.YNc(8, Tp, 3, 1, 'div', 7),
                                    y.qZA()()),
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
                            directives: [O.mk, O.PC, O.O5, O.tP],
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
                        (t.ɵinj = y.cJS({ imports: [[O.ez], dn.m8] })),
                        t
                    );
                })();
            var Ct,
                Tr,
                Rr,
                Ra,
                Ip = N(6666),
                wa = N(6115),
                Da = N(7579),
                Sa = N(5026),
                xr = N(4004),
                Ca = N(5577),
                xa = N(8675),
                Ta = N(1485),
                Np = N(4707),
                Pp = N(9646);
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
            function Op(t, e) {
                1 & t &&
                    (y.TgZ(0, 'td', 7), y._UZ(1, 'p-skeleton', 8), y.qZA());
            }
            function Hp(t, e) {
                if (
                    (1 & t &&
                        (y.TgZ(0, 'tr'), y.YNc(1, Op, 2, 0, 'td', 6), y.qZA()),
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
                        y.YNc(3, Hp, 2, 1, 'tr', 5),
                        y.qZA()),
                    2 & t)
                ) {
                    const n = y.oxw();
                    y.xp6(3), y.Q6J('ngForOf', n.calendarRows);
                }
            }
            class xt {
                constructor(e) {
                    (this.firebaseApi = e),
                        (this.calendarRows = Array(6)),
                        (this.calendarColumns = Array(7)),
                        Ct.set(this, new Np.t()),
                        (this.areEventsLoaded$ = (0, u.Q_)(this, Ct, 'f').pipe(
                            (0, xr.U)((n) => !!n)
                        )),
                        (this.eventClick = new Da.x()),
                        (this._options = {
                            initialDate: '2019-01-01',
                            headerToolbar: {
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay',
                            },
                            editable: !1,
                            selectable: !1,
                            selectMirror: !0,
                            dayMaxEvents: !0,
                            height: 600,
                            eventClick: ({ event: n }) =>
                                this.eventClick.next(n),
                        }),
                        (this.options$ = (0, Pp.of)(this._options).pipe(
                            (0, Ca.z)((n) =>
                                (0, u.Q_)(this, Ct, 'f').pipe(
                                    (0, xr.U)((r) =>
                                        Object.assign(Object.assign({}, n), {
                                            events: null != r ? r : [],
                                        })
                                    ),
                                    (0, xa.O)(n)
                                )
                            )
                        ));
                }
                set events(e) {
                    (0, u.Q_)(this, Ct, 'f').next(e);
                }
            }
            (Ct = new WeakMap()),
                (xt.ɵfac = function (e) {
                    return new (e || xt)(y.Y36(Ta.O));
                }),
                (xt.ɵcmp = y.Xpm({
                    type: xt,
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
                    directives: [O.O5, Pd, O.sg, gp],
                    pipes: [O.Ov],
                    encapsulation: 2,
                    changeDetection: 0,
                }));
            const Fp = function () {
                return { width: '25rem', 'margin-bottom': '2em' };
            };
            function Up(t, e) {
                if (
                    (1 & t &&
                        (y.TgZ(0, 'p-card', 2)(1, 'p'),
                        y._uU(2, "Hey I'm the details."),
                        y.qZA()()),
                    2 & t)
                ) {
                    const n = e.$implicit;
                    y.Akn(y.DdM(3, Fp)), y.Q6J('header', n.name);
                }
            }
            class ot {
                constructor(e) {
                    (this.functionsApi = e),
                        Tr.add(this),
                        (this.classSelected$ = new Da.x()),
                        (this.selectedClasses$ = this.classSelected$.pipe(
                            (0, Sa.R)(
                                (n, r) =>
                                    n.find((o) => o.id === r.id)
                                        ? n.filter((o) => o.id !== r.id)
                                        : [...n, { id: r.id, name: r.title }],
                                new Array()
                            )
                        )),
                        Rr.set(
                            this,
                            this.functionsApi
                                .call('classes')
                                .pipe((0, xr.U)((n) => n.classes))
                        ),
                        (this.classEvents$ = (0, u.Q_)(this, Rr, 'f').pipe(
                            (0, Ca.z)((n) =>
                                this.classSelected$.pipe(
                                    (0, Sa.R)(
                                        (r, i) =>
                                            (0, u.Q_)(this, Tr, 'm', Ra).call(
                                                this,
                                                r,
                                                i
                                            ),
                                        n
                                    ),
                                    (0, xa.O)(n)
                                )
                            )
                        ));
                }
            }
            (Rr = new WeakMap()),
                (Tr = new WeakSet()),
                (Ra = function (e, n) {
                    return e.map((r) =>
                        r.id === n.id
                            ? Object.assign(Object.assign({}, r), {
                                  color:
                                      'green' === r.color ? 'default' : 'green',
                              })
                            : r
                    );
                }),
                (ot.ɵfac = function (e) {
                    return new (e || ot)(y.Y36(Ta.O));
                }),
                (ot.ɵcmp = y.Xpm({
                    type: ot,
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
                    directives: [xt, O.sg, kp],
                    pipes: [O.Ov],
                    encapsulation: 2,
                    changeDetection: 0,
                }));
            const Lp = [{ path: 'classes', component: ot, children: [] }];
            let Qp = (() => {
                    class t {}
                    return (
                        (t.ɵfac = function (n) {
                            return new (n || t)();
                        }),
                        (t.ɵmod = y.oAB({ type: t })),
                        (t.ɵinj = y.cJS({
                            imports: [[wa.Bz.forChild(Lp)], wa.Bz],
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
                        (t.ɵinj = y.cJS({
                            imports: [[O.ez, yp, Mp, Ip.B, Qp]],
                        })),
                        t
                    );
                })();
        },
        6666: (pe, ve, N) => {
            N.d(ve, { B: () => q });
            var O = N(1485),
                ee = N(5e3);
            let q = (() => {
                class u {}
                return (
                    (u.ɵfac = function (k) {
                        return new (k || u)();
                    }),
                    (u.ɵmod = ee.oAB({ type: u })),
                    (u.ɵinj = ee.cJS({ providers: [O.O] })),
                    u
                );
            })();
        },
        1485: (pe, ve, N) => {
            N.d(ve, { O: () => q });
            var O = N(5e3),
                ee = N(2228);
            let q = (() => {
                class u {
                    constructor(k) {
                        this.fns = k;
                    }
                    call(k, lt) {
                        return this.fns.httpsCallable(k)(lt);
                    }
                }
                return (
                    (u.ɵfac = function (k) {
                        return new (k || u)(O.LFG(ee.l4));
                    }),
                    (u.ɵprov = O.Yz7({
                        token: u,
                        factory: u.ɵfac,
                        providedIn: 'root',
                    })),
                    u
                );
            })();
        },
        2559: (pe) => {
            pe.exports = function ve(N, O) {
                if (N === O) return !0;
                if (N && O && 'object' == typeof N && 'object' == typeof O) {
                    if (N.constructor !== O.constructor) return !1;
                    var ee, q, u;
                    if (Array.isArray(N)) {
                        if ((ee = N.length) != O.length) return !1;
                        for (q = ee; 0 != q--; ) if (!ve(N[q], O[q])) return !1;
                        return !0;
                    }
                    if (N.constructor === RegExp)
                        return N.source === O.source && N.flags === O.flags;
                    if (N.valueOf !== Object.prototype.valueOf)
                        return N.valueOf() === O.valueOf();
                    if (N.toString !== Object.prototype.toString)
                        return N.toString() === O.toString();
                    if (
                        (ee = (u = Object.keys(N)).length) !==
                        Object.keys(O).length
                    )
                        return !1;
                    for (q = ee; 0 != q--; )
                        if (!Object.prototype.hasOwnProperty.call(O, u[q]))
                            return !1;
                    for (q = ee; 0 != q--; ) {
                        var le = u[q];
                        if (!ve(N[le], O[le])) return !1;
                    }
                    return !0;
                }
                return N != N && O != O;
            };
        },
        655: (pe, ve, N) => {
            N.d(ve, {
                Q_: () => dt,
                ZT: () => ee,
                _T: () => u,
                ev: () => he,
                pi: () => q,
            });
            var O = function (D, C) {
                return (O =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                        function (S, x) {
                            S.__proto__ = x;
                        }) ||
                    function (S, x) {
                        for (var M in x)
                            Object.prototype.hasOwnProperty.call(x, M) &&
                                (S[M] = x[M]);
                    })(D, C);
            };
            function ee(D, C) {
                if ('function' != typeof C && null !== C)
                    throw new TypeError(
                        'Class extends value ' +
                            String(C) +
                            ' is not a constructor or null'
                    );
                function S() {
                    this.constructor = D;
                }
                O(D, C),
                    (D.prototype =
                        null === C
                            ? Object.create(C)
                            : ((S.prototype = C.prototype), new S()));
            }
            var q = function () {
                return (
                    (q =
                        Object.assign ||
                        function (C) {
                            for (var S, x = 1, M = arguments.length; x < M; x++)
                                for (var T in (S = arguments[x]))
                                    Object.prototype.hasOwnProperty.call(
                                        S,
                                        T
                                    ) && (C[T] = S[T]);
                            return C;
                        }),
                    q.apply(this, arguments)
                );
            };
            function u(D, C) {
                var S = {};
                for (var x in D)
                    Object.prototype.hasOwnProperty.call(D, x) &&
                        C.indexOf(x) < 0 &&
                        (S[x] = D[x]);
                if (
                    null != D &&
                    'function' == typeof Object.getOwnPropertySymbols
                ) {
                    var M = 0;
                    for (x = Object.getOwnPropertySymbols(D); M < x.length; M++)
                        C.indexOf(x[M]) < 0 &&
                            Object.prototype.propertyIsEnumerable.call(
                                D,
                                x[M]
                            ) &&
                            (S[x[M]] = D[x[M]]);
                }
                return S;
            }
            function he(D, C, S) {
                if (S || 2 === arguments.length)
                    for (var T, x = 0, M = C.length; x < M; x++)
                        (T || !(x in C)) &&
                            (T || (T = Array.prototype.slice.call(C, 0, x)),
                            (T[x] = C[x]));
                return D.concat(T || Array.prototype.slice.call(C));
            }
            function dt(D, C, S, x) {
                if ('a' === S && !x)
                    throw new TypeError(
                        'Private accessor was defined without a getter'
                    );
                if ('function' == typeof C ? D !== C || !x : !C.has(D))
                    throw new TypeError(
                        'Cannot read private member from an object whose class did not declare it'
                    );
                return 'm' === S
                    ? x
                    : 'a' === S
                    ? x.call(D)
                    : x
                    ? x.value
                    : C.get(D);
            }
        },
        4602: (pe) => {
            pe.exports =
                '\n/* classes attached to <body> */\n/* TODO: make fc-event selector work when calender in shadow DOM */\n.fc-not-allowed,\n.fc-not-allowed .fc-event { /* override events\' custom cursors */\n  cursor: not-allowed;\n}\n/* TODO: not attached to body. attached to specific els. move */\n.fc-unselectable {\n  -webkit-user-select: none;\n          user-select: none;\n  -webkit-touch-callout: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.fc {\n  /* layout of immediate children */\n  display: flex;\n  flex-direction: column;\n\n  font-size: 1em\n}\n.fc,\n  .fc *,\n  .fc *:before,\n  .fc *:after {\n    box-sizing: border-box;\n  }\n.fc table {\n    border-collapse: collapse;\n    border-spacing: 0;\n    font-size: 1em; /* normalize cross-browser */\n  }\n.fc th {\n    text-align: center;\n  }\n.fc th,\n  .fc td {\n    vertical-align: top;\n    padding: 0;\n  }\n.fc a[data-navlink] {\n    cursor: pointer;\n  }\n.fc a[data-navlink]:hover {\n    text-decoration: underline;\n  }\n.fc-direction-ltr {\n  direction: ltr;\n  text-align: left;\n}\n.fc-direction-rtl {\n  direction: rtl;\n  text-align: right;\n}\n.fc-theme-standard td,\n  .fc-theme-standard th {\n    border: 1px solid #ddd;\n    border: 1px solid var(--fc-border-color, #ddd);\n  }\n/* for FF, which doesn\'t expand a 100% div within a table cell. use absolute positioning */\n/* inner-wrappers are responsible for being absolute */\n/* TODO: best place for this? */\n.fc-liquid-hack td,\n  .fc-liquid-hack th {\n    position: relative;\n  }\n@font-face {\n  font-family: \'fcicons\';\n  src: url("data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBfAAAAC8AAAAYGNtYXAXVtKNAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZgYydxIAAAF4AAAFNGhlYWQUJ7cIAAAGrAAAADZoaGVhB20DzAAABuQAAAAkaG10eCIABhQAAAcIAAAALGxvY2ED4AU6AAAHNAAAABhtYXhwAA8AjAAAB0wAAAAgbmFtZXsr690AAAdsAAABhnBvc3QAAwAAAAAI9AAAACAAAwPAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpBgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6Qb//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAWIAjQKeAskAEwAAJSc3NjQnJiIHAQYUFwEWMjc2NCcCnuLiDQ0MJAz/AA0NAQAMJAwNDcni4gwjDQwM/wANIwz/AA0NDCMNAAAAAQFiAI0CngLJABMAACUBNjQnASYiBwYUHwEHBhQXFjI3AZ4BAA0N/wAMJAwNDeLiDQ0MJAyNAQAMIw0BAAwMDSMM4uINIwwNDQAAAAIA4gC3Ax4CngATACcAACUnNzY0JyYiDwEGFB8BFjI3NjQnISc3NjQnJiIPAQYUHwEWMjc2NCcB87e3DQ0MIw3VDQ3VDSMMDQ0BK7e3DQ0MJAzVDQ3VDCQMDQ3zuLcMJAwNDdUNIwzWDAwNIwy4twwkDA0N1Q0jDNYMDA0jDAAAAgDiALcDHgKeABMAJwAAJTc2NC8BJiIHBhQfAQcGFBcWMjchNzY0LwEmIgcGFB8BBwYUFxYyNwJJ1Q0N1Q0jDA0Nt7cNDQwjDf7V1Q0N1QwkDA0Nt7cNDQwkDLfWDCMN1Q0NDCQMt7gMIw0MDNYMIw3VDQ0MJAy3uAwjDQwMAAADAFUAAAOrA1UAMwBoAHcAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMhMjY1NCYjISIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAAVYRGRkR/qoRGRkRA1UFBAUOCQkVDAsZDf2rDRkLDBUJCA4FBQUFBQUOCQgVDAsZDQJVDRkLDBUJCQ4FBAVVAgECBQMCBwQECAX9qwQJAwQHAwMFAQICAgIBBQMDBwQDCQQCVQUIBAQHAgMFAgEC/oAZEhEZGRESGQAAAAADAFUAAAOrA1UAMwBoAIkAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMzFRQWMzI2PQEzMjY1NCYrATU0JiMiBh0BIyIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAgBkSEhmAERkZEYAZEhIZgBEZGREDVQUEBQ4JCRUMCxkN/asNGQsMFQkIDgUFBQUFBQ4JCBUMCxkNAlUNGQsMFQkJDgUEBVUCAQIFAwIHBAQIBf2rBAkDBAcDAwUBAgICAgEFAwMHBAMJBAJVBQgEBAcCAwUCAQL+gIASGRkSgBkSERmAEhkZEoAZERIZAAABAOIAjQMeAskAIAAAExcHBhQXFjI/ARcWMjc2NC8BNzY0JyYiDwEnJiIHBhQX4uLiDQ0MJAzi4gwkDA0N4uINDQwkDOLiDCQMDQ0CjeLiDSMMDQ3h4Q0NDCMN4uIMIw0MDOLiDAwNIwwAAAABAAAAAQAAa5n0y18PPPUACwQAAAAAANivOVsAAAAA2K85WwAAAAADqwNVAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAOrAAEAAAAAAAAAAAAAAAAAAAALBAAAAAAAAAAAAAAAAgAAAAQAAWIEAAFiBAAA4gQAAOIEAABVBAAAVQQAAOIAAAAAAAoAFAAeAEQAagCqAOoBngJkApoAAQAAAAsAigADAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGZjaWNvbnMAZgBjAGkAYwBvAG4Ac1ZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGZjaWNvbnMAZgBjAGkAYwBvAG4Ac2ZjaWNvbnMAZgBjAGkAYwBvAG4Ac1JlZ3VsYXIAUgBlAGcAdQBsAGEAcmZjaWNvbnMAZgBjAGkAYwBvAG4Ac0ZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=") format(\'truetype\');\n  font-weight: normal;\n  font-style: normal;\n}\n.fc-icon {\n  /* added for fc */\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  text-align: center;\n  -webkit-user-select: none;\n          user-select: none;\n\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: \'fcicons\' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-feature-settings: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.fc-icon-chevron-left:before {\n  content: "\\e900";\n}\n.fc-icon-chevron-right:before {\n  content: "\\e901";\n}\n.fc-icon-chevrons-left:before {\n  content: "\\e902";\n}\n.fc-icon-chevrons-right:before {\n  content: "\\e903";\n}\n.fc-icon-minus-square:before {\n  content: "\\e904";\n}\n.fc-icon-plus-square:before {\n  content: "\\e905";\n}\n.fc-icon-x:before {\n  content: "\\e906";\n}\n/*\nLots taken from Flatly (MIT): https://bootswatch.com/4/flatly/bootstrap.css\n\nThese styles only apply when the standard-theme is activated.\nWhen it\'s NOT activated, the fc-button classes won\'t even be in the DOM.\n*/\n.fc {\n\n  /* reset */\n\n}\n.fc .fc-button {\n    border-radius: 0;\n    overflow: visible;\n    text-transform: none;\n    margin: 0;\n    font-family: inherit;\n    font-size: inherit;\n    line-height: inherit;\n  }\n.fc .fc-button:focus {\n    outline: 1px dotted;\n    outline: 5px auto -webkit-focus-ring-color;\n  }\n.fc .fc-button {\n    -webkit-appearance: button;\n  }\n.fc .fc-button:not(:disabled) {\n    cursor: pointer;\n  }\n.fc .fc-button::-moz-focus-inner {\n    padding: 0;\n    border-style: none;\n  }\n.fc {\n\n  /* theme */\n\n}\n.fc .fc-button {\n    display: inline-block;\n    font-weight: 400;\n    text-align: center;\n    vertical-align: middle;\n    -webkit-user-select: none;\n            user-select: none;\n    background-color: transparent;\n    border: 1px solid transparent;\n    padding: 0.4em 0.65em;\n    font-size: 1em;\n    line-height: 1.5;\n    border-radius: 0.25em;\n  }\n.fc .fc-button:hover {\n    text-decoration: none;\n  }\n.fc .fc-button:focus {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(44, 62, 80, 0.25);\n  }\n.fc .fc-button:disabled {\n    opacity: 0.65;\n  }\n.fc {\n\n  /* "primary" coloring */\n\n}\n.fc .fc-button-primary {\n    color: #fff;\n    color: var(--fc-button-text-color, #fff);\n    background-color: #2C3E50;\n    background-color: var(--fc-button-bg-color, #2C3E50);\n    border-color: #2C3E50;\n    border-color: var(--fc-button-border-color, #2C3E50);\n  }\n.fc .fc-button-primary:hover {\n    color: #fff;\n    color: var(--fc-button-text-color, #fff);\n    background-color: #1e2b37;\n    background-color: var(--fc-button-hover-bg-color, #1e2b37);\n    border-color: #1a252f;\n    border-color: var(--fc-button-hover-border-color, #1a252f);\n  }\n.fc .fc-button-primary:disabled { /* not DRY */\n    color: #fff;\n    color: var(--fc-button-text-color, #fff);\n    background-color: #2C3E50;\n    background-color: var(--fc-button-bg-color, #2C3E50);\n    border-color: #2C3E50;\n    border-color: var(--fc-button-border-color, #2C3E50); /* overrides :hover */\n  }\n.fc .fc-button-primary:focus {\n    box-shadow: 0 0 0 0.2rem rgba(76, 91, 106, 0.5);\n  }\n.fc .fc-button-primary:not(:disabled):active,\n  .fc .fc-button-primary:not(:disabled).fc-button-active {\n    color: #fff;\n    color: var(--fc-button-text-color, #fff);\n    background-color: #1a252f;\n    background-color: var(--fc-button-active-bg-color, #1a252f);\n    border-color: #151e27;\n    border-color: var(--fc-button-active-border-color, #151e27);\n  }\n.fc .fc-button-primary:not(:disabled):active:focus,\n  .fc .fc-button-primary:not(:disabled).fc-button-active:focus {\n    box-shadow: 0 0 0 0.2rem rgba(76, 91, 106, 0.5);\n  }\n.fc {\n\n  /* icons within buttons */\n\n}\n.fc .fc-button .fc-icon {\n    vertical-align: middle;\n    font-size: 1.5em; /* bump up the size (but don\'t make it bigger than line-height of button, which is 1.5em also) */\n  }\n.fc .fc-button-group {\n    position: relative;\n    display: inline-flex;\n    vertical-align: middle;\n  }\n.fc .fc-button-group > .fc-button {\n    position: relative;\n    flex: 1 1 auto;\n  }\n.fc .fc-button-group > .fc-button:hover {\n    z-index: 1;\n  }\n.fc .fc-button-group > .fc-button:focus,\n  .fc .fc-button-group > .fc-button:active,\n  .fc .fc-button-group > .fc-button.fc-button-active {\n    z-index: 1;\n  }\n.fc-direction-ltr .fc-button-group > .fc-button:not(:first-child) {\n    margin-left: -1px;\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n.fc-direction-ltr .fc-button-group > .fc-button:not(:last-child) {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n.fc-direction-rtl .fc-button-group > .fc-button:not(:first-child) {\n    margin-right: -1px;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n.fc-direction-rtl .fc-button-group > .fc-button:not(:last-child) {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n.fc .fc-toolbar {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n.fc .fc-toolbar.fc-header-toolbar {\n    margin-bottom: 1.5em;\n  }\n.fc .fc-toolbar.fc-footer-toolbar {\n    margin-top: 1.5em;\n  }\n.fc .fc-toolbar-title {\n    font-size: 1.75em;\n    margin: 0;\n  }\n.fc-direction-ltr .fc-toolbar > * > :not(:first-child) {\n    margin-left: .75em; /* space between */\n  }\n.fc-direction-rtl .fc-toolbar > * > :not(:first-child) {\n    margin-right: .75em; /* space between */\n  }\n.fc-direction-rtl .fc-toolbar-ltr { /* when the toolbar-chunk positioning system is explicitly left-to-right */\n    flex-direction: row-reverse;\n  }\n.fc .fc-scroller {\n    -webkit-overflow-scrolling: touch;\n    position: relative; /* for abs-positioned elements within */\n  }\n.fc .fc-scroller-liquid {\n    height: 100%;\n  }\n.fc .fc-scroller-liquid-absolute {\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    bottom: 0;\n  }\n.fc .fc-scroller-harness {\n    position: relative;\n    overflow: hidden;\n    direction: ltr;\n      /* hack for chrome computing the scroller\'s right/left wrong for rtl. undone below... */\n      /* TODO: demonstrate in codepen */\n  }\n.fc .fc-scroller-harness-liquid {\n    height: 100%;\n  }\n.fc-direction-rtl .fc-scroller-harness > .fc-scroller { /* undo above hack */\n    direction: rtl;\n  }\n.fc-theme-standard .fc-scrollgrid {\n    border: 1px solid #ddd;\n    border: 1px solid var(--fc-border-color, #ddd); /* bootstrap does this. match */\n  }\n.fc .fc-scrollgrid,\n    .fc .fc-scrollgrid table { /* all tables (self included) */\n      width: 100%; /* because tables don\'t normally do this */\n      table-layout: fixed;\n    }\n.fc .fc-scrollgrid table { /* inner tables */\n      border-top-style: hidden;\n      border-left-style: hidden;\n      border-right-style: hidden;\n    }\n.fc .fc-scrollgrid {\n\n    border-collapse: separate;\n    border-right-width: 0;\n    border-bottom-width: 0;\n\n  }\n.fc .fc-scrollgrid-liquid {\n    height: 100%;\n  }\n.fc .fc-scrollgrid-section { /* a <tr> */\n    height: 1px /* better than 0, for firefox */\n\n  }\n.fc .fc-scrollgrid-section > td {\n      height: 1px; /* needs a height so inner div within grow. better than 0, for firefox */\n    }\n.fc .fc-scrollgrid-section table {\n      height: 1px;\n        /* for most browsers, if a height isn\'t set on the table, can\'t do liquid-height within cells */\n        /* serves as a min-height. harmless */\n    }\n.fc .fc-scrollgrid-section-liquid > td {\n      height: 100%; /* better than `auto`, for firefox */\n    }\n.fc .fc-scrollgrid-section > * {\n    border-top-width: 0;\n    border-left-width: 0;\n  }\n.fc .fc-scrollgrid-section-header > *,\n  .fc .fc-scrollgrid-section-footer > * {\n    border-bottom-width: 0;\n  }\n.fc .fc-scrollgrid-section-body table,\n  .fc .fc-scrollgrid-section-footer table {\n    border-bottom-style: hidden; /* head keeps its bottom border tho */\n  }\n.fc {\n\n  /* stickiness */\n\n}\n.fc .fc-scrollgrid-section-sticky > * {\n    background: #fff;\n    background: var(--fc-page-bg-color, #fff);\n    position: sticky;\n    z-index: 3; /* TODO: var */\n    /* TODO: box-shadow when sticking */\n  }\n.fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky > * {\n    top: 0; /* because border-sharing causes a gap at the top */\n      /* TODO: give safari -1. has bug */\n  }\n.fc .fc-scrollgrid-section-footer.fc-scrollgrid-section-sticky > * {\n    bottom: 0; /* known bug: bottom-stickiness doesn\'t work in safari */\n  }\n.fc .fc-scrollgrid-sticky-shim { /* for horizontal scrollbar */\n    height: 1px; /* needs height to create scrollbars */\n    margin-bottom: -1px;\n  }\n.fc-sticky { /* no .fc wrap because used as child of body */\n  position: sticky;\n}\n.fc .fc-view-harness {\n    flex-grow: 1; /* because this harness is WITHIN the .fc\'s flexbox */\n    position: relative;\n  }\n.fc {\n\n  /* when the harness controls the height, make the view liquid */\n\n}\n.fc .fc-view-harness-active > .fc-view {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n  }\n.fc .fc-col-header-cell-cushion {\n    display: inline-block; /* x-browser for when sticky (when multi-tier header) */\n    padding: 2px 4px;\n  }\n.fc .fc-bg-event,\n  .fc .fc-non-business,\n  .fc .fc-highlight {\n    /* will always have a harness with position:relative/absolute, so absolutely expand */\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n.fc .fc-non-business {\n    background: rgba(215, 215, 215, 0.3);\n    background: var(--fc-non-business-color, rgba(215, 215, 215, 0.3));\n  }\n.fc .fc-bg-event {\n    background: rgb(143, 223, 130);\n    background: var(--fc-bg-event-color, rgb(143, 223, 130));\n    opacity: 0.3;\n    opacity: var(--fc-bg-event-opacity, 0.3)\n  }\n.fc .fc-bg-event .fc-event-title {\n      margin: .5em;\n      font-size: .85em;\n      font-size: var(--fc-small-font-size, .85em);\n      font-style: italic;\n    }\n.fc .fc-highlight {\n    background: rgba(188, 232, 241, 0.3);\n    background: var(--fc-highlight-color, rgba(188, 232, 241, 0.3));\n  }\n.fc .fc-cell-shaded,\n  .fc .fc-day-disabled {\n    background: rgba(208, 208, 208, 0.3);\n    background: var(--fc-neutral-bg-color, rgba(208, 208, 208, 0.3));\n  }\n/* link resets */\n/* ---------------------------------------------------------------------------------------------------- */\na.fc-event,\na.fc-event:hover {\n  text-decoration: none;\n}\n/* cursor */\n.fc-event[href],\n.fc-event.fc-event-draggable {\n  cursor: pointer;\n}\n/* event text content */\n/* ---------------------------------------------------------------------------------------------------- */\n.fc-event .fc-event-main {\n    position: relative;\n    z-index: 2;\n  }\n/* dragging */\n/* ---------------------------------------------------------------------------------------------------- */\n.fc-event-dragging:not(.fc-event-selected) { /* MOUSE */\n    opacity: 0.75;\n  }\n.fc-event-dragging.fc-event-selected { /* TOUCH */\n    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);\n  }\n/* resizing */\n/* ---------------------------------------------------------------------------------------------------- */\n/* (subclasses should hone positioning for touch and non-touch) */\n.fc-event .fc-event-resizer {\n    display: none;\n    position: absolute;\n    z-index: 4;\n  }\n.fc-event:hover, /* MOUSE */\n.fc-event-selected { /* TOUCH */\n\n}\n.fc-event:hover .fc-event-resizer, .fc-event-selected .fc-event-resizer {\n    display: block;\n  }\n.fc-event-selected .fc-event-resizer {\n    border-radius: 4px;\n    border-radius: calc(var(--fc-event-resizer-dot-total-width, 8px) / 2);\n    border-width: 1px;\n    border-width: var(--fc-event-resizer-dot-border-width, 1px);\n    width: 8px;\n    width: var(--fc-event-resizer-dot-total-width, 8px);\n    height: 8px;\n    height: var(--fc-event-resizer-dot-total-width, 8px);\n    border-style: solid;\n    border-color: inherit;\n    background: #fff;\n    background: var(--fc-page-bg-color, #fff)\n\n    /* expand hit area */\n\n  }\n.fc-event-selected .fc-event-resizer:before {\n      content: \'\';\n      position: absolute;\n      top: -20px;\n      left: -20px;\n      right: -20px;\n      bottom: -20px;\n    }\n/* selecting (always TOUCH) */\n/* OR, focused by tab-index */\n/* (TODO: maybe not the best focus-styling for .fc-daygrid-dot-event) */\n/* ---------------------------------------------------------------------------------------------------- */\n.fc-event-selected,\n.fc-event:focus {\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2)\n\n  /* expand hit area (subclasses should expand) */\n\n}\n.fc-event-selected:before, .fc-event:focus:before {\n    content: "";\n    position: absolute;\n    z-index: 3;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n.fc-event-selected,\n.fc-event:focus {\n\n  /* dimmer effect */\n\n}\n.fc-event-selected:after, .fc-event:focus:after {\n    content: "";\n    background: rgba(0, 0, 0, 0.25);\n    background: var(--fc-event-selected-overlay-color, rgba(0, 0, 0, 0.25));\n    position: absolute;\n    z-index: 1;\n\n    /* assume there\'s a border on all sides. overcome it. */\n    /* sometimes there\'s NOT a border, in which case the dimmer will go over */\n    /* an adjacent border, which looks fine. */\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n  }\n/*\nA HORIZONTAL event\n*/\n.fc-h-event { /* allowed to be top-level */\n  display: block;\n  border: 1px solid #3788d8;\n  border: 1px solid var(--fc-event-border-color, #3788d8);\n  background-color: #3788d8;\n  background-color: var(--fc-event-bg-color, #3788d8)\n\n}\n.fc-h-event .fc-event-main {\n    color: #fff;\n    color: var(--fc-event-text-color, #fff);\n  }\n.fc-h-event .fc-event-main-frame {\n    display: flex; /* for make fc-event-title-container expand */\n  }\n.fc-h-event .fc-event-time {\n    max-width: 100%; /* clip overflow on this element */\n    overflow: hidden;\n  }\n.fc-h-event .fc-event-title-container { /* serves as a container for the sticky cushion */\n    flex-grow: 1;\n    flex-shrink: 1;\n    min-width: 0; /* important for allowing to shrink all the way */\n  }\n.fc-h-event .fc-event-title {\n    display: inline-block; /* need this to be sticky cross-browser */\n    vertical-align: top; /* for not messing up line-height */\n    left: 0;  /* for sticky */\n    right: 0; /* for sticky */\n    max-width: 100%; /* clip overflow on this element */\n    overflow: hidden;\n  }\n.fc-h-event.fc-event-selected:before {\n    /* expand hit area */\n    top: -10px;\n    bottom: -10px;\n  }\n/* adjust border and border-radius (if there is any) for non-start/end */\n.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-start),\n.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-end) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  border-left-width: 0;\n}\n.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-end),\n.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-start) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  border-right-width: 0;\n}\n/* resizers */\n.fc-h-event:not(.fc-event-selected) .fc-event-resizer {\n  top: 0;\n  bottom: 0;\n  width: 8px;\n  width: var(--fc-event-resizer-thickness, 8px);\n}\n.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start,\n.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end {\n  cursor: w-resize;\n  left: -4px;\n  left: calc(-0.5 * var(--fc-event-resizer-thickness, 8px));\n}\n.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end,\n.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start {\n  cursor: e-resize;\n  right: -4px;\n  right: calc(-0.5 * var(--fc-event-resizer-thickness, 8px));\n}\n/* resizers for TOUCH */\n.fc-h-event.fc-event-selected .fc-event-resizer {\n  top: 50%;\n  margin-top: -4px;\n  margin-top: calc(-0.5 * var(--fc-event-resizer-dot-total-width, 8px));\n}\n.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-start,\n.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-end {\n  left: -4px;\n  left: calc(-0.5 * var(--fc-event-resizer-dot-total-width, 8px));\n}\n.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-end,\n.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-start {\n  right: -4px;\n  right: calc(-0.5 * var(--fc-event-resizer-dot-total-width, 8px));\n}\n.fc .fc-popover {\n    position: absolute;\n    z-index: 9999;\n    box-shadow: 0 2px 6px rgba(0,0,0,.15);\n  }\n.fc .fc-popover-header {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    padding: 3px 4px;\n  }\n.fc .fc-popover-title {\n    margin: 0 2px;\n  }\n.fc .fc-popover-close {\n    cursor: pointer;\n    opacity: 0.65;\n    font-size: 1.1em;\n  }\n.fc-theme-standard .fc-popover {\n    border: 1px solid #ddd;\n    border: 1px solid var(--fc-border-color, #ddd);\n    background: #fff;\n    background: var(--fc-page-bg-color, #fff);\n  }\n.fc-theme-standard .fc-popover-header {\n    background: rgba(208, 208, 208, 0.3);\n    background: var(--fc-neutral-bg-color, rgba(208, 208, 208, 0.3));\n  }\n';
        },
        4516: (pe) => {
            pe.exports =
                '\n:root {\n  --fc-daygrid-event-dot-width: 8px;\n}\n/* help things clear margins of inner content */\n.fc-daygrid-day-frame,\n.fc-daygrid-day-events,\n.fc-daygrid-event-harness { /* for event top/bottom margins */\n}\n.fc-daygrid-day-frame:before, .fc-daygrid-day-events:before, .fc-daygrid-event-harness:before {\n  content: "";\n  clear: both;\n  display: table; }\n.fc-daygrid-day-frame:after, .fc-daygrid-day-events:after, .fc-daygrid-event-harness:after {\n  content: "";\n  clear: both;\n  display: table; }\n.fc .fc-daygrid-body { /* a <div> that wraps the table */\n    position: relative;\n    z-index: 1; /* container inner z-index\'s because <tr>s can\'t do it */\n  }\n.fc .fc-daygrid-day.fc-day-today {\n      background-color: rgba(255, 220, 40, 0.15);\n      background-color: var(--fc-today-bg-color, rgba(255, 220, 40, 0.15));\n    }\n.fc .fc-daygrid-day-frame {\n    position: relative;\n    min-height: 100%; /* seems to work better than `height` because sets height after rows/cells naturally do it */\n  }\n.fc {\n\n  /* cell top */\n\n}\n.fc .fc-daygrid-day-top {\n    display: flex;\n    flex-direction: row-reverse;\n  }\n.fc .fc-day-other .fc-daygrid-day-top {\n    opacity: 0.3;\n  }\n.fc {\n\n  /* day number (within cell top) */\n\n}\n.fc .fc-daygrid-day-number {\n    position: relative;\n    z-index: 4;\n    padding: 4px;\n  }\n.fc {\n\n  /* event container */\n\n}\n.fc .fc-daygrid-day-events {\n    margin-top: 1px; /* needs to be margin, not padding, so that available cell height can be computed */\n  }\n.fc {\n\n  /* positioning for balanced vs natural */\n\n}\n.fc .fc-daygrid-body-balanced .fc-daygrid-day-events {\n      position: absolute;\n      left: 0;\n      right: 0;\n    }\n.fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events {\n      position: relative; /* for containing abs positioned event harnesses */\n      min-height: 2em; /* in addition to being a min-height during natural height, equalizes the heights a little bit */\n    }\n.fc .fc-daygrid-body-natural { /* can coexist with -unbalanced */\n  }\n.fc .fc-daygrid-body-natural .fc-daygrid-day-events {\n      margin-bottom: 1em;\n    }\n.fc {\n\n  /* event harness */\n\n}\n.fc .fc-daygrid-event-harness {\n    position: relative;\n  }\n.fc .fc-daygrid-event-harness-abs {\n    position: absolute;\n    top: 0; /* fallback coords for when cannot yet be computed */\n    left: 0; /* */\n    right: 0; /* */\n  }\n.fc .fc-daygrid-bg-harness {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n  }\n.fc {\n\n  /* bg content */\n\n}\n.fc .fc-daygrid-day-bg .fc-non-business { z-index: 1 }\n.fc .fc-daygrid-day-bg .fc-bg-event { z-index: 2 }\n.fc .fc-daygrid-day-bg .fc-highlight { z-index: 3 }\n.fc {\n\n  /* events */\n\n}\n.fc .fc-daygrid-event {\n    z-index: 6;\n    margin-top: 1px;\n  }\n.fc .fc-daygrid-event.fc-event-mirror {\n    z-index: 7;\n  }\n.fc {\n\n  /* cell bottom (within day-events) */\n\n}\n.fc .fc-daygrid-day-bottom {\n    font-size: .85em;\n    padding: 2px 3px 0\n  }\n.fc .fc-daygrid-day-bottom:before {\n  content: "";\n  clear: both;\n  display: table; }\n.fc .fc-daygrid-more-link {\n    position: relative;\n    z-index: 4;\n    cursor: pointer;\n  }\n.fc {\n\n  /* week number (within frame) */\n\n}\n.fc .fc-daygrid-week-number {\n    position: absolute;\n    z-index: 5;\n    top: 0;\n    padding: 2px;\n    min-width: 1.5em;\n    text-align: center;\n    background-color: rgba(208, 208, 208, 0.3);\n    background-color: var(--fc-neutral-bg-color, rgba(208, 208, 208, 0.3));\n    color: #808080;\n    color: var(--fc-neutral-text-color, #808080);\n  }\n.fc {\n\n  /* popover */\n\n}\n.fc .fc-more-popover .fc-popover-body {\n    min-width: 220px;\n    padding: 10px;\n  }\n.fc-direction-ltr .fc-daygrid-event.fc-event-start,\n.fc-direction-rtl .fc-daygrid-event.fc-event-end {\n  margin-left: 2px;\n}\n.fc-direction-ltr .fc-daygrid-event.fc-event-end,\n.fc-direction-rtl .fc-daygrid-event.fc-event-start {\n  margin-right: 2px;\n}\n.fc-direction-ltr .fc-daygrid-week-number {\n    left: 0;\n    border-radius: 0 0 3px 0;\n  }\n.fc-direction-rtl .fc-daygrid-week-number {\n    right: 0;\n    border-radius: 0 0 0 3px;\n  }\n.fc-liquid-hack .fc-daygrid-day-frame {\n    position: static; /* will cause inner absolute stuff to expand to <td> */\n  }\n.fc-daygrid-event { /* make root-level, because will be dragged-and-dropped outside of a component root */\n  position: relative; /* for z-indexes assigned later */\n  white-space: nowrap;\n  border-radius: 3px; /* dot event needs this to when selected */\n  font-size: .85em;\n  font-size: var(--fc-small-font-size, .85em);\n}\n/* --- the rectangle ("block") style of event --- */\n.fc-daygrid-block-event .fc-event-time {\n    font-weight: bold;\n  }\n.fc-daygrid-block-event .fc-event-time,\n  .fc-daygrid-block-event .fc-event-title {\n    padding: 1px;\n  }\n/* --- the dot style of event --- */\n.fc-daygrid-dot-event {\n  display: flex;\n  align-items: center;\n  padding: 2px 0\n\n}\n.fc-daygrid-dot-event .fc-event-title {\n    flex-grow: 1;\n    flex-shrink: 1;\n    min-width: 0; /* important for allowing to shrink all the way */\n    overflow: hidden;\n    font-weight: bold;\n  }\n.fc-daygrid-dot-event:hover,\n  .fc-daygrid-dot-event.fc-event-mirror {\n    background: rgba(0, 0, 0, 0.1);\n  }\n.fc-daygrid-dot-event.fc-event-selected:before {\n    /* expand hit area */\n    top: -10px;\n    bottom: -10px;\n  }\n.fc-daygrid-event-dot { /* the actual dot */\n  margin: 0 4px;\n  box-sizing: content-box;\n  width: 0;\n  height: 0;\n  border: 4px solid #3788d8;\n  border: calc(var(--fc-daygrid-event-dot-width, 8px) / 2) solid var(--fc-event-border-color, #3788d8);\n  border-radius: 4px;\n  border-radius: calc(var(--fc-daygrid-event-dot-width, 8px) / 2);\n}\n/* --- spacing between time and title --- */\n.fc-direction-ltr .fc-daygrid-event .fc-event-time {\n    margin-right: 3px;\n  }\n.fc-direction-rtl .fc-daygrid-event .fc-event-time {\n    margin-left: 3px;\n  }\n';
        },
        8537: (pe) => {
            pe.exports =
                '\n/*\nA VERTICAL event\n*/\n\n.fc-v-event { /* allowed to be top-level */\n  display: block;\n  border: 1px solid #3788d8;\n  border: 1px solid var(--fc-event-border-color, #3788d8);\n  background-color: #3788d8;\n  background-color: var(--fc-event-bg-color, #3788d8)\n\n}\n\n.fc-v-event .fc-event-main {\n    color: #fff;\n    color: var(--fc-event-text-color, #fff);\n    height: 100%;\n  }\n\n.fc-v-event .fc-event-main-frame {\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n  }\n\n.fc-v-event .fc-event-time {\n    flex-grow: 0;\n    flex-shrink: 0;\n    max-height: 100%;\n    overflow: hidden;\n  }\n\n.fc-v-event .fc-event-title-container { /* a container for the sticky cushion */\n    flex-grow: 1;\n    flex-shrink: 1;\n    min-height: 0; /* important for allowing to shrink all the way */\n  }\n\n.fc-v-event .fc-event-title { /* will have fc-sticky on it */\n    top: 0;\n    bottom: 0;\n    max-height: 100%; /* clip overflow */\n    overflow: hidden;\n  }\n\n.fc-v-event:not(.fc-event-start) {\n    border-top-width: 0;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n  }\n\n.fc-v-event:not(.fc-event-end) {\n    border-bottom-width: 0;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n\n.fc-v-event.fc-event-selected:before {\n    /* expand hit area */\n    left: -10px;\n    right: -10px;\n  }\n\n.fc-v-event {\n\n  /* resizer (mouse AND touch) */\n\n}\n\n.fc-v-event .fc-event-resizer-start {\n    cursor: n-resize;\n  }\n\n.fc-v-event .fc-event-resizer-end {\n    cursor: s-resize;\n  }\n\n.fc-v-event {\n\n  /* resizer for MOUSE */\n\n}\n\n.fc-v-event:not(.fc-event-selected) .fc-event-resizer {\n      height: 8px;\n      height: var(--fc-event-resizer-thickness, 8px);\n      left: 0;\n      right: 0;\n    }\n\n.fc-v-event:not(.fc-event-selected) .fc-event-resizer-start {\n      top: -4px;\n      top: calc(var(--fc-event-resizer-thickness, 8px) / -2);\n    }\n\n.fc-v-event:not(.fc-event-selected) .fc-event-resizer-end {\n      bottom: -4px;\n      bottom: calc(var(--fc-event-resizer-thickness, 8px) / -2);\n    }\n\n.fc-v-event {\n\n  /* resizer for TOUCH (when event is "selected") */\n\n}\n\n.fc-v-event.fc-event-selected .fc-event-resizer {\n      left: 50%;\n      margin-left: -4px;\n      margin-left: calc(var(--fc-event-resizer-dot-total-width, 8px) / -2);\n    }\n\n.fc-v-event.fc-event-selected .fc-event-resizer-start {\n      top: -4px;\n      top: calc(var(--fc-event-resizer-dot-total-width, 8px) / -2);\n    }\n\n.fc-v-event.fc-event-selected .fc-event-resizer-end {\n      bottom: -4px;\n      bottom: calc(var(--fc-event-resizer-dot-total-width, 8px) / -2);\n    }\n\n.fc .fc-timegrid .fc-daygrid-body { /* the all-day daygrid within the timegrid view */\n    z-index: 2; /* put above the timegrid-body so that more-popover is above everything. TODO: better solution */\n  }\n\n.fc .fc-timegrid-divider {\n    padding: 0 0 2px; /* browsers get confused when you set height. use padding instead */\n  }\n\n.fc .fc-timegrid-body {\n    position: relative;\n    z-index: 1; /* scope the z-indexes of slots and cols */\n    min-height: 100%; /* fill height always, even when slat table doesn\'t grow */\n  }\n\n.fc .fc-timegrid-axis-chunk { /* for advanced ScrollGrid */\n    position: relative /* offset parent for now-indicator-container */\n\n  }\n\n.fc .fc-timegrid-axis-chunk > table {\n      position: relative;\n      z-index: 1; /* above the now-indicator-container */\n    }\n\n.fc .fc-timegrid-slots {\n    position: relative;\n    z-index: 1;\n  }\n\n.fc .fc-timegrid-slot { /* a <td> */\n    height: 1.5em;\n    border-bottom: 0 /* each cell owns its top border */\n  }\n\n.fc .fc-timegrid-slot:empty:before {\n      content: \'\\00a0\'; /* make sure there\'s at least an empty space to create height for height syncing */\n    }\n\n.fc .fc-timegrid-slot-minor {\n    border-top-style: dotted;\n  }\n\n.fc .fc-timegrid-slot-label-cushion {\n    display: inline-block;\n    white-space: nowrap;\n  }\n\n.fc .fc-timegrid-slot-label {\n    vertical-align: middle; /* vertical align the slots */\n  }\n\n.fc {\n\n\n  /* slots AND axis cells (top-left corner of view including the "all-day" text) */\n\n}\n\n.fc .fc-timegrid-axis-cushion,\n  .fc .fc-timegrid-slot-label-cushion {\n    padding: 0 4px;\n  }\n\n.fc {\n\n\n  /* axis cells (top-left corner of view including the "all-day" text) */\n  /* vertical align is more complicated, uses flexbox */\n\n}\n\n.fc .fc-timegrid-axis-frame-liquid {\n    height: 100%; /* will need liquid-hack in FF */\n  }\n\n.fc .fc-timegrid-axis-frame {\n    overflow: hidden;\n    display: flex;\n    align-items: center; /* vertical align */\n    justify-content: flex-end; /* horizontal align. matches text-align below */\n  }\n\n.fc .fc-timegrid-axis-cushion {\n    max-width: 60px; /* limits the width of the "all-day" text */\n    flex-shrink: 0; /* allows text to expand how it normally would, regardless of constrained width */\n  }\n\n.fc-direction-ltr .fc-timegrid-slot-label-frame {\n    text-align: right;\n  }\n\n.fc-direction-rtl .fc-timegrid-slot-label-frame {\n    text-align: left;\n  }\n\n.fc-liquid-hack .fc-timegrid-axis-frame-liquid {\n  height: auto;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  }\n\n.fc .fc-timegrid-col.fc-day-today {\n      background-color: rgba(255, 220, 40, 0.15);\n      background-color: var(--fc-today-bg-color, rgba(255, 220, 40, 0.15));\n    }\n\n.fc .fc-timegrid-col-frame {\n    min-height: 100%; /* liquid-hack is below */\n    position: relative;\n  }\n\n.fc-media-screen.fc-liquid-hack .fc-timegrid-col-frame {\n  height: auto;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n    }\n\n.fc-media-screen .fc-timegrid-cols {\n    position: absolute; /* no z-index. children will decide and go above slots */\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0\n  }\n\n.fc-media-screen .fc-timegrid-cols > table {\n      height: 100%;\n    }\n\n.fc-media-screen .fc-timegrid-col-bg,\n  .fc-media-screen .fc-timegrid-col-events,\n  .fc-media-screen .fc-timegrid-now-indicator-container {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n  }\n\n.fc {\n\n  /* bg */\n\n}\n\n.fc .fc-timegrid-col-bg {\n    z-index: 2; /* TODO: kill */\n  }\n\n.fc .fc-timegrid-col-bg .fc-non-business { z-index: 1 }\n\n.fc .fc-timegrid-col-bg .fc-bg-event { z-index: 2 }\n\n.fc .fc-timegrid-col-bg .fc-highlight { z-index: 3 }\n\n.fc .fc-timegrid-bg-harness {\n    position: absolute; /* top/bottom will be set by JS */\n    left: 0;\n    right: 0;\n  }\n\n.fc {\n\n  /* fg events */\n  /* (the mirror segs are put into a separate container with same classname, */\n  /* and they must be after the normal seg container to appear at a higher z-index) */\n\n}\n\n.fc .fc-timegrid-col-events {\n    z-index: 3;\n    /* child event segs have z-indexes that are scoped within this div */\n  }\n\n.fc {\n\n  /* now indicator */\n\n}\n\n.fc .fc-timegrid-now-indicator-container {\n    bottom: 0;\n    overflow: hidden; /* don\'t let overflow of lines/arrows cause unnecessary scrolling */\n    /* z-index is set on the individual elements */\n  }\n\n.fc-direction-ltr .fc-timegrid-col-events {\n    margin: 0 2.5% 0 2px;\n  }\n\n.fc-direction-rtl .fc-timegrid-col-events {\n    margin: 0 2px 0 2.5%;\n  }\n\n.fc-timegrid-event-harness {\n  position: absolute /* top/left/right/bottom will all be set by JS */\n}\n\n.fc-timegrid-event-harness > .fc-timegrid-event {\n    position: absolute; /* absolute WITHIN the harness */\n    top: 0; /* for when not yet positioned */\n    bottom: 0; /* " */\n    left: 0;\n    right: 0;\n  }\n\n.fc-timegrid-event-harness-inset .fc-timegrid-event,\n.fc-timegrid-event.fc-event-mirror,\n.fc-timegrid-more-link {\n  box-shadow: 0px 0px 0px 1px #fff;\n  box-shadow: 0px 0px 0px 1px var(--fc-page-bg-color, #fff);\n}\n\n.fc-timegrid-event,\n.fc-timegrid-more-link { /* events need to be root */\n  font-size: .85em;\n  font-size: var(--fc-small-font-size, .85em);\n  border-radius: 3px;\n}\n\n.fc-timegrid-event { /* events need to be root */\n  margin-bottom: 1px /* give some space from bottom */\n}\n\n.fc-timegrid-event .fc-event-main {\n    padding: 1px 1px 0;\n  }\n\n.fc-timegrid-event .fc-event-time {\n    white-space: nowrap;\n    font-size: .85em;\n    font-size: var(--fc-small-font-size, .85em);\n    margin-bottom: 1px;\n  }\n\n.fc-timegrid-event-short .fc-event-main-frame {\n    flex-direction: row;\n    overflow: hidden;\n  }\n\n.fc-timegrid-event-short .fc-event-time:after {\n    content: \'\\00a0-\\00a0\'; /* dash surrounded by non-breaking spaces */\n  }\n\n.fc-timegrid-event-short .fc-event-title {\n    font-size: .85em;\n    font-size: var(--fc-small-font-size, .85em)\n  }\n\n.fc-timegrid-more-link { /* does NOT inherit from fc-timegrid-event */\n  position: absolute;\n  z-index: 9999; /* hack */\n  color: inherit;\n  color: var(--fc-more-link-text-color, inherit);\n  background: #d0d0d0;\n  background: var(--fc-more-link-bg-color, #d0d0d0);\n  cursor: pointer;\n  margin-bottom: 1px; /* match space below fc-timegrid-event */\n}\n\n.fc-timegrid-more-link-inner { /* has fc-sticky */\n  padding: 3px 2px;\n  top: 0;\n}\n\n.fc-direction-ltr .fc-timegrid-more-link {\n    right: 0;\n  }\n\n.fc-direction-rtl .fc-timegrid-more-link {\n    left: 0;\n  }\n\n.fc {\n\n  /* line */\n\n}\n\n.fc .fc-timegrid-now-indicator-line {\n    position: absolute;\n    z-index: 4;\n    left: 0;\n    right: 0;\n    border-style: solid;\n    border-color: red;\n    border-color: var(--fc-now-indicator-color, red);\n    border-width: 1px 0 0;\n  }\n\n.fc {\n\n  /* arrow */\n\n}\n\n.fc .fc-timegrid-now-indicator-arrow {\n    position: absolute;\n    z-index: 4;\n    margin-top: -5px; /* vertically center on top coordinate */\n    border-style: solid;\n    border-color: red;\n    border-color: var(--fc-now-indicator-color, red);\n  }\n\n.fc-direction-ltr .fc-timegrid-now-indicator-arrow {\n    left: 0;\n\n    /* triangle pointing right. TODO: mixin */\n    border-width: 5px 0 5px 6px;\n    border-top-color: transparent;\n    border-bottom-color: transparent;\n  }\n\n.fc-direction-rtl .fc-timegrid-now-indicator-arrow {\n    right: 0;\n\n    /* triangle pointing left. TODO: mixin */\n    border-width: 5px 6px 5px 0;\n    border-top-color: transparent;\n    border-bottom-color: transparent;\n  }\n';
        },
    },
]);
