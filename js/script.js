$(document).ready(function () {


console.log('Hello!');

// Define Variables
var submissions = 0; /*number of list items to start*/
var checkOff = '<span class="check-off">&#10004;</span>'; /*make it look different*/
var xOff = '<span class="delete">&#10008;</span>';
var tableHeader = '<th> Item </th><th> Quantity </th><th> Price </th><th> Sales Tax </th><th> Subtotal </th>';



// Define table things?
var rows = 0; //number of initial rows in table should be 0

$('#table-top').prepend(tableHeader);





// from http://www.mediacollege.com/internet/javascript/number/round.html
function roundNumber(number,decimals) {
  var newString;// The new rounded number
  decimals = Number(decimals);
  if (decimals < 1) {
    newString = (Math.round(number)).toString();
  } else {
    var numString = number.toString();
    if (numString.lastIndexOf(".") == -1) {// If there is no decimal point
      numString += ".";// give it one at the end
    }
    var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
    var d1 = Number(numString.substring(cutoff,cutoff+1));// The value of the last decimal place that we'll end up with
    var d2 = Number(numString.substring(cutoff+1,cutoff+2));// The next decimal, after the last one we want
    if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
      if (d1 == 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
        while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
          if (d1 != ".") {
            cutoff -= 1;
            d1 = Number(numString.substring(cutoff,cutoff+1));
          } else {
            cutoff -= 1;
          }
        }
      }
      d1 += 1;
    } 
    if (d1 == 10) {
      numString = numString.substring(0, numString.lastIndexOf("."));
      var roundedNum = Number(numString) + 1;
      newString = roundedNum.toString() + '.';
    } else {
      newString = numString.substring(0,cutoff) + d1.toString();
    }
  }
  if (newString.lastIndexOf(".") == -1) {// Do this again, to the new string
    newString += ".";
  }
  var decs = (newString.substring(newString.lastIndexOf(".")+1)).length;
  for(var i=0;i<decimals-decs;i++) newString += "0";
  //var newNumber = Number(newString);// make it a number if you like
  return newString; // Output the result to the form field (change for your purposes)
}


// List - put 'input' into Submitted List section



	function tableListMe (){
		var me = $('#name').val();
			me = me.replace(/\<+/g, '&lt;');
			me = me.replace(/\>+/g, '&gt;');
		var price = Number(document.getElementById('price').value);
		var qty = Number(document.getElementById('qty').value);
		var tax = Number(document.getElementById('tax').value);
		var currencySymbol = '$';
		var subtotal = qty * price;
        var taxtotal = Number(tax * subtotal);
        var rowtotal = Number(subtotal + taxtotal);


		var postTable = '<tr class="item-row"><td><textarea>'+me+'</textarea></td><td><textarea>'+qty+'</textarea></td><td><textarea class="symbol">'+currencySymbol+'</textarea><span class="price"><textarea class="moneyNumber">'+roundNumber(price,2)+'</textarea></span></td><td><textarea class="symbol">'+currencySymbol+'</textarea><span class="tax-total"><textarea class="moneyNumber">'+roundNumber(taxtotal,2)+'</textarea></span></td><td><textarea class="symbol">'+currencySymbol+'</textarea><span class="rowTotal moneyNumber">'+roundNumber(rowtotal,2)+'</span></td></tr>';
		
		$('#table-top').after(postTable);
		$('#name').val('');
		$('#price').val('');
		$('#qty').val('');
		
		$('#table-top tr:first-child') //selects the first row of table with 'tr'
		.css('opacity', "0") //so I see this is for the animation and I may or may not keep it but does it matter that the quotation marks are different?
		.css("margin-top", "-20px") //makes the new item start -20px higher than where it will fall to.
		.animate(
			{ 	opacity: "1"	}, //makes ultimate goal opacity 1
			{	queue: true, duration: 'fast'}
		)
		.animate (
			{	marginTop: "10px"}, //bring item location to original spot. Could you use this same syntax to consolidate the css above?
			{	queue: false, duration: "fast"}
		);
	};


	// need to make cash register sound

//make a total





function update_total() {
  var total = 0;
  $('.rowTotal').each(function(i){
    	subtotal = $(this).html().replace("Total: $","");
   	 	if (!isNaN(subtotal)) total += Number(subtotal);
  		});
  total = roundNumber(total,2);
  $('#idTotal').html("Total: $"+total);

}



/* function allTotal () {
	
// 	var total = 0; 
// 	$('.rowtotal').each(function(i) {
// 		var subtotal = Number($(this).text());
// 		total = Number(total + subtotal);
// 		$('#total').append(total);
// 		});
// };*/




//add button

