function rotate(obj) {
    let l = obj.classList;
    let t = "t0";
    for(i=0;i<l.length;i++){
        t = l[i];
        if(t === "t0" || t === "t1" || t === "t2" || t === "t3") {
            break;
        }
    }
    let n;
    switch(t) {
        case 't0': n = "t1"; break;
        case 't1': n = "t2"; break;
        case 't2': n = "t3"; break;
        case 't3': n = "t0"; break;
        default: n = "t0";
    }
    obj.classList.remove(t);
    obj.classList.add(n);
}   