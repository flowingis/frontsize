---
collection: set
date: 2018-04-12T11:20
title: Visbilità
view: example.twig

snippets:
  -
    text: In questo esempio gli elementi alternano la loro visibilità in base al viewport e differiscono per `background-color` in modo da poterne vedere il comportamento.
    html: |
      <div class="set--xs-block set--s-hide" style="background: yellow; padding: 24px;">
        Visibile solo su viewport XS
      </div>
      <div class="set--hide set--s-block set--m-hide" style="background: green; padding: 24px;">
        Visibile solo su viewport S
      </div>
      <div class="set--hide set--m-block set--l-hide" style="background: orange; padding: 24px;">
        Visibile solo su viewport M
      </div>
      <div class="set--hide set--l-block set--xl-hide" style="background: aqua; padding: 24px;">
        Visibile solo su viewport L
      </div>
      <div class="set--hide set--xl-block" style="background: pink; padding: 24px;">
        Visibile solo su viewport XL
      </div>
---