$(document).on("click", "#enter", function(){
	// listMe();
	tableListMe();
	// allTotal();
	update_total();
});

// Allow 'enter' to submit Item



$(document).keydown(function (event) {
	if (event.keyCode == 13) {
		tableListMe();
		// allTotal();
		update_total();
	}
});

// Edit diffternt numbers

function update_price() {
  var row = $(this).parents('.item-row');
  var price = row.find('.tax-total').val().replace("$","") * row.find('.qty').val();
  price = roundNumber(price,2);
  isNaN(price) ? row.find('.price').html("N/A") : row.find('.price').html("$"+price);
  
  update_total();
}






// Reset List

$(document).on("click", "#reset", function(){
	$('#list td').empty();
    submissions = 0;
});

// Delete Items
	// make sound and animate please

$(document).on("click", ".delete", function(){
    $(this).closest('p').fadeOut(300);
});


// Check off Items
	// make ta-da sound please






// Crazy backgound thiiiiiiiing 



var colors = ["#EDEEC0", "#ED7B84", "#7397C3", "#7EB77F"];

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var pathPointsFrom, pathPointsTo, pathPointsNow;
var steps = 300;
var offset = 0;
var pathCount = 0;
var interpolationPoint = {
  percentage: 0
};
ctx.lineWidth = 4;
ctx.lineCap = "round";

function drawPathToCanvas() {
  var thisColor, lastColor = getColorSegment(0);
  ctx.strokeStyle = lastColor;
  ctx.beginPath();
  for (var i = 0, l = pathPointsNow.length; i < l; i++) {
    if (pathPointsNow[i + 1]) {
      ctx.moveTo(pathPointsNow[i].x, pathPointsNow[i].y);
      ctx.lineTo(pathPointsNow[i + 1].x, pathPointsNow[i + 1].y);
    } else {
      ctx.lineTo(pathPointsNow[i].x, pathPointsNow[i].y);
    }
    thisColor = getColorSegment(i);
    if (thisColor) {
      if (thisColor != lastColor) {
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = thisColor;
        lastColor = thisColor;
      }
    }
  }
  ctx.closePath();
  ctx.stroke();
}

function samplePath(pathSelector) {
  var path = document.getElementById(pathSelector);
  var length = path.getTotalLength();
  var points = [];
  for (var i = 0; i <= steps; i++) {
    points.push(path.getPointAtLength(length * i / steps));
  }
  return points;
}

function interpolatePaths() {
  var points = [];
  for (var i = 0; i <= steps; i++) {
    points.push({
      x: pathPointsFrom[i].x + (pathPointsTo[i].x - pathPointsFrom[i].x) * interpolationPoint.percentage,
      y: pathPointsFrom[i].y + (pathPointsTo[i].y - pathPointsFrom[i].y) * interpolationPoint.percentage
    });
  }
  return points;
}

function getColorSegment(i) {
  var p = i / steps + offset;
  if (p > 1) p = p - 1;
  var point = Math.floor(p * 4);
  return colors[point];
}

var paths = [samplePath("circle-path"), samplePath("rect-path"), samplePath("triangle-path")];

function loop() {
  ctx.clearRect(0, 0, 200, 200);
  offset = offset + 0.009;
  pathPointsNow = interpolatePaths();
  if (offset >= 1) offset = 0;
  drawPathToCanvas();
  requestAnimationFrame(loop);
}

function tweenPaths() {
  pathPointsFrom = paths[pathCount];
  if (pathCount + 1 <= 2) pathPointsTo = paths[pathCount + 1];
  else pathPointsTo = paths[0];

  TweenLite.to(interpolationPoint, 0.7, {
    percentage: 1,
    ease: Power2.easeInOut,
    delay: 0.4,
    onComplete: function() {
      interpolationPoint.percentage = 0;
      pathCount++;
      if (pathCount > 2) {
          pathCount = 0;
        }
      tweenPaths();
    }
  });
}


tweenPaths();
loop();
$('canvas').hide();
$('#colorssButt').on("click", function(event) {
	$('canvas').stop().toggle( 1000 );
  });



//    ........... Today's date

function print_today() {
  // ***********************************************
  // AUTHOR: WWW.CGISCRIPT.NET, LLC
  // URL: http://www.cgiscript.net
  // Use the script, just leave this message intact.
  // Download your FREE CGI/Perl Scripts today!
  // ( http://www.cgiscript.net/scripts.htm )
  // ***********************************************
  var now = new Date();
  var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
  var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
  function fourdigits(number) {
    return (number < 1000) ? number + 1900 : number;
  }
  var today =  months[now.getMonth()] + " " + date + ", " + (fourdigits(now.getYear()));
  return today;
}
$('#date').append(print_today());





});


