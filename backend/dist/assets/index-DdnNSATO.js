;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l)
  new MutationObserver((l) => {
    for (const o of l)
      if (o.type === 'childList')
        for (const i of o.addedNodes)
          i.tagName === 'LINK' && i.rel === 'modulepreload' && r(i)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(l) {
    const o = {}
    return (
      l.integrity && (o.integrity = l.integrity),
      l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : l.crossOrigin === 'anonymous'
          ? (o.credentials = 'omit')
          : (o.credentials = 'same-origin'),
      o
    )
  }
  function r(l) {
    if (l.ep) return
    l.ep = !0
    const o = n(l)
    fetch(l.href, o)
  }
})()
var gc = { exports: {} },
  _o = {},
  wc = { exports: {} },
  Q = {}
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var il = Symbol.for('react.element'),
  cp = Symbol.for('react.portal'),
  fp = Symbol.for('react.fragment'),
  dp = Symbol.for('react.strict_mode'),
  pp = Symbol.for('react.profiler'),
  hp = Symbol.for('react.provider'),
  mp = Symbol.for('react.context'),
  vp = Symbol.for('react.forward_ref'),
  yp = Symbol.for('react.suspense'),
  gp = Symbol.for('react.memo'),
  wp = Symbol.for('react.lazy'),
  Hu = Symbol.iterator
function Sp(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (Hu && e[Hu]) || e['@@iterator']),
      typeof e == 'function' ? e : null)
}
var Sc = {
    isMounted: function () {
      return !1
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Ec = Object.assign,
  kc = {}
function cr(e, t, n) {
  ;(this.props = e),
    (this.context = t),
    (this.refs = kc),
    (this.updater = n || Sc)
}
cr.prototype.isReactComponent = {}
cr.prototype.setState = function (e, t) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error(
      'setState(...): takes an object of state variables to update or a function which returns an object of state variables.',
    )
  this.updater.enqueueSetState(this, e, t, 'setState')
}
cr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate')
}
function xc() {}
xc.prototype = cr.prototype
function xa(e, t, n) {
  ;(this.props = e),
    (this.context = t),
    (this.refs = kc),
    (this.updater = n || Sc)
}
var Ca = (xa.prototype = new xc())
Ca.constructor = xa
Ec(Ca, cr.prototype)
Ca.isPureReactComponent = !0
var Bu = Array.isArray,
  Cc = Object.prototype.hasOwnProperty,
  Pa = { current: null },
  Pc = { key: !0, ref: !0, __self: !0, __source: !0 }
function Rc(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (o = '' + t.key),
    t))
      Cc.call(t, r) && !Pc.hasOwnProperty(r) && (l[r] = t[r])
  var a = arguments.length - 2
  if (a === 1) l.children = n
  else if (1 < a) {
    for (var u = Array(a), s = 0; s < a; s++) u[s] = arguments[s + 2]
    l.children = u
  }
  if (e && e.defaultProps)
    for (r in ((a = e.defaultProps), a)) l[r] === void 0 && (l[r] = a[r])
  return { $$typeof: il, type: e, key: o, ref: i, props: l, _owner: Pa.current }
}
function Ep(e, t) {
  return {
    $$typeof: il,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  }
}
function Ra(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === il
}
function kp(e) {
  var t = { '=': '=0', ':': '=2' }
  return (
    '$' +
    e.replace(/[=:]/g, function (n) {
      return t[n]
    })
  )
}
var Vu = /\/+/g
function Zo(e, t) {
  return typeof e == 'object' && e !== null && e.key != null
    ? kp('' + e.key)
    : t.toString(36)
}
function $l(e, t, n, r, l) {
  var o = typeof e
  ;(o === 'undefined' || o === 'boolean') && (e = null)
  var i = !1
  if (e === null) i = !0
  else
    switch (o) {
      case 'string':
      case 'number':
        i = !0
        break
      case 'object':
        switch (e.$$typeof) {
          case il:
          case cp:
            i = !0
        }
    }
  if (i)
    return (
      (i = e),
      (l = l(i)),
      (e = r === '' ? '.' + Zo(i, 0) : r),
      Bu(l)
        ? ((n = ''),
          e != null && (n = e.replace(Vu, '$&/') + '/'),
          $l(l, t, n, '', function (s) {
            return s
          }))
        : l != null &&
          (Ra(l) &&
            (l = Ep(
              l,
              n +
                (!l.key || (i && i.key === l.key)
                  ? ''
                  : ('' + l.key).replace(Vu, '$&/') + '/') +
                e,
            )),
          t.push(l)),
      1
    )
  if (((i = 0), (r = r === '' ? '.' : r + ':'), Bu(e)))
    for (var a = 0; a < e.length; a++) {
      o = e[a]
      var u = r + Zo(o, a)
      i += $l(o, t, n, u, l)
    }
  else if (((u = Sp(e)), typeof u == 'function'))
    for (e = u.call(e), a = 0; !(o = e.next()).done; )
      (o = o.value), (u = r + Zo(o, a++)), (i += $l(o, t, n, u, l))
  else if (o === 'object')
    throw (
      ((t = String(e)),
      Error(
        'Objects are not valid as a React child (found: ' +
          (t === '[object Object]'
            ? 'object with keys {' + Object.keys(e).join(', ') + '}'
            : t) +
          '). If you meant to render a collection of children, use an array instead.',
      ))
    )
  return i
}
function Sl(e, t, n) {
  if (e == null) return e
  var r = [],
    l = 0
  return (
    $l(e, r, '', '', function (o) {
      return t.call(n, o, l++)
    }),
    r
  )
}
function xp(e) {
  if (e._status === -1) {
    var t = e._result
    ;(t = t()),
      t.then(
        function (n) {
          ;(e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n))
        },
        function (n) {
          ;(e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n))
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t))
  }
  if (e._status === 1) return e._result.default
  throw e._result
}
var Me = { current: null },
  Al = { transition: null },
  Cp = {
    ReactCurrentDispatcher: Me,
    ReactCurrentBatchConfig: Al,
    ReactCurrentOwner: Pa,
  }
function Lc() {
  throw Error('act(...) is not supported in production builds of React.')
}
Q.Children = {
  map: Sl,
  forEach: function (e, t, n) {
    Sl(
      e,
      function () {
        t.apply(this, arguments)
      },
      n,
    )
  },
  count: function (e) {
    var t = 0
    return (
      Sl(e, function () {
        t++
      }),
      t
    )
  },
  toArray: function (e) {
    return (
      Sl(e, function (t) {
        return t
      }) || []
    )
  },
  only: function (e) {
    if (!Ra(e))
      throw Error(
        'React.Children.only expected to receive a single React element child.',
      )
    return e
  },
}
Q.Component = cr
Q.Fragment = fp
Q.Profiler = pp
Q.PureComponent = xa
Q.StrictMode = dp
Q.Suspense = yp
Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Cp
Q.act = Lc
Q.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      'React.cloneElement(...): The argument must be a React element, but you passed ' +
        e +
        '.',
    )
  var r = Ec({}, e.props),
    l = e.key,
    o = e.ref,
    i = e._owner
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (i = Pa.current)),
      t.key !== void 0 && (l = '' + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps
    for (u in t)
      Cc.call(t, u) &&
        !Pc.hasOwnProperty(u) &&
        (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u])
  }
  var u = arguments.length - 2
  if (u === 1) r.children = n
  else if (1 < u) {
    a = Array(u)
    for (var s = 0; s < u; s++) a[s] = arguments[s + 2]
    r.children = a
  }
  return { $$typeof: il, type: e.type, key: l, ref: o, props: r, _owner: i }
}
Q.createContext = function (e) {
  return (
    (e = {
      $$typeof: mp,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: hp, _context: e }),
    (e.Consumer = e)
  )
}
Q.createElement = Rc
Q.createFactory = function (e) {
  var t = Rc.bind(null, e)
  return (t.type = e), t
}
Q.createRef = function () {
  return { current: null }
}
Q.forwardRef = function (e) {
  return { $$typeof: vp, render: e }
}
Q.isValidElement = Ra
Q.lazy = function (e) {
  return { $$typeof: wp, _payload: { _status: -1, _result: e }, _init: xp }
}
Q.memo = function (e, t) {
  return { $$typeof: gp, type: e, compare: t === void 0 ? null : t }
}
Q.startTransition = function (e) {
  var t = Al.transition
  Al.transition = {}
  try {
    e()
  } finally {
    Al.transition = t
  }
}
Q.unstable_act = Lc
Q.useCallback = function (e, t) {
  return Me.current.useCallback(e, t)
}
Q.useContext = function (e) {
  return Me.current.useContext(e)
}
Q.useDebugValue = function () {}
Q.useDeferredValue = function (e) {
  return Me.current.useDeferredValue(e)
}
Q.useEffect = function (e, t) {
  return Me.current.useEffect(e, t)
}
Q.useId = function () {
  return Me.current.useId()
}
Q.useImperativeHandle = function (e, t, n) {
  return Me.current.useImperativeHandle(e, t, n)
}
Q.useInsertionEffect = function (e, t) {
  return Me.current.useInsertionEffect(e, t)
}
Q.useLayoutEffect = function (e, t) {
  return Me.current.useLayoutEffect(e, t)
}
Q.useMemo = function (e, t) {
  return Me.current.useMemo(e, t)
}
Q.useReducer = function (e, t, n) {
  return Me.current.useReducer(e, t, n)
}
Q.useRef = function (e) {
  return Me.current.useRef(e)
}
Q.useState = function (e) {
  return Me.current.useState(e)
}
Q.useSyncExternalStore = function (e, t, n) {
  return Me.current.useSyncExternalStore(e, t, n)
}
Q.useTransition = function () {
  return Me.current.useTransition()
}
Q.version = '18.3.1'
wc.exports = Q
var x = wc.exports
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Pp = x,
  Rp = Symbol.for('react.element'),
  Lp = Symbol.for('react.fragment'),
  _p = Object.prototype.hasOwnProperty,
  Tp = Pp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Np = { key: !0, ref: !0, __self: !0, __source: !0 }
function _c(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null
  n !== void 0 && (o = '' + n),
    t.key !== void 0 && (o = '' + t.key),
    t.ref !== void 0 && (i = t.ref)
  for (r in t) _p.call(t, r) && !Np.hasOwnProperty(r) && (l[r] = t[r])
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r])
  return { $$typeof: Rp, type: e, key: o, ref: i, props: l, _owner: Tp.current }
}
_o.Fragment = Lp
_o.jsx = _c
_o.jsxs = _c
gc.exports = _o
var pe = gc.exports,
  Li = {},
  Tc = { exports: {} },
  Qe = {},
  Nc = { exports: {} },
  Dc = {}
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ ;(function (e) {
  function t(M, $) {
    var H = M.length
    M.push($)
    e: for (; 0 < H; ) {
      var J = (H - 1) >>> 1,
        G = M[J]
      if (0 < l(G, $)) (M[J] = $), (M[H] = G), (H = J)
      else break e
    }
  }
  function n(M) {
    return M.length === 0 ? null : M[0]
  }
  function r(M) {
    if (M.length === 0) return null
    var $ = M[0],
      H = M.pop()
    if (H !== $) {
      M[0] = H
      e: for (var J = 0, G = M.length, Xe = G >>> 1; J < Xe; ) {
        var Ge = 2 * (J + 1) - 1,
          lt = M[Ge],
          Ct = Ge + 1,
          zn = M[Ct]
        if (0 > l(lt, H))
          Ct < G && 0 > l(zn, lt)
            ? ((M[J] = zn), (M[Ct] = H), (J = Ct))
            : ((M[J] = lt), (M[Ge] = H), (J = Ge))
        else if (Ct < G && 0 > l(zn, H)) (M[J] = zn), (M[Ct] = H), (J = Ct)
        else break e
      }
    }
    return $
  }
  function l(M, $) {
    var H = M.sortIndex - $.sortIndex
    return H !== 0 ? H : M.id - $.id
  }
  if (typeof performance == 'object' && typeof performance.now == 'function') {
    var o = performance
    e.unstable_now = function () {
      return o.now()
    }
  } else {
    var i = Date,
      a = i.now()
    e.unstable_now = function () {
      return i.now() - a
    }
  }
  var u = [],
    s = [],
    d = 1,
    y = null,
    m = 3,
    g = !1,
    E = !1,
    k = !1,
    T = typeof setTimeout == 'function' ? setTimeout : null,
    f = typeof clearTimeout == 'function' ? clearTimeout : null,
    c = typeof setImmediate < 'u' ? setImmediate : null
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling)
  function p(M) {
    for (var $ = n(s); $ !== null; ) {
      if ($.callback === null) r(s)
      else if ($.startTime <= M) r(s), ($.sortIndex = $.expirationTime), t(u, $)
      else break
      $ = n(s)
    }
  }
  function C(M) {
    if (((k = !1), p(M), !E))
      if (n(u) !== null) (E = !0), jt(h)
      else {
        var $ = n(s)
        $ !== null && xt(C, $.startTime - M)
      }
  }
  function h(M, $) {
    ;(E = !1), k && ((k = !1), f(_), (_ = -1)), (g = !0)
    var H = m
    try {
      for (
        p($), y = n(u);
        y !== null && (!(y.expirationTime > $) || (M && !ne()));

      ) {
        var J = y.callback
        if (typeof J == 'function') {
          ;(y.callback = null), (m = y.priorityLevel)
          var G = J(y.expirationTime <= $)
          ;($ = e.unstable_now()),
            typeof G == 'function' ? (y.callback = G) : y === n(u) && r(u),
            p($)
        } else r(u)
        y = n(u)
      }
      if (y !== null) var Xe = !0
      else {
        var Ge = n(s)
        Ge !== null && xt(C, Ge.startTime - $), (Xe = !1)
      }
      return Xe
    } finally {
      ;(y = null), (m = H), (g = !1)
    }
  }
  var R = !1,
    N = null,
    _ = -1,
    A = 5,
    j = -1
  function ne() {
    return !(e.unstable_now() - j < A)
  }
  function Ye() {
    if (N !== null) {
      var M = e.unstable_now()
      j = M
      var $ = !0
      try {
        $ = N(!0, M)
      } finally {
        $ ? $e() : ((R = !1), (N = null))
      }
    } else R = !1
  }
  var $e
  if (typeof c == 'function')
    $e = function () {
      c(Ye)
    }
  else if (typeof MessageChannel < 'u') {
    var fn = new MessageChannel(),
      he = fn.port2
    ;(fn.port1.onmessage = Ye),
      ($e = function () {
        he.postMessage(null)
      })
  } else
    $e = function () {
      T(Ye, 0)
    }
  function jt(M) {
    ;(N = M), R || ((R = !0), $e())
  }
  function xt(M, $) {
    _ = T(function () {
      M(e.unstable_now())
    }, $)
  }
  ;(e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (M) {
      M.callback = null
    }),
    (e.unstable_continueExecution = function () {
      E || g || ((E = !0), jt(h))
    }),
    (e.unstable_forceFrameRate = function (M) {
      0 > M || 125 < M
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
          )
        : (A = 0 < M ? Math.floor(1e3 / M) : 5)
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return m
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u)
    }),
    (e.unstable_next = function (M) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var $ = 3
          break
        default:
          $ = m
      }
      var H = m
      m = $
      try {
        return M()
      } finally {
        m = H
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (M, $) {
      switch (M) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break
        default:
          M = 3
      }
      var H = m
      m = M
      try {
        return $()
      } finally {
        m = H
      }
    }),
    (e.unstable_scheduleCallback = function (M, $, H) {
      var J = e.unstable_now()
      switch (
        (typeof H == 'object' && H !== null
          ? ((H = H.delay), (H = typeof H == 'number' && 0 < H ? J + H : J))
          : (H = J),
        M)
      ) {
        case 1:
          var G = -1
          break
        case 2:
          G = 250
          break
        case 5:
          G = 1073741823
          break
        case 4:
          G = 1e4
          break
        default:
          G = 5e3
      }
      return (
        (G = H + G),
        (M = {
          id: d++,
          callback: $,
          priorityLevel: M,
          startTime: H,
          expirationTime: G,
          sortIndex: -1,
        }),
        H > J
          ? ((M.sortIndex = H),
            t(s, M),
            n(u) === null &&
              M === n(s) &&
              (k ? (f(_), (_ = -1)) : (k = !0), xt(C, H - J)))
          : ((M.sortIndex = G), t(u, M), E || g || ((E = !0), jt(h))),
        M
      )
    }),
    (e.unstable_shouldYield = ne),
    (e.unstable_wrapCallback = function (M) {
      var $ = m
      return function () {
        var H = m
        m = $
        try {
          return M.apply(this, arguments)
        } finally {
          m = H
        }
      }
    })
})(Dc)
Nc.exports = Dc
var Dp = Nc.exports
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Mp = x,
  We = Dp
function L(e) {
  for (
    var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1;
    n < arguments.length;
    n++
  )
    t += '&args[]=' + encodeURIComponent(arguments[n])
  return (
    'Minified React error #' +
    e +
    '; visit ' +
    t +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  )
}
var Mc = new Set(),
  Br = {}
function Tn(e, t) {
  rr(e, t), rr(e + 'Capture', t)
}
function rr(e, t) {
  for (Br[e] = t, e = 0; e < t.length; e++) Mc.add(t[e])
}
var Mt = !(
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
  ),
  _i = Object.prototype.hasOwnProperty,
  zp =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Wu = {},
  Qu = {}
function Op(e) {
  return _i.call(Qu, e)
    ? !0
    : _i.call(Wu, e)
      ? !1
      : zp.test(e)
        ? (Qu[e] = !0)
        : ((Wu[e] = !0), !1)
}
function Fp(e, t, n, r) {
  if (n !== null && n.type === 0) return !1
  switch (typeof t) {
    case 'function':
    case 'symbol':
      return !0
    case 'boolean':
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-')
    default:
      return !1
  }
}
function Ip(e, t, n, r) {
  if (t === null || typeof t > 'u' || Fp(e, t, n, r)) return !0
  if (r) return !1
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t
      case 4:
        return t === !1
      case 5:
        return isNaN(t)
      case 6:
        return isNaN(t) || 1 > t
    }
  return !1
}
function ze(e, t, n, r, l, o, i) {
  ;(this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = i)
}
var xe = {}
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    xe[e] = new ze(e, 0, !1, e, null, !1, !1)
  })
;[
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
  var t = e[0]
  xe[t] = new ze(t, 1, !1, e[1], null, !1, !1)
})
;['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
  xe[e] = new ze(e, 2, !1, e.toLowerCase(), null, !1, !1)
})
;[
  'autoReverse',
  'externalResourcesRequired',
  'focusable',
  'preserveAlpha',
].forEach(function (e) {
  xe[e] = new ze(e, 2, !1, e, null, !1, !1)
})
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
  .split(' ')
  .forEach(function (e) {
    xe[e] = new ze(e, 3, !1, e.toLowerCase(), null, !1, !1)
  })
;['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
  xe[e] = new ze(e, 3, !0, e, null, !1, !1)
})
;['capture', 'download'].forEach(function (e) {
  xe[e] = new ze(e, 4, !1, e, null, !1, !1)
})
;['cols', 'rows', 'size', 'span'].forEach(function (e) {
  xe[e] = new ze(e, 6, !1, e, null, !1, !1)
})
;['rowSpan', 'start'].forEach(function (e) {
  xe[e] = new ze(e, 5, !1, e.toLowerCase(), null, !1, !1)
})
var La = /[\-:]([a-z])/g
function _a(e) {
  return e[1].toUpperCase()
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(La, _a)
    xe[t] = new ze(t, 1, !1, e, null, !1, !1)
  })
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(La, _a)
    xe[t] = new ze(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1)
  })
;['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var t = e.replace(La, _a)
  xe[t] = new ze(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1)
})
;['tabIndex', 'crossOrigin'].forEach(function (e) {
  xe[e] = new ze(e, 1, !1, e.toLowerCase(), null, !1, !1)
})
xe.xlinkHref = new ze(
  'xlinkHref',
  1,
  !1,
  'xlink:href',
  'http://www.w3.org/1999/xlink',
  !0,
  !1,
)
;['src', 'href', 'action', 'formAction'].forEach(function (e) {
  xe[e] = new ze(e, 1, !1, e.toLowerCase(), null, !0, !0)
})
function Ta(e, t, n, r) {
  var l = xe.hasOwnProperty(t) ? xe[t] : null
  ;(l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== 'o' && t[0] !== 'O') ||
      (t[1] !== 'n' && t[1] !== 'N')) &&
    (Ip(t, n, l, r) && (n = null),
    r || l === null
      ? Op(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
      : l.mustUseProperty
        ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : '') : n)
        : ((t = l.attributeName),
          (r = l.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((l = l.type),
              (n = l === 3 || (l === 4 && n === !0) ? '' : '' + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var It = Mp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  El = Symbol.for('react.element'),
  $n = Symbol.for('react.portal'),
  An = Symbol.for('react.fragment'),
  Na = Symbol.for('react.strict_mode'),
  Ti = Symbol.for('react.profiler'),
  zc = Symbol.for('react.provider'),
  Oc = Symbol.for('react.context'),
  Da = Symbol.for('react.forward_ref'),
  Ni = Symbol.for('react.suspense'),
  Di = Symbol.for('react.suspense_list'),
  Ma = Symbol.for('react.memo'),
  Bt = Symbol.for('react.lazy'),
  Fc = Symbol.for('react.offscreen'),
  Ku = Symbol.iterator
function yr(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (Ku && e[Ku]) || e['@@iterator']),
      typeof e == 'function' ? e : null)
}
var ue = Object.assign,
  qo
function _r(e) {
  if (qo === void 0)
    try {
      throw Error()
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/)
      qo = (t && t[1]) || ''
    }
  return (
    `
` +
    qo +
    e
  )
}
var bo = !1
function ei(e, t) {
  if (!e || bo) return ''
  bo = !0
  var n = Error.prepareStackTrace
  Error.prepareStackTrace = void 0
  try {
    if (t)
      if (
        ((t = function () {
          throw Error()
        }),
        Object.defineProperty(t.prototype, 'props', {
          set: function () {
            throw Error()
          },
        }),
        typeof Reflect == 'object' && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, [])
        } catch (s) {
          var r = s
        }
        Reflect.construct(e, [], t)
      } else {
        try {
          t.call()
        } catch (s) {
          r = s
        }
        e.call(t.prototype)
      }
    else {
      try {
        throw Error()
      } catch (s) {
        r = s
      }
      e()
    }
  } catch (s) {
    if (s && r && typeof s.stack == 'string') {
      for (
        var l = s.stack.split(`
`),
          o = r.stack.split(`
`),
          i = l.length - 1,
          a = o.length - 1;
        1 <= i && 0 <= a && l[i] !== o[a];

      )
        a--
      for (; 1 <= i && 0 <= a; i--, a--)
        if (l[i] !== o[a]) {
          if (i !== 1 || a !== 1)
            do
              if ((i--, a--, 0 > a || l[i] !== o[a])) {
                var u =
                  `
` + l[i].replace(' at new ', ' at ')
                return (
                  e.displayName &&
                    u.includes('<anonymous>') &&
                    (u = u.replace('<anonymous>', e.displayName)),
                  u
                )
              }
            while (1 <= i && 0 <= a)
          break
        }
    }
  } finally {
    ;(bo = !1), (Error.prepareStackTrace = n)
  }
  return (e = e ? e.displayName || e.name : '') ? _r(e) : ''
}
function jp(e) {
  switch (e.tag) {
    case 5:
      return _r(e.type)
    case 16:
      return _r('Lazy')
    case 13:
      return _r('Suspense')
    case 19:
      return _r('SuspenseList')
    case 0:
    case 2:
    case 15:
      return (e = ei(e.type, !1)), e
    case 11:
      return (e = ei(e.type.render, !1)), e
    case 1:
      return (e = ei(e.type, !0)), e
    default:
      return ''
  }
}
function Mi(e) {
  if (e == null) return null
  if (typeof e == 'function') return e.displayName || e.name || null
  if (typeof e == 'string') return e
  switch (e) {
    case An:
      return 'Fragment'
    case $n:
      return 'Portal'
    case Ti:
      return 'Profiler'
    case Na:
      return 'StrictMode'
    case Ni:
      return 'Suspense'
    case Di:
      return 'SuspenseList'
  }
  if (typeof e == 'object')
    switch (e.$$typeof) {
      case Oc:
        return (e.displayName || 'Context') + '.Consumer'
      case zc:
        return (e._context.displayName || 'Context') + '.Provider'
      case Da:
        var t = e.render
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ''),
            (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        )
      case Ma:
        return (
          (t = e.displayName || null), t !== null ? t : Mi(e.type) || 'Memo'
        )
      case Bt:
        ;(t = e._payload), (e = e._init)
        try {
          return Mi(e(t))
        } catch {}
    }
  return null
}
function Up(e) {
  var t = e.type
  switch (e.tag) {
    case 24:
      return 'Cache'
    case 9:
      return (t.displayName || 'Context') + '.Consumer'
    case 10:
      return (t._context.displayName || 'Context') + '.Provider'
    case 18:
      return 'DehydratedFragment'
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ''),
        t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
      )
    case 7:
      return 'Fragment'
    case 5:
      return t
    case 4:
      return 'Portal'
    case 3:
      return 'Root'
    case 6:
      return 'Text'
    case 16:
      return Mi(t)
    case 8:
      return t === Na ? 'StrictMode' : 'Mode'
    case 22:
      return 'Offscreen'
    case 12:
      return 'Profiler'
    case 21:
      return 'Scope'
    case 13:
      return 'Suspense'
    case 19:
      return 'SuspenseList'
    case 25:
      return 'TracingMarker'
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == 'function') return t.displayName || t.name || null
      if (typeof t == 'string') return t
  }
  return null
}
function rn(e) {
  switch (typeof e) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'undefined':
      return e
    case 'object':
      return e
    default:
      return ''
  }
}
function Ic(e) {
  var t = e.type
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === 'input' &&
    (t === 'checkbox' || t === 'radio')
  )
}
function $p(e) {
  var t = Ic(e) ? 'checked' : 'value',
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = '' + e[t]
  if (
    !e.hasOwnProperty(t) &&
    typeof n < 'u' &&
    typeof n.get == 'function' &&
    typeof n.set == 'function'
  ) {
    var l = n.get,
      o = n.set
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this)
        },
        set: function (i) {
          ;(r = '' + i), o.call(this, i)
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r
        },
        setValue: function (i) {
          r = '' + i
        },
        stopTracking: function () {
          ;(e._valueTracker = null), delete e[t]
        },
      }
    )
  }
}
function kl(e) {
  e._valueTracker || (e._valueTracker = $p(e))
}
function jc(e) {
  if (!e) return !1
  var t = e._valueTracker
  if (!t) return !0
  var n = t.getValue(),
    r = ''
  return (
    e && (r = Ic(e) ? (e.checked ? 'true' : 'false') : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  )
}
function eo(e) {
  if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u'))
    return null
  try {
    return e.activeElement || e.body
  } catch {
    return e.body
  }
}
function zi(e, t) {
  var n = t.checked
  return ue({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  })
}
function Yu(e, t) {
  var n = t.defaultValue == null ? '' : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked
  ;(n = rn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === 'checkbox' || t.type === 'radio'
          ? t.checked != null
          : t.value != null,
    })
}
function Uc(e, t) {
  ;(t = t.checked), t != null && Ta(e, 'checked', t, !1)
}
function Oi(e, t) {
  Uc(e, t)
  var n = rn(t.value),
    r = t.type
  if (n != null)
    r === 'number'
      ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
      : e.value !== '' + n && (e.value = '' + n)
  else if (r === 'submit' || r === 'reset') {
    e.removeAttribute('value')
    return
  }
  t.hasOwnProperty('value')
    ? Fi(e, t.type, n)
    : t.hasOwnProperty('defaultValue') && Fi(e, t.type, rn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked)
}
function Xu(e, t, n) {
  if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
    var r = t.type
    if (
      !(
        (r !== 'submit' && r !== 'reset') ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return
    ;(t = '' + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t)
  }
  ;(n = e.name),
    n !== '' && (e.name = ''),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== '' && (e.name = n)
}
function Fi(e, t, n) {
  ;(t !== 'number' || eo(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = '' + e._wrapperState.initialValue)
      : e.defaultValue !== '' + n && (e.defaultValue = '' + n))
}
var Tr = Array.isArray
function Zn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {}
    for (var l = 0; l < n.length; l++) t['$' + n[l]] = !0
    for (n = 0; n < e.length; n++)
      (l = t.hasOwnProperty('$' + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0)
  } else {
    for (n = '' + rn(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        ;(e[l].selected = !0), r && (e[l].defaultSelected = !0)
        return
      }
      t !== null || e[l].disabled || (t = e[l])
    }
    t !== null && (t.selected = !0)
  }
}
function Ii(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(L(91))
  return ue({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: '' + e._wrapperState.initialValue,
  })
}
function Gu(e, t) {
  var n = t.value
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(L(92))
      if (Tr(n)) {
        if (1 < n.length) throw Error(L(93))
        n = n[0]
      }
      t = n
    }
    t == null && (t = ''), (n = t)
  }
  e._wrapperState = { initialValue: rn(n) }
}
function $c(e, t) {
  var n = rn(t.value),
    r = rn(t.defaultValue)
  n != null &&
    ((n = '' + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = '' + r)
}
function Ju(e) {
  var t = e.textContent
  t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t)
}
function Ac(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg'
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML'
    default:
      return 'http://www.w3.org/1999/xhtml'
  }
}
function ji(e, t) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? Ac(t)
    : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
      ? 'http://www.w3.org/1999/xhtml'
      : e
}
var xl,
  Hc = (function (e) {
    return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l)
          })
        }
      : e
  })(function (e, t) {
    if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e)
      e.innerHTML = t
    else {
      for (
        xl = xl || document.createElement('div'),
          xl.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
          t = xl.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild)
      for (; t.firstChild; ) e.appendChild(t.firstChild)
    }
  })
function Vr(e, t) {
  if (t) {
    var n = e.firstChild
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t
      return
    }
  }
  e.textContent = t
}
var zr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Ap = ['Webkit', 'ms', 'Moz', 'O']
Object.keys(zr).forEach(function (e) {
  Ap.forEach(function (t) {
    ;(t = t + e.charAt(0).toUpperCase() + e.substring(1)), (zr[t] = zr[e])
  })
})
function Bc(e, t, n) {
  return t == null || typeof t == 'boolean' || t === ''
    ? ''
    : n || typeof t != 'number' || t === 0 || (zr.hasOwnProperty(e) && zr[e])
      ? ('' + t).trim()
      : t + 'px'
}
function Vc(e, t) {
  e = e.style
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf('--') === 0,
        l = Bc(n, t[n], r)
      n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, l) : (e[n] = l)
    }
}
var Hp = ue(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
)
function Ui(e, t) {
  if (t) {
    if (Hp[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(L(137, e))
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(L(60))
      if (
        typeof t.dangerouslySetInnerHTML != 'object' ||
        !('__html' in t.dangerouslySetInnerHTML)
      )
        throw Error(L(61))
    }
    if (t.style != null && typeof t.style != 'object') throw Error(L(62))
  }
}
function $i(e, t) {
  if (e.indexOf('-') === -1) return typeof t.is == 'string'
  switch (e) {
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return !1
    default:
      return !0
  }
}
var Ai = null
function za(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  )
}
var Hi = null,
  qn = null,
  bn = null
function Zu(e) {
  if ((e = sl(e))) {
    if (typeof Hi != 'function') throw Error(L(280))
    var t = e.stateNode
    t && ((t = zo(t)), Hi(e.stateNode, e.type, t))
  }
}
function Wc(e) {
  qn ? (bn ? bn.push(e) : (bn = [e])) : (qn = e)
}
function Qc() {
  if (qn) {
    var e = qn,
      t = bn
    if (((bn = qn = null), Zu(e), t)) for (e = 0; e < t.length; e++) Zu(t[e])
  }
}
function Kc(e, t) {
  return e(t)
}
function Yc() {}
var ti = !1
function Xc(e, t, n) {
  if (ti) return e(t, n)
  ti = !0
  try {
    return Kc(e, t, n)
  } finally {
    ;(ti = !1), (qn !== null || bn !== null) && (Yc(), Qc())
  }
}
function Wr(e, t) {
  var n = e.stateNode
  if (n === null) return null
  var r = zo(n)
  if (r === null) return null
  n = r[t]
  e: switch (t) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
    case 'onMouseEnter':
      ;(r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === 'button' ||
          e === 'input' ||
          e === 'select' ||
          e === 'textarea'
        ))),
        (e = !r)
      break e
    default:
      e = !1
  }
  if (e) return null
  if (n && typeof n != 'function') throw Error(L(231, t, typeof n))
  return n
}
var Bi = !1
if (Mt)
  try {
    var gr = {}
    Object.defineProperty(gr, 'passive', {
      get: function () {
        Bi = !0
      },
    }),
      window.addEventListener('test', gr, gr),
      window.removeEventListener('test', gr, gr)
  } catch {
    Bi = !1
  }
function Bp(e, t, n, r, l, o, i, a, u) {
  var s = Array.prototype.slice.call(arguments, 3)
  try {
    t.apply(n, s)
  } catch (d) {
    this.onError(d)
  }
}
var Or = !1,
  to = null,
  no = !1,
  Vi = null,
  Vp = {
    onError: function (e) {
      ;(Or = !0), (to = e)
    },
  }
function Wp(e, t, n, r, l, o, i, a, u) {
  ;(Or = !1), (to = null), Bp.apply(Vp, arguments)
}
function Qp(e, t, n, r, l, o, i, a, u) {
  if ((Wp.apply(this, arguments), Or)) {
    if (Or) {
      var s = to
      ;(Or = !1), (to = null)
    } else throw Error(L(198))
    no || ((no = !0), (Vi = s))
  }
}
function Nn(e) {
  var t = e,
    n = e
  if (e.alternate) for (; t.return; ) t = t.return
  else {
    e = t
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return)
    while (e)
  }
  return t.tag === 3 ? n : null
}
function Gc(e) {
  if (e.tag === 13) {
    var t = e.memoizedState
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated
  }
  return null
}
function qu(e) {
  if (Nn(e) !== e) throw Error(L(188))
}
function Kp(e) {
  var t = e.alternate
  if (!t) {
    if (((t = Nn(e)), t === null)) throw Error(L(188))
    return t !== e ? null : e
  }
  for (var n = e, r = t; ; ) {
    var l = n.return
    if (l === null) break
    var o = l.alternate
    if (o === null) {
      if (((r = l.return), r !== null)) {
        n = r
        continue
      }
      break
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === n) return qu(l), e
        if (o === r) return qu(l), t
        o = o.sibling
      }
      throw Error(L(188))
    }
    if (n.return !== r.return) (n = l), (r = o)
    else {
      for (var i = !1, a = l.child; a; ) {
        if (a === n) {
          ;(i = !0), (n = l), (r = o)
          break
        }
        if (a === r) {
          ;(i = !0), (r = l), (n = o)
          break
        }
        a = a.sibling
      }
      if (!i) {
        for (a = o.child; a; ) {
          if (a === n) {
            ;(i = !0), (n = o), (r = l)
            break
          }
          if (a === r) {
            ;(i = !0), (r = o), (n = l)
            break
          }
          a = a.sibling
        }
        if (!i) throw Error(L(189))
      }
    }
    if (n.alternate !== r) throw Error(L(190))
  }
  if (n.tag !== 3) throw Error(L(188))
  return n.stateNode.current === n ? e : t
}
function Jc(e) {
  return (e = Kp(e)), e !== null ? Zc(e) : null
}
function Zc(e) {
  if (e.tag === 5 || e.tag === 6) return e
  for (e = e.child; e !== null; ) {
    var t = Zc(e)
    if (t !== null) return t
    e = e.sibling
  }
  return null
}
var qc = We.unstable_scheduleCallback,
  bu = We.unstable_cancelCallback,
  Yp = We.unstable_shouldYield,
  Xp = We.unstable_requestPaint,
  ce = We.unstable_now,
  Gp = We.unstable_getCurrentPriorityLevel,
  Oa = We.unstable_ImmediatePriority,
  bc = We.unstable_UserBlockingPriority,
  ro = We.unstable_NormalPriority,
  Jp = We.unstable_LowPriority,
  ef = We.unstable_IdlePriority,
  To = null,
  gt = null
function Zp(e) {
  if (gt && typeof gt.onCommitFiberRoot == 'function')
    try {
      gt.onCommitFiberRoot(To, e, void 0, (e.current.flags & 128) === 128)
    } catch {}
}
var ct = Math.clz32 ? Math.clz32 : eh,
  qp = Math.log,
  bp = Math.LN2
function eh(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((qp(e) / bp) | 0)) | 0
}
var Cl = 64,
  Pl = 4194304
