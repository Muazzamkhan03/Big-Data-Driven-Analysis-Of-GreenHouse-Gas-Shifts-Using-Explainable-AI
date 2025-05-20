function capitalise(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function isEmptyOrWhitespace(str) {
    return !str || str.trim() === '';
}

export { capitalise, isEmptyOrWhitespace };