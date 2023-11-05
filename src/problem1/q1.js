// Assumption: n is a non-negative integer

var sum_to_n_a = function (n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sum_to_n_b = function (n) {
    return n <= 1 ?
        n :
        n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function (n) {
    return sum_to_n_c_iter(n, 0);
};

function sum_to_n_c_iter(n, sum) {
    return n <= 1 ?
        n + sum :
        sum_to_n_c_iter(n - 1, sum + n);
}

// console.log(sum_to_n_a(-5));
// console.log(sum_to_n_b(5));
// console.log(sum_to_n_c(5));