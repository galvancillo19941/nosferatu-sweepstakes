"use strict";
(() => {
  // node_modules/@lit/reactive-element/css-tag.js
  var t = globalThis;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t3, e4, o4) {
      if (this._$cssResult$ = true, o4 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t3, this.t = e4;
    }
    get styleSheet() {
      let t3 = this.o;
      const s4 = this.t;
      if (e && void 0 === t3) {
        const e4 = void 0 !== s4 && 1 === s4.length;
        e4 && (t3 = o.get(s4)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && o.set(s4, t3));
      }
      return t3;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t3) => new n("string" == typeof t3 ? t3 : t3 + "", void 0, s);
  var S = (s4, o4) => {
    if (e)
      s4.adoptedStyleSheets = o4.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet);
    else
      for (const e4 of o4) {
        const o5 = document.createElement("style"), n4 = t.litNonce;
        void 0 !== n4 && o5.setAttribute("nonce", n4), o5.textContent = e4.cssText, s4.appendChild(o5);
      }
  };
  var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
    let e4 = "";
    for (const s4 of t4.cssRules)
      e4 += s4.cssText;
    return r(e4);
  })(t3) : t3;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: r2, getOwnPropertyNames: h, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t3, s4) => t3;
  var u = { toAttribute(t3, s4) {
    switch (s4) {
      case Boolean:
        t3 = t3 ? l : null;
        break;
      case Object:
      case Array:
        t3 = null == t3 ? t3 : JSON.stringify(t3);
    }
    return t3;
  }, fromAttribute(t3, s4) {
    let i4 = t3;
    switch (s4) {
      case Boolean:
        i4 = null !== t3;
        break;
      case Number:
        i4 = null === t3 ? null : Number(t3);
        break;
      case Object:
      case Array:
        try {
          i4 = JSON.parse(t3);
        } catch (t4) {
          i4 = null;
        }
    }
    return i4;
  } };
  var f = (t3, s4) => !i2(t3, s4);
  var y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var b = class extends HTMLElement {
    static addInitializer(t3) {
      this._$Ei(), (this.l ??= []).push(t3);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t3, s4 = y) {
      if (s4.state && (s4.attribute = false), this._$Ei(), this.elementProperties.set(t3, s4), !s4.noAccessor) {
        const i4 = Symbol(), r5 = this.getPropertyDescriptor(t3, i4, s4);
        void 0 !== r5 && e2(this.prototype, t3, r5);
      }
    }
    static getPropertyDescriptor(t3, s4, i4) {
      const { get: e4, set: h3 } = r2(this.prototype, t3) ?? { get() {
        return this[s4];
      }, set(t4) {
        this[s4] = t4;
      } };
      return { get() {
        return e4?.call(this);
      }, set(s5) {
        const r5 = e4?.call(this);
        h3.call(this, s5), this.requestUpdate(t3, r5, i4);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t3) {
      return this.elementProperties.get(t3) ?? y;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties")))
        return;
      const t3 = n2(this);
      t3.finalize(), void 0 !== t3.l && (this.l = [...t3.l]), this.elementProperties = new Map(t3.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized")))
        return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t4 = this.properties, s4 = [...h(t4), ...o2(t4)];
        for (const i4 of s4)
          this.createProperty(i4, t4[i4]);
      }
      const t3 = this[Symbol.metadata];
      if (null !== t3) {
        const s4 = litPropertyMetadata.get(t3);
        if (void 0 !== s4)
          for (const [t4, i4] of s4)
            this.elementProperties.set(t4, i4);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t4, s4] of this.elementProperties) {
        const i4 = this._$Eu(t4, s4);
        void 0 !== i4 && this._$Eh.set(i4, t4);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s4) {
      const i4 = [];
      if (Array.isArray(s4)) {
        const e4 = new Set(s4.flat(1 / 0).reverse());
        for (const s5 of e4)
          i4.unshift(c(s5));
      } else
        void 0 !== s4 && i4.push(c(s4));
      return i4;
    }
    static _$Eu(t3, s4) {
      const i4 = s4.attribute;
      return false === i4 ? void 0 : "string" == typeof i4 ? i4 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t3) => t3(this));
    }
    addController(t3) {
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t3), void 0 !== this.renderRoot && this.isConnected && t3.hostConnected?.();
    }
    removeController(t3) {
      this._$EO?.delete(t3);
    }
    _$E_() {
      const t3 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
      for (const i4 of s4.keys())
        this.hasOwnProperty(i4) && (t3.set(i4, this[i4]), delete this[i4]);
      t3.size > 0 && (this._$Ep = t3);
    }
    createRenderRoot() {
      const t3 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t3, this.constructor.elementStyles), t3;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t3) => t3.hostConnected?.());
    }
    enableUpdating(t3) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t3) => t3.hostDisconnected?.());
    }
    attributeChangedCallback(t3, s4, i4) {
      this._$AK(t3, i4);
    }
    _$EC(t3, s4) {
      const i4 = this.constructor.elementProperties.get(t3), e4 = this.constructor._$Eu(t3, i4);
      if (void 0 !== e4 && true === i4.reflect) {
        const r5 = (void 0 !== i4.converter?.toAttribute ? i4.converter : u).toAttribute(s4, i4.type);
        this._$Em = t3, null == r5 ? this.removeAttribute(e4) : this.setAttribute(e4, r5), this._$Em = null;
      }
    }
    _$AK(t3, s4) {
      const i4 = this.constructor, e4 = i4._$Eh.get(t3);
      if (void 0 !== e4 && this._$Em !== e4) {
        const t4 = i4.getPropertyOptions(e4), r5 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== t4.converter?.fromAttribute ? t4.converter : u;
        this._$Em = e4, this[e4] = r5.fromAttribute(s4, t4.type), this._$Em = null;
      }
    }
    requestUpdate(t3, s4, i4) {
      if (void 0 !== t3) {
        if (i4 ??= this.constructor.getPropertyOptions(t3), !(i4.hasChanged ?? f)(this[t3], s4))
          return;
        this.P(t3, s4, i4);
      }
      false === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t3, s4, i4) {
      this._$AL.has(t3) || this._$AL.set(t3, s4), true === i4.reflect && this._$Em !== t3 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t3);
    }
    async _$ET() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t4) {
        Promise.reject(t4);
      }
      const t3 = this.scheduleUpdate();
      return null != t3 && await t3, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending)
        return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t5, s5] of this._$Ep)
            this[t5] = s5;
          this._$Ep = void 0;
        }
        const t4 = this.constructor.elementProperties;
        if (t4.size > 0)
          for (const [s5, i4] of t4)
            true !== i4.wrapped || this._$AL.has(s5) || void 0 === this[s5] || this.P(s5, this[s5], i4);
      }
      let t3 = false;
      const s4 = this._$AL;
      try {
        t3 = this.shouldUpdate(s4), t3 ? (this.willUpdate(s4), this._$EO?.forEach((t4) => t4.hostUpdate?.()), this.update(s4)) : this._$EU();
      } catch (s5) {
        throw t3 = false, this._$EU(), s5;
      }
      t3 && this._$AE(s4);
    }
    willUpdate(t3) {
    }
    _$AE(t3) {
      this._$EO?.forEach((t4) => t4.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
    }
    _$EU() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t3) {
      return true;
    }
    update(t3) {
      this._$Ej &&= this._$Ej.forEach((t4) => this._$EC(t4, this[t4])), this._$EU();
    }
    updated(t3) {
    }
    firstUpdated(t3) {
    }
  };
  b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: b }), (a.reactiveElementVersions ??= []).push("2.0.4");

  // node_modules/lit-html/lit-html.js
  var t2 = globalThis;
  var i3 = t2.trustedTypes;
  var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
  var e3 = "$lit$";
  var h2 = `lit$${(Math.random() + "").slice(9)}$`;
  var o3 = "?" + h2;
  var n3 = `<${o3}>`;
  var r3 = document;
  var l2 = () => r3.createComment("");
  var c3 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
  var a2 = Array.isArray;
  var u2 = (t3) => a2(t3) || "function" == typeof t3?.[Symbol.iterator];
  var d2 = "[ 	\n\f\r]";
  var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var _ = />/g;
  var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p2 = /'/g;
  var g = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var y2 = (t3) => (i4, ...s4) => ({ _$litType$: t3, strings: i4, values: s4 });
  var x = y2(1);
  var b2 = y2(2);
  var w = Symbol.for("lit-noChange");
  var T = Symbol.for("lit-nothing");
  var A = /* @__PURE__ */ new WeakMap();
  var E = r3.createTreeWalker(r3, 129);
  function C(t3, i4) {
    if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== s2 ? s2.createHTML(i4) : i4;
  }
  var P = (t3, i4) => {
    const s4 = t3.length - 1, o4 = [];
    let r5, l3 = 2 === i4 ? "<svg>" : "", c4 = f2;
    for (let i5 = 0; i5 < s4; i5++) {
      const s5 = t3[i5];
      let a3, u3, d3 = -1, y3 = 0;
      for (; y3 < s5.length && (c4.lastIndex = y3, u3 = c4.exec(s5), null !== u3); )
        y3 = c4.lastIndex, c4 === f2 ? "!--" === u3[1] ? c4 = v : void 0 !== u3[1] ? c4 = _ : void 0 !== u3[2] ? ($.test(u3[2]) && (r5 = RegExp("</" + u3[2], "g")), c4 = m) : void 0 !== u3[3] && (c4 = m) : c4 === m ? ">" === u3[0] ? (c4 = r5 ?? f2, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? m : '"' === u3[3] ? g : p2) : c4 === g || c4 === p2 ? c4 = m : c4 === v || c4 === _ ? c4 = f2 : (c4 = m, r5 = void 0);
      const x2 = c4 === m && t3[i5 + 1].startsWith("/>") ? " " : "";
      l3 += c4 === f2 ? s5 + n3 : d3 >= 0 ? (o4.push(a3), s5.slice(0, d3) + e3 + s5.slice(d3) + h2 + x2) : s5 + h2 + (-2 === d3 ? i5 : x2);
    }
    return [C(t3, l3 + (t3[s4] || "<?>") + (2 === i4 ? "</svg>" : "")), o4];
  };
  var V = class _V {
    constructor({ strings: t3, _$litType$: s4 }, n4) {
      let r5;
      this.parts = [];
      let c4 = 0, a3 = 0;
      const u3 = t3.length - 1, d3 = this.parts, [f3, v2] = P(t3, s4);
      if (this.el = _V.createElement(f3, n4), E.currentNode = this.el.content, 2 === s4) {
        const t4 = this.el.content.firstChild;
        t4.replaceWith(...t4.childNodes);
      }
      for (; null !== (r5 = E.nextNode()) && d3.length < u3; ) {
        if (1 === r5.nodeType) {
          if (r5.hasAttributes())
            for (const t4 of r5.getAttributeNames())
              if (t4.endsWith(e3)) {
                const i4 = v2[a3++], s5 = r5.getAttribute(t4).split(h2), e4 = /([.?@])?(.*)/.exec(i4);
                d3.push({ type: 1, index: c4, name: e4[2], strings: s5, ctor: "." === e4[1] ? k : "?" === e4[1] ? H : "@" === e4[1] ? I : R }), r5.removeAttribute(t4);
              } else
                t4.startsWith(h2) && (d3.push({ type: 6, index: c4 }), r5.removeAttribute(t4));
          if ($.test(r5.tagName)) {
            const t4 = r5.textContent.split(h2), s5 = t4.length - 1;
            if (s5 > 0) {
              r5.textContent = i3 ? i3.emptyScript : "";
              for (let i4 = 0; i4 < s5; i4++)
                r5.append(t4[i4], l2()), E.nextNode(), d3.push({ type: 2, index: ++c4 });
              r5.append(t4[s5], l2());
            }
          }
        } else if (8 === r5.nodeType)
          if (r5.data === o3)
            d3.push({ type: 2, index: c4 });
          else {
            let t4 = -1;
            for (; -1 !== (t4 = r5.data.indexOf(h2, t4 + 1)); )
              d3.push({ type: 7, index: c4 }), t4 += h2.length - 1;
          }
        c4++;
      }
    }
    static createElement(t3, i4) {
      const s4 = r3.createElement("template");
      return s4.innerHTML = t3, s4;
    }
  };
  function N(t3, i4, s4 = t3, e4) {
    if (i4 === w)
      return i4;
    let h3 = void 0 !== e4 ? s4._$Co?.[e4] : s4._$Cl;
    const o4 = c3(i4) ? void 0 : i4._$litDirective$;
    return h3?.constructor !== o4 && (h3?._$AO?.(false), void 0 === o4 ? h3 = void 0 : (h3 = new o4(t3), h3._$AT(t3, s4, e4)), void 0 !== e4 ? (s4._$Co ??= [])[e4] = h3 : s4._$Cl = h3), void 0 !== h3 && (i4 = N(t3, h3._$AS(t3, i4.values), h3, e4)), i4;
  }
  var S2 = class {
    constructor(t3, i4) {
      this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i4;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t3) {
      const { el: { content: i4 }, parts: s4 } = this._$AD, e4 = (t3?.creationScope ?? r3).importNode(i4, true);
      E.currentNode = e4;
      let h3 = E.nextNode(), o4 = 0, n4 = 0, l3 = s4[0];
      for (; void 0 !== l3; ) {
        if (o4 === l3.index) {
          let i5;
          2 === l3.type ? i5 = new M(h3, h3.nextSibling, this, t3) : 1 === l3.type ? i5 = new l3.ctor(h3, l3.name, l3.strings, this, t3) : 6 === l3.type && (i5 = new L(h3, this, t3)), this._$AV.push(i5), l3 = s4[++n4];
        }
        o4 !== l3?.index && (h3 = E.nextNode(), o4++);
      }
      return E.currentNode = r3, e4;
    }
    p(t3) {
      let i4 = 0;
      for (const s4 of this._$AV)
        void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t3, s4, i4), i4 += s4.strings.length - 2) : s4._$AI(t3[i4])), i4++;
    }
  };
  var M = class _M {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t3, i4, s4, e4) {
      this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t3, this._$AB = i4, this._$AM = s4, this.options = e4, this._$Cv = e4?.isConnected ?? true;
    }
    get parentNode() {
      let t3 = this._$AA.parentNode;
      const i4 = this._$AM;
      return void 0 !== i4 && 11 === t3?.nodeType && (t3 = i4.parentNode), t3;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t3, i4 = this) {
      t3 = N(this, t3, i4), c3(t3) ? t3 === T || null == t3 || "" === t3 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t3 !== this._$AH && t3 !== w && this._(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : u2(t3) ? this.k(t3) : this._(t3);
    }
    S(t3) {
      return this._$AA.parentNode.insertBefore(t3, this._$AB);
    }
    T(t3) {
      this._$AH !== t3 && (this._$AR(), this._$AH = this.S(t3));
    }
    _(t3) {
      this._$AH !== T && c3(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(r3.createTextNode(t3)), this._$AH = t3;
    }
    $(t3) {
      const { values: i4, _$litType$: s4 } = t3, e4 = "number" == typeof s4 ? this._$AC(t3) : (void 0 === s4.el && (s4.el = V.createElement(C(s4.h, s4.h[0]), this.options)), s4);
      if (this._$AH?._$AD === e4)
        this._$AH.p(i4);
      else {
        const t4 = new S2(e4, this), s5 = t4.u(this.options);
        t4.p(i4), this.T(s5), this._$AH = t4;
      }
    }
    _$AC(t3) {
      let i4 = A.get(t3.strings);
      return void 0 === i4 && A.set(t3.strings, i4 = new V(t3)), i4;
    }
    k(t3) {
      a2(this._$AH) || (this._$AH = [], this._$AR());
      const i4 = this._$AH;
      let s4, e4 = 0;
      for (const h3 of t3)
        e4 === i4.length ? i4.push(s4 = new _M(this.S(l2()), this.S(l2()), this, this.options)) : s4 = i4[e4], s4._$AI(h3), e4++;
      e4 < i4.length && (this._$AR(s4 && s4._$AB.nextSibling, e4), i4.length = e4);
    }
    _$AR(t3 = this._$AA.nextSibling, i4) {
      for (this._$AP?.(false, true, i4); t3 && t3 !== this._$AB; ) {
        const i5 = t3.nextSibling;
        t3.remove(), t3 = i5;
      }
    }
    setConnected(t3) {
      void 0 === this._$AM && (this._$Cv = t3, this._$AP?.(t3));
    }
  };
  var R = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t3, i4, s4, e4, h3) {
      this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t3, this.name = i4, this._$AM = e4, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = T;
    }
    _$AI(t3, i4 = this, s4, e4) {
      const h3 = this.strings;
      let o4 = false;
      if (void 0 === h3)
        t3 = N(this, t3, i4, 0), o4 = !c3(t3) || t3 !== this._$AH && t3 !== w, o4 && (this._$AH = t3);
      else {
        const e5 = t3;
        let n4, r5;
        for (t3 = h3[0], n4 = 0; n4 < h3.length - 1; n4++)
          r5 = N(this, e5[s4 + n4], i4, n4), r5 === w && (r5 = this._$AH[n4]), o4 ||= !c3(r5) || r5 !== this._$AH[n4], r5 === T ? t3 = T : t3 !== T && (t3 += (r5 ?? "") + h3[n4 + 1]), this._$AH[n4] = r5;
      }
      o4 && !e4 && this.j(t3);
    }
    j(t3) {
      t3 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 ?? "");
    }
  };
  var k = class extends R {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t3) {
      this.element[this.name] = t3 === T ? void 0 : t3;
    }
  };
  var H = class extends R {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t3) {
      this.element.toggleAttribute(this.name, !!t3 && t3 !== T);
    }
  };
  var I = class extends R {
    constructor(t3, i4, s4, e4, h3) {
      super(t3, i4, s4, e4, h3), this.type = 5;
    }
    _$AI(t3, i4 = this) {
      if ((t3 = N(this, t3, i4, 0) ?? T) === w)
        return;
      const s4 = this._$AH, e4 = t3 === T && s4 !== T || t3.capture !== s4.capture || t3.once !== s4.once || t3.passive !== s4.passive, h3 = t3 !== T && (s4 === T || e4);
      e4 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
    }
    handleEvent(t3) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t3) : this._$AH.handleEvent(t3);
    }
  };
  var L = class {
    constructor(t3, i4, s4) {
      this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s4;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3) {
      N(this, t3);
    }
  };
  var Z = t2.litHtmlPolyfillSupport;
  Z?.(V, M), (t2.litHtmlVersions ??= []).push("3.1.2");
  var j = (t3, i4, s4) => {
    const e4 = s4?.renderBefore ?? i4;
    let h3 = e4._$litPart$;
    if (void 0 === h3) {
      const t4 = s4?.renderBefore ?? null;
      e4._$litPart$ = h3 = new M(i4.insertBefore(l2(), t4), t4, void 0, s4 ?? {});
    }
    return h3._$AI(t3), h3;
  };

  // node_modules/lit-element/lit-element.js
  var s3 = class extends b {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t3 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t3.firstChild, t3;
    }
    update(t3) {
      const i4 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = j(i4, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return w;
    }
  };
  s3._$litElement$ = true, s3["finalized", "finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: s3 });
  var r4 = globalThis.litElementPolyfillSupport;
  r4?.({ LitElement: s3 });
  (globalThis.litElementVersions ??= []).push("4.0.4");

  // ../../../tmp/tmp-13036-m6yQ3uyZMRmr/nosferatu-sweepstakes/client/components/vulkano-webcomponent/styles.css
  var styles_default = ':root,:host{--sl-input-focus-ring-color: transparent;--sl-color-primary-600: #010307}.bg-nosferatu{background-color:#010307;color:white;font-family:"oldkirkItalic"}.bg-nosferatu h2{font-family:"NosfrakturRegular";font-weight:400;font-size:32px}.bg-nosferatu .contain-input{margin-bottom:15px}.bg-nosferatu .contain-input .name-error{font-family:"Poppins",sans-serif;font-weight:400;color:#F74354;font-style:italic;font-size:11px;margin-top:8px}.bg-nosferatu .input-style::part(base){background-color:transparent;border:none;border-bottom:1px solid white;border-radius:0;box-shadow:none!important}.bg-nosferatu .input-style::part(base) .input--standard.input--focused:not(.input--disabled){box-shadow:none!important}.bg-nosferatu .input-style::part(input){color:white;box-shadow:none!important;font-family:"Poppins",sans-serif;font-weight:400}.bg-nosferatu .input-style::part(form-control-label){font-size:16px}.bg-nosferatu .input-style.error::part(base){background-color:rgba(247,67,84,0.2)}.bg-nosferatu .input-style.error::part(input)::placeholder{color:#ffffffda}.bg-nosferatu .select-style::part(combobox){background-color:transparent;border:none;border-bottom:1px solid white;border-radius:0;font-family:"Poppins",sans-serif;font-weight:400}.bg-nosferatu .select-style.error::part(combobox){background-color:rgba(247,67,84,0.2);color:#ffffffda!important}.bg-nosferatu .select-style.error::part(display-input)::placeholder{color:#ffffffbd!important}.bg-nosferatu .select-style sl-option::part(base){font-family:"Poppins",sans-serif;font-weight:400}.bg-nosferatu .select-style sl-option::part(base).option--current{background-color:#010307}.bg-nosferatu .select-style::part(display-input){color:white}.bg-nosferatu .contain-select .column{display:grid;grid-template-columns:auto auto auto;grid-gap:15px}.bg-nosferatu .check{margin-top:20px}.bg-nosferatu .check::part(base){font-family:"oldkirkItalic";font-weight:400;text-transform:uppercase}.bg-nosferatu .check::part(control--checked){background-color:white}.bg-nosferatu .check::part(checked-icon){color:black}.bg-nosferatu .check.error-check::part(base){color:#F74354}.bg-nosferatu .btn-next{margin-top:40px}.bg-nosferatu .btn-next::part(base){background-color:#474848;color:black;border:none;margin-top:20px;font-family:"NosfrakturRegular";font-size:18px;width:80px;height:40px;border-radius:50px}';

  // client/components/vulkano-webcomponent/main.js
  var VulkanoWebcomponent = class extends s3 {
    static properties = {
      name: { type: String },
      Day: { type: Array },
      Month: { type: Array },
      Years: { type: Array },
      datos: { type: Object }
    };
    constructor() {
      super();
      this.name = "";
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(styles_default);
      this.constructor.stylesheet = sheet;
      this.Day = [];
      this.Month = [
        {
          month: "January"
        },
        {
          month: "February"
        },
        {
          month: "March"
        },
        {
          month: "April"
        },
        {
          month: "May"
        },
        {
          month: "June"
        },
        {
          month: "July"
        },
        {
          month: "August"
        },
        {
          month: "September"
        },
        {
          month: "October"
        },
        {
          month: "November"
        },
        {
          month: "December"
        }
      ];
      this.Years = [];
      this.datos = {
        your_name: "",
        email: "",
        day: "",
        month: "",
        check: false
      };
      this.fieldWithBlur = null;
    }
    firstUpdated() {
      let shoelace_basepath = "/vendors/shoelace";
      if (window.location.hostname.includes("localhost")) {
        shoelace_basepath = "/vendors/shoelace";
      }
      const shoelacecss = document.createElement("link");
      shoelacecss.rel = "stylesheet";
      shoelacecss.href = `${shoelace_basepath}/themes/light.css`;
      document.head.appendChild(shoelacecss);
      const fonts = document.createElement("link");
      fonts.rel = "stylesheet";
      fonts.href = "/css/fonts.css";
      document.head.appendChild(fonts);
      const fontsPoppins = document.createElement("link");
      fontsPoppins.rel = "stylesheet";
      fontsPoppins.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"';
      document.head.appendChild(fontsPoppins);
      for (let i4 = 1; i4 <= 31; i4++) {
        this.Day.push({ day: i4 });
      }
      for (let year = 1950; year <= 2024; year++) {
        this.Years.push({ year });
      }
      this.requestUpdate();
    }
    connectedCallback() {
      super.connectedCallback();
      this.shadowRoot.adoptedStyleSheets = [this.constructor.stylesheet];
    }
    onChange(e4) {
      this.datos = {
        ...this.datos,
        [e4.target.name]: e4.target.value
      };
      if (this.fieldWithBlur) {
        this.validationErrorFields(this.fieldWithBlur);
      }
      this.requestUpdate();
    }
    onBlur(fieldName) {
      this.fieldWithBlur = fieldName;
    }
    onInput(fieldName) {
      this.fieldWithBlur = fieldName;
      this.validationErrorFields(fieldName);
    }
    validateAllFields() {
      const requiredFields = ["your_name"];
      requiredFields.forEach((fieldName) => {
        this.validationErrorFields(fieldName);
      });
    }
    validationErrorFields(fieldName) {
      const field = this.shadowRoot.querySelector(`[name="${fieldName}"]`);
      const nameError = this.shadowRoot.querySelector(`#name-error-${fieldName}`);
      if (field) {
        if (!field.value.trim()) {
          nameError.hidden = false;
          field.classList.add("error");
        } else {
          field.classList.remove("error");
          nameError.hidden = true;
        }
      }
    }
    validateEmail(e4) {
      const nameError = this.shadowRoot.querySelector("#name-error-email");
      const field = this.shadowRoot.querySelector('[name="email"]');
      const regexEmail = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,62}[a-zA-Z0-9]@[a-zA-Z0-9][a-zA-Z0-9.-]{0,253}[a-zA-Z0-9]\.[a-zA-Z]{2,4}$/;
      let validate = false;
      const emailData = e4 === void 0 ? this.datos.email : e4.target.value;
      if (regexEmail.test(emailData)) {
        validate = true;
      }
      if (!validate) {
        nameError.hidden = false;
        field.classList.add("error");
      } else {
        nameError.hidden = true;
        field.classList.remove("error");
        this.validateEmailStatus = true;
      }
    }
    handleDateValidations() {
      const nameError = this.shadowRoot.querySelector("#name-error-date");
      const requiredFields = ["day", "month", "year"];
      console.log("aqio");
      let validate = false;
      requiredFields.forEach((fieldName) => {
        const field = this.shadowRoot.querySelector(`[name="${fieldName}"]`);
        if (field) {
          if (!field.value.trim()) {
            field.classList.add("error");
          } else {
            field.classList.remove("error");
          }
        }
      });
      if (this.datos.day !== "" && this.datos.month !== "" && this.datos.year !== "") {
        validate = true;
      }
      if (!validate) {
        nameError.hidden = false;
      } else {
        nameError.hidden = true;
        this.validateEmailStatus = true;
      }
    }
    handleCheck(e4) {
      this.datos.check = e4.target.checked;
      this.handleValidateCheck();
    }
    handleValidateCheck() {
      const field = this.shadowRoot.querySelector('[name="check"]');
      let validate = false;
      if (this.datos.check) {
        validate = true;
      }
      if (!validate) {
        field.classList.add("error-check");
      } else {
        field.classList.remove("error-check");
      }
    }
    handlesubmit() {
      this.validateAllFields();
      this.validateEmail();
      this.handleDateValidations();
      this.handleValidateCheck();
      console.log("datos", this.datos);
    }
    render() {
      return x`
      <div class="bg-nosferatu">

      <h2>Please Enter Your Details</h2>

        <form action="">

        <div class="contain-input">
          <sl-input
            autocomplete="off"
            name="your_name"
            @blur=${(e4) => this.onBlur(e4.target.name)}
            @input=${() => this.onInput("your_name")}
            @sl-change=${this.onChange}
            placeholder="Name"
            class="input-style">
            <span slot="label"> Your name${x`<span style="color: #7d7a7a"> (as it appears on your ID)</span>`}</span>
          </sl-input>
          <div id="name-error-your_name" aria-live="polite" class="name-error" hidden>Please enter your name</div>
        </div>

        <div class="contain-input">
          <sl-input

            name="email"
            @sl-change=${this.onChange}
            @keyup=${(e4) => this.validateEmail(e4)}
            @input=${(e4) => this.validateEmail(e4)}
            label="Your email address"
            placeholder="Email"
            class="input-style">
          </sl-input>
          <div id="name-error-email" aria-live="polite" class="name-error" hidden>Please enter your email address</div>
        </div>


        <div class="contain-select">

          <label for="">Your birth date</label>

          <div class="column">
            <div class="contain-input">

                <sl-select
                    name="day"
                    @sl-change=${this.onChange}
                    @blur=${this.handleDateValidations}
                    @input=${this.handleDateValidations}
                    placeholder="Day"
                    class="select-style">
                    ${this.Day.map((i4) => x`
                        <sl-option value="${i4.day}">${i4.day}</sl-option>
                    `)}
                </sl-select>
                <div id="name-error-date" aria-live="polite" class="name-error" hidden>Please enter your date</div>
            </div>

            <div class="contain-input">
              <sl-select
                  name="month"
                  @sl-change=${this.onChange}
                  placeholder="Month"
                  class="select-style">
                ${this.Month.map((i4) => x`
                    <sl-option value="${i4.month}">${i4.month}</sl-option>
                `)}
              </sl-select>
            </div>

            <div class="contain-input">
              <sl-select
                  name="year"
                  @sl-change=${this.onChange}
                  placeholder="Year"
                  class="select-style">
                ${this.Years.map((i4) => x`
                    <sl-option value="${i4.year}">${i4.year}</sl-option>
                `)}
              </sl-select>

            </div>
          </div>

        </div>

        <sl-checkbox class="check" name="check" @sl-change=${this.handleCheck}>
            I AGREE THAT NBCUNIVERSAL AND ITS AFFILIATES, INCLUDING FOCUS INSIDER AND UNIVERSAL LOYALTY, MAY SEND ME THE LATEST NEWS, PROMOTIONS AND MORE. I WANT TO RECEIVE INFORMATION FROM FOCUS FEATURES.
        </sl-checkbox>

        <br>

        <sl-button class="btn-next" @click=${this.handlesubmit}>Next</sl-button>

        </form>
      </div>
    `;
    }
  };
  customElements.define("vulkano-webcomponent", VulkanoWebcomponent);
})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=vulkano-webcomponent.js.map
