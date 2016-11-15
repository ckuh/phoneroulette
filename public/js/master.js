var params = {
  delay: 450,
  direction: 'down'
}

var machine = $('spin').slotMachine(params)
var slotMachines = []
var slotMachinesEl = []
var slotMachinesTemp = []
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
  if(i === 3) { slotMachinesEl.push($('<div class=dash>-</div>')) }
  if(i === 6) { slotMachinesEl.push($('<div class=dash>-</div>')) }
}

$('document').ready(function() {
  slotMachinesEl.forEach(function(item, index) {
    $('.content').prepend(item)
    if(item.attr('class') !== 'dash') { slotMachines.push($(item).slotMachine(params)) }
  })

  roll()

	$("#yes").click(function(){
    if(!rolling) {
      $oops = $('<div class=oops><h1>Oops</h1></div>')
      $oops.css({display: 'none'})
      $('#casino').after($oops)
      $('.oops').fadeIn('slow')
      roll()
      rolling = true
    }
	})

	$("#no").click(function(){
    if(!rolling) {
      if($('.oops')) { $('.oops').fadeOut('slow') }
      roll()
      rolling = true
    }
	})
})

function roll () {
  slotMachines.forEach(function(item) {
    item.shuffle(3, function() {
      rolling = false
    })
  })
}
