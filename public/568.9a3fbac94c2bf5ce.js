'use strict';
(self.webpackChunkportal = self.webpackChunkportal || []).push([
    [568],
    {
        7568: (ee, O, c) => {
            c.r(O);
            var y = c(3942),
                a = c(5861),
                g = c(9681),
                f = c(2090),
                v = c(4859);
            function I(e, t) {
                const n = {};
                for (const r in e) e.hasOwnProperty(r) && (n[r] = t(e[r]));
                return n;
            }
            function m(e) {
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
                if (Array.isArray(e)) return e.map((t) => m(t));
                if ('function' == typeof e || 'object' == typeof e)
                    return I(e, (t) => m(t));
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
            const E = 'functions',
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
            class l extends f.ZR {
                constructor(t, n, r) {
                    super(`${E}/${t}`, n || ''), (this.details = r);
                }
            }
            function L(e, t) {
                let i,
                    n = (function R(e) {
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
                    const o = t && t.error;
                    if (o) {
                        const u = o.status;
                        if ('string' == typeof u) {
                            if (!k[u]) return new l('internal', 'internal');
                            (n = k[u]), (r = u);
                        }
                        const s = o.message;
                        'string' == typeof s && (r = s),
                            (i = o.details),
                            void 0 !== i && (i = p(i));
                    }
                } catch (o) {}
                return 'ok' === n ? null : new l(n, r, i);
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
            const N = 'us-central1';
            function $(e) {
                let t = null;
                return {
                    promise: new Promise((n, r) => {
                        t = setTimeout(() => {
                            r(new l('deadline-exceeded', 'deadline-exceeded'));
                        }, e);
                    }),
                    cancel: () => {
                        t && clearTimeout(t);
                    },
                };
            }
            class M {
                constructor(t, n, r, i, o = N, u) {
                    (this.app = t),
                        (this.fetchImpl = u),
                        (this.emulatorOrigin = null),
                        (this.contextProvider = new U(n, r, i)),
                        (this.cancelAllRequests = new Promise((s) => {
                            this.deleteService = () => Promise.resolve(s());
                        }));
                    try {
                        const s = new URL(o);
                        (this.customDomain = s.origin), (this.region = N);
                    } catch (s) {
                        (this.customDomain = null), (this.region = o);
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
            function V(e, t, n, r) {
                return _.apply(this, arguments);
            }
            function _() {
                return (_ = (0, a.Z)(function* (e, t, n, r) {
                    let i;
                    n['Content-Type'] = 'application/json';
                    try {
                        i = yield r(e, {
                            method: 'POST',
                            body: JSON.stringify(t),
                            headers: n,
                        });
                    } catch (u) {
                        return { status: 0, json: null };
                    }
                    let o = null;
                    try {
                        o = yield i.json();
                    } catch (u) {}
                    return { status: i.status, json: o };
                })).apply(this, arguments);
            }
            function T() {
                return (T = (0, a.Z)(function* (e, t, n, r) {
                    const i = e._url(t),
                        o = { data: (n = m(n)) },
                        u = {},
                        s = yield e.contextProvider.getContext();
                    s.authToken && (u.Authorization = 'Bearer ' + s.authToken),
                        s.messagingToken &&
                            (u['Firebase-Instance-ID-Token'] =
                                s.messagingToken),
                        null !== s.appCheckToken &&
                            (u['X-Firebase-AppCheck'] = s.appCheckToken);
                    const D = $(r.timeout || 7e4),
                        d = yield Promise.race([
                            V(i, o, u, e.fetchImpl),
                            D.promise,
                            e.cancelAllRequests,
                        ]);
                    if ((D.cancel(), !d))
                        throw new l(
                            'cancelled',
                            'Firebase Functions instance was deleted.'
                        );
                    const S = L(d.status, d.json);
                    if (S) throw S;
                    if (!d.json)
                        throw new l(
                            'internal',
                            'Response is not valid JSON object.'
                        );
                    let h = d.json.data;
                    if ((void 0 === h && (h = d.json.result), void 0 === h))
                        throw new l(
                            'internal',
                            'Response is missing data field.'
                        );
                    return { data: p(h) };
                })).apply(this, arguments);
            }
            const w = '@firebase/functions',
                x = '0.7.8';
            function C(e, t, n) {
                !(function Z(e, t, n) {
                    e.emulatorOrigin = `http://${t}:${n}`;
                })((0, f.m9)(e), t, n);
            }
            !(function Y(e, t) {
                (0, g._registerComponent)(
                    new v.wA(
                        E,
                        (r, { instanceIdentifier: i }) => {
                            const o = r.getProvider('app').getImmediate(),
                                u = r.getProvider('auth-internal'),
                                s = r.getProvider('messaging-internal'),
                                A = r.getProvider('app-check-internal');
                            return new M(o, u, s, A, i, e);
                        },
                        'PUBLIC'
                    ).setMultipleInstances(!0)
                ),
                    (0, g.registerVersion)(w, x, t),
                    (0, g.registerVersion)(w, x, 'esm2017');
            })(fetch.bind(self));
            class P {
                constructor(t, n) {
                    (this.app = t),
                        (this._delegate = n),
                        (this._region = this._delegate.region),
                        (this._customDomain = this._delegate.customDomain);
                }
                httpsCallable(t, n) {
                    return (function j(e, t, n) {
                        return (function G(e, t, n) {
                            return (r) =>
                                (function J(e, t, n, r) {
                                    return T.apply(this, arguments);
                                })(e, t, r, n || {});
                        })((0, f.m9)(e), t, n);
                    })(this._delegate, t, n);
                }
                useFunctionsEmulator(t) {
                    const n = t.match(
                        '[a-zA-Z]+://([a-zA-Z0-9.-]+)(?::([0-9]+))?'
                    );
                    if (null == n)
                        throw new f.ZR(
                            'functions',
                            'No origin provided to useFunctionsEmulator()'
                        );
                    if (null == n[2])
                        throw new f.ZR(
                            'functions',
                            'Port missing in origin provided to useFunctionsEmulator()'
                        );
                    return C(this._delegate, n[1], Number(n[2]));
                }
                useEmulator(t, n) {
                    return C(this._delegate, t, n);
                }
            }
            const Q = (e, { instanceIdentifier: t }) => {
                const n = e.getProvider('app-compat').getImmediate(),
                    r = e
                        .getProvider('functions')
                        .getImmediate({
                            identifier: null != t ? t : 'us-central1',
                        });
                return new P(n, r);
            };
            (function q() {
                const e = { Functions: P };
                y.Z.INTERNAL.registerComponent(
                    new v.wA('functions-compat', Q, 'PUBLIC')
                        .setServiceProps(e)
                        .setMultipleInstances(!0)
                );
            })(),
                y.Z.registerVersion('@firebase/functions-compat', '0.1.9');
        },
    },
]);