function Nr(e) {
  switch (e & -e) {
    case 1:
      return 1
    case 2:
      return 2
    case 4:
      return 4
    case 8:
      return 8
    case 16:
      return 16
    case 32:
      return 32
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424
    case 134217728:
      return 134217728
    case 268435456:
      return 268435456
    case 536870912:
      return 536870912
    case 1073741824:
      return 1073741824
    default:
      return e
  }
}
function lo(e, t) {
  var n = e.pendingLanes
  if (n === 0) return 0
  var r = 0,
    l = e.suspendedLanes,
    o = e.pingedLanes,
    i = n & 268435455
  if (i !== 0) {
    var a = i & ~l
    a !== 0 ? (r = Nr(a)) : ((o &= i), o !== 0 && (r = Nr(o)))
  } else (i = n & ~l), i !== 0 ? (r = Nr(i)) : o !== 0 && (r = Nr(o))
  if (r === 0) return 0
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))
  )
    return t
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - ct(t)), (l = 1 << n), (r |= e[n]), (t &= ~l)
  return r
}
function th(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1
    default:
      return -1
  }
}
function nh(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var i = 31 - ct(o),
      a = 1 << i,
      u = l[i]
    u === -1
      ? (!(a & n) || a & r) && (l[i] = th(a, t))
      : u <= t && (e.expiredLanes |= a),
      (o &= ~a)
  }
}
function Wi(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  )
}
function tf() {
  var e = Cl
  return (Cl <<= 1), !(Cl & 4194240) && (Cl = 64), e
}
function ni(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e)
  return t
}
function al(e, t, n) {
  ;(e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - ct(t)),
    (e[t] = n)
}
function rh(e, t) {
  var n = e.pendingLanes & ~t
  ;(e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements)
  var r = e.eventTimes
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - ct(n),
      o = 1 << l
    ;(t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o)
  }
}
function Fa(e, t) {
  var n = (e.entangledLanes |= t)
  for (e = e.entanglements; n; ) {
    var r = 31 - ct(n),
      l = 1 << r
    ;(l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l)
  }
}
var X = 0
function nf(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
}
var rf,
  Ia,
  lf,
  of,
  af,
  Qi = !1,
  Rl = [],
  Gt = null,
  Jt = null,
  Zt = null,
  Qr = new Map(),
  Kr = new Map(),
  Wt = [],
  lh =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' ',
    )
function es(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      Gt = null
      break
    case 'dragenter':
    case 'dragleave':
      Jt = null
      break
    case 'mouseover':
    case 'mouseout':
      Zt = null
      break
    case 'pointerover':
    case 'pointerout':
      Qr.delete(t.pointerId)
      break
    case 'gotpointercapture':
    case 'lostpointercapture':
      Kr.delete(t.pointerId)
  }
}
function wr(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [l],
      }),
      t !== null && ((t = sl(t)), t !== null && Ia(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e)
}
function oh(e, t, n, r, l) {
  switch (t) {
    case 'focusin':
      return (Gt = wr(Gt, e, t, n, r, l)), !0
    case 'dragenter':
      return (Jt = wr(Jt, e, t, n, r, l)), !0
    case 'mouseover':
      return (Zt = wr(Zt, e, t, n, r, l)), !0
    case 'pointerover':
      var o = l.pointerId
      return Qr.set(o, wr(Qr.get(o) || null, e, t, n, r, l)), !0
    case 'gotpointercapture':
      return (
        (o = l.pointerId), Kr.set(o, wr(Kr.get(o) || null, e, t, n, r, l)), !0
      )
  }
  return !1
}
function uf(e) {
  var t = gn(e.target)
  if (t !== null) {
    var n = Nn(t)
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Gc(n)), t !== null)) {
          ;(e.blockedOn = t),
            af(e.priority, function () {
              lf(n)
            })
          return
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null
        return
      }
    }
  }
  e.blockedOn = null
}
function Hl(e) {
  if (e.blockedOn !== null) return !1
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Ki(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent)
    if (n === null) {
      n = e.nativeEvent
      var r = new n.constructor(n.type, n)
      ;(Ai = r), n.target.dispatchEvent(r), (Ai = null)
    } else return (t = sl(n)), t !== null && Ia(t), (e.blockedOn = n), !1
    t.shift()
  }
  return !0
}
function ts(e, t, n) {
  Hl(e) && n.delete(t)
}
function ih() {
  ;(Qi = !1),
    Gt !== null && Hl(Gt) && (Gt = null),
    Jt !== null && Hl(Jt) && (Jt = null),
    Zt !== null && Hl(Zt) && (Zt = null),
    Qr.forEach(ts),
    Kr.forEach(ts)
}
function Sr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Qi ||
      ((Qi = !0), We.unstable_scheduleCallback(We.unstable_NormalPriority, ih)))
}
function Yr(e) {
  function t(l) {
    return Sr(l, e)
  }
  if (0 < Rl.length) {
    Sr(Rl[0], e)
    for (var n = 1; n < Rl.length; n++) {
      var r = Rl[n]
      r.blockedOn === e && (r.blockedOn = null)
    }
  }
  for (
    Gt !== null && Sr(Gt, e),
      Jt !== null && Sr(Jt, e),
      Zt !== null && Sr(Zt, e),
      Qr.forEach(t),
      Kr.forEach(t),
      n = 0;
    n < Wt.length;
    n++
  )
    (r = Wt[n]), r.blockedOn === e && (r.blockedOn = null)
  for (; 0 < Wt.length && ((n = Wt[0]), n.blockedOn === null); )
    uf(n), n.blockedOn === null && Wt.shift()
}
var er = It.ReactCurrentBatchConfig,
  oo = !0
function ah(e, t, n, r) {
  var l = X,
    o = er.transition
  er.transition = null
  try {
    ;(X = 1), ja(e, t, n, r)
  } finally {
    ;(X = l), (er.transition = o)
  }
}
function uh(e, t, n, r) {
  var l = X,
    o = er.transition
  er.transition = null
  try {
    ;(X = 4), ja(e, t, n, r)
  } finally {
    ;(X = l), (er.transition = o)
  }
}
function ja(e, t, n, r) {
  if (oo) {
    var l = Ki(e, t, n, r)
    if (l === null) di(e, t, r, io, n), es(e, r)
    else if (oh(l, e, t, n, r)) r.stopPropagation()
    else if ((es(e, r), t & 4 && -1 < lh.indexOf(e))) {
      for (; l !== null; ) {
        var o = sl(l)
        if (
          (o !== null && rf(o),
          (o = Ki(e, t, n, r)),
          o === null && di(e, t, r, io, n),
          o === l)
        )
          break
        l = o
      }
      l !== null && r.stopPropagation()
    } else di(e, t, r, null, n)
  }
}
var io = null
function Ki(e, t, n, r) {
  if (((io = null), (e = za(r)), (e = gn(e)), e !== null))
    if (((t = Nn(e)), t === null)) e = null
    else if (((n = t.tag), n === 13)) {
      if (((e = Gc(t)), e !== null)) return e
      e = null
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null
      e = null
    } else t !== e && (e = null)
  return (io = e), null
}
function sf(e) {
  switch (e) {
    case 'cancel':
    case 'click':
    case 'close':
    case 'contextmenu':
    case 'copy':
    case 'cut':
    case 'auxclick':
    case 'dblclick':
    case 'dragend':
    case 'dragstart':
    case 'drop':
    case 'focusin':
    case 'focusout':
    case 'input':
    case 'invalid':
    case 'keydown':
    case 'keypress':
    case 'keyup':
    case 'mousedown':
    case 'mouseup':
    case 'paste':
    case 'pause':
    case 'play':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
    case 'ratechange':
    case 'reset':
    case 'resize':
    case 'seeked':
    case 'submit':
    case 'touchcancel':
    case 'touchend':
    case 'touchstart':
    case 'volumechange':
    case 'change':
    case 'selectionchange':
    case 'textInput':
    case 'compositionstart':
    case 'compositionend':
    case 'compositionupdate':
    case 'beforeblur':
    case 'afterblur':
    case 'beforeinput':
    case 'blur':
    case 'fullscreenchange':
    case 'focus':
    case 'hashchange':
    case 'popstate':
    case 'select':
    case 'selectstart':
      return 1
    case 'drag':
    case 'dragenter':
    case 'dragexit':
    case 'dragleave':
    case 'dragover':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'scroll':
    case 'toggle':
    case 'touchmove':
    case 'wheel':
    case 'mouseenter':
    case 'mouseleave':
    case 'pointerenter':
    case 'pointerleave':
      return 4
    case 'message':
      switch (Gp()) {
        case Oa:
          return 1
        case bc:
          return 4
        case ro:
        case Jp:
          return 16
        case ef:
          return 536870912
        default:
          return 16
      }
    default:
      return 16
  }
}
var Yt = null,
  Ua = null,
  Bl = null
function cf() {
  if (Bl) return Bl
  var e,
    t = Ua,
    n = t.length,
    r,
    l = 'value' in Yt ? Yt.value : Yt.textContent,
    o = l.length
  for (e = 0; e < n && t[e] === l[e]; e++);
  var i = n - e
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++);
  return (Bl = l.slice(e, 1 < r ? 1 - r : void 0))
}
function Vl(e) {
  var t = e.keyCode
  return (
    'charCode' in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  )
}
function Ll() {
  return !0
}
function ns() {
  return !1
}
function Ke(e) {
  function t(n, r, l, o, i) {
    ;(this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = i),
      (this.currentTarget = null)
    for (var a in e)
      e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(o) : o[a]))
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? Ll
        : ns),
      (this.isPropagationStopped = ns),
      this
    )
  }
  return (
    ue(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0
        var n = this.nativeEvent
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
          (this.isDefaultPrevented = Ll))
      },
      stopPropagation: function () {
        var n = this.nativeEvent
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
          (this.isPropagationStopped = Ll))
      },
      persist: function () {},
      isPersistent: Ll,
    }),
    t
  )
}
var fr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now()
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  $a = Ke(fr),
  ul = ue({}, fr, { view: 0, detail: 0 }),
  sh = Ke(ul),
  ri,
  li,
  Er,
  No = ue({}, ul, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Aa,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget
    },
    movementX: function (e) {
      return 'movementX' in e
        ? e.movementX
        : (e !== Er &&
            (Er && e.type === 'mousemove'
              ? ((ri = e.screenX - Er.screenX), (li = e.screenY - Er.screenY))
              : (li = ri = 0),
            (Er = e)),
          ri)
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : li
    },
  }),
  rs = Ke(No),
  ch = ue({}, No, { dataTransfer: 0 }),
  fh = Ke(ch),
  dh = ue({}, ul, { relatedTarget: 0 }),
  oi = Ke(dh),
  ph = ue({}, fr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  hh = Ke(ph),
  mh = ue({}, fr, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData
    },
  }),
  vh = Ke(mh),
  yh = ue({}, fr, { data: 0 }),
  ls = Ke(yh),
  gh = {
    Esc: 'Escape',
    Spacebar: ' ',
    Left: 'ArrowLeft',
    Up: 'ArrowUp',
    Right: 'ArrowRight',
    Down: 'ArrowDown',
    Del: 'Delete',
    Win: 'OS',
    Menu: 'ContextMenu',
    Apps: 'ContextMenu',
    Scroll: 'ScrollLock',
    MozPrintableKey: 'Unidentified',
  },
  wh = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta',
  },
  Sh = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' }
function Eh(e) {
  var t = this.nativeEvent
  return t.getModifierState ? t.getModifierState(e) : (e = Sh[e]) ? !!t[e] : !1
}
function Aa() {
  return Eh
}
var kh = ue({}, ul, {
    key: function (e) {
      if (e.key) {
        var t = gh[e.key] || e.key
        if (t !== 'Unidentified') return t
      }
      return e.type === 'keypress'
        ? ((e = Vl(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
        : e.type === 'keydown' || e.type === 'keyup'
          ? wh[e.keyCode] || 'Unidentified'
          : ''
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Aa,
    charCode: function (e) {
      return e.type === 'keypress' ? Vl(e) : 0
    },
    keyCode: function (e) {
      return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0
    },
    which: function (e) {
      return e.type === 'keypress'
        ? Vl(e)
        : e.type === 'keydown' || e.type === 'keyup'
          ? e.keyCode
          : 0
    },
  }),
  xh = Ke(kh),
  Ch = ue({}, No, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  os = Ke(Ch),
  Ph = ue({}, ul, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Aa,
  }),
  Rh = Ke(Ph),
  Lh = ue({}, fr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  _h = Ke(Lh),
  Th = ue({}, No, {
    deltaX: function (e) {
      return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0
    },
    deltaY: function (e) {
      return 'deltaY' in e
        ? e.deltaY
        : 'wheelDeltaY' in e
          ? -e.wheelDeltaY
          : 'wheelDelta' in e
            ? -e.wheelDelta
            : 0
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Nh = Ke(Th),
  Dh = [9, 13, 27, 32],
  Ha = Mt && 'CompositionEvent' in window,
  Fr = null
Mt && 'documentMode' in document && (Fr = document.documentMode)
var Mh = Mt && 'TextEvent' in window && !Fr,
  ff = Mt && (!Ha || (Fr && 8 < Fr && 11 >= Fr)),
  is = ' ',
  as = !1
function df(e, t) {
  switch (e) {
    case 'keyup':
      return Dh.indexOf(t.keyCode) !== -1
    case 'keydown':
      return t.keyCode !== 229
    case 'keypress':
    case 'mousedown':
    case 'focusout':
      return !0
    default:
      return !1
  }
}
function pf(e) {
  return (e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null
}
var Hn = !1
function zh(e, t) {
  switch (e) {
    case 'compositionend':
      return pf(t)
    case 'keypress':
      return t.which !== 32 ? null : ((as = !0), is)
    case 'textInput':
      return (e = t.data), e === is && as ? null : e
    default:
      return null
  }
}
function Oh(e, t) {
  if (Hn)
    return e === 'compositionend' || (!Ha && df(e, t))
      ? ((e = cf()), (Bl = Ua = Yt = null), (Hn = !1), e)
      : null
  switch (e) {
    case 'paste':
      return null
    case 'keypress':
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char
        if (t.which) return String.fromCharCode(t.which)
      }
      return null
    case 'compositionend':
      return ff && t.locale !== 'ko' ? null : t.data
    default:
      return null
  }
}
var Fh = {
  color: !0,
  date: !0,
  datetime: !0,
  'datetime-local': !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
}
function us(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase()
  return t === 'input' ? !!Fh[e.type] : t === 'textarea'
}
function hf(e, t, n, r) {
  Wc(r),
    (t = ao(t, 'onChange')),
    0 < t.length &&
      ((n = new $a('onChange', 'change', null, n, r)),
      e.push({ event: n, listeners: t }))
}
var Ir = null,
  Xr = null
function Ih(e) {
  Pf(e, 0)
}
function Do(e) {
  var t = Wn(e)
  if (jc(t)) return e
}
function jh(e, t) {
  if (e === 'change') return t
}
var mf = !1
if (Mt) {
  var ii
  if (Mt) {
    var ai = 'oninput' in document
    if (!ai) {
      var ss = document.createElement('div')
      ss.setAttribute('oninput', 'return;'),
        (ai = typeof ss.oninput == 'function')
    }
    ii = ai
  } else ii = !1
  mf = ii && (!document.documentMode || 9 < document.documentMode)
}
function cs() {
  Ir && (Ir.detachEvent('onpropertychange', vf), (Xr = Ir = null))
}
function vf(e) {
  if (e.propertyName === 'value' && Do(Xr)) {
    var t = []
    hf(t, Xr, e, za(e)), Xc(Ih, t)
  }
}
function Uh(e, t, n) {
  e === 'focusin'
    ? (cs(), (Ir = t), (Xr = n), Ir.attachEvent('onpropertychange', vf))
    : e === 'focusout' && cs()
}
function $h(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Do(Xr)
}
function Ah(e, t) {
  if (e === 'click') return Do(t)
}
function Hh(e, t) {
  if (e === 'input' || e === 'change') return Do(t)
}
function Bh(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t)
}
var dt = typeof Object.is == 'function' ? Object.is : Bh
function Gr(e, t) {
  if (dt(e, t)) return !0
  if (typeof e != 'object' || e === null || typeof t != 'object' || t === null)
    return !1
  var n = Object.keys(e),
    r = Object.keys(t)
  if (n.length !== r.length) return !1
  for (r = 0; r < n.length; r++) {
    var l = n[r]
    if (!_i.call(t, l) || !dt(e[l], t[l])) return !1
  }
  return !0
}
function fs(e) {
  for (; e && e.firstChild; ) e = e.firstChild
  return e
}
function ds(e, t) {
  var n = fs(e)
  e = 0
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e }
      e = r
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling
          break e
        }
        n = n.parentNode
      }
      n = void 0
    }
    n = fs(n)
  }
}
function yf(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? yf(e, t.parentNode)
          : 'contains' in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1
}
function gf() {
  for (var e = window, t = eo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == 'string'
    } catch {
      n = !1
    }
    if (n) e = t.contentWindow
    else break
    t = eo(e.document)
  }
  return t
}
function Ba(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase()
  return (
    t &&
    ((t === 'input' &&
      (e.type === 'text' ||
        e.type === 'search' ||
        e.type === 'tel' ||
        e.type === 'url' ||
        e.type === 'password')) ||
      t === 'textarea' ||
      e.contentEditable === 'true')
  )
}
function Vh(e) {
  var t = gf(),
    n = e.focusedElem,
    r = e.selectionRange
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    yf(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Ba(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        'selectionStart' in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length))
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection()
        var l = n.textContent.length,
          o = Math.min(r.start, l)
        ;(r = r.end === void 0 ? o : Math.min(r.end, l)),
          !e.extend && o > r && ((l = r), (r = o), (o = l)),
          (l = ds(n, o))
        var i = ds(n, r)
        l &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)))
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop })
    for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top)
  }
}
var Wh = Mt && 'documentMode' in document && 11 >= document.documentMode,
  Bn = null,
  Yi = null,
  jr = null,
  Xi = !1
function ps(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument
  Xi ||
    Bn == null ||
    Bn !== eo(r) ||
    ((r = Bn),
    'selectionStart' in r && Ba(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (jr && Gr(jr, r)) ||
      ((jr = r),
      (r = ao(Yi, 'onSelect')),
      0 < r.length &&
        ((t = new $a('onSelect', 'select', null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Bn))))
}
function _l(e, t) {
  var n = {}
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n['Webkit' + e] = 'webkit' + t),
    (n['Moz' + e] = 'moz' + t),
    n
  )
}
var Vn = {
    animationend: _l('Animation', 'AnimationEnd'),
    animationiteration: _l('Animation', 'AnimationIteration'),
    animationstart: _l('Animation', 'AnimationStart'),
    transitionend: _l('Transition', 'TransitionEnd'),
  },
  ui = {},
  wf = {}
Mt &&
  ((wf = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete Vn.animationend.animation,
    delete Vn.animationiteration.animation,
    delete Vn.animationstart.animation),
  'TransitionEvent' in window || delete Vn.transitionend.transition)
function Mo(e) {
  if (ui[e]) return ui[e]
  if (!Vn[e]) return e
  var t = Vn[e],
    n
  for (n in t) if (t.hasOwnProperty(n) && n in wf) return (ui[e] = t[n])
  return e
}
var Sf = Mo('animationend'),
  Ef = Mo('animationiteration'),
  kf = Mo('animationstart'),
  xf = Mo('transitionend'),
  Cf = new Map(),
  hs =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' ',
    )
function an(e, t) {
  Cf.set(e, t), Tn(t, [e])
}
for (var si = 0; si < hs.length; si++) {
  var ci = hs[si],
    Qh = ci.toLowerCase(),
    Kh = ci[0].toUpperCase() + ci.slice(1)
  an(Qh, 'on' + Kh)
}
an(Sf, 'onAnimationEnd')
an(Ef, 'onAnimationIteration')
an(kf, 'onAnimationStart')
an('dblclick', 'onDoubleClick')
an('focusin', 'onFocus')
an('focusout', 'onBlur')
an(xf, 'onTransitionEnd')
rr('onMouseEnter', ['mouseout', 'mouseover'])
rr('onMouseLeave', ['mouseout', 'mouseover'])
rr('onPointerEnter', ['pointerout', 'pointerover'])
rr('onPointerLeave', ['pointerout', 'pointerover'])
Tn(
  'onChange',
  'change click focusin focusout input keydown keyup selectionchange'.split(
    ' ',
  ),
)
Tn(
  'onSelect',
  'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
    ' ',
  ),
)
Tn('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste'])
Tn(
  'onCompositionEnd',
  'compositionend focusout keydown keypress keyup mousedown'.split(' '),
)
Tn(
  'onCompositionStart',
  'compositionstart focusout keydown keypress keyup mousedown'.split(' '),
)
Tn(
  'onCompositionUpdate',
  'compositionupdate focusout keydown keypress keyup mousedown'.split(' '),
)
var Dr =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' ',
    ),
  Yh = new Set('cancel close invalid load scroll toggle'.split(' ').concat(Dr))
function ms(e, t, n) {
  var r = e.type || 'unknown-event'
  ;(e.currentTarget = n), Qp(r, t, void 0, e), (e.currentTarget = null)
}
function Pf(e, t) {
  t = (t & 4) !== 0
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event
    r = r.listeners
    e: {
      var o = void 0
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var a = r[i],
            u = a.instance,
            s = a.currentTarget
          if (((a = a.listener), u !== o && l.isPropagationStopped())) break e
          ms(l, a, s), (o = u)
        }
      else
        for (i = 0; i < r.length; i++) {
          if (
            ((a = r[i]),
            (u = a.instance),
            (s = a.currentTarget),
            (a = a.listener),
            u !== o && l.isPropagationStopped())
          )
            break e
          ms(l, a, s), (o = u)
        }
    }
  }
  if (no) throw ((e = Vi), (no = !1), (Vi = null), e)
}
function ee(e, t) {
  var n = t[bi]
  n === void 0 && (n = t[bi] = new Set())
  var r = e + '__bubble'
  n.has(r) || (Rf(t, e, 2, !1), n.add(r))
}
function fi(e, t, n) {
  var r = 0
  t && (r |= 4), Rf(n, e, r, t)
}
var Tl = '_reactListening' + Math.random().toString(36).slice(2)
function Jr(e) {
  if (!e[Tl]) {
    ;(e[Tl] = !0),
      Mc.forEach(function (n) {
        n !== 'selectionchange' && (Yh.has(n) || fi(n, !1, e), fi(n, !0, e))
      })
    var t = e.nodeType === 9 ? e : e.ownerDocument
    t === null || t[Tl] || ((t[Tl] = !0), fi('selectionchange', !1, t))
  }
}
function Rf(e, t, n, r) {
  switch (sf(t)) {
    case 1:
      var l = ah
      break
    case 4:
      l = uh
      break
    default:
      l = ja
  }
  ;(n = l.bind(null, t, n, e)),
    (l = void 0),
    !Bi ||
      (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
        ? e.addEventListener(t, n, { passive: l })
        : e.addEventListener(t, n, !1)
}
function di(e, t, n, r, l) {
  var o = r
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return
      var i = r.tag
      if (i === 3 || i === 4) {
        var a = r.stateNode.containerInfo
        if (a === l || (a.nodeType === 8 && a.parentNode === l)) break
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var u = i.tag
            if (
              (u === 3 || u === 4) &&
              ((u = i.stateNode.containerInfo),
              u === l || (u.nodeType === 8 && u.parentNode === l))
            )
              return
            i = i.return
          }
        for (; a !== null; ) {
          if (((i = gn(a)), i === null)) return
          if (((u = i.tag), u === 5 || u === 6)) {
            r = o = i
            continue e
          }
          a = a.parentNode
        }
      }
      r = r.return
    }
  Xc(function () {
    var s = o,
      d = za(n),
      y = []
    e: {
      var m = Cf.get(e)
      if (m !== void 0) {
        var g = $a,
          E = e
        switch (e) {
          case 'keypress':
            if (Vl(n) === 0) break e
          case 'keydown':
          case 'keyup':
            g = xh
            break
          case 'focusin':
            ;(E = 'focus'), (g = oi)
            break
          case 'focusout':
            ;(E = 'blur'), (g = oi)
            break
          case 'beforeblur':
          case 'afterblur':
            g = oi
            break
          case 'click':
            if (n.button === 2) break e
          case 'auxclick':
          case 'dblclick':
          case 'mousedown':
          case 'mousemove':
          case 'mouseup':
          case 'mouseout':
          case 'mouseover':
          case 'contextmenu':
            g = rs
            break
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            g = fh
            break
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            g = Rh
            break
          case Sf:
          case Ef:
          case kf:
            g = hh
            break
          case xf:
            g = _h
            break
          case 'scroll':
            g = sh
            break
          case 'wheel':
            g = Nh
            break
          case 'copy':
          case 'cut':
          case 'paste':
            g = vh
            break
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            g = os
        }
        var k = (t & 4) !== 0,
          T = !k && e === 'scroll',
          f = k ? (m !== null ? m + 'Capture' : null) : m
        k = []
        for (var c = s, p; c !== null; ) {
          p = c
          var C = p.stateNode
          if (
            (p.tag === 5 &&
              C !== null &&
              ((p = C),
              f !== null && ((C = Wr(c, f)), C != null && k.push(Zr(c, C, p)))),
            T)
          )
            break
          c = c.return
        }
        0 < k.length &&
          ((m = new g(m, E, null, n, d)), y.push({ event: m, listeners: k }))
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((m = e === 'mouseover' || e === 'pointerover'),
          (g = e === 'mouseout' || e === 'pointerout'),
          m &&
            n !== Ai &&
            (E = n.relatedTarget || n.fromElement) &&
            (gn(E) || E[zt]))
        )
          break e
        if (
          (g || m) &&
          ((m =
            d.window === d
              ? d
              : (m = d.ownerDocument)
                ? m.defaultView || m.parentWindow
                : window),
          g
            ? ((E = n.relatedTarget || n.toElement),
              (g = s),
              (E = E ? gn(E) : null),
              E !== null &&
                ((T = Nn(E)), E !== T || (E.tag !== 5 && E.tag !== 6)) &&
                (E = null))
            : ((g = null), (E = s)),
          g !== E)
        ) {
          if (
            ((k = rs),
            (C = 'onMouseLeave'),
            (f = 'onMouseEnter'),
            (c = 'mouse'),
            (e === 'pointerout' || e === 'pointerover') &&
              ((k = os),
              (C = 'onPointerLeave'),
              (f = 'onPointerEnter'),
              (c = 'pointer')),
            (T = g == null ? m : Wn(g)),
            (p = E == null ? m : Wn(E)),
            (m = new k(C, c + 'leave', g, n, d)),
            (m.target = T),
            (m.relatedTarget = p),
            (C = null),
            gn(d) === s &&
              ((k = new k(f, c + 'enter', E, n, d)),
              (k.target = p),
              (k.relatedTarget = T),
              (C = k)),
            (T = C),
            g && E)
          )
            t: {
              for (k = g, f = E, c = 0, p = k; p; p = jn(p)) c++
              for (p = 0, C = f; C; C = jn(C)) p++
              for (; 0 < c - p; ) (k = jn(k)), c--
              for (; 0 < p - c; ) (f = jn(f)), p--
              for (; c--; ) {
                if (k === f || (f !== null && k === f.alternate)) break t
                ;(k = jn(k)), (f = jn(f))
              }
              k = null
            }
          else k = null
          g !== null && vs(y, m, g, k, !1),
            E !== null && T !== null && vs(y, T, E, k, !0)
        }
      }
      e: {
        if (
          ((m = s ? Wn(s) : window),
          (g = m.nodeName && m.nodeName.toLowerCase()),
          g === 'select' || (g === 'input' && m.type === 'file'))
        )
          var h = jh
        else if (us(m))
          if (mf) h = Hh
          else {
            h = $h
            var R = Uh
          }
        else
          (g = m.nodeName) &&
            g.toLowerCase() === 'input' &&
            (m.type === 'checkbox' || m.type === 'radio') &&
            (h = Ah)
        if (h && (h = h(e, s))) {
          hf(y, h, n, d)
          break e
        }
        R && R(e, m, s),
          e === 'focusout' &&
            (R = m._wrapperState) &&
            R.controlled &&
            m.type === 'number' &&
            Fi(m, 'number', m.value)
      }
      switch (((R = s ? Wn(s) : window), e)) {
        case 'focusin':
          ;(us(R) || R.contentEditable === 'true') &&
            ((Bn = R), (Yi = s), (jr = null))
          break
        case 'focusout':
          jr = Yi = Bn = null
          break
        case 'mousedown':
          Xi = !0
          break
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          ;(Xi = !1), ps(y, n, d)
          break
        case 'selectionchange':
          if (Wh) break
        case 'keydown':
        case 'keyup':
          ps(y, n, d)
      }
      var N
      if (Ha)
        e: {
          switch (e) {
            case 'compositionstart':
              var _ = 'onCompositionStart'
              break e
            case 'compositionend':
              _ = 'onCompositionEnd'
              break e
            case 'compositionupdate':
              _ = 'onCompositionUpdate'
              break e
          }
          _ = void 0
        }
      else
        Hn
          ? df(e, n) && (_ = 'onCompositionEnd')
          : e === 'keydown' && n.keyCode === 229 && (_ = 'onCompositionStart')
      _ &&
        (ff &&
          n.locale !== 'ko' &&
          (Hn || _ !== 'onCompositionStart'
            ? _ === 'onCompositionEnd' && Hn && (N = cf())
            : ((Yt = d),
              (Ua = 'value' in Yt ? Yt.value : Yt.textContent),
              (Hn = !0))),
        (R = ao(s, _)),
        0 < R.length &&
          ((_ = new ls(_, e, null, n, d)),
          y.push({ event: _, listeners: R }),
          N ? (_.data = N) : ((N = pf(n)), N !== null && (_.data = N)))),
        (N = Mh ? zh(e, n) : Oh(e, n)) &&
          ((s = ao(s, 'onBeforeInput')),
          0 < s.length &&
            ((d = new ls('onBeforeInput', 'beforeinput', null, n, d)),
            y.push({ event: d, listeners: s }),
            (d.data = N)))
    }
    Pf(y, t)
  })
}
function Zr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n }
}
function ao(e, t) {
  for (var n = t + 'Capture', r = []; e !== null; ) {
    var l = e,
      o = l.stateNode
    l.tag === 5 &&
      o !== null &&
      ((l = o),
      (o = Wr(e, n)),
      o != null && r.unshift(Zr(e, o, l)),
      (o = Wr(e, t)),
      o != null && r.push(Zr(e, o, l))),
      (e = e.return)
  }
  return r
}
function jn(e) {
  if (e === null) return null
  do e = e.return
  while (e && e.tag !== 5)
  return e || null
}
function vs(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var a = n,
      u = a.alternate,
      s = a.stateNode
    if (u !== null && u === r) break
    a.tag === 5 &&
      s !== null &&
      ((a = s),
      l
        ? ((u = Wr(n, o)), u != null && i.unshift(Zr(n, u, a)))
        : l || ((u = Wr(n, o)), u != null && i.push(Zr(n, u, a)))),
      (n = n.return)
  }
  i.length !== 0 && e.push({ event: t, listeners: i })
}
var Xh = /\r\n?/g,
  Gh = /\u0000|\uFFFD/g
function ys(e) {
  return (typeof e == 'string' ? e : '' + e)
    .replace(
      Xh,
      `
`,
    )
    .replace(Gh, '')
}
function Nl(e, t, n) {
  if (((t = ys(t)), ys(e) !== t && n)) throw Error(L(425))
}
function uo() {}
var Gi = null,
  Ji = null
function Zi(e, t) {
  return (
    e === 'textarea' ||
    e === 'noscript' ||
    typeof t.children == 'string' ||
    typeof t.children == 'number' ||
    (typeof t.dangerouslySetInnerHTML == 'object' &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  )
}
var qi = typeof setTimeout == 'function' ? setTimeout : void 0,
  Jh = typeof clearTimeout == 'function' ? clearTimeout : void 0,
  gs = typeof Promise == 'function' ? Promise : void 0,
  Zh =
    typeof queueMicrotask == 'function'
      ? queueMicrotask
      : typeof gs < 'u'
        ? function (e) {
            return gs.resolve(null).then(e).catch(qh)
          }
        : qi
function qh(e) {
  setTimeout(function () {
    throw e
  })
}
function pi(e, t) {
  var n = t,
    r = 0
  do {
    var l = n.nextSibling
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === '/$')) {
        if (r === 0) {
          e.removeChild(l), Yr(t)
          return
        }
        r--
      } else (n !== '$' && n !== '$?' && n !== '$!') || r++
    n = l
  } while (n)
  Yr(t)
}
function qt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType
    if (t === 1 || t === 3) break
    if (t === 8) {
      if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break
      if (t === '/$') return null
    }
  }
  return e
}
function ws(e) {
  e = e.previousSibling
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data
      if (n === '$' || n === '$!' || n === '$?') {
        if (t === 0) return e
        t--
      } else n === '/$' && t++
    }
    e = e.previousSibling
  }
  return null
}
var dr = Math.random().toString(36).slice(2),
  yt = '__reactFiber$' + dr,
  qr = '__reactProps$' + dr,
  zt = '__reactContainer$' + dr,
  bi = '__reactEvents$' + dr,
  bh = '__reactListeners$' + dr,
  em = '__reactHandles$' + dr
