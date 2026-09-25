// Run with: node scripts/check-color-reveal.cjs
const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');
const source = fs.readFileSync('components/color-reveal.tsx', 'utf8');
const ast = ts.createSourceFile(
  'reveal.tsx',
  source,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);
let effect;
function visit(node) {
  if (ts.isCallExpression(node) && node.expression.getText(ast) === 'useEffect')
    effect = node.arguments[0].getText(ast);
  ts.forEachChild(node, visit);
}
visit(ast);
assert(effect);
const code =
  ts.transpileModule(`const effect = ${effect}`, {
    compilerOptions: { target: ts.ScriptTarget.ES2020 },
  }).outputText + '; return effect();';
class Node {
  constructor() {
    this.attributes = new Map();
    this.rect = { top: 350, bottom: 430 };
  }
  closest() {
    return this;
  }
  setAttribute(key, value) {
    this.attributes.set(key, value);
  }
  removeAttribute(key) {
    this.attributes.delete(key);
  }
  getBoundingClientRect() {
    return this.rect;
  }
  get active() {
    return this.attributes.has('data-reveal-active');
  }
}
const docEvents = new Map(),
  windowEvents = new Map();
const a = new Node(),
  b = new Node();
const media = {
  matches: false,
  addEventListener() {},
  removeEventListener() {},
};
let observe,
  disconnected = false;
class Observer {
  constructor(callback) {
    observe = callback;
  }
  observe() {}
  disconnect() {
    disconnected = true;
  }
}
const document = {
  querySelectorAll: () => [a, b],
  addEventListener: (n, cb) => docEvents.set(n, cb),
  removeEventListener: (n) => docEvents.delete(n),
};
const window = {
  addEventListener: (n, cb) => windowEvents.set(n, cb),
  removeEventListener: (n) => windowEvents.delete(n),
};
const cleanup = new Function(
  'matchMedia',
  'Element',
  'IntersectionObserver',
  'document',
  'window',
  'innerHeight',
  code,
)(() => media, Node, Observer, document, window, 812);
const send = (name, target, extra = {}) =>
  docEvents.get(name)({ target, pointerType: 'mouse', ...extra });
send('pointerover', a);
assert(a.active);
send('focusin', b);
assert(b.active && !a.active);
send('pointerover', a);
assert(a.active && !b.active);
send('pointerout', a, { relatedTarget: null });
assert(!a.active);
media.matches = true;
observe([{ target: a, isIntersecting: true, boundingClientRect: a.rect }]);
assert(a.active);
send('pointerdown', b, { pointerType: 'touch' });
assert(b.active && !a.active);
observe([{ target: a, isIntersecting: true, boundingClientRect: a.rect }]);
assert(
  b.active && !a.active,
  'Already seen mobile section must not activate again',
);
b.rect = { top: -500, bottom: -100 };
windowEvents.get('scroll')();
assert(!b.active);
cleanup();
assert(disconnected);
assert.equal(docEvents.size, 0);
assert.equal(windowEvents.size, 0);
// Exact palette contrast: >=4.5 for small marker text, >=3 for the large pink title.
const luminance = (hex) => {
  const c = hex
    .match(/../g)
    .map((x) => parseInt(x, 16) / 255)
    .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
};
const contrast = (a, b) => {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
for (const color of [
  'F05A8A',
  '63D7D1',
  'C7F04B',
  '8B67E8',
  'FF824D',
  'EEF1B2',
])
  assert(contrast(color, '121212') >= 4.5, color);
assert(contrast('B52B35', 'FFFFFF') >= 4.5);
assert(contrast('F05A8A', 'FAF9F6') >= 3);
console.log(
  'PASS: exclusive reveal ownership, pointer/focus handover, mobile tap and one-time reveal, offscreen reset, route cleanup, palette contrast.',
);
