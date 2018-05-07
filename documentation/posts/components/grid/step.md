---
collection: grid
date: 2018-04-05T17:47
title: Step
view: example.twig
snippets:
  -
    title: Colonne mobile ready
    text: Per comportamento predefinito, la griglia porta tutte le sue colonne a 100% entro il viewport **XS**.
    html: |
      <div class="grid grid--debug">
        <div class="grid__cell grid__cell--25">
          <span class="set set--s-hide">100%</span>
          <span class="set set--xs-hide set--s-inline-block">25%</span>
        </div>
        <div class="grid__cell grid__cell--25">
          <span class="set set--s-hide">100%</span>
          <span class="set set--xs-hide set--s-inline-block">25%</span>
        </div>
        <div class="grid__cell grid__cell--50">
          <span class="set set--s-hide">100%</span>
          <span class="set set--xs-hide set--s-inline-block">50%</span>
        </div>
      </div>
  -
    title: Colonne viewport
    text: Utilizzando i selettori `grid__cell--xs-**` la griglia forzerà le dimensioni
    html: |
      <div class="grid grid--debug">
        <div class="grid__cell grid__cell--xs-50 grid__cell--s-25 grid__cell--m-25">
          1
        </div>
        <div class="grid__cell grid__cell--xs-25 grid__cell--s-50 grid__cell--m-25">
          2
        </div>
        <div class="grid__cell grid__cell--xs-25 grid__cell--s-25 grid__cell--m-50">
          3
        </div>
      </div>
  -
    title: Colonne miste
    text: La griglia è pensata per essere utilizzata simultaneamente con i selettori automatici e quelle specifici dei viewport.
    html: |
      <div class="grid grid--debug">
        <div class="grid__cell grid__cell--xs-50 grid__cell--33">
          1
        </div>
        <div class="grid__cell grid__cell--xs-50 grid__cell--33">
          2
        </div>
        <div class="grid__cell grid__cell--33">
          3
        </div>
      </div>
  -
    title: Gestione errori di configurazione
    text: Nel caso venga deployata una distribuzione non corretta delle colonne, la griglia le distribuirà in modo da non avere buchi e minimizzare i problemi di visualizzazione fino a quando il problema non viene corretto.
    html: |
      <div class="grid grid--debug">
        <div class="grid__cell grid__cell--33">
          1
        </div>
        <div class="grid__cell grid__cell--33">
          2
        </div>
        <div class="grid__cell grid__cell--66">
          3
        </div>
      </div>
---

Le colonne della griglia hanno un set di dimensioni predefinite che permettono di poter impaginate testi, immagini e altri componenti contenuti al suo interno.

La configurazione dei media query, si trovano qui:

```
frontend/dev/styles/grid/_config/vendor/include-media.scss
```

---

###### Step

All'interno del file troverete la configurazione degli **step** simile a questa:

```scss
$steps: (
  '25': 25%,
  '33': 33.3333%,
  '50': 50%,
  '66': 66.6666%,
  '75': 75%,
  '100': 100%
);
```

Ogni step corrisponde ad una dimensione che la colonna può avere, la griglia si occuperà di portare tutti gli step a dimensione 100% quando saranno fruiti sui dispositivi mobile che rientreranno nel media query **S** come [descritto qui][breakpoint].

###### Schema degli step

Di seguito la lista di tutti i selettori disponibili per ogni viewport e step dichiarati dalla configurazione attuale.

| Viewport / Step | 25% | 33% | 50% | 66% | 75% | 100% |
|-|-|-|-|-|-|-|
| **auto** | `grid__cell--25` | `grid__cell--33` | `grid__cell--50` | `grid__cell--66` | `grid__cell--75` | `grid__cell--100` |
| **XS** | `grid__cell--xs-25` | `grid__cell--xs-33` | `grid__cell--xs-50` | `grid__cell--xs-66` | `grid__cell--xs-75` | `grid__cell--xs-100` |
| **S** | `grid__cell--s-25` | `grid__cell--s-33` | `grid__cell--s-50` | `grid__cell--s-66` | `grid__cell--s-75` | `grid__cell--s-100` |
| **M** | `grid__cell--m-25` | `grid__cell--m-33` | `grid__cell--m-50` | `grid__cell--m-66` | `grid__cell--m-75` | `grid__cell--m-100` |
| **L** | `grid__cell--l-25` | `grid__cell--l-33` | `grid__cell--l-50` | `grid__cell--l-66` | `grid__cell--l-75` | `grid__cell--l-100` |
| **XL** | `grid__cell--xl-25` | `grid__cell--xl-33` | `grid__cell--xl-50` | `grid__cell--xl-66` | `grid__cell--xl-75` | `grid__cell--xl-100` |

Di seguito lo schema di come i selettori settano la dimensione alla cella all'interno dei viewport. Il selettore coprirà solo l'area dove viene specificato **Si**.

| Viewport | Selettore XS | Selettore S | Selettore M | Selettore L | Selettore XL |
|-|-|-|-|-|-|
| **auto** | **Si** | **Si** | **Si** | **Si** | **Si** |
| **XS** | **Si** | **Si** | **Si** | **Si** | **Si** |
| **S** | No | **Si** | **Si** | **Si** | **Si** |
| **M** | No | No | **Si** | **Si** | **Si** |
| **L** | No | No | No | **Si** | **Si** |
| **XL** | No | No | No | No | **Si** |

---

###### Calcolo degli step

Al fine di distribuire coerentemente le colonne, è necessario che l'addizione del valore di ogni colonna basata sulla mappa SASS `$steps` rientri nel numero 100.

| Mix di colonne | Corretto | Commento |
|-|-|-|
| `grid__cell-25 + grid__cell-25 + grid__cell-50` | **Si** | 25 + 25 + 50 = 100 |
| `grid__cell-25 + grid__cell-75` | **Si** | 25 + 75 = 100 |
| `grid__cell-33 + grid__cell-33 + grid__cell-33` | **Si** | 33 + 33 + 33 = 99 |
| `grid__cell-33 + grid__cell-66` | **Si** | 33 + 66 = 99 |
| `grid__cell-75 + grid__cell-75` | No | 75 + 75 = ~~150~~, le colonne verranno gestite con un approccio **mobile first** |

[breakpoint]: ../media/breakpoint.html