function gn(e) {
  var t = e[yt]
  if (t) return t
  for (var n = e.parentNode; n; ) {
    if ((t = n[zt] || n[yt])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = ws(e); e !== null; ) {
          if ((n = e[yt])) return n
          e = ws(e)
        }
      return t
    }
    ;(e = n), (n = e.parentNode)
  }
  return null
}
function sl(e) {
  return (
    (e = e[yt] || e[zt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  )
}
function Wn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode
  throw Error(L(33))
}
function zo(e) {
  return e[qr] || null
}
var ea = [],
  Qn = -1
function un(e) {
  return { current: e }
}
function te(e) {
  0 > Qn || ((e.current = ea[Qn]), (ea[Qn] = null), Qn--)
}
function q(e, t) {
  Qn++, (ea[Qn] = e.current), (e.current = t)
}
var ln = {},
  _e = un(ln),
  Ie = un(!1),
  Cn = ln
function lr(e, t) {
  var n = e.type.contextTypes
  if (!n) return ln
  var r = e.stateNode
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext
  var l = {},
    o
  for (o in n) l[o] = t[o]
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  )
}
function je(e) {
  return (e = e.childContextTypes), e != null
}
function so() {
  te(Ie), te(_e)
}
function Ss(e, t, n) {
  if (_e.current !== ln) throw Error(L(168))
  q(_e, t), q(Ie, n)
}
function Lf(e, t, n) {
  var r = e.stateNode
  if (((t = t.childContextTypes), typeof r.getChildContext != 'function'))
    return n
  r = r.getChildContext()
  for (var l in r) if (!(l in t)) throw Error(L(108, Up(e) || 'Unknown', l))
  return ue({}, n, r)
}
function co(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || ln),
    (Cn = _e.current),
    q(_e, e),
    q(Ie, Ie.current),
    !0
  )
}
function Es(e, t, n) {
  var r = e.stateNode
  if (!r) throw Error(L(169))
  n
    ? ((e = Lf(e, t, Cn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      te(Ie),
      te(_e),
      q(_e, e))
    : te(Ie),
    q(Ie, n)
}
var _t = null,
  Oo = !1,
  hi = !1
function _f(e) {
  _t === null ? (_t = [e]) : _t.push(e)
}
function tm(e) {
  ;(Oo = !0), _f(e)
}
function sn() {
  if (!hi && _t !== null) {
    hi = !0
    var e = 0,
      t = X
    try {
      var n = _t
      for (X = 1; e < n.length; e++) {
        var r = n[e]
        do r = r(!0)
        while (r !== null)
      }
      ;(_t = null), (Oo = !1)
    } catch (l) {
      throw (_t !== null && (_t = _t.slice(e + 1)), qc(Oa, sn), l)
    } finally {
      ;(X = t), (hi = !1)
    }
  }
  return null
}
var Kn = [],
  Yn = 0,
  fo = null,
  po = 0,
  Ze = [],
  qe = 0,
  Pn = null,
  Tt = 1,
  Nt = ''
function mn(e, t) {
  ;(Kn[Yn++] = po), (Kn[Yn++] = fo), (fo = e), (po = t)
}
function Tf(e, t, n) {
  ;(Ze[qe++] = Tt), (Ze[qe++] = Nt), (Ze[qe++] = Pn), (Pn = e)
  var r = Tt
  e = Nt
  var l = 32 - ct(r) - 1
  ;(r &= ~(1 << l)), (n += 1)
  var o = 32 - ct(t) + l
  if (30 < o) {
    var i = l - (l % 5)
    ;(o = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (l -= i),
      (Tt = (1 << (32 - ct(t) + l)) | (n << l) | r),
      (Nt = o + e)
  } else (Tt = (1 << o) | (n << l) | r), (Nt = e)
}
function Va(e) {
  e.return !== null && (mn(e, 1), Tf(e, 1, 0))
}
function Wa(e) {
  for (; e === fo; )
    (fo = Kn[--Yn]), (Kn[Yn] = null), (po = Kn[--Yn]), (Kn[Yn] = null)
  for (; e === Pn; )
    (Pn = Ze[--qe]),
      (Ze[qe] = null),
      (Nt = Ze[--qe]),
      (Ze[qe] = null),
      (Tt = Ze[--qe]),
      (Ze[qe] = null)
}
var Ve = null,
  Be = null,
  le = !1,
  st = null
function Nf(e, t) {
  var n = be(5, null, null, 0)
  ;(n.elementType = 'DELETED'),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n)
}
function ks(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ve = e), (Be = qt(t.firstChild)), !0)
          : !1
      )
    case 6:
      return (
        (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ve = e), (Be = null), !0) : !1
      )
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Pn !== null ? { id: Tt, overflow: Nt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = be(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ve = e),
            (Be = null),
            !0)
          : !1
      )
    default:
      return !1
  }
}
function ta(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}
function na(e) {
  if (le) {
    var t = Be
    if (t) {
      var n = t
      if (!ks(e, t)) {
        if (ta(e)) throw Error(L(418))
        t = qt(n.nextSibling)
        var r = Ve
        t && ks(e, t)
          ? Nf(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (le = !1), (Ve = e))
      }
    } else {
      if (ta(e)) throw Error(L(418))
      ;(e.flags = (e.flags & -4097) | 2), (le = !1), (Ve = e)
    }
  }
}
function xs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return
  Ve = e
}
function Dl(e) {
  if (e !== Ve) return !1
  if (!le) return xs(e), (le = !0), !1
  var t
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== 'head' && t !== 'body' && !Zi(e.type, e.memoizedProps))),
    t && (t = Be))
  ) {
    if (ta(e)) throw (Df(), Error(L(418)))
    for (; t; ) Nf(e, t), (t = qt(t.nextSibling))
  }
  if ((xs(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(L(317))
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data
          if (n === '/$') {
            if (t === 0) {
              Be = qt(e.nextSibling)
              break e
            }
            t--
          } else (n !== '$' && n !== '$!' && n !== '$?') || t++
        }
        e = e.nextSibling
      }
      Be = null
    }
  } else Be = Ve ? qt(e.stateNode.nextSibling) : null
  return !0
}
function Df() {
  for (var e = Be; e; ) e = qt(e.nextSibling)
}
function or() {
  ;(Be = Ve = null), (le = !1)
}
function Qa(e) {
  st === null ? (st = [e]) : st.push(e)
}
var nm = It.ReactCurrentBatchConfig
function kr(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(L(309))
        var r = n.stateNode
      }
      if (!r) throw Error(L(147, e))
      var l = r,
        o = '' + e
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == 'function' &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (i) {
            var a = l.refs
            i === null ? delete a[o] : (a[o] = i)
          }),
          (t._stringRef = o),
          t)
    }
    if (typeof e != 'string') throw Error(L(284))
    if (!n._owner) throw Error(L(290, e))
  }
  return e
}
function Ml(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      L(
        31,
        e === '[object Object]'
          ? 'object with keys {' + Object.keys(t).join(', ') + '}'
          : e,
      ),
    ))
  )
}
function Cs(e) {
  var t = e._init
  return t(e._payload)
}
function Mf(e) {
  function t(f, c) {
    if (e) {
      var p = f.deletions
      p === null ? ((f.deletions = [c]), (f.flags |= 16)) : p.push(c)
    }
  }
  function n(f, c) {
    if (!e) return null
    for (; c !== null; ) t(f, c), (c = c.sibling)
    return null
  }
  function r(f, c) {
    for (f = new Map(); c !== null; )
      c.key !== null ? f.set(c.key, c) : f.set(c.index, c), (c = c.sibling)
    return f
  }
  function l(f, c) {
    return (f = nn(f, c)), (f.index = 0), (f.sibling = null), f
  }
  function o(f, c, p) {
    return (
      (f.index = p),
      e
        ? ((p = f.alternate),
          p !== null
            ? ((p = p.index), p < c ? ((f.flags |= 2), c) : p)
            : ((f.flags |= 2), c))
        : ((f.flags |= 1048576), c)
    )
  }
  function i(f) {
    return e && f.alternate === null && (f.flags |= 2), f
  }
  function a(f, c, p, C) {
    return c === null || c.tag !== 6
      ? ((c = Ei(p, f.mode, C)), (c.return = f), c)
      : ((c = l(c, p)), (c.return = f), c)
  }
  function u(f, c, p, C) {
    var h = p.type
    return h === An
      ? d(f, c, p.props.children, C, p.key)
      : c !== null &&
          (c.elementType === h ||
            (typeof h == 'object' &&
              h !== null &&
              h.$$typeof === Bt &&
              Cs(h) === c.type))
        ? ((C = l(c, p.props)), (C.ref = kr(f, c, p)), (C.return = f), C)
        : ((C = Jl(p.type, p.key, p.props, null, f.mode, C)),
          (C.ref = kr(f, c, p)),
          (C.return = f),
          C)
  }
  function s(f, c, p, C) {
    return c === null ||
      c.tag !== 4 ||
      c.stateNode.containerInfo !== p.containerInfo ||
      c.stateNode.implementation !== p.implementation
      ? ((c = ki(p, f.mode, C)), (c.return = f), c)
      : ((c = l(c, p.children || [])), (c.return = f), c)
  }
  function d(f, c, p, C, h) {
    return c === null || c.tag !== 7
      ? ((c = xn(p, f.mode, C, h)), (c.return = f), c)
      : ((c = l(c, p)), (c.return = f), c)
  }
  function y(f, c, p) {
    if ((typeof c == 'string' && c !== '') || typeof c == 'number')
      return (c = Ei('' + c, f.mode, p)), (c.return = f), c
    if (typeof c == 'object' && c !== null) {
      switch (c.$$typeof) {
        case El:
          return (
            (p = Jl(c.type, c.key, c.props, null, f.mode, p)),
            (p.ref = kr(f, null, c)),
            (p.return = f),
            p
          )
        case $n:
          return (c = ki(c, f.mode, p)), (c.return = f), c
        case Bt:
          var C = c._init
          return y(f, C(c._payload), p)
      }
      if (Tr(c) || yr(c)) return (c = xn(c, f.mode, p, null)), (c.return = f), c
      Ml(f, c)
    }
    return null
  }
  function m(f, c, p, C) {
    var h = c !== null ? c.key : null
    if ((typeof p == 'string' && p !== '') || typeof p == 'number')
      return h !== null ? null : a(f, c, '' + p, C)
    if (typeof p == 'object' && p !== null) {
      switch (p.$$typeof) {
        case El:
          return p.key === h ? u(f, c, p, C) : null
        case $n:
          return p.key === h ? s(f, c, p, C) : null
        case Bt:
          return (h = p._init), m(f, c, h(p._payload), C)
      }
      if (Tr(p) || yr(p)) return h !== null ? null : d(f, c, p, C, null)
      Ml(f, p)
    }
    return null
  }
  function g(f, c, p, C, h) {
    if ((typeof C == 'string' && C !== '') || typeof C == 'number')
      return (f = f.get(p) || null), a(c, f, '' + C, h)
    if (typeof C == 'object' && C !== null) {
      switch (C.$$typeof) {
        case El:
          return (f = f.get(C.key === null ? p : C.key) || null), u(c, f, C, h)
        case $n:
          return (f = f.get(C.key === null ? p : C.key) || null), s(c, f, C, h)
        case Bt:
          var R = C._init
          return g(f, c, p, R(C._payload), h)
      }
      if (Tr(C) || yr(C)) return (f = f.get(p) || null), d(c, f, C, h, null)
      Ml(c, C)
    }
    return null
  }
  function E(f, c, p, C) {
    for (
      var h = null, R = null, N = c, _ = (c = 0), A = null;
      N !== null && _ < p.length;
      _++
    ) {
      N.index > _ ? ((A = N), (N = null)) : (A = N.sibling)
      var j = m(f, N, p[_], C)
      if (j === null) {
        N === null && (N = A)
        break
      }
      e && N && j.alternate === null && t(f, N),
        (c = o(j, c, _)),
        R === null ? (h = j) : (R.sibling = j),
        (R = j),
        (N = A)
    }
    if (_ === p.length) return n(f, N), le && mn(f, _), h
    if (N === null) {
      for (; _ < p.length; _++)
        (N = y(f, p[_], C)),
          N !== null &&
            ((c = o(N, c, _)), R === null ? (h = N) : (R.sibling = N), (R = N))
      return le && mn(f, _), h
    }
    for (N = r(f, N); _ < p.length; _++)
      (A = g(N, f, _, p[_], C)),
        A !== null &&
          (e && A.alternate !== null && N.delete(A.key === null ? _ : A.key),
          (c = o(A, c, _)),
          R === null ? (h = A) : (R.sibling = A),
          (R = A))
    return (
      e &&
        N.forEach(function (ne) {
          return t(f, ne)
        }),
      le && mn(f, _),
      h
    )
  }
  function k(f, c, p, C) {
    var h = yr(p)
    if (typeof h != 'function') throw Error(L(150))
    if (((p = h.call(p)), p == null)) throw Error(L(151))
    for (
      var R = (h = null), N = c, _ = (c = 0), A = null, j = p.next();
      N !== null && !j.done;
      _++, j = p.next()
    ) {
      N.index > _ ? ((A = N), (N = null)) : (A = N.sibling)
      var ne = m(f, N, j.value, C)
      if (ne === null) {
        N === null && (N = A)
        break
      }
      e && N && ne.alternate === null && t(f, N),
        (c = o(ne, c, _)),
        R === null ? (h = ne) : (R.sibling = ne),
        (R = ne),
        (N = A)
    }
    if (j.done) return n(f, N), le && mn(f, _), h
    if (N === null) {
      for (; !j.done; _++, j = p.next())
        (j = y(f, j.value, C)),
          j !== null &&
            ((c = o(j, c, _)), R === null ? (h = j) : (R.sibling = j), (R = j))
      return le && mn(f, _), h
    }
    for (N = r(f, N); !j.done; _++, j = p.next())
      (j = g(N, f, _, j.value, C)),
        j !== null &&
          (e && j.alternate !== null && N.delete(j.key === null ? _ : j.key),
          (c = o(j, c, _)),
          R === null ? (h = j) : (R.sibling = j),
          (R = j))
    return (
      e &&
        N.forEach(function (Ye) {
          return t(f, Ye)
        }),
      le && mn(f, _),
      h
    )
  }
  function T(f, c, p, C) {
    if (
      (typeof p == 'object' &&
        p !== null &&
        p.type === An &&
        p.key === null &&
        (p = p.props.children),
      typeof p == 'object' && p !== null)
    ) {
      switch (p.$$typeof) {
        case El:
          e: {
            for (var h = p.key, R = c; R !== null; ) {
              if (R.key === h) {
                if (((h = p.type), h === An)) {
                  if (R.tag === 7) {
                    n(f, R.sibling),
                      (c = l(R, p.props.children)),
                      (c.return = f),
                      (f = c)
                    break e
                  }
                } else if (
                  R.elementType === h ||
                  (typeof h == 'object' &&
                    h !== null &&
                    h.$$typeof === Bt &&
                    Cs(h) === R.type)
                ) {
                  n(f, R.sibling),
                    (c = l(R, p.props)),
                    (c.ref = kr(f, R, p)),
                    (c.return = f),
                    (f = c)
                  break e
                }
                n(f, R)
                break
              } else t(f, R)
              R = R.sibling
            }
            p.type === An
              ? ((c = xn(p.props.children, f.mode, C, p.key)),
                (c.return = f),
                (f = c))
              : ((C = Jl(p.type, p.key, p.props, null, f.mode, C)),
                (C.ref = kr(f, c, p)),
                (C.return = f),
                (f = C))
          }
          return i(f)
        case $n:
          e: {
            for (R = p.key; c !== null; ) {
              if (c.key === R)
                if (
                  c.tag === 4 &&
                  c.stateNode.containerInfo === p.containerInfo &&
                  c.stateNode.implementation === p.implementation
                ) {
                  n(f, c.sibling),
                    (c = l(c, p.children || [])),
                    (c.return = f),
                    (f = c)
                  break e
                } else {
                  n(f, c)
                  break
                }
              else t(f, c)
              c = c.sibling
            }
            ;(c = ki(p, f.mode, C)), (c.return = f), (f = c)
          }
          return i(f)
        case Bt:
          return (R = p._init), T(f, c, R(p._payload), C)
      }
      if (Tr(p)) return E(f, c, p, C)
      if (yr(p)) return k(f, c, p, C)
      Ml(f, p)
    }
    return (typeof p == 'string' && p !== '') || typeof p == 'number'
      ? ((p = '' + p),
        c !== null && c.tag === 6
          ? (n(f, c.sibling), (c = l(c, p)), (c.return = f), (f = c))
          : (n(f, c), (c = Ei(p, f.mode, C)), (c.return = f), (f = c)),
        i(f))
      : n(f, c)
  }
  return T
}
var ir = Mf(!0),
  zf = Mf(!1),
  ho = un(null),
  mo = null,
  Xn = null,
  Ka = null
function Ya() {
  Ka = Xn = mo = null
}
function Xa(e) {
  var t = ho.current
  te(ho), (e._currentValue = t)
}
function ra(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break
    e = e.return
  }
}
function tr(e, t) {
  ;(mo = e),
    (Ka = Xn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Fe = !0), (e.firstContext = null))
}
function tt(e) {
  var t = e._currentValue
  if (Ka !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Xn === null)) {
      if (mo === null) throw Error(L(308))
      ;(Xn = e), (mo.dependencies = { lanes: 0, firstContext: e })
    } else Xn = Xn.next = e
  return t
}
var wn = null
function Ga(e) {
  wn === null ? (wn = [e]) : wn.push(e)
}
function Of(e, t, n, r) {
  var l = t.interleaved
  return (
    l === null ? ((n.next = n), Ga(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    Ot(e, r)
  )
}
function Ot(e, t) {
  e.lanes |= t
  var n = e.alternate
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return)
  return n.tag === 3 ? n.stateNode : null
}
var Vt = !1
function Ja(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  }
}
function Ff(e, t) {
  ;(e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      })
}
function Dt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  }
}
function bt(e, t, n) {
  var r = e.updateQueue
  if (r === null) return null
  if (((r = r.shared), Y & 2)) {
    var l = r.pending
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      Ot(e, n)
    )
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), Ga(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    Ot(e, n)
  )
}
function Wl(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes
    ;(r &= e.pendingLanes), (n |= r), (t.lanes = n), Fa(e, n)
  }
}
function Ps(e, t) {
  var n = e.updateQueue,
    r = e.alternate
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      o = null
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        }
        o === null ? (l = o = i) : (o = o.next = i), (n = n.next)
      } while (n !== null)
      o === null ? (l = o = t) : (o = o.next = t)
    } else l = o = t
    ;(n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n)
    return
  }
  ;(e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t)
}
function vo(e, t, n, r) {
  var l = e.updateQueue
  Vt = !1
  var o = l.firstBaseUpdate,
    i = l.lastBaseUpdate,
    a = l.shared.pending
  if (a !== null) {
    l.shared.pending = null
    var u = a,
      s = u.next
    ;(u.next = null), i === null ? (o = s) : (i.next = s), (i = u)
    var d = e.alternate
    d !== null &&
      ((d = d.updateQueue),
      (a = d.lastBaseUpdate),
      a !== i &&
        (a === null ? (d.firstBaseUpdate = s) : (a.next = s),
        (d.lastBaseUpdate = u)))
  }
  if (o !== null) {
    var y = l.baseState
    ;(i = 0), (d = s = u = null), (a = o)
    do {
      var m = a.lane,
        g = a.eventTime
      if ((r & m) === m) {
        d !== null &&
          (d = d.next =
            {
              eventTime: g,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            })
        e: {
          var E = e,
            k = a
          switch (((m = t), (g = n), k.tag)) {
            case 1:
              if (((E = k.payload), typeof E == 'function')) {
                y = E.call(g, y, m)
                break e
              }
              y = E
              break e
            case 3:
              E.flags = (E.flags & -65537) | 128
            case 0:
              if (
                ((E = k.payload),
                (m = typeof E == 'function' ? E.call(g, y, m) : E),
                m == null)
              )
                break e
              y = ue({}, y, m)
              break e
            case 2:
              Vt = !0
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64),
          (m = l.effects),
          m === null ? (l.effects = [a]) : m.push(a))
      } else
        (g = {
          eventTime: g,
          lane: m,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          d === null ? ((s = d = g), (u = y)) : (d = d.next = g),
          (i |= m)
      if (((a = a.next), a === null)) {
        if (((a = l.shared.pending), a === null)) break
        ;(m = a),
          (a = m.next),
          (m.next = null),
          (l.lastBaseUpdate = m),
          (l.shared.pending = null)
      }
    } while (!0)
    if (
      (d === null && (u = y),
      (l.baseState = u),
      (l.firstBaseUpdate = s),
      (l.lastBaseUpdate = d),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t
      do (i |= l.lane), (l = l.next)
      while (l !== t)
    } else o === null && (l.shared.lanes = 0)
    ;(Ln |= i), (e.lanes = i), (e.memoizedState = y)
  }
}
function Rs(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != 'function'))
          throw Error(L(191, l))
        l.call(r)
      }
    }
}
var cl = {},
  wt = un(cl),
  br = un(cl),
  el = un(cl)
function Sn(e) {
  if (e === cl) throw Error(L(174))
  return e
}
function Za(e, t) {
  switch ((q(el, t), q(br, e), q(wt, cl), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ji(null, '')
      break
    default:
      ;(e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = ji(t, e))
  }
  te(wt), q(wt, t)
}
function ar() {
  te(wt), te(br), te(el)
}
function If(e) {
  Sn(el.current)
  var t = Sn(wt.current),
    n = ji(t, e.type)
  t !== n && (q(br, e), q(wt, n))
}
function qa(e) {
  br.current === e && (te(wt), te(br))
}
var ie = un(0)
function yo(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!')
      )
        return t
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t
    } else if (t.child !== null) {
      ;(t.child.return = t), (t = t.child)
      continue
    }
    if (t === e) break
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null
      t = t.return
    }
    ;(t.sibling.return = t.return), (t = t.sibling)
  }
  return null
}
var mi = []
function ba() {
  for (var e = 0; e < mi.length; e++) mi[e]._workInProgressVersionPrimary = null
  mi.length = 0
}
var Ql = It.ReactCurrentDispatcher,
  vi = It.ReactCurrentBatchConfig,
  Rn = 0,
  ae = null,
  ve = null,
  ge = null,
  go = !1,
  Ur = !1,
  tl = 0,
  rm = 0
function Pe() {
  throw Error(L(321))
}
function eu(e, t) {
  if (t === null) return !1
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!dt(e[n], t[n])) return !1
  return !0
}
function tu(e, t, n, r, l, o) {
  if (
    ((Rn = o),
    (ae = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ql.current = e === null || e.memoizedState === null ? am : um),
    (e = n(r, l)),
    Ur)
  ) {
    o = 0
    do {
      if (((Ur = !1), (tl = 0), 25 <= o)) throw Error(L(301))
      ;(o += 1),
        (ge = ve = null),
        (t.updateQueue = null),
        (Ql.current = sm),
        (e = n(r, l))
    } while (Ur)
  }
  if (
    ((Ql.current = wo),
    (t = ve !== null && ve.next !== null),
    (Rn = 0),
    (ge = ve = ae = null),
    (go = !1),
    t)
  )
    throw Error(L(300))
  return e
}
function nu() {
  var e = tl !== 0
  return (tl = 0), e
}
function vt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  }
  return ge === null ? (ae.memoizedState = ge = e) : (ge = ge.next = e), ge
}
function nt() {
  if (ve === null) {
    var e = ae.alternate
    e = e !== null ? e.memoizedState : null
  } else e = ve.next
  var t = ge === null ? ae.memoizedState : ge.next
  if (t !== null) (ge = t), (ve = e)
  else {
    if (e === null) throw Error(L(310))
    ;(ve = e),
      (e = {
        memoizedState: ve.memoizedState,
        baseState: ve.baseState,
        baseQueue: ve.baseQueue,
        queue: ve.queue,
        next: null,
      }),
      ge === null ? (ae.memoizedState = ge = e) : (ge = ge.next = e)
  }
  return ge
}
function nl(e, t) {
  return typeof t == 'function' ? t(e) : t
}
function yi(e) {
  var t = nt(),
    n = t.queue
  if (n === null) throw Error(L(311))
  n.lastRenderedReducer = e
  var r = ve,
    l = r.baseQueue,
    o = n.pending
  if (o !== null) {
    if (l !== null) {
      var i = l.next
      ;(l.next = o.next), (o.next = i)
    }
    ;(r.baseQueue = l = o), (n.pending = null)
  }
  if (l !== null) {
    ;(o = l.next), (r = r.baseState)
    var a = (i = null),
      u = null,
      s = o
    do {
      var d = s.lane
      if ((Rn & d) === d)
        u !== null &&
          (u = u.next =
            {
              lane: 0,
              action: s.action,
              hasEagerState: s.hasEagerState,
              eagerState: s.eagerState,
              next: null,
            }),
          (r = s.hasEagerState ? s.eagerState : e(r, s.action))
      else {
        var y = {
          lane: d,
          action: s.action,
          hasEagerState: s.hasEagerState,
          eagerState: s.eagerState,
          next: null,
        }
        u === null ? ((a = u = y), (i = r)) : (u = u.next = y),
          (ae.lanes |= d),
          (Ln |= d)
      }
      s = s.next
    } while (s !== null && s !== o)
    u === null ? (i = r) : (u.next = a),
      dt(r, t.memoizedState) || (Fe = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = u),
      (n.lastRenderedState = r)
  }
  if (((e = n.interleaved), e !== null)) {
    l = e
    do (o = l.lane), (ae.lanes |= o), (Ln |= o), (l = l.next)
    while (l !== e)
  } else l === null && (n.lanes = 0)
  return [t.memoizedState, n.dispatch]
}
function gi(e) {
  var t = nt(),
    n = t.queue
  if (n === null) throw Error(L(311))
  n.lastRenderedReducer = e
  var r = n.dispatch,
    l = n.pending,
    o = t.memoizedState
  if (l !== null) {
    n.pending = null
    var i = (l = l.next)
    do (o = e(o, i.action)), (i = i.next)
    while (i !== l)
    dt(o, t.memoizedState) || (Fe = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o)
  }
  return [o, r]
}
function jf() {}
function Uf(e, t) {
  var n = ae,
    r = nt(),
    l = t(),
    o = !dt(r.memoizedState, l)
  if (
    (o && ((r.memoizedState = l), (Fe = !0)),
    (r = r.queue),
    ru(Hf.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (ge !== null && ge.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      rl(9, Af.bind(null, n, r, l, t), void 0, null),
      we === null)
    )
      throw Error(L(349))
    Rn & 30 || $f(n, t, l)
  }
  return l
}
function $f(e, t, n) {
  ;(e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = ae.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ae.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e))
}
function Af(e, t, n, r) {
  ;(t.value = n), (t.getSnapshot = r), Bf(t) && Vf(e)
}
function Hf(e, t, n) {
  return n(function () {
    Bf(t) && Vf(e)
  })
}
function Bf(e) {
  var t = e.getSnapshot
  e = e.value
  try {
    var n = t()
    return !dt(e, n)
  } catch {
    return !0
  }
}
function Vf(e) {
  var t = Ot(e, 1)
  t !== null && ft(t, e, 1, -1)
}
function Ls(e) {
  var t = vt()
  return (
    typeof e == 'function' && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: nl,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = im.bind(null, ae, e)),
    [t.memoizedState, e]
  )
}
function rl(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = ae.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ae.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  )
}
function Wf() {
  return nt().memoizedState
}
function Kl(e, t, n, r) {
  var l = vt()
  ;(ae.flags |= e),
    (l.memoizedState = rl(1 | t, n, void 0, r === void 0 ? null : r))
}
function Fo(e, t, n, r) {
  var l = nt()
  r = r === void 0 ? null : r
  var o = void 0
  if (ve !== null) {
    var i = ve.memoizedState
    if (((o = i.destroy), r !== null && eu(r, i.deps))) {
      l.memoizedState = rl(t, n, o, r)
      return
    }
  }
  ;(ae.flags |= e), (l.memoizedState = rl(1 | t, n, o, r))
}
function _s(e, t) {
  return Kl(8390656, 8, e, t)
}
function ru(e, t) {
  return Fo(2048, 8, e, t)
}
function Qf(e, t) {
  return Fo(4, 2, e, t)
}
function Kf(e, t) {
  return Fo(4, 4, e, t)
}
function Yf(e, t) {
  if (typeof t == 'function')
    return (
      (e = e()),
      t(e),
      function () {
        t(null)
      }
    )
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null
      }
    )
}
function Xf(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Fo(4, 4, Yf.bind(null, t, e), n)
  )
}
function lu() {}
function Gf(e, t) {
  var n = nt()
  t = t === void 0 ? null : t
  var r = n.memoizedState
  return r !== null && t !== null && eu(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e)
}
function Jf(e, t) {
  var n = nt()
  t = t === void 0 ? null : t
  var r = n.memoizedState
  return r !== null && t !== null && eu(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e)
}
function Zf(e, t, n) {
  return Rn & 21
    ? (dt(n, t) || ((n = tf()), (ae.lanes |= n), (Ln |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Fe = !0)), (e.memoizedState = n))
}
function lm(e, t) {
  var n = X
  ;(X = n !== 0 && 4 > n ? n : 4), e(!0)
  var r = vi.transition
  vi.transition = {}
  try {
    e(!1), t()
  } finally {
    ;(X = n), (vi.transition = r)
  }
}
function qf() {
  return nt().memoizedState
}
function om(e, t, n) {
  var r = tn(e)
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    bf(e))
  )
    ed(t, n)
  else if (((n = Of(e, t, n, r)), n !== null)) {
    var l = De()
    ft(n, e, r, l), td(n, t, r)
  }
}
function im(e, t, n) {
  var r = tn(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }
  if (bf(e)) ed(t, l)
  else {
    var o = e.alternate
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var i = t.lastRenderedState,
          a = o(i, n)
        if (((l.hasEagerState = !0), (l.eagerState = a), dt(a, i))) {
          var u = t.interleaved
          u === null
            ? ((l.next = l), Ga(t))
            : ((l.next = u.next), (u.next = l)),
            (t.interleaved = l)
          return
        }
      } catch {
      } finally {
      }
    ;(n = Of(e, t, l, r)),
      n !== null && ((l = De()), ft(n, e, r, l), td(n, t, r))
  }
}
function bf(e) {
  var t = e.alternate
  return e === ae || (t !== null && t === ae)
}
function ed(e, t) {
  Ur = go = !0
  var n = e.pending
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t)
}
function td(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes
    ;(r &= e.pendingLanes), (n |= r), (t.lanes = n), Fa(e, n)
  }
}
var wo = {
    readContext: tt,
    useCallback: Pe,
    useContext: Pe,
    useEffect: Pe,
    useImperativeHandle: Pe,
    useInsertionEffect: Pe,
    useLayoutEffect: Pe,
    useMemo: Pe,
    useReducer: Pe,
    useRef: Pe,
    useState: Pe,
    useDebugValue: Pe,
    useDeferredValue: Pe,
    useTransition: Pe,
    useMutableSource: Pe,
    useSyncExternalStore: Pe,
    useId: Pe,
    unstable_isNewReconciler: !1,
  },
  am = {
    readContext: tt,
    useCallback: function (e, t) {
      return (vt().memoizedState = [e, t === void 0 ? null : t]), e
    },
    useContext: tt,
    useEffect: _s,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Kl(4194308, 4, Yf.bind(null, t, e), n)
      )
    },
    useLayoutEffect: function (e, t) {
      return Kl(4194308, 4, e, t)
    },
    useInsertionEffect: function (e, t) {
      return Kl(4, 2, e, t)
    },
    useMemo: function (e, t) {
      var n = vt()
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      )
    },
    useReducer: function (e, t, n) {
      var r = vt()
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = om.bind(null, ae, e)),
        [r.memoizedState, e]
      )
    },
    useRef: function (e) {
      var t = vt()
      return (e = { current: e }), (t.memoizedState = e)
    },
    useState: Ls,
    useDebugValue: lu,
    useDeferredValue: function (e) {
      return (vt().memoizedState = e)
    },
    useTransition: function () {
      var e = Ls(!1),
        t = e[0]
      return (e = lm.bind(null, e[1])), (vt().memoizedState = e), [t, e]
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = ae,
        l = vt()
      if (le) {
        if (n === void 0) throw Error(L(407))
        n = n()
      } else {
        if (((n = t()), we === null)) throw Error(L(349))
        Rn & 30 || $f(r, t, n)
      }
      l.memoizedState = n
      var o = { value: n, getSnapshot: t }
      return (
        (l.queue = o),
        _s(Hf.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        rl(9, Af.bind(null, r, o, n, t), void 0, null),
        n
      )
    },
    useId: function () {
      var e = vt(),
        t = we.identifierPrefix
      if (le) {
        var n = Nt,
          r = Tt
        ;(n = (r & ~(1 << (32 - ct(r) - 1))).toString(32) + n),
          (t = ':' + t + 'R' + n),
          (n = tl++),
          0 < n && (t += 'H' + n.toString(32)),
          (t += ':')
      } else (n = rm++), (t = ':' + t + 'r' + n.toString(32) + ':')
      return (e.memoizedState = t)
    },
    unstable_isNewReconciler: !1,
  },
  um = {
    readContext: tt,
    useCallback: Gf,
    useContext: tt,
    useEffect: ru,
    useImperativeHandle: Xf,
    useInsertionEffect: Qf,
    useLayoutEffect: Kf,
    useMemo: Jf,
    useReducer: yi,
    useRef: Wf,
    useState: function () {
      return yi(nl)
    },
    useDebugValue: lu,
    useDeferredValue: function (e) {
      var t = nt()
      return Zf(t, ve.memoizedState, e)
    },
    useTransition: function () {
      var e = yi(nl)[0],
        t = nt().memoizedState
      return [e, t]
    },
    useMutableSource: jf,
    useSyncExternalStore: Uf,
    useId: qf,
    unstable_isNewReconciler: !1,
  },
  sm = {
    readContext: tt,
    useCallback: Gf,
    useContext: tt,
    useEffect: ru,
    useImperativeHandle: Xf,
    useInsertionEffect: Qf,
    useLayoutEffect: Kf,
    useMemo: Jf,
    useReducer: gi,
    useRef: Wf,
    useState: function () {
      return gi(nl)
    },
    useDebugValue: lu,
    useDeferredValue: function (e) {
      var t = nt()
      return ve === null ? (t.memoizedState = e) : Zf(t, ve.memoizedState, e)
    },
    useTransition: function () {
      var e = gi(nl)[0],
        t = nt().memoizedState
      return [e, t]
    },
    useMutableSource: jf,
    useSyncExternalStore: Uf,
    useId: qf,
    unstable_isNewReconciler: !1,
  }
function it(e, t) {
  if (e && e.defaultProps) {
    ;(t = ue({}, t)), (e = e.defaultProps)
    for (var n in e) t[n] === void 0 && (t[n] = e[n])
    return t
  }
  return t
}
function la(e, t, n, r) {
  ;(t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : ue({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n)
}
var Io = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Nn(e) === e : !1
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals
    var r = De(),
      l = tn(e),
      o = Dt(r, l)
    ;(o.payload = t),
      n != null && (o.callback = n),
      (t = bt(e, o, l)),
      t !== null && (ft(t, e, l, r), Wl(t, e, l))
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals
    var r = De(),
      l = tn(e),
      o = Dt(r, l)
    ;(o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = bt(e, o, l)),
      t !== null && (ft(t, e, l, r), Wl(t, e, l))
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals
    var n = De(),
      r = tn(e),
      l = Dt(n, r)
    ;(l.tag = 2),
      t != null && (l.callback = t),
      (t = bt(e, l, r)),
      t !== null && (ft(t, e, r, n), Wl(t, e, r))
  },
}
function Ts(e, t, n, r, l, o, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(r, o, i)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Gr(n, r) || !Gr(l, o)
        : !0
  )
}
function nd(e, t, n) {
  var r = !1,
    l = ln,
    o = t.contextType
  return (
    typeof o == 'object' && o !== null
      ? (o = tt(o))
      : ((l = je(t) ? Cn : _e.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? lr(e, l) : ln)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Io),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  )
}
function Ns(e, t, n, r) {
  ;(e = t.state),
    typeof t.componentWillReceiveProps == 'function' &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Io.enqueueReplaceState(t, t.state, null)
}
function oa(e, t, n, r) {
  var l = e.stateNode
  ;(l.props = n), (l.state = e.memoizedState), (l.refs = {}), Ja(e)
  var o = t.contextType
  typeof o == 'object' && o !== null
    ? (l.context = tt(o))
    : ((o = je(t) ? Cn : _e.current), (l.context = lr(e, o))),
    (l.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == 'function' && (la(e, t, o, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == 'function' ||
      typeof l.getSnapshotBeforeUpdate == 'function' ||
      (typeof l.UNSAFE_componentWillMount != 'function' &&
        typeof l.componentWillMount != 'function') ||
      ((t = l.state),
      typeof l.componentWillMount == 'function' && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == 'function' &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && Io.enqueueReplaceState(l, l.state, null),
      vo(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == 'function' && (e.flags |= 4194308)
}
function ur(e, t) {
  try {
    var n = '',
      r = t
    do (n += jp(r)), (r = r.return)
    while (r)
    var l = n
  } catch (o) {
    l =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack
  }
  return { value: e, source: t, stack: l, digest: null }
}
function wi(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null }
}
function ia(e, t) {
  try {
    console.error(t.value)
  } catch (n) {
    setTimeout(function () {
      throw n
    })
  }
}
var cm = typeof WeakMap == 'function' ? WeakMap : Map
function rd(e, t, n) {
  ;(n = Dt(-1, n)), (n.tag = 3), (n.payload = { element: null })
  var r = t.value
  return (
    (n.callback = function () {
      Eo || ((Eo = !0), (va = r)), ia(e, t)
    }),
    n
  )
}
function ld(e, t, n) {
  ;(n = Dt(-1, n)), (n.tag = 3)
  var r = e.type.getDerivedStateFromError
  if (typeof r == 'function') {
    var l = t.value
    ;(n.payload = function () {
      return r(l)
    }),
      (n.callback = function () {
        ia(e, t)
      })
  }
  var o = e.stateNode
  return (
    o !== null &&
      typeof o.componentDidCatch == 'function' &&
      (n.callback = function () {
        ia(e, t),
          typeof r != 'function' &&
            (en === null ? (en = new Set([this])) : en.add(this))
        var i = t.stack
        this.componentDidCatch(t.value, { componentStack: i !== null ? i : '' })
      }),
    n
  )
}
function Ds(e, t, n) {
  var r = e.pingCache
  if (r === null) {
    r = e.pingCache = new cm()
    var l = new Set()
    r.set(t, l)
  } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l))
  l.has(n) || (l.add(n), (e = Cm.bind(null, e, t, n)), t.then(e, e))
}
function Ms(e) {
  do {
    var t
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e
    e = e.return
  } while (e !== null)
  return null
}
function zs(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Dt(-1, 1)), (t.tag = 2), bt(n, t, 1))),
          (n.lanes |= 1)),
      e)
}
var fm = It.ReactCurrentOwner,
  Fe = !1
