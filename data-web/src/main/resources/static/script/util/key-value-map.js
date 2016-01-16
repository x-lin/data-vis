app.factory('KeyValueMap', function() {

    var KeyValueMap = function (data, type) {
        this.data = {};

        this.type = type;

        if(Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
                this.data[data[i].key] = data[i];
            }
        } else if(typeof data === "object") {
            this.data[data.key] = data;
        }

    };

    KeyValueMap.prototype.getValue = function (key) {
        if (this.data.hasOwnProperty(key)) {
            return this.data[key];
        } else {
            return null;
        }
    };

    KeyValueMap.prototype.hasValue = function () {
        return this.data.hasOwnProperty(key);
    };

    KeyValueMap.prototype.size = function () {
        return Object.keys(this.data).length;
    };

    return KeyValueMap;
});