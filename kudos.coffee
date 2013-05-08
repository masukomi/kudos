class Kudoable
  constructor: (@element) ->
    @bindEvents()
    @counter = $('.count .num', @element)
    @element.data 'kudoable', this

  bindEvents: ->
    @element.mouseenter @start
    @element.mouseleave @end
    @element.click @unkudo
    $(this.element).on 'touchstart', @element, @start
    $(this.element).on 'touchend', @element, @end

  isKudoable: ->
    @element.hasClass 'kudoable'

  isKudod: ->
    @element.hasClass 'complete'

  start: =>
    if @isKudoable() and not @isKudod()
      @element.trigger 'kudo:active'
      @element.addClass 'active'
      @timer = setTimeout @complete, 700

  end: =>
    if @isKudoable() and not @isKudod()
      @element.trigger 'kudo:inactive'
      @element.removeClass 'active'
      clearTimeout @timer if @timer?

  complete: =>
    @end()
    @incrementCount()
    @element.addClass 'complete'
    @element.trigger 'kudo:added'

  unkudo: (event) =>
    event.preventDefault()

    if @isKudod()
      @decrementCount()
      @element.removeClass 'complete'
      @element.trigger 'kudo:removed'

  setCount: (count) ->
    @counter.html count

  currentCount: ->
    parseInt @counter.html()

  incrementCount: ->
    @setCount @currentCount() + 1

  decrementCount: ->
    @setCount @currentCount() - 1

# jQuery wrapper
jQuery ($) ->
  $.fn.kudoable = ->
    @each ->
      new Kudoable $(this)
