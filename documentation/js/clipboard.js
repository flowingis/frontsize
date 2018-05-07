$(function () {
  var clipboard = new ClipboardJS('.code')
  var defaultText = ''
  var timeout

  clipboard.on('success', function (e) {
    var $clipboard = $(e.trigger).find('.code__clipboard')
    if (defaultText === '') {
      defaultText = $clipboard.text()
    }
    $clipboard.text($clipboard.data('text-success'))
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      $clipboard.text(defaultText)
    }, 3000)
    e.clearSelection()
  })

  clipboard.on('error', function (e) {
    var $clipboard = $(e.trigger).find('.code__clipboard')
    $clipboard.text($clipboard.data('text-error'))
  })
})
