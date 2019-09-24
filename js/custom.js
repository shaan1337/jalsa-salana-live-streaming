var calcLengths = function(browserWidth,browserHeight,playerWidthRatio,playerHeightRatio,containerWidth){
	var ratioPlayer = playerWidthRatio / playerHeightRatio
	var ratioBrowser = browserWidth / browserHeight
	var padding = 50;

	var result = {};

	if(browserWidth * playerHeightRatio <= browserHeight * playerWidthRatio){
		playerWidth = Math.min(browserWidth-padding*2,containerWidth);
	}
	else{
		playerWidth = Math.min((browserHeight-padding*2)/playerHeightRatio * playerWidthRatio,containerWidth);
	}

  if(playerWidth<400) playerWidth = containerWidth;

	playerHeight = playerWidth/playerWidthRatio * playerHeightRatio;

	result.playerWidth = playerWidth;
	result.playerHeight = playerHeight;
	result.padding = padding;

	return result;
};

var getNavBarHeightAfterScroll = function(){
	var navBarHeight = $('#mainNav').outerHeight();
	var navBarPadding =  $("#mainNav").outerHeight() - $("#mainNav").height();

	if(navBarPadding>0){
		navBarHeight-=30;
	}

	return navBarHeight;
}

var adjustPlayerSize = function(){
	var navBarHeight = getNavBarHeightAfterScroll();
	var browserWidth = $(window).width();
	var browserHeight = $(window).height() - navBarHeight - $('#youtube-links').height();
	var containerWidth = $('#yt-video-container').width();

	var result = calcLengths(browserWidth,browserHeight,16,9,containerWidth);
	$('#livestream').css("padding-top",result.padding+"px");
	$('#livestream').css("padding-bottom",result.padding+"px");

	$('#livestream iframe').width(result.playerWidth+"px");
	$('#livestream iframe').height(result.playerHeight+"px");
};

$(document).ready(function() {
	adjustPlayerSize();
});

$(window).resize(function(){
	adjustPlayerSize();
});
