---
collection: media
date: 2018-04-11T18:23
title: Media query
view: example.twig
---

Di norma, le regole media query vanno utilizzate in un ordine specifico e con un tipo di dichiarazione basato sui propri mixin di [Include Media](https://include-media.com/), set vendor progettato per gestire le regole media query in maniera più configurabile.

```scss
.selector {
  @include media ('<s') {
    color: red;
  }

  @include media ('>=s') {
    color: green;
  }

  @include media ('>=m') {
    color: blue;
  }

  @include media ('>=l') {
    color: orange;
  }

  @include media ('>=xl') {
    color: yellow;
  }
}
```

L'ordine delle dichiarazioni è importante e va rispettato per evitare comportamenti responsive inaspettati.

Ciò significa che si parte sempre dalla regola `<s` e si arriva alla `>=xl`.

Non è necessario dichiarare regole che non ci servono nel nostro contesto:

```scss
.selector {
  @include media ('<s') {
    color: red;
  }

  @include media ('>=xl') {
    color: yellow;
  }
}
```

###### Best practice

Per poter lavorare con un approccio **mobile first**, basato sul viewport **XS** è opportuno saltare la regola che argina gli stili solo per mobile:

```scss
.selector {
  color: red;

  @include media ('>=xl') {
    color: yellow;
  }
}
```

Nel caso fosse necessario utilizzare degli stili che si vedono solo sul viewporto **XS** è quindi corretto utilizzare la sua regola:

```scss
.selector {
  color: green;

  @include media ('<s') {
    color: red;
  }

  @include media ('>=xl') {
    color: yellow;
  }
}
```
