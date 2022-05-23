import form from "./formChange";

describe("transformId function", () => {
    test("renders learn react link", () => {
        const result = form.transformId(12, 3);
        expect(result).toBe("012");
    });
});
