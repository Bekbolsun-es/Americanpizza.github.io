let currentIndex = 0;
cons clava2 = document.querySelectorALL('.clava2');
function goToSLide(index){
	if (index &lt;0){
		index = clava2.length - 1;
	}else if ( index &gt;=clava2.length)
index = 0;
}
currentIndex = index;
document.querySelector('.clava1').style.transform = 'translateX('