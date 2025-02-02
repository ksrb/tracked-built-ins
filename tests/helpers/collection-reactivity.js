import hbs from 'htmlbars-inline-precompile';
import { render, settled, findAll } from '@ember/test-helpers';
import { test } from 'qunit';

function compareResults(assert, items) {
  findAll('.test-item').forEach((el, index) => {
    let key = Array.isArray(items[index]) ? items[index][0] : index;
    let value = Array.isArray(items[index]) ? items[index][1] : items[index];

    assert.equal(el.innerText, `${key}.${value}`);
  });
}

export function eachReactivityTest(desc, Klass) {
  test(`${desc} #each reactivity`, async function (assert) {
    let instance;

    class TestComponent extends Klass {
      constructor() {
        super(...arguments);
        instance = this;
      }

      get collection() {
        throw new Error('did you forget to specify a collection?');
      }
    }

    this.owner.register('component:test-component', TestComponent);
    this.owner.register(
      'template:components/test-component',
      hbs`
        <ul>
          {{#each this.collection as |value index|}}
            <li class="test-item">{{index}}.{{value}}</li>
          {{/each}}
        </ul>
      `
    );

    await render(hbs`<TestComponent/>`);

    compareResults(
      assert,
      Array.from(instance.collection).map((v, i) => [i, v])
    );

    instance.update();

    await settled();

    compareResults(
      assert,
      Array.from(instance.collection).map((v, i) => [i, v])
    );
  });
}

export function eachInReactivityTest(desc, Klass) {
  test(`${desc} #each-in reactivity`, async function (assert) {
    let instance;

    class TestComponent extends Klass {
      constructor() {
        super(...arguments);
        instance = this;
      }

      get collection() {
        throw new Error('did you forget to specify a collection?');
      }
    }

    this.owner.register('component:test-component', TestComponent);
    this.owner.register(
      'template:components/test-component',
      hbs`
        <ul>
          {{#each-in this.collection as |lhs rhs|}}
            <li class="test-item">{{lhs}}.{{rhs}}</li>
          {{/each-in}}
        </ul>
      `
    );

    await render(hbs`<TestComponent/>`);

    let { collection } = instance;

    compareResults(
      assert,
      Symbol.iterator in collection
        ? Array.from(collection)
        : Object.entries(collection)
    );

    instance.update();

    await settled();

    compareResults(
      assert,
      Symbol.iterator in collection
        ? Array.from(collection)
        : Object.entries(collection)
    );
  });
}
