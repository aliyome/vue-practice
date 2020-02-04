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

- [x] router-link とは
- [x] router-view とは
- [ ] Vue.use(VueRouter)とは
- [ ] beforeRouteUpdate ナビゲーションガード
- [ ] ナビゲーションガードと`onComplete, onAbort`の関係
- [ ] redirect は push か replace か
- `Vue.use(VueRouter)`
- `new VueRouter({routes:[{path, name, component}]})`
- `<router-link to="path/to/dest"></router-link>`
- `this.$router.go(-1) // 一つ戻る`
- `router.push({path: 'hoge', params: {}})` path を指定すると params は無視されるので name を使う
- `router.replace`は push と異なり、history を上書きする
  - テンプレート上で`<router-link to="" replace>`とすることでも実装可能
- `{path: 'hoge', props: true}`とすると、コンポーネントに**パスパラメータを props として渡せる**
- `{path: 'hoge', props: {foo: 'bar'}}`とすると、コンポーネントに**任意のパラメータを props として渡せる**

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
