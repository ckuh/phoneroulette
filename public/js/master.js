var params = {
  delay: 450,
  direction: 'down'
}

var machine = $('spin').slotMachine(params)
var slotMachines = []
var slotMachinesEl = []
var slotMachinesTemp = []
var valid = [false]
var rolling = true

for(var i = 0; i < 10; i++) {
  $slotMachine = $('<div class=slotMachine key='+ i +'></div>')
  slotMachinesTemp = []
  for(var j = 0; j < 10; j++) {
    $slot = $('<div class=slot></div>')
    slotMachinesTemp.push($slot.text(j))
  }

  $slotMachine.append(slotMachinesTemp)

  slotMachinesEl.push($slotMachine)
  if(i === 2) { slotMachinesEl.push($('<div class=dash>-</div>')) }
  if(i === 5) { slotMachinesEl.push($('<div class=dash>-</div>')) }
}

$('document').ready(function() {
  slotMachinesEl.forEach(function(item, index) {
    $('.content').append(item)
    if(item.attr('class') !== 'dash') { slotMachines.push($(item).slotMachine(params)) }
  })

  roll()

	$('#yes').click(function() {
    if(!rolling) {
      if(valid.every(function(item) {return item})) {
        if($('.cheat')) { $('.cheat').fadeOut('slow') }
        $oops = $('<div class=oops><h1>Oops</h1></div>')
        $oops.css({display: 'none'})
        $('#casino').after($oops)
        $('.oops').fadeIn('slow')
        valid = [false]
        $('.content').children().each(function(item, key) {
          $(key).toggleClass('correct')
        })
        roll()
        rolling = true
      } else {
        if($('.oops')) { $('.oops').fadeOut('slow') }
        $cheat = $('<div class=cheat><h1>Cheater</h1></div>')
        $cheat.css({display: 'none'})
        $('#casino').after($cheat)
        $('.cheat').fadeIn('slow')
        valid = [false]
        $('.content').children().each(function(item, key) {
          if($(key).attr('class').indexOf('correct') !== -1) {
            $(key).toggleClass('correct')
          }
        })
        roll()
        rolling = true
      }
    }
	})

	$('#no').click(function() {
    if(!rolling) {
      if($('.oops')) { $('.oops').fadeOut('slow') }
      if($('.cheat')) { $('.cheat').fadeOut('slow') }
      roll()
      if (!valid.every(function(item) {return item})) {rolling = true}
    }
	})

  $('.slotMachine').click(function() {
    $(this).toggleClass('correct')
    valid[$(this).attr('key')] = !valid[$(this).attr('key')]
  })
})

function roll () {
  slotMachines.forEach(function(item, index) {
    if(!valid[index]) {
      item.shuffle(3, function() {
        rolling = false
      })
    }
  })
}