function Ne(e, t, n, r) {
  t.child = e === null ? zf(t, null, n, r) : ir(t, e.child, n, r)
}
function Os(e, t, n, r, l) {
  n = n.render
  var o = t.ref
  return (
    tr(t, l),
    (r = tu(e, t, n, r, o, l)),
    (n = nu()),
    e !== null && !Fe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        Ft(e, t, l))
      : (le && n && Va(t), (t.flags |= 1), Ne(e, t, r, l), t.child)
  )
}
function Fs(e, t, n, r, l) {
  if (e === null) {
    var o = n.type
    return typeof o == 'function' &&
      !du(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), od(e, t, o, r, l))
      : ((e = Jl(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e))
  }
  if (((o = e.child), !(e.lanes & l))) {
    var i = o.memoizedProps
    if (
      ((n = n.compare), (n = n !== null ? n : Gr), n(i, r) && e.ref === t.ref)
    )
      return Ft(e, t, l)
  }
  return (
    (t.flags |= 1),
    (e = nn(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  )
}
function od(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps
    if (Gr(o, r) && e.ref === t.ref)
      if (((Fe = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
        e.flags & 131072 && (Fe = !0)
      else return (t.lanes = e.lanes), Ft(e, t, l)
  }
  return aa(e, t, n, r, l)
}
function id(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    o = e !== null ? e.memoizedState : null
  if (r.mode === 'hidden')
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        q(Jn, Ae),
        (Ae |= n)
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          q(Jn, Ae),
          (Ae |= e),
          null
        )
      ;(t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        q(Jn, Ae),
        (Ae |= r)
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      q(Jn, Ae),
      (Ae |= r)
  return Ne(e, t, l, n), t.child
}
function ad(e, t) {
  var n = t.ref
  ;((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152))
}
function aa(e, t, n, r, l) {
  var o = je(n) ? Cn : _e.current
  return (
    (o = lr(t, o)),
    tr(t, l),
    (n = tu(e, t, n, r, o, l)),
    (r = nu()),
    e !== null && !Fe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        Ft(e, t, l))
      : (le && r && Va(t), (t.flags |= 1), Ne(e, t, n, l), t.child)
  )
}
function Is(e, t, n, r, l) {
  if (je(n)) {
    var o = !0
    co(t)
  } else o = !1
  if ((tr(t, l), t.stateNode === null))
    Yl(e, t), nd(t, n, r), oa(t, n, r, l), (r = !0)
  else if (e === null) {
    var i = t.stateNode,
      a = t.memoizedProps
    i.props = a
    var u = i.context,
      s = n.contextType
    typeof s == 'object' && s !== null
      ? (s = tt(s))
      : ((s = je(n) ? Cn : _e.current), (s = lr(t, s)))
    var d = n.getDerivedStateFromProps,
      y =
        typeof d == 'function' || typeof i.getSnapshotBeforeUpdate == 'function'
    y ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof i.componentWillReceiveProps != 'function') ||
      ((a !== r || u !== s) && Ns(t, i, r, s)),
      (Vt = !1)
    var m = t.memoizedState
    ;(i.state = m),
      vo(t, r, i, l),
      (u = t.memoizedState),
      a !== r || m !== u || Ie.current || Vt
        ? (typeof d == 'function' && (la(t, n, d, r), (u = t.memoizedState)),
          (a = Vt || Ts(t, n, a, r, m, u, s))
            ? (y ||
                (typeof i.UNSAFE_componentWillMount != 'function' &&
                  typeof i.componentWillMount != 'function') ||
                (typeof i.componentWillMount == 'function' &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == 'function' &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == 'function' && (t.flags |= 4194308))
            : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (i.props = r),
          (i.state = u),
          (i.context = s),
          (r = a))
        : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
          (r = !1))
  } else {
    ;(i = t.stateNode),
      Ff(e, t),
      (a = t.memoizedProps),
      (s = t.type === t.elementType ? a : it(t.type, a)),
      (i.props = s),
      (y = t.pendingProps),
      (m = i.context),
      (u = n.contextType),
      typeof u == 'object' && u !== null
        ? (u = tt(u))
        : ((u = je(n) ? Cn : _e.current), (u = lr(t, u)))
    var g = n.getDerivedStateFromProps
    ;(d =
      typeof g == 'function' ||
      typeof i.getSnapshotBeforeUpdate == 'function') ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof i.componentWillReceiveProps != 'function') ||
      ((a !== y || m !== u) && Ns(t, i, r, u)),
      (Vt = !1),
      (m = t.memoizedState),
      (i.state = m),
      vo(t, r, i, l)
    var E = t.memoizedState
    a !== y || m !== E || Ie.current || Vt
      ? (typeof g == 'function' && (la(t, n, g, r), (E = t.memoizedState)),
        (s = Vt || Ts(t, n, s, r, m, E, u) || !1)
          ? (d ||
              (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                typeof i.componentWillUpdate != 'function') ||
              (typeof i.componentWillUpdate == 'function' &&
                i.componentWillUpdate(r, E, u),
              typeof i.UNSAFE_componentWillUpdate == 'function' &&
                i.UNSAFE_componentWillUpdate(r, E, u)),
            typeof i.componentDidUpdate == 'function' && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != 'function' ||
              (a === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != 'function' ||
              (a === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = E)),
        (i.props = r),
        (i.state = E),
        (i.context = u),
        (r = s))
      : (typeof i.componentDidUpdate != 'function' ||
          (a === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != 'function' ||
          (a === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1))
  }
  return ua(e, t, n, r, o, l)
}
function ua(e, t, n, r, l, o) {
  ad(e, t)
  var i = (t.flags & 128) !== 0
  if (!r && !i) return l && Es(t, n, !1), Ft(e, t, o)
  ;(r = t.stateNode), (fm.current = t)
  var a =
    i && typeof n.getDerivedStateFromError != 'function' ? null : r.render()
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = ir(t, e.child, null, o)), (t.child = ir(t, null, a, o)))
      : Ne(e, t, a, o),
    (t.memoizedState = r.state),
    l && Es(t, n, !0),
    t.child
  )
}
function ud(e) {
  var t = e.stateNode
  t.pendingContext
    ? Ss(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Ss(e, t.context, !1),
    Za(e, t.containerInfo)
}
function js(e, t, n, r, l) {
  return or(), Qa(l), (t.flags |= 256), Ne(e, t, n, r), t.child
}
var sa = { dehydrated: null, treeContext: null, retryLane: 0 }
function ca(e) {
  return { baseLanes: e, cachePool: null, transitions: null }
}
function sd(e, t, n) {
  var r = t.pendingProps,
    l = ie.current,
    o = !1,
    i = (t.flags & 128) !== 0,
    a
  if (
    ((a = i) ||
      (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    a
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    q(ie, l & 1),
    e === null)
  )
    return (
      na(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === '$!'
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (i = { mode: 'hidden', children: i }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = i))
                : (o = $o(i, r, 0, null)),
              (e = xn(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = ca(n)),
              (t.memoizedState = sa),
              e)
            : ou(t, i))
    )
  if (((l = e.memoizedState), l !== null && ((a = l.dehydrated), a !== null)))
    return dm(e, t, i, r, a, l, n)
  if (o) {
    ;(o = r.fallback), (i = t.mode), (l = e.child), (a = l.sibling)
    var u = { mode: 'hidden', children: r.children }
    return (
      !(i & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = u),
          (t.deletions = null))
        : ((r = nn(l, u)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      a !== null ? (o = nn(a, o)) : ((o = xn(o, i, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? ca(n)
          : {
              baseLanes: i.baseLanes | n,
              cachePool: null,
              transitions: i.transitions,
            }),
      (o.memoizedState = i),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = sa),
      r
    )
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = nn(o, { mode: 'visible', children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  )
}
function ou(e, t) {
  return (
    (t = $o({ mode: 'visible', children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  )
}
function zl(e, t, n, r) {
  return (
    r !== null && Qa(r),
    ir(t, e.child, null, n),
    (e = ou(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  )
}
function dm(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = wi(Error(L(422)))), zl(e, t, i, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((o = r.fallback),
          (l = t.mode),
          (r = $o({ mode: 'visible', children: r.children }, l, 0, null)),
          (o = xn(o, l, i, null)),
          (o.flags |= 2),
          (r.return = t),
          (o.return = t),
          (r.sibling = o),
          (t.child = r),
          t.mode & 1 && ir(t, e.child, null, i),
          (t.child.memoizedState = ca(i)),
          (t.memoizedState = sa),
          o)
  if (!(t.mode & 1)) return zl(e, t, i, null)
  if (l.data === '$!') {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var a = r.dgst
    return (r = a), (o = Error(L(419))), (r = wi(o, r, void 0)), zl(e, t, i, r)
  }
  if (((a = (i & e.childLanes) !== 0), Fe || a)) {
    if (((r = we), r !== null)) {
      switch (i & -i) {
        case 4:
          l = 2
          break
        case 16:
          l = 8
          break
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32
          break
        case 536870912:
          l = 268435456
          break
        default:
          l = 0
      }
      ;(l = l & (r.suspendedLanes | i) ? 0 : l),
        l !== 0 &&
          l !== o.retryLane &&
          ((o.retryLane = l), Ot(e, l), ft(r, e, l, -1))
    }
    return fu(), (r = wi(Error(L(421)))), zl(e, t, i, r)
  }
  return l.data === '$?'
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Pm.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (Be = qt(l.nextSibling)),
      (Ve = t),
      (le = !0),
      (st = null),
      e !== null &&
        ((Ze[qe++] = Tt),
        (Ze[qe++] = Nt),
        (Ze[qe++] = Pn),
        (Tt = e.id),
        (Nt = e.overflow),
        (Pn = t)),
      (t = ou(t, r.children)),
      (t.flags |= 4096),
      t)
}
function Us(e, t, n) {
  e.lanes |= t
  var r = e.alternate
  r !== null && (r.lanes |= t), ra(e.return, t, n)
}
function Si(e, t, n, r, l) {
  var o = e.memoizedState
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = l))
}
function cd(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    o = r.tail
  if ((Ne(e, t, r.children, n), (r = ie.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128)
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Us(e, n, t)
        else if (e.tag === 19) Us(e, n, t)
        else if (e.child !== null) {
          ;(e.child.return = e), (e = e.child)
          continue
        }
        if (e === t) break e
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e
          e = e.return
        }
        ;(e.sibling.return = e.return), (e = e.sibling)
      }
    r &= 1
  }
  if ((q(ie, r), !(t.mode & 1))) t.memoizedState = null
  else
    switch (l) {
      case 'forwards':
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate),
            e !== null && yo(e) === null && (l = n),
            (n = n.sibling)
        ;(n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          Si(t, !1, l, n, o)
        break
      case 'backwards':
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && yo(e) === null)) {
            t.child = l
            break
          }
          ;(e = l.sibling), (l.sibling = n), (n = l), (l = e)
        }
        Si(t, !0, n, null, o)
        break
      case 'together':
        Si(t, !1, null, null, void 0)
        break
      default:
        t.memoizedState = null
    }
  return t.child
}
function Yl(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2))
}
function Ft(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Ln |= t.lanes),
    !(n & t.childLanes))
  )
    return null
  if (e !== null && t.child !== e.child) throw Error(L(153))
  if (t.child !== null) {
    for (
      e = t.child, n = nn(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = nn(e, e.pendingProps)), (n.return = t)
    n.sibling = null
  }
  return t.child
}
function pm(e, t, n) {
  switch (t.tag) {
    case 3:
      ud(t), or()
      break
    case 5:
      If(t)
      break
    case 1:
      je(t.type) && co(t)
      break
    case 4:
      Za(t, t.stateNode.containerInfo)
      break
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value
      q(ho, r._currentValue), (r._currentValue = l)
      break
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (q(ie, ie.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? sd(e, t, n)
            : (q(ie, ie.current & 1),
              (e = Ft(e, t, n)),
              e !== null ? e.sibling : null)
      q(ie, ie.current & 1)
      break
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return cd(e, t, n)
        t.flags |= 128
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        q(ie, ie.current),
        r)
      )
        break
      return null
    case 22:
    case 23:
      return (t.lanes = 0), id(e, t, n)
  }
  return Ft(e, t, n)
}
var fd, fa, dd, pd
fd = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode)
    else if (n.tag !== 4 && n.child !== null) {
      ;(n.child.return = n), (n = n.child)
      continue
    }
    if (n === t) break
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return
      n = n.return
    }
    ;(n.sibling.return = n.return), (n = n.sibling)
  }
}
fa = function () {}
dd = function (e, t, n, r) {
  var l = e.memoizedProps
  if (l !== r) {
    ;(e = t.stateNode), Sn(wt.current)
    var o = null
    switch (n) {
      case 'input':
        ;(l = zi(e, l)), (r = zi(e, r)), (o = [])
        break
      case 'select':
        ;(l = ue({}, l, { value: void 0 })),
          (r = ue({}, r, { value: void 0 })),
          (o = [])
        break
      case 'textarea':
        ;(l = Ii(e, l)), (r = Ii(e, r)), (o = [])
        break
      default:
        typeof l.onClick != 'function' &&
          typeof r.onClick == 'function' &&
          (e.onclick = uo)
    }
    Ui(n, r)
    var i
    n = null
    for (s in l)
      if (!r.hasOwnProperty(s) && l.hasOwnProperty(s) && l[s] != null)
        if (s === 'style') {
          var a = l[s]
          for (i in a) a.hasOwnProperty(i) && (n || (n = {}), (n[i] = ''))
        } else
          s !== 'dangerouslySetInnerHTML' &&
            s !== 'children' &&
            s !== 'suppressContentEditableWarning' &&
            s !== 'suppressHydrationWarning' &&
            s !== 'autoFocus' &&
            (Br.hasOwnProperty(s) ? o || (o = []) : (o = o || []).push(s, null))
    for (s in r) {
      var u = r[s]
      if (
        ((a = l != null ? l[s] : void 0),
        r.hasOwnProperty(s) && u !== a && (u != null || a != null))
      )
        if (s === 'style')
          if (a) {
            for (i in a)
              !a.hasOwnProperty(i) ||
                (u && u.hasOwnProperty(i)) ||
                (n || (n = {}), (n[i] = ''))
            for (i in u)
              u.hasOwnProperty(i) &&
                a[i] !== u[i] &&
                (n || (n = {}), (n[i] = u[i]))
          } else n || (o || (o = []), o.push(s, n)), (n = u)
        else
          s === 'dangerouslySetInnerHTML'
            ? ((u = u ? u.__html : void 0),
              (a = a ? a.__html : void 0),
              u != null && a !== u && (o = o || []).push(s, u))
            : s === 'children'
              ? (typeof u != 'string' && typeof u != 'number') ||
                (o = o || []).push(s, '' + u)
              : s !== 'suppressContentEditableWarning' &&
                s !== 'suppressHydrationWarning' &&
                (Br.hasOwnProperty(s)
                  ? (u != null && s === 'onScroll' && ee('scroll', e),
                    o || a === u || (o = []))
                  : (o = o || []).push(s, u))
    }
    n && (o = o || []).push('style', n)
    var s = o
    ;(t.updateQueue = s) && (t.flags |= 4)
  }
}
pd = function (e, t, n, r) {
  n !== r && (t.flags |= 4)
}
function xr(e, t) {
  if (!le)
    switch (e.tailMode) {
      case 'hidden':
        t = e.tail
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling)
        n === null ? (e.tail = null) : (n.sibling = null)
        break
      case 'collapsed':
        n = e.tail
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling)
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null)
    }
}
function Re(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0
  if (t)
    for (var l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling)
  else
    for (l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling)
  return (e.subtreeFlags |= r), (e.childLanes = n), t
}
function hm(e, t, n) {
  var r = t.pendingProps
  switch ((Wa(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Re(t), null
    case 1:
      return je(t.type) && so(), Re(t), null
    case 3:
      return (
        (r = t.stateNode),
        ar(),
        te(Ie),
        te(_e),
        ba(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Dl(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), st !== null && (wa(st), (st = null)))),
        fa(e, t),
        Re(t),
        null
      )
    case 5:
      qa(t)
      var l = Sn(el.current)
      if (((n = t.type), e !== null && t.stateNode != null))
        dd(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152))
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(L(166))
          return Re(t), null
        }
        if (((e = Sn(wt.current)), Dl(t))) {
          ;(r = t.stateNode), (n = t.type)
          var o = t.memoizedProps
          switch (((r[yt] = t), (r[qr] = o), (e = (t.mode & 1) !== 0), n)) {
            case 'dialog':
              ee('cancel', r), ee('close', r)
              break
            case 'iframe':
            case 'object':
            case 'embed':
              ee('load', r)
              break
            case 'video':
            case 'audio':
              for (l = 0; l < Dr.length; l++) ee(Dr[l], r)
              break
            case 'source':
              ee('error', r)
              break
            case 'img':
            case 'image':
            case 'link':
              ee('error', r), ee('load', r)
              break
            case 'details':
              ee('toggle', r)
              break
            case 'input':
              Yu(r, o), ee('invalid', r)
              break
            case 'select':
              ;(r._wrapperState = { wasMultiple: !!o.multiple }),
                ee('invalid', r)
              break
            case 'textarea':
              Gu(r, o), ee('invalid', r)
          }
          Ui(n, o), (l = null)
          for (var i in o)
            if (o.hasOwnProperty(i)) {
              var a = o[i]
              i === 'children'
                ? typeof a == 'string'
                  ? r.textContent !== a &&
                    (o.suppressHydrationWarning !== !0 &&
                      Nl(r.textContent, a, e),
                    (l = ['children', a]))
                  : typeof a == 'number' &&
                    r.textContent !== '' + a &&
                    (o.suppressHydrationWarning !== !0 &&
                      Nl(r.textContent, a, e),
                    (l = ['children', '' + a]))
                : Br.hasOwnProperty(i) &&
                  a != null &&
                  i === 'onScroll' &&
                  ee('scroll', r)
            }
          switch (n) {
            case 'input':
              kl(r), Xu(r, o, !0)
              break
            case 'textarea':
              kl(r), Ju(r)
              break
            case 'select':
            case 'option':
              break
            default:
              typeof o.onClick == 'function' && (r.onclick = uo)
          }
          ;(r = l), (t.updateQueue = r), r !== null && (t.flags |= 4)
        } else {
          ;(i = l.nodeType === 9 ? l : l.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = Ac(n)),
            e === 'http://www.w3.org/1999/xhtml'
              ? n === 'script'
                ? ((e = i.createElement('div')),
                  (e.innerHTML = '<script></script>'),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == 'string'
                  ? (e = i.createElement(n, { is: r.is }))
                  : ((e = i.createElement(n)),
                    n === 'select' &&
                      ((i = e),
                      r.multiple
                        ? (i.multiple = !0)
                        : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[yt] = t),
            (e[qr] = r),
            fd(e, t, !1, !1),
            (t.stateNode = e)
          e: {
            switch (((i = $i(n, r)), n)) {
              case 'dialog':
                ee('cancel', e), ee('close', e), (l = r)
                break
              case 'iframe':
              case 'object':
              case 'embed':
                ee('load', e), (l = r)
                break
              case 'video':
              case 'audio':
                for (l = 0; l < Dr.length; l++) ee(Dr[l], e)
                l = r
                break
              case 'source':
                ee('error', e), (l = r)
                break
              case 'img':
              case 'image':
              case 'link':
                ee('error', e), ee('load', e), (l = r)
                break
              case 'details':
                ee('toggle', e), (l = r)
                break
              case 'input':
                Yu(e, r), (l = zi(e, r)), ee('invalid', e)
                break
              case 'option':
                l = r
                break
              case 'select':
                ;(e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = ue({}, r, { value: void 0 })),
                  ee('invalid', e)
                break
              case 'textarea':
                Gu(e, r), (l = Ii(e, r)), ee('invalid', e)
                break
              default:
                l = r
            }
            Ui(n, l), (a = l)
            for (o in a)
              if (a.hasOwnProperty(o)) {
                var u = a[o]
                o === 'style'
                  ? Vc(e, u)
                  : o === 'dangerouslySetInnerHTML'
                    ? ((u = u ? u.__html : void 0), u != null && Hc(e, u))
                    : o === 'children'
                      ? typeof u == 'string'
                        ? (n !== 'textarea' || u !== '') && Vr(e, u)
                        : typeof u == 'number' && Vr(e, '' + u)
                      : o !== 'suppressContentEditableWarning' &&
                        o !== 'suppressHydrationWarning' &&
                        o !== 'autoFocus' &&
                        (Br.hasOwnProperty(o)
                          ? u != null && o === 'onScroll' && ee('scroll', e)
                          : u != null && Ta(e, o, u, i))
              }
            switch (n) {
              case 'input':
                kl(e), Xu(e, r, !1)
                break
              case 'textarea':
                kl(e), Ju(e)
                break
              case 'option':
                r.value != null && e.setAttribute('value', '' + rn(r.value))
                break
              case 'select':
                ;(e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? Zn(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      Zn(e, !!r.multiple, r.defaultValue, !0)
                break
              default:
                typeof l.onClick == 'function' && (e.onclick = uo)
            }
            switch (n) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                r = !!r.autoFocus
                break e
              case 'img':
                r = !0
                break e
              default:
                r = !1
            }
          }
          r && (t.flags |= 4)
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152))
      }
      return Re(t), null
    case 6:
      if (e && t.stateNode != null) pd(e, t, e.memoizedProps, r)
      else {
        if (typeof r != 'string' && t.stateNode === null) throw Error(L(166))
        if (((n = Sn(el.current)), Sn(wt.current), Dl(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[yt] = t),
            (o = r.nodeValue !== n) && ((e = Ve), e !== null))
          )
            switch (e.tag) {
              case 3:
                Nl(r.nodeValue, n, (e.mode & 1) !== 0)
                break
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Nl(r.nodeValue, n, (e.mode & 1) !== 0)
            }
          o && (t.flags |= 4)
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[yt] = t),
            (t.stateNode = r)
      }
      return Re(t), null
    case 13:
      if (
        (te(ie),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (le && Be !== null && t.mode & 1 && !(t.flags & 128))
          Df(), or(), (t.flags |= 98560), (o = !1)
        else if (((o = Dl(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(L(318))
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(L(317))
            o[yt] = t
          } else
            or(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4)
          Re(t), (o = !1)
        } else st !== null && (wa(st), (st = null)), (o = !0)
        if (!o) return t.flags & 65536 ? t : null
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || ie.current & 1 ? ye === 0 && (ye = 3) : fu())),
          t.updateQueue !== null && (t.flags |= 4),
          Re(t),
          null)
    case 4:
      return (
        ar(), fa(e, t), e === null && Jr(t.stateNode.containerInfo), Re(t), null
      )
    case 10:
      return Xa(t.type._context), Re(t), null
    case 17:
      return je(t.type) && so(), Re(t), null
    case 19:
      if ((te(ie), (o = t.memoizedState), o === null)) return Re(t), null
      if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
        if (r) xr(o, !1)
        else {
          if (ye !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = yo(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    xr(o, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (i = o.alternate),
                    i === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = i.childLanes),
                        (o.lanes = i.lanes),
                        (o.child = i.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = i.memoizedProps),
                        (o.memoizedState = i.memoizedState),
                        (o.updateQueue = i.updateQueue),
                        (o.type = i.type),
                        (e = i.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling)
                return q(ie, (ie.current & 1) | 2), t.child
              }
              e = e.sibling
            }
          o.tail !== null &&
            ce() > sr &&
            ((t.flags |= 128), (r = !0), xr(o, !1), (t.lanes = 4194304))
        }
      else {
        if (!r)
          if (((e = yo(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              xr(o, !0),
              o.tail === null && o.tailMode === 'hidden' && !i.alternate && !le)
            )
              return Re(t), null
          } else
            2 * ce() - o.renderingStartTime > sr &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), xr(o, !1), (t.lanes = 4194304))
        o.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((n = o.last),
            n !== null ? (n.sibling = i) : (t.child = i),
            (o.last = i))
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = ce()),
          (t.sibling = null),
          (n = ie.current),
          q(ie, r ? (n & 1) | 2 : n & 1),
          t)
        : (Re(t), null)
    case 22:
    case 23:
      return (
        cu(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ae & 1073741824 && (Re(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Re(t),
        null
      )
    case 24:
      return null
    case 25:
      return null
  }
  throw Error(L(156, t.tag))
}
function mm(e, t) {
  switch ((Wa(t), t.tag)) {
    case 1:
      return (
        je(t.type) && so(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      )
    case 3:
      return (
        ar(),
        te(Ie),
        te(_e),
        ba(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      )
    case 5:
      return qa(t), null
    case 13:
      if (
        (te(ie), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(L(340))
        or()
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      )
    case 19:
      return te(ie), null
    case 4:
      return ar(), null
    case 10:
      return Xa(t.type._context), null
    case 22:
    case 23:
      return cu(), null
    case 24:
      return null
    default:
      return null
  }
}
var Ol = !1,
  Le = !1,
  vm = typeof WeakSet == 'function' ? WeakSet : Set,
  z = null
function Gn(e, t) {
  var n = e.ref
  if (n !== null)
    if (typeof n == 'function')
      try {
        n(null)
      } catch (r) {
        se(e, t, r)
      }
    else n.current = null
}
function da(e, t, n) {
  try {
    n()
  } catch (r) {
    se(e, t, r)
  }
}
var $s = !1
function ym(e, t) {
  if (((Gi = oo), (e = gf()), Ba(e))) {
    if ('selectionStart' in e)
      var n = { start: e.selectionStart, end: e.selectionEnd }
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window
        var r = n.getSelection && n.getSelection()
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode
          var l = r.anchorOffset,
            o = r.focusNode
          r = r.focusOffset
          try {
            n.nodeType, o.nodeType
          } catch {
            n = null
            break e
          }
          var i = 0,
            a = -1,
            u = -1,
            s = 0,
            d = 0,
            y = e,
            m = null
          t: for (;;) {
            for (
              var g;
              y !== n || (l !== 0 && y.nodeType !== 3) || (a = i + l),
                y !== o || (r !== 0 && y.nodeType !== 3) || (u = i + r),
                y.nodeType === 3 && (i += y.nodeValue.length),
                (g = y.firstChild) !== null;

            )
              (m = y), (y = g)
            for (;;) {
              if (y === e) break t
              if (
                (m === n && ++s === l && (a = i),
                m === o && ++d === r && (u = i),
                (g = y.nextSibling) !== null)
              )
                break
              ;(y = m), (m = y.parentNode)
            }
            y = g
          }
          n = a === -1 || u === -1 ? null : { start: a, end: u }
        } else n = null
      }
    n = n || { start: 0, end: 0 }
  } else n = null
  for (Ji = { focusedElem: e, selectionRange: n }, oo = !1, z = t; z !== null; )
    if (((t = z), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (z = e)
    else
      for (; z !== null; ) {
        t = z
        try {
          var E = t.alternate
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break
              case 1:
                if (E !== null) {
                  var k = E.memoizedProps,
                    T = E.memoizedState,
                    f = t.stateNode,
                    c = f.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? k : it(t.type, k),
                      T,
                    )
                  f.__reactInternalSnapshotBeforeUpdate = c
                }
                break
              case 3:
                var p = t.stateNode.containerInfo
                p.nodeType === 1
                  ? (p.textContent = '')
                  : p.nodeType === 9 &&
                    p.documentElement &&
                    p.removeChild(p.documentElement)
                break
              case 5:
              case 6:
              case 4:
              case 17:
                break
              default:
                throw Error(L(163))
            }
        } catch (C) {
          se(t, t.return, C)
        }
        if (((e = t.sibling), e !== null)) {
          ;(e.return = t.return), (z = e)
          break
        }
        z = t.return
      }
  return (E = $s), ($s = !1), E
}
function $r(e, t, n) {
  var r = t.updateQueue
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next)
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy
        ;(l.destroy = void 0), o !== void 0 && da(t, n, o)
      }
      l = l.next
    } while (l !== r)
  }
}
function jo(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next)
    do {
      if ((n.tag & e) === e) {
        var r = n.create
        n.destroy = r()
      }
      n = n.next
    } while (n !== t)
  }
}
function pa(e) {
  var t = e.ref
  if (t !== null) {
    var n = e.stateNode
    switch (e.tag) {
      case 5:
        e = n
        break
      default:
        e = n
    }
    typeof t == 'function' ? t(e) : (t.current = e)
  }
}
function hd(e) {
  var t = e.alternate
  t !== null && ((e.alternate = null), hd(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[yt], delete t[qr], delete t[bi], delete t[bh], delete t[em])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null)
}
function md(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4
}
function As(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || md(e.return)) return null
      e = e.return
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e
      ;(e.child.return = e), (e = e.child)
    }
    if (!(e.flags & 2)) return e.stateNode
  }
}
function ha(e, t, n) {
  var r = e.tag
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = uo))
  else if (r !== 4 && ((e = e.child), e !== null))
    for (ha(e, t, n), e = e.sibling; e !== null; ) ha(e, t, n), (e = e.sibling)
}
function ma(e, t, n) {
  var r = e.tag
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e)
  else if (r !== 4 && ((e = e.child), e !== null))
    for (ma(e, t, n), e = e.sibling; e !== null; ) ma(e, t, n), (e = e.sibling)
}
var Ee = null,
  at = !1
function At(e, t, n) {
  for (n = n.child; n !== null; ) vd(e, t, n), (n = n.sibling)
}
function vd(e, t, n) {
  if (gt && typeof gt.onCommitFiberUnmount == 'function')
    try {
      gt.onCommitFiberUnmount(To, n)
    } catch {}
  switch (n.tag) {
    case 5:
      Le || Gn(n, t)
    case 6:
      var r = Ee,
        l = at
      ;(Ee = null),
        At(e, t, n),
        (Ee = r),
        (at = l),
        Ee !== null &&
          (at
            ? ((e = Ee),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Ee.removeChild(n.stateNode))
      break
    case 18:
      Ee !== null &&
        (at
          ? ((e = Ee),
            (n = n.stateNode),
            e.nodeType === 8
              ? pi(e.parentNode, n)
              : e.nodeType === 1 && pi(e, n),
            Yr(e))
          : pi(Ee, n.stateNode))
      break
    case 4:
      ;(r = Ee),
        (l = at),
        (Ee = n.stateNode.containerInfo),
        (at = !0),
        At(e, t, n),
        (Ee = r),
        (at = l)
      break
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Le &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next
        do {
          var o = l,
            i = o.destroy
          ;(o = o.tag),
            i !== void 0 && (o & 2 || o & 4) && da(n, t, i),
            (l = l.next)
        } while (l !== r)
      }
      At(e, t, n)
      break
    case 1:
      if (
        !Le &&
        (Gn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == 'function')
      )
        try {
          ;(r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount()
        } catch (a) {
          se(n, t, a)
        }
      At(e, t, n)
      break
    case 21:
      At(e, t, n)
      break
    case 22:
      n.mode & 1
        ? ((Le = (r = Le) || n.memoizedState !== null), At(e, t, n), (Le = r))
        : At(e, t, n)
      break
    default:
      At(e, t, n)
  }
}
function Hs(e) {
  var t = e.updateQueue
  if (t !== null) {
    e.updateQueue = null
    var n = e.stateNode
    n === null && (n = e.stateNode = new vm()),
      t.forEach(function (r) {
        var l = Rm.bind(null, e, r)
        n.has(r) || (n.add(r), r.then(l, l))
      })
  }
}
function ot(e, t) {
  var n = t.deletions
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r]
      try {
        var o = e,
          i = t,
          a = i
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              ;(Ee = a.stateNode), (at = !1)
              break e
            case 3:
              ;(Ee = a.stateNode.containerInfo), (at = !0)
              break e
            case 4:
              ;(Ee = a.stateNode.containerInfo), (at = !0)
              break e
          }
          a = a.return
        }
        if (Ee === null) throw Error(L(160))
        vd(o, i, l), (Ee = null), (at = !1)
        var u = l.alternate
        u !== null && (u.return = null), (l.return = null)
      } catch (s) {
        se(l, t, s)
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) yd(t, e), (t = t.sibling)
}
function yd(e, t) {
  var n = e.alternate,
    r = e.flags
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((ot(t, e), mt(e), r & 4)) {
        try {
          $r(3, e, e.return), jo(3, e)
        } catch (k) {
          se(e, e.return, k)
        }
        try {
          $r(5, e, e.return)
        } catch (k) {
          se(e, e.return, k)
        }
      }
      break
    case 1:
      ot(t, e), mt(e), r & 512 && n !== null && Gn(n, n.return)
      break
    case 5:
      if (
        (ot(t, e),
        mt(e),
        r & 512 && n !== null && Gn(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode
        try {
          Vr(l, '')
        } catch (k) {
          se(e, e.return, k)
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var o = e.memoizedProps,
          i = n !== null ? n.memoizedProps : o,
          a = e.type,
          u = e.updateQueue
        if (((e.updateQueue = null), u !== null))
          try {
            a === 'input' && o.type === 'radio' && o.name != null && Uc(l, o),
              $i(a, i)
            var s = $i(a, o)
            for (i = 0; i < u.length; i += 2) {
              var d = u[i],
                y = u[i + 1]
              d === 'style'
                ? Vc(l, y)
                : d === 'dangerouslySetInnerHTML'
                  ? Hc(l, y)
                  : d === 'children'
                    ? Vr(l, y)
                    : Ta(l, d, y, s)
            }
            switch (a) {
              case 'input':
                Oi(l, o)
                break
              case 'textarea':
                $c(l, o)
                break
              case 'select':
                var m = l._wrapperState.wasMultiple
                l._wrapperState.wasMultiple = !!o.multiple
                var g = o.value
                g != null
                  ? Zn(l, !!o.multiple, g, !1)
                  : m !== !!o.multiple &&
                    (o.defaultValue != null
                      ? Zn(l, !!o.multiple, o.defaultValue, !0)
                      : Zn(l, !!o.multiple, o.multiple ? [] : '', !1))
            }
            l[qr] = o
          } catch (k) {
            se(e, e.return, k)
          }
      }
      break
    case 6:
      if ((ot(t, e), mt(e), r & 4)) {
        if (e.stateNode === null) throw Error(L(162))
        ;(l = e.stateNode), (o = e.memoizedProps)
        try {
          l.nodeValue = o
        } catch (k) {
          se(e, e.return, k)
        }
      }
      break
    case 3:
      if (
        (ot(t, e), mt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Yr(t.containerInfo)
        } catch (k) {
          se(e, e.return, k)
        }
      break
    case 4:
      ot(t, e), mt(e)
      break
    case 13:
      ot(t, e),
        mt(e),
        (l = e.child),
        l.flags & 8192 &&
          ((o = l.memoizedState !== null),
          (l.stateNode.isHidden = o),
          !o ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (uu = ce())),
        r & 4 && Hs(e)
      break
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Le = (s = Le) || d), ot(t, e), (Le = s)) : ot(t, e),
        mt(e),
        r & 8192)
      ) {
        if (
          ((s = e.memoizedState !== null),
          (e.stateNode.isHidden = s) && !d && e.mode & 1)
        )
          for (z = e, d = e.child; d !== null; ) {
            for (y = z = d; z !== null; ) {
              switch (((m = z), (g = m.child), m.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  $r(4, m, m.return)
                  break
                case 1:
                  Gn(m, m.return)
                  var E = m.stateNode
                  if (typeof E.componentWillUnmount == 'function') {
                    ;(r = m), (n = m.return)
                    try {
                      ;(t = r),
                        (E.props = t.memoizedProps),
                        (E.state = t.memoizedState),
                        E.componentWillUnmount()
                    } catch (k) {
                      se(r, n, k)
                    }
                  }
                  break
                case 5:
                  Gn(m, m.return)
                  break
                case 22:
                  if (m.memoizedState !== null) {
                    Vs(y)
                    continue
                  }
              }
              g !== null ? ((g.return = m), (z = g)) : Vs(y)
            }
            d = d.sibling
          }
        e: for (d = null, y = e; ; ) {
          if (y.tag === 5) {
            if (d === null) {
              d = y
              try {
                ;(l = y.stateNode),
                  s
                    ? ((o = l.style),
                      typeof o.setProperty == 'function'
                        ? o.setProperty('display', 'none', 'important')
                        : (o.display = 'none'))
                    : ((a = y.stateNode),
                      (u = y.memoizedProps.style),
                      (i =
                        u != null && u.hasOwnProperty('display')
                          ? u.display
                          : null),
                      (a.style.display = Bc('display', i)))
              } catch (k) {
                se(e, e.return, k)
              }
            }
          } else if (y.tag === 6) {
            if (d === null)
              try {
                y.stateNode.nodeValue = s ? '' : y.memoizedProps
              } catch (k) {
                se(e, e.return, k)
              }
          } else if (
            ((y.tag !== 22 && y.tag !== 23) ||
              y.memoizedState === null ||
              y === e) &&
            y.child !== null
          ) {
            ;(y.child.return = y), (y = y.child)
            continue
          }
          if (y === e) break e
          for (; y.sibling === null; ) {
            if (y.return === null || y.return === e) break e
            d === y && (d = null), (y = y.return)
          }
          d === y && (d = null), (y.sibling.return = y.return), (y = y.sibling)
        }
      }
      break
    case 19:
      ot(t, e), mt(e), r & 4 && Hs(e)
      break
    case 21:
      break
    default:
      ot(t, e), mt(e)
  }
}
function mt(e) {
  var t = e.flags
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (md(n)) {
            var r = n
            break e
          }
          n = n.return
        }
        throw Error(L(160))
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode
          r.flags & 32 && (Vr(l, ''), (r.flags &= -33))
          var o = As(e)
          ma(e, o, l)
          break
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            a = As(e)
          ha(e, a, i)
          break
        default:
          throw Error(L(161))
      }
    } catch (u) {
      se(e, e.return, u)
    }
    e.flags &= -3
  }
  t & 4096 && (e.flags &= -4097)
}
function gm(e, t, n) {
  ;(z = e), gd(e)
}
function gd(e, t, n) {
  for (var r = (e.mode & 1) !== 0; z !== null; ) {
    var l = z,
      o = l.child
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Ol
      if (!i) {
        var a = l.alternate,
          u = (a !== null && a.memoizedState !== null) || Le
        a = Ol
        var s = Le
        if (((Ol = i), (Le = u) && !s))
          for (z = l; z !== null; )
            (i = z),
              (u = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? Ws(l)
                : u !== null
                  ? ((u.return = i), (z = u))
                  : Ws(l)
        for (; o !== null; ) (z = o), gd(o), (o = o.sibling)
        ;(z = l), (Ol = a), (Le = s)
      }
      Bs(e)
    } else
      l.subtreeFlags & 8772 && o !== null ? ((o.return = l), (z = o)) : Bs(e)
  }
}
function Bs(e) {
  for (; z !== null; ) {
    var t = z
    if (t.flags & 8772) {
      var n = t.alternate
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Le || jo(5, t)
              break
            case 1:
              var r = t.stateNode
              if (t.flags & 4 && !Le)
                if (n === null) r.componentDidMount()
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : it(t.type, n.memoizedProps)
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  )
                }
              var o = t.updateQueue
              o !== null && Rs(t, o, r)
              break
            case 3:
              var i = t.updateQueue
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode
                      break
                    case 1:
                      n = t.child.stateNode
                  }
                Rs(t, i, n)
              }
              break
            case 5:
              var a = t.stateNode
              if (n === null && t.flags & 4) {
                n = a
                var u = t.memoizedProps
                switch (t.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    u.autoFocus && n.focus()
                    break
                  case 'img':
                    u.src && (n.src = u.src)
                }
              }
              break
            case 6:
              break
            case 4:
              break
            case 12:
              break
            case 13:
              if (t.memoizedState === null) {
                var s = t.alternate
                if (s !== null) {
                  var d = s.memoizedState
                  if (d !== null) {
                    var y = d.dehydrated
                    y !== null && Yr(y)
                  }
                }
              }
              break
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break
            default:
              throw Error(L(163))
          }
        Le || (t.flags & 512 && pa(t))
      } catch (m) {
        se(t, t.return, m)
      }
    }
    if (t === e) {
      z = null
      break
    }
    if (((n = t.sibling), n !== null)) {
      ;(n.return = t.return), (z = n)
      break
    }
    z = t.return
  }
}
function Vs(e) {
  for (; z !== null; ) {
    var t = z
    if (t === e) {
      z = null
      break
    }
    var n = t.sibling
    if (n !== null) {
      ;(n.return = t.return), (z = n)
      break
    }
    z = t.return
  }
}
function Ws(e) {
  for (; z !== null; ) {
    var t = z
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return
          try {
            jo(4, t)
          } catch (u) {
            se(t, n, u)
          }
          break
        case 1:
          var r = t.stateNode
          if (typeof r.componentDidMount == 'function') {
            var l = t.return
            try {
              r.componentDidMount()
            } catch (u) {
              se(t, l, u)
            }
          }
          var o = t.return
          try {
            pa(t)
          } catch (u) {
            se(t, o, u)
          }
          break
        case 5:
          var i = t.return
          try {
            pa(t)
          } catch (u) {
            se(t, i, u)
          }
      }
    } catch (u) {
      se(t, t.return, u)
    }
    if (t === e) {
      z = null
      break
    }
    var a = t.sibling
    if (a !== null) {
      ;(a.return = t.return), (z = a)
      break
    }
    z = t.return
  }
}
var wm = Math.ceil,
  So = It.ReactCurrentDispatcher,
  iu = It.ReactCurrentOwner,
  et = It.ReactCurrentBatchConfig,
  Y = 0,
  we = null,
  de = null,
  ke = 0,
  Ae = 0,
  Jn = un(0),
  ye = 0,
  ll = null,
  Ln = 0,
  Uo = 0,
  au = 0,
  Ar = null,
  Oe = null,
  uu = 0,
  sr = 1 / 0,
  Lt = null,
  Eo = !1,
  va = null,
  en = null,
  Fl = !1,
  Xt = null,
  ko = 0,
  Hr = 0,
  ya = null,
  Xl = -1,
  Gl = 0
