import { render, screen, fireEvent } from "@testing-library/react";
import TemplateCard from "./TemplateCard";
import { describe, it, expect, vi } from "vitest";

describe("TemplateCard", () => {
  it("renders template name and calls onUseTemplate", () => {
    const handleUseTemplate = vi.fn();
    const template = {
      id: "classic",
      name: "Classic Resume",
      description: "Clean layout",
      primaryColor: "#1976d2",
    };

    render(<TemplateCard template={template} onUseTemplate={handleUseTemplate} />);

    expect(screen.getByText(/Classic Resume/i)).toBeInTheDocument();

    // The button appears in the DOM, we can fire click
    const button = screen.getByRole("button", { name: /use template/i });
    fireEvent.click(button);

    expect(handleUseTemplate).toHaveBeenCalledTimes(1);
  });
});
