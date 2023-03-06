import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Modal from "../components/Modal"

//Mocks
const activeModalMock = {
    sprites: {
        front_default: "https://test.test"
    },
    id: "1",
    name: "pokemonteste",
    types: [
        {
            type: {
                name: "type test"
            }
        }
    ],
    weight: 666,
    height: 20
}

const closeModalMock = jest.fn()

//testes
describe("Teste Modal", () => {
    test("teste renderização", () => {
        render(<Modal
            activeModal={activeModalMock}
            closeModal={closeModalMock}
        />)
        //screen.logTestingPlaygroundURL()
        const img = screen.getByRole('img', { name: /pokemonteste/i })
        const id = screen.getByRole('heading', { name: /#1/i })
        const type = screen.getByText(/type test/i)
        const name = screen.getByText(/pokemonteste/i)
        const weight = screen.getByText(/66\.6 kg/i)
        const height = screen.getByText(/2\.0 m/i)
        const closeBtn = screen.getByRole('button', { name: /❌/i })
        expect(img).toBeInTheDocument()
        expect(id).toBeInTheDocument()
        expect(type).toBeInTheDocument()
        expect(name).toBeInTheDocument()
        expect(weight).toBeInTheDocument()
        expect(height).toBeInTheDocument()
        expect(closeBtn).toBeInTheDocument()
    })

    test("Click no x ativa a função closeModalMock", async () => {
        const user = userEvent.setup()
        render(<Modal
            activeModal={activeModalMock}
            closeModal={closeModalMock}
        />)
        const closeBtn = screen.getByRole('button', { name: /❌/i })
        await user.click(closeBtn)
        expect(closeModalMock).toBeCalled()
    })

})