const isValidPhone = (arg) => {
    return arg.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{6}$/im);
}
module.exports = isValidPhone