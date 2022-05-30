(self.webpackChunkportal = self.webpackChunkportal || []).push([
    [694],
    {
        6694: (me, ae, C) => {
            'use strict';
            C.r(ae), C.d(ae, { ImportComponentModule: () => o });
            var oe = C(6666),
                $ = C(9808),
                ne = C(6115),
                w = C(7579),
                W = C(3900),
                re = C(4128),
                G = C(8996),
                ue = C(4004),
                d = C(8505),
                Q = C(9718),
                H = C(8675),
                q = C(3028);
            const X = {
                'Submission Date': 'submissionDate',
                'First Name': new Array(
                    'firstName',
                    'emergencyContactOneFirstName',
                    'emergencyContactTwoFirstName',
                    'emergencyContactThreeFirstName',
                    'emergencyContactFourFirstName'
                ),
                'Last Name': new Array(
                    'lastName',
                    'emergencyContactOneLastName',
                    'emergencyContactTwoLastName',
                    'emergencyContactThreeLastName',
                    'emergencyContactFourLastName'
                ),
                'Date of birth': 'dateOfBirth',
                'School (or n/a for adults)': 'school',
                'Street Address': 'streetAddressLineOne',
                'Street Address Line 2': 'streetAddressLineTwo',
                City: 'city',
                State: 'state',
                'Zip Code': 'zipCode',
                'Phone Number': new Array(
                    'phoneNumber',
                    'emergencyContactOnePhoneNumber',
                    'emergencyContactTwoPhoneNumber',
                    'emergencyContactThreePhoneNumber',
                    'emergencyContactFourPhoneNumber'
                ),
                'Primary email contact': 'primaryEmailContact',
                'Have you previously signed up for Fall/Winter 2022 classes with us?':
                    'didSignUpForWinterClasses',
                'May we take photographs and/or video of your student to use for Mountain SOL advertising purposes?':
                    'canPhotograph',
                Relationship: new Array(
                    'emergencyContactOneRelationship',
                    'emergencyContactTwoRelationship',
                    'emergencyContactThreeRelationship',
                    'emergencyContactFourRelationship'
                ),
                Email: new Array(
                    'emergencyContactOneEmail',
                    'emergencyContactTwoEmail',
                    'emergencyContactThreeEmail',
                    'emergencyContactFourEmail'
                ),
                'Add another parent/guardian/emergency contact?': new Array(
                    'addEmergencyContactTwo',
                    'addEmergencyContactThree',
                    'addEmergencyContactFour'
                ),
                'Emergency contacts -- child lives with':
                    'emergencyContactHousingType',
                'Which parent?': 'emergencyContactHousingName',
                'Other:': 'emergencyContactHousingOther',
                'Please add full name, relationship and phone. Save after each person.':
                    'authorizedPickupEntries',
                'Code word': 'codeWord',
                Gender: 'gender',
                "Doctor's Name": 'doctorName',
                "Doctor's phone": 'doctorPhone',
                Weight: 'weight',
                Height: 'height',
                'Medical Insurance Company': 'medicalInsuranceCompany',
                'Medical ID Number': 'medicalIdNumber',
                "Primary Insured Individual's name":
                    'primaryInsuredIndividualName',
                'Infinite List': 'medicationDosageFrequencyEntries',
                'Medical Authorization': 'medicalAuthorization',
                'Sunscreen and Insect Repellent':
                    'canUseSunscreenAndInsectRepellant',
                'Special health considerations:': 'specialHealthConsiderations',
                'Child information (optional):': 'childInformationNote',
                'By checking the box below, I hereby certify that the above information is correct':
                    'isSignedForCorrectness',
                Signature: new Array(
                    'correctnessSignatureUrl',
                    'liabilitySignatureUrl'
                ),
                'Release of liability and hold harmless':
                    'isReleasedOfLiability',
                'My Products': 'classes',
            };
            var m = C(5e3),
                le = C(1485),
                Y = C(9783),
                ee = C(8205),
                de = C(8185);
            const he = function () {
                return { height: '6px' };
            };
            function ce(i, c) {
                1 & i && m._UZ(0, 'p-progressBar', 3),
                    2 & i && m.Akn(m.DdM(2, he));
            }
            const B = [
                {
                    path: '',
                    component: (() => {
                        class i {
                            constructor(_, k) {
                                (this.functionsApi = _),
                                    (this.messageService = k),
                                    (this.uploadClick$ = new w.x()),
                                    (this.isUploading$ = this.uploadClick$.pipe(
                                        (0, W.w)(({ files: a }) =>
                                            (0, re.D)(
                                                a.map((g) =>
                                                    (0, G.D)(g.text()).pipe(
                                                        (0, ue.U)((u) => {
                                                            const A = new Map();
                                                            return q.parse(u, {
                                                                header: !0,
                                                                transform: (
                                                                    r
                                                                ) => {
                                                                    var p;
                                                                    return null !==
                                                                        (p =
                                                                            null ==
                                                                            r
                                                                                ? void 0
                                                                                : r.trim()) &&
                                                                        void 0 !==
                                                                            p
                                                                        ? p
                                                                        : '';
                                                                },
                                                                transformHeader:
                                                                    (r) => {
                                                                        var p;
                                                                        const F =
                                                                                X[
                                                                                    r
                                                                                ],
                                                                            S =
                                                                                null !==
                                                                                    (p =
                                                                                        A.get(
                                                                                            r
                                                                                        )) &&
                                                                                void 0 !==
                                                                                    p
                                                                                    ? p
                                                                                    : 0,
                                                                            O =
                                                                                'string' ==
                                                                                typeof F
                                                                                    ? F
                                                                                    : F[
                                                                                          S
                                                                                      ];
                                                                        return (
                                                                            A.set(
                                                                                r,
                                                                                S +
                                                                                    1
                                                                            ),
                                                                            O
                                                                        );
                                                                    },
                                                            }).data;
                                                        })
                                                    )
                                                )
                                            ).pipe(
                                                (0, ue.U)((g) =>
                                                    g.reduce(
                                                        (u, A) => [...u, ...A],
                                                        []
                                                    )
                                                ),
                                                (0, W.w)((g) =>
                                                    this.functionsApi.call(
                                                        'importEnrollment',
                                                        g
                                                    )
                                                ),
                                                (0, d.b)((g) => {
                                                    var u, A;
                                                    return this.messageService.add(
                                                        {
                                                            detail: `Successfully imported ${
                                                                null !==
                                                                    (A =
                                                                        null ===
                                                                            (u =
                                                                                g
                                                                                    .result
                                                                                    .enrolled) ||
                                                                        void 0 ===
                                                                            u
                                                                            ? void 0
                                                                            : u.length) &&
                                                                void 0 !== A
                                                                    ? A
                                                                    : 0
                                                            } enrollments!`,
                                                            severity: 'success',
                                                        }
                                                    );
                                                }),
                                                (0, Q.h)(!1),
                                                (0, H.O)(!0)
                                            )
                                        )
                                    ));
                            }
                            ngOnInit() {
                                console.log('opened');
                            }
                        }
                        return (
                            (i.ɵfac = function (_) {
                                return new (_ || i)(m.Y36(le.O), m.Y36(Y.ez));
                            }),
                            (i.ɵcmp = m.Xpm({
                                type: i,
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
                                template: function (_, k) {
                                    1 & _ &&
                                        (m.TgZ(0, 'h1'),
                                        m._uU(
                                            1,
                                            'Import Summer 2022 Enrollment'
                                        ),
                                        m.qZA(),
                                        m.TgZ(2, 'div', 0)(3, 'h2'),
                                        m._uU(4, 'Upload Jot Forms CSV file:'),
                                        m.qZA()(),
                                        m.TgZ(5, 'div')(6, 'p-fileUpload', 1),
                                        m.NdJ('uploadHandler', function (g) {
                                            return k.uploadClick$.next(g);
                                        }),
                                        m.qZA()(),
                                        m.YNc(7, ce, 1, 3, 'p-progressBar', 2),
                                        m.ALo(8, 'async')),
                                        2 & _ &&
                                            (m.xp6(6),
                                            m.Q6J('showCancelButton', !1)(
                                                'multiple',
                                                !1
                                            )('customUpload', !0),
                                            m.xp6(1),
                                            m.Q6J(
                                                'ngIf',
                                                m.lcZ(8, 4, k.isUploading$)
                                            ));
                                },
                                directives: [ee.p, $.O5, de.k],
                                pipes: [$.Ov],
                                encapsulation: 2,
                                changeDetection: 0,
                            })),
                            i
                        );
                    })(),
                    children: [],
                },
            ];
            let E = (() => {
                class i {}
                return (
                    (i.ɵfac = function (_) {
                        return new (_ || i)();
                    }),
                    (i.ɵmod = m.oAB({ type: i })),
                    (i.ɵinj = m.cJS({ imports: [[ne.Bz.forChild(B)], ne.Bz] })),
                    i
                );
            })();
            var t = C(845),
                e = C(1424),
                n = C(2145),
                s = C(9962);
            let o = (() => {
                class i {}
                return (
                    (i.ɵfac = function (_) {
                        return new (_ || i)();
                    }),
                    (i.ɵmod = m.oAB({ type: i })),
                    (i.ɵinj = m.cJS({
                        imports: [
                            [$.ez, oe.B, E, t.hJ, e.j, n.WN, ee.O, de.q, s.U$],
                        ],
                    })),
                    i
                );
            })();
        },
        3028: function (me, ae) {
            var C, $;
            (C = function ne() {
                'use strict';
                var w =
                        'undefined' != typeof self
                            ? self
                            : 'undefined' != typeof window
                            ? window
                            : void 0 !== w
                            ? w
                            : {},
                    W = !w.document && !!w.postMessage,
                    re = W && /blob:/i.test((w.location || {}).protocol),
                    G = {},
                    ue = 0,
                    d = {
                        parse: function (t, e) {
                            var n = (e = e || {}).dynamicTyping || !1;
                            if (
                                (E(n) &&
                                    ((e.dynamicTypingFunction = n), (n = {})),
                                (e.dynamicTyping = n),
                                (e.transform = !!E(e.transform) && e.transform),
                                e.worker && d.WORKERS_SUPPORTED)
                            ) {
                                var s = (function () {
                                    if (!d.WORKERS_SUPPORTED) return !1;
                                    var _,
                                        k,
                                        i =
                                            ((_ = w.URL || w.webkitURL || null),
                                            (k = ne.toString()),
                                            d.BLOB_URL ||
                                                (d.BLOB_URL = _.createObjectURL(
                                                    new Blob(['(', k, ')();'], {
                                                        type: 'text/javascript',
                                                    })
                                                ))),
                                        c = new w.Worker(i);
                                    return (
                                        (c.onmessage = de),
                                        (c.id = ue++),
                                        (G[c.id] = c)
                                    );
                                })();
                                return (
                                    (s.userStep = e.step),
                                    (s.userChunk = e.chunk),
                                    (s.userComplete = e.complete),
                                    (s.userError = e.error),
                                    (e.step = E(e.step)),
                                    (e.chunk = E(e.chunk)),
                                    (e.complete = E(e.complete)),
                                    (e.error = E(e.error)),
                                    delete e.worker,
                                    void s.postMessage({
                                        input: t,
                                        config: e,
                                        workerId: s.id,
                                    })
                                );
                            }
                            var o = null;
                            return (
                                'string' == typeof t
                                    ? (o = e.download ? new q(e) : new V(e))
                                    : !0 === t.readable && E(t.read) && E(t.on)
                                    ? (o = new m(e))
                                    : ((w.File && t instanceof File) ||
                                          t instanceof Object) &&
                                      (o = new X(e)),
                                o.stream(t)
                            );
                        },
                        unparse: function (t, e) {
                            var n = !1,
                                s = !0,
                                o = ',',
                                i = '\r\n',
                                c = '"',
                                _ = c + c,
                                k = !1,
                                a = null,
                                g = !1;
                            !(function () {
                                if ('object' == typeof e) {
                                    if (
                                        ('string' != typeof e.delimiter ||
                                            d.BAD_DELIMITERS.filter(function (
                                                r
                                            ) {
                                                return (
                                                    -1 !==
                                                    e.delimiter.indexOf(r)
                                                );
                                            }).length ||
                                            (o = e.delimiter),
                                        ('boolean' == typeof e.quotes ||
                                            'function' == typeof e.quotes ||
                                            Array.isArray(e.quotes)) &&
                                            (n = e.quotes),
                                        ('boolean' != typeof e.skipEmptyLines &&
                                            'string' !=
                                                typeof e.skipEmptyLines) ||
                                            (k = e.skipEmptyLines),
                                        'string' == typeof e.newline &&
                                            (i = e.newline),
                                        'string' == typeof e.quoteChar &&
                                            (c = e.quoteChar),
                                        'boolean' == typeof e.header &&
                                            (s = e.header),
                                        Array.isArray(e.columns))
                                    ) {
                                        if (0 === e.columns.length)
                                            throw new Error(
                                                'Option columns is empty'
                                            );
                                        a = e.columns;
                                    }
                                    void 0 !== e.escapeChar &&
                                        (_ = e.escapeChar + c),
                                        ('boolean' == typeof e.escapeFormulae ||
                                            e.escapeFormulae instanceof
                                                RegExp) &&
                                            (g =
                                                e.escapeFormulae instanceof
                                                RegExp
                                                    ? e.escapeFormulae
                                                    : /^[=+\-@\t\r].*$/);
                                }
                            })();
                            var u = new RegExp(Y(c), 'g');
                            if (
                                ('string' == typeof t && (t = JSON.parse(t)),
                                Array.isArray(t))
                            ) {
                                if (!t.length || Array.isArray(t[0]))
                                    return A(null, t, k);
                                if ('object' == typeof t[0])
                                    return A(a || Object.keys(t[0]), t, k);
                            } else if ('object' == typeof t)
                                return (
                                    'string' == typeof t.data &&
                                        (t.data = JSON.parse(t.data)),
                                    Array.isArray(t.data) &&
                                        (t.fields ||
                                            (t.fields =
                                                (t.meta && t.meta.fields) || a),
                                        t.fields ||
                                            (t.fields = Array.isArray(t.data[0])
                                                ? t.fields
                                                : 'object' == typeof t.data[0]
                                                ? Object.keys(t.data[0])
                                                : []),
                                        Array.isArray(t.data[0]) ||
                                            'object' == typeof t.data[0] ||
                                            (t.data = [t.data])),
                                    A(t.fields || [], t.data || [], k)
                                );
                            throw new Error(
                                'Unable to serialize unrecognized input'
                            );
                            function A(r, p, F) {
                                var S = '';
                                'string' == typeof r && (r = JSON.parse(r)),
                                    'string' == typeof p && (p = JSON.parse(p));
                                var O = Array.isArray(r) && 0 < r.length,
                                    T = !Array.isArray(p[0]);
                                if (O && s) {
                                    for (var x = 0; x < r.length; x++)
                                        0 < x && (S += o), (S += D(r[x], x));
                                    0 < p.length && (S += i);
                                }
                                for (var l = 0; l < p.length; l++) {
                                    var v = O ? r.length : p[l].length,
                                        b = !1,
                                        I = O
                                            ? 0 === Object.keys(p[l]).length
                                            : 0 === p[l].length;
                                    if (
                                        (F &&
                                            !O &&
                                            (b =
                                                'greedy' === F
                                                    ? '' ===
                                                      p[l].join('').trim()
                                                    : 1 === p[l].length &&
                                                      0 === p[l][0].length),
                                        'greedy' === F && O)
                                    ) {
                                        for (var f = [], y = 0; y < v; y++)
                                            f.push(p[l][T ? r[y] : y]);
                                        b = '' === f.join('').trim();
                                    }
                                    if (!b) {
                                        for (var h = 0; h < v; h++)
                                            0 < h && !I && (S += o),
                                                (S += D(
                                                    p[l][O && T ? r[h] : h],
                                                    h
                                                ));
                                        l < p.length - 1 &&
                                            (!F || (0 < v && !I)) &&
                                            (S += i);
                                    }
                                }
                                return S;
                            }
                            function D(r, p) {
                                if (null == r) return '';
                                if (r.constructor === Date)
                                    return JSON.stringify(r).slice(1, 25);
                                var F = !1;
                                g &&
                                    'string' == typeof r &&
                                    g.test(r) &&
                                    ((r = "'" + r), (F = !0));
                                var S = r.toString().replace(u, _);
                                return (F =
                                    F ||
                                    !0 === n ||
                                    ('function' == typeof n && n(r, p)) ||
                                    (Array.isArray(n) && n[p]) ||
                                    (function (O, T) {
                                        for (var x = 0; x < T.length; x++)
                                            if (-1 < O.indexOf(T[x])) return !0;
                                        return !1;
                                    })(S, d.BAD_DELIMITERS) ||
                                    -1 < S.indexOf(o) ||
                                    ' ' === S.charAt(0) ||
                                    ' ' === S.charAt(S.length - 1))
                                    ? c + S + c
                                    : S;
                            }
                        },
                    };
                if (
                    ((d.RECORD_SEP = String.fromCharCode(30)),
                    (d.UNIT_SEP = String.fromCharCode(31)),
                    (d.BYTE_ORDER_MARK = '\ufeff'),
                    (d.BAD_DELIMITERS = ['\r', '\n', '"', d.BYTE_ORDER_MARK]),
                    (d.WORKERS_SUPPORTED = !W && !!w.Worker),
                    (d.NODE_STREAM_INPUT = 1),
                    (d.LocalChunkSize = 10485760),
                    (d.RemoteChunkSize = 5242880),
                    (d.DefaultDelimiter = ','),
                    (d.Parser = ee),
                    (d.ParserHandle = le),
                    (d.NetworkStreamer = q),
                    (d.FileStreamer = X),
                    (d.StringStreamer = V),
                    (d.ReadableStreamStreamer = m),
                    w.jQuery)
                ) {
                    var Q = w.jQuery;
                    Q.fn.parse = function (t) {
                        var e = t.config || {},
                            n = [];
                        return (
                            this.each(function (i) {
                                if (
                                    'INPUT' !==
                                        Q(this).prop('tagName').toUpperCase() ||
                                    'file' !==
                                        Q(this).attr('type').toLowerCase() ||
                                    !w.FileReader ||
                                    !this.files ||
                                    0 === this.files.length
                                )
                                    return !0;
                                for (var c = 0; c < this.files.length; c++)
                                    n.push({
                                        file: this.files[c],
                                        inputElem: this,
                                        instanceConfig: Q.extend({}, e),
                                    });
                            }),
                            s(),
                            this
                        );
                        function s() {
                            if (0 !== n.length) {
                                var c,
                                    _,
                                    k,
                                    a = n[0];
                                if (E(t.before)) {
                                    var g = t.before(a.file, a.inputElem);
                                    if ('object' == typeof g) {
                                        if ('abort' === g.action)
                                            return (
                                                'AbortError',
                                                (c = a.file),
                                                (_ = a.inputElem),
                                                (k = g.reason),
                                                void (
                                                    E(t.error) &&
                                                    t.error(
                                                        { name: 'AbortError' },
                                                        c,
                                                        _,
                                                        k
                                                    )
                                                )
                                            );
                                        if ('skip' === g.action)
                                            return void o();
                                        'object' == typeof g.config &&
                                            (a.instanceConfig = Q.extend(
                                                a.instanceConfig,
                                                g.config
                                            ));
                                    } else if ('skip' === g) return void o();
                                }
                                var u = a.instanceConfig.complete;
                                (a.instanceConfig.complete = function (A) {
                                    E(u) && u(A, a.file, a.inputElem), o();
                                }),
                                    d.parse(a.file, a.instanceConfig);
                            } else E(t.complete) && t.complete();
                        }
                        function o() {
                            n.splice(0, 1), s();
                        }
                    };
                }
                function H(t) {
                    (this._handle = null),
                        (this._finished = !1),
                        (this._completed = !1),
                        (this._halted = !1),
                        (this._input = null),
                        (this._baseIndex = 0),
                        (this._partialLine = ''),
                        (this._rowCount = 0),
                        (this._start = 0),
                        (this._nextChunk = null),
                        (this.isFirstChunk = !0),
                        (this._completeResults = {
                            data: [],
                            errors: [],
                            meta: {},
                        }),
                        function (e) {
                            var n = fe(e);
                            (n.chunkSize = parseInt(n.chunkSize)),
                                e.step || e.chunk || (n.chunkSize = null),
                                (this._handle = new le(n)),
                                ((this._handle.streamer = this)._config = n);
                        }.call(this, t),
                        (this.parseChunk = function (e, n) {
                            if (
                                this.isFirstChunk &&
                                E(this._config.beforeFirstChunk)
                            ) {
                                var s = this._config.beforeFirstChunk(e);
                                void 0 !== s && (e = s);
                            }
                            (this.isFirstChunk = !1), (this._halted = !1);
                            var o = this._partialLine + e;
                            this._partialLine = '';
                            var i = this._handle.parse(
                                o,
                                this._baseIndex,
                                !this._finished
                            );
                            if (
                                !this._handle.paused() &&
                                !this._handle.aborted()
                            ) {
                                var c = i.meta.cursor;
                                this._finished ||
                                    ((this._partialLine = o.substring(
                                        c - this._baseIndex
                                    )),
                                    (this._baseIndex = c)),
                                    i &&
                                        i.data &&
                                        (this._rowCount += i.data.length);
                                var _ =
                                    this._finished ||
                                    (this._config.preview &&
                                        this._rowCount >= this._config.preview);
                                if (re)
                                    w.postMessage({
                                        results: i,
                                        workerId: d.WORKER_ID,
                                        finished: _,
                                    });
                                else if (E(this._config.chunk) && !n) {
                                    if (
                                        (this._config.chunk(i, this._handle),
                                        this._handle.paused() ||
                                            this._handle.aborted())
                                    )
                                        return void (this._halted = !0);
                                    (i = void 0),
                                        (this._completeResults = void 0);
                                }
                                return (
                                    this._config.step ||
                                        this._config.chunk ||
                                        ((this._completeResults.data =
                                            this._completeResults.data.concat(
                                                i.data
                                            )),
                                        (this._completeResults.errors =
                                            this._completeResults.errors.concat(
                                                i.errors
                                            )),
                                        (this._completeResults.meta = i.meta)),
                                    this._completed ||
                                        !_ ||
                                        !E(this._config.complete) ||
                                        (i && i.meta.aborted) ||
                                        (this._config.complete(
                                            this._completeResults,
                                            this._input
                                        ),
                                        (this._completed = !0)),
                                    _ ||
                                        (i && i.meta.paused) ||
                                        this._nextChunk(),
                                    i
                                );
                            }
                            this._halted = !0;
                        }),
                        (this._sendError = function (e) {
                            E(this._config.error)
                                ? this._config.error(e)
                                : re &&
                                  this._config.error &&
                                  w.postMessage({
                                      workerId: d.WORKER_ID,
                                      error: e,
                                      finished: !1,
                                  });
                        });
                }
                function q(t) {
                    var e;
                    (t = t || {}).chunkSize ||
                        (t.chunkSize = d.RemoteChunkSize),
                        H.call(this, t),
                        (this._nextChunk = W
                            ? function () {
                                  this._readChunk(), this._chunkLoaded();
                              }
                            : function () {
                                  this._readChunk();
                              }),
                        (this.stream = function (n) {
                            (this._input = n), this._nextChunk();
                        }),
                        (this._readChunk = function () {
                            if (this._finished) this._chunkLoaded();
                            else {
                                if (
                                    ((e = new XMLHttpRequest()),
                                    this._config.withCredentials &&
                                        (e.withCredentials =
                                            this._config.withCredentials),
                                    W ||
                                        ((e.onload = B(
                                            this._chunkLoaded,
                                            this
                                        )),
                                        (e.onerror = B(
                                            this._chunkError,
                                            this
                                        ))),
                                    e.open(
                                        this._config.downloadRequestBody
                                            ? 'POST'
                                            : 'GET',
                                        this._input,
                                        !W
                                    ),
                                    this._config.downloadRequestHeaders)
                                ) {
                                    var n = this._config.downloadRequestHeaders;
                                    for (var s in n)
                                        e.setRequestHeader(s, n[s]);
                                }
                                this._config.chunkSize &&
                                    e.setRequestHeader(
                                        'Range',
                                        'bytes=' +
                                            this._start +
                                            '-' +
                                            (this._start +
                                                this._config.chunkSize -
                                                1)
                                    );
                                try {
                                    e.send(this._config.downloadRequestBody);
                                } catch (i) {
                                    this._chunkError(i.message);
                                }
                                W && 0 === e.status && this._chunkError();
                            }
                        }),
                        (this._chunkLoaded = function () {
                            var s;
                            4 === e.readyState &&
                                (e.status < 200 || 400 <= e.status
                                    ? this._chunkError()
                                    : ((this._start += this._config.chunkSize
                                          ? this._config.chunkSize
                                          : e.responseText.length),
                                      (this._finished =
                                          !this._config.chunkSize ||
                                          this._start >=
                                              (null ===
                                              (s =
                                                  e.getResponseHeader(
                                                      'Content-Range'
                                                  ))
                                                  ? -1
                                                  : parseInt(
                                                        s.substring(
                                                            s.lastIndexOf('/') +
                                                                1
                                                        )
                                                    ))),
                                      this.parseChunk(e.responseText)));
                        }),
                        (this._chunkError = function (n) {
                            this._sendError(new Error(e.statusText || n));
                        });
                }
                function X(t) {
                    var e, n;
                    (t = t || {}).chunkSize || (t.chunkSize = d.LocalChunkSize),
                        H.call(this, t);
                    var s = 'undefined' != typeof FileReader;
                    (this.stream = function (o) {
                        (this._input = o),
                            (n = o.slice || o.webkitSlice || o.mozSlice),
                            s
                                ? (((e = new FileReader()).onload = B(
                                      this._chunkLoaded,
                                      this
                                  )),
                                  (e.onerror = B(this._chunkError, this)))
                                : (e = new FileReaderSync()),
                            this._nextChunk();
                    }),
                        (this._nextChunk = function () {
                            this._finished ||
                                (this._config.preview &&
                                    !(this._rowCount < this._config.preview)) ||
                                this._readChunk();
                        }),
                        (this._readChunk = function () {
                            var o = this._input;
                            if (this._config.chunkSize) {
                                var i = Math.min(
                                    this._start + this._config.chunkSize,
                                    this._input.size
                                );
                                o = n.call(o, this._start, i);
                            }
                            var c = e.readAsText(o, this._config.encoding);
                            s || this._chunkLoaded({ target: { result: c } });
                        }),
                        (this._chunkLoaded = function (o) {
                            (this._start += this._config.chunkSize),
                                (this._finished =
                                    !this._config.chunkSize ||
                                    this._start >= this._input.size),
                                this.parseChunk(o.target.result);
                        }),
                        (this._chunkError = function () {
                            this._sendError(e.error);
                        });
                }
                function V(t) {
                    var e;
                    H.call(this, (t = t || {})),
                        (this.stream = function (n) {
                            return (e = n), this._nextChunk();
                        }),
                        (this._nextChunk = function () {
                            if (!this._finished) {
                                var n,
                                    s = this._config.chunkSize;
                                return (
                                    s
                                        ? ((n = e.substring(0, s)),
                                          (e = e.substring(s)))
                                        : ((n = e), (e = '')),
                                    (this._finished = !e),
                                    this.parseChunk(n)
                                );
                            }
                        });
                }
                function m(t) {
                    H.call(this, (t = t || {}));
                    var e = [],
                        n = !0,
                        s = !1;
                    (this.pause = function () {
                        H.prototype.pause.apply(this, arguments),
                            this._input.pause();
                    }),
                        (this.resume = function () {
                            H.prototype.resume.apply(this, arguments),
                                this._input.resume();
                        }),
                        (this.stream = function (o) {
                            (this._input = o),
                                this._input.on('data', this._streamData),
                                this._input.on('end', this._streamEnd),
                                this._input.on('error', this._streamError);
                        }),
                        (this._checkIsFinished = function () {
                            s && 1 === e.length && (this._finished = !0);
                        }),
                        (this._nextChunk = function () {
                            this._checkIsFinished(),
                                e.length
                                    ? this.parseChunk(e.shift())
                                    : (n = !0);
                        }),
                        (this._streamData = B(function (o) {
                            try {
                                e.push(
                                    'string' == typeof o
                                        ? o
                                        : o.toString(this._config.encoding)
                                ),
                                    n &&
                                        ((n = !1),
                                        this._checkIsFinished(),
                                        this.parseChunk(e.shift()));
                            } catch (i) {
                                this._streamError(i);
                            }
                        }, this)),
                        (this._streamError = B(function (o) {
                            this._streamCleanUp(), this._sendError(o);
                        }, this)),
                        (this._streamEnd = B(function () {
                            this._streamCleanUp(),
                                (s = !0),
                                this._streamData('');
                        }, this)),
                        (this._streamCleanUp = B(function () {
                            this._input.removeListener(
                                'data',
                                this._streamData
                            ),
                                this._input.removeListener(
                                    'end',
                                    this._streamEnd
                                ),
                                this._input.removeListener(
                                    'error',
                                    this._streamError
                                );
                        }, this));
                }
                function le(t) {
                    var e,
                        n,
                        s,
                        o = Math.pow(2, 53),
                        i = -o,
                        c = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,
                        _ =
                            /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/,
                        k = this,
                        a = 0,
                        g = 0,
                        u = !1,
                        A = !1,
                        D = [],
                        r = { data: [], errors: [], meta: {} };
                    if (E(t.step)) {
                        var p = t.step;
                        t.step = function (l) {
                            if (((r = l), O())) S();
                            else {
                                if ((S(), 0 === r.data.length)) return;
                                (a += l.data.length),
                                    t.preview && a > t.preview
                                        ? n.abort()
                                        : ((r.data = r.data[0]), p(r, k));
                            }
                        };
                    }
                    function F(l) {
                        return 'greedy' === t.skipEmptyLines
                            ? '' === l.join('').trim()
                            : 1 === l.length && 0 === l[0].length;
                    }
                    function S() {
                        return (
                            r &&
                                s &&
                                (x(
                                    'Delimiter',
                                    'UndetectableDelimiter',
                                    "Unable to auto-detect delimiting character; defaulted to '" +
                                        d.DefaultDelimiter +
                                        "'"
                                ),
                                (s = !1)),
                            t.skipEmptyLines &&
                                (r.data = r.data.filter(function (l) {
                                    return !F(l);
                                })),
                            O() &&
                                (function () {
                                    if (r)
                                        if (Array.isArray(r.data[0])) {
                                            for (
                                                var v = 0;
                                                O() && v < r.data.length;
                                                v++
                                            )
                                                r.data[v].forEach(l);
                                            r.data.splice(0, 1);
                                        } else r.data.forEach(l);
                                    function l(b, I) {
                                        E(t.transformHeader) &&
                                            (b = t.transformHeader(b, I)),
                                            D.push(b);
                                    }
                                })(),
                            (function () {
                                if (
                                    !r ||
                                    (!t.header &&
                                        !t.dynamicTyping &&
                                        !t.transform)
                                )
                                    return r;
                                function l(b, I) {
                                    var f,
                                        y = t.header ? {} : [];
                                    for (f = 0; f < b.length; f++) {
                                        var R = f,
                                            h = b[f];
                                        t.header &&
                                            (R =
                                                f >= D.length
                                                    ? '__parsed_extra'
                                                    : D[f]),
                                            t.transform &&
                                                (h = t.transform(h, R)),
                                            (h = T(R, h)),
                                            '__parsed_extra' === R
                                                ? ((y[R] = y[R] || []),
                                                  y[R].push(h))
                                                : (y[R] = h);
                                    }
                                    return (
                                        t.header &&
                                            (f > D.length
                                                ? x(
                                                      'FieldMismatch',
                                                      'TooManyFields',
                                                      'Too many fields: expected ' +
                                                          D.length +
                                                          ' fields but parsed ' +
                                                          f,
                                                      g + I
                                                  )
                                                : f < D.length &&
                                                  x(
                                                      'FieldMismatch',
                                                      'TooFewFields',
                                                      'Too few fields: expected ' +
                                                          D.length +
                                                          ' fields but parsed ' +
                                                          f,
                                                      g + I
                                                  )),
                                        y
                                    );
                                }
                                var v = 1;
                                return (
                                    !r.data.length || Array.isArray(r.data[0])
                                        ? ((r.data = r.data.map(l)),
                                          (v = r.data.length))
                                        : (r.data = l(r.data, 0)),
                                    t.header && r.meta && (r.meta.fields = D),
                                    (g += v),
                                    r
                                );
                            })()
                        );
                    }
                    function O() {
                        return t.header && 0 === D.length;
                    }
                    function T(l, v) {
                        return (
                            (b = l),
                            t.dynamicTypingFunction &&
                                void 0 === t.dynamicTyping[b] &&
                                (t.dynamicTyping[b] =
                                    t.dynamicTypingFunction(b)),
                            !0 === (t.dynamicTyping[b] || t.dynamicTyping)
                                ? 'true' === v ||
                                  'TRUE' === v ||
                                  ('false' !== v &&
                                      'FALSE' !== v &&
                                      ((function (I) {
                                          if (c.test(I)) {
                                              var f = parseFloat(I);
                                              if (i < f && f < o) return !0;
                                          }
                                          return !1;
                                      })(v)
                                          ? parseFloat(v)
                                          : _.test(v)
                                          ? new Date(v)
                                          : '' === v
                                          ? null
                                          : v))
                                : v
                        );
                        var b;
                    }
                    function x(l, v, b, I) {
                        var f = { type: l, code: v, message: b };
                        void 0 !== I && (f.row = I), r.errors.push(f);
                    }
                    (this.parse = function (l, v, b) {
                        if (
                            (t.newline ||
                                (t.newline = (function (R, h) {
                                    R = R.substring(0, 1048576);
                                    var K = new RegExp(
                                            Y(h) + '([^]*?)' + Y(h),
                                            'gm'
                                        ),
                                        z = (R = R.replace(K, '')).split('\r'),
                                        M = R.split('\n');
                                    if (
                                        1 === z.length ||
                                        (1 < M.length &&
                                            M[0].length < z[0].length)
                                    )
                                        return '\n';
                                    for (var P = 0, U = 0; U < z.length; U++)
                                        '\n' === z[U][0] && P++;
                                    return P >= z.length / 2 ? '\r\n' : '\r';
                                })(l, t.quoteChar || '"')),
                            (s = !1),
                            t.delimiter)
                        )
                            E(t.delimiter) &&
                                ((t.delimiter = t.delimiter(l)),
                                (r.meta.delimiter = t.delimiter));
                        else {
                            var f = (function (R, h, K, z, M) {
                                var J, P, U, N;
                                M = M || [
                                    ',',
                                    '\t',
                                    '|',
                                    ';',
                                    d.RECORD_SEP,
                                    d.UNIT_SEP,
                                ];
                                for (var Z = 0; Z < M.length; Z++) {
                                    var L = M[Z],
                                        te = 0,
                                        j = 0,
                                        ge = 0;
                                    U = void 0;
                                    for (
                                        var ie = new ee({
                                                comments: z,
                                                delimiter: L,
                                                newline: h,
                                                preview: 10,
                                            }).parse(R),
                                            pe = 0;
                                        pe < ie.data.length;
                                        pe++
                                    )
                                        if (K && F(ie.data[pe])) ge++;
                                        else {
                                            var se = ie.data[pe].length;
                                            (j += se),
                                                void 0 !== U
                                                    ? 0 < se &&
                                                      ((te += Math.abs(se - U)),
                                                      (U = se))
                                                    : (U = se);
                                        }
                                    0 < ie.data.length &&
                                        (j /= ie.data.length - ge),
                                        (void 0 === P || te <= P) &&
                                            (void 0 === N || N < j) &&
                                            1.99 < j &&
                                            ((P = te), (J = L), (N = j));
                                }
                                return {
                                    successful: !!(t.delimiter = J),
                                    bestDelimiter: J,
                                };
                            })(
                                l,
                                t.newline,
                                t.skipEmptyLines,
                                t.comments,
                                t.delimitersToGuess
                            );
                            f.successful
                                ? (t.delimiter = f.bestDelimiter)
                                : ((s = !0),
                                  (t.delimiter = d.DefaultDelimiter)),
                                (r.meta.delimiter = t.delimiter);
                        }
                        var y = fe(t);
                        return (
                            t.preview && t.header && y.preview++,
                            (e = l),
                            (n = new ee(y)),
                            (r = n.parse(e, v, b)),
                            S(),
                            u
                                ? { meta: { paused: !0 } }
                                : r || { meta: { paused: !1 } }
                        );
                    }),
                        (this.paused = function () {
                            return u;
                        }),
                        (this.pause = function () {
                            (u = !0),
                                n.abort(),
                                (e = E(t.chunk)
                                    ? ''
                                    : e.substring(n.getCharIndex()));
                        }),
                        (this.resume = function () {
                            k.streamer._halted
                                ? ((u = !1), k.streamer.parseChunk(e, !0))
                                : setTimeout(k.resume, 3);
                        }),
                        (this.aborted = function () {
                            return A;
                        }),
                        (this.abort = function () {
                            (A = !0),
                                n.abort(),
                                (r.meta.aborted = !0),
                                E(t.complete) && t.complete(r),
                                (e = '');
                        });
                }
                function Y(t) {
                    return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                }
                function ee(t) {
                    var e,
                        n = (t = t || {}).delimiter,
                        s = t.newline,
                        o = t.comments,
                        i = t.step,
                        c = t.preview,
                        _ = t.fastMode,
                        k = (e = null == t.quoteChar ? '"' : t.quoteChar);
                    if (
                        (void 0 !== t.escapeChar && (k = t.escapeChar),
                        ('string' != typeof n ||
                            -1 < d.BAD_DELIMITERS.indexOf(n)) &&
                            (n = ','),
                        o === n)
                    )
                        throw new Error('Comment character same as delimiter');
                    !0 === o
                        ? (o = '#')
                        : ('string' != typeof o ||
                              -1 < d.BAD_DELIMITERS.indexOf(o)) &&
                          (o = !1),
                        '\n' !== s && '\r' !== s && '\r\n' !== s && (s = '\n');
                    var a = 0,
                        g = !1;
                    (this.parse = function (u, A, D) {
                        if ('string' != typeof u)
                            throw new Error('Input must be a string');
                        var r = u.length,
                            p = n.length,
                            F = s.length,
                            S = o.length,
                            O = E(i),
                            T = [],
                            x = [],
                            l = [],
                            v = (a = 0);
                        if (!u) return N();
                        if (_ || (!1 !== _ && -1 === u.indexOf(e))) {
                            for (var b = u.split(s), I = 0; I < b.length; I++) {
                                if (
                                    ((a += (l = b[I]).length),
                                    I !== b.length - 1)
                                )
                                    a += s.length;
                                else if (D) return N();
                                if (!o || l.substring(0, S) !== o) {
                                    if (O) {
                                        if (((T = []), M(l.split(n)), Z(), g))
                                            return N();
                                    } else M(l.split(n));
                                    if (c && c <= I)
                                        return (T = T.slice(0, c)), N(!0);
                                }
                            }
                            return N();
                        }
                        for (
                            var f = u.indexOf(n, a),
                                y = u.indexOf(s, a),
                                R = new RegExp(Y(k) + Y(e), 'g'),
                                h = u.indexOf(e, a);
                            ;

                        )
                            if (u[a] !== e)
                                if (
                                    o &&
                                    0 === l.length &&
                                    u.substring(a, a + S) === o
                                ) {
                                    if (-1 === y) return N();
                                    (y = u.indexOf(s, (a = y + F))),
                                        (f = u.indexOf(n, a));
                                } else if (-1 !== f && (f < y || -1 === y))
                                    l.push(u.substring(a, f)),
                                        (f = u.indexOf(n, (a = f + p)));
                                else {
                                    if (-1 === y) break;
                                    if (
                                        (l.push(u.substring(a, y)),
                                        U(y + F),
                                        O && (Z(), g))
                                    )
                                        return N();
                                    if (c && T.length >= c) return N(!0);
                                }
                            else
                                for (h = a, a++; ; ) {
                                    if (-1 === (h = u.indexOf(e, h + 1)))
                                        return (
                                            D ||
                                                x.push({
                                                    type: 'Quotes',
                                                    code: 'MissingQuotes',
                                                    message:
                                                        'Quoted field unterminated',
                                                    row: T.length,
                                                    index: a,
                                                }),
                                            P()
                                        );
                                    if (h === r - 1)
                                        return P(
                                            u.substring(a, h).replace(R, e)
                                        );
                                    if (e !== k || u[h + 1] !== k) {
                                        if (
                                            e === k ||
                                            0 === h ||
                                            u[h - 1] !== k
                                        ) {
                                            -1 !== f &&
                                                f < h + 1 &&
                                                (f = u.indexOf(n, h + 1)),
                                                -1 !== y &&
                                                    y < h + 1 &&
                                                    (y = u.indexOf(s, h + 1));
                                            var K = J(
                                                -1 === y ? f : Math.min(f, y)
                                            );
                                            if (u.substr(h + 1 + K, p) === n) {
                                                l.push(
                                                    u
                                                        .substring(a, h)
                                                        .replace(R, e)
                                                ),
                                                    u[(a = h + 1 + K + p)] !==
                                                        e &&
                                                        (h = u.indexOf(e, a)),
                                                    (f = u.indexOf(n, a)),
                                                    (y = u.indexOf(s, a));
                                                break;
                                            }
                                            var z = J(y);
                                            if (
                                                u.substring(
                                                    h + 1 + z,
                                                    h + 1 + z + F
                                                ) === s
                                            ) {
                                                if (
                                                    (l.push(
                                                        u
                                                            .substring(a, h)
                                                            .replace(R, e)
                                                    ),
                                                    U(h + 1 + z + F),
                                                    (f = u.indexOf(n, a)),
                                                    (h = u.indexOf(e, a)),
                                                    O && (Z(), g))
                                                )
                                                    return N();
                                                if (c && T.length >= c)
                                                    return N(!0);
                                                break;
                                            }
                                            x.push({
                                                type: 'Quotes',
                                                code: 'InvalidQuotes',
                                                message:
                                                    'Trailing quote on quoted field is malformed',
                                                row: T.length,
                                                index: a,
                                            }),
                                                h++;
                                        }
                                    } else h++;
                                }
                        return P();
                        function M(L) {
                            T.push(L), (v = a);
                        }
                        function J(L) {
                            var te = 0;
                            if (-1 !== L) {
                                var j = u.substring(h + 1, L);
                                j && '' === j.trim() && (te = j.length);
                            }
                            return te;
                        }
                        function P(L) {
                            return (
                                D ||
                                    (void 0 === L && (L = u.substring(a)),
                                    l.push(L),
                                    (a = r),
                                    M(l),
                                    O && Z()),
                                N()
                            );
                        }
                        function U(L) {
                            (a = L), M(l), (l = []), (y = u.indexOf(s, a));
                        }
                        function N(L) {
                            return {
                                data: T,
                                errors: x,
                                meta: {
                                    delimiter: n,
                                    linebreak: s,
                                    aborted: g,
                                    truncated: !!L,
                                    cursor: v + (A || 0),
                                },
                            };
                        }
                        function Z() {
                            i(N()), (T = []), (x = []);
                        }
                    }),
                        (this.abort = function () {
                            g = !0;
                        }),
                        (this.getCharIndex = function () {
                            return a;
                        });
                }
                function de(t) {
                    var e = t.data,
                        n = G[e.workerId],
                        s = !1;
                    if (e.error) n.userError(e.error, e.file);
                    else if (e.results && e.results.data) {
                        var o = {
                            abort: function () {
                                (s = !0),
                                    he(e.workerId, {
                                        data: [],
                                        errors: [],
                                        meta: { aborted: !0 },
                                    });
                            },
                            pause: ce,
                            resume: ce,
                        };
                        if (E(n.userStep)) {
                            for (
                                var i = 0;
                                i < e.results.data.length &&
                                (n.userStep(
                                    {
                                        data: e.results.data[i],
                                        errors: e.results.errors,
                                        meta: e.results.meta,
                                    },
                                    o
                                ),
                                !s);
                                i++
                            );
                            delete e.results;
                        } else
                            E(n.userChunk) &&
                                (n.userChunk(e.results, o, e.file),
                                delete e.results);
                    }
                    e.finished && !s && he(e.workerId, e.results);
                }
                function he(t, e) {
                    var n = G[t];
                    E(n.userComplete) && n.userComplete(e),
                        n.terminate(),
                        delete G[t];
                }
                function ce() {
                    throw new Error('Not implemented.');
                }
                function fe(t) {
                    if ('object' != typeof t || null === t) return t;
                    var e = Array.isArray(t) ? [] : {};
                    for (var n in t) e[n] = fe(t[n]);
                    return e;
                }
                function B(t, e) {
                    return function () {
                        t.apply(e, arguments);
                    };
                }
                function E(t) {
                    return 'function' == typeof t;
                }
                return (
                    re &&
                        (w.onmessage = function (t) {
                            var e = t.data;
                            if (
                                (void 0 === d.WORKER_ID &&
                                    e &&
                                    (d.WORKER_ID = e.workerId),
                                'string' == typeof e.input)
                            )
                                w.postMessage({
                                    workerId: d.WORKER_ID,
                                    results: d.parse(e.input, e.config),
                                    finished: !0,
                                });
                            else if (
                                (w.File && e.input instanceof File) ||
                                e.input instanceof Object
                            ) {
                                var n = d.parse(e.input, e.config);
                                n &&
                                    w.postMessage({
                                        workerId: d.WORKER_ID,
                                        results: n,
                                        finished: !0,
                                    });
                            }
                        }),
                    ((q.prototype = Object.create(H.prototype)).constructor =
                        q),
                    ((X.prototype = Object.create(H.prototype)).constructor =
                        X),
                    ((V.prototype = Object.create(V.prototype)).constructor =
                        V),
                    ((m.prototype = Object.create(H.prototype)).constructor =
                        m),
                    d
                );
            }),
                void 0 !== ($ = C.apply(ae, [])) && (me.exports = $);
        },
    },
]);
