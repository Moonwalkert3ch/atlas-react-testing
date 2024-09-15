import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { CoverArt } from "../components/CoverArt";

test('Cover image renders correctly', () => {
    const { container } = render(<CoverArt cover="https://example.com/cover1.jpg" />);
    expect(container).toMatchSnapshot();
});

test("cover image changes with songs renders correctly", () => {
    const { container } = render(<CoverArt cover="https://example.com/cover2.jpg" />);
    expect(container).toMatchSnapshot();
});

test('no cover renders correctly', () => {
    const { container } = render(<CoverArt cover="" />);
    expect(container).toMatchSnapshot();
});