function De() {
  return Y & 6 ? ce() : Xl !== -1 ? Xl : (Xl = ce())
}
function tn(e) {
  return e.mode & 1
    ? Y & 2 && ke !== 0
      ? ke & -ke
      : nm.transition !== null
        ? (Gl === 0 && (Gl = tf()), Gl)
        : ((e = X),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : sf(e.type))),
          e)
    : 1
}
function ft(e, t, n, r) {
  if (50 < Hr) throw ((Hr = 0), (ya = null), Error(L(185)))
  al(e, n, r),
    (!(Y & 2) || e !== we) &&
      (e === we && (!(Y & 2) && (Uo |= n), ye === 4 && Qt(e, ke)),
      Ue(e, r),
      n === 1 && Y === 0 && !(t.mode & 1) && ((sr = ce() + 500), Oo && sn()))
}
function Ue(e, t) {
  var n = e.callbackNode
  nh(e, t)
  var r = lo(e, e === we ? ke : 0)
  if (r === 0)
    n !== null && bu(n), (e.callbackNode = null), (e.callbackPriority = 0)
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && bu(n), t === 1))
      e.tag === 0 ? tm(Qs.bind(null, e)) : _f(Qs.bind(null, e)),
        Zh(function () {
          !(Y & 6) && sn()
        }),
        (n = null)
    else {
      switch (nf(r)) {
        case 1:
          n = Oa
          break
        case 4:
          n = bc
          break
        case 16:
          n = ro
          break
        case 536870912:
          n = ef
          break
        default:
          n = ro
      }
      n = Rd(n, wd.bind(null, e))
    }
    ;(e.callbackPriority = t), (e.callbackNode = n)
  }
}
function wd(e, t) {
  if (((Xl = -1), (Gl = 0), Y & 6)) throw Error(L(327))
  var n = e.callbackNode
  if (nr() && e.callbackNode !== n) return null
  var r = lo(e, e === we ? ke : 0)
  if (r === 0) return null
  if (r & 30 || r & e.expiredLanes || t) t = xo(e, r)
  else {
    t = r
    var l = Y
    Y |= 2
    var o = Ed()
    ;(we !== e || ke !== t) && ((Lt = null), (sr = ce() + 500), kn(e, t))
    do
      try {
        km()
        break
      } catch (a) {
        Sd(e, a)
      }
    while (!0)
    Ya(),
      (So.current = o),
      (Y = l),
      de !== null ? (t = 0) : ((we = null), (ke = 0), (t = ye))
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = Wi(e)), l !== 0 && ((r = l), (t = ga(e, l)))), t === 1)
    )
      throw ((n = ll), kn(e, 0), Qt(e, r), Ue(e, ce()), n)
    if (t === 6) Qt(e, r)
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !Sm(l) &&
          ((t = xo(e, r)),
          t === 2 && ((o = Wi(e)), o !== 0 && ((r = o), (t = ga(e, o)))),
          t === 1))
      )
        throw ((n = ll), kn(e, 0), Qt(e, r), Ue(e, ce()), n)
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(L(345))
        case 2:
          vn(e, Oe, Lt)
          break
        case 3:
          if (
            (Qt(e, r), (r & 130023424) === r && ((t = uu + 500 - ce()), 10 < t))
          ) {
            if (lo(e, 0) !== 0) break
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              De(), (e.pingedLanes |= e.suspendedLanes & l)
              break
            }
            e.timeoutHandle = qi(vn.bind(null, e, Oe, Lt), t)
            break
          }
          vn(e, Oe, Lt)
          break
        case 4:
          if ((Qt(e, r), (r & 4194240) === r)) break
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - ct(r)
            ;(o = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~o)
          }
          if (
            ((r = l),
            (r = ce() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * wm(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = qi(vn.bind(null, e, Oe, Lt), r)
            break
          }
          vn(e, Oe, Lt)
          break
        case 5:
          vn(e, Oe, Lt)
          break
        default:
          throw Error(L(329))
      }
    }
  }
  return Ue(e, ce()), e.callbackNode === n ? wd.bind(null, e) : null
}
function ga(e, t) {
  var n = Ar
  return (
    e.current.memoizedState.isDehydrated && (kn(e, t).flags |= 256),
    (e = xo(e, t)),
    e !== 2 && ((t = Oe), (Oe = n), t !== null && wa(t)),
    e
  )
}
function wa(e) {
  Oe === null ? (Oe = e) : Oe.push.apply(Oe, e)
}
function Sm(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            o = l.getSnapshot
          l = l.value
          try {
            if (!dt(o(), l)) return !1
          } catch {
            return !1
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n)
    else {
      if (t === e) break
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0
        t = t.return
      }
      ;(t.sibling.return = t.return), (t = t.sibling)
    }
  }
  return !0
}
function Qt(e, t) {
  for (
    t &= ~au,
      t &= ~Uo,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - ct(t),
      r = 1 << n
    ;(e[n] = -1), (t &= ~r)
  }
}
function Qs(e) {
  if (Y & 6) throw Error(L(327))
  nr()
  var t = lo(e, 0)
  if (!(t & 1)) return Ue(e, ce()), null
  var n = xo(e, t)
  if (e.tag !== 0 && n === 2) {
    var r = Wi(e)
    r !== 0 && ((t = r), (n = ga(e, r)))
  }
  if (n === 1) throw ((n = ll), kn(e, 0), Qt(e, t), Ue(e, ce()), n)
  if (n === 6) throw Error(L(345))
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    vn(e, Oe, Lt),
    Ue(e, ce()),
    null
  )
}
function su(e, t) {
  var n = Y
  Y |= 1
  try {
    return e(t)
  } finally {
    ;(Y = n), Y === 0 && ((sr = ce() + 500), Oo && sn())
  }
}
function _n(e) {
  Xt !== null && Xt.tag === 0 && !(Y & 6) && nr()
  var t = Y
  Y |= 1
  var n = et.transition,
    r = X
  try {
    if (((et.transition = null), (X = 1), e)) return e()
  } finally {
    ;(X = r), (et.transition = n), (Y = t), !(Y & 6) && sn()
  }
}
function cu() {
  ;(Ae = Jn.current), te(Jn)
}
function kn(e, t) {
  ;(e.finishedWork = null), (e.finishedLanes = 0)
  var n = e.timeoutHandle
  if ((n !== -1 && ((e.timeoutHandle = -1), Jh(n)), de !== null))
    for (n = de.return; n !== null; ) {
      var r = n
      switch ((Wa(r), r.tag)) {
        case 1:
          ;(r = r.type.childContextTypes), r != null && so()
          break
        case 3:
          ar(), te(Ie), te(_e), ba()
          break
        case 5:
          qa(r)
          break
        case 4:
          ar()
          break
        case 13:
          te(ie)
          break
        case 19:
          te(ie)
          break
        case 10:
          Xa(r.type._context)
          break
        case 22:
        case 23:
          cu()
      }
      n = n.return
    }
  if (
    ((we = e),
    (de = e = nn(e.current, null)),
    (ke = Ae = t),
    (ye = 0),
    (ll = null),
    (au = Uo = Ln = 0),
    (Oe = Ar = null),
    wn !== null)
  ) {
    for (t = 0; t < wn.length; t++)
      if (((n = wn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null
        var l = r.next,
          o = n.pending
        if (o !== null) {
          var i = o.next
          ;(o.next = l), (r.next = i)
        }
        n.pending = r
      }
    wn = null
  }
  return e
}
function Sd(e, t) {
  do {
    var n = de
    try {
      if ((Ya(), (Ql.current = wo), go)) {
        for (var r = ae.memoizedState; r !== null; ) {
          var l = r.queue
          l !== null && (l.pending = null), (r = r.next)
        }
        go = !1
      }
      if (
        ((Rn = 0),
        (ge = ve = ae = null),
        (Ur = !1),
        (tl = 0),
        (iu.current = null),
        n === null || n.return === null)
      ) {
        ;(ye = 1), (ll = t), (de = null)
        break
      }
      e: {
        var o = e,
          i = n.return,
          a = n,
          u = t
        if (
          ((t = ke),
          (a.flags |= 32768),
          u !== null && typeof u == 'object' && typeof u.then == 'function')
        ) {
          var s = u,
            d = a,
            y = d.tag
          if (!(d.mode & 1) && (y === 0 || y === 11 || y === 15)) {
            var m = d.alternate
            m
              ? ((d.updateQueue = m.updateQueue),
                (d.memoizedState = m.memoizedState),
                (d.lanes = m.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null))
          }
          var g = Ms(i)
          if (g !== null) {
            ;(g.flags &= -257),
              zs(g, i, a, o, t),
              g.mode & 1 && Ds(o, s, t),
              (t = g),
              (u = s)
            var E = t.updateQueue
            if (E === null) {
              var k = new Set()
              k.add(u), (t.updateQueue = k)
            } else E.add(u)
            break e
          } else {
            if (!(t & 1)) {
              Ds(o, s, t), fu()
              break e
            }
            u = Error(L(426))
          }
        } else if (le && a.mode & 1) {
          var T = Ms(i)
          if (T !== null) {
            !(T.flags & 65536) && (T.flags |= 256),
              zs(T, i, a, o, t),
              Qa(ur(u, a))
            break e
          }
        }
        ;(o = u = ur(u, a)),
          ye !== 4 && (ye = 2),
          Ar === null ? (Ar = [o]) : Ar.push(o),
          (o = i)
        do {
          switch (o.tag) {
            case 3:
              ;(o.flags |= 65536), (t &= -t), (o.lanes |= t)
              var f = rd(o, u, t)
              Ps(o, f)
              break e
            case 1:
              a = u
              var c = o.type,
                p = o.stateNode
              if (
                !(o.flags & 128) &&
                (typeof c.getDerivedStateFromError == 'function' ||
                  (p !== null &&
                    typeof p.componentDidCatch == 'function' &&
                    (en === null || !en.has(p))))
              ) {
                ;(o.flags |= 65536), (t &= -t), (o.lanes |= t)
                var C = ld(o, a, t)
                Ps(o, C)
                break e
              }
          }
          o = o.return
        } while (o !== null)
      }
      xd(n)
    } catch (h) {
      ;(t = h), de === n && n !== null && (de = n = n.return)
      continue
    }
    break
  } while (!0)
}
function Ed() {
  var e = So.current
  return (So.current = wo), e === null ? wo : e
}
function fu() {
  ;(ye === 0 || ye === 3 || ye === 2) && (ye = 4),
    we === null || (!(Ln & 268435455) && !(Uo & 268435455)) || Qt(we, ke)
}
function xo(e, t) {
  var n = Y
  Y |= 2
  var r = Ed()
  ;(we !== e || ke !== t) && ((Lt = null), kn(e, t))
  do
    try {
      Em()
      break
    } catch (l) {
      Sd(e, l)
    }
  while (!0)
  if ((Ya(), (Y = n), (So.current = r), de !== null)) throw Error(L(261))
  return (we = null), (ke = 0), ye
}
function Em() {
  for (; de !== null; ) kd(de)
}
function km() {
  for (; de !== null && !Yp(); ) kd(de)
}
function kd(e) {
  var t = Pd(e.alternate, e, Ae)
  ;(e.memoizedProps = e.pendingProps),
    t === null ? xd(e) : (de = t),
    (iu.current = null)
}
function xd(e) {
  var t = e
  do {
    var n = t.alternate
    if (((e = t.return), t.flags & 32768)) {
      if (((n = mm(n, t)), n !== null)) {
        ;(n.flags &= 32767), (de = n)
        return
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null)
      else {
        ;(ye = 6), (de = null)
        return
      }
    } else if (((n = hm(n, t, Ae)), n !== null)) {
      de = n
      return
    }
    if (((t = t.sibling), t !== null)) {
      de = t
      return
    }
    de = t = e
  } while (t !== null)
  ye === 0 && (ye = 5)
}
function vn(e, t, n) {
  var r = X,
    l = et.transition
  try {
    ;(et.transition = null), (X = 1), xm(e, t, n, r)
  } finally {
    ;(et.transition = l), (X = r)
  }
  return null
}
function xm(e, t, n, r) {
  do nr()
  while (Xt !== null)
  if (Y & 6) throw Error(L(327))
  n = e.finishedWork
  var l = e.finishedLanes
  if (n === null) return null
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(L(177))
  ;(e.callbackNode = null), (e.callbackPriority = 0)
  var o = n.lanes | n.childLanes
  if (
    (rh(e, o),
    e === we && ((de = we = null), (ke = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Fl ||
      ((Fl = !0),
      Rd(ro, function () {
        return nr(), null
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    ;(o = et.transition), (et.transition = null)
    var i = X
    X = 1
    var a = Y
    ;(Y |= 4),
      (iu.current = null),
      ym(e, n),
      yd(n, e),
      Vh(Ji),
      (oo = !!Gi),
      (Ji = Gi = null),
      (e.current = n),
      gm(n),
      Xp(),
      (Y = a),
      (X = i),
      (et.transition = o)
  } else e.current = n
  if (
    (Fl && ((Fl = !1), (Xt = e), (ko = l)),
    (o = e.pendingLanes),
    o === 0 && (en = null),
    Zp(n.stateNode),
    Ue(e, ce()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest })
  if (Eo) throw ((Eo = !1), (e = va), (va = null), e)
  return (
    ko & 1 && e.tag !== 0 && nr(),
    (o = e.pendingLanes),
    o & 1 ? (e === ya ? Hr++ : ((Hr = 0), (ya = e))) : (Hr = 0),
    sn(),
    null
  )
}
function nr() {
  if (Xt !== null) {
    var e = nf(ko),
      t = et.transition,
      n = X
    try {
      if (((et.transition = null), (X = 16 > e ? 16 : e), Xt === null))
        var r = !1
      else {
        if (((e = Xt), (Xt = null), (ko = 0), Y & 6)) throw Error(L(331))
        var l = Y
        for (Y |= 4, z = e.current; z !== null; ) {
          var o = z,
            i = o.child
          if (z.flags & 16) {
            var a = o.deletions
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var s = a[u]
                for (z = s; z !== null; ) {
                  var d = z
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      $r(8, d, o)
                  }
                  var y = d.child
                  if (y !== null) (y.return = d), (z = y)
                  else
                    for (; z !== null; ) {
                      d = z
                      var m = d.sibling,
                        g = d.return
                      if ((hd(d), d === s)) {
                        z = null
                        break
                      }
                      if (m !== null) {
                        ;(m.return = g), (z = m)
                        break
                      }
                      z = g
                    }
                }
              }
              var E = o.alternate
              if (E !== null) {
                var k = E.child
                if (k !== null) {
                  E.child = null
                  do {
                    var T = k.sibling
                    ;(k.sibling = null), (k = T)
                  } while (k !== null)
                }
              }
              z = o
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) (i.return = o), (z = i)
          else
            e: for (; z !== null; ) {
              if (((o = z), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    $r(9, o, o.return)
                }
              var f = o.sibling
              if (f !== null) {
                ;(f.return = o.return), (z = f)
                break e
              }
              z = o.return
            }
        }
        var c = e.current
        for (z = c; z !== null; ) {
          i = z
          var p = i.child
          if (i.subtreeFlags & 2064 && p !== null) (p.return = i), (z = p)
          else
            e: for (i = c; z !== null; ) {
              if (((a = z), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      jo(9, a)
                  }
                } catch (h) {
                  se(a, a.return, h)
                }
              if (a === i) {
                z = null
                break e
              }
              var C = a.sibling
              if (C !== null) {
                ;(C.return = a.return), (z = C)
                break e
              }
              z = a.return
            }
        }
        if (
          ((Y = l), sn(), gt && typeof gt.onPostCommitFiberRoot == 'function')
        )
          try {
            gt.onPostCommitFiberRoot(To, e)
          } catch {}
        r = !0
      }
      return r
    } finally {
      ;(X = n), (et.transition = t)
    }
  }
  return !1
}
function Ks(e, t, n) {
  ;(t = ur(n, t)),
    (t = rd(e, t, 1)),
    (e = bt(e, t, 1)),
    (t = De()),
    e !== null && (al(e, 1, t), Ue(e, t))
}
function se(e, t, n) {
  if (e.tag === 3) Ks(e, e, n)
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Ks(t, e, n)
        break
      } else if (t.tag === 1) {
        var r = t.stateNode
        if (
          typeof t.type.getDerivedStateFromError == 'function' ||
          (typeof r.componentDidCatch == 'function' &&
            (en === null || !en.has(r)))
        ) {
          ;(e = ur(n, e)),
            (e = ld(t, e, 1)),
            (t = bt(t, e, 1)),
            (e = De()),
            t !== null && (al(t, 1, e), Ue(t, e))
          break
        }
      }
      t = t.return
    }
}
function Cm(e, t, n) {
  var r = e.pingCache
  r !== null && r.delete(t),
    (t = De()),
    (e.pingedLanes |= e.suspendedLanes & n),
    we === e &&
      (ke & n) === n &&
      (ye === 4 || (ye === 3 && (ke & 130023424) === ke && 500 > ce() - uu)
        ? kn(e, 0)
        : (au |= n)),
    Ue(e, t)
}
function Cd(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Pl), (Pl <<= 1), !(Pl & 130023424) && (Pl = 4194304))
      : (t = 1))
  var n = De()
  ;(e = Ot(e, t)), e !== null && (al(e, t, n), Ue(e, n))
}
function Pm(e) {
  var t = e.memoizedState,
    n = 0
  t !== null && (n = t.retryLane), Cd(e, n)
}
function Rm(e, t) {
  var n = 0
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState
      l !== null && (n = l.retryLane)
      break
    case 19:
      r = e.stateNode
      break
    default:
      throw Error(L(314))
  }
  r !== null && r.delete(t), Cd(e, n)
}
var Pd
Pd = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Ie.current) Fe = !0
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Fe = !1), pm(e, t, n)
      Fe = !!(e.flags & 131072)
    }
  else (Fe = !1), le && t.flags & 1048576 && Tf(t, po, t.index)
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type
      Yl(e, t), (e = t.pendingProps)
      var l = lr(t, _e.current)
      tr(t, n), (l = tu(null, t, r, e, l, n))
      var o = nu()
      return (
        (t.flags |= 1),
        typeof l == 'object' &&
        l !== null &&
        typeof l.render == 'function' &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            je(r) ? ((o = !0), co(t)) : (o = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            Ja(t),
            (l.updater = Io),
            (t.stateNode = l),
            (l._reactInternals = t),
            oa(t, r, e, n),
            (t = ua(null, t, r, !0, o, n)))
          : ((t.tag = 0), le && o && Va(t), Ne(null, t, l, n), (t = t.child)),
        t
      )
    case 16:
      r = t.elementType
      e: {
        switch (
          (Yl(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = _m(r)),
          (e = it(r, e)),
          l)
        ) {
          case 0:
            t = aa(null, t, r, e, n)
            break e
          case 1:
            t = Is(null, t, r, e, n)
            break e
          case 11:
            t = Os(null, t, r, e, n)
            break e
          case 14:
            t = Fs(null, t, r, it(r.type, e), n)
            break e
        }
        throw Error(L(306, r, ''))
      }
      return t
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : it(r, l)),
        aa(e, t, r, l, n)
      )
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : it(r, l)),
        Is(e, t, r, l, n)
      )
    case 3:
      e: {
        if ((ud(t), e === null)) throw Error(L(387))
        ;(r = t.pendingProps),
          (o = t.memoizedState),
          (l = o.element),
          Ff(e, t),
          vo(t, r, null, n)
        var i = t.memoizedState
        if (((r = i.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            ;(l = ur(Error(L(423)), t)), (t = js(e, t, r, n, l))
            break e
          } else if (r !== l) {
            ;(l = ur(Error(L(424)), t)), (t = js(e, t, r, n, l))
            break e
          } else
            for (
              Be = qt(t.stateNode.containerInfo.firstChild),
                Ve = t,
                le = !0,
                st = null,
                n = zf(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling)
        else {
          if ((or(), r === l)) {
            t = Ft(e, t, n)
            break e
          }
          Ne(e, t, r, n)
        }
        t = t.child
      }
      return t
    case 5:
      return (
        If(t),
        e === null && na(t),
        (r = t.type),
        (l = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (i = l.children),
        Zi(r, l) ? (i = null) : o !== null && Zi(r, o) && (t.flags |= 32),
        ad(e, t),
        Ne(e, t, i, n),
        t.child
      )
    case 6:
      return e === null && na(t), null
    case 13:
      return sd(e, t, n)
    case 4:
      return (
        Za(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = ir(t, null, r, n)) : Ne(e, t, r, n),
        t.child
      )
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : it(r, l)),
        Os(e, t, r, l, n)
      )
    case 7:
      return Ne(e, t, t.pendingProps, n), t.child
    case 8:
      return Ne(e, t, t.pendingProps.children, n), t.child
    case 12:
      return Ne(e, t, t.pendingProps.children, n), t.child
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (o = t.memoizedProps),
          (i = l.value),
          q(ho, r._currentValue),
          (r._currentValue = i),
          o !== null)
        )
          if (dt(o.value, i)) {
            if (o.children === l.children && !Ie.current) {
              t = Ft(e, t, n)
              break e
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var a = o.dependencies
              if (a !== null) {
                i = o.child
                for (var u = a.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (o.tag === 1) {
                      ;(u = Dt(-1, n & -n)), (u.tag = 2)
                      var s = o.updateQueue
                      if (s !== null) {
                        s = s.shared
                        var d = s.pending
                        d === null
                          ? (u.next = u)
                          : ((u.next = d.next), (d.next = u)),
                          (s.pending = u)
                      }
                    }
                    ;(o.lanes |= n),
                      (u = o.alternate),
                      u !== null && (u.lanes |= n),
                      ra(o.return, n, t),
                      (a.lanes |= n)
                    break
                  }
                  u = u.next
                }
              } else if (o.tag === 10) i = o.type === t.type ? null : o.child
              else if (o.tag === 18) {
                if (((i = o.return), i === null)) throw Error(L(341))
                ;(i.lanes |= n),
                  (a = i.alternate),
                  a !== null && (a.lanes |= n),
                  ra(i, n, t),
                  (i = o.sibling)
              } else i = o.child
              if (i !== null) i.return = o
              else
                for (i = o; i !== null; ) {
                  if (i === t) {
                    i = null
                    break
                  }
                  if (((o = i.sibling), o !== null)) {
                    ;(o.return = i.return), (i = o)
                    break
                  }
                  i = i.return
                }
              o = i
            }
        Ne(e, t, l.children, n), (t = t.child)
      }
      return t
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        tr(t, n),
        (l = tt(l)),
        (r = r(l)),
        (t.flags |= 1),
        Ne(e, t, r, n),
        t.child
      )
    case 14:
      return (
        (r = t.type),
        (l = it(r, t.pendingProps)),
        (l = it(r.type, l)),
        Fs(e, t, r, l, n)
      )
    case 15:
      return od(e, t, t.type, t.pendingProps, n)
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : it(r, l)),
        Yl(e, t),
        (t.tag = 1),
        je(r) ? ((e = !0), co(t)) : (e = !1),
        tr(t, n),
        nd(t, r, l),
        oa(t, r, l, n),
        ua(null, t, r, !0, e, n)
      )
    case 19:
      return cd(e, t, n)
    case 22:
      return id(e, t, n)
  }
  throw Error(L(156, t.tag))
}
function Rd(e, t) {
  return qc(e, t)
}
function Lm(e, t, n, r) {
  ;(this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null)
}
function be(e, t, n, r) {
  return new Lm(e, t, n, r)
}
function du(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent)
}
function _m(e) {
  if (typeof e == 'function') return du(e) ? 1 : 0
  if (e != null) {
    if (((e = e.$$typeof), e === Da)) return 11
    if (e === Ma) return 14
  }
  return 2
}
function nn(e, t) {
  var n = e.alternate
  return (
    n === null
      ? ((n = be(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  )
}
function Jl(e, t, n, r, l, o) {
  var i = 2
  if (((r = e), typeof e == 'function')) du(e) && (i = 1)
  else if (typeof e == 'string') i = 5
  else
    e: switch (e) {
      case An:
        return xn(n.children, l, o, t)
      case Na:
        ;(i = 8), (l |= 8)
        break
      case Ti:
        return (e = be(12, n, t, l | 2)), (e.elementType = Ti), (e.lanes = o), e
      case Ni:
        return (e = be(13, n, t, l)), (e.elementType = Ni), (e.lanes = o), e
      case Di:
        return (e = be(19, n, t, l)), (e.elementType = Di), (e.lanes = o), e
      case Fc:
        return $o(n, l, o, t)
      default:
        if (typeof e == 'object' && e !== null)
          switch (e.$$typeof) {
            case zc:
              i = 10
              break e
            case Oc:
              i = 9
              break e
            case Da:
              i = 11
              break e
            case Ma:
              i = 14
              break e
            case Bt:
              ;(i = 16), (r = null)
              break e
          }
        throw Error(L(130, e == null ? e : typeof e, ''))
    }
  return (
    (t = be(i, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  )
}
function xn(e, t, n, r) {
  return (e = be(7, e, r, t)), (e.lanes = n), e
}
function $o(e, t, n, r) {
  return (
    (e = be(22, e, r, t)),
    (e.elementType = Fc),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  )
}
function Ei(e, t, n) {
  return (e = be(6, e, null, t)), (e.lanes = n), e
}
function ki(e, t, n) {
  return (
    (t = be(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  )
}
function Tm(e, t, n, r, l) {
  ;(this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = ni(0)),
    (this.expirationTimes = ni(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = ni(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null)
}
function pu(e, t, n, r, l, o, i, a, u) {
  return (
    (e = new Tm(e, t, n, a, u)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = be(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Ja(o),
    e
  )
}
function Nm(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null
  return {
    $$typeof: $n,
    key: r == null ? null : '' + r,
    children: e,
    containerInfo: t,
    implementation: n,
  }
}
function Ld(e) {
  if (!e) return ln
  e = e._reactInternals
  e: {
    if (Nn(e) !== e || e.tag !== 1) throw Error(L(170))
    var t = e
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context
          break e
        case 1:
          if (je(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext
            break e
          }
      }
      t = t.return
    } while (t !== null)
    throw Error(L(171))
  }
  if (e.tag === 1) {
    var n = e.type
    if (je(n)) return Lf(e, n, t)
  }
  return t
}
function _d(e, t, n, r, l, o, i, a, u) {
  return (
    (e = pu(n, r, !0, e, l, o, i, a, u)),
    (e.context = Ld(null)),
    (n = e.current),
    (r = De()),
    (l = tn(n)),
    (o = Dt(r, l)),
    (o.callback = t ?? null),
    bt(n, o, l),
    (e.current.lanes = l),
    al(e, l, r),
    Ue(e, r),
    e
  )
}
function Ao(e, t, n, r) {
  var l = t.current,
    o = De(),
    i = tn(l)
  return (
    (n = Ld(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Dt(o, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = bt(l, t, i)),
    e !== null && (ft(e, l, i, o), Wl(e, l, i)),
    i
  )
}
function Co(e) {
  if (((e = e.current), !e.child)) return null
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode
    default:
      return e.child.stateNode
  }
}
function Ys(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane
    e.retryLane = n !== 0 && n < t ? n : t
  }
}
function hu(e, t) {
  Ys(e, t), (e = e.alternate) && Ys(e, t)
}
function Dm() {
  return null
}
var Td =
  typeof reportError == 'function'
    ? reportError
    : function (e) {
        console.error(e)
      }
function mu(e) {
  this._internalRoot = e
}
Ho.prototype.render = mu.prototype.render = function (e) {
  var t = this._internalRoot
  if (t === null) throw Error(L(409))
  Ao(e, t, null, null)
}
Ho.prototype.unmount = mu.prototype.unmount = function () {
  var e = this._internalRoot
  if (e !== null) {
    this._internalRoot = null
    var t = e.containerInfo
    _n(function () {
      Ao(null, e, null, null)
    }),
      (t[zt] = null)
  }
}
function Ho(e) {
  this._internalRoot = e
}
Ho.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = of()
    e = { blockedOn: null, target: e, priority: t }
    for (var n = 0; n < Wt.length && t !== 0 && t < Wt[n].priority; n++);
    Wt.splice(n, 0, e), n === 0 && uf(e)
  }
}
function vu(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11))
}
function Bo(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
  )
}
function Xs() {}
function Mm(e, t, n, r, l) {
  if (l) {
    if (typeof r == 'function') {
      var o = r
      r = function () {
        var s = Co(i)
        o.call(s)
      }
    }
    var i = _d(t, r, e, 0, null, !1, !1, '', Xs)
    return (
      (e._reactRootContainer = i),
      (e[zt] = i.current),
      Jr(e.nodeType === 8 ? e.parentNode : e),
      _n(),
      i
    )
  }
  for (; (l = e.lastChild); ) e.removeChild(l)
  if (typeof r == 'function') {
    var a = r
    r = function () {
      var s = Co(u)
      a.call(s)
    }
  }
  var u = pu(e, 0, !1, null, null, !1, !1, '', Xs)
  return (
    (e._reactRootContainer = u),
    (e[zt] = u.current),
    Jr(e.nodeType === 8 ? e.parentNode : e),
    _n(function () {
      Ao(t, u, n, r)
    }),
    u
  )
}
function Vo(e, t, n, r, l) {
  var o = n._reactRootContainer
  if (o) {
    var i = o
    if (typeof l == 'function') {
      var a = l
      l = function () {
        var u = Co(i)
        a.call(u)
      }
    }
    Ao(t, i, e, l)
  } else i = Mm(n, t, e, l, r)
  return Co(i)
}
rf = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode
      if (t.current.memoizedState.isDehydrated) {
        var n = Nr(t.pendingLanes)
        n !== 0 &&
          (Fa(t, n | 1), Ue(t, ce()), !(Y & 6) && ((sr = ce() + 500), sn()))
      }
      break
    case 13:
      _n(function () {
        var r = Ot(e, 1)
        if (r !== null) {
          var l = De()
          ft(r, e, 1, l)
        }
      }),
        hu(e, 1)
  }
}
Ia = function (e) {
  if (e.tag === 13) {
    var t = Ot(e, 134217728)
    if (t !== null) {
      var n = De()
      ft(t, e, 134217728, n)
    }
    hu(e, 134217728)
  }
}
lf = function (e) {
  if (e.tag === 13) {
    var t = tn(e),
      n = Ot(e, t)
    if (n !== null) {
      var r = De()
      ft(n, e, t, r)
    }
    hu(e, t)
  }
}
of = function () {
  return X
}
af = function (e, t) {
  var n = X
  try {
    return (X = e), t()
  } finally {
    X = n
  }
}
Hi = function (e, t, n) {
  switch (t) {
    case 'input':
      if ((Oi(e, n), (t = n.name), n.type === 'radio' && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode
        for (
          n = n.querySelectorAll(
            'input[name=' + JSON.stringify('' + t) + '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t]
          if (r !== e && r.form === e.form) {
            var l = zo(r)
            if (!l) throw Error(L(90))
            jc(r), Oi(r, l)
          }
        }
      }
      break
    case 'textarea':
      $c(e, n)
      break
    case 'select':
      ;(t = n.value), t != null && Zn(e, !!n.multiple, t, !1)
  }
}
Kc = su
Yc = _n
var zm = { usingClientEntryPoint: !1, Events: [sl, Wn, zo, Wc, Qc, su] },
  Cr = {
    findFiberByHostInstance: gn,
    bundleType: 0,
    version: '18.3.1',
    rendererPackageName: 'react-dom',
  },
  Om = {
    bundleType: Cr.bundleType,
    version: Cr.version,
    rendererPackageName: Cr.rendererPackageName,
    rendererConfig: Cr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: It.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Jc(e)), e === null ? null : e.stateNode
    },
    findFiberByHostInstance: Cr.findFiberByHostInstance || Dm,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
  }
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
  var Il = __REACT_DEVTOOLS_GLOBAL_HOOK__
  if (!Il.isDisabled && Il.supportsFiber)
    try {
      ;(To = Il.inject(Om)), (gt = Il)
    } catch {}
}
Qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = zm
Qe.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null
  if (!vu(t)) throw Error(L(200))
  return Nm(e, t, null, n)
}
Qe.createRoot = function (e, t) {
  if (!vu(e)) throw Error(L(299))
  var n = !1,
    r = '',
    l = Td
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = pu(e, 1, !1, null, null, n, !1, r, l)),
    (e[zt] = t.current),
    Jr(e.nodeType === 8 ? e.parentNode : e),
    new mu(t)
  )
}
Qe.findDOMNode = function (e) {
  if (e == null) return null
  if (e.nodeType === 1) return e
  var t = e._reactInternals
  if (t === void 0)
    throw typeof e.render == 'function'
      ? Error(L(188))
      : ((e = Object.keys(e).join(',')), Error(L(268, e)))
  return (e = Jc(t)), (e = e === null ? null : e.stateNode), e
}
Qe.flushSync = function (e) {
  return _n(e)
}
Qe.hydrate = function (e, t, n) {
  if (!Bo(t)) throw Error(L(200))
  return Vo(null, e, t, !0, n)
}
Qe.hydrateRoot = function (e, t, n) {
  if (!vu(e)) throw Error(L(405))
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    o = '',
    i = Td
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = _d(t, null, e, 1, n ?? null, l, !1, o, i)),
    (e[zt] = t.current),
    Jr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l)
  return new Ho(t)
}
Qe.render = function (e, t, n) {
  if (!Bo(t)) throw Error(L(200))
  return Vo(null, e, t, !1, n)
}
Qe.unmountComponentAtNode = function (e) {
  if (!Bo(e)) throw Error(L(40))
  return e._reactRootContainer
    ? (_n(function () {
        Vo(null, null, e, !1, function () {
          ;(e._reactRootContainer = null), (e[zt] = null)
        })
      }),
      !0)
    : !1
}
Qe.unstable_batchedUpdates = su
Qe.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Bo(n)) throw Error(L(200))
  if (e == null || e._reactInternals === void 0) throw Error(L(38))
  return Vo(e, t, n, !1, r)
}
Qe.version = '18.3.1-next-f1338f8080-20240426'
function Nd() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Nd)
    } catch (e) {
      console.error(e)
    }
}
Nd(), (Tc.exports = Qe)
var Dd = Tc.exports,
  Gs = Dd
