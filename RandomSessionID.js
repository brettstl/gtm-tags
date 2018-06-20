// Random Session ID 34
function() {
    return new Date().getTime() + '.' + Math.random().toString(36).substring(5);
}