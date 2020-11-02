const helper = (expression) => new Function(`return this.${expression}`);
helper('a.b.c', { a: { b: { c: 1 } } });
