(function() {
	let player = document.querySelector(".myplayer");
	let video = document.querySelector("video");
	let play = document.querySelector('.play');
	let pause = document.querySelector('.pause');
	let fullScreen = document.querySelector('.fullScreen');
	let borderRadius = document.querySelector('.borderRadius');
	let playRatio = document.querySelector('.playRatio');
	let quickly = document.querySelector('.quickly');
	let volumeBox = document.querySelector('.volumeBox');
	let duration = document.querySelector('.duration');
	let durationNow = document.querySelector('.durationNow');
	let volumeNumber = document.querySelector('.volumeNumber');
	let progressRadius = document.querySelector('.progressRadius');
	let progressNow = document.querySelector('.progressNow');
	let progressBar = document.querySelector('.progressVideo');
	let volumeOnKey = document.querySelector(".volumeOnKey");
	let videoDuration = 0;
	let isdouble = false;
	player.onclick = function(e) {
		e = e || event;
		isdouble = false;
		setTimeout(() => {
			if (e.target == video && !isdouble || e.target == this.firstElementChild) {
				if (getComputedStyle(play).display == "none") {
					video.pause();
					this.firstElementChild.style.display = 'block';
					pause.style.display = 'none';
					play.style.display = 'block';
				} else {
					video.play();
					this.firstElementChild.style.display = 'none';
					play.style.display = 'none';
					pause.style.display = 'block';
				}
			}
		}, 300)
	}
	player.ondblclick = function(e) {
		isdouble = true;
		if (e.target == video && isdouble) {
			FullScreen();
		}
	}
	video.onloadeddata = (e) => {
		e = e || event;
		videoDuration = video.duration;
		let hour = null;
		let minutes = Math.floor(videoDuration / 60);
		let second = Math.floor(videoDuration % 60);
		if (minutes > 60) {
			hour = Math.floor(minutes / 60);
			hour = hour < 10 ? '0' + hour : hour;
			minutes = minutes % 60;
		}
		let newminutes = minutes < 10 ? '0' + minutes : minutes;
		let newsecond = second < 10 ? '0' + second : second;
		let newduration = hour ? hour + ":" + newminutes + ":" + newsecond : newminutes + ":" + newsecond;
		duration.textContent = newduration;
	};

	window.onresize = function() {
		changeProess()
	}
	let ratioActice = document.querySelector(".ratioActice");
	playRatio.onclick = function(e) {
		e = e || event;
		e.stopPropagation();
		if (e.target != this.lastElementChild && e.target != this) {
			ratioActice.classList.remove("ratioActice");
			e.target.classList.add("ratioActice");
			video.playbackRate = parseFloat(e.target.dataset.ratio);
			ratioActice = e.target;
		}
	}
	progressBar.onclick = function(e) {
		e = e || event;
		e.stopPropagation();
		let ww = e.offsetX;
		progressNow.previousElementSibling.style.transform = "translate(" + ww + "px,-2.5px)";
		progressNow.style.width = ww + progressRadius.offsetWidth / 2 + 'px';
		video.play();
		player.firstElementChild.style.display = 'none';
		play.style.display = 'none';
		pause.style.display = 'block';
		video.currentTime = (ww / this.offsetWidth) * videoDuration;
	}
	volumeBox.onclick = function(e) {
		e = e || event;
		e.stopPropagation();
		let height = borderRadius.parentNode.offsetHeight - borderRadius.offsetHeight;
		let newtop = 0;
		if (e.target == this) {
			newtop = e.offsetY - borderRadius.offsetHeight;
		} else if (e.target == this.firstElementChild) {
			newtop = e.offsetY;
		} else {
			newtop = e.offsetY + (height - borderRadius.nextElementSibling.offsetHeight);
		}
		if (newtop < 0) {
			newtop = 0;
		}
		if (newtop > height) {
			newtop = height;
		}
		video.volume = (height - newtop) / height;
		volumeNumber.textContent = Math.floor((height - newtop) / height * 100);
		borderRadius.style.top = newtop + 'px';
		borderRadius.nextElementSibling.style.height = (height - newtop) + 'px';
	}
	let volumeIcon = document.querySelector('.volumeIcon');
	video.ontimeupdate = (event) => {
		let minutes = null;
		let second = Math.floor(video.currentTime);
		changeProess();
		if (second > 60) {
			minutes = Math.floor(second / 60);
			second = second % 60;
			minutes = minutes < 10 ? '0' + minutes : minutes;
		}
		second = second < 10 ? '0' + second : second;
		let newduration = minutes ? minutes + ":" + second : "00:" + second;
		durationNow.textContent = newduration;
	};
	borderRadius.onmousedown = function(e) {
		e = e || event;
		e.stopPropagation();
		if (this.setCapture) {
			this.setCapture();
		}

		let height = this.parentNode.offsetHeight - this.offsetHeight;
		let nextheight = this.offsetTop;
		let y = e.clientY;
		document.onmousemove = (e) => {
			e = e || event;
			if (getComputedStyle(volumeBox.parentElement).display == "none") {
				return false;
			}
			let newy = e.clientY;
			let newtop = newy - y + nextheight;
			if (newtop < 0) {
				newtop = 0;
			}
			if (newtop > height) {
				newtop = height;
			}
			video.volume = (height - newtop) / height;
			volumeNumber.textContent = Math.floor((height - newtop) / height * 100);
			this.style.top = newtop + 'px';
			this.nextElementSibling.style.height = height - newtop + 'px';
		}
		document.onmouseup = () => {
			document.onmousemove = document.onmouseup = null;
			if (document.releaseCapture) {
				document.releaseCapture();
			}
		}
		return false;
	}
	pause.onclick = function(e) {
		e = e || event;
		e.stopPropagation();
		video.pause();
		player.firstElementChild.style.display = 'block';
		pause.style.display = 'none';
		play.style.display = 'block';
	}
	play.onclick = function(e) {
		e = e || event;
		e.stopPropagation();
		video.play();
		player.firstElementChild.style.display = 'none';
		play.style.display = 'none';
		pause.style.display = 'block';
	}
	let isFullScreen = false;
	//全屏
	fullScreen.onclick = FullScreen;
	function changeProess(){
		setTimeout(()=>{
			let second = Math.floor(video.currentTime);
			let newWidth = progressBar.offsetWidth - progressRadius.offsetWidth;
			console.log(newWidth);
			progressNow.previousElementSibling.style.transform = "translate(" + (newWidth * (second / video
				.duration) - 3) + "px,-2.5px)";
			progressNow.style.width = (newWidth * (second / video.duration) + progressRadius.offsetWidth / 2) +
				'px';
		},100)
	}
	function FullScreen(e) {
		e = e || event;
		e.stopPropagation();
		changeProess()
		if (isFullScreen) {
			// 全屏切到不全屏
			isFullScreen = false;
			fullScreen.firstElementChild.style.display = 'block';
			fullScreen.lastElementChild.style.display = 'none';
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		} else {
			isFullScreen = true
			fullScreen.firstElementChild.style.display = 'none';
			fullScreen.lastElementChild.style.display = 'block';
			//W3C  
			if (player.requestFullscreen) {
				player.requestFullscreen();
			}
			//FireFox  
			else if (player.mozRequestFullScreen) {
				player.mozRequestFullScreen();
			}
			//Chrome等  
			else if (player.webkitRequestFullScreen) {
				player.webkitRequestFullScreen();
			}
			//IE11
			else if (player.msRequestFullscreen) {
				player.msRequestFullscreen();
			}

		}
		
		
	}
	let mousemove = null;
	player.onmousemove = function() {
		if (mousemove) {
			clearTimeout(mousemove);
			this.lastElementChild.style.opacity = '1';
			this.style.cursor = 'auto';
		}
		mousemove = setTimeout(() => {
			this.lastElementChild.style.opacity = '0';
			this.style.cursor = 'none';
		}, 3000)
	}
	player.onmouseleave = function() {
		this.lastElementChild.style.opacity = '0';
	}

	document.onkeydown = function(e) {
		e = e || event;
		if (e.code == "Space") {
			if (getComputedStyle(play).display == "none") {
				video.pause();
				player.firstElementChild.style.display = 'block';
				pause.style.display = 'none';
				play.style.display = 'block';
			} else {
				video.play();
				player.firstElementChild.style.display = 'none';
				play.style.display = 'none';
				pause.style.display = 'block';
			}
		} else if (e.code == "ArrowUp") {
			try {
				let volume = Math.floor(video.volume * 10) + 1;
				video.volume = volume / 10;
			} catch (e) {
				video.volume = 1;
			}
			volumeOnKey.style.opacity = '1';
			volumeOnKey.style.zIndex = '99';
		} else if (e.code == "ArrowRight") {
			video.currentTime = video.currentTime + 5;
		} else if (e.code == "ArrowDown") {
			video.volume - 0.1 < 0.1 ? video.volume = 0 : video.volume -= 0.1;
			volumeOnKey.style.opacity = '1';
			volumeOnKey.style.zIndex = '99';
		} else if (e.code == "ArrowLeft") {
			video.currentTime = video.currentTime - 5;
		} else {
			return false;
		}
	}
	let volumeTimer = null;
	video.addEventListener("volumechange", () => {
		clearTimeout(volumeTimer);
		volumeTimer = null;
		volumeTimer = setTimeout(() => {
			volumeOnKey.style.opacity = '0';
			volumeOnKey.style.zIndex = '0';
		}, 2000)
		let volume = video.volume;
		volumeNumber.textContent = Math.floor(video.volume * 100);
		let height = borderRadius.parentElement.offsetHeight - borderRadius.offsetHeight;
		borderRadius.style.top = height - video.volume * height + 'px';
		borderRadius.nextElementSibling.style.height = video.volume * height + 'px';
		if (!volume) {
			volumeOnKey.children[0].classList.remove("icon-volume");
			volumeOnKey.children[0].classList.add("icon-jingyin");
			volumeOnKey.children[1].textContent = "静音";
			volumeIcon.firstElementChild.style.display = 'none';
			volumeIcon.lastElementChild.style.display = 'block';
		} else {
			volumeIcon.firstElementChild.style.display = 'block';
			volumeIcon.lastElementChild.style.display = 'none';
			volumeOnKey.children[0].classList.add("icon-volume");
			volumeOnKey.children[0].classList.remove("icon-jingyin");
			volumeOnKey.children[1].textContent = parseInt(volume * 100) + "%";
		}
	})
	video.addEventListener('ended', () => {
		player.firstElementChild.style.display = 'block';
		pause.style.display = 'none';
		play.style.display = 'block';
	});
})()
