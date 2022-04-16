const form = {
    handleQtyChange(index, e, originData) {
        let data = [...originData];
        data[index][e.target.name] = e.target.value;
        return data;
    },
};

export default form;
