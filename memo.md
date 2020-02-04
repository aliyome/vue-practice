# Memo

## TODO

- router-link とは
- router-view とは

## Router

- `Vue.use(VueRouter)`
- `new VueRouter({routes:[{path, name, component}]})`

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
