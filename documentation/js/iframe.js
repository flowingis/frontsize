$(function () {
  if ($('.layout-nav').length === 0) {
    return
  }

  var $buttonSetColor = $('.button-option--color')
  var $buttonSetViewport = $('.button-option--viewport')
  var $iframes = $('.layout-wrapper__iframe')
  var $iframeContainer = $('.layout-wrapper__container')
  var iframeGridPadding = parseInt($('.layout-wrapper__grid').css('padding-left').replace('px', '')) * 2
  var $switchFullscreen = $('#fullscreen')
  var $switchMinMax = $('#min-max')
  var $switchShowHideCode = $('#show-hide-code')

  var setting = {
    size: $iframeContainer.innerWidth() - iframeGridPadding,
    background: 'light'
  }

  $.fn.isInViewport = function () {
    var elementTop = $(this).offset().top
    var elementBottom = elementTop + $(this).outerHeight()
    var viewportTop = $(window).scrollTop()
    var viewportBottom = viewportTop + $(window).height()
    return elementBottom > viewportTop && elementTop < viewportBottom
  }

  function applyToIFrame ($iframe) {
    $iframe.css('width', setting.size + 'px')

    if (setting.background !== 'transparent') {
      $iframe.closest('.layout-wrapper__grid')
        .removeClass('layout-wrapper__grid--transparent')
        .css('background-color', setting.background)
    } else {
      $iframe.closest('.layout-wrapper__grid')
        .addClass('layout-wrapper__grid--transparent')
        .attr('style', '')
    }

    setTimeout(function () {
      $iframe.each(function () {
        if (this.contentWindow.document.body !== null) {
          var height = this.contentWindow.document.body.scrollHeight
          $(this).css('height', height + 'px')
        }
      })
    }, 751)
  }

  function updateIFrames () {
    $iframes.each(function () {
      var $iframe = $(this)
      if ($iframe.isInViewport()) {
        applyToIFrame($iframe)
      }

      if (setting.size > $iframeContainer.outerWidth()) {
        $iframeContainer.addClass('layout-wrapper__container--show-overflow')
      } else {
        $iframeContainer.removeClass('layout-wrapper__container--show-overflow')
      }
    })
  }

  function checkMinMaxViewport () {
    var viewport = 1
    $switchMinMax.is(':checked') ? viewport = 1 : viewport = 0
    setting.size = $('.button-option--viewport.button-option--active').attr('data-viewport').split(',')[viewport]

    $('.tooltip__item').removeClass('tooltip__item--active')
    $($('.button-option--viewport.button-option--active').closest('.tooltip').find('.tooltip__item')[viewport]).addClass('tooltip__item--active')
  }

  $(window).on('resize scroll', function () {
    updateIFrames()
  })

  $switchShowHideCode.on('change', function () {
    var showCode = true
    $(this).is(':checked') ? showCode = true : showCode = false
    if (showCode) {
      $('.code').removeClass('code--hidden')
    } else {
      $('.code').addClass('code--hidden')
    }
  })

  $switchMinMax.on('change', function () {
    checkMinMaxViewport()
    updateIFrames()
  })

  $switchFullscreen.on('change', function () {
    $('.aside__open .aside__logo').toggleClass('aside__logo--fullscreen')
    $('.layout-limiter').toggleClass('layout-limiter--fullscreen')
  })

  $buttonSetViewport.on('click', function (e) {
    e.preventDefault()

    $switchMinMax.prop('checked', !$switchMinMax.prop('checked'))

    $buttonSetViewport.removeClass('button-option--active')
    $(this).addClass('button-option--active')

    checkMinMaxViewport()

    $switchMinMax.closest('.input-switch').removeClass('input-switch--disabled')

    updateIFrames()
  })

  $buttonSetColor.on('click', function (e) {
    e.preventDefault()
    $buttonSetColor.removeClass('button-option--active')
    $('.color').removeClass('color--active')
    $(this).addClass('button-option--active')
    $(this).find('.color').addClass('color--active')

    setting.background = $(this).attr('data-color')

    $('.layout-wrapper__grid').removeClass('layout-wrapper__grid--transparent')

    updateIFrames()
  })

  updateIFrames()
})
