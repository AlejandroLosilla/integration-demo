import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "./Button"

const onClick = jest.fn(() => true)

describe("UI test for Button", () => {
  it("Should render Button", () => {
    render(<Button onClick={onClick} text="::Button::" />)
    const button = screen.getByText("::Button::")
    expect(button).toBeInTheDocument()
    expect(button).not.toBeNull()
  })

  it("Should trigger handleClick Event", async () => {
    render(<Button onClick={onClick} text="::Button::" />)
    const button = screen.getByText("::Button::")
    fireEvent.click(button)
    expect(onClick).toBeCalledTimes(1)
  })

  it('should render a disabled button if "disabled" is true', () => {
    render(<Button onClick={onClick} text="::Button::" disabled={true} />)
    const button = screen.getByText("::Button::") as HTMLButtonElement
    expect(button).toBeDisabled()
  })

  it('should not render a disabled button if "disabled" is false', () => {
    render(<Button onClick={onClick} text="::Button::" disabled={false} />)
    const button = screen.getByText("::Button::") as HTMLButtonElement
    expect(button).not.toBeDisabled()
  })

  it('should not render a disabled button if "disabled" is undefined', () => {
    render(<Button onClick={onClick} text="::Button::" />)
    const button = screen.getByText("::Button::") as HTMLButtonElement
    expect(button).not.toBeDisabled()
  })
})
