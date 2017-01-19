var helper = require('../helper');

helper.test({
expect:
`$row-columns-style: 'frontsize';
@include block ('row') {
  @include float-row((
    ('<=mobile-small', '<=mobile-large'): 2,
    ('>mobile-large', '<=tablet-large'): 4,
    '>tablet-large': 5
  )) {
    padding: s(1);
  }
}
`,
toBe:
`.row {
  clear: both;
  display: block;
  width: auto;
}

.row::after {
  clear: both;
  content: '';
  display: block;
  height: 1px;
  margin-top: -1px;
  width: 100%;
}

.row__column {
  display: block;
  float: left;
  width: 100%;
  padding: 20px;
}

@media (max-width: 320px) and (max-width: 480px) {
  .row__column {
    width: 50%;
  }
  .row__column:nth-child(2n + 3) {
    clear: both;
  }
}

@media (min-width: 481px) and (max-width: 1024px) {
  .row__column {
    width: 25%;
  }
  .row__column:nth-child(4n + 5) {
    clear: both;
  }
}

@media (min-width: 1025px) {
  .row__column {
    width: 20%;
  }
  .row__column:nth-child(5n + 6) {
    clear: both;
  }
}`
});

helper.test({
expect:
`$row-columns-style: 'frontsize';
@include block ('container') {
  @include element ('row') {
    @include float-row((
      ('<=mobile-small', '<=mobile-large'): 2,
      ('>mobile-large', '<=tablet-large'): 4,
      '>tablet-large': 5
    )) {
      padding: s(1);
    }
  }
}
`,
toBe:
`.container__row {
  clear: both;
  display: block;
  width: auto;
}

.container__row::after {
  clear: both;
  content: '';
  display: block;
  height: 1px;
  margin-top: -1px;
  width: 100%;
}

.container__row-column {
  display: block;
  float: left;
  width: 100%;
  padding: 20px;
}

@media (max-width: 320px) and (max-width: 480px) {
  .container__row-column {
    width: 50%;
  }
  .container__row-column:nth-child(2n + 3) {
    clear: both;
  }
}

@media (min-width: 481px) and (max-width: 1024px) {
  .container__row-column {
    width: 25%;
  }
  .container__row-column:nth-child(4n + 5) {
    clear: both;
  }
}

@media (min-width: 1025px) {
  .container__row-column {
    width: 20%;
  }
  .container__row-column:nth-child(5n + 6) {
    clear: both;
  }
}`
});

helper.test({
expect:
`$row-columns-style: 'classic';
$row-columns-name: 'col';
$row-columns-total: 12;
.row {
  @include float-row((
      '>=mobile-small', '<mobile-large': 12,
      '>=mobile-large', '<tablet-small': 6,
      '>=tablet-small', '<tablet-large': 4,
      '>=tablet-large': 3
  )) {
    padding: s(1);
  }
}
`,
toBe:
`.row {
  clear: both;
  display: block;
  width: auto;
}

.row::after {
  clear: both;
  content: '';
  display: block;
  height: 1px;
  margin-top: -1px;
  width: 100%;
}

.row .col {
  display: block;
  float: left;
  width: 100%;
  padding: 20px;
}

@media (min-width: 320px) and (max-width: 479px) {
  .row .col {
    width: 100%;
  }
  .row .col:nth-child(2n + 2) {
    clear: both;
  }
}

@media (min-width: 480px) and (max-width: 767px) {
  .row .col {
    width: 50%;
  }
  .row .col:nth-child(3n + 3) {
    clear: both;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .row .col {
    width: 33.33333%;
  }
  .row .col:nth-child(4n + 4) {
    clear: both;
  }
}

@media (min-width: 1024px) {
  .row .col {
    width: 25%;
  }
  .row .col:nth-child(5n + 5) {
    clear: both;
  }
}`
});
