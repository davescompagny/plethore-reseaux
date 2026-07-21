import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DemoProfileProvider } from "@/lib/demo/DemoProfileContext";
import { ProfileSwitcher } from "./ProfileSwitcher";

describe("ProfileSwitcher", () => {
  it("defaults to the salon tab being selected", () => {
    render(
      <DemoProfileProvider storageKey="test-default">
        <ProfileSwitcher />
      </DemoProfileProvider>,
    );
    expect(screen.getByRole("tab", { name: "Salon" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Barber" })).toHaveAttribute("aria-selected", "false");
  });

  it("switches the selected profile when a tab is clicked", async () => {
    const user = userEvent.setup();
    render(
      <DemoProfileProvider storageKey="test-switch">
        <ProfileSwitcher />
      </DemoProfileProvider>,
    );

    await user.click(screen.getByRole("tab", { name: "Barber" }));

    expect(screen.getByRole("tab", { name: "Barber" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Salon" })).toHaveAttribute("aria-selected", "false");
  });
});
