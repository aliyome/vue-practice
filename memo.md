# Memo

## TODO

- [ ] `vue-property-decorator`とは
  - [ ] Home コンポーネントに型をもたせたい
- [ ] HelloWorld コンポーネントの @Prop() msg!は指定されないと undefined になるのでクソでは？
- [ ] shallowMount とは
- [ ] Vuex を雑に使ってみる
- [ ] Vue を使ったフォームの作り方(v-model だと不安)

## 覚書

prettier の html フォーマッタが邪魔なときに以下のワークスペース設定を行う

```json
{
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  }
}
```

## コンポーネント

- [ ] `v-once` 要素の子要素はリアクティブ？
- [ ] `vue-property-decorator`で型のバリデーションはどうやる？
- [ ] 関数型コンポーネントとは？

- `<style scoped></style>` とすると、コンポーネント内のみ有効なスタイルとなる
- コンポーネントのインスタンスが生成されたタイミングで data に存在していたプロパティのみリアクティブ
  - `Vue#set`を使うことで増やせる
- **[インスタンスプロパティまたはコールバックでアロー関数 を使用しないでください。](https://jp.vuejs.org/v2/guide/instance.html#%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB%E3%83%95%E3%83%83%E3%82%AF)**
- [ライフサイクルダイアグラム](https://jp.vuejs.org/v2/guide/instance.html#%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB%E3%83%80%E3%82%A4%E3%82%A2%E3%82%B0%E3%83%A9%E3%83%A0)
- `<a v-bind:[hogeName]="value">` 動的引数も使える
- `@click.prevent="onClickHoge"` preventDefault を呼ぶ**修飾子**
- `@keyup.page-down="onKeyPageDown"` 特定のキーが入力された時のみ購読する**キー修飾子**
- `@keyup.meta.a="onKeyMetaA"` Win + A キーが入力された時のみ **システムキー修飾子**
- `@keyup.meta.a.exact="onKeyMetaAExact"` Win + A キーのみが入力されたとき
- `@click.left="onLeftClick"` 左クリックが入力されたとき
- computed は**リアクティブな依存関係に基づきキャッシュされる**
  - computed: {now: () => Date.now(); } // 一度キャッシュされた更新されない
  - computed: {plus10: () => this.val + 10; } // val が更新される度に更新される
- `:style`でベンダープレフィックスが必要なプロパティには自動的に付加される
- 再利用されたくない要素には`key`属性を割り当てる // `<input key="username">`など
- 配列を別の配列で置き換えても、リストの DOM が全て再描画されることはなく、効率的に部分描画される
- **配列をインデックス指定で変更してもリアクティブにならない**
  - `Array#splice`で置換するか、`Vue#set(items, index, value)`で置換する
- checkbox の`v-model`にバインドされた変数が配列の場合は、checkbox の value の値の配列になる
- `<input v-model.lazy="val">`: 入力後にフォーカスが外れたタイミングでモデルに反映
- `<input v-model.number="num">`: モデルに反映する直前に parseFloat() される
- `<input v-model.trim="text">`: モデルに反映する直前に trim() される
- [グローバルコンポーネントを一括登録する便利な方法(require.context)](https://github.com/chrisvfritz/vue-enterprise-boilerplate/blob/master/src/components/_globals.js)
- props を型検査する: `props: { title: String, num: Number }`など
- `props:['p'], data() { return { local: this.p }}`: props の値を data の初期値にできるが、あくまで初期値なので、props の値と連動はしない
- [イベント名は常にケバブケースを使ったほうが良い](https://jp.vuejs.org/v2/guide/components-custom-events.html#%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E5%90%8D)
- `<slot> fallback </slot>`: slot に何も指定されなかったら fallback が表示される
- `<template v-slot:hoge>`　＝　`<template #hoge>`
- `<keep-alive><component :is="hogeComp" /></keep-alive>` で切り替え前のコンポーネントを inactive 状態で保持でき、再び active にすることもできる。
- `components: { 'hoge-component': () => import('./hoge-comp') }` で非同期コンポーネント
  - [ロード状態のハンドリング](https://jp.vuejs.org/v2/guide/components-dynamic-async.html#%E3%83%AD%E3%83%BC%E3%83%89%E7%8A%B6%E6%85%8B%E3%81%AE%E3%83%8F%E3%83%B3%E3%83%89%E3%83%AA%E3%83%B3%E3%82%B0)
- `<hoge ref="hogeRef" />`とすると、`this.$ref.hogeRef`でアクセス可能(.focus()するときに便利)

```html
<!-- slot側のデータを親コンポーネント側から参照する -->
<!-- child: 子コンポーネント側 -->
<slot :innerHoge="innerHoge">{{innerHoge}}</slot>
<!-- parent: 親コンポーネント側 -->
<child>
  <template v-slot:default="t">{{t.innerHoge}}</template>
</child>
```

覚書

- よく使うディレクティブ
  - v-for(& :key), v-if, v-once, v-html//XSS 注意, :is
- リアクティブな in-place な配列操作(Vue がラップしている)
  - push(), pop(), shift(), unshift(), splice(), sort(), reverse()
- `stopPropagation` 親にイベントが伝搬しない
- `preventDefault` a タグのクリックや、form の submit イベントでページ遷移したりするのを防ぐ
- `addEventListener`の`passive`オプションは、イベントのバブリングを待たずに`preventDefault`であってもイベントが即発火するようになる。低スペ（モバイル等）環境の`scroll`イベントがなかなか発火されない場合に用いると、操作性が向上し、ユーザー体験がよくなる

```html
<!-- 選択リストの頻出パターンっぽい -->
<!-- iOSでは、初期値未設定の場合、選択できなくなるため？disableな値を初期値として設定したほうが良い -->
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

- [`v-model`バインド可能なカスタムコンポーネントの作り方](https://jp.vuejs.org/v2/guide/components-custom-events.html#v-model-%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%9F%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)
- **ネイティブイベントが必要になったら、このリファレンスをチェックする**
  - [コンポーネントにネイティブイベントをバインディング](https://jp.vuejs.org/v2/guide/components-custom-events.html#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AB%E3%83%8D%E3%82%A4%E3%83%86%E3%82%A3%E3%83%96%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E3%82%92%E3%83%90%E3%82%A4%E3%83%B3%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0)

```html
<!-- this.$emit('update:title', newTitle) -->
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
<!-- このパターンを .sync 修飾子で短く書くことができます： -->
<text-document v-bind:title.sync="doc.title"></text-document>
```

```ts
// カスタムコンポーネント
{
  name: 'hoge',
  template: `<input :value="hoge" @input="$emit('input', $event.target.value)">`;
}
```

```html
<!-- テンプレート -->
<hoge v-model="aaa" />
```

トランジション

- [6 つのクラスが適用される](https://jp.vuejs.org/v2/guide/transitions.html#%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B8%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%AF%E3%83%A9%E3%82%B9)
  - 初期描画時のみ適用される`appear`と JavaScript フックもある。
- enter-class, enter-to-class などの属性で、トランジションタイミングにクラスを付け替えできる（Animate.css などを便利に使える）
- [befor-enter など、トランジション前後に JavaScript フックが用意されている](https://jp.vuejs.org/v2/guide/transitions.html#JavaScript-%E3%83%95%E3%83%83%E3%82%AF)
- `<transition mode="out-in>"`を指定することで、要素を切り替えるような場合に消失のトランジション後に生成のトランジションを動かすことができる
- slot を持つ transition 要素をコンポーネント化すると、トランジションを使い回せる

ディレクティブ

- [要素が DOM に追加されたときに自動で`focus()`する`v-focus`の作り方(オフシャルガイド)](https://jp.vuejs.org/v2/guide/custom-directive.html#%E5%9F%BA%E6%9C%AC)
- [bind, inserted, update, componentUpdated, unbind](https://jp.vuejs.org/v2/guide/custom-directive.html#%E3%83%95%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0)

## Router

- redirect は replace か
- `Vue.use(VueRouter)` でグローバルな Vue オブジェクト VueRouter をインストール
- `new VueRouter({routes:[{path, name, component}]})`
- `<router-link to="path/to/dest"></router-link>`
- `this.$router.go(-1) // 一つ戻る`
- `router.push({path: 'hoge', params: {}})` path を指定すると params は無視されるので name を使う
- `router.replace`は push と異なり、history を上書きする
  - テンプレート上で`<router-link to="" replace>`とすることでも実装可能
- `{path: 'foo', components: {default: A, 'sub': B}}`とすると、複数コンポーネントを表示可能
- `{path: 'hoge', props: true}`とすると、コンポーネントに**パスパラメータを props として渡せる**
- `{path: 'hoge', props: {foo: 'bar'}}`とすると、コンポーネントに**任意のパラメータを props として渡せる**
- `{path: 'hoge', meta: {foo: 'bar'}}`とすると、`$router.matched.map(r => r.meta)`でルーティングのメタ情報にアクセス可能
- 各ナビゲーションガードの`next(false)`で遷移キャンセルが可能、`next('hoge')`で hoge に遷移 f
- ナビゲーションガード
  - グローバル: router.beforeEach/beforeResolve
  - ルート単位: {path: 'hoge', beforeEnter: (to, from, next) => {next();}}
  - コンポーネント: beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave
- [完全なナビゲーション解決フロー](https://router.vuejs.org/ja/guide/advanced/navigation-guards.html#%E5%AE%8C%E5%85%A8%E3%81%AA%E3%83%8A%E3%83%93%E3%82%B2%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E8%A7%A3%E6%B1%BA%E3%83%95%E3%83%AD%E3%83%BC)
- [ルートベースの動的トランジション](https://router.vuejs.org/ja/guide/advanced/transitions.html#%E3%83%AB%E3%83%BC%E3%83%88%E3%83%99%E3%83%BC%E3%82%B9%E3%81%AE%E5%8B%95%E7%9A%84%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B8%E3%82%B7%E3%83%A7%E3%83%B3)
- `Component#beforeRouteEnter(route, redirect, next)`でナビゲーション前にデータ取得する
- `scrollBehavior(to, from, savedPosition) { if (savedPosition) { return savedPosition; }}`

## おやっと思ったこと

- マウントされるエレメントは、コンポーネントのテンプレートで上書きされる
- VueRouter の BASE_URL は環境変数で指定可能

## わからないこと

- `vue-cli-service serve`で何が起きるのか？
  - public/index.html に main.ts が埋め込まれるっぽい？
- `Vue#$mount`など、`$hoge`の`$`の意味は何？

```ts
// main.ts

// これは何？
Vue.config.productionTip = false;
```
