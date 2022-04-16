const form = {
    transformId(id, number) {
        if (id.length === number) return id;
        else return id.toString().padStart(number, 0);
    },
    handleChange(itemIndex, e, originData) {
        let data;
        if (originData.length === undefined) {
            data = JSON.parse(JSON.stringify(originData));
            //waiting check: 這樣寫才rerender,真的是拷貝問題？
            data[e.target.name] = e.target.value;
        }
        if (originData.length > 0) {
            data = [...originData];
            console.log(data);
            data[itemIndex][e.target.name] = e.target.value;
        }
        console.log(data);
        return data;
    },
    deleteProduct(itemIndex, originData) {
        const data = originData.filter((_, index) => index !== itemIndex);
        return data;
    },
};

export default form;
