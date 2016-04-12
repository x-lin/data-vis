const DEFAULT_COLOR = "rgb(200,200,200)";

export default (str) => {
    if(!str) {
        return DEFAULT_COLOR;
    }

    var hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var color = '#';


    for (let i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}