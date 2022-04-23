const form = {
    transformId(id, number) {
        if (id.length === number) return id;
        else return id.toString().padStart(number, 0);
    },
    getMaxId(list, startNumber, lastNumber) {
        const listMaxId = list.reduce((max, e) => {
            const id = Number(e.id.substring(startNumber, lastNumber));
            if (id > max) {
                max = id;
            }
            return max;
        }, 0);
        return listMaxId;
    },
    handleChange(itemIndex, e, originData) {
        let data;
        if (originData.length === undefined) {
            data = JSON.parse(JSON.stringify(originData));
            //waiting check: 這樣寫才rerender,真的是拷貝問題？
            // console.log(e.target.name);
            data[e.target.name] = e.target.value;
        }
        if (originData.length > 0) {
            data = JSON.parse(JSON.stringify(originData));
            // console.log(data);
            // console.log(itemIndex);
            data[itemIndex][e.target.name] = e.target.value;
        }
        return data;
    },
    deleteProduct(itemIndex, originData) {
        const data = originData.filter((_, index) => index !== itemIndex);
        return data;
    },
};

export default form;