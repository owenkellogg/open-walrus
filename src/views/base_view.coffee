View = require "famous/core/view"

class EBView extends View
  constructor: (options) ->
    super options

EBView::pipeThrough = (events) ->
  if Array.isArray events then @pipeThrough event for event in events
  else @_eventInput.on events, (e) => @_eventOutput.emit events, e

EBView::pipeThroughTouchEvents = ->
  @pipeThrough ["touchstart", "touchmove", "touchend"]

EBView::Error = class EBViewError extends Error
  constructor: (@message) ->
    @name = "EBViewError"
    Error.captureStackTrace(this, EBViewError)

EBView::error = (err) ->
  throw err

module.exports = EBView
