function generateGridContainer(srcId){
    src = document.getElementById(srcId)
    for(i in namesList) {
        const name = namesList[i];
        const anchorTemplate = document.createElement('a', {"onclick": "javascript:generatePuzzleContainer('"+name+"', this);", "href": "#"});
        anchorTemplate.setAttribute("onclick", "javascript:generatePuzzleContainer('"+name+"', this);");
        anchorTemplate.href = "#";
        const imgTemplate = document.createElement('img', {"src": "images/"+name+".png", "class": "image-container"});
        imgTemplate.src = "images/"+name+".png";
        imgTemplate.classList.add("image-container");
        anchorTemplate.appendChild(imgTemplate.cloneNode(true));
        src.appendChild(anchorTemplate.cloneNode(true));    
    };
}

function generatePuzzleContainer(name, src){
    playSoundEffectFast('crumble-audio');
    src.parentElement.style.display = 'none';
    const puzzleContainer = document.getElementById('puzzle-container');
    const homeIcon = document.getElementById('home-icon');
    homeIcon.style.display = 'block';
    const template = document.createElement('div', {"onclick": "javascript:play(this);", "class": name + " puzzle"});
    for(i=1;i<=6;i++) {
        const node = template.cloneNode(true);
        node.onclick = function () {
            play(this);
        };
        node.classList.add(name);
        node.classList.add("puzzle");
        node.classList.add("piece"+i);
        const rand = (parseInt(Math.random() * 100) % 3) + 1;
        node.classList.add("t"+rand);
        puzzleContainer.appendChild(node);
    }
}

function play(obj) {
    rotate(obj);
    const winner = validate(obj);
    if(winner === true){
        setTimeout(() => {
            fireworks("You Win!");
        }, 10);
    }
}

function rotate(obj) {
    let l = obj.classList;
    let t = "t0";
    for(i=0;i<l.length;i++){
        t = l[i];
        if(t.match(/^t\d$/)) {
            break;
        }
    }
    let n;
    switch(t) {
        case 't0': n = "t0"; break;
        case 't1': n = "t2"; playSoundEffect('pop-audio');break;
        case 't2': n = "t3"; playSoundEffect('pop-audio');break;
        case 't3': n = "t0"; playSoundEffect('click-audio');break;
        default: n = "t0";
    }
    obj.classList.remove(t);
    obj.classList.add(n);
}

function validate(obj) {
    let winner = true;
    for(k=0;k<obj.parentElement.children.length;k++) {
        if(obj.parentElement.children[k].classList.contains('t0') === false) {
            winner = false;
        }
    }
    return winner;
}

function fireworks(str) {
    console.log(str);
    const starIcon = document.getElementById('star-icon');
    starIcon.style.display = 'block';
    playSoundEffect('yeah-audio');
}

function playSoundEffect(audioId, speed) {
    const audio = document.getElementById(audioId);
    audio.currentTime = 0;
    if(speed) { 
        audio.playbackRate = speed;
    }
    audio.play();
    if(speed) { 
        audio.playbackRate = 1;
    }
}

function playSoundEffectFast(audioId) {
    const audio = document.getElementById(audioId);
    audio.playbackRate = 4;
    audio.currentTime = 0;
    audio.play();
}
