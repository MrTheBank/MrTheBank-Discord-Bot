module.exports = {
    async Search(input, objects={}) {
        if (!input) return null;
        let res = null;
        let obj = Object.entries(objects);
        for (let val of obj) {
            if ((val[1].toLowerCase()).includes(input.toLowerCase())) {
                res = val[0];
                break;
            }
        }
        return res;
    }
}
