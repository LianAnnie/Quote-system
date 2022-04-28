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
    getMaxsn(array) {
        const maxsn =
            array.reduce(
                (max, sn) =>
                    Number(max) > Number(sn) ? Number(max) : Number(sn),
                0,
            ) + 1;
        return maxsn;
    },
    handleListChange(condition, data) {
        const filterKeyArray = Object.keys(condition);
        let copyFilterList = [...data];
        const newFilterList = copyFilterList.filter(
            m =>
                !filterKeyArray
                    .map(key =>
                        key === "id"
                            ? m[key]
                                  .join("")
                                  .toLowerCase()
                                  .includes(condition[key].toLowerCase())
                            : m[key]
                                  .toLowerCase()
                                  .includes(condition[key].toLowerCase()),
                    )
                    .some(e => !e),
        );
        return newFilterList;
    },
    handleSNNumberChange(data, list) {
        const checkId = [...data.id];
        checkId.pop();
        const copyList = JSON.parse(JSON.stringify(list));
        const snArray = copyList
            .map(e => {
                const lastId = e.id.pop();
                return [e.id.join(""), lastId];
            })
            .map(e => (e[0] === checkId.join("") ? Number(e[1]) : undefined))
            .filter(sn => sn !== undefined);
        const maxsn = form.getMaxsn(snArray);
        return form.transformId(maxsn, 2);
    },
};

export default form;
