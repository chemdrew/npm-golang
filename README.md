# npm-golang
> install and run golang from npm!

## Why are you doing this...?

Because I can ¯\\\_(ツ)_/¯

Inspiration came from [mvn-golang](https://github.com/raydac/mvn-golang).
Figured if someone wants to run go from another language the node environment makes more sense, being lighter weight it _might_ lead to some slight performance gains and free up some memory

## Okay you got me, how do I use it?

```
$ npm install --save npm-golang
```

```
$ npm-golang install
$ npm-golang go <any go command>
```

see example/ for more!

## TODO

- [ ] add eslint
- [ ] ensure go is installed before running npm-golang go \<command>
