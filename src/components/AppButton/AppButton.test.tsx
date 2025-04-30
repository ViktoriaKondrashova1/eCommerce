import { AppButton } from '@/components/AppButton/AppButton'
import { render, screen } from '@testing-library/react'

/**
 * IMPORTANT
 *  очень важно чтобы на тестируемом элементе был установлен атрибут data-testid
 *  это позволяет нам находить элемент в тестах через screen.getByTestId
 *  это позволяет нам не зависеть от структуры компонента и не использовать селекторы
 */

// всегда нужно импортировать render, screen
// 1. render - это функция, которая рендерит компонент в виртуальный DOM
// 2. screen - это объект, который предоставляет доступ к элементам, которые были отрендерены в виртуальном DOM
// 3. AppButton - это компонент, который мы тестируем
// 4. describe - это функция, которая группирует тесты по определенной теме
// 5. it - это функция, которая определяет отдельный тест
// 6. expect - это функция, которая создает утверждение о том, что должно произойти в тесте
// 7. toBeInTheDocument - это матчер, который проверяет, что элемент присутствует в документе
// 8. toHaveTextContent - это матчер, который проверяет, что элемент содержит определенный текст
// 9. toHaveClass - это матчер, который проверяет, что элемент имеет определенный класс

// describe - это набор тестов, который объединяет несколько тестов в одну группу
describe('appButton positive', () => {
  // it - это отдельный тест
  it('should render the button with the correct text', () => {
    // рисуем
    render(<AppButton type="primary">Primary Button</AppButton>)

    // находим
    const button = screen.getByTestId('button')

    // проверяем
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Primary Button')
  })

  it('should apply the correct type class', () => {
    render(<AppButton type="primary" className="test-className">Primary Button</AppButton>)
    const button = screen.getByTestId('button')
    expect(button).toHaveClass('test-className')
  })

  it('should render the button with icon', () => {
    render(<AppButton type="primary" icon={<span data-testid="test-icon">Icon</span>}>Primary Button</AppButton>)

    const button = screen.getByTestId('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Primary Button')

    const icon = screen.getByTestId('test-icon')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveTextContent('Icon')
  })
})

describe('appButton negative', () => {
  it('should render the button without icon', () => {
    render(<AppButton type="primary" icon={undefined}>Primary Button</AppButton>)

    const button = screen.getByTestId('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Primary Button')
    expect(button).not.toHaveTextContent('Icon')
  })
})