;(Li.createRoot = Gs.createRoot), (Li.hydrateRoot = Gs.hydrateRoot)
/**
 * @file ErrorPage.tsx - ./frontend/src/components
 * @description The `ErrorPage` component provides a user-friendly interface for displaying error messages when an unexpected issue occurs in the application. It serves as a fallback UI for cases such as 404 errors or other unforeseen errors, guiding users with a clear message about the problem.
 * @author matthewb
 * @date Created: 2024-10-01 | Last Modified: 2024-10-01
 * @version 1.0.0
 * @license MIT
 * @usage Use this component as a fallback error page in your React Router configuration or when catching errors in your application. Example usage:
 *        `<Route path="*" element={<ErrorPage />} />`
 * @dependencies React for creating functional components.
 * @relatedFiles This component may be related to other error handling components, such as `NotFound.tsx` or global error handlers.
 */ const Fm = () =>
    pe.jsxs('div', {
      className: 'h-screen flex flex-col flex-grow justify-center items-center',
      children: [
        pe.jsx('div', {
          className: 'p-8 text-3xl font-bold text-black',
          children: 'Oops!',
        }),
        pe.jsx('div', {
          className: 'p-4 text-black',
          children: 'Sorry, an unexpected error has occurred.',
        }),
        pe.jsx('div', {
          className: 'p-4 italic text-gray-400',
          children: 'Not Found',
        }),
      ],
    }),
  Im = () =>
    pe.jsx('div', {
      className: 'bg-gray-50 flex flex-grow items-center justify-center',
    })
var yu = {}
Object.defineProperty(yu, '__esModule', { value: !0 })
yu.parse = Vm
yu.serialize = Wm
const jm = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
  Um = /^[\u0021-\u003A\u003C-\u007E]*$/,
  $m =
    /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
  Am = /^[\u0020-\u003A\u003D-\u007E]*$/,
  Hm = Object.prototype.toString,
  Bm = (() => {
    const e = function () {}
    return (e.prototype = Object.create(null)), e
  })()
function Vm(e, t) {
  const n = new Bm(),
    r = e.length
  if (r < 2) return n
  const l = (t == null ? void 0 : t.decode) || Qm
  let o = 0
  do {
    const i = e.indexOf('=', o)
    if (i === -1) break
    const a = e.indexOf(';', o),
      u = a === -1 ? r : a
    if (i > u) {
      o = e.lastIndexOf(';', i - 1) + 1
      continue
    }
    const s = Js(e, o, i),
      d = Zs(e, i, s),
      y = e.slice(s, d)
    if (n[y] === void 0) {
      let m = Js(e, i + 1, u),
        g = Zs(e, u, m)
      const E = l(e.slice(m, g))
      n[y] = E
    }
    o = u + 1
  } while (o < r)
  return n
}
function Js(e, t, n) {
  do {
    const r = e.charCodeAt(t)
    if (r !== 32 && r !== 9) return t
  } while (++t < n)
  return n
}
function Zs(e, t, n) {
  for (; t > n; ) {
    const r = e.charCodeAt(--t)
    if (r !== 32 && r !== 9) return t + 1
  }
  return n
}
function Wm(e, t, n) {
  const r = (n == null ? void 0 : n.encode) || encodeURIComponent
  if (!jm.test(e)) throw new TypeError(`argument name is invalid: ${e}`)
  const l = r(t)
  if (!Um.test(l)) throw new TypeError(`argument val is invalid: ${t}`)
  let o = e + '=' + l
  if (!n) return o
  if (n.maxAge !== void 0) {
    if (!Number.isInteger(n.maxAge))
      throw new TypeError(`option maxAge is invalid: ${n.maxAge}`)
    o += '; Max-Age=' + n.maxAge
  }
  if (n.domain) {
    if (!$m.test(n.domain))
      throw new TypeError(`option domain is invalid: ${n.domain}`)
    o += '; Domain=' + n.domain
  }
  if (n.path) {
    if (!Am.test(n.path))
      throw new TypeError(`option path is invalid: ${n.path}`)
    o += '; Path=' + n.path
  }
  if (n.expires) {
    if (!Km(n.expires) || !Number.isFinite(n.expires.valueOf()))
      throw new TypeError(`option expires is invalid: ${n.expires}`)
    o += '; Expires=' + n.expires.toUTCString()
  }
  if (
    (n.httpOnly && (o += '; HttpOnly'),
    n.secure && (o += '; Secure'),
    n.partitioned && (o += '; Partitioned'),
    n.priority)
  )
    switch (typeof n.priority == 'string' ? n.priority.toLowerCase() : void 0) {
      case 'low':
        o += '; Priority=Low'
        break
      case 'medium':
        o += '; Priority=Medium'
        break
      case 'high':
        o += '; Priority=High'
        break
      default:
        throw new TypeError(`option priority is invalid: ${n.priority}`)
    }
  if (n.sameSite)
    switch (
      typeof n.sameSite == 'string' ? n.sameSite.toLowerCase() : n.sameSite
    ) {
      case !0:
      case 'strict':
        o += '; SameSite=Strict'
        break
      case 'lax':
        o += '; SameSite=Lax'
        break
      case 'none':
        o += '; SameSite=None'
        break
      default:
        throw new TypeError(`option sameSite is invalid: ${n.sameSite}`)
    }
  return o
}
function Qm(e) {
  if (e.indexOf('%') === -1) return e
  try {
    return decodeURIComponent(e)
  } catch {
    return e
  }
}
function Km(e) {
  return Hm.call(e) === '[object Date]'
}
/**
 * react-router v7.0.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var qs = 'popstate'
function Ym(e = {}) {
  function t(r, l) {
    let { pathname: o, search: i, hash: a } = r.location
    return ol(
      '',
      { pathname: o, search: i, hash: a },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || 'default',
    )
  }
  function n(r, l) {
    return typeof l == 'string' ? l : on(l)
  }
  return Gm(t, n, null, e)
}
function K(e, t) {
  if (e === !1 || e === null || typeof e > 'u') throw new Error(t)
}
function rt(e, t) {
  if (!e) {
    typeof console < 'u' && console.warn(t)
    try {
      throw new Error(t)
    } catch {}
  }
}
function Xm() {
  return Math.random().toString(36).substring(2, 10)
}
function bs(e, t) {
  return { usr: e.state, key: e.key, idx: t }
}
function ol(e, t, n = null, r) {
  return {
    pathname: typeof e == 'string' ? e : e.pathname,
    search: '',
    hash: '',
    ...(typeof t == 'string' ? cn(t) : t),
    state: n,
    key: (t && t.key) || r || Xm(),
  }
}
function on({ pathname: e = '/', search: t = '', hash: n = '' }) {
  return (
    t && t !== '?' && (e += t.charAt(0) === '?' ? t : '?' + t),
    n && n !== '#' && (e += n.charAt(0) === '#' ? n : '#' + n),
    e
  )
}
function cn(e) {
  let t = {}
  if (e) {
    let n = e.indexOf('#')
    n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)))
    let r = e.indexOf('?')
    r >= 0 && ((t.search = e.substring(r)), (e = e.substring(0, r))),
      e && (t.pathname = e)
  }
  return t
}
function Gm(e, t, n, r = {}) {
  let { window: l = document.defaultView, v5Compat: o = !1 } = r,
    i = l.history,
    a = 'POP',
    u = null,
    s = d()
  s == null && ((s = 0), i.replaceState({ ...i.state, idx: s }, ''))
  function d() {
    return (i.state || { idx: null }).idx
  }
  function y() {
    a = 'POP'
    let T = d(),
      f = T == null ? null : T - s
    ;(s = T), u && u({ action: a, location: k.location, delta: f })
  }
  function m(T, f) {
    a = 'PUSH'
    let c = ol(k.location, T, f)
    s = d() + 1
    let p = bs(c, s),
      C = k.createHref(c)
    try {
      i.pushState(p, '', C)
    } catch (h) {
      if (h instanceof DOMException && h.name === 'DataCloneError') throw h
      l.location.assign(C)
    }
    o && u && u({ action: a, location: k.location, delta: 1 })
  }
  function g(T, f) {
    a = 'REPLACE'
    let c = ol(k.location, T, f)
    s = d()
    let p = bs(c, s),
      C = k.createHref(c)
    i.replaceState(p, '', C),
      o && u && u({ action: a, location: k.location, delta: 0 })
  }
  function E(T) {
    let f = l.location.origin !== 'null' ? l.location.origin : l.location.href,
      c = typeof T == 'string' ? T : on(T)
    return (
      (c = c.replace(/ $/, '%20')),
      K(
        f,
        `No window.location.(origin|href) available to create URL for href: ${c}`,
      ),
      new URL(c, f)
    )
  }
  let k = {
    get action() {
      return a
    },
    get location() {
      return e(l, i)
    },
    listen(T) {
      if (u) throw new Error('A history only accepts one active listener')
      return (
        l.addEventListener(qs, y),
        (u = T),
        () => {
          l.removeEventListener(qs, y), (u = null)
        }
      )
    },
    createHref(T) {
      return t(l, T)
    },
    createURL: E,
    encodeLocation(T) {
      let f = E(T)
      return { pathname: f.pathname, search: f.search, hash: f.hash }
    },
    push: m,
    replace: g,
    go(T) {
      return i.go(T)
    },
  }
  return k
}
var Jm = new Set(['lazy', 'caseSensitive', 'path', 'id', 'index', 'children'])
function Zm(e) {
  return e.index === !0
}
function Po(e, t, n = [], r = {}) {
  return e.map((l, o) => {
    let i = [...n, String(o)],
      a = typeof l.id == 'string' ? l.id : i.join('-')
    if (
      (K(
        l.index !== !0 || !l.children,
        'Cannot specify children on an index route',
      ),
      K(
        !r[a],
        `Found a route id collision on id "${a}".  Route id's must be globally unique within Data Router usages`,
      ),
      Zm(l))
    ) {
      let u = { ...l, ...t(l), id: a }
      return (r[a] = u), u
    } else {
      let u = { ...l, ...t(l), id: a, children: void 0 }
      return (r[a] = u), l.children && (u.children = Po(l.children, t, i, r)), u
    }
  })
}
function Kt(e, t, n = '/') {
  return Zl(e, t, n, !1)
}
function Zl(e, t, n, r) {
  let l = typeof t == 'string' ? cn(t) : t,
    o = pt(l.pathname || '/', n)
  if (o == null) return null
  let i = Md(e)
  bm(i)
  let a = null
  for (let u = 0; a == null && u < i.length; ++u) {
    let s = cv(o)
    a = uv(i[u], s, r)
  }
  return a
}
function qm(e, t) {
  let { route: n, pathname: r, params: l } = e
  return { id: n.id, pathname: r, params: l, data: t[n.id], handle: n.handle }
}
function Md(e, t = [], n = [], r = '') {
  let l = (o, i, a) => {
    let u = {
      relativePath: a === void 0 ? o.path || '' : a,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: i,
      route: o,
    }
    u.relativePath.startsWith('/') &&
      (K(
        u.relativePath.startsWith(r),
        `Absolute route path "${u.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
      (u.relativePath = u.relativePath.slice(r.length)))
    let s = St([r, u.relativePath]),
      d = n.concat(u)
    o.children &&
      o.children.length > 0 &&
      (K(
        o.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${s}".`,
      ),
      Md(o.children, t, d, s)),
      !(o.path == null && !o.index) &&
        t.push({ path: s, score: iv(s, o.index), routesMeta: d })
  }
  return (
    e.forEach((o, i) => {
      var a
      if (o.path === '' || !((a = o.path) != null && a.includes('?'))) l(o, i)
      else for (let u of zd(o.path)) l(o, i, u)
    }),
    t
  )
}
function zd(e) {
  let t = e.split('/')
  if (t.length === 0) return []
  let [n, ...r] = t,
    l = n.endsWith('?'),
    o = n.replace(/\?$/, '')
  if (r.length === 0) return l ? [o, ''] : [o]
  let i = zd(r.join('/')),
    a = []
  return (
    a.push(...i.map((u) => (u === '' ? o : [o, u].join('/')))),
    l && a.push(...i),
    a.map((u) => (e.startsWith('/') && u === '' ? '/' : u))
  )
}
function bm(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : av(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex),
        ),
  )
}
var ev = /^:[\w-]+$/,
  tv = 3,
  nv = 2,
  rv = 1,
  lv = 10,
  ov = -2,
  ec = (e) => e === '*'
function iv(e, t) {
  let n = e.split('/'),
    r = n.length
  return (
    n.some(ec) && (r += ov),
    t && (r += nv),
    n
      .filter((l) => !ec(l))
      .reduce((l, o) => l + (ev.test(o) ? tv : o === '' ? rv : lv), r)
  )
}
function av(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0
}
function uv(e, t, n = !1) {
  let { routesMeta: r } = e,
    l = {},
    o = '/',
    i = []
  for (let a = 0; a < r.length; ++a) {
    let u = r[a],
      s = a === r.length - 1,
      d = o === '/' ? t : t.slice(o.length) || '/',
      y = Ro(
        { path: u.relativePath, caseSensitive: u.caseSensitive, end: s },
        d,
      ),
      m = u.route
    if (
      (!y &&
        s &&
        n &&
        !r[r.length - 1].route.index &&
        (y = Ro(
          { path: u.relativePath, caseSensitive: u.caseSensitive, end: !1 },
          d,
        )),
      !y)
    )
      return null
    Object.assign(l, y.params),
      i.push({
        params: l,
        pathname: St([o, y.pathname]),
        pathnameBase: pv(St([o, y.pathnameBase])),
        route: m,
      }),
      y.pathnameBase !== '/' && (o = St([o, y.pathnameBase]))
  }
  return i
}
function Ro(e, t) {
  typeof e == 'string' && (e = { path: e, caseSensitive: !1, end: !0 })
  let [n, r] = sv(e.path, e.caseSensitive, e.end),
    l = t.match(n)
  if (!l) return null
  let o = l[0],
    i = o.replace(/(.)\/+$/, '$1'),
    a = l.slice(1)
  return {
    params: r.reduce((s, { paramName: d, isOptional: y }, m) => {
      if (d === '*') {
        let E = a[m] || ''
        i = o.slice(0, o.length - E.length).replace(/(.)\/+$/, '$1')
      }
      const g = a[m]
      return (
        y && !g ? (s[d] = void 0) : (s[d] = (g || '').replace(/%2F/g, '/')), s
      )
    }, {}),
    pathname: o,
    pathnameBase: i,
    pattern: e,
  }
}
function sv(e, t = !1, n = !0) {
  rt(
    e === '*' || !e.endsWith('*') || e.endsWith('/*'),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, '/*')}".`,
  )
  let r = [],
    l =
      '^' +
      e
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (i, a, u) => (
            r.push({ paramName: a, isOptional: u != null }),
            u ? '/?([^\\/]+)?' : '/([^\\/]+)'
          ),
        )
  return (
    e.endsWith('*')
      ? (r.push({ paramName: '*' }),
        (l += e === '*' || e === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : n
        ? (l += '\\/*$')
        : e !== '' && e !== '/' && (l += '(?:(?=\\/|$))'),
    [new RegExp(l, t ? void 0 : 'i'), r]
  )
}
function cv(e) {
  try {
    return e
      .split('/')
      .map((t) => decodeURIComponent(t).replace(/\//g, '%2F'))
      .join('/')
  } catch (t) {
    return (
      rt(
        !1,
        `The URL path "${e}" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`,
      ),
      e
    )
  }
}
function pt(e, t) {
  if (t === '/') return e
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null
  let n = t.endsWith('/') ? t.length - 1 : t.length,
    r = e.charAt(n)
  return r && r !== '/' ? null : e.slice(n) || '/'
}
function fv(e, t = '/') {
  let {
    pathname: n,
    search: r = '',
    hash: l = '',
  } = typeof e == 'string' ? cn(e) : e
  return {
    pathname: n ? (n.startsWith('/') ? n : dv(n, t)) : t,
    search: hv(r),
    hash: mv(l),
  }
}
function dv(e, t) {
  let n = t.replace(/\/+$/, '').split('/')
  return (
    e.split('/').forEach((l) => {
      l === '..' ? n.length > 1 && n.pop() : l !== '.' && n.push(l)
    }),
    n.length > 1 ? n.join('/') : '/'
  )
}
function xi(e, t, n, r) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`
}
function Od(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
  )
}
function gu(e) {
  let t = Od(e)
  return t.map((n, r) => (r === t.length - 1 ? n.pathname : n.pathnameBase))
}
function wu(e, t, n, r = !1) {
  let l
  typeof e == 'string'
    ? (l = cn(e))
    : ((l = { ...e }),
      K(
        !l.pathname || !l.pathname.includes('?'),
        xi('?', 'pathname', 'search', l),
      ),
      K(
        !l.pathname || !l.pathname.includes('#'),
        xi('#', 'pathname', 'hash', l),
      ),
      K(!l.search || !l.search.includes('#'), xi('#', 'search', 'hash', l)))
  let o = e === '' || l.pathname === '',
    i = o ? '/' : l.pathname,
    a
  if (i == null) a = n
  else {
    let y = t.length - 1
    if (!r && i.startsWith('..')) {
      let m = i.split('/')
      for (; m[0] === '..'; ) m.shift(), (y -= 1)
      l.pathname = m.join('/')
    }
    a = y >= 0 ? t[y] : '/'
  }
  let u = fv(l, a),
    s = i && i !== '/' && i.endsWith('/'),
    d = (o || i === '.') && n.endsWith('/')
  return !u.pathname.endsWith('/') && (s || d) && (u.pathname += '/'), u
}
var St = (e) => e.join('/').replace(/\/\/+/g, '/'),
  pv = (e) => e.replace(/\/+$/, '').replace(/^\/*/, '/'),
  hv = (e) => (!e || e === '?' ? '' : e.startsWith('?') ? e : '?' + e),
  mv = (e) => (!e || e === '#' ? '' : e.startsWith('#') ? e : '#' + e),
  Lo = class {
    constructor(e, t, n, r = !1) {
      ;(this.status = e),
        (this.statusText = t || ''),
        (this.internal = r),
        n instanceof Error
          ? ((this.data = n.toString()), (this.error = n))
          : (this.data = n)
    }
  }
