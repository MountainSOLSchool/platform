'use strict';
var lh = Object.defineProperty,
    ch = Object.defineProperties,
    hh = Object.getOwnPropertyDescriptors,
    io = Object.getOwnPropertySymbols,
    dh = Object.prototype.hasOwnProperty,
    uh = Object.prototype.propertyIsEnumerable,
    no = (et, Y, I) =>
        Y in et
            ? lh(et, Y, {
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                  value: I,
              })
            : (et[Y] = I),
    Yi = (et, Y) => {
        for (var I in Y || (Y = {})) dh.call(Y, I) && no(et, I, Y[I]);
        if (io) for (var I of io(Y)) uh.call(Y, I) && no(et, I, Y[I]);
        return et;
    },
    Ui = (et, Y) => ch(et, hh(Y));
(self.webpackChunkportal = self.webpackChunkportal || []).push([
    [302],
    {
        1302: (et, Y, I) => {
            I.r(Y), I.d(Y, { DashboardComponentModule: () => ah });
            var _t = I(9808),
                P = I(5e3);
            const Z =
                'undefined' == typeof window
                    ? function (i) {
                          return i();
                      }
                    : window.requestAnimationFrame;
            function zt(i, e, t) {
                const n = t || ((r) => Array.prototype.slice.call(r));
                let s = !1,
                    o = [];
                return function (...r) {
                    (o = n(r)),
                        s ||
                            ((s = !0),
                            Z.call(window, () => {
                                (s = !1), i.apply(e, o);
                            }));
                };
            }
            const Yt = (i) =>
                    'start' === i ? 'left' : 'end' === i ? 'right' : 'center',
                K = (i, e, t) =>
                    'start' === i ? e : 'end' === i ? t : (e + t) / 2;
            function dt() {}
            const oo = (function () {
                let i = 0;
                return function () {
                    return i++;
                };
            })();
            function R(i) {
                return null == i;
            }
            function V(i) {
                if (Array.isArray && Array.isArray(i)) return !0;
                const e = Object.prototype.toString.call(i);
                return '[object' === e.slice(0, 7) && 'Array]' === e.slice(-6);
            }
            function A(i) {
                return (
                    null !== i &&
                    '[object Object]' === Object.prototype.toString.call(i)
                );
            }
            const j = (i) =>
                ('number' == typeof i || i instanceof Number) && isFinite(+i);
            function it(i, e) {
                return j(i) ? i : e;
            }
            function C(i, e) {
                return void 0 === i ? e : i;
            }
            const Xi = (i, e) =>
                'string' == typeof i && i.endsWith('%')
                    ? (parseFloat(i) / 100) * e
                    : +i;
            function W(i, e, t) {
                if (i && 'function' == typeof i.call) return i.apply(t, e);
            }
            function E(i, e, t, n) {
                let s, o, r;
                if (V(i))
                    if (((o = i.length), n))
                        for (s = o - 1; s >= 0; s--) e.call(t, i[s], s);
                    else for (s = 0; s < o; s++) e.call(t, i[s], s);
                else if (A(i))
                    for (r = Object.keys(i), o = r.length, s = 0; s < o; s++)
                        e.call(t, i[r[s]], r[s]);
            }
            function ve(i, e) {
                let t, n, s, o;
                if (!i || !e || i.length !== e.length) return !1;
                for (t = 0, n = i.length; t < n; ++t)
                    if (
                        ((s = i[t]),
                        (o = e[t]),
                        s.datasetIndex !== o.datasetIndex ||
                            s.index !== o.index)
                    )
                        return !1;
                return !0;
            }
            function Me(i) {
                if (V(i)) return i.map(Me);
                if (A(i)) {
                    const e = Object.create(null),
                        t = Object.keys(i),
                        n = t.length;
                    let s = 0;
                    for (; s < n; ++s) e[t[s]] = Me(i[t[s]]);
                    return e;
                }
                return i;
            }
            function Ki(i) {
                return (
                    -1 === ['__proto__', 'prototype', 'constructor'].indexOf(i)
                );
            }
            function ao(i, e, t, n) {
                if (!Ki(i)) return;
                const s = e[i],
                    o = t[i];
                A(s) && A(o) ? Ut(s, o, n) : (e[i] = Me(o));
            }
            function Ut(i, e, t) {
                const n = V(e) ? e : [e],
                    s = n.length;
                if (!A(i)) return i;
                const o = (t = t || {}).merger || ao;
                for (let r = 0; r < s; ++r) {
                    if (!A((e = n[r]))) continue;
                    const a = Object.keys(e);
                    for (let l = 0, c = a.length; l < c; ++l) o(a[l], i, e, t);
                }
                return i;
            }
            function Xt(i, e) {
                return Ut(i, e, { merger: lo });
            }
            function lo(i, e, t) {
                if (!Ki(i)) return;
                const n = e[i],
                    s = t[i];
                A(n) && A(s)
                    ? Xt(n, s)
                    : Object.prototype.hasOwnProperty.call(e, i) ||
                      (e[i] = Me(s));
            }
            function Zi(i, e) {
                const t = i.indexOf('.', e);
                return -1 === t ? i.length : t;
            }
            function yt(i, e) {
                if ('' === e) return i;
                let t = 0,
                    n = Zi(e, t);
                for (; i && n > t; )
                    (i = i[e.slice(t, n)]), (t = n + 1), (n = Zi(e, t));
                return i;
            }
            function ei(i) {
                return i.charAt(0).toUpperCase() + i.slice(1);
            }
            const nt = (i) => void 0 !== i,
                vt = (i) => 'function' == typeof i,
                qi = (i, e) => {
                    if (i.size !== e.size) return !1;
                    for (const t of i) if (!e.has(t)) return !1;
                    return !0;
                },
                N = Math.PI,
                z = 2 * N,
                fo = z + N,
                we = Number.POSITIVE_INFINITY,
                go = N / 180,
                H = N / 2,
                Kt = N / 4,
                Gi = (2 * N) / 3,
                st = Math.log10,
                lt = Math.sign;
            function Ji(i) {
                const e = Math.round(i);
                i = qt(i, e, i / 1e3) ? e : i;
                const t = Math.pow(10, Math.floor(st(i))),
                    n = i / t;
                return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * t;
            }
            function Zt(i) {
                return !isNaN(parseFloat(i)) && isFinite(i);
            }
            function qt(i, e, t) {
                return Math.abs(i - e) < t;
            }
            function Qi(i, e, t) {
                let n, s, o;
                for (n = 0, s = i.length; n < s; n++)
                    (o = i[n][t]),
                        isNaN(o) ||
                            ((e.min = Math.min(e.min, o)),
                            (e.max = Math.max(e.max, o)));
            }
            function rt(i) {
                return i * (N / 180);
            }
            function ii(i) {
                return i * (180 / N);
            }
            function tn(i) {
                if (!j(i)) return;
                let e = 1,
                    t = 0;
                for (; Math.round(i * e) / e !== i; ) (e *= 10), t++;
                return t;
            }
            function en(i, e) {
                const t = e.x - i.x,
                    n = e.y - i.y,
                    s = Math.sqrt(t * t + n * n);
                let o = Math.atan2(n, t);
                return o < -0.5 * N && (o += z), { angle: o, distance: s };
            }
            function ni(i, e) {
                return Math.sqrt(
                    Math.pow(e.x - i.x, 2) + Math.pow(e.y - i.y, 2)
                );
            }
            function bo(i, e) {
                return ((i - e + fo) % z) - N;
            }
            function tt(i) {
                return ((i % z) + z) % z;
            }
            function Gt(i, e, t, n) {
                const s = tt(i),
                    o = tt(e),
                    r = tt(t),
                    a = tt(o - s),
                    l = tt(r - s),
                    c = tt(s - o),
                    h = tt(s - r);
                return s === o || s === r || (n && o === r) || (a > l && c < h);
            }
            function X(i, e, t) {
                return Math.max(e, Math.min(t, i));
            }
            function ut(i, e, t, n = 1e-6) {
                return i >= Math.min(e, t) - n && i <= Math.max(e, t) + n;
            }
            const ke = (i) => 0 === i || 1 === i,
                nn = (i, e, t) =>
                    -Math.pow(2, 10 * (i -= 1)) * Math.sin(((i - e) * z) / t),
                sn = (i, e, t) =>
                    Math.pow(2, -10 * i) * Math.sin(((i - e) * z) / t) + 1,
                Jt = {
                    linear: (i) => i,
                    easeInQuad: (i) => i * i,
                    easeOutQuad: (i) => -i * (i - 2),
                    easeInOutQuad: (i) =>
                        (i /= 0.5) < 1
                            ? 0.5 * i * i
                            : -0.5 * (--i * (i - 2) - 1),
                    easeInCubic: (i) => i * i * i,
                    easeOutCubic: (i) => (i -= 1) * i * i + 1,
                    easeInOutCubic: (i) =>
                        (i /= 0.5) < 1
                            ? 0.5 * i * i * i
                            : 0.5 * ((i -= 2) * i * i + 2),
                    easeInQuart: (i) => i * i * i * i,
                    easeOutQuart: (i) => -((i -= 1) * i * i * i - 1),
                    easeInOutQuart: (i) =>
                        (i /= 0.5) < 1
                            ? 0.5 * i * i * i * i
                            : -0.5 * ((i -= 2) * i * i * i - 2),
                    easeInQuint: (i) => i * i * i * i * i,
                    easeOutQuint: (i) => (i -= 1) * i * i * i * i + 1,
                    easeInOutQuint: (i) =>
                        (i /= 0.5) < 1
                            ? 0.5 * i * i * i * i * i
                            : 0.5 * ((i -= 2) * i * i * i * i + 2),
                    easeInSine: (i) => 1 - Math.cos(i * H),
                    easeOutSine: (i) => Math.sin(i * H),
                    easeInOutSine: (i) => -0.5 * (Math.cos(N * i) - 1),
                    easeInExpo: (i) =>
                        0 === i ? 0 : Math.pow(2, 10 * (i - 1)),
                    easeOutExpo: (i) =>
                        1 === i ? 1 : 1 - Math.pow(2, -10 * i),
                    easeInOutExpo: (i) =>
                        ke(i)
                            ? i
                            : i < 0.5
                            ? 0.5 * Math.pow(2, 10 * (2 * i - 1))
                            : 0.5 * (2 - Math.pow(2, -10 * (2 * i - 1))),
                    easeInCirc: (i) =>
                        i >= 1 ? i : -(Math.sqrt(1 - i * i) - 1),
                    easeOutCirc: (i) => Math.sqrt(1 - (i -= 1) * i),
                    easeInOutCirc: (i) =>
                        (i /= 0.5) < 1
                            ? -0.5 * (Math.sqrt(1 - i * i) - 1)
                            : 0.5 * (Math.sqrt(1 - (i -= 2) * i) + 1),
                    easeInElastic: (i) => (ke(i) ? i : nn(i, 0.075, 0.3)),
                    easeOutElastic: (i) => (ke(i) ? i : sn(i, 0.075, 0.3)),
                    easeInOutElastic: (i) =>
                        ke(i)
                            ? i
                            : i < 0.5
                            ? 0.5 * nn(2 * i, 0.1125, 0.45)
                            : 0.5 + 0.5 * sn(2 * i - 1, 0.1125, 0.45),
                    easeInBack: (i) => i * i * (2.70158 * i - 1.70158),
                    easeOutBack: (i) =>
                        (i -= 1) * i * (2.70158 * i + 1.70158) + 1,
                    easeInOutBack(i) {
                        let e = 1.70158;
                        return (i /= 0.5) < 1
                            ? i * i * ((1 + (e *= 1.525)) * i - e) * 0.5
                            : 0.5 *
                                  ((i -= 2) * i * ((1 + (e *= 1.525)) * i + e) +
                                      2);
                    },
                    easeInBounce: (i) => 1 - Jt.easeOutBounce(1 - i),
                    easeOutBounce: (i) =>
                        i < 1 / 2.75
                            ? 7.5625 * i * i
                            : i < 2 / 2.75
                            ? 7.5625 * (i -= 1.5 / 2.75) * i + 0.75
                            : i < 2.5 / 2.75
                            ? 7.5625 * (i -= 2.25 / 2.75) * i + 0.9375
                            : 7.5625 * (i -= 2.625 / 2.75) * i + 0.984375,
                    easeInOutBounce: (i) =>
                        i < 0.5
                            ? 0.5 * Jt.easeInBounce(2 * i)
                            : 0.5 * Jt.easeOutBounce(2 * i - 1) + 0.5,
                };
            function Qt(i) {
                return (i + 0.5) | 0;
            }
            const Mt = (i, e, t) => Math.max(Math.min(i, t), e);
            function te(i) {
                return Mt(Qt(2.55 * i), 0, 255);
            }
            function wt(i) {
                return Mt(Qt(255 * i), 0, 255);
            }
            function ft(i) {
                return Mt(Qt(i / 2.55) / 100, 0, 1);
            }
            function on(i) {
                return Mt(Qt(100 * i), 0, 100);
            }
            const ot = {
                    0: 0,
                    1: 1,
                    2: 2,
                    3: 3,
                    4: 4,
                    5: 5,
                    6: 6,
                    7: 7,
                    8: 8,
                    9: 9,
                    A: 10,
                    B: 11,
                    C: 12,
                    D: 13,
                    E: 14,
                    F: 15,
                    a: 10,
                    b: 11,
                    c: 12,
                    d: 13,
                    e: 14,
                    f: 15,
                },
                si = [...'0123456789ABCDEF'],
                _o = (i) => si[15 & i],
                yo = (i) => si[(240 & i) >> 4] + si[15 & i],
                Se = (i) => (240 & i) >> 4 == (15 & i);
            const So =
                /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
            function rn(i, e, t) {
                const n = e * Math.min(t, 1 - t),
                    s = (o, r = (o + i / 30) % 12) =>
                        t - n * Math.max(Math.min(r - 3, 9 - r, 1), -1);
                return [s(0), s(8), s(4)];
            }
            function Po(i, e, t) {
                const n = (s, o = (s + i / 60) % 6) =>
                    t - t * e * Math.max(Math.min(o, 4 - o, 1), 0);
                return [n(5), n(3), n(1)];
            }
            function Co(i, e, t) {
                const n = rn(i, 1, 0.5);
                let s;
                for (
                    e + t > 1 && ((s = 1 / (e + t)), (e *= s), (t *= s)), s = 0;
                    s < 3;
                    s++
                )
                    (n[s] *= 1 - e - t), (n[s] += e);
                return n;
            }
            function oi(i) {
                const t = i.r / 255,
                    n = i.g / 255,
                    s = i.b / 255,
                    o = Math.max(t, n, s),
                    r = Math.min(t, n, s),
                    a = (o + r) / 2;
                let l, c, h;
                return (
                    o !== r &&
                        ((h = o - r),
                        (c = a > 0.5 ? h / (2 - o - r) : h / (o + r)),
                        (l = (function Do(i, e, t, n, s) {
                            return i === s
                                ? (e - t) / n + (e < t ? 6 : 0)
                                : e === s
                                ? (t - i) / n + 2
                                : (i - e) / n + 4;
                        })(t, n, s, h, o)),
                        (l = 60 * l + 0.5)),
                    [0 | l, c || 0, a]
                );
            }
            function ri(i, e, t, n) {
                return (
                    Array.isArray(e) ? i(e[0], e[1], e[2]) : i(e, t, n)
                ).map(wt);
            }
            function ai(i, e, t) {
                return ri(rn, i, e, t);
            }
            function an(i) {
                return ((i % 360) + 360) % 360;
            }
            const ln = {
                    x: 'dark',
                    Z: 'light',
                    Y: 're',
                    X: 'blu',
                    W: 'gr',
                    V: 'medium',
                    U: 'slate',
                    A: 'ee',
                    T: 'ol',
                    S: 'or',
                    B: 'ra',
                    C: 'lateg',
                    D: 'ights',
                    R: 'in',
                    Q: 'turquois',
                    E: 'hi',
                    P: 'ro',
                    O: 'al',
                    N: 'le',
                    M: 'de',
                    L: 'yello',
                    F: 'en',
                    K: 'ch',
                    G: 'arks',
                    H: 'ea',
                    I: 'ightg',
                    J: 'wh',
                },
                cn = {
                    OiceXe: 'f0f8ff',
                    antiquewEte: 'faebd7',
                    aqua: 'ffff',
                    aquamarRe: '7fffd4',
                    azuY: 'f0ffff',
                    beige: 'f5f5dc',
                    bisque: 'ffe4c4',
                    black: '0',
                    blanKedOmond: 'ffebcd',
                    Xe: 'ff',
                    XeviTet: '8a2be2',
                    bPwn: 'a52a2a',
                    burlywood: 'deb887',
                    caMtXe: '5f9ea0',
                    KartYuse: '7fff00',
                    KocTate: 'd2691e',
                    cSO: 'ff7f50',
                    cSnflowerXe: '6495ed',
                    cSnsilk: 'fff8dc',
                    crimson: 'dc143c',
                    cyan: 'ffff',
                    xXe: '8b',
                    xcyan: '8b8b',
                    xgTMnPd: 'b8860b',
                    xWay: 'a9a9a9',
                    xgYF: '6400',
                    xgYy: 'a9a9a9',
                    xkhaki: 'bdb76b',
                    xmagFta: '8b008b',
                    xTivegYF: '556b2f',
                    xSange: 'ff8c00',
                    xScEd: '9932cc',
                    xYd: '8b0000',
                    xsOmon: 'e9967a',
                    xsHgYF: '8fbc8f',
                    xUXe: '483d8b',
                    xUWay: '2f4f4f',
                    xUgYy: '2f4f4f',
                    xQe: 'ced1',
                    xviTet: '9400d3',
                    dAppRk: 'ff1493',
                    dApskyXe: 'bfff',
                    dimWay: '696969',
                    dimgYy: '696969',
                    dodgerXe: '1e90ff',
                    fiYbrick: 'b22222',
                    flSOwEte: 'fffaf0',
                    foYstWAn: '228b22',
                    fuKsia: 'ff00ff',
                    gaRsbSo: 'dcdcdc',
                    ghostwEte: 'f8f8ff',
                    gTd: 'ffd700',
                    gTMnPd: 'daa520',
                    Way: '808080',
                    gYF: '8000',
                    gYFLw: 'adff2f',
                    gYy: '808080',
                    honeyMw: 'f0fff0',
                    hotpRk: 'ff69b4',
                    RdianYd: 'cd5c5c',
                    Rdigo: '4b0082',
                    ivSy: 'fffff0',
                    khaki: 'f0e68c',
                    lavFMr: 'e6e6fa',
                    lavFMrXsh: 'fff0f5',
                    lawngYF: '7cfc00',
                    NmoncEffon: 'fffacd',
                    ZXe: 'add8e6',
                    ZcSO: 'f08080',
                    Zcyan: 'e0ffff',
                    ZgTMnPdLw: 'fafad2',
                    ZWay: 'd3d3d3',
                    ZgYF: '90ee90',
                    ZgYy: 'd3d3d3',
                    ZpRk: 'ffb6c1',
                    ZsOmon: 'ffa07a',
                    ZsHgYF: '20b2aa',
                    ZskyXe: '87cefa',
                    ZUWay: '778899',
                    ZUgYy: '778899',
                    ZstAlXe: 'b0c4de',
                    ZLw: 'ffffe0',
                    lime: 'ff00',
                    limegYF: '32cd32',
                    lRF: 'faf0e6',
                    magFta: 'ff00ff',
                    maPon: '800000',
                    VaquamarRe: '66cdaa',
                    VXe: 'cd',
                    VScEd: 'ba55d3',
                    VpurpN: '9370db',
                    VsHgYF: '3cb371',
                    VUXe: '7b68ee',
                    VsprRggYF: 'fa9a',
                    VQe: '48d1cc',
                    VviTetYd: 'c71585',
                    midnightXe: '191970',
                    mRtcYam: 'f5fffa',
                    mistyPse: 'ffe4e1',
                    moccasR: 'ffe4b5',
                    navajowEte: 'ffdead',
                    navy: '80',
                    Tdlace: 'fdf5e6',
                    Tive: '808000',
                    TivedBb: '6b8e23',
                    Sange: 'ffa500',
                    SangeYd: 'ff4500',
                    ScEd: 'da70d6',
                    pOegTMnPd: 'eee8aa',
                    pOegYF: '98fb98',
                    pOeQe: 'afeeee',
                    pOeviTetYd: 'db7093',
                    papayawEp: 'ffefd5',
                    pHKpuff: 'ffdab9',
                    peru: 'cd853f',
                    pRk: 'ffc0cb',
                    plum: 'dda0dd',
                    powMrXe: 'b0e0e6',
                    purpN: '800080',
                    YbeccapurpN: '663399',
                    Yd: 'ff0000',
                    Psybrown: 'bc8f8f',
                    PyOXe: '4169e1',
                    saddNbPwn: '8b4513',
                    sOmon: 'fa8072',
                    sandybPwn: 'f4a460',
                    sHgYF: '2e8b57',
                    sHshell: 'fff5ee',
                    siFna: 'a0522d',
                    silver: 'c0c0c0',
                    skyXe: '87ceeb',
                    UXe: '6a5acd',
                    UWay: '708090',
                    UgYy: '708090',
                    snow: 'fffafa',
                    sprRggYF: 'ff7f',
                    stAlXe: '4682b4',
                    tan: 'd2b48c',
                    teO: '8080',
                    tEstN: 'd8bfd8',
                    tomato: 'ff6347',
                    Qe: '40e0d0',
                    viTet: 'ee82ee',
                    JHt: 'f5deb3',
                    wEte: 'ffffff',
                    wEtesmoke: 'f5f5f5',
                    Lw: 'ffff00',
                    LwgYF: '9acd32',
                };
            let Pe;
            const Io =
                    /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/,
                li = (i) =>
                    i <= 0.0031308
                        ? 12.92 * i
                        : 1.055 * Math.pow(i, 1 / 2.4) - 0.055,
                Bt = (i) =>
                    i <= 0.04045
                        ? i / 12.92
                        : Math.pow((i + 0.055) / 1.055, 2.4);
            function Ce(i, e, t) {
                if (i) {
                    let n = oi(i);
                    (n[e] = Math.max(
                        0,
                        Math.min(n[e] + n[e] * t, 0 === e ? 360 : 1)
                    )),
                        (n = ai(n)),
                        (i.r = n[0]),
                        (i.g = n[1]),
                        (i.b = n[2]);
                }
            }
            function hn(i, e) {
                return i && Object.assign(e || {}, i);
            }
            function dn(i) {
                var e = { r: 0, g: 0, b: 0, a: 255 };
                return (
                    Array.isArray(i)
                        ? i.length >= 3 &&
                          ((e = { r: i[0], g: i[1], b: i[2], a: 255 }),
                          i.length > 3 && (e.a = wt(i[3])))
                        : ((e = hn(i, { r: 0, g: 0, b: 0, a: 1 })).a = wt(e.a)),
                    e
                );
            }
            function Wo(i) {
                return 'r' === i.charAt(0)
                    ? (function zo(i) {
                          const e = Io.exec(i);
                          let n,
                              s,
                              o,
                              t = 255;
                          if (e) {
                              if (e[7] !== n) {
                                  const r = +e[7];
                                  t = e[8] ? te(r) : Mt(255 * r, 0, 255);
                              }
                              return (
                                  (n = +e[1]),
                                  (s = +e[3]),
                                  (o = +e[5]),
                                  (n = 255 & (e[2] ? te(n) : Mt(n, 0, 255))),
                                  (s = 255 & (e[4] ? te(s) : Mt(s, 0, 255))),
                                  (o = 255 & (e[6] ? te(o) : Mt(o, 0, 255))),
                                  { r: n, g: s, b: o, a: t }
                              );
                          }
                      })(i)
                    : (function Lo(i) {
                          const e = So.exec(i);
                          let n,
                              t = 255;
                          if (!e) return;
                          e[5] !== n && (t = e[6] ? te(+e[5]) : wt(+e[5]));
                          const s = an(+e[2]),
                              o = +e[3] / 100,
                              r = +e[4] / 100;
                          return (
                              (n =
                                  'hwb' === e[1]
                                      ? (function Ao(i, e, t) {
                                            return ri(Co, i, e, t);
                                        })(s, o, r)
                                      : 'hsv' === e[1]
                                      ? (function Oo(i, e, t) {
                                            return ri(Po, i, e, t);
                                        })(s, o, r)
                                      : ai(s, o, r)),
                              { r: n[0], g: n[1], b: n[2], a: t }
                          );
                      })(i);
            }
            class De {
                constructor(e) {
                    if (e instanceof De) return e;
                    const t = typeof e;
                    let n;
                    'object' === t
                        ? (n = dn(e))
                        : 'string' === t &&
                          (n =
                              (function Mo(i) {
                                  var t,
                                      e = i.length;
                                  return (
                                      '#' === i[0] &&
                                          (4 === e || 5 === e
                                              ? (t = {
                                                    r: 255 & (17 * ot[i[1]]),
                                                    g: 255 & (17 * ot[i[2]]),
                                                    b: 255 & (17 * ot[i[3]]),
                                                    a:
                                                        5 === e
                                                            ? 17 * ot[i[4]]
                                                            : 255,
                                                })
                                              : (7 === e || 9 === e) &&
                                                (t = {
                                                    r:
                                                        (ot[i[1]] << 4) |
                                                        ot[i[2]],
                                                    g:
                                                        (ot[i[3]] << 4) |
                                                        ot[i[4]],
                                                    b:
                                                        (ot[i[5]] << 4) |
                                                        ot[i[6]],
                                                    a:
                                                        9 === e
                                                            ? (ot[i[7]] << 4) |
                                                              ot[i[8]]
                                                            : 255,
                                                })),
                                      t
                                  );
                              })(e) ||
                              (function Fo(i) {
                                  Pe ||
                                      ((Pe = (function Eo() {
                                          const i = {},
                                              e = Object.keys(cn),
                                              t = Object.keys(ln);
                                          let n, s, o, r, a;
                                          for (n = 0; n < e.length; n++) {
                                              for (
                                                  r = a = e[n], s = 0;
                                                  s < t.length;
                                                  s++
                                              )
                                                  (o = t[s]),
                                                      (a = a.replace(o, ln[o]));
                                              (o = parseInt(cn[r], 16)),
                                                  (i[a] = [
                                                      (o >> 16) & 255,
                                                      (o >> 8) & 255,
                                                      255 & o,
                                                  ]);
                                          }
                                          return i;
                                      })()),
                                      (Pe.transparent = [0, 0, 0, 0]));
                                  const e = Pe[i.toLowerCase()];
                                  return (
                                      e && {
                                          r: e[0],
                                          g: e[1],
                                          b: e[2],
                                          a: 4 === e.length ? e[3] : 255,
                                      }
                                  );
                              })(e) ||
                              Wo(e)),
                        (this._rgb = n),
                        (this._valid = !!n);
                }
                get valid() {
                    return this._valid;
                }
                get rgb() {
                    var e = hn(this._rgb);
                    return e && (e.a = ft(e.a)), e;
                }
                set rgb(e) {
                    this._rgb = dn(e);
                }
                rgbString() {
                    return this._valid
                        ? (function Bo(i) {
                              return (
                                  i &&
                                  (i.a < 255
                                      ? `rgba(${i.r}, ${i.g}, ${i.b}, ${ft(
                                            i.a
                                        )})`
                                      : `rgb(${i.r}, ${i.g}, ${i.b})`)
                              );
                          })(this._rgb)
                        : void 0;
                }
                hexString() {
                    return this._valid
                        ? (function ko(i) {
                              var e = ((i) =>
                                  Se(i.r) && Se(i.g) && Se(i.b) && Se(i.a))(i)
                                  ? _o
                                  : yo;
                              return i
                                  ? '#' +
                                        e(i.r) +
                                        e(i.g) +
                                        e(i.b) +
                                        ((i, e) => (i < 255 ? e(i) : ''))(
                                            i.a,
                                            e
                                        )
                                  : void 0;
                          })(this._rgb)
                        : void 0;
                }
                hslString() {
                    return this._valid
                        ? (function Ro(i) {
                              if (!i) return;
                              const e = oi(i),
                                  t = e[0],
                                  n = on(e[1]),
                                  s = on(e[2]);
                              return i.a < 255
                                  ? `hsla(${t}, ${n}%, ${s}%, ${ft(i.a)})`
                                  : `hsl(${t}, ${n}%, ${s}%)`;
                          })(this._rgb)
                        : void 0;
                }
                mix(e, t) {
                    if (e) {
                        const n = this.rgb,
                            s = e.rgb;
                        let o;
                        const r = t === o ? 0.5 : t,
                            a = 2 * r - 1,
                            l = n.a - s.a,
                            c =
                                ((a * l == -1 ? a : (a + l) / (1 + a * l)) +
                                    1) /
                                2;
                        (o = 1 - c),
                            (n.r = 255 & (c * n.r + o * s.r + 0.5)),
                            (n.g = 255 & (c * n.g + o * s.g + 0.5)),
                            (n.b = 255 & (c * n.b + o * s.b + 0.5)),
                            (n.a = r * n.a + (1 - r) * s.a),
                            (this.rgb = n);
                    }
                    return this;
                }
                interpolate(e, t) {
                    return (
                        e &&
                            (this._rgb = (function Vo(i, e, t) {
                                const n = Bt(ft(i.r)),
                                    s = Bt(ft(i.g)),
                                    o = Bt(ft(i.b));
                                return {
                                    r: wt(li(n + t * (Bt(ft(e.r)) - n))),
                                    g: wt(li(s + t * (Bt(ft(e.g)) - s))),
                                    b: wt(li(o + t * (Bt(ft(e.b)) - o))),
                                    a: i.a + t * (e.a - i.a),
                                };
                            })(this._rgb, e._rgb, t)),
                        this
                    );
                }
                clone() {
                    return new De(this.rgb);
                }
                alpha(e) {
                    return (this._rgb.a = wt(e)), this;
                }
                clearer(e) {
                    return (this._rgb.a *= 1 - e), this;
                }
                greyscale() {
                    const e = this._rgb,
                        t = Qt(0.3 * e.r + 0.59 * e.g + 0.11 * e.b);
                    return (e.r = e.g = e.b = t), this;
                }
                opaquer(e) {
                    return (this._rgb.a *= 1 + e), this;
                }
                negate() {
                    const e = this._rgb;
                    return (
                        (e.r = 255 - e.r),
                        (e.g = 255 - e.g),
                        (e.b = 255 - e.b),
                        this
                    );
                }
                lighten(e) {
                    return Ce(this._rgb, 2, e), this;
                }
                darken(e) {
                    return Ce(this._rgb, 2, -e), this;
                }
                saturate(e) {
                    return Ce(this._rgb, 1, e), this;
                }
                desaturate(e) {
                    return Ce(this._rgb, 1, -e), this;
                }
                rotate(e) {
                    return (
                        (function To(i, e) {
                            var t = oi(i);
                            (t[0] = an(t[0] + e)),
                                (t = ai(t)),
                                (i.r = t[0]),
                                (i.g = t[1]),
                                (i.b = t[2]);
                        })(this._rgb, e),
                        this
                    );
                }
            }
            function un(i) {
                return new De(i);
            }
            function fn(i) {
                if (i && 'object' == typeof i) {
                    const e = i.toString();
                    return (
                        '[object CanvasPattern]' === e ||
                        '[object CanvasGradient]' === e
                    );
                }
                return !1;
            }
            function gn(i) {
                return fn(i) ? i : un(i);
            }
            function ci(i) {
                return fn(i) ? i : un(i).saturate(0.5).darken(0.1).hexString();
            }
            const Ct = Object.create(null),
                hi = Object.create(null);
            function ee(i, e) {
                if (!e) return i;
                const t = e.split('.');
                for (let n = 0, s = t.length; n < s; ++n) {
                    const o = t[n];
                    i = i[o] || (i[o] = Object.create(null));
                }
                return i;
            }
            function di(i, e, t) {
                return 'string' == typeof e
                    ? Ut(ee(i, e), t)
                    : Ut(ee(i, ''), e);
            }
            var O = new (class No {
                constructor(e) {
                    (this.animation = void 0),
                        (this.backgroundColor = 'rgba(0,0,0,0.1)'),
                        (this.borderColor = 'rgba(0,0,0,0.1)'),
                        (this.color = '#666'),
                        (this.datasets = {}),
                        (this.devicePixelRatio = (t) =>
                            t.chart.platform.getDevicePixelRatio()),
                        (this.elements = {}),
                        (this.events = [
                            'mousemove',
                            'mouseout',
                            'click',
                            'touchstart',
                            'touchmove',
                        ]),
                        (this.font = {
                            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                            size: 12,
                            style: 'normal',
                            lineHeight: 1.2,
                            weight: null,
                        }),
                        (this.hover = {}),
                        (this.hoverBackgroundColor = (t, n) =>
                            ci(n.backgroundColor)),
                        (this.hoverBorderColor = (t, n) => ci(n.borderColor)),
                        (this.hoverColor = (t, n) => ci(n.color)),
                        (this.indexAxis = 'x'),
                        (this.interaction = {
                            mode: 'nearest',
                            intersect: !0,
                            includeInvisible: !1,
                        }),
                        (this.maintainAspectRatio = !0),
                        (this.onHover = null),
                        (this.onClick = null),
                        (this.parsing = !0),
                        (this.plugins = {}),
                        (this.responsive = !0),
                        (this.scale = void 0),
                        (this.scales = {}),
                        (this.showLine = !0),
                        (this.drawActiveElementsOnTop = !0),
                        this.describe(e);
                }
                set(e, t) {
                    return di(this, e, t);
                }
                get(e) {
                    return ee(this, e);
                }
                describe(e, t) {
                    return di(hi, e, t);
                }
                override(e, t) {
                    return di(Ct, e, t);
                }
                route(e, t, n, s) {
                    const o = ee(this, e),
                        r = ee(this, n),
                        a = '_' + t;
                    Object.defineProperties(o, {
                        [a]: { value: o[t], writable: !0 },
                        [t]: {
                            enumerable: !0,
                            get() {
                                const l = this[a],
                                    c = r[s];
                                return A(l) ? Object.assign({}, c, l) : C(l, c);
                            },
                            set(l) {
                                this[a] = l;
                            },
                        },
                    });
                }
            })({
                _scriptable: (i) => !i.startsWith('on'),
                _indexable: (i) => 'events' !== i,
                hover: { _fallback: 'interaction' },
                interaction: { _scriptable: !1, _indexable: !1 },
            });
            function Ae(i, e, t, n, s) {
                let o = e[s];
                return (
                    o || ((o = e[s] = i.measureText(s).width), t.push(s)),
                    o > n && (n = o),
                    n
                );
            }
            function jo(i, e, t, n) {
                let s = ((n = n || {}).data = n.data || {}),
                    o = (n.garbageCollect = n.garbageCollect || []);
                n.font !== e &&
                    ((s = n.data = {}),
                    (o = n.garbageCollect = []),
                    (n.font = e)),
                    i.save(),
                    (i.font = e);
                let r = 0;
                const a = t.length;
                let l, c, h, d, u;
                for (l = 0; l < a; l++)
                    if (((d = t[l]), null != d && !0 !== V(d)))
                        r = Ae(i, s, o, r, d);
                    else if (V(d))
                        for (c = 0, h = d.length; c < h; c++)
                            (u = d[c]),
                                null != u && !V(u) && (r = Ae(i, s, o, r, u));
                i.restore();
                const f = o.length / 2;
                if (f > t.length) {
                    for (l = 0; l < f; l++) delete s[o[l]];
                    o.splice(0, f);
                }
                return r;
            }
            function Dt(i, e, t) {
                const n = i.currentDevicePixelRatio,
                    s = 0 !== t ? Math.max(t / 2, 0.5) : 0;
                return Math.round((e - s) * n) / n + s;
            }
            function pn(i, e) {
                (e = e || i.getContext('2d')).save(),
                    e.resetTransform(),
                    e.clearRect(0, 0, i.width, i.height),
                    e.restore();
            }
            function Oe(i, e, t, n) {
                let s, o, r, a, l;
                const c = e.pointStyle,
                    h = e.rotation,
                    d = e.radius;
                let u = (h || 0) * go;
                if (
                    c &&
                    'object' == typeof c &&
                    ((s = c.toString()),
                    '[object HTMLImageElement]' === s ||
                        '[object HTMLCanvasElement]' === s)
                )
                    return (
                        i.save(),
                        i.translate(t, n),
                        i.rotate(u),
                        i.drawImage(
                            c,
                            -c.width / 2,
                            -c.height / 2,
                            c.width,
                            c.height
                        ),
                        void i.restore()
                    );
                if (!(isNaN(d) || d <= 0)) {
                    switch ((i.beginPath(), c)) {
                        default:
                            i.arc(t, n, d, 0, z), i.closePath();
                            break;
                        case 'triangle':
                            i.moveTo(t + Math.sin(u) * d, n - Math.cos(u) * d),
                                (u += Gi),
                                i.lineTo(
                                    t + Math.sin(u) * d,
                                    n - Math.cos(u) * d
                                ),
                                (u += Gi),
                                i.lineTo(
                                    t + Math.sin(u) * d,
                                    n - Math.cos(u) * d
                                ),
                                i.closePath();
                            break;
                        case 'rectRounded':
                            (l = 0.516 * d),
                                (a = d - l),
                                (o = Math.cos(u + Kt) * a),
                                (r = Math.sin(u + Kt) * a),
                                i.arc(t - o, n - r, l, u - N, u - H),
                                i.arc(t + r, n - o, l, u - H, u),
                                i.arc(t + o, n + r, l, u, u + H),
                                i.arc(t - r, n + o, l, u + H, u + N),
                                i.closePath();
                            break;
                        case 'rect':
                            if (!h) {
                                (a = Math.SQRT1_2 * d),
                                    i.rect(t - a, n - a, 2 * a, 2 * a);
                                break;
                            }
                            u += Kt;
                        case 'rectRot':
                            (o = Math.cos(u) * d),
                                (r = Math.sin(u) * d),
                                i.moveTo(t - o, n - r),
                                i.lineTo(t + r, n - o),
                                i.lineTo(t + o, n + r),
                                i.lineTo(t - r, n + o),
                                i.closePath();
                            break;
                        case 'crossRot':
                            u += Kt;
                        case 'cross':
                            (o = Math.cos(u) * d),
                                (r = Math.sin(u) * d),
                                i.moveTo(t - o, n - r),
                                i.lineTo(t + o, n + r),
                                i.moveTo(t + r, n - o),
                                i.lineTo(t - r, n + o);
                            break;
                        case 'star':
                            (o = Math.cos(u) * d),
                                (r = Math.sin(u) * d),
                                i.moveTo(t - o, n - r),
                                i.lineTo(t + o, n + r),
                                i.moveTo(t + r, n - o),
                                i.lineTo(t - r, n + o),
                                (u += Kt),
                                (o = Math.cos(u) * d),
                                (r = Math.sin(u) * d),
                                i.moveTo(t - o, n - r),
                                i.lineTo(t + o, n + r),
                                i.moveTo(t + r, n - o),
                                i.lineTo(t - r, n + o);
                            break;
                        case 'line':
                            (o = Math.cos(u) * d),
                                (r = Math.sin(u) * d),
                                i.moveTo(t - o, n - r),
                                i.lineTo(t + o, n + r);
                            break;
                        case 'dash':
                            i.moveTo(t, n),
                                i.lineTo(
                                    t + Math.cos(u) * d,
                                    n + Math.sin(u) * d
                                );
                    }
                    i.fill(), e.borderWidth > 0 && i.stroke();
                }
            }
            function ie(i, e, t) {
                return (
                    (t = t || 0.5),
                    !e ||
                        (i &&
                            i.x > e.left - t &&
                            i.x < e.right + t &&
                            i.y > e.top - t &&
                            i.y < e.bottom + t)
                );
            }
            function Le(i, e) {
                i.save(),
                    i.beginPath(),
                    i.rect(e.left, e.top, e.right - e.left, e.bottom - e.top),
                    i.clip();
            }
            function Te(i) {
                i.restore();
            }
            function $o(i, e, t, n, s) {
                if (!e) return i.lineTo(t.x, t.y);
                if ('middle' === s) {
                    const o = (e.x + t.x) / 2;
                    i.lineTo(o, e.y), i.lineTo(o, t.y);
                } else
                    ('after' === s) != !!n
                        ? i.lineTo(e.x, t.y)
                        : i.lineTo(t.x, e.y);
                i.lineTo(t.x, t.y);
            }
            function Yo(i, e, t, n) {
                if (!e) return i.lineTo(t.x, t.y);
                i.bezierCurveTo(
                    n ? e.cp1x : e.cp2x,
                    n ? e.cp1y : e.cp2y,
                    n ? t.cp2x : t.cp1x,
                    n ? t.cp2y : t.cp1y,
                    t.x,
                    t.y
                );
            }
            function At(i, e, t, n, s, o = {}) {
                const r = V(e) ? e : [e],
                    a = o.strokeWidth > 0 && '' !== o.strokeColor;
                let l, c;
                for (
                    i.save(),
                        i.font = s.string,
                        (function Uo(i, e) {
                            e.translation &&
                                i.translate(e.translation[0], e.translation[1]),
                                R(e.rotation) || i.rotate(e.rotation),
                                e.color && (i.fillStyle = e.color),
                                e.textAlign && (i.textAlign = e.textAlign),
                                e.textBaseline &&
                                    (i.textBaseline = e.textBaseline);
                        })(i, o),
                        l = 0;
                    l < r.length;
                    ++l
                )
                    (c = r[l]),
                        a &&
                            (o.strokeColor && (i.strokeStyle = o.strokeColor),
                            R(o.strokeWidth) || (i.lineWidth = o.strokeWidth),
                            i.strokeText(c, t, n, o.maxWidth)),
                        i.fillText(c, t, n, o.maxWidth),
                        Xo(i, t, n, c, o),
                        (n += s.lineHeight);
                i.restore();
            }
            function Xo(i, e, t, n, s) {
                if (s.strikethrough || s.underline) {
                    const o = i.measureText(n),
                        r = e - o.actualBoundingBoxLeft,
                        a = e + o.actualBoundingBoxRight,
                        l = t - o.actualBoundingBoxAscent,
                        c = t + o.actualBoundingBoxDescent,
                        h = s.strikethrough ? (l + c) / 2 : c;
                    (i.strokeStyle = i.fillStyle),
                        i.beginPath(),
                        (i.lineWidth = s.decorationWidth || 2),
                        i.moveTo(r, h),
                        i.lineTo(a, h),
                        i.stroke();
                }
            }
            function ne(i, e) {
                const { x: t, y: n, w: s, h: o, radius: r } = e;
                i.arc(t + r.topLeft, n + r.topLeft, r.topLeft, -H, N, !0),
                    i.lineTo(t, n + o - r.bottomLeft),
                    i.arc(
                        t + r.bottomLeft,
                        n + o - r.bottomLeft,
                        r.bottomLeft,
                        N,
                        H,
                        !0
                    ),
                    i.lineTo(t + s - r.bottomRight, n + o),
                    i.arc(
                        t + s - r.bottomRight,
                        n + o - r.bottomRight,
                        r.bottomRight,
                        H,
                        0,
                        !0
                    ),
                    i.lineTo(t + s, n + r.topRight),
                    i.arc(
                        t + s - r.topRight,
                        n + r.topRight,
                        r.topRight,
                        0,
                        -H,
                        !0
                    ),
                    i.lineTo(t + r.topLeft, n);
            }
            const Ko = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/),
                Zo = new RegExp(
                    /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/
                );
            function qo(i, e) {
                const t = ('' + i).match(Ko);
                if (!t || 'normal' === t[1]) return 1.2 * e;
                switch (((i = +t[2]), t[3])) {
                    case 'px':
                        return i;
                    case '%':
                        i /= 100;
                }
                return e * i;
            }
            const Go = (i) => +i || 0;
            function ui(i, e) {
                const t = {},
                    n = A(e),
                    s = n ? Object.keys(e) : e,
                    o = A(i)
                        ? n
                            ? (r) => C(i[r], i[e[r]])
                            : (r) => i[r]
                        : () => i;
                for (const r of s) t[r] = Go(o(r));
                return t;
            }
            function mn(i) {
                return ui(i, { top: 'y', right: 'x', bottom: 'y', left: 'x' });
            }
            function Ot(i) {
                return ui(i, [
                    'topLeft',
                    'topRight',
                    'bottomLeft',
                    'bottomRight',
                ]);
            }
            function q(i) {
                const e = mn(i);
                return (
                    (e.width = e.left + e.right),
                    (e.height = e.top + e.bottom),
                    e
                );
            }
            function U(i, e) {
                let t = C((i = i || {}).size, (e = e || O.font).size);
                'string' == typeof t && (t = parseInt(t, 10));
                let n = C(i.style, e.style);
                n &&
                    !('' + n).match(Zo) &&
                    (console.warn('Invalid font style specified: "' + n + '"'),
                    (n = ''));
                const s = {
                    family: C(i.family, e.family),
                    lineHeight: qo(C(i.lineHeight, e.lineHeight), t),
                    size: t,
                    style: n,
                    weight: C(i.weight, e.weight),
                    string: '',
                };
                return (
                    (s.string = (function Ho(i) {
                        return !i || R(i.size) || R(i.family)
                            ? null
                            : (i.style ? i.style + ' ' : '') +
                                  (i.weight ? i.weight + ' ' : '') +
                                  i.size +
                                  'px ' +
                                  i.family;
                    })(s)),
                    s
                );
            }
            function se(i, e, t, n) {
                let o,
                    r,
                    a,
                    s = !0;
                for (o = 0, r = i.length; o < r; ++o)
                    if (
                        ((a = i[o]),
                        void 0 !== a &&
                            (void 0 !== e &&
                                'function' == typeof a &&
                                ((a = a(e)), (s = !1)),
                            void 0 !== t &&
                                V(a) &&
                                ((a = a[t % a.length]), (s = !1)),
                            void 0 !== a))
                    )
                        return n && !s && (n.cacheable = !1), a;
            }
            function kt(i, e) {
                return Object.assign(Object.create(i), e);
            }
            function fi(i, e, t) {
                t = t || ((r) => i[r] < e);
                let o,
                    n = i.length - 1,
                    s = 0;
                for (; n - s > 1; )
                    (o = (s + n) >> 1), t(o) ? (s = o) : (n = o);
                return { lo: s, hi: n };
            }
            const gt = (i, e, t) => fi(i, t, (n) => i[n][e] < t),
                Qo = (i, e, t) => fi(i, t, (n) => i[n][e] >= t),
                bn = ['push', 'pop', 'shift', 'splice', 'unshift'];
            function xn(i, e) {
                const t = i._chartjs;
                if (!t) return;
                const n = t.listeners,
                    s = n.indexOf(e);
                -1 !== s && n.splice(s, 1),
                    !(n.length > 0) &&
                        (bn.forEach((o) => {
                            delete i[o];
                        }),
                        delete i._chartjs);
            }
            function _n(i) {
                const e = new Set();
                let t, n;
                for (t = 0, n = i.length; t < n; ++t) e.add(i[t]);
                return e.size === n ? i : Array.from(e);
            }
            function gi(i, e = [''], t = i, n, s = () => i[0]) {
                nt(n) || (n = kn('_fallback', i));
                const o = {
                    [Symbol.toStringTag]: 'Object',
                    _cacheable: !0,
                    _scopes: i,
                    _rootScopes: t,
                    _fallback: n,
                    _getTarget: s,
                    override: (r) => gi([r, ...i], e, t, n),
                };
                return new Proxy(o, {
                    deleteProperty: (r, a) => (
                        delete r[a], delete r._keys, delete i[0][a], !0
                    ),
                    get: (r, a) =>
                        vn(r, a, () =>
                            (function cr(i, e, t, n) {
                                let s;
                                for (const o of e)
                                    if (((s = kn(ir(o, i), t)), nt(s)))
                                        return pi(i, s) ? mi(t, n, i, s) : s;
                            })(a, e, i, r)
                        ),
                    getOwnPropertyDescriptor: (r, a) =>
                        Reflect.getOwnPropertyDescriptor(r._scopes[0], a),
                    getPrototypeOf: () => Reflect.getPrototypeOf(i[0]),
                    has: (r, a) => Sn(r).includes(a),
                    ownKeys: (r) => Sn(r),
                    set(r, a, l) {
                        const c = r._storage || (r._storage = s());
                        return (r[a] = c[a] = l), delete r._keys, !0;
                    },
                });
            }
            function Vt(i, e, t, n) {
                const s = {
                    _cacheable: !1,
                    _proxy: i,
                    _context: e,
                    _subProxy: t,
                    _stack: new Set(),
                    _descriptors: yn(i, n),
                    setContext: (o) => Vt(i, o, t, n),
                    override: (o) => Vt(i.override(o), e, t, n),
                };
                return new Proxy(s, {
                    deleteProperty: (o, r) => (delete o[r], delete i[r], !0),
                    get: (o, r, a) =>
                        vn(o, r, () =>
                            (function nr(i, e, t) {
                                const {
                                    _proxy: n,
                                    _context: s,
                                    _subProxy: o,
                                    _descriptors: r,
                                } = i;
                                let a = n[e];
                                return (
                                    vt(a) &&
                                        r.isScriptable(e) &&
                                        (a = (function sr(i, e, t, n) {
                                            const {
                                                _proxy: s,
                                                _context: o,
                                                _subProxy: r,
                                                _stack: a,
                                            } = t;
                                            if (a.has(i))
                                                throw new Error(
                                                    'Recursion detected: ' +
                                                        Array.from(a).join(
                                                            '->'
                                                        ) +
                                                        '->' +
                                                        i
                                                );
                                            return (
                                                a.add(i),
                                                (e = e(o, r || n)),
                                                a.delete(i),
                                                pi(i, e) &&
                                                    (e = mi(
                                                        s._scopes,
                                                        s,
                                                        i,
                                                        e
                                                    )),
                                                e
                                            );
                                        })(e, a, i, t)),
                                    V(a) &&
                                        a.length &&
                                        (a = (function or(i, e, t, n) {
                                            const {
                                                _proxy: s,
                                                _context: o,
                                                _subProxy: r,
                                                _descriptors: a,
                                            } = t;
                                            if (nt(o.index) && n(i))
                                                e = e[o.index % e.length];
                                            else if (A(e[0])) {
                                                const l = e,
                                                    c = s._scopes.filter(
                                                        (h) => h !== l
                                                    );
                                                e = [];
                                                for (const h of l) {
                                                    const d = mi(c, s, i, h);
                                                    e.push(
                                                        Vt(d, o, r && r[i], a)
                                                    );
                                                }
                                            }
                                            return e;
                                        })(e, a, i, r.isIndexable)),
                                    pi(e, a) && (a = Vt(a, s, o && o[e], r)),
                                    a
                                );
                            })(o, r, a)
                        ),
                    getOwnPropertyDescriptor: (o, r) =>
                        o._descriptors.allKeys
                            ? Reflect.has(i, r)
                                ? { enumerable: !0, configurable: !0 }
                                : void 0
                            : Reflect.getOwnPropertyDescriptor(i, r),
                    getPrototypeOf: () => Reflect.getPrototypeOf(i),
                    has: (o, r) => Reflect.has(i, r),
                    ownKeys: () => Reflect.ownKeys(i),
                    set: (o, r, a) => ((i[r] = a), delete o[r], !0),
                });
            }
            function yn(i, e = { scriptable: !0, indexable: !0 }) {
                const {
                    _scriptable: t = e.scriptable,
                    _indexable: n = e.indexable,
                    _allKeys: s = e.allKeys,
                } = i;
                return {
                    allKeys: s,
                    scriptable: t,
                    indexable: n,
                    isScriptable: vt(t) ? t : () => t,
                    isIndexable: vt(n) ? n : () => n,
                };
            }
            const ir = (i, e) => (i ? i + ei(e) : e),
                pi = (i, e) =>
                    A(e) &&
                    'adapters' !== i &&
                    (null === Object.getPrototypeOf(e) ||
                        e.constructor === Object);
            function vn(i, e, t) {
                if (Object.prototype.hasOwnProperty.call(i, e)) return i[e];
                const n = t();
                return (i[e] = n), n;
            }
            function Mn(i, e, t) {
                return vt(i) ? i(e, t) : i;
            }
            const rr = (i, e) =>
                !0 === i ? e : 'string' == typeof i ? yt(e, i) : void 0;
            function ar(i, e, t, n, s) {
                for (const o of e) {
                    const r = rr(t, o);
                    if (r) {
                        i.add(r);
                        const a = Mn(r._fallback, t, s);
                        if (nt(a) && a !== t && a !== n) return a;
                    } else if (!1 === r && nt(n) && t !== n) return null;
                }
                return !1;
            }
            function mi(i, e, t, n) {
                const s = e._rootScopes,
                    o = Mn(e._fallback, t, n),
                    r = [...i, ...s],
                    a = new Set();
                a.add(n);
                let l = wn(a, r, t, o || t, n);
                return (
                    !(
                        null === l ||
                        (nt(o) &&
                            o !== t &&
                            ((l = wn(a, r, o, l, n)), null === l))
                    ) &&
                    gi(Array.from(a), [''], s, o, () =>
                        (function lr(i, e, t) {
                            const n = i._getTarget();
                            e in n || (n[e] = {});
                            const s = n[e];
                            return V(s) && A(t) ? t : s;
                        })(e, t, n)
                    )
                );
            }
            function wn(i, e, t, n, s) {
                for (; t; ) t = ar(i, e, t, n, s);
                return t;
            }
            function kn(i, e) {
                for (const t of e) {
                    if (!t) continue;
                    const n = t[i];
                    if (nt(n)) return n;
                }
            }
            function Sn(i) {
                let e = i._keys;
                return (
                    e ||
                        (e = i._keys =
                            (function hr(i) {
                                const e = new Set();
                                for (const t of i)
                                    for (const n of Object.keys(t).filter(
                                        (s) => !s.startsWith('_')
                                    ))
                                        e.add(n);
                                return Array.from(e);
                            })(i._scopes)),
                    e
                );
            }
            function Pn(i, e, t, n) {
                const { iScale: s } = i,
                    { key: o = 'r' } = this._parsing,
                    r = new Array(n);
                let a, l, c, h;
                for (a = 0, l = n; a < l; ++a)
                    (c = a + t),
                        (h = e[c]),
                        (r[a] = { r: s.parse(yt(h, o), c) });
                return r;
            }
            const dr = Number.EPSILON || 1e-14,
                Wt = (i, e) => e < i.length && !i[e].skip && i[e],
                Cn = (i) => ('x' === i ? 'y' : 'x');
            function ur(i, e, t, n) {
                const s = i.skip ? e : i,
                    o = e,
                    r = t.skip ? e : t,
                    a = ni(o, s),
                    l = ni(r, o);
                let c = a / (a + l),
                    h = l / (a + l);
                (c = isNaN(c) ? 0 : c), (h = isNaN(h) ? 0 : h);
                const d = n * c,
                    u = n * h;
                return {
                    previous: {
                        x: o.x - d * (r.x - s.x),
                        y: o.y - d * (r.y - s.y),
                    },
                    next: {
                        x: o.x + u * (r.x - s.x),
                        y: o.y + u * (r.y - s.y),
                    },
                };
            }
            function Re(i, e, t) {
                return Math.max(Math.min(i, t), e);
            }
            function br(i, e, t, n, s) {
                let o, r, a, l;
                if (
                    (e.spanGaps && (i = i.filter((c) => !c.skip)),
                    'monotone' === e.cubicInterpolationMode)
                )
                    !(function pr(i, e = 'x') {
                        const t = Cn(e),
                            n = i.length,
                            s = Array(n).fill(0),
                            o = Array(n);
                        let r,
                            a,
                            l,
                            c = Wt(i, 0);
                        for (r = 0; r < n; ++r)
                            if (((a = l), (l = c), (c = Wt(i, r + 1)), l)) {
                                if (c) {
                                    const h = c[e] - l[e];
                                    s[r] = 0 !== h ? (c[t] - l[t]) / h : 0;
                                }
                                o[r] = a
                                    ? c
                                        ? lt(s[r - 1]) !== lt(s[r])
                                            ? 0
                                            : (s[r - 1] + s[r]) / 2
                                        : s[r - 1]
                                    : s[r];
                            }
                        (function fr(i, e, t) {
                            const n = i.length;
                            let s,
                                o,
                                r,
                                a,
                                l,
                                c = Wt(i, 0);
                            for (let h = 0; h < n - 1; ++h)
                                if (((l = c), (c = Wt(i, h + 1)), l && c)) {
                                    if (qt(e[h], 0, dr)) {
                                        t[h] = t[h + 1] = 0;
                                        continue;
                                    }
                                    (s = t[h] / e[h]),
                                        (o = t[h + 1] / e[h]),
                                        (a = Math.pow(s, 2) + Math.pow(o, 2)),
                                        !(a <= 9) &&
                                            ((r = 3 / Math.sqrt(a)),
                                            (t[h] = s * r * e[h]),
                                            (t[h + 1] = o * r * e[h]));
                                }
                        })(i, s, o),
                            (function gr(i, e, t = 'x') {
                                const n = Cn(t),
                                    s = i.length;
                                let o,
                                    r,
                                    a,
                                    l = Wt(i, 0);
                                for (let c = 0; c < s; ++c) {
                                    if (
                                        ((r = a),
                                        (a = l),
                                        (l = Wt(i, c + 1)),
                                        !a)
                                    )
                                        continue;
                                    const h = a[t],
                                        d = a[n];
                                    r &&
                                        ((o = (h - r[t]) / 3),
                                        (a[`cp1${t}`] = h - o),
                                        (a[`cp1${n}`] = d - o * e[c])),
                                        l &&
                                            ((o = (l[t] - h) / 3),
                                            (a[`cp2${t}`] = h + o),
                                            (a[`cp2${n}`] = d + o * e[c]));
                                }
                            })(i, o, e);
                    })(i, s);
                else {
                    let c = n ? i[i.length - 1] : i[0];
                    for (o = 0, r = i.length; o < r; ++o)
                        (a = i[o]),
                            (l = ur(
                                c,
                                a,
                                i[Math.min(o + 1, r - (n ? 0 : 1)) % r],
                                e.tension
                            )),
                            (a.cp1x = l.previous.x),
                            (a.cp1y = l.previous.y),
                            (a.cp2x = l.next.x),
                            (a.cp2y = l.next.y),
                            (c = a);
                }
                e.capBezierPoints &&
                    (function mr(i, e) {
                        let t,
                            n,
                            s,
                            o,
                            r,
                            a = ie(i[0], e);
                        for (t = 0, n = i.length; t < n; ++t)
                            (r = o),
                                (o = a),
                                (a = t < n - 1 && ie(i[t + 1], e)),
                                o &&
                                    ((s = i[t]),
                                    r &&
                                        ((s.cp1x = Re(s.cp1x, e.left, e.right)),
                                        (s.cp1y = Re(s.cp1y, e.top, e.bottom))),
                                    a &&
                                        ((s.cp2x = Re(s.cp2x, e.left, e.right)),
                                        (s.cp2y = Re(
                                            s.cp2y,
                                            e.top,
                                            e.bottom
                                        ))));
                    })(i, t);
            }
            function Dn() {
                return (
                    'undefined' != typeof window &&
                    'undefined' != typeof document
                );
            }
            function bi(i) {
                let e = i.parentNode;
                return (
                    e && '[object ShadowRoot]' === e.toString() && (e = e.host),
                    e
                );
            }
            function Ee(i, e, t) {
                let n;
                return (
                    'string' == typeof i
                        ? ((n = parseInt(i, 10)),
                          -1 !== i.indexOf('%') &&
                              (n = (n / 100) * e.parentNode[t]))
                        : (n = i),
                    n
                );
            }
            const Fe = (i) => window.getComputedStyle(i, null),
                _r = ['top', 'right', 'bottom', 'left'];
            function Lt(i, e, t) {
                const n = {};
                t = t ? '-' + t : '';
                for (let s = 0; s < 4; s++) {
                    const o = _r[s];
                    n[o] = parseFloat(i[e + '-' + o + t]) || 0;
                }
                return (
                    (n.width = n.left + n.right),
                    (n.height = n.top + n.bottom),
                    n
                );
            }
            function Tt(i, e) {
                if ('native' in i) return i;
                const { canvas: t, currentDevicePixelRatio: n } = e,
                    s = Fe(t),
                    o = 'border-box' === s.boxSizing,
                    r = Lt(s, 'padding'),
                    a = Lt(s, 'border', 'width'),
                    {
                        x: l,
                        y: c,
                        box: h,
                    } = (function vr(i, e) {
                        const t = i.touches,
                            n = t && t.length ? t[0] : i,
                            { offsetX: s, offsetY: o } = n;
                        let a,
                            l,
                            r = !1;
                        if (
                            ((i, e, t) =>
                                (i > 0 || e > 0) && (!t || !t.shadowRoot))(
                                s,
                                o,
                                i.target
                            )
                        )
                            (a = s), (l = o);
                        else {
                            const c = e.getBoundingClientRect();
                            (a = n.clientX - c.left),
                                (l = n.clientY - c.top),
                                (r = !0);
                        }
                        return { x: a, y: l, box: r };
                    })(i, t),
                    d = r.left + (h && a.left),
                    u = r.top + (h && a.top);
                let { width: f, height: g } = e;
                return (
                    o && ((f -= r.width + a.width), (g -= r.height + a.height)),
                    {
                        x: Math.round((((l - d) / f) * t.width) / n),
                        y: Math.round((((c - u) / g) * t.height) / n),
                    }
                );
            }
            const xi = (i) => Math.round(10 * i) / 10;
            function An(i, e, t) {
                const n = e || 1,
                    s = Math.floor(i.height * n),
                    o = Math.floor(i.width * n);
                (i.height = s / n), (i.width = o / n);
                const r = i.canvas;
                return (
                    r.style &&
                        (t || (!r.style.height && !r.style.width)) &&
                        ((r.style.height = `${i.height}px`),
                        (r.style.width = `${i.width}px`)),
                    (i.currentDevicePixelRatio !== n ||
                        r.height !== s ||
                        r.width !== o) &&
                        ((i.currentDevicePixelRatio = n),
                        (r.height = s),
                        (r.width = o),
                        i.ctx.setTransform(n, 0, 0, n, 0, 0),
                        !0)
                );
            }
            const kr = (function () {
                let i = !1;
                try {
                    const e = {
                        get passive() {
                            return (i = !0), !1;
                        },
                    };
                    window.addEventListener('test', null, e),
                        window.removeEventListener('test', null, e);
                } catch (e) {}
                return i;
            })();
            function On(i, e) {
                const t = (function xr(i, e) {
                        return Fe(i).getPropertyValue(e);
                    })(i, e),
                    n = t && t.match(/^(\d+)(\.\d+)?px$/);
                return n ? +n[1] : void 0;
            }
            function Rt(i, e, t, n) {
                return { x: i.x + t * (e.x - i.x), y: i.y + t * (e.y - i.y) };
            }
            function Sr(i, e, t, n) {
                return {
                    x: i.x + t * (e.x - i.x),
                    y:
                        'middle' === n
                            ? t < 0.5
                                ? i.y
                                : e.y
                            : 'after' === n
                            ? t < 1
                                ? i.y
                                : e.y
                            : t > 0
                            ? e.y
                            : i.y,
                };
            }
            function Pr(i, e, t, n) {
                const s = { x: i.cp2x, y: i.cp2y },
                    o = { x: e.cp1x, y: e.cp1y },
                    r = Rt(i, s, t),
                    a = Rt(s, o, t),
                    l = Rt(o, e, t),
                    c = Rt(r, a, t),
                    h = Rt(a, l, t);
                return Rt(c, h, t);
            }
            const Ln = new Map();
            function oe(i, e, t) {
                return (function Cr(i, e) {
                    e = e || {};
                    const t = i + JSON.stringify(e);
                    let n = Ln.get(t);
                    return (
                        n || ((n = new Intl.NumberFormat(i, e)), Ln.set(t, n)),
                        n
                    );
                })(e, t).format(i);
            }
            function Nt(i, e, t) {
                return i
                    ? (function (i, e) {
                          return {
                              x: (t) => i + i + e - t,
                              setWidth(t) {
                                  e = t;
                              },
                              textAlign: (t) =>
                                  'center' === t
                                      ? t
                                      : 'right' === t
                                      ? 'left'
                                      : 'right',
                              xPlus: (t, n) => t - n,
                              leftForLtr: (t, n) => t - n,
                          };
                      })(e, t)
                    : {
                          x: (i) => i,
                          setWidth(i) {},
                          textAlign: (i) => i,
                          xPlus: (i, e) => i + e,
                          leftForLtr: (i, e) => i,
                      };
            }
            function Tn(i, e) {
                let t, n;
                ('ltr' === e || 'rtl' === e) &&
                    ((t = i.canvas.style),
                    (n = [
                        t.getPropertyValue('direction'),
                        t.getPropertyPriority('direction'),
                    ]),
                    t.setProperty('direction', e, 'important'),
                    (i.prevTextDirection = n));
            }
            function Rn(i, e) {
                void 0 !== e &&
                    (delete i.prevTextDirection,
                    i.canvas.style.setProperty('direction', e[0], e[1]));
            }
            function En(i) {
                return 'angle' === i
                    ? { between: Gt, compare: bo, normalize: tt }
                    : {
                          between: ut,
                          compare: (e, t) => e - t,
                          normalize: (e) => e,
                      };
            }
            function Fn({ start: i, end: e, count: t, loop: n, style: s }) {
                return {
                    start: i % t,
                    end: e % t,
                    loop: n && (e - i + 1) % t == 0,
                    style: s,
                };
            }
            function In(i, e, t) {
                if (!t) return [i];
                const { property: n, start: s, end: o } = t,
                    r = e.length,
                    { compare: a, between: l, normalize: c } = En(n),
                    {
                        start: h,
                        end: d,
                        loop: u,
                        style: f,
                    } = (function Or(i, e, t) {
                        const { property: n, start: s, end: o } = t,
                            { between: r, normalize: a } = En(n),
                            l = e.length;
                        let u,
                            f,
                            { start: c, end: h, loop: d } = i;
                        if (d) {
                            for (
                                c += l, h += l, u = 0, f = l;
                                u < f && r(a(e[c % l][n]), s, o);
                                ++u
                            )
                                c--, h--;
                            (c %= l), (h %= l);
                        }
                        return (
                            h < c && (h += l),
                            { start: c, end: h, loop: d, style: i.style }
                        );
                    })(i, e, t),
                    g = [];
                let b,
                    x,
                    v,
                    p = !1,
                    m = null;
                for (let k = h, S = h; k <= d; ++k)
                    (x = e[k % r]),
                        !x.skip &&
                            ((b = c(x[n])),
                            b !== v &&
                                ((p = l(b, s, o)),
                                null === m &&
                                    (p || (l(s, v, b) && 0 !== a(s, v))) &&
                                    (m = 0 === a(b, s) ? k : S),
                                null !== m &&
                                    (!p || 0 === a(o, b) || l(o, v, b)) &&
                                    (g.push(
                                        Fn({
                                            start: m,
                                            end: k,
                                            loop: u,
                                            count: r,
                                            style: f,
                                        })
                                    ),
                                    (m = null)),
                                (S = k),
                                (v = b)));
                return (
                    null !== m &&
                        g.push(
                            Fn({
                                start: m,
                                end: d,
                                loop: u,
                                count: r,
                                style: f,
                            })
                        ),
                    g
                );
            }
            function zn(i, e) {
                const t = [],
                    n = i.segments;
                for (let s = 0; s < n.length; s++) {
                    const o = In(n[s], i.points, e);
                    o.length && t.push(...o);
                }
                return t;
            }
            function Vn(i) {
                return {
                    backgroundColor: i.backgroundColor,
                    borderCapStyle: i.borderCapStyle,
                    borderDash: i.borderDash,
                    borderDashOffset: i.borderDashOffset,
                    borderJoinStyle: i.borderJoinStyle,
                    borderWidth: i.borderWidth,
                    borderColor: i.borderColor,
                };
            }
            function Fr(i, e) {
                return e && JSON.stringify(i) !== JSON.stringify(e);
            }
            var pt = new (class Ir {
                constructor() {
                    (this._request = null),
                        (this._charts = new Map()),
                        (this._running = !1),
                        (this._lastDate = void 0);
                }
                _notify(e, t, n, s) {
                    const r = t.duration;
                    t.listeners[s].forEach((a) =>
                        a({
                            chart: e,
                            initial: t.initial,
                            numSteps: r,
                            currentStep: Math.min(n - t.start, r),
                        })
                    );
                }
                _refresh() {
                    this._request ||
                        ((this._running = !0),
                        (this._request = Z.call(window, () => {
                            this._update(),
                                (this._request = null),
                                this._running && this._refresh();
                        })));
                }
                _update(e = Date.now()) {
                    let t = 0;
                    this._charts.forEach((n, s) => {
                        if (!n.running || !n.items.length) return;
                        const o = n.items;
                        let l,
                            r = o.length - 1,
                            a = !1;
                        for (; r >= 0; --r)
                            (l = o[r]),
                                l._active
                                    ? (l._total > n.duration &&
                                          (n.duration = l._total),
                                      l.tick(e),
                                      (a = !0))
                                    : ((o[r] = o[o.length - 1]), o.pop());
                        a && (s.draw(), this._notify(s, n, e, 'progress')),
                            o.length ||
                                ((n.running = !1),
                                this._notify(s, n, e, 'complete'),
                                (n.initial = !1)),
                            (t += o.length);
                    }),
                        (this._lastDate = e),
                        0 === t && (this._running = !1);
                }
                _getAnims(e) {
                    const t = this._charts;
                    let n = t.get(e);
                    return (
                        n ||
                            ((n = {
                                running: !1,
                                initial: !0,
                                items: [],
                                listeners: { complete: [], progress: [] },
                            }),
                            t.set(e, n)),
                        n
                    );
                }
                listen(e, t, n) {
                    this._getAnims(e).listeners[t].push(n);
                }
                add(e, t) {
                    !t || !t.length || this._getAnims(e).items.push(...t);
                }
                has(e) {
                    return this._getAnims(e).items.length > 0;
                }
                start(e) {
                    const t = this._charts.get(e);
                    !t ||
                        ((t.running = !0),
                        (t.start = Date.now()),
                        (t.duration = t.items.reduce(
                            (n, s) => Math.max(n, s._duration),
                            0
                        )),
                        this._refresh());
                }
                running(e) {
                    if (!this._running) return !1;
                    const t = this._charts.get(e);
                    return !(!t || !t.running || !t.items.length);
                }
                stop(e) {
                    const t = this._charts.get(e);
                    if (!t || !t.items.length) return;
                    const n = t.items;
                    let s = n.length - 1;
                    for (; s >= 0; --s) n[s].cancel();
                    (t.items = []), this._notify(e, t, Date.now(), 'complete');
                }
                remove(e) {
                    return this._charts.delete(e);
                }
            })();
            const Wn = 'transparent',
                zr = {
                    boolean: (i, e, t) => (t > 0.5 ? e : i),
                    color(i, e, t) {
                        const n = gn(i || Wn),
                            s = n.valid && gn(e || Wn);
                        return s && s.valid ? s.mix(n, t).hexString() : e;
                    },
                    number: (i, e, t) => i + (e - i) * t,
                };
            class Br {
                constructor(e, t, n, s) {
                    const o = t[n];
                    s = se([e.to, s, o, e.from]);
                    const r = se([e.from, o, s]);
                    (this._active = !0),
                        (this._fn = e.fn || zr[e.type || typeof r]),
                        (this._easing = Jt[e.easing] || Jt.linear),
                        (this._start = Math.floor(Date.now() + (e.delay || 0))),
                        (this._duration = this._total = Math.floor(e.duration)),
                        (this._loop = !!e.loop),
                        (this._target = t),
                        (this._prop = n),
                        (this._from = r),
                        (this._to = s),
                        (this._promises = void 0);
                }
                active() {
                    return this._active;
                }
                update(e, t, n) {
                    if (this._active) {
                        this._notify(!1);
                        const s = this._target[this._prop],
                            o = n - this._start,
                            r = this._duration - o;
                        (this._start = n),
                            (this._duration = Math.floor(
                                Math.max(r, e.duration)
                            )),
                            (this._total += o),
                            (this._loop = !!e.loop),
                            (this._to = se([e.to, t, s, e.from])),
                            (this._from = se([e.from, s, t]));
                    }
                }
                cancel() {
                    this._active &&
                        (this.tick(Date.now()),
                        (this._active = !1),
                        this._notify(!1));
                }
                tick(e) {
                    const t = e - this._start,
                        n = this._duration,
                        s = this._prop,
                        o = this._from,
                        r = this._loop,
                        a = this._to;
                    let l;
                    if (
                        ((this._active = o !== a && (r || t < n)),
                        !this._active)
                    )
                        return (this._target[s] = a), void this._notify(!0);
                    t < 0
                        ? (this._target[s] = o)
                        : ((l = (t / n) % 2),
                          (l = r && l > 1 ? 2 - l : l),
                          (l = this._easing(Math.min(1, Math.max(0, l)))),
                          (this._target[s] = this._fn(o, a, l)));
                }
                wait() {
                    const e = this._promises || (this._promises = []);
                    return new Promise((t, n) => {
                        e.push({ res: t, rej: n });
                    });
                }
                _notify(e) {
                    const t = e ? 'res' : 'rej',
                        n = this._promises || [];
                    for (let s = 0; s < n.length; s++) n[s][t]();
                }
            }
            O.set('animation', {
                delay: void 0,
                duration: 1e3,
                easing: 'easeOutQuart',
                fn: void 0,
                from: void 0,
                loop: void 0,
                to: void 0,
                type: void 0,
            });
            const Nr = Object.keys(O.animation);
            O.describe('animation', {
                _fallback: !1,
                _indexable: !1,
                _scriptable: (i) =>
                    'onProgress' !== i && 'onComplete' !== i && 'fn' !== i,
            }),
                O.set('animations', {
                    colors: {
                        type: 'color',
                        properties: ['color', 'borderColor', 'backgroundColor'],
                    },
                    numbers: {
                        type: 'number',
                        properties: [
                            'x',
                            'y',
                            'borderWidth',
                            'radius',
                            'tension',
                        ],
                    },
                }),
                O.describe('animations', { _fallback: 'animation' }),
                O.set('transitions', {
                    active: { animation: { duration: 400 } },
                    resize: { animation: { duration: 0 } },
                    show: {
                        animations: {
                            colors: { from: 'transparent' },
                            visible: { type: 'boolean', duration: 0 },
                        },
                    },
                    hide: {
                        animations: {
                            colors: { to: 'transparent' },
                            visible: {
                                type: 'boolean',
                                easing: 'linear',
                                fn: (i) => 0 | i,
                            },
                        },
                    },
                });
            class Nn {
                constructor(e, t) {
                    (this._chart = e),
                        (this._properties = new Map()),
                        this.configure(t);
                }
                configure(e) {
                    if (!A(e)) return;
                    const t = this._properties;
                    Object.getOwnPropertyNames(e).forEach((n) => {
                        const s = e[n];
                        if (!A(s)) return;
                        const o = {};
                        for (const r of Nr) o[r] = s[r];
                        ((V(s.properties) && s.properties) || [n]).forEach(
                            (r) => {
                                (r === n || !t.has(r)) && t.set(r, o);
                            }
                        );
                    });
                }
                _animateOptions(e, t) {
                    const n = t.options,
                        s = (function jr(i, e) {
                            if (!e) return;
                            let t = i.options;
                            if (t)
                                return (
                                    t.$shared &&
                                        (i.options = t =
                                            Object.assign({}, t, {
                                                $shared: !1,
                                                $animations: {},
                                            })),
                                    t
                                );
                            i.options = e;
                        })(e, n);
                    if (!s) return [];
                    const o = this._createAnimations(s, n);
                    return (
                        n.$shared &&
                            (function Hr(i, e) {
                                const t = [],
                                    n = Object.keys(e);
                                for (let s = 0; s < n.length; s++) {
                                    const o = i[n[s]];
                                    o && o.active() && t.push(o.wait());
                                }
                                return Promise.all(t);
                            })(e.options.$animations, n).then(
                                () => {
                                    e.options = n;
                                },
                                () => {}
                            ),
                        o
                    );
                }
                _createAnimations(e, t) {
                    const n = this._properties,
                        s = [],
                        o = e.$animations || (e.$animations = {}),
                        r = Object.keys(t),
                        a = Date.now();
                    let l;
                    for (l = r.length - 1; l >= 0; --l) {
                        const c = r[l];
                        if ('$' === c.charAt(0)) continue;
                        if ('options' === c) {
                            s.push(...this._animateOptions(e, t));
                            continue;
                        }
                        const h = t[c];
                        let d = o[c];
                        const u = n.get(c);
                        if (d) {
                            if (u && d.active()) {
                                d.update(u, h, a);
                                continue;
                            }
                            d.cancel();
                        }
                        u && u.duration
                            ? ((o[c] = d = new Br(u, e, c, h)), s.push(d))
                            : (e[c] = h);
                    }
                    return s;
                }
                update(e, t) {
                    if (0 === this._properties.size)
                        return void Object.assign(e, t);
                    const n = this._createAnimations(e, t);
                    return n.length ? (pt.add(this._chart, n), !0) : void 0;
                }
            }
            function Hn(i, e) {
                const t = (i && i.options) || {},
                    n = t.reverse,
                    s = void 0 === t.min ? e : 0,
                    o = void 0 === t.max ? e : 0;
                return { start: n ? o : s, end: n ? s : o };
            }
            function jn(i, e) {
                const t = [],
                    n = i._getSortedDatasetMetas(e);
                let s, o;
                for (s = 0, o = n.length; s < o; ++s) t.push(n[s].index);
                return t;
            }
            function $n(i, e, t, n = {}) {
                const s = i.keys,
                    o = 'single' === n.mode;
                let r, a, l, c;
                if (null !== e) {
                    for (r = 0, a = s.length; r < a; ++r) {
                        if (((l = +s[r]), l === t)) {
                            if (n.all) continue;
                            break;
                        }
                        (c = i.values[l]),
                            j(c) &&
                                (o || 0 === e || lt(e) === lt(c)) &&
                                (e += c);
                    }
                    return e;
                }
            }
            function Yn(i, e) {
                const t = i && i.options.stacked;
                return t || (void 0 === t && void 0 !== e.stack);
            }
            function Zr(i, e, t) {
                const n = i[e] || (i[e] = {});
                return n[t] || (n[t] = {});
            }
            function Un(i, e, t, n) {
                for (const s of e.getMatchingVisibleMetas(n).reverse()) {
                    const o = i[s.index];
                    if ((t && o > 0) || (!t && o < 0)) return s.index;
                }
                return null;
            }
            function Xn(i, e) {
                const { chart: t, _cachedMeta: n } = i,
                    s = t._stacks || (t._stacks = {}),
                    { iScale: o, vScale: r, index: a } = n,
                    l = o.axis,
                    c = r.axis,
                    h = (function Xr(i, e, t) {
                        return `${i.id}.${e.id}.${t.stack || t.type}`;
                    })(o, r, n),
                    d = e.length;
                let u;
                for (let f = 0; f < d; ++f) {
                    const g = e[f],
                        { [l]: p, [c]: m } = g;
                    (u = (g._stacks || (g._stacks = {}))[c] = Zr(s, h, p)),
                        (u[a] = m),
                        (u._top = Un(u, r, !0, n.type)),
                        (u._bottom = Un(u, r, !1, n.type));
                }
            }
            function _i(i, e) {
                const t = i.scales;
                return Object.keys(t)
                    .filter((n) => t[n].axis === e)
                    .shift();
            }
            function re(i, e) {
                const t = i.controller.index,
                    n = i.vScale && i.vScale.axis;
                if (n) {
                    e = e || i._parsed;
                    for (const s of e) {
                        const o = s._stacks;
                        if (!o || void 0 === o[n] || void 0 === o[n][t]) return;
                        delete o[n][t];
                    }
                }
            }
            const yi = (i) => 'reset' === i || 'none' === i,
                Kn = (i, e) => (e ? i : Object.assign({}, i));
            let mt = (() => {
                class i {
                    constructor(t, n) {
                        (this.chart = t),
                            (this._ctx = t.ctx),
                            (this.index = n),
                            (this._cachedDataOpts = {}),
                            (this._cachedMeta = this.getMeta()),
                            (this._type = this._cachedMeta.type),
                            (this.options = void 0),
                            (this._parsing = !1),
                            (this._data = void 0),
                            (this._objectData = void 0),
                            (this._sharedOptions = void 0),
                            (this._drawStart = void 0),
                            (this._drawCount = void 0),
                            (this.enableOptionSharing = !1),
                            (this.supportsDecimation = !1),
                            (this.$context = void 0),
                            (this._syncList = []),
                            this.initialize();
                    }
                    initialize() {
                        const t = this._cachedMeta;
                        this.configure(),
                            this.linkScales(),
                            (t._stacked = Yn(t.vScale, t)),
                            this.addElements();
                    }
                    updateIndex(t) {
                        this.index !== t && re(this._cachedMeta),
                            (this.index = t);
                    }
                    linkScales() {
                        const t = this.chart,
                            n = this._cachedMeta,
                            s = this.getDataset(),
                            o = (u, f, g, p) =>
                                'x' === u ? f : 'r' === u ? p : g,
                            r = (n.xAxisID = C(s.xAxisID, _i(t, 'x'))),
                            a = (n.yAxisID = C(s.yAxisID, _i(t, 'y'))),
                            l = (n.rAxisID = C(s.rAxisID, _i(t, 'r'))),
                            c = n.indexAxis,
                            h = (n.iAxisID = o(c, r, a, l)),
                            d = (n.vAxisID = o(c, a, r, l));
                        (n.xScale = this.getScaleForId(r)),
                            (n.yScale = this.getScaleForId(a)),
                            (n.rScale = this.getScaleForId(l)),
                            (n.iScale = this.getScaleForId(h)),
                            (n.vScale = this.getScaleForId(d));
                    }
                    getDataset() {
                        return this.chart.data.datasets[this.index];
                    }
                    getMeta() {
                        return this.chart.getDatasetMeta(this.index);
                    }
                    getScaleForId(t) {
                        return this.chart.scales[t];
                    }
                    _getOtherScale(t) {
                        const n = this._cachedMeta;
                        return t === n.iScale ? n.vScale : n.iScale;
                    }
                    reset() {
                        this._update('reset');
                    }
                    _destroy() {
                        const t = this._cachedMeta;
                        this._data && xn(this._data, this), t._stacked && re(t);
                    }
                    _dataCheck() {
                        const t = this.getDataset(),
                            n = t.data || (t.data = []),
                            s = this._data;
                        if (A(n))
                            this._data = (function Ur(i) {
                                const e = Object.keys(i),
                                    t = new Array(e.length);
                                let n, s, o;
                                for (n = 0, s = e.length; n < s; ++n)
                                    (o = e[n]), (t[n] = { x: o, y: i[o] });
                                return t;
                            })(n);
                        else if (s !== n) {
                            if (s) {
                                xn(s, this);
                                const o = this._cachedMeta;
                                re(o), (o._parsed = []);
                            }
                            n &&
                                Object.isExtensible(n) &&
                                (function er(i, e) {
                                    i._chartjs
                                        ? i._chartjs.listeners.push(e)
                                        : (Object.defineProperty(
                                              i,
                                              '_chartjs',
                                              {
                                                  configurable: !0,
                                                  enumerable: !1,
                                                  value: { listeners: [e] },
                                              }
                                          ),
                                          bn.forEach((t) => {
                                              const n = '_onData' + ei(t),
                                                  s = i[t];
                                              Object.defineProperty(i, t, {
                                                  configurable: !0,
                                                  enumerable: !1,
                                                  value(...o) {
                                                      const r = s.apply(
                                                          this,
                                                          o
                                                      );
                                                      return (
                                                          i._chartjs.listeners.forEach(
                                                              (a) => {
                                                                  'function' ==
                                                                      typeof a[
                                                                          n
                                                                      ] &&
                                                                      a[n](
                                                                          ...o
                                                                      );
                                                              }
                                                          ),
                                                          r
                                                      );
                                                  },
                                              });
                                          }));
                                })(n, this),
                                (this._syncList = []),
                                (this._data = n);
                        }
                    }
                    addElements() {
                        const t = this._cachedMeta;
                        this._dataCheck(),
                            this.datasetElementType &&
                                (t.dataset = new this.datasetElementType());
                    }
                    buildOrUpdateElements(t) {
                        const n = this._cachedMeta,
                            s = this.getDataset();
                        let o = !1;
                        this._dataCheck();
                        const r = n._stacked;
                        (n._stacked = Yn(n.vScale, n)),
                            n.stack !== s.stack &&
                                ((o = !0), re(n), (n.stack = s.stack)),
                            this._resyncElements(t),
                            (o || r !== n._stacked) && Xn(this, n._parsed);
                    }
                    configure() {
                        const t = this.chart.config,
                            n = t.datasetScopeKeys(this._type),
                            s = t.getOptionScopes(this.getDataset(), n, !0);
                        (this.options = t.createResolver(s, this.getContext())),
                            (this._parsing = this.options.parsing),
                            (this._cachedDataOpts = {});
                    }
                    parse(t, n) {
                        const { _cachedMeta: s, _data: o } = this,
                            { iScale: r, _stacked: a } = s,
                            l = r.axis;
                        let d,
                            u,
                            f,
                            c = (0 === t && n === o.length) || s._sorted,
                            h = t > 0 && s._parsed[t - 1];
                        if (!1 === this._parsing)
                            (s._parsed = o), (s._sorted = !0), (f = o);
                        else {
                            f = V(o[t])
                                ? this.parseArrayData(s, o, t, n)
                                : A(o[t])
                                ? this.parseObjectData(s, o, t, n)
                                : this.parsePrimitiveData(s, o, t, n);
                            const g = () => null === u[l] || (h && u[l] < h[l]);
                            for (d = 0; d < n; ++d)
                                (s._parsed[d + t] = u = f[d]),
                                    c && (g() && (c = !1), (h = u));
                            s._sorted = c;
                        }
                        a && Xn(this, f);
                    }
                    parsePrimitiveData(t, n, s, o) {
                        const { iScale: r, vScale: a } = t,
                            l = r.axis,
                            c = a.axis,
                            h = r.getLabels(),
                            d = r === a,
                            u = new Array(o);
                        let f, g, p;
                        for (f = 0, g = o; f < g; ++f)
                            (p = f + s),
                                (u[f] = {
                                    [l]: d || r.parse(h[p], p),
                                    [c]: a.parse(n[p], p),
                                });
                        return u;
                    }
                    parseArrayData(t, n, s, o) {
                        const { xScale: r, yScale: a } = t,
                            l = new Array(o);
                        let c, h, d, u;
                        for (c = 0, h = o; c < h; ++c)
                            (d = c + s),
                                (u = n[d]),
                                (l[c] = {
                                    x: r.parse(u[0], d),
                                    y: a.parse(u[1], d),
                                });
                        return l;
                    }
                    parseObjectData(t, n, s, o) {
                        const { xScale: r, yScale: a } = t,
                            { xAxisKey: l = 'x', yAxisKey: c = 'y' } =
                                this._parsing,
                            h = new Array(o);
                        let d, u, f, g;
                        for (d = 0, u = o; d < u; ++d)
                            (f = d + s),
                                (g = n[f]),
                                (h[d] = {
                                    x: r.parse(yt(g, l), f),
                                    y: a.parse(yt(g, c), f),
                                });
                        return h;
                    }
                    getParsed(t) {
                        return this._cachedMeta._parsed[t];
                    }
                    getDataElement(t) {
                        return this._cachedMeta.data[t];
                    }
                    applyStack(t, n, s) {
                        const r = this._cachedMeta,
                            a = n[t.axis];
                        return $n(
                            {
                                keys: jn(this.chart, !0),
                                values: n._stacks[t.axis],
                            },
                            a,
                            r.index,
                            { mode: s }
                        );
                    }
                    updateRangeFromParsed(t, n, s, o) {
                        const r = s[n.axis];
                        let a = null === r ? NaN : r;
                        const l = o && s._stacks[n.axis];
                        o &&
                            l &&
                            ((o.values = l),
                            (a = $n(o, r, this._cachedMeta.index))),
                            (t.min = Math.min(t.min, a)),
                            (t.max = Math.max(t.max, a));
                    }
                    getMinMax(t, n) {
                        const s = this._cachedMeta,
                            o = s._parsed,
                            r = s._sorted && t === s.iScale,
                            a = o.length,
                            l = this._getOtherScale(t),
                            c = ((i, e, t) =>
                                i &&
                                !e.hidden &&
                                e._stacked && {
                                    keys: jn(this.chart, !0),
                                    values: null,
                                })(n, s),
                            h = {
                                min: Number.POSITIVE_INFINITY,
                                max: Number.NEGATIVE_INFINITY,
                            },
                            { min: d, max: u } = (function Kr(i) {
                                const {
                                    min: e,
                                    max: t,
                                    minDefined: n,
                                    maxDefined: s,
                                } = i.getUserBounds();
                                return {
                                    min: n ? e : Number.NEGATIVE_INFINITY,
                                    max: s ? t : Number.POSITIVE_INFINITY,
                                };
                            })(l);
                        let f, g;
                        function p() {
                            g = o[f];
                            const m = g[l.axis];
                            return !j(g[t.axis]) || d > m || u < m;
                        }
                        for (
                            f = 0;
                            f < a &&
                            (p() ||
                                (this.updateRangeFromParsed(h, t, g, c), !r));
                            ++f
                        );
                        if (r)
                            for (f = a - 1; f >= 0; --f)
                                if (!p()) {
                                    this.updateRangeFromParsed(h, t, g, c);
                                    break;
                                }
                        return h;
                    }
                    getAllParsedValues(t) {
                        const n = this._cachedMeta._parsed,
                            s = [];
                        let o, r, a;
                        for (o = 0, r = n.length; o < r; ++o)
                            (a = n[o][t.axis]), j(a) && s.push(a);
                        return s;
                    }
                    getMaxOverflow() {
                        return !1;
                    }
                    getLabelAndValue(t) {
                        const n = this._cachedMeta,
                            s = n.iScale,
                            o = n.vScale,
                            r = this.getParsed(t);
                        return {
                            label: s ? '' + s.getLabelForValue(r[s.axis]) : '',
                            value: o ? '' + o.getLabelForValue(r[o.axis]) : '',
                        };
                    }
                    _update(t) {
                        const n = this._cachedMeta;
                        this.update(t || 'default'),
                            (n._clip = (function Yr(i) {
                                let e, t, n, s;
                                return (
                                    A(i)
                                        ? ((e = i.top),
                                          (t = i.right),
                                          (n = i.bottom),
                                          (s = i.left))
                                        : (e = t = n = s = i),
                                    {
                                        top: e,
                                        right: t,
                                        bottom: n,
                                        left: s,
                                        disabled: !1 === i,
                                    }
                                );
                            })(
                                C(
                                    this.options.clip,
                                    (function $r(i, e, t) {
                                        if (!1 === t) return !1;
                                        const n = Hn(i, t),
                                            s = Hn(e, t);
                                        return {
                                            top: s.end,
                                            right: n.end,
                                            bottom: s.start,
                                            left: n.start,
                                        };
                                    })(
                                        n.xScale,
                                        n.yScale,
                                        this.getMaxOverflow()
                                    )
                                )
                            ));
                    }
                    update(t) {}
                    draw() {
                        const t = this._ctx,
                            s = this._cachedMeta,
                            o = s.data || [],
                            r = this.chart.chartArea,
                            a = [],
                            l = this._drawStart || 0,
                            c = this._drawCount || o.length - l,
                            h = this.options.drawActiveElementsOnTop;
                        let d;
                        for (
                            s.dataset && s.dataset.draw(t, r, l, c), d = l;
                            d < l + c;
                            ++d
                        ) {
                            const u = o[d];
                            u.hidden ||
                                (u.active && h ? a.push(u) : u.draw(t, r));
                        }
                        for (d = 0; d < a.length; ++d) a[d].draw(t, r);
                    }
                    getStyle(t, n) {
                        const s = n ? 'active' : 'default';
                        return void 0 === t && this._cachedMeta.dataset
                            ? this.resolveDatasetElementOptions(s)
                            : this.resolveDataElementOptions(t || 0, s);
                    }
                    getContext(t, n, s) {
                        const o = this.getDataset();
                        let r;
                        if (t >= 0 && t < this._cachedMeta.data.length) {
                            const a = this._cachedMeta.data[t];
                            (r =
                                a.$context ||
                                (a.$context = (function Gr(i, e, t) {
                                    return kt(i, {
                                        active: !1,
                                        dataIndex: e,
                                        parsed: void 0,
                                        raw: void 0,
                                        element: t,
                                        index: e,
                                        mode: 'default',
                                        type: 'data',
                                    });
                                })(this.getContext(), t, a))),
                                (r.parsed = this.getParsed(t)),
                                (r.raw = o.data[t]),
                                (r.index = r.dataIndex = t);
                        } else
                            (r =
                                this.$context ||
                                (this.$context = (function qr(i, e) {
                                    return kt(i, {
                                        active: !1,
                                        dataset: void 0,
                                        datasetIndex: e,
                                        index: e,
                                        mode: 'default',
                                        type: 'dataset',
                                    });
                                })(this.chart.getContext(), this.index))),
                                (r.dataset = o),
                                (r.index = r.datasetIndex = this.index);
                        return (r.active = !!n), (r.mode = s), r;
                    }
                    resolveDatasetElementOptions(t) {
                        return this._resolveElementOptions(
                            this.datasetElementType.id,
                            t
                        );
                    }
                    resolveDataElementOptions(t, n) {
                        return this._resolveElementOptions(
                            this.dataElementType.id,
                            n,
                            t
                        );
                    }
                    _resolveElementOptions(t, n = 'default', s) {
                        const o = 'active' === n,
                            r = this._cachedDataOpts,
                            a = t + '-' + n,
                            l = r[a],
                            c = this.enableOptionSharing && nt(s);
                        if (l) return Kn(l, c);
                        const h = this.chart.config,
                            d = h.datasetElementScopeKeys(this._type, t),
                            u = o ? [`${t}Hover`, 'hover', t, ''] : [t, ''],
                            f = h.getOptionScopes(this.getDataset(), d),
                            g = Object.keys(O.elements[t]),
                            m = h.resolveNamedOptions(
                                f,
                                g,
                                () => this.getContext(s, o),
                                u
                            );
                        return (
                            m.$shared &&
                                ((m.$shared = c),
                                (r[a] = Object.freeze(Kn(m, c)))),
                            m
                        );
                    }
                    _resolveAnimations(t, n, s) {
                        const o = this.chart,
                            r = this._cachedDataOpts,
                            a = `animation-${n}`,
                            l = r[a];
                        if (l) return l;
                        let c;
                        if (!1 !== o.options.animation) {
                            const d = this.chart.config,
                                u = d.datasetAnimationScopeKeys(this._type, n),
                                f = d.getOptionScopes(this.getDataset(), u);
                            c = d.createResolver(f, this.getContext(t, s, n));
                        }
                        const h = new Nn(o, c && c.animations);
                        return (
                            c && c._cacheable && (r[a] = Object.freeze(h)), h
                        );
                    }
                    getSharedOptions(t) {
                        if (t.$shared)
                            return (
                                this._sharedOptions ||
                                (this._sharedOptions = Object.assign({}, t))
                            );
                    }
                    includeOptions(t, n) {
                        return !n || yi(t) || this.chart._animationsDisabled;
                    }
                    updateElement(t, n, s, o) {
                        yi(o)
                            ? Object.assign(t, s)
                            : this._resolveAnimations(n, o).update(t, s);
                    }
                    updateSharedOptions(t, n, s) {
                        t &&
                            !yi(n) &&
                            this._resolveAnimations(void 0, n).update(t, s);
                    }
                    _setStyle(t, n, s, o) {
                        t.active = o;
                        const r = this.getStyle(n, o);
                        this._resolveAnimations(n, s, o).update(t, {
                            options: (!o && this.getSharedOptions(r)) || r,
                        });
                    }
                    removeHoverStyle(t, n, s) {
                        this._setStyle(t, s, 'active', !1);
                    }
                    setHoverStyle(t, n, s) {
                        this._setStyle(t, s, 'active', !0);
                    }
                    _removeDatasetHoverStyle() {
                        const t = this._cachedMeta.dataset;
                        t && this._setStyle(t, void 0, 'active', !1);
                    }
                    _setDatasetHoverStyle() {
                        const t = this._cachedMeta.dataset;
                        t && this._setStyle(t, void 0, 'active', !0);
                    }
                    _resyncElements(t) {
                        const n = this._data,
                            s = this._cachedMeta.data;
                        for (const [l, c, h] of this._syncList) this[l](c, h);
                        this._syncList = [];
                        const o = s.length,
                            r = n.length,
                            a = Math.min(r, o);
                        a && this.parse(0, a),
                            r > o
                                ? this._insertElements(o, r - o, t)
                                : r < o && this._removeElements(r, o - r);
                    }
                    _insertElements(t, n, s = !0) {
                        const o = this._cachedMeta,
                            r = o.data,
                            a = t + n;
                        let l;
                        const c = (h) => {
                            for (h.length += n, l = h.length - 1; l >= a; l--)
                                h[l] = h[l - n];
                        };
                        for (c(r), l = t; l < a; ++l)
                            r[l] = new this.dataElementType();
                        this._parsing && c(o._parsed),
                            this.parse(t, n),
                            s && this.updateElements(r, t, n, 'reset');
                    }
                    updateElements(t, n, s, o) {}
                    _removeElements(t, n) {
                        const s = this._cachedMeta;
                        if (this._parsing) {
                            const o = s._parsed.splice(t, n);
                            s._stacked && re(s, o);
                        }
                        s.data.splice(t, n);
                    }
                    _sync(t) {
                        if (this._parsing) this._syncList.push(t);
                        else {
                            const [n, s, o] = t;
                            this[n](s, o);
                        }
                        this.chart._dataChanges.push([this.index, ...t]);
                    }
                    _onDataPush() {
                        const t = arguments.length;
                        this._sync([
                            '_insertElements',
                            this.getDataset().data.length - t,
                            t,
                        ]);
                    }
                    _onDataPop() {
                        this._sync([
                            '_removeElements',
                            this._cachedMeta.data.length - 1,
                            1,
                        ]);
                    }
                    _onDataShift() {
                        this._sync(['_removeElements', 0, 1]);
                    }
                    _onDataSplice(t, n) {
                        n && this._sync(['_removeElements', t, n]);
                        const s = arguments.length - 2;
                        s && this._sync(['_insertElements', t, s]);
                    }
                    _onDataUnshift() {
                        this._sync(['_insertElements', 0, arguments.length]);
                    }
                }
                return (i.defaults = {}), i;
            })();
            function ta(i) {
                const e = i.iScale,
                    t = (function Qr(i, e) {
                        if (!i._cache.$bar) {
                            const t = i.getMatchingVisibleMetas(e);
                            let n = [];
                            for (let s = 0, o = t.length; s < o; s++)
                                n = n.concat(
                                    t[s].controller.getAllParsedValues(i)
                                );
                            i._cache.$bar = _n(n.sort((s, o) => s - o));
                        }
                        return i._cache.$bar;
                    })(e, i.type);
                let s,
                    o,
                    r,
                    a,
                    n = e._length;
                const l = () => {
                    32767 === r ||
                        -32768 === r ||
                        (nt(a) && (n = Math.min(n, Math.abs(r - a) || n)),
                        (a = r));
                };
                for (s = 0, o = t.length; s < o; ++s)
                    (r = e.getPixelForValue(t[s])), l();
                for (a = void 0, s = 0, o = e.ticks.length; s < o; ++s)
                    (r = e.getPixelForTick(s)), l();
                return n;
            }
            function Zn(i, e, t, n) {
                return (
                    V(i)
                        ? (function na(i, e, t, n) {
                              const s = t.parse(i[0], n),
                                  o = t.parse(i[1], n),
                                  r = Math.min(s, o),
                                  a = Math.max(s, o);
                              let l = r,
                                  c = a;
                              Math.abs(r) > Math.abs(a) && ((l = a), (c = r)),
                                  (e[t.axis] = c),
                                  (e._custom = {
                                      barStart: l,
                                      barEnd: c,
                                      start: s,
                                      end: o,
                                      min: r,
                                      max: a,
                                  });
                          })(i, e, t, n)
                        : (e[t.axis] = t.parse(i, n)),
                    e
                );
            }
            function qn(i, e, t, n) {
                const s = i.iScale,
                    o = i.vScale,
                    r = s.getLabels(),
                    a = s === o,
                    l = [];
                let c, h, d, u;
                for (c = t, h = t + n; c < h; ++c)
                    (u = e[c]),
                        (d = {}),
                        (d[s.axis] = a || s.parse(r[c], c)),
                        l.push(Zn(u, d, o, c));
                return l;
            }
            function vi(i) {
                return i && void 0 !== i.barStart && void 0 !== i.barEnd;
            }
            function ra(i, e, t, n) {
                let s = e.borderSkipped;
                const o = {};
                if (!s) return void (i.borderSkipped = o);
                const {
                    start: r,
                    end: a,
                    reverse: l,
                    top: c,
                    bottom: h,
                } = (function oa(i) {
                    let e, t, n, s, o;
                    return (
                        i.horizontal
                            ? ((e = i.base > i.x), (t = 'left'), (n = 'right'))
                            : ((e = i.base < i.y), (t = 'bottom'), (n = 'top')),
                        e
                            ? ((s = 'end'), (o = 'start'))
                            : ((s = 'start'), (o = 'end')),
                        { start: t, end: n, reverse: e, top: s, bottom: o }
                    );
                })(i);
                'middle' === s &&
                    t &&
                    ((i.enableBorderRadius = !0),
                    (t._top || 0) === n
                        ? (s = c)
                        : (t._bottom || 0) === n
                        ? (s = h)
                        : ((o[Gn(h, r, a, l)] = !0), (s = c))),
                    (o[Gn(s, r, a, l)] = !0),
                    (i.borderSkipped = o);
            }
            function Gn(i, e, t, n) {
                return (
                    n
                        ? ((i = (function aa(i, e, t) {
                              return i === e ? t : i === t ? e : i;
                          })(i, e, t)),
                          (i = Jn(i, t, e)))
                        : (i = Jn(i, e, t)),
                    i
                );
            }
            function Jn(i, e, t) {
                return 'start' === i ? e : 'end' === i ? t : i;
            }
            function la(i, { inflateAmount: e }, t) {
                i.inflateAmount = 'auto' === e ? (1 === t ? 0.33 : 0) : e;
            }
            (mt.prototype.datasetElementType = null),
                (mt.prototype.dataElementType = null);
            let ca = (() => {
                    class i extends mt {
                        parsePrimitiveData(t, n, s, o) {
                            return qn(t, n, s, o);
                        }
                        parseArrayData(t, n, s, o) {
                            return qn(t, n, s, o);
                        }
                        parseObjectData(t, n, s, o) {
                            const { iScale: r, vScale: a } = t,
                                { xAxisKey: l = 'x', yAxisKey: c = 'y' } =
                                    this._parsing,
                                h = 'x' === r.axis ? l : c,
                                d = 'x' === a.axis ? l : c,
                                u = [];
                            let f, g, p, m;
                            for (f = s, g = s + o; f < g; ++f)
                                (m = n[f]),
                                    (p = {}),
                                    (p[r.axis] = r.parse(yt(m, h), f)),
                                    u.push(Zn(yt(m, d), p, a, f));
                            return u;
                        }
                        updateRangeFromParsed(t, n, s, o) {
                            super.updateRangeFromParsed(t, n, s, o);
                            const r = s._custom;
                            r &&
                                n === this._cachedMeta.vScale &&
                                ((t.min = Math.min(t.min, r.min)),
                                (t.max = Math.max(t.max, r.max)));
                        }
                        getMaxOverflow() {
                            return 0;
                        }
                        getLabelAndValue(t) {
                            const n = this._cachedMeta,
                                { iScale: s, vScale: o } = n,
                                r = this.getParsed(t),
                                a = r._custom,
                                l = vi(a)
                                    ? '[' + a.start + ', ' + a.end + ']'
                                    : '' + o.getLabelForValue(r[o.axis]);
                            return {
                                label: '' + s.getLabelForValue(r[s.axis]),
                                value: l,
                            };
                        }
                        initialize() {
                            (this.enableOptionSharing = !0),
                                super.initialize(),
                                (this._cachedMeta.stack =
                                    this.getDataset().stack);
                        }
                        update(t) {
                            const n = this._cachedMeta;
                            this.updateElements(n.data, 0, n.data.length, t);
                        }
                        updateElements(t, n, s, o) {
                            const r = 'reset' === o,
                                {
                                    index: a,
                                    _cachedMeta: { vScale: l },
                                } = this,
                                c = l.getBasePixel(),
                                h = l.isHorizontal(),
                                d = this._getRuler(),
                                u = this.resolveDataElementOptions(n, o),
                                f = this.getSharedOptions(u),
                                g = this.includeOptions(o, f);
                            this.updateSharedOptions(f, o, u);
                            for (let p = n; p < n + s; p++) {
                                const m = this.getParsed(p),
                                    b =
                                        r || R(m[l.axis])
                                            ? { base: c, head: c }
                                            : this._calculateBarValuePixels(p),
                                    x = this._calculateBarIndexPixels(p, d),
                                    v = (m._stacks || {})[l.axis],
                                    y = {
                                        horizontal: h,
                                        base: b.base,
                                        enableBorderRadius:
                                            !v ||
                                            vi(m._custom) ||
                                            a === v._top ||
                                            a === v._bottom,
                                        x: h ? b.head : x.center,
                                        y: h ? x.center : b.head,
                                        height: h ? x.size : Math.abs(b.size),
                                        width: h ? Math.abs(b.size) : x.size,
                                    };
                                g &&
                                    (y.options =
                                        f ||
                                        this.resolveDataElementOptions(
                                            p,
                                            t[p].active ? 'active' : o
                                        ));
                                const _ = y.options || t[p].options;
                                ra(y, _, v, a),
                                    la(y, _, d.ratio),
                                    this.updateElement(t[p], p, y, o);
                            }
                        }
                        _getStacks(t, n) {
                            const o = this._cachedMeta.iScale,
                                r = o.getMatchingVisibleMetas(this._type),
                                a = o.options.stacked,
                                l = r.length,
                                c = [];
                            let h, d;
                            for (h = 0; h < l; ++h)
                                if (
                                    ((d = r[h]), d.controller.options.grouped)
                                ) {
                                    if (void 0 !== n) {
                                        const u =
                                            d.controller.getParsed(n)[
                                                d.controller._cachedMeta.vScale
                                                    .axis
                                            ];
                                        if (R(u) || isNaN(u)) continue;
                                    }
                                    if (
                                        ((!1 === a ||
                                            -1 === c.indexOf(d.stack) ||
                                            (void 0 === a &&
                                                void 0 === d.stack)) &&
                                            c.push(d.stack),
                                        d.index === t)
                                    )
                                        break;
                                }
                            return c.length || c.push(void 0), c;
                        }
                        _getStackCount(t) {
                            return this._getStacks(void 0, t).length;
                        }
                        _getStackIndex(t, n, s) {
                            const o = this._getStacks(t, s),
                                r = void 0 !== n ? o.indexOf(n) : -1;
                            return -1 === r ? o.length - 1 : r;
                        }
                        _getRuler() {
                            const t = this.options,
                                n = this._cachedMeta,
                                s = n.iScale,
                                o = [];
                            let r, a;
                            for (r = 0, a = n.data.length; r < a; ++r)
                                o.push(
                                    s.getPixelForValue(
                                        this.getParsed(r)[s.axis],
                                        r
                                    )
                                );
                            const l = t.barThickness;
                            return {
                                min: l || ta(n),
                                pixels: o,
                                start: s._startPixel,
                                end: s._endPixel,
                                stackCount: this._getStackCount(),
                                scale: s,
                                grouped: t.grouped,
                                ratio: l
                                    ? 1
                                    : t.categoryPercentage * t.barPercentage,
                            };
                        }
                        _calculateBarValuePixels(t) {
                            const {
                                    _cachedMeta: { vScale: n, _stacked: s },
                                    options: { base: o, minBarLength: r },
                                } = this,
                                a = o || 0,
                                l = this.getParsed(t),
                                c = l._custom,
                                h = vi(c);
                            let g,
                                p,
                                d = l[n.axis],
                                u = 0,
                                f = s ? this.applyStack(n, l, s) : d;
                            f !== d && ((u = f - d), (f = d)),
                                h &&
                                    ((d = c.barStart),
                                    (f = c.barEnd - c.barStart),
                                    0 !== d &&
                                        lt(d) !== lt(c.barEnd) &&
                                        (u = 0),
                                    (u += d));
                            const m = R(o) || h ? u : o;
                            let b = n.getPixelForValue(m);
                            if (
                                ((g = this.chart.getDataVisibility(t)
                                    ? n.getPixelForValue(u + f)
                                    : b),
                                (p = g - b),
                                Math.abs(p) < r)
                            ) {
                                (p =
                                    (function sa(i, e, t) {
                                        return 0 !== i
                                            ? lt(i)
                                            : (e.isHorizontal() ? 1 : -1) *
                                                  (e.min >= t ? 1 : -1);
                                    })(p, n, a) * r),
                                    d === a && (b -= p / 2);
                                const x = n.getPixelForDecimal(0),
                                    v = n.getPixelForDecimal(1),
                                    y = Math.min(x, v),
                                    _ = Math.max(x, v);
                                (b = Math.max(Math.min(b, _), y)), (g = b + p);
                            }
                            if (b === n.getPixelForValue(a)) {
                                const x =
                                    (lt(p) * n.getLineWidthForValue(a)) / 2;
                                (b += x), (p -= x);
                            }
                            return {
                                size: p,
                                base: b,
                                head: g,
                                center: g + p / 2,
                            };
                        }
                        _calculateBarIndexPixels(t, n) {
                            const s = n.scale,
                                o = this.options,
                                r = o.skipNull,
                                a = C(o.maxBarThickness, 1 / 0);
                            let l, c;
                            if (n.grouped) {
                                const h = r
                                        ? this._getStackCount(t)
                                        : n.stackCount,
                                    d =
                                        'flex' === o.barThickness
                                            ? (function ia(i, e, t, n) {
                                                  const s = e.pixels,
                                                      o = s[i];
                                                  let r =
                                                          i > 0
                                                              ? s[i - 1]
                                                              : null,
                                                      a =
                                                          i < s.length - 1
                                                              ? s[i + 1]
                                                              : null;
                                                  const l =
                                                      t.categoryPercentage;
                                                  null === r &&
                                                      (r =
                                                          o -
                                                          (null === a
                                                              ? e.end - e.start
                                                              : a - o)),
                                                      null === a &&
                                                          (a = o + o - r);
                                                  const c =
                                                      o -
                                                      ((o - Math.min(r, a)) /
                                                          2) *
                                                          l;
                                                  return {
                                                      chunk:
                                                          ((Math.abs(a - r) /
                                                              2) *
                                                              l) /
                                                          n,
                                                      ratio: t.barPercentage,
                                                      start: c,
                                                  };
                                              })(t, n, o, h)
                                            : (function ea(i, e, t, n) {
                                                  const s = t.barThickness;
                                                  let o, r;
                                                  return (
                                                      R(s)
                                                          ? ((o =
                                                                e.min *
                                                                t.categoryPercentage),
                                                            (r =
                                                                t.barPercentage))
                                                          : ((o = s * n),
                                                            (r = 1)),
                                                      {
                                                          chunk: o / n,
                                                          ratio: r,
                                                          start:
                                                              e.pixels[i] -
                                                              o / 2,
                                                      }
                                                  );
                                              })(t, n, o, h),
                                    u = this._getStackIndex(
                                        this.index,
                                        this._cachedMeta.stack,
                                        r ? t : void 0
                                    );
                                (l = d.start + d.chunk * u + d.chunk / 2),
                                    (c = Math.min(a, d.chunk * d.ratio));
                            } else
                                (l = s.getPixelForValue(
                                    this.getParsed(t)[s.axis],
                                    t
                                )),
                                    (c = Math.min(a, n.min * n.ratio));
                            return {
                                base: l - c / 2,
                                head: l + c / 2,
                                center: l,
                                size: c,
                            };
                        }
                        draw() {
                            const t = this._cachedMeta,
                                n = t.vScale,
                                s = t.data,
                                o = s.length;
                            let r = 0;
                            for (; r < o; ++r)
                                null !== this.getParsed(r)[n.axis] &&
                                    s[r].draw(this._ctx);
                        }
                    }
                    return (
                        (i.id = 'bar'),
                        (i.defaults = {
                            datasetElementType: !1,
                            dataElementType: 'bar',
                            categoryPercentage: 0.8,
                            barPercentage: 0.9,
                            grouped: !0,
                            animations: {
                                numbers: {
                                    type: 'number',
                                    properties: [
                                        'x',
                                        'y',
                                        'base',
                                        'width',
                                        'height',
                                    ],
                                },
                            },
                        }),
                        (i.overrides = {
                            scales: {
                                _index_: {
                                    type: 'category',
                                    offset: !0,
                                    grid: { offset: !0 },
                                },
                                _value_: { type: 'linear', beginAtZero: !0 },
                            },
                        }),
                        i
                    );
                })(),
                ha = (() => {
                    class i extends mt {
                        initialize() {
                            (this.enableOptionSharing = !0), super.initialize();
                        }
                        parsePrimitiveData(t, n, s, o) {
                            const r = super.parsePrimitiveData(t, n, s, o);
                            for (let a = 0; a < r.length; a++)
                                r[a]._custom = this.resolveDataElementOptions(
                                    a + s
                                ).radius;
                            return r;
                        }
                        parseArrayData(t, n, s, o) {
                            const r = super.parseArrayData(t, n, s, o);
                            for (let a = 0; a < r.length; a++)
                                r[a]._custom = C(
                                    n[s + a][2],
                                    this.resolveDataElementOptions(a + s).radius
                                );
                            return r;
                        }
                        parseObjectData(t, n, s, o) {
                            const r = super.parseObjectData(t, n, s, o);
                            for (let a = 0; a < r.length; a++) {
                                const l = n[s + a];
                                r[a]._custom = C(
                                    l && l.r && +l.r,
                                    this.resolveDataElementOptions(a + s).radius
                                );
                            }
                            return r;
                        }
                        getMaxOverflow() {
                            const t = this._cachedMeta.data;
                            let n = 0;
                            for (let s = t.length - 1; s >= 0; --s)
                                n = Math.max(
                                    n,
                                    t[s].size(
                                        this.resolveDataElementOptions(s)
                                    ) / 2
                                );
                            return n > 0 && n;
                        }
                        getLabelAndValue(t) {
                            const n = this._cachedMeta,
                                { xScale: s, yScale: o } = n,
                                r = this.getParsed(t),
                                a = s.getLabelForValue(r.x),
                                l = o.getLabelForValue(r.y),
                                c = r._custom;
                            return {
                                label: n.label,
                                value:
                                    '(' +
                                    a +
                                    ', ' +
                                    l +
                                    (c ? ', ' + c : '') +
                                    ')',
                            };
                        }
                        update(t) {
                            const n = this._cachedMeta.data;
                            this.updateElements(n, 0, n.length, t);
                        }
                        updateElements(t, n, s, o) {
                            const r = 'reset' === o,
                                { iScale: a, vScale: l } = this._cachedMeta,
                                c = this.resolveDataElementOptions(n, o),
                                h = this.getSharedOptions(c),
                                d = this.includeOptions(o, h),
                                u = a.axis,
                                f = l.axis;
                            for (let g = n; g < n + s; g++) {
                                const p = t[g],
                                    m = !r && this.getParsed(g),
                                    b = {},
                                    x = (b[u] = r
                                        ? a.getPixelForDecimal(0.5)
                                        : a.getPixelForValue(m[u])),
                                    v = (b[f] = r
                                        ? l.getBasePixel()
                                        : l.getPixelForValue(m[f]));
                                (b.skip = isNaN(x) || isNaN(v)),
                                    d &&
                                        ((b.options =
                                            this.resolveDataElementOptions(
                                                g,
                                                p.active ? 'active' : o
                                            )),
                                        r && (b.options.radius = 0)),
                                    this.updateElement(p, g, b, o);
                            }
                            this.updateSharedOptions(h, o, c);
                        }
                        resolveDataElementOptions(t, n) {
                            const s = this.getParsed(t);
                            let o = super.resolveDataElementOptions(t, n);
                            o.$shared &&
                                (o = Object.assign({}, o, { $shared: !1 }));
                            const r = o.radius;
                            return (
                                'active' !== n && (o.radius = 0),
                                (o.radius += C(s && s._custom, r)),
                                o
                            );
                        }
                    }
                    return (
                        (i.id = 'bubble'),
                        (i.defaults = {
                            datasetElementType: !1,
                            dataElementType: 'point',
                            animations: {
                                numbers: {
                                    type: 'number',
                                    properties: [
                                        'x',
                                        'y',
                                        'borderWidth',
                                        'radius',
                                    ],
                                },
                            },
                        }),
                        (i.overrides = {
                            scales: {
                                x: { type: 'linear' },
                                y: { type: 'linear' },
                            },
                            plugins: {
                                tooltip: { callbacks: { title: () => '' } },
                            },
                        }),
                        i
                    );
                })(),
                Qn = (() => {
                    class i extends mt {
                        constructor(t, n) {
                            super(t, n),
                                (this.enableOptionSharing = !0),
                                (this.innerRadius = void 0),
                                (this.outerRadius = void 0),
                                (this.offsetX = void 0),
                                (this.offsetY = void 0);
                        }
                        linkScales() {}
                        parse(t, n) {
                            const s = this.getDataset().data,
                                o = this._cachedMeta;
                            if (!1 === this._parsing) o._parsed = s;
                            else {
                                let a,
                                    l,
                                    r = (c) => +s[c];
                                if (A(s[t])) {
                                    const { key: c = 'value' } = this._parsing;
                                    r = (h) => +yt(s[h], c);
                                }
                                for (a = t, l = t + n; a < l; ++a)
                                    o._parsed[a] = r(a);
                            }
                        }
                        _getRotation() {
                            return rt(this.options.rotation - 90);
                        }
                        _getCircumference() {
                            return rt(this.options.circumference);
                        }
                        _getRotationExtents() {
                            let t = z,
                                n = -z;
                            for (
                                let s = 0;
                                s < this.chart.data.datasets.length;
                                ++s
                            )
                                if (this.chart.isDatasetVisible(s)) {
                                    const o =
                                            this.chart.getDatasetMeta(
                                                s
                                            ).controller,
                                        r = o._getRotation(),
                                        a = o._getCircumference();
                                    (t = Math.min(t, r)),
                                        (n = Math.max(n, r + a));
                                }
                            return { rotation: t, circumference: n - t };
                        }
                        update(t) {
                            const n = this.chart,
                                { chartArea: s } = n,
                                o = this._cachedMeta,
                                r = o.data,
                                a =
                                    this.getMaxBorderWidth() +
                                    this.getMaxOffset(r) +
                                    this.options.spacing,
                                l = Math.max(
                                    (Math.min(s.width, s.height) - a) / 2,
                                    0
                                ),
                                c = Math.min(
                                    ((i, e) =>
                                        'string' == typeof i && i.endsWith('%')
                                            ? parseFloat(i) / 100
                                            : i / e)(this.options.cutout, l),
                                    1
                                ),
                                h = this._getRingWeight(this.index),
                                { circumference: d, rotation: u } =
                                    this._getRotationExtents(),
                                {
                                    ratioX: f,
                                    ratioY: g,
                                    offsetX: p,
                                    offsetY: m,
                                } = (function da(i, e, t) {
                                    let n = 1,
                                        s = 1,
                                        o = 0,
                                        r = 0;
                                    if (e < z) {
                                        const a = i,
                                            l = a + e,
                                            c = Math.cos(a),
                                            h = Math.sin(a),
                                            d = Math.cos(l),
                                            u = Math.sin(l),
                                            f = (v, y, _) =>
                                                Gt(v, a, l, !0)
                                                    ? 1
                                                    : Math.max(
                                                          y,
                                                          y * t,
                                                          _,
                                                          _ * t
                                                      ),
                                            g = (v, y, _) =>
                                                Gt(v, a, l, !0)
                                                    ? -1
                                                    : Math.min(
                                                          y,
                                                          y * t,
                                                          _,
                                                          _ * t
                                                      ),
                                            p = f(0, c, d),
                                            m = f(H, h, u),
                                            b = g(N, c, d),
                                            x = g(N + H, h, u);
                                        (n = (p - b) / 2),
                                            (s = (m - x) / 2),
                                            (o = -(p + b) / 2),
                                            (r = -(m + x) / 2);
                                    }
                                    return {
                                        ratioX: n,
                                        ratioY: s,
                                        offsetX: o,
                                        offsetY: r,
                                    };
                                })(u, d, c),
                                v = Math.max(
                                    Math.min(
                                        (s.width - a) / f,
                                        (s.height - a) / g
                                    ) / 2,
                                    0
                                ),
                                y = Xi(this.options.radius, v),
                                M =
                                    (y - Math.max(y * c, 0)) /
                                    this._getVisibleDatasetWeightTotal();
                            (this.offsetX = p * y),
                                (this.offsetY = m * y),
                                (o.total = this.calculateTotal()),
                                (this.outerRadius =
                                    y -
                                    M * this._getRingWeightOffset(this.index)),
                                (this.innerRadius = Math.max(
                                    this.outerRadius - M * h,
                                    0
                                )),
                                this.updateElements(r, 0, r.length, t);
                        }
                        _circumference(t, n) {
                            const s = this.options,
                                o = this._cachedMeta,
                                r = this._getCircumference();
                            return (n && s.animation.animateRotate) ||
                                !this.chart.getDataVisibility(t) ||
                                null === o._parsed[t] ||
                                o.data[t].hidden
                                ? 0
                                : this.calculateCircumference(
                                      (o._parsed[t] * r) / z
                                  );
                        }
                        updateElements(t, n, s, o) {
                            const r = 'reset' === o,
                                a = this.chart,
                                l = a.chartArea,
                                d = (l.left + l.right) / 2,
                                u = (l.top + l.bottom) / 2,
                                f = r && a.options.animation.animateScale,
                                g = f ? 0 : this.innerRadius,
                                p = f ? 0 : this.outerRadius,
                                m = this.resolveDataElementOptions(n, o),
                                b = this.getSharedOptions(m),
                                x = this.includeOptions(o, b);
                            let y,
                                v = this._getRotation();
                            for (y = 0; y < n; ++y)
                                v += this._circumference(y, r);
                            for (y = n; y < n + s; ++y) {
                                const _ = this._circumference(y, r),
                                    M = t[y],
                                    w = {
                                        x: d + this.offsetX,
                                        y: u + this.offsetY,
                                        startAngle: v,
                                        endAngle: v + _,
                                        circumference: _,
                                        outerRadius: p,
                                        innerRadius: g,
                                    };
                                x &&
                                    (w.options =
                                        b ||
                                        this.resolveDataElementOptions(
                                            y,
                                            M.active ? 'active' : o
                                        )),
                                    (v += _),
                                    this.updateElement(M, y, w, o);
                            }
                            this.updateSharedOptions(b, o, m);
                        }
                        calculateTotal() {
                            const t = this._cachedMeta,
                                n = t.data;
                            let o,
                                s = 0;
                            for (o = 0; o < n.length; o++) {
                                const r = t._parsed[o];
                                null !== r &&
                                    !isNaN(r) &&
                                    this.chart.getDataVisibility(o) &&
                                    !n[o].hidden &&
                                    (s += Math.abs(r));
                            }
                            return s;
                        }
                        calculateCircumference(t) {
                            const n = this._cachedMeta.total;
                            return n > 0 && !isNaN(t)
                                ? z * (Math.abs(t) / n)
                                : 0;
                        }
                        getLabelAndValue(t) {
                            const s = this.chart,
                                o = s.data.labels || [],
                                r = oe(
                                    this._cachedMeta._parsed[t],
                                    s.options.locale
                                );
                            return { label: o[t] || '', value: r };
                        }
                        getMaxBorderWidth(t) {
                            let n = 0;
                            const s = this.chart;
                            let o, r, a, l, c;
                            if (!t)
                                for (
                                    o = 0, r = s.data.datasets.length;
                                    o < r;
                                    ++o
                                )
                                    if (s.isDatasetVisible(o)) {
                                        (a = s.getDatasetMeta(o)),
                                            (t = a.data),
                                            (l = a.controller);
                                        break;
                                    }
                            if (!t) return 0;
                            for (o = 0, r = t.length; o < r; ++o)
                                (c = l.resolveDataElementOptions(o)),
                                    'inner' !== c.borderAlign &&
                                        (n = Math.max(
                                            n,
                                            c.borderWidth || 0,
                                            c.hoverBorderWidth || 0
                                        ));
                            return n;
                        }
                        getMaxOffset(t) {
                            let n = 0;
                            for (let s = 0, o = t.length; s < o; ++s) {
                                const r = this.resolveDataElementOptions(s);
                                n = Math.max(
                                    n,
                                    r.offset || 0,
                                    r.hoverOffset || 0
                                );
                            }
                            return n;
                        }
                        _getRingWeightOffset(t) {
                            let n = 0;
                            for (let s = 0; s < t; ++s)
                                this.chart.isDatasetVisible(s) &&
                                    (n += this._getRingWeight(s));
                            return n;
                        }
                        _getRingWeight(t) {
                            return Math.max(
                                C(this.chart.data.datasets[t].weight, 1),
                                0
                            );
                        }
                        _getVisibleDatasetWeightTotal() {
                            return (
                                this._getRingWeightOffset(
                                    this.chart.data.datasets.length
                                ) || 1
                            );
                        }
                    }
                    return (
                        (i.id = 'doughnut'),
                        (i.defaults = {
                            datasetElementType: !1,
                            dataElementType: 'arc',
                            animation: { animateRotate: !0, animateScale: !1 },
                            animations: {
                                numbers: {
                                    type: 'number',
                                    properties: [
                                        'circumference',
                                        'endAngle',
                                        'innerRadius',
                                        'outerRadius',
                                        'startAngle',
                                        'x',
                                        'y',
                                        'offset',
                                        'borderWidth',
                                        'spacing',
                                    ],
                                },
                            },
                            cutout: '50%',
                            rotation: 0,
                            circumference: 360,
                            radius: '100%',
                            spacing: 0,
                            indexAxis: 'r',
                        }),
                        (i.descriptors = {
                            _scriptable: (e) => 'spacing' !== e,
                            _indexable: (e) => 'spacing' !== e,
                        }),
                        (i.overrides = {
                            aspectRatio: 1,
                            plugins: {
                                legend: {
                                    labels: {
                                        generateLabels(e) {
                                            const t = e.data;
                                            if (
                                                t.labels.length &&
                                                t.datasets.length
                                            ) {
                                                const {
                                                    labels: { pointStyle: n },
                                                } = e.legend.options;
                                                return t.labels.map((s, o) => {
                                                    const a = e
                                                        .getDatasetMeta(0)
                                                        .controller.getStyle(o);
                                                    return {
                                                        text: s,
                                                        fillStyle:
                                                            a.backgroundColor,
                                                        strokeStyle:
                                                            a.borderColor,
                                                        lineWidth:
                                                            a.borderWidth,
                                                        pointStyle: n,
                                                        hidden: !e.getDataVisibility(
                                                            o
                                                        ),
                                                        index: o,
                                                    };
                                                });
                                            }
                                            return [];
                                        },
                                    },
                                    onClick(e, t, n) {
                                        n.chart.toggleDataVisibility(t.index),
                                            n.chart.update();
                                    },
                                },
                                tooltip: {
                                    callbacks: {
                                        title: () => '',
                                        label(e) {
                                            let t = e.label;
                                            const n = ': ' + e.formattedValue;
                                            return (
                                                V(t)
                                                    ? ((t = t.slice()),
                                                      (t[0] += n))
                                                    : (t += n),
                                                t
                                            );
                                        },
                                    },
                                },
                            },
                        }),
                        i
                    );
                })(),
                ts = (() => {
                    class i extends mt {
                        initialize() {
                            (this.enableOptionSharing = !0),
                                (this.supportsDecimation = !0),
                                super.initialize();
                        }
                        update(t) {
                            const n = this._cachedMeta,
                                { dataset: s, data: o = [], _dataset: r } = n,
                                a = this.chart._animationsDisabled;
                            let { start: l, count: c } = (function ua(i, e, t) {
                                const n = e.length;
                                let s = 0,
                                    o = n;
                                if (i._sorted) {
                                    const { iScale: r, _parsed: a } = i,
                                        l = r.axis,
                                        {
                                            min: c,
                                            max: h,
                                            minDefined: d,
                                            maxDefined: u,
                                        } = r.getUserBounds();
                                    d &&
                                        (s = X(
                                            Math.min(
                                                gt(a, r.axis, c).lo,
                                                t
                                                    ? n
                                                    : gt(
                                                          e,
                                                          l,
                                                          r.getPixelForValue(c)
                                                      ).lo
                                            ),
                                            0,
                                            n - 1
                                        )),
                                        (o = u
                                            ? X(
                                                  Math.max(
                                                      gt(a, r.axis, h).hi + 1,
                                                      t
                                                          ? 0
                                                          : gt(
                                                                e,
                                                                l,
                                                                r.getPixelForValue(
                                                                    h
                                                                )
                                                            ).hi + 1
                                                  ),
                                                  s,
                                                  n
                                              ) - s
                                            : n - s);
                                }
                                return { start: s, count: o };
                            })(n, o, a);
                            (this._drawStart = l),
                                (this._drawCount = c),
                                (function fa(i) {
                                    const {
                                            xScale: e,
                                            yScale: t,
                                            _scaleRanges: n,
                                        } = i,
                                        s = {
                                            xmin: e.min,
                                            xmax: e.max,
                                            ymin: t.min,
                                            ymax: t.max,
                                        };
                                    if (!n) return (i._scaleRanges = s), !0;
                                    const o =
                                        n.xmin !== e.min ||
                                        n.xmax !== e.max ||
                                        n.ymin !== t.min ||
                                        n.ymax !== t.max;
                                    return Object.assign(n, s), o;
                                })(n) && ((l = 0), (c = o.length)),
                                (s._chart = this.chart),
                                (s._datasetIndex = this.index),
                                (s._decimated = !!r._decimated),
                                (s.points = o);
                            const h = this.resolveDatasetElementOptions(t);
                            this.options.showLine || (h.borderWidth = 0),
                                (h.segment = this.options.segment),
                                this.updateElement(
                                    s,
                                    void 0,
                                    { animated: !a, options: h },
                                    t
                                ),
                                this.updateElements(o, l, c, t);
                        }
                        updateElements(t, n, s, o) {
                            const r = 'reset' === o,
                                {
                                    iScale: a,
                                    vScale: l,
                                    _stacked: c,
                                    _dataset: h,
                                } = this._cachedMeta,
                                d = this.resolveDataElementOptions(n, o),
                                u = this.getSharedOptions(d),
                                f = this.includeOptions(o, u),
                                g = a.axis,
                                p = l.axis,
                                { spanGaps: m, segment: b } = this.options,
                                x = Zt(m) ? m : Number.POSITIVE_INFINITY,
                                v =
                                    this.chart._animationsDisabled ||
                                    r ||
                                    'none' === o;
                            let y = n > 0 && this.getParsed(n - 1);
                            for (let _ = n; _ < n + s; ++_) {
                                const M = t[_],
                                    w = this.getParsed(_),
                                    k = v ? M : {},
                                    S = R(w[p]),
                                    F = (k[g] = a.getPixelForValue(w[g], _)),
                                    L = (k[p] =
                                        r || S
                                            ? l.getBasePixel()
                                            : l.getPixelForValue(
                                                  c
                                                      ? this.applyStack(l, w, c)
                                                      : w[p],
                                                  _
                                              ));
                                (k.skip = isNaN(F) || isNaN(L) || S),
                                    (k.stop =
                                        _ > 0 && Math.abs(w[g] - y[g]) > x),
                                    b && ((k.parsed = w), (k.raw = h.data[_])),
                                    f &&
                                        (k.options =
                                            u ||
                                            this.resolveDataElementOptions(
                                                _,
                                                M.active ? 'active' : o
                                            )),
                                    v || this.updateElement(M, _, k, o),
                                    (y = w);
                            }
                            this.updateSharedOptions(u, o, d);
                        }
                        getMaxOverflow() {
                            const t = this._cachedMeta,
                                n = t.dataset,
                                s = (n.options && n.options.borderWidth) || 0,
                                o = t.data || [];
                            if (!o.length) return s;
                            const r = o[0].size(
                                    this.resolveDataElementOptions(0)
                                ),
                                a = o[o.length - 1].size(
                                    this.resolveDataElementOptions(o.length - 1)
                                );
                            return Math.max(s, r, a) / 2;
                        }
                        draw() {
                            const t = this._cachedMeta;
                            t.dataset.updateControlPoints(
                                this.chart.chartArea,
                                t.iScale.axis
                            ),
                                super.draw();
                        }
                    }
                    return (
                        (i.id = 'line'),
                        (i.defaults = {
                            datasetElementType: 'line',
                            dataElementType: 'point',
                            showLine: !0,
                            spanGaps: !1,
                        }),
                        (i.overrides = {
                            scales: {
                                _index_: { type: 'category' },
                                _value_: { type: 'linear' },
                            },
                        }),
                        i
                    );
                })();
            var ga = Object.freeze({
                __proto__: null,
                BarController: ca,
                BubbleController: ha,
                DoughnutController: Qn,
                LineController: ts,
                PolarAreaController: (() => {
                    class i extends mt {
                        constructor(t, n) {
                            super(t, n),
                                (this.innerRadius = void 0),
                                (this.outerRadius = void 0);
                        }
                        getLabelAndValue(t) {
                            const s = this.chart,
                                o = s.data.labels || [],
                                r = oe(
                                    this._cachedMeta._parsed[t].r,
                                    s.options.locale
                                );
                            return { label: o[t] || '', value: r };
                        }
                        parseObjectData(t, n, s, o) {
                            return Pn.bind(this)(t, n, s, o);
                        }
                        update(t) {
                            const n = this._cachedMeta.data;
                            this._updateRadius(),
                                this.updateElements(n, 0, n.length, t);
                        }
                        getMinMax() {
                            const n = {
                                min: Number.POSITIVE_INFINITY,
                                max: Number.NEGATIVE_INFINITY,
                            };
                            return (
                                this._cachedMeta.data.forEach((s, o) => {
                                    const r = this.getParsed(o).r;
                                    !isNaN(r) &&
                                        this.chart.getDataVisibility(o) &&
                                        (r < n.min && (n.min = r),
                                        r > n.max && (n.max = r));
                                }),
                                n
                            );
                        }
                        _updateRadius() {
                            const t = this.chart,
                                n = t.chartArea,
                                s = t.options,
                                o = Math.min(
                                    n.right - n.left,
                                    n.bottom - n.top
                                ),
                                r = Math.max(o / 2, 0),
                                l =
                                    (r -
                                        Math.max(
                                            s.cutoutPercentage
                                                ? (r / 100) * s.cutoutPercentage
                                                : 1,
                                            0
                                        )) /
                                    t.getVisibleDatasetCount();
                            (this.outerRadius = r - l * this.index),
                                (this.innerRadius = this.outerRadius - l);
                        }
                        updateElements(t, n, s, o) {
                            const r = 'reset' === o,
                                a = this.chart,
                                c = a.options.animation,
                                h = this._cachedMeta.rScale,
                                d = h.xCenter,
                                u = h.yCenter,
                                f = h.getIndexAngle(0) - 0.5 * N;
                            let p,
                                g = f;
                            const m = 360 / this.countVisibleElements();
                            for (p = 0; p < n; ++p)
                                g += this._computeAngle(p, o, m);
                            for (p = n; p < n + s; p++) {
                                const b = t[p];
                                let x = g,
                                    v = g + this._computeAngle(p, o, m),
                                    y = a.getDataVisibility(p)
                                        ? h.getDistanceFromCenterForValue(
                                              this.getParsed(p).r
                                          )
                                        : 0;
                                (g = v),
                                    r &&
                                        (c.animateScale && (y = 0),
                                        c.animateRotate && (x = v = f));
                                const _ = {
                                    x: d,
                                    y: u,
                                    innerRadius: 0,
                                    outerRadius: y,
                                    startAngle: x,
                                    endAngle: v,
                                    options: this.resolveDataElementOptions(
                                        p,
                                        b.active ? 'active' : o
                                    ),
                                };
                                this.updateElement(b, p, _, o);
                            }
                        }
                        countVisibleElements() {
                            let n = 0;
                            return (
                                this._cachedMeta.data.forEach((s, o) => {
                                    !isNaN(this.getParsed(o).r) &&
                                        this.chart.getDataVisibility(o) &&
                                        n++;
                                }),
                                n
                            );
                        }
                        _computeAngle(t, n, s) {
                            return this.chart.getDataVisibility(t)
                                ? rt(
                                      this.resolveDataElementOptions(t, n)
                                          .angle || s
                                  )
                                : 0;
                        }
                    }
                    return (
                        (i.id = 'polarArea'),
                        (i.defaults = {
                            dataElementType: 'arc',
                            animation: { animateRotate: !0, animateScale: !0 },
                            animations: {
                                numbers: {
                                    type: 'number',
                                    properties: [
                                        'x',
                                        'y',
                                        'startAngle',
                                        'endAngle',
                                        'innerRadius',
                                        'outerRadius',
                                    ],
                                },
                            },
                            indexAxis: 'r',
                            startAngle: 0,
                        }),
                        (i.overrides = {
                            aspectRatio: 1,
                            plugins: {
                                legend: {
                                    labels: {
                                        generateLabels(e) {
                                            const t = e.data;
                                            if (
                                                t.labels.length &&
                                                t.datasets.length
                                            ) {
                                                const {
                                                    labels: { pointStyle: n },
                                                } = e.legend.options;
                                                return t.labels.map((s, o) => {
                                                    const a = e
                                                        .getDatasetMeta(0)
                                                        .controller.getStyle(o);
                                                    return {
                                                        text: s,
                                                        fillStyle:
                                                            a.backgroundColor,
                                                        strokeStyle:
                                                            a.borderColor,
                                                        lineWidth:
                                                            a.borderWidth,
                                                        pointStyle: n,
                                                        hidden: !e.getDataVisibility(
                                                            o
                                                        ),
                                                        index: o,
                                                    };
                                                });
                                            }
                                            return [];
                                        },
                                    },
                                    onClick(e, t, n) {
                                        n.chart.toggleDataVisibility(t.index),
                                            n.chart.update();
                                    },
                                },
                                tooltip: {
                                    callbacks: {
                                        title: () => '',
                                        label: (e) =>
                                            e.chart.data.labels[e.dataIndex] +
                                            ': ' +
                                            e.formattedValue,
                                    },
                                },
                            },
                            scales: {
                                r: {
                                    type: 'radialLinear',
                                    angleLines: { display: !1 },
                                    beginAtZero: !0,
                                    grid: { circular: !0 },
                                    pointLabels: { display: !1 },
                                    startAngle: 0,
                                },
                            },
                        }),
                        i
                    );
                })(),
                PieController: (() => {
                    class i extends Qn {}
                    return (
                        (i.id = 'pie'),
                        (i.defaults = {
                            cutout: 0,
                            rotation: 0,
                            circumference: 360,
                            radius: '100%',
                        }),
                        i
                    );
                })(),
                RadarController: (() => {
                    class i extends mt {
                        getLabelAndValue(t) {
                            const n = this._cachedMeta.vScale,
                                s = this.getParsed(t);
                            return {
                                label: n.getLabels()[t],
                                value: '' + n.getLabelForValue(s[n.axis]),
                            };
                        }
                        parseObjectData(t, n, s, o) {
                            return Pn.bind(this)(t, n, s, o);
                        }
                        update(t) {
                            const n = this._cachedMeta,
                                s = n.dataset,
                                o = n.data || [],
                                r = n.iScale.getLabels();
                            if (((s.points = o), 'resize' !== t)) {
                                const a = this.resolveDatasetElementOptions(t);
                                this.options.showLine || (a.borderWidth = 0),
                                    this.updateElement(
                                        s,
                                        void 0,
                                        {
                                            _loop: !0,
                                            _fullLoop: r.length === o.length,
                                            options: a,
                                        },
                                        t
                                    );
                            }
                            this.updateElements(o, 0, o.length, t);
                        }
                        updateElements(t, n, s, o) {
                            const r = this._cachedMeta.rScale,
                                a = 'reset' === o;
                            for (let l = n; l < n + s; l++) {
                                const c = t[l],
                                    h = this.resolveDataElementOptions(
                                        l,
                                        c.active ? 'active' : o
                                    ),
                                    d = r.getPointPositionForValue(
                                        l,
                                        this.getParsed(l).r
                                    ),
                                    u = a ? r.xCenter : d.x,
                                    f = a ? r.yCenter : d.y,
                                    g = {
                                        x: u,
                                        y: f,
                                        angle: d.angle,
                                        skip: isNaN(u) || isNaN(f),
                                        options: h,
                                    };
                                this.updateElement(c, l, g, o);
                            }
                        }
                    }
                    return (
                        (i.id = 'radar'),
                        (i.defaults = {
                            datasetElementType: 'line',
                            dataElementType: 'point',
                            indexAxis: 'r',
                            showLine: !0,
                            elements: { line: { fill: 'start' } },
                        }),
                        (i.overrides = {
                            aspectRatio: 1,
                            scales: { r: { type: 'radialLinear' } },
                        }),
                        i
                    );
                })(),
                ScatterController: (() => {
                    class i extends ts {}
                    return (
                        (i.id = 'scatter'),
                        (i.defaults = { showLine: !1, fill: !1 }),
                        (i.overrides = {
                            interaction: { mode: 'point' },
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        title: () => '',
                                        label: (e) =>
                                            '(' +
                                            e.label +
                                            ', ' +
                                            e.formattedValue +
                                            ')',
                                    },
                                },
                            },
                            scales: {
                                x: { type: 'linear' },
                                y: { type: 'linear' },
                            },
                        }),
                        i
                    );
                })(),
            });
            function Et() {
                throw new Error(
                    'This method is not implemented: Check that a complete date adapter is provided.'
                );
            }
            var pa = {
                _date: (() => {
                    class i {
                        constructor(t) {
                            this.options = t || {};
                        }
                        formats() {
                            return Et();
                        }
                        parse(t, n) {
                            return Et();
                        }
                        format(t, n) {
                            return Et();
                        }
                        add(t, n, s) {
                            return Et();
                        }
                        diff(t, n, s) {
                            return Et();
                        }
                        startOf(t, n, s) {
                            return Et();
                        }
                        endOf(t, n) {
                            return Et();
                        }
                    }
                    return (
                        (i.override = function (e) {
                            Object.assign(i.prototype, e);
                        }),
                        i
                    );
                })(),
            };
            function ma(i, e, t, n) {
                const { controller: s, data: o, _sorted: r } = i,
                    a = s._cachedMeta.iScale;
                if (a && e === a.axis && 'r' !== e && r && o.length) {
                    const l = a._reversePixels ? Qo : gt;
                    if (!n) return l(o, e, t);
                    if (s._sharedOptions) {
                        const c = o[0],
                            h =
                                'function' == typeof c.getRange &&
                                c.getRange(e);
                        if (h) {
                            const d = l(o, e, t - h),
                                u = l(o, e, t + h);
                            return { lo: d.lo, hi: u.hi };
                        }
                    }
                }
                return { lo: 0, hi: o.length - 1 };
            }
            function ae(i, e, t, n, s) {
                const o = i.getSortedVisibleDatasetMetas(),
                    r = t[e];
                for (let a = 0, l = o.length; a < l; ++a) {
                    const { index: c, data: h } = o[a],
                        { lo: d, hi: u } = ma(o[a], e, r, s);
                    for (let f = d; f <= u; ++f) {
                        const g = h[f];
                        g.skip || n(g, c, f);
                    }
                }
            }
            function Mi(i, e, t, n, s) {
                const o = [];
                return (
                    (!s && !i.isPointInArea(e)) ||
                        ae(
                            i,
                            t,
                            e,
                            function (a, l, c) {
                                (!s && !ie(a, i.chartArea, 0)) ||
                                    (a.inRange(e.x, e.y, n) &&
                                        o.push({
                                            element: a,
                                            datasetIndex: l,
                                            index: c,
                                        }));
                            },
                            !0
                        ),
                    o
                );
            }
            function wi(i, e, t, n, s, o) {
                return o || i.isPointInArea(e)
                    ? 'r' !== t || n
                        ? (function _a(i, e, t, n, s, o) {
                              let r = [];
                              const a = (function ba(i) {
                                  const e = -1 !== i.indexOf('x'),
                                      t = -1 !== i.indexOf('y');
                                  return function (n, s) {
                                      const o = e ? Math.abs(n.x - s.x) : 0,
                                          r = t ? Math.abs(n.y - s.y) : 0;
                                      return Math.sqrt(
                                          Math.pow(o, 2) + Math.pow(r, 2)
                                      );
                                  };
                              })(t);
                              let l = Number.POSITIVE_INFINITY;
                              return (
                                  ae(i, t, e, function c(h, d, u) {
                                      const f = h.inRange(e.x, e.y, s);
                                      if (n && !f) return;
                                      const g = h.getCenterPoint(s);
                                      if (!o && !i.isPointInArea(g) && !f)
                                          return;
                                      const m = a(e, g);
                                      m < l
                                          ? ((r = [
                                                {
                                                    element: h,
                                                    datasetIndex: d,
                                                    index: u,
                                                },
                                            ]),
                                            (l = m))
                                          : m === l &&
                                            r.push({
                                                element: h,
                                                datasetIndex: d,
                                                index: u,
                                            });
                                  }),
                                  r
                              );
                          })(i, e, t, n, s, o)
                        : (function xa(i, e, t, n) {
                              let s = [];
                              return (
                                  ae(i, t, e, function o(r, a, l) {
                                      const { startAngle: c, endAngle: h } =
                                              r.getProps(
                                                  ['startAngle', 'endAngle'],
                                                  n
                                              ),
                                          { angle: d } = en(r, {
                                              x: e.x,
                                              y: e.y,
                                          });
                                      Gt(d, c, h) &&
                                          s.push({
                                              element: r,
                                              datasetIndex: a,
                                              index: l,
                                          });
                                  }),
                                  s
                              );
                          })(i, e, t, s)
                    : [];
            }
            function es(i, e, t, n, s) {
                const o = [],
                    r = 'x' === t ? 'inXRange' : 'inYRange';
                let a = !1;
                return (
                    ae(i, t, e, (l, c, h) => {
                        l[r](e[t], s) &&
                            (o.push({ element: l, datasetIndex: c, index: h }),
                            (a = a || l.inRange(e.x, e.y, s)));
                    }),
                    n && !a ? [] : o
                );
            }
            var ya = {
                evaluateInteractionItems: ae,
                modes: {
                    index(i, e, t, n) {
                        const s = Tt(e, i),
                            o = t.axis || 'x',
                            r = t.includeInvisible || !1,
                            a = t.intersect
                                ? Mi(i, s, o, n, r)
                                : wi(i, s, o, !1, n, r),
                            l = [];
                        return a.length
                            ? (i.getSortedVisibleDatasetMetas().forEach((c) => {
                                  const h = a[0].index,
                                      d = c.data[h];
                                  d &&
                                      !d.skip &&
                                      l.push({
                                          element: d,
                                          datasetIndex: c.index,
                                          index: h,
                                      });
                              }),
                              l)
                            : [];
                    },
                    dataset(i, e, t, n) {
                        const s = Tt(e, i),
                            o = t.axis || 'xy',
                            r = t.includeInvisible || !1;
                        let a = t.intersect
                            ? Mi(i, s, o, n, r)
                            : wi(i, s, o, !1, n, r);
                        if (a.length > 0) {
                            const l = a[0].datasetIndex,
                                c = i.getDatasetMeta(l).data;
                            a = [];
                            for (let h = 0; h < c.length; ++h)
                                a.push({
                                    element: c[h],
                                    datasetIndex: l,
                                    index: h,
                                });
                        }
                        return a;
                    },
                    point: (i, e, t, n) =>
                        Mi(
                            i,
                            Tt(e, i),
                            t.axis || 'xy',
                            n,
                            t.includeInvisible || !1
                        ),
                    nearest: (i, e, t, n) =>
                        wi(
                            i,
                            Tt(e, i),
                            t.axis || 'xy',
                            t.intersect,
                            n,
                            t.includeInvisible || !1
                        ),
                    x: (i, e, t, n) => es(i, Tt(e, i), 'x', t.intersect, n),
                    y: (i, e, t, n) => es(i, Tt(e, i), 'y', t.intersect, n),
                },
            };
            const is = ['left', 'top', 'right', 'bottom'];
            function le(i, e) {
                return i.filter((t) => t.pos === e);
            }
            function ns(i, e) {
                return i.filter(
                    (t) => -1 === is.indexOf(t.pos) && t.box.axis === e
                );
            }
            function ce(i, e) {
                return i.sort((t, n) => {
                    const s = e ? n : t,
                        o = e ? t : n;
                    return s.weight === o.weight
                        ? s.index - o.index
                        : s.weight - o.weight;
                });
            }
            function ss(i, e, t, n) {
                return Math.max(i[t], e[t]) + Math.max(i[n], e[n]);
            }
            function os(i, e) {
                (i.top = Math.max(i.top, e.top)),
                    (i.left = Math.max(i.left, e.left)),
                    (i.bottom = Math.max(i.bottom, e.bottom)),
                    (i.right = Math.max(i.right, e.right));
            }
            function Sa(i, e, t, n) {
                const { pos: s, box: o } = t,
                    r = i.maxPadding;
                if (!A(s)) {
                    t.size && (i[s] -= t.size);
                    const d = n[t.stack] || { size: 0, count: 1 };
                    (d.size = Math.max(
                        d.size,
                        t.horizontal ? o.height : o.width
                    )),
                        (t.size = d.size / d.count),
                        (i[s] += t.size);
                }
                o.getPadding && os(r, o.getPadding());
                const a = Math.max(0, e.outerWidth - ss(r, i, 'left', 'right')),
                    l = Math.max(0, e.outerHeight - ss(r, i, 'top', 'bottom')),
                    c = a !== i.w,
                    h = l !== i.h;
                return (
                    (i.w = a),
                    (i.h = l),
                    t.horizontal ? { same: c, other: h } : { same: h, other: c }
                );
            }
            function Ca(i, e) {
                const t = e.maxPadding;
                return (function n(s) {
                    const o = { left: 0, top: 0, right: 0, bottom: 0 };
                    return (
                        s.forEach((r) => {
                            o[r] = Math.max(e[r], t[r]);
                        }),
                        o
                    );
                })(i ? ['left', 'right'] : ['top', 'bottom']);
            }
            function he(i, e, t, n) {
                const s = [];
                let o, r, a, l, c, h;
                for (o = 0, r = i.length, c = 0; o < r; ++o) {
                    (a = i[o]),
                        (l = a.box),
                        l.update(
                            a.width || e.w,
                            a.height || e.h,
                            Ca(a.horizontal, e)
                        );
                    const { same: d, other: u } = Sa(e, t, a, n);
                    (c |= d && s.length), (h = h || u), l.fullSize || s.push(a);
                }
                return (c && he(s, e, t, n)) || h;
            }
            function Ie(i, e, t, n, s) {
                (i.top = t),
                    (i.left = e),
                    (i.right = e + n),
                    (i.bottom = t + s),
                    (i.width = n),
                    (i.height = s);
            }
            function rs(i, e, t, n) {
                const s = t.padding;
                let { x: o, y: r } = e;
                for (const a of i) {
                    const l = a.box,
                        c = n[a.stack] || { count: 1, placed: 0, weight: 1 },
                        h = a.stackWeight / c.weight || 1;
                    if (a.horizontal) {
                        const d = e.w * h,
                            u = c.size || l.height;
                        nt(c.start) && (r = c.start),
                            l.fullSize
                                ? Ie(
                                      l,
                                      s.left,
                                      r,
                                      t.outerWidth - s.right - s.left,
                                      u
                                  )
                                : Ie(l, e.left + c.placed, r, d, u),
                            (c.start = r),
                            (c.placed += d),
                            (r = l.bottom);
                    } else {
                        const d = e.h * h,
                            u = c.size || l.width;
                        nt(c.start) && (o = c.start),
                            l.fullSize
                                ? Ie(
                                      l,
                                      o,
                                      s.top,
                                      u,
                                      t.outerHeight - s.bottom - s.top
                                  )
                                : Ie(l, o, e.top + c.placed, u, d),
                            (c.start = o),
                            (c.placed += d),
                            (o = l.right);
                    }
                }
                (e.x = o), (e.y = r);
            }
            O.set('layout', {
                autoPadding: !0,
                padding: { top: 0, right: 0, bottom: 0, left: 0 },
            });
            var G = {
                addBox(i, e) {
                    i.boxes || (i.boxes = []),
                        (e.fullSize = e.fullSize || !1),
                        (e.position = e.position || 'top'),
                        (e.weight = e.weight || 0),
                        (e._layers =
                            e._layers ||
                            function () {
                                return [
                                    {
                                        z: 0,
                                        draw(t) {
                                            e.draw(t);
                                        },
                                    },
                                ];
                            }),
                        i.boxes.push(e);
                },
                removeBox(i, e) {
                    const t = i.boxes ? i.boxes.indexOf(e) : -1;
                    -1 !== t && i.boxes.splice(t, 1);
                },
                configure(i, e, t) {
                    (e.fullSize = t.fullSize),
                        (e.position = t.position),
                        (e.weight = t.weight);
                },
                update(i, e, t, n) {
                    if (!i) return;
                    const s = q(i.options.layout.padding),
                        o = Math.max(e - s.width, 0),
                        r = Math.max(t - s.height, 0),
                        a = (function ka(i) {
                            const e = (function va(i) {
                                    const e = [];
                                    let t, n, s, o, r, a;
                                    for (
                                        t = 0, n = (i || []).length;
                                        t < n;
                                        ++t
                                    )
                                        (s = i[t]),
                                            ({
                                                position: o,
                                                options: {
                                                    stack: r,
                                                    stackWeight: a = 1,
                                                },
                                            } = s),
                                            e.push({
                                                index: t,
                                                box: s,
                                                pos: o,
                                                horizontal: s.isHorizontal(),
                                                weight: s.weight,
                                                stack: r && o + r,
                                                stackWeight: a,
                                            });
                                    return e;
                                })(i),
                                t = ce(
                                    e.filter((c) => c.box.fullSize),
                                    !0
                                ),
                                n = ce(le(e, 'left'), !0),
                                s = ce(le(e, 'right')),
                                o = ce(le(e, 'top'), !0),
                                r = ce(le(e, 'bottom')),
                                a = ns(e, 'x'),
                                l = ns(e, 'y');
                            return {
                                fullSize: t,
                                leftAndTop: n.concat(o),
                                rightAndBottom: s.concat(l).concat(r).concat(a),
                                chartArea: le(e, 'chartArea'),
                                vertical: n.concat(s).concat(l),
                                horizontal: o.concat(r).concat(a),
                            };
                        })(i.boxes),
                        l = a.vertical,
                        c = a.horizontal;
                    E(i.boxes, (p) => {
                        'function' == typeof p.beforeLayout && p.beforeLayout();
                    });
                    const h =
                            l.reduce(
                                (p, m) =>
                                    m.box.options &&
                                    !1 === m.box.options.display
                                        ? p
                                        : p + 1,
                                0
                            ) || 1,
                        d = Object.freeze({
                            outerWidth: e,
                            outerHeight: t,
                            padding: s,
                            availableWidth: o,
                            availableHeight: r,
                            vBoxMaxWidth: o / 2 / h,
                            hBoxMaxHeight: r / 2,
                        }),
                        u = Object.assign({}, s);
                    os(u, q(n));
                    const f = Object.assign(
                            { maxPadding: u, w: o, h: r, x: s.left, y: s.top },
                            s
                        ),
                        g = (function wa(i, e) {
                            const t = (function Ma(i) {
                                    const e = {};
                                    for (const t of i) {
                                        const {
                                            stack: n,
                                            pos: s,
                                            stackWeight: o,
                                        } = t;
                                        if (!n || !is.includes(s)) continue;
                                        const r =
                                            e[n] ||
                                            (e[n] = {
                                                count: 0,
                                                placed: 0,
                                                weight: 0,
                                                size: 0,
                                            });
                                        r.count++, (r.weight += o);
                                    }
                                    return e;
                                })(i),
                                { vBoxMaxWidth: n, hBoxMaxHeight: s } = e;
                            let o, r, a;
                            for (o = 0, r = i.length; o < r; ++o) {
                                a = i[o];
                                const { fullSize: l } = a.box,
                                    c = t[a.stack],
                                    h = c && a.stackWeight / c.weight;
                                a.horizontal
                                    ? ((a.width = h
                                          ? h * n
                                          : l && e.availableWidth),
                                      (a.height = s))
                                    : ((a.width = n),
                                      (a.height = h
                                          ? h * s
                                          : l && e.availableHeight));
                            }
                            return t;
                        })(l.concat(c), d);
                    he(a.fullSize, f, d, g),
                        he(l, f, d, g),
                        he(c, f, d, g) && he(l, f, d, g),
                        (function Pa(i) {
                            const e = i.maxPadding;
                            function t(n) {
                                const s = Math.max(e[n] - i[n], 0);
                                return (i[n] += s), s;
                            }
                            (i.y += t('top')),
                                (i.x += t('left')),
                                t('right'),
                                t('bottom');
                        })(f),
                        rs(a.leftAndTop, f, d, g),
                        (f.x += f.w),
                        (f.y += f.h),
                        rs(a.rightAndBottom, f, d, g),
                        (i.chartArea = {
                            left: f.left,
                            top: f.top,
                            right: f.left + f.w,
                            bottom: f.top + f.h,
                            height: f.h,
                            width: f.w,
                        }),
                        E(a.chartArea, (p) => {
                            const m = p.box;
                            Object.assign(m, i.chartArea),
                                m.update(f.w, f.h, {
                                    left: 0,
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                });
                        });
                },
            };
            class as {
                acquireContext(e, t) {}
                releaseContext(e) {
                    return !1;
                }
                addEventListener(e, t, n) {}
                removeEventListener(e, t, n) {}
                getDevicePixelRatio() {
                    return 1;
                }
                getMaximumSize(e, t, n, s) {
                    return (
                        (t = Math.max(0, t || e.width)),
                        (n = n || e.height),
                        {
                            width: t,
                            height: Math.max(0, s ? Math.floor(t / s) : n),
                        }
                    );
                }
                isAttached(e) {
                    return !0;
                }
                updateConfig(e) {}
            }
            class Da extends as {
                acquireContext(e) {
                    return (e && e.getContext && e.getContext('2d')) || null;
                }
                updateConfig(e) {
                    e.options.animation = !1;
                }
            }
            const ze = '$chartjs',
                Aa = {
                    touchstart: 'mousedown',
                    touchmove: 'mousemove',
                    touchend: 'mouseup',
                    pointerenter: 'mouseenter',
                    pointerdown: 'mousedown',
                    pointermove: 'mousemove',
                    pointerup: 'mouseup',
                    pointerleave: 'mouseout',
                    pointerout: 'mouseout',
                },
                ls = (i) => null === i || '' === i,
                cs = !!kr && { passive: !0 };
            function Ta(i, e, t) {
                i.canvas.removeEventListener(e, t, cs);
            }
            function Be(i, e) {
                for (const t of i) if (t === e || t.contains(e)) return !0;
            }
            function Ea(i, e, t) {
                const n = i.canvas,
                    s = new MutationObserver((o) => {
                        let r = !1;
                        for (const a of o)
                            (r = r || Be(a.addedNodes, n)),
                                (r = r && !Be(a.removedNodes, n));
                        r && t();
                    });
                return s.observe(document, { childList: !0, subtree: !0 }), s;
            }
            function Fa(i, e, t) {
                const n = i.canvas,
                    s = new MutationObserver((o) => {
                        let r = !1;
                        for (const a of o)
                            (r = r || Be(a.removedNodes, n)),
                                (r = r && !Be(a.addedNodes, n));
                        r && t();
                    });
                return s.observe(document, { childList: !0, subtree: !0 }), s;
            }
            const de = new Map();
            let hs = 0;
            function ds() {
                const i = window.devicePixelRatio;
                i !== hs &&
                    ((hs = i),
                    de.forEach((e, t) => {
                        t.currentDevicePixelRatio !== i && e();
                    }));
            }
            function Ba(i, e, t) {
                const n = i.canvas,
                    s = n && bi(n);
                if (!s) return;
                const o = zt((a, l) => {
                        const c = s.clientWidth;
                        t(a, l), c < s.clientWidth && t();
                    }, window),
                    r = new ResizeObserver((a) => {
                        const l = a[0],
                            c = l.contentRect.width,
                            h = l.contentRect.height;
                        (0 === c && 0 === h) || o(c, h);
                    });
                return (
                    r.observe(s),
                    (function Ia(i, e) {
                        de.size || window.addEventListener('resize', ds),
                            de.set(i, e);
                    })(i, o),
                    r
                );
            }
            function ki(i, e, t) {
                t && t.disconnect(),
                    'resize' === e &&
                        (function za(i) {
                            de.delete(i),
                                de.size ||
                                    window.removeEventListener('resize', ds);
                        })(i);
            }
            function Va(i, e, t) {
                const n = i.canvas,
                    s = zt(
                        (o) => {
                            null !== i.ctx &&
                                t(
                                    (function Ra(i, e) {
                                        const t = Aa[i.type] || i.type,
                                            { x: n, y: s } = Tt(i, e);
                                        return {
                                            type: t,
                                            chart: e,
                                            native: i,
                                            x: void 0 !== n ? n : null,
                                            y: void 0 !== s ? s : null,
                                        };
                                    })(o, i)
                                );
                        },
                        i,
                        (o) => {
                            const r = o[0];
                            return [r, r.offsetX, r.offsetY];
                        }
                    );
                return (
                    (function La(i, e, t) {
                        i.addEventListener(e, t, cs);
                    })(n, e, s),
                    s
                );
            }
            class Wa extends as {
                acquireContext(e, t) {
                    const n = e && e.getContext && e.getContext('2d');
                    return n && n.canvas === e
                        ? ((function Oa(i, e) {
                              const t = i.style,
                                  n = i.getAttribute('height'),
                                  s = i.getAttribute('width');
                              if (
                                  ((i[ze] = {
                                      initial: {
                                          height: n,
                                          width: s,
                                          style: {
                                              display: t.display,
                                              height: t.height,
                                              width: t.width,
                                          },
                                      },
                                  }),
                                  (t.display = t.display || 'block'),
                                  (t.boxSizing = t.boxSizing || 'border-box'),
                                  ls(s))
                              ) {
                                  const o = On(i, 'width');
                                  void 0 !== o && (i.width = o);
                              }
                              if (ls(n))
                                  if ('' === i.style.height)
                                      i.height = i.width / (e || 2);
                                  else {
                                      const o = On(i, 'height');
                                      void 0 !== o && (i.height = o);
                                  }
                          })(e, t),
                          n)
                        : null;
                }
                releaseContext(e) {
                    const t = e.canvas;
                    if (!t[ze]) return !1;
                    const n = t[ze].initial;
                    ['height', 'width'].forEach((o) => {
                        const r = n[o];
                        R(r) ? t.removeAttribute(o) : t.setAttribute(o, r);
                    });
                    const s = n.style || {};
                    return (
                        Object.keys(s).forEach((o) => {
                            t.style[o] = s[o];
                        }),
                        (t.width = t.width),
                        delete t[ze],
                        !0
                    );
                }
                addEventListener(e, t, n) {
                    this.removeEventListener(e, t),
                        ((e.$proxies || (e.$proxies = {}))[t] = (
                            { attach: Ea, detach: Fa, resize: Ba }[t] || Va
                        )(e, t, n));
                }
                removeEventListener(e, t) {
                    const n = e.$proxies || (e.$proxies = {}),
                        s = n[t];
                    s &&
                        (({ attach: ki, detach: ki, resize: ki }[t] || Ta)(
                            e,
                            t,
                            s
                        ),
                        (n[t] = void 0));
                }
                getDevicePixelRatio() {
                    return window.devicePixelRatio;
                }
                getMaximumSize(e, t, n, s) {
                    return (function wr(i, e, t, n) {
                        const s = Fe(i),
                            o = Lt(s, 'margin'),
                            r = Ee(s.maxWidth, i, 'clientWidth') || we,
                            a = Ee(s.maxHeight, i, 'clientHeight') || we,
                            l = (function Mr(i, e, t) {
                                let n, s;
                                if (void 0 === e || void 0 === t) {
                                    const o = bi(i);
                                    if (o) {
                                        const r = o.getBoundingClientRect(),
                                            a = Fe(o),
                                            l = Lt(a, 'border', 'width'),
                                            c = Lt(a, 'padding');
                                        (e = r.width - c.width - l.width),
                                            (t =
                                                r.height - c.height - l.height),
                                            (n = Ee(
                                                a.maxWidth,
                                                o,
                                                'clientWidth'
                                            )),
                                            (s = Ee(
                                                a.maxHeight,
                                                o,
                                                'clientHeight'
                                            ));
                                    } else
                                        (e = i.clientWidth),
                                            (t = i.clientHeight);
                                }
                                return {
                                    width: e,
                                    height: t,
                                    maxWidth: n || we,
                                    maxHeight: s || we,
                                };
                            })(i, e, t);
                        let { width: c, height: h } = l;
                        if ('content-box' === s.boxSizing) {
                            const d = Lt(s, 'border', 'width'),
                                u = Lt(s, 'padding');
                            (c -= u.width + d.width),
                                (h -= u.height + d.height);
                        }
                        return (
                            (c = Math.max(0, c - o.width)),
                            (h = Math.max(
                                0,
                                n ? Math.floor(c / n) : h - o.height
                            )),
                            (c = xi(Math.min(c, r, l.maxWidth))),
                            (h = xi(Math.min(h, a, l.maxHeight))),
                            c && !h && (h = xi(c / 2)),
                            { width: c, height: h }
                        );
                    })(e, t, n, s);
                }
                isAttached(e) {
                    const t = bi(e);
                    return !(!t || !t.isConnected);
                }
            }
            class at {
                constructor() {
                    (this.x = void 0),
                        (this.y = void 0),
                        (this.active = !1),
                        (this.options = void 0),
                        (this.$animations = void 0);
                }
                tooltipPosition(e) {
                    const { x: t, y: n } = this.getProps(['x', 'y'], e);
                    return { x: t, y: n };
                }
                hasValue() {
                    return Zt(this.x) && Zt(this.y);
                }
                getProps(e, t) {
                    const n = this.$animations;
                    if (!t || !n) return this;
                    const s = {};
                    return (
                        e.forEach((o) => {
                            s[o] = n[o] && n[o].active() ? n[o]._to : this[o];
                        }),
                        s
                    );
                }
            }
            (at.defaults = {}), (at.defaultRoutes = void 0);
            const us = {
                values: (i) => (V(i) ? i : '' + i),
                numeric(i, e, t) {
                    if (0 === i) return '0';
                    const n = this.chart.options.locale;
                    let s,
                        o = i;
                    if (t.length > 1) {
                        const c = Math.max(
                            Math.abs(t[0].value),
                            Math.abs(t[t.length - 1].value)
                        );
                        (c < 1e-4 || c > 1e15) && (s = 'scientific'),
                            (o = (function Ha(i, e) {
                                let t =
                                    e.length > 3
                                        ? e[2].value - e[1].value
                                        : e[1].value - e[0].value;
                                return (
                                    Math.abs(t) >= 1 &&
                                        i !== Math.floor(i) &&
                                        (t = i - Math.floor(i)),
                                    t
                                );
                            })(i, t));
                    }
                    const r = st(Math.abs(o)),
                        a = Math.max(Math.min(-1 * Math.floor(r), 20), 0),
                        l = {
                            notation: s,
                            minimumFractionDigits: a,
                            maximumFractionDigits: a,
                        };
                    return (
                        Object.assign(l, this.options.ticks.format), oe(i, n, l)
                    );
                },
                logarithmic(i, e, t) {
                    if (0 === i) return '0';
                    const n = i / Math.pow(10, Math.floor(st(i)));
                    return 1 === n || 2 === n || 5 === n
                        ? us.numeric.call(this, i, e, t)
                        : '';
                },
            };
            var Ve = { formatters: us };
            function We(i, e, t, n, s) {
                const o = C(n, 0),
                    r = Math.min(C(s, i.length), i.length);
                let l,
                    c,
                    h,
                    a = 0;
                for (
                    t = Math.ceil(t),
                        s && ((l = s - n), (t = l / Math.floor(l / t))),
                        h = o;
                    h < 0;

                )
                    a++, (h = Math.round(o + a * t));
                for (c = Math.max(o, 0); c < r; c++)
                    c === h && (e.push(i[c]), a++, (h = Math.round(o + a * t)));
            }
            O.set('scale', {
                display: !0,
                offset: !1,
                reverse: !1,
                beginAtZero: !1,
                bounds: 'ticks',
                grace: 0,
                grid: {
                    display: !0,
                    lineWidth: 1,
                    drawBorder: !0,
                    drawOnChartArea: !0,
                    drawTicks: !0,
                    tickLength: 8,
                    tickWidth: (i, e) => e.lineWidth,
                    tickColor: (i, e) => e.color,
                    offset: !1,
                    borderDash: [],
                    borderDashOffset: 0,
                    borderWidth: 1,
                },
                title: {
                    display: !1,
                    text: '',
                    padding: { top: 4, bottom: 4 },
                },
                ticks: {
                    minRotation: 0,
                    maxRotation: 50,
                    mirror: !1,
                    textStrokeWidth: 0,
                    textStrokeColor: '',
                    padding: 3,
                    display: !0,
                    autoSkip: !0,
                    autoSkipPadding: 3,
                    labelOffset: 0,
                    callback: Ve.formatters.values,
                    minor: {},
                    major: {},
                    align: 'center',
                    crossAlign: 'near',
                    showLabelBackdrop: !1,
                    backdropColor: 'rgba(255, 255, 255, 0.75)',
                    backdropPadding: 2,
                },
            }),
                O.route('scale.ticks', 'color', '', 'color'),
                O.route('scale.grid', 'color', '', 'borderColor'),
                O.route('scale.grid', 'borderColor', '', 'borderColor'),
                O.route('scale.title', 'color', '', 'color'),
                O.describe('scale', {
                    _fallback: !1,
                    _scriptable: (i) =>
                        !i.startsWith('before') &&
                        !i.startsWith('after') &&
                        'callback' !== i &&
                        'parser' !== i,
                    _indexable: (i) =>
                        'borderDash' !== i && 'tickBorderDash' !== i,
                }),
                O.describe('scales', { _fallback: 'scale' }),
                O.describe('scale.ticks', {
                    _scriptable: (i) =>
                        'backdropPadding' !== i && 'callback' !== i,
                    _indexable: (i) => 'backdropPadding' !== i,
                });
            const fs = (i, e, t) =>
                'top' === e || 'left' === e ? i[e] + t : i[e] - t;
            function gs(i, e) {
                const t = [],
                    n = i.length / e,
                    s = i.length;
                let o = 0;
                for (; o < s; o += n) t.push(i[Math.floor(o)]);
                return t;
            }
            function qa(i, e, t) {
                const n = i.ticks.length,
                    s = Math.min(e, n - 1),
                    o = i._startPixel,
                    r = i._endPixel,
                    a = 1e-6;
                let c,
                    l = i.getPixelForTick(s);
                if (
                    !(
                        t &&
                        ((c =
                            1 === n
                                ? Math.max(l - o, r - l)
                                : 0 === e
                                ? (i.getPixelForTick(1) - l) / 2
                                : (l - i.getPixelForTick(s - 1)) / 2),
                        (l += s < e ? c : -c),
                        l < o - a || l > r + a)
                    )
                )
                    return l;
            }
            function ue(i) {
                return i.drawTicks ? i.tickLength : 0;
            }
            function ps(i, e) {
                if (!i.display) return 0;
                const t = U(i.font, e),
                    n = q(i.padding);
                return (
                    (V(i.text) ? i.text.length : 1) * t.lineHeight + n.height
                );
            }
            function tl(i, e, t) {
                let n = Yt(i);
                return (
                    ((t && 'right' !== e) || (!t && 'right' === e)) &&
                        (n = ((i) =>
                            'left' === i
                                ? 'right'
                                : 'right' === i
                                ? 'left'
                                : i)(n)),
                    n
                );
            }
            class Ft extends at {
                constructor(e) {
                    super(),
                        (this.id = e.id),
                        (this.type = e.type),
                        (this.options = void 0),
                        (this.ctx = e.ctx),
                        (this.chart = e.chart),
                        (this.top = void 0),
                        (this.bottom = void 0),
                        (this.left = void 0),
                        (this.right = void 0),
                        (this.width = void 0),
                        (this.height = void 0),
                        (this._margins = {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }),
                        (this.maxWidth = void 0),
                        (this.maxHeight = void 0),
                        (this.paddingTop = void 0),
                        (this.paddingBottom = void 0),
                        (this.paddingLeft = void 0),
                        (this.paddingRight = void 0),
                        (this.axis = void 0),
                        (this.labelRotation = void 0),
                        (this.min = void 0),
                        (this.max = void 0),
                        (this._range = void 0),
                        (this.ticks = []),
                        (this._gridLineItems = null),
                        (this._labelItems = null),
                        (this._labelSizes = null),
                        (this._length = 0),
                        (this._maxLength = 0),
                        (this._longestTextCache = {}),
                        (this._startPixel = void 0),
                        (this._endPixel = void 0),
                        (this._reversePixels = !1),
                        (this._userMax = void 0),
                        (this._userMin = void 0),
                        (this._suggestedMax = void 0),
                        (this._suggestedMin = void 0),
                        (this._ticksLength = 0),
                        (this._borderValue = 0),
                        (this._cache = {}),
                        (this._dataLimitsCached = !1),
                        (this.$context = void 0);
                }
                init(e) {
                    (this.options = e.setContext(this.getContext())),
                        (this.axis = e.axis),
                        (this._userMin = this.parse(e.min)),
                        (this._userMax = this.parse(e.max)),
                        (this._suggestedMin = this.parse(e.suggestedMin)),
                        (this._suggestedMax = this.parse(e.suggestedMax));
                }
                parse(e, t) {
                    return e;
                }
                getUserBounds() {
                    let {
                        _userMin: e,
                        _userMax: t,
                        _suggestedMin: n,
                        _suggestedMax: s,
                    } = this;
                    return (
                        (e = it(e, Number.POSITIVE_INFINITY)),
                        (t = it(t, Number.NEGATIVE_INFINITY)),
                        (n = it(n, Number.POSITIVE_INFINITY)),
                        (s = it(s, Number.NEGATIVE_INFINITY)),
                        {
                            min: it(e, n),
                            max: it(t, s),
                            minDefined: j(e),
                            maxDefined: j(t),
                        }
                    );
                }
                getMinMax(e) {
                    let r,
                        {
                            min: t,
                            max: n,
                            minDefined: s,
                            maxDefined: o,
                        } = this.getUserBounds();
                    if (s && o) return { min: t, max: n };
                    const a = this.getMatchingVisibleMetas();
                    for (let l = 0, c = a.length; l < c; ++l)
                        (r = a[l].controller.getMinMax(this, e)),
                            s || (t = Math.min(t, r.min)),
                            o || (n = Math.max(n, r.max));
                    return (
                        (t = o && t > n ? n : t),
                        (n = s && t > n ? t : n),
                        { min: it(t, it(n, t)), max: it(n, it(t, n)) }
                    );
                }
                getPadding() {
                    return {
                        left: this.paddingLeft || 0,
                        top: this.paddingTop || 0,
                        right: this.paddingRight || 0,
                        bottom: this.paddingBottom || 0,
                    };
                }
                getTicks() {
                    return this.ticks;
                }
                getLabels() {
                    const e = this.chart.data;
                    return (
                        this.options.labels ||
                        (this.isHorizontal() ? e.xLabels : e.yLabels) ||
                        e.labels ||
                        []
                    );
                }
                beforeLayout() {
                    (this._cache = {}), (this._dataLimitsCached = !1);
                }
                beforeUpdate() {
                    W(this.options.beforeUpdate, [this]);
                }
                update(e, t, n) {
                    const { beginAtZero: s, grace: o, ticks: r } = this.options,
                        a = r.sampleSize;
                    this.beforeUpdate(),
                        (this.maxWidth = e),
                        (this.maxHeight = t),
                        (this._margins = n =
                            Object.assign(
                                { left: 0, right: 0, top: 0, bottom: 0 },
                                n
                            )),
                        (this.ticks = null),
                        (this._labelSizes = null),
                        (this._gridLineItems = null),
                        (this._labelItems = null),
                        this.beforeSetDimensions(),
                        this.setDimensions(),
                        this.afterSetDimensions(),
                        (this._maxLength = this.isHorizontal()
                            ? this.width + n.left + n.right
                            : this.height + n.top + n.bottom),
                        this._dataLimitsCached ||
                            (this.beforeDataLimits(),
                            this.determineDataLimits(),
                            this.afterDataLimits(),
                            (this._range = (function Jo(i, e, t) {
                                const { min: n, max: s } = i,
                                    o = Xi(e, (s - n) / 2),
                                    r = (a, l) => (t && 0 === a ? 0 : a + l);
                                return {
                                    min: r(n, -Math.abs(o)),
                                    max: r(s, o),
                                };
                            })(this, o, s)),
                            (this._dataLimitsCached = !0)),
                        this.beforeBuildTicks(),
                        (this.ticks = this.buildTicks() || []),
                        this.afterBuildTicks();
                    const l = a < this.ticks.length;
                    this._convertTicksToLabels(
                        l ? gs(this.ticks, a) : this.ticks
                    ),
                        this.configure(),
                        this.beforeCalculateLabelRotation(),
                        this.calculateLabelRotation(),
                        this.afterCalculateLabelRotation(),
                        r.display &&
                            (r.autoSkip || 'auto' === r.source) &&
                            ((this.ticks = (function ja(i, e) {
                                const t = i.options.ticks,
                                    n =
                                        t.maxTicksLimit ||
                                        (function $a(i) {
                                            const e = i.options.offset,
                                                t = i._tickSize();
                                            return Math.floor(
                                                Math.min(
                                                    i._length / t + (e ? 0 : 1),
                                                    i._maxLength / t
                                                )
                                            );
                                        })(i),
                                    s = t.major.enabled
                                        ? (function Ua(i) {
                                              const e = [];
                                              let t, n;
                                              for (
                                                  t = 0, n = i.length;
                                                  t < n;
                                                  t++
                                              )
                                                  i[t].major && e.push(t);
                                              return e;
                                          })(e)
                                        : [],
                                    o = s.length,
                                    r = s[0],
                                    a = s[o - 1],
                                    l = [];
                                if (o > n)
                                    return (
                                        (function Xa(i, e, t, n) {
                                            let r,
                                                s = 0,
                                                o = t[0];
                                            for (
                                                n = Math.ceil(n), r = 0;
                                                r < i.length;
                                                r++
                                            )
                                                r === o &&
                                                    (e.push(i[r]),
                                                    s++,
                                                    (o = t[s * n]));
                                        })(e, l, s, o / n),
                                        l
                                    );
                                const c = (function Ya(i, e, t) {
                                    const n = (function Ka(i) {
                                            const e = i.length;
                                            let t, n;
                                            if (e < 2) return !1;
                                            for (n = i[0], t = 1; t < e; ++t)
                                                if (i[t] - i[t - 1] !== n)
                                                    return !1;
                                            return n;
                                        })(i),
                                        s = e.length / t;
                                    if (!n) return Math.max(s, 1);
                                    const o = (function po(i) {
                                        const e = [],
                                            t = Math.sqrt(i);
                                        let n;
                                        for (n = 1; n < t; n++)
                                            i % n == 0 &&
                                                (e.push(n), e.push(i / n));
                                        return (
                                            t === (0 | t) && e.push(t),
                                            e.sort((s, o) => s - o).pop(),
                                            e
                                        );
                                    })(n);
                                    for (
                                        let r = 0, a = o.length - 1;
                                        r < a;
                                        r++
                                    ) {
                                        const l = o[r];
                                        if (l > s) return l;
                                    }
                                    return Math.max(s, 1);
                                })(s, e, n);
                                if (o > 0) {
                                    let h, d;
                                    const u =
                                        o > 1
                                            ? Math.round((a - r) / (o - 1))
                                            : null;
                                    for (
                                        We(e, l, c, R(u) ? 0 : r - u, r),
                                            h = 0,
                                            d = o - 1;
                                        h < d;
                                        h++
                                    )
                                        We(e, l, c, s[h], s[h + 1]);
                                    return (
                                        We(e, l, c, a, R(u) ? e.length : a + u),
                                        l
                                    );
                                }
                                return We(e, l, c), l;
                            })(this, this.ticks)),
                            (this._labelSizes = null),
                            this.afterAutoSkip()),
                        l && this._convertTicksToLabels(this.ticks),
                        this.beforeFit(),
                        this.fit(),
                        this.afterFit(),
                        this.afterUpdate();
                }
                configure() {
                    let t,
                        n,
                        e = this.options.reverse;
                    this.isHorizontal()
                        ? ((t = this.left), (n = this.right))
                        : ((t = this.top), (n = this.bottom), (e = !e)),
                        (this._startPixel = t),
                        (this._endPixel = n),
                        (this._reversePixels = e),
                        (this._length = n - t),
                        (this._alignToPixels = this.options.alignToPixels);
                }
                afterUpdate() {
                    W(this.options.afterUpdate, [this]);
                }
                beforeSetDimensions() {
                    W(this.options.beforeSetDimensions, [this]);
                }
                setDimensions() {
                    this.isHorizontal()
                        ? ((this.width = this.maxWidth),
                          (this.left = 0),
                          (this.right = this.width))
                        : ((this.height = this.maxHeight),
                          (this.top = 0),
                          (this.bottom = this.height)),
                        (this.paddingLeft = 0),
                        (this.paddingTop = 0),
                        (this.paddingRight = 0),
                        (this.paddingBottom = 0);
                }
                afterSetDimensions() {
                    W(this.options.afterSetDimensions, [this]);
                }
                _callHooks(e) {
                    this.chart.notifyPlugins(e, this.getContext()),
                        W(this.options[e], [this]);
                }
                beforeDataLimits() {
                    this._callHooks('beforeDataLimits');
                }
                determineDataLimits() {}
                afterDataLimits() {
                    this._callHooks('afterDataLimits');
                }
                beforeBuildTicks() {
                    this._callHooks('beforeBuildTicks');
                }
                buildTicks() {
                    return [];
                }
                afterBuildTicks() {
                    this._callHooks('afterBuildTicks');
                }
                beforeTickToLabelConversion() {
                    W(this.options.beforeTickToLabelConversion, [this]);
                }
                generateTickLabels(e) {
                    const t = this.options.ticks;
                    let n, s, o;
                    for (n = 0, s = e.length; n < s; n++)
                        (o = e[n]),
                            (o.label = W(t.callback, [o.value, n, e], this));
                }
                afterTickToLabelConversion() {
                    W(this.options.afterTickToLabelConversion, [this]);
                }
                beforeCalculateLabelRotation() {
                    W(this.options.beforeCalculateLabelRotation, [this]);
                }
                calculateLabelRotation() {
                    const e = this.options,
                        t = e.ticks,
                        n = this.ticks.length,
                        s = t.minRotation || 0,
                        o = t.maxRotation;
                    let a,
                        l,
                        c,
                        r = s;
                    if (
                        !this._isVisible() ||
                        !t.display ||
                        s >= o ||
                        n <= 1 ||
                        !this.isHorizontal()
                    )
                        return void (this.labelRotation = s);
                    const h = this._getLabelSizes(),
                        d = h.widest.width,
                        u = h.highest.height,
                        f = X(this.chart.width - d, 0, this.maxWidth);
                    (a = e.offset ? this.maxWidth / n : f / (n - 1)),
                        d + 6 > a &&
                            ((a = f / (n - (e.offset ? 0.5 : 1))),
                            (l =
                                this.maxHeight -
                                ue(e.grid) -
                                t.padding -
                                ps(e.title, this.chart.options.font)),
                            (c = Math.sqrt(d * d + u * u)),
                            (r = ii(
                                Math.min(
                                    Math.asin(
                                        X((h.highest.height + 6) / a, -1, 1)
                                    ),
                                    Math.asin(X(l / c, -1, 1)) -
                                        Math.asin(X(u / c, -1, 1))
                                )
                            )),
                            (r = Math.max(s, Math.min(o, r)))),
                        (this.labelRotation = r);
                }
                afterCalculateLabelRotation() {
                    W(this.options.afterCalculateLabelRotation, [this]);
                }
                afterAutoSkip() {}
                beforeFit() {
                    W(this.options.beforeFit, [this]);
                }
                fit() {
                    const e = { width: 0, height: 0 },
                        {
                            chart: t,
                            options: { ticks: n, title: s, grid: o },
                        } = this,
                        r = this._isVisible(),
                        a = this.isHorizontal();
                    if (r) {
                        const l = ps(s, t.options.font);
                        if (
                            (a
                                ? ((e.width = this.maxWidth),
                                  (e.height = ue(o) + l))
                                : ((e.height = this.maxHeight),
                                  (e.width = ue(o) + l)),
                            n.display && this.ticks.length)
                        ) {
                            const {
                                    first: c,
                                    last: h,
                                    widest: d,
                                    highest: u,
                                } = this._getLabelSizes(),
                                f = 2 * n.padding,
                                g = rt(this.labelRotation),
                                p = Math.cos(g),
                                m = Math.sin(g);
                            a
                                ? (e.height = Math.min(
                                      this.maxHeight,
                                      e.height +
                                          (n.mirror
                                              ? 0
                                              : m * d.width + p * u.height) +
                                          f
                                  ))
                                : (e.width = Math.min(
                                      this.maxWidth,
                                      e.width +
                                          (n.mirror
                                              ? 0
                                              : p * d.width + m * u.height) +
                                          f
                                  )),
                                this._calculatePadding(c, h, m, p);
                        }
                    }
                    this._handleMargins(),
                        a
                            ? ((this.width = this._length =
                                  t.width -
                                  this._margins.left -
                                  this._margins.right),
                              (this.height = e.height))
                            : ((this.width = e.width),
                              (this.height = this._length =
                                  t.height -
                                  this._margins.top -
                                  this._margins.bottom));
                }
                _calculatePadding(e, t, n, s) {
                    const {
                            ticks: { align: o, padding: r },
                            position: a,
                        } = this.options,
                        l = 0 !== this.labelRotation,
                        c = 'top' !== a && 'x' === this.axis;
                    if (this.isHorizontal()) {
                        const h = this.getPixelForTick(0) - this.left,
                            d =
                                this.right -
                                this.getPixelForTick(this.ticks.length - 1);
                        let u = 0,
                            f = 0;
                        l
                            ? c
                                ? ((u = s * e.width), (f = n * t.height))
                                : ((u = n * e.height), (f = s * t.width))
                            : 'start' === o
                            ? (f = t.width)
                            : 'end' === o
                            ? (u = e.width)
                            : 'inner' !== o &&
                              ((u = e.width / 2), (f = t.width / 2)),
                            (this.paddingLeft = Math.max(
                                ((u - h + r) * this.width) / (this.width - h),
                                0
                            )),
                            (this.paddingRight = Math.max(
                                ((f - d + r) * this.width) / (this.width - d),
                                0
                            ));
                    } else {
                        let h = t.height / 2,
                            d = e.height / 2;
                        'start' === o
                            ? ((h = 0), (d = e.height))
                            : 'end' === o && ((h = t.height), (d = 0)),
                            (this.paddingTop = h + r),
                            (this.paddingBottom = d + r);
                    }
                }
                _handleMargins() {
                    this._margins &&
                        ((this._margins.left = Math.max(
                            this.paddingLeft,
                            this._margins.left
                        )),
                        (this._margins.top = Math.max(
                            this.paddingTop,
                            this._margins.top
                        )),
                        (this._margins.right = Math.max(
                            this.paddingRight,
                            this._margins.right
                        )),
                        (this._margins.bottom = Math.max(
                            this.paddingBottom,
                            this._margins.bottom
                        )));
                }
                afterFit() {
                    W(this.options.afterFit, [this]);
                }
                isHorizontal() {
                    const { axis: e, position: t } = this.options;
                    return 'top' === t || 'bottom' === t || 'x' === e;
                }
                isFullSize() {
                    return this.options.fullSize;
                }
                _convertTicksToLabels(e) {
                    let t, n;
                    for (
                        this.beforeTickToLabelConversion(),
                            this.generateTickLabels(e),
                            t = 0,
                            n = e.length;
                        t < n;
                        t++
                    )
                        R(e[t].label) && (e.splice(t, 1), n--, t--);
                    this.afterTickToLabelConversion();
                }
                _getLabelSizes() {
                    let e = this._labelSizes;
                    if (!e) {
                        const t = this.options.ticks.sampleSize;
                        let n = this.ticks;
                        t < n.length && (n = gs(n, t)),
                            (this._labelSizes = e =
                                this._computeLabelSizes(n, n.length));
                    }
                    return e;
                }
                _computeLabelSizes(e, t) {
                    const { ctx: n, _longestTextCache: s } = this,
                        o = [],
                        r = [];
                    let c,
                        h,
                        d,
                        u,
                        f,
                        g,
                        p,
                        m,
                        b,
                        x,
                        v,
                        a = 0,
                        l = 0;
                    for (c = 0; c < t; ++c) {
                        if (
                            ((u = e[c].label),
                            (f = this._resolveTickFontOptions(c)),
                            (n.font = g = f.string),
                            (p = s[g] = s[g] || { data: {}, gc: [] }),
                            (m = f.lineHeight),
                            (b = x = 0),
                            R(u) || V(u))
                        ) {
                            if (V(u))
                                for (h = 0, d = u.length; h < d; ++h)
                                    (v = u[h]),
                                        !R(v) &&
                                            !V(v) &&
                                            ((b = Ae(n, p.data, p.gc, b, v)),
                                            (x += m));
                        } else (b = Ae(n, p.data, p.gc, b, u)), (x = m);
                        o.push(b),
                            r.push(x),
                            (a = Math.max(b, a)),
                            (l = Math.max(x, l));
                    }
                    !(function Ga(i, e) {
                        E(i, (t) => {
                            const n = t.gc,
                                s = n.length / 2;
                            let o;
                            if (s > e) {
                                for (o = 0; o < s; ++o) delete t.data[n[o]];
                                n.splice(0, s);
                            }
                        });
                    })(s, t);
                    const y = o.indexOf(a),
                        _ = r.indexOf(l),
                        M = (w) => ({ width: o[w] || 0, height: r[w] || 0 });
                    return {
                        first: M(0),
                        last: M(t - 1),
                        widest: M(y),
                        highest: M(_),
                        widths: o,
                        heights: r,
                    };
                }
                getLabelForValue(e) {
                    return e;
                }
                getPixelForValue(e, t) {
                    return NaN;
                }
                getValueForPixel(e) {}
                getPixelForTick(e) {
                    const t = this.ticks;
                    return e < 0 || e > t.length - 1
                        ? null
                        : this.getPixelForValue(t[e].value);
                }
                getPixelForDecimal(e) {
                    this._reversePixels && (e = 1 - e);
                    const t = this._startPixel + e * this._length;
                    return (function xo(i) {
                        return X(i, -32768, 32767);
                    })(this._alignToPixels ? Dt(this.chart, t, 0) : t);
                }
                getDecimalForPixel(e) {
                    const t = (e - this._startPixel) / this._length;
                    return this._reversePixels ? 1 - t : t;
                }
                getBasePixel() {
                    return this.getPixelForValue(this.getBaseValue());
                }
                getBaseValue() {
                    const { min: e, max: t } = this;
                    return e < 0 && t < 0 ? t : e > 0 && t > 0 ? e : 0;
                }
                getContext(e) {
                    const t = this.ticks || [];
                    if (e >= 0 && e < t.length) {
                        const n = t[e];
                        return (
                            n.$context ||
                            (n.$context = (function Qa(i, e, t) {
                                return kt(i, {
                                    tick: t,
                                    index: e,
                                    type: 'tick',
                                });
                            })(this.getContext(), e, n))
                        );
                    }
                    return (
                        this.$context ||
                        (this.$context = (function Ja(i, e) {
                            return kt(i, { scale: e, type: 'scale' });
                        })(this.chart.getContext(), this))
                    );
                }
                _tickSize() {
                    const e = this.options.ticks,
                        t = rt(this.labelRotation),
                        n = Math.abs(Math.cos(t)),
                        s = Math.abs(Math.sin(t)),
                        o = this._getLabelSizes(),
                        r = e.autoSkipPadding || 0,
                        a = o ? o.widest.width + r : 0,
                        l = o ? o.highest.height + r : 0;
                    return this.isHorizontal()
                        ? l * n > a * s
                            ? a / n
                            : l / s
                        : l * s < a * n
                        ? l / n
                        : a / s;
                }
                _isVisible() {
                    const e = this.options.display;
                    return 'auto' !== e
                        ? !!e
                        : this.getMatchingVisibleMetas().length > 0;
                }
                _computeGridLineItems(e) {
                    const t = this.axis,
                        n = this.chart,
                        s = this.options,
                        { grid: o, position: r } = s,
                        a = o.offset,
                        l = this.isHorizontal(),
                        h = this.ticks.length + (a ? 1 : 0),
                        d = ue(o),
                        u = [],
                        f = o.setContext(this.getContext()),
                        g = f.drawBorder ? f.borderWidth : 0,
                        p = g / 2,
                        m = function (D) {
                            return Dt(n, D, g);
                        };
                    let b, x, v, y, _, M, w, k, S, F, L, T;
                    if ('top' === r)
                        (b = m(this.bottom)),
                            (M = this.bottom - d),
                            (k = b - p),
                            (F = m(e.top) + p),
                            (T = e.bottom);
                    else if ('bottom' === r)
                        (b = m(this.top)),
                            (F = e.top),
                            (T = m(e.bottom) - p),
                            (M = b + p),
                            (k = this.top + d);
                    else if ('left' === r)
                        (b = m(this.right)),
                            (_ = this.right - d),
                            (w = b - p),
                            (S = m(e.left) + p),
                            (L = e.right);
                    else if ('right' === r)
                        (b = m(this.left)),
                            (S = e.left),
                            (L = m(e.right) - p),
                            (_ = b + p),
                            (w = this.left + d);
                    else if ('x' === t) {
                        if ('center' === r) b = m((e.top + e.bottom) / 2 + 0.5);
                        else if (A(r)) {
                            const D = Object.keys(r)[0];
                            b = m(this.chart.scales[D].getPixelForValue(r[D]));
                        }
                        (F = e.top), (T = e.bottom), (M = b + p), (k = M + d);
                    } else if ('y' === t) {
                        if ('center' === r) b = m((e.left + e.right) / 2);
                        else if (A(r)) {
                            const D = Object.keys(r)[0];
                            b = m(this.chart.scales[D].getPixelForValue(r[D]));
                        }
                        (_ = b - p), (w = _ - d), (S = e.left), (L = e.right);
                    }
                    const $ = C(s.ticks.maxTicksLimit, h),
                        J = Math.max(1, Math.ceil(h / $));
                    for (x = 0; x < h; x += J) {
                        const D = o.setContext(this.getContext(x)),
                            B = D.lineWidth,
                            be = D.color,
                            It = o.borderDash || [],
                            xe = D.borderDashOffset,
                            jt = D.tickWidth,
                            ti = D.tickColor,
                            $t = D.tickBorderDash || [],
                            _e = D.tickBorderDashOffset;
                        (v = qa(this, x, a)),
                            void 0 !== v &&
                                ((y = Dt(n, v, B)),
                                l ? (_ = w = S = L = y) : (M = k = F = T = y),
                                u.push({
                                    tx1: _,
                                    ty1: M,
                                    tx2: w,
                                    ty2: k,
                                    x1: S,
                                    y1: F,
                                    x2: L,
                                    y2: T,
                                    width: B,
                                    color: be,
                                    borderDash: It,
                                    borderDashOffset: xe,
                                    tickWidth: jt,
                                    tickColor: ti,
                                    tickBorderDash: $t,
                                    tickBorderDashOffset: _e,
                                }));
                    }
                    return (this._ticksLength = h), (this._borderValue = b), u;
                }
                _computeLabelItems(e) {
                    const t = this.axis,
                        n = this.options,
                        { position: s, ticks: o } = n,
                        r = this.isHorizontal(),
                        a = this.ticks,
                        { align: l, crossAlign: c, padding: h, mirror: d } = o,
                        u = ue(n.grid),
                        f = u + h,
                        g = d ? -h : f,
                        p = -rt(this.labelRotation),
                        m = [];
                    let b,
                        x,
                        v,
                        y,
                        _,
                        M,
                        w,
                        k,
                        S,
                        F,
                        L,
                        T,
                        $ = 'middle';
                    if ('top' === s)
                        (M = this.bottom - g),
                            (w = this._getXAxisLabelAlignment());
                    else if ('bottom' === s)
                        (M = this.top + g),
                            (w = this._getXAxisLabelAlignment());
                    else if ('left' === s) {
                        const D = this._getYAxisLabelAlignment(u);
                        (w = D.textAlign), (_ = D.x);
                    } else if ('right' === s) {
                        const D = this._getYAxisLabelAlignment(u);
                        (w = D.textAlign), (_ = D.x);
                    } else if ('x' === t) {
                        if ('center' === s) M = (e.top + e.bottom) / 2 + f;
                        else if (A(s)) {
                            const D = Object.keys(s)[0];
                            M = this.chart.scales[D].getPixelForValue(s[D]) + f;
                        }
                        w = this._getXAxisLabelAlignment();
                    } else if ('y' === t) {
                        if ('center' === s) _ = (e.left + e.right) / 2 - f;
                        else if (A(s)) {
                            const D = Object.keys(s)[0];
                            _ = this.chart.scales[D].getPixelForValue(s[D]);
                        }
                        w = this._getYAxisLabelAlignment(u).textAlign;
                    }
                    'y' === t &&
                        ('start' === l
                            ? ($ = 'top')
                            : 'end' === l && ($ = 'bottom'));
                    const J = this._getLabelSizes();
                    for (b = 0, x = a.length; b < x; ++b) {
                        (v = a[b]), (y = v.label);
                        const D = o.setContext(this.getContext(b));
                        (k = this.getPixelForTick(b) + o.labelOffset),
                            (S = this._resolveTickFontOptions(b)),
                            (F = S.lineHeight),
                            (L = V(y) ? y.length : 1);
                        const B = L / 2,
                            be = D.color,
                            It = D.textStrokeColor,
                            xe = D.textStrokeWidth;
                        let ti,
                            jt = w;
                        if (
                            (r
                                ? ((_ = k),
                                  'inner' === w &&
                                      (jt =
                                          b === x - 1
                                              ? this.options.reverse
                                                  ? 'left'
                                                  : 'right'
                                              : 0 === b
                                              ? this.options.reverse
                                                  ? 'right'
                                                  : 'left'
                                              : 'center'),
                                  (T =
                                      'top' === s
                                          ? 'near' === c || 0 !== p
                                              ? -L * F + F / 2
                                              : 'center' === c
                                              ? -J.highest.height / 2 -
                                                B * F +
                                                F
                                              : F / 2 - J.highest.height
                                          : 'near' === c || 0 !== p
                                          ? F / 2
                                          : 'center' === c
                                          ? J.highest.height / 2 - B * F
                                          : J.highest.height - L * F),
                                  d && (T *= -1))
                                : ((M = k), (T = ((1 - L) * F) / 2)),
                            D.showLabelBackdrop)
                        ) {
                            const $t = q(D.backdropPadding),
                                _e = J.heights[b],
                                Hi = J.widths[b];
                            let ji = M + T - $t.top,
                                $i = _ - $t.left;
                            switch ($) {
                                case 'middle':
                                    ji -= _e / 2;
                                    break;
                                case 'bottom':
                                    ji -= _e;
                            }
                            switch (w) {
                                case 'center':
                                    $i -= Hi / 2;
                                    break;
                                case 'right':
                                    $i -= Hi;
                            }
                            ti = {
                                left: $i,
                                top: ji,
                                width: Hi + $t.width,
                                height: _e + $t.height,
                                color: D.backdropColor,
                            };
                        }
                        m.push({
                            rotation: p,
                            label: y,
                            font: S,
                            color: be,
                            strokeColor: It,
                            strokeWidth: xe,
                            textOffset: T,
                            textAlign: jt,
                            textBaseline: $,
                            translation: [_, M],
                            backdrop: ti,
                        });
                    }
                    return m;
                }
                _getXAxisLabelAlignment() {
                    const { position: e, ticks: t } = this.options;
                    if (-rt(this.labelRotation))
                        return 'top' === e ? 'left' : 'right';
                    let s = 'center';
                    return (
                        'start' === t.align
                            ? (s = 'left')
                            : 'end' === t.align
                            ? (s = 'right')
                            : 'inner' === t.align && (s = 'inner'),
                        s
                    );
                }
                _getYAxisLabelAlignment(e) {
                    const {
                            position: t,
                            ticks: { crossAlign: n, mirror: s, padding: o },
                        } = this.options,
                        a = e + o,
                        l = this._getLabelSizes().widest.width;
                    let c, h;
                    return (
                        'left' === t
                            ? s
                                ? ((h = this.right + o),
                                  'near' === n
                                      ? (c = 'left')
                                      : 'center' === n
                                      ? ((c = 'center'), (h += l / 2))
                                      : ((c = 'right'), (h += l)))
                                : ((h = this.right - a),
                                  'near' === n
                                      ? (c = 'right')
                                      : 'center' === n
                                      ? ((c = 'center'), (h -= l / 2))
                                      : ((c = 'left'), (h = this.left)))
                            : 'right' === t
                            ? s
                                ? ((h = this.left + o),
                                  'near' === n
                                      ? (c = 'right')
                                      : 'center' === n
                                      ? ((c = 'center'), (h -= l / 2))
                                      : ((c = 'left'), (h -= l)))
                                : ((h = this.left + a),
                                  'near' === n
                                      ? (c = 'left')
                                      : 'center' === n
                                      ? ((c = 'center'), (h += l / 2))
                                      : ((c = 'right'), (h = this.right)))
                            : (c = 'right'),
                        { textAlign: c, x: h }
                    );
                }
                _computeLabelArea() {
                    if (this.options.ticks.mirror) return;
                    const e = this.chart,
                        t = this.options.position;
                    return 'left' === t || 'right' === t
                        ? {
                              top: 0,
                              left: this.left,
                              bottom: e.height,
                              right: this.right,
                          }
                        : 'top' === t || 'bottom' === t
                        ? {
                              top: this.top,
                              left: 0,
                              bottom: this.bottom,
                              right: e.width,
                          }
                        : void 0;
                }
                drawBackground() {
                    const {
                        ctx: e,
                        options: { backgroundColor: t },
                        left: n,
                        top: s,
                        width: o,
                        height: r,
                    } = this;
                    t &&
                        (e.save(),
                        (e.fillStyle = t),
                        e.fillRect(n, s, o, r),
                        e.restore());
                }
                getLineWidthForValue(e) {
                    const t = this.options.grid;
                    if (!this._isVisible() || !t.display) return 0;
                    const s = this.ticks.findIndex((o) => o.value === e);
                    return s >= 0
                        ? t.setContext(this.getContext(s)).lineWidth
                        : 0;
                }
                drawGrid(e) {
                    const t = this.options.grid,
                        n = this.ctx,
                        s =
                            this._gridLineItems ||
                            (this._gridLineItems =
                                this._computeGridLineItems(e));
                    let o, r;
                    const a = (l, c, h) => {
                        !h.width ||
                            !h.color ||
                            (n.save(),
                            (n.lineWidth = h.width),
                            (n.strokeStyle = h.color),
                            n.setLineDash(h.borderDash || []),
                            (n.lineDashOffset = h.borderDashOffset),
                            n.beginPath(),
                            n.moveTo(l.x, l.y),
                            n.lineTo(c.x, c.y),
                            n.stroke(),
                            n.restore());
                    };
                    if (t.display)
                        for (o = 0, r = s.length; o < r; ++o) {
                            const l = s[o];
                            t.drawOnChartArea &&
                                a(
                                    { x: l.x1, y: l.y1 },
                                    { x: l.x2, y: l.y2 },
                                    l
                                ),
                                t.drawTicks &&
                                    a(
                                        { x: l.tx1, y: l.ty1 },
                                        { x: l.tx2, y: l.ty2 },
                                        {
                                            color: l.tickColor,
                                            width: l.tickWidth,
                                            borderDash: l.tickBorderDash,
                                            borderDashOffset:
                                                l.tickBorderDashOffset,
                                        }
                                    );
                        }
                }
                drawBorder() {
                    const {
                            chart: e,
                            ctx: t,
                            options: { grid: n },
                        } = this,
                        s = n.setContext(this.getContext()),
                        o = n.drawBorder ? s.borderWidth : 0;
                    if (!o) return;
                    const r = n.setContext(this.getContext(0)).lineWidth,
                        a = this._borderValue;
                    let l, c, h, d;
                    this.isHorizontal()
                        ? ((l = Dt(e, this.left, o) - o / 2),
                          (c = Dt(e, this.right, r) + r / 2),
                          (h = d = a))
                        : ((h = Dt(e, this.top, o) - o / 2),
                          (d = Dt(e, this.bottom, r) + r / 2),
                          (l = c = a)),
                        t.save(),
                        (t.lineWidth = s.borderWidth),
                        (t.strokeStyle = s.borderColor),
                        t.beginPath(),
                        t.moveTo(l, h),
                        t.lineTo(c, d),
                        t.stroke(),
                        t.restore();
                }
                drawLabels(e) {
                    if (!this.options.ticks.display) return;
                    const n = this.ctx,
                        s = this._computeLabelArea();
                    s && Le(n, s);
                    const o =
                        this._labelItems ||
                        (this._labelItems = this._computeLabelItems(e));
                    let r, a;
                    for (r = 0, a = o.length; r < a; ++r) {
                        const l = o[r],
                            c = l.font,
                            h = l.label;
                        l.backdrop &&
                            ((n.fillStyle = l.backdrop.color),
                            n.fillRect(
                                l.backdrop.left,
                                l.backdrop.top,
                                l.backdrop.width,
                                l.backdrop.height
                            )),
                            At(n, h, 0, l.textOffset, c, l);
                    }
                    s && Te(n);
                }
                drawTitle() {
                    const {
                        ctx: e,
                        options: { position: t, title: n, reverse: s },
                    } = this;
                    if (!n.display) return;
                    const o = U(n.font),
                        r = q(n.padding),
                        a = n.align;
                    let l = o.lineHeight / 2;
                    'bottom' === t || 'center' === t || A(t)
                        ? ((l += r.bottom),
                          V(n.text) &&
                              (l += o.lineHeight * (n.text.length - 1)))
                        : (l += r.top);
                    const {
                        titleX: c,
                        titleY: h,
                        maxWidth: d,
                        rotation: u,
                    } = (function el(i, e, t, n) {
                        const {
                                top: s,
                                left: o,
                                bottom: r,
                                right: a,
                                chart: l,
                            } = i,
                            { chartArea: c, scales: h } = l;
                        let u,
                            f,
                            g,
                            d = 0;
                        const p = r - s,
                            m = a - o;
                        if (i.isHorizontal()) {
                            if (((f = K(n, o, a)), A(t))) {
                                const b = Object.keys(t)[0];
                                g = h[b].getPixelForValue(t[b]) + p - e;
                            } else
                                g =
                                    'center' === t
                                        ? (c.bottom + c.top) / 2 + p - e
                                        : fs(i, t, e);
                            u = a - o;
                        } else {
                            if (A(t)) {
                                const b = Object.keys(t)[0];
                                f = h[b].getPixelForValue(t[b]) - m + e;
                            } else
                                f =
                                    'center' === t
                                        ? (c.left + c.right) / 2 - m + e
                                        : fs(i, t, e);
                            (g = K(n, r, s)), (d = 'left' === t ? -H : H);
                        }
                        return {
                            titleX: f,
                            titleY: g,
                            maxWidth: u,
                            rotation: d,
                        };
                    })(this, l, t, a);
                    At(e, n.text, 0, 0, o, {
                        color: n.color,
                        maxWidth: d,
                        rotation: u,
                        textAlign: tl(a, t, s),
                        textBaseline: 'middle',
                        translation: [c, h],
                    });
                }
                draw(e) {
                    !this._isVisible() ||
                        (this.drawBackground(),
                        this.drawGrid(e),
                        this.drawBorder(),
                        this.drawTitle(),
                        this.drawLabels(e));
                }
                _layers() {
                    const e = this.options,
                        t = (e.ticks && e.ticks.z) || 0,
                        n = C(e.grid && e.grid.z, -1);
                    return this._isVisible() && this.draw === Ft.prototype.draw
                        ? [
                              {
                                  z: n,
                                  draw: (s) => {
                                      this.drawBackground(),
                                          this.drawGrid(s),
                                          this.drawTitle();
                                  },
                              },
                              {
                                  z: n + 1,
                                  draw: () => {
                                      this.drawBorder();
                                  },
                              },
                              {
                                  z: t,
                                  draw: (s) => {
                                      this.drawLabels(s);
                                  },
                              },
                          ]
                        : [
                              {
                                  z: t,
                                  draw: (s) => {
                                      this.draw(s);
                                  },
                              },
                          ];
                }
                getMatchingVisibleMetas(e) {
                    const t = this.chart.getSortedVisibleDatasetMetas(),
                        n = this.axis + 'AxisID',
                        s = [];
                    let o, r;
                    for (o = 0, r = t.length; o < r; ++o) {
                        const a = t[o];
                        a[n] === this.id && (!e || a.type === e) && s.push(a);
                    }
                    return s;
                }
                _resolveTickFontOptions(e) {
                    return U(
                        this.options.ticks.setContext(this.getContext(e)).font
                    );
                }
                _maxDigits() {
                    const e = this._resolveTickFontOptions(0).lineHeight;
                    return (this.isHorizontal() ? this.width : this.height) / e;
                }
            }
            class Ne {
                constructor(e, t, n) {
                    (this.type = e),
                        (this.scope = t),
                        (this.override = n),
                        (this.items = Object.create(null));
                }
                isForType(e) {
                    return Object.prototype.isPrototypeOf.call(
                        this.type.prototype,
                        e.prototype
                    );
                }
                register(e) {
                    const t = Object.getPrototypeOf(e);
                    let n;
                    (function sl(i) {
                        return 'id' in i && 'defaults' in i;
                    })(t) && (n = this.register(t));
                    const s = this.items,
                        o = e.id,
                        r = this.scope + '.' + o;
                    if (!o) throw new Error('class does not have id: ' + e);
                    return (
                        o in s ||
                            ((s[o] = e),
                            (function il(i, e, t) {
                                const n = Ut(Object.create(null), [
                                    t ? O.get(t) : {},
                                    O.get(e),
                                    i.defaults,
                                ]);
                                O.set(e, n),
                                    i.defaultRoutes &&
                                        (function nl(i, e) {
                                            Object.keys(e).forEach((t) => {
                                                const n = t.split('.'),
                                                    s = n.pop(),
                                                    o = [i].concat(n).join('.'),
                                                    r = e[t].split('.'),
                                                    a = r.pop(),
                                                    l = r.join('.');
                                                O.route(o, s, l, a);
                                            });
                                        })(e, i.defaultRoutes),
                                    i.descriptors &&
                                        O.describe(e, i.descriptors);
                            })(e, r, n),
                            this.override && O.override(e.id, e.overrides)),
                        r
                    );
                }
                get(e) {
                    return this.items[e];
                }
                unregister(e) {
                    const t = this.items,
                        n = e.id,
                        s = this.scope;
                    n in t && delete t[n],
                        s &&
                            n in O[s] &&
                            (delete O[s][n], this.override && delete Ct[n]);
                }
            }
            var bt = new (class ol {
                constructor() {
                    (this.controllers = new Ne(mt, 'datasets', !0)),
                        (this.elements = new Ne(at, 'elements')),
                        (this.plugins = new Ne(Object, 'plugins')),
                        (this.scales = new Ne(Ft, 'scales')),
                        (this._typedRegistries = [
                            this.controllers,
                            this.scales,
                            this.elements,
                        ]);
                }
                add(...e) {
                    this._each('register', e);
                }
                remove(...e) {
                    this._each('unregister', e);
                }
                addControllers(...e) {
                    this._each('register', e, this.controllers);
                }
                addElements(...e) {
                    this._each('register', e, this.elements);
                }
                addPlugins(...e) {
                    this._each('register', e, this.plugins);
                }
                addScales(...e) {
                    this._each('register', e, this.scales);
                }
                getController(e) {
                    return this._get(e, this.controllers, 'controller');
                }
                getElement(e) {
                    return this._get(e, this.elements, 'element');
                }
                getPlugin(e) {
                    return this._get(e, this.plugins, 'plugin');
                }
                getScale(e) {
                    return this._get(e, this.scales, 'scale');
                }
                removeControllers(...e) {
                    this._each('unregister', e, this.controllers);
                }
                removeElements(...e) {
                    this._each('unregister', e, this.elements);
                }
                removePlugins(...e) {
                    this._each('unregister', e, this.plugins);
                }
                removeScales(...e) {
                    this._each('unregister', e, this.scales);
                }
                _each(e, t, n) {
                    [...t].forEach((s) => {
                        const o = n || this._getRegistryForType(s);
                        n || o.isForType(s) || (o === this.plugins && s.id)
                            ? this._exec(e, o, s)
                            : E(s, (r) => {
                                  const a = n || this._getRegistryForType(r);
                                  this._exec(e, a, r);
                              });
                    });
                }
                _exec(e, t, n) {
                    const s = ei(e);
                    W(n['before' + s], [], n),
                        t[e](n),
                        W(n['after' + s], [], n);
                }
                _getRegistryForType(e) {
                    for (let t = 0; t < this._typedRegistries.length; t++) {
                        const n = this._typedRegistries[t];
                        if (n.isForType(e)) return n;
                    }
                    return this.plugins;
                }
                _get(e, t, n) {
                    const s = t.get(e);
                    if (void 0 === s)
                        throw new Error(
                            '"' + e + '" is not a registered ' + n + '.'
                        );
                    return s;
                }
            })();
            class rl {
                constructor() {
                    this._init = [];
                }
                notify(e, t, n, s) {
                    'beforeInit' === t &&
                        ((this._init = this._createDescriptors(e, !0)),
                        this._notify(this._init, e, 'install'));
                    const o = s
                            ? this._descriptors(e).filter(s)
                            : this._descriptors(e),
                        r = this._notify(o, e, t, n);
                    return (
                        'afterDestroy' === t &&
                            (this._notify(o, e, 'stop'),
                            this._notify(this._init, e, 'uninstall')),
                        r
                    );
                }
                _notify(e, t, n, s) {
                    s = s || {};
                    for (const o of e) {
                        const r = o.plugin;
                        if (
                            !1 === W(r[n], [t, s, o.options], r) &&
                            s.cancelable
                        )
                            return !1;
                    }
                    return !0;
                }
                invalidate() {
                    R(this._cache) ||
                        ((this._oldCache = this._cache),
                        (this._cache = void 0));
                }
                _descriptors(e) {
                    if (this._cache) return this._cache;
                    const t = (this._cache = this._createDescriptors(e));
                    return this._notifyStateChanges(e), t;
                }
                _createDescriptors(e, t) {
                    const n = e && e.config,
                        s = C(n.options && n.options.plugins, {}),
                        o = (function al(i) {
                            const e = [],
                                t = Object.keys(bt.plugins.items);
                            for (let s = 0; s < t.length; s++)
                                e.push(bt.getPlugin(t[s]));
                            const n = i.plugins || [];
                            for (let s = 0; s < n.length; s++) {
                                const o = n[s];
                                -1 === e.indexOf(o) && e.push(o);
                            }
                            return e;
                        })(n);
                    return !1 !== s || t
                        ? (function cl(i, e, t, n) {
                              const s = [],
                                  o = i.getContext();
                              for (let r = 0; r < e.length; r++) {
                                  const a = e[r],
                                      c = ll(t[a.id], n);
                                  null !== c &&
                                      s.push({
                                          plugin: a,
                                          options: hl(i.config, a, c, o),
                                      });
                              }
                              return s;
                          })(e, o, s, t)
                        : [];
                }
                _notifyStateChanges(e) {
                    const t = this._oldCache || [],
                        n = this._cache,
                        s = (o, r) =>
                            o.filter(
                                (a) =>
                                    !r.some((l) => a.plugin.id === l.plugin.id)
                            );
                    this._notify(s(t, n), e, 'stop'),
                        this._notify(s(n, t), e, 'start');
                }
            }
            function ll(i, e) {
                return e || !1 !== i ? (!0 === i ? {} : i) : null;
            }
            function hl(i, e, t, n) {
                const s = i.pluginScopeKeys(e),
                    o = i.getOptionScopes(t, s);
                return i.createResolver(o, n, [''], {
                    scriptable: !1,
                    indexable: !1,
                    allKeys: !0,
                });
            }
            function Si(i, e) {
                return (
                    ((e.datasets || {})[i] || {}).indexAxis ||
                    e.indexAxis ||
                    (O.datasets[i] || {}).indexAxis ||
                    'x'
                );
            }
            function Pi(i, e) {
                return 'x' === i || 'y' === i
                    ? i
                    : e.axis ||
                          (function fl(i) {
                              return 'top' === i || 'bottom' === i
                                  ? 'x'
                                  : 'left' === i || 'right' === i
                                  ? 'y'
                                  : void 0;
                          })(e.position) ||
                          i.charAt(0).toLowerCase();
            }
            function ms(i) {
                const e = i.options || (i.options = {});
                (e.plugins = C(e.plugins, {})),
                    (e.scales = (function gl(i, e) {
                        const t = Ct[i.type] || { scales: {} },
                            n = e.scales || {},
                            s = Si(i.type, e),
                            o = Object.create(null),
                            r = Object.create(null);
                        return (
                            Object.keys(n).forEach((a) => {
                                const l = n[a];
                                if (!A(l))
                                    return console.error(
                                        `Invalid scale configuration for scale: ${a}`
                                    );
                                if (l._proxy)
                                    return console.warn(
                                        `Ignoring resolver passed as options for scale: ${a}`
                                    );
                                const c = Pi(a, l),
                                    h = (function ul(i, e) {
                                        return i === e ? '_index_' : '_value_';
                                    })(c, s),
                                    d = t.scales || {};
                                (o[c] = o[c] || a),
                                    (r[a] = Xt(Object.create(null), [
                                        { axis: c },
                                        l,
                                        d[c],
                                        d[h],
                                    ]));
                            }),
                            i.data.datasets.forEach((a) => {
                                const l = a.type || i.type,
                                    c = a.indexAxis || Si(l, e),
                                    d = (Ct[l] || {}).scales || {};
                                Object.keys(d).forEach((u) => {
                                    const f = (function dl(i, e) {
                                            let t = i;
                                            return (
                                                '_index_' === i
                                                    ? (t = e)
                                                    : '_value_' === i &&
                                                      (t =
                                                          'x' === e
                                                              ? 'y'
                                                              : 'x'),
                                                t
                                            );
                                        })(u, c),
                                        g = a[f + 'AxisID'] || o[f] || f;
                                    (r[g] = r[g] || Object.create(null)),
                                        Xt(r[g], [{ axis: f }, n[g], d[u]]);
                                });
                            }),
                            Object.keys(r).forEach((a) => {
                                const l = r[a];
                                Xt(l, [O.scales[l.type], O.scale]);
                            }),
                            r
                        );
                    })(i, e));
            }
            function bs(i) {
                return (
                    ((i = i || {}).datasets = i.datasets || []),
                    (i.labels = i.labels || []),
                    i
                );
            }
            const xs = new Map(),
                _s = new Set();
            function He(i, e) {
                let t = xs.get(i);
                return t || ((t = e()), xs.set(i, t), _s.add(t)), t;
            }
            const fe = (i, e, t) => {
                const n = yt(e, t);
                void 0 !== n && i.add(n);
            };
            class ml {
                constructor(e) {
                    (this._config = (function pl(i) {
                        return ((i = i || {}).data = bs(i.data)), ms(i), i;
                    })(e)),
                        (this._scopeCache = new Map()),
                        (this._resolverCache = new Map());
                }
                get platform() {
                    return this._config.platform;
                }
                get type() {
                    return this._config.type;
                }
                set type(e) {
                    this._config.type = e;
                }
                get data() {
                    return this._config.data;
                }
                set data(e) {
                    this._config.data = bs(e);
                }
                get options() {
                    return this._config.options;
                }
                set options(e) {
                    this._config.options = e;
                }
                get plugins() {
                    return this._config.plugins;
                }
                update() {
                    const e = this._config;
                    this.clearCache(), ms(e);
                }
                clearCache() {
                    this._scopeCache.clear(), this._resolverCache.clear();
                }
                datasetScopeKeys(e) {
                    return He(e, () => [[`datasets.${e}`, '']]);
                }
                datasetAnimationScopeKeys(e, t) {
                    return He(`${e}.transition.${t}`, () => [
                        [`datasets.${e}.transitions.${t}`, `transitions.${t}`],
                        [`datasets.${e}`, ''],
                    ]);
                }
                datasetElementScopeKeys(e, t) {
                    return He(`${e}-${t}`, () => [
                        [
                            `datasets.${e}.elements.${t}`,
                            `datasets.${e}`,
                            `elements.${t}`,
                            '',
                        ],
                    ]);
                }
                pluginScopeKeys(e) {
                    const t = e.id;
                    return He(`${this.type}-plugin-${t}`, () => [
                        [`plugins.${t}`, ...(e.additionalOptionScopes || [])],
                    ]);
                }
                _cachedScopes(e, t) {
                    const n = this._scopeCache;
                    let s = n.get(e);
                    return (!s || t) && ((s = new Map()), n.set(e, s)), s;
                }
                getOptionScopes(e, t, n) {
                    const { options: s, type: o } = this,
                        r = this._cachedScopes(e, n),
                        a = r.get(t);
                    if (a) return a;
                    const l = new Set();
                    t.forEach((h) => {
                        e && (l.add(e), h.forEach((d) => fe(l, e, d))),
                            h.forEach((d) => fe(l, s, d)),
                            h.forEach((d) => fe(l, Ct[o] || {}, d)),
                            h.forEach((d) => fe(l, O, d)),
                            h.forEach((d) => fe(l, hi, d));
                    });
                    const c = Array.from(l);
                    return (
                        0 === c.length && c.push(Object.create(null)),
                        _s.has(t) && r.set(t, c),
                        c
                    );
                }
                chartOptionScopes() {
                    const { options: e, type: t } = this;
                    return [
                        e,
                        Ct[t] || {},
                        O.datasets[t] || {},
                        { type: t },
                        O,
                        hi,
                    ];
                }
                resolveNamedOptions(e, t, n, s = ['']) {
                    const o = { $shared: !0 },
                        { resolver: r, subPrefixes: a } = ys(
                            this._resolverCache,
                            e,
                            s
                        );
                    let l = r;
                    (function xl(i, e) {
                        const { isScriptable: t, isIndexable: n } = yn(i);
                        for (const s of e) {
                            const o = t(s),
                                r = n(s),
                                a = (r || o) && i[s];
                            if ((o && (vt(a) || bl(a))) || (r && V(a)))
                                return !0;
                        }
                        return !1;
                    })(r, t) &&
                        ((o.$shared = !1),
                        (l = Vt(
                            r,
                            (n = vt(n) ? n() : n),
                            this.createResolver(e, n, a)
                        )));
                    for (const c of t) o[c] = l[c];
                    return o;
                }
                createResolver(e, t, n = [''], s) {
                    const { resolver: o } = ys(this._resolverCache, e, n);
                    return A(t) ? Vt(o, t, void 0, s) : o;
                }
            }
            function ys(i, e, t) {
                let n = i.get(e);
                n || ((n = new Map()), i.set(e, n));
                const s = t.join();
                let o = n.get(s);
                return (
                    o ||
                        ((o = {
                            resolver: gi(e, t),
                            subPrefixes: t.filter(
                                (a) => !a.toLowerCase().includes('hover')
                            ),
                        }),
                        n.set(s, o)),
                    o
                );
            }
            const bl = (i) =>
                    A(i) &&
                    Object.getOwnPropertyNames(i).reduce(
                        (e, t) => e || vt(i[t]),
                        !1
                    ),
                yl = ['top', 'bottom', 'left', 'right', 'chartArea'];
            function vs(i, e) {
                return (
                    'top' === i ||
                    'bottom' === i ||
                    (-1 === yl.indexOf(i) && 'x' === e)
                );
            }
            function Ms(i, e) {
                return function (t, n) {
                    return t[i] === n[i] ? t[e] - n[e] : t[i] - n[i];
                };
            }
            function ws(i) {
                const e = i.chart,
                    t = e.options.animation;
                e.notifyPlugins('afterRender'), W(t && t.onComplete, [i], e);
            }
            function vl(i) {
                const e = i.chart,
                    t = e.options.animation;
                W(t && t.onProgress, [i], e);
            }
            function ks(i) {
                return (
                    Dn() && 'string' == typeof i
                        ? (i = document.getElementById(i))
                        : i && i.length && (i = i[0]),
                    i && i.canvas && (i = i.canvas),
                    i
                );
            }
            const je = {},
                Ss = (i) => {
                    const e = ks(i);
                    return Object.values(je)
                        .filter((t) => t.canvas === e)
                        .pop();
                };
            function Ml(i, e, t) {
                const n = Object.keys(i);
                for (const s of n) {
                    const o = +s;
                    if (o >= e) {
                        const r = i[s];
                        delete i[s], (t > 0 || o > e) && (i[o + t] = r);
                    }
                }
            }
            class $e {
                constructor(e, t) {
                    const n = (this.config = new ml(t)),
                        s = ks(e),
                        o = Ss(s);
                    if (o)
                        throw new Error(
                            "Canvas is already in use. Chart with ID '" +
                                o.id +
                                "' must be destroyed before the canvas can be reused."
                        );
                    const r = n.createResolver(
                        n.chartOptionScopes(),
                        this.getContext()
                    );
                    (this.platform = new (n.platform ||
                        (function Na(i) {
                            return !Dn() ||
                                ('undefined' != typeof OffscreenCanvas &&
                                    i instanceof OffscreenCanvas)
                                ? Da
                                : Wa;
                        })(s))()),
                        this.platform.updateConfig(n);
                    const a = this.platform.acquireContext(s, r.aspectRatio),
                        l = a && a.canvas,
                        c = l && l.height,
                        h = l && l.width;
                    (this.id = oo()),
                        (this.ctx = a),
                        (this.canvas = l),
                        (this.width = h),
                        (this.height = c),
                        (this._options = r),
                        (this._aspectRatio = this.aspectRatio),
                        (this._layers = []),
                        (this._metasets = []),
                        (this._stacks = void 0),
                        (this.boxes = []),
                        (this.currentDevicePixelRatio = void 0),
                        (this.chartArea = void 0),
                        (this._active = []),
                        (this._lastEvent = void 0),
                        (this._listeners = {}),
                        (this._responsiveListeners = void 0),
                        (this._sortedMetasets = []),
                        (this.scales = {}),
                        (this._plugins = new rl()),
                        (this.$proxies = {}),
                        (this._hiddenIndices = {}),
                        (this.attached = !1),
                        (this._animationsDisabled = void 0),
                        (this.$context = void 0),
                        (this._doResize = (function ht(i, e) {
                            let t;
                            return function (...n) {
                                return (
                                    e
                                        ? (clearTimeout(t),
                                          (t = setTimeout(i, e, n)))
                                        : i.apply(this, n),
                                    e
                                );
                            };
                        })((d) => this.update(d), r.resizeDelay || 0)),
                        (this._dataChanges = []),
                        (je[this.id] = this),
                        a && l
                            ? (pt.listen(this, 'complete', ws),
                              pt.listen(this, 'progress', vl),
                              this._initialize(),
                              this.attached && this.update())
                            : console.error(
                                  "Failed to create chart: can't acquire context from the given item"
                              );
                }
                get aspectRatio() {
                    const {
                        options: { aspectRatio: e, maintainAspectRatio: t },
                        width: n,
                        height: s,
                        _aspectRatio: o,
                    } = this;
                    return R(e) ? (t && o ? o : s ? n / s : null) : e;
                }
                get data() {
                    return this.config.data;
                }
                set data(e) {
                    this.config.data = e;
                }
                get options() {
                    return this._options;
                }
                set options(e) {
                    this.config.options = e;
                }
                _initialize() {
                    return (
                        this.notifyPlugins('beforeInit'),
                        this.options.responsive
                            ? this.resize()
                            : An(this, this.options.devicePixelRatio),
                        this.bindEvents(),
                        this.notifyPlugins('afterInit'),
                        this
                    );
                }
                clear() {
                    return pn(this.canvas, this.ctx), this;
                }
                stop() {
                    return pt.stop(this), this;
                }
                resize(e, t) {
                    pt.running(this)
                        ? (this._resizeBeforeDraw = { width: e, height: t })
                        : this._resize(e, t);
                }
                _resize(e, t) {
                    const n = this.options,
                        r = this.platform.getMaximumSize(
                            this.canvas,
                            e,
                            t,
                            n.maintainAspectRatio && this.aspectRatio
                        ),
                        a =
                            n.devicePixelRatio ||
                            this.platform.getDevicePixelRatio(),
                        l = this.width ? 'resize' : 'attach';
                    (this.width = r.width),
                        (this.height = r.height),
                        (this._aspectRatio = this.aspectRatio),
                        An(this, a, !0) &&
                            (this.notifyPlugins('resize', { size: r }),
                            W(n.onResize, [this, r], this),
                            this.attached &&
                                this._doResize(l) &&
                                this.render());
                }
                ensureScalesHaveIDs() {
                    E(this.options.scales || {}, (n, s) => {
                        n.id = s;
                    });
                }
                buildOrUpdateScales() {
                    const e = this.options,
                        t = e.scales,
                        n = this.scales,
                        s = Object.keys(n).reduce(
                            (r, a) => ((r[a] = !1), r),
                            {}
                        );
                    let o = [];
                    t &&
                        (o = o.concat(
                            Object.keys(t).map((r) => {
                                const a = t[r],
                                    l = Pi(r, a),
                                    c = 'r' === l,
                                    h = 'x' === l;
                                return {
                                    options: a,
                                    dposition: c
                                        ? 'chartArea'
                                        : h
                                        ? 'bottom'
                                        : 'left',
                                    dtype: c
                                        ? 'radialLinear'
                                        : h
                                        ? 'category'
                                        : 'linear',
                                };
                            })
                        )),
                        E(o, (r) => {
                            const a = r.options,
                                l = a.id,
                                c = Pi(l, a),
                                h = C(a.type, r.dtype);
                            (void 0 === a.position ||
                                vs(a.position, c) !== vs(r.dposition)) &&
                                (a.position = r.dposition),
                                (s[l] = !0);
                            let d = null;
                            l in n && n[l].type === h
                                ? (d = n[l])
                                : ((d = new (bt.getScale(h))({
                                      id: l,
                                      type: h,
                                      ctx: this.ctx,
                                      chart: this,
                                  })),
                                  (n[d.id] = d)),
                                d.init(a, e);
                        }),
                        E(s, (r, a) => {
                            r || delete n[a];
                        }),
                        E(n, (r) => {
                            G.configure(this, r, r.options), G.addBox(this, r);
                        });
                }
                _updateMetasets() {
                    const e = this._metasets,
                        t = this.data.datasets.length,
                        n = e.length;
                    if ((e.sort((s, o) => s.index - o.index), n > t)) {
                        for (let s = t; s < n; ++s) this._destroyDatasetMeta(s);
                        e.splice(t, n - t);
                    }
                    this._sortedMetasets = e
                        .slice(0)
                        .sort(Ms('order', 'index'));
                }
                _removeUnreferencedMetasets() {
                    const {
                        _metasets: e,
                        data: { datasets: t },
                    } = this;
                    e.length > t.length && delete this._stacks,
                        e.forEach((n, s) => {
                            0 === t.filter((o) => o === n._dataset).length &&
                                this._destroyDatasetMeta(s);
                        });
                }
                buildOrUpdateControllers() {
                    const e = [],
                        t = this.data.datasets;
                    let n, s;
                    for (
                        this._removeUnreferencedMetasets(), n = 0, s = t.length;
                        n < s;
                        n++
                    ) {
                        const o = t[n];
                        let r = this.getDatasetMeta(n);
                        const a = o.type || this.config.type;
                        if (
                            (r.type &&
                                r.type !== a &&
                                (this._destroyDatasetMeta(n),
                                (r = this.getDatasetMeta(n))),
                            (r.type = a),
                            (r.indexAxis = o.indexAxis || Si(a, this.options)),
                            (r.order = o.order || 0),
                            (r.index = n),
                            (r.label = '' + o.label),
                            (r.visible = this.isDatasetVisible(n)),
                            r.controller)
                        )
                            r.controller.updateIndex(n),
                                r.controller.linkScales();
                        else {
                            const l = bt.getController(a),
                                { datasetElementType: c, dataElementType: h } =
                                    O.datasets[a];
                            Object.assign(l.prototype, {
                                dataElementType: bt.getElement(h),
                                datasetElementType: c && bt.getElement(c),
                            }),
                                (r.controller = new l(this, n)),
                                e.push(r.controller);
                        }
                    }
                    return this._updateMetasets(), e;
                }
                _resetElements() {
                    E(
                        this.data.datasets,
                        (e, t) => {
                            this.getDatasetMeta(t).controller.reset();
                        },
                        this
                    );
                }
                reset() {
                    this._resetElements(), this.notifyPlugins('reset');
                }
                update(e) {
                    const t = this.config;
                    t.update();
                    const n = (this._options = t.createResolver(
                            t.chartOptionScopes(),
                            this.getContext()
                        )),
                        s = (this._animationsDisabled = !n.animation);
                    if (
                        (this._updateScales(),
                        this._checkEventBindings(),
                        this._updateHiddenIndices(),
                        this._plugins.invalidate(),
                        !1 ===
                            this.notifyPlugins('beforeUpdate', {
                                mode: e,
                                cancelable: !0,
                            }))
                    )
                        return;
                    const o = this.buildOrUpdateControllers();
                    this.notifyPlugins('beforeElementsUpdate');
                    let r = 0;
                    for (let c = 0, h = this.data.datasets.length; c < h; c++) {
                        const { controller: d } = this.getDatasetMeta(c),
                            u = !s && -1 === o.indexOf(d);
                        d.buildOrUpdateElements(u),
                            (r = Math.max(+d.getMaxOverflow(), r));
                    }
                    (r = this._minPadding = n.layout.autoPadding ? r : 0),
                        this._updateLayout(r),
                        s ||
                            E(o, (c) => {
                                c.reset();
                            }),
                        this._updateDatasets(e),
                        this.notifyPlugins('afterUpdate', { mode: e }),
                        this._layers.sort(Ms('z', '_idx'));
                    const { _active: a, _lastEvent: l } = this;
                    l
                        ? this._eventHandler(l, !0)
                        : a.length && this._updateHoverStyles(a, a, !0),
                        this.render();
                }
                _updateScales() {
                    E(this.scales, (e) => {
                        G.removeBox(this, e);
                    }),
                        this.ensureScalesHaveIDs(),
                        this.buildOrUpdateScales();
                }
                _checkEventBindings() {
                    const e = this.options,
                        t = new Set(Object.keys(this._listeners)),
                        n = new Set(e.events);
                    (!qi(t, n) ||
                        !!this._responsiveListeners !== e.responsive) &&
                        (this.unbindEvents(), this.bindEvents());
                }
                _updateHiddenIndices() {
                    const { _hiddenIndices: e } = this,
                        t = this._getUniformDataChanges() || [];
                    for (const { method: n, start: s, count: o } of t)
                        Ml(e, s, '_removeElements' === n ? -o : o);
                }
                _getUniformDataChanges() {
                    const e = this._dataChanges;
                    if (!e || !e.length) return;
                    this._dataChanges = [];
                    const t = this.data.datasets.length,
                        n = (o) =>
                            new Set(
                                e
                                    .filter((r) => r[0] === o)
                                    .map(
                                        (r, a) =>
                                            a + ',' + r.splice(1).join(',')
                                    )
                            ),
                        s = n(0);
                    for (let o = 1; o < t; o++) if (!qi(s, n(o))) return;
                    return Array.from(s)
                        .map((o) => o.split(','))
                        .map((o) => ({
                            method: o[1],
                            start: +o[2],
                            count: +o[3],
                        }));
                }
                _updateLayout(e) {
                    if (
                        !1 ===
                        this.notifyPlugins('beforeLayout', { cancelable: !0 })
                    )
                        return;
                    G.update(this, this.width, this.height, e);
                    const t = this.chartArea,
                        n = t.width <= 0 || t.height <= 0;
                    (this._layers = []),
                        E(
                            this.boxes,
                            (s) => {
                                (n && 'chartArea' === s.position) ||
                                    (s.configure && s.configure(),
                                    this._layers.push(...s._layers()));
                            },
                            this
                        ),
                        this._layers.forEach((s, o) => {
                            s._idx = o;
                        }),
                        this.notifyPlugins('afterLayout');
                }
                _updateDatasets(e) {
                    if (
                        !1 !==
                        this.notifyPlugins('beforeDatasetsUpdate', {
                            mode: e,
                            cancelable: !0,
                        })
                    ) {
                        for (
                            let t = 0, n = this.data.datasets.length;
                            t < n;
                            ++t
                        )
                            this.getDatasetMeta(t).controller.configure();
                        for (
                            let t = 0, n = this.data.datasets.length;
                            t < n;
                            ++t
                        )
                            this._updateDataset(
                                t,
                                vt(e) ? e({ datasetIndex: t }) : e
                            );
                        this.notifyPlugins('afterDatasetsUpdate', { mode: e });
                    }
                }
                _updateDataset(e, t) {
                    const n = this.getDatasetMeta(e),
                        s = { meta: n, index: e, mode: t, cancelable: !0 };
                    !1 !== this.notifyPlugins('beforeDatasetUpdate', s) &&
                        (n.controller._update(t),
                        (s.cancelable = !1),
                        this.notifyPlugins('afterDatasetUpdate', s));
                }
                render() {
                    !1 !==
                        this.notifyPlugins('beforeRender', {
                            cancelable: !0,
                        }) &&
                        (pt.has(this)
                            ? this.attached &&
                              !pt.running(this) &&
                              pt.start(this)
                            : (this.draw(), ws({ chart: this })));
                }
                draw() {
                    let e;
                    if (this._resizeBeforeDraw) {
                        const { width: n, height: s } = this._resizeBeforeDraw;
                        this._resize(n, s), (this._resizeBeforeDraw = null);
                    }
                    if (
                        (this.clear(),
                        this.width <= 0 ||
                            this.height <= 0 ||
                            !1 ===
                                this.notifyPlugins('beforeDraw', {
                                    cancelable: !0,
                                }))
                    )
                        return;
                    const t = this._layers;
                    for (e = 0; e < t.length && t[e].z <= 0; ++e)
                        t[e].draw(this.chartArea);
                    for (this._drawDatasets(); e < t.length; ++e)
                        t[e].draw(this.chartArea);
                    this.notifyPlugins('afterDraw');
                }
                _getSortedDatasetMetas(e) {
                    const t = this._sortedMetasets,
                        n = [];
                    let s, o;
                    for (s = 0, o = t.length; s < o; ++s) {
                        const r = t[s];
                        (!e || r.visible) && n.push(r);
                    }
                    return n;
                }
                getSortedVisibleDatasetMetas() {
                    return this._getSortedDatasetMetas(!0);
                }
                _drawDatasets() {
                    if (
                        !1 ===
                        this.notifyPlugins('beforeDatasetsDraw', {
                            cancelable: !0,
                        })
                    )
                        return;
                    const e = this.getSortedVisibleDatasetMetas();
                    for (let t = e.length - 1; t >= 0; --t)
                        this._drawDataset(e[t]);
                    this.notifyPlugins('afterDatasetsDraw');
                }
                _drawDataset(e) {
                    const t = this.ctx,
                        n = e._clip,
                        s = !n.disabled,
                        o = this.chartArea,
                        r = { meta: e, index: e.index, cancelable: !0 };
                    !1 !== this.notifyPlugins('beforeDatasetDraw', r) &&
                        (s &&
                            Le(t, {
                                left: !1 === n.left ? 0 : o.left - n.left,
                                right:
                                    !1 === n.right
                                        ? this.width
                                        : o.right + n.right,
                                top: !1 === n.top ? 0 : o.top - n.top,
                                bottom:
                                    !1 === n.bottom
                                        ? this.height
                                        : o.bottom + n.bottom,
                            }),
                        e.controller.draw(),
                        s && Te(t),
                        (r.cancelable = !1),
                        this.notifyPlugins('afterDatasetDraw', r));
                }
                isPointInArea(e) {
                    return ie(e, this.chartArea, this._minPadding);
                }
                getElementsAtEventForMode(e, t, n, s) {
                    const o = ya.modes[t];
                    return 'function' == typeof o ? o(this, e, n, s) : [];
                }
                getDatasetMeta(e) {
                    const t = this.data.datasets[e],
                        n = this._metasets;
                    let s = n.filter((o) => o && o._dataset === t).pop();
                    return (
                        s ||
                            ((s = {
                                type: null,
                                data: [],
                                dataset: null,
                                controller: null,
                                hidden: null,
                                xAxisID: null,
                                yAxisID: null,
                                order: (t && t.order) || 0,
                                index: e,
                                _dataset: t,
                                _parsed: [],
                                _sorted: !1,
                            }),
                            n.push(s)),
                        s
                    );
                }
                getContext() {
                    return (
                        this.$context ||
                        (this.$context = kt(null, {
                            chart: this,
                            type: 'chart',
                        }))
                    );
                }
                getVisibleDatasetCount() {
                    return this.getSortedVisibleDatasetMetas().length;
                }
                isDatasetVisible(e) {
                    const t = this.data.datasets[e];
                    if (!t) return !1;
                    const n = this.getDatasetMeta(e);
                    return 'boolean' == typeof n.hidden ? !n.hidden : !t.hidden;
                }
                setDatasetVisibility(e, t) {
                    this.getDatasetMeta(e).hidden = !t;
                }
                toggleDataVisibility(e) {
                    this._hiddenIndices[e] = !this._hiddenIndices[e];
                }
                getDataVisibility(e) {
                    return !this._hiddenIndices[e];
                }
                _updateVisibility(e, t, n) {
                    const s = n ? 'show' : 'hide',
                        o = this.getDatasetMeta(e),
                        r = o.controller._resolveAnimations(void 0, s);
                    nt(t)
                        ? ((o.data[t].hidden = !n), this.update())
                        : (this.setDatasetVisibility(e, n),
                          r.update(o, { visible: n }),
                          this.update((a) =>
                              a.datasetIndex === e ? s : void 0
                          ));
                }
                hide(e, t) {
                    this._updateVisibility(e, t, !1);
                }
                show(e, t) {
                    this._updateVisibility(e, t, !0);
                }
                _destroyDatasetMeta(e) {
                    const t = this._metasets[e];
                    t && t.controller && t.controller._destroy(),
                        delete this._metasets[e];
                }
                _stop() {
                    let e, t;
                    for (
                        this.stop(),
                            pt.remove(this),
                            e = 0,
                            t = this.data.datasets.length;
                        e < t;
                        ++e
                    )
                        this._destroyDatasetMeta(e);
                }
                destroy() {
                    this.notifyPlugins('beforeDestroy');
                    const { canvas: e, ctx: t } = this;
                    this._stop(),
                        this.config.clearCache(),
                        e &&
                            (this.unbindEvents(),
                            pn(e, t),
                            this.platform.releaseContext(t),
                            (this.canvas = null),
                            (this.ctx = null)),
                        this.notifyPlugins('destroy'),
                        delete je[this.id],
                        this.notifyPlugins('afterDestroy');
                }
                toBase64Image(...e) {
                    return this.canvas.toDataURL(...e);
                }
                bindEvents() {
                    this.bindUserEvents(),
                        this.options.responsive
                            ? this.bindResponsiveEvents()
                            : (this.attached = !0);
                }
                bindUserEvents() {
                    const e = this._listeners,
                        t = this.platform,
                        n = (o, r) => {
                            t.addEventListener(this, o, r), (e[o] = r);
                        },
                        s = (o, r, a) => {
                            (o.offsetX = r),
                                (o.offsetY = a),
                                this._eventHandler(o);
                        };
                    E(this.options.events, (o) => n(o, s));
                }
                bindResponsiveEvents() {
                    this._responsiveListeners ||
                        (this._responsiveListeners = {});
                    const e = this._responsiveListeners,
                        t = this.platform,
                        n = (l, c) => {
                            t.addEventListener(this, l, c), (e[l] = c);
                        },
                        s = (l, c) => {
                            e[l] &&
                                (t.removeEventListener(this, l, c),
                                delete e[l]);
                        },
                        o = (l, c) => {
                            this.canvas && this.resize(l, c);
                        };
                    let r;
                    const a = () => {
                        s('attach', a),
                            (this.attached = !0),
                            this.resize(),
                            n('resize', o),
                            n('detach', r);
                    };
                    (r = () => {
                        (this.attached = !1),
                            s('resize', o),
                            this._stop(),
                            this._resize(0, 0),
                            n('attach', a);
                    }),
                        t.isAttached(this.canvas) ? a() : r();
                }
                unbindEvents() {
                    E(this._listeners, (e, t) => {
                        this.platform.removeEventListener(this, t, e);
                    }),
                        (this._listeners = {}),
                        E(this._responsiveListeners, (e, t) => {
                            this.platform.removeEventListener(this, t, e);
                        }),
                        (this._responsiveListeners = void 0);
                }
                updateHoverStyle(e, t, n) {
                    const s = n ? 'set' : 'remove';
                    let o, r, a, l;
                    for (
                        'dataset' === t &&
                            ((o = this.getDatasetMeta(e[0].datasetIndex)),
                            o.controller['_' + s + 'DatasetHoverStyle']()),
                            a = 0,
                            l = e.length;
                        a < l;
                        ++a
                    ) {
                        r = e[a];
                        const c =
                            r && this.getDatasetMeta(r.datasetIndex).controller;
                        c &&
                            c[s + 'HoverStyle'](
                                r.element,
                                r.datasetIndex,
                                r.index
                            );
                    }
                }
                getActiveElements() {
                    return this._active || [];
                }
                setActiveElements(e) {
                    const t = this._active || [],
                        n = e.map(({ datasetIndex: o, index: r }) => {
                            const a = this.getDatasetMeta(o);
                            if (!a)
                                throw new Error(
                                    'No dataset found at index ' + o
                                );
                            return {
                                datasetIndex: o,
                                element: a.data[r],
                                index: r,
                            };
                        });
                    !ve(n, t) &&
                        ((this._active = n),
                        (this._lastEvent = null),
                        this._updateHoverStyles(n, t));
                }
                notifyPlugins(e, t, n) {
                    return this._plugins.notify(this, e, t, n);
                }
                _updateHoverStyles(e, t, n) {
                    const s = this.options.hover,
                        o = (l, c) =>
                            l.filter(
                                (h) =>
                                    !c.some(
                                        (d) =>
                                            h.datasetIndex === d.datasetIndex &&
                                            h.index === d.index
                                    )
                            ),
                        r = o(t, e),
                        a = n ? e : o(e, t);
                    r.length && this.updateHoverStyle(r, s.mode, !1),
                        a.length &&
                            s.mode &&
                            this.updateHoverStyle(a, s.mode, !0);
                }
                _eventHandler(e, t) {
                    const n = {
                            event: e,
                            replay: t,
                            cancelable: !0,
                            inChartArea: this.isPointInArea(e),
                        },
                        s = (r) =>
                            (r.options.events || this.options.events).includes(
                                e.native.type
                            );
                    if (!1 === this.notifyPlugins('beforeEvent', n, s)) return;
                    const o = this._handleEvent(e, t, n.inChartArea);
                    return (
                        (n.cancelable = !1),
                        this.notifyPlugins('afterEvent', n, s),
                        (o || n.changed) && this.render(),
                        this
                    );
                }
                _handleEvent(e, t, n) {
                    const { _active: s = [], options: o } = this,
                        a = this._getActiveElements(e, s, n, t),
                        l = (function uo(i) {
                            return (
                                'mouseup' === i.type ||
                                'click' === i.type ||
                                'contextmenu' === i.type
                            );
                        })(e),
                        c = (function wl(i, e, t, n) {
                            return t && 'mouseout' !== i.type
                                ? n
                                    ? e
                                    : i
                                : null;
                        })(e, this._lastEvent, n, l);
                    n &&
                        ((this._lastEvent = null),
                        W(o.onHover, [e, a, this], this),
                        l && W(o.onClick, [e, a, this], this));
                    const h = !ve(a, s);
                    return (
                        (h || t) &&
                            ((this._active = a),
                            this._updateHoverStyles(a, s, t)),
                        (this._lastEvent = c),
                        h
                    );
                }
                _getActiveElements(e, t, n, s) {
                    if ('mouseout' === e.type) return [];
                    if (!n) return t;
                    const o = this.options.hover;
                    return this.getElementsAtEventForMode(e, o.mode, o, s);
                }
            }
            const Ps = () => E($e.instances, (i) => i._plugins.invalidate()),
                St = !0;
            function Cs(i, e, t) {
                const {
                    startAngle: n,
                    pixelMargin: s,
                    x: o,
                    y: r,
                    outerRadius: a,
                    innerRadius: l,
                } = e;
                let c = s / a;
                i.beginPath(),
                    i.arc(o, r, a, n - c, t + c),
                    l > s
                        ? ((c = s / l), i.arc(o, r, l, t + c, n - c, !0))
                        : i.arc(o, r, s, t + H, n - H),
                    i.closePath(),
                    i.clip();
            }
            function Ht(i, e, t, n) {
                return { x: t + i * Math.cos(e), y: n + i * Math.sin(e) };
            }
            function Ci(i, e, t, n, s) {
                const {
                        x: o,
                        y: r,
                        startAngle: a,
                        pixelMargin: l,
                        innerRadius: c,
                    } = e,
                    h = Math.max(e.outerRadius + n + t - l, 0),
                    d = c > 0 ? c + n + t + l : 0;
                let u = 0;
                const f = s - a;
                if (n) {
                    const It = ((c > 0 ? c - n : 0) + (h > 0 ? h - n : 0)) / 2;
                    u = (f - (0 !== It ? (f * It) / (It + n) : f)) / 2;
                }
                const p = (f - Math.max(0.001, f * h - t / N) / h) / 2,
                    m = a + p + u,
                    b = s - p - u,
                    {
                        outerStart: x,
                        outerEnd: v,
                        innerStart: y,
                        innerEnd: _,
                    } = (function Sl(i, e, t, n) {
                        const s = (function kl(i) {
                                return ui(i, [
                                    'outerStart',
                                    'outerEnd',
                                    'innerStart',
                                    'innerEnd',
                                ]);
                            })(i.options.borderRadius),
                            o = (t - e) / 2,
                            r = Math.min(o, (n * e) / 2),
                            a = (l) => {
                                const c = ((t - Math.min(o, l)) * n) / 2;
                                return X(l, 0, Math.min(o, c));
                            };
                        return {
                            outerStart: a(s.outerStart),
                            outerEnd: a(s.outerEnd),
                            innerStart: X(s.innerStart, 0, r),
                            innerEnd: X(s.innerEnd, 0, r),
                        };
                    })(e, d, h, b - m),
                    M = h - x,
                    w = h - v,
                    k = m + x / M,
                    S = b - v / w,
                    F = d + y,
                    L = d + _,
                    T = m + y / F,
                    $ = b - _ / L;
                if ((i.beginPath(), i.arc(o, r, h, k, S), v > 0)) {
                    const B = Ht(w, S, o, r);
                    i.arc(B.x, B.y, v, S, b + H);
                }
                const J = Ht(L, b, o, r);
                if ((i.lineTo(J.x, J.y), _ > 0)) {
                    const B = Ht(L, $, o, r);
                    i.arc(B.x, B.y, _, b + H, $ + Math.PI);
                }
                if ((i.arc(o, r, d, b - _ / d, m + y / d, !0), y > 0)) {
                    const B = Ht(F, T, o, r);
                    i.arc(B.x, B.y, y, T + Math.PI, m - H);
                }
                const D = Ht(M, m, o, r);
                if ((i.lineTo(D.x, D.y), x > 0)) {
                    const B = Ht(M, k, o, r);
                    i.arc(B.x, B.y, x, m - H, k);
                }
                i.closePath();
            }
            Object.defineProperties($e, {
                defaults: { enumerable: St, value: O },
                instances: { enumerable: St, value: je },
                overrides: { enumerable: St, value: Ct },
                registry: { enumerable: St, value: bt },
                version: { enumerable: St, value: '3.8.0' },
                getChart: { enumerable: St, value: Ss },
                register: {
                    enumerable: St,
                    value: (...i) => {
                        bt.add(...i), Ps();
                    },
                },
                unregister: {
                    enumerable: St,
                    value: (...i) => {
                        bt.remove(...i), Ps();
                    },
                },
            });
            class Ye extends at {
                constructor(e) {
                    super(),
                        (this.options = void 0),
                        (this.circumference = void 0),
                        (this.startAngle = void 0),
                        (this.endAngle = void 0),
                        (this.innerRadius = void 0),
                        (this.outerRadius = void 0),
                        (this.pixelMargin = 0),
                        (this.fullCircles = 0),
                        e && Object.assign(this, e);
                }
                inRange(e, t, n) {
                    const s = this.getProps(['x', 'y'], n),
                        { angle: o, distance: r } = en(s, { x: e, y: t }),
                        {
                            startAngle: a,
                            endAngle: l,
                            innerRadius: c,
                            outerRadius: h,
                            circumference: d,
                        } = this.getProps(
                            [
                                'startAngle',
                                'endAngle',
                                'innerRadius',
                                'outerRadius',
                                'circumference',
                            ],
                            n
                        ),
                        u = this.options.spacing / 2,
                        g = C(d, l - a) >= z || Gt(o, a, l),
                        p = ut(r, c + u, h + u);
                    return g && p;
                }
                getCenterPoint(e) {
                    const {
                            x: t,
                            y: n,
                            startAngle: s,
                            endAngle: o,
                            innerRadius: r,
                            outerRadius: a,
                        } = this.getProps(
                            [
                                'x',
                                'y',
                                'startAngle',
                                'endAngle',
                                'innerRadius',
                                'outerRadius',
                                'circumference',
                            ],
                            e
                        ),
                        { offset: l, spacing: c } = this.options,
                        h = (s + o) / 2,
                        d = (r + a + c + l) / 2;
                    return { x: t + Math.cos(h) * d, y: n + Math.sin(h) * d };
                }
                tooltipPosition(e) {
                    return this.getCenterPoint(e);
                }
                draw(e) {
                    const { options: t, circumference: n } = this,
                        s = (t.offset || 0) / 2,
                        o = (t.spacing || 0) / 2;
                    if (
                        ((this.pixelMargin =
                            'inner' === t.borderAlign ? 0.33 : 0),
                        (this.fullCircles = n > z ? Math.floor(n / z) : 0),
                        0 === n || this.innerRadius < 0 || this.outerRadius < 0)
                    )
                        return;
                    e.save();
                    let r = 0;
                    if (s) {
                        r = s / 2;
                        const l = (this.startAngle + this.endAngle) / 2;
                        e.translate(Math.cos(l) * r, Math.sin(l) * r),
                            this.circumference >= N && (r = s);
                    }
                    (e.fillStyle = t.backgroundColor),
                        (e.strokeStyle = t.borderColor);
                    const a = (function Pl(i, e, t, n) {
                        const {
                            fullCircles: s,
                            startAngle: o,
                            circumference: r,
                        } = e;
                        let a = e.endAngle;
                        if (s) {
                            Ci(i, e, t, n, o + z);
                            for (let l = 0; l < s; ++l) i.fill();
                            isNaN(r) ||
                                ((a = o + (r % z)), r % z == 0 && (a += z));
                        }
                        return Ci(i, e, t, n, a), i.fill(), a;
                    })(e, this, r, o);
                    (function Dl(i, e, t, n, s) {
                        const { options: o } = e,
                            { borderWidth: r, borderJoinStyle: a } = o,
                            l = 'inner' === o.borderAlign;
                        !r ||
                            (l
                                ? ((i.lineWidth = 2 * r),
                                  (i.lineJoin = a || 'round'))
                                : ((i.lineWidth = r),
                                  (i.lineJoin = a || 'bevel')),
                            e.fullCircles &&
                                (function Cl(i, e, t) {
                                    const {
                                            x: n,
                                            y: s,
                                            startAngle: o,
                                            pixelMargin: r,
                                            fullCircles: a,
                                        } = e,
                                        l = Math.max(e.outerRadius - r, 0),
                                        c = e.innerRadius + r;
                                    let h;
                                    for (
                                        t && Cs(i, e, o + z),
                                            i.beginPath(),
                                            i.arc(n, s, c, o + z, o, !0),
                                            h = 0;
                                        h < a;
                                        ++h
                                    )
                                        i.stroke();
                                    for (
                                        i.beginPath(),
                                            i.arc(n, s, l, o, o + z),
                                            h = 0;
                                        h < a;
                                        ++h
                                    )
                                        i.stroke();
                                })(i, e, l),
                            l && Cs(i, e, s),
                            Ci(i, e, t, n, s),
                            i.stroke());
                    })(e, this, r, o, a),
                        e.restore();
                }
            }
            function Ds(i, e, t = e) {
                (i.lineCap = C(t.borderCapStyle, e.borderCapStyle)),
                    i.setLineDash(C(t.borderDash, e.borderDash)),
                    (i.lineDashOffset = C(
                        t.borderDashOffset,
                        e.borderDashOffset
                    )),
                    (i.lineJoin = C(t.borderJoinStyle, e.borderJoinStyle)),
                    (i.lineWidth = C(t.borderWidth, e.borderWidth)),
                    (i.strokeStyle = C(t.borderColor, e.borderColor));
            }
            function Al(i, e, t) {
                i.lineTo(t.x, t.y);
            }
            function As(i, e, t = {}) {
                const n = i.length,
                    { start: s = 0, end: o = n - 1 } = t,
                    { start: r, end: a } = e,
                    l = Math.max(s, r),
                    c = Math.min(o, a);
                return {
                    count: n,
                    start: l,
                    loop: e.loop,
                    ilen:
                        c < l && !((s < r && o < r) || (s > a && o > a))
                            ? n + c - l
                            : c - l,
                };
            }
            function Ll(i, e, t, n) {
                const { points: s, options: o } = e,
                    { count: r, start: a, loop: l, ilen: c } = As(s, t, n),
                    h = (function Ol(i) {
                        return i.stepped
                            ? $o
                            : i.tension ||
                              'monotone' === i.cubicInterpolationMode
                            ? Yo
                            : Al;
                    })(o);
                let f,
                    g,
                    p,
                    { move: d = !0, reverse: u } = n || {};
                for (f = 0; f <= c; ++f)
                    (g = s[(a + (u ? c - f : f)) % r]),
                        !g.skip &&
                            (d
                                ? (i.moveTo(g.x, g.y), (d = !1))
                                : h(i, p, g, u, o.stepped),
                            (p = g));
                return (
                    l &&
                        ((g = s[(a + (u ? c : 0)) % r]),
                        h(i, p, g, u, o.stepped)),
                    !!l
                );
            }
            function Tl(i, e, t, n) {
                const s = e.points,
                    { count: o, start: r, ilen: a } = As(s, t, n),
                    { move: l = !0, reverse: c } = n || {};
                let u,
                    f,
                    g,
                    p,
                    m,
                    b,
                    h = 0,
                    d = 0;
                const x = (y) => (r + (c ? a - y : y)) % o,
                    v = () => {
                        p !== m &&
                            (i.lineTo(h, m), i.lineTo(h, p), i.lineTo(h, b));
                    };
                for (
                    l && ((f = s[x(0)]), i.moveTo(f.x, f.y)), u = 0;
                    u <= a;
                    ++u
                ) {
                    if (((f = s[x(u)]), f.skip)) continue;
                    const y = f.x,
                        _ = f.y,
                        M = 0 | y;
                    M === g
                        ? (_ < p ? (p = _) : _ > m && (m = _),
                          (h = (d * h + y) / ++d))
                        : (v(), i.lineTo(y, _), (g = M), (d = 0), (p = m = _)),
                        (b = _);
                }
                v();
            }
            function Di(i) {
                const e = i.options;
                return i._decimated ||
                    i._loop ||
                    e.tension ||
                    'monotone' === e.cubicInterpolationMode ||
                    e.stepped ||
                    (e.borderDash && e.borderDash.length)
                    ? Ll
                    : Tl;
            }
            (Ye.id = 'arc'),
                (Ye.defaults = {
                    borderAlign: 'center',
                    borderColor: '#fff',
                    borderJoinStyle: void 0,
                    borderRadius: 0,
                    borderWidth: 2,
                    offset: 0,
                    spacing: 0,
                    angle: void 0,
                }),
                (Ye.defaultRoutes = { backgroundColor: 'backgroundColor' });
            const Il = 'function' == typeof Path2D;
            let Ue = (() => {
                class i extends at {
                    constructor(t) {
                        super(),
                            (this.animated = !0),
                            (this.options = void 0),
                            (this._chart = void 0),
                            (this._loop = void 0),
                            (this._fullLoop = void 0),
                            (this._path = void 0),
                            (this._points = void 0),
                            (this._segments = void 0),
                            (this._decimated = !1),
                            (this._pointsUpdated = !1),
                            (this._datasetIndex = void 0),
                            t && Object.assign(this, t);
                    }
                    updateControlPoints(t, n) {
                        const s = this.options;
                        (!s.tension &&
                            'monotone' !== s.cubicInterpolationMode) ||
                            s.stepped ||
                            this._pointsUpdated ||
                            (br(
                                this._points,
                                s,
                                t,
                                s.spanGaps ? this._loop : this._fullLoop,
                                n
                            ),
                            (this._pointsUpdated = !0));
                    }
                    set points(t) {
                        (this._points = t),
                            delete this._segments,
                            delete this._path,
                            (this._pointsUpdated = !1);
                    }
                    get points() {
                        return this._points;
                    }
                    get segments() {
                        return (
                            this._segments ||
                            (this._segments = (function Rr(i, e) {
                                const t = i.points,
                                    n = i.options.spanGaps,
                                    s = t.length;
                                if (!s) return [];
                                const o = !!i._loop,
                                    { start: r, end: a } = (function Lr(
                                        i,
                                        e,
                                        t,
                                        n
                                    ) {
                                        let s = 0,
                                            o = e - 1;
                                        if (t && !n)
                                            for (; s < e && !i[s].skip; ) s++;
                                        for (; s < e && i[s].skip; ) s++;
                                        for (
                                            s %= e, t && (o += s);
                                            o > s && i[o % e].skip;

                                        )
                                            o--;
                                        return (o %= e), { start: s, end: o };
                                    })(t, s, o, n);
                                return (function Bn(i, e, t, n) {
                                    return n && n.setContext && t
                                        ? (function Er(i, e, t, n) {
                                              const s = i._chart.getContext(),
                                                  o = Vn(i.options),
                                                  {
                                                      _datasetIndex: r,
                                                      options: { spanGaps: a },
                                                  } = i,
                                                  l = t.length,
                                                  c = [];
                                              let h = o,
                                                  d = e[0].start,
                                                  u = d;
                                              function f(g, p, m, b) {
                                                  const x = a ? -1 : 1;
                                                  if (g !== p) {
                                                      for (
                                                          g += l;
                                                          t[g % l].skip;

                                                      )
                                                          g -= x;
                                                      for (; t[p % l].skip; )
                                                          p += x;
                                                      g % l != p % l &&
                                                          (c.push({
                                                              start: g % l,
                                                              end: p % l,
                                                              loop: m,
                                                              style: b,
                                                          }),
                                                          (h = b),
                                                          (d = p % l));
                                                  }
                                              }
                                              for (const g of e) {
                                                  d = a ? d : g.start;
                                                  let m,
                                                      p = t[d % l];
                                                  for (
                                                      u = d + 1;
                                                      u <= g.end;
                                                      u++
                                                  ) {
                                                      const b = t[u % l];
                                                      (m = Vn(
                                                          n.setContext(
                                                              kt(s, {
                                                                  type: 'segment',
                                                                  p0: p,
                                                                  p1: b,
                                                                  p0DataIndex:
                                                                      (u - 1) %
                                                                      l,
                                                                  p1DataIndex:
                                                                      u % l,
                                                                  datasetIndex:
                                                                      r,
                                                              })
                                                          )
                                                      )),
                                                          Fr(m, h) &&
                                                              f(
                                                                  d,
                                                                  u - 1,
                                                                  g.loop,
                                                                  h
                                                              ),
                                                          (p = b),
                                                          (h = m);
                                                  }
                                                  d < u - 1 &&
                                                      f(d, u - 1, g.loop, h);
                                              }
                                              return c;
                                          })(i, e, t, n)
                                        : e;
                                })(
                                    i,
                                    !0 === n
                                        ? [{ start: r, end: a, loop: o }]
                                        : (function Tr(i, e, t, n) {
                                              const s = i.length,
                                                  o = [];
                                              let l,
                                                  r = e,
                                                  a = i[e];
                                              for (l = e + 1; l <= t; ++l) {
                                                  const c = i[l % s];
                                                  c.skip || c.stop
                                                      ? a.skip ||
                                                        (o.push({
                                                            start: e % s,
                                                            end: (l - 1) % s,
                                                            loop: (n = !1),
                                                        }),
                                                        (e = r =
                                                            c.stop ? l : null))
                                                      : ((r = l),
                                                        a.skip && (e = l)),
                                                      (a = c);
                                              }
                                              return (
                                                  null !== r &&
                                                      o.push({
                                                          start: e % s,
                                                          end: r % s,
                                                          loop: n,
                                                      }),
                                                  o
                                              );
                                          })(
                                              t,
                                              r,
                                              a < r ? a + s : a,
                                              !!i._fullLoop &&
                                                  0 === r &&
                                                  a === s - 1
                                          ),
                                    t,
                                    e
                                );
                            })(this, this.options.segment))
                        );
                    }
                    first() {
                        const t = this.segments;
                        return t.length && this.points[t[0].start];
                    }
                    last() {
                        const t = this.segments,
                            s = t.length;
                        return s && this.points[t[s - 1].end];
                    }
                    interpolate(t, n) {
                        const s = this.options,
                            o = t[n],
                            r = this.points,
                            a = zn(this, { property: n, start: o, end: o });
                        if (!a.length) return;
                        const l = [],
                            c = (function Rl(i) {
                                return i.stepped
                                    ? Sr
                                    : i.tension ||
                                      'monotone' === i.cubicInterpolationMode
                                    ? Pr
                                    : Rt;
                            })(s);
                        let h, d;
                        for (h = 0, d = a.length; h < d; ++h) {
                            const { start: u, end: f } = a[h],
                                g = r[u],
                                p = r[f];
                            if (g === p) {
                                l.push(g);
                                continue;
                            }
                            const b = c(
                                g,
                                p,
                                Math.abs((o - g[n]) / (p[n] - g[n])),
                                s.stepped
                            );
                            (b[n] = t[n]), l.push(b);
                        }
                        return 1 === l.length ? l[0] : l;
                    }
                    pathSegment(t, n, s) {
                        return Di(this)(t, this, n, s);
                    }
                    path(t, n, s) {
                        const o = this.segments,
                            r = Di(this);
                        let a = this._loop;
                        (n = n || 0), (s = s || this.points.length - n);
                        for (const l of o)
                            a &= r(t, this, l, { start: n, end: n + s - 1 });
                        return !!a;
                    }
                    draw(t, n, s, o) {
                        (this.points || []).length &&
                            (this.options || {}).borderWidth &&
                            (t.save(),
                            (function zl(i, e, t, n) {
                                Il && !e.options.segment
                                    ? (function El(i, e, t, n) {
                                          let s = e._path;
                                          s ||
                                              ((s = e._path = new Path2D()),
                                              e.path(s, t, n) && s.closePath()),
                                              Ds(i, e.options),
                                              i.stroke(s);
                                      })(i, e, t, n)
                                    : (function Fl(i, e, t, n) {
                                          const { segments: s, options: o } = e,
                                              r = Di(e);
                                          for (const a of s)
                                              Ds(i, o, a.style),
                                                  i.beginPath(),
                                                  r(i, e, a, {
                                                      start: t,
                                                      end: t + n - 1,
                                                  }) && i.closePath(),
                                                  i.stroke();
                                      })(i, e, t, n);
                            })(t, this, s, o),
                            t.restore()),
                            this.animated &&
                                ((this._pointsUpdated = !1),
                                (this._path = void 0));
                    }
                }
                return (
                    (i.id = 'line'),
                    (i.defaults = {
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0,
                        borderJoinStyle: 'miter',
                        borderWidth: 3,
                        capBezierPoints: !0,
                        cubicInterpolationMode: 'default',
                        fill: !1,
                        spanGaps: !1,
                        stepped: !1,
                        tension: 0,
                    }),
                    (i.defaultRoutes = {
                        backgroundColor: 'backgroundColor',
                        borderColor: 'borderColor',
                    }),
                    (i.descriptors = {
                        _scriptable: !0,
                        _indexable: (e) => 'borderDash' !== e && 'fill' !== e,
                    }),
                    i
                );
            })();
            function Os(i, e, t, n) {
                const s = i.options,
                    { [t]: o } = i.getProps([t], n);
                return Math.abs(e - o) < s.radius + s.hitRadius;
            }
            let Bl = (() => {
                class i extends at {
                    constructor(t) {
                        super(),
                            (this.options = void 0),
                            (this.parsed = void 0),
                            (this.skip = void 0),
                            (this.stop = void 0),
                            t && Object.assign(this, t);
                    }
                    inRange(t, n, s) {
                        const o = this.options,
                            { x: r, y: a } = this.getProps(['x', 'y'], s);
                        return (
                            Math.pow(t - r, 2) + Math.pow(n - a, 2) <
                            Math.pow(o.hitRadius + o.radius, 2)
                        );
                    }
                    inXRange(t, n) {
                        return Os(this, t, 'x', n);
                    }
                    inYRange(t, n) {
                        return Os(this, t, 'y', n);
                    }
                    getCenterPoint(t) {
                        const { x: n, y: s } = this.getProps(['x', 'y'], t);
                        return { x: n, y: s };
                    }
                    size(t) {
                        let n = (t = t || this.options || {}).radius || 0;
                        return (
                            (n = Math.max(n, (n && t.hoverRadius) || 0)),
                            2 * (n + ((n && t.borderWidth) || 0))
                        );
                    }
                    draw(t, n) {
                        const s = this.options;
                        this.skip ||
                            s.radius < 0.1 ||
                            !ie(this, n, this.size(s) / 2) ||
                            ((t.strokeStyle = s.borderColor),
                            (t.lineWidth = s.borderWidth),
                            (t.fillStyle = s.backgroundColor),
                            Oe(t, s, this.x, this.y));
                    }
                    getRange() {
                        const t = this.options || {};
                        return t.radius + t.hitRadius;
                    }
                }
                return (
                    (i.id = 'point'),
                    (i.defaults = {
                        borderWidth: 1,
                        hitRadius: 1,
                        hoverBorderWidth: 1,
                        hoverRadius: 4,
                        pointStyle: 'circle',
                        radius: 3,
                        rotation: 0,
                    }),
                    (i.defaultRoutes = {
                        backgroundColor: 'backgroundColor',
                        borderColor: 'borderColor',
                    }),
                    i
                );
            })();
            function Ls(i, e) {
                const {
                    x: t,
                    y: n,
                    base: s,
                    width: o,
                    height: r,
                } = i.getProps(['x', 'y', 'base', 'width', 'height'], e);
                let a, l, c, h, d;
                return (
                    i.horizontal
                        ? ((d = r / 2),
                          (a = Math.min(t, s)),
                          (l = Math.max(t, s)),
                          (c = n - d),
                          (h = n + d))
                        : ((d = o / 2),
                          (a = t - d),
                          (l = t + d),
                          (c = Math.min(n, s)),
                          (h = Math.max(n, s))),
                    { left: a, top: c, right: l, bottom: h }
                );
            }
            function Pt(i, e, t, n) {
                return i ? 0 : X(e, t, n);
            }
            function Ai(i, e, t, n) {
                const s = null === e,
                    o = null === t,
                    a = i && !(s && o) && Ls(i, n);
                return (
                    a &&
                    (s || ut(e, a.left, a.right)) &&
                    (o || ut(t, a.top, a.bottom))
                );
            }
            function jl(i, e) {
                i.rect(e.x, e.y, e.w, e.h);
            }
            function Oi(i, e, t = {}) {
                const n = i.x !== t.x ? -e : 0,
                    s = i.y !== t.y ? -e : 0;
                return {
                    x: i.x + n,
                    y: i.y + s,
                    w: i.w + ((i.x + i.w !== t.x + t.w ? e : 0) - n),
                    h: i.h + ((i.y + i.h !== t.y + t.h ? e : 0) - s),
                    radius: i.radius,
                };
            }
            class Xe extends at {
                constructor(e) {
                    super(),
                        (this.options = void 0),
                        (this.horizontal = void 0),
                        (this.base = void 0),
                        (this.width = void 0),
                        (this.height = void 0),
                        (this.inflateAmount = void 0),
                        e && Object.assign(this, e);
                }
                draw(e) {
                    const {
                            inflateAmount: t,
                            options: { borderColor: n, backgroundColor: s },
                        } = this,
                        { inner: o, outer: r } = (function Nl(i) {
                            const e = Ls(i),
                                t = e.right - e.left,
                                n = e.bottom - e.top,
                                s = (function Vl(i, e, t) {
                                    const s = i.borderSkipped,
                                        o = mn(i.options.borderWidth);
                                    return {
                                        t: Pt(s.top, o.top, 0, t),
                                        r: Pt(s.right, o.right, 0, e),
                                        b: Pt(s.bottom, o.bottom, 0, t),
                                        l: Pt(s.left, o.left, 0, e),
                                    };
                                })(i, t / 2, n / 2),
                                o = (function Wl(i, e, t) {
                                    const { enableBorderRadius: n } =
                                            i.getProps(['enableBorderRadius']),
                                        s = i.options.borderRadius,
                                        o = Ot(s),
                                        r = Math.min(e, t),
                                        a = i.borderSkipped,
                                        l = n || A(s);
                                    return {
                                        topLeft: Pt(
                                            !l || a.top || a.left,
                                            o.topLeft,
                                            0,
                                            r
                                        ),
                                        topRight: Pt(
                                            !l || a.top || a.right,
                                            o.topRight,
                                            0,
                                            r
                                        ),
                                        bottomLeft: Pt(
                                            !l || a.bottom || a.left,
                                            o.bottomLeft,
                                            0,
                                            r
                                        ),
                                        bottomRight: Pt(
                                            !l || a.bottom || a.right,
                                            o.bottomRight,
                                            0,
                                            r
                                        ),
                                    };
                                })(i, t / 2, n / 2);
                            return {
                                outer: {
                                    x: e.left,
                                    y: e.top,
                                    w: t,
                                    h: n,
                                    radius: o,
                                },
                                inner: {
                                    x: e.left + s.l,
                                    y: e.top + s.t,
                                    w: t - s.l - s.r,
                                    h: n - s.t - s.b,
                                    radius: {
                                        topLeft: Math.max(
                                            0,
                                            o.topLeft - Math.max(s.t, s.l)
                                        ),
                                        topRight: Math.max(
                                            0,
                                            o.topRight - Math.max(s.t, s.r)
                                        ),
                                        bottomLeft: Math.max(
                                            0,
                                            o.bottomLeft - Math.max(s.b, s.l)
                                        ),
                                        bottomRight: Math.max(
                                            0,
                                            o.bottomRight - Math.max(s.b, s.r)
                                        ),
                                    },
                                },
                            };
                        })(this),
                        a = (function Hl(i) {
                            return (
                                i.topLeft ||
                                i.topRight ||
                                i.bottomLeft ||
                                i.bottomRight
                            );
                        })(r.radius)
                            ? ne
                            : jl;
                    e.save(),
                        (r.w !== o.w || r.h !== o.h) &&
                            (e.beginPath(),
                            a(e, Oi(r, t, o)),
                            e.clip(),
                            a(e, Oi(o, -t, r)),
                            (e.fillStyle = n),
                            e.fill('evenodd')),
                        e.beginPath(),
                        a(e, Oi(o, t)),
                        (e.fillStyle = s),
                        e.fill(),
                        e.restore();
                }
                inRange(e, t, n) {
                    return Ai(this, e, t, n);
                }
                inXRange(e, t) {
                    return Ai(this, e, null, t);
                }
                inYRange(e, t) {
                    return Ai(this, null, e, t);
                }
                getCenterPoint(e) {
                    const {
                        x: t,
                        y: n,
                        base: s,
                        horizontal: o,
                    } = this.getProps(['x', 'y', 'base', 'horizontal'], e);
                    return { x: o ? (t + s) / 2 : t, y: o ? n : (n + s) / 2 };
                }
                getRange(e) {
                    return 'x' === e ? this.width / 2 : this.height / 2;
                }
            }
            (Xe.id = 'bar'),
                (Xe.defaults = {
                    borderSkipped: 'start',
                    borderWidth: 0,
                    borderRadius: 0,
                    inflateAmount: 'auto',
                    pointStyle: void 0,
                }),
                (Xe.defaultRoutes = {
                    backgroundColor: 'backgroundColor',
                    borderColor: 'borderColor',
                });
            var $l = Object.freeze({
                __proto__: null,
                ArcElement: Ye,
                LineElement: Ue,
                PointElement: Bl,
                BarElement: Xe,
            });
            function Ts(i) {
                if (i._decimated) {
                    const e = i._data;
                    delete i._decimated,
                        delete i._data,
                        Object.defineProperty(i, 'data', { value: e });
                }
            }
            function Rs(i) {
                i.data.datasets.forEach((e) => {
                    Ts(e);
                });
            }
            var Kl = {
                id: 'decimation',
                defaults: { algorithm: 'min-max', enabled: !1 },
                beforeElementsUpdate: (i, e, t) => {
                    if (!t.enabled) return void Rs(i);
                    const n = i.width;
                    i.data.datasets.forEach((s, o) => {
                        const { _data: r, indexAxis: a } = s,
                            l = i.getDatasetMeta(o),
                            c = r || s.data;
                        if (
                            'y' === se([a, i.options.indexAxis]) ||
                            !l.controller.supportsDecimation
                        )
                            return;
                        const h = i.scales[l.xAxisID];
                        if (
                            ('linear' !== h.type && 'time' !== h.type) ||
                            i.options.parsing
                        )
                            return;
                        let g,
                            { start: d, count: u } = (function Xl(i, e) {
                                const t = e.length;
                                let s,
                                    n = 0;
                                const { iScale: o } = i,
                                    {
                                        min: r,
                                        max: a,
                                        minDefined: l,
                                        maxDefined: c,
                                    } = o.getUserBounds();
                                return (
                                    l && (n = X(gt(e, o.axis, r).lo, 0, t - 1)),
                                    (s = c
                                        ? X(gt(e, o.axis, a).hi + 1, n, t) - n
                                        : t - n),
                                    { start: n, count: s }
                                );
                            })(l, c);
                        if (u <= (t.threshold || 4 * n)) Ts(s);
                        else {
                            switch (
                                (R(r) &&
                                    ((s._data = c),
                                    delete s.data,
                                    Object.defineProperty(s, 'data', {
                                        configurable: !0,
                                        enumerable: !0,
                                        get: function () {
                                            return this._decimated;
                                        },
                                        set: function (p) {
                                            this._data = p;
                                        },
                                    })),
                                t.algorithm)
                            ) {
                                case 'lttb':
                                    g = (function Yl(i, e, t, n, s) {
                                        const o = s.samples || n;
                                        if (o >= t) return i.slice(e, e + t);
                                        const r = [],
                                            a = (t - 2) / (o - 2);
                                        let l = 0;
                                        const c = e + t - 1;
                                        let d,
                                            u,
                                            f,
                                            g,
                                            p,
                                            h = e;
                                        for (
                                            r[l++] = i[h], d = 0;
                                            d < o - 2;
                                            d++
                                        ) {
                                            let x,
                                                m = 0,
                                                b = 0;
                                            const v =
                                                    Math.floor((d + 1) * a) +
                                                    1 +
                                                    e,
                                                y =
                                                    Math.min(
                                                        Math.floor(
                                                            (d + 2) * a
                                                        ) + 1,
                                                        t
                                                    ) + e,
                                                _ = y - v;
                                            for (x = v; x < y; x++)
                                                (m += i[x].x), (b += i[x].y);
                                            (m /= _), (b /= _);
                                            const M = Math.floor(d * a) + 1 + e,
                                                w =
                                                    Math.min(
                                                        Math.floor(
                                                            (d + 1) * a
                                                        ) + 1,
                                                        t
                                                    ) + e,
                                                { x: k, y: S } = i[h];
                                            for (f = g = -1, x = M; x < w; x++)
                                                (g =
                                                    0.5 *
                                                    Math.abs(
                                                        (k - m) * (i[x].y - S) -
                                                            (k - i[x].x) *
                                                                (b - S)
                                                    )),
                                                    g > f &&
                                                        ((f = g),
                                                        (u = i[x]),
                                                        (p = x));
                                            (r[l++] = u), (h = p);
                                        }
                                        return (r[l++] = i[c]), r;
                                    })(c, d, u, n, t);
                                    break;
                                case 'min-max':
                                    g = (function Ul(i, e, t, n) {
                                        let r,
                                            a,
                                            l,
                                            c,
                                            h,
                                            d,
                                            u,
                                            f,
                                            g,
                                            p,
                                            s = 0,
                                            o = 0;
                                        const m = [],
                                            x = i[e].x,
                                            y = i[e + t - 1].x - x;
                                        for (r = e; r < e + t; ++r) {
                                            (a = i[r]),
                                                (l = ((a.x - x) / y) * n),
                                                (c = a.y);
                                            const _ = 0 | l;
                                            if (_ === h)
                                                c < g
                                                    ? ((g = c), (d = r))
                                                    : c > p &&
                                                      ((p = c), (u = r)),
                                                    (s = (o * s + a.x) / ++o);
                                            else {
                                                const M = r - 1;
                                                if (!R(d) && !R(u)) {
                                                    const w = Math.min(d, u),
                                                        k = Math.max(d, u);
                                                    w !== f &&
                                                        w !== M &&
                                                        m.push(
                                                            Ui(Yi({}, i[w]), {
                                                                x: s,
                                                            })
                                                        ),
                                                        k !== f &&
                                                            k !== M &&
                                                            m.push(
                                                                Ui(
                                                                    Yi(
                                                                        {},
                                                                        i[k]
                                                                    ),
                                                                    { x: s }
                                                                )
                                                            );
                                                }
                                                r > 0 &&
                                                    M !== f &&
                                                    m.push(i[M]),
                                                    m.push(a),
                                                    (h = _),
                                                    (o = 0),
                                                    (g = p = c),
                                                    (d = u = f = r);
                                            }
                                        }
                                        return m;
                                    })(c, d, u, n);
                                    break;
                                default:
                                    throw new Error(
                                        `Unsupported decimation algorithm '${t.algorithm}'`
                                    );
                            }
                            s._decimated = g;
                        }
                    });
                },
                destroy(i) {
                    Rs(i);
                },
            };
            function Li(i, e, t, n) {
                if (n) return;
                let s = e[i],
                    o = t[i];
                return (
                    'angle' === i && ((s = tt(s)), (o = tt(o))),
                    { property: i, start: s, end: o }
                );
            }
            function Ti(i, e, t) {
                for (; e > i; e--) {
                    const n = t[e];
                    if (!isNaN(n.x) && !isNaN(n.y)) break;
                }
                return e;
            }
            function Es(i, e, t, n) {
                return i && e ? n(i[t], e[t]) : i ? i[t] : e ? e[t] : 0;
            }
            function Fs(i, e) {
                let t = [],
                    n = !1;
                return (
                    V(i)
                        ? ((n = !0), (t = i))
                        : (t = (function ql(i, e) {
                              const { x: t = null, y: n = null } = i || {},
                                  s = e.points,
                                  o = [];
                              return (
                                  e.segments.forEach(({ start: r, end: a }) => {
                                      a = Ti(r, a, s);
                                      const l = s[r],
                                          c = s[a];
                                      null !== n
                                          ? (o.push({ x: l.x, y: n }),
                                            o.push({ x: c.x, y: n }))
                                          : null !== t &&
                                            (o.push({ x: t, y: l.y }),
                                            o.push({ x: t, y: c.y }));
                                  }),
                                  o
                              );
                          })(i, e)),
                    t.length
                        ? new Ue({
                              points: t,
                              options: { tension: 0 },
                              _loop: n,
                              _fullLoop: n,
                          })
                        : null
                );
            }
            function Gl(i, e, t) {
                let s = i[e].fill;
                const o = [e];
                let r;
                if (!t) return s;
                for (; !1 !== s && -1 === o.indexOf(s); ) {
                    if (!j(s)) return s;
                    if (((r = i[s]), !r)) return !1;
                    if (r.visible) return s;
                    o.push(s), (s = r.fill);
                }
                return !1;
            }
            function Jl(i, e, t) {
                const n = (function ic(i) {
                    const e = i.options,
                        t = e.fill;
                    let n = C(t && t.target, t);
                    return (
                        void 0 === n && (n = !!e.backgroundColor),
                        !1 !== n && null !== n && (!0 === n ? 'origin' : n)
                    );
                })(i);
                if (A(n)) return !isNaN(n.value) && n;
                let s = parseFloat(n);
                return j(s) && Math.floor(s) === s
                    ? (function Ql(i, e, t, n) {
                          return (
                              ('-' === i || '+' === i) && (t = e + t),
                              !(t === e || t < 0 || t >= n) && t
                          );
                      })(n[0], e, s, t)
                    : ['origin', 'start', 'end', 'stack', 'shape'].indexOf(n) >=
                          0 && n;
            }
            function oc(i, e, t) {
                const n = [];
                for (let s = 0; s < t.length; s++) {
                    const o = t[s],
                        { first: r, last: a, point: l } = rc(o, e, 'x');
                    if (!(!l || (r && a)))
                        if (r) n.unshift(l);
                        else if ((i.push(l), !a)) break;
                }
                i.push(...n);
            }
            function rc(i, e, t) {
                const n = i.interpolate(e, t);
                if (!n) return {};
                const s = n[t],
                    o = i.segments,
                    r = i.points;
                let a = !1,
                    l = !1;
                for (let c = 0; c < o.length; c++) {
                    const h = o[c],
                        d = r[h.start][t],
                        u = r[h.end][t];
                    if (ut(s, d, u)) {
                        (a = s === d), (l = s === u);
                        break;
                    }
                }
                return { first: a, last: l, point: n };
            }
            class Is {
                constructor(e) {
                    (this.x = e.x), (this.y = e.y), (this.radius = e.radius);
                }
                pathSegment(e, t, n) {
                    const { x: s, y: o, radius: r } = this;
                    return (
                        e.arc(
                            s,
                            o,
                            r,
                            (t = t || { start: 0, end: z }).end,
                            t.start,
                            !0
                        ),
                        !n.bounds
                    );
                }
                interpolate(e) {
                    const { x: t, y: n, radius: s } = this,
                        o = e.angle;
                    return {
                        x: t + Math.cos(o) * s,
                        y: n + Math.sin(o) * s,
                        angle: o,
                    };
                }
            }
            function Ri(i, e, t) {
                const n = (function ac(i) {
                        const { chart: e, fill: t, line: n } = i;
                        if (j(t))
                            return (function lc(i, e) {
                                const t = i.getDatasetMeta(e);
                                return t && i.isDatasetVisible(e)
                                    ? t.dataset
                                    : null;
                            })(e, t);
                        if ('stack' === t)
                            return (function nc(i) {
                                const { scale: e, index: t, line: n } = i,
                                    s = [],
                                    o = n.segments,
                                    r = n.points,
                                    a = (function sc(i, e) {
                                        const t = [],
                                            n =
                                                i.getMatchingVisibleMetas(
                                                    'line'
                                                );
                                        for (let s = 0; s < n.length; s++) {
                                            const o = n[s];
                                            if (o.index === e) break;
                                            o.hidden || t.unshift(o.dataset);
                                        }
                                        return t;
                                    })(e, t);
                                a.push(Fs({ x: null, y: e.bottom }, n));
                                for (let l = 0; l < o.length; l++) {
                                    const c = o[l];
                                    for (let h = c.start; h <= c.end; h++)
                                        oc(s, r[h], a);
                                }
                                return new Ue({ points: s, options: {} });
                            })(i);
                        if ('shape' === t) return !0;
                        const s = (function cc(i) {
                            return (i.scale || {}).getPointPositionForValue
                                ? (function dc(i) {
                                      const { scale: e, fill: t } = i,
                                          n = e.options,
                                          s = e.getLabels().length,
                                          o = n.reverse ? e.max : e.min,
                                          r = (function ec(i, e, t) {
                                              let n;
                                              return (
                                                  (n =
                                                      'start' === i
                                                          ? t
                                                          : 'end' === i
                                                          ? e.options.reverse
                                                              ? e.min
                                                              : e.max
                                                          : A(i)
                                                          ? i.value
                                                          : e.getBaseValue()),
                                                  n
                                              );
                                          })(t, e, o),
                                          a = [];
                                      if (n.grid.circular) {
                                          const l = e.getPointPositionForValue(
                                              0,
                                              o
                                          );
                                          return new Is({
                                              x: l.x,
                                              y: l.y,
                                              radius: e.getDistanceFromCenterForValue(
                                                  r
                                              ),
                                          });
                                      }
                                      for (let l = 0; l < s; ++l)
                                          a.push(
                                              e.getPointPositionForValue(l, r)
                                          );
                                      return a;
                                  })(i)
                                : (function hc(i) {
                                      const { scale: e = {}, fill: t } = i,
                                          n = (function tc(i, e) {
                                              let t = null;
                                              return (
                                                  'start' === i
                                                      ? (t = e.bottom)
                                                      : 'end' === i
                                                      ? (t = e.top)
                                                      : A(i)
                                                      ? (t = e.getPixelForValue(
                                                            i.value
                                                        ))
                                                      : e.getBasePixel &&
                                                        (t = e.getBasePixel()),
                                                  t
                                              );
                                          })(t, e);
                                      if (j(n)) {
                                          const s = e.isHorizontal();
                                          return {
                                              x: s ? n : null,
                                              y: s ? null : n,
                                          };
                                      }
                                      return null;
                                  })(i);
                        })(i);
                        return s instanceof Is ? s : Fs(s, n);
                    })(e),
                    { line: s, scale: o, axis: r } = e,
                    a = s.options,
                    l = a.fill,
                    c = a.backgroundColor,
                    { above: h = c, below: d = c } = l || {};
                n &&
                    s.points.length &&
                    (Le(i, t),
                    (function uc(i, e) {
                        const {
                                line: t,
                                target: n,
                                above: s,
                                below: o,
                                area: r,
                                scale: a,
                            } = e,
                            l = t._loop ? 'angle' : e.axis;
                        i.save(),
                            'x' === l &&
                                o !== s &&
                                (zs(i, n, r.top),
                                Bs(i, {
                                    line: t,
                                    target: n,
                                    color: s,
                                    scale: a,
                                    property: l,
                                }),
                                i.restore(),
                                i.save(),
                                zs(i, n, r.bottom)),
                            Bs(i, {
                                line: t,
                                target: n,
                                color: o,
                                scale: a,
                                property: l,
                            }),
                            i.restore();
                    })(i, {
                        line: s,
                        target: n,
                        above: h,
                        below: d,
                        area: t,
                        scale: o,
                        axis: r,
                    }),
                    Te(i));
            }
            function zs(i, e, t) {
                const { segments: n, points: s } = e;
                let o = !0,
                    r = !1;
                i.beginPath();
                for (const a of n) {
                    const { start: l, end: c } = a,
                        h = s[l],
                        d = s[Ti(l, c, s)];
                    o
                        ? (i.moveTo(h.x, h.y), (o = !1))
                        : (i.lineTo(h.x, t), i.lineTo(h.x, h.y)),
                        (r = !!e.pathSegment(i, a, { move: r })),
                        r ? i.closePath() : i.lineTo(d.x, t);
                }
                i.lineTo(e.first().x, t), i.closePath(), i.clip();
            }
            function Bs(i, e) {
                const {
                        line: t,
                        target: n,
                        property: s,
                        color: o,
                        scale: r,
                    } = e,
                    a = (function Zl(i, e, t) {
                        const n = i.segments,
                            s = i.points,
                            o = e.points,
                            r = [];
                        for (const a of n) {
                            let { start: l, end: c } = a;
                            c = Ti(l, c, s);
                            const h = Li(t, s[l], s[c], a.loop);
                            if (!e.segments) {
                                r.push({
                                    source: a,
                                    target: h,
                                    start: s[l],
                                    end: s[c],
                                });
                                continue;
                            }
                            const d = zn(e, h);
                            for (const u of d) {
                                const f = Li(t, o[u.start], o[u.end], u.loop),
                                    g = In(a, s, f);
                                for (const p of g)
                                    r.push({
                                        source: p,
                                        target: u,
                                        start: {
                                            [t]: Es(h, f, 'start', Math.max),
                                        },
                                        end: { [t]: Es(h, f, 'end', Math.min) },
                                    });
                            }
                        }
                        return r;
                    })(t, n, s);
                for (const { source: l, target: c, start: h, end: d } of a) {
                    const { style: { backgroundColor: u = o } = {} } = l,
                        f = !0 !== n;
                    i.save(),
                        (i.fillStyle = u),
                        fc(i, r, f && Li(s, h, d)),
                        i.beginPath();
                    const g = !!t.pathSegment(i, l);
                    let p;
                    if (f) {
                        g ? i.closePath() : Vs(i, n, d, s);
                        const m = !!n.pathSegment(i, c, {
                            move: g,
                            reverse: !0,
                        });
                        (p = g && m), p || Vs(i, n, h, s);
                    }
                    i.closePath(),
                        i.fill(p ? 'evenodd' : 'nonzero'),
                        i.restore();
                }
            }
            function fc(i, e, t) {
                const { top: n, bottom: s } = e.chart.chartArea,
                    { property: o, start: r, end: a } = t || {};
                'x' === o &&
                    (i.beginPath(), i.rect(r, n, a - r, s - n), i.clip());
            }
            function Vs(i, e, t, n) {
                const s = e.interpolate(t, n);
                s && i.lineTo(s.x, s.y);
            }
            var gc = {
                id: 'filler',
                afterDatasetsUpdate(i, e, t) {
                    const n = (i.data.datasets || []).length,
                        s = [];
                    let o, r, a, l;
                    for (r = 0; r < n; ++r)
                        (o = i.getDatasetMeta(r)),
                            (a = o.dataset),
                            (l = null),
                            a &&
                                a.options &&
                                a instanceof Ue &&
                                (l = {
                                    visible: i.isDatasetVisible(r),
                                    index: r,
                                    fill: Jl(a, r, n),
                                    chart: i,
                                    axis: o.controller.options.indexAxis,
                                    scale: o.vScale,
                                    line: a,
                                }),
                            (o.$filler = l),
                            s.push(l);
                    for (r = 0; r < n; ++r)
                        (l = s[r]),
                            l &&
                                !1 !== l.fill &&
                                (l.fill = Gl(s, r, t.propagate));
                },
                beforeDraw(i, e, t) {
                    const n = 'beforeDraw' === t.drawTime,
                        s = i.getSortedVisibleDatasetMetas(),
                        o = i.chartArea;
                    for (let r = s.length - 1; r >= 0; --r) {
                        const a = s[r].$filler;
                        !a ||
                            (a.line.updateControlPoints(o, a.axis),
                            n && Ri(i.ctx, a, o));
                    }
                },
                beforeDatasetsDraw(i, e, t) {
                    if ('beforeDatasetsDraw' !== t.drawTime) return;
                    const n = i.getSortedVisibleDatasetMetas();
                    for (let s = n.length - 1; s >= 0; --s) {
                        const o = n[s].$filler;
                        o && Ri(i.ctx, o, i.chartArea);
                    }
                },
                beforeDatasetDraw(i, e, t) {
                    const n = e.meta.$filler;
                    !n ||
                        !1 === n.fill ||
                        'beforeDatasetDraw' !== t.drawTime ||
                        Ri(i.ctx, n, i.chartArea);
                },
                defaults: { propagate: !0, drawTime: 'beforeDatasetDraw' },
            };
            const Ws = (i, e) => {
                let { boxHeight: t = e, boxWidth: n = e } = i;
                return (
                    i.usePointStyle &&
                        ((t = Math.min(t, e)), (n = Math.min(n, e))),
                    { boxWidth: n, boxHeight: t, itemHeight: Math.max(e, t) }
                );
            };
            class Ns extends at {
                constructor(e) {
                    super(),
                        (this._added = !1),
                        (this.legendHitBoxes = []),
                        (this._hoveredItem = null),
                        (this.doughnutMode = !1),
                        (this.chart = e.chart),
                        (this.options = e.options),
                        (this.ctx = e.ctx),
                        (this.legendItems = void 0),
                        (this.columnSizes = void 0),
                        (this.lineWidths = void 0),
                        (this.maxHeight = void 0),
                        (this.maxWidth = void 0),
                        (this.top = void 0),
                        (this.bottom = void 0),
                        (this.left = void 0),
                        (this.right = void 0),
                        (this.height = void 0),
                        (this.width = void 0),
                        (this._margins = void 0),
                        (this.position = void 0),
                        (this.weight = void 0),
                        (this.fullSize = void 0);
                }
                update(e, t, n) {
                    (this.maxWidth = e),
                        (this.maxHeight = t),
                        (this._margins = n),
                        this.setDimensions(),
                        this.buildLabels(),
                        this.fit();
                }
                setDimensions() {
                    this.isHorizontal()
                        ? ((this.width = this.maxWidth),
                          (this.left = this._margins.left),
                          (this.right = this.width))
                        : ((this.height = this.maxHeight),
                          (this.top = this._margins.top),
                          (this.bottom = this.height));
                }
                buildLabels() {
                    const e = this.options.labels || {};
                    let t = W(e.generateLabels, [this.chart], this) || [];
                    e.filter &&
                        (t = t.filter((n) => e.filter(n, this.chart.data))),
                        e.sort &&
                            (t = t.sort((n, s) =>
                                e.sort(n, s, this.chart.data)
                            )),
                        this.options.reverse && t.reverse(),
                        (this.legendItems = t);
                }
                fit() {
                    const { options: e, ctx: t } = this;
                    if (!e.display) return void (this.width = this.height = 0);
                    const n = e.labels,
                        s = U(n.font),
                        o = s.size,
                        r = this._computeTitleHeight(),
                        { boxWidth: a, itemHeight: l } = Ws(n, o);
                    let c, h;
                    (t.font = s.string),
                        this.isHorizontal()
                            ? ((c = this.maxWidth),
                              (h = this._fitRows(r, o, a, l) + 10))
                            : ((h = this.maxHeight),
                              (c = this._fitCols(r, o, a, l) + 10)),
                        (this.width = Math.min(c, e.maxWidth || this.maxWidth)),
                        (this.height = Math.min(
                            h,
                            e.maxHeight || this.maxHeight
                        ));
                }
                _fitRows(e, t, n, s) {
                    const {
                            ctx: o,
                            maxWidth: r,
                            options: {
                                labels: { padding: a },
                            },
                        } = this,
                        l = (this.legendHitBoxes = []),
                        c = (this.lineWidths = [0]),
                        h = s + a;
                    let d = e;
                    (o.textAlign = 'left'), (o.textBaseline = 'middle');
                    let u = -1,
                        f = -h;
                    return (
                        this.legendItems.forEach((g, p) => {
                            const m = n + t / 2 + o.measureText(g.text).width;
                            (0 === p || c[c.length - 1] + m + 2 * a > r) &&
                                ((d += h),
                                (c[c.length - (p > 0 ? 0 : 1)] = 0),
                                (f += h),
                                u++),
                                (l[p] = {
                                    left: 0,
                                    top: f,
                                    row: u,
                                    width: m,
                                    height: s,
                                }),
                                (c[c.length - 1] += m + a);
                        }),
                        d
                    );
                }
                _fitCols(e, t, n, s) {
                    const {
                            ctx: o,
                            maxHeight: r,
                            options: {
                                labels: { padding: a },
                            },
                        } = this,
                        l = (this.legendHitBoxes = []),
                        c = (this.columnSizes = []),
                        h = r - e;
                    let d = a,
                        u = 0,
                        f = 0,
                        g = 0,
                        p = 0;
                    return (
                        this.legendItems.forEach((m, b) => {
                            const x = n + t / 2 + o.measureText(m.text).width;
                            b > 0 &&
                                f + s + 2 * a > h &&
                                ((d += u + a),
                                c.push({ width: u, height: f }),
                                (g += u + a),
                                p++,
                                (u = f = 0)),
                                (l[b] = {
                                    left: g,
                                    top: f,
                                    col: p,
                                    width: x,
                                    height: s,
                                }),
                                (u = Math.max(u, x)),
                                (f += s + a);
                        }),
                        (d += u),
                        c.push({ width: u, height: f }),
                        d
                    );
                }
                adjustHitBoxes() {
                    if (!this.options.display) return;
                    const e = this._computeTitleHeight(),
                        {
                            legendHitBoxes: t,
                            options: {
                                align: n,
                                labels: { padding: s },
                                rtl: o,
                            },
                        } = this,
                        r = Nt(o, this.left, this.width);
                    if (this.isHorizontal()) {
                        let a = 0,
                            l = K(
                                n,
                                this.left + s,
                                this.right - this.lineWidths[a]
                            );
                        for (const c of t)
                            a !== c.row &&
                                ((a = c.row),
                                (l = K(
                                    n,
                                    this.left + s,
                                    this.right - this.lineWidths[a]
                                ))),
                                (c.top += this.top + e + s),
                                (c.left = r.leftForLtr(r.x(l), c.width)),
                                (l += c.width + s);
                    } else {
                        let a = 0,
                            l = K(
                                n,
                                this.top + e + s,
                                this.bottom - this.columnSizes[a].height
                            );
                        for (const c of t)
                            c.col !== a &&
                                ((a = c.col),
                                (l = K(
                                    n,
                                    this.top + e + s,
                                    this.bottom - this.columnSizes[a].height
                                ))),
                                (c.top = l),
                                (c.left += this.left + s),
                                (c.left = r.leftForLtr(r.x(c.left), c.width)),
                                (l += c.height + s);
                    }
                }
                isHorizontal() {
                    return (
                        'top' === this.options.position ||
                        'bottom' === this.options.position
                    );
                }
                draw() {
                    if (this.options.display) {
                        const e = this.ctx;
                        Le(e, this), this._draw(), Te(e);
                    }
                }
                _draw() {
                    const {
                            options: e,
                            columnSizes: t,
                            lineWidths: n,
                            ctx: s,
                        } = this,
                        { align: o, labels: r } = e,
                        a = O.color,
                        l = Nt(e.rtl, this.left, this.width),
                        c = U(r.font),
                        { color: h, padding: d } = r,
                        u = c.size,
                        f = u / 2;
                    let g;
                    this.drawTitle(),
                        (s.textAlign = l.textAlign('left')),
                        (s.textBaseline = 'middle'),
                        (s.lineWidth = 0.5),
                        (s.font = c.string);
                    const {
                            boxWidth: p,
                            boxHeight: m,
                            itemHeight: b,
                        } = Ws(r, u),
                        y = this.isHorizontal(),
                        _ = this._computeTitleHeight();
                    (g = y
                        ? {
                              x: K(o, this.left + d, this.right - n[0]),
                              y: this.top + d + _,
                              line: 0,
                          }
                        : {
                              x: this.left + d,
                              y: K(
                                  o,
                                  this.top + _ + d,
                                  this.bottom - t[0].height
                              ),
                              line: 0,
                          }),
                        Tn(this.ctx, e.textDirection);
                    const M = b + d;
                    this.legendItems.forEach((w, k) => {
                        (s.strokeStyle = w.fontColor || h),
                            (s.fillStyle = w.fontColor || h);
                        const S = s.measureText(w.text).width,
                            F = l.textAlign(
                                w.textAlign || (w.textAlign = r.textAlign)
                            ),
                            L = p + f + S;
                        let T = g.x,
                            $ = g.y;
                        l.setWidth(this.width),
                            y
                                ? k > 0 &&
                                  T + L + d > this.right &&
                                  (($ = g.y += M),
                                  g.line++,
                                  (T = g.x =
                                      K(
                                          o,
                                          this.left + d,
                                          this.right - n[g.line]
                                      )))
                                : k > 0 &&
                                  $ + M > this.bottom &&
                                  ((T = g.x = T + t[g.line].width + d),
                                  g.line++,
                                  ($ = g.y =
                                      K(
                                          o,
                                          this.top + _ + d,
                                          this.bottom - t[g.line].height
                                      ))),
                            (function (w, k, S) {
                                if (isNaN(p) || p <= 0 || isNaN(m) || m < 0)
                                    return;
                                s.save();
                                const F = C(S.lineWidth, 1);
                                if (
                                    ((s.fillStyle = C(S.fillStyle, a)),
                                    (s.lineCap = C(S.lineCap, 'butt')),
                                    (s.lineDashOffset = C(S.lineDashOffset, 0)),
                                    (s.lineJoin = C(S.lineJoin, 'miter')),
                                    (s.lineWidth = F),
                                    (s.strokeStyle = C(S.strokeStyle, a)),
                                    s.setLineDash(C(S.lineDash, [])),
                                    r.usePointStyle)
                                ) {
                                    const L = {
                                            radius: (p * Math.SQRT2) / 2,
                                            pointStyle: S.pointStyle,
                                            rotation: S.rotation,
                                            borderWidth: F,
                                        },
                                        T = l.xPlus(w, p / 2);
                                    Oe(s, L, T, k + f);
                                } else {
                                    const L = k + Math.max((u - m) / 2, 0),
                                        T = l.leftForLtr(w, p),
                                        $ = Ot(S.borderRadius);
                                    s.beginPath(),
                                        Object.values($).some((J) => 0 !== J)
                                            ? ne(s, {
                                                  x: T,
                                                  y: L,
                                                  w: p,
                                                  h: m,
                                                  radius: $,
                                              })
                                            : s.rect(T, L, p, m),
                                        s.fill(),
                                        0 !== F && s.stroke();
                                }
                                s.restore();
                            })(l.x(T), $, w),
                            (T = ((i, e, t, n) =>
                                i === (n ? 'left' : 'right')
                                    ? t
                                    : 'center' === i
                                    ? (e + t) / 2
                                    : e)(
                                F,
                                T + p + f,
                                y ? T + L : this.right,
                                e.rtl
                            )),
                            (function (w, k, S) {
                                At(s, S.text, w, k + b / 2, c, {
                                    strikethrough: S.hidden,
                                    textAlign: l.textAlign(S.textAlign),
                                });
                            })(l.x(T), $, w),
                            y ? (g.x += L + d) : (g.y += M);
                    }),
                        Rn(this.ctx, e.textDirection);
                }
                drawTitle() {
                    const e = this.options,
                        t = e.title,
                        n = U(t.font),
                        s = q(t.padding);
                    if (!t.display) return;
                    const o = Nt(e.rtl, this.left, this.width),
                        r = this.ctx,
                        a = t.position,
                        c = s.top + n.size / 2;
                    let h,
                        d = this.left,
                        u = this.width;
                    if (this.isHorizontal())
                        (u = Math.max(...this.lineWidths)),
                            (h = this.top + c),
                            (d = K(e.align, d, this.right - u));
                    else {
                        const g = this.columnSizes.reduce(
                            (p, m) => Math.max(p, m.height),
                            0
                        );
                        h =
                            c +
                            K(
                                e.align,
                                this.top,
                                this.bottom -
                                    g -
                                    e.labels.padding -
                                    this._computeTitleHeight()
                            );
                    }
                    const f = K(a, d, d + u);
                    (r.textAlign = o.textAlign(Yt(a))),
                        (r.textBaseline = 'middle'),
                        (r.strokeStyle = t.color),
                        (r.fillStyle = t.color),
                        (r.font = n.string),
                        At(r, t.text, f, h, n);
                }
                _computeTitleHeight() {
                    const e = this.options.title,
                        t = U(e.font),
                        n = q(e.padding);
                    return e.display ? t.lineHeight + n.height : 0;
                }
                _getLegendItemAt(e, t) {
                    let n, s, o;
                    if (
                        ut(e, this.left, this.right) &&
                        ut(t, this.top, this.bottom)
                    )
                        for (o = this.legendHitBoxes, n = 0; n < o.length; ++n)
                            if (
                                ((s = o[n]),
                                ut(e, s.left, s.left + s.width) &&
                                    ut(t, s.top, s.top + s.height))
                            )
                                return this.legendItems[n];
                    return null;
                }
                handleEvent(e) {
                    const t = this.options;
                    if (
                        !(function mc(i, e) {
                            return !(
                                (('mousemove' !== i && 'mouseout' !== i) ||
                                    (!e.onHover && !e.onLeave)) &&
                                (!e.onClick ||
                                    ('click' !== i && 'mouseup' !== i))
                            );
                        })(e.type, t)
                    )
                        return;
                    const n = this._getLegendItemAt(e.x, e.y);
                    if ('mousemove' === e.type || 'mouseout' === e.type) {
                        const s = this._hoveredItem,
                            o = ((i, e) =>
                                null !== i &&
                                null !== e &&
                                i.datasetIndex === e.datasetIndex &&
                                i.index === e.index)(s, n);
                        s && !o && W(t.onLeave, [e, s, this], this),
                            (this._hoveredItem = n),
                            n && !o && W(t.onHover, [e, n, this], this);
                    } else n && W(t.onClick, [e, n, this], this);
                }
            }
            var bc = {
                id: 'legend',
                _element: Ns,
                start(i, e, t) {
                    const n = (i.legend = new Ns({
                        ctx: i.ctx,
                        options: t,
                        chart: i,
                    }));
                    G.configure(i, n, t), G.addBox(i, n);
                },
                stop(i) {
                    G.removeBox(i, i.legend), delete i.legend;
                },
                beforeUpdate(i, e, t) {
                    const n = i.legend;
                    G.configure(i, n, t), (n.options = t);
                },
                afterUpdate(i) {
                    const e = i.legend;
                    e.buildLabels(), e.adjustHitBoxes();
                },
                afterEvent(i, e) {
                    e.replay || i.legend.handleEvent(e.event);
                },
                defaults: {
                    display: !0,
                    position: 'top',
                    align: 'center',
                    fullSize: !0,
                    reverse: !1,
                    weight: 1e3,
                    onClick(i, e, t) {
                        const n = e.datasetIndex,
                            s = t.chart;
                        s.isDatasetVisible(n)
                            ? (s.hide(n), (e.hidden = !0))
                            : (s.show(n), (e.hidden = !1));
                    },
                    onHover: null,
                    onLeave: null,
                    labels: {
                        color: (i) => i.chart.options.color,
                        boxWidth: 40,
                        padding: 10,
                        generateLabels(i) {
                            const e = i.data.datasets,
                                {
                                    labels: {
                                        usePointStyle: t,
                                        pointStyle: n,
                                        textAlign: s,
                                        color: o,
                                    },
                                } = i.legend.options;
                            return i._getSortedDatasetMetas().map((r) => {
                                const a = r.controller.getStyle(t ? 0 : void 0),
                                    l = q(a.borderWidth);
                                return {
                                    text: e[r.index].label,
                                    fillStyle: a.backgroundColor,
                                    fontColor: o,
                                    hidden: !r.visible,
                                    lineCap: a.borderCapStyle,
                                    lineDash: a.borderDash,
                                    lineDashOffset: a.borderDashOffset,
                                    lineJoin: a.borderJoinStyle,
                                    lineWidth: (l.width + l.height) / 4,
                                    strokeStyle: a.borderColor,
                                    pointStyle: n || a.pointStyle,
                                    rotation: a.rotation,
                                    textAlign: s || a.textAlign,
                                    borderRadius: 0,
                                    datasetIndex: r.index,
                                };
                            }, this);
                        },
                    },
                    title: {
                        color: (i) => i.chart.options.color,
                        display: !1,
                        position: 'center',
                        text: '',
                    },
                },
                descriptors: {
                    _scriptable: (i) => !i.startsWith('on'),
                    labels: {
                        _scriptable: (i) =>
                            !['generateLabels', 'filter', 'sort'].includes(i),
                    },
                },
            };
            class Ei extends at {
                constructor(e) {
                    super(),
                        (this.chart = e.chart),
                        (this.options = e.options),
                        (this.ctx = e.ctx),
                        (this._padding = void 0),
                        (this.top = void 0),
                        (this.bottom = void 0),
                        (this.left = void 0),
                        (this.right = void 0),
                        (this.width = void 0),
                        (this.height = void 0),
                        (this.position = void 0),
                        (this.weight = void 0),
                        (this.fullSize = void 0);
                }
                update(e, t) {
                    const n = this.options;
                    if (((this.left = 0), (this.top = 0), !n.display))
                        return void (this.width =
                            this.height =
                            this.right =
                            this.bottom =
                                0);
                    (this.width = this.right = e),
                        (this.height = this.bottom = t);
                    const s = V(n.text) ? n.text.length : 1;
                    this._padding = q(n.padding);
                    const o = s * U(n.font).lineHeight + this._padding.height;
                    this.isHorizontal() ? (this.height = o) : (this.width = o);
                }
                isHorizontal() {
                    const e = this.options.position;
                    return 'top' === e || 'bottom' === e;
                }
                _drawArgs(e) {
                    const {
                            top: t,
                            left: n,
                            bottom: s,
                            right: o,
                            options: r,
                        } = this,
                        a = r.align;
                    let c,
                        h,
                        d,
                        l = 0;
                    return (
                        this.isHorizontal()
                            ? ((h = K(a, n, o)), (d = t + e), (c = o - n))
                            : ('left' === r.position
                                  ? ((h = n + e),
                                    (d = K(a, s, t)),
                                    (l = -0.5 * N))
                                  : ((h = o - e),
                                    (d = K(a, t, s)),
                                    (l = 0.5 * N)),
                              (c = s - t)),
                        { titleX: h, titleY: d, maxWidth: c, rotation: l }
                    );
                }
                draw() {
                    const e = this.ctx,
                        t = this.options;
                    if (!t.display) return;
                    const n = U(t.font),
                        o = n.lineHeight / 2 + this._padding.top,
                        {
                            titleX: r,
                            titleY: a,
                            maxWidth: l,
                            rotation: c,
                        } = this._drawArgs(o);
                    At(e, t.text, 0, 0, n, {
                        color: t.color,
                        maxWidth: l,
                        rotation: c,
                        textAlign: Yt(t.align),
                        textBaseline: 'middle',
                        translation: [r, a],
                    });
                }
            }
            var _c = {
                id: 'title',
                _element: Ei,
                start(i, e, t) {
                    !(function xc(i, e) {
                        const t = new Ei({ ctx: i.ctx, options: e, chart: i });
                        G.configure(i, t, e),
                            G.addBox(i, t),
                            (i.titleBlock = t);
                    })(i, t);
                },
                stop(i) {
                    G.removeBox(i, i.titleBlock), delete i.titleBlock;
                },
                beforeUpdate(i, e, t) {
                    const n = i.titleBlock;
                    G.configure(i, n, t), (n.options = t);
                },
                defaults: {
                    align: 'center',
                    display: !1,
                    font: { weight: 'bold' },
                    fullSize: !0,
                    padding: 10,
                    position: 'top',
                    text: '',
                    weight: 2e3,
                },
                defaultRoutes: { color: 'color' },
                descriptors: { _scriptable: !0, _indexable: !1 },
            };
            const Ke = new WeakMap();
            var yc = {
                id: 'subtitle',
                start(i, e, t) {
                    const n = new Ei({ ctx: i.ctx, options: t, chart: i });
                    G.configure(i, n, t), G.addBox(i, n), Ke.set(i, n);
                },
                stop(i) {
                    G.removeBox(i, Ke.get(i)), Ke.delete(i);
                },
                beforeUpdate(i, e, t) {
                    const n = Ke.get(i);
                    G.configure(i, n, t), (n.options = t);
                },
                defaults: {
                    align: 'center',
                    display: !1,
                    font: { weight: 'normal' },
                    fullSize: !0,
                    padding: 0,
                    position: 'top',
                    text: '',
                    weight: 1500,
                },
                defaultRoutes: { color: 'color' },
                descriptors: { _scriptable: !0, _indexable: !1 },
            };
            const ge = {
                average(i) {
                    if (!i.length) return !1;
                    let e,
                        t,
                        n = 0,
                        s = 0,
                        o = 0;
                    for (e = 0, t = i.length; e < t; ++e) {
                        const r = i[e].element;
                        if (r && r.hasValue()) {
                            const a = r.tooltipPosition();
                            (n += a.x), (s += a.y), ++o;
                        }
                    }
                    return { x: n / o, y: s / o };
                },
                nearest(i, e) {
                    if (!i.length) return !1;
                    let o,
                        r,
                        a,
                        t = e.x,
                        n = e.y,
                        s = Number.POSITIVE_INFINITY;
                    for (o = 0, r = i.length; o < r; ++o) {
                        const l = i[o].element;
                        if (l && l.hasValue()) {
                            const h = ni(e, l.getCenterPoint());
                            h < s && ((s = h), (a = l));
                        }
                    }
                    if (a) {
                        const l = a.tooltipPosition();
                        (t = l.x), (n = l.y);
                    }
                    return { x: t, y: n };
                },
            };
            function ct(i, e) {
                return (
                    e && (V(e) ? Array.prototype.push.apply(i, e) : i.push(e)),
                    i
                );
            }
            function xt(i) {
                return ('string' == typeof i || i instanceof String) &&
                    i.indexOf('\n') > -1
                    ? i.split('\n')
                    : i;
            }
            function vc(i, e) {
                const { element: t, datasetIndex: n, index: s } = e,
                    o = i.getDatasetMeta(n).controller,
                    { label: r, value: a } = o.getLabelAndValue(s);
                return {
                    chart: i,
                    label: r,
                    parsed: o.getParsed(s),
                    raw: i.data.datasets[n].data[s],
                    formattedValue: a,
                    dataset: o.getDataset(),
                    dataIndex: s,
                    datasetIndex: n,
                    element: t,
                };
            }
            function Hs(i, e) {
                const t = i.chart.ctx,
                    { body: n, footer: s, title: o } = i,
                    { boxWidth: r, boxHeight: a } = e,
                    l = U(e.bodyFont),
                    c = U(e.titleFont),
                    h = U(e.footerFont),
                    d = o.length,
                    u = s.length,
                    f = n.length,
                    g = q(e.padding);
                let p = g.height,
                    m = 0,
                    b = n.reduce(
                        (y, _) =>
                            y +
                            _.before.length +
                            _.lines.length +
                            _.after.length,
                        0
                    );
                (b += i.beforeBody.length + i.afterBody.length),
                    d &&
                        (p +=
                            d * c.lineHeight +
                            (d - 1) * e.titleSpacing +
                            e.titleMarginBottom),
                    b &&
                        (p +=
                            f *
                                (e.displayColors
                                    ? Math.max(a, l.lineHeight)
                                    : l.lineHeight) +
                            (b - f) * l.lineHeight +
                            (b - 1) * e.bodySpacing),
                    u &&
                        (p +=
                            e.footerMarginTop +
                            u * h.lineHeight +
                            (u - 1) * e.footerSpacing);
                let x = 0;
                const v = function (y) {
                    m = Math.max(m, t.measureText(y).width + x);
                };
                return (
                    t.save(),
                    (t.font = c.string),
                    E(i.title, v),
                    (t.font = l.string),
                    E(i.beforeBody.concat(i.afterBody), v),
                    (x = e.displayColors ? r + 2 + e.boxPadding : 0),
                    E(n, (y) => {
                        E(y.before, v), E(y.lines, v), E(y.after, v);
                    }),
                    (x = 0),
                    (t.font = h.string),
                    E(i.footer, v),
                    t.restore(),
                    (m += g.width),
                    { width: m, height: p }
                );
            }
            function kc(i, e, t, n) {
                const { x: s, width: o } = t,
                    {
                        width: r,
                        chartArea: { left: a, right: l },
                    } = i;
                let c = 'center';
                return (
                    'center' === n
                        ? (c = s <= (a + l) / 2 ? 'left' : 'right')
                        : s <= o / 2
                        ? (c = 'left')
                        : s >= r - o / 2 && (c = 'right'),
                    (function wc(i, e, t, n) {
                        const { x: s, width: o } = n,
                            r = t.caretSize + t.caretPadding;
                        if (
                            ('left' === i && s + o + r > e.width) ||
                            ('right' === i && s - o - r < 0)
                        )
                            return !0;
                    })(c, i, e, t) && (c = 'center'),
                    c
                );
            }
            function js(i, e, t) {
                const n =
                    t.yAlign ||
                    e.yAlign ||
                    (function Mc(i, e) {
                        const { y: t, height: n } = e;
                        return t < n / 2
                            ? 'top'
                            : t > i.height - n / 2
                            ? 'bottom'
                            : 'center';
                    })(i, t);
                return {
                    xAlign: t.xAlign || e.xAlign || kc(i, e, t, n),
                    yAlign: n,
                };
            }
            function $s(i, e, t, n) {
                const { caretSize: s, caretPadding: o, cornerRadius: r } = i,
                    { xAlign: a, yAlign: l } = t,
                    c = s + o,
                    {
                        topLeft: h,
                        topRight: d,
                        bottomLeft: u,
                        bottomRight: f,
                    } = Ot(r);
                let g = (function Sc(i, e) {
                    let { x: t, width: n } = i;
                    return (
                        'right' === e
                            ? (t -= n)
                            : 'center' === e && (t -= n / 2),
                        t
                    );
                })(e, a);
                const p = (function Pc(i, e, t) {
                    let { y: n, height: s } = i;
                    return (
                        'top' === e
                            ? (n += t)
                            : (n -= 'bottom' === e ? s + t : s / 2),
                        n
                    );
                })(e, l, c);
                return (
                    'center' === l
                        ? 'left' === a
                            ? (g += c)
                            : 'right' === a && (g -= c)
                        : 'left' === a
                        ? (g -= Math.max(h, u) + s)
                        : 'right' === a && (g += Math.max(d, f) + s),
                    {
                        x: X(g, 0, n.width - e.width),
                        y: X(p, 0, n.height - e.height),
                    }
                );
            }
            function Ze(i, e, t) {
                const n = q(t.padding);
                return 'center' === e
                    ? i.x + i.width / 2
                    : 'right' === e
                    ? i.x + i.width - n.right
                    : i.x + n.left;
            }
            function Ys(i) {
                return ct([], xt(i));
            }
            function Us(i, e) {
                const t =
                    e &&
                    e.dataset &&
                    e.dataset.tooltip &&
                    e.dataset.tooltip.callbacks;
                return t ? i.override(t) : i;
            }
            let Xs = (() => {
                class i extends at {
                    constructor(t) {
                        super(),
                            (this.opacity = 0),
                            (this._active = []),
                            (this._eventPosition = void 0),
                            (this._size = void 0),
                            (this._cachedAnimations = void 0),
                            (this._tooltipItems = []),
                            (this.$animations = void 0),
                            (this.$context = void 0),
                            (this.chart = t.chart || t._chart),
                            (this._chart = this.chart),
                            (this.options = t.options),
                            (this.dataPoints = void 0),
                            (this.title = void 0),
                            (this.beforeBody = void 0),
                            (this.body = void 0),
                            (this.afterBody = void 0),
                            (this.footer = void 0),
                            (this.xAlign = void 0),
                            (this.yAlign = void 0),
                            (this.x = void 0),
                            (this.y = void 0),
                            (this.height = void 0),
                            (this.width = void 0),
                            (this.caretX = void 0),
                            (this.caretY = void 0),
                            (this.labelColors = void 0),
                            (this.labelPointStyles = void 0),
                            (this.labelTextColors = void 0);
                    }
                    initialize(t) {
                        (this.options = t),
                            (this._cachedAnimations = void 0),
                            (this.$context = void 0);
                    }
                    _resolveAnimations() {
                        const t = this._cachedAnimations;
                        if (t) return t;
                        const n = this.chart,
                            s = this.options.setContext(this.getContext()),
                            o =
                                s.enabled &&
                                n.options.animation &&
                                s.animations,
                            r = new Nn(this.chart, o);
                        return (
                            o._cacheable &&
                                (this._cachedAnimations = Object.freeze(r)),
                            r
                        );
                    }
                    getContext() {
                        return (
                            this.$context ||
                            (this.$context = (function Cc(i, e, t) {
                                return kt(i, {
                                    tooltip: e,
                                    tooltipItems: t,
                                    type: 'tooltip',
                                });
                            })(
                                this.chart.getContext(),
                                this,
                                this._tooltipItems
                            ))
                        );
                    }
                    getTitle(t, n) {
                        const { callbacks: s } = n,
                            o = s.beforeTitle.apply(this, [t]),
                            r = s.title.apply(this, [t]),
                            a = s.afterTitle.apply(this, [t]);
                        let l = [];
                        return (
                            (l = ct(l, xt(o))),
                            (l = ct(l, xt(r))),
                            (l = ct(l, xt(a))),
                            l
                        );
                    }
                    getBeforeBody(t, n) {
                        return Ys(n.callbacks.beforeBody.apply(this, [t]));
                    }
                    getBody(t, n) {
                        const { callbacks: s } = n,
                            o = [];
                        return (
                            E(t, (r) => {
                                const a = { before: [], lines: [], after: [] },
                                    l = Us(s, r);
                                ct(a.before, xt(l.beforeLabel.call(this, r))),
                                    ct(a.lines, l.label.call(this, r)),
                                    ct(a.after, xt(l.afterLabel.call(this, r))),
                                    o.push(a);
                            }),
                            o
                        );
                    }
                    getAfterBody(t, n) {
                        return Ys(n.callbacks.afterBody.apply(this, [t]));
                    }
                    getFooter(t, n) {
                        const { callbacks: s } = n,
                            o = s.beforeFooter.apply(this, [t]),
                            r = s.footer.apply(this, [t]),
                            a = s.afterFooter.apply(this, [t]);
                        let l = [];
                        return (
                            (l = ct(l, xt(o))),
                            (l = ct(l, xt(r))),
                            (l = ct(l, xt(a))),
                            l
                        );
                    }
                    _createItems(t) {
                        const n = this._active,
                            s = this.chart.data,
                            o = [],
                            r = [],
                            a = [];
                        let c,
                            h,
                            l = [];
                        for (c = 0, h = n.length; c < h; ++c)
                            l.push(vc(this.chart, n[c]));
                        return (
                            t.filter &&
                                (l = l.filter((d, u, f) =>
                                    t.filter(d, u, f, s)
                                )),
                            t.itemSort &&
                                (l = l.sort((d, u) => t.itemSort(d, u, s))),
                            E(l, (d) => {
                                const u = Us(t.callbacks, d);
                                o.push(u.labelColor.call(this, d)),
                                    r.push(u.labelPointStyle.call(this, d)),
                                    a.push(u.labelTextColor.call(this, d));
                            }),
                            (this.labelColors = o),
                            (this.labelPointStyles = r),
                            (this.labelTextColors = a),
                            (this.dataPoints = l),
                            l
                        );
                    }
                    update(t, n) {
                        const s = this.options.setContext(this.getContext()),
                            o = this._active;
                        let r,
                            a = [];
                        if (o.length) {
                            const l = ge[s.position].call(
                                this,
                                o,
                                this._eventPosition
                            );
                            (a = this._createItems(s)),
                                (this.title = this.getTitle(a, s)),
                                (this.beforeBody = this.getBeforeBody(a, s)),
                                (this.body = this.getBody(a, s)),
                                (this.afterBody = this.getAfterBody(a, s)),
                                (this.footer = this.getFooter(a, s));
                            const c = (this._size = Hs(this, s)),
                                h = Object.assign({}, l, c),
                                d = js(this.chart, s, h),
                                u = $s(s, h, d, this.chart);
                            (this.xAlign = d.xAlign),
                                (this.yAlign = d.yAlign),
                                (r = {
                                    opacity: 1,
                                    x: u.x,
                                    y: u.y,
                                    width: c.width,
                                    height: c.height,
                                    caretX: l.x,
                                    caretY: l.y,
                                });
                        } else 0 !== this.opacity && (r = { opacity: 0 });
                        (this._tooltipItems = a),
                            (this.$context = void 0),
                            r && this._resolveAnimations().update(this, r),
                            t &&
                                s.external &&
                                s.external.call(this, {
                                    chart: this.chart,
                                    tooltip: this,
                                    replay: n,
                                });
                    }
                    drawCaret(t, n, s, o) {
                        const r = this.getCaretPosition(t, s, o);
                        n.lineTo(r.x1, r.y1),
                            n.lineTo(r.x2, r.y2),
                            n.lineTo(r.x3, r.y3);
                    }
                    getCaretPosition(t, n, s) {
                        const { xAlign: o, yAlign: r } = this,
                            { caretSize: a, cornerRadius: l } = s,
                            {
                                topLeft: c,
                                topRight: h,
                                bottomLeft: d,
                                bottomRight: u,
                            } = Ot(l),
                            { x: f, y: g } = t,
                            { width: p, height: m } = n;
                        let b, x, v, y, _, M;
                        return (
                            'center' === r
                                ? ((_ = g + m / 2),
                                  'left' === o
                                      ? ((b = f),
                                        (x = b - a),
                                        (y = _ + a),
                                        (M = _ - a))
                                      : ((b = f + p),
                                        (x = b + a),
                                        (y = _ - a),
                                        (M = _ + a)),
                                  (v = b))
                                : ((x =
                                      'left' === o
                                          ? f + Math.max(c, d) + a
                                          : 'right' === o
                                          ? f + p - Math.max(h, u) - a
                                          : this.caretX),
                                  'top' === r
                                      ? ((y = g),
                                        (_ = y - a),
                                        (b = x - a),
                                        (v = x + a))
                                      : ((y = g + m),
                                        (_ = y + a),
                                        (b = x + a),
                                        (v = x - a)),
                                  (M = y)),
                            { x1: b, x2: x, x3: v, y1: y, y2: _, y3: M }
                        );
                    }
                    drawTitle(t, n, s) {
                        const o = this.title,
                            r = o.length;
                        let a, l, c;
                        if (r) {
                            const h = Nt(s.rtl, this.x, this.width);
                            for (
                                t.x = Ze(this, s.titleAlign, s),
                                    n.textAlign = h.textAlign(s.titleAlign),
                                    n.textBaseline = 'middle',
                                    a = U(s.titleFont),
                                    l = s.titleSpacing,
                                    n.fillStyle = s.titleColor,
                                    n.font = a.string,
                                    c = 0;
                                c < r;
                                ++c
                            )
                                n.fillText(
                                    o[c],
                                    h.x(t.x),
                                    t.y + a.lineHeight / 2
                                ),
                                    (t.y += a.lineHeight + l),
                                    c + 1 === r &&
                                        (t.y += s.titleMarginBottom - l);
                        }
                    }
                    _drawColorBox(t, n, s, o, r) {
                        const a = this.labelColors[s],
                            l = this.labelPointStyles[s],
                            { boxHeight: c, boxWidth: h, boxPadding: d } = r,
                            u = U(r.bodyFont),
                            f = Ze(this, 'left', r),
                            g = o.x(f),
                            m =
                                n.y +
                                (c < u.lineHeight ? (u.lineHeight - c) / 2 : 0);
                        if (r.usePointStyle) {
                            const b = {
                                    radius: Math.min(h, c) / 2,
                                    pointStyle: l.pointStyle,
                                    rotation: l.rotation,
                                    borderWidth: 1,
                                },
                                x = o.leftForLtr(g, h) + h / 2,
                                v = m + c / 2;
                            (t.strokeStyle = r.multiKeyBackground),
                                (t.fillStyle = r.multiKeyBackground),
                                Oe(t, b, x, v),
                                (t.strokeStyle = a.borderColor),
                                (t.fillStyle = a.backgroundColor),
                                Oe(t, b, x, v);
                        } else {
                            (t.lineWidth = a.borderWidth || 1),
                                (t.strokeStyle = a.borderColor),
                                t.setLineDash(a.borderDash || []),
                                (t.lineDashOffset = a.borderDashOffset || 0);
                            const b = o.leftForLtr(g, h - d),
                                x = o.leftForLtr(o.xPlus(g, 1), h - d - 2),
                                v = Ot(a.borderRadius);
                            Object.values(v).some((y) => 0 !== y)
                                ? (t.beginPath(),
                                  (t.fillStyle = r.multiKeyBackground),
                                  ne(t, { x: b, y: m, w: h, h: c, radius: v }),
                                  t.fill(),
                                  t.stroke(),
                                  (t.fillStyle = a.backgroundColor),
                                  t.beginPath(),
                                  ne(t, {
                                      x,
                                      y: m + 1,
                                      w: h - 2,
                                      h: c - 2,
                                      radius: v,
                                  }),
                                  t.fill())
                                : ((t.fillStyle = r.multiKeyBackground),
                                  t.fillRect(b, m, h, c),
                                  t.strokeRect(b, m, h, c),
                                  (t.fillStyle = a.backgroundColor),
                                  t.fillRect(x, m + 1, h - 2, c - 2));
                        }
                        t.fillStyle = this.labelTextColors[s];
                    }
                    drawBody(t, n, s) {
                        const { body: o } = this,
                            {
                                bodySpacing: r,
                                bodyAlign: a,
                                displayColors: l,
                                boxHeight: c,
                                boxWidth: h,
                                boxPadding: d,
                            } = s,
                            u = U(s.bodyFont);
                        let f = u.lineHeight,
                            g = 0;
                        const p = Nt(s.rtl, this.x, this.width),
                            m = function (S) {
                                n.fillText(S, p.x(t.x + g), t.y + f / 2),
                                    (t.y += f + r);
                            },
                            b = p.textAlign(a);
                        let x, v, y, _, M, w, k;
                        for (
                            n.textAlign = a,
                                n.textBaseline = 'middle',
                                n.font = u.string,
                                t.x = Ze(this, b, s),
                                n.fillStyle = s.bodyColor,
                                E(this.beforeBody, m),
                                g =
                                    l && 'right' !== b
                                        ? 'center' === a
                                            ? h / 2 + d
                                            : h + 2 + d
                                        : 0,
                                _ = 0,
                                w = o.length;
                            _ < w;
                            ++_
                        ) {
                            for (
                                x = o[_],
                                    v = this.labelTextColors[_],
                                    n.fillStyle = v,
                                    E(x.before, m),
                                    y = x.lines,
                                    l &&
                                        y.length &&
                                        (this._drawColorBox(n, t, _, p, s),
                                        (f = Math.max(u.lineHeight, c))),
                                    M = 0,
                                    k = y.length;
                                M < k;
                                ++M
                            )
                                m(y[M]), (f = u.lineHeight);
                            E(x.after, m);
                        }
                        (g = 0),
                            (f = u.lineHeight),
                            E(this.afterBody, m),
                            (t.y -= r);
                    }
                    drawFooter(t, n, s) {
                        const o = this.footer,
                            r = o.length;
                        let a, l;
                        if (r) {
                            const c = Nt(s.rtl, this.x, this.width);
                            for (
                                t.x = Ze(this, s.footerAlign, s),
                                    t.y += s.footerMarginTop,
                                    n.textAlign = c.textAlign(s.footerAlign),
                                    n.textBaseline = 'middle',
                                    a = U(s.footerFont),
                                    n.fillStyle = s.footerColor,
                                    n.font = a.string,
                                    l = 0;
                                l < r;
                                ++l
                            )
                                n.fillText(
                                    o[l],
                                    c.x(t.x),
                                    t.y + a.lineHeight / 2
                                ),
                                    (t.y += a.lineHeight + s.footerSpacing);
                        }
                    }
                    drawBackground(t, n, s, o) {
                        const { xAlign: r, yAlign: a } = this,
                            { x: l, y: c } = t,
                            { width: h, height: d } = s,
                            {
                                topLeft: u,
                                topRight: f,
                                bottomLeft: g,
                                bottomRight: p,
                            } = Ot(o.cornerRadius);
                        (n.fillStyle = o.backgroundColor),
                            (n.strokeStyle = o.borderColor),
                            (n.lineWidth = o.borderWidth),
                            n.beginPath(),
                            n.moveTo(l + u, c),
                            'top' === a && this.drawCaret(t, n, s, o),
                            n.lineTo(l + h - f, c),
                            n.quadraticCurveTo(l + h, c, l + h, c + f),
                            'center' === a &&
                                'right' === r &&
                                this.drawCaret(t, n, s, o),
                            n.lineTo(l + h, c + d - p),
                            n.quadraticCurveTo(l + h, c + d, l + h - p, c + d),
                            'bottom' === a && this.drawCaret(t, n, s, o),
                            n.lineTo(l + g, c + d),
                            n.quadraticCurveTo(l, c + d, l, c + d - g),
                            'center' === a &&
                                'left' === r &&
                                this.drawCaret(t, n, s, o),
                            n.lineTo(l, c + u),
                            n.quadraticCurveTo(l, c, l + u, c),
                            n.closePath(),
                            n.fill(),
                            o.borderWidth > 0 && n.stroke();
                    }
                    _updateAnimationTarget(t) {
                        const n = this.chart,
                            s = this.$animations,
                            o = s && s.x,
                            r = s && s.y;
                        if (o || r) {
                            const a = ge[t.position].call(
                                this,
                                this._active,
                                this._eventPosition
                            );
                            if (!a) return;
                            const l = (this._size = Hs(this, t)),
                                c = Object.assign({}, a, this._size),
                                h = js(n, t, c),
                                d = $s(t, c, h, n);
                            (o._to !== d.x || r._to !== d.y) &&
                                ((this.xAlign = h.xAlign),
                                (this.yAlign = h.yAlign),
                                (this.width = l.width),
                                (this.height = l.height),
                                (this.caretX = a.x),
                                (this.caretY = a.y),
                                this._resolveAnimations().update(this, d));
                        }
                    }
                    _willRender() {
                        return !!this.opacity;
                    }
                    draw(t) {
                        const n = this.options.setContext(this.getContext());
                        let s = this.opacity;
                        if (!s) return;
                        this._updateAnimationTarget(n);
                        const o = { width: this.width, height: this.height },
                            r = { x: this.x, y: this.y };
                        s = Math.abs(s) < 0.001 ? 0 : s;
                        const a = q(n.padding);
                        n.enabled &&
                            (this.title.length ||
                                this.beforeBody.length ||
                                this.body.length ||
                                this.afterBody.length ||
                                this.footer.length) &&
                            (t.save(),
                            (t.globalAlpha = s),
                            this.drawBackground(r, t, o, n),
                            Tn(t, n.textDirection),
                            (r.y += a.top),
                            this.drawTitle(r, t, n),
                            this.drawBody(r, t, n),
                            this.drawFooter(r, t, n),
                            Rn(t, n.textDirection),
                            t.restore());
                    }
                    getActiveElements() {
                        return this._active || [];
                    }
                    setActiveElements(t, n) {
                        const s = this._active,
                            o = t.map(({ datasetIndex: l, index: c }) => {
                                const h = this.chart.getDatasetMeta(l);
                                if (!h)
                                    throw new Error(
                                        'Cannot find a dataset at index ' + l
                                    );
                                return {
                                    datasetIndex: l,
                                    element: h.data[c],
                                    index: c,
                                };
                            }),
                            r = !ve(s, o),
                            a = this._positionChanged(o, n);
                        (r || a) &&
                            ((this._active = o),
                            (this._eventPosition = n),
                            (this._ignoreReplayEvents = !0),
                            this.update(!0));
                    }
                    handleEvent(t, n, s = !0) {
                        if (n && this._ignoreReplayEvents) return !1;
                        this._ignoreReplayEvents = !1;
                        const o = this.options,
                            r = this._active || [],
                            a = this._getActiveElements(t, r, n, s),
                            l = this._positionChanged(a, t),
                            c = n || !ve(a, r) || l;
                        return (
                            c &&
                                ((this._active = a),
                                (o.enabled || o.external) &&
                                    ((this._eventPosition = { x: t.x, y: t.y }),
                                    this.update(!0, n))),
                            c
                        );
                    }
                    _getActiveElements(t, n, s, o) {
                        const r = this.options;
                        if ('mouseout' === t.type) return [];
                        if (!o) return n;
                        const a = this.chart.getElementsAtEventForMode(
                            t,
                            r.mode,
                            r,
                            s
                        );
                        return r.reverse && a.reverse(), a;
                    }
                    _positionChanged(t, n) {
                        const { caretX: s, caretY: o, options: r } = this,
                            a = ge[r.position].call(this, t, n);
                        return !1 !== a && (s !== a.x || o !== a.y);
                    }
                }
                return (i.positioners = ge), i;
            })();
            var Ac = Object.freeze({
                __proto__: null,
                Decimation: Kl,
                Filler: gc,
                Legend: bc,
                SubTitle: yc,
                Title: _c,
                Tooltip: {
                    id: 'tooltip',
                    _element: Xs,
                    positioners: ge,
                    afterInit(i, e, t) {
                        t && (i.tooltip = new Xs({ chart: i, options: t }));
                    },
                    beforeUpdate(i, e, t) {
                        i.tooltip && i.tooltip.initialize(t);
                    },
                    reset(i, e, t) {
                        i.tooltip && i.tooltip.initialize(t);
                    },
                    afterDraw(i) {
                        const e = i.tooltip;
                        if (e && e._willRender()) {
                            const t = { tooltip: e };
                            if (!1 === i.notifyPlugins('beforeTooltipDraw', t))
                                return;
                            e.draw(i.ctx),
                                i.notifyPlugins('afterTooltipDraw', t);
                        }
                    },
                    afterEvent(i, e) {
                        i.tooltip &&
                            i.tooltip.handleEvent(
                                e.event,
                                e.replay,
                                e.inChartArea
                            ) &&
                            (e.changed = !0);
                    },
                    defaults: {
                        enabled: !0,
                        external: null,
                        position: 'average',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleColor: '#fff',
                        titleFont: { weight: 'bold' },
                        titleSpacing: 2,
                        titleMarginBottom: 6,
                        titleAlign: 'left',
                        bodyColor: '#fff',
                        bodySpacing: 2,
                        bodyFont: {},
                        bodyAlign: 'left',
                        footerColor: '#fff',
                        footerSpacing: 2,
                        footerMarginTop: 6,
                        footerFont: { weight: 'bold' },
                        footerAlign: 'left',
                        padding: 6,
                        caretPadding: 2,
                        caretSize: 5,
                        cornerRadius: 6,
                        boxHeight: (i, e) => e.bodyFont.size,
                        boxWidth: (i, e) => e.bodyFont.size,
                        multiKeyBackground: '#fff',
                        displayColors: !0,
                        boxPadding: 0,
                        borderColor: 'rgba(0,0,0,0)',
                        borderWidth: 0,
                        animation: { duration: 400, easing: 'easeOutQuart' },
                        animations: {
                            numbers: {
                                type: 'number',
                                properties: [
                                    'x',
                                    'y',
                                    'width',
                                    'height',
                                    'caretX',
                                    'caretY',
                                ],
                            },
                            opacity: { easing: 'linear', duration: 200 },
                        },
                        callbacks: {
                            beforeTitle: dt,
                            title(i) {
                                if (i.length > 0) {
                                    const e = i[0],
                                        t = e.chart.data.labels,
                                        n = t ? t.length : 0;
                                    if (
                                        this &&
                                        this.options &&
                                        'dataset' === this.options.mode
                                    )
                                        return e.dataset.label || '';
                                    if (e.label) return e.label;
                                    if (n > 0 && e.dataIndex < n)
                                        return t[e.dataIndex];
                                }
                                return '';
                            },
                            afterTitle: dt,
                            beforeBody: dt,
                            beforeLabel: dt,
                            label(i) {
                                if (
                                    this &&
                                    this.options &&
                                    'dataset' === this.options.mode
                                )
                                    return (
                                        i.label + ': ' + i.formattedValue ||
                                        i.formattedValue
                                    );
                                let e = i.dataset.label || '';
                                e && (e += ': ');
                                const t = i.formattedValue;
                                return R(t) || (e += t), e;
                            },
                            labelColor(i) {
                                const t = i.chart
                                    .getDatasetMeta(i.datasetIndex)
                                    .controller.getStyle(i.dataIndex);
                                return {
                                    borderColor: t.borderColor,
                                    backgroundColor: t.backgroundColor,
                                    borderWidth: t.borderWidth,
                                    borderDash: t.borderDash,
                                    borderDashOffset: t.borderDashOffset,
                                    borderRadius: 0,
                                };
                            },
                            labelTextColor() {
                                return this.options.bodyColor;
                            },
                            labelPointStyle(i) {
                                const t = i.chart
                                    .getDatasetMeta(i.datasetIndex)
                                    .controller.getStyle(i.dataIndex);
                                return {
                                    pointStyle: t.pointStyle,
                                    rotation: t.rotation,
                                };
                            },
                            afterLabel: dt,
                            afterBody: dt,
                            beforeFooter: dt,
                            footer: dt,
                            afterFooter: dt,
                        },
                    },
                    defaultRoutes: {
                        bodyFont: 'font',
                        footerFont: 'font',
                        titleFont: 'font',
                    },
                    descriptors: {
                        _scriptable: (i) =>
                            'filter' !== i &&
                            'itemSort' !== i &&
                            'external' !== i,
                        _indexable: !1,
                        callbacks: { _scriptable: !1, _indexable: !1 },
                        animation: { _fallback: !1 },
                        animations: { _fallback: 'animation' },
                    },
                    additionalOptionScopes: ['interaction'],
                },
            });
            class qe extends Ft {
                constructor(e) {
                    super(e),
                        (this._startValue = void 0),
                        (this._valueRange = 0),
                        (this._addedLabels = []);
                }
                init(e) {
                    const t = this._addedLabels;
                    if (t.length) {
                        const n = this.getLabels();
                        for (const { index: s, label: o } of t)
                            n[s] === o && n.splice(s, 1);
                        this._addedLabels = [];
                    }
                    super.init(e);
                }
                parse(e, t) {
                    if (R(e)) return null;
                    const n = this.getLabels();
                    return ((i, e) =>
                        null === i ? null : X(Math.round(i), 0, e))(
                        (t =
                            isFinite(t) && n[t] === e
                                ? t
                                : (function Lc(i, e, t, n) {
                                      const s = i.indexOf(e);
                                      return -1 === s
                                          ? ((i, e, t, n) => (
                                                'string' == typeof e
                                                    ? ((t = i.push(e) - 1),
                                                      n.unshift({
                                                          index: t,
                                                          label: e,
                                                      }))
                                                    : isNaN(e) && (t = null),
                                                t
                                            ))(i, e, t, n)
                                          : s !== i.lastIndexOf(e)
                                          ? t
                                          : s;
                                  })(n, e, C(t, e), this._addedLabels)),
                        n.length - 1
                    );
                }
                determineDataLimits() {
                    const { minDefined: e, maxDefined: t } =
                        this.getUserBounds();
                    let { min: n, max: s } = this.getMinMax(!0);
                    'ticks' === this.options.bounds &&
                        (e || (n = 0), t || (s = this.getLabels().length - 1)),
                        (this.min = n),
                        (this.max = s);
                }
                buildTicks() {
                    const e = this.min,
                        t = this.max,
                        n = this.options.offset,
                        s = [];
                    let o = this.getLabels();
                    (o = 0 === e && t === o.length - 1 ? o : o.slice(e, t + 1)),
                        (this._valueRange = Math.max(
                            o.length - (n ? 0 : 1),
                            1
                        )),
                        (this._startValue = this.min - (n ? 0.5 : 0));
                    for (let r = e; r <= t; r++) s.push({ value: r });
                    return s;
                }
                getLabelForValue(e) {
                    const t = this.getLabels();
                    return e >= 0 && e < t.length ? t[e] : e;
                }
                configure() {
                    super.configure(),
                        this.isHorizontal() ||
                            (this._reversePixels = !this._reversePixels);
                }
                getPixelForValue(e) {
                    return (
                        'number' != typeof e && (e = this.parse(e)),
                        null === e
                            ? NaN
                            : this.getPixelForDecimal(
                                  (e - this._startValue) / this._valueRange
                              )
                    );
                }
                getPixelForTick(e) {
                    const t = this.ticks;
                    return e < 0 || e > t.length - 1
                        ? null
                        : this.getPixelForValue(t[e].value);
                }
                getValueForPixel(e) {
                    return Math.round(
                        this._startValue +
                            this.getDecimalForPixel(e) * this._valueRange
                    );
                }
                getBasePixel() {
                    return this.bottom;
                }
            }
            function Ks(i, e, { horizontal: t, minRotation: n }) {
                const s = rt(n),
                    o = (t ? Math.sin(s) : Math.cos(s)) || 0.001;
                return Math.min(e / o, 0.75 * e * ('' + i).length);
            }
            (qe.id = 'category'),
                (qe.defaults = {
                    ticks: { callback: qe.prototype.getLabelForValue },
                });
            class Ge extends Ft {
                constructor(e) {
                    super(e),
                        (this.start = void 0),
                        (this.end = void 0),
                        (this._startValue = void 0),
                        (this._endValue = void 0),
                        (this._valueRange = 0);
                }
                parse(e, t) {
                    return R(e) ||
                        (('number' == typeof e || e instanceof Number) &&
                            !isFinite(+e))
                        ? null
                        : +e;
                }
                handleTickRangeOptions() {
                    const { beginAtZero: e } = this.options,
                        { minDefined: t, maxDefined: n } = this.getUserBounds();
                    let { min: s, max: o } = this;
                    const r = (l) => (s = t ? s : l),
                        a = (l) => (o = n ? o : l);
                    if (e) {
                        const l = lt(s),
                            c = lt(o);
                        l < 0 && c < 0 ? a(0) : l > 0 && c > 0 && r(0);
                    }
                    if (s === o) {
                        let l = 1;
                        (o >= Number.MAX_SAFE_INTEGER ||
                            s <= Number.MIN_SAFE_INTEGER) &&
                            (l = Math.abs(0.05 * o)),
                            a(o + l),
                            e || r(s - l);
                    }
                    (this.min = s), (this.max = o);
                }
                getTickLimit() {
                    const e = this.options.ticks;
                    let s,
                        { maxTicksLimit: t, stepSize: n } = e;
                    return (
                        n
                            ? ((s =
                                  Math.ceil(this.max / n) -
                                  Math.floor(this.min / n) +
                                  1),
                              s > 1e3 &&
                                  (console.warn(
                                      `scales.${this.id}.ticks.stepSize: ${n} would result generating up to ${s} ticks. Limiting to 1000.`
                                  ),
                                  (s = 1e3)))
                            : ((s = this.computeTickLimit()), (t = t || 11)),
                        t && (s = Math.min(t, s)),
                        s
                    );
                }
                computeTickLimit() {
                    return Number.POSITIVE_INFINITY;
                }
                buildTicks() {
                    const e = this.options,
                        t = e.ticks;
                    let n = this.getTickLimit();
                    n = Math.max(2, n);
                    const r = (function Rc(i, e) {
                        const t = [],
                            {
                                bounds: s,
                                step: o,
                                min: r,
                                max: a,
                                precision: l,
                                count: c,
                                maxTicks: h,
                                maxDigits: d,
                                includeBounds: u,
                            } = i,
                            f = o || 1,
                            g = h - 1,
                            { min: p, max: m } = e,
                            b = !R(r),
                            x = !R(a),
                            v = !R(c),
                            y = (m - p) / (d + 1);
                        let M,
                            w,
                            k,
                            S,
                            _ = Ji((m - p) / g / f) * f;
                        if (_ < 1e-14 && !b && !x)
                            return [{ value: p }, { value: m }];
                        (S = Math.ceil(m / _) - Math.floor(p / _)),
                            S > g && (_ = Ji((S * _) / g / f) * f),
                            R(l) ||
                                ((M = Math.pow(10, l)),
                                (_ = Math.ceil(_ * M) / M)),
                            'ticks' === s
                                ? ((w = Math.floor(p / _) * _),
                                  (k = Math.ceil(m / _) * _))
                                : ((w = p), (k = m)),
                            b &&
                            x &&
                            o &&
                            (function mo(i, e) {
                                const t = Math.round(i);
                                return t - e <= i && t + e >= i;
                            })((a - r) / o, _ / 1e3)
                                ? ((S = Math.round(Math.min((a - r) / _, h))),
                                  (_ = (a - r) / S),
                                  (w = r),
                                  (k = a))
                                : v
                                ? ((w = b ? r : w),
                                  (k = x ? a : k),
                                  (S = c - 1),
                                  (_ = (k - w) / S))
                                : ((S = (k - w) / _),
                                  (S = qt(S, Math.round(S), _ / 1e3)
                                      ? Math.round(S)
                                      : Math.ceil(S)));
                        const F = Math.max(tn(_), tn(w));
                        (M = Math.pow(10, R(l) ? F : l)),
                            (w = Math.round(w * M) / M),
                            (k = Math.round(k * M) / M);
                        let L = 0;
                        for (
                            b &&
                            (u && w !== r
                                ? (t.push({ value: r }),
                                  w < r && L++,
                                  qt(
                                      Math.round((w + L * _) * M) / M,
                                      r,
                                      Ks(r, y, i)
                                  ) && L++)
                                : w < r && L++);
                            L < S;
                            ++L
                        )
                            t.push({ value: Math.round((w + L * _) * M) / M });
                        return (
                            x && u && k !== a
                                ? t.length &&
                                  qt(t[t.length - 1].value, a, Ks(a, y, i))
                                    ? (t[t.length - 1].value = a)
                                    : t.push({ value: a })
                                : (!x || k === a) && t.push({ value: k }),
                            t
                        );
                    })(
                        {
                            maxTicks: n,
                            bounds: e.bounds,
                            min: e.min,
                            max: e.max,
                            precision: t.precision,
                            step: t.stepSize,
                            count: t.count,
                            maxDigits: this._maxDigits(),
                            horizontal: this.isHorizontal(),
                            minRotation: t.minRotation || 0,
                            includeBounds: !1 !== t.includeBounds,
                        },
                        this._range || this
                    );
                    return (
                        'ticks' === e.bounds && Qi(r, this, 'value'),
                        e.reverse
                            ? (r.reverse(),
                              (this.start = this.max),
                              (this.end = this.min))
                            : ((this.start = this.min), (this.end = this.max)),
                        r
                    );
                }
                configure() {
                    const e = this.ticks;
                    let t = this.min,
                        n = this.max;
                    if ((super.configure(), this.options.offset && e.length)) {
                        const s = (n - t) / Math.max(e.length - 1, 1) / 2;
                        (t -= s), (n += s);
                    }
                    (this._startValue = t),
                        (this._endValue = n),
                        (this._valueRange = n - t);
                }
                getLabelForValue(e) {
                    return oe(
                        e,
                        this.chart.options.locale,
                        this.options.ticks.format
                    );
                }
            }
            class Fi extends Ge {
                determineDataLimits() {
                    const { min: e, max: t } = this.getMinMax(!0);
                    (this.min = j(e) ? e : 0),
                        (this.max = j(t) ? t : 1),
                        this.handleTickRangeOptions();
                }
                computeTickLimit() {
                    const e = this.isHorizontal(),
                        t = e ? this.width : this.height,
                        n = rt(this.options.ticks.minRotation),
                        s = (e ? Math.sin(n) : Math.cos(n)) || 0.001,
                        o = this._resolveTickFontOptions(0);
                    return Math.ceil(t / Math.min(40, o.lineHeight / s));
                }
                getPixelForValue(e) {
                    return null === e
                        ? NaN
                        : this.getPixelForDecimal(
                              (e - this._startValue) / this._valueRange
                          );
                }
                getValueForPixel(e) {
                    return (
                        this._startValue +
                        this.getDecimalForPixel(e) * this._valueRange
                    );
                }
            }
            function Zs(i) {
                return i / Math.pow(10, Math.floor(st(i))) == 1;
            }
            (Fi.id = 'linear'),
                (Fi.defaults = { ticks: { callback: Ve.formatters.numeric } });
            class Ii extends Ft {
                constructor(e) {
                    super(e),
                        (this.start = void 0),
                        (this.end = void 0),
                        (this._startValue = void 0),
                        (this._valueRange = 0);
                }
                parse(e, t) {
                    const n = Ge.prototype.parse.apply(this, [e, t]);
                    if (0 !== n) return j(n) && n > 0 ? n : null;
                    this._zero = !0;
                }
                determineDataLimits() {
                    const { min: e, max: t } = this.getMinMax(!0);
                    (this.min = j(e) ? Math.max(0, e) : null),
                        (this.max = j(t) ? Math.max(0, t) : null),
                        this.options.beginAtZero && (this._zero = !0),
                        this.handleTickRangeOptions();
                }
                handleTickRangeOptions() {
                    const { minDefined: e, maxDefined: t } =
                        this.getUserBounds();
                    let n = this.min,
                        s = this.max;
                    const o = (l) => (n = e ? n : l),
                        r = (l) => (s = t ? s : l),
                        a = (l, c) => Math.pow(10, Math.floor(st(l)) + c);
                    n === s &&
                        (n <= 0 ? (o(1), r(10)) : (o(a(n, -1)), r(a(s, 1)))),
                        n <= 0 && o(a(s, -1)),
                        s <= 0 && r(a(n, 1)),
                        this._zero &&
                            this.min !== this._suggestedMin &&
                            n === a(this.min, 0) &&
                            o(a(n, -1)),
                        (this.min = n),
                        (this.max = s);
                }
                buildTicks() {
                    const e = this.options,
                        n = (function Ec(i, e) {
                            const t = Math.floor(st(e.max)),
                                n = Math.ceil(e.max / Math.pow(10, t)),
                                s = [];
                            let o = it(
                                    i.min,
                                    Math.pow(10, Math.floor(st(e.min)))
                                ),
                                r = Math.floor(st(o)),
                                a = Math.floor(o / Math.pow(10, r)),
                                l = r < 0 ? Math.pow(10, Math.abs(r)) : 1;
                            do {
                                s.push({ value: o, major: Zs(o) }),
                                    ++a,
                                    10 === a &&
                                        ((a = 1), ++r, (l = r >= 0 ? 1 : l)),
                                    (o =
                                        Math.round(a * Math.pow(10, r) * l) /
                                        l);
                            } while (r < t || (r === t && a < n));
                            const c = it(i.max, o);
                            return s.push({ value: c, major: Zs(o) }), s;
                        })({ min: this._userMin, max: this._userMax }, this);
                    return (
                        'ticks' === e.bounds && Qi(n, this, 'value'),
                        e.reverse
                            ? (n.reverse(),
                              (this.start = this.max),
                              (this.end = this.min))
                            : ((this.start = this.min), (this.end = this.max)),
                        n
                    );
                }
                getLabelForValue(e) {
                    return void 0 === e
                        ? '0'
                        : oe(
                              e,
                              this.chart.options.locale,
                              this.options.ticks.format
                          );
                }
                configure() {
                    const e = this.min;
                    super.configure(),
                        (this._startValue = st(e)),
                        (this._valueRange = st(this.max) - st(e));
                }
                getPixelForValue(e) {
                    return (
                        (void 0 === e || 0 === e) && (e = this.min),
                        null === e || isNaN(e)
                            ? NaN
                            : this.getPixelForDecimal(
                                  e === this.min
                                      ? 0
                                      : (st(e) - this._startValue) /
                                            this._valueRange
                              )
                    );
                }
                getValueForPixel(e) {
                    const t = this.getDecimalForPixel(e);
                    return Math.pow(
                        10,
                        this._startValue + t * this._valueRange
                    );
                }
            }
            function zi(i) {
                const e = i.ticks;
                if (e.display && i.display) {
                    const t = q(e.backdropPadding);
                    return C(e.font && e.font.size, O.font.size) + t.height;
                }
                return 0;
            }
            function Fc(i, e, t) {
                return (
                    (t = V(t) ? t : [t]),
                    { w: jo(i, e.string, t), h: t.length * e.lineHeight }
                );
            }
            function qs(i, e, t, n, s) {
                return i === n || i === s
                    ? { start: e - t / 2, end: e + t / 2 }
                    : i < n || i > s
                    ? { start: e - t, end: e }
                    : { start: e, end: e + t };
            }
            function zc(i, e, t, n, s) {
                const o = Math.abs(Math.sin(t)),
                    r = Math.abs(Math.cos(t));
                let a = 0,
                    l = 0;
                n.start < e.l
                    ? ((a = (e.l - n.start) / o),
                      (i.l = Math.min(i.l, e.l - a)))
                    : n.end > e.r &&
                      ((a = (n.end - e.r) / o), (i.r = Math.max(i.r, e.r + a))),
                    s.start < e.t
                        ? ((l = (e.t - s.start) / r),
                          (i.t = Math.min(i.t, e.t - l)))
                        : s.end > e.b &&
                          ((l = (s.end - e.b) / r),
                          (i.b = Math.max(i.b, e.b + l)));
            }
            function Vc(i) {
                return 0 === i || 180 === i
                    ? 'center'
                    : i < 180
                    ? 'left'
                    : 'right';
            }
            function Wc(i, e, t) {
                return (
                    'right' === t ? (i -= e) : 'center' === t && (i -= e / 2), i
                );
            }
            function Nc(i, e, t) {
                return (
                    90 === t || 270 === t
                        ? (i -= e / 2)
                        : (t > 270 || t < 90) && (i -= e),
                    i
                );
            }
            function Gs(i, e, t, n) {
                const { ctx: s } = i;
                if (t) s.arc(i.xCenter, i.yCenter, e, 0, z);
                else {
                    let o = i.getPointPosition(0, e);
                    s.moveTo(o.x, o.y);
                    for (let r = 1; r < n; r++)
                        (o = i.getPointPosition(r, e)), s.lineTo(o.x, o.y);
                }
            }
            (Ii.id = 'logarithmic'),
                (Ii.defaults = {
                    ticks: {
                        callback: Ve.formatters.logarithmic,
                        major: { enabled: !0 },
                    },
                });
            class pe extends Ge {
                constructor(e) {
                    super(e),
                        (this.xCenter = void 0),
                        (this.yCenter = void 0),
                        (this.drawingArea = void 0),
                        (this._pointLabels = []),
                        (this._pointLabelItems = []);
                }
                setDimensions() {
                    const e = (this._padding = q(zi(this.options) / 2)),
                        t = (this.width = this.maxWidth - e.width),
                        n = (this.height = this.maxHeight - e.height);
                    (this.xCenter = Math.floor(this.left + t / 2 + e.left)),
                        (this.yCenter = Math.floor(this.top + n / 2 + e.top)),
                        (this.drawingArea = Math.floor(Math.min(t, n) / 2));
                }
                determineDataLimits() {
                    const { min: e, max: t } = this.getMinMax(!1);
                    (this.min = j(e) && !isNaN(e) ? e : 0),
                        (this.max = j(t) && !isNaN(t) ? t : 0),
                        this.handleTickRangeOptions();
                }
                computeTickLimit() {
                    return Math.ceil(this.drawingArea / zi(this.options));
                }
                generateTickLabels(e) {
                    Ge.prototype.generateTickLabels.call(this, e),
                        (this._pointLabels = this.getLabels()
                            .map((t, n) => {
                                const s = W(
                                    this.options.pointLabels.callback,
                                    [t, n],
                                    this
                                );
                                return s || 0 === s ? s : '';
                            })
                            .filter((t, n) => this.chart.getDataVisibility(n)));
                }
                fit() {
                    const e = this.options;
                    e.display && e.pointLabels.display
                        ? (function Ic(i) {
                              const e = {
                                      l: i.left + i._padding.left,
                                      r: i.right - i._padding.right,
                                      t: i.top + i._padding.top,
                                      b: i.bottom - i._padding.bottom,
                                  },
                                  t = Object.assign({}, e),
                                  n = [],
                                  s = [],
                                  o = i._pointLabels.length,
                                  r = i.options.pointLabels,
                                  a = r.centerPointLabels ? N / o : 0;
                              for (let l = 0; l < o; l++) {
                                  const c = r.setContext(
                                      i.getPointLabelContext(l)
                                  );
                                  s[l] = c.padding;
                                  const h = i.getPointPosition(
                                          l,
                                          i.drawingArea + s[l],
                                          a
                                      ),
                                      d = U(c.font),
                                      u = Fc(i.ctx, d, i._pointLabels[l]);
                                  n[l] = u;
                                  const f = tt(i.getIndexAngle(l) + a),
                                      g = Math.round(ii(f));
                                  zc(
                                      t,
                                      e,
                                      f,
                                      qs(g, h.x, u.w, 0, 180),
                                      qs(g, h.y, u.h, 90, 270)
                                  );
                              }
                              i.setCenterPoint(
                                  e.l - t.l,
                                  t.r - e.r,
                                  e.t - t.t,
                                  t.b - e.b
                              ),
                                  (i._pointLabelItems = (function Bc(i, e, t) {
                                      const n = [],
                                          s = i._pointLabels.length,
                                          o = i.options,
                                          r = zi(o) / 2,
                                          a = i.drawingArea,
                                          l = o.pointLabels.centerPointLabels
                                              ? N / s
                                              : 0;
                                      for (let c = 0; c < s; c++) {
                                          const h = i.getPointPosition(
                                                  c,
                                                  a + r + t[c],
                                                  l
                                              ),
                                              d = Math.round(
                                                  ii(tt(h.angle + H))
                                              ),
                                              u = e[c],
                                              f = Nc(h.y, u.h, d),
                                              g = Vc(d),
                                              p = Wc(h.x, u.w, g);
                                          n.push({
                                              x: h.x,
                                              y: f,
                                              textAlign: g,
                                              left: p,
                                              top: f,
                                              right: p + u.w,
                                              bottom: f + u.h,
                                          });
                                      }
                                      return n;
                                  })(i, n, s));
                          })(this)
                        : this.setCenterPoint(0, 0, 0, 0);
                }
                setCenterPoint(e, t, n, s) {
                    (this.xCenter += Math.floor((e - t) / 2)),
                        (this.yCenter += Math.floor((n - s) / 2)),
                        (this.drawingArea -= Math.min(
                            this.drawingArea / 2,
                            Math.max(e, t, n, s)
                        ));
                }
                getIndexAngle(e) {
                    return tt(
                        e * (z / (this._pointLabels.length || 1)) +
                            rt(this.options.startAngle || 0)
                    );
                }
                getDistanceFromCenterForValue(e) {
                    if (R(e)) return NaN;
                    const t = this.drawingArea / (this.max - this.min);
                    return this.options.reverse
                        ? (this.max - e) * t
                        : (e - this.min) * t;
                }
                getValueForDistanceFromCenter(e) {
                    if (R(e)) return NaN;
                    const t = e / (this.drawingArea / (this.max - this.min));
                    return this.options.reverse ? this.max - t : this.min + t;
                }
                getPointLabelContext(e) {
                    const t = this._pointLabels || [];
                    if (e >= 0 && e < t.length) {
                        const n = t[e];
                        return (function $c(i, e, t) {
                            return kt(i, {
                                label: t,
                                index: e,
                                type: 'pointLabel',
                            });
                        })(this.getContext(), e, n);
                    }
                }
                getPointPosition(e, t, n = 0) {
                    const s = this.getIndexAngle(e) - H + n;
                    return {
                        x: Math.cos(s) * t + this.xCenter,
                        y: Math.sin(s) * t + this.yCenter,
                        angle: s,
                    };
                }
                getPointPositionForValue(e, t) {
                    return this.getPointPosition(
                        e,
                        this.getDistanceFromCenterForValue(t)
                    );
                }
                getBasePosition(e) {
                    return this.getPointPositionForValue(
                        e || 0,
                        this.getBaseValue()
                    );
                }
                getPointLabelPosition(e) {
                    const {
                        left: t,
                        top: n,
                        right: s,
                        bottom: o,
                    } = this._pointLabelItems[e];
                    return { left: t, top: n, right: s, bottom: o };
                }
                drawBackground() {
                    const {
                        backgroundColor: e,
                        grid: { circular: t },
                    } = this.options;
                    if (e) {
                        const n = this.ctx;
                        n.save(),
                            n.beginPath(),
                            Gs(
                                this,
                                this.getDistanceFromCenterForValue(
                                    this._endValue
                                ),
                                t,
                                this._pointLabels.length
                            ),
                            n.closePath(),
                            (n.fillStyle = e),
                            n.fill(),
                            n.restore();
                    }
                }
                drawGrid() {
                    const e = this.ctx,
                        t = this.options,
                        { angleLines: n, grid: s } = t,
                        o = this._pointLabels.length;
                    let r, a, l;
                    if (
                        (t.pointLabels.display &&
                            (function Hc(i, e) {
                                const {
                                    ctx: t,
                                    options: { pointLabels: n },
                                } = i;
                                for (let s = e - 1; s >= 0; s--) {
                                    const o = n.setContext(
                                            i.getPointLabelContext(s)
                                        ),
                                        r = U(o.font),
                                        {
                                            x: a,
                                            y: l,
                                            textAlign: c,
                                            left: h,
                                            top: d,
                                            right: u,
                                            bottom: f,
                                        } = i._pointLabelItems[s],
                                        { backdropColor: g } = o;
                                    if (!R(g)) {
                                        const p = Ot(o.borderRadius),
                                            m = q(o.backdropPadding);
                                        t.fillStyle = g;
                                        const b = h - m.left,
                                            x = d - m.top,
                                            v = u - h + m.width,
                                            y = f - d + m.height;
                                        Object.values(p).some((_) => 0 !== _)
                                            ? (t.beginPath(),
                                              ne(t, {
                                                  x: b,
                                                  y: x,
                                                  w: v,
                                                  h: y,
                                                  radius: p,
                                              }),
                                              t.fill())
                                            : t.fillRect(b, x, v, y);
                                    }
                                    At(
                                        t,
                                        i._pointLabels[s],
                                        a,
                                        l + r.lineHeight / 2,
                                        r,
                                        {
                                            color: o.color,
                                            textAlign: c,
                                            textBaseline: 'middle',
                                        }
                                    );
                                }
                            })(this, o),
                        s.display &&
                            this.ticks.forEach((c, h) => {
                                0 !== h &&
                                    ((a = this.getDistanceFromCenterForValue(
                                        c.value
                                    )),
                                    (function jc(i, e, t, n) {
                                        const s = i.ctx,
                                            o = e.circular,
                                            { color: r, lineWidth: a } = e;
                                        (!o && !n) ||
                                            !r ||
                                            !a ||
                                            t < 0 ||
                                            (s.save(),
                                            (s.strokeStyle = r),
                                            (s.lineWidth = a),
                                            s.setLineDash(e.borderDash),
                                            (s.lineDashOffset =
                                                e.borderDashOffset),
                                            s.beginPath(),
                                            Gs(i, t, o, n),
                                            s.closePath(),
                                            s.stroke(),
                                            s.restore());
                                    })(
                                        this,
                                        s.setContext(this.getContext(h - 1)),
                                        a,
                                        o
                                    ));
                            }),
                        n.display)
                    ) {
                        for (e.save(), r = o - 1; r >= 0; r--) {
                            const c = n.setContext(
                                    this.getPointLabelContext(r)
                                ),
                                { color: h, lineWidth: d } = c;
                            !d ||
                                !h ||
                                ((e.lineWidth = d),
                                (e.strokeStyle = h),
                                e.setLineDash(c.borderDash),
                                (e.lineDashOffset = c.borderDashOffset),
                                (a = this.getDistanceFromCenterForValue(
                                    t.ticks.reverse ? this.min : this.max
                                )),
                                (l = this.getPointPosition(r, a)),
                                e.beginPath(),
                                e.moveTo(this.xCenter, this.yCenter),
                                e.lineTo(l.x, l.y),
                                e.stroke());
                        }
                        e.restore();
                    }
                }
                drawBorder() {}
                drawLabels() {
                    const e = this.ctx,
                        t = this.options,
                        n = t.ticks;
                    if (!n.display) return;
                    const s = this.getIndexAngle(0);
                    let o, r;
                    e.save(),
                        e.translate(this.xCenter, this.yCenter),
                        e.rotate(s),
                        (e.textAlign = 'center'),
                        (e.textBaseline = 'middle'),
                        this.ticks.forEach((a, l) => {
                            if (0 === l && !t.reverse) return;
                            const c = n.setContext(this.getContext(l)),
                                h = U(c.font);
                            if (
                                ((o = this.getDistanceFromCenterForValue(
                                    this.ticks[l].value
                                )),
                                c.showLabelBackdrop)
                            ) {
                                (e.font = h.string),
                                    (r = e.measureText(a.label).width),
                                    (e.fillStyle = c.backdropColor);
                                const d = q(c.backdropPadding);
                                e.fillRect(
                                    -r / 2 - d.left,
                                    -o - h.size / 2 - d.top,
                                    r + d.width,
                                    h.size + d.height
                                );
                            }
                            At(e, a.label, 0, -o, h, { color: c.color });
                        }),
                        e.restore();
                }
                drawTitle() {}
            }
            (pe.id = 'radialLinear'),
                (pe.defaults = {
                    display: !0,
                    animate: !0,
                    position: 'chartArea',
                    angleLines: {
                        display: !0,
                        lineWidth: 1,
                        borderDash: [],
                        borderDashOffset: 0,
                    },
                    grid: { circular: !1 },
                    startAngle: 0,
                    ticks: {
                        showLabelBackdrop: !0,
                        callback: Ve.formatters.numeric,
                    },
                    pointLabels: {
                        backdropColor: void 0,
                        backdropPadding: 2,
                        display: !0,
                        font: { size: 10 },
                        callback: (i) => i,
                        padding: 5,
                        centerPointLabels: !1,
                    },
                }),
                (pe.defaultRoutes = {
                    'angleLines.color': 'borderColor',
                    'pointLabels.color': 'color',
                    'ticks.color': 'color',
                }),
                (pe.descriptors = { angleLines: { _fallback: 'grid' } });
            const Je = {
                    millisecond: { common: !0, size: 1, steps: 1e3 },
                    second: { common: !0, size: 1e3, steps: 60 },
                    minute: { common: !0, size: 6e4, steps: 60 },
                    hour: { common: !0, size: 36e5, steps: 24 },
                    day: { common: !0, size: 864e5, steps: 30 },
                    week: { common: !1, size: 6048e5, steps: 4 },
                    month: { common: !0, size: 2628e6, steps: 12 },
                    quarter: { common: !1, size: 7884e6, steps: 4 },
                    year: { common: !0, size: 3154e7 },
                },
                Q = Object.keys(Je);
            function Yc(i, e) {
                return i - e;
            }
            function Js(i, e) {
                if (R(e)) return null;
                const t = i._adapter,
                    { parser: n, round: s, isoWeekday: o } = i._parseOpts;
                let r = e;
                return (
                    'function' == typeof n && (r = n(r)),
                    j(r) ||
                        (r = 'string' == typeof n ? t.parse(r, n) : t.parse(r)),
                    null === r
                        ? null
                        : (s &&
                              (r =
                                  'week' !== s || (!Zt(o) && !0 !== o)
                                      ? t.startOf(r, s)
                                      : t.startOf(r, 'isoWeek', o)),
                          +r)
                );
            }
            function Qs(i, e, t, n) {
                const s = Q.length;
                for (let o = Q.indexOf(i); o < s - 1; ++o) {
                    const r = Je[Q[o]],
                        a = r.steps ? r.steps : Number.MAX_SAFE_INTEGER;
                    if (r.common && Math.ceil((t - e) / (a * r.size)) <= n)
                        return Q[o];
                }
                return Q[s - 1];
            }
            function to(i, e, t) {
                if (t) {
                    if (t.length) {
                        const { lo: n, hi: s } = fi(t, e);
                        i[t[n] >= e ? t[n] : t[s]] = !0;
                    }
                } else i[e] = !0;
            }
            function eo(i, e, t) {
                const n = [],
                    s = {},
                    o = e.length;
                let r, a;
                for (r = 0; r < o; ++r)
                    (a = e[r]), (s[a] = r), n.push({ value: a, major: !1 });
                return 0 !== o && t
                    ? (function Kc(i, e, t, n) {
                          const s = i._adapter,
                              o = +s.startOf(e[0].value, n),
                              r = e[e.length - 1].value;
                          let a, l;
                          for (a = o; a <= r; a = +s.add(a, 1, n))
                              (l = t[a]), l >= 0 && (e[l].major = !0);
                          return e;
                      })(i, n, s, t)
                    : n;
            }
            let Bi = (() => {
                class i extends Ft {
                    constructor(t) {
                        super(t),
                            (this._cache = { data: [], labels: [], all: [] }),
                            (this._unit = 'day'),
                            (this._majorUnit = void 0),
                            (this._offsets = {}),
                            (this._normalized = !1),
                            (this._parseOpts = void 0);
                    }
                    init(t, n) {
                        const s = t.time || (t.time = {}),
                            o = (this._adapter = new pa._date(t.adapters.date));
                        Xt(s.displayFormats, o.formats()),
                            (this._parseOpts = {
                                parser: s.parser,
                                round: s.round,
                                isoWeekday: s.isoWeekday,
                            }),
                            super.init(t),
                            (this._normalized = n.normalized);
                    }
                    parse(t, n) {
                        return void 0 === t ? null : Js(this, t);
                    }
                    beforeLayout() {
                        super.beforeLayout(),
                            (this._cache = { data: [], labels: [], all: [] });
                    }
                    determineDataLimits() {
                        const t = this.options,
                            n = this._adapter,
                            s = t.time.unit || 'day';
                        let {
                            min: o,
                            max: r,
                            minDefined: a,
                            maxDefined: l,
                        } = this.getUserBounds();
                        function c(h) {
                            !a && !isNaN(h.min) && (o = Math.min(o, h.min)),
                                !l && !isNaN(h.max) && (r = Math.max(r, h.max));
                        }
                        (!a || !l) &&
                            (c(this._getLabelBounds()),
                            ('ticks' !== t.bounds ||
                                'labels' !== t.ticks.source) &&
                                c(this.getMinMax(!1))),
                            (o =
                                j(o) && !isNaN(o)
                                    ? o
                                    : +n.startOf(Date.now(), s)),
                            (r =
                                j(r) && !isNaN(r)
                                    ? r
                                    : +n.endOf(Date.now(), s) + 1),
                            (this.min = Math.min(o, r - 1)),
                            (this.max = Math.max(o + 1, r));
                    }
                    _getLabelBounds() {
                        const t = this.getLabelTimestamps();
                        let n = Number.POSITIVE_INFINITY,
                            s = Number.NEGATIVE_INFINITY;
                        return (
                            t.length && ((n = t[0]), (s = t[t.length - 1])),
                            { min: n, max: s }
                        );
                    }
                    buildTicks() {
                        const t = this.options,
                            n = t.time,
                            s = t.ticks,
                            o =
                                'labels' === s.source
                                    ? this.getLabelTimestamps()
                                    : this._generate();
                        'ticks' === t.bounds &&
                            o.length &&
                            ((this.min = this._userMin || o[0]),
                            (this.max = this._userMax || o[o.length - 1]));
                        const r = this.min,
                            l = (function tr(i, e, t) {
                                let n = 0,
                                    s = i.length;
                                for (; n < s && i[n] < e; ) n++;
                                for (; s > n && i[s - 1] > t; ) s--;
                                return n > 0 || s < i.length
                                    ? i.slice(n, s)
                                    : i;
                            })(o, r, this.max);
                        return (
                            (this._unit =
                                n.unit ||
                                (s.autoSkip
                                    ? Qs(
                                          n.minUnit,
                                          this.min,
                                          this.max,
                                          this._getLabelCapacity(r)
                                      )
                                    : (function Uc(i, e, t, n, s) {
                                          for (
                                              let o = Q.length - 1;
                                              o >= Q.indexOf(t);
                                              o--
                                          ) {
                                              const r = Q[o];
                                              if (
                                                  Je[r].common &&
                                                  i._adapter.diff(s, n, r) >=
                                                      e - 1
                                              )
                                                  return r;
                                          }
                                          return Q[t ? Q.indexOf(t) : 0];
                                      })(
                                          this,
                                          l.length,
                                          n.minUnit,
                                          this.min,
                                          this.max
                                      ))),
                            (this._majorUnit =
                                s.major.enabled && 'year' !== this._unit
                                    ? (function Xc(i) {
                                          for (
                                              let e = Q.indexOf(i) + 1,
                                                  t = Q.length;
                                              e < t;
                                              ++e
                                          )
                                              if (Je[Q[e]].common) return Q[e];
                                      })(this._unit)
                                    : void 0),
                            this.initOffsets(o),
                            t.reverse && l.reverse(),
                            eo(this, l, this._majorUnit)
                        );
                    }
                    afterAutoSkip() {
                        this.options.offsetAfterAutoskip &&
                            this.initOffsets(this.ticks.map((t) => +t.value));
                    }
                    initOffsets(t) {
                        let o,
                            r,
                            n = 0,
                            s = 0;
                        this.options.offset &&
                            t.length &&
                            ((o = this.getDecimalForValue(t[0])),
                            (n =
                                1 === t.length
                                    ? 1 - o
                                    : (this.getDecimalForValue(t[1]) - o) / 2),
                            (r = this.getDecimalForValue(t[t.length - 1])),
                            (s =
                                1 === t.length
                                    ? r
                                    : (r -
                                          this.getDecimalForValue(
                                              t[t.length - 2]
                                          )) /
                                      2));
                        const a = t.length < 3 ? 0.5 : 0.25;
                        (n = X(n, 0, a)),
                            (s = X(s, 0, a)),
                            (this._offsets = {
                                start: n,
                                end: s,
                                factor: 1 / (n + 1 + s),
                            });
                    }
                    _generate() {
                        const t = this._adapter,
                            n = this.min,
                            s = this.max,
                            o = this.options,
                            r = o.time,
                            a =
                                r.unit ||
                                Qs(r.minUnit, n, s, this._getLabelCapacity(n)),
                            l = C(r.stepSize, 1),
                            c = 'week' === a && r.isoWeekday,
                            h = Zt(c) || !0 === c,
                            d = {};
                        let f,
                            g,
                            u = n;
                        if (
                            (h && (u = +t.startOf(u, 'isoWeek', c)),
                            (u = +t.startOf(u, h ? 'day' : a)),
                            t.diff(s, n, a) > 1e5 * l)
                        )
                            throw new Error(
                                n +
                                    ' and ' +
                                    s +
                                    ' are too far apart with stepSize of ' +
                                    l +
                                    ' ' +
                                    a
                            );
                        const p =
                            'data' === o.ticks.source &&
                            this.getDataTimestamps();
                        for (f = u, g = 0; f < s; f = +t.add(f, l, a), g++)
                            to(d, f, p);
                        return (
                            (f === s || 'ticks' === o.bounds || 1 === g) &&
                                to(d, f, p),
                            Object.keys(d)
                                .sort((m, b) => m - b)
                                .map((m) => +m)
                        );
                    }
                    getLabelForValue(t) {
                        const s = this.options.time;
                        return this._adapter.format(
                            t,
                            s.tooltipFormat
                                ? s.tooltipFormat
                                : s.displayFormats.datetime
                        );
                    }
                    _tickFormatFunction(t, n, s, o) {
                        const r = this.options,
                            a = r.time.displayFormats,
                            l = this._unit,
                            c = this._majorUnit,
                            d = c && a[c],
                            u = s[n],
                            g = this._adapter.format(
                                t,
                                o || (c && d && u && u.major ? d : l && a[l])
                            ),
                            p = r.ticks.callback;
                        return p ? W(p, [g, n, s], this) : g;
                    }
                    generateTickLabels(t) {
                        let n, s, o;
                        for (n = 0, s = t.length; n < s; ++n)
                            (o = t[n]),
                                (o.label = this._tickFormatFunction(
                                    o.value,
                                    n,
                                    t
                                ));
                    }
                    getDecimalForValue(t) {
                        return null === t
                            ? NaN
                            : (t - this.min) / (this.max - this.min);
                    }
                    getPixelForValue(t) {
                        const n = this._offsets,
                            s = this.getDecimalForValue(t);
                        return this.getPixelForDecimal(
                            (n.start + s) * n.factor
                        );
                    }
                    getValueForPixel(t) {
                        const n = this._offsets,
                            s = this.getDecimalForPixel(t) / n.factor - n.end;
                        return this.min + s * (this.max - this.min);
                    }
                    _getLabelSize(t) {
                        const n = this.options.ticks,
                            s = this.ctx.measureText(t).width,
                            o = rt(
                                this.isHorizontal()
                                    ? n.maxRotation
                                    : n.minRotation
                            ),
                            r = Math.cos(o),
                            a = Math.sin(o),
                            l = this._resolveTickFontOptions(0).size;
                        return { w: s * r + l * a, h: s * a + l * r };
                    }
                    _getLabelCapacity(t) {
                        const n = this.options.time,
                            s = n.displayFormats,
                            o = s[n.unit] || s.millisecond,
                            r = this._tickFormatFunction(
                                t,
                                0,
                                eo(this, [t], this._majorUnit),
                                o
                            ),
                            a = this._getLabelSize(r),
                            l =
                                Math.floor(
                                    this.isHorizontal()
                                        ? this.width / a.w
                                        : this.height / a.h
                                ) - 1;
                        return l > 0 ? l : 1;
                    }
                    getDataTimestamps() {
                        let n,
                            s,
                            t = this._cache.data || [];
                        if (t.length) return t;
                        const o = this.getMatchingVisibleMetas();
                        if (this._normalized && o.length)
                            return (this._cache.data =
                                o[0].controller.getAllParsedValues(this));
                        for (n = 0, s = o.length; n < s; ++n)
                            t = t.concat(
                                o[n].controller.getAllParsedValues(this)
                            );
                        return (this._cache.data = this.normalize(t));
                    }
                    getLabelTimestamps() {
                        const t = this._cache.labels || [];
                        let n, s;
                        if (t.length) return t;
                        const o = this.getLabels();
                        for (n = 0, s = o.length; n < s; ++n)
                            t.push(Js(this, o[n]));
                        return (this._cache.labels = this._normalized
                            ? t
                            : this.normalize(t));
                    }
                    normalize(t) {
                        return _n(t.sort(Yc));
                    }
                }
                return (
                    (i.id = 'time'),
                    (i.defaults = {
                        bounds: 'data',
                        adapters: {},
                        time: {
                            parser: !1,
                            unit: !1,
                            round: !1,
                            isoWeekday: !1,
                            minUnit: 'millisecond',
                            displayFormats: {},
                        },
                        ticks: { source: 'auto', major: { enabled: !1 } },
                    }),
                    i
                );
            })();
            function Qe(i, e, t) {
                let o,
                    r,
                    a,
                    l,
                    n = 0,
                    s = i.length - 1;
                t
                    ? (e >= i[n].pos &&
                          e <= i[s].pos &&
                          ({ lo: n, hi: s } = gt(i, 'pos', e)),
                      ({ pos: o, time: a } = i[n]),
                      ({ pos: r, time: l } = i[s]))
                    : (e >= i[n].time &&
                          e <= i[s].time &&
                          ({ lo: n, hi: s } = gt(i, 'time', e)),
                      ({ time: o, pos: a } = i[n]),
                      ({ time: r, pos: l } = i[s]));
                const c = r - o;
                return c ? a + ((l - a) * (e - o)) / c : a;
            }
            class Vi extends Bi {
                constructor(e) {
                    super(e),
                        (this._table = []),
                        (this._minPos = void 0),
                        (this._tableRange = void 0);
                }
                initOffsets() {
                    const e = this._getTimestampsForTable(),
                        t = (this._table = this.buildLookupTable(e));
                    (this._minPos = Qe(t, this.min)),
                        (this._tableRange = Qe(t, this.max) - this._minPos),
                        super.initOffsets(e);
                }
                buildLookupTable(e) {
                    const { min: t, max: n } = this,
                        s = [],
                        o = [];
                    let r, a, l, c, h;
                    for (r = 0, a = e.length; r < a; ++r)
                        (c = e[r]), c >= t && c <= n && s.push(c);
                    if (s.length < 2)
                        return [
                            { time: t, pos: 0 },
                            { time: n, pos: 1 },
                        ];
                    for (r = 0, a = s.length; r < a; ++r)
                        (h = s[r + 1]),
                            (l = s[r - 1]),
                            (c = s[r]),
                            Math.round((h + l) / 2) !== c &&
                                o.push({ time: c, pos: r / (a - 1) });
                    return o;
                }
                _getTimestampsForTable() {
                    let e = this._cache.all || [];
                    if (e.length) return e;
                    const t = this.getDataTimestamps(),
                        n = this.getLabelTimestamps();
                    return (
                        (e =
                            t.length && n.length
                                ? this.normalize(t.concat(n))
                                : t.length
                                ? t
                                : n),
                        (e = this._cache.all = e),
                        e
                    );
                }
                getDecimalForValue(e) {
                    return (
                        (Qe(this._table, e) - this._minPos) / this._tableRange
                    );
                }
                getValueForPixel(e) {
                    const t = this._offsets,
                        n = this.getDecimalForPixel(e) / t.factor - t.end;
                    return Qe(
                        this._table,
                        n * this._tableRange + this._minPos,
                        !0
                    );
                }
            }
            (Vi.id = 'timeseries'),
                (Vi.defaults = Bi.defaults),
                $e.register(
                    ga,
                    $l,
                    Ac,
                    Object.freeze({
                        __proto__: null,
                        CategoryScale: qe,
                        LinearScale: Fi,
                        LogarithmicScale: Ii,
                        RadialLinearScale: pe,
                        TimeScale: Bi,
                        TimeSeriesScale: Vi,
                    })
                );
            const Gc = $e;
            let Jc = (() => {
                    class i {
                        constructor(t) {
                            (this.el = t),
                                (this.plugins = []),
                                (this.responsive = !0),
                                (this.onDataSelect = new P.vpe()),
                                (this._options = {});
                        }
                        get data() {
                            return this._data;
                        }
                        set data(t) {
                            (this._data = t), this.reinit();
                        }
                        get options() {
                            return this._options;
                        }
                        set options(t) {
                            (this._options = t), this.reinit();
                        }
                        ngAfterViewInit() {
                            this.initChart(), (this.initialized = !0);
                        }
                        onCanvasClick(t) {
                            if (this.chart) {
                                const n = this.chart.getElementsAtEventForMode(
                                        t,
                                        'nearest',
                                        { intersect: !0 },
                                        !1
                                    ),
                                    s = this.chart.getElementsAtEventForMode(
                                        t,
                                        'dataset',
                                        { intersect: !0 },
                                        !1
                                    );
                                n &&
                                    n[0] &&
                                    s &&
                                    this.onDataSelect.emit({
                                        originalEvent: t,
                                        element: n[0],
                                        dataset: s,
                                    });
                            }
                        }
                        initChart() {
                            let t = this.options || {};
                            (t.responsive = this.responsive),
                                t.responsive &&
                                    (this.height || this.width) &&
                                    (t.maintainAspectRatio = !1),
                                (this.chart = new Gc(
                                    this.el.nativeElement.children[0].children[0],
                                    {
                                        type: this.type,
                                        data: this.data,
                                        options: this.options,
                                        plugins: this.plugins,
                                    }
                                ));
                        }
                        getCanvas() {
                            return this.el.nativeElement.children[0]
                                .children[0];
                        }
                        getBase64Image() {
                            return this.chart.toBase64Image();
                        }
                        generateLegend() {
                            if (this.chart) return this.chart.generateLegend();
                        }
                        refresh() {
                            this.chart && this.chart.update();
                        }
                        reinit() {
                            this.chart &&
                                (this.chart.destroy(), this.initChart());
                        }
                        ngOnDestroy() {
                            this.chart &&
                                (this.chart.destroy(),
                                (this.initialized = !1),
                                (this.chart = null));
                        }
                    }
                    return (
                        (i.ɵfac = function (t) {
                            return new (t || i)(P.Y36(P.SBq));
                        }),
                        (i.ɵcmp = P.Xpm({
                            type: i,
                            selectors: [['p-chart']],
                            hostAttrs: [1, 'p-element'],
                            inputs: {
                                type: 'type',
                                plugins: 'plugins',
                                width: 'width',
                                height: 'height',
                                responsive: 'responsive',
                                data: 'data',
                                options: 'options',
                            },
                            outputs: { onDataSelect: 'onDataSelect' },
                            decls: 2,
                            vars: 6,
                            consts: [
                                [2, 'position', 'relative'],
                                [3, 'click'],
                            ],
                            template: function (t, n) {
                                1 & t &&
                                    (P.TgZ(0, 'div', 0)(1, 'canvas', 1),
                                    P.NdJ('click', function (o) {
                                        return n.onCanvasClick(o);
                                    }),
                                    P.qZA()()),
                                    2 & t &&
                                        (P.Udp(
                                            'width',
                                            n.responsive && !n.width
                                                ? null
                                                : n.width
                                        )(
                                            'height',
                                            n.responsive && !n.height
                                                ? null
                                                : n.height
                                        ),
                                        P.xp6(1),
                                        P.uIk(
                                            'width',
                                            n.responsive && !n.width
                                                ? null
                                                : n.width
                                        )(
                                            'height',
                                            n.responsive && !n.height
                                                ? null
                                                : n.height
                                        ));
                            },
                            encapsulation: 2,
                            changeDetection: 0,
                        })),
                        i
                    );
                })(),
                Qc = (() => {
                    class i {}
                    return (
                        (i.ɵfac = function (t) {
                            return new (t || i)();
                        }),
                        (i.ɵmod = P.oAB({ type: i })),
                        (i.ɵinj = P.cJS({ imports: [[_t.ez]] })),
                        i
                    );
                })();
            var Ni,
                Wi = I(6115),
                th = I(655),
                eh = I(4004),
                ih = I(1485);
            const nh = function () {
                return { height: '200px' };
            };
            class me {
                constructor(e) {
                    (this.functionsApi = e),
                        (this.chartOptions = {}),
                        Ni.set(this, [
                            'red',
                            'orange',
                            'green',
                            'indigo',
                            'violet',
                            'magenta',
                            'deeppink',
                            'indianred',
                            'darksalmon',
                            'blue',
                            'greenyellow',
                            'lightseagreen',
                            'mediumturquoise',
                            'LemonChiffon',
                            'lightpink',
                            'yellow',
                            'powderblue',
                            'rebeccapurple',
                            'palegreen',
                            'midnightblue',
                            'plum',
                            'slateblue',
                            'seagreen',
                        ]);
                }
                ngOnInit() {
                    this.data$ = this.functionsApi
                        .call('classes')
                        .pipe(
                            (0, eh.U)((e) => ({
                                labels: e.classes.map(({ title: t }) => t),
                                datasets: [
                                    {
                                        data: e.classes.map(
                                            ({ enrolledCount: t }) => Number(t)
                                        ),
                                        backgroundColor: e.classes.map(
                                            (t, n) =>
                                                (0, th.Q_)(this, Ni, 'f')[n]
                                        ),
                                    },
                                ],
                            }))
                        );
                }
            }
            (Ni = new WeakMap()),
                (me.ɵfac = function (e) {
                    return new (e || me)(P.Y36(ih.O));
                }),
                (me.ɵcmp = P.Xpm({
                    type: me,
                    selectors: [['ng-component']],
                    decls: 19,
                    vars: 7,
                    consts: [
                        [2, 'display', 'flex', 'flex-wrap', 'wrap'],
                        [2, 'margin-right', '200px'],
                        [2, 'font-size', '16px'],
                        ['routerLink', '/report'],
                        ['routerLink', '/import'],
                        [2, 'width', '500px', 'margin-top', '10px'],
                        ['type', 'doughnut', 3, 'data', 'options'],
                    ],
                    template: function (e, t) {
                        1 & e &&
                            (P.TgZ(0, 'h1'),
                            P._uU(1, 'Dashboard'),
                            P.qZA(),
                            P.TgZ(2, 'div', 0)(3, 'div', 1)(4, 'h2'),
                            P._uU(5, 'Quick Navigation'),
                            P.qZA(),
                            P.TgZ(6, 'ul', 2)(7, 'li')(8, 'a', 3),
                            P._uU(9, 'Class Forms and Contacts'),
                            P.qZA()(),
                            P.TgZ(10, 'li')(11, 'a', 4),
                            P._uU(12, 'Import Summer 2022 Enrollment'),
                            P.qZA()()()(),
                            P.TgZ(13, 'div')(14, 'h2'),
                            P._uU(15, 'Summer 2022 Enrollment'),
                            P.qZA(),
                            P.TgZ(16, 'div', 5),
                            P._UZ(17, 'p-chart', 6),
                            P.ALo(18, 'async'),
                            P.qZA()()()),
                            2 & e &&
                                (P.xp6(17),
                                P.Akn(P.DdM(6, nh)),
                                P.Q6J('data', P.lcZ(18, 4, t.data$))(
                                    'options',
                                    t.chartOptions
                                ));
                    },
                    directives: [Wi.yS, Jc],
                    pipes: [_t.Ov],
                    encapsulation: 2,
                    changeDetection: 0,
                }));
            const sh = [{ path: '', component: me, children: [] }];
            let oh = (() => {
                class i {}
                return (
                    (i.ɵfac = function (t) {
                        return new (t || i)();
                    }),
                    (i.ɵmod = P.oAB({ type: i })),
                    (i.ɵinj = P.cJS({
                        imports: [[Wi.Bz.forChild(sh)], Wi.Bz],
                    })),
                    i
                );
            })();
            var rh = I(6666);
            let ah = (() => {
                class i {}
                return (
                    (i.ɵfac = function (t) {
                        return new (t || i)();
                    }),
                    (i.ɵmod = P.oAB({ type: i })),
                    (i.ɵinj = P.cJS({ imports: [[_t.ez, rh.B, oh, Qc]] })),
                    i
                );
            })();
        },
        6666: (et, Y, I) => {
            I.d(Y, { B: () => ye });
            var _t = I(1485),
                P = I(5e3);
            let ye = (() => {
                class Z {}
                return (
                    (Z.ɵfac = function (ht) {
                        return new (ht || Z)();
                    }),
                    (Z.ɵmod = P.oAB({ type: Z })),
                    (Z.ɵinj = P.cJS({ providers: [_t.O] })),
                    Z
                );
            })();
        },
        1485: (et, Y, I) => {
            I.d(Y, { O: () => ye });
            var _t = I(5e3),
                P = I(2228);
            let ye = (() => {
                class Z {
                    constructor(ht) {
                        this.fns = ht;
                    }
                    call(ht, Yt) {
                        return this.fns.httpsCallable(ht)(Yt);
                    }
                }
                return (
                    (Z.ɵfac = function (ht) {
                        return new (ht || Z)(_t.LFG(P.l4));
                    }),
                    (Z.ɵprov = _t.Yz7({
                        token: Z,
                        factory: Z.ɵfac,
                        providedIn: 'root',
                    })),
                    Z
                );
            })();
        },
    },
]);
