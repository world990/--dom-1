const div = dom.find("#test>.red");
console.log(div);
dom.style(test, "color", "red");

const divList = dom.find(".red");
console.log(divList);

const n = dom.find("#divList");
dom.each(divList, (n) => console.log(n));
console.log(n[0]);
