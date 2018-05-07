---
title: Indice dei componenti
date: 2018-04-12T14:10
view: default.twig
---

### Cos'è una component library?

Questo strumento serve a condividere la documentazione di componenti web. Al suo interno troverai esempi di come utilizzarli nelle pagine del tuo progetto.

Viene utilizzato dai team di sviluppo per seguire una linea guida sull'utilizzo corretto dei componenti modulari che si inseriscono nei template contenenti markup.

###### Codice SASS

I componenti sono sviluppati con le seguenti librerie [SASS][sass]

- [Frontsize][frontsize]
- [Include media][include-media]

###### Frontsize

Serve per poter scrivere codice con approccio [BEM][bem] con più facilità, mette a disposizione una serie di *funzioni* e *mixin* fatti per velocizzare lo sviluppo e prevenire alcuni problemi di organizzazione del codice SASS.

###### Include media

Questa libreria mette a disposizione alcuni *mixin* per poter scrivere regole media query in maniera più semantica.

---

### Snippet di codice

Gli snippet sono fatti per essere copiati ed incollati nei nuovi contenuti HTML che andranno in produzione.

Una volta incollato, il codice va personalizzato in base ai contenuti necessari, tutti gli attributi `style` sono inseriti solo per scopo cosmetico all'interno della libreria per poter facilitare lo scopo dell'esempio.

###### Codice di esempio

```html
<div class="set--text-right" style="background: white;">
  Codice di esempio
</div>
```

È importante ricordarsi di rimuovere gli attributi `style` cosmetici che non sono relazionati alle fixtures.

```html
<div class="set--text-right">
  Codice da mantenere
</div>
```

Ci sono situazioni dove gli attributi `style` vanno comunque mantenuti, generalmente se devono caricare delle immagini, in questo caso gli esempi avranno immagini placeholder:

```html
<div class="set--text-right" style="background-image: url('//via.placeholder.com/640x480');">
  Codice di esempio
</div>
```

Lo snippet sarà da customizzare con i dati che arrivano dal database in base al sistema di templating che state utilizzando:

```html
<div class="set--text-right" style="background-image: url('{{ database.image }}');">
  {{ database.text }}
</div>
```

[bem]: https://speakerdeck.com/vitto/workshop-sass-for-bem-development
[frontsize]: https://github.com/ideatosrl/frontsize
[include-media]: http://include-media.com
[sass]: https://sass-lang.com
