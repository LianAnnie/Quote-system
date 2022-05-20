import form from "./formChange";

describe("transformId function", () => {
    test("renders learn react link", () => {
        const linkElement = screen.getByText(/learn react/i);
        expect(linkElement).toBeInTheDocument();
    });
});
