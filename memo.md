# Memo

## TODO

- [ ] `vue-property-decorator`とは
  - [ ] Home コンポーネントに型をもたせたい
- [ ] HelloWorld コンポーネントの @Prop() msg!は指定されないと undefined になるのでクソでは？
- [ ] shallowMount とは
- [ ] Vuex を雑に使ってみる

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

- `<style scoped></style>` とすると、コンポーネント内のみ有効なスタイルとなる

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
