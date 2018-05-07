---
collection: media
date: 2018-04-13T09:25
title: Breakpoint
view: example.twig
---

La configurazione dei media query, si trovano qui:

```
frontend/dev/styles/grid/_config/vendor/include-media.scss
```

---

### Breakpoint

All'interno del file troverete la configurazione dei **breakpoint** simile a questa:

```scss
$breakpoints: (
  'xs': 320px,
  's': 768px,
  'm': 960px,
  'l': 1440px,
  'xl': 1600px
);
```

Di seguito la lista dei breakpoint e le dimensioni nelle quali operano:

| Viewport | Area minima | Area massima | Dimensione automatica | Dispositivi in ordine di utilizzo |
|-|-|-|-|
| **XS** | `0px` | `767px` | [Si](#dimensione-automatica) | Smartphone e alcuni tablet molto piccoli o di vecchia generazione |
| **S** | `768px` | `959px` | No | Dispositivi Tablet e qualche Smartphone |
| **M** | `960px` | `1439px` | No | Dispositivi Tablet e Notebook |
| **L** | `1440px` | `1599px` | No | Computer Desktop e SmartTV |
| **XL** | `1600px` | `>1600px` | No | SmartTV e computer Desktop |

Per poterla utilizzare all'interno del codice **SASS** è necessario utilizzare il mixin `media` basato sulla libreria open source [Include Media](https://include-media.com/):

```scss
.selector {
  @include media ('>=m', '<xl') {
    background-color: red;
  }
}
```

È opportuno utilizzare questa convenzione per evitare inconsistenza nel comportamento della griglia.

---

###### Dimensione automatica

Per assicurare una gestione automatica delle colonne quando non c'è spazio disponibile, il viewport **XS** si occuperà di portare le colonne a `width: 100%` in modo che sui dispositivi smartphone i contenuti risultino leggibili senza dover specificare il comportamento manualmente.

###### Convenzione dei nomi

| Viewport | Convenzione | Descrizione |
|-|-|-|
| **auto** | `.grid__cell--**` | La proprietà `width` di questa cella verrà portata a `100%` se si troverà nel viewport **XS** |
| **XS** | `.grid__cell--xs-**` | I due caratteri `**` corrispondono allo [step][step] che vogliamo utilizzare. |
| **S** | `.grid__cell--s-**` | - |
| **M** | `.grid__cell--m-**` | - |
| **L** | `.grid__cell--l-**` | - |
| **XL** | `.grid__cell--xl-**` | - |

Di seguito lo schema di come i selettori settano la dimensione alla cella rispetto al viewport utilizzato.

Esempio: per **Selettore XS** si intende `grid__cell--xs-**`, troverai ulteriori dettagli sui nomi dei selettori nella sezione [step][step].

###### Area di azione selettori

| Viewport | Selettore XS | Selettore S | Selettore M | Selettore L | Selettore XL | Ordine di dichiarazione |
|-|-|-|-|-|-|-|
| **auto** | **Si** | **Si** | **Si** | **Si** | **Si** | 1 |
| **XS** | **Si** | **Si** | **Si** | **Si** | **Si** | 2 |
| **S** | No | **Si** | **Si** | **Si** | **Si** | 3 |
| **M** | No | No | **Si** | **Si** | **Si** | 4 |
| **L** | No | No | No | **Si** | **Si** | 5 |
| **XL** | No | No | No | No | **Si** | 6 |

L'**ordine di dichiarazione** serve a chiarire qual'è l'ordine con il quale i selettori sono dichiarati partendo dall'inizio del file **CSS**. Questa informazione può essere utile per capire la logica di sovrascrittura dei selettori. Il selettore con il numero più alto sovrascrive quello compreso in un numero più basso. Ciò significa che il *Selettore L* sovrascriverà il *Selettore S*, ma si attiverà solo partendo dal viewport *L*.


[step]: ../grid/step.html#schema-degli-step
