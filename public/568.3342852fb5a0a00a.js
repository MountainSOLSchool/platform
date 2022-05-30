'use strict';
(self.webpackChunkportal = self.webpackChunkportal || []).push([
    [568],
    {
        7568: (ne, O, c) => {
            c.r(O);
            var y = c(3942),
                a = c(5861),
                g = c(9681),
                l = c(2090),
                v = c(4859);
            function I(e, t) {
                const n = {};
                for (const r in e) e.hasOwnProperty(r) && (n[r] = t(e[r]));
                return n;
            }
            function E(e) {
                if (null == e) return null;
                if (
                    (e instanceof Number && (e = e.valueOf()),
                    ('number' == typeof e && isFinite(e)) ||
                        !0 === e ||
                        !1 === e ||
                        '[object String]' === Object.prototype.toString.call(e))
                )
                    return e;
                if (e instanceof Date) return e.toISOString();
                if (Array.isArray(e)) return e.map((t) => E(t));
                if ('function' == typeof e || 'object' == typeof e)
                    return I(e, (t) => E(t));
                throw new Error('Data cannot be encoded in JSON: ' + e);
            }
            function p(e) {
                if (null == e) return e;
                if (e['@type'])
                    switch (e['@type']) {
                        case 'type.googleapis.com/google.protobuf.Int64Value':
                        case 'type.googleapis.com/google.protobuf.UInt64Value': {
                            const t = Number(e.value);
                            if (isNaN(t))
                                throw new Error(
                                    'Data cannot be decoded from JSON: ' + e
                                );
                            return t;
                        }
                        default:
                            throw new Error(
                                'Data cannot be decoded from JSON: ' + e
                            );
                    }
                return Array.isArray(e)
                    ? e.map((t) => p(t))
                    : 'function' == typeof e || 'object' == typeof e
                    ? I(e, (t) => p(t))
                    : e;
            }
            const N = 'functions',
                k = {
                    OK: 'ok',
                    CANCELLED: 'cancelled',
                    UNKNOWN: 'unknown',
                    INVALID_ARGUMENT: 'invalid-argument',
                    DEADLINE_EXCEEDED: 'deadline-exceeded',
                    NOT_FOUND: 'not-found',
                    ALREADY_EXISTS: 'already-exists',
                    PERMISSION_DENIED: 'permission-denied',
                    UNAUTHENTICATED: 'unauthenticated',
                    RESOURCE_EXHAUSTED: 'resource-exhausted',
                    FAILED_PRECONDITION: 'failed-precondition',
                    ABORTED: 'aborted',
                    OUT_OF_RANGE: 'out-of-range',
                    UNIMPLEMENTED: 'unimplemented',
                    INTERNAL: 'internal',
                    UNAVAILABLE: 'unavailable',
                    DATA_LOSS: 'data-loss',
                };
            class d extends l.ZR {
                constructor(t, n, r) {
                    super(`${N}/${t}`, n || ''), (this.details = r);
                }
            }
            function L(e, t) {
                let i,
                    n = (function F(e) {
                        if (e >= 200 && e < 300) return 'ok';
                        switch (e) {
                            case 0:
                            case 500:
                                return 'internal';
                            case 400:
                                return 'invalid-argument';
                            case 401:
                                return 'unauthenticated';
                            case 403:
                                return 'permission-denied';
                            case 404:
                                return 'not-found';
                            case 409:
                                return 'aborted';
                            case 429:
                                return 'resource-exhausted';
                            case 499:
                                return 'cancelled';
                            case 501:
                                return 'unimplemented';
                            case 503:
                                return 'unavailable';
                            case 504:
                                return 'deadline-exceeded';
                        }
                        return 'unknown';
                    })(e),
                    r = n;
                try {
                    const s = t && t.error;
                    if (s) {
                        const o = s.status;
                        if ('string' == typeof o) {
                            if (!k[o]) return new d('internal', 'internal');
                            (n = k[o]), (r = o);
                        }
                        const u = s.message;
                        'string' == typeof u && (r = u),
                            (i = s.details),
                            void 0 !== i && (i = p(i));
                    }
                } catch (s) {}
                return 'ok' === n ? null : new d(n, r, i);
            }
            class U {
                constructor(t, n, r) {
                    (this.auth = null),
                        (this.messaging = null),
                        (this.appCheck = null),
                        (this.auth = t.getImmediate({ optional: !0 })),
                        (this.messaging = n.getImmediate({ optional: !0 })),
                        this.auth ||
                            t.get().then(
                                (i) => (this.auth = i),
                                () => {}
                            ),
                        this.messaging ||
                            n.get().then(
                                (i) => (this.messaging = i),
                                () => {}
                            ),
                        this.appCheck ||
                            r.get().then(
                                (i) => (this.appCheck = i),
                                () => {}
                            );
                }
                getAuthToken() {
                    var t = this;
                    return (0, a.Z)(function* () {
                        if (t.auth)
                            try {
                                const n = yield t.auth.getToken();
                                return null == n ? void 0 : n.accessToken;
                            } catch (n) {
                                return;
                            }
                    })();
                }
                getMessagingToken() {
                    var t = this;
                    return (0, a.Z)(function* () {
                        if (
                            t.messaging &&
                            'Notification' in self &&
                            'granted' === Notification.permission
                        )
                            try {
                                return yield t.messaging.getToken();
                            } catch (n) {
                                return;
                            }
                    })();
                }
                getAppCheckToken() {
                    var t = this;
                    return (0, a.Z)(function* () {
                        if (t.appCheck) {
                            const n = yield t.appCheck.getToken();
                            return n.error ? null : n.token;
                        }
                        return null;
                    })();
                }
                getContext() {
                    var t = this;
                    return (0, a.Z)(function* () {
                        return {
                            authToken: yield t.getAuthToken(),
                            messagingToken: yield t.getMessagingToken(),
                            appCheckToken: yield t.getAppCheckToken(),
                        };
                    })();
                }
            }
            const _ = 'us-central1';
            function $(e) {
                let t = null;
                return {
                    promise: new Promise((n, r) => {
                        t = setTimeout(() => {
                            r(new d('deadline-exceeded', 'deadline-exceeded'));
                        }, e);
                    }),
                    cancel: () => {
                        t && clearTimeout(t);
                    },
                };
            }
            class M {
                constructor(t, n, r, i, s = _, o) {
                    (this.app = t),
                        (this.fetchImpl = o),
                        (this.emulatorOrigin = null),
                        (this.contextProvider = new U(n, r, i)),
                        (this.cancelAllRequests = new Promise((u) => {
                            this.deleteService = () => Promise.resolve(u());
                        }));
                    try {
                        const u = new URL(s);
                        (this.customDomain = u.origin), (this.region = _);
                    } catch (u) {
                        (this.customDomain = null), (this.region = s);
                    }
                }
                _delete() {
                    return this.deleteService();
                }
                _url(t) {
                    const n = this.app.options.projectId;
                    return null !== this.emulatorOrigin
                        ? `${this.emulatorOrigin}/${n}/${this.region}/${t}`
                        : null !== this.customDomain
                        ? `${this.customDomain}/${t}`
                        : `https://${this.region}-${n}.cloudfunctions.net/${t}`;
                }
            }
            function J(e, t, n, r) {
                return A.apply(this, arguments);
            }
            function A() {
                return (A = (0, a.Z)(function* (e, t, n, r) {
                    let i;
                    n['Content-Type'] = 'application/json';
                    try {
                        i = yield r(e, {
                            method: 'POST',
                            body: JSON.stringify(t),
                            headers: n,
                        });
                    } catch (o) {
                        return { status: 0, json: null };
                    }
                    let s = null;
                    try {
                        s = yield i.json();
                    } catch (o) {}
                    return { status: i.status, json: s };
                })).apply(this, arguments);
            }
            function C(e, t, n, r) {
                return T.apply(this, arguments);
            }
            function T() {
                return (T = (0, a.Z)(function* (e, t, n, r) {
                    const i = { data: (n = E(n)) },
                        s = {},
                        o = yield e.contextProvider.getContext();
                    o.authToken && (s.Authorization = 'Bearer ' + o.authToken),
                        o.messagingToken &&
                            (s['Firebase-Instance-ID-Token'] =
                                o.messagingToken),
                        null !== o.appCheckToken &&
                            (s['X-Firebase-AppCheck'] = o.appCheckToken);
                    const h = $(r.timeout || 7e4),
                        f = yield Promise.race([
                            J(t, i, s, e.fetchImpl),
                            h.promise,
                            e.cancelAllRequests,
                        ]);
                    if ((h.cancel(), !f))
                        throw new d(
                            'cancelled',
                            'Firebase Functions instance was deleted.'
                        );
                    const S = L(f.status, f.json);
                    if (S) throw S;
                    if (!f.json)
                        throw new d(
                            'internal',
                            'Response is not valid JSON object.'
                        );
                    let m = f.json.data;
                    if ((void 0 === m && (m = f.json.result), void 0 === m))
                        throw new d(
                            'internal',
                            'Response is missing data field.'
                        );
                    return { data: p(m) };
                })).apply(this, arguments);
            }
            const w = '@firebase/functions',
                x = '0.8.1';
            function P(e, t, n) {
                !(function Z(e, t, n) {
                    e.emulatorOrigin = `http://${t}:${n}`;
                })((0, l.m9)(e), t, n);
            }
            !(function j(e, t) {
                (0, g._registerComponent)(
                    new v.wA(
                        N,
                        (r, { instanceIdentifier: i }) => {
                            const s = r.getProvider('app').getImmediate(),
                                o = r.getProvider('auth-internal'),
                                u = r.getProvider('messaging-internal'),
                                h = r.getProvider('app-check-internal');
                            return new M(s, o, u, h, i, e);
                        },
                        'PUBLIC'
                    ).setMultipleInstances(!0)
                ),
                    (0, g.registerVersion)(w, x, t),
                    (0, g.registerVersion)(w, x, 'esm2017');
            })(fetch.bind(self));
            class D {
                constructor(t, n) {
                    (this.app = t),
                        (this._delegate = n),
                        (this._region = this._delegate.region),
                        (this._customDomain = this._delegate.customDomain);
                }
                httpsCallable(t, n) {
                    return (function z(e, t, n) {
                        return (function G(e, t, n) {
                            return (r) =>
                                (function H(e, t, n, r) {
                                    const i = e._url(t);
                                    return C(e, i, n, r);
                                })(e, t, r, n || {});
                        })((0, l.m9)(e), t, n);
                    })(this._delegate, t, n);
                }
                httpsCallableFromURL(t, n) {
                    return (function K(e, t, n) {
                        return (function V(e, t, n) {
                            return (r) => C(e, t, r, n || {});
                        })((0, l.m9)(e), t, n);
                    })(this._delegate, t, n);
                }
                useFunctionsEmulator(t) {
                    const n = t.match(
                        '[a-zA-Z]+://([a-zA-Z0-9.-]+)(?::([0-9]+))?'
                    );
                    if (null == n)
                        throw new l.ZR(
                            'functions',
                            'No origin provided to useFunctionsEmulator()'
                        );
                    if (null == n[2])
                        throw new l.ZR(
                            'functions',
                            'Port missing in origin provided to useFunctionsEmulator()'
                        );
                    return P(this._delegate, n[1], Number(n[2]));
                }
                useEmulator(t, n) {
                    return P(this._delegate, t, n);
                }
            }
            const ee = (e, { instanceIdentifier: t }) => {
                const n = e.getProvider('app-compat').getImmediate(),
                    r = e.getProvider('functions').getImmediate({
                        identifier: null != t ? t : 'us-central1',
                    });
                return new D(n, r);
            };
            (function te() {
                const e = { Functions: D };
                y.Z.INTERNAL.registerComponent(
                    new v.wA('functions-compat', ee, 'PUBLIC')
                        .setServiceProps(e)
                        .setMultipleInstances(!0)
                );
            })(),
                y.Z.registerVersion('@firebase/functions-compat', '0.2.1');
        },
    },
]);
