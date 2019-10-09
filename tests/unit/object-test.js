import Component from '@glimmer/component';
import { TrackedObject, setTrackedBuiltInsConfig } from 'tracked-built-ins';

import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { reactivityTest } from '../helpers/reactivity';

module('TrackedObject', function(hooks) {
  setupRenderingTest(hooks);

  module('USE_PROXY: false', () => {
    hooks.beforeEach(() => setTrackedBuiltInsConfig({ USE_PROXY: false }));
    hooks.afterEach(() => setTrackedBuiltInsConfig({ USE_PROXY: false }));

    test('from', assert => {
      let obj = new TrackedObject({ foo: 123 });

      assert.ok(obj instanceof TrackedObject);
      assert.deepEqual(Object.keys(obj), ['foo']);
    });

    reactivityTest(
      'it works',
      class extends Component {
        obj = new TrackedObject({foo: undefined});

        get value() {
          return this.obj.foo;
        }

        update() {
          this.obj.foo = 123;
        }
      },
      true
    );
  });

  module('USE_PROXY: true', hooks => {
    hooks.beforeEach(() => setTrackedBuiltInsConfig({ USE_PROXY: true }));
    hooks.afterEach(() => setTrackedBuiltInsConfig({ USE_PROXY: true }));

    test('from', assert => {
      let obj = new TrackedObject({ foo: 123 });

      assert.ok(obj instanceof TrackedObject);
      assert.deepEqual(Object.keys(obj), ['foo']);
    });

    reactivityTest(
      'it works',
      class extends Component {
        obj = new TrackedObject();

        get value() {
          return this.obj.foo;
        }

        update() {
          this.obj.foo = 123;
        }
      },
      true
    );
  });
});