function Wo(e) {
  return (
    e != null &&
    typeof e.status == 'number' &&
    typeof e.statusText == 'string' &&
    typeof e.internal == 'boolean' &&
    'data' in e
  )
}
var Fd = ['POST', 'PUT', 'PATCH', 'DELETE'],
  vv = new Set(Fd),
  yv = ['GET', ...Fd],
  gv = new Set(yv),
  wv = new Set([301, 302, 303, 307, 308]),
  Sv = new Set([307, 308]),
  Ci = {
    state: 'idle',
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Ev = {
    state: 'idle',
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Pr = { state: 'unblocked', proceed: void 0, reset: void 0, location: void 0 },
  Su = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  kv = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
  Id = 'remix-router-transitions',
  jd = Symbol('ResetLoaderData')
function xv(e) {
  const t = e.window ? e.window : typeof window < 'u' ? window : void 0,
    n =
      typeof t < 'u' &&
      typeof t.document < 'u' &&
      typeof t.document.createElement < 'u'
  K(
    e.routes.length > 0,
    'You must provide a non-empty routes array to createRouter',
  )
  let r = e.mapRouteProperties || kv,
    l = {},
    o = Po(e.routes, r, void 0, l),
    i,
    a = e.basename || '/',
    u = e.dataStrategy || _v,
    s = e.patchRoutesOnNavigation,
    d = { ...e.future },
    y = null,
    m = new Set(),
    g = null,
    E = null,
    k = null,
    T = e.hydrationData != null,
    f = Kt(o, e.history.location, a),
    c = null
  if (f == null && !s) {
    let v = Je(404, { pathname: e.history.location.pathname }),
      { matches: w, route: S } = fc(o)
    ;(f = w), (c = { [S.id]: v })
  }
  f &&
    !e.hydrationData &&
    ml(f, o, e.history.location.pathname).active &&
    (f = null)
  let p
  if (f)
    if (f.some((v) => v.route.lazy)) p = !1
    else if (!f.some((v) => v.route.loader)) p = !0
    else {
      let v = e.hydrationData ? e.hydrationData.loaderData : null,
        w = e.hydrationData ? e.hydrationData.errors : null
      if (w) {
        let S = f.findIndex((P) => w[P.route.id] !== void 0)
        p = f.slice(0, S + 1).every((P) => !Ea(P.route, v, w))
      } else p = f.every((S) => !Ea(S.route, v, w))
    }
  else {
    ;(p = !1), (f = [])
    let v = ml(null, o, e.history.location.pathname)
    v.active && v.matches && (f = v.matches)
  }
  let C,
    h = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: f,
      initialized: p,
      navigation: Ci,
      restoreScrollPosition: e.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: 'idle',
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || c,
      fetchers: new Map(),
      blockers: new Map(),
    },
    R = 'POP',
    N = !1,
    _,
    A = !1,
    j = new Map(),
    ne = null,
    Ye = !1,
    $e = !1,
    fn = new Set(),
    he = new Map(),
    jt = 0,
    xt = -1,
    M = new Map(),
    $ = new Set(),
    H = new Map(),
    J = new Map(),
    G = new Set(),
    Xe = new Map(),
    Ge,
    lt = null
  function Ct() {
    if (
      ((y = e.history.listen(({ action: v, location: w, delta: S }) => {
        if (Ge) {
          Ge(), (Ge = void 0)
          return
        }
        rt(
          Xe.size === 0 || S != null,
          'You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.',
        )
        let P = ju({
          currentLocation: h.location,
          nextLocation: w,
          historyAction: v,
        })
        if (P && S != null) {
          let O = new Promise((U) => {
            Ge = U
          })
          e.history.go(S * -1),
            hl(P, {
              state: 'blocked',
              location: w,
              proceed() {
                hl(P, {
                  state: 'proceeding',
                  proceed: void 0,
                  reset: void 0,
                  location: w,
                }),
                  O.then(() => e.history.go(S))
              },
              reset() {
                let U = new Map(h.blockers)
                U.set(P, Pr), Te({ blockers: U })
              },
            })
          return
        }
        return dn(v, w)
      })),
      n)
    ) {
      $v(t, j)
      let v = () => Av(t, j)
      t.addEventListener('pagehide', v),
        (ne = () => t.removeEventListener('pagehide', v))
    }
    return h.initialized || dn('POP', h.location, { initialHydration: !0 }), C
  }
  function zn() {
    y && y(),
      ne && ne(),
      m.clear(),
      _ && _.abort(),
      h.fetchers.forEach((v, w) => Xo(w)),
      h.blockers.forEach((v, w) => Iu(w))
  }
  function Gd(v) {
    return m.add(v), () => m.delete(v)
  }
  function Te(v, w = {}) {
    h = { ...h, ...v }
    let S = [],
      P = []
    h.fetchers.forEach((O, U) => {
      O.state === 'idle' && (G.has(U) ? S.push(U) : P.push(U))
    }),
      [...m].forEach((O) =>
        O(h, {
          deletedFetchers: S,
          viewTransitionOpts: w.viewTransitionOpts,
          flushSync: w.flushSync === !0,
        }),
      ),
      S.forEach((O) => Xo(O)),
      P.forEach((O) => h.fetchers.delete(O))
  }
  function On(v, w, { flushSync: S } = {}) {
    var D, V
    let P =
        h.actionData != null &&
        h.navigation.formMethod != null &&
        ut(h.navigation.formMethod) &&
        h.navigation.state === 'loading' &&
        ((D = v.state) == null ? void 0 : D._isRedirect) !== !0,
      O
    w.actionData
      ? Object.keys(w.actionData).length > 0
        ? (O = w.actionData)
        : (O = null)
      : P
        ? (O = h.actionData)
        : (O = null)
    let U = w.loaderData
        ? sc(h.loaderData, w.loaderData, w.matches || [], w.errors)
        : h.loaderData,
      B = h.blockers
    B.size > 0 && ((B = new Map(B)), B.forEach((W, re) => B.set(re, Pr)))
    let F =
      N === !0 ||
      (h.navigation.formMethod != null &&
        ut(h.navigation.formMethod) &&
        ((V = v.state) == null ? void 0 : V._isRedirect) !== !0)
    i && ((o = i), (i = void 0)),
      Ye ||
        R === 'POP' ||
        (R === 'PUSH'
          ? e.history.push(v, v.state)
          : R === 'REPLACE' && e.history.replace(v, v.state))
    let I
    if (R === 'POP') {
      let W = j.get(h.location.pathname)
      W && W.has(v.pathname)
        ? (I = { currentLocation: h.location, nextLocation: v })
        : j.has(v.pathname) &&
          (I = { currentLocation: v, nextLocation: h.location })
    } else if (A) {
      let W = j.get(h.location.pathname)
      W
        ? W.add(v.pathname)
        : ((W = new Set([v.pathname])), j.set(h.location.pathname, W)),
        (I = { currentLocation: h.location, nextLocation: v })
    }
    Te(
      {
        ...w,
        actionData: O,
        loaderData: U,
        historyAction: R,
        location: v,
        initialized: !0,
        navigation: Ci,
        revalidation: 'idle',
        restoreScrollPosition: $u(v, w.matches || h.matches),
        preventScrollReset: F,
        blockers: B,
      },
      { viewTransitionOpts: I, flushSync: S === !0 },
    ),
      (R = 'POP'),
      (N = !1),
      (A = !1),
      (Ye = !1),
      ($e = !1),
      lt == null || lt.resolve(),
      (lt = null)
  }
  async function Tu(v, w) {
    if (typeof v == 'number') {
      e.history.go(v)
      return
    }
    let S = Sa(
        h.location,
        h.matches,
        a,
        v,
        w == null ? void 0 : w.fromRouteId,
        w == null ? void 0 : w.relative,
      ),
      { path: P, submission: O, error: U } = tc(!1, S, w),
      B = h.location,
      F = ol(h.location, P, w && w.state)
    F = { ...F, ...e.history.encodeLocation(F) }
    let I = w && w.replace != null ? w.replace : void 0,
      D = 'PUSH'
    I === !0
      ? (D = 'REPLACE')
      : I === !1 ||
        (O != null &&
          ut(O.formMethod) &&
          O.formAction === h.location.pathname + h.location.search &&
          (D = 'REPLACE'))
    let V =
        w && 'preventScrollReset' in w ? w.preventScrollReset === !0 : void 0,
      W = (w && w.flushSync) === !0,
      re = ju({ currentLocation: B, nextLocation: F, historyAction: D })
    if (re) {
      hl(re, {
        state: 'blocked',
        location: F,
        proceed() {
          hl(re, {
            state: 'proceeding',
            proceed: void 0,
            reset: void 0,
            location: F,
          }),
            Tu(v, w)
        },
        reset() {
          let Se = new Map(h.blockers)
          Se.set(re, Pr), Te({ blockers: Se })
        },
      })
      return
    }
    await dn(D, F, {
      submission: O,
      pendingError: U,
      preventScrollReset: V,
      replace: w && w.replace,
      enableViewTransition: w && w.viewTransition,
      flushSync: W,
    })
  }
  function Jd() {
    lt || (lt = Hv()), Yo(), Te({ revalidation: 'loading' })
    let v = lt.promise
    return h.navigation.state === 'submitting'
      ? v
      : h.navigation.state === 'idle'
        ? (dn(h.historyAction, h.location, {
            startUninterruptedRevalidation: !0,
          }),
          v)
        : (dn(R || h.historyAction, h.navigation.location, {
            overrideNavigation: h.navigation,
            enableViewTransition: A === !0,
          }),
          v)
  }
  async function dn(v, w, S) {
    _ && _.abort(),
      (_ = null),
      (R = v),
      (Ye = (S && S.startUninterruptedRevalidation) === !0),
      ip(h.location, h.matches),
      (N = (S && S.preventScrollReset) === !0),
      (A = (S && S.enableViewTransition) === !0)
    let P = i || o,
      O = S && S.overrideNavigation,
      U = Kt(P, w, a),
      B = (S && S.flushSync) === !0,
      F = ml(U, P, w.pathname)
    if ((F.active && F.matches && (U = F.matches), !U)) {
      let { error: oe, notFoundMatches: b, route: me } = Go(w.pathname)
      On(
        w,
        { matches: b, loaderData: {}, errors: { [me.id]: oe } },
        { flushSync: B },
      )
      return
    }
    if (
      h.initialized &&
      !$e &&
      Ov(h.location, w) &&
      !(S && S.submission && ut(S.submission.formMethod))
    ) {
      On(w, { matches: U }, { flushSync: B })
      return
    }
    _ = new AbortController()
    let I = Un(e.history, w, _.signal, S && S.submission),
      D
    if (S && S.pendingError)
      D = [yn(U).route.id, { type: 'error', error: S.pendingError }]
    else if (S && S.submission && ut(S.submission.formMethod)) {
      let oe = await Zd(I, w, S.submission, U, F.active, {
        replace: S.replace,
        flushSync: B,
      })
      if (oe.shortCircuited) return
      if (oe.pendingActionResult) {
        let [b, me] = oe.pendingActionResult
        if (He(me) && Wo(me.error) && me.error.status === 404) {
          ;(_ = null),
            On(w, {
              matches: oe.matches,
              loaderData: {},
              errors: { [b]: me.error },
            })
          return
        }
      }
      ;(U = oe.matches || U),
        (D = oe.pendingActionResult),
        (O = Pi(w, S.submission)),
        (B = !1),
        (F.active = !1),
        (I = Un(e.history, I.url, I.signal))
    }
    let {
      shortCircuited: V,
      matches: W,
      loaderData: re,
      errors: Se,
    } = await qd(
      I,
      w,
      U,
      F.active,
      O,
      S && S.submission,
      S && S.fetcherSubmission,
      S && S.replace,
      S && S.initialHydration === !0,
      B,
      D,
    )
    V ||
      ((_ = null),
      On(w, { matches: W || U, ...cc(D), loaderData: re, errors: Se }))
  }
  async function Zd(v, w, S, P, O, U = {}) {
    Yo()
    let B = jv(w, S)
    if ((Te({ navigation: B }, { flushSync: U.flushSync === !0 }), O)) {
      let D = await vl(P, w.pathname, v.signal)
      if (D.type === 'aborted') return { shortCircuited: !0 }
      if (D.type === 'error') {
        let V = yn(D.partialMatches).route.id
        return {
          matches: D.partialMatches,
          pendingActionResult: [V, { type: 'error', error: D.error }],
        }
      } else if (D.matches) P = D.matches
      else {
        let { notFoundMatches: V, error: W, route: re } = Go(w.pathname)
        return {
          matches: V,
          pendingActionResult: [re.id, { type: 'error', error: W }],
        }
      }
    }
    let F,
      I = Mr(P, w)
    if (!I.route.action && !I.route.lazy)
      F = {
        type: 'error',
        error: Je(405, {
          method: v.method,
          pathname: w.pathname,
          routeId: I.route.id,
        }),
      }
    else if (
      ((F = (await pr('action', h, v, [I], P, null))[I.route.id]),
      v.signal.aborted)
    )
      return { shortCircuited: !0 }
    if (En(F)) {
      let D
      return (
        U && U.replace != null
          ? (D = U.replace)
          : (D =
              ic(F.response.headers.get('Location'), new URL(v.url), a) ===
              h.location.pathname + h.location.search),
        await pn(v, F, !0, { submission: S, replace: D }),
        { shortCircuited: !0 }
      )
    }
    if (He(F)) {
      let D = yn(P, I.route.id)
      return (
        (U && U.replace) !== !0 && (R = 'PUSH'),
        { matches: P, pendingActionResult: [D.route.id, F] }
      )
    }
    return { matches: P, pendingActionResult: [I.route.id, F] }
  }
  async function qd(v, w, S, P, O, U, B, F, I, D, V) {
    let W = O || Pi(w, U),
      re = U || B || pc(W),
      Se = !Ye && !I
    if (P) {
      if (Se) {
        let Ce = Nu(V)
        Te(
          { navigation: W, ...(Ce !== void 0 ? { actionData: Ce } : {}) },
          { flushSync: D },
        )
      }
      let Z = await vl(S, w.pathname, v.signal)
      if (Z.type === 'aborted') return { shortCircuited: !0 }
      if (Z.type === 'error') {
        let Ce = yn(Z.partialMatches).route.id
        return {
          matches: Z.partialMatches,
          loaderData: {},
          errors: { [Ce]: Z.error },
        }
      } else if (Z.matches) S = Z.matches
      else {
        let { error: Ce, notFoundMatches: wl, route: vr } = Go(w.pathname)
        return { matches: wl, loaderData: {}, errors: { [vr.id]: Ce } }
      }
    }
    let oe = i || o,
      [b, me] = rc(e.history, h, S, re, w, I === !0, $e, fn, G, H, $, oe, a, V)
    if (((xt = ++jt), b.length === 0 && me.length === 0)) {
      let Z = Ou()
      return (
        On(
          w,
          {
            matches: S,
            loaderData: {},
            errors: V && He(V[1]) ? { [V[0]]: V[1].error } : null,
            ...cc(V),
            ...(Z ? { fetchers: new Map(h.fetchers) } : {}),
          },
          { flushSync: D },
        ),
        { shortCircuited: !0 }
      )
    }
    if (Se) {
      let Z = {}
      if (!P) {
        Z.navigation = W
        let Ce = Nu(V)
        Ce !== void 0 && (Z.actionData = Ce)
      }
      me.length > 0 && (Z.fetchers = bd(me)), Te(Z, { flushSync: D })
    }
    me.forEach((Z) => {
      $t(Z.key), Z.controller && he.set(Z.key, Z.controller)
    })
    let Fn = () => me.forEach((Z) => $t(Z.key))
    _ && _.signal.addEventListener('abort', Fn)
    let { loaderResults: hr, fetcherResults: Rt } = await Du(h, S, b, me, v)
    if (v.signal.aborted) return { shortCircuited: !0 }
    _ && _.signal.removeEventListener('abort', Fn),
      me.forEach((Z) => he.delete(Z.key))
    let ht = jl(hr)
    if (ht)
      return await pn(v, ht.result, !0, { replace: F }), { shortCircuited: !0 }
    if (((ht = jl(Rt)), ht))
      return (
        $.add(ht.key),
        await pn(v, ht.result, !0, { replace: F }),
        { shortCircuited: !0 }
      )
    let { loaderData: Jo, errors: mr } = uc(h, S, hr, V, me, Rt)
    I && h.errors && (mr = { ...h.errors, ...mr })
    let hn = Ou(),
      yl = Fu(xt),
      gl = hn || yl || me.length > 0
    return {
      matches: S,
      loaderData: Jo,
      errors: mr,
      ...(gl ? { fetchers: new Map(h.fetchers) } : {}),
    }
  }
  function Nu(v) {
    if (v && !He(v[1])) return { [v[0]]: v[1].data }
    if (h.actionData)
      return Object.keys(h.actionData).length === 0 ? null : h.actionData
  }
  function bd(v) {
    return (
      v.forEach((w) => {
        let S = h.fetchers.get(w.key),
          P = Rr(void 0, S ? S.data : void 0)
        h.fetchers.set(w.key, P)
      }),
      new Map(h.fetchers)
    )
  }
  async function ep(v, w, S, P) {
    $t(v)
    let O = (P && P.flushSync) === !0,
      U = i || o,
      B = Sa(h.location, h.matches, a, S, w, P == null ? void 0 : P.relative),
      F = Kt(U, B, a),
      I = ml(F, U, B)
    if ((I.active && I.matches && (F = I.matches), !F)) {
      Pt(v, w, Je(404, { pathname: B }), { flushSync: O })
      return
    }
    let { path: D, submission: V, error: W } = tc(!0, B, P)
    if (W) {
      Pt(v, w, W, { flushSync: O })
      return
    }
    let re = Mr(F, D),
      Se = (P && P.preventScrollReset) === !0
    if (V && ut(V.formMethod)) {
      await tp(v, w, D, re, F, I.active, O, Se, V)
      return
    }
    H.set(v, { routeId: w, path: D }),
      await np(v, w, D, re, F, I.active, O, Se, V)
  }
  async function tp(v, w, S, P, O, U, B, F, I) {
    Yo(), H.delete(v)
    function D(fe) {
      if (!fe.route.action && !fe.route.lazy) {
        let In = Je(405, { method: I.formMethod, pathname: S, routeId: w })
        return Pt(v, w, In, { flushSync: B }), !0
      }
      return !1
    }
    if (!U && D(P)) return
    let V = h.fetchers.get(v)
    Ut(v, Uv(I, V), { flushSync: B })
    let W = new AbortController(),
      re = Un(e.history, S, W.signal, I)
    if (U) {
      let fe = await vl(O, S, re.signal)
      if (fe.type === 'aborted') return
      if (fe.type === 'error') {
        Pt(v, w, fe.error, { flushSync: B })
        return
      } else if (fe.matches) {
        if (((O = fe.matches), (P = Mr(O, S)), D(P))) return
      } else {
        Pt(v, w, Je(404, { pathname: S }), { flushSync: B })
        return
      }
    }
    he.set(v, W)
    let Se = jt,
      b = (await pr('action', h, re, [P], O, v))[P.route.id]
    if (re.signal.aborted) {
      he.get(v) === W && he.delete(v)
      return
    }
    if (G.has(v)) {
      if (En(b) || He(b)) {
        Ut(v, Ht(void 0))
        return
      }
    } else {
      if (En(b))
        if ((he.delete(v), xt > Se)) {
          Ut(v, Ht(void 0))
          return
        } else
          return (
            $.add(v),
            Ut(v, Rr(I)),
            pn(re, b, !1, { fetcherSubmission: I, preventScrollReset: F })
          )
      if (He(b)) {
        Pt(v, w, b.error)
        return
      }
    }
    let me = h.navigation.location || h.location,
      Fn = Un(e.history, me, W.signal),
      hr = i || o,
      Rt =
        h.navigation.state !== 'idle'
          ? Kt(hr, h.navigation.location, a)
          : h.matches
    K(Rt, "Didn't find any matches after fetcher action")
    let ht = ++jt
    M.set(v, ht)
    let Jo = Rr(I, b.data)
    h.fetchers.set(v, Jo)
    let [mr, hn] = rc(e.history, h, Rt, I, me, !1, $e, fn, G, H, $, hr, a, [
      P.route.id,
      b,
    ])
    hn
      .filter((fe) => fe.key !== v)
      .forEach((fe) => {
        let In = fe.key,
          Au = h.fetchers.get(In),
          sp = Rr(void 0, Au ? Au.data : void 0)
        h.fetchers.set(In, sp),
          $t(In),
          fe.controller && he.set(In, fe.controller)
      }),
      Te({ fetchers: new Map(h.fetchers) })
    let yl = () => hn.forEach((fe) => $t(fe.key))
    W.signal.addEventListener('abort', yl)
    let { loaderResults: gl, fetcherResults: Z } = await Du(h, Rt, mr, hn, Fn)
    if (W.signal.aborted) return
    W.signal.removeEventListener('abort', yl),
      M.delete(v),
      he.delete(v),
      hn.forEach((fe) => he.delete(fe.key))
    let Ce = jl(gl)
    if (Ce) return pn(Fn, Ce.result, !1, { preventScrollReset: F })
    if (((Ce = jl(Z)), Ce))
      return $.add(Ce.key), pn(Fn, Ce.result, !1, { preventScrollReset: F })
    let { loaderData: wl, errors: vr } = uc(h, Rt, gl, void 0, hn, Z)
    if (h.fetchers.has(v)) {
      let fe = Ht(b.data)
      h.fetchers.set(v, fe)
    }
    Fu(ht),
      h.navigation.state === 'loading' && ht > xt
        ? (K(R, 'Expected pending action'),
          _ && _.abort(),
          On(h.navigation.location, {
            matches: Rt,
            loaderData: wl,
            errors: vr,
            fetchers: new Map(h.fetchers),
          }))
        : (Te({
            errors: vr,
            loaderData: sc(h.loaderData, wl, Rt, vr),
            fetchers: new Map(h.fetchers),
          }),
          ($e = !1))
  }
  async function np(v, w, S, P, O, U, B, F, I) {
    let D = h.fetchers.get(v)
    Ut(v, Rr(I, D ? D.data : void 0), { flushSync: B })
    let V = new AbortController(),
      W = Un(e.history, S, V.signal)
    if (U) {
      let b = await vl(O, S, W.signal)
      if (b.type === 'aborted') return
      if (b.type === 'error') {
        Pt(v, w, b.error, { flushSync: B })
        return
      } else if (b.matches) (O = b.matches), (P = Mr(O, S))
      else {
        Pt(v, w, Je(404, { pathname: S }), { flushSync: B })
        return
      }
    }
    he.set(v, V)
    let re = jt,
      oe = (await pr('loader', h, W, [P], O, v))[P.route.id]
    if ((he.get(v) === V && he.delete(v), !W.signal.aborted)) {
      if (G.has(v)) {
        Ut(v, Ht(void 0))
        return
      }
      if (En(oe))
        if (xt > re) {
          Ut(v, Ht(void 0))
          return
        } else {
          $.add(v), await pn(W, oe, !1, { preventScrollReset: F })
          return
        }
      if (He(oe)) {
        Pt(v, w, oe.error)
        return
      }
      Ut(v, Ht(oe.data))
    }
  }
  async function pn(
    v,
    w,
    S,
    {
      submission: P,
      fetcherSubmission: O,
      preventScrollReset: U,
      replace: B,
    } = {},
  ) {
    w.response.headers.has('X-Remix-Revalidate') && ($e = !0)
    let F = w.response.headers.get('Location')
    K(F, 'Expected a Location header on the redirect Response'),
      (F = ic(F, new URL(v.url), a))
    let I = ol(h.location, F, { _isRedirect: !0 })
    if (n) {
      let oe = !1
      if (w.response.headers.has('X-Remix-Reload-Document')) oe = !0
      else if (Su.test(F)) {
        const b = e.history.createURL(F)
        oe = b.origin !== t.location.origin || pt(b.pathname, a) == null
      }
      if (oe) {
        B ? t.location.replace(F) : t.location.assign(F)
        return
      }
    }
    _ = null
    let D =
        B === !0 || w.response.headers.has('X-Remix-Replace')
          ? 'REPLACE'
          : 'PUSH',
      { formMethod: V, formAction: W, formEncType: re } = h.navigation
    !P && !O && V && W && re && (P = pc(h.navigation))
    let Se = P || O
    if (Sv.has(w.response.status) && Se && ut(Se.formMethod))
      await dn(D, I, {
        submission: { ...Se, formAction: F },
        preventScrollReset: U || N,
        enableViewTransition: S ? A : void 0,
      })
    else {
      let oe = Pi(I, P)
      await dn(D, I, {
        overrideNavigation: oe,
        fetcherSubmission: O,
        preventScrollReset: U || N,
        enableViewTransition: S ? A : void 0,
      })
    }
  }
  async function pr(v, w, S, P, O, U) {
    let B,
      F = {}
    try {
      B = await Tv(u, v, w, S, P, O, U, l, r)
    } catch (I) {
      return (
        P.forEach((D) => {
          F[D.route.id] = { type: 'error', error: I }
        }),
        F
      )
    }
    for (let [I, D] of Object.entries(B))
      if (Fv(D)) {
        let V = D.result
        F[I] = { type: 'redirect', response: Mv(V, S, I, O, a) }
      } else F[I] = await Dv(D)
    return F
  }
  async function Du(v, w, S, P, O) {
    let U = pr('loader', v, O, S, w, null),
      B = Promise.all(
        P.map(async (D) => {
          if (D.matches && D.match && D.controller) {
            let W = (
              await pr(
                'loader',
                v,
                Un(e.history, D.path, D.controller.signal),
                [D.match],
                D.matches,
                D.key,
              )
            )[D.match.route.id]
            return { [D.key]: W }
          } else
            return Promise.resolve({
              [D.key]: { type: 'error', error: Je(404, { pathname: D.path }) },
            })
        }),
      ),
      F = await U,
      I = (await B).reduce((D, V) => Object.assign(D, V), {})
    return { loaderResults: F, fetcherResults: I }
  }
  function Yo() {
    ;($e = !0),
      H.forEach((v, w) => {
        he.has(w) && fn.add(w), $t(w)
      })
  }
  function Ut(v, w, S = {}) {
    h.fetchers.set(v, w),
      Te(
        { fetchers: new Map(h.fetchers) },
        { flushSync: (S && S.flushSync) === !0 },
      )
  }
  function Pt(v, w, S, P = {}) {
    let O = yn(h.matches, w)
    Xo(v),
      Te(
        { errors: { [O.route.id]: S }, fetchers: new Map(h.fetchers) },
        { flushSync: (P && P.flushSync) === !0 },
      )
  }
  function Mu(v) {
    return (
      J.set(v, (J.get(v) || 0) + 1),
      G.has(v) && G.delete(v),
      h.fetchers.get(v) || Ev
    )
  }
  function Xo(v) {
    let w = h.fetchers.get(v)
    he.has(v) && !(w && w.state === 'loading' && M.has(v)) && $t(v),
      H.delete(v),
      M.delete(v),
      $.delete(v),
      G.delete(v),
      fn.delete(v),
      h.fetchers.delete(v)
  }
  function rp(v) {
    let w = (J.get(v) || 0) - 1
    w <= 0 ? (J.delete(v), G.add(v)) : J.set(v, w),
      Te({ fetchers: new Map(h.fetchers) })
  }
  function $t(v) {
    let w = he.get(v)
    w && (w.abort(), he.delete(v))
  }
  function zu(v) {
    for (let w of v) {
      let S = Mu(w),
        P = Ht(S.data)
      h.fetchers.set(w, P)
    }
  }
  function Ou() {
    let v = [],
      w = !1
    for (let S of $) {
      let P = h.fetchers.get(S)
      K(P, `Expected fetcher: ${S}`),
        P.state === 'loading' && ($.delete(S), v.push(S), (w = !0))
    }
    return zu(v), w
  }
  function Fu(v) {
    let w = []
    for (let [S, P] of M)
      if (P < v) {
        let O = h.fetchers.get(S)
        K(O, `Expected fetcher: ${S}`),
          O.state === 'loading' && ($t(S), M.delete(S), w.push(S))
      }
    return zu(w), w.length > 0
  }
  function lp(v, w) {
    let S = h.blockers.get(v) || Pr
    return Xe.get(v) !== w && Xe.set(v, w), S
  }
  function Iu(v) {
    h.blockers.delete(v), Xe.delete(v)
  }
  function hl(v, w) {
    let S = h.blockers.get(v) || Pr
    K(
      (S.state === 'unblocked' && w.state === 'blocked') ||
        (S.state === 'blocked' && w.state === 'blocked') ||
        (S.state === 'blocked' && w.state === 'proceeding') ||
        (S.state === 'blocked' && w.state === 'unblocked') ||
        (S.state === 'proceeding' && w.state === 'unblocked'),
      `Invalid blocker state transition: ${S.state} -> ${w.state}`,
    )
    let P = new Map(h.blockers)
    P.set(v, w), Te({ blockers: P })
  }
  function ju({ currentLocation: v, nextLocation: w, historyAction: S }) {
    if (Xe.size === 0) return
    Xe.size > 1 && rt(!1, 'A router only supports one blocker at a time')
    let P = Array.from(Xe.entries()),
      [O, U] = P[P.length - 1],
      B = h.blockers.get(O)
    if (
      !(B && B.state === 'proceeding') &&
      U({ currentLocation: v, nextLocation: w, historyAction: S })
    )
      return O
  }
  function Go(v) {
    let w = Je(404, { pathname: v }),
      S = i || o,
      { matches: P, route: O } = fc(S)
    return { notFoundMatches: P, route: O, error: w }
  }
  function op(v, w, S) {
    if (((g = v), (k = w), (E = S || null), !T && h.navigation === Ci)) {
      T = !0
      let P = $u(h.location, h.matches)
      P != null && Te({ restoreScrollPosition: P })
    }
    return () => {
      ;(g = null), (k = null), (E = null)
    }
  }
  function Uu(v, w) {
    return (
      (E &&
        E(
          v,
          w.map((P) => qm(P, h.loaderData)),
        )) ||
      v.key
    )
  }
  function ip(v, w) {
    if (g && k) {
      let S = Uu(v, w)
      g[S] = k()
    }
  }
  function $u(v, w) {
    if (g) {
      let S = Uu(v, w),
        P = g[S]
      if (typeof P == 'number') return P
    }
    return null
  }
  function ml(v, w, S) {
    if (s)
      if (v) {
        if (Object.keys(v[0].params).length > 0)
          return { active: !0, matches: Zl(w, S, a, !0) }
      } else return { active: !0, matches: Zl(w, S, a, !0) || [] }
    return { active: !1, matches: null }
  }
  async function vl(v, w, S) {
    if (!s) return { type: 'success', matches: v }
    let P = v
    for (;;) {
      let O = i == null,
        U = i || o,
        B = l
      try {
        await s({
          path: w,
          matches: P,
          patch: (D, V) => {
            S.aborted || oc(D, V, U, B, r)
          },
        })
      } catch (D) {
        return { type: 'error', error: D, partialMatches: P }
      } finally {
        O && !S.aborted && (o = [...o])
      }
      if (S.aborted) return { type: 'aborted' }
      let F = Kt(U, w, a)
      if (F) return { type: 'success', matches: F }
      let I = Zl(U, w, a, !0)
      if (
        !I ||
        (P.length === I.length &&
          P.every((D, V) => D.route.id === I[V].route.id))
      )
        return { type: 'success', matches: null }
      P = I
    }
  }
  function ap(v) {
    ;(l = {}), (i = Po(v, r, void 0, l))
  }
  function up(v, w) {
    let S = i == null
    oc(v, w, i || o, l, r), S && ((o = [...o]), Te({}))
  }
  return (
    (C = {
      get basename() {
        return a
      },
      get future() {
        return d
      },
      get state() {
        return h
      },
      get routes() {
        return o
      },
      get window() {
        return t
      },
      initialize: Ct,
      subscribe: Gd,
      enableScrollRestoration: op,
      navigate: Tu,
      fetch: ep,
      revalidate: Jd,
      createHref: (v) => e.history.createHref(v),
      encodeLocation: (v) => e.history.encodeLocation(v),
      getFetcher: Mu,
      deleteFetcher: rp,
      dispose: zn,
      getBlocker: lp,
      deleteBlocker: Iu,
      patchRoutes: up,
      _internalFetchControllers: he,
      _internalSetRoutes: ap,
    }),
    C
  )
}
function Cv(e) {
  return (
    e != null &&
    (('formData' in e && e.formData != null) ||
      ('body' in e && e.body !== void 0))
  )
}
function Sa(e, t, n, r, l, o) {
  let i, a
  if (l) {
    i = []
    for (let s of t)
      if ((i.push(s), s.route.id === l)) {
        a = s
        break
      }
  } else (i = t), (a = t[t.length - 1])
  let u = wu(r || '.', gu(i), pt(e.pathname, n) || e.pathname, o === 'path')
  if (
    (r == null && ((u.search = e.search), (u.hash = e.hash)),
    (r == null || r === '' || r === '.') && a)
  ) {
    let s = Eu(u.search)
    if (a.route.index && !s)
      u.search = u.search ? u.search.replace(/^\?/, '?index&') : '?index'
    else if (!a.route.index && s) {
      let d = new URLSearchParams(u.search),
        y = d.getAll('index')
      d.delete('index'), y.filter((g) => g).forEach((g) => d.append('index', g))
      let m = d.toString()
      u.search = m ? `?${m}` : ''
    }
  }
  return (
    n !== '/' && (u.pathname = u.pathname === '/' ? n : St([n, u.pathname])),
    on(u)
  )
}
function tc(e, t, n) {
  if (!n || !Cv(n)) return { path: t }
  if (n.formMethod && !Iv(n.formMethod))
    return { path: t, error: Je(405, { method: n.formMethod }) }
  let r = () => ({ path: t, error: Je(400, { type: 'invalid-body' }) }),
    o = (n.formMethod || 'get').toUpperCase(),
    i = $d(t)
  if (n.body !== void 0) {
    if (n.formEncType === 'text/plain') {
      if (!ut(o)) return r()
      let y =
        typeof n.body == 'string'
          ? n.body
          : n.body instanceof FormData || n.body instanceof URLSearchParams
            ? Array.from(n.body.entries()).reduce(
                (m, [g, E]) => `${m}${g}=${E}
`,
                '',
              )
            : String(n.body)
      return {
        path: t,
        submission: {
          formMethod: o,
          formAction: i,
          formEncType: n.formEncType,
          formData: void 0,
          json: void 0,
          text: y,
        },
      }
    } else if (n.formEncType === 'application/json') {
      if (!ut(o)) return r()
      try {
        let y = typeof n.body == 'string' ? JSON.parse(n.body) : n.body
        return {
          path: t,
          submission: {
            formMethod: o,
            formAction: i,
            formEncType: n.formEncType,
            formData: void 0,
            json: y,
            text: void 0,
          },
        }
      } catch {
        return r()
      }
    }
  }
  K(
    typeof FormData == 'function',
    'FormData is not available in this environment',
  )
  let a, u
  if (n.formData) (a = ka(n.formData)), (u = n.formData)
  else if (n.body instanceof FormData) (a = ka(n.body)), (u = n.body)
  else if (n.body instanceof URLSearchParams) (a = n.body), (u = ac(a))
  else if (n.body == null) (a = new URLSearchParams()), (u = new FormData())
  else
    try {
      ;(a = new URLSearchParams(n.body)), (u = ac(a))
    } catch {
      return r()
    }
  let s = {
    formMethod: o,
    formAction: i,
    formEncType: (n && n.formEncType) || 'application/x-www-form-urlencoded',
    formData: u,
    json: void 0,
    text: void 0,
  }
  if (ut(s.formMethod)) return { path: t, submission: s }
  let d = cn(t)
  return (
    e && d.search && Eu(d.search) && a.append('index', ''),
    (d.search = `?${a}`),
    { path: on(d), submission: s }
  )
}
function nc(e, t, n = !1) {
  let r = e.findIndex((l) => l.route.id === t)
  return r >= 0 ? e.slice(0, n ? r + 1 : r) : e
}
function rc(e, t, n, r, l, o, i, a, u, s, d, y, m, g) {
  let E = g ? (He(g[1]) ? g[1].error : g[1].data) : void 0,
    k = e.createURL(t.location),
    T = e.createURL(l),
    f = n
  o && t.errors
    ? (f = nc(n, Object.keys(t.errors)[0], !0))
    : g && He(g[1]) && (f = nc(n, g[0]))
  let c = g ? g[1].statusCode : void 0,
    p = c && c >= 400,
    C = f.filter((R, N) => {
      let { route: _ } = R
      if (_.lazy) return !0
      if (_.loader == null) return !1
      if (o) return Ea(_, t.loaderData, t.errors)
      if (Pv(t.loaderData, t.matches[N], R)) return !0
      let A = t.matches[N],
        j = R
      return lc(R, {
        currentUrl: k,
        currentParams: A.params,
        nextUrl: T,
        nextParams: j.params,
        ...r,
        actionResult: E,
        actionStatus: c,
        defaultShouldRevalidate: p
          ? !1
          : i ||
            k.pathname + k.search === T.pathname + T.search ||
            k.search !== T.search ||
            Rv(A, j),
      })
    }),
    h = []
  return (
    s.forEach((R, N) => {
      if (o || !n.some((Ye) => Ye.route.id === R.routeId) || u.has(N)) return
      let _ = Kt(y, R.path, m)
      if (!_) {
        h.push({
          key: N,
          routeId: R.routeId,
          path: R.path,
          matches: null,
          match: null,
          controller: null,
        })
        return
      }
      let A = t.fetchers.get(N),
        j = Mr(_, R.path),
        ne = !1
      d.has(N)
        ? (ne = !1)
        : a.has(N)
          ? (a.delete(N), (ne = !0))
          : A && A.state !== 'idle' && A.data === void 0
            ? (ne = i)
            : (ne = lc(j, {
                currentUrl: k,
                currentParams: t.matches[t.matches.length - 1].params,
                nextUrl: T,
                nextParams: n[n.length - 1].params,
                ...r,
                actionResult: E,
                actionStatus: c,
                defaultShouldRevalidate: p ? !1 : i,
              })),
        ne &&
          h.push({
            key: N,
            routeId: R.routeId,
            path: R.path,
            matches: _,
            match: j,
            controller: new AbortController(),
          })
    }),
    [C, h]
  )
}
function Ea(e, t, n) {
  if (e.lazy) return !0
  if (!e.loader) return !1
  let r = t != null && t[e.id] !== void 0,
    l = n != null && n[e.id] !== void 0
  return !r && l
    ? !1
    : typeof e.loader == 'function' && e.loader.hydrate === !0
      ? !0
      : !r && !l
}
function Pv(e, t, n) {
  let r = !t || n.route.id !== t.route.id,
    l = !e.hasOwnProperty(n.route.id)
  return r || l
}
function Rv(e, t) {
  let n = e.route.path
  return (
    e.pathname !== t.pathname ||
    (n != null && n.endsWith('*') && e.params['*'] !== t.params['*'])
  )
}
function lc(e, t) {
  if (e.route.shouldRevalidate) {
    let n = e.route.shouldRevalidate(t)
    if (typeof n == 'boolean') return n
  }
  return t.defaultShouldRevalidate
}
function oc(e, t, n, r, l) {
  let o
  if (e) {
    let u = r[e]
    K(u, `No route found to patch children into: routeId = ${e}`),
      u.children || (u.children = []),
      (o = u.children)
  } else o = n
  let i = t.filter((u) => !o.some((s) => Ud(u, s))),
    a = Po(
      i,
      l,
      [e || '_', 'patch', String((o == null ? void 0 : o.length) || '0')],
      r,
    )
  o.push(...a)
}
function Ud(e, t) {
  return 'id' in e && 'id' in t && e.id === t.id
    ? !0
    : e.index === t.index &&
        e.path === t.path &&
        e.caseSensitive === t.caseSensitive
      ? (!e.children || e.children.length === 0) &&
        (!t.children || t.children.length === 0)
        ? !0
        : e.children.every((n, r) => {
            var l
            return (l = t.children) == null ? void 0 : l.some((o) => Ud(n, o))
          })
      : !1
}
async function Lv(e, t, n) {
  if (!e.lazy) return
  let r = await e.lazy()
  if (!e.lazy) return
  let l = n[e.id]
  K(l, 'No route found in manifest')
  let o = {}
  for (let i in r) {
    let u = l[i] !== void 0 && i !== 'hasErrorBoundary'
    rt(
      !u,
      `Route "${l.id}" has a static property "${i}" defined but its lazy function is also returning a value for this property. The lazy route property "${i}" will be ignored.`,
    ),
      !u && !Jm.has(i) && (o[i] = r[i])
  }
  Object.assign(l, o), Object.assign(l, { ...t(l), lazy: void 0 })
}
async function _v({ matches: e }) {
  let t = e.filter((r) => r.shouldLoad)
  return (await Promise.all(t.map((r) => r.resolve()))).reduce(
    (r, l, o) => Object.assign(r, { [t[o].route.id]: l }),
    {},
  )
}
async function Tv(e, t, n, r, l, o, i, a, u, s) {
  let d = o.map((g) => (g.route.lazy ? Lv(g.route, u, a) : void 0)),
    y = o.map((g, E) => {
      let k = d[E],
        T = l.some((c) => c.route.id === g.route.id)
      return {
        ...g,
        shouldLoad: T,
        resolve: async (c) => (
          c &&
            r.method === 'GET' &&
            (g.route.lazy || g.route.loader) &&
            (T = !0),
          T
            ? Nv(t, r, g, k, c, s)
            : Promise.resolve({ type: 'data', result: void 0 })
        ),
      }
    }),
    m = await e({
      matches: y,
      request: r,
      params: o[0].params,
      fetcherKey: i,
      context: s,
    })
  try {
    await Promise.all(d)
  } catch {}
  return m
}
async function Nv(e, t, n, r, l, o) {
  let i,
    a,
    u = (s) => {
      let d,
        y = new Promise((E, k) => (d = k))
      ;(a = () => d()), t.signal.addEventListener('abort', a)
      let m = (E) =>
          typeof s != 'function'
            ? Promise.reject(
                new Error(
                  `You cannot call the handler for a route which defines a boolean "${e}" [routeId: ${n.route.id}]`,
                ),
              )
            : s(
                { request: t, params: n.params, context: o },
                ...(E !== void 0 ? [E] : []),
              ),
        g = (async () => {
          try {
            return { type: 'data', result: await (l ? l((k) => m(k)) : m()) }
          } catch (E) {
            return { type: 'error', result: E }
          }
        })()
      return Promise.race([g, y])
    }
  try {
    let s = n.route[e]
    if (r)
      if (s) {
        let d,
          [y] = await Promise.all([
            u(s).catch((m) => {
              d = m
            }),
            r,
          ])
        if (d !== void 0) throw d
        i = y
      } else if ((await r, (s = n.route[e]), s)) i = await u(s)
      else if (e === 'action') {
        let d = new URL(t.url),
          y = d.pathname + d.search
        throw Je(405, { method: t.method, pathname: y, routeId: n.route.id })
      } else return { type: 'data', result: void 0 }
    else if (s) i = await u(s)
    else {
      let d = new URL(t.url),
        y = d.pathname + d.search
      throw Je(404, { pathname: y })
    }
  } catch (s) {
    return { type: 'error', result: s }
  } finally {
    a && t.signal.removeEventListener('abort', a)
  }
  return i
}
async function Dv(e) {
  var r, l, o, i
  let { result: t, type: n } = e
  if (Ad(t)) {
    let a
    try {
      let u = t.headers.get('Content-Type')
      u && /\bapplication\/json\b/.test(u)
        ? t.body == null
          ? (a = null)
          : (a = await t.json())
        : (a = await t.text())
    } catch (u) {
      return { type: 'error', error: u }
    }
    return n === 'error'
      ? {
          type: 'error',
          error: new Lo(t.status, t.statusText, a),
          statusCode: t.status,
          headers: t.headers,
        }
      : { type: 'data', data: a, statusCode: t.status, headers: t.headers }
  }
  if (n === 'error') {
    if (dc(t)) {
      if (t.data instanceof Error)
        return {
          type: 'error',
          error: t.data,
          statusCode: (r = t.init) == null ? void 0 : r.status,
        }
      t = new Lo(
        ((l = t.init) == null ? void 0 : l.status) || 500,
        void 0,
        t.data,
      )
    }
    return { type: 'error', error: t, statusCode: Wo(t) ? t.status : void 0 }
  }
  return dc(t)
    ? {
        type: 'data',
        data: t.data,
        statusCode: (o = t.init) == null ? void 0 : o.status,
        headers:
          (i = t.init) != null && i.headers
            ? new Headers(t.init.headers)
            : void 0,
      }
    : { type: 'data', data: t }
}
function Mv(e, t, n, r, l) {
  let o = e.headers.get('Location')
  if (
    (K(
      o,
      'Redirects returned/thrown from loaders/actions must have a Location header',
    ),
    !Su.test(o))
  ) {
    let i = r.slice(0, r.findIndex((a) => a.route.id === n) + 1)
    ;(o = Sa(new URL(t.url), i, l, o)), e.headers.set('Location', o)
  }
  return e
}
function ic(e, t, n) {
  if (Su.test(e)) {
    let r = e,
      l = r.startsWith('//') ? new URL(t.protocol + r) : new URL(r),
      o = pt(l.pathname, n) != null
    if (l.origin === t.origin && o) return l.pathname + l.search + l.hash
  }
  return e
}
function Un(e, t, n, r) {
  let l = e.createURL($d(t)).toString(),
    o = { signal: n }
  if (r && ut(r.formMethod)) {
    let { formMethod: i, formEncType: a } = r
    ;(o.method = i.toUpperCase()),
      a === 'application/json'
        ? ((o.headers = new Headers({ 'Content-Type': a })),
          (o.body = JSON.stringify(r.json)))
        : a === 'text/plain'
          ? (o.body = r.text)
          : a === 'application/x-www-form-urlencoded' && r.formData
            ? (o.body = ka(r.formData))
            : (o.body = r.formData)
  }
  return new Request(l, o)
}
function ka(e) {
  let t = new URLSearchParams()
  for (let [n, r] of e.entries()) t.append(n, typeof r == 'string' ? r : r.name)
  return t
}
function ac(e) {
  let t = new FormData()
  for (let [n, r] of e.entries()) t.append(n, r)
  return t
}
function zv(e, t, n, r = !1, l = !1) {
  let o = {},
    i = null,
    a,
    u = !1,
    s = {},
    d = n && He(n[1]) ? n[1].error : void 0
  return (
    e.forEach((y) => {
      if (!(y.route.id in t)) return
      let m = y.route.id,
        g = t[m]
      if (
        (K(!En(g), 'Cannot handle redirect results in processLoaderData'),
        He(g))
      ) {
        let E = g.error
        if ((d !== void 0 && ((E = d), (d = void 0)), (i = i || {}), l))
          i[m] = E
        else {
          let k = yn(e, m)
          i[k.route.id] == null && (i[k.route.id] = E)
        }
        r || (o[m] = jd),
          u || ((u = !0), (a = Wo(g.error) ? g.error.status : 500)),
          g.headers && (s[m] = g.headers)
      } else
        (o[m] = g.data),
          g.statusCode && g.statusCode !== 200 && !u && (a = g.statusCode),
          g.headers && (s[m] = g.headers)
    }),
    d !== void 0 && n && ((i = { [n[0]]: d }), (o[n[0]] = void 0)),
    { loaderData: o, errors: i, statusCode: a || 200, loaderHeaders: s }
  )
}
function uc(e, t, n, r, l, o) {
  let { loaderData: i, errors: a } = zv(t, n, r)
  return (
    l.forEach((u) => {
      let { key: s, match: d, controller: y } = u,
        m = o[s]
      if (
        (K(m, 'Did not find corresponding fetcher result'),
        !(y && y.signal.aborted))
      )
        if (He(m)) {
          let g = yn(e.matches, d == null ? void 0 : d.route.id)
          ;(a && a[g.route.id]) || (a = { ...a, [g.route.id]: m.error }),
            e.fetchers.delete(s)
        } else if (En(m)) K(!1, 'Unhandled fetcher revalidation redirect')
        else {
          let g = Ht(m.data)
          e.fetchers.set(s, g)
        }
    }),
    { loaderData: i, errors: a }
  )
}
function sc(e, t, n, r) {
  let l = Object.entries(t)
    .filter(([, o]) => o !== jd)
    .reduce((o, [i, a]) => ((o[i] = a), o), {})
  for (let o of n) {
    let i = o.route.id
    if (
      (!t.hasOwnProperty(i) &&
        e.hasOwnProperty(i) &&
        o.route.loader &&
        (l[i] = e[i]),
      r && r.hasOwnProperty(i))
    )
      break
  }
  return l
}
function cc(e) {
  return e
    ? He(e[1])
      ? { actionData: {} }
      : { actionData: { [e[0]]: e[1].data } }
    : {}
}
function yn(e, t) {
  return (
    (t ? e.slice(0, e.findIndex((r) => r.route.id === t) + 1) : [...e])
      .reverse()
      .find((r) => r.route.hasErrorBoundary === !0) || e[0]
  )
}
function fc(e) {
  let t =
    e.length === 1
      ? e[0]
      : e.find((n) => n.index || !n.path || n.path === '/') || {
          id: '__shim-error-route__',
        }
  return {
    matches: [{ params: {}, pathname: '', pathnameBase: '', route: t }],
    route: t,
  }
}
function Je(
  e,
  { pathname: t, routeId: n, method: r, type: l, message: o } = {},
) {
  let i = 'Unknown Server Error',
    a = 'Unknown @remix-run/router error'
  return (
    e === 400
      ? ((i = 'Bad Request'),
        r && t && n
          ? (a = `You made a ${r} request to "${t}" but did not provide a \`loader\` for route "${n}", so there is no way to handle the request.`)
          : l === 'invalid-body' && (a = 'Unable to encode submission body'))
      : e === 403
        ? ((i = 'Forbidden'), (a = `Route "${n}" does not match URL "${t}"`))
        : e === 404
          ? ((i = 'Not Found'), (a = `No route matches URL "${t}"`))
          : e === 405 &&
            ((i = 'Method Not Allowed'),
            r && t && n
              ? (a = `You made a ${r.toUpperCase()} request to "${t}" but did not provide an \`action\` for route "${n}", so there is no way to handle the request.`)
              : r && (a = `Invalid request method "${r.toUpperCase()}"`)),
    new Lo(e || 500, i, new Error(a), !0)
  )
}
function jl(e) {
  let t = Object.entries(e)
  for (let n = t.length - 1; n >= 0; n--) {
    let [r, l] = t[n]
    if (En(l)) return { key: r, result: l }
  }
}
function $d(e) {
  let t = typeof e == 'string' ? cn(e) : e
  return on({ ...t, hash: '' })
}
function Ov(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search
    ? !1
    : e.hash === ''
      ? t.hash !== ''
      : e.hash === t.hash
        ? !0
        : t.hash !== ''
}
function Fv(e) {
  return Ad(e.result) && wv.has(e.result.status)
}
function He(e) {
  return e.type === 'error'
}
function En(e) {
  return (e && e.type) === 'redirect'
}
function dc(e) {
  return (
    typeof e == 'object' &&
    e != null &&
    'type' in e &&
    'data' in e &&
    'init' in e &&
    e.type === 'DataWithResponseInit'
  )
}
function Ad(e) {
  return (
    e != null &&
    typeof e.status == 'number' &&
    typeof e.statusText == 'string' &&
    typeof e.headers == 'object' &&
    typeof e.body < 'u'
  )
}
function Iv(e) {
  return gv.has(e.toUpperCase())
}
function ut(e) {
  return vv.has(e.toUpperCase())
}
function Eu(e) {
  return new URLSearchParams(e).getAll('index').some((t) => t === '')
}
function Mr(e, t) {
  let n = typeof t == 'string' ? cn(t).search : t.search
  if (e[e.length - 1].route.index && Eu(n || '')) return e[e.length - 1]
  let r = Od(e)
  return r[r.length - 1]
}
function pc(e) {
  let {
    formMethod: t,
    formAction: n,
    formEncType: r,
    text: l,
    formData: o,
    json: i,
  } = e
  if (!(!t || !n || !r)) {
    if (l != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: void 0,
        text: l,
      }
    if (o != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: o,
        json: void 0,
        text: void 0,
      }
    if (i !== void 0)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: i,
        text: void 0,
      }
  }
}
function Pi(e, t) {
  return t
    ? {
        state: 'loading',
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text,
      }
    : {
        state: 'loading',
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      }
}
function jv(e, t) {
  return {
    state: 'submitting',
    location: e,
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
  }
}
function Rr(e, t) {
  return e
    ? {
        state: 'loading',
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
      }
    : {
        state: 'loading',
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t,
      }
}
function Uv(e, t) {
  return {
    state: 'submitting',
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: t ? t.data : void 0,
  }
}
function Ht(e) {
  return {
    state: 'idle',
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  }
}
function $v(e, t) {
  try {
    let n = e.sessionStorage.getItem(Id)
    if (n) {
      let r = JSON.parse(n)
      for (let [l, o] of Object.entries(r || {}))
        o && Array.isArray(o) && t.set(l, new Set(o || []))
    }
  } catch {}
}
function Av(e, t) {
  if (t.size > 0) {
    let n = {}
    for (let [r, l] of t) n[r] = [...l]
    try {
      e.sessionStorage.setItem(Id, JSON.stringify(n))
    } catch (r) {
      rt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${r}).`,
      )
    }
  }
}
function Hv() {
  let e,
    t,
    n = new Promise((r, l) => {
      ;(e = async (o) => {
        r(o)
        try {
          await n
        } catch {}
      }),
        (t = async (o) => {
          l(o)
          try {
            await n
          } catch {}
        })
    })
  return { promise: n, resolve: e, reject: t }
}
var Dn = x.createContext(null)
Dn.displayName = 'DataRouter'
var fl = x.createContext(null)
fl.displayName = 'DataRouterState'
var ku = x.createContext({ isTransitioning: !1 })
ku.displayName = 'ViewTransition'
var Hd = x.createContext(new Map())
Hd.displayName = 'Fetchers'
var Bv = x.createContext(null)
Bv.displayName = 'Await'
var Et = x.createContext(null)
Et.displayName = 'Navigation'
var Qo = x.createContext(null)
Qo.displayName = 'Location'
var kt = x.createContext({ outlet: null, matches: [], isDataRoute: !1 })
kt.displayName = 'Route'
var xu = x.createContext(null)
xu.displayName = 'RouteError'
function Vv(e, { relative: t } = {}) {
  K(dl(), 'useHref() may be used only in the context of a <Router> component.')
  let { basename: n, navigator: r } = x.useContext(Et),
    { hash: l, pathname: o, search: i } = pl(e, { relative: t }),
    a = o
  return (
    n !== '/' && (a = o === '/' ? n : St([n, o])),
    r.createHref({ pathname: a, search: i, hash: l })
  )
}
function dl() {
  return x.useContext(Qo) != null
}
function Mn() {
  return (
    K(
      dl(),
      'useLocation() may be used only in the context of a <Router> component.',
    ),
    x.useContext(Qo).location
  )
}
var Bd =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.'
function Vd(e) {
  x.useContext(Et).static || x.useLayoutEffect(e)
}
function Wv() {
  let { isDataRoute: e } = x.useContext(kt)
  return e ? oy() : Qv()
}
function Qv() {
  K(
    dl(),
    'useNavigate() may be used only in the context of a <Router> component.',
  )
  let e = x.useContext(Dn),
    { basename: t, navigator: n } = x.useContext(Et),
    { matches: r } = x.useContext(kt),
    { pathname: l } = Mn(),
    o = JSON.stringify(gu(r)),
    i = x.useRef(!1)
  return (
    Vd(() => {
      i.current = !0
    }),
    x.useCallback(
      (u, s = {}) => {
        if ((rt(i.current, Bd), !i.current)) return
        if (typeof u == 'number') {
          n.go(u)
          return
        }
        let d = wu(u, JSON.parse(o), l, s.relative === 'path')
        e == null &&
          t !== '/' &&
          (d.pathname = d.pathname === '/' ? t : St([t, d.pathname])),
          (s.replace ? n.replace : n.push)(d, s.state, s)
      },
      [t, n, o, l, e],
    )
  )
}
var Kv = x.createContext(null)
function Yv(e) {
  let t = x.useContext(kt).outlet
  return t && x.createElement(Kv.Provider, { value: e }, t)
}
function pl(e, { relative: t } = {}) {
  let { matches: n } = x.useContext(kt),
    { pathname: r } = Mn(),
    l = JSON.stringify(gu(n))
  return x.useMemo(() => wu(e, JSON.parse(l), r, t === 'path'), [e, l, r, t])
}
function Xv(e, t, n, r) {
  K(
    dl(),
    'useRoutes() may be used only in the context of a <Router> component.',
  )
  let { navigator: l } = x.useContext(Et),
    { matches: o } = x.useContext(kt),
    i = o[o.length - 1],
    a = i ? i.params : {}
  i && i.pathname
  let u = i ? i.pathnameBase : '/'
  i && i.route
  let s = Mn(),
    d
  d = s
  let y = d.pathname || '/',
    m = y
  if (u !== '/') {
    let k = u.replace(/^\//, '').split('/')
    m = '/' + y.replace(/^\//, '').split('/').slice(k.length).join('/')
  }
  let g = Kt(e, { pathname: m })
  return bv(
    g &&
      g.map((k) =>
        Object.assign({}, k, {
          params: Object.assign({}, a, k.params),
          pathname: St([
            u,
            l.encodeLocation
              ? l.encodeLocation(k.pathname).pathname
              : k.pathname,
          ]),
          pathnameBase:
            k.pathnameBase === '/'
              ? u
              : St([
                  u,
                  l.encodeLocation
                    ? l.encodeLocation(k.pathnameBase).pathname
                    : k.pathnameBase,
                ]),
        }),
      ),
    o,
    n,
    r,
  )
}
function Gv() {
  let e = ly(),
    t = Wo(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    l = { padding: '0.5rem', backgroundColor: 'rgba(200,200,200, 0.5)' }
  return x.createElement(
    x.Fragment,
    null,
    x.createElement('h2', null, 'Unexpected Application Error!'),
    x.createElement('h3', { style: { fontStyle: 'italic' } }, t),
    n ? x.createElement('pre', { style: l }, n) : null,
    null,
  )
}
var Jv = x.createElement(Gv, null),
  Zv = class extends x.Component {
    constructor(e) {
      super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        })
    }
    static getDerivedStateFromError(e) {
      return { error: e }
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location ||
        (t.revalidation !== 'idle' && e.revalidation === 'idle')
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error !== void 0 ? e.error : t.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          }
    }
    componentDidCatch(e, t) {
      console.error(
        'React Router caught the following error during render',
        e,
        t,
      )
    }
    render() {
      return this.state.error !== void 0
        ? x.createElement(
            kt.Provider,
            { value: this.props.routeContext },
            x.createElement(xu.Provider, {
              value: this.state.error,
              children: this.props.component,
            }),
          )
        : this.props.children
    }
  }
function qv({ routeContext: e, match: t, children: n }) {
  let r = x.useContext(Dn)
  return (
    r &&
      r.static &&
      r.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = t.route.id),
    x.createElement(kt.Provider, { value: e }, n)
  )
}
function bv(e, t = [], n = null, r = null) {
  if (e == null) {
    if (!n) return null
    if (n.errors) e = n.matches
    else if (t.length === 0 && !n.initialized && n.matches.length > 0)
      e = n.matches
    else return null
  }
  let l = e,
    o = n == null ? void 0 : n.errors
  if (o != null) {
    let u = l.findIndex(
      (s) => s.route.id && (o == null ? void 0 : o[s.route.id]) !== void 0,
    )
    K(
      u >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(o).join(',')}`,
    ),
      (l = l.slice(0, Math.min(l.length, u + 1)))
  }
  let i = !1,
    a = -1
  if (n)
    for (let u = 0; u < l.length; u++) {
      let s = l[u]
      if (
        ((s.route.HydrateFallback || s.route.hydrateFallbackElement) && (a = u),
        s.route.id)
      ) {
        let { loaderData: d, errors: y } = n,
          m =
            s.route.loader &&
            !d.hasOwnProperty(s.route.id) &&
            (!y || y[s.route.id] === void 0)
        if (s.route.lazy || m) {
          ;(i = !0), a >= 0 ? (l = l.slice(0, a + 1)) : (l = [l[0]])
          break
        }
      }
    }
  return l.reduceRight((u, s, d) => {
    let y,
      m = !1,
      g = null,
      E = null
    n &&
      ((y = o && s.route.id ? o[s.route.id] : void 0),
      (g = s.route.errorElement || Jv),
      i &&
        (a < 0 && d === 0
          ? (iy(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration',
            ),
            (m = !0),
            (E = null))
          : a === d &&
            ((m = !0), (E = s.route.hydrateFallbackElement || null))))
    let k = t.concat(l.slice(0, d + 1)),
      T = () => {
        let f
        return (
          y
            ? (f = g)
            : m
              ? (f = E)
              : s.route.Component
                ? (f = x.createElement(s.route.Component, null))
                : s.route.element
                  ? (f = s.route.element)
                  : (f = u),
          x.createElement(qv, {
            match: s,
            routeContext: { outlet: u, matches: k, isDataRoute: n != null },
            children: f,
          })
        )
      }
    return n && (s.route.ErrorBoundary || s.route.errorElement || d === 0)
      ? x.createElement(Zv, {
          location: n.location,
          revalidation: n.revalidation,
          component: g,
          error: y,
          children: T(),
          routeContext: { outlet: null, matches: k, isDataRoute: !0 },
        })
      : T()
  }, null)
}
function Cu(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function ey(e) {
  let t = x.useContext(Dn)
  return K(t, Cu(e)), t
}
function ty(e) {
  let t = x.useContext(fl)
  return K(t, Cu(e)), t
}
function ny(e) {
  let t = x.useContext(kt)
  return K(t, Cu(e)), t
}
function Pu(e) {
  let t = ny(e),
    n = t.matches[t.matches.length - 1]
  return (
    K(n.route.id, `${e} can only be used on routes that contain a unique "id"`),
    n.route.id
  )
}
function ry() {
  return Pu('useRouteId')
}
function ly() {
  var r
  let e = x.useContext(xu),
    t = ty('useRouteError'),
    n = Pu('useRouteError')
  return e !== void 0 ? e : (r = t.errors) == null ? void 0 : r[n]
}
function oy() {
  let { router: e } = ey('useNavigate'),
    t = Pu('useNavigate'),
    n = x.useRef(!1)
  return (
    Vd(() => {
      n.current = !0
    }),
    x.useCallback(
      async (l, o = {}) => {
        rt(n.current, Bd),
          n.current &&
            (typeof l == 'number'
              ? e.navigate(l)
              : await e.navigate(l, { fromRouteId: t, ...o }))
      },
      [e, t],
    )
  )
}
var hc = {}
function iy(e, t, n) {
  hc[e] || ((hc[e] = !0), rt(!1, n))
}
var mc = {}
function vc(e, t) {
  !e && !mc[t] && ((mc[t] = !0), console.warn(t))
}
function ay(e) {
  let t = {
    hasErrorBoundary:
      e.hasErrorBoundary || e.ErrorBoundary != null || e.errorElement != null,
  }
  return (
    e.Component &&
      Object.assign(t, {
        element: x.createElement(e.Component),
        Component: void 0,
      }),
    e.HydrateFallback &&
      Object.assign(t, {
        hydrateFallbackElement: x.createElement(e.HydrateFallback),
        HydrateFallback: void 0,
      }),
    e.ErrorBoundary &&
      Object.assign(t, {
        errorElement: x.createElement(e.ErrorBoundary),
        ErrorBoundary: void 0,
      }),
    t
  )
}
var uy = class {
  constructor() {
    ;(this.status = 'pending'),
      (this.promise = new Promise((e, t) => {
        ;(this.resolve = (n) => {
          this.status === 'pending' && ((this.status = 'resolved'), e(n))
        }),
          (this.reject = (n) => {
            this.status === 'pending' && ((this.status = 'rejected'), t(n))
          })
      }))
  }
}
function sy({ router: e, flushSync: t }) {
  let [n, r] = x.useState(e.state),
    [l, o] = x.useState(),
    [i, a] = x.useState({ isTransitioning: !1 }),
    [u, s] = x.useState(),
    [d, y] = x.useState(),
    [m, g] = x.useState(),
    E = x.useRef(new Map()),
    k = x.useCallback(
      (p, { deletedFetchers: C, flushSync: h, viewTransitionOpts: R }) => {
        C.forEach((_) => E.current.delete(_)),
          p.fetchers.forEach((_, A) => {
            _.data !== void 0 && E.current.set(A, _.data)
          }),
          vc(
            h === !1 || t != null,
            'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.',
          )
        let N =
          e.window != null &&
          e.window.document != null &&
          typeof e.window.document.startViewTransition == 'function'
        if (
          (vc(
            R == null || N,
            'You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available.',
          ),
          !R || !N)
        ) {
          t && h ? t(() => r(p)) : x.startTransition(() => r(p))
          return
        }
        if (t && h) {
          t(() => {
            d && (u && u.resolve(), d.skipTransition()),
              a({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: R.currentLocation,
                nextLocation: R.nextLocation,
              })
          })
          let _ = e.window.document.startViewTransition(() => {
            t(() => r(p))
          })
          _.finished.finally(() => {
            t(() => {
              s(void 0), y(void 0), o(void 0), a({ isTransitioning: !1 })
            })
          }),
            t(() => y(_))
          return
        }
        d
          ? (u && u.resolve(),
            d.skipTransition(),
            g({
              state: p,
              currentLocation: R.currentLocation,
              nextLocation: R.nextLocation,
            }))
          : (o(p),
            a({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: R.currentLocation,
              nextLocation: R.nextLocation,
            }))
      },
      [e.window, t, d, u],
    )
  x.useLayoutEffect(() => e.subscribe(k), [e, k]),
    x.useEffect(() => {
      i.isTransitioning && !i.flushSync && s(new uy())
    }, [i]),
    x.useEffect(() => {
      if (u && l && e.window) {
        let p = l,
          C = u.promise,
          h = e.window.document.startViewTransition(async () => {
            x.startTransition(() => r(p)), await C
          })
        h.finished.finally(() => {
          s(void 0), y(void 0), o(void 0), a({ isTransitioning: !1 })
        }),
          y(h)
      }
    }, [l, u, e.window]),
    x.useEffect(() => {
      u && l && n.location.key === l.location.key && u.resolve()
    }, [u, d, n.location, l]),
    x.useEffect(() => {
      !i.isTransitioning &&
        m &&
        (o(m.state),
        a({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: m.currentLocation,
          nextLocation: m.nextLocation,
        }),
        g(void 0))
    }, [i.isTransitioning, m])
  let T = x.useMemo(
      () => ({
        createHref: e.createHref,
        encodeLocation: e.encodeLocation,
        go: (p) => e.navigate(p),
        push: (p, C, h) =>
          e.navigate(p, {
            state: C,
            preventScrollReset: h == null ? void 0 : h.preventScrollReset,
          }),
        replace: (p, C, h) =>
          e.navigate(p, {
            replace: !0,
            state: C,
            preventScrollReset: h == null ? void 0 : h.preventScrollReset,
          }),
      }),
      [e],
    ),
    f = e.basename || '/',
    c = x.useMemo(
      () => ({ router: e, navigator: T, static: !1, basename: f }),
      [e, T, f],
    )
  return x.createElement(
    x.Fragment,
    null,
    x.createElement(
      Dn.Provider,
      { value: c },
      x.createElement(
        fl.Provider,
        { value: n },
        x.createElement(
          Hd.Provider,
          { value: E.current },
          x.createElement(
            ku.Provider,
            { value: i },
            x.createElement(
              py,
              {
                basename: f,
                location: n.location,
                navigationType: n.historyAction,
                navigator: T,
              },
              x.createElement(cy, {
                routes: e.routes,
                future: e.future,
                state: n,
              }),
            ),
          ),
        ),
      ),
    ),
    null,
  )
}
var cy = x.memo(fy)
function fy({ routes: e, future: t, state: n }) {
  return Xv(e, void 0, n, t)
}
function dy(e) {
  return Yv(e.context)
}
function py({
  basename: e = '/',
  children: t = null,
  location: n,
  navigationType: r = 'POP',
  navigator: l,
  static: o = !1,
}) {
  K(
    !dl(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.',
  )
  let i = e.replace(/^\/*/, '/'),
    a = x.useMemo(
      () => ({ basename: i, navigator: l, static: o, future: {} }),
      [i, l, o],
    )
  typeof n == 'string' && (n = cn(n))
  let {
      pathname: u = '/',
      search: s = '',
      hash: d = '',
      state: y = null,
      key: m = 'default',
    } = n,
    g = x.useMemo(() => {
      let E = pt(u, i)
      return E == null
        ? null
        : {
            location: { pathname: E, search: s, hash: d, state: y, key: m },
            navigationType: r,
          }
    }, [i, u, s, d, y, m, r])
  return (
    rt(
      g != null,
      `<Router basename="${i}"> is not able to match the URL "${u}${s}${d}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    g == null
      ? null
      : x.createElement(
          Et.Provider,
          { value: a },
          x.createElement(Qo.Provider, { children: t, value: g }),
        )
  )
}
var ql = 'get',
  bl = 'application/x-www-form-urlencoded'
function Ko(e) {
  return e != null && typeof e.tagName == 'string'
}
function hy(e) {
  return Ko(e) && e.tagName.toLowerCase() === 'button'
}
function my(e) {
  return Ko(e) && e.tagName.toLowerCase() === 'form'
}
function vy(e) {
  return Ko(e) && e.tagName.toLowerCase() === 'input'
}
function yy(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
}
function gy(e, t) {
  return e.button === 0 && (!t || t === '_self') && !yy(e)
}
var Ul = null
function wy() {
  if (Ul === null)
    try {
      new FormData(document.createElement('form'), 0), (Ul = !1)
    } catch {
      Ul = !0
    }
  return Ul
}
var Sy = new Set([
  'application/x-www-form-urlencoded',
  'multipart/form-data',
  'text/plain',
])
function Ri(e) {
  return e != null && !Sy.has(e)
    ? (rt(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${bl}"`,
      ),
      null)
    : e
}
function Ey(e, t) {
  let n, r, l, o, i
  if (my(e)) {
    let a = e.getAttribute('action')
    ;(r = a ? pt(a, t) : null),
      (n = e.getAttribute('method') || ql),
      (l = Ri(e.getAttribute('enctype')) || bl),
      (o = new FormData(e))
  } else if (hy(e) || (vy(e) && (e.type === 'submit' || e.type === 'image'))) {
    let a = e.form
    if (a == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      )
    let u = e.getAttribute('formaction') || a.getAttribute('action')
    if (
      ((r = u ? pt(u, t) : null),
      (n = e.getAttribute('formmethod') || a.getAttribute('method') || ql),
      (l =
        Ri(e.getAttribute('formenctype')) ||
        Ri(a.getAttribute('enctype')) ||
        bl),
      (o = new FormData(a, e)),
      !wy())
    ) {
      let { name: s, type: d, value: y } = e
      if (d === 'image') {
        let m = s ? `${s}.` : ''
        o.append(`${m}x`, '0'), o.append(`${m}y`, '0')
      } else s && o.append(s, y)
    }
  } else {
    if (Ko(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      )
    ;(n = ql), (r = null), (l = bl), (i = e)
  }
  return (
    o && l === 'text/plain' && ((i = o), (o = void 0)),
    { action: r, method: n.toLowerCase(), encType: l, formData: o, body: i }
  )
}
function Ru(e, t) {
  if (e === !1 || e === null || typeof e > 'u') throw new Error(t)
}
async function ky(e, t) {
  if (e.id in t) return t[e.id]
  try {
    let n = await import(e.module)
    return (t[e.id] = n), n
  } catch (n) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`,
      ),
      console.error(n),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    )
  }
}
function xy(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === 'preload' &&
        typeof e.imageSrcSet == 'string' &&
        typeof e.imageSizes == 'string'
      : typeof e.rel == 'string' && typeof e.href == 'string'
}
async function Cy(e, t, n) {
  let r = await Promise.all(
    e.map(async (l) => {
      let o = t.routes[l.route.id]
      if (o) {
        let i = await ky(o, n)
        return i.links ? i.links() : []
      }
      return []
    }),
  )
  return _y(
    r
      .flat(1)
      .filter(xy)
      .filter((l) => l.rel === 'stylesheet' || l.rel === 'preload')
      .map((l) =>
        l.rel === 'stylesheet'
          ? { ...l, rel: 'prefetch', as: 'style' }
          : { ...l, rel: 'prefetch' },
      ),
  )
}
function yc(e, t, n, r, l, o) {
  let i = (u, s) => (n[s] ? u.route.id !== n[s].route.id : !0),
    a = (u, s) => {
      var d
      return (
        n[s].pathname !== u.pathname ||
        (((d = n[s].route.path) == null ? void 0 : d.endsWith('*')) &&
          n[s].params['*'] !== u.params['*'])
      )
    }
  return o === 'assets'
    ? t.filter((u, s) => i(u, s) || a(u, s))
    : o === 'data'
      ? t.filter((u, s) => {
          var y
          let d = r.routes[u.route.id]
          if (!d || !d.hasLoader) return !1
          if (i(u, s) || a(u, s)) return !0
          if (u.route.shouldRevalidate) {
            let m = u.route.shouldRevalidate({
              currentUrl: new URL(
                l.pathname + l.search + l.hash,
                window.origin,
              ),
              currentParams: ((y = n[0]) == null ? void 0 : y.params) || {},
              nextUrl: new URL(e, window.origin),
              nextParams: u.params,
              defaultShouldRevalidate: !0,
            })
            if (typeof m == 'boolean') return m
          }
          return !0
        })
      : []
}
function Py(e, t) {
  return Ry(
    e
      .map((n) => {
        let r = t.routes[n.route.id]
        if (!r) return []
        let l = [r.module]
        return r.imports && (l = l.concat(r.imports)), l
      })
      .flat(1),
  )
}
function Ry(e) {
  return [...new Set(e)]
}
function Ly(e) {
  let t = {},
    n = Object.keys(e).sort()
  for (let r of n) t[r] = e[r]
  return t
}
function _y(e, t) {
  let n = new Set()
  return (
    new Set(t),
    e.reduce((r, l) => {
      let o = JSON.stringify(Ly(l))
      return n.has(o) || (n.add(o), r.push({ key: o, link: l })), r
    }, [])
  )
}
function Ty(e) {
  let t =
    typeof e == 'string'
      ? new URL(
          e,
          typeof window > 'u'
            ? 'server://singlefetch/'
            : window.location.origin,
        )
      : e
  return (
    t.pathname === '/'
      ? (t.pathname = '_root.data')
      : (t.pathname = `${t.pathname.replace(/\/$/, '')}.data`),
    t
  )
}
function Ny() {
  let e = x.useContext(Dn)
  return (
    Ru(
      e,
      'You must render this element inside a <DataRouterContext.Provider> element',
    ),
    e
  )
}
function Dy() {
  let e = x.useContext(fl)
  return (
    Ru(
      e,
      'You must render this element inside a <DataRouterStateContext.Provider> element',
    ),
    e
  )
}
var Lu = x.createContext(void 0)
Lu.displayName = 'FrameworkContext'
function Wd() {
  let e = x.useContext(Lu)
  return (
    Ru(e, 'You must render this element inside a <HydratedRouter> element'), e
  )
}
function My(e, t) {
  let n = x.useContext(Lu),
    [r, l] = x.useState(!1),
    [o, i] = x.useState(!1),
    {
      onFocus: a,
      onBlur: u,
      onMouseEnter: s,
      onMouseLeave: d,
      onTouchStart: y,
    } = t,
    m = x.useRef(null)
  x.useEffect(() => {
    if ((e === 'render' && i(!0), e === 'viewport')) {
      let k = (f) => {
          f.forEach((c) => {
            i(c.isIntersecting)
          })
        },
        T = new IntersectionObserver(k, { threshold: 0.5 })
      return (
        m.current && T.observe(m.current),
        () => {
          T.disconnect()
        }
      )
    }
  }, [e]),
    x.useEffect(() => {
      if (r) {
        let k = setTimeout(() => {
          i(!0)
        }, 100)
        return () => {
          clearTimeout(k)
        }
      }
    }, [r])
  let g = () => {
      l(!0)
    },
    E = () => {
      l(!1), i(!1)
    }
  return n
    ? e !== 'intent'
      ? [o, m, {}]
      : [
          o,
          m,
          {
            onFocus: Lr(a, g),
            onBlur: Lr(u, E),
            onMouseEnter: Lr(s, g),
            onMouseLeave: Lr(d, E),
            onTouchStart: Lr(y, g),
          },
        ]
    : [!1, m, {}]
}
function Lr(e, t) {
  return (n) => {
    e && e(n), n.defaultPrevented || t(n)
  }
}
function zy({ page: e, ...t }) {
  let { router: n } = Ny(),
    r = x.useMemo(() => Kt(n.routes, e, n.basename), [n.routes, e, n.basename])
  return r
    ? x.createElement(Fy, { page: e, matches: r, ...t })
    : (console.warn(`Tried to prefetch ${e} but no routes matched.`), null)
}
function Oy(e) {
  let { manifest: t, routeModules: n } = Wd(),
    [r, l] = x.useState([])
  return (
    x.useEffect(() => {
      let o = !1
      return (
        Cy(e, t, n).then((i) => {
          o || l(i)
        }),
        () => {
          o = !0
        }
      )
    }, [e, t, n]),
    r
  )
}
function Fy({ page: e, matches: t, ...n }) {
  let r = Mn(),
    { manifest: l, routeModules: o } = Wd(),
    { loaderData: i, matches: a } = Dy(),
    u = x.useMemo(() => yc(e, t, a, l, r, 'data'), [e, t, a, l, r]),
    s = x.useMemo(() => yc(e, t, a, l, r, 'assets'), [e, t, a, l, r]),
    d = x.useMemo(() => {
      if (e === r.pathname + r.search + r.hash) return []
      let g = new Set(),
        E = !1
      if (
        (t.forEach((T) => {
          var c
          let f = l.routes[T.route.id]
          !f ||
            !f.hasLoader ||
            ((!u.some((p) => p.route.id === T.route.id) &&
              T.route.id in i &&
              (c = o[T.route.id]) != null &&
              c.shouldRevalidate) ||
            f.hasClientLoader
              ? (E = !0)
              : g.add(T.route.id))
        }),
        g.size === 0)
      )
        return []
      let k = Ty(e)
      return (
        E &&
          g.size > 0 &&
          k.searchParams.set(
            '_routes',
            t
              .filter((T) => g.has(T.route.id))
              .map((T) => T.route.id)
              .join(','),
          ),
        [k.pathname + k.search]
      )
    }, [i, r, l, u, t, e, o]),
    y = x.useMemo(() => Py(s, l), [s, l]),
    m = Oy(s)
  return x.createElement(
    x.Fragment,
    null,
    d.map((g) =>
      x.createElement('link', {
        key: g,
        rel: 'prefetch',
        as: 'fetch',
        href: g,
        ...n,
      }),
    ),
    y.map((g) =>
      x.createElement('link', { key: g, rel: 'modulepreload', href: g, ...n }),
    ),
    m.map(({ key: g, link: E }) => x.createElement('link', { key: g, ...E })),
  )
}
function Iy(...e) {
  return (t) => {
    e.forEach((n) => {
      typeof n == 'function' ? n(t) : n != null && (n.current = t)
    })
  }
}
var Qd =
  typeof window < 'u' &&
  typeof window.document < 'u' &&
  typeof window.document.createElement < 'u'
try {
  Qd && (window.__reactRouterVersion = '7.0.0')
} catch {}
function jy(e, t) {
  return xv({
    basename: t == null ? void 0 : t.basename,
    future: t == null ? void 0 : t.future,
    history: Ym({ window: t == null ? void 0 : t.window }),
    hydrationData: Uy(),
    routes: e,
    mapRouteProperties: ay,
    dataStrategy: t == null ? void 0 : t.dataStrategy,
    patchRoutesOnNavigation: t == null ? void 0 : t.patchRoutesOnNavigation,
    window: t == null ? void 0 : t.window,
  }).initialize()
}
function Uy() {
  let e = window == null ? void 0 : window.__staticRouterHydrationData
  return e && e.errors && (e = { ...e, errors: $y(e.errors) }), e
}
function $y(e) {
  if (!e) return null
  let t = Object.entries(e),
    n = {}
  for (let [r, l] of t)
    if (l && l.__type === 'RouteErrorResponse')
      n[r] = new Lo(l.status, l.statusText, l.data, l.internal === !0)
    else if (l && l.__type === 'Error') {
      if (l.__subType) {
        let o = window[l.__subType]
        if (typeof o == 'function')
          try {
            let i = new o(l.message)
            ;(i.stack = ''), (n[r] = i)
          } catch {}
      }
      if (n[r] == null) {
        let o = new Error(l.message)
        ;(o.stack = ''), (n[r] = o)
      }
    } else n[r] = l
  return n
}
var Kd = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  _u = x.forwardRef(function (
    {
      onClick: t,
      discover: n = 'render',
      prefetch: r = 'none',
      relative: l,
      reloadDocument: o,
      replace: i,
      state: a,
      target: u,
      to: s,
      preventScrollReset: d,
      viewTransition: y,
      ...m
    },
    g,
  ) {
    let { basename: E } = x.useContext(Et),
      k = typeof s == 'string' && Kd.test(s),
      T,
      f = !1
    if (typeof s == 'string' && k && ((T = s), Qd))
      try {
        let A = new URL(window.location.href),
          j = s.startsWith('//') ? new URL(A.protocol + s) : new URL(s),
          ne = pt(j.pathname, E)
        j.origin === A.origin && ne != null
          ? (s = ne + j.search + j.hash)
          : (f = !0)
      } catch {
        rt(
          !1,
          `<Link to="${s}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
        )
      }
    let c = Vv(s, { relative: l }),
      [p, C, h] = My(r, m),
      R = Vy(s, {
        replace: i,
        state: a,
        target: u,
        preventScrollReset: d,
        relative: l,
        viewTransition: y,
      })
    function N(A) {
      t && t(A), A.defaultPrevented || R(A)
    }
    let _ = x.createElement('a', {
      ...m,
      ...h,
      href: T || c,
      onClick: f || o ? t : N,
      ref: Iy(g, C),
      target: u,
      'data-discover': !k && n === 'render' ? 'true' : void 0,
    })
    return p && !k
      ? x.createElement(x.Fragment, null, _, x.createElement(zy, { page: c }))
      : _
  })
_u.displayName = 'Link'
var Ay = x.forwardRef(function (
  {
    'aria-current': t = 'page',
    caseSensitive: n = !1,
    className: r = '',
    end: l = !1,
    style: o,
    to: i,
    viewTransition: a,
    children: u,
    ...s
  },
  d,
) {
  let y = pl(i, { relative: s.relative }),
    m = Mn(),
    g = x.useContext(fl),
    { navigator: E, basename: k } = x.useContext(Et),
    T = g != null && Xy(y) && a === !0,
    f = E.encodeLocation ? E.encodeLocation(y).pathname : y.pathname,
    c = m.pathname,
    p =
      g && g.navigation && g.navigation.location
        ? g.navigation.location.pathname
        : null
  n ||
    ((c = c.toLowerCase()),
    (p = p ? p.toLowerCase() : null),
    (f = f.toLowerCase())),
    p && k && (p = pt(p, k) || p)
  const C = f !== '/' && f.endsWith('/') ? f.length - 1 : f.length
  let h = c === f || (!l && c.startsWith(f) && c.charAt(C) === '/'),
    R =
      p != null &&
      (p === f || (!l && p.startsWith(f) && p.charAt(f.length) === '/')),
    N = { isActive: h, isPending: R, isTransitioning: T },
    _ = h ? t : void 0,
    A
  typeof r == 'function'
    ? (A = r(N))
    : (A = [
        r,
        h ? 'active' : null,
        R ? 'pending' : null,
        T ? 'transitioning' : null,
      ]
        .filter(Boolean)
        .join(' '))
  let j = typeof o == 'function' ? o(N) : o
  return x.createElement(
    _u,
    {
      ...s,
      'aria-current': _,
      className: A,
      ref: d,
      style: j,
      to: i,
      viewTransition: a,
    },
    typeof u == 'function' ? u(N) : u,
  )
})
Ay.displayName = 'NavLink'
var Hy = x.forwardRef(
  (
    {
      discover: e = 'render',
      fetcherKey: t,
      navigate: n,
      reloadDocument: r,
      replace: l,
      state: o,
      method: i = ql,
      action: a,
      onSubmit: u,
      relative: s,
      preventScrollReset: d,
      viewTransition: y,
      ...m
    },
    g,
  ) => {
    let E = Ky(),
      k = Yy(a, { relative: s }),
      T = i.toLowerCase() === 'get' ? 'get' : 'post',
      f = typeof a == 'string' && Kd.test(a),
      c = (p) => {
        if ((u && u(p), p.defaultPrevented)) return
        p.preventDefault()
        let C = p.nativeEvent.submitter,
          h = (C == null ? void 0 : C.getAttribute('formmethod')) || i
        E(C || p.currentTarget, {
          fetcherKey: t,
          method: h,
          navigate: n,
          replace: l,
          state: o,
          relative: s,
          preventScrollReset: d,
          viewTransition: y,
        })
      }
    return x.createElement('form', {
      ref: g,
      method: T,
      action: k,
      onSubmit: r ? u : c,
      ...m,
      'data-discover': !f && e === 'render' ? 'true' : void 0,
    })
  },
)
Hy.displayName = 'Form'
function By(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function Yd(e) {
  let t = x.useContext(Dn)
  return K(t, By(e)), t
}
function Vy(
  e,
  {
    target: t,
    replace: n,
    state: r,
    preventScrollReset: l,
    relative: o,
    viewTransition: i,
  } = {},
) {
  let a = Wv(),
    u = Mn(),
    s = pl(e, { relative: o })
  return x.useCallback(
    (d) => {
      if (gy(d, t)) {
        d.preventDefault()
        let y = n !== void 0 ? n : on(u) === on(s)
        a(e, {
          replace: y,
          state: r,
          preventScrollReset: l,
          relative: o,
          viewTransition: i,
        })
      }
    },
    [u, a, s, n, r, t, e, l, o, i],
  )
}
var Wy = 0,
  Qy = () => `__${String(++Wy)}__`
function Ky() {
  let { router: e } = Yd('useSubmit'),
    { basename: t } = x.useContext(Et),
    n = ry()
  return x.useCallback(
    async (r, l = {}) => {
      let { action: o, method: i, encType: a, formData: u, body: s } = Ey(r, t)
      if (l.navigate === !1) {
        let d = l.fetcherKey || Qy()
        await e.fetch(d, n, l.action || o, {
          preventScrollReset: l.preventScrollReset,
          formData: u,
          body: s,
          formMethod: l.method || i,
          formEncType: l.encType || a,
          flushSync: l.flushSync,
        })
      } else
        await e.navigate(l.action || o, {
          preventScrollReset: l.preventScrollReset,
          formData: u,
          body: s,
          formMethod: l.method || i,
          formEncType: l.encType || a,
          replace: l.replace,
          state: l.state,
          fromRouteId: n,
          flushSync: l.flushSync,
          viewTransition: l.viewTransition,
        })
    },
    [e, t, n],
  )
}
function Yy(e, { relative: t } = {}) {
  let { basename: n } = x.useContext(Et),
    r = x.useContext(kt)
  K(r, 'useFormAction must be used inside a RouteContext')
  let [l] = r.matches.slice(-1),
    o = { ...pl(e || '.', { relative: t }) },
    i = Mn()
  if (e == null) {
    o.search = i.search
    let a = new URLSearchParams(o.search),
      u = a.getAll('index')
    if (u.some((d) => d === '')) {
      a.delete('index'), u.filter((y) => y).forEach((y) => a.append('index', y))
      let d = a.toString()
      o.search = d ? `?${d}` : ''
    }
  }
  return (
    (!e || e === '.') &&
      l.route.index &&
      (o.search = o.search ? o.search.replace(/^\?/, '?index&') : '?index'),
    n !== '/' && (o.pathname = o.pathname === '/' ? n : St([n, o.pathname])),
    on(o)
  )
}
function Xy(e, t = {}) {
  let n = x.useContext(ku)
  K(
    n != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  )
  let { basename: r } = Yd('useViewTransitionState'),
    l = pl(e, { relative: t.relative })
  if (!n.isTransitioning) return !1
  let o = pt(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    i = pt(n.nextLocation.pathname, r) || n.nextLocation.pathname
  return Ro(l.pathname, i) != null || Ro(l.pathname, o) != null
}
new TextEncoder()
/**
 * react-router v7.0.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Gy(e) {
  return x.createElement(sy, { flushSync: Dd.flushSync, ...e })
}
const Jy = () =>
    pe.jsxs('div', {
      className:
        'p-4 w-full flex gap-x-8 justify-between items-center bg-ATECblue text-white md:px-16',
      children: [
        pe.jsx('img', {
          className: 'h-12',
          src: '/images/ATEC-logo-white.png',
          alt: 'AdvanceTEC',
        }),
        pe.jsx('div', {
          className: 'flex gap-x-4',
          children: pe.jsx(_u, { to: '/', children: 'Home' }),
        }),
      ],
    }),
  Zy = () =>
    pe.jsx('div', {
      className: 'flex flex-col text-center p-8 text-white bg-ATECblue',
      children: pe.jsx('div', {
        children: 'Contact matthewb@advancetecllc.com for support',
      }),
    }),
  qy = () =>
    pe.jsxs('div', {
      className: 'flex flex-col min-h-screen',
      children: [pe.jsx(Jy, {}), pe.jsx(dy, {}), pe.jsx(Zy, {})],
    }),
  by = jy([
    {
      path: '/',
      element: pe.jsx(qy, {}),
      errorElement: pe.jsx(Fm, {}),
      children: [{ path: '/', element: pe.jsx(Im, {}) }],
    },
  ]),
  e0 = () => pe.jsx(Gy, { router: by }),
  Xd = document.getElementById('root')
if (!Xd)
  throw new Error(
    "Root element not found. Make sure there's an element with id='root' in your HTML.",
  )
Li.createRoot(Xd).render(pe.jsx(e0, {}))
