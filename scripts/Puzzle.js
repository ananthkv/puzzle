function generatePuzzleContainer(name, src){
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
            fireworks("Winner 1");
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
        case 't1': n = "t2"; break;
        case 't2': n = "t3"; break;
        case 't3': n = "t0"; break;
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
